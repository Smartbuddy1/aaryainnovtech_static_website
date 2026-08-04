import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import SEO from "./components/SEO.jsx";
import {
  ArrowRight,
  ArrowUp,
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Facebook,
  Factory,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  Monitor,
  Phone,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Users,
  Wind,
  Wrench,
  Twitter,
  X,
} from "lucide-react";
import { clientRecords } from "./clientRecords.js";
import { productPages, productPageList } from "./productPages.js";
import {
  carouselItemVariants,
  footerRevealVariants,
  heroContainerVariants,
  heroItemVariants,
  heroVisualVariants,
  dropdownItemVariants,
  navbarInnerVariants,
  navbarLinksVariants,
  navbarSectionVariants,
  navbarVariants,
  pageTransitionVariants,
  productDropdownVariants,
  viewportOnce,
} from "./utils/animations.js";

const LOADER_SESSION_KEY = "aarya-innovtech-loader-seen";
const ROUTE_RELOAD_KEY = "aarya-innovtech-route-reload";
const ROUTE_IMPORT_ERROR = /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Importing a module script failed|dynamically imported module/i;

const isRouteImportError = (error) => {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return ROUTE_IMPORT_ERROR.test(message);
};

const clearRouteReloadFlag = () => {
  try {
    window.sessionStorage.removeItem(ROUTE_RELOAD_KEY);
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
};

const reloadForFreshRouteAssets = () => {
  try {
    if (window.sessionStorage.getItem(ROUTE_RELOAD_KEY)) {
      return false;
    }
    window.sessionStorage.setItem(ROUTE_RELOAD_KEY, "1");
  } catch {
    // Fall through to reload; a single automatic reload is still better than a blank route.
  }

  window.location.reload();
  return true;
};

const lazyWithRetry = (importer) =>
  lazy(async () => {
    try {
      const module = await importer();
      clearRouteReloadFlag();
      return module;
    } catch (error) {
      if (!isRouteImportError(error)) {
        throw error;
      }

      await new Promise((resolve) => window.setTimeout(resolve, 450));

      try {
        const module = await importer();
        clearRouteReloadFlag();
        return module;
      } catch (retryError) {
        if (isRouteImportError(retryError) && reloadForFreshRouteAssets()) {
          return new Promise(() => { });
        }
        throw retryError;
      }
    }
  });

const importAboutPage = () => import("./AboutPage.jsx");
const importAchievementPage = () => import("./AchievementPage.jsx");
const importCareerPage = () => import("./CareerPage.jsx");
const importClientPage = () => import("./ClientPage.jsx");
const importContactPage = () => import("./ContactPage.jsx");
const importGalleryPage = () => import("./GalleryPage.jsx");
const importProductPage = () => import("./ProductPage.jsx");
const importPrivacyPolicyPage = () => import("./PrivacyPolicyPage.jsx");
const importLeafletLocationMap = () => import("./LeafletLocationMap.jsx");

const AboutPage = lazyWithRetry(importAboutPage);
const AchievementPage = lazyWithRetry(importAchievementPage);
const CareerPage = lazyWithRetry(importCareerPage);
const ClientPage = lazyWithRetry(importClientPage);
const ContactPage = lazyWithRetry(importContactPage);
const GalleryPage = lazyWithRetry(importGalleryPage);
const ProductPage = lazyWithRetry(importProductPage);
const PrivacyPolicyPage = lazyWithRetry(importPrivacyPolicyPage);
const LeafletLocationMap = lazyWithRetry(importLeafletLocationMap);

const preloadedModules = new Set();
const preloadedImages = new Set();

const preloadModule = (key, importer) => {
  if (preloadedModules.has(key)) {
    return Promise.resolve();
  }

  preloadedModules.add(key);
  return importer().catch(() => {
    preloadedModules.delete(key);
  });
};

const preloadImageAsset = (src) => {
  if (typeof window === "undefined" || !src || preloadedImages.has(src)) {
    return;
  }

  preloadedImages.add(src);
  const image = new window.Image();
  image.decoding = "async";
  image.src = src;
};

const scheduleIdleTask = (callback, timeout = 1200) => {
  if (typeof window === "undefined") {
    return () => { };
  }

  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = window.setTimeout(callback, Math.min(timeout, 560));
  return () => window.clearTimeout(timeoutId);
};

const getCountParts = (value) => {
  const match = value.match(/(\d+)/);
  if (!match) {
    return { prefix: "", number: 0, suffix: value };
  }

  return {
    prefix: value.slice(0, match.index),
    number: Number(match[1]),
    suffix: value.slice(match.index + match[1].length),
  };
};

function CountValue({ value, active = true }) {
  const { prefix, number, suffix } = getCountParts(value);
  const [displayValue, setDisplayValue] = useState(active ? number : 0);

  useEffect(() => {
    if (!active) return undefined;

    const duration = Math.min(2600, Math.max(1400, number * 3.2));
    const startTime = window.performance.now();
    let frameId;

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.round(number * eased));
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [active, number, value]);

  return (
    <>
      {prefix}
      {displayValue}
      {suffix}
    </>
  );
}

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.05 2a9.9 9.9 0 0 0-8.48 15.02L2.5 21.5l4.6-1.04A9.9 9.9 0 1 0 12.05 2Zm0 1.86a8.04 8.04 0 0 1 0 16.08 7.98 7.98 0 0 1-4.16-1.16l-.34-.2-2.33.53.55-2.25-.23-.36a8.04 8.04 0 0 1 6.51-12.64Zm-3.45 4.3c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.66 2.66 4.11 3.62 2.03.8 2.44.64 2.88.6.44-.04 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46Z" />
    </svg>
  );
}

const aaryaInnovtechLogo = "/images/aarya-innovtech-logo-640.png";
const aaryaInnovtechHeaderLogo = "/images/aarya-innovtech-navbar-tight.png";
const heroBackgroundImage = "/media/hero/beach-toilet-hero.jpg";
const newImage = (file) => `/new%20images/${file}`;
const productImage = (file) => `/media/products/product-page-images/${file}`;

const heroSlides = [
  {
    eyebrow: "Original Equipment Manufacturer",
    title: "Ideas engineered into reality.",
    text: (
      <>
        Aarya Innovtech manufactures special purpose machines<br />
        for the hygiene sector, including public sanitation,<br />
        waste treatment, recycling, kiosks, and hygiene-support systems.<br />
        Built for public spaces and institutions,<br />
        our solutions combine practical engineering with dependable daily performance.
      </>
    ),
    image: newImage("11-eco-toilet-ranchi-twin-1200x800.jpg"),
  },
{
  eyebrow: "Electronic ECO Toilet",
    title: "Self-cleaning public toilets for high-footfall places.",
      text: "E2T toilets support automatic flushing, pre-flush, floor and wall cleaning, smart access, backup systems, monitoring, and women-friendly hygiene options.",
        image: newImage("11-eco-toilet-ranchi-twin-1200x800.jpg"),
  },
{
  eyebrow: "Smart public sanitation",
    title: "Compact hygiene systems for modern public spaces.",
      text: "Electronic ECO Toilet installations are designed for gardens, public facilities, campuses, commercial areas, and municipal locations.",
        image: newImage("09-eco-toilet-park-clean-1200x800.jpg"),
  },
{
  eyebrow: "Municipal-ready installations",
    title: "Reliable toilet blocks for local bodies and public projects.",
      text: "Our sanitation units support practical deployment with clear access, strong branding, clean utility panels, and dependable day-to-day operation.",
        image: newImage("10-eco-toilet-ranchi-single-1200x800.jpg"),
  },
{
  eyebrow: "High-footfall hygiene",
    title: "Scalable public toilet infrastructure built for real sites.",
      text: "From single units to multi-cabin installations, Aarya Innovtech delivers clean, maintainable, and site-ready sanitation systems.",
        image: newImage("01-bio-toilet-exterior-orange-1200x800.jpg"),
  },
];



const newArrivalProduct = {
  eyebrow: "New arrival",
  title: "Solar-ready smart toilet block",
  text: "A compact public toilet block concept with men, women, and accessible cabins, exterior lighting, rooftop solar support, and Aarya Innovtech branding for civic locations.",
  image: newImage("13-public-utility-kiosk-render-1200x800.jpg"),
  images: [
    {
      src: newImage("13-public-utility-kiosk-render-1200x800.jpg"),
      alt: "Red smart toilet and shop block render with male, female, and maintenance area entrances",
      label: "Retail utility block",
    },
    {
      src: newImage("15-utility-kiosk-plan-1200x800.jpg"),
      alt: "Top view concept drawing of public toilet block with shop and jogging track",
      label: "Top view plan",
    },
    {
      src: newImage("14-utility-kiosk-concept-1200x800.jpg"),
      alt: "Shop and toilet block concept with public walkway and restroom doors",
      label: "Shop and toilet concept",
    },
    {
      src: newImage("01-bio-toilet-exterior-orange-1200x800.jpg"),
      alt: "Bio toilet concept board with exterior render, plan view, features, and specifications",
      label: "Bio toilet plan",
    },
  ],
  highlights: ["Solar-ready roof", "Accessible cabin", "Men and women layout"],
};

const products = [
  {
    title: "Electronic ECO Toilet",
    short: "Maintainable public toilets with automatic flushing, pre-flush, floor and wall cleaning, backup, and controlled entry.",
    text: "Electronic ECO Toilets are maintainable public toilets with self-cleaning mechanisms, automatic flushing, automatic pre-flush, power and water backup, IoT monitoring, surveillance, and women-friendly hygiene options.",
    icon: Droplets,
    tag: "Public sanitation",
    accent: "blue",
    image: "/imagesss/toilet 1.jpeg",
    heroImage: "/imagesss/toilet 1.jpeg",
    thumb: "/imagesss/toilet 1.jpeg",
    pageSlug: "electronic-eco-toilet",
    features: ["Water saving", "Floor hygiene with pressurized cleaning", "IoT monitoring and SMS intimation"],
  },
  {
    title: "Bio-Digester",
    short: "On-site waste treatment using anaerobic bio-digestion technology and a specially designed Bio-Digester Tank.",
    text: "Bio-Digester uses Anaerobic Microbial Inoculum and a Bio-Digester Tank to treat human waste into water, carbon dioxide, methane, and safe liquid effluent without sewerage network or STP dependency.",
    icon: Leaf,
    tag: "Waste treatment",
    accent: "teal",
    image: productImage("bio-digester-new-thumb-product-1000x600.webp"),
    thumb: productImage("bio-digester-new-thumb-product-1000x600.webp"),
    pageSlug: "bio-digester",
    features: ["No sewerage network or STP", "Pathogen reduction above 99%", "No de-sludging or moving parts"],
  },
  {
    title: "Organic Waste Composter",
    short: "Composting machine that converts biodegradable waste into high quality organic compost within 24-36 hours.",
    text: "Organic Waste Composter uses geared motor mixing and churning plus high-speed crushing to break down biodegradable waste into compost in one compact machine.",
    icon: Leaf,
    tag: "Composting",
    accent: "lime",
    image: productImage("organic-waste-composter-new-thumb-product-1000x600.webp"),
    thumb: productImage("organic-waste-composter-new-thumb-product-1000x600.webp"),
    pageSlug: "organic-waste-composter",
    features: ["25 to 2000 kg/day models", "No noise, no odor and no maintenance", "In-built temperature management"],
  },
  {
    title: "PET Bottle Shredder / RVM",
    short: "Reverse vending and shredding machine for PET bottles, aluminium cans, and Tetra Pak waste.",
    text: "PET Bottle Shredder and Reverse Vending Machine supports efficient recycling with object verification, mild steel body, hardened alloy steel cutter, touch screen, e-wallet cashback, cloud control, IoT integration, and live tracking.",
    icon: Store,
    tag: "Recycling",
    accent: "orange",
    image: productImage("pet-bottle-rvm-new-thumb-product-1000x600.webp"),
    thumb: productImage("pet-bottle-rvm-new-thumb-product-1000x600.webp"),
    pageSlug: "pet-bottle-shredder",
    features: ["21 inch touch screen", "E-wallet cashback", "24X7 live machine tracking"],
  },
  {
    title: "Computer Kiosk",
    short: "Listed special purpose machine category from the company profile.",
    text: "Computer Kiosk is listed in the profile as part of Aarya Innovtech's special purpose machine range. The PDF does not provide separate technical specifications, so configuration should be finalized by requirement.",
    icon: Monitor,
    tag: "Digital access",
    accent: "violet",
    image: productImage("computer-kiosk-product-1000x600.webp"),
    thumb: productImage("computer-kiosk-product-1000x600.webp"),
    pageSlug: "computer-kiosk",
    features: ["Listed product category", "Special purpose machine", "Requirement-based configuration"],
  },
  {
    title: "Vending Machines",
    short: "Listed hygiene-sector machine category with sanitary pad vending support for women-friendly toilet sites.",
    text: "Vending Machines are listed in the profile product range. The Electronic ECO Toilet section mentions sanitary pad vending machines as a women-friendly feature for E2T deployments.",
    icon: Store,
    tag: "Hygiene vending",
    accent: "blue",
    image: "/imagesss/food vending machines.png",
    thumb: "/imagesss/food vending machines.png",
    pageSlug: "vending-machines",
    features: ["Listed product category", "Sanitary pad vending option", "Women-friendly E2T support"],
  },

];

const heroCarouselProducts = products.slice(0, 4);

const preloadRouteBundle = (routeKey) => {
  switch (routeKey) {
    case "about":
      return preloadModule("route-about", importAboutPage);
    case "achievements":
      return preloadModule("route-achievements", importAchievementPage);
    case "career":
      return preloadModule("route-career", importCareerPage);
    case "clients":
      return preloadModule("route-clients", importClientPage);
    case "contact":
      return preloadModule("route-contact", importContactPage);
    case "gallery":
      return preloadModule("route-gallery", importGalleryPage);
    case "privacy-policy":
      return preloadModule("route-privacy-policy", importPrivacyPolicyPage);
    case "product":
      return preloadModule("route-product", importProductPage);
    case "map":
      return preloadModule("route-map", importLeafletLocationMap);
    default:
      return Promise.resolve();
  }
};

const preloadHomeAssets = () => {
  [
    aaryaInnovtechLogo,
    aaryaInnovtechHeaderLogo,
    heroBackgroundImage,
    heroSlides[0]?.image,
    (products[0]?.heroImage || products[0]?.image),
  ].forEach(preloadImageAsset);
};

const solutionJourneys = [
  {
    label: "Public hygiene",
    title: "Cleaner high-footfall access points",
    text: "For gardens, transit areas, campuses, civic spaces, and public toilets that need dependable daily operation.",
    pageSlug: "electronic-eco-toilet",
    icon: Droplets,
    image: "/imagesss/toilet 1.jpeg",
    thumb: "/imagesss/toilet 1.jpeg",
    points: ["Self-cleaning", "IoT-ready", "Water conscious"],
  },
  {
    label: "Waste treatment",
    title: "On-site sanitation without heavy civil work",
    text: "Bio-digestion helps sites treat human waste locally when sewerage networks or STP access are limited.",
    pageSlug: "bio-digester",
    icon: Leaf,
    image: productImage("bio-digester-new-thumb-product-1000x600.webp"),
    thumb: productImage("bio-digester-new-thumb-product-1000x600.webp"),
    points: ["No STP dependency", "Low maintenance", "Zero-waste process"],
  },
  {
    label: "Composting",
    title: "Convert organic waste into compost",
    text: "Compact machines for institutions and communities that want a cleaner biodegradable waste workflow.",
    pageSlug: "organic-waste-composter",
    icon: Wind,
    image: productImage("organic-waste-composter-new-thumb-product-1000x600.webp"),
    thumb: productImage("organic-waste-composter-new-thumb-product-1000x600.webp"),
    points: ["24-36 hours", "Odour controlled", "Scalable capacity"],
  },
  {
    label: "Recycling",
    title: "Reward-led bottle collection",
    text: "Smart recycling points for PET bottles, cans, and Tetra Pak waste with traceable public participation.",
    pageSlug: "pet-bottle-shredder",
    icon: Store,
    image: productImage("pet-bottle-rvm-new-thumb-product-1000x600.webp"),
    thumb: productImage("pet-bottle-rvm-new-thumb-product-1000x600.webp"),
    points: ["Touch screen", "Cashback ready", "Live tracking"],
  },
  {
    label: "Digital access",
    title: "Public service kiosk workflows",
    text: "Special-purpose kiosk formats for institutions that need clean, guided, machine-led access points.",
    pageSlug: "computer-kiosk",
    icon: Monitor,
    image: productImage("computer-kiosk-product-1000x600.webp"),
    thumb: productImage("computer-kiosk-product-1000x600.webp"),
    points: ["Configurable", "Public-use format", "Service access"],
  },
  {
    label: "Hygiene vending",
    title: "Vending support for public hygiene sites",
    text: "Vending Machines are listed in the company profile and support women-friendly public toilet deployments.",
    pageSlug: "vending-machines",
    icon: Store,
    image: "/imagesss/food vending machines.png",
    thumb: "/imagesss/food vending machines.png",
    points: ["Listed category", "Sanitary pad vending", "Women-friendly E2T support"],
  },

];

const stats = [
  { value: "2010", label: "Since", detail: "OEM in hygiene sector", icon: Award },
  { value: "500L", label: "Water tank", detail: "E2T overhead tank quantity", icon: Droplets },
  { value: ">99%", label: "Pathogen reduction", detail: "Bio-Digester hygiene performance", icon: ShieldCheck },
  { value: "24x7", label: "Surveillance", detail: "Voice assistance and anti-theft alarm", icon: Monitor },
];

const testimonials = [
  {
    title: "ECO Toilet site feedback 01",
    quote: "A focused 30-second on-site testimonial recorded beside a public toilet installation.",
    role: "Public sanitation feedback",
    video: "/media/testimonials/eco-toilet-site-feedback-01.mp4",
    poster: "/media/testimonials/posters/eco-toilet-site-feedback-01-poster.jpg",
  },
  {
    title: "ECO Toilet site feedback 02",
    quote: "A short customer-side field note from the installed ECO Toilet site environment.",
    role: "Site feedback",
    video: "/media/testimonials/eco-toilet-site-feedback-02.mp4",
    poster: "/media/testimonials/posters/eco-toilet-site-feedback-02-poster.jpg",
  },
  {
    title: "Client testimonial 01",
    quote: "A short field view of an Aarya Innovtech installation with practical feedback from the site.",
    role: "Field feedback",
    video: "/media/testimonials/video6150114488919007873.mp4",
    poster: "/media/testimonials/posters/video6150114488919007873-poster.png",
  },
  {
    title: "Client testimonial 02",
    quote: "Customer-side feedback highlighting usability and day-to-day public utility performance.",
    role: "Client feedback",
    video: "/media/testimonials/video6150114488919007874.mp4",
    poster: "/media/testimonials/posters/video6150114488919007874-poster.png",
  },
  {
    title: "Client testimonial 03",
    quote: "Project feedback captured at the location, focused on the installed system and its use.",
    role: "Project feedback",
    video: "/media/testimonials/video6150114488919007876.mp4",
    poster: "/media/testimonials/posters/video6150114488919007876-poster.png",
  },
  {
    title: "Client testimonial 04",
    quote: "A compact video note from the site showing the deployed product solution in context.",
    role: "Deployment note",
    video: "/media/testimonials/video6150114488919007877.mp4",
    poster: "/media/testimonials/posters/video6150114488919007877-poster.png",
  },
  {
    title: "Client testimonial 05",
    quote: "Detailed visual feedback from a project location, documenting the system after deployment.",
    role: "Installation review",
    video: "/media/testimonials/video6150114488919007878.mp4",
    poster: "/media/testimonials/posters/video6150114488919007878-poster.png",
  },
  {
    title: "Client testimonial 06",
    quote: "A field testimonial showing the completed installation and the surrounding user environment.",
    role: "Field testimonial",
    video: "/media/testimonials/video6150114488919007879.mp4",
    poster: "/media/testimonials/posters/video6150114488919007879-poster.png",
  },
];

const clientLogos = clientRecords.map((client) => ({
  src: client.src,
  alt: client.label,
}));

const galleryFilters = ["All", "Bio Toilets", "Eco Toilets", "Utility Kiosks", "Technology"];

const galleryItems = [
  {
    title: "Modular bio toilet block",
    category: "Bio Toilets",
    image: newImage("01-bio-toilet-exterior-orange-1200x800.jpg"),
    size: "featured",
  },
  {
    title: "Flagship configuration and plan",
    category: "Bio Toilets",
    image: newImage("05-bio-toilet-specifications-orange-1200x800.jpg"),
    size: "side",
  },
  {
    title: "Bio toilet finish variations",
    category: "Bio Toilets",
    image: newImage("02-bio-toilet-five-variations-1200x800.jpg"),
    size: "side",
  },
  {
    title: "Ranchi civic installation",
    category: "Eco Toilets",
    image: newImage("11-eco-toilet-ranchi-twin-1200x800.jpg"),
  },
  {
    title: "Eco toilet product walkthrough",
    category: "Eco Toilets",
    image: newImage("09-eco-toilet-park-clean-1200x800.jpg"),
    video: "/media/aarya-innovtech-product-video.mp4",
    type: "video",
  },
  {
    title: "Public utility kiosk",
    category: "Utility Kiosks",
    image: newImage("13-public-utility-kiosk-render-1200x800.jpg"),
  },
  {
    title: "Utility kiosk site concept",
    category: "Utility Kiosks",
    image: newImage("14-utility-kiosk-concept-1200x800.jpg"),
  },
  {
    title: "Electronic toilet feature system",
    category: "Technology",
    image: newImage("12-electronic-eco-toilet-features-1200x800.jpg"),
  },
];

const achievementImagePath = (section, file) => `/media/achievements/${section}/${file}`;
const optimizedAchievementImagePath = (section, file) =>
  `/media/optimized/achievements/${section}/${file.replace(/\.(jpe?g|png)$/i, ".jpg")}`;

const homeAchievementSections = [
  {
    id: "global-impact-forum",
    label: "National recognition",
    title: "Global Impact Forum and Udyog Bharati",
    images: [
      {
        title: "Stage recognition",
        src: achievementImagePath("global-impact-forum", "global-impact-stage-handshake.jpg"),
        alt: "Handshake moment on the Global Impact Forum stage",
      },
      {
        title: "Certificate presentation",
        src: achievementImagePath("global-impact-forum", "global-impact-certificate-presentation.jpg"),
        alt: "Certificate presentation on stage at the Global Impact Forum",
      },

      {
        title: "Udyog Bharati group",
        src: achievementImagePath("global-impact-forum", "udyog-bharati-recognition-group.jpg"),
        alt: "Udyog Bharati recognition group photograph",
      },
    ],
  },
  {
    id: "school-awards",
    label: "Education recognition",
    title: "Prize distribution and student recognition",
    images: [
      {
        title: "Students group",
        src: optimizedAchievementImagePath("school-awards", "students-group-wide.jpeg"),
        alt: "Group photograph with students during the school prize distribution ceremony",
      },
      {
        title: "Ganesh prayer",
        src: optimizedAchievementImagePath("school-awards", "ganesh-prayer.jpeg"),
        alt: "Ganesh prayer before the school ceremony",
      },
      {
        title: "Lamp lighting",
        src: optimizedAchievementImagePath("school-awards", "lamp-lighting.jpeg"),
        alt: "Lamp lighting ceremony",
      },
      {
        title: "Chief guest award",
        src: optimizedAchievementImagePath("school-awards", "chief-guest-award.jpeg"),
        alt: "Chief guest receiving an award on stage",
      },
      {
        title: "Stage speech",
        src: optimizedAchievementImagePath("school-awards", "stage-speech-wide.jpeg"),
        alt: "Speaker addressing the audience from the stage",
      },
      {
        title: "School stage group",
        src: optimizedAchievementImagePath("school-awards", "school-group-stage.jpeg"),
        alt: "Group photo on the school stage",
      },
      {
        title: "Student plaque",
        src: optimizedAchievementImagePath("school-awards", "student-award-plaque.jpeg"),
        alt: "Student receiving a plaque",
      },
    ],
  },
  {
    id: "nashik-next",
    label: "Industry recognition",
    title: "Aarya Innovtech recognition at Nashik Next",
    images: [
      {
        title: "Recognition group",
        src: achievementImagePath("nashik-next", "award-group-wide.jpeg"),
        alt: "Aarya Innovtech recognition group photograph at Nashik Next",
      },

      {
        title: "Recognition collage",
        src: achievementImagePath("nashik-next", "recognition-collage.jpeg"),
        alt: "Aarya Innovtech recognition collage",
      },

    ],
  },
];

const homeAchievementImageTotal = homeAchievementSections.reduce((total, section) => total + section.images.length, 0);

const installationLocations = [
  { name: "Sangamner", district: "Ahilyanagar", state: "Maharashtra", lat: 19.4906351, lng: 74.2466821 },
  { name: "Hupari", district: "Kolhapur", state: "Maharashtra", lat: 16.6175903, lng: 74.4067388 },
  { name: "Gadhinglaj", district: "Kolhapur", state: "Maharashtra", lat: 16.1409008, lng: 74.4036933 },
  { name: "Kagal", district: "Kolhapur", state: "Maharashtra", lat: 16.5750891, lng: 74.3152571 },
  { name: "Chandgad", district: "Kolhapur", state: "Maharashtra", lat: 15.9014301, lng: 74.2405621 },
  { name: "Shirol", district: "Kolhapur", state: "Maharashtra", lat: 16.7103974, lng: 74.581218 },
  { name: "Murgud", district: "Kolhapur", state: "Maharashtra", lat: 16.3940635, lng: 74.1907099 },
  { name: "Ajara", district: "Kolhapur", state: "Maharashtra", lat: 16.1160798, lng: 74.2100716 },
  { name: "Vadgaon", district: "Kolhapur", state: "Maharashtra", lat: 16.5793365, lng: 74.2303812 },
  { name: "Kurundwad", district: "Kolhapur", state: "Maharashtra", lat: 16.6810968, lng: 74.5915436 },
  { name: "Hatkanangle", district: "Kolhapur", state: "Maharashtra", lat: 16.7445098, lng: 74.3753175 },
  { name: "Jaysingpur", district: "Kolhapur", state: "Maharashtra", lat: 16.7789886, lng: 74.5564244 },
  { name: "Ichalkaranji", district: "Kolhapur", state: "Maharashtra", lat: 16.6959348, lng: 74.4555755 },
  { name: "Panhala", district: "Kolhapur", state: "Maharashtra", lat: 16.8066833, lng: 74.1125979 },
  { name: "Bhokar", district: "Nanded", state: "Maharashtra", lat: 19.1948254, lng: 77.683399 },
  { name: "Mahur", district: "Nanded", state: "Maharashtra", lat: 19.8479785, lng: 77.9217634 },
  { name: "Hadgaon", district: "Nanded", state: "Maharashtra", lat: 19.4786171, lng: 77.6068042 },
  { name: "Kinwat", district: "Nanded", state: "Maharashtra", lat: 19.577469, lng: 78.2440088 },
  { name: "Dharmabad", district: "Nanded", state: "Maharashtra", lat: 18.9216786, lng: 77.762348 },
  { name: "Loha", district: "Nanded", state: "Maharashtra", lat: 18.9360844, lng: 77.1015489 },
  { name: "Mandavi Beach", district: "Ratnagiri", state: "Maharashtra", lat: 16.989543, lng: 73.284452 },
  { name: "Bhatye Beach", district: "Ratnagiri", state: "Maharashtra", lat: 16.9743752, lng: 73.2938376 },
  { name: "Shivkal Beach", district: "Ratnagiri", state: "Maharashtra", lat: 16.889, lng: 73.297 },
  { name: "Ganpatipule", district: "Ratnagiri", state: "Maharashtra", lat: 17.1466952, lng: 73.2697524 },
  { name: "Gavkhadi Beach", district: "Ratnagiri", state: "Maharashtra", lat: 16.8001247, lng: 73.3162489 },
  { name: "Lanja", district: "Ratnagiri", state: "Maharashtra", lat: 16.8589596, lng: 73.5486886 },
  { name: "Ganeshgule", district: "Ratnagiri", state: "Maharashtra", lat: 16.8631579, lng: 73.2958463 },
  { name: "Velneshwar", district: "Ratnagiri", state: "Maharashtra", lat: 17.3794871, lng: 73.2140194 },
  { name: "Kalwan", district: "Nashik", state: "Maharashtra", lat: 20.490904, lng: 74.0240765 },
  { name: "Trimbakeshwar", district: "Nashik", state: "Maharashtra", lat: 19.9321202, lng: 73.5307549 },
  { name: "Mahad", district: "Raigad", state: "Maharashtra", lat: 18.080753, lng: 73.42438 },
  { name: "Ranchi", district: "Ranchi", state: "Jharkhand", lat: 23.3700501, lng: 85.3250387 },
  { name: "Gujarat Locations", district: "Multiple districts", state: "Gujarat", lat: 22.3850051, lng: 71.745261 },
  { name: "Ayodhya", district: "Ayodhya", state: "Uttar Pradesh", lat: 26.7990707, lng: 82.2052321 },
  { name: "Manipur Locations", district: "Multiple districts", state: "Manipur", lat: 24.7208818, lng: 93.9229386 },
  { name: "Shimla", district: "Shimla", state: "Himachal Pradesh", lat: 31.1040393, lng: 77.1707923 },
  { name: "Malvan", district: "Sindhudurg", state: "Maharashtra", lat: 16.06064, lng: 73.4669499 },
  { name: "Odisha Locations", district: "Multiple districts", state: "Odisha", lat: 20.5431241, lng: 84.6897321 },
];

const navLinks = [
  ["Home", "home"],
  ["About Us", "about"],
  ["Career", "career"],
  ["Gallery", "gallery"],
  ["Contact", "contact"],
];

const getRoutePath = () => {
  if (typeof window === "undefined") return "/";

  const hashRoute = window.location.hash.replace(/^#/, "");
  if (hashRoute.startsWith("/")) {
    return hashRoute;
  }

  return window.location.pathname || "/";
};

const getRouteState = () => {
  const routePath = getRoutePath();
  const productMatch = routePath.match(/^\/products\/([^/?#]+)/);
  const productSlug = productMatch ? decodeURIComponent(productMatch[1]) : null;

  return {
    productSlug: productSlug && productPages[productSlug] ? productSlug : null,
    clientPage: /^\/clients\/?$/.test(routePath),
    aboutPage: /^\/about\/?$/.test(routePath),
    achievementPage: /^\/achievements\/?$/.test(routePath),
    careerPage: /^\/careers?\/?$/.test(routePath),
    galleryPage: /^\/gallery\/?$/.test(routePath),
    contactPage: /^\/contact\/?$/.test(routePath),
    newArrivalsPage: /^\/new-arrivals\/?$/.test(routePath),
    privacyPolicyPage: /^\/privacy-policy\/?$/.test(routePath),
  };
};

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      Loading page...
    </div>
  );
}

function MapFallback({ text = "Loading installation map..." }) {
  return (
    <div className="map-fallback" role="status" aria-live="polite">
      <MapPin size={18} />
      <span>{text}</span>
    </div>
  );
}

class RouteErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    if (isRouteImportError(error)) {
      reloadForFreshRouteAssets();
    }
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="route-error" role="alert">
          <strong>Page could not load.</strong>
          <span>Please refresh once to get the latest site files.</span>
          <button type="button" onClick={() => window.location.reload()}>
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = () => setMatches(mediaQuery.matches);

    onChange();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, [query]);

  return matches;
}

function DeferredLeafletLocationMap({ locations }) {
  const frameRef = useRef(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  useEffect(() => {
    if (shouldLoadMap) return undefined;

    const frame = frameRef.current;
    if (!frame || !("IntersectionObserver" in window)) {
      setShouldLoadMap(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "620px 0px" },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [shouldLoadMap]);

  return (
    <div className="deferred-map-frame" ref={frameRef}>
      {shouldLoadMap ? (
        <Suspense fallback={<MapFallback />}>
          <LeafletLocationMap locations={locations} />
        </Suspense>
      ) : (
        <MapFallback text="Map loads as you scroll" />
      )}
    </div>
  );
}

function InstallationMapSection({ locations, LocationMap }) {
  const MapComponent = LocationMap;

  return (
    <section className="installation-map home-installation-map" id="map" aria-labelledby="home-map-title">
      <div className="container">
        <div className="installation-map-heading" data-reveal>
          <span className="eyebrow"><MapPin size={15} /> Map</span>
          <h2 id="home-map-title">SmartBuddy Electronic ECO Toilet Installation.</h2>
          <p>Map view of installed SmartBuddy Electronic ECO Toilet locations across Maharashtra and other Indian states.</p>
        </div>
        <div className="installation-map-layout" data-reveal>
          <div className="leaflet-map-shell">
            {MapComponent ? <MapComponent locations={locations} /> : null}
          </div>
          <div className="installation-location-list" aria-label="Installed ECO toilet location names">
            {locations.map((location) => (
              <span key={`${location.name}-${location.district}-${location.state}`}>
                <MapPin size={14} />
                <strong>{location.name}</strong>
                <small>{location.district}, {location.state}</small>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewArrivalsPage({ onNavigateHome }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = newArrivalProduct.images[activeImageIndex] ?? newArrivalProduct.images[0];

  return (
    <div className="new-arrivals-page">
      <section className="new-arrivals-hero">
        <div className="container new-arrivals-card">
          <div className="new-arrivals-media" data-reveal>
            <img src={activeImage.src} alt={activeImage.alt} decoding="async" />
            <div className="new-arrivals-thumbs" aria-label="New arrival views">
              {newArrivalProduct.images.map((image, index) => (
                <button
                  className={activeImageIndex === index ? "is-active" : ""}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Show ${image.label}`}
                  aria-current={activeImageIndex === index ? "true" : undefined}
                  key={image.src}
                >
                  <img src={image.src} alt="" loading="lazy" decoding="async" />
                  <span>{image.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="new-arrivals-copy" data-reveal>
            <span className="eyebrow"><Sparkles size={15} /> {newArrivalProduct.eyebrow}</span>
            <h1>{newArrivalProduct.title}</h1>
            <p>{newArrivalProduct.text}</p>
            <div className="new-arrivals-highlights" aria-label="New arrival highlights">
              {newArrivalProduct.highlights.map((highlight) => (
                <span key={highlight}><BadgeCheck size={15} /> {highlight}</span>
              ))}
            </div>
            <button className="button primary" type="button" onClick={() => onNavigateHome("contact")}>
              Enquire now <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [activeProductSlug, setActiveProductSlug] = useState(() => getRouteState().productSlug);
  const [activeClientPage, setActiveClientPage] = useState(() => getRouteState().clientPage);
  const [activeAboutPage, setActiveAboutPage] = useState(() => getRouteState().aboutPage);
  const [activeAchievementPage, setActiveAchievementPage] = useState(() => getRouteState().achievementPage);
  const [activeCareerPage, setActiveCareerPage] = useState(() => getRouteState().careerPage);
  const [activeGalleryPage, setActiveGalleryPage] = useState(() => getRouteState().galleryPage);
  const [activeContactPage, setActiveContactPage] = useState(() => getRouteState().contactPage);
  const [activeNewArrivalsPage, setActiveNewArrivalsPage] = useState(() => getRouteState().newArrivalsPage);
  const [activePrivacyPolicyPage, setActivePrivacyPolicyPage] = useState(() => getRouteState().privacyPolicyPage);
  const [heroIndex, setHeroIndex] = useState(0);
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [siteLoading, setSiteLoading] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [introReady, setIntroReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mailStatus, setMailStatus] = useState("idle");
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("All");
  const [statsActive, setStatsActive] = useState(false);
  const [openFooterDropdown, setOpenFooterDropdown] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const isSmallScreen = useMediaQuery("(max-width: 760px)");
  const isMobileNav = useMediaQuery("(max-width: 980px)");
  const scrollProgressRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const scrolledRef = useRef(false);
  const navHiddenRef = useRef(false);
  const productMenuRef = useRef(null);
  const productMenuButtonRef = useRef(null);
  const productModalRef = useRef(null);
  const mediaModalRef = useRef(null);
  const statsGridRef = useRef(null);
  const mailResetTimerRef = useRef(null);
  const activeProductPage = activeProductSlug ? productPages[activeProductSlug] : null;
  const activeFeaturedIndex = featuredImageIndex % heroCarouselProducts.length;
  const featuredProduct = heroCarouselProducts[activeFeaturedIndex] ?? products[0];
  const featuredProductImage = featuredProduct.heroImage || featuredProduct.image;
  const visibleGalleryItems = useMemo(
    () => galleryItems.filter((item) => activeGalleryFilter === "All" || item.category === activeGalleryFilter),
    [activeGalleryFilter],
  );
  const currentPageKey = activeProductPage
    ? `product-${activeProductSlug}`
    : activeClientPage
      ? "clients"
      : activeAboutPage
        ? "about"
        : activeAchievementPage
          ? "achievements"
          : activeCareerPage
            ? "career"
            : activeGalleryPage
              ? "gallery"
              : activeContactPage
                ? "contact"
                : activeNewArrivalsPage
                  ? "new-arrivals"
                  : activePrivacyPolicyPage
                    ? "privacy-policy"
                    : "home";
  const motionInitial = prefersReducedMotion ? false : "hidden";
  const homeIntroState = introReady || prefersReducedMotion ? "visible" : "hidden";
  const hasStandalonePage = Boolean(
    activeProductPage ||
    activeClientPage ||
    activeAboutPage ||
    activeAchievementPage ||
    activeCareerPage ||
    activeGalleryPage ||
    activeContactPage ||
    activeNewArrivalsPage ||
    activePrivacyPolicyPage,
  );
  const isNavSectionActive = (section) => {
    if (section === "about") return activeAboutPage;
    if (section === "achievements") return activeAchievementPage;
    if (section === "career") return activeCareerPage;
    if (section === "gallery") return activeGalleryPage;
    if (section === "contact") return activeContactPage;
    if (section === "clients") return activeClientPage;
    return !hasStandalonePage && activeSection === section;
  };

  const setScrolledIfChanged = useCallback((nextScrolled) => {
    if (scrolledRef.current === nextScrolled) return;
    scrolledRef.current = nextScrolled;
    setScrolled(nextScrolled);
  }, []);

  const setNavHiddenIfChanged = useCallback((nextHidden) => {
    if (navHiddenRef.current === nextHidden) return;
    navHiddenRef.current = nextHidden;
    setNavHidden(nextHidden);
  }, []);

  const applyRouteState = () => {
    const routeState = getRouteState();
    setActiveProductSlug(routeState.productSlug);
    setActiveClientPage(routeState.clientPage);
    setActiveAboutPage(routeState.aboutPage);
    setActiveAchievementPage(routeState.achievementPage);
    setActiveCareerPage(routeState.careerPage);
    setActiveGalleryPage(routeState.galleryPage);
    setActiveContactPage(routeState.contactPage);
    setActiveNewArrivalsPage(routeState.newArrivalsPage);
    setActivePrivacyPolicyPage(routeState.privacyPolicyPage);
    setMenuOpen(false);
    setProductMenuOpen(false);
  };

  const navigateToRoute = (routePath) => {
    const nextPath = routePath || "/";
    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.pushState(null, "", nextPath);
    }
    applyRouteState();
  };

  useEffect(() => {
    let removeTimer;
    let introTimer;
    let frameId;
    let hasSeenLoader = false;

    try {
      hasSeenLoader = window.sessionStorage.getItem(LOADER_SESSION_KEY) === "1";
    } catch {
      // Session storage can be unavailable; continue with the default profile.
    }

    const duration = prefersReducedMotion
      ? hasSeenLoader ? 90 : 150
      : import.meta.env.DEV
        ? 120
        : hasSeenLoader
          ? 180
          : 560;
    const introDelay = prefersReducedMotion ? 0 : import.meta.env.DEV ? 16 : hasSeenLoader ? 40 : 90;
    const removeDelay = prefersReducedMotion ? 80 : import.meta.env.DEV ? 90 : hasSeenLoader ? 140 : 220;
    const startTime = window.performance.now();

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2.35);
      setLoaderProgress(Math.round(eased * 100));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      try {
        window.sessionStorage.setItem(LOADER_SESSION_KEY, "1");
      } catch {
        // Ignore storage restrictions.
      }

      setSiteLoading(false);
      introTimer = window.setTimeout(() => setIntroReady(true), introDelay);
      removeTimer = window.setTimeout(() => setLoaderVisible(false), removeDelay);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(introTimer);
      window.clearTimeout(removeTimer);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!introReady) {
      return undefined;
    }

    const cancelIdleWork = scheduleIdleTask(() => {
      preloadHomeAssets();
    });

    return cancelIdleWork;
  }, [introReady]);

  useEffect(() => {
    const recoverFromRouteImportError = (error) => {
      if (isRouteImportError(error)) {
        reloadForFreshRouteAssets();
      }
    };

    const onUnhandledRejection = (event) => {
      recoverFromRouteImportError(event.reason);
    };

    const onWindowError = (event) => {
      recoverFromRouteImportError(event.error || event.message);
    };

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onWindowError);

    return () => {
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
      window.removeEventListener("error", onWindowError);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(mailResetTimerRef.current), []);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      activeProductSlug ||
      activeClientPage ||
      activeAboutPage ||
      activeAchievementPage ||
      activeCareerPage ||
      activeGalleryPage ||
      activeContactPage ||
      activeNewArrivalsPage ||
      activePrivacyPolicyPage ||
      !introReady
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [activeAboutPage, activeAchievementPage, activeCareerPage, activeClientPage, activeContactPage, activeGalleryPage, activeNewArrivalsPage, activePrivacyPolicyPage, activeProductSlug, introReady, prefersReducedMotion]);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      activeProductSlug ||
      activeClientPage ||
      activeAboutPage ||
      activeAchievementPage ||
      activeCareerPage ||
      activeGalleryPage ||
      activeContactPage ||
      activeNewArrivalsPage ||
      activePrivacyPolicyPage ||
      !introReady
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setFeaturedImageIndex((current) => (current + 1) % heroCarouselProducts.length);
    }, 4300);
    return () => window.clearInterval(timer);
  }, [activeAboutPage, activeAchievementPage, activeCareerPage, activeClientPage, activeContactPage, activeGalleryPage, activeNewArrivalsPage, activePrivacyPolicyPage, activeProductSlug, introReady, prefersReducedMotion]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const nextScrolled = currentScrollY > 20;
        const nextProgress = scrollableHeight > 0 ? (currentScrollY / scrollableHeight) * 100 : 0;
        const scrollDelta = currentScrollY - lastScrollYRef.current;
        const forceNavVisible = currentScrollY < 96 || menuOpen || productMenuOpen;

      setScrolledIfChanged(nextScrolled);
      if (forceNavVisible) {
        setNavHiddenIfChanged(false);
      } else if (scrollDelta > 7) {
        setNavHiddenIfChanged(true);
      } else if (scrollDelta < -4) {
        setNavHiddenIfChanged(false);
      }
        if (scrollProgressRef.current) {
          scrollProgressRef.current.style.transform = `scaleX(${Math.min(Math.max(nextProgress, 0), 100) / 100})`;
        }
        lastScrollYRef.current = currentScrollY;
        ticking = false;
      });
    };

    lastScrollYRef.current = Math.max(window.scrollY, 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeProductSlug, activeClientPage, activeAboutPage, activeAchievementPage, activeCareerPage, activeGalleryPage, activeContactPage, activeNewArrivalsPage, activePrivacyPolicyPage, menuOpen, productMenuOpen, setNavHiddenIfChanged, setScrolledIfChanged]);

  useEffect(() => {
    setNavHiddenIfChanged(false);
    lastScrollYRef.current = Math.max(window.scrollY, 0);
  }, [currentPageKey, menuOpen, productMenuOpen, setNavHiddenIfChanged]);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection((current) => (current === entry.target.id ? current : entry.target.id));
          }
        });
      },
      { rootMargin: "-38% 0px -54%", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [activeProductSlug, activeClientPage, activeAboutPage, activeAchievementPage, activeCareerPage, activeGalleryPage, activeContactPage, activeNewArrivalsPage, activePrivacyPolicyPage]);

  useEffect(() => {
    const getRevealElements = () => Array.from(document.querySelectorAll("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("motion-ready");

    const revealElement = (element) => {
      element.classList.add("is-visible");
    };

    if (reducedMotion || !("IntersectionObserver" in window)) {
      const revealAll = () => getRevealElements().forEach(revealElement);
      const frameId = window.requestAnimationFrame(revealAll);
      const fallbackTimers = [320, 900].map((delay) => window.setTimeout(revealAll, delay));

      return () => {
        window.cancelAnimationFrame(frameId);
        fallbackTimers.forEach((timer) => window.clearTimeout(timer));
      };
    }

    const isInCurrentViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight * 0.96;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const registerRevealElements = () => {
      getRevealElements().forEach((element) => {
        if (element.classList.contains("is-visible")) return;

        observer.observe(element);

        if (isInCurrentViewport(element)) {
          revealElement(element);
          observer.unobserve(element);
        }
      });
    };

    const frameId = window.requestAnimationFrame(registerRevealElements);
    const fallbackTimers = [180, 420, 900, 1600].map((delay) => window.setTimeout(registerRevealElements, delay));

    return () => {
      window.cancelAnimationFrame(frameId);
      fallbackTimers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
    };
  }, [activeProductSlug, activeClientPage, activeAboutPage, activeAchievementPage, activeCareerPage, activeGalleryPage, activeContactPage, activeNewArrivalsPage, activePrivacyPolicyPage]);

  useEffect(() => {
    if (!statsGridRef.current || statsActive) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(statsGridRef.current);
    return () => observer.disconnect();
  }, [activeAboutPage, activeAchievementPage, activeCareerPage, activeClientPage, activeContactPage, activeGalleryPage, activeNewArrivalsPage, activePrivacyPolicyPage, activeProductPage, statsActive]);

  useEffect(() => {
    const syncRoute = () => {
      const routeState = getRouteState();
      setActiveProductSlug(routeState.productSlug);
      setActiveClientPage(routeState.clientPage);
      setActiveAboutPage(routeState.aboutPage);
      setActiveAchievementPage(routeState.achievementPage);
      setActiveCareerPage(routeState.careerPage);
      setActiveGalleryPage(routeState.galleryPage);
      setActiveContactPage(routeState.contactPage);
      setActiveNewArrivalsPage(routeState.newArrivalsPage);
      setActivePrivacyPolicyPage(routeState.privacyPolicyPage);
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
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activeProductPage, activeClientPage, activeAboutPage, activeAchievementPage, activeCareerPage, 
activeGalleryPage, activeContactPage, activeNewArrivalsPage, activePrivacyPolicyPage]);

  useEffect(() => {
    const activeModal = selectedMedia ? mediaModalRef.current : selectedProduct ? productModalRef.current : null;
    const previousActiveElement = document.activeElement;
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");
    const getFocusableElements = () =>
      activeModal
        ? Array.from(activeModal.querySelectorAll(focusableSelector)).filter((element) => element.offsetParent !== null)
        : [];

    document.body.style.overflow = activeModal ? "hidden" : "";
    document.body.style.touchAction = activeModal ? "none" : "";

    if (!activeModal) {
      return () => {
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
      };
    }

    const focusFrame = window.requestAnimationFrame(() => {
      const [firstFocusable] = getFocusableElements();
      (firstFocusable || activeModal).focus({ preventScroll: true });
    });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
        setSelectedMedia(null);
        setMenuOpen(false);
        setProductMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements();
      if (!focusableElements.length) {
        event.preventDefault();
        activeModal.focus({ preventScroll: true });
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      window.removeEventListener("keydown", onKeyDown);
      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus({ preventScroll: true });
      }
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

  const preloadSectionResources = (sectionId) => {
    switch (sectionId) {
      case "home":
        preloadHomeAssets();
        scheduleIdleTask(() => preloadRouteBundle("map"), 1800);
        break;
      case "about":
      case "achievements":
      case "career":
      case "clients":
      case "gallery":
      case "contact":
        preloadRouteBundle(sectionId);
        if (sectionId === "contact") {
          scheduleIdleTask(() => preloadRouteBundle("map"), 1800);
        }
        break;
      case "products":
      case "solutions":
        preloadRouteBundle("product");
        break;
      default:
        break;
    }
  };

  const scrollToSection = (sectionId) => {
    const targetSectionId = sectionId === "solutions" ? "products" : sectionId;
    preloadSectionResources(sectionId);

    if (sectionId === "about") {
      navigateToAbout();
      return;
    }

    if (sectionId === "clients") {
      navigateToClients();
      return;
    }

    if (sectionId === "achievements") {
      navigateToAchievements();
      return;
    }

    if (sectionId === "career") {
      navigateToCareer();
      return;
    }

    if (sectionId === "gallery") {
      navigateToGallery();
      return;
    }

    if (sectionId === "contact") {
      navigateToContact();
      return;
    }

    setMenuOpen(false);
    setProductMenuOpen(false);

    if (hasStandalonePage) {
      navigateToRoute("/");
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(targetSectionId)?.scrollIntoView({ behavior: "smooth" });
        });
      });
      return;
    }

    document.getElementById(targetSectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToAbout = () => {
    preloadRouteBundle("about");
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveAchievementPage(false);
    setActiveCareerPage(false);
    setActiveGalleryPage(false);
    setActiveContactPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeAboutPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigateToRoute("/about");
  };

  const navigateToClients = () => {
    preloadRouteBundle("clients");
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveAboutPage(false);
    setActiveAchievementPage(false);
    setActiveCareerPage(false);
    setActiveGalleryPage(false);
    setActiveContactPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeClientPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigateToRoute("/clients");
  };

  const navigateToAchievements = () => {
    preloadRouteBundle("achievements");
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveAboutPage(false);
    setActiveClientPage(false);
    setActiveCareerPage(false);
    setActiveGalleryPage(false);
    setActiveContactPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeAchievementPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigateToRoute("/achievements");
  };

  const navigateToCareer = () => {
    preloadRouteBundle("career");
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveClientPage(false);
    setActiveAboutPage(false);
    setActiveAchievementPage(false);
    setActiveGalleryPage(false);
    setActiveContactPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeCareerPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigateToRoute("/career");
  };

  const navigateToGallery = () => {
    preloadRouteBundle("gallery");
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveAboutPage(false);
    setActiveClientPage(false);
    setActiveAchievementPage(false);
    setActiveCareerPage(false);
    setActiveContactPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeGalleryPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigateToRoute("/gallery");
  };

  const navigateToContact = () => {
    preloadRouteBundle("contact");
    scheduleIdleTask(() => preloadRouteBundle("map"), 1800);
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveProductSlug(null);
    setActiveClientPage(false);
    setActiveAboutPage(false);
    setActiveAchievementPage(false);
    setActiveCareerPage(false);
    setActiveGalleryPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeContactPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigateToRoute("/contact");
  };

  const navigateToProduct = (slug) => {
    preloadRouteBundle("product");
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveClientPage(false);
    setActiveAboutPage(false);
    setActiveAchievementPage(false);
    setActiveCareerPage(false);
    setActiveGalleryPage(false);
    setActiveContactPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);
    if (activeProductSlug === slug) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigateToRoute(`/products/${slug}`);
  };

  const navigateToNewArrivals = () => {
    preloadHomeAssets();
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveProductSlug(null);
    setActiveClientPage(false);
    setActiveAboutPage(false);
    setActiveAchievementPage(false);
    setActiveCareerPage(false);
    setActiveGalleryPage(false);
    setActiveContactPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeNewArrivalsPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigateToRoute("/new-arrivals");
  };

  const navigateToPrivacyPolicy = () => {
    preloadRouteBundle("privacy-policy");
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveProductSlug(null);
    setActiveClientPage(false);
    setActiveAboutPage(false);
    setActiveAchievementPage(false);
    setActiveCareerPage(false);
    setActiveGalleryPage(false);
    setActiveContactPage(false);
    setActiveNewArrivalsPage(false);

    if (activePrivacyPolicyPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigateToRoute("/privacy-policy");
  };

  const openProduct = (product) => {
    if (product.pageSlug) {
      navigateToProduct(product.pageSlug);
      return;
    }
    setSelectedProduct(product);
  };

  const openProductMenuOnHover = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setProductMenuOpen(true);
    }
  };

  const closeProductMenuOnHover = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setProductMenuOpen(false);
    }
  };

  const moveHero = (direction) => {
    setHeroIndex((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  const handleContact = async (event) => {
    event.preventDefault();
    if (mailStatus === "sending") return;

    const currentForm = event.currentTarget;
    const form = new FormData(currentForm);
    const name = String(form.get("name") || "").trim().slice(0, 80);
    const phone = String(form.get("phone") || "").trim().slice(0, 16);
    const message = String(form.get("message") || "").trim().slice(0, 900);
    const website = String(form.get("website") || "").trim().slice(0, 200);
    const formStartedAt = Number(form.get("formStartedAt") || 0);

    setMailStatus("sending");
    window.clearTimeout(mailResetTimerRef.current);

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, phone, message, website, formStartedAt }),
      });

      if (!response.ok) {
        throw new Error("Email failed");
      }

      setMailStatus("sent");
      currentForm.reset();
    } catch {
      setMailStatus("error");
    } finally {
      mailResetTimerRef.current = window.setTimeout(() => setMailStatus("idle"), 4500);
    }
  };

  const getSEOProps = () => {
    if (activeProductPage) return { title: activeProductPage.title, description: activeProductPage.short };
    if (activeClientPage) return { title: "Clients", description: "Trusted by public-sector and institutional organizations." };
    if (activeAboutPage) return { title: "About", description: "Learn more about Aarya Innovtech." };
    if (activeAchievementPage) return { title: "Achievements", description: "Our awards and recognitions." };
    if (activeCareerPage) return { title: "Careers", description: "Join our team." };
    if (activeGalleryPage) return { title: "Gallery", description: "Photos and videos of our installations." };
    if (activeContactPage) return { title: "Contact", description: "Get in touch with Aarya Innovtech." };
    if (activeNewArrivalsPage) return { title: "New Arrivals", description: "Check out our latest product arrivals." };
    if (activePrivacyPolicyPage) return { title: "Privacy Policy", description: "Our privacy policy." };
    return { title: "Eco Hygiene & Waste Management Solutions", description: "Aarya Innovtech manufactures eco-friendly hygiene, sanitation, recycling, kiosk, and waste-management solutions." };
  };
  const seoProps = getSEOProps();

  return (
    <LazyMotion features={domAnimation}>
      <>
        <SEO {...seoProps} />
        {loaderVisible ? (
          <div className={`site-loader ${siteLoading ? "" : "is-hidden"}`} role="status" aria-label="Loading Aarya Innovtech website">
            <div className="site-loader-panel">
              <div className="site-loader-logo-card" aria-hidden="true">
                <span className="site-loader-pulse" />
                <img src={aaryaInnovtechLogo} alt="" decoding="async" fetchpriority="high" />
              </div>
              <div
                className="site-loader-track"
                role="progressbar"
                aria-label="Website loading progress"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={loaderProgress}
              >
                <span style={{ width: `${loaderProgress}%` }} />
              </div>
              <span className="site-loader-percent">Loading {loaderProgress}%</span>
            </div>
          </div>
        ) : null}
        <m.header
          className={`site-header ${scrolled || activeAboutPage || activeCareerPage || activeContactPage || activeNewArrivalsPage || activePrivacyPolicyPage ? "is-scrolled" : ""} ${navHidden ? "is-hidden" : ""}`}
          variants={navbarVariants}
          initial={motionInitial}
          animate={navHidden ? "autoHidden" : "visible"}
        >
          <span className="scroll-progress" ref={scrollProgressRef} />
          <m.nav className="container navbar" aria-label="Main navigation" variants={navbarInnerVariants} initial={motionInitial} animate="visible">
            <m.button className="brand" onClick={() => scrollToSection("home")} aria-label="Go to home" variants={navbarSectionVariants}>
              <img src={aaryaInnovtechHeaderLogo} alt="Aarya Innovtech" decoding="async" />
            </m.button>
            <m.div
              className={`nav-links ${menuOpen ? "is-open" : ""}`}
              id="primary-navigation"
              variants={navbarLinksVariants}
              initial={motionInitial}
              animate={isMobileNav ? (menuOpen ? "open" : "closed") : "visible"}
            >
              {navLinks.slice(0, 1).map(([label, section]) => (
                <button
                  className={isNavSectionActive(section) ? "is-active" : ""}
                  onClick={() => scrollToSection(section)}
                  onMouseEnter={() => preloadSectionResources(section)}
                  onFocus={() => preloadSectionResources(section)}
                  aria-current={isNavSectionActive(section) ? "page" : undefined}
                  key={section}
                >
                  {label}
                </button>
              ))}
              {navLinks.slice(1, 2).map(([label, section]) => (
                <button
                  className={isNavSectionActive(section) ? "is-active" : ""}
                  onClick={() => scrollToSection(section)}
                  onMouseEnter={() => preloadSectionResources(section)}
                  onFocus={() => preloadSectionResources(section)}
                  aria-current={isNavSectionActive(section) ? "page" : undefined}
                  key={section}
                >
                  {label}
                </button>
              ))}
              <div
                className={`nav-product ${productMenuOpen ? "is-open" : ""}`}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setProductMenuOpen(false);
                  }
                }}
                onMouseEnter={openProductMenuOnHover}
                onMouseLeave={closeProductMenuOnHover}
                ref={productMenuRef}
              >
                <button
                  className={activeProductPage || activeNewArrivalsPage || (!hasStandalonePage && activeSection === "products") ? "is-active" : ""}
                  type="button"
                  onClick={() => setProductMenuOpen((open) => !open)}
                  onMouseEnter={() => preloadSectionResources("products")}
                  onFocus={() => preloadSectionResources("products")}
                  aria-expanded={productMenuOpen}
                  aria-haspopup="true"
                  ref={productMenuButtonRef}
                >
                  Products <ChevronDown size={14} />
                </button>
                <m.div
                  className="nav-product-menu"
                  variants={productDropdownVariants}
                  initial={false}
                  animate={productMenuOpen ? "open" : "closed"}
                >
                  {productPageList.map((product) => (
                    <m.div key={product.slug} variants={dropdownItemVariants} className={`nav-product-item-wrapper ${product.subItems ? 'has-sub-menu' : ''}`}>
                      <button
                        className={activeProductSlug === product.slug ? "is-active" : ""}
                        type="button"
                        onClick={() => {
                          navigateToProduct(product.slug);
                          productMenuButtonRef.current?.focus();
                        }}
                        onMouseEnter={() => preloadRouteBundle("product")}
                        onFocus={() => preloadRouteBundle("product")}
                      >
                        {product.navLabel} {product.subItems ? <ChevronRight size={14} /> : <ArrowRight size={14} />}
                      </button>
                      {product.subItems && (
                        <div className="nav-sub-dropdown">
                          {product.subItems.map(sub => (
                            <button 
                              key={sub.title} 
                              type="button" 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateToProduct(sub.slug);
                                setProductMenuOpen(false);
                              }}
                            >
                              {sub.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </m.div>
                  ))}
                </m.div>
              </div>
              {navLinks.slice(2).map(([label, section]) => (
                <button
                  className={isNavSectionActive(section) ? "is-active" : ""}
                  onClick={() => scrollToSection(section)}
                  onMouseEnter={() => preloadSectionResources(section)}
                  onFocus={() => preloadSectionResources(section)}
                  aria-current={isNavSectionActive(section) ? "page" : undefined}
                  key={section}
                >
                  {label}
                </button>
              ))}
              <button
                className="nav-login"
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setProductMenuOpen(false);
                  window.location.assign("https://smartbuddyiot.vercel.app/login");
                }}
              >
                Login
              </button>
            </m.div>
            <m.button
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              aria-label="Toggle navigation"
              variants={navbarSectionVariants}
            >
              {menuOpen ? <X /> : <Menu />}
            </m.button>
          </m.nav>
        </m.header>

        <main>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              className="page-transition"
              key={currentPageKey}
              variants={pageTransitionVariants}
              initial={motionInitial}
              animate="visible"
              exit={prefersReducedMotion ? undefined : "exit"}
            >
              <RouteErrorBoundary resetKey={currentPageKey}>
                <Suspense fallback={<RouteFallback />}>
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
                  ) : activeAchievementPage ? (
                    <AchievementPage onNavigateHome={scrollToSection} />
                  ) : activeCareerPage ? (
                    <CareerPage onNavigateHome={scrollToSection} />
                  ) : activeGalleryPage ? (
                    <GalleryPage onNavigateHome={scrollToSection} onOpenMedia={setSelectedMedia} />
                  ) : activeContactPage ? (
                    <ContactPage
                      onNavigateHome={scrollToSection}
                      onSubmit={handleContact}
                      mailStatus={mailStatus}
                    />
                  ) : activeNewArrivalsPage ? (
                    <NewArrivalsPage onNavigateHome={scrollToSection} />
                  ) : activePrivacyPolicyPage ? (
                    <PrivacyPolicyPage onNavigateHome={scrollToSection} />
                  ) : (
                    <>
                      <section className="hero" id="home">
                        <div className="hero-backgrounds">
                          <img
                            className="hero-bg is-active"
                            src={heroBackgroundImage}
                            alt=""
                            aria-hidden="true"
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                          />
                        </div>
                        <div className="hero-overlay" />
                        {isSmallScreen && (
                          <div className="hero-mobile-product-bg" aria-hidden="true">
                            <img
                              src={featuredProductImage}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              key={`mobile-hero-${featuredProductImage}`}
                            />
                          </div>
                        )}
                        <div className="container hero-inner">
                          <m.div
                            className="hero-copy"
                            variants={heroContainerVariants}
                            initial={motionInitial}
                            animate={homeIntroState}
                          >
                            <m.span className="eyebrow light" variants={heroItemVariants}>
                              <Sparkles size={15} /> {heroSlides[heroIndex].eyebrow}
                            </m.span>
                            <m.h1 variants={heroItemVariants}>{heroSlides[heroIndex].title}</m.h1>
                            <m.p variants={heroItemVariants}>{heroSlides[heroIndex].text}</m.p>
                            <m.div className="hero-actions" variants={heroItemVariants}>
                              <button className="button primary" onClick={() => scrollToSection("products")}>
                                Explore solutions <ArrowRight size={18} />
                              </button>
                              <button className="button glass" onClick={() => scrollToSection("contact")}>
                                Talk to our team
                              </button>
                            </m.div>
                            <m.div className="hero-proof-strip" aria-label="Aarya Innovtech proof points" variants={heroItemVariants} style={{ marginTop: "32px", width: "fit-content" }}>
                              <div>
                                <ShieldCheck size={22} />
                                <p><strong>OEM since 2010</strong><span>Trusted by government & private organizations</span></p>
                              </div>
                              <div>
                                <BadgeCheck size={22} />
                                <p><strong>ISO, CE, MPCB</strong><span>Certified for quality, safety & compliance</span></p>
                              </div>
                              <div>
                                <Monitor size={22} />
                                <p><strong>IoT-Ready</strong><span>Smart monitoring for efficient operations</span></p>
                              </div>
                            </m.div>
                          </m.div>
                          <m.div
                            className="hero-showcase"
                            variants={heroVisualVariants}
                            initial={motionInitial}
                            animate={homeIntroState}
                            whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.006 }}
                          >
                            <div className="hero-featured-product">
                              <div className="hero-featured-copy" key={`featured-copy-${featuredProduct.pageSlug}`}>
                                <span className="hero-featured-kicker"><Star size={13} /> Featured product</span>
                                <h2>{featuredProduct.title}</h2>
                                <i aria-hidden="true" />
                                <p>{featuredProduct.short}</p>
                              </div>
                              <button
                                className="hero-featured-stage"
                                type="button"
                                onClick={() => navigateToProduct(featuredProduct.pageSlug)}
                                aria-label={`Open ${featuredProduct.title}`}
                              >
                                <span className="hero-featured-glow" aria-hidden="true" />
                                <span className="hero-featured-curtain" key={featuredProductImage}>
                                  <img
                                    src={featuredProductImage}
                                    alt={featuredProduct.title}
                                    loading={activeFeaturedIndex === 0 ? "eager" : "lazy"}
                                    decoding="async"
                                  />
                                </span>
                                <span className="hero-featured-dots" aria-hidden="true">
                                  {heroCarouselProducts.map((product, index) => (
                                    <i className={index === activeFeaturedIndex ? "is-active" : ""} key={product.title} />
                                  ))}
                                </span>
                              </button>
                            </div>
                            <div className="hero-product-strip" aria-label="Featured Aarya Innovtech products">
                              {heroCarouselProducts.map((product, index) => (
                                <button
                                  className={`hero-product-tile ${index === activeFeaturedIndex ? "is-active" : ""}`}
                                  type="button"
                                  onClick={() => setFeaturedImageIndex(index)}
                                  aria-pressed={index === activeFeaturedIndex}
                                  aria-label={`Show ${product.title} in featured product carousel`}
                                  key={product.title}
                                >
                                  <img src={product.thumb ?? product.image} alt="" loading="lazy" decoding="async" />
                                  <strong>{product.title}</strong>
                                  <ArrowRight size={16} />
                                </button>
                              ))}
                            </div>

                          </m.div>
                        </div>
                        <div className="container hero-bottom">
                          <div className="hero-pagination">
                            <div className="hero-dots" aria-label="Hero slides">
                              {heroSlides.map((slide, index) => (
                                <button
                                  type="button"
                                  className={heroIndex === index ? "is-active" : ""}
                                  onClick={() => setHeroIndex(index)}
                                  aria-label={`Show slide ${index + 1}`}
                                  key={index}
                                />
                              ))}
                            </div>
                            <span className="hero-count">0{heroIndex + 1}<em>/</em>0{heroSlides.length}</span>
                          </div>
                          <div className="hero-bottom-actions">
                            <p>Scroll to discover <span /></p>
                            <div className="hero-arrows">
                              <button type="button" onClick={() => moveHero(-1)} aria-label="Previous hero slide"><ChevronLeft size={18} /></button>
                              <button type="button" onClick={() => moveHero(1)} aria-label="Next hero slide"><ChevronRight size={18} /></button>
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

                      <section className="section about" id="company-overview">
                        <div className="container about-grid">
                          <div className="about-visual" data-reveal="from-left">
                            <div className="about-image">
                              <img src={newImage("11-eco-toilet-ranchi-twin-1200x800.jpg")} alt="Installed electronic eco toilets" loading="lazy" decoding="async" />
                            </div>
                            <div className="experience-badge">
                              <strong>2010</strong>
                              <span>OEM since</span>
                            </div>
                          </div>
                          <div className="about-copy" data-reveal="from-right">
                            <span className="eyebrow"><Building2 size={15} /> Company Overview</span>
                            <h2>Original Equipment Manufacturer of special purpose machines.</h2>
                            <p className="lead">
                              Aarya Innovtech is an OEM for hygiene-sector special purpose machines
                              since 2010.
                            </p>
                            <p>
                              The product range covers Electronic ECO Toilet, Bio-Digester, Organic Waste
                              Composter, PET Bottle Shredder, Computer Kiosk, and Vending Machines.
                            </p>
                            <div className="about-points">
                              <div><BadgeCheck size={21} /><span><strong>Public-use systems</strong>Designed for highways, malls, airports, railway stations, tourist places, and Smart City locations</span></div>
                              <div><Factory size={21} /><span><strong>Office and factory network</strong>Nashik Office, Mumbai Office, and Ambad MIDC factory listed in Maharashtra</span></div>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section className="section solutions product-spotlight-section" id="products">
                        <div className="container">
                          <div className="product-spotlight-heading" data-reveal>
                            <span className="eyebrow"><Leaf size={15} /> Product range</span>
                            <h2>Product machines, shown with clear deployment details.</h2>
                            <p>Less reading, more product clarity. Pick a machine to view deployment details.</p>
                          </div>

                          <div className="product-spotlight-marquee" aria-label="Aarya Innovtech product showcase">
                            <div className="product-spotlight-track">
                              {[0, 1, 2, 3].map((groupIndex) => (
                                <div className="product-spotlight-group" aria-hidden={groupIndex > 0 ? "true" : undefined} key={`product-marquee-${groupIndex}`}>
                                  {products.map((product, index) => {
                                    const Icon = product.icon;
                                    const isDuplicate = groupIndex > 0;

                                    return (
                                      <button
                                        className="product-spotlight-card"
                                        type="button"
                                        onClick={() => openProduct(product)}
                                        tabIndex={isDuplicate ? -1 : undefined}
                                        key={`${groupIndex}-${product.title}`}
                                      >
                                        <span className="product-spotlight-tag"><Icon size={15} /> {product.tag}</span>
                                        <img src={product.image} alt={isDuplicate ? "" : product.title} loading="lazy" decoding="async" />
                                        <span className="product-spotlight-name">
                                          <strong>{product.title}</strong>
                                          <em>View product <ArrowRight size={15} /></em>
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </section>

                      <section className="clients" id="clients">
                        <div className="container">
                          <div className="client-showcase">
                            <div className="section-heading centered client-showcase-heading" data-reveal>
                              <span className="eyebrow"><Users size={15} /> Our clients</span>
                              <h2>Trusted by public-sector and institutional organizations.</h2>
                            </div>
                            <div className="client-marquee" aria-label="Client partner logos">
                              <div className="client-marquee-row">
                                <div className="client-marquee-track">
                                  {[0, 1, 2, 3, 4, 5].map((copyIndex) => (
                                    <div
                                      className="client-grid"
                                      aria-hidden={copyIndex > 0 || undefined}
                                      key={`client-row-copy-${copyIndex}`}
                                    >
                                      {clientLogos.map((logo, index) => (
                                        <div
                                          className="client-logo"
                                          key={`${logo.src}-${copyIndex}-${index}`}
                                        >
                                          <img
                                            src={logo.src}
                                            alt={copyIndex === 0 ? logo.alt : ""}
                                            loading="lazy"
                                            decoding="async"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="client-preview-actions" data-reveal>
                            <button className="button primary" type="button" onClick={navigateToClients}>
                              View all clients <ArrowRight size={17} />
                            </button>
                          </div>
                        </div>
                      </section>

                      <section className="project-gallery" id="projects" aria-label="Product and project gallery">
                        <div className="container">
                          <div className="project-gallery-heading" data-reveal>
                            <div>
                              <span className="eyebrow"><Maximize2 size={15} /> Product and project gallery</span>
                              <h2>Project and installation gallery.</h2>
                            </div>
                            <p>
                              Explore modular configurations, installed eco toilets, community utility concepts, and the technology behind Aarya Innovtech solutions.
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
                                data-reveal="card"
                                key={item.title}
                              >
                                <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
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

                      <section className="home-achievements section" id="achievements">
                        <div className="container">
                          <div className="section-heading split-heading" data-reveal>
                            <div>
                              <span className="eyebrow"><Award size={15} /> Achievements</span>
                              <h2>Complete achievement gallery.</h2>
                            </div>
                            <p>
                              All {homeAchievementImageTotal} achievement photographs from national recognition,
                              school programs, industry recognition, and institute interactions are shown here on Home.
                            </p>
                          </div>

                          <div className="home-achievement-groups">
                            {homeAchievementSections.map((group, groupIndex) => (
                              <article
                                className="home-achievement-group"
                                data-reveal="card"
                                style={{ "--reveal-delay": `${groupIndex * 70}ms` }}
                                key={group.id}
                              >
                                <div className="home-achievement-group-heading">
                                  <div>
                                    <span>{group.label}</span>
                                    <strong>{group.title}</strong>
                                  </div>
                                  <small>{group.images.length} images</small>
                                </div>

                                <div className="home-achievement-grid">
                                  {group.images.map((image, imageIndex) => (
                                    <button
                                      type="button"
                                      className={imageIndex === 0 ? "is-featured" : ""}
                                      onClick={() => setSelectedMedia({
                                        title: image.title,
                                        category: group.label,
                                        src: image.src,
                                        alt: image.alt,
                                      })}
                                      key={`${group.id}-${image.src}`}
                                    >
                                      <img
                                        src={image.src}
                                        alt={image.alt}
                                        loading="lazy"
                                        decoding="async"
                                        fetchpriority="auto"
                                      />
                                    </button>
                                  ))}
                                </div>
                              </article>
                            ))}
                          </div>

                          <div className="client-preview-actions" data-reveal>
                            <button className="button primary" type="button" onClick={navigateToAchievements}>
                              View achievement page <ArrowRight size={17} />
                            </button>
                          </div>
                        </div>
                      </section>

                      <InstallationMapSection
                        locations={installationLocations}
                        LocationMap={DeferredLeafletLocationMap}
                      />

                    </>
                  )}
                </Suspense>
              </RouteErrorBoundary>
            </m.div>
          </AnimatePresence>
        </main>

        <m.footer
          className="site-footer"
          variants={footerRevealVariants}
          initial={motionInitial}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="container footer-grid">
            <div className="footer-brand" data-reveal style={{ "--reveal-delay": "0ms" }}>
              <img src={aaryaInnovtechHeaderLogo} alt="Aarya Innovtech Pvt. Ltd." loading="lazy" decoding="async" />
              <p>
                Redefining public hygiene infrastructure with engineered Aarya Innovtech solutions
                for sanitation, waste management, recycling, and digital utility access.
              </p>
              <span>Innovate. Integrate. Elevate.</span>
              <div className="footer-social-block" aria-label="Follow Aarya Innovtech">
                <strong>Follow us</strong>
                <div className="footer-socials">
                  <a href="https://in.linkedin.com/in/smart-buddy-818445190" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>

                  <a href="https://www.instagram.com/aaryainnovtech/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>

                </div>
              </div>
            </div>
            <div className="footer-column footer-explore" data-reveal style={{ "--reveal-delay": "80ms" }}>
              <h3>Explore</h3>
              <ul className="footer-link-list">
                <li>
                  <button onClick={navigateToAbout} type="button"><ChevronRight size={15} /> About Us</button>
                </li>
                <li>
                  <button onClick={navigateToClients} type="button"><ChevronRight size={15} /> Clients</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("projects")} type="button"><ChevronRight size={15} /> Products</button>
                </li>
                <li>
                  <button onClick={navigateToAchievements} type="button"><ChevronRight size={15} /> Achievements</button>
                </li>
                <li>
                  <button onClick={navigateToCareer} type="button"><ChevronRight size={15} /> Career</button>
                </li>
                <li>
                  <button onClick={navigateToGallery} type="button"><ChevronRight size={15} /> Gallery</button>
                </li>
                <li>
                  <button onClick={navigateToContact} type="button"><ChevronRight size={15} /> Contact Us</button>
                </li>
              </ul>
            </div>
            <div className="footer-column footer-solutions" data-reveal style={{ "--reveal-delay": "160ms" }}>
              <h3>Products</h3>
              <ul className="footer-link-list">
                {productPageList.map((product) => {
                  const isOpen = openFooterDropdown === product.slug;
                  return (
                    <li key={product.slug} style={{ display: 'flex', flexDirection: 'column', gap: isOpen ? '17px' : '0' }}>
                      <button onClick={() => {
                        if (product.subItems && product.subItems.length > 0) {
                          if (!isOpen) {
                            setOpenFooterDropdown(product.slug);
                          } else {
                            navigateToProduct(product.slug);
                          }
                        } else {
                          navigateToProduct(product.slug);
                        }
                      }} type="button">
                        {product.subItems ? (isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />) : <ChevronRight size={15} />} {product.title}
                      </button>
                      {product.subItems && isOpen && (
                        <ul className="footer-sub-link-list" style={{ paddingLeft: '15px', listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: '17px' }}>
                          {product.subItems.map(sub => (
                            <li key={sub.slug}>
                              <button onClick={() => navigateToProduct(sub.slug)} type="button">
                                <ChevronRight size={15} /> {sub.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}

              </ul>
            </div>
            <div className="footer-contact-column" data-reveal style={{ "--reveal-delay": "240ms" }}>
              <h3>Get in touch</h3>
              <div className="footer-contact-list">
                <a className="footer-contact-item" href="tel:+918806796868">
                  <i><Phone size={21} /></i>
                  <span>
                    <strong>+91 88067 96868 / +91 9923810197</strong>
                    <small>Mon - Sat: 10:00 AM - 06:00 PM</small>
                  </span>
                </a>
                <a className="footer-contact-item" href="mailto:sales@aaryainnovtech.com">
                  <i><Mail size={21} /></i>
                  <span>
                    <strong>sales@aaryainnovtech.com</strong>
                  </span>
                </a>
                <a className="footer-contact-item" href="https://maps.google.com/?q=Flat+No.4A,+Sayali+Darshan+-A-Wing,+Panchavati,+Nashik+-+422003" target="_blank" rel="noopener noreferrer">
                  <i><MapPin size={21} /></i>
                  <span>
                    <strong>Nashik Office</strong>
                    <small>Flat No.4A, Sayali Darshan -A-Wing, Panchavati, Nashik - 422003</small>
                  </span>
                </a>
                <a className="footer-contact-item" href="https://maps.google.com/?q=S-27,+Near+Emerson,+Ambad+MIDC,+Nashik,+Maharashtra+-+422010" target="_blank" rel="noopener noreferrer">
                  <i><Factory size={21} /></i>
                  <span>
                    <strong>Factory</strong>
                    <small>S-27, Near Emerson, Ambad MIDC, Nashik, Maharashtra - 422010</small>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="container footer-bottom">
            <div className="footer-bottom-brand">
              <i><ShieldCheck size={24} /></i>
              <p>Copyright Aarya Innovtech Pvt. Ltd. All Rights Reserved.</p>
            </div>
            <div className="footer-bottom-actions">
              <button onClick={navigateToPrivacyPolicy} type="button">Privacy Policy</button>

              <button className="footer-back-top" onClick={() => hasStandalonePage ? window.scrollTo({ top: 0, behavior: "smooth" }) : scrollToSection("home")} type="button" aria-label="Back to top">
                <ArrowUp size={22} />
              </button>
            </div>
          </div>
        </m.footer>

        <a
          className="floating-whatsapp"
          href="https://wa.me/919503331635?text=Hello%20Aarya%20Innovtech%20team%2C%20I%20need%20help%20with%20a%20solution."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Aarya Innovtech on WhatsApp"
        >
          <WhatsAppIcon size={24} />
          <span className="floating-whatsapp-pulse" />
        </a>

        <a className="floating-call" href="tel:+919503331635" aria-label="Call Aarya Innovtech">
          <Phone size={22} />
        </a>

        {selectedProduct && (
          <div className="modal-backdrop" onMouseDown={() => setSelectedProduct(null)}>
            <article className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1} ref={productModalRef} onMouseDown={(event) => event.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product details"><X /></button>
              <div className={`modal-icon accent-${selectedProduct.accent}`}>
                <selectedProduct.icon size={30} />
              </div>
              <span className="solution-tag">{selectedProduct.tag}</span>
              <h2 id="modal-title">{selectedProduct.title}</h2>
              {selectedProduct.image && <img className="modal-product-image" src={selectedProduct.image} alt={selectedProduct.title} loading="lazy" decoding="async" />}
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
            <article className={`media-modal ${selectedMedia.type === "video" ? "is-video" : ""}`} role="dialog" aria-modal="true" aria-labelledby="media-title" tabIndex={-1} ref={mediaModalRef} onMouseDown={(event) => event.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedMedia(null)} aria-label="Close media viewer"><X /></button>
              {selectedMedia.type === "video" ? (
                <video src={selectedMedia.src} poster={selectedMedia.poster} controls autoPlay playsInline preload="metadata" />
              ) : (
                <img src={selectedMedia.src} alt={selectedMedia.alt} loading="lazy" decoding="async" />
              )}
              <div className="media-caption">
                <span>{selectedMedia.category}</span>
                <h2 id="media-title">{selectedMedia.title}</h2>
              </div>
            </article>
          </div>
        )}
      </>
    </LazyMotion>
  );
}

export default App;
