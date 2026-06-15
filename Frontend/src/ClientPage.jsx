import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Factory,
  Globe2,
  Images,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { clientRecords } from "./clientRecords.js";

const featuredClients = clientRecords.slice(0, 8);

const clientStats = [
  { value: String(clientRecords.length), label: "Client records", icon: Users },
  { value: "2010", label: "OEM since", icon: Factory },
  { value: "4.7+", label: "GeM rating", icon: BadgeCheck },
  { value: "PAN", label: "India support", icon: Globe2 },
];

function ClientPage({ onNavigateHome }) {
  return (
    <div className="clients-page">
      <section className="clients-page-hero">
        <div className="clients-page-hero-bg" aria-hidden="true" />
        <div className="container clients-page-hero-grid">
          <div className="clients-page-copy" data-reveal>
            <div className="product-breadcrumb" aria-label="Breadcrumb">
              <button type="button" onClick={() => onNavigateHome("home")}>Home</button>
              <ArrowRight size={14} />
              <strong>Our Clients</strong>
            </div>
            <span className="eyebrow light"><Sparkles size={15} /> Trusted partnerships</span>
            <h1>Organizations and public bodies trust Smart Buddy systems.</h1>
            <p>
              The complete client portfolio is organized here as a polished visual wall for fast review across
              desktop and mobile screens.
            </p>
            <div className="clients-page-actions">
              <button className="button primary" type="button" onClick={() => onNavigateHome("contact")}>
                Discuss a deployment <ArrowRight size={17} />
              </button>
              <button className="button glass" type="button" onClick={() => document.getElementById("client-wall")?.scrollIntoView({ behavior: "smooth" })}>
                View client wall
              </button>
            </div>
          </div>

          <div className="clients-page-panel" data-reveal>
            <div className="clients-page-proof">
              {clientStats.map(({ value, label, icon: Icon }) => (
                <article key={label}>
                  <Icon size={20} />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <div className="clients-page-mosaic" aria-label="Featured client marks">
              {featuredClients.map((client, index) => (
                <a
                  href={client.website}
                  aria-label={`Open official site for ${client.label}`}
                  key={client.filename}
                >
                  <img src={client.src} alt={client.label} loading={index < 4 ? "eager" : "lazy"} decoding="async" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </a>
              ))}
            </div>
            <div className="clients-page-note">
              <Building2 size={18} />
              <p>Public bodies, institutions, civic environments, and infrastructure buyers represented through the supplied client assets.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="clients-page-wall section" id="client-wall">
        <div className="container">
          <div className="section-heading split-heading" data-reveal>
            <div>
              <span className="eyebrow"><Images size={15} /> Client portfolio</span>
              <h2>Complete client wall from the existing portfolio.</h2>
            </div>
            <p>
              Each mark is displayed with consistent spacing, balanced sizing, and a focused preview interaction.
            </p>
          </div>

          <div className="client-page-grid">
            {clientRecords.map((client, index) => (
              <a
                className="client-page-card"
                data-reveal
                style={{ "--reveal-delay": `${Math.min(index, 12) * 35}ms` }}
                href={client.website}
                aria-label={`Open official site for ${client.label}`}
                key={client.filename}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <img src={client.src} alt={client.label} loading="lazy" decoding="async" />
                <small>Official site</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="clients-page-cta">
        <div className="container clients-page-cta-inner" data-reveal>
          <div>
            <span className="eyebrow light"><ShieldCheck size={15} /> Certified manufacturing systems</span>
            <h2>Planning a public-infrastructure or institutional deployment?</h2>
            <p>Talk to the Smart Buddy team about product selection, site requirements, and procurement readiness.</p>
          </div>
          <button className="button primary" type="button" onClick={() => onNavigateHome("contact")}>
            Contact team <ArrowRight size={17} />
          </button>
          <button className="button glass" type="button" onClick={() => onNavigateHome("home")}>
            <ArrowLeft size={17} /> Back home
          </button>
        </div>
      </section>

    </div>
  );
}

export default ClientPage;
