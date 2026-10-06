import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock,
  FileUp,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

const departmentPositions = {
  "Accounts": [
    "Jr. Accountant",
    "Sr. Accountant",
  ],
  "Electrical": [
    "Electrical Engineer",
  ],
  "HR": [
    "HR Manager",
    "HR Executive",
  ],
  "Admin": [
    "Admin Assistant",
  ],
  "Purchase": [
    "Purchase Manager",
    "Purchase Executive",
  ],
  "Production": [
    "Production Engineer",
    "Production Supervisor",
    "CNC Bending Operator",
    "Lazer Cutting Operator",
  ],
  "IT": [
    "IT Intern Full Stack Developer",
    "Software Tester",
    "Software Developer",
  ],
  "Sales": [
    "Sales Executive",
  ],
  "Quality": [
    "Quality Engineer",
  ],
  "R & D": [
    "R & D Engineer",
  ],
  "Design": [
    "Design Engineer",
  ],
  "Store & Logistics": [
    "Store & Logistics Executive",
  ],
  "Maintenance": [
    "Maintenance Engineer",
  ],
  "Other / General": [
    "Open Application / Any Role",
  ],
};

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
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [submitLocked, setSubmitLocked] = useState(false);
  const formRef = useRef(null);
  const submitTimerRef = useRef(null);
  const formLoadTime = useRef(Date.now()).current;

  useEffect(() => () => window.clearTimeout(submitTimerRef.current), []);

  const availablePositions = useMemo(() => {
    if (!selectedDepartment || !departmentPositions[selectedDepartment]) {
      return [];
    }
    return departmentPositions[selectedDepartment];
  }, [selectedDepartment]);

  const handleApplyClick = (dept, pos) => {
    setSelectedDepartment(dept);
    setSelectedPosition(pos);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      const nameInput = formRef.current.querySelector("#career-name");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 450);
      }
    }
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
      const dept = form.get("department") || selectedDepartment;
      const pos = form.get("position") || selectedPosition;

      const response = await fetch("https://aaryainnovtech1.vercel.app/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "career",
          role: `${dept} - ${pos}`,
          department: dept,
          position: pos,
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
      setSelectedDepartment("");
      setSelectedPosition("");
      currentForm.reset();
    } catch {
      setSubmitted("error");
    } finally {
      submitTimerRef.current = window.setTimeout(() => {
        setSubmitLocked(false);
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="career-page">
      <section className="career-page-hero">
        <div className="container career-page-hero-inner">
          <div className="career-page-copy">
            <button className="contact-page-back" type="button" onClick={() => onNavigateHome("home")}>
              <ArrowLeft size={15} />
              Home
            </button>
            <span className="eyebrow light"><BriefcaseBusiness size={15} /> Careers</span>
            <h1>Careers</h1>
            <p>Explore opportunities and build your career with Aarya Innovtech.</p>
          </div>
        </div>
      </section>

      <section className="career-page-body section">
        <div className="container">
          <div className="career-page-layout">
            {/* Top Section: Why Join Us */}
            <div className="career-why-join-us">
              <h2>Why join Aarya Innovtech?</h2>
              <p>
                At Aarya Innovtech Pvt. Ltd., we believe in empowering our people to create innovative, sustainable solutions that make a real difference. We offer a collaborative environment where engineering excellence and creativity thrive.
              </p>
              <p>
                Whether you are designing special purpose machines, working on eco-friendly hygiene products, or driving our growth, you will be part of a mission-driven team dedicated to building a cleaner and smarter world. We provide opportunities for continuous learning, professional growth, and the chance to work on impactful projects.
              </p>

              <div className="career-perks-list" style={{ marginTop: "24px", display: "grid", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#102c26", fontSize: "14px", fontWeight: "600" }}>
                  <CheckCircle2 size={18} color="#08725f" />
                  <span>Innovative engineering & OEM product development</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#102c26", fontSize: "14px", fontWeight: "600" }}>
                  <CheckCircle2 size={18} color="#08725f" />
                  <span>Work on national smart city & eco-sanitation projects</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#102c26", fontSize: "14px", fontWeight: "600" }}>
                  <CheckCircle2 size={18} color="#08725f" />
                  <span>Collaborative, learning-oriented culture & career growth</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#102c26", fontSize: "14px", fontWeight: "600" }}>
                  <CheckCircle2 size={18} color="#08725f" />
                  <span>Direct exposure to end-to-end manufacturing & IoT systems</span>
                </div>
              </div>

              <div style={{ marginTop: "28px", padding: "18px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", display: "grid", gap: "6px" }}>
                <strong style={{ color: "#166534", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Building2 size={16} /> Location: Ambad MIDC, Nashik
                </strong>
                <small style={{ color: "#15803d", fontSize: "12.5px" }}>
                  Plant: S-27, Near Emerson, Ambad MIDC, Nashik, Maharashtra - 422010
                </small>
              </div>
            </div>

            {/* Current Vacancies: Accounts & Electrical Engineer */}
            <div className="career-vacancies-section">
              <div className="career-vacancies-header">
                <div>
                  <span className="eyebrow" style={{ color: "#08725f", marginBottom: "4px" }}>
                    <BriefcaseBusiness size={14} /> Current Openings
                  </span>
                  <h3 style={{ margin: "4px 0 0", color: "#102c26", fontSize: "22px", fontWeight: "700" }}>
                    Current Job Vacancies
                  </h3>
                </div>
                <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                  Click Apply Now to quickly fill and submit your application below.
                </p>
              </div>

              <div className="career-vacancies-grid">
                {/* Card 1: Production Engineer */}
                <div className="career-vacancy-box">
                  <div className="career-vacancy-top">
                    <div className="career-vacancy-title-wrap">
                      <span className="career-vacancy-dept-badge">Production</span>
                      <h4>Production Engineer</h4>
                    </div>
                    <div className="career-vacancy-tags">
                      <span><MapPin size={13} /> Ambad MIDC, Nashik</span>
                      <span><Clock size={13} /> Full-Time</span>
                      <span><BriefcaseBusiness size={13} /> 3-5+ Years</span>
                    </div>
                  </div>
                  <p className="career-vacancy-desc">
                    Oversee manufacturing operations, production planning, quality control, and shop floor management for specialized machinery and kiosks.
                  </p>
                  <ul className="career-vacancy-points">
                    <li>Resource allocation and capacity planning.</li>
                    <li>Ensure adherence to production schedules and quality standards.</li>
                    <li>Optimize manufacturing processes for efficiency.</li>
                  </ul>
                  <button
                    type="button"
                    className="button primary small career-vacancy-apply-btn"
                    onClick={() => handleApplyClick("Production", "Production Engineer")}
                  >
                    Apply Now <ArrowRight size={15} />
                  </button>
                </div>

                {/* Card 2: CNC Bending Operator */}
                <div className="career-vacancy-box">
                  <div className="career-vacancy-top">
                    <div className="career-vacancy-title-wrap">
                      <span className="career-vacancy-dept-badge">Production</span>
                      <h4>CNC Bending Operator</h4>
                    </div>
                    <div className="career-vacancy-tags">
                      <span><MapPin size={13} /> Ambad MIDC, Nashik</span>
                      <span><Clock size={13} /> Full-Time</span>
                      <span><BriefcaseBusiness size={13} /> Fresher up to 1 Year</span>
                    </div>
                  </div>
                  <p className="career-vacancy-desc">
                    Operate CNC Bending machines, ensure precise bends based on technical drawings, and maintain high-quality sheet metal components.
                  </p>
                  <ul className="career-vacancy-points">
                    <li>Education: ITI, 10th Pass.</li>
                    <li>Basic CNC knowledge and machine operation.</li>
                    <li>Mechanical knowledge and sheet metal knowledge required.</li>
                  </ul>
                  <button
                    type="button"
                    className="button primary small career-vacancy-apply-btn"
                    onClick={() => handleApplyClick("Production", "CNC Bending Operator")}
                  >
                    Apply Now <ArrowRight size={15} />
                  </button>
                </div>

                {/* Card 3: Lazer Cutting Operator */}
                <div className="career-vacancy-box">
                  <div className="career-vacancy-top">
                    <div className="career-vacancy-title-wrap">
                      <span className="career-vacancy-dept-badge">Production</span>
                      <h4>Lazer Cutting Operator</h4>
                    </div>
                    <div className="career-vacancy-tags">
                      <span><MapPin size={13} /> Ambad MIDC, Nashik</span>
                      <span><Clock size={13} /> Full-Time</span>
                      <span><BriefcaseBusiness size={13} /> Fresher</span>
                    </div>
                  </div>
                  <p className="career-vacancy-desc">
                    Operate and maintain laser cutting equipment for precise sheet metal fabrication and part manufacturing.
                  </p>
                  <ul className="career-vacancy-points">
                    <li>Education: ITI, 10th Pass.</li>
                    <li>Basic knowledge of laser cutting operations.</li>
                    <li>Ability to handle and process sheet metal efficiently.</li>
                  </ul>
                  <button
                    type="button"
                    className="button primary small career-vacancy-apply-btn"
                    onClick={() => handleApplyClick("Production", "Lazer Cutting Operator")}
                  >
                    Apply Now <ArrowRight size={15} />
                  </button>
                </div>

                {/* Card 4: Design Engineer */}
                <div className="career-vacancy-box">
                  <div className="career-vacancy-top">
                    <div className="career-vacancy-title-wrap">
                      <span className="career-vacancy-dept-badge">Design</span>
                      <h4>Design Engineer</h4>
                    </div>
                    <div className="career-vacancy-tags">
                      <span><MapPin size={13} /> Ambad MIDC, Nashik</span>
                      <span><Clock size={13} /> Full-Time</span>
                      <span><BriefcaseBusiness size={13} /> 1-3+ Years / Fresher</span>
                    </div>
                  </div>
                  <p className="career-vacancy-desc">
                    Create robust 3D models, detailed 2D manufacturing drawings, and innovative product designs for our smart civic infrastructure.
                  </p>
                  <ul className="career-vacancy-points">
                    <li>Proficiency in SolidWorks, AutoCAD, or similar CAD software.</li>
                    <li>Understanding of sheet metal design and manufacturing tolerances.</li>
                    <li>Collaborate with production teams to optimize manufacturability.</li>
                  </ul>
                  <button
                    type="button"
                    className="button primary small career-vacancy-apply-btn"
                    onClick={() => handleApplyClick("Design", "Design Engineer")}
                  >
                    Apply Now <ArrowRight size={15} />
                  </button>
                </div>

                {/* Card 5: Talent Network / Open Application */}
                <div className="career-talent-pool-card" style={{
                  gridColumn: "1 / -1",
                  marginTop: "8px",
                  padding: "24px 22px",
                  background: "linear-gradient(135deg, #022b24 0%, #064438 52%, #03231d 100%)",
                  border: "1px solid rgba(210, 243, 139, 0.28)",
                  borderRadius: "10px",
                  color: "#ffffff",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "18px",
                  boxShadow: "0 10px 26px rgba(2, 43, 36, 0.16)"
                }}>
                  <div style={{ maxWidth: "580px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#d2f38b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                      <Sparkles size={14} /> Talent Network
                    </div>
                    <h3 style={{ margin: "0 0 6px", fontSize: "19px", fontWeight: "700", color: "#ffffff" }}>
                      Didn't find a role that matches your skills?
                    </h3>
                    <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.82)", fontSize: "13.5px", lineHeight: "1.55" }}>
                      We'd like to stay connected. Join our talent pool, and our HR team will reach out when a job matches your skills.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="button primary small"
                    onClick={() => handleApplyClick("Other / General", "Open Application / Any Role")}
                    style={{
                      background: "#0bbfa6",
                      color: "#ffffff",
                      borderColor: "#0bbfa6",
                      fontWeight: "600",
                      padding: "10px 22px",
                      borderRadius: "6px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(11, 191, 166, 0.35)"
                    }}
                  >
                    <FileUp size={15} /> Submit Resume
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section: Direct Apply Form */}
            <form className="career-application-form" id="career-apply-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-trap" aria-hidden="true">
                <label htmlFor="career-company-website">Company website</label>
                <input id="career-company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
                <input name="formStartedAt" type="hidden" value={formLoadTime} readOnly />
              </div>

              <div className="career-form-heading">
                <span><Mail size={15} /> Job Application</span>
                <h2>Apply Now</h2>
                <p style={{ margin: "6px 0 0", color: "#60736d", fontSize: "14px" }}>
                  Select your department and position, then fill in your details to apply.
                </p>
              </div>

              {/* Dynamic Department & Position Row */}
              <div className="career-form-row">
                <div>
                  <label htmlFor="career-department">
                    Select Department <span style={{ color: "#ef4444", fontWeight: "bold" }}>*</span>
                  </label>
                  <select
                    id="career-department"
                    name="department"
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                      setSelectedPosition("");
                    }}
                    required
                  >
                    <option value="" disabled>Departments</option>
                    {Object.keys(departmentPositions).map((dept) => (
                      <option value={dept} key={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="career-position">
                    Select Position <span style={{ color: "#ef4444", fontWeight: "bold" }}>*</span>
                  </label>
                  <select
                    id="career-position"
                    name="position"
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    disabled={!selectedDepartment}
                    required
                  >
                    <option value="" disabled>
                      {selectedDepartment ? `Positions in ${selectedDepartment}` : "Select Department First"}
                    </option>
                    {availablePositions.map((pos) => (
                      <option value={pos} key={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="career-form-row">
                <div>
                  <label htmlFor="career-name">
                    Full Name <span style={{ color: "#ef4444", fontWeight: "bold" }}>*</span>
                  </label>
                  <input id="career-name" name="name" type="text" placeholder="Your full name" maxLength={80} autoComplete="name" required />
                </div>
                <div>
                  <label htmlFor="career-phone">
                    Phone Number <span style={{ color: "#ef4444", fontWeight: "bold" }}>*</span>
                  </label>
                  <input
                    id="career-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    minLength={5}
                    maxLength={20}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="career-form-row">
                <div>
                  <label htmlFor="career-email">
                    Email Address <span style={{ color: "#ef4444", fontWeight: "bold" }}>*</span>
                  </label>
                  <input id="career-email" name="email" type="email" placeholder="you@example.com" maxLength={120} autoComplete="email" required />
                </div>
                <div>
                  <label htmlFor="career-experience">
                    Total Experience <span style={{ color: "#ef4444", fontWeight: "bold" }}>*</span>
                  </label>
                  <input id="career-experience" name="experience" type="text" placeholder="e.g. Fresher / 2 Years" maxLength={40} required />
                </div>
              </div>

              <div>
                <label htmlFor="career-city">
                  Current City / Location <span style={{ color: "#ef4444", fontWeight: "bold" }}>*</span>
                </label>
                <input id="career-city" name="city" type="text" placeholder="e.g. Nashik, Pune, Mumbai" maxLength={80} autoComplete="address-level2" required />
              </div>

              <div>
                <label htmlFor="career-resume">
                  Upload Resume <span style={{ color: "#ef4444", fontWeight: "bold" }}>*</span>
                </label>
                <label className="career-file-input" htmlFor="career-resume">
                  <FileUp size={18} />
                  <span>{resumeName || "Choose file (PDF, DOC, DOCX max 10MB)"}</span>
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
              </div>

              <div>
                <label htmlFor="career-message">Short Note / Message (Optional)</label>
                <textarea id="career-message" name="message" rows="3" placeholder="Tell us about yourself and your key skills..." maxLength={900} />
              </div>

              <button className="button primary" type="submit" disabled={submitLocked} style={{ width: "100%", justifyContent: "center", minHeight: "48px" }}>
                <Send size={17} /> {submitLocked ? "Sending Application..." : "Submit Application"}
              </button>

              {submitted === "sent" && (
                <div style={{ padding: "12px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "6px", color: "#166534", fontSize: "14px", fontWeight: "600", textAlign: "center" }}>
                  ✅ Application submitted successfully! Our HR team will review your profile.
                </div>
              )}
              {submitted === "error" && (
                <div style={{ padding: "12px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "6px", color: "#991b1b", fontSize: "14px", fontWeight: "600", textAlign: "center" }}>
                  ❌ Unable to send application right now. Please try again or email us directly at hr@aaryainnovtech.com.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CareerPage;
