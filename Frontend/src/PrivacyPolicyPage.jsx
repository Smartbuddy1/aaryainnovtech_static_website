import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Database,
  Lock,
  Mail,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const policySections = [
  {
    icon: Database,
    title: "Information we collect",
    text: "When you contact us through this website, phone, email, or WhatsApp, we may receive your name, phone number, email address, message, product requirement, and site details shared by you.",
  },
  {
    icon: MessageCircle,
    title: "How we use it",
    text: "We use your details only to reply to your enquiry, suggest suitable Smart Buddy products, prepare a quotation, coordinate a site discussion, or provide support.",
  },
  {
    icon: ShieldCheck,
    title: "Sharing",
    text: "We do not sell or rent your personal information. We share it only with the Aarya Innov Tech team, required service partners, or when required by law.",
  },
  {
    icon: Lock,
    title: "Safety",
    text: "We take reasonable care to protect enquiry details. This website does not ask for payment information, passwords, or sensitive identity documents.",
  },
];

function PrivacyPolicyPage({ onNavigateHome }) {
  return (
    <div className="privacy-page">
      <section className="privacy-page-hero">
        <div className="container privacy-page-hero-grid">
          <div className="privacy-page-copy" data-reveal>
            <div className="product-breadcrumb" aria-label="Breadcrumb">
              <button type="button" onClick={() => onNavigateHome("home")}>Home</button>
              <ArrowRight size={14} />
              <strong>Privacy Policy</strong>
            </div>
            <span className="eyebrow light"><ShieldCheck size={15} /> Aarya Innov Tech</span>
            <h1>Privacy Policy</h1>
            <p>
              This policy explains how Aarya Innov Tech uses enquiry information received
              through the Smart Buddy website for hygiene-sector products and public utility solutions.
            </p>
          </div>

          <aside className="privacy-page-note" data-reveal>
            <BadgeCheck size={24} />
            <strong>Simple use policy</strong>
            <p>Your details are used to respond to your product enquiry and support your requirement.</p>
            <span>Last updated: June 25, 2026</span>
          </aside>
        </div>
      </section>

      <section className="privacy-policy-body section">
        <div className="container">
          <div className="section-heading split-heading" data-reveal>
            <div>
              <span className="eyebrow"><Lock size={15} /> Data privacy</span>
              <h2>Clear information handling for website enquiries.</h2>
            </div>
            <p>
              Smart Buddy product enquiries may relate to Electronic ECO Toilet, Bio-Digester,
              Organic Waste Composter, PET Bottle Shredder, Computer Kiosk, or other public utility systems.
            </p>
          </div>

          <div className="privacy-policy-grid">
            {policySections.map(({ icon: Icon, title, text }, index) => (
              <article className="privacy-policy-card" data-reveal style={{ "--reveal-delay": `${index * 70}ms` }} key={title}>
                <Icon size={22} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="privacy-policy-contact" data-reveal>
            <div>
              <span className="eyebrow"><Mail size={15} /> Contact</span>
              <h2>Questions about this policy?</h2>
              <p>Contact Aarya Innov Tech for privacy or website enquiry questions.</p>
            </div>
            <a className="button primary" href="mailto:sales@smartbuddy.co.in">
              sales@smartbuddy.co.in <ArrowRight size={17} />
            </a>
            <button className="button dark" type="button" onClick={() => onNavigateHome("contact")}>
              <ArrowLeft size={17} /> Back to contact
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
