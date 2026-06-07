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

const clientRecords = [
  {
    filename: "11.jpeg",
    label: "Government of Maharashtra",
    website: "https://www.maharashtra.gov.in/",
  },
  {
    filename: "22.jpeg",
    label: "Government of NCT of Delhi",
    website: "https://delhi.gov.in/",
  },
  {
    filename: "33.jpg",
    label: "Government of Gujarat",
    website: "https://www.gujarat.gov.in/",
  },
  {
    filename: "44.png",
    label: "Government of Gujarat",
    website: "https://www.gujarat.gov.in/",
  },
  {
    filename: "55.png",
    label: "Delhi Government",
    website: "https://delhi.gov.in/",
  },
  {
    filename: "66.jpg",
    label: "Ministry of Home Affairs",
    website: "https://www.mha.gov.in/",
  },
  {
    filename: "77.jpg",
    label: "Ministry of Civil Aviation",
    website: "https://www.civilaviation.gov.in/",
  },
  {
    filename: "88.png",
    label: "Ministry of Textiles",
    website: "https://texmin.nic.in/",
  },
  {
    filename: "99.jpg",
    label: "Ministry of Education",
    website: "https://www.education.gov.in/",
  },
  {
    filename: "10.png",
    label: "Government of Kerala",
    website: "https://www.kerala.gov.in/",
  },
  {
    filename: "101.jpg",
    label: "Airports Authority of India",
    website: "https://www.aai.aero/",
  },
  {
    filename: "102.png",
    label: "Ministry of Finance",
    website: "https://www.finmin.nic.in/",
  },
  {
    filename: "103.jpg",
    label: "Defence Research and Development Organisation",
    website: "https://www.drdo.gov.in/",
  },
  {
    filename: "104.jpg",
    label: "Indian Army",
    website: "https://www.indianarmy.nic.in/",
  },
  {
    filename: "105.png",
    label: "Border Security Force",
    website: "https://bsf.gov.in/",
  },
  {
    filename: "106.jpg",
    label: "Department of Agriculture, Kerala",
    website: "https://keralaagriculture.gov.in/",
  },
  {
    filename: "107.png",
    label: "Central Reserve Police Force",
    website: "https://crpf.gov.in/",
  },
  {
    filename: "108.png",
    label: "Indian Railways",
    website: "https://indianrailways.gov.in/",
  },
  {
    filename: "109.png",
    label: "Government of Madhya Pradesh",
    website: "https://www.mp.gov.in/",
  },
  {
    filename: "110.jpg",
    label: "Ministry of Coal",
    website: "https://www.coal.nic.in/",
  },
  {
    filename: "111.png",
    label: "Government of Bihar",
    website: "https://state.bihar.gov.in/",
  },
  {
    filename: "112.png",
    label: "Government of Punjab",
    website: "https://punjab.gov.in/",
  },
  {
    filename: "113.png",
    label: "Government of Odisha",
    website: "https://odisha.gov.in/",
  },
  {
    filename: "114.png",
    label: "Government of Tamil Nadu",
    website: "https://www.tn.gov.in/",
  },
  {
    filename: "115.jpg",
    label: "Government of Telangana",
    website: "https://www.telangana.gov.in/",
  },
  {
    filename: "116.jpg",
    label: "Kendriya Bhandar",
    website: "https://www.kendriyabhandar.org/",
  },
  {
    filename: "117.png",
    label: "Government of Uttar Pradesh",
    website: "https://up.gov.in/",
  },
  {
    filename: "118.png",
    label: "Hindustan Petroleum",
    website: "https://www.hindustanpetroleum.com/",
  },
  {
    filename: "119.jpg",
    label: "Government of Jharkhand",
    website: "https://www.jharkhand.gov.in/",
  },
  {
    filename: "120.jpg",
    label: "Hindustan Aeronautics Limited",
    website: "https://hal-india.co.in/",
  },
  {
    filename: "121.jpg",
    label: "Reliance Industries Limited",
    website: "https://www.ril.com/",
  },
  {
    filename: "122.png",
    label: "State Bank of India",
    website: "https://sbi.co.in/",
  },
  {
    filename: "123.png",
    label: "Power Grid Corporation of India",
    website: "https://www.powergrid.in/",
  },
  {
    filename: "124.jpg",
    label: "Seva Automotive",
    website: "https://www.marutiseva.com/",
  },
  {
    filename: "125.png",
    label: "Smart Cities Mission",
    website: "https://smartcities.gov.in/",
  },
  {
    filename: "126.png",
    label: "Coal India Limited",
    website: "https://www.coalindia.in/",
  },
].map((client) => ({
  ...client,
  src: `/client/images/${client.filename}`,
}));

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
                  <img src={client.src} alt={client.label} />
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
                <img src={client.src} alt={client.label} />
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
