import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Factory,
  FileUp,
  Mail,
  MapPin,
  Send,
  Users,
  Wrench,
  Calculator,
  PenTool,
  Cpu
} from "lucide-react";

const vacancies = [
  {
    icon: Calculator,
    role: "Account Executive",
    department: "Accounting",
    location: "Ambad MIDC, Nashik",
    type: "Full-time",
    experience: "Fresher or Experienced",
    details: [
      "Fresher or experienced candidates can apply.",
      "Basic knowledge of accounting principles, GST, TDS, and taxation.",
      "Proficiency in Tally, MS Excel, and MS Office.",
      "Ability to maintain accounts, prepare reports, and handle day-to-day accounting activities.",
    ]
  },
  {
    icon: PenTool,
    role: "Production Development and Design Engineer",
    department: "Design & Development",
    location: "Ambad MIDC, Nashik",
    type: "Full-time",
    experience: "Experienced",
    details: [
      "Technical knowledge and experience in preparing technical drawings, layouts, and project-related designs.",
      "Proficiency in AutoCAD, SolidWorks, SketchUp, CorelDRAW, Adobe Photoshop, and MS Office.",
      "Ability to prepare 2D/3D drawings, fabrication drawings, BOQs, and technical documentation.",
      "Experience in designing kiosks, engineering products, structures, or project layouts will be preferred.",
    ]
  },
  {
    icon: Cpu,
    role: "Electronics Engineer",
    department: "Engineering",
    location: "Ambad MIDC, Nashik",
    type: "Full-time",
    experience: "Diploma/Degree",
    details: [
      "Diploma or degree in Electronics and telecommunication Engineering or related field.",
      "Knowledge of electronic circuits, components, and testing equipment.",
      "Experience in PCB design, microcontrollers, and embedded systems will be an advantage.",
      "Ability to troubleshoot electronic systems and ensure product reliability.",
      "Strong problem-solving skills and attention to detail.",
    ]
  }
];

const allowedResumeExtensions = [".pdf", ".doc", ".docx"];
const allowedResumeMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const maxResumeSizeBytes = 10 * 1024 * 1024;

const isAllowedResumeFile = (file) => {
  if (!file) return false;

  const fileName = file.name.toLowerCase();
  const hasAllowedExtension = allowedResumeExtensions.some((extension) => fileName.endsWith(extension));
  const hasAllowedMimeType = !file.type || allowedResumeMimeTypes.includes(file.type);

  return hasAllowedExtension && hasAllowedMimeType && file.size <= maxResumeSizeBytes;
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

function CareerPage({ onNavigateHome }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [submitLocked, setSubmitLocked] = useState(false);
  const formRef = useRef(null);
  const submitTimerRef = useRef(null);
  const formLoadTime = useRef(Date.now()).current;

  useEffect(() => () => window.clearTimeout(submitTimerRef.current), []);

  const openApplicationForm = (role) => {
    setSelectedRole(role);
    setSubmitted(false);
    setResumeName("");
    setResumeError("");
    setSubmitLocked(false);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setResumeName("");
      setResumeError("");
      return;
    }

    if (!isAllowedResumeFile(file)) {
      event.target.value = "";
      setResumeName("");
      setResumeError("Upload a PDF, DOC, or DOCX resume under 10 MB.");
      return;
    }

    setResumeName(file.name);
    setResumeError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitLocked) return;

    const currentForm = event.currentTarget;
    const form = new FormData(currentForm);
    const resume = form.get("resume");
    if (!(resume instanceof File) || !isAllowedResumeFile(resume)) {
      setResumeError("Upload a PDF, DOC, or DOCX resume under 10 MB.");
      return;
    }

    setSubmitLocked(true);
    window.clearTimeout(submitTimerRef.current);

    try {
      const attachmentContent = await fileToBase64(resume);
      const response = await fetch("https://aaryainnovtech1.vercel.app/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "career",
          role: form.get("role"),
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          experience: form.get("experience"),
          city: form.get("city"),
          message: form.get("message"),
          companyWebsite: form.get("companyWebsite"),
          formStartedAt: Number(form.get("formStartedAt") || 0),
          attachment: {
            filename: resume.name,
            contentType: resume.type,
            content: attachmentContent,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Application email failed");
      }

      setSubmitted("sent");
      setResumeName("");
      currentForm.reset();
    } catch {
      setSubmitted("error");
    } finally {
      submitTimerRef.current = window.setTimeout(() => {
        setSubmitLocked(false);
        setSubmitted(false);
      }, 4500);
    }
  };

  return (
    <div className="career-page">
      <section className="career-page-hero">
        <div className="container career-page-hero-inner">
          <div className="career-page-copy" data-reveal>
            <button className="contact-page-back" type="button" onClick={() => onNavigateHome("home")}>
              <ArrowLeft size={15} />
              Home
            </button>
            <span className="eyebrow light"><BriefcaseBusiness size={15} /> Careers</span>
            <h1>Current Vacancies</h1>
            <p>Choose a role and submit your application details.</p>
          </div>
        </div>
      </section>

      <section className="career-page-body section">
        <div className="container career-page-layout">
          <div className="career-why-join-us" data-reveal>
            <h2>Why join Aarya Innovtech?</h2>
            <p>
              At Aarya Innovtech Pvt. Ltd., we believe in empowering our people to create innovative, sustainable solutions that make a real difference. We offer a collaborative environment where engineering excellence and creativity thrive. 
            </p>
            <p>
              Whether you are designing special purpose machines, working on eco-friendly hygiene products, or driving our growth, you will be part of a mission-driven team dedicated to building a cleaner and smarter world. We provide opportunities for continuous learning, professional growth, and the chance to work on impactful projects.
            </p>
          </div>

          <div className="career-vacancy-list" data-reveal>
            {vacancies.map(({ icon: Icon, role, department, location, type, experience, details }, index) => (
              <article className="career-vacancy-card" style={{ "--reveal-delay": `${index * 70}ms` }} key={role}>
                <div className="career-vacancy-icon">
                  <Icon size={22} />
                </div>
                <div className="career-vacancy-content">
                  <span>{department}</span>
                  <h2>{role}</h2>
                  <div className="career-vacancy-meta">
                    <small><MapPin size={14} /> {location}</small>
                    <small><BriefcaseBusiness size={14} /> {type}</small>
                    <small>{experience}</small>
                  </div>
                  {details && (
                    <ul className="career-vacancy-details">
                      {details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button className="button primary" type="button" onClick={() => openApplicationForm(role)}>
                  Apply <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>

          {selectedRole && (
            <form className="career-application-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-trap" aria-hidden="true">
                <label htmlFor="career-company-website">Company website</label>
                <input id="career-company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
                <input name="formStartedAt" type="hidden" value={formLoadTime} readOnly />
              </div>
              <div className="career-form-heading">
                <span><Mail size={15} /> Application Form</span>
                <h2>Apply for role</h2>
              </div>

              <label htmlFor="career-role">Applying role</label>
              <select id="career-role" name="role" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} required>
                {vacancies.map((vacancy) => (
                  <option value={vacancy.role} key={vacancy.role}>{vacancy.role}</option>
                ))}
              </select>

              <div className="career-form-row">
                <div>
                  <label htmlFor="career-name">Full name</label>
                  <input id="career-name" name="name" type="text" placeholder="Your name" maxLength={80} autoComplete="name" required />
                </div>
                <div>
                  <label htmlFor="career-phone">Phone number</label>
                  <input
                    id="career-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91"
                    minLength={5}
                    maxLength={20}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="career-form-row">
                <div>
                  <label htmlFor="career-email">Email</label>
                  <input id="career-email" name="email" type="email" placeholder="you@example.com" maxLength={120} autoComplete="email" required />
                </div>
                <div>
                  <label htmlFor="career-experience">Experience</label>
                  <input id="career-experience" name="experience" type="text" placeholder="Example: 2 years" maxLength={40} required />
                </div>
              </div>

              <label htmlFor="career-city">Current city</label>
              <input id="career-city" name="city" type="text" placeholder="City" maxLength={80} autoComplete="address-level2" required />

              <label htmlFor="career-resume">Resume</label>
              <label className="career-file-input" htmlFor="career-resume">
                <FileUp size={18} />
                <span>{resumeName || "Upload resume"}</span>
                <input
                  id="career-resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleResumeChange}
                  aria-describedby={resumeError ? "career-resume-error" : undefined}
                  required
                />
              </label>
              {resumeError && <p className="form-note error" id="career-resume-error">{resumeError}</p>}

              <label htmlFor="career-message">Short message</label>
              <textarea id="career-message" name="message" rows="4" placeholder="Write a short note" maxLength={900} required />

              <button className="button dark" type="submit" disabled={submitLocked}>
                <Send size={17} /> {submitLocked ? "Sending..." : "Submit Application"}
              </button>
              {submitted === "sent" && <p className="form-note">Application sent successfully.</p>}
              {submitted === "error" && <p className="form-note error">Unable to send right now. Please try again.</p>}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default CareerPage;
