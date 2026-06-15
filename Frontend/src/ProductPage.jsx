import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Factory,
  Leaf,
  Mail,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { productPageList } from "./productPages.js";

function ProductPage({ product, onNavigateHome, onNavigateProduct }) {
  const otherProducts = productPageList.filter((item) => item.slug !== product.slug);

  return (
    <div className="product-page">
      <section className="product-page-hero">
        <div className="container product-page-hero-grid">
          <div className="product-page-hero-copy" data-reveal>
            <div className="product-breadcrumb" aria-label="Breadcrumb">
              <button type="button" onClick={() => onNavigateHome("home")}>Home</button>
              <ChevronRight size={14} />
              <span>Products</span>
              <ChevronRight size={14} />
              <strong>{product.title}</strong>
            </div>
            <span className="eyebrow light"><Sparkles size={15} /> {product.eyebrow}</span>
            <h1>{product.title}</h1>
            <p>{product.summary}</p>
            <div className="product-page-hero-actions">
              <button className="button primary" type="button" onClick={() => onNavigateHome("contact")}>
                Enquire about this product <ArrowRight size={17} />
              </button>
              <button className="button glass" type="button" onClick={() => onNavigateHome("solutions")}>
                <ArrowLeft size={17} /> All solutions
              </button>
            </div>
            <div className="product-page-hero-signals">
              <span><CheckCircle2 size={15} /> OEM since 2010</span>
              <span><CheckCircle2 size={15} /> Site-ready deployment</span>
              <span><CheckCircle2 size={15} /> Service support</span>
            </div>
          </div>
          <div className="product-page-hero-image" data-reveal>
            <img src={product.image} alt={product.imageAlt} loading="eager" decoding="async" fetchPriority="high" />
            <span><CheckCircle2 size={16} /> Smart Buddy product</span>
            <div className="product-page-image-note">
              <small>Product line</small>
              <strong>{product.eyebrow}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="product-page-highlights section">
        <div className="container">
          <div className="section-heading split-heading" data-reveal>
            <div>
              <span className="eyebrow"><Leaf size={15} /> Product overview</span>
              <h2>Applications, build quality, and operating highlights.</h2>
            </div>
            <p>A structured view of where this product fits, how it is built, and which points matter during procurement.</p>
          </div>
          <div className="product-highlight-grid">
            {product.highlights.map((highlight, index) => (
              <article data-reveal style={{ "--reveal-delay": `${index * 75}ms` }} key={highlight.title}>
                <span>0{index + 1}</span>
                <h3>{highlight.title}</h3>
                <ul>
                  {highlight.items.map((item) => (
                    <li key={item}><CheckCircle2 size={15} /> {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="product-page-detail section">
        <div className="container product-page-detail-grid">
          <div className="product-page-detail-copy" data-reveal>
            <span className="eyebrow"><Factory size={15} /> Smart Buddy technology</span>
            <h2>{product.overviewTitle}</h2>
            {product.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="product-page-side-stack" data-reveal>
            {product.demoVideo && (
              <article className="product-video-card">
                <div className="product-video-card-media">
                  <video
                    src={product.demoVideo.src}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={product.demoVideo.title}
                  />
                </div>
                <div className="product-video-card-copy">
                  <span><PlayCircle size={15} /> {product.demoVideo.label}</span>
                  <strong>{product.demoVideo.title}</strong>
                </div>
              </article>
            )}
            <aside className="product-feature-card">
              <span className="eyebrow">{product.featureTitle}</span>
              <ul>
                {product.features.map((feature) => (
                  <li key={feature}><CheckCircle2 size={16} /> <span>{feature}</span></li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {product.process && (
        <section className="product-process">
          <div className="container" data-reveal>
            <span className="eyebrow light">Treatment flow</span>
            <h2>A simple on-site process.</h2>
            <div className="product-process-grid">
              {product.process.map((step, index) => (
                <React.Fragment key={step}>
                  <div>
                    <span>0{index + 1}</span>
                    <strong>{step}</strong>
                  </div>
                  {index < product.process.length - 1 && <ArrowRight size={22} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.specificationRows && (
        <section className="product-specifications section">
          <div className="container product-specification-grid">
            <div data-reveal>
              <span className="eyebrow"><Factory size={15} /> Product range</span>
              <h2>{product.specificationTitle}</h2>
              <p>Select the configuration that best fits your site. Our team can guide the final choice during your enquiry.</p>
            </div>
            <div className="product-table-wrap" data-reveal>
              <table>
                <thead>
                  <tr>
                    {product.specificationColumns.map((column) => <th key={column}>{column}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {product.specificationRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => <td key={cell}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="product-more section">
        <div className="container">
          <div className="product-more-heading" data-reveal>
            <div>
              <span className="eyebrow"><Sparkles size={15} /> More products</span>
              <h2>Explore another Smart Buddy solution.</h2>
            </div>
            <button className="text-link" type="button" onClick={() => onNavigateHome("contact")}>
              <Mail size={16} /> Talk to our team
            </button>
          </div>
          <div className="product-more-grid">
            {otherProducts.map((item, index) => (
              <button
                type="button"
                onClick={() => onNavigateProduct(item.slug)}
                data-reveal
                style={{ "--reveal-delay": `${index * 65}ms` }}
                key={item.slug}
              >
                <img src={item.image} alt={`${item.title} product preview`} loading="lazy" decoding="async" />
                <span>{item.eyebrow}</span>
                <strong>{item.title}</strong>
                <em>View product <ArrowRight size={15} /></em>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;

