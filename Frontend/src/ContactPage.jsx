import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Factory,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";

function ContactPage({ onNavigateHome, onSubmit, mailStatus }) {
  const isSending = mailStatus === "sending";
  const formLoadTime = React.useRef(Date.now()).current;

  return (
    <div className="contact-page">
      <section className="contact-page-hero">
        <div className="container contact-page-hero-inner">
          <div className="contact-page-copy" data-reveal>
            <button className="contact-page-back" type="button" onClick={() => onNavigateHome("home")}>
              <ArrowLeft size={15} />
              Home
            </button>
            <span className="eyebrow light"><Mail size={15} /> Contact Aarya Innovtech</span>
            <h1>Contact Us.</h1>
            <p>
              Contact Aarya Innovtech for product enquiries, project discussion,
              installation support, and service help.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-inquiry-section section" id="inquiry-form">
        <div className="container contact-inquiry-grid">
          <div className="contact-inquiry-copy" data-reveal>
            <span className="eyebrow"><Mail size={15} /> Inquiry Form</span>
            <h2>Send your enquiry.</h2>
            <p>
              Share your enquiry for Electronic ECO Toilet, Bio-Digester, Organic Waste
              Composter, PET Bottle Shredder, Computer Kiosk,
              Vending Machines.
            </p>

            <div className="contact-benefits">
              <span><BadgeCheck size={15} /> OEM since 2010</span>
              <span><Wrench size={15} /> Hygiene-sector product range</span>
              <span><Globe2 size={15} /> Installed across India</span>
            </div>

            <div className="contact-details" id="contact-details">
              <a href="tel:+918806796868" aria-label="Call Aarya Innovtech">
                <i><Phone size={17} /></i>
                <span><small>Call us</small>+91 88067 96868 / +91 9923810197</span>
              </a>
              <a href="mailto:sales@aaryainnovtech.com">
                <i><Mail size={17} /></i>
                <span><small>Email us</small>sales@aaryainnovtech.com</span>
              </a>
              <div>
                <i><MapPin size={17} /></i>
                <span><small>Regd. Office</small>4A, Sayali Darshan A, Radha Nagar,<br />Makhamalabad Road, Panchavati,<br />Nashik - 422003</span>
              </div>
              <div>
                <i><Factory size={17} /></i>
                <span><small>Factory</small>S-27, Near Emerson, Ambad MIDC,<br />Nashik, Maharashtra - 422010</span>
              </div>
            </div>
          </div>
          <form className="contact-form contact-page-form" data-reveal onSubmit={onSubmit}>
            <div className="form-trap" aria-hidden="true">
              <label htmlFor="contact-page-website">Website</label>
              <input id="contact-page-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              <input name="formStartedAt" type="hidden" value={formLoadTime} readOnly />
            </div>
            <div className="contact-form-intro">
              <span>Product enquiry</span>
              <h3>Send enquiry.</h3>
              <p>Share a few details and our team will guide you toward the right product.</p>
            </div>
            <div className="contact-form-row">
              <div>
                <label htmlFor="contact-page-name">Your name</label>
                <input id="contact-page-name" name="name" type="text" placeholder="Full name" maxLength={80} autoComplete="name" required />
              </div>
              <div>
                <label htmlFor="contact-page-phone">Phone number</label>
                <input
                  id="contact-page-phone"
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
            <div>
              <label htmlFor="contact-page-message">How can we help?</label>
              <textarea id="contact-page-message" name="message" rows="4" placeholder="Tell us what you need" maxLength={900} required />
            </div>
            <button className="button dark" type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send enquiry"} <ArrowRight size={18} />
            </button>
            <p className="contact-form-privacy"><ShieldCheck size={14} /> Your details are used only to respond to your enquiry.</p>
            {mailStatus === "sent" && <p className="form-note">Your enquiry has been sent successfully.</p>}
            {mailStatus === "error" && <p className="form-note error">Unable to send right now. Please try again.</p>}
          </form>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
