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
            <h1>Organizations and public bodies trust Aarya Innovtech systems.</h1>
            <p>
              Aarya Innovtech has worked with public bodies, institutions, and
              organizations across India.
            </p>
            <div className="clients-page-actions">
              <button className="button primary" type="button" onClick={() => onNavigateHome("contact")}>
                Discuss your project <ArrowRight size={17} />
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
                <div
                  className="clients-page-mosaic-item"
                  key={client.filename}
                  title={client.label}
                >
                  <img src={client.src} alt={client.label} loading={index < 4 ? "eager" : "lazy"} decoding="async" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
            <div className="clients-page-note">
              <Building2 size={18} />
              <p>Public bodies, institutions, and organizations served by Aarya Innovtech.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="clients-page-wall section" id="client-wall">
        <div className="container">
          <div className="section-heading split-heading" data-reveal>
            <div>
              <span className="eyebrow"><Images size={15} /> Client portfolio</span>
              <h2>Our client portfolio.</h2>
            </div>
            <p>
              A selection of client and project references.
            </p>
          </div>

          <div className="client-page-grid">
            {clientRecords.map((client, index) => (
              <article
                className="client-page-card"
                data-reveal
                style={{ "--reveal-delay": `${Math.min(index, 12) * 35}ms` }}
                aria-label={client.label}
                key={client.filename}
                title={client.label}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <img src={client.src} alt={client.label} loading="lazy" decoding="async" />
              </article>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}

export default ClientPage;
