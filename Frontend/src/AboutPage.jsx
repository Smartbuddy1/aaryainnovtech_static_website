import React from "react";
import { ArrowRight, Building2, MapPin, Eye, Target } from "lucide-react";

const companyFacts = [
  { label: "Company", value: "Aarya Innovtech Pvt. Ltd." },
  { label: "Brand Name", value: "SMART BUDDY" },
  { label: "Head Office", value: "Nashik, Maharashtra" },
  { label: "Awards", value: "30+" },
  { label: "Units Completed", value: "40,000+" },
  { label: "States Present", value: "20+" },
  { label: "Happy Clients", value: "10,000+" },
];

function AboutPage({ onNavigateHome }) {
  return (
    <main className="about-modern">
      <section className="about-modern-hero">
        <div className="container">
          <div className="product-breadcrumb about-modern-breadcrumb" aria-label="Breadcrumb">
            <button type="button" onClick={() => onNavigateHome("home")}>
              Home
            </button>
            <ArrowRight size={14} />
            <strong>About Us</strong>
          </div>
          <span className="eyebrow light">
            <Building2 size={15} /> Aarya Innovtech Pvt. Ltd.
          </span>
          <h1>About Company</h1>
        </div>
      </section>

      <section className="about-modern-content">
        <div className="container about-modern-grid">
          <article className="about-modern-story" data-reveal>
            <p>
              <strong>Aarya Innovtech Pvt. Ltd.</strong> represents more than a decade of pioneering enterprises headquartered in Nashik, Maharashtra, India. We are renowned for introducing several Special Purpose Machines in India for the first time. As a leading manufacturer and supplier, our main line of business revolves around a comprehensive array of eco-friendly hygiene products. The Director of the company brings considerable experience in industrial automation and hygiene products spanning over 16 years. Our extensive product range includes ELECTRONIC ECO TOILETS, BIO-DIGESTERS, ORGANIC WASTE COMPOSTERS, VENDING MACHINES, REVERSE VENDING MACHINES, and COMPUTER KIOSKS. All our products are fabricated using advanced technology, adhering to international standards to ensure highly reliable functioning.
            </p>
            <p>
              Under our flagship registered trademark and brand name, <strong>‘SMART BUDDY’</strong>, we deliver innovative solutions for personal and public hygiene. We focus heavily on the quality of our products and render timely service to achieve full customer satisfaction. Our business is driven by simplistic, indigenous technology that is accessible, flexible, low-cost, and reliable. This approach is harvested directly from our passion for innovation and commitment to robust research & development. Our uniqueness lies in developing products that address every single requirement in the most cost-effective way, without ever compromising on quality.
            </p>
            <p>
              Aarya Innovtech Pvt. Ltd. specializes in research and development, focusing primarily on manufacturing a wide range of eco-friendly, hygienic products of international quality. We are strong believers in Total Quality Management, Customer Focus, and Team Work, which has led to our products winning several prestigious awards. We are proudly certified with <strong>ISO 9001:2015</strong>, <strong>CE</strong>, and <strong>MPCB</strong>.
            </p>
            <p>
              Furthermore, Aarya Innovtech Pvt. Ltd. is an authorized OEM approved by the Quality Council of India (QCI) on the Government e-Marketplace (GeM) portal, consistently maintaining high ratings of 4.5+.
            </p>
          </article>

          <aside className="about-modern-facts" data-reveal>
            {companyFacts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </aside>


        </div>
      </section>

      <section className="about-modern-vmo">
        <div className="container">
          <div className="vmo-grid" data-reveal>
            <article className="vmo-card">
              <div className="vmo-icon">
                <Eye size={24} />
              </div>
              <h2>Our Vision</h2>
              <p>
                To redefine the future of sustainable infrastructure through world-class engineering, intelligent manufacturing, and breakthrough innovations that enrich lives, protect the environment, and inspire a smarter, cleaner world.
              </p>
            </article>
            <article className="vmo-card">
              <div className="vmo-icon">
                <Target size={24} />
              </div>
              <h2>Our Mission</h2>
              <p>
                At Aarya Innovtech Pvt. Ltd., our mission is to engineer excellence by designing and manufacturing innovative, sustainable, and technology-driven solutions that create lasting value for society. We are committed to delivering uncompromising quality, fostering continuous innovation, exceeding customer expectations, empowering our people, and conducting business with integrity while contributing to a cleaner, healthier, and more sustainable world.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
