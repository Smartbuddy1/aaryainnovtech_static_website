const newImage = (file) => `/new%20images/${file}`;
const productImage = (file) => `/media/products/product-page-images/${file}`;
const profileProductImage = (file) => `/media/pdf-profile-products/${file}`;
const brochurePdf = (file) => `/brochures/${file}`;

const brochureFiles = {
  electronicEcoToilet: brochurePdf("smart-buddy-electronic-eco-toilet.pdf"),

  bioDigester: brochurePdf("smart-buddy-bio-digester.pdf"),
  organicWasteComposter: brochurePdf("smart-buddy-organic-waste-composter.pdf"),
  petBottleShredder: brochurePdf("smart-buddy-pet-bottle-shredder-rvm.pdf"),
  ticketKiosk: brochurePdf("ticket-kiosk.pdf"),
  healthKiosk: brochurePdf("health-kiosk.pdf"),
  waterAtmKiosk: brochurePdf("water-atm-kiosk.pdf"),
  printingKiosk: brochurePdf("printing-kiosk.pdf"),
  foodKiosk: brochurePdf("food-kiosk.pdf"),
  computerKiosk: brochurePdf("computer-kiosk.pdf"),
  sanitaryVendingMachine: brochurePdf("sanitary-vending-machine.pdf"),
  foodVendingMachine: brochurePdf("food-vending-machine.pdf"),
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
  title: "Ticket Kiosk",
  navLabel: "Ticket Kiosk",
  subtitle: "Automated self-service ticketing and transit pass dispensing station",
  summary:
    "Smart Buddy Ticket Kiosks provide a rugged, high-speed automated ticketing solution for public transit, monuments, amusement parks, and parking facilities. Equipped with an interactive multi-touch display, thermal receipt/ticket printer, optical barcode/QR scanner, and multiple payment acceptance modes.",
  image: "/imagesss/ticket kisok.jpeg",
  imageAlt: "Ticket Kiosk",
  galleryImages: [{ src: "/imagesss/ticket kisok.jpeg", alt: "Ticket Kiosk" }],
  heroPoints: [
    "High-speed 80mm/112mm thermal ticket printer with auto-cutter",
    "19\" / 21.5\" Full HD industrial touchscreen with toughened glass",
    "Multi-mode payments: UPI QR code, card POS, and cash/coin options",
    "1D/2D Barcode & QR scanner for ticket validation and mobile passes",
    "Vandal-resistant CRCA steel cabinet with epoxy powder coating",
  ],
  infoCards: [
    { type: "features", title: "Queue-Busting Speed", text: "Issues tickets in under 5 seconds, reducing counter congestion by up to 75%." },
    { type: "applications", title: "Applications", text: "Metro stations, bus terminals, railway stations, monuments, and theme parks." },
    { type: "benefits", title: "Payment Flexibility", text: "Accepts UPI Dynamic QR, debit/credit cards, and optional cash/coin acceptors." },
    { type: "customization", title: "Cloud Telemetry", text: "Live remote monitoring of machine health, ticket stock, and revenue analytics." },
  ],
  specifications: [
    { label: "Model Series", value: "Smart Buddy SB-TK-200 / SB-TK-400" },
    { label: "Enclosure", value: "1.6mm - 2.0mm Heavy Duty CRCA Steel with Epoxy Powder Coating" },
    { label: "Display", value: "19\" / 21.5\" Full HD IPS (1920x1080) 10-Point PCAP Multi-Touch" },
    { label: "Computing Unit", value: "Intel Core i3/i5 Industrial PC / ARM Quad-Core Android Motherboard" },
    { label: "Operating System", value: "Windows 10/11 IoT Enterprise or Android 11+ Embedded" },
    { label: "Printer", value: "High-Speed 80mm/112mm Direct Thermal Printer with Auto-Cutter" },
    { label: "Scanner", value: "Omnidirectional 2D QR / Barcode Optical Scanner" },
    { label: "Payment Modes", value: "Dynamic UPI QR Display, EMV Certified POS Terminal, Cash Acceptor" },
    { label: "Connectivity", value: "Gigabit Ethernet, Dual-Band Wi-Fi 802.11ac, 4G LTE Modem" },
    { label: "Power & Backup", value: "220-240V AC, 50Hz with In-Built UPS Power Backup (2-4 hours)" },
  ],
  technicalDetails: [
    "Industrial-grade thermal paper roll mechanism holds large rolls up to 200mm diameter for 2000+ tickets.",
    "Vandal-resistant toughened safety glass with IK08 impact resistance protects the touch display.",
    "Optically isolated industrial I/O controller prevents electrical surges from affecting internal logic.",
    "Integrated cooling fan system with dust filtration ensures 24/7 operating stability.",
    "REST API and Webhook integration capabilities for seamless connectivity with central ticketing databases.",
  ],
  brochureUrl: brochureFiles.ticketKiosk,
  brochureFilename: "ticket-kiosk.pdf",
  downloads: [
    {
      label: "Ticket Kiosk brochure",
      url: brochureFiles.ticketKiosk,
      filename: "ticket-kiosk.pdf",
    },
  ],
  quoteText: "Share your ticketing requirements and site details for the right Ticket Kiosk model.",
};

const healthKiosk = {
  slug: "health-kiosk",
  title: "Health Kiosk",
  navLabel: "Health Kiosk",
  subtitle: "Automated public health screening, vital signs and telemedicine station",
  summary:
    "The Smart Buddy Health Kiosk is a comprehensive automated telemedicine and vital-screening station. It enables individuals to quickly check essential health indicators—including Blood Pressure, BMI, Pulse, SpO2, and Body Temperature—within 3 to 5 minutes, delivering instant printed and digital health reports.",
  image: "/imagesss/health kiosk.jpeg",
  imageAlt: "Health Kiosk",
  galleryImages: [
    { src: "/imagesss/health kiosk.jpeg", alt: "Health Kiosk" },
    { src: "/imagesss/health kiosk 2.jpeg", alt: "Health Kiosk 2" },
  ],
  heroPoints: [
    "Automated checkup for Blood Pressure, SpO2, Pulse, BMI & Body Temperature",
    "Clinically accurate medical-grade digital sensors with instant printed slips",
    "Integrated Telemedicine consultation kit with HD camera and microphone",
    "Digital reports delivered instantly via WhatsApp, SMS, and secure cloud link",
    "HIPAA-compliant encrypted architecture with multilingual voice guidance",
  ],
  infoCards: [
    { type: "features", title: "Rapid Vital Checkups", text: "Completes 6+ vital parameters in under 3 minutes with automated step-by-step guidance." },
    { type: "applications", title: "Where It Can Be Installed", text: "Corporate campuses, primary healthcare centers (PHC), clinics, transit hubs, and gyms." },
    { type: "benefits", title: "Tele-Consultation Ready", text: "Connects patients directly to doctors via live video call with real-time vitals transmission." },
    { type: "customization", title: "Medical-Grade Accuracy", text: "CE and ISO certified sensors calibrated for clinical-grade reliability." },
  ],
  specifications: [
    { label: "Model Series", value: "Smart Buddy SB-HK-500 Telehealth Diagnostic Station" },
    { label: "Enclosure", value: "Ergonomic CRCA Steel with Medical-Grade Antibacterial Coating" },
    { label: "Display", value: "21.5\" / 32\" Full HD IPS Capacitive Touchscreen with Audio Guidance" },
    { label: "Standard Vitals", value: "NIBP (Blood Pressure), Pulse Oximetry (SpO2), Infrared Temp, Digital BMI" },
    { label: "Advanced Sensors", value: "Optional 6/12-Lead ECG, Blood Glucose, Lipid Profile, Rapid Urine Analyzer" },
    { label: "Report Delivery", value: "In-Built Thermal Printer + WhatsApp/SMS Cloud Link + Email" },
    { label: "Telehealth Hardware", value: "1080p HD Wide-Angle Camera, Noise-Cancelling Mic, Stereo Speakers" },
    { label: "Computing Unit", value: "Intel Core i5 Industrial Motherboard, 16GB RAM, 256GB SSD, Windows 11" },
    { label: "Security & Cloud", value: "HIPAA Compliant Architecture, 256-bit AES Encryption, Biometric / OTP Login" },
    { label: "Power & Backup", value: "230V AC, 50Hz with 4-Hour In-Built Online UPS Backup" },
  ],
  technicalDetails: [
    "Self-guided interactive UI walks users through arm-cuff placement and sensor touch with multi-lingual audio cues.",
    "Non-invasive infrared temporal temperature sensor delivers accurate core temperature in under 2 seconds.",
    "Integrated ultrasonic height sensor and multi-point load-cell scale compute Body Mass Index (BMI) automatically.",
    "Secure doctor-portal integration allows physicians to view live patient telemetry and write digital prescriptions.",
    "All diagnostic data is encrypted end-to-end conforming to ISO 27001 data security guidelines.",
  ],
  brochureUrl: brochureFiles.healthKiosk,
  brochureFilename: "health-kiosk.pdf",
  downloads: [
    {
      label: "Health Kiosk brochure",
      url: brochureFiles.healthKiosk,
      filename: "health-kiosk.pdf",
    },
  ],
  quoteText: "Share your healthcare screening requirements to customize the Health Kiosk diagnostic package.",
};

const waterAtmKiosk = {
  slug: "water-atm-kiosk",
  title: "Water ATM Kiosk",
  navLabel: "Water ATM Kiosk",
  subtitle: "Automated 24/7 safe drinking water dispenser with multi-stage RO & smart payments",
  summary:
    "The Smart Buddy Water ATM Kiosk is an automated, coin/card/UPI-operated drinking water dispensing station. It integrates advanced multi-stage Reverse Osmosis (RO) and Ultra-Violet (UV) purification with smart volumetric flow metering to supply pure, chilled drinking water at minimal cost.",
  image: "/imagesss/Water Atm kiosk.png",
  imageAlt: "Water ATM Kiosk",
  galleryImages: [{ src: "/imagesss/Water Atm kiosk.png", alt: "Water ATM Kiosk" }],
  heroPoints: [
    "Multi-stage industrial purification: Sand filter, Carbon, RO Membrane & UV Chamber",
    "Smart multi-payment support: Multi-coin acceptor, RFID Smart Card tap & UPI QR code",
    "Food-grade Stainless Steel (SS 304) dispensing chamber and anti-bacterial nozzles",
    "Programmable dispensing: 250ml cup, 1L bottle, 5L can, and 20L jar filling options",
    "GSM/GPRS IoT cloud controller reporting real-time TDS, water volume, and daily revenue",
  ],
  infoCards: [
    { type: "features", title: "Pure & Certified Water", text: "Produces potable water conforming strictly to IS 10500 drinking water quality standards." },
    { type: "applications", title: "Where It Can Be Installed", text: "Railway stations, bus depots, rural gram panchayats, pilgrimage centers, and public parks." },
    { type: "benefits", title: "Cashless & Coin Options", text: "Users can dispense water using coins (Rs. 1, 2, 5, 10), prepaid smart cards, or UPI QR." },
    { type: "customization", title: "Live GSM Telemetry", text: "Monitors TDS, total dispensing volume, filter replacement schedules, and revenue remotely." },
  ],
  specifications: [
    { label: "Model Series", value: "Smart Buddy SB-WATM-250 (250 LPH) / SB-WATM-500 (500 LPH) / SB-WATM-1000" },
    { label: "Purification Tech", value: "Multi-Stage RO + UV Sterilization + TDS Controller + Active Mineral Cartridge" },
    { label: "Dispensing Capacity", value: "250 to 1,000 Litres Per Hour (Customizable up to 5,000 LPH plants)" },
    { label: "Dispensing Modes", value: "Dual Nozzle (Simultaneous bottle & 20L jar filling) with Optical Sensor" },
    { label: "Payment Options", value: "Multi-Coin Validator (Rs. 1, 2, 5, 10), RFID Smart Card Reader, Dynamic UPI QR Code" },
    { label: "Cabinet Build", value: "Exterior: 1.6mm Powder Coated GI / Wet Area: Food-Grade Stainless Steel 304" },
    { label: "Storage Tank", value: "250L to 1000L Insulated Food-Grade SS 304 Tank with High/Low Float Sensors" },
    { label: "IoT Controller", value: "Industrial Microcontroller with GSM/4G Telemetry, Live TDS & Flow Meter Sensors" },
    { label: "Power Rating", value: "220V AC, 50Hz / Solar Hybrid Inverter Compatibility for complete off-grid use" },
  ],
  technicalDetails: [
    "High-precision magnetic turbine flow meter ensures exact calibrated volumetric dispensing without water loss.",
    "Automated auto-flush valve periodically cleans the RO membrane surface to prolong membrane life in high-TDS water.",
    "In-built low-water cutoff switch automatically de-energizes the high-pressure pump when raw water supply is depleted.",
    "Solar hybrid MPPT charge controller support allows complete off-grid deployment in remote villages and highway spots.",
    "Tamper-proof coin box and heavy-duty steel lock protection prevent unauthorized access to cash collections.",
  ],
  brochureUrl: brochureFiles.waterAtmKiosk,
  brochureFilename: "water-atm-kiosk.pdf",
  downloads: [
    {
      label: "Water ATM Kiosk brochure",
      url: brochureFiles.waterAtmKiosk,
      filename: "water-atm-kiosk.pdf",
    },
  ],
  quoteText: "Share your daily dispensing volume and site conditions to select the right Water ATM capacity.",
};

const printingKiosk = {
  slug: "printing-kiosk",
  title: "Printing Kiosk",
  navLabel: "Printing Kiosk",
  subtitle: "Automated 24/7 self-service document printing, scanning & photocopying station",
  summary:
    "The Smart Buddy Printing Kiosk provides a seamless, automated self-service document solution. Users can upload documents via WhatsApp, Cloud storage, USB drives, or email and complete secure, high-speed laser printing, scanning, or copying with instant digital UPI payments.",
  image: "/imagesss/printing kiosk (1).png",
  imageAlt: "Printing Kiosk",
  galleryImages: [
    { src: "/imagesss/printing kiosk (1).png", alt: "Printing Kiosk 1" },
    { src: "/imagesss/printing kiosk (2).png", alt: "Printing Kiosk 2" },
    { src: "/imagesss/printing kiosk 3.jpeg", alt: "Printing Kiosk 3" },
  ],
  heroPoints: [
    "High-speed commercial Laser printing: A4/Legal in crisp Black & White and Full Color",
    "Omnichannel document upload: WhatsApp chatbot, Web URL, Google Drive, and USB",
    "Instant contactless payment: Integrated Dynamic UPI QR code, Cards, and RFID smart card",
    "600 DPI Optical Flatbed & 50-sheet ADF scanner for instant copying and scanning",
    "100% Data Privacy: Automatic cryptographic session wiping immediately after printing",
  ],
  infoCards: [
    { type: "features", title: "Print from Anywhere", text: "Upload files on WhatsApp or web and simply scan your personal QR code at the kiosk to print." },
    { type: "applications", title: "Where It Can Be Installed", text: "Universities, colleges, libraries, district courts, government e-Seva centers, and co-working spaces." },
    { type: "benefits", title: "Zero Privacy Risk", text: "Files are processed in encrypted memory and erased automatically once printed." },
    { type: "customization", title: "High Paper Capacity", text: "Dual lockable paper cassettes holding up to 2,500 sheets with automated low-paper cloud alerts." },
  ],
  specifications: [
    { label: "Model Series", value: "Smart Buddy SB-PK-300 Smart Document Printing Kiosk" },
    { label: "Print Engine", value: "Heavy-Duty Commercial Laser Printing Engine (Monochrome & Color options)" },
    { label: "Print Speed", value: "Up to 35 - 45 Pages Per Minute (PPM) with Automatic Duplex (Double-Sided) Printing" },
    { label: "Print Resolution", value: "1200 x 1200 DPI High-Definition Text and Graphic Clarity" },
    { label: "Paper Capacity", value: "Dual 500-sheet lockable cassette trays (Total 1000 - 2500 sheets A4 / Legal capacity)" },
    { label: "Scanner & Copier", value: "600 DPI Optical Flatbed Scanner with 50-Sheet Auto Document Feeder (ADF)" },
    { label: "Display & Touch", value: "19\" / 21.5\" Full HD Industrial Touchscreen with Anti-Glare Protective Glass" },
    { label: "Payment Gateway", value: "UPI Dynamic QR Screen, Credit/Debit POS Terminal & RFID Smart Card Reader" },
    { label: "Cabinet Build", value: "1.6mm Heavy Duty CRCA Mild Steel with Anti-Theft Lockable Access Doors" },
    { label: "Power & Backup", value: "230V AC, 50Hz with In-Built UPS Power Backup" },
  ],
  technicalDetails: [
    "Custom proprietary print spooler driver prevents print job freezing and supports PDF, DOCX, PPTX, JPG, and PNG.",
    "End-to-end TLS 1.3 encrypted data channel between cloud upload portal and physical kiosk endpoint.",
    "Automated optical sensors detect paper jams, low toner levels, and empty paper trays, triggering cloud notifications.",
    "Supports student RFID card authentication allowing universities to allocate monthly subsidized print quotas.",
    "Heavy-duty cooling fans with washable dust filters protect internal optical laser components from ambient dust.",
  ],
  brochureUrl: brochureFiles.printingKiosk,
  brochureFilename: "printing-kiosk.pdf",
  downloads: [
    {
      label: "Printing Kiosk brochure",
      url: brochureFiles.printingKiosk,
      filename: "printing-kiosk.pdf",
    },
  ],
  quoteText: "Share your expected campus or office printing volume to configure the right Printing Kiosk model.",
};

const foodKiosk = {
  slug: "food-kiosk",
  title: "Food Kiosk",
  navLabel: "Food Kiosk",
  subtitle: "Interactive self-ordering, menu browsing & contactless payment kiosk",
  summary:
    "The Smart Buddy Food Kiosk is an interactive self-ordering and POS payment station designed for Quick Service Restaurants (QSR), food courts, cafeterias, and theme parks. It streamlines order taking, reduces customer wait times, eliminates ordering errors, and boosts average order ticket size through intelligent digital upselling.",
  image: "/imagesss/food kiosk.jpeg",
  imageAlt: "Food Kiosk",
  galleryImages: [{ src: "/imagesss/food kiosk.jpeg", alt: "Food Kiosk" }],
  heroPoints: [
    "Vibrant 21.5\", 27\", or 32\" Full HD portrait touchscreen displaying rich visual menus",
    "Integrated heavy-duty thermal receipt printer issuing instant order and token slips",
    "Multi-payment acceptance: Dynamic UPI QR code, EMV Card POS, and NFC contactless",
    "Seamless real-time integration with POS billing software and Kitchen Display Systems (KDS)",
    "Intelligent digital upselling & combo suggestions increasing average order spend by 15-25%",
  ],
  infoCards: [
    { type: "features", title: "Eliminate Queue Lines", text: "Guests browse, customize ingredients, and pay in under 60 seconds without standing in counter queues." },
    { type: "applications", title: "Where It Can Be Installed", text: "QSR chains, mall food courts, corporate cafeterias, airport lounges, and university canteens." },
    { type: "benefits", title: "Higher Average Spend", text: "Automated high-res imagery and combo add-on prompts consistently increase ticket size." },
    { type: "customization", title: "Seamless Kitchen Sync", text: "Orders route directly to kitchen display screens (KDS) and printers with zero communication error." },
  ],
  specifications: [
    { label: "Model Series", value: "Smart Buddy SB-FK-100 (Wall/Counter) / SB-FK-200 (Single/Dual Sided Pedestal)" },
    { label: "Screen Size & Type", value: "21.5\" / 27\" / 32\" Full HD IPS Display (1080x1920 Portrait), 10-Point PCAP Touch" },
    { label: "Computing Hardware", value: "Quad-Core Android Industrial Controller / Intel Core i3 Industrial PC, 8GB RAM" },
    { label: "Operating System", value: "Android 11/12 Enterprise OS or Windows 10/11 IoT" },
    { label: "Receipt / Token Printer", value: "80mm High-Speed Direct Thermal Printer (200 mm/s, Auto-Cutter, Drop-in Loading)" },
    { label: "Payment Bracket", value: "Universal Mount for PineLabs, Pax, Verifone, Ingenico POS & Dynamic UPI QR Screen" },
    { label: "Barcode/QR Scanner", value: "Built-in 2D Scanner for discount coupons, membership loyalty QR, and gift vouchers" },
    { label: "Enclosure Build", value: "Ultra-Slim Heavy Duty CRCA Steel with Scratch-Resistant Automotive Finish" },
    { label: "Connectivity", value: "Wi-Fi 6, Gigabit Ethernet LAN, Bluetooth, Optional 4G LTE Modem" },
  ],
  technicalDetails: [
    "Supports dual-screen back-to-back configuration on a single pedestal to maximize floor-space efficiency in food courts.",
    "Industrial thermal printer features easy drop-in paper loading with optical low-paper and cover-open sensors.",
    "Integrated Wi-Fi 6, Gigabit Ethernet, and optional 4G LTE modem ensure non-stop network connectivity for payments.",
    "Modular hardware layout enables tool-free maintenance and quick replacement of printer and payment modules.",
    "Customizable exterior vinyl branding and LED illuminated logo halo lighting available for restaurant chains.",
  ],
  brochureUrl: brochureFiles.foodKiosk,
  brochureFilename: "food-kiosk.pdf",
  downloads: [
    {
      label: "Food Kiosk brochure",
      url: brochureFiles.foodKiosk,
      filename: "food-kiosk.pdf",
    },
  ],
  quoteText: "Share your restaurant layout and POS requirements to configure the optimal Food Kiosk setup.",
};

const computerKiosk = {
  slug: "computer-kiosk",
  title: "Computer Kiosk",
  navLabel: "Kiosk",
  subItems: [
    { title: "Computer Kiosk", slug: "computer-kiosk" },
    { title: "Ticket Kiosk", slug: "ticket-kiosk" },
    { title: "Health Kiosk", slug: "health-kiosk" },
    { title: "Water ATM Kiosk", slug: "water-atm-kiosk" },
    { title: "Printing Kiosk", slug: "printing-kiosk" },
    { title: "Food Kiosk", slug: "food-kiosk" },
  ],
  subtitle: "Industrial interactive information terminal, public service & OEM computing kiosk",
  summary:
    "The Smart Buddy Computer Kiosk is a ruggedized interactive computing station built for 24/7 public service access, civic e-governance, digital information lookup, visitor management, and customized OEM industrial applications. Engineered with heavy-gauge steel and industrial-grade electronics, it withstands demanding public use.",
  image: productImage("computer-kiosk-product-1000x600.webp"),
  imageAlt: "Computer kiosk product",
  galleryImages: [
    { src: productImage("computer-kiosk-product-1000x600.webp"), alt: "Computer kiosk product" },
  ],
  heroPoints: [
    "Industrial-grade All-in-One computing engine rated for 24/7 continuous operation",
    "High-durability Capacitive Touchscreen with IP65 front splash and dust proofing",
    "Heavy-duty 1.6mm - 2.0mm mild steel enclosure with high-security tamper locks",
    "Custom peripheral bays: Fingerprint scanner, HD webcam, barcode scanner & printer",
    "Centralized Remote Device Management (RDM) supporting over-the-air software updates",
  ],
  infoCards: [
    { type: "features", title: "24/7 Industrial Grade", text: "Built with commercial grade motherboards, solid-state storage, and silent heat dissipation." },
    { type: "applications", title: "Where It Can Be Installed", text: "Smart city hubs, government e-Seva centers, airports, hospitals, and corporate receptions." },
    { type: "benefits", title: "Vandal-Resistant Body", text: "Heavy gauge steel body with tamper locks protects all computing hardware in unmonitored areas." },
    { type: "customization", title: "Custom OEM Integration", text: "Can be configured with fingerprint scanners, smart card readers, metal keyboards, or webcams." },
  ],
  specifications: [
    { label: "Model Series", value: "Smart Buddy SB-CK-100 (19\"-21.5\") / SB-CK-300 (32\"-55\" Large Format)" },
    { label: "Display Options", value: "19\", 21.5\", 27\", 32\", 43\", 55\" High-Brightness Full HD / 4K IPS Displays" },
    { label: "Touch Panel", value: "10-Point Projected Capacitive (PCAP) Touch with 4mm Toughened Glass" },
    { label: "Processor Options", value: "Intel Celeron / Core i3 / Core i5 / Core i7 or ARM Octa-Core SoC" },
    { label: "Memory & Storage", value: "8GB to 32GB DDR4 RAM | 128GB to 1TB NVMe Industrial SSD" },
    { label: "Operating System", value: "Windows 10/11 Pro, Windows IoT Enterprise, Linux (Ubuntu), Android 11+" },
    { label: "Optional Add-ons", value: "A4 Laser Document Printer, Biometric Fingerprint Scanner, HD Camera, Metal Keypad" },
    { label: "Enclosure Material", value: "1.6mm - 2.0mm Heavy Gauge Cold Rolled Steel with Epoxy Powder Coating" },
    { label: "Network & Comms", value: "Gigabit Ethernet LAN, Dual-Band Wi-Fi 802.11ac, Bluetooth 5.2, 4G LTE" },
    { label: "Operating Voltage", value: "180V - 240V AC, 50Hz with In-Built Surge Suppressor & EMI Filter" },
  ],
  technicalDetails: [
    "Fanless industrial motherboard cooling architecture prevents dust intake and enhances component longevity.",
    "Cable-management channels ensure all power and signal wires are internally routed and inaccessible from exterior.",
    "Front bezel sealed with industrial gasket achieving IP65 water and dust ingress resistance.",
    "Supports auto-power-on after power failure (AC Power Recovery) for completely autonomous public operation.",
    "Custom OEM enclosure modifications available for client-specified internal hardware, logo branding, and paint colors.",
  ],
  brochureUrl: brochureFiles.computerKiosk,
  brochureFilename: "computer-kiosk.pdf",
  downloads: [
    {
      label: "Computer Kiosk brochure",
      url: brochureFiles.computerKiosk,
      filename: "computer-kiosk.pdf",
    },
  ],
  quoteText: "Share the kiosk application, screen size, and peripheral requirements for a tailored OEM proposal.",
};

const sanitaryVendingMachine = {
  slug: "sanitary-vending-machine",
  title: "Sanitary Vending Machine",
  navLabel: "Sanitary Vending Machine",
  subtitle: "Automated wall-mounted sanitary napkin dispenser for public, school & corporate restrooms",
  summary:
    "The Smart Buddy Sanitary Vending Machine is an automated wall-mountable dispensing unit designed to provide women with immediate, dignified, and 24/7 access to sanitary napkins. Ideal for public restrooms, schools, colleges, hostels, corporate offices, and transit stations, it integrates smoothly into Smart Buddy Electronic ECO Toilets and modern washrooms.",
  image: "/imagesss/sanitary vending machine.jpeg",
  imageAlt: "Sanitary Vending Machine",
  galleryImages: [{ src: "/imagesss/sanitary vending machine.jpeg", alt: "Sanitary Vending Machine" }],
  heroPoints: [
    "Multiple payment modes: Multi-coin validator (Rs. 5, 10), token, push-button, or UPI QR",
    "Robust 1.2mm - 1.6mm cold-rolled mild steel cabinet with anti-corrosion powder coating",
    "High-visibility stock inspection window with Low-Stock / Empty LED warning indicator",
    "Precision motorized anti-theft dispensing spiral ensuring exactly one napkin per transaction",
    "Storage capacity models: 25, 50, 75, and 100+ sanitary pads (multi-brand support)",
  ],
  infoCards: [
    { type: "features", title: "24/7 Restroom Access", text: "Provides immediate, discreet access to quality sanitary pads without reliance on staff." },
    { type: "applications", title: "Where It Can Be Installed", text: "Electronic ECO Toilets, schools, colleges, universities, corporate offices, and transit hubs." },
    { type: "benefits", title: "Anti-Theft Drop Gate", text: "Secure internal mechanical interlock guarantees only one napkin dispenses per valid token/coin." },
    { type: "customization", title: "Battery & Solar Ready", text: "Equipped with internal battery backup ensuring uninterrupted dispensing during power cuts." },
  ],
  specifications: [
    { label: "Model Series", value: "Smart Buddy SB-SVM-25 (25 pads) / SB-SVM-50 (50 pads) / SB-SVM-100 (100 pads)" },
    { label: "Storage Capacity", value: "25 / 50 / 75 / 100 Napkins (Adjustable spiral spacing for various pad sizes)" },
    { label: "Dispensing Mode", value: "Motorized Spiral Drive / Mechanical Push-Pull (Zero-Electricity model available)" },
    { label: "Payment Acceptance", value: "Electronic Multi-Coin Validator (Rs. 5 & Rs. 10), Token Acceptor, Push-Button or UPI QR" },
    { label: "Cabinet Material", value: "1.2mm - 1.6mm Heavy Duty CRCA Mild Steel with Anti-Bacterial Powder Coating" },
    { label: "Status Display", value: "16x2 Backlit LCD Screen showing Instructions, Coin Value, and Stock Status" },
    { label: "Low Stock Indicator", value: "High-Brightness Red LED Indicator & Audible Buzzer when stock drops below 5 units" },
    { label: "Power Supply", value: "220V AC, 50Hz with In-Built Rechargeable SMF/Lithium Battery Backup (72+ hours)" },
    { label: "Security & Locking", value: "Heavy Duty Tamper-Proof Cam Lock with 2 Master Keys & Reinforced Hinges" },
    { label: "Companion Option", value: "Pairs with Smart Buddy Electric Sanitary Napkin Incinerator for safe waste disposal" },
  ],
  technicalDetails: [
    "Microcontroller-controlled stepper motor delivers smooth, jam-free dispensing for standard and winged napkin packs.",
    "Low power consumption design consumes negligible standby power (< 5W) and operates for days on internal battery.",
    "Transparent acrylic level gauge allows sanitation staff to check refill requirements at a single glance.",
    "Optional GSM module sends automatic SMS alerts to facilities management when napkin inventory is running low.",
    "Built according to Ministry of Drinking Water & Sanitation menstrual hygiene management (MHM) national guidelines.",
  ],
  brochureUrl: brochureFiles.sanitaryVendingMachine,
  brochureFilename: "sanitary-vending-machine.pdf",
  downloads: [
    {
      label: "Sanitary Vending Machine brochure",
      url: brochureFiles.sanitaryVendingMachine,
      filename: "sanitary-vending-machine.pdf",
    },
  ],
  quoteText: "Share your pad capacity requirements and installation sites for the right Sanitary Vending Machine configuration.",
};

const foodVendingMachine = {
  slug: "food-vending-machine",
  title: "Food Vending Machine",
  navLabel: "Food Vending Machine",
  subtitle: "Automated 24/7 refrigerated snacks, beverages & packaged foods dispenser",
  summary:
    "The Smart Buddy Food & Beverage Vending Machine is a high-capacity, climate-controlled automated vending station. It delivers cold canned drinks, bottled water, snacks, sandwiches, and packaged foods around the clock with seamless cashless payments, smart drop sensors, and real-time cloud telemetry.",
  image: "/imagesss/food vending machines.png",
  imageAlt: "Food Vending Machine",
  galleryImages: [{ src: "/imagesss/food vending machines.png", alt: "Food Vending Machine" }],
  heroPoints: [
    "Dual-zone precision refrigeration keeping drinks at 3-6°C and snacks at 12-18°C",
    "Cashless digital payments: Dynamic UPI QR code, Bharat QR, Credit/Debit Cards & RFID",
    "Infrared drop-sensor detection guarantees 100% successful product dispense or instant refund",
    "Cloud-based IoT telemetry providing real-time inventory counts, temperature & sales analytics",
    "Modular adjustable dual-spiral & conveyor trays accommodating cans, bottles, chips & snacks",
  ],
  infoCards: [
    { type: "features", title: "Dual-Zone Cooling", text: "Precision eco-friendly refrigeration keeps drinks ice-cold and snacks fresh in independent temperature zones." },
    { type: "applications", title: "Where It Can Be Installed", text: "Hospitals, IT parks, airports, educational campuses, transit hubs, and commercial complexes." },
    { type: "benefits", title: "100% Guaranteed Dispense", text: "Optical drop sensor monitors product fall; if an item fails to drop, the user is never charged." },
    { type: "customization", title: "Cloud Inventory Alerts", text: "Receive automated smartphone alerts for restocking, temperature fluctuations, and daily sales." },
  ],
  specifications: [
    { label: "Model Series", value: "Smart Buddy SB-FVM-300 (30 Selections) / SB-FVM-500 (60 Selections)" },
    { label: "Capacity & Selections", value: "300 to 600 items across 6 adjustable shelves (30 to 60 distinct product slots)" },
    { label: "Temperature Range", value: "Dual Zone: Lower Zone 3°C - 8°C (Cold Drinks) | Upper Zone 12°C - 18°C (Snacks)" },
    { label: "Refrigeration System", value: "Energy-Efficient Inverter Compressor with Eco-Friendly R134a / R290 Refrigerant" },
    { label: "Payment Options", value: "UPI Dynamic QR Screen, Bharat QR, Credit/Debit POS Terminal, Cash/Coin Acceptor" },
    { label: "Dispensing Mechanism", value: "Dual-Direction Spiral Coils / Conveyor Belt with High-Torque DC Motors" },
    { label: "Drop Sensor System", value: "Multi-Beam Infrared Drop Sensor Array for 100% Guaranteed Delivery" },
    { label: "Display Screen", value: "7\" Touchscreen / Optional 21.5\" Full HD Digital Signage & Selection Screen" },
    { label: "Cabinet Construction", value: "Galvanized Steel with High-Density CFC-Free Polyurethane Foam Insulation" },
    { label: "Front Glass Door", value: "Double-Layer Low-E Heated Tempered Vacuum Glass (Anti-Fog / Anti-Condensation)" },
  ],
  technicalDetails: [
    "High-efficiency polyurethane foam cabinet insulation ensures minimal thermal loss and low electricity consumption.",
    "Adjustable shelf pitch and motor spacing allow custom configuration for various can sizes, PET bottles, and snack packs.",
    "Microcontroller-driven anti-tamper door lock and steel anti-theft baffle prevent reaching into the dispensing bin.",
    "Integrated GSM/4G SIM modem connects to central web portal for remote price updates, stock monitoring, and diagnostics.",
    "Power-loss memory protection stores all transaction logs, ensuring no data or payment discrepancy during power cuts.",
  ],
  brochureUrl: brochureFiles.foodVendingMachine,
  brochureFilename: "food-vending-machine.pdf",
  downloads: [
    {
      label: "Food Vending Machine brochure",
      url: brochureFiles.foodVendingMachine,
      filename: "food-vending-machine.pdf",
    },
  ],
  quoteText: "Share your location, expected daily customer footfall, and product selection requirements.",
};

const vendingMachines = {
  slug: "vending-machines",
  title: "Vending Machines",
  navLabel: "Vending Machines",
  subItems: [
    { title: "Sanitary Vending Machine", slug: "sanitary-vending-machine" },
    { title: "Food Vending Machine", slug: "food-vending-machine" },
  ],
  subtitle: "Automated hygiene & refreshment vending machine range",
  summary:
    "Aarya Innovtech manufactures a versatile range of automated vending machines, including wall-mounted Sanitary Napkin Vending Machines for women-friendly public washrooms, and climate-controlled Food & Beverage Vending Machines for high-footfall civic and corporate venues.",
  image: "/imagesss/food vending machines.png",
  imageAlt: "Food vending machine",
  galleryImages: [
    { src: "/imagesss/food vending machines.png", alt: "Food Vending Machine" },
    { src: "/imagesss/sanitary vending machine.jpeg", alt: "Sanitary Vending Machine" },
  ],
  heroPoints: [
    "Sanitary pad vending for women-friendly restrooms & schools",
    "24/7 Climate-controlled food and cold beverage vending",
    "Cashless digital payments: UPI QR code, smart cards & POS",
    "Heavy-duty vandal-resistant steel construction with anti-theft drop sensors",
    "IoT telemetry for remote inventory tracking and temperature alerts",
  ],
  infoCards: [
    { type: "features", title: "Hygiene & Refreshments", text: "Specialized vending solutions covering menstrual hygiene access to 24/7 food & beverages." },
    { type: "applications", title: "Where They Can Be Installed", text: "Electronic ECO Toilets, IT parks, airports, hospitals, universities, and railway stations." },
    { type: "benefits", title: "Public Convenience", text: "Provides 24/7 automated access to essential hygiene supplies and refreshments without staffing." },
    { type: "customization", title: "Custom Configurations", text: "Custom spiral trays, payment options, and dimensions available as per site enquiry." },
  ],
  specifications: [
    { label: "Product Category", value: "Smart Buddy Automated Vending Machine Series" },
    { label: "Sub-Categories", value: "Sanitary Pad Vending Machines & Food/Beverage Vending Machines" },
    { label: "Capacity Range", value: "Sanitary: 25-100 pads | Food/Drinks: 300-600 items" },
    { label: "Payment Systems", value: "Dynamic UPI QR, Debit/Credit Card POS, Coin/Token Acceptors" },
    { label: "Enclosure Build", value: "Heavy Duty Cold Rolled Steel with Epoxy Powder Coating" },
    { label: "Telemetry", value: "GSM / 4G IoT Live Stock & Revenue Tracking" },
  ],
  technicalDetails: [
    "Sanitary Pad Vending Machines feature motorized anti-theft spirals with battery backup.",
    "Food & Beverage Vending Machines feature dual-zone refrigeration with infrared drop sensors.",
    "Model, capacity, and payment gateway can be customized during enquiry.",
  ],
  brochureUrl: brochureFiles.foodVendingMachine,
  brochureFilename: "food-vending-machine.pdf",
  downloads: [
    {
      label: "Food Vending Machine brochure",
      url: brochureFiles.foodVendingMachine,
      filename: "food-vending-machine.pdf",
    },
    {
      label: "Sanitary Vending Machine brochure",
      url: brochureFiles.sanitaryVendingMachine,
      filename: "sanitary-vending-machine.pdf",
    },
  ],
  quoteText: "Share your vending application and site details so our engineering team can confirm the right machine model.",
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
