import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Factory,
  Globe2,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

const directors = [
  {
    name: "Mr. Prashant Ashok Bachhav",
    role: "Founder & CEO",
    company: "Aarya Innovtech Pvt. Ltd.",
    image: "/media/about/prashant-ashok-bachhav.jpeg",
    phone: "+91 8806796868",
    email: "ceo@smartbuddy.co.in",
    note: "Leads product innovation, manufacturing, and business growth for the Smart Buddy range.",
  },
  {
    name: "Mrs. Sujata Prashant Bachhav",
    role: "Director",
    company: "Aarya Innovtech Pvt. Ltd.",
    image: "/media/about/sujata-prashant-bachhav.jpeg",
    phone: "+91 9923810197",
    email: "info@smartbuddy.com",
    note: "Guides operations, government tenders, finance, automation, and R&D coordination.",
  },
];

const profileCards = [
  {
    icon: ShieldCheck,
    label: "Founded",
    title: "2010",
    text: "Aarya Innovtech has served the hygiene-sector machinery market since 2010.",
  },
  {
    icon: Building2,
    label: "Base",
    title: "Nashik, Maharashtra",
    text: "Registered office and factory footprint in Nashik for production and coordination.",
  },
  {
    icon: Factory,
    label: "Focus",
    title: "Special purpose machines",
    text: "Sanitation, waste treatment, recycling, kiosks, and hygiene-support systems.",
  },
  {
    icon: Users,
    label: "Approach",
    title: "Direct leadership",
    text: "Project discussions, execution, and support stay close to the founders.",
  },
];

const capabilityCards = [
  {
    icon: BadgeCheck,
    label: "Sanitation",
    title: "Electronic ECO Toilet",
    text: "Automatic flushing, cleaning support, monitoring, and backup-ready deployment.",
  },
  {
    icon: Factory,
    label: "Portable",
    title: "Portable FRP Toilet",
    text: "Corrosion-free, rugged cabins for public spaces, events, and site-based use.",
  },
  {
    icon: Leaf,
    label: "Treatment",
    title: "Bio-Digester",
    text: "On-site waste treatment without a sewerage network or STP.",
  },
  {
    icon: Wrench,
    label: "Composting",
    title: "Organic Waste Composter",
    text: "Biodegradable waste processed into compost in 24 to 36 hours.",
  },
];

const portfolio = [
  "Electronic ECO Toilet",
  "Portable FRP Toilet",
  "Bio-Digester",
  "Organic Waste Composter",
  "PET Bottle Shredder",
  "Computer Kiosk",
];

const companyPoints = [
  {
    label: "Registered office",
    icon: MapPin,
    text: "Flat No. 4A, Sayali Darshan A, Radha Nagar, Makhamalabad Road, Panchavati, Nashik - 422003",
  },
  {
    label: "Factory",
    icon: Factory,
    text: "S27, Ambad MIDC, Nashik - 422010",
  },
  {
    label: "Direct contact",
    icon: Phone,
    text: "+91 8806796868 | +91 9923810197 | sales@smartbuddy.co.in",
  },
];

const heroFacts = [
  { label: "Established", value: "2010" },
  { label: "Location", value: "Nashik, Maharashtra" },
  { label: "Focus", value: "Public utility engineering" },
];

function AboutPage({ onNavigateHome }) {
  return (
    <div className="about-page">
      <section className="about-page-hero">
        <div className="container about-page-hero-grid">
          <div className="about-page-copy" data-reveal>
            <div className="product-breadcrumb" aria-label="Breadcrumb">
              <button type="button" onClick={() => onNavigateHome("home")}>Home</button>
              <ArrowRight size={14} />
              <strong>About</strong>
            </div>
            <span className="eyebrow light">
              <Building2 size={15} /> Aarya Innovtech Pvt. Ltd.
            </span>
            <h1>Company profile built around public utility engineering.</h1>
            <p>
              Smart Buddy designs and manufactures hygiene-sector machines for sanitation,
              waste treatment, recycling, and kiosk deployments. We combine product engineering
              with practical execution for civic and institutional sites.
            </p>
            <div className="about-page-actions">
              <button className="button primary" type="button" onClick={() => onNavigateHome("contact")}>
                Contact team <ArrowRight size={17} />
              </button>
              <button className="button glass" type="button" onClick={() => onNavigateHome("solutions")}>
                Explore solutions
              </button>
            </div>
          </div>

          <aside className="about-page-summary" data-reveal>
            <div className="about-page-summary-grid">
              {heroFacts.map((fact) => (
                <div key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
            <p>
              Direct access to the founders keeps project scoping, procurement coordination, and
              delivery decisions close to the work.
            </p>
            <a href={`mailto:${directors[0].email}`} className="about-page-summary-link">
              <Mail size={14} /> ceo@smartbuddy.co.in
            </a>
            <a href={`tel:${directors[0].phone.replace(/\s+/g, "")}`} className="about-page-summary-link">
              <Phone size={14} /> +91 8806796868
            </a>
          </aside>
        </div>
      </section>

      <section className="about-leadership section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <em>Leadership</em>
            <h2>Directors</h2>
            <p>Aarya Innovtech Pvt. Ltd.</p>
          </div>
          <div className="about-leadership-list">
            {directors.map((director, index) => (
              <article className="about-director-card compact" data-reveal style={{ "--reveal-delay": `${index * 70}ms` }} key={director.name}>
                <img src={director.image} alt={director.name} />
                <div className="about-director-caption compact">
                  <span>{director.role}</span>
                  <h2>{director.name}</h2>
                  <strong>{director.company}</strong>
                  <p>{director.note}</p>
                  <div className="about-director-links">
                    <a href={`tel:${director.phone.replace(/\s+/g, "")}`}><Phone size={14} /> {director.phone}</a>
                    <a href={`mailto:${director.email}`}><Mail size={14} /> {director.email}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-profile section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <em>Profile</em>
            <h2>Company profile</h2>
            <p>
              Aarya Innovtech designs and manufactures public utility systems for sanitation,
              waste treatment, recycling, and kiosk deployments.
            </p>
          </div>
          <div className="about-profile-card-grid">
            {profileCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <article data-reveal style={{ "--reveal-delay": `${index * 70}ms` }} key={card.label}>
                  <Icon size={22} />
                  <span>{card.label}</span>
                  <strong>{card.title}</strong>
                  <p>{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-operations section">
        <div className="container about-leadership-grid">
          <article className="about-info-panel dark" data-reveal>
            <span className="eyebrow light">
              <Users size={15} /> Core focus
            </span>
            <h2>Built for sanitation, waste treatment, recycling, and service automation.</h2>
            <div className="about-list">
              <p>
                <BadgeCheck size={14} />
                Electronic ECO Toilets, Portable FRP Toilets, and Bio-Digester systems for public sanitation projects.
              </p>
              <p>
                <BadgeCheck size={14} />
                Organic waste composting and PET bottle recycling products for cleaner waste workflows.
              </p>
              <p>
                <BadgeCheck size={14} />
                Computer kiosks, vending systems, and other special purpose machines for institutional use.
              </p>
            </div>
          </article>

          <article className="about-info-panel" data-reveal>
            <span className="eyebrow">
              <ShieldCheck size={15} /> Operating model
            </span>
            <h2>One team for engineering, procurement, and commissioning.</h2>
            <div className="about-list">
              <p>
                <Factory size={14} />
                In-house manufacturing keeps the build controlled, consistent, and easier to support.
              </p>
              <p>
                <MapPin size={14} />
                Nashik-based production and office structure keeps documentation and logistics close.
              </p>
              <p>
                <Phone size={14} />
                Direct access to the founders for project scoping, pricing, and implementation decisions.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="about-awards section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <em>Capabilities</em>
            <h2>Product families that map to public infrastructure needs.</h2>
            <p>
              The portfolio is intentionally practical: each product family solves a specific
              sanitation, waste, or access problem for real-world deployments.
            </p>
          </div>
          <div className="about-awards-grid">
            {capabilityCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <article data-reveal style={{ "--reveal-delay": `${index * 70}ms` }} key={card.title}>
                  <span>{card.label}</span>
                  <Icon size={20} />
                  <strong>{card.title}</strong>
                  <p>{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-company section">
        <div className="container about-company-grid">
          <div className="about-company-copy" data-reveal>
            <span className="eyebrow">
              <Globe2 size={15} /> Footprint
            </span>
            <h2>Nashik-based manufacturing with a procurement-friendly structure.</h2>
            <p>
              The company serves a mix of municipal, institutional, and commercial deployments,
              with a clear focus on products that can be installed, operated, and maintained with
              minimal friction.
            </p>
            <p>
              That makes the business easier to understand for both technical buyers and
              procurement teams: the product line is broad, but the operating model stays simple.
            </p>
          </div>

          <div className="about-company-side" data-reveal>
            {companyPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div key={point.label}>
                  <span>
                    <Icon size={14} /> {point.label}
                  </span>
                  <p>{point.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-products section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <em>Portfolio</em>
            <h2>Product lines under one manufacturing umbrella.</h2>
            <p>
              The range is structured to support public hygiene, waste handling, and digital
              access without making the page feel crowded or promotional.
            </p>
          </div>
          <div className="about-product-grid">
            {portfolio.map((item, index) => (
              <article data-reveal style={{ "--reveal-delay": `${index * 45}ms` }} key={item}>
                <span>Product</span>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-page-cta">
        <div className="container about-page-cta-inner">
          <div data-reveal>
            <span className="eyebrow light">
              <Mail size={15} /> Next step
            </span>
            <h2>Talk to our team about a site, tender, or product requirement.</h2>
            <p>
              We can help you narrow the right product family, clarify deployment needs,
              and move from inquiry to implementation.
            </p>
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

export default AboutPage;
