import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
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
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Users,
  Wind,
  Wrench,
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
  navbarVariants,
  pageTransitionVariants,
  viewportOnce,
} from "./utils/animations.js";

const AboutPage = lazy(() => import("./AboutPage.jsx"));
const AchievementPage = lazy(() => import("./AchievementPage.jsx"));
const ClientPage = lazy(() => import("./ClientPage.jsx"));
const GalleryPage = lazy(() => import("./GalleryPage.jsx"));
const ProductPage = lazy(() => import("./ProductPage.jsx"));
const PrivacyPolicyPage = lazy(() => import("./PrivacyPolicyPage.jsx"));
const LeafletLocationMap = lazy(() => import("./LeafletLocationMap.jsx"));

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

const smartBuddyLogo = "/images/smart-buddy-logo.png";
const heroBackgroundImage = "/media/hero/smartbuddy-abstract-green-hero-bg-lite.jpg";

const heroSlides = [
  {
    eyebrow: "Original Equipment Manufacturer",
    title: "Ideas engineered into reality.",
    text: "Smart Buddy manufactures special purpose machines for the hygiene sector, including public sanitation, waste treatment, recycling, kiosks, and hygiene-support systems.",
    image: "/media/hero/smartbuddy-hero-ranchi-green-eco-toilet.jpg",
  },
  {
    eyebrow: "Electronic ECO Toilet",
    title: "Self-cleaning public toilets for high-footfall places.",
    text: "E2T toilets support automatic flushing, pre-flush, floor and wall cleaning, smart access, backup systems, monitoring, and women-friendly hygiene options.",
    image: "/media/hero/smartbuddy-hero-ranchi-twin-eco-toilet.jpg",
  },
  {
    eyebrow: "Smart public sanitation",
    title: "Compact hygiene systems for modern public spaces.",
    text: "Smart Buddy ECO Toilet installations are designed for gardens, public facilities, campuses, commercial areas, and municipal locations.",
    image: "/media/hero/smartbuddy-hero-green-blue-eco-toilet.jpg",
  },
  {
    eyebrow: "Municipal-ready installations",
    title: "Reliable toilet blocks for local bodies and public projects.",
    text: "Our sanitation units support practical deployment with clear access, strong branding, clean utility panels, and dependable day-to-day operation.",
    image: "/media/hero/smartbuddy-hero-byndoor-eco-toilet.jpg",
  },
  {
    eyebrow: "High-footfall hygiene",
    title: "Scalable public toilet infrastructure built for real sites.",
    text: "From single units to multi-cabin installations, Smart Buddy delivers clean, maintainable, and site-ready sanitation systems.",
    image: "/media/hero/smartbuddy-hero-coastal-eco-toilet-block.jpg",
  },
];

const heroFeaturedImages = [
  {
    src: "/media/hero/electronic-eco-toilet-ranchi-twin.jpg",
    alt: "Electronic ECO Toilet twin cabin installation in a landscaped public site",
  },
  {
    src: "/media/hero/electronic-eco-toilet-green-single.jpg",
    alt: "Green Smart Buddy Electronic ECO Toilet installed outdoors",
  },
  {
    src: "/media/hero/electronic-eco-toilet-park-double.jpeg",
    alt: "Double Electronic ECO Toilet installation in a public park",
  },
];

const newArrivalProduct = {
  eyebrow: "New arrival",
  title: "Solar-ready smart toilet block",
  text: "A compact public toilet block concept with men, women, and accessible cabins, exterior lighting, rooftop solar support, and Smart Buddy branding for civic locations.",
  image: "/media/new-arrivals/utility-toilet-shop-red-render.jpeg",
  images: [
    {
      src: "/media/new-arrivals/utility-toilet-shop-red-render.jpeg",
      alt: "Red smart toilet and shop block render with male, female, and maintenance area entrances",
      label: "Retail utility block",
    },
    {
      src: "/media/new-arrivals/utility-toilet-shop-top-view.jpeg",
      alt: "Top view concept drawing of public toilet block with shop and jogging track",
      label: "Top view plan",
    },
    {
      src: "/media/new-arrivals/smart-buddy-utility-shop-toilet.jpeg",
      alt: "Smart Buddy shop and toilet block concept with public walkway and restroom doors",
      label: "Shop and toilet concept",
    },
    {
      src: "/media/new-arrivals/bio-toilet-plan-specifications.jpeg",
      alt: "Bio toilet concept board with exterior render, plan view, features, and specifications",
      label: "Bio toilet plan",
    },
  ],
  highlights: ["Solar-ready roof", "Accessible cabin", "Men and women layout"],
};

const products = [
  {
    title: "Electronic ECO Toilet",
    short: "Maintainable public toilets with automatic flushing, floor and wall cleaning, smart access, and backup support.",
    text: "E2T toilets are self-cleaning public toilets with automatic flush, pre-flush, controlled access, power and water backup, monitoring, and women-friendly hygiene options.",
    icon: Droplets,
    tag: "Smart sanitation",
    accent: "blue",
    image: "/media/products/electronic-eco-toilet-new.png",
    thumb: "/media/products/thumbs/electronic-eco-toilet-new-thumb.jpg",
    pageSlug: "electronic-eco-toilet",
    features: ["Water saving", "IoT monitoring and SMS intimation", "24x7 surveillance with voice assistance"],
  },
  {
    title: "Bio-Digester",
    short: "On-site, zero-waste treatment using anaerobic bacteria and a specially designed Bio-Digester Tank.",
    text: "The Bio-Digester breaks human waste into water, carbon dioxide, and methane without requiring a sewerage network or sewage treatment plant.",
    icon: Leaf,
    tag: "Waste treatment",
    accent: "teal",
    image: "/media/products/bio-digester-new.png",
    thumb: "/media/products/thumbs/bio-digester-new-thumb.jpg",
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
    thumb: "/media/products/thumbs/organic-waste-composter-new-thumb.jpg",
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
    thumb: "/media/products/thumbs/pet-bottle-rvm-new-thumb.jpg",
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
    thumb: "/media/products/thumbs/computer-health-kiosk-new-thumb.jpg",
    pageSlug: "computer-kiosk",
    features: ["Special purpose machine", "Configurable kiosk format", "Smart Buddy product family"],
  },
];

const solutionJourneys = [
  {
    label: "Public hygiene",
    title: "Cleaner high-footfall access points",
    text: "For gardens, transit areas, campuses, civic spaces, and public toilets that need dependable daily operation.",
    pageSlug: "electronic-eco-toilet",
    icon: Droplets,
    image: "/media/products/electronic-eco-toilet-new.png",
    thumb: "/media/products/thumbs/electronic-eco-toilet-new-thumb.jpg",
    points: ["Self-cleaning", "IoT-ready", "Water conscious"],
  },
  {
    label: "Waste treatment",
    title: "On-site sanitation without heavy civil work",
    text: "Bio-digestion helps sites treat human waste locally when sewerage networks or STP access are limited.",
    pageSlug: "bio-digester",
    icon: Leaf,
    image: "/media/products/bio-digester-new.png",
    thumb: "/media/products/thumbs/bio-digester-new-thumb.jpg",
    points: ["No STP dependency", "Low maintenance", "Zero-waste process"],
  },
  {
    label: "Composting",
    title: "Convert organic waste into compost",
    text: "Compact machines for institutions and communities that want a cleaner biodegradable waste workflow.",
    pageSlug: "organic-waste-composter",
    icon: Wind,
    image: "/media/products/organic-waste-composter-new.png",
    thumb: "/media/products/thumbs/organic-waste-composter-new-thumb.jpg",
    points: ["24-36 hours", "Odour controlled", "Scalable capacity"],
  },
  {
    label: "Recycling",
    title: "Reward-led bottle collection",
    text: "Smart recycling points for PET bottles, cans, and Tetra Pak waste with traceable public participation.",
    pageSlug: "pet-bottle-shredder",
    icon: Store,
    image: "/media/products/pet-bottle-rvm-new.png",
    thumb: "/media/products/thumbs/pet-bottle-rvm-new-thumb.jpg",
    points: ["Touch screen", "Cashback ready", "Live tracking"],
  },
  {
    label: "Digital access",
    title: "Public service kiosk workflows",
    text: "Special-purpose kiosk formats for institutions that need clean, guided, machine-led access points.",
    pageSlug: "computer-kiosk",
    icon: Monitor,
    image: "/media/products/computer-health-kiosk-new.png",
    thumb: "/media/products/thumbs/computer-health-kiosk-new-thumb.jpg",
    points: ["Configurable", "Public-use format", "Service access"],
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
    quote: "A focused 30-second on-site testimonial recorded beside a Smart Buddy public toilet installation.",
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
    quote: "A short field view of a Smart Buddy installation with practical feedback from the site.",
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
    quote: "A compact video note from the site showing the deployed Smart Buddy solution in context.",
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

const homeClientLogos = Array.from({ length: 8 }, (_, index) => {
  const filenames = ["1_1.png", "2.png", "3_1.png", "4.png", "5.png", "6.png", "7.png", "8.png"];
  return { src: `/images/${filenames[index]}`, alt: `Client partner ${index + 1}` };
});

const clientLogos = [
  ...homeClientLogos,
  ...clientRecords.map((client) => ({ src: client.src, alt: client.label })),
];

const clientLogoRows = [clientLogos];

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
  ["About", "about"],
  ["Achievements", "achievements"],
  ["Gallery", "gallery"],
  ["Clients", "clients"],
  ["Contact", "contact"],
];

const getProductSlugFromHash = () => {
  const match = window.location.hash.match(/^#\/products\/([^/?]+)/);
  const slug = match ? decodeURIComponent(match[1]) : null;
  return slug && productPages[slug] ? slug : null;
};

const getClientRouteFromHash = () => /^#\/clients\/?$/.test(window.location.hash);
const getAboutRouteFromHash = () => /^#\/about\/?$/.test(window.location.hash);
const getAchievementRouteFromHash = () => /^#\/achievements\/?$/.test(window.location.hash);
const getGalleryRouteFromHash = () => /^#\/gallery\/?$/.test(window.location.hash);
const getNewArrivalsRouteFromHash = () => /^#\/new-arrivals\/?$/.test(window.location.hash);
const getPrivacyPolicyRouteFromHash = () => /^#\/privacy-policy\/?$/.test(window.location.hash);

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
  const [activeProductSlug, setActiveProductSlug] = useState(() => getProductSlugFromHash());
  const [activeClientPage, setActiveClientPage] = useState(() => getClientRouteFromHash());
  const [activeAboutPage, setActiveAboutPage] = useState(() => getAboutRouteFromHash());
  const [activeAchievementPage, setActiveAchievementPage] = useState(() => getAchievementRouteFromHash());
  const [activeGalleryPage, setActiveGalleryPage] = useState(() => getGalleryRouteFromHash());
  const [activeNewArrivalsPage, setActiveNewArrivalsPage] = useState(() => getNewArrivalsRouteFromHash());
  const [activePrivacyPolicyPage, setActivePrivacyPolicyPage] = useState(() => getPrivacyPolicyRouteFromHash());
  const [heroIndex, setHeroIndex] = useState(0);
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [siteLoading, setSiteLoading] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mailReady, setMailReady] = useState(false);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("All");
  const [statsActive, setStatsActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const productMenuRef = useRef(null);
  const productMenuButtonRef = useRef(null);
  const statsGridRef = useRef(null);
  const activeProductPage = activeProductSlug ? productPages[activeProductSlug] : null;
  const visibleGalleryItems = galleryItems.filter((item) => activeGalleryFilter === "All" || item.category === activeGalleryFilter);
  const currentPageKey = activeProductPage
    ? `product-${activeProductSlug}`
    : activeClientPage
      ? "clients"
      : activeAboutPage
        ? "about"
        : activeAchievementPage
          ? "achievements"
          : activeGalleryPage
            ? "gallery"
            : activeNewArrivalsPage
              ? "new-arrivals"
              : activePrivacyPolicyPage
                ? "privacy-policy"
                : "home";
  const motionInitial = prefersReducedMotion ? false : "hidden";

  useEffect(() => {
    let removeTimer;
    const frameId = window.requestAnimationFrame(() => {
      setLoaderProgress(100);
      setSiteLoading(false);
      removeTimer = window.setTimeout(() => setLoaderVisible(false), 320);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      activeProductSlug ||
      activeClientPage ||
      activeAboutPage ||
      activeAchievementPage ||
      activeGalleryPage ||
      activeNewArrivalsPage ||
      activePrivacyPolicyPage
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [activeAboutPage, activeAchievementPage, activeClientPage, activeGalleryPage, activeNewArrivalsPage, activePrivacyPolicyPage, activeProductSlug, prefersReducedMotion]);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      activeProductSlug ||
      activeClientPage ||
      activeAboutPage ||
      activeAchievementPage ||
      activeGalleryPage ||
      activeNewArrivalsPage ||
      activePrivacyPolicyPage
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setFeaturedImageIndex((current) => (current + 1) % heroFeaturedImages.length);
    }, 4300);
    return () => window.clearInterval(timer);
  }, [activeAboutPage, activeAchievementPage, activeClientPage, activeGalleryPage, activeNewArrivalsPage, activePrivacyPolicyPage, activeProductSlug, prefersReducedMotion]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const nextScrolled = window.scrollY > 20;
        const nextProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

        setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
        setScrollProgress((current) => (Math.abs(current - nextProgress) < 0.35 ? current : nextProgress));
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeProductSlug, activeClientPage, activeAboutPage, activeAchievementPage, activeGalleryPage, activeNewArrivalsPage, activePrivacyPolicyPage]);

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
  }, [activeProductSlug, activeClientPage, activeAboutPage, activeAchievementPage, activeGalleryPage, activeNewArrivalsPage, activePrivacyPolicyPage]);

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
  }, [activeProductSlug, activeClientPage, activeAboutPage, activeAchievementPage, activeGalleryPage, activeNewArrivalsPage, activePrivacyPolicyPage]);

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
  }, [activeAboutPage, activeAchievementPage, activeClientPage, activeGalleryPage, activeNewArrivalsPage, activePrivacyPolicyPage, activeProductPage, statsActive]);

  useEffect(() => {
    const syncRoute = () => {
      setActiveProductSlug(getProductSlugFromHash());
      setActiveClientPage(getClientRouteFromHash());
      setActiveAboutPage(getAboutRouteFromHash());
      setActiveAchievementPage(getAchievementRouteFromHash());
      setActiveGalleryPage(getGalleryRouteFromHash());
      setActiveNewArrivalsPage(getNewArrivalsRouteFromHash());
      setActivePrivacyPolicyPage(getPrivacyPolicyRouteFromHash());
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
          : activeAchievementPage
            ? "Achievements | Smart Buddy"
            : activeGalleryPage
              ? "Gallery | Smart Buddy"
              : activeNewArrivalsPage
                ? "New Arrivals | Smart Buddy"
                : activePrivacyPolicyPage
                  ? "Privacy Policy | Smart Buddy"
                  : "Smart Buddy | Aarya Innovtech";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activeProductPage, activeClientPage, activeAboutPage, activeAchievementPage, activeGalleryPage, activeNewArrivalsPage, activePrivacyPolicyPage]);

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

  const scrollToSection = (sectionId) => {
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

    if (sectionId === "gallery") {
      navigateToGallery();
      return;
    }

    setMenuOpen(false);
    setProductMenuOpen(false);

    if (activeProductSlug || activeClientPage || activeAboutPage || activeAchievementPage || activeGalleryPage || activeNewArrivalsPage || activePrivacyPolicyPage) {
      window.history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
      setActiveProductSlug(null);
      setActiveClientPage(false);
      setActiveAboutPage(false);
      setActiveAchievementPage(false);
      setActiveGalleryPage(false);
      setActiveNewArrivalsPage(false);
      setActivePrivacyPolicyPage(false);
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
    setActiveAchievementPage(false);
    setActiveGalleryPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);

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
    setActiveAchievementPage(false);
    setActiveGalleryPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeClientPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = "/clients";
  };

  const navigateToAchievements = () => {
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveAboutPage(false);
    setActiveClientPage(false);
    setActiveGalleryPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeAchievementPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = "/achievements";
  };

  const navigateToGallery = () => {
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveAboutPage(false);
    setActiveClientPage(false);
    setActiveAchievementPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeGalleryPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = "/gallery";
  };

  const navigateToProduct = (slug) => {
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveClientPage(false);
    setActiveAboutPage(false);
    setActiveAchievementPage(false);
    setActiveGalleryPage(false);
    setActiveNewArrivalsPage(false);
    setActivePrivacyPolicyPage(false);
    if (activeProductSlug === slug) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = `/products/${slug}`;
  };

  const navigateToNewArrivals = () => {
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveProductSlug(null);
    setActiveClientPage(false);
    setActiveAboutPage(false);
    setActiveAchievementPage(false);
    setActiveGalleryPage(false);
    setActivePrivacyPolicyPage(false);

    if (activeNewArrivalsPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = "/new-arrivals";
  };

  const navigateToPrivacyPolicy = () => {
    setMenuOpen(false);
    setProductMenuOpen(false);
    setActiveProductSlug(null);
    setActiveClientPage(false);
    setActiveAboutPage(false);
    setActiveAchievementPage(false);
    setActiveGalleryPage(false);
    setActiveNewArrivalsPage(false);

    if (activePrivacyPolicyPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = "/privacy-policy";
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
    <LazyMotion features={domAnimation}>
      <>
      {loaderVisible ? (
        <div className={`site-loader ${siteLoading ? "" : "is-hidden"}`} role="status" aria-label="Loading Smart Buddy website">
          <div className="site-loader-panel">
            <img src={smartBuddyLogo} alt="" aria-hidden="true" decoding="async" />
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
            <span className="site-loader-percent">{loaderProgress}%</span>
          </div>
        </div>
      ) : null}
      <m.header
        className={`site-header ${scrolled || activeAboutPage || activeNewArrivalsPage || activePrivacyPolicyPage ? "is-scrolled" : ""}`}
        variants={navbarVariants}
        initial={motionInitial}
        animate="visible"
      >
        <span className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        <nav className="container navbar" aria-label="Main navigation">
          <button className="brand" onClick={() => scrollToSection("home")} aria-label="Go to home">
            <img src={smartBuddyLogo} alt="Smart Buddy" />
          </button>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`} id="primary-navigation">
            {navLinks.slice(0, 1).map(([label, section]) => (
              <button
                className={!activeProductPage && !activeClientPage && !activeAboutPage && !activeAchievementPage && !activeGalleryPage && !activeNewArrivalsPage && !activePrivacyPolicyPage && activeSection === section ? "is-active" : ""}
                onClick={() => scrollToSection(section)}
                aria-current={!activeProductPage && !activeClientPage && !activeAboutPage && !activeAchievementPage && !activeGalleryPage && !activeNewArrivalsPage && !activePrivacyPolicyPage && activeSection === section ? "page" : undefined}
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
                className={activeProductPage || activeNewArrivalsPage ? "is-active" : ""}
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
                <button
                  className={activeNewArrivalsPage ? "is-active" : ""}
                  type="button"
                  onClick={() => {
                    navigateToNewArrivals();
                    productMenuButtonRef.current?.focus();
                  }}
                >
                  New arrivals <Sparkles size={14} />
                </button>
              </div>
            </div>
            {navLinks.slice(1).map(([label, section]) => (
              <button
                className={
                  section === "about" && activeAboutPage
                    ? "is-active"
                    : section === "achievements" && activeAchievementPage
                      ? "is-active"
                    : section === "gallery" && activeGalleryPage
                      ? "is-active"
                    : section === "clients" && activeClientPage
                      ? "is-active"
                      : !activeProductPage && !activeClientPage && !activeAboutPage && !activeAchievementPage && !activeGalleryPage && !activeNewArrivalsPage && !activePrivacyPolicyPage && activeSection === section
                        ? "is-active"
                        : ""
                }
                onClick={() => scrollToSection(section)}
                aria-current={
                  (section === "about" && activeAboutPage) ||
                  (section === "achievements" && activeAchievementPage) ||
                  (section === "gallery" && activeGalleryPage) ||
                  (section === "clients" && activeClientPage) ||
                  (!activeProductPage && !activeClientPage && !activeAboutPage && !activeAchievementPage && !activeGalleryPage && !activeNewArrivalsPage && !activePrivacyPolicyPage && activeSection === section)
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
            aria-controls="primary-navigation"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
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
            ) : activeGalleryPage ? (
              <GalleryPage onNavigateHome={scrollToSection} onOpenMedia={setSelectedMedia} />
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
              fetchPriority="high"
            />
          </div>
          <div className="hero-overlay" />
          <div className="hero-mobile-product-bg" aria-hidden="true">
            <img
              src={heroFeaturedImages[featuredImageIndex].src}
              alt=""
              loading="eager"
              decoding="async"
              key={`mobile-hero-${heroFeaturedImages[featuredImageIndex].src}`}
            />
          </div>
          <div className="container hero-inner">
            <m.div className="hero-copy" variants={heroContainerVariants}>
              <m.span className="eyebrow light" variants={heroItemVariants}>
                <Sparkles size={15} /> {heroSlides[heroIndex].eyebrow}
              </m.span>
              <m.h1 variants={heroItemVariants}>{heroSlides[heroIndex].title}</m.h1>
              <m.p variants={heroItemVariants}>{heroSlides[heroIndex].text}</m.p>
              <m.div className="hero-actions" variants={heroItemVariants}>
                <button className="button primary" onClick={() => scrollToSection("solutions")}>
                  Explore solutions <ArrowRight size={18} />
                </button>
                <button className="button glass" onClick={() => scrollToSection("contact")}>
                  Talk to our team
                </button>
              </m.div>
              <m.div className="hero-mini-panel" aria-label="Smart Buddy quick highlights" variants={heroItemVariants}>
                <span><BadgeCheck size={14} /> OEM since 2010</span>
                <span><ShieldCheck size={14} /> ISO, CE, MPCB</span>
                <span><Factory size={14} /> Hygiene-sector machines</span>
              </m.div>
            </m.div>
            <m.div
              className="hero-showcase"
              variants={heroVisualVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.006 }}
            >
              <div className="hero-featured-product">
                <div className="hero-featured-copy">
                  <span className="hero-featured-kicker"><Star size={13} /> Featured product</span>
                  <h2>Electronic ECO<br />Toilet</h2>
                  <i aria-hidden="true" />
                  <p>IoT-enabled, water-saving, self-sustaining public toilet solution for cleaner, greener communities.</p>
                </div>
                <button
                  className="hero-featured-stage"
                  type="button"
                  onClick={() => navigateToProduct(products[0].pageSlug)}
                  aria-label={`Open ${products[0].title}`}
                >
                  <span className="hero-featured-glow" aria-hidden="true" />
                  <span className="hero-featured-curtain" key={heroFeaturedImages[featuredImageIndex].src}>
                    <img
                      src={heroFeaturedImages[featuredImageIndex].src}
                      alt={heroFeaturedImages[featuredImageIndex].alt}
                      loading="eager"
                      decoding="async"
                    />
                  </span>
                  <span className="hero-featured-dots" aria-hidden="true">
                    {heroFeaturedImages.map((image, index) => (
                      <i className={index === featuredImageIndex ? "is-active" : ""} key={image.src} />
                    ))}
                  </span>
                </button>
              </div>
              <div className="hero-product-strip" aria-label="Featured Smart Buddy products">
                {products.slice(0, 4).map((product) => (
                  <button
                    className="hero-product-tile"
                    type="button"
                    onClick={() => navigateToProduct(product.pageSlug)}
                    key={product.title}
                  >
                    <img src={product.thumb ?? product.image} alt="" loading="lazy" decoding="async" />
                    <strong>{product.title}</strong>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
              <div className="hero-proof-strip" aria-label="Smart Buddy proof points">
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
                    key={slide.image}
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

        <section className="section solutions solution-studio" id="solutions">
          <div className="container">
            <div className="solution-studio-heading" data-reveal>
              <span className="eyebrow"><Leaf size={15} /> Solution studio</span>
              <h2>Plan the site first. Choose the machine with confidence.</h2>
              <p>
                A lighter way to navigate Smart Buddy systems: start with the site need, then move into
                the right product family for deployment details.
              </p>
            </div>

            <div className="solution-studio-grid">
              <aside className="solution-studio-brief" data-reveal>
                <span className="solution-brief-kicker">01 / Site brief</span>
                <h3>Tell us the location, usage pattern, utilities, and waste stream.</h3>
                <p>
                  We map the requirement to a practical Smart Buddy configuration, keeping operation,
                  maintenance, and public usability in view from day one.
                </p>
                <div className="solution-brief-list" aria-label="Solution planning inputs">
                  <span><MapPin size={16} /> Site type</span>
                  <span><Users size={16} /> Footfall</span>
                  <span><Droplets size={16} /> Water and power</span>
                  <span><Wrench size={16} /> Maintenance plan</span>
                </div>
                <button className="button primary" type="button" onClick={() => scrollToSection("contact")}>
                  Discuss requirement <ArrowRight size={17} />
                </button>
              </aside>

              <div className="solution-journeys" aria-label="Smart Buddy solution paths">
                {solutionJourneys.map((journey, index) => {
                  const product = products.find((item) => item.pageSlug === journey.pageSlug);
                  const Icon = journey.icon;

                  return (
                    <button
                      className={`solution-journey ${index === 0 ? "is-featured" : ""}`}
                      type="button"
                      onClick={() => product && openProduct(product)}
                      style={{ "--reveal-delay": `${index * 70}ms` }}
                      data-reveal
                      key={journey.title}
                    >
                      <div className="solution-journey-copy">
                        <span className="solution-journey-index"><Icon size={16} /> 0{index + 1} / {journey.label}</span>
                        <h3>{journey.title}</h3>
                        <p>{journey.text}</p>
                        <div className="solution-journey-tags">
                          {journey.points.map((point) => <span key={point}>{point}</span>)}
                        </div>
                      </div>
                      <div className="solution-journey-media">
                        <img src={journey.thumb ?? journey.image} alt="" loading="lazy" decoding="async" />
                      </div>
                      <span className="solution-journey-action" aria-hidden="true">
                        <ArrowRight size={17} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
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
            <div className="stats-grid" ref={statsGridRef}>
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <article className="stat" style={{ "--reveal-delay": `${index * 80}ms` }} data-reveal key={stat.label}>
                    <div className="stat-topline">
                      <i><Icon size={17} /></i>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                    </div>
                    <strong><CountValue value={stat.value} active={statsActive} /></strong>
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
                <img src="/media/eco-toilet-ranchi-twin.jpeg" alt="Installed Smart Buddy electronic eco toilets" loading="lazy" decoding="async" />
              </div>
              <div className="mascot-card">
                <img src="/images/smart_buddy.png" alt="Smart Buddy mascot" loading="lazy" decoding="async" />
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
                The product range covers Electronic ECO Toilet, Bio-Digester, Organic Waste
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

        <section className="clients" id="clients">
          <div className="container">
            <div className="client-showcase">
              <div className="section-heading centered client-showcase-heading" data-reveal>
                <span className="eyebrow"><Users size={15} /> Our clients</span>
                <h2>Trusted by public-sector and institutional organizations.</h2>
              </div>
              <div className="client-marquee" aria-label="Client partner logos">
                {clientLogoRows.map((row, rowIndex) => (
                  <div className="client-marquee-row" key={`client-row-${rowIndex}`}>
                    <div className="client-marquee-track">
                      {[0, 1].map((copyIndex) => (
                        <div
                          className="client-grid"
                          aria-hidden={copyIndex > 0 || undefined}
                          key={`client-row-${rowIndex}-copy-${copyIndex}`}
                        >
                          {row.map((logo, index) => (
                            <div
                              className="client-logo"
                              style={{ "--reveal-delay": `${Math.min(index + rowIndex * 8, 18) * 35}ms` }}
                              data-reveal={copyIndex === 0 || undefined}
                              key={`${logo.src}-${rowIndex}-${copyIndex}-${index}`}
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
                ))}
              </div>
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
              <span className="eyebrow"><MessageCircle size={15} /> Video testimonials</span>
              <h2>Field feedback from Smart Buddy installations.</h2>
              <p>Short client-side videos with simple, professional context from real project locations.</p>
            </div>
            <div className="testimonial-list" aria-label="Smart Buddy video testimonials">
              <div className="testimonial-marquee-track">
                {[0, 1].map((copyIndex) => (
                  <div className="testimonial-marquee-group" key={copyIndex}>
                    {testimonials.map((testimonial, index) => {
                      const testimonialName = testimonial.name || testimonial.title || `Client testimonial ${index + 1}`;
                      const testimonialInitial = String(testimonialName).trim().charAt(0) || "S";

                      return (
                        <m.article
                          className="testimonial-card testimonial-video-card"
                          data-reveal
                          variants={carouselItemVariants}
                          initial={motionInitial}
                          animate="visible"
                          key={`${copyIndex}-${testimonial.video ?? testimonialName}`}
                        >
                          <div className="testimonial-video-shell">
                            {testimonial.video ? (
                              <button
                                className="testimonial-video-trigger"
                                type="button"
                                onClick={() => setSelectedMedia({
                                  title: testimonialName,
                                  category: testimonial.role ?? "Video testimonial",
                                  src: testimonial.video,
                                  alt: testimonialName,
                                  type: "video",
                                  poster: testimonial.poster,
                                })}
                                aria-label={`Play ${testimonialName} video`}
                              >
                                <img src={testimonial.poster} alt="" loading="lazy" decoding="async" />
                                <span>
                                  <PlayCircle size={30} />
                                  Play
                                </span>
                              </button>
                            ) : (
                              <div className="testimonial-video-fallback">
                                <PlayCircle size={28} />
                                <span>Video testimonial</span>
                              </div>
                            )}
                          </div>
                          <div className="testimonial-context">
                            <span className="avatar">{testimonialInitial}</span>
                            <div>
                              <strong>{testimonialName}</strong>
                              <p>{testimonial.quote ?? "Smart Buddy customer feedback and project highlight."}</p>
                              <small>{testimonial.role ?? "Client feedback"}</small>
                            </div>
                          </div>
                        </m.article>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section installation-map" aria-labelledby="installation-map-title">
          <div className="container">
            <div className="installation-map-heading" data-reveal>
              <span className="eyebrow"><MapPin size={15} /> Installed toilet locations</span>
              <h2 id="installation-map-title">Location-wise Smart Buddy installation points.</h2>
              <p>Leaflet map view of the same locations from the previous installation map.</p>
            </div>
            <div className="installation-map-layout" data-reveal>
              <div className="leaflet-map-shell">
                <DeferredLeafletLocationMap locations={installationLocations} />
              </div>
              <div className="installation-location-list" aria-label="Installed toilet location names">
                {installationLocations.map((location) => (
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

        <section className="contact" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <span className="eyebrow light"><Mail size={15} /> Contact Aarya Innovtech</span>
              <h2>Original Equipment Manufacturer of special purpose machines.</h2>
              <p>Share your requirement for Electronic ECO Toilet, Bio-Digester, Organic Waste Composter, PET Bottle Shredder, or Computer Kiosk.</p>
              <div className="contact-benefits">
                <span><BadgeCheck size={15} /> OEM since 2010</span>
                <span><Wrench size={15} /> Hygiene-sector product range</span>
                <span><Globe2 size={15} /> Public utility deployments</span>
              </div>
              <div className="contact-details">
                <a href="tel:+918806796868" aria-label="Call Aarya Innovtech">
                  <i><Phone size={17} /></i>
                  <span><small>Call us</small>+91 8806796868</span>
                </a>
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
            </Suspense>
          </m.div>
        </AnimatePresence>
      </main>

      <m.footer
        variants={footerRevealVariants}
        initial={motionInitial}
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="container footer-assurance">
          <div><BadgeCheck size={20} /><span><strong>OEM since 2010</strong>Special purpose machines in hygiene sector</span></div>
          <div><Wrench size={20} /><span><strong>Smart Buddy range</strong>ECO Toilet, Bio-Digester, Composter, RVM and Kiosk</span></div>
          <div><MessageCircle size={20} /><span><strong>Office network</strong>Nashik Office, Mumbai Office and Ambad MIDC factory</span></div>
        </div>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={smartBuddyLogo} alt="Smart Buddy" loading="lazy" decoding="async" />
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
          <p>All copyright reserve Aarya Innov Tech</p>
          <div className="footer-bottom-actions">
            <button onClick={navigateToPrivacyPolicy} type="button">
              Privacy Policy <ArrowUpRight size={14} />
            </button>
            <button onClick={() => activeProductPage || activeClientPage || activeAboutPage || activeAchievementPage || activeGalleryPage || activeNewArrivalsPage || activePrivacyPolicyPage ? window.scrollTo({ top: 0, behavior: "smooth" }) : scrollToSection("home")} type="button">
              Back to top <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </m.footer>

      <a
        className="floating-whatsapp"
        href="https://wa.me/918806796868?text=Hello%20Smart%20Buddy%20team%2C%20I%20need%20help%20with%20a%20solution."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Aarya Innovtech on WhatsApp"
      >
        <WhatsAppIcon size={24} />
        <span className="floating-whatsapp-pulse" />
      </a>

      <a className="floating-call" href="tel:+918806796868" aria-label="Call Aarya Innovtech">
        <Phone size={22} />
      </a>

      {selectedProduct && (
        <div className="modal-backdrop" onMouseDown={() => setSelectedProduct(null)}>
          <article className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
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
          <article className="media-modal" role="dialog" aria-modal="true" aria-labelledby="media-title" onMouseDown={(event) => event.stopPropagation()}>
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
