const newImage = (file) => `/new%20images/${file}`;
const productImage = (file) => `/media/products/product-page-images/${file}`;
const profileProductImage = (file) => `/media/pdf-profile-products/${file}`;
const brochurePdf = (file) => `/brochures/${file}`;

const brochureFiles = {
  electronicEcoToilet: brochurePdf("smart-buddy-electronic-eco-toilet.pdf"),

  bioDigester: brochurePdf("smart-buddy-bio-digester.pdf"),
  organicWasteComposter: brochurePdf("smart-buddy-organic-waste-composter.pdf"),
  petBottleShredder: brochurePdf("smart-buddy-pet-bottle-shredder-rvm.pdf"),
};

const commonPublicSites = ["Highways", "Malls", "Airports", "Railway Stations", "Tourist Places", "Smart City"];

const electronicEcoToilet = {
  slug: "electronic-eco-toilet",
  title: "Electronic ECO Toilet",
  navLabel: "Electronic ECO Toilet",
  subtitle: "Maintainable public toilet with automatic cleaning",
  summary:
    "Electronic ECO Toilets are maintainable public toilets with self-cleaning mechanisms. They support automatic flushing, automatic pre-flush, controlled entry, power backup, water backup, and women-friendly hygiene features.",
  image: "/imagesss/toilet 1.jpeg",
  imageAlt: "Electronic ECO Toilet",
  galleryImages: [
    { src: "/imagesss/toilet 1.jpeg", alt: "Electronic ECO Toilet - Image 1" },
    { src: "/imagesss/toilet 2.jpeg", alt: "Electronic ECO Toilet - Image 2" },
    { src: "/imagesss/toilet 4.jpeg", alt: "Electronic ECO Toilet - Image 4" },
    { src: "/imagesss/toilet 5.jpeg", alt: "Electronic ECO Toilet - Image 5" },
    { src: "/imagesss/toilet 6.jpeg", alt: "Electronic ECO Toilet - Image 6" },
  ],
  heroPoints: [
    "Automatic flushing and pre-flush",
    "Floor and wall pressurized cleaning",
    "Power and water backup",
    "Coin, smart-card, or push-button entry",
    "Women-friendly vending and incinerator options",
  ],
  infoCards: [
    { type: "features", title: "Major Features", text: "Water saving, waste treatment, IoT monitoring, SMS intimation, surveillance, and anti-theft alarm." },
    { type: "applications", title: "Where It Can Be Installed", text: commonPublicSites.join(", ") },
    { type: "benefits", title: "Impact", text: "Supports reduced open defecation, healthcare cost reduction, job creation, and environmental stewardship." },
    { type: "customization", title: "Variants", text: "Push button, token or coin, smart card and coin, plus male and female community urinal variants." },
  ],
  specifications: [
    { label: "Toilet Model", value: "SB-E2T-MDL1 - Push button" },
    { label: "Toilet Model", value: "SB-E2T-MDL2/3 - Token/Coin" },
    { label: "Toilet Model", value: "SB-E2T-MDL4/5 - Smart Card & Coin" },
    { label: "Urinal Model", value: "SB-CU-M - Male Community Urinals" },
    { label: "Urinal Model", value: "SB-CU-F - Female Community Urinals" },
    { label: "Interior", value: "Stainless steel interiors 304" },
    { label: "Exterior", value: "ACP panel exterior" },
    { label: "Wall Construction", value: "3 layer wall construction" },
    { label: "Water Tank", value: "Overhead water tank for 500 liter daily need" },
    { label: "Backup", value: "UPS battery backup for almost a week" },
    { label: "Monitoring", value: "GSM / GPRS technology through web-enabled platform" },
  ],
  technicalDetails: [
    "Self-cleaning mechanism flushes automatically even if the user forgets.",
    "Floor and wall cleaner functions automatically after four to ten visits.",
    "Fans and lights operate only when the toilet is in use.",
    "Toilet disables new entry when backup power or water gets depleted.",
    "Tamper-proof, corrosion-free, rugged and long-lasting structure.",
    "24X7 surveillance with voice assistance and anti-theft alarm.",
    "Supports integration of renewable energy and revenue generation model.",
  ],
  brochureUrl: brochureFiles.electronicEcoToilet,
  brochureFilename: "Smart_Buddy_Electronic_ECO_Toilet.pdf",
  downloads: [
    {
      label: "Electronic ECO Toilet brochure",
      url: brochureFiles.electronicEcoToilet,
      filename: "Smart_Buddy_Electronic_ECO_Toilet.pdf",
    },
  ],
  quoteText: "Share your installation location and access type for the right E2T model.",
};

const bioDigester = {
  slug: "bio-digester",
  title: "Bio-Digester",
  navLabel: "Bio-Digester",
  subtitle: "On-site waste treatment without sewer dependency",
  summary:
    "Bio-Digester is a zero-waste on-site sanitation treatment system using anaerobic bio-digestion technology. It does not need a sewerage network or sewage treatment plant and can work as an independent system.",
  image: profileProductImage("bio-digester-tank.jpg"),
  imageAlt: "Bio-Digester tank system",
  galleryImages: [
    { src: profileProductImage("bio-digester-tank.jpg"), alt: "Bio-Digester tank from company profile" },
  ],
  heroPoints: [
    "No sewerage network required",
    "No sewage treatment plant required",
    "No moving parts",
    "No de-sludging or cleaning needed",
    "Effluent usable for irrigation and gardening",
  ],
  infoCards: [
    { type: "features", title: "Technology", text: "Anaerobic Microbial Inoculum, also known as AMI or DRDO bacteria, with a Bio-Digester Tank." },
    { type: "applications", title: "Installation", text: "Connected to the toilet outlet and installed either above or below the ground." },
    { type: "benefits", title: "Hygiene", text: "Reduces pathogens by more than 99% and organic matter by 99%." },
    { type: "customization", title: "Maintenance", text: "No foul smell, no clogging, and no infestation of cockroaches or flies." },
  ],
  specifications: [
    { label: "Technology", value: "Anaerobic bio-digestion" },
    { label: "Bacteria Formulation", value: "Anaerobic Microbial Inoculum (AMI or DRDO bacteria)" },
    { label: "Tank", value: "Bio-Digester Tank (BDT)" },
    { label: "Installation", value: "Above ground or below ground" },
    { label: "Output", value: "Water, carbon dioxide, methane (biogas), and safe liquid effluent" },
    { label: "Pathogen Reduction", value: ">99%" },
    { label: "Organic Matter Reduction", value: "99%" },
  ],
  technicalDetails: [
    "Psychrotrophic bacteria break down waste matter into usable water and gas through an anaerobic process.",
    "The system is not limited by place or temperature and does not require major infrastructure.",
    "Human waste is treated into effluent that is safe to discharge.",
    "Commercially available toilet cleaners can be used.",
    "Effluent is non-toxic and usable for irrigation and gardening purposes.",
    "Effluent is free from odour and solid waste.",
  ],
  brochureUrl: brochureFiles.bioDigester,
  brochureFilename: "Smart_Buddy_Bio-Digester.pdf",
  downloads: [
    {
      label: "Bio-Digester brochure",
      url: brochureFiles.bioDigester,
      filename: "Smart_Buddy_Bio-Digester.pdf",
    },
  ],
  quoteText: "Share the toilet count and site condition for the right Bio-Digester setup.",
};

const organicWasteComposter = {
  slug: "organic-waste-composter",
  title: "Organic Waste Composter",
  navLabel: "Organic Waste Composter",
  subtitle: "Converts biodegradable waste into compost in 24-36 hours",
  summary:
    "The Organic Waste Composter breaks down complex biodegradable waste into simpler forms and converts it into compost. It uses a geared motor for mixing and churning and a high-speed motor to crush waste material.",
  image: profileProductImage("organic-waste-composter.jpg"),
  imageAlt: "Organic Waste Composter machine",
  galleryImages: [
    { src: profileProductImage("organic-waste-composter.jpg"), alt: "Organic Waste Composter machine from company profile" },
  ],
  heroPoints: [
    "Entire composting process in one machine",
    "Compost ready within 24-36 hours",
    "No noise, no odor and no maintenance required",
    "Fully automatic yet compact",
    "In-built temperature management",
  ],
  infoCards: [
    { type: "features", title: "Product Features", text: "Compact, safe, easy to operate, and built for high quality organic compost output." },
    { type: "applications", title: "Area of Applications", text: "Buildings, educational institutes, vegetable markets, small townships, marriage halls, malls, industries, and hotels." },
    { type: "benefits", title: "Fabrication", text: "Stainless steel or mild steel with epoxy coating fabrication for maximum durability." },
    { type: "customization", title: "Capacity Range", text: "Standard profile capacities from 25 kg/day to 2000 kg/day." },
  ],
  specifications: [
    { label: "Model", value: "AT-AOWC-25 - 25 kg/day" },
    { label: "Model", value: "AT-AOWC-50 - 50 kg/day" },
    { label: "Model", value: "AT-AOWC-100 - 100 kg/day" },
    { label: "Model", value: "AT-AOWC-150 - 150 kg/day" },
    { label: "Model", value: "AT-AOWC-250 - 250 kg/day" },
    { label: "Model", value: "AT-AOWC-350 - 350 kg/day" },
    { label: "Model", value: "AT-AOWC-500 - 500 kg/day" },
    { label: "Model", value: "AT-AOWC-750 - 750 kg/day" },
    { label: "Model", value: "AT-AOWC-1000 - 1000 kg/day" },
    { label: "Model", value: "AT-AOWC-1500 - 1500 kg/day" },
    { label: "Model", value: "AT-AOWC-2000 - 2000 kg/day" },
  ],
  technicalDetails: [
    "Geared motor supports mixing and churning.",
    "High-speed motor crushes waste material.",
    "Converts biodegradable waste into compost.",
    "Stainless steel or mild steel with epoxy coating fabrication.",
    "Compact, safe and easy to operate.",
  ],
  brochureUrl: brochureFiles.organicWasteComposter,
  brochureFilename: "Smart_Buddy_Organic_Waste_Composter.pdf",
  downloads: [
    {
      label: "Organic Waste Composter brochure",
      url: brochureFiles.organicWasteComposter,
      filename: "Smart_Buddy_Organic_Waste_Composter.pdf",
    },
  ],
  quoteText: "Share your daily organic waste quantity to select the right AOWC model.",
};

const petBottleShredder = {
  slug: "pet-bottle-shredder",
  title: "PET Bottle Shredder",
  navLabel: "PET Bottle Shredder",
  subtitle: "Disposal and incentivized recycling for bottles, cans and Tetra Pak",
  summary:
    "PET Bottle Shredder helps recycle empty bottles, cans, and Tetra Pak waste with touch screen operation, object checking, and tracking features.",
  image: profileProductImage("pet-bottle-shredder-rvm.jpg"),
  imageAlt: "PET Bottle Shredder",
  galleryImages: [
    { src: profileProductImage("pet-bottle-shredder-rvm.jpg"), alt: "PET Bottle Shredder product image" },
  ],
  heroPoints: [
    "Suitable for PET bottles, aluminium cans and Tetra Pak",
    "Object verification system",
    "21 inch user interactive touch screen",
    "E-wallet cashback",
    "IoT integration and 24X7 live machine tracking",
  ],
  infoCards: [
    { type: "features", title: "Product Features", text: "Municipal waste disposal by shredding with object verification and safety protections." },
    { type: "applications", title: "Where It Can Be Installed", text: "Bus stands, malls, airports, railway stations, tourist places, gardens, and events." },
    { type: "benefits", title: "Advance Features", text: "Touch screen, e-wallet cashback, app-based or cloud controlling, IoT integration, and live tracking." },
    { type: "customization", title: "Shredder Build", text: "Two counter rotating shafts, mild steel body, and hardened special alloy steel cutter." },
  ],
  specifications: [
    { label: "Waste Type", value: "PET bottle, aluminium cans and Tetra Pak" },
    { label: "Body Material", value: "Mild Steel" },
    { label: "Cutter Material", value: "Hardened Special Alloy Steel" },
    { label: "Touch Screen", value: "21 inch user interactive touch screen" },
    { label: "Controls", value: "App based / cloud controlling" },
    { label: "Tracking", value: "24X7 live machine tracking" },
  ],
  technicalDetails: [
    "Material is grabbed between two counter rotating shafts.",
    "Door-open cut off switch is included as a safety feature.",
    "Motor trips off if the waste loading lid is open.",
    "Short circuit protection is included.",
    "Reverse vending can return money or other incentives to the recycler.",
  ],
  brochureUrl: brochureFiles.petBottleShredder,
  brochureFilename: "Smart_Buddy_PET_Bottle_Shredder_RVM.pdf",
  downloads: [
    {
      label: "PET Bottle Shredder brochure",
      url: brochureFiles.petBottleShredder,
      filename: "Smart_Buddy_PET_Bottle_Shredder_RVM.pdf",
    },
  ],
  quoteText: "Share the installation location and expected bottle collection volume.",
};

const ticketKiosk = {
  slug: "ticket-kiosk",
  hideBrochure: true,
  title: "Ticket Kiosk",
  navLabel: "Ticket Kiosk",
  subtitle: "Self-service ticketing solution",
  summary: "Ticket Kiosks provide a quick, automated way for customers to purchase and print tickets for transit, events, or parking.",
  image: "/imagesss/ticket kisok.jpeg",
  imageAlt: "Ticket Kiosk",
  galleryImages: [{ src: "/imagesss/ticket kisok.jpeg", alt: "Ticket Kiosk" }],
  heroPoints: ["Automated ticketing", "User-friendly interface", "Secure transactions"],
  infoCards: [
    { type: "features", title: "Product", text: "Ticket Kiosk for automated pass and ticket printing." },
    { type: "applications", title: "Use", text: "Transit stations, parks, and event venues." },
    { type: "benefits", title: "Efficiency", text: "Reduces queue wait times and operational costs." },
    { type: "customization", title: "Customization", text: "Can integrate various payment modules." },
  ],
  specifications: [{ label: "Product Category", value: "Ticket Kiosk" }],
  technicalDetails: ["Available with customizable touchscreen and printer.", "Integrates with central management software."],
  downloads: ["Ticket Kiosk brochure"],
  quoteText: "Share your ticketing requirements.",
};

const healthKiosk = {
  slug: "health-kiosk",
  hideBrochure: true,
  title: "Health Kiosk",
  navLabel: "Health Kiosk",
  subtitle: "Automated health screening station",
  summary: "Health Kiosks allow users to perform basic health parameter checks such as BMI, blood pressure, and weight in public spaces.",
  image: "/imagesss/health kiosk.jpeg",
  imageAlt: "Health Kiosk",
  galleryImages: [
    { src: "/imagesss/health kiosk.jpeg", alt: "Health Kiosk" },
    { src: "/imagesss/health kiosk 2.jpeg", alt: "Health Kiosk 2" }
  ],
  heroPoints: ["Basic health metrics", "Telemedicine ready", "Compact footprint"],
  infoCards: [
    { type: "features", title: "Product", text: "Self-service health diagnostic station." },
    { type: "applications", title: "Use", text: "Corporate campuses, clinics, and pharmacies." },
    { type: "benefits", title: "Accessibility", text: "Brings basic healthcare screening to the public." },
    { type: "customization", title: "Customization", text: "Can be fitted with specific medical sensors." },
  ],
  specifications: [{ label: "Product Category", value: "Health Kiosk" }],
  technicalDetails: ["Integrated medical grade sensors.", "HIPAA compliant data processing."],
  downloads: ["Health Kiosk brochure"],
  quoteText: "Share your healthcare screening requirements.",
};

const waterAtmKiosk = {
  slug: "water-atm-kiosk",
  hideBrochure: true,
  title: "Water ATM Kiosk",
  navLabel: "Water ATM Kiosk",
  subtitle: "Clean drinking water dispenser",
  summary: "Water ATM Kiosks provide automated, 24/7 access to safe and purified drinking water for the public.",
  image: "/imagesss/Water Atm kiosk.png",
  imageAlt: "Water ATM Kiosk",
  galleryImages: [{ src: "/imagesss/Water Atm kiosk.png", alt: "Water ATM Kiosk" }],
  heroPoints: ["Purified water", "Coin/card operated", "Robust build"],
  infoCards: [
    { type: "features", title: "Product", text: "Automated water dispensing kiosk." },
    { type: "applications", title: "Use", text: "Railway stations, public parks, and rural areas." },
    { type: "benefits", title: "Health", text: "Provides affordable access to safe drinking water." },
    { type: "customization", title: "Customization", text: "RO filtration capacity as per need." },
  ],
  specifications: [{ label: "Product Category", value: "Water ATM Kiosk" }],
  technicalDetails: ["Coin validator and smart card integration.", "Real-time water quality monitoring."],
  downloads: ["Water ATM Kiosk brochure"],
  quoteText: "Share your daily dispensing volume requirements.",
};

const printingKiosk = {
  slug: "printing-kiosk",
  hideBrochure: true,
  title: "Printing Kiosk",
  navLabel: "Printing Kiosk",
  subtitle: "Self-service document printing",
  summary: "Printing Kiosks offer public access to document printing and copying services.",
  image: "/imagesss/printing kiosk (1).png",
  imageAlt: "Printing Kiosk",
  galleryImages: [
    { src: "/imagesss/printing kiosk (1).png", alt: "Printing Kiosk 1" },
    { src: "/imagesss/printing kiosk (2).png", alt: "Printing Kiosk 2" },
    { src: "/imagesss/printing kiosk 3.jpeg", alt: "Printing Kiosk 3" }
  ],
  heroPoints: ["Document printing", "High speed output", "Secure payment"],
  infoCards: [
    { type: "features", title: "Product", text: "All-in-one self-service printing station." },
    { type: "applications", title: "Use", text: "Universities, libraries, and co-working spaces." },
    { type: "benefits", title: "Convenience", text: "On-the-go document printing." },
    { type: "customization", title: "Customization", text: "A4/A3 sizes and color options." },
  ],
  specifications: [{ label: "Product Category", value: "Printing Kiosk" }],
  technicalDetails: ["Industrial grade laser printer.", "Accepts UPI and cards."],
  downloads: ["Printing Kiosk brochure"],
  quoteText: "Share your printing requirements.",
};

const foodKiosk = {
  slug: "food-kiosk",
  hideBrochure: true,
  title: "Food Kiosk",
  navLabel: "Food Kiosk",
  subtitle: "Automated food ordering and pickup",
  summary: "Food Kiosks allow customers to browse menus, place orders, and pay seamlessly in restaurants or food courts.",
  image: "/imagesss/food kiosk.jpeg",
  imageAlt: "Food Kiosk",
  galleryImages: [{ src: "/imagesss/food kiosk.jpeg", alt: "Food Kiosk" }],
  heroPoints: ["Interactive menu", "Queue busting", "Contactless ordering"],
  infoCards: [
    { type: "features", title: "Product", text: "Self-ordering food kiosk." },
    { type: "applications", title: "Use", text: "QSR restaurants, cafeterias, and malls." },
    { type: "benefits", title: "Efficiency", text: "Reduces ordering queues and increases average ticket size." },
    { type: "customization", title: "Customization", text: "Single or dual screen configurations." },
  ],
  specifications: [{ label: "Product Category", value: "Food Kiosk" }],
  technicalDetails: ["High-brightness touchscreen.", "Integrated receipt printer and POS terminal."],
  downloads: ["Food Kiosk brochure"],
  quoteText: "Share your restaurant setup requirements.",
};

const computerKiosk = {
  slug: "computer-kiosk",
  hideBrochure: true,
  title: "Computer Kiosk",
  navLabel: "Computer Kiosk",
  subItems: [
    { title: "Ticket Kiosk", slug: "ticket-kiosk" },
    { title: "Health Kiosk", slug: "health-kiosk" },
    { title: "Water ATM Kiosk", slug: "water-atm-kiosk" },
    { title: "Printing Kiosk", slug: "printing-kiosk" },
    { title: "Food Kiosk", slug: "food-kiosk" }
  ],
  subtitle: "Listed special purpose machine category",
  summary:
    "Computer Kiosk is part of Aarya Innovtech's special purpose machine range for the hygiene sector. Specifications can be finalized as per customer need.",
  image: productImage("computer-kiosk-product-1000x600.webp"),
  imageAlt: "Computer kiosk product",
  galleryImages: [
    { src: productImage("computer-kiosk-product-1000x600.webp"), alt: "Computer kiosk product" },
  ],
  heroPoints: ["Special purpose machine", "Hygiene-sector OEM range", "Custom configuration"],
  infoCards: [
    { type: "features", title: "Product", text: "Computer Kiosk for customer and public-use applications." },
    { type: "applications", title: "Use", text: "For kiosk-based service access." },
    { type: "benefits", title: "OEM Support", text: "Aarya Innovtech manufactures special purpose machines in the hygiene sector." },
    { type: "customization", title: "Specifications", text: "Technical details can be finalized as per customer need." },
  ],
  specifications: [
    { label: "Product Category", value: "Computer Kiosk" },
    { label: "Product Range", value: "Aarya Innovtech special purpose machine range" },
    { label: "Technical Data", value: "Finalized as per enquiry" },
  ],
  technicalDetails: [
    "Computer Kiosk is available as a product category.",
    "Model, dimensions, and features can be finalized during enquiry.",
    "Final kiosk specifications should be confirmed during enquiry.",
  ],
  downloads: ["Computer Kiosk enquiry sheet", "Product details"],
  quoteText: "Share the kiosk use and site details.",
};

const sanitaryVendingMachine = {
  slug: "sanitary-vending-machine",
  hideBrochure: true,
  title: "Sanitary Vending Machine",
  navLabel: "Sanitary Vending Machine",
  subtitle: "Automated sanitary pad dispenser",
  summary: "Sanitary Vending Machines provide women with quick and easy access to sanitary pads in public restrooms, schools, and offices.",
  image: "/imagesss/sanitary vending machine.jpeg",
  imageAlt: "Sanitary Vending Machine",
  galleryImages: [{ src: "/imagesss/sanitary vending machine.jpeg", alt: "Sanitary Vending Machine" }],
  heroPoints: ["Women-friendly hygiene", "Coin or card operated", "Wall mounted design"],
  infoCards: [
    { type: "features", title: "Product", text: "Sanitary pad dispenser." },
    { type: "applications", title: "Use", text: "Public toilets, schools, corporate washrooms." },
    { type: "benefits", title: "Hygiene", text: "Promotes menstrual hygiene management." },
    { type: "customization", title: "Customization", text: "Various capacities available (20-100 pads)." },
  ],
  specifications: [{ label: "Product Category", value: "Sanitary Vending Machine" }],
  technicalDetails: ["Easy refill mechanism.", "Battery or AC power options."],
  downloads: ["Sanitary Vending Machine brochure"],
  quoteText: "Share your installation requirements.",
};

const foodVendingMachine = {
  slug: "food-vending-machine",
  hideBrochure: true,
  title: "Food Vending Machine",
  navLabel: "Food Vending Machine",
  subtitle: "Snack and beverage dispenser",
  summary: "Food Vending Machines provide 24/7 access to snacks, beverages, and packaged foods for public and corporate spaces.",
  image: "/imagesss/food vending machines.png",
  imageAlt: "Food Vending Machine",
  galleryImages: [{ src: "/imagesss/food vending machines.png", alt: "Food Vending Machine" }],
  heroPoints: ["Snacks and beverages", "Cashless payments", "Refrigeration options"],
  infoCards: [
    { type: "features", title: "Product", text: "Automated snack and beverage vending." },
    { type: "applications", title: "Use", text: "Hospitals, airports, offices, and colleges." },
    { type: "benefits", title: "Convenience", text: "On-the-go refreshment access." },
    { type: "customization", title: "Customization", text: "Custom coil configurations for different products." },
  ],
  specifications: [{ label: "Product Category", value: "Food Vending Machine" }],
  technicalDetails: ["Energy efficient cooling.", "Accepts UPI, cards, and cash."],
  downloads: ["Food Vending Machine brochure"],
  quoteText: "Share your vending capacity requirements.",
};

const vendingMachines = {
  slug: "vending-machines",
  hideBrochure: true,
  title: "Vending Machines",
  navLabel: "Vending Machines",
  subItems: [
    { title: "Sanitary Vending Machine", slug: "sanitary-vending-machine" },
    { title: "Food Vending Machine", slug: "food-vending-machine" }
  ],
  subtitle: "Listed hygiene-sector machine category",
  summary:
    "Vending Machines are available for hygiene and site-support use. Sanitary pad vending can be added for women-friendly toilet sites.",
  image: "/imagesss/food vending machines.png",
  imageAlt: "Food vending machine",
  galleryImages: [
    { src: "/imagesss/food vending machines.png", alt: "Food Vending Machine" },
    { src: "/imagesss/sanitary vending machine.jpeg", alt: "Sanitary Vending Machine" }
  ],
  heroPoints: ["Women-friendly toilet support", "Sanitary pad vending option", "Custom configuration"],
  infoCards: [
    { type: "features", title: "Product", text: "Vending Machines for hygiene support." },
    { type: "applications", title: "Use", text: "Women-friendly Electronic ECO Toilet sites can include sanitary pad vending machines." },
    { type: "benefits", title: "Public Hygiene", text: "Supports hygiene access at public sanitation sites." },
    { type: "customization", title: "Specifications", text: "Technical details can be finalized as per vending need." },
  ],
  specifications: [
    { label: "Product Category", value: "Vending Machines" },
    { label: "Related Feature", value: "Sanitary Pad Vending Machine for women-friendly E2T sites" },
    { label: "Technical Data", value: "Finalized as per enquiry" },
  ],
  technicalDetails: [
    "Vending Machines are available as a product category.",
    "The PDF mentions Sanitary Pad Vending Machine as a women-friendly feature in Electronic ECO Toilets.",
    "Model and capacity can be finalized during enquiry.",
  ],
  downloads: ["Vending Machines enquiry sheet", "Women-friendly toilet feature note"],
  quoteText: "Share the vending use case so the team can confirm the correct machine configuration.",
};

export const productPages = {
  "electronic-eco-toilet": electronicEcoToilet,

  "bio-digester": bioDigester,
  "organic-waste-composter": organicWasteComposter,
  "pet-bottle-shredder": petBottleShredder,
  "computer-kiosk": computerKiosk,
  "ticket-kiosk": ticketKiosk,
  "health-kiosk": healthKiosk,
  "water-atm-kiosk": waterAtmKiosk,
  "printing-kiosk": printingKiosk,
  "food-kiosk": foodKiosk,
  "vending-machines": vendingMachines,
  "sanitary-vending-machine": sanitaryVendingMachine,
  "food-vending-machine": foodVendingMachine,
};

export const productPageList = [
  electronicEcoToilet,
  bioDigester,
  organicWasteComposter,
  petBottleShredder,
  computerKiosk,
  vendingMachines,
];
