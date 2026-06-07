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
  Globe2,
  Leaf,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  MessageCircle,
  Monitor,
  Phone,
  PlayCircle,
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
import AboutPage from "./AboutPage.jsx";
import ClientPage from "./ClientPage.jsx";
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
    eyebrow: "Original Equipment Manufacturer",
    title: "Ideas engineered into reality.",
    text: "Smart Buddy manufactures special purpose machines for the hygiene sector, including public sanitation, waste treatment, recycling, kiosks, and hygiene-support systems.",
    image: "/media/hero/smartbuddy-home-sanitation-block.jpeg",
  },
  {
    eyebrow: "Electronic ECO Toilet",
    title: "Self-cleaning public toilets for high-footfall places.",
    text: "E2T toilets support automatic flushing, pre-flush, floor and wall cleaning, smart access, backup systems, monitoring, and women-friendly hygiene options.",
    image: "/media/hero/smartbuddy-home-eco-toilet.png",
  },
  {
    eyebrow: "Bio-Digester technology",
    title: "On-site waste treatment without major infrastructure.",
    text: "Anaerobic bio-digestion uses AMI / DRDO bacteria and a Bio-Digester Tank to break waste into water, carbon dioxide, and methane.",
    image: "/media/hero/smartbuddy-home-park-installation.jpeg",
  },
];

const products = [
  {
    title: "Electronic ECO Toilet",
    short: "Maintainable public toilets with automatic flushing, floor and wall cleaning, smart access, and backup support.",
    text: "E2T toilets are self-cleaning public toilets with automatic flush, pre-flush, controlled access, power and water backup, monitoring, and women-friendly hygiene options.",
    icon: Droplets,
    tag: "Smart sanitation",
    accent: "blue",
    image: "/media/products/electronic-eco-toilet-new.png",
    pageSlug: "electronic-eco-toilet",
    features: ["Water saving", "IoT monitoring and SMS intimation", "24x7 surveillance with voice assistance"],
  },
  {
    title: "Portable FRP Toilet",
    short: "Portable FRP sanitation cabins with rugged, corrosion-free construction and overhead tank options.",
    text: "Portable FRP toilets are built for highways, malls, airports, railway stations, tourist places, Smart City locations, events, and site-based sanitation.",
    icon: Building2,
    tag: "Portable sanitation",
    accent: "mint",
    image: "/media/products/portable-frp-toilet-garden-new.jpeg",
    pageSlug: "portable-frp-toilet",
    features: ["Portable", "Unbreakable and long lasting", "Single seater, two seater, and urinal variants"],
  },
  {
    title: "Bio-Digester",
    short: "On-site, zero-waste treatment using anaerobic bacteria and a specially designed Bio-Digester Tank.",
    text: "The Bio-Digester breaks human waste into water, carbon dioxide, and methane without requiring a sewerage network or sewage treatment plant.",
    icon: Leaf,
    tag: "Waste treatment",
    accent: "teal",
    image: "/media/products/bio-digester-new.png",
    pageSlug: "bio-digester",
    features: ["No sewerage network or STP", "Pathogen reduction above 99%", "No de-sludging or moving parts"],
  },
  {
    title: "Organic Waste Composter",
    short: "A compact composting machine that converts biodegradable waste into organic compost within 24-36 hours.",
    text: "The composting machine uses mixing, churning, and crushing to process biodegradable waste in one machine.",
    icon: Leaf,
    tag: "Composting",
    accent: "lime",
    image: "/media/products/organic-waste-composter-new.png",
    pageSlug: "organic-waste-composter",
    features: ["25 to 2000 kg/day models", "No noise and no odour", "Fully automatic yet compact"],
  },
  {
    title: "PET Bottle Shredder",
    short: "Reverse vending and shredding for PET bottles, aluminium cans, and Tetra Pak waste.",
    text: "The PET Bottle Shredder and Reverse Vending Machine makes recycling convenient and incentivized with touch screen, cashback, cloud, IoT, and live tracking features.",
    icon: Store,
    tag: "Recycling",
    accent: "orange",
    image: "/media/products/pet-bottle-rvm-new.png",
    pageSlug: "pet-bottle-shredder",
    features: ["21 inch touch screen", "E-wallet cashback", "24x7 live machine tracking"],
  },
  {
    title: "Computer Kiosk",
    short: "A listed Smart Buddy special purpose machine for public-use and institutional digital workflows.",
    text: "Computer Kiosk is part of the Smart Buddy product range for configurable machine-led service access.",
    icon: Monitor,
    tag: "Digital access",
    accent: "violet",
    image: "/media/products/computer-health-kiosk-new.png",
    pageSlug: "computer-kiosk",
    features: ["Special purpose machine", "Configurable kiosk format", "Smart Buddy product family"],
  },
];

const bioFeatures = [
  { icon: Leaf, label: "Zero-waste process" },
  { icon: Droplets, label: "Non-toxic effluent" },
  { icon: Wrench, label: "No de-sludging" },
  { icon: Wind, label: "No foul smell" },
  { icon: Globe2, label: "No sewerage network or STP" },
];

const bioSpecifications = [
  ["Technology", "Anaerobic bio-digestion"],
  ["Bacteria", "AMI / DRDO bacteria"],
  ["Tank", "Bio-Digester Tank"],
  ["Installation", "Above or below ground"],
  ["Infrastructure", "No sewerage network or STP"],
  ["Output", "Water, CO2 and methane"],
  ["Pathogen reduction", "More than 99%"],
  ["Maintenance", "No moving parts"],
];

const stats = [
  { value: "2010", label: "Since", detail: "OEM in hygiene sector", icon: Award },
  { value: "500L", label: "Water tank", detail: "E2T overhead tank quantity", icon: Droplets },
  { value: ">99%", label: "Pathogen reduction", detail: "Bio-Digester hygiene performance", icon: ShieldCheck },
  { value: "24x7", label: "Surveillance", detail: "Voice assistance and anti-theft alarm", icon: Monitor },
];

const testimonials = [
  {
    quote:
      "E2T toilets support self-cleaning, automatic flushing, pre-flush, power backup, water backup, smart access, and women-friendly hygiene options.",
    name: "Electronic ECO Toilet",
    role: "Profile highlight",
  },
  {
    quote:
      "The Bio-Digester is an on-site, independent system that does not need a sewerage network, STP, or major infrastructure.",
    name: "Bio-Digester",
    role: "Profile highlight",
  },
  {
    quote:
      "PET Bottle Shredder and RVM systems make recycling convenient and incentivized through touch screen, cashback, cloud, IoT, and live tracking features.",
    name: "PET Bottle Shredder",
    role: "Profile highlight",
  },
];

const clientLogos = Array.from({ length: 8 }, (_, index) => {
  const filenames = ["1_1.png", "2.png", "3_1.png", "4.png", "5.png", "6.png", "7.png", "8.png"];
  return { src: `/images/${filenames[index]}`, alt: `Client partner ${index + 1}` };
});

const galleryFilters = ["All", "Bio Toilets", "Eco Toilets", "Utility Kiosks", "Technology"];

const galleryItems = [
  {
    title: "Modular bio toilet block",
    category: "Bio Toilets",
    image: "/media/bio-toilet-exterior-orange.jpeg",
    size: "featured",
  },
  {
    title: "Flagship configuration and plan",
    category: "Bio Toilets",
    image: "/media/bio-toilet-specifications-orange.jpeg",
    size: "side",
  },
  {
    title: "Bio toilet finish variations",
    category: "Bio Toilets",
    image: "/media/bio-toilet-five-variations.jpeg",
    size: "side",
  },
  {
    title: "Electronic eco toilet deployment",
    category: "Eco Toilets",
    image: "/media/eco-toilet-park.jpeg",
  },
  {
    title: "Ranchi civic installation",
    category: "Eco Toilets",
    image: "/media/eco-toilet-ranchi-twin.jpeg",
  },
  {
    title: "Eco toilet product walkthrough",
    category: "Eco Toilets",
    image: "/media/eco-toilet-park-clean.jpeg",
    video: "/media/smart-buddy-product-video.mp4",
    type: "video",
  },
  {
    title: "Public utility kiosk",
    category: "Utility Kiosks",
    image: "/media/public-utility-kiosk-render.jpeg",
  },
  {
    title: "Utility kiosk site concept",
    category: "Utility Kiosks",
    image: "/media/utility-kiosk-concept.jpeg",
  },
  {
    title: "Electronic toilet feature system",
    category: "Technology",
    image: "/media/electronic-eco-toilet-features.jpeg",
  },
];

const navLinks = [
  ["Home", "home"],
  ["Solutions", "solutions"],
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

const getClientRouteFromHash = () => /^#\/clients\/?$/.test(window.location.hash);
const getAboutRouteFromHash = () => /^#\/about\/?$/.test(window.location.hash);

const getChatReply = (message) => {
  const normalized = message.toLowerCase();

  if (normalized.includes("quote") || normalized.includes("price") || normalized.includes("cost")) {
    return "For an accurate quote, our team will need your location, expected usage, and preferred product. You can share the details on WhatsApp for a quick response.";
  }

  if (normalized.includes("bio") || normalized.includes("toilet") || normalized.includes("sanitation")) {
    return "For public sanitation, Electronic ECO Toilet, Portable FRP Toilet, and Bio-Digester are the best starting points. Tell me whether your site is a highway, mall, airport, railway station, tourist place, Smart City location, or another public site.";
  }

  if (normalized.includes("kiosk") || normalized.includes("computer") || normalized.includes("digital")) {
    return "Computer Kiosk is part of the Smart Buddy special purpose machine range. Our team can help you select a kiosk configuration for your public or institutional workflow.";
  }

  if (normalized.includes("waste") || normalized.includes("compost")) {
    return "The Organic Waste Composter processes biodegradable waste into compost within approximately 24-36 hours, with models from 25 kg/day to 2000 kg/day.";
  }

  if (normalized.includes("pet") || normalized.includes("bottle") || normalized.includes("recycle") || normalized.includes("shredder") || normalized.includes("rvm")) {
    return "The PET Bottle Shredder and Reverse Vending Machine handles PET bottles, aluminium cans, and Tetra Pak waste with touch screen, e-wallet cashback, cloud control, IoT, and live tracking.";
  }

  if (normalized.includes("frp") || normalized.includes("portable")) {
    return "Portable FRP Toilets are available as single seater, two seater, and urinal variants with rugged, corrosion-free, tamper-proof construction and overhead tank support.";
  }

  if (
    normalized.includes("team") ||
    normalized.includes("contact") ||
    normalized.includes("call") ||
    normalized.includes("whatsapp")
  ) {
    return "Our team is ready to help. Use the WhatsApp button below for a quick conversation, or call us at +91 8806796868 / +91 9923810197.";
  }

  if (normalized.includes("solution") || normalized.includes("help")) {
    return "Certainly. Tell me what you need help with: Electronic ECO Toilet, Portable FRP Toilet, Bio-Digester, Organic Waste Composter, PET Bottle Shredder, or Computer Kiosk.";
  }

  return "Thanks for your message. For the best recommendation, please tell me your requirement, project location, and expected daily usage.";
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [activeProductSlug, setActiveProductSlug] = useState(() => getProductSlugFromHash());
  const [activeClientPage, setActiveClientPage] = useState(() => getClientRouteFromHash());
  const [activeAboutPage, setActiveAboutPage] = useState(() => getAboutRouteFromHash());
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mailReady, setMailReady] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("All");
  const chatEndRef = useRef(null);
  const productMenuRef = useRef(null);
  const productMenuButtonRef = useRef(null);
  const activeProductPage = activeProductSlug ? productPages[activeProductSlug] : null;
  const visibleGalleryItems = galleryItems.filter((item) => activeGalleryFilter === "All" || item.category === activeGalleryFilter);

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
  }, [activeProductSlug, activeClientPage, activeAboutPage]);

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
  }, [activeProductSlug, activeClientPage, activeAboutPage]);

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
  }, [activeProductSlug, activeClientPage, activeAboutPage, testimonialIndex]);

  useEffect(() => {
    const syncRoute = () => {
      setActiveProductSlug(getProductSlugFromHash());
      setActiveClientPage(getClientRouteFromHash());
      setActiveAboutPage(getAboutRouteFromHash());
      setMenuOpen(false);
      setProductMenuOpen(false);
    };

    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  useEffect(() => {
    document.title = activeProductPage
      ? `${activeProductPage.title} | Smart Buddy`
      : activeClientPage
        ? "Clients | Smart Buddy"
        : activeAboutPage
          ? "About | Smart Buddy"
      : "Smart Buddy | Aarya Innovtech";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activeProductPage, activeClientPage, activeAboutPage]);

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
    if (sectionId === "about") {
      navigateToAbout();
      return;
    }

    if (sectionId === "clients") {
      navigateToClients();
      return;
    }

    setMenuOpen(false);
    setProductMenuOpen(false);

    if (activeProductSlug || activeClientPage || activeAboutPage) {
      window.history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
      setActiveProductSlug(null);
      setActiveClientPage(false);
      setActiveAboutPage(false);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        });
      });
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToAbout = () => {
    setMenuOpen(false);
    setProductMenuOpen(false);

    if (activeAboutPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = "/about";
  };

  const navigateToClients = () => {
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveAboutPage(false);

    if (activeClientPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = "/clients";
  };

  const navigateToProduct = (slug) => {
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveClientPage(false);
    setActiveAboutPage(false);
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

  const handleContact = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Website enquiry from ${form.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nPhone: ${form.get("phone")}\n\nMessage:\n${form.get("message")}`,
    );
    setMailReady(true);
    window.location.href = `mailto:sales@smartbuddy.co.in?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <header className={`site-header ${scrolled || activeAboutPage ? "is-scrolled" : ""}`}>
        <span className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        <div className="topline">
          <div className="container topline-inner">
            <p>Original Equipment Manufacturer of Special Purpose Machines in Hygiene Sector Since 2010</p>
            <div className="topline-links">
              <a href="mailto:sales@smartbuddy.co.in">
                <Mail size={14} /> sales@smartbuddy.co.in
              </a>
              <a href="tel:+918806796868">
                <Phone size={14} />
                <span className="desktop-phone">+91 8806796868 / +91 9923810197</span>
                <span className="mobile-phone">+91 8806796868</span>
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
                className={!activeProductPage && !activeClientPage && !activeAboutPage && activeSection === section ? "is-active" : ""}
                onClick={() => scrollToSection(section)}
                aria-current={!activeProductPage && !activeClientPage && !activeAboutPage && activeSection === section ? "page" : undefined}
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
                className={
                  section === "about" && activeAboutPage
                    ? "is-active"
                    : section === "clients" && activeClientPage
                      ? "is-active"
                      : !activeProductPage && !activeClientPage && !activeAboutPage && activeSection === section
                        ? "is-active"
                        : ""
                }
                onClick={() => scrollToSection(section)}
                aria-current={
                  (section === "about" && activeAboutPage) ||
                  (section === "clients" && activeClientPage) ||
                  (!activeProductPage && !activeClientPage && !activeAboutPage && activeSection === section)
                    ? "page"
                    : undefined
                }
                key={section}
              >
                {label}
              </button>
            ))}
            <a className="nav-login" href="https://smartbuddy.co.in/smartqr/" target="_blank" rel="noreferrer">
              Login <ArrowUpRight size={15} />
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
        ) : activeClientPage ? (
          <ClientPage onNavigateHome={scrollToSection} />
        ) : activeAboutPage ? (
          <AboutPage onNavigateHome={scrollToSection} />
        ) : (
          <>
          <section className="hero" id="home">
          <div className="hero-backgrounds">
            {heroSlides.map((slide, index) => (
              <img
                className={`hero-bg ${heroIndex === index ? "is-active" : ""}`}
                src={slide.image}
                alt=""
                key={slide.image}
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
              <div className="hero-mini-panel" aria-label="Smart Buddy quick highlights">
                <span><BadgeCheck size={14} /> OEM since 2010</span>
                <span><ShieldCheck size={14} /> ISO, CE, MPCB</span>
                <span><Factory size={14} /> Hygiene-sector machines</span>
              </div>
            </div>
            <div className="hero-card">
              <span className="hero-card-label"><BadgeCheck size={14} /> OEM since 2010</span>
              <div className="hero-card-icon">
                <ShieldCheck size={25} />
              </div>
              <p>Trusted manufacturing expertise</p>
              <strong>2010</strong>
              <span>OEM since in hygiene sector special purpose machines</span>
              <div className="hero-card-points">
                <span><CheckCircle2 size={13} /> Smart Buddy product range</span>
                <span><CheckCircle2 size={13} /> Nashik and Mumbai offices</span>
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
                    key={slide.image}
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
              <p><strong>OEM since 2010</strong><span>Special purpose machines</span></p>
            </div>
            <div>
              <Star size={23} />
              <p><strong>Hygiene sector range</strong><span>E2T, BDT, composter, RVM and kiosks</span></p>
            </div>
            <div>
              <Factory size={23} />
              <p><strong>Nashik, Mumbai and factory</strong><span>Public utility manufacturing base</span></p>
            </div>
          </div>
        </section>

        <section className="section solutions" id="solutions">
          <div className="container">
            <div className="section-heading split-heading" data-reveal>
              <div>
                <span className="eyebrow"><Leaf size={15} /> Smart Buddy portfolio</span>
                <h2>Special purpose machines for the <em>hygiene sector.</em></h2>
              </div>
              <p>
                The PDF profile lists Electronic ECO Toilet, Portable FRP Toilet, Bio-Digester, Organic Waste
                Composter, PET Bottle Shredder, and Computer Kiosk.
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
              <span className="eyebrow"><Sun size={15} /> Bio-Digester</span>
              <h2>On-site treatment without sewerage network or STP.</h2>
              <p>
                Anaerobic Bio-Digestion Technology uses bacteria to break down waste matter into usable water
                and gas. The zero-waste process is on-site, independent, and does not require major infrastructure.
              </p>
              <div className="bio-feature-grid">
                {bioFeatures.map(({ icon: Icon, label }) => (
                  <span key={label}><Icon size={18} /> {label}</span>
                ))}
              </div>
              <p className="configuration-note">
                The Bio-Digester Tank connects to the outlet of the toilet and can be installed above or below
                ground. AMI / DRDO bacteria treats sewage into effluent that is safe to discharge.
              </p>
            </div>
            <button
              className="flagship-image"
              data-reveal
              onClick={() => setSelectedMedia({
                title: "Bio-Digester tank system",
                category: "Bio-Digester",
                src: "/media/products/bio-digester-new.png",
                alt: "Bio-Digester tank and treatment system",
              })}
              aria-label="Open Bio-Digester image"
            >
              <img src="/media/products/bio-digester-new.png" alt="Bio-Digester tank and treatment system" />
              <span><Maximize2 size={17} /> View system</span>
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
              <span className="eyebrow light"><Award size={15} /> Profile highlights</span>
              <h2>Ideas engineered<br />into <em>reality.</em></h2>
              <p>Smart Buddy is an Original Equipment Manufacturer of special purpose machines in the hygiene sector since 2010.</p>
              <div className="impact-signals">
                <span><CheckCircle2 size={16} /> E2T automatic cleaning support</span>
                <span><Factory size={16} /> Nashik, Mumbai and Ambad MIDC</span>
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
                <img src="/media/eco-toilet-ranchi-twin.jpeg" alt="Installed Smart Buddy electronic eco toilets" />
              </div>
              <div className="mascot-card">
                <img src="/images/smart_buddy.png" alt="Smart Buddy mascot" />
              </div>
              <div className="experience-badge">
                <strong>2010</strong>
                <span>OEM since</span>
              </div>
            </div>
            <div className="about-copy" data-reveal>
              <span className="eyebrow"><Building2 size={15} /> About Smart Buddy</span>
              <h2>Original Equipment Manufacturer of special purpose machines.</h2>
              <p className="lead">
                Smart Buddy is presented in the profile as an OEM for hygiene-sector special purpose machines
                since 2010.
              </p>
              <p>
                The product range covers Electronic ECO Toilet, Portable FRP Toilet, Bio-Digester, Organic Waste
                Composter, PET Bottle Shredder and Reverse Vending Machine, and Computer Kiosk.
              </p>
              <div className="about-points">
                <div><BadgeCheck size={21} /><span><strong>Public-use systems</strong>Designed for highways, malls, airports, railway stations, tourist places, and Smart City locations</span></div>
                <div><Factory size={21} /><span><strong>Office and factory network</strong>Nashik Office, Mumbai Office, and Ambad MIDC factory listed in Maharashtra</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="project-gallery" aria-label="Product and project gallery">
          <div className="container">
            <div className="project-gallery-heading" data-reveal>
              <div>
                <span className="eyebrow"><Maximize2 size={15} /> Product and project gallery</span>
                <h2>Project and installation gallery.</h2>
              </div>
              <p>
                Explore modular configurations, installed eco toilets, community utility concepts, and the technology behind Smart Buddy solutions.
              </p>
            </div>
            <div className="project-gallery-toolbar" data-reveal>
              <div className="project-gallery-filters" aria-label="Gallery filters">
                {galleryFilters.map((filter) => (
                  <button
                    className={activeGalleryFilter === filter ? "is-active" : ""}
                    type="button"
                    onClick={() => setActiveGalleryFilter(filter)}
                    key={filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <span><strong>{String(visibleGalleryItems.length).padStart(2, "0")}</strong> curated projects</span>
            </div>
            <div className="project-gallery-grid" data-reveal>
              {visibleGalleryItems.map((item, index) => (
                <button
                  className={`project-gallery-card ${item.size ? `is-${item.size}` : ""}`}
                  type="button"
                  onClick={() => setSelectedMedia({
                    title: item.title,
                    category: item.category,
                    src: item.video || item.image,
                    alt: item.title,
                    type: item.type,
                    poster: item.image,
                  })}
                  style={{ "--reveal-delay": `${index * 45}ms` }}
                  data-reveal
                  key={item.title}
                >
                  <img src={item.image} alt="" />
                  <span className="project-gallery-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-gallery-expand">
                    {item.type === "video" ? <PlayCircle size={16} /> : <Maximize2 size={15} />}
                  </span>
                  <span className="project-gallery-caption">
                    <small>{item.category}</small>
                    <strong>{item.title}</strong>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="clients" id="clients">
          <div className="container">
            <div className="section-heading centered" data-reveal>
              <span className="eyebrow"><Users size={15} /> Our clients</span>
              <h2>Trusted by public-sector and institutional organizations.</h2>
            </div>
            <div className="client-grid">
              {clientLogos.map((logo, index) => (
                <div className="client-logo" style={{ "--reveal-delay": `${index * 45}ms` }} data-reveal key={logo.src}>
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
            <div className="client-preview-actions" data-reveal>
              <button className="button primary" type="button" onClick={navigateToClients}>
                View all clients <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>

        <section className="section testimonials">
          <div className="container testimonial-grid">
            <div className="testimonial-title" data-reveal>
              <span className="eyebrow"><MessageCircle size={15} /> Profile highlights</span>
              <h2>Technology notes from the Smart Buddy profile.</h2>
              <p>Key product statements from the PDF profile are summarized here for fast comparison.</p>
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
              <span className="eyebrow light"><Mail size={15} /> Contact Aarya Innovtech</span>
              <h2>Original Equipment Manufacturer of special purpose machines.</h2>
              <p>Share your requirement for Electronic ECO Toilet, Portable FRP Toilet, Bio-Digester, Organic Waste Composter, PET Bottle Shredder, or Computer Kiosk.</p>
              <div className="contact-benefits">
                <span><BadgeCheck size={15} /> OEM since 2010</span>
                <span><Wrench size={15} /> Hygiene-sector product range</span>
                <span><Globe2 size={15} /> Public utility deployments</span>
              </div>
              <div className="contact-details">
                <a href="tel:+918806796868"><i><Phone size={17} /></i><span><small>Call us</small>+91 8806796868 / +91 9923810197</span></a>
                <a href="mailto:sales@smartbuddy.co.in"><i><Mail size={17} /></i><span><small>Email us</small>sales@smartbuddy.co.in</span></a>
                <div><i><MapPin size={17} /></i><span><small>Nashik Office</small>Flat No.4A, Sayali Darshan -A-Wing.<br />Radha Nagar, Makhamalabad Road,<br />Panchavati, Nashik, Maharashtra-422003</span></div>
                <div><i><MapPin size={17} /></i><span><small>Mumbai Office</small>Flat No.C-03, The Maharashtra Chs Ltd.<br />C Wing Ground Floor, Ambekar Nagar,<br />G. D. Ambekar Mark, Parel Mumbai City,<br />Maharashtra - 400012</span></div>
                <div><i><Factory size={17} /></i><span><small>Factory</small>S-27, Near Emerson, Ambad MIDC,<br />Nashik, Maharashtra - 422010</span></div>
              </div>
            </div>
            <form className="contact-form" data-reveal onSubmit={handleContact}>
              <div className="contact-form-intro">
                <span>Product enquiry</span>
                <h3>Tell us your requirement.</h3>
                <p>Share a few details and our team will guide you toward the right Smart Buddy product.</p>
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
          <div><BadgeCheck size={20} /><span><strong>OEM since 2010</strong>Special purpose machines in hygiene sector</span></div>
          <div><Wrench size={20} /><span><strong>Smart Buddy range</strong>ECO Toilet, Bio-Digester, Composter, RVM and Kiosk</span></div>
          <div><MessageCircle size={20} /><span><strong>Office network</strong>Nashik Office, Mumbai Office and Ambad MIDC factory</span></div>
        </div>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/images/620e4382b29c9logo.png" alt="Smart Buddy" />
            <p>Original Equipment Manufacturer of Special Purpose Machines in Hygiene Sector since 2010.</p>
            <span>Ideas engineered into reality.</span>
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
        </div>
        <div className="container footer-bottom">
          <p>(c) {new Date().getFullYear()} Aarya Innovtech. All rights reserved.</p>
          <button onClick={() => activeProductPage || activeClientPage || activeAboutPage ? window.scrollTo({ top: 0, behavior: "smooth" }) : scrollToSection("home")} type="button">
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
            href="tel:+918806796868"
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
