import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Home,
  Images,
  PackageCheck,
  Settings,
  SlidersHorizontal,
  Users,
  Wrench,
} from "lucide-react";
import { productPageList } from "./productPages.js";
import { deduplicateImages } from "./utils/galleryUtils.js";

const infoIcons = {
  features: Settings,
  applications: Users,
  benefits: PackageCheck,
  customization: SlidersHorizontal,
};

const getDownloadItem = (item) => {
  if (typeof item === "string") {
    return { label: item };
  }

  return item;
};

function ProductPage({ product, onNavigateHome, onNavigateProduct }) {
  const galleryImages = useMemo(
    () => deduplicateImages(product.galleryImages?.length ? product.galleryImages : [{ src: product.image, alt: product.imageAlt }]),
    [product]
  );
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  const otherProducts = useMemo(
    () => productPageList.filter((item) => item.slug !== product.slug).slice(0, 4),
    [product.slug],
  );

  useEffect(() => {
    setActiveImage(galleryImages[0]);
  }, [galleryImages, product.slug]);



  return (
    <div className="product-category-page">
      <section className="product-category-breadcrumb">
        <div className="container">
          <button type="button" onClick={() => onNavigateHome("home")}>
            <Home size={14} /> Home
          </button>
          <ChevronRight size={14} />
          <button type="button" onClick={() => onNavigateHome("products")}>Products</button>
          <ChevronRight size={14} />
          <span>{product.title}</span>
        </div>
      </section>

      <section className="product-category-hero">
        <div className="container product-category-hero-grid">
          <div className="product-category-media" data-reveal>
            <figure className="product-category-main-image">
              <img src={activeImage.src} alt={activeImage.alt} loading="eager" decoding="async" fetchpriority="high" />
            </figure>
            {galleryImages.length > 1 && (
              <div className="product-category-thumbs" aria-label={`${product.title} images`}>
                {galleryImages.map((image) => (
                  <button
                    className={activeImage.src === image.src ? "is-active" : ""}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    key={image.id || image.src}
                  >
                    <img src={image.src} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-category-copy" data-reveal>
            <h1>{product.title}</h1>
            <strong>{product.subtitle}</strong>
            <p>{product.summary}</p>
            <ul className="product-category-checks">
              {(product.heroPoints ?? []).map((point) => (
                <li key={point}><CheckCircle2 size={17} /> <span>{point}</span></li>
              ))}
            </ul>
            <div className="product-category-actions">
              {!product.hideBrochure && (
                product.brochureUrl ? (
                  <a className="button primary" href={product.brochureUrl} download={product.brochureFilename}>
                    <Download size={17} /> Download Brochure
                  </a>
                ) : (
                  <button className="button primary" type="button" onClick={() => onNavigateHome("contact")}>
                    <Download size={17} /> Download Brochure
                  </button>
                )
              )}
              <button className="button outline-dark" type="button" onClick={() => onNavigateHome("contact")}>
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="product-category-info">
        <div className="container product-category-info-grid">
          {(product.infoCards ?? []).map((card) => {
            const Icon = infoIcons[card.type] ?? Wrench;

            return (
              <article className="product-category-info-card" data-reveal="card" key={card.title}>
                <Icon size={28} />
                <div>
                  <h2>{card.title}</h2>
                  <p>{card.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>


      <section className="product-category-more">
        <div className="container">
          <div className="product-category-more-heading">
            <h2>Other Product Categories</h2>
            <button type="button" onClick={() => onNavigateHome("products")}>
              View all products <ArrowRight size={16} />
            </button>
          </div>
          <div className="product-category-more-grid">
            {otherProducts.map((item) => (
              <button type="button" onClick={() => onNavigateProduct(item.slug)} key={item.slug}>
                <img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
                <span>{item.subtitle}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
