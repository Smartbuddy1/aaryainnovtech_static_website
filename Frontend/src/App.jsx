import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Factory,
  Flame,
  Globe2,
  Images,
  Leaf,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  MessageCircle,
  Monitor,
  Phone,
  Play,
  Plus,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Sun,
  Users,
  Wind,
  Wrench,
  X,
} from "lucide-react";
import ProductPage from "./ProductPage.jsx";
import { productPages, productPageList } from "./productPages.js";

function WhatsAppIcon({ size = 24, ...props }) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.821 9.821 0 0 1 6.988 2.895 9.825 9.825 0 0 1 2.89 6.993c-.003 5.45-4.437 9.884-9.882 9.889m8.413-18.297A11.815 11.815 0 0 0 12.055 0C5.495 0 .16 5.335.157 11.893c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.689 1.448h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 0 0-3.488-8.413Z" />
    </svg>
  );
}

const heroSlides = [
  {
    eyebrow: "Modular bio toilet systems",
    title: "Public sanitation, thoughtfully engineered.",
    text: "Prefabricated, bio-digester-based toilet systems designed for high-footfall public spaces and dependable everyday use.",
    image: "/media/bio-toilet-exterior-orange.jpeg",
  },
  {
    eyebrow: "Electronic eco toilets",
    title: "Automation that keeps public spaces cleaner.",
    text: "Smart Buddy eco toilets combine compact deployment, controlled water use, ventilation, and automated cleaning support.",
    image: "/media/eco-toilet-park.jpeg",
  },
  {
    eyebrow: "Integrated public utility kiosks",
    title: "Useful spaces that serve communities better.",
    text: "Flexible public utility concepts bring sanitation and essential retail services together in one compact footprint.",
    image: "/media/public-utility-kiosk-render.jpeg",
  },
];

const products = [
  {
    title: "Modular Bio Toilet",
    short: "Prefabricated bio-toilet blocks for hygienic, low-maintenance public sanitation.",
    text: "A modular sanitation block designed for high-footfall locations. The flagship configuration combines a prefabricated steel structure, insulated panels, solar-ready roofing, LED lighting, and a bio-digester-based system.",
    icon: Building2,
    tag: "Flagship system",
    accent: "mint",
    image: "/media/bio-toilet-exterior-orange.jpeg",
    pageSlug: "bio-digester",
    features: ["Bio-digester-based system", "Solar-ready insulated roof", "Approx. 1000+ users per day"],
  },
  {
    title: "Electronic Eco Toilet",
    short: "Automated compact sanitation designed for cleaner, smarter public spaces.",
    text: "A compact electronic eco toilet built for public deployment. The supplied product design highlights a 1.5 litre flush tank, auto-cleaning floor support, scent-free experience, and high-efficiency ventilation.",
    icon: Droplets,
    tag: "Smart sanitation",
    accent: "blue",
    image: "/media/electronic-eco-toilet-features.jpeg",
    pageSlug: "electronic-eco-toilet",
    features: ["1.5 litre flush tank", "Auto-cleaning floor support", "High-efficiency ventilation"],
  },
  {
    title: "Public Utility Kiosk",
    short: "Flexible community infrastructure combining useful retail and sanitation spaces.",
    text: "A compact public utility concept designed to make community spaces more useful. Available concepts combine a shop, sanitation facilities, maintenance space, and public-facing amenities in one structured footprint.",
    icon: Store,
    tag: "Community utility",
    accent: "orange",
    image: "/media/public-utility-kiosk-render.jpeg",
    features: ["Integrated shop concept", "Public sanitation access", "Flexible site-ready layouts"],
  },
  {
    title: "Organic Waste Composter",
    short: "Convert organic waste into useful compost with a simple daily workflow.",
    text: "An efficient on-site composting machine for organizations looking to reduce waste movement and turn organic waste into a useful output.",
    icon: Leaf,
    tag: "Composting",
    accent: "lime",
    image: "/images/slide3.jpg",
    pageSlug: "organic-waste-composter",
    features: ["On-site waste processing", "Simple operating workflow", "Useful compost output"],
  },
  {
    title: "Computer Kiosk",
    short: "Accessible self-service terminals for faster, easier digital interactions.",
    text: "Self-service computer kiosks provide a practical way to bring essential digital services closer to the people who need them.",
    icon: Monitor,
    tag: "Digital access",
    accent: "violet",
    image: "/images/slide2.jpg",
    pageSlug: "computer-kiosk",
    features: ["User-friendly interface", "Self-service access", "Flexible deployment options"],
  },
  {
    title: "Sanitary Pad Incinerator",
    short: "Safe and practical disposal support for better menstrual hygiene.",
    text: "A thoughtful disposal solution for institutions seeking a cleaner, safer, and more dignified menstrual hygiene workflow.",
    icon: Flame,
    tag: "Hygiene",
    accent: "teal",
    image: "/images/bg3.jpg",
    features: ["Safe disposal workflow", "Compact institutional solution", "Supports better hygiene"],
  },
];

const bioFeatures = [
  { icon: Leaf, label: "Eco friendly" },
  { icon: Droplets, label: "Waterless solution" },
  { icon: Wrench, label: "Low maintenance" },
  { icon: Wind, label: "Hygienic and odorless" },
  { icon: Globe2, label: "Suitable for all locations" },
];

const bioSpecifications = [
  ["Size (L x W x H)", "9000 x 3000 x 3000 mm"],
  ["Structure", "Steel / prefabricated"],
  ["Wall panel", "Insulated panel"],
  ["Roof", "Insulated panel with solar panel"],
  ["Doors", "FRP / metal"],
  ["Lighting", "LED"],
  ["System", "Bio-digester based"],
  ["Capacity", "Approx. 1000+ users / day"],
];

const galleryFilters = ["All", "Bio Toilets", "Eco Toilets", "Utility Kiosks", "Technology"];

const galleryItems = [
  {
    title: "Modular bio toilet block",
    category: "Bio Toilets",
    src: "/media/bio-toilet-exterior-orange.jpeg",
    alt: "Orange modular Smart Buddy bio toilet block with solar panels",
  },
  {
    title: "Flagship configuration and plan",
    category: "Bio Toilets",
    src: "/media/bio-toilet-specifications-orange.jpeg",
    alt: "Bio toilet render with top view and specifications",
  },
  {
    title: "Bio toilet finish variations",
    category: "Bio Toilets",
    src: "/media/bio-toilet-five-variations.jpeg",
    alt: "Five finish variations for modular Smart Buddy bio toilets",
  },
  {
    title: "Electronic eco toilet deployment",
    category: "Eco Toilets",
    src: "/media/eco-toilet-park.jpeg",
    alt: "Installed Smart Buddy electronic eco toilet in a public park",
  },
  {
    title: "Ranchi civic installation",
    category: "Eco Toilets",
    src: "/media/eco-toilet-ranchi-twin.jpeg",
    alt: "Twin electronic eco toilet installation in Ranchi",
  },
  {
    title: "Eco toilet product walkthrough",
    category: "Eco Toilets",
    src: "/media/smart-buddy-product-video.mp4",
    poster: "/media/eco-toilet-ranchi-single.jpeg",
    alt: "Smart Buddy product walkthrough video",
    type: "video",
  },
  {
    title: "Public utility kiosk",
    category: "Utility Kiosks",
    src: "/media/public-utility-kiosk-render.jpeg",
    alt: "Smart Buddy public utility kiosk with shop and sanitation facilities",
  },
  {
    title: "Utility kiosk site concept",
    category: "Utility Kiosks",
    src: "/media/utility-kiosk-concept.jpeg",
    alt: "Public utility kiosk concept with shop and sanitation spaces",
  },
  {
    title: "Electronic toilet feature system",
    category: "Technology",
    src: "/media/electronic-eco-toilet-features.jpeg",
    alt: "Electronic eco toilet feature diagram",
  },
];

const stats = [
  { value: "30+", label: "Awards earned", detail: "Recognized innovation", icon: Award },
  { value: "40K+", label: "Units completed", detail: "Solutions delivered", icon: Factory },
  { value: "20+", label: "States reached", detail: "Across India", icon: MapPin },
  { value: "10K+", label: "Happy clients", detail: "Relationships built", icon: Users },
];

const testimonials = [
  {
    quote:
      "Since introducing Smart Buddy bio septic tanks, performance has been excellent and we have seen a meaningful improvement in the quality of outlet water.",
    name: "Mr. Darshan",
    role: "Darshan Industry",
  },
  {
    quote:
      "Hospital septic overflow used to be a major concern. Since adopting the Smart Buddy bio-digester, the maintenance burden has reduced significantly.",
    name: "Dr. Gayatri",
    role: "More Hospital",
  },
  {
    quote:
      "The outlet water is transparent and we are free from unnecessary cleaning expenditure. Smart Buddy has given us a practical, dependable solution.",
    name: "Nilesh Patil",
    role: "CEO, NPIT Solutions",
  },
];

const clientLogos = Array.from({ length: 8 }, (_, index) => {
  const filenames = ["1_1.png", "2.png", "3_1.png", "4.png", "5.png", "6.png", "7.png", "8.png"];
  return { src: `/images/${filenames[index]}`, alt: `Client partner ${index + 1}` };
});

const navLinks = [
  ["Home", "home"],
  ["Solutions", "solutions"],
  ["Projects", "projects"],
  ["About", "about"],
  ["Achievements", "achievements"],
  ["Clients", "clients"],
  ["Contact", "contact"],
];

const initialChatMessages = [
  {
    role: "assistant",
    text: "Hello. I can help you find the right Smart Buddy solution or connect you with our team.",
  },
];

const chatPrompts = [
  { label: "Find a solution", message: "Help me find the right solution." },
  { label: "Request a quote", message: "I would like to request a quote." },
  { label: "Talk to the team", message: "I want to talk to your team." },
];

const getProductSlugFromHash = () => {
  const match = window.location.hash.match(/^#\/products\/([^/?]+)/);
  const slug = match ? decodeURIComponent(match[1]) : null;
  return slug && productPages[slug] ? slug : null;
};

const getChatReply = (message) => {
  const normalized = message.toLowerCase();

  if (normalized.includes("quote") || normalized.includes("price") || normalized.includes("cost")) {
    return "For an accurate quote, our team will need your location, expected usage, and preferred product. You can share the details on WhatsApp for a quick response.";
  }

  if (normalized.includes("bio") || normalized.includes("toilet") || normalized.includes("sanitation")) {
    return "For public sanitation, our Modular Bio Toilet and Electronic Eco Toilet are the best starting points. Tell me whether your site is a public space, institution, or private facility.";
  }

  if (normalized.includes("kiosk") || normalized.includes("shop") || normalized.includes("utility")) {
    return "Our Public Utility Kiosk combines useful community services with a compact, site-ready layout. Our team can help you select the right configuration.";
  }

  if (normalized.includes("waste") || normalized.includes("compost")) {
    return "The Organic Waste Composter is designed for on-site waste processing with a simple daily workflow. Tell us your approximate daily waste volume for guidance.";
  }

  if (
    normalized.includes("team") ||
    normalized.includes("contact") ||
    normalized.includes("call") ||
    normalized.includes("whatsapp")
  ) {
    return "Our team is ready to help. Use the WhatsApp button below for a quick conversation, or call us at +91 99238 10197.";
  }

  if (normalized.includes("solution") || normalized.includes("help")) {
    return "Certainly. Tell me what you need help with: public sanitation, a utility kiosk, organic waste management, digital access, or hygiene disposal.";
  }

  return "Thanks for your message. For the best recommendation, please tell me your requirement, project location, and expected daily usage.";
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [activeProductSlug, setActiveProductSlug] = useState(() => getProductSlugFromHash());
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mailReady, setMailReady] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const chatEndRef = useRef(null);
  const productMenuRef = useRef(null);
  const productMenuButtonRef = useRef(null);
  const activeProductPage = activeProductSlug ? productPages[activeProductSlug] : null;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 20);
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeProductSlug]);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-38% 0px -54%", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [activeProductSlug]);

  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("motion-ready");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeProductSlug, galleryFilter, testimonialIndex]);

  useEffect(() => {
    const syncProductRoute = () => {
      setActiveProductSlug(getProductSlugFromHash());
      setMenuOpen(false);
      setProductMenuOpen(false);
    };

    window.addEventListener("hashchange", syncProductRoute);
    window.addEventListener("popstate", syncProductRoute);
    return () => {
      window.removeEventListener("hashchange", syncProductRoute);
      window.removeEventListener("popstate", syncProductRoute);
    };
  }, []);

  useEffect(() => {
    document.title = activeProductPage
      ? `${activeProductPage.title} | Smart Buddy`
      : "Smart Buddy | Aarya Innovtech";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activeProductPage]);

  useEffect(() => {
    document.body.style.overflow = selectedProduct || selectedMedia ? "hidden" : "";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
        setSelectedMedia(null);
        setMenuOpen(false);
        setProductMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProduct, selectedMedia]);

  useEffect(() => {
    if (!productMenuOpen) return undefined;

    const onPointerDown = (event) => {
      if (!productMenuRef.current?.contains(event.target)) {
        setProductMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [productMenuOpen]);

  useEffect(() => {
    if (chatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatOpen]);

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    setProductMenuOpen(false);

    if (activeProductSlug) {
      window.history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
      setActiveProductSlug(null);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        });
      });
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToProduct = (slug) => {
    setMenuOpen(false);
    setProductMenuOpen(false);
    if (activeProductSlug === slug) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = `/products/${slug}`;
  };

  const openProduct = (product) => {
    if (product.pageSlug) {
      navigateToProduct(product.pageSlug);
      return;
    }
    setSelectedProduct(product);
  };

  const moveTestimonial = (direction) => {
    setTestimonialIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  const moveHero = (direction) => {
    setHeroIndex((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  const sendChatMessage = (message) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setChatMessages((current) => [
      ...current,
      { role: "user", text: trimmedMessage },
      { role: "assistant", text: getChatReply(trimmedMessage) },
    ]);
    setChatInput("");
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();
    sendChatMessage(chatInput);
  };

  const visibleGalleryItems = galleryFilter === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === galleryFilter);

  const handleContact = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Website enquiry from ${form.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nPhone: ${form.get("phone")}\n\nMessage:\n${form.get("message")}`,
    );
    setMailReady(true);
    window.location.href = `mailto:sales@aaryainnovtech.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <span className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        <div className="topline">
          <div className="container topline-inner">
            <p>Eco-friendly technology for healthier communities</p>
            <div className="topline-links">
              <a href="mailto:sales@aaryainnovtech.com">
                <Mail size={14} /> sales@aaryainnovtech.com
              </a>
              <a href="tel:+919923810197">
                <Phone size={14} /> +91 99238 10197
              </a>
            </div>
          </div>
        </div>
        <nav className="container navbar" aria-label="Main navigation">
          <button className="brand" onClick={() => scrollToSection("home")} aria-label="Go to home">
            <img src="/images/620e4382b29c9logo.png" alt="Smart Buddy" />
          </button>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {navLinks.slice(0, 2).map(([label, section]) => (
              <button
                className={!activeProductPage && activeSection === section ? "is-active" : ""}
                onClick={() => scrollToSection(section)}
                aria-current={!activeProductPage && activeSection === section ? "page" : undefined}
                key={section}
              >
                {label}
              </button>
            ))}
            <div className={`nav-product ${productMenuOpen ? "is-open" : ""}`} ref={productMenuRef}>
              <button
                className={activeProductPage ? "is-active" : ""}
                type="button"
                onClick={() => setProductMenuOpen((open) => !open)}
                aria-expanded={productMenuOpen}
                aria-haspopup="true"
                ref={productMenuButtonRef}
              >
                Products <ChevronDown size={14} />
              </button>
              <div className="nav-product-menu">
                {productPageList.map((product) => (
                  <button
                    className={activeProductSlug === product.slug ? "is-active" : ""}
                    type="button"
                    onClick={() => {
                      navigateToProduct(product.slug);
                      productMenuButtonRef.current?.focus();
                    }}
                    key={product.slug}
                  >
                    {product.navLabel} <ArrowRight size={14} />
                  </button>
                ))}
              </div>
            </div>
            {navLinks.slice(2).map(([label, section]) => (
              <button
                className={!activeProductPage && activeSection === section ? "is-active" : ""}
                onClick={() => scrollToSection(section)}
                aria-current={!activeProductPage && activeSection === section ? "page" : undefined}
                key={section}
              >
                {label}
              </button>
            ))}
            <a className="nav-login" href="https://smartbuddy.co.in/smartqr/" target="_blank" rel="noreferrer">
              Partner Login <ArrowUpRight size={15} />
            </a>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      <main>
        {activeProductPage ? (
          <ProductPage
            product={activeProductPage}
            onNavigateHome={scrollToSection}
            onNavigateProduct={navigateToProduct}
          />
        ) : (
          <>
          <section className="hero" id="home">
          <div className="hero-backgrounds">
            {heroSlides.map((slide, index) => (
              <img
                className={`hero-bg ${heroIndex === index ? "is-active" : ""}`}
                src={slide.image}
                alt=""
                key={slide.title}
              />
            ))}
          </div>
          <div className="hero-overlay" />
          <div className="container hero-inner">
            <div className="hero-copy" key={heroIndex}>
              <span className="eyebrow light">
                <Sparkles size={15} /> {heroSlides[heroIndex].eyebrow}
              </span>
              <h1>{heroSlides[heroIndex].title}</h1>
              <p>{heroSlides[heroIndex].text}</p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => scrollToSection("solutions")}>
                  Explore solutions <ArrowRight size={18} />
                </button>
                <button className="button glass" onClick={() => scrollToSection("contact")}>
                  Talk to our team
                </button>
              </div>
            </div>
            <div className="hero-card">
              <span className="hero-card-label"><BadgeCheck size={14} /> QCI-approved OEM</span>
              <div className="hero-card-icon">
                <ShieldCheck size={25} />
              </div>
              <p>Trusted manufacturing expertise</p>
              <strong>16+ years</strong>
              <span>in industrial automation and hygiene products</span>
              <div className="hero-card-points">
                <span><CheckCircle2 size={13} /> Listed on GeM</span>
                <span><CheckCircle2 size={13} /> Made in Nashik</span>
              </div>
            </div>
          </div>
          <div className="container hero-bottom">
            <div className="hero-pagination">
              <div className="hero-dots" aria-label="Hero slides">
                {heroSlides.map((slide, index) => (
                  <button
                    className={heroIndex === index ? "is-active" : ""}
                    onClick={() => setHeroIndex(index)}
                    aria-label={`Show slide ${index + 1}`}
                    key={slide.title}
                  />
                ))}
              </div>
              <span className="hero-count">0{heroIndex + 1}<em>/</em>0{heroSlides.length}</span>
            </div>
            <div className="hero-bottom-actions">
              <p>Scroll to discover <span /></p>
              <div className="hero-arrows">
                <button onClick={() => moveHero(-1)} aria-label="Previous hero slide"><ChevronLeft size={18} /></button>
                <button onClick={() => moveHero(1)} aria-label="Next hero slide"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="container intro-grid" data-reveal>
            <div>
              <BadgeCheck size={23} />
              <p><strong>QCI-approved OEM</strong><span>Listed on GeM portal</span></p>
            </div>
            <div>
              <Star size={23} />
              <p><strong>4.5+ GeM rating</strong><span>Trusted public-sector partner</span></p>
            </div>
            <div>
              <Factory size={23} />
              <p><strong>Made in Nashik</strong><span>Engineered for Indian conditions</span></p>
            </div>
          </div>
        </section>

        <section className="section solutions" id="solutions">
          <div className="container">
            <div className="section-heading split-heading" data-reveal>
              <div>
                <span className="eyebrow"><Leaf size={15} /> Our solutions</span>
                <h2>Practical innovation for <em>everyday impact.</em></h2>
              </div>
              <p>
                Smart Buddy brings sanitation, waste management, and self-service technologies together in one
                thoughtful portfolio.
              </p>
            </div>
            <div className="solutions-grid">
              {products.map((product, index) => {
                const Icon = product.icon;
                return (
                  <article
                    className={`solution-card accent-${product.accent}`}
                    style={{ "--card-image": `url(${product.image})`, "--reveal-delay": `${index * 65}ms` }}
                    data-reveal
                    key={product.title}
                  >
                    <div className="solution-top">
                      <span className="solution-number">0{index + 1}</span>
                      <div className="solution-icon"><Icon size={25} /></div>
                    </div>
                    <span className="solution-tag">{product.tag}</span>
                    <h3>{product.title}</h3>
                    <p>{product.short}</p>
                    <button onClick={() => openProduct(product)}>
                      Explore solution <ArrowRight size={16} />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="feature-panel flagship">
          <div className="container flagship-grid">
            <div className="flagship-copy" data-reveal>
              <span className="eyebrow"><Sun size={15} /> Flagship modular configuration</span>
              <h2>Bio toilets built for high-footfall public spaces.</h2>
              <p>
                The Smart Buddy modular bio toilet is designed as a practical sanitation block for civic spaces,
                institutions, campuses, and public facilities. The prefabricated structure supports faster deployment
                while keeping everyday operation simple.
              </p>
              <div className="bio-feature-grid">
                {bioFeatures.map(({ icon: Icon, label }) => (
                  <span key={label}><Icon size={18} /> {label}</span>
                ))}
              </div>
              <p className="configuration-note">
                The specification below represents the showcased flagship configuration. Final layouts can be
                adapted to site requirements.
              </p>
            </div>
            <button className="flagship-image" data-reveal onClick={() => setSelectedMedia(galleryItems[1])} aria-label="Open bio toilet specification image">
              <img src="/media/bio-toilet-specifications-orange.jpeg" alt="Smart Buddy bio toilet configuration with top-view plan" />
              <span><Maximize2 size={17} /> View configuration</span>
            </button>
          </div>
          <div className="container specification-grid" data-reveal>
            {bioSpecifications.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="impact" id="achievements">
          <div className="impact-bg" />
          <div className="container impact-inner">
            <div className="impact-heading" data-reveal>
              <span className="eyebrow light"><Award size={15} /> Proven impact</span>
              <h2>Designed with purpose.<br />Delivered with <em>pride.</em></h2>
              <p>More than a decade of focused R&amp;D, manufacturing, and practical deployment across India.</p>
              <div className="impact-signals">
                <span><CheckCircle2 size={16} /> 10+ years of focused R&amp;D</span>
                <span><Factory size={16} /> Made for Indian conditions</span>
              </div>
            </div>
            <div className="stats-grid">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <article className="stat" style={{ "--reveal-delay": `${index * 80}ms` }} data-reveal key={stat.label}>
                    <div className="stat-topline">
                      <i><Icon size={17} /></i>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                    </div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                    <p>{stat.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container about-grid">
            <div className="about-visual" data-reveal>
              <div className="about-image">
                <img src="/media/eco-toilet-ranchi-twin.jpeg" alt="Installed Smart Buddy electronic eco toilets in Ranchi" />
              </div>
              <div className="mascot-card">
                <img src="/images/smart_buddy.png" alt="Smart Buddy mascot" />
              </div>
              <div className="experience-badge">
                <strong>10+</strong>
                <span>years of pioneering enterprise</span>
              </div>
            </div>
            <div className="about-copy" data-reveal>
              <span className="eyebrow"><Building2 size={15} /> About Aarya Innovtech</span>
              <h2>Engineering a cleaner future, one solution at a time.</h2>
              <p className="lead">
                Smart Buddy is the eco-innovation brand of Aarya Innovtech Pvt. Ltd., headquartered in Nashik,
                Maharashtra.
              </p>
              <p>
                We research, manufacture, and supply eco-friendly hygiene products and special-purpose machines.
                Our work is guided by total quality management, customer focus, and teamwork, with a commitment to
                reliable systems that solve practical problems.
              </p>
              <div className="about-points">
                <div><BadgeCheck size={21} /><span><strong>Authorized OEM</strong>Approved by QCI on Government e-Marketplace</span></div>
                <div><Factory size={21} /><span><strong>Focused manufacturing</strong>Built with advanced machines and quality checks</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="container">
            <div className="section-heading split-heading" data-reveal>
              <div>
                <span className="eyebrow"><Images size={15} /> Product and project gallery</span>
                <h2>From concept to <em>public impact.</em></h2>
              </div>
              <p>
                Explore modular configurations, installed eco toilets, community utility concepts, and the
                technology behind Smart Buddy solutions.
              </p>
            </div>
            <div className="gallery-toolbar" data-reveal>
              <div className="gallery-filters" aria-label="Gallery filters">
                {galleryFilters.map((filter) => (
                  <button
                    className={galleryFilter === filter ? "is-active" : ""}
                    onClick={() => setGalleryFilter(filter)}
                    aria-pressed={galleryFilter === filter}
                    key={filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <p className="gallery-summary">
                <span>{String(visibleGalleryItems.length).padStart(2, "0")}</span>
                {galleryFilter === "All" ? "Curated projects" : galleryFilter}
              </p>
            </div>
            <div className="project-grid">
              {visibleGalleryItems.map((item, index) => (
                <button
                  className={`project-card ${galleryFilter === "All" && index === 0 ? "is-featured" : ""}`}
                  style={{ "--reveal-delay": `${index * 55}ms` }}
                  data-reveal
                  onClick={() => setSelectedMedia(item)}
                  key={item.src}
                >
                  <img src={item.poster || item.src} alt={item.alt} />
                  <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-overlay">
                    <small>{item.category}</small>
                    <strong>{item.title}</strong>
                    <em>{item.type === "video" ? "Watch walkthrough" : "View project"}</em>
                  </span>
                  <span className="project-action">
                    {item.type === "video" ? <Play size={18} fill="currentColor" /> : <Maximize2 size={18} />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="clients" id="clients">
          <div className="container">
            <div className="section-heading centered" data-reveal>
              <span className="eyebrow"><Users size={15} /> Trusted partnerships</span>
              <h2>Supported by organizations that <em>choose impact.</em></h2>
            </div>
            <div className="client-grid">
              {clientLogos.map((logo, index) => (
                <div className="client-logo" style={{ "--reveal-delay": `${index * 45}ms` }} data-reveal key={logo.src}>
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section testimonials">
          <div className="container testimonial-grid">
            <div className="testimonial-title" data-reveal>
              <span className="eyebrow"><MessageCircle size={15} /> Client stories</span>
              <h2>Trusted where it <em>matters most.</em></h2>
              <p>Real feedback from organizations using Smart Buddy solutions in their everyday operations.</p>
              <div className="testimonial-controls">
                <button onClick={() => moveTestimonial(-1)} aria-label="Previous testimonial"><ChevronLeft /></button>
                <button onClick={() => moveTestimonial(1)} aria-label="Next testimonial"><ChevronRight /></button>
              </div>
            </div>
            <article className="testimonial-card" data-reveal key={testimonialIndex}>
              <Quote size={42} />
              <p>{testimonials[testimonialIndex].quote}</p>
              <div>
                <span className="avatar">{testimonials[testimonialIndex].name.charAt(0)}</span>
                <div>
                  <strong>{testimonials[testimonialIndex].name}</strong>
                  <span>{testimonials[testimonialIndex].role}</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <span className="eyebrow light"><Mail size={15} /> Start a conversation</span>
              <h2>Let's build a cleaner, <em>smarter future.</em></h2>
              <p>Tell us what you are planning. Our team will help you identify the right Smart Buddy solution.</p>
              <div className="contact-benefits">
                <span><BadgeCheck size={15} /> Practical guidance</span>
                <span><Wrench size={15} /> Built for your site</span>
                <span><Globe2 size={15} /> Pan-India support</span>
              </div>
              <div className="contact-details">
                <a href="tel:+919923810197"><i><Phone size={17} /></i><span><small>Call us</small>+91 99238 10197</span></a>
                <a href="mailto:sales@aaryainnovtech.com"><i><Mail size={17} /></i><span><small>Email us</small>sales@aaryainnovtech.com</span></a>
                <div><i><MapPin size={17} /></i><span><small>Registered office</small>4A, Sayali Darshan A, Radha Nagar,<br />Panchavati, Nashik - 422003</span></div>
              </div>
            </div>
            <form className="contact-form" data-reveal onSubmit={handleContact}>
              <div className="contact-form-intro">
                <span>Project enquiry</span>
                <h3>Tell us what you need.</h3>
                <p>Share a few details and our team will guide you toward the right solution.</p>
              </div>
              <div className="contact-form-row">
                <div>
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" placeholder="Full name" required />
                </div>
                <div>
                  <label htmlFor="phone">Phone number</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91" required />
                </div>
              </div>
              <div>
                <label htmlFor="message">How can we help?</label>
                <textarea id="message" name="message" rows="4" placeholder="Tell us about your requirement" required />
              </div>
              <button className="button dark" type="submit">Send enquiry <ArrowRight size={18} /></button>
              <p className="contact-form-privacy"><ShieldCheck size={14} /> Your details are used only to respond to your enquiry.</p>
              {mailReady && <p className="form-note">Your email app has been opened with the enquiry details.</p>}
            </form>
          </div>
        </section>
          </>
        )}
      </main>

      <footer>
        <div className="container footer-assurance">
          <div><BadgeCheck size={20} /><span><strong>QCI-approved OEM</strong>Quality-focused manufacturing</span></div>
          <div><Wrench size={20} /><span><strong>Engineered in Nashik</strong>Built for dependable daily use</span></div>
          <div><MessageCircle size={20} /><span><strong>Guidance when you need it</strong>Talk directly with our team</span></div>
        </div>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/images/620e4382b29c9logo.png" alt="Smart Buddy" />
            <p>Eco-friendly hygiene and waste-management systems engineered in Nashik, Maharashtra.</p>
            <span>Smarter sanitation. Thoughtfully built.</span>
          </div>
          <div>
            <h3>Explore</h3>
            {navLinks.slice(1).map(([label, section]) => (
              <button onClick={() => scrollToSection(section)} key={section}>{label}</button>
            ))}
          </div>
          <div>
            <h3>Solutions</h3>
            {productPageList.map((product) => (
              <button onClick={() => navigateToProduct(product.slug)} key={product.slug}>{product.title}</button>
            ))}
          </div>
          <div>
            <h3>Factory</h3>
            <p>D104/1 M.I.D.C. Ambad,<br />Nashik - 422010</p>
            <a href="mailto:sales@aaryainnovtech.com">sales@aaryainnovtech.com</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>(c) {new Date().getFullYear()} Aarya Innovtech Pvt. Ltd. All rights reserved.</p>
          <button onClick={() => activeProductPage ? window.scrollTo({ top: 0, behavior: "smooth" }) : scrollToSection("home")} type="button">
            Back to top <ArrowUpRight size={14} />
          </button>
        </div>
      </footer>

      <div className={`floating-actions ${actionsOpen ? "is-open" : ""} ${chatOpen ? "is-chat-hidden" : ""}`}>
        <div className="floating-actions-menu" id="floating-contact-actions">
          <button
            className="floating-button chatbot"
            onClick={() => {
              setChatOpen(true);
              setActionsOpen(false);
            }}
            type="button"
            aria-controls="smart-buddy-chat"
            aria-hidden={chatOpen}
            tabIndex={chatOpen ? -1 : undefined}
            aria-label="Open Smart Buddy assistant"
          >
            <MessageCircle size={21} />
            <span className="chatbot-status" />
          </button>
          <a
            className="floating-button whatsapp"
            href="https://api.whatsapp.com/send?phone=918806796868"
            target="_blank"
            rel="noreferrer"
            onClick={() => setActionsOpen(false)}
            aria-hidden={chatOpen}
            tabIndex={chatOpen ? -1 : undefined}
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon size={25} />
          </a>
          <a
            className="floating-button call"
            href="tel:+919923810197"
            onClick={() => setActionsOpen(false)}
            aria-hidden={chatOpen}
            tabIndex={chatOpen ? -1 : undefined}
            aria-label="Call Aarya Innovtech"
          >
            <Phone size={21} />
          </a>
        </div>
        <button
          className="floating-actions-toggle"
          onClick={() => setActionsOpen((open) => !open)}
          type="button"
          aria-expanded={actionsOpen}
          aria-controls="floating-contact-actions"
          aria-hidden={chatOpen}
          tabIndex={chatOpen ? -1 : undefined}
          aria-label={actionsOpen ? "Hide contact options" : "Show contact options"}
        >
          <Plus size={22} />
          <span className="floating-actions-pulse" />
        </button>
      </div>

      <section
        className={`chatbot-panel ${chatOpen ? "is-open" : ""}`}
        id="smart-buddy-chat"
        aria-label="Smart Buddy assistant"
        aria-hidden={!chatOpen}
      >
        <div className="chatbot-header">
          <div className="chatbot-avatar"><MessageCircle size={19} /></div>
          <div>
            <strong>Smart Buddy Assistant</strong>
            <span><i /> Online to guide you</span>
          </div>
          <button type="button" onClick={() => setChatOpen(false)} aria-label="Close Smart Buddy assistant"><X size={17} /></button>
        </div>
        <div className="chatbot-body" aria-live="polite">
          <p className="chatbot-note">Typically replies instantly</p>
          {chatMessages.map((message, index) => (
            <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
              {message.role === "assistant" && <MessageCircle size={14} />}
              <p>{message.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {chatMessages.length === 1 && (
          <div className="chatbot-prompts">
            {chatPrompts.map((prompt) => (
              <button type="button" onClick={() => sendChatMessage(prompt.message)} key={prompt.label}>{prompt.label}</button>
            ))}
          </div>
        )}
        <a
          className="chatbot-whatsapp"
          href="https://api.whatsapp.com/send?phone=918806796868&text=Hello%20Smart%20Buddy%20team%2C%20I%20need%20help%20with%20a%20solution."
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon size={16} /> Continue with our team
        </a>
        <form className="chatbot-composer" onSubmit={handleChatSubmit}>
          <input
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            type="text"
            placeholder="Type your requirement..."
            aria-label="Type your message"
          />
          <button type="submit" aria-label="Send message"><Send size={16} /></button>
        </form>
        <p className="chatbot-footer">Powered by Smart Buddy</p>
      </section>

      {selectedProduct && (
        <div className="modal-backdrop" onMouseDown={() => setSelectedProduct(null)}>
          <article className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product details"><X /></button>
            <div className={`modal-icon accent-${selectedProduct.accent}`}>
              <selectedProduct.icon size={30} />
            </div>
            <span className="solution-tag">{selectedProduct.tag}</span>
            <h2 id="modal-title">{selectedProduct.title}</h2>
            {selectedProduct.image && <img className="modal-product-image" src={selectedProduct.image} alt={selectedProduct.title} />}
            <p>{selectedProduct.text}</p>
            <div className="modal-features">
              {selectedProduct.features.map((feature) => (
                <span key={feature}><CheckCircle2 size={17} /> {feature}</span>
              ))}
            </div>
            <button className="button primary" onClick={() => { setSelectedProduct(null); scrollToSection("contact"); }}>
              Enquire about this product <ArrowRight size={17} />
            </button>
          </article>
        </div>
      )}

      {selectedMedia && (
        <div className="modal-backdrop media-backdrop" onMouseDown={() => setSelectedMedia(null)}>
          <article className="media-modal" role="dialog" aria-modal="true" aria-labelledby="media-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMedia(null)} aria-label="Close media viewer"><X /></button>
            {selectedMedia.type === "video" ? (
              <video src={selectedMedia.src} poster={selectedMedia.poster} controls autoPlay playsInline />
            ) : (
              <img src={selectedMedia.src} alt={selectedMedia.alt} />
            )}
            <div className="media-caption">
              <span>{selectedMedia.category}</span>
              <h2 id="media-title">{selectedMedia.title}</h2>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

export default App;
