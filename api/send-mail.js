const tls = require("node:tls");

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const MAX_JSON_BYTES = 15 * 1024 * 1024;
const MIN_FORM_AGE_MS = 2500;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const IP_MINUTE_LIMIT = 5;
const IP_HOUR_LIMIT = 20;
const IDENTITY_HOUR_LIMIT = 4;
const MAIL_TO = process.env.MAIL_TO || "sales@aaryainnovtech.com";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const allowedResumeExtensions = [".pdf", ".doc", ".docx"];
const allowedResumeMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const rateBuckets = globalThis.__aaryaMailRateBuckets || new Map();
globalThis.__aaryaMailRateBuckets = rateBuckets;

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const clean = (value, maxLength = 900) =>
  String(value ?? "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, maxLength);

const encodeHeader = (value) => {
  const text = clean(value, 180).replace(/[\r\n]/g, " ");
  return /^[\x00-\x7F]*$/.test(text) ? text : `=?UTF-8?B?${Buffer.from(text).toString("base64")}?=`;
};

const foldBase64 = (base64) => String(base64 || "").replace(/(.{1,76})/g, "$1\r\n").trimEnd();

const getClientIp = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
};

const hasValidOrigin = (req) => {
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (!origin || !host) return false;

  try {
    const originUrl = new URL(origin);
    const configuredOrigins = String(process.env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    // Hardcoded allowed domains for EC2
    configuredOrigins.push("https://aaryainnovtech.com");
    configuredOrigins.push("https://www.aaryainnovtech.com");

    return originUrl.host.toLowerCase() === host.toLowerCase() || configuredOrigins.includes(originUrl.origin.toLowerCase());
  } catch {
    return false;
  }
};

const pruneRateBuckets = (now) => {
  for (const [key, bucket] of rateBuckets) {
    if (bucket.resetAt <= now) {
      rateBuckets.delete(key);
    }
  }
};

const consumeRateLimit = (key, limit, windowMs) => {
  const now = Date.now();
  pruneRateBuckets(now);

  const existing = rateBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  existing.count += 1;
  if (existing.count > limit) {
    throw new HttpError(429, "Too many requests. Please try again later.");
  }
};

const validateCommonSignals = (payload) => {
  if (clean(payload.website, 200) || clean(payload.companyWebsite, 200)) {
    throw new HttpError(200, "OK");
  }

  const formStartedAt = Number(payload.formStartedAt || 0);
  const formAge = Date.now() - formStartedAt;
  if (!Number.isFinite(formStartedAt) || formAge < MIN_FORM_AGE_MS || formAge > MAX_FORM_AGE_MS) {
    throw new HttpError(400, "Invalid form submission.");
  }
};

const assertText = (value, label, minLength, maxLength) => {
  const text = clean(value, maxLength);
  if (text.length < minLength) {
    throw new HttpError(400, `${label} is required.`);
  }
  return text;
};

const assertEmail = (value) => {
  const email = clean(value, 120).toLowerCase();
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(email)) {
    throw new HttpError(400, "Valid email is required.");
  }
  return email;
};

const assertPhone = (value) => {
  const phone = clean(value, 16);
  if (phone.length < 5) {
    throw new HttpError(400, "Valid phone number is required.");
  }
  return phone;
};

const assertHumanMessage = (value, minLength = 1) => {
  const message = assertText(value, "Message", minLength, 900);
  const urlMatches = message.match(/https?:\/\/|www\.|\.com|\.net|\.org/gi) || [];
  if (urlMatches.length > 2) {
    throw new HttpError(400, "Message contains too many links.");
  }
  return message;
};

const validateAttachment = (attachment) => {
  if (!attachment?.content || !attachment?.filename) {
    throw new HttpError(400, "Resume attachment is required.");
  }

  const filename = clean(attachment.filename, 140).replace(/[/\\]/g, "-");
  const lowerFilename = filename.toLowerCase();
  const contentType = clean(attachment.contentType, 120) || "application/octet-stream";
  const hasAllowedExtension = allowedResumeExtensions.some((extension) => lowerFilename.endsWith(extension));
  const hasAllowedMimeType = !contentType || allowedResumeMimeTypes.includes(contentType);
  const content = String(attachment.content || "");
  const attachmentBytes = Math.ceil(content.length * 0.75);

  if (!hasAllowedExtension || !hasAllowedMimeType || !/^[A-Za-z0-9+/=]+$/.test(content) || attachmentBytes > MAX_ATTACHMENT_BYTES) {
    throw new HttpError(400, "Resume must be PDF, DOC, or DOCX under 10 MB.");
  }

  return { filename, contentType, content };
};

const command = (socket, line) =>
  new Promise((resolve, reject) => {
    let response = "";

    const onData = (chunk) => {
      response += chunk.toString("utf8");
      const lines = response.split(/\r?\n/).filter(Boolean);
      const lastLine = lines[lines.length - 1] || "";

      if (/^\d{3}\s/.test(lastLine)) {
        socket.off("data", onData);
        const code = Number(lastLine.slice(0, 3));
        if (code >= 400) {
          reject(new Error(`SMTP command failed: ${code}`));
          return;
        }
        resolve(response);
      }
    };

    socket.on("data", onData);
    if (line !== null) {
      socket.write(`${line}\r\n`);
    }
  });

const buildEmail = ({ subject, text, html, replyTo, attachment }) => {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const mixedBoundary = `mixed_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const altBoundary = `alt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const headers = [
    `From: ${encodeHeader(process.env.MAIL_FROM_NAME || "Aarya Innovtech Website")} <${from}>`,
    `To: <${MAIL_TO}>`,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${Date.now()}.${Math.random().toString(36).slice(2)}@gmail.com>`,
    "MIME-Version: 1.0",
  ];

  if (replyTo) {
    headers.push(`Reply-To: <${clean(replyTo, 120).replace(/[\r\n<>]/g, "")}>`);
  }

  headers.push(`Content-Type: multipart/mixed; boundary="${mixedBoundary}"`);

  const parts = [
    headers.join("\r\n"),
    "",
    `--${mixedBoundary}`,
    `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
    "",
    `--${altBoundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    text,
    "",
    `--${altBoundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    html,
    "",
    `--${altBoundary}--`,
  ];

  if (attachment?.content && attachment?.filename) {
    parts.push(
      `--${mixedBoundary}`,
      `Content-Type: ${attachment.contentType || "application/octet-stream"}; name="${encodeHeader(attachment.filename)}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${encodeHeader(attachment.filename)}"`,
      "",
      foldBase64(attachment.content),
    );
  }

  parts.push(`--${mixedBoundary}--`, "");
  return parts.join("\r\n");
};

const sendMail = async (message) => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!user || !pass || !from) {
    throw new Error("SMTP environment variables are missing.");
  }

  const socket = tls.connect({
    host: SMTP_HOST,
    port: SMTP_PORT,
    servername: SMTP_HOST,
  });

  await new Promise((resolve, reject) => {
    socket.once("secureConnect", resolve);
    socket.once("error", reject);
  });

  try {
    await command(socket, null);
    await command(socket, `EHLO ${SMTP_HOST}`);
    await command(socket, "AUTH LOGIN");
    await command(socket, Buffer.from(user).toString("base64"));
    await command(socket, Buffer.from(pass).toString("base64"));
    await command(socket, `MAIL FROM:<${from}>`);
    await command(socket, `RCPT TO:<${MAIL_TO}>`);
    await command(socket, "DATA");
    socket.write(`${message}\r\n.\r\n`);
    await command(socket, null);
    await command(socket, "QUIT");
  } finally {
    socket.end();
  }
};

const buildContactEmail = (payload) => {
  validateCommonSignals(payload);
  const name = assertText(payload.name, "Name", 2, 80);
  const phone = assertPhone(payload.phone);
  const message = assertHumanMessage(payload.message);
  const subject = `Website enquiry from ${name || "Aarya Innovtech visitor"}`;
  const text = [`Name: ${name}`, `Phone: ${phone}`, "", "Message:", message].join("\n");
  const html = `
    <h2>Website enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  return { subject, text, html };
};

const buildCareerEmail = (payload) => {
  const fields = {
    role: assertText(payload.role, "Role", 2, 120),
    name: assertText(payload.name, "Name", 2, 80),
    email: assertEmail(payload.email),
    phone: assertPhone(payload.phone),
    experience: assertText(payload.experience, "Experience", 1, 40),
    city: assertText(payload.city, "Current city", 2, 80),
    message: assertHumanMessage(payload.message),
  };

  validateCommonSignals(payload);
  const attachment = validateAttachment(payload.attachment);

  const subject = `APPLICATION FOR - ${fields.role || "Aarya Innovtech"}`;
  const text = [
    `Role: ${fields.role}`,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Experience: ${fields.experience}`,
    `Current city: ${fields.city}`,
    `Resume file: ${attachment?.filename || "Not attached"}`,
    "",
    "Message:",
    fields.message,
  ].join("\n");
  const html = `
    <h2>Career application</h2>
    <p><strong>Role:</strong> ${escapeHtml(fields.role)}</p>
    <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(fields.phone)}</p>
    <p><strong>Experience:</strong> ${escapeHtml(fields.experience)}</p>
    <p><strong>Current city:</strong> ${escapeHtml(fields.city)}</p>
    <p><strong>Resume file:</strong> ${escapeHtml(attachment?.filename || "Not attached")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(fields.message).replace(/\n/g, "<br>")}</p>
  `;

  return { subject, text, html, replyTo: fields.email, attachment };
};

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  try {
    if (!hasValidOrigin(req)) {
      res.status(403).json({ ok: false, message: "Forbidden." });
      return;
    }

    if (!/^application\/json\b/i.test(String(req.headers["content-type"] || ""))) {
      res.status(415).json({ ok: false, message: "Unsupported content type." });
      return;
    }

    const contentLength = Number(req.headers["content-length"] || 0);
    if (contentLength > MAX_JSON_BYTES) {
      res.status(413).json({ ok: false, message: "Request is too large." });
      return;
    }

    const ip = getClientIp(req);
    consumeRateLimit(`ip:${ip}:minute`, IP_MINUTE_LIMIT, 60 * 1000);
    consumeRateLimit(`ip:${ip}:hour`, IP_HOUR_LIMIT, 60 * 60 * 1000);

    const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const type = clean(payload.type, 20);
    const identity = clean(payload.email || payload.phone || payload.name || ip, 140).toLowerCase();
    consumeRateLimit(`identity:${type}:${identity}`, IDENTITY_HOUR_LIMIT, 60 * 60 * 1000);

    const email =
      type === "career"
        ? buildCareerEmail(payload)
        : type === "contact"
          ? buildContactEmail(payload)
          : null;

    if (!email) {
      res.status(400).json({ ok: false, message: "Invalid form type." });
      return;
    }

    await sendMail(buildEmail(email));
    res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ ok: error.statusCode < 400, message: error.message });
      return;
    }

    console.error(error);
    res.status(500).json({ ok: false, message: "Email could not be sent." });
  }
};
