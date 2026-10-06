import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const brochuresDir = path.resolve(publicDir, 'brochures');

if (!fs.existsSync(brochuresDir)) {
  fs.mkdirSync(brochuresDir, { recursive: true });
}

// Color Palette
const COLORS = {
  primary: '#094334',       // Deep Forest / Emerald
  primaryLight: '#0e5f4a',  // Medium Green
  primaryBg: '#f0fdf4',     // Very light green tint
  accent: '#d97706',        // Warm Amber / Gold
  accentLight: '#fef3c7',   // Light gold
  textDark: '#0f172a',      // Slate 900
  textMuted: '#475569',     // Slate 600
  textLight: '#ffffff',
  bgLight: '#f8fafc',       // Slate 50
  border: '#cbd5e1',        // Slate 300
  borderLight: '#e2e8f0',   // Slate 200
  tableRowAlt: '#f1f5f9',   // Slate 100
  badgeBg: '#e0f2fe',       // Light sky blue
  badgeText: '#0369a1',     // Sky 700
};

// Company Info
const COMPANY = {
  name: 'AARYA INNOVTECH PVT. LTD.',
  brand: 'SMART BUDDY',
  division: 'Eco-Hygiene, Public Utilities & Civic Automation OEM',
  certifications: 'ISO 9001:2015 | ISO 14001:2015 | ISO 45001:2018 | CE Certified',
  phone: '+91 88067 96868 / +91 99238 10197',
  email: 'sales@aaryainnovtech.com',
  website: 'www.aaryainnovtech.com',
  regdOffice: '4A, Sayali Darshan A, Radha Nagar, Makhamalabad Rd, Panchavati, Nashik - 422003',
  factory: 'S-27, Near Emerson, Ambad MIDC, Nashik, Maharashtra - 422010',
  tagline: 'Engineering Sustainable, Smart & Clean Public Utilities'
};

const brochureData = [
  {
    filename: 'ticket-kiosk.pdf',
    productTitle: 'SMART BUDDY TICKET KIOSK',
    modelCode: 'SB-TK-200 / SB-TK-400 Series',
    category: 'CIVIC AUTOMATION & PUBLIC TRANSIT SOLUTION',
    subtitle: 'Automated Self-Service Ticketing, Pass Dispensing & Queue Busting Terminal',
    summary:
      'The Smart Buddy Ticket Kiosk by Aarya Innovtech is a heavy-duty, interactive self-service automated ticketing solution designed for high-footfall transit systems, heritage monuments, theme parks, parking lots, and civic venues. It provides rapid ticketing in seconds, eliminating queue congestion and reducing operational overhead.',
    imagePath: path.resolve(publicDir, 'imagesss/ticket kisok.jpeg'),
    highlights: [
      'High-speed 80mm/112mm heavy-duty thermal ticket printer with automated heavy-duty cutter.',
      '19" / 21.5" Full HD Industrial Capacitive 10-point Touchscreen with anti-glare toughened glass.',
      'Multi-mode Payment Acceptance: Dynamic UPI QR display, Bharat QR, Credit/Debit POS, Cash & Coins.',
      'Omnidirectional 1D/2D Barcode & QR Code Scanner for instant pass validation and mobile ticketing.',
      'Vandal-resistant 1.6mm-2.0mm CRCA steel cabinet with electrostatic epoxy powder coating.',
      'Real-time IoT cloud telemetry, live paper-stock alerts, sales analytics and remote diagnostics.'
    ],
    featureCards: [
      { title: 'Queue-Busting Speed', text: 'Issues passenger tickets in under 5 seconds, cutting ticket counter queues by up to 75%.' },
      { title: 'Multi-Payment Ready', text: 'Accepts UPI QR, Contactless NFC cards, Chip+PIN credit/debit cards, and cash acceptors.' },
      { title: '24/7 Outdoor Rugged', text: 'IP55 rated front panel with thermal management, tamper sensor, and UPS power backup.' },
      { title: 'Cloud Telemetry', text: 'Live remote monitoring of machine health, revenue collection, and paper roll inventory.' }
    ],
    specs: [
      { label: 'Model Series', value: 'Smart Buddy SB-TK-200 (Wall/Counter) / SB-TK-400 (Floor Standing)' },
      { label: 'Enclosure Material', value: '1.6mm - 2.0mm Heavy Duty CRCA Mild Steel with Anti-Corrosive Epoxy Powder Coating' },
      { label: 'Display & Touch', value: '19" / 21.5" High-Brightness Full HD IPS LCD (1920x1080), 10-Point PCAP Multi-Touch' },
      { label: 'Computing Unit', value: 'Intel Core i3/i5 Industrial PC / ARM Quad-Core Android IoT Motherboard' },
      { label: 'Operating System', value: 'Windows 10/11 IoT Enterprise or Android 11+ Embedded' },
      { label: 'Ticket Printer', value: 'High-Speed 80mm/112mm Direct Thermal Printer (250 mm/sec, 203 DPI, Auto-Cutter)' },
      { label: 'Barcode/QR Scanner', value: 'High-Resolution 2D Omnidirectional Optical Scanner (Reads phone screens & paper)' },
      { label: 'Payment Integration', value: 'Dynamic UPI QR Screen, EMV POS Card Reader Terminal, Optional Cash/Coin Acceptor' },
      { label: 'Network & Comms', value: 'Gigabit Ethernet LAN, Dual-Band Wi-Fi 802.11ac/ax, 4G LTE High-Speed Cellular Module' },
      { label: 'Power Supply', value: '220-240V AC, 50Hz with In-Built UPS Power Backup (2-4 hours backup)' },
      { label: 'Security & Locking', value: 'Dual Master Key Heavy-Duty Cam Lock, Anti-Tamper Switch & Internal Alarm' },
      { label: 'Dimensions (H x W x D)', value: 'Floor Standing: 1650mm x 520mm x 450mm | Approx Weight: 68 kg' }
    ],
    techDetails: [
      'Industrial-grade thermal paper roll mechanism holds large rolls up to 200mm diameter for 2000+ tickets per roll.',
      'Vandal-resistant toughened safety glass with IK08 impact resistance protects the high-definition touch display.',
      'Optically isolated industrial I/O controller prevents electrical surges from affecting internal logic circuits.',
      'Integrated cooling fan system with dust filtration filters ensures 24/7 operating stability in Indian ambient temperatures.',
      'REST API and Webhook integration capabilities for seamless connectivity with central ticketing databases and transit ERPs.'
    ],
    applications: [
      'Metro Stations & Train Terminals',
      'Inter-State Bus Depots (MSRTC/ISBT)',
      'Heritage Sites & ASI Monuments',
      'Amusement & Water Theme Parks',
      'Smart City Multi-Level Parking (MLCP)',
      'Exhibition & Convention Centers',
      'Cinema Multiplexes & Stadia',
      'Toll Plazas & Ferry Terminals'
    ]
  },
  {
    filename: 'health-kiosk.pdf',
    productTitle: 'SMART BUDDY HEALTH KIOSK',
    modelCode: 'SB-HK-500 Series',
    category: 'TELEMEDICINE & PREVENTIVE HEALTHCARE STATION',
    subtitle: 'Automated Non-Invasive Public Health Screening, Vital Signs & Telehealth Kiosk',
    summary:
      'The Smart Buddy Health Kiosk is a comprehensive automated telemedicine and vital-screening station engineered by Aarya Innovtech. It enables individuals to quickly check essential health indicators—including Blood Pressure, BMI, Pulse, SpO2, Temperature, and ECG—within 3 to 5 minutes, delivering instant physical and digital health reports.',
    imagePath: path.resolve(publicDir, 'imagesss/health kiosk.jpeg'),
    highlights: [
      'Instant automated measurement of Blood Pressure, Blood Oxygen (SpO2), Pulse Rate, BMI, Height & Weight.',
      'Medical-grade certified digital sensors providing clinically accurate and repeatable physiological readings.',
      'Integrated Telemedicine consultation suite with 1080p HD camera, noise-cancelling mic & stereo speakers.',
      'Instant printed health diagnostic report + automated WhatsApp and SMS digital health summary.',
      'HIPAA-compliant encrypted data storage and secure cloud electronic health records (EHR) sync.',
      'Intuitive interactive multi-language voice-guided touch interface suitable for all demographic groups.'
    ],
    featureCards: [
      { title: 'Rapid Vital Checkups', text: 'Completes 6+ vital health parameters in under 3 minutes with automated step-by-step guidance.' },
      { title: 'Tele-Consultation Ready', text: 'Connects patients directly to doctors via live video call with real-time vitals transmission.' },
      { title: 'Instant Reports', text: 'Generates on-the-spot thermal printed health slips and sends digital PDF reports via WhatsApp.' },
      { title: 'Medical-Grade Accuracy', text: 'CE and ISO compliant medical sensors calibrated for clinical-grade reliability.' }
    ],
    specs: [
      { label: 'Model Series', value: 'Smart Buddy SB-HK-500 Telehealth Diagnostic Station' },
      { label: 'Enclosure Material', value: 'Ergonomic CRCA Steel & Medical-Grade Antibacterial Coated Panels' },
      { label: 'Display & Touch', value: '21.5" / 32" Full HD IPS Capacitive Touchscreen with Anti-Bacterial Toughened Glass' },
      { label: 'Vital Sensors - Standard', value: 'Automated NIBP (Blood Pressure), Pulse Oximeter (SpO2), Infrared Body Temp, Digital BMI' },
      { label: 'Vital Sensors - Advanced', value: 'Optional 6/12-Lead ECG, Blood Glucose (Invasive/Non-invasive), Lipid Profile & Urine Rapid' },
      { label: 'Report Delivery', value: 'High-Speed In-Built Thermal Report Printer + WhatsApp/SMS Cloud Link + Email' },
      { label: 'Telehealth Hardware', value: 'Full HD 1080p Wide-Angle Webcam, Noise-Cancelling Array Microphone, 10W Stereo Speakers' },
      { label: 'Computing & OS', value: 'Intel Core i5 Industrial Grade Motherboard, 16GB RAM, 256GB SSD, Windows 11 Enterprise' },
      { label: 'Data Security & Cloud', value: 'HIPAA Compliant Architecture, 256-bit AES Data Encryption, Biometric / OTP User Verification' },
      { label: 'Power & Backup', value: '230V AC, 50Hz, 150W Power Consumption with 4-Hour In-Built Online UPS Backup' },
      { label: 'Connectivity', value: 'Gigabit LAN, Dual-Band Wi-Fi, 4G/5G Cellular SIM Slot' },
      { label: 'Dimensions (H x W x D)', value: '1850mm x 750mm x 700mm | Approx Weight: 95 kg' }
    ],
    techDetails: [
      'Self-guided interactive UI walks users through arm-cuff placement and sensor touch with multi-lingual audio cues.',
      'Non-invasive infrared temporal temperature sensor delivers accurate core temperature in less than 2 seconds.',
      'Integrated ultrasonic height sensor and multi-point load-cell scale compute Body Mass Index (BMI) automatically.',
      'Secure doctor-portal integration allows physicians to view live patient telemetry and write digital prescriptions.',
      'All diagnostic data is encrypted end-to-end conforming to ISO 27001 data security guidelines.'
    ],
    applications: [
      'Corporate Campuses & IT Tech Parks',
      'Primary Healthcare Centers (PHC) & Clinics',
      'Community Wellness & Smart City Centers',
      'Railway Stations, Metro Hubs & Airports',
      'Retail Pharmacies & Diagnostic Chains',
      'Industrial Factories & Manufacturing Units',
      'Universities, Colleges & Hostels',
      'Gyms, Sports Complexes & Clubs'
    ]
  },
  {
    filename: 'water-atm-kiosk.pdf',
    productTitle: 'SMART BUDDY WATER ATM KIOSK',
    modelCode: 'SB-WATM-250 / 500 / 1000 Series',
    category: 'CLEAN WATER INFRASTRUCTURE & PUBLIC UTILITIES',
    subtitle: 'Automated 24/7 Safe Drinking Water Dispenser with Multi-Stage RO & Smart Payments',
    summary:
      'The Smart Buddy Water ATM Kiosk by Aarya Innovtech is an automated, coin/card/UPI-operated drinking water dispensing station. It integrates advanced multi-stage Reverse Osmosis (RO) and Ultra-Violet (UV) purification with smart volumetric flow metering to supply pure, chilled, and mineral-rich drinking water at minimal cost.',
    imagePath: path.resolve(publicDir, 'imagesss/Water Atm kiosk.png'),
    highlights: [
      'Multi-stage industrial purification: Sand filter, Carbon filter, Micron filtration, RO Membrane & UV Chamber.',
      'Smart multi-payment support: Multi-coin acceptor, RFID Smart Card tap, and Dynamic UPI QR code.',
      'Food-grade Stainless Steel (SS 304) dispensing chamber, piping, and anti-bacterial dispensing nozzles.',
      'Programmable volumetric dispensing: 250ml cup, 1 Litre bottle, 5 Litre can, and 20 Litre jar filling options.',
      'GSM/GPRS IoT cloud controller reporting real-time TDS levels, water volume, tank level, and daily revenue.',
      'Solar hybrid power compatibility with battery backup ensuring uninterrupted water access in rural/remote areas.'
    ],
    featureCards: [
      { title: 'Pure & Certified Water', text: 'Produces potable water conforming strictly to IS 10500 drinking water quality standards.' },
      { title: 'Cashless & Coin Options', text: 'Users can dispense water using coins (Rs. 1, 2, 5, 10), prepaid smart cards, or UPI QR.' },
      { title: 'Heavy Duty SS 304', text: 'Food-grade stainless steel interior and weatherproof anti-rust outer cabinet for long outdoor life.' },
      { title: 'Live GSM Telemetry', text: 'Monitors TDS, total dispensing volume, filter replacement schedules, and revenue remotely.' }
    ],
    specs: [
      { label: 'Model Series', value: 'Smart Buddy SB-WATM-250 (250 LPH) / SB-WATM-500 (500 LPH) / SB-WATM-1000' },
      { label: 'Purification Technology', value: 'Multi-Stage RO + UV Sterilization + TDS Controller + Active Mineral Cartridge' },
      { label: 'Dispensing Capacity', value: '250 to 1,000 Litres Per Hour (Customizable up to 5,000 LPH plants)' },
      { label: 'Dispensing Modes', value: 'Dual Nozzle (Simultaneous 1L bottle & 20L jar filling) with Optical Container Sensor' },
      { label: 'Payment Options', value: 'Multi-Coin Validator (Rs. 1, 2, 5, 10), RFID Smart Card Reader, Dynamic UPI QR Code' },
      { label: 'Cabinet Construction', value: 'Exterior: 1.6mm Powder Coated GI / Interior & Wet Area: Food-Grade SS 304' },
      { label: 'Storage Tank', value: '250L to 1000L Insulated Food-Grade SS 304 Storage Tank with High/Low Float Sensors' },
      { label: 'IoT Controller', value: 'Industrial Microcontroller with GSM/4G Telemetry, Live TDS & Flow Meter Sensors' },
      { label: 'Chilling Unit', value: 'Optional In-Built Hermetic Refrigeration Chiller (50-200 LPH chilled output at 10-15°C)' },
      { label: 'Power Rating', value: '220V AC, 50Hz, Single Phase / Solar Hybrid Inverter 24V/48V Compatibility' },
      { label: 'Display Screen', value: '16x2 Character Alphanumeric LCD / 7" Graphic Color TFT Status Display' },
      { label: 'Dimensions (H x W x D)', value: '1750mm x 700mm x 650mm | Approx Weight: 120 kg (dry)' }
    ],
    techDetails: [
      'High-precision magnetic turbine flow meter ensures exact calibrated volumetric dispensing without water loss.',
      'Automated auto-flush valve periodically cleans the RO membrane surface to prolong membrane life in high-TDS water.',
      'In-built low-water cutoff switch automatically de-energizes the high-pressure pump when raw water supply is depleted.',
      'Solar hybrid MPPT charge controller support allows complete off-grid deployment in remote villages and highway spots.',
      'Tamper-proof coin coin-box and heavy-duty steel lock protection prevent unauthorized access to cash collections.'
    ],
    applications: [
      'Railway Stations & Bus Stands',
      'Rural Gram Panchayats & Village Hubs',
      'Pilgrimage Centers & Temple Complexes',
      'Public Parks & Tourist Attractions',
      'Government Schools, Colleges & Hostels',
      'Smart City Public Utility Zones',
      'Highway Rest Stops & Fuel Stations',
      'Construction Sites & Labor Colonies'
    ]
  },
  {
    filename: 'printing-kiosk.pdf',
    productTitle: 'SMART BUDDY PRINTING KIOSK',
    modelCode: 'SB-PK-300 Series',
    category: 'CIVIC DIGITAL SERVICES & SMART CAMPUS UTILITIES',
    subtitle: 'Automated 24/7 Self-Service Document Printing, Scanning & Photocopying Station',
    summary:
      'The Smart Buddy Printing Kiosk by Aarya Innovtech provides a seamless, automated self-service document solution for students, citizens, and professionals. Users can upload documents via WhatsApp, Cloud storage, USB drives, or email and complete secure, high-speed printing, scanning, or copying with instant digital UPI payments.',
    imagePath: path.resolve(publicDir, 'imagesss/printing kiosk (1).png'),
    highlights: [
      'High-speed heavy-duty commercial Laser printing: A4 & Legal sizes in crisp Black & White and Full Color.',
      'Omnichannel Document Upload: WhatsApp chatbot, Web URL, Google Drive, Dropbox, USB Pendrive & Bluetooth.',
      'Instant Contactless Payment: Integrated Dynamic UPI QR code display, Card POS, and RFID student campus card.',
      'High-resolution Flatbed & ADF (Auto Document Feeder) Scanner for instant multi-page scanning and photocopy.',
      '100% Data Privacy Guaranteed: Automatic cryptographic session wiping deletes user files immediately after printing.',
      'High paper capacity drawer holding up to 2,500 sheets with automated low-paper and toner cloud alerts.'
    ],
    featureCards: [
      { title: 'Print from Anywhere', text: 'Upload files on WhatsApp or web and simply scan your personal QR code at the kiosk to print.' },
      { title: 'Zero Privacy Risk', text: 'Files are processed in encrypted volatile memory and erased automatically once printed.' },
      { title: 'B&W and Color Laser', text: 'High-speed 40 PPM laser printing engine with high-yield toner cartridges for low per-page cost.' },
      { title: 'Campus & Civic Ready', text: 'Integrates with university ERPs, student smart cards, and public e-Seva portals.' }
    ],
    specs: [
      { label: 'Model Series', value: 'Smart Buddy SB-PK-300 Smart Document Printing Kiosk' },
      { label: 'Print Technology', value: 'Heavy-Duty Commercial Laser Printing Engine (Monochrome & Color options)' },
      { label: 'Print Speed', value: 'Up to 35 - 45 Pages Per Minute (PPM) with Automatic Duplex (Double-Sided) Printing' },
      { label: 'Print Resolution', value: '1200 x 1200 DPI High-Definition Text and Graphic Clarity' },
      { label: 'Paper Handling', value: 'Dual 500-sheet lockable cassette trays (Total 1000 - 2500 sheets A4 / Legal capacity)' },
      { label: 'Scanner & Copier', value: '600 DPI Optical Flatbed Scanner with 50-Sheet Auto Document Feeder (ADF)' },
      { label: 'Display & Touch', value: '19" / 21.5" Full HD Industrial Touchscreen with Anti-Glare Protective Glass' },
      { label: 'Payment Gateway', value: 'UPI Dynamic QR Screen, Credit/Debit POS Terminal & RFID Smart Card Reader' },
      { label: 'Connectivity', value: 'Dual-Band Wi-Fi, Gigabit Ethernet RJ45, 4G LTE High-Speed Modem' },
      { label: 'Cabinet Construction', value: '1.6mm Heavy Duty CRCA Mild Steel with Anti-Theft Lockable Access Doors' },
      { label: 'Power & Backup', value: '230V AC, 50Hz, 350W Operating Power with In-Built UPS Power Backup' },
      { label: 'Dimensions (H x W x D)', value: '1680mm x 680mm x 600mm | Approx Weight: 85 kg' }
    ],
    techDetails: [
      'Custom proprietary print spooler driver prevents print job freezing and supports PDF, DOCX, PPTX, JPG, and PNG.',
      'End-to-end TLS 1.3 encrypted data channel between cloud upload portal and physical kiosk endpoint.',
      'Automated optical sensors detect paper jams, low toner levels, and empty paper trays, triggering cloud notifications.',
      'Supports student RFID card authentication allowing universities to allocate monthly subsidized print quotas.',
      'Heavy-duty cooling fans with washable dust filters protect internal optical laser components from ambient dust.'
    ],
    applications: [
      'Universities, Colleges & Engineering Institutes',
      'Central Libraries & Reading Rooms',
      'District Courts & Legal Chambers',
      'Collector Offices & Government e-Seva Kendras',
      'Co-Working Spaces & Business Incubators',
      'Airports, Railway Stations & Transit Terminals',
      'Hostels & Student Residential Complexes',
      'Hospitals & Medical Registration Counters'
    ]
  },
  {
    filename: 'food-kiosk.pdf',
    productTitle: 'SMART BUDDY FOOD KIOSK',
    modelCode: 'SB-FK-100 / SB-FK-200 Series',
    category: 'QSR AUTOMATION & RESTAURANT SELF-ORDERING TERMINAL',
    subtitle: 'Interactive Self-Ordering, Menu Browsing & Contactless Payment Kiosk',
    summary:
      'The Smart Buddy Food Kiosk by Aarya Innovtech is an interactive self-ordering and POS payment station designed for Quick Service Restaurants (QSR), food courts, cafeterias, and theme parks. It streamlines order taking, reduces customer wait times, eliminates ordering errors, and boosts average order ticket size through intelligent digital upselling.',
    imagePath: path.resolve(publicDir, 'imagesss/food kiosk.jpeg'),
    highlights: [
      'Vibrant 21.5", 27", or 32" Full HD portrait capacitive touchscreen displaying high-resolution visual menus.',
      'Integrated heavy-duty thermal receipt printer issuing instant order confirmation and kitchen token receipts.',
      'Multi-payment acceptance: Dynamic UPI QR display, EMV Credit/Debit Card POS terminal, and NFC payment.',
      'Real-time seamless integration with POS billing software and Kitchen Display Systems (KDS).',
      'Intelligent digital upselling & combo suggestions increasing average customer order spend by 15-25%.',
      'Flexible mounting configurations: Floor-standing pedestal, wall-mounted, or compact countertop models.'
    ],
    featureCards: [
      { title: 'Eliminate Queue Lines', text: 'Guests browse, customize ingredients, and pay in under 60 seconds without standing in counter queues.' },
      { title: 'Higher Average Spend', text: 'Automated high-res imagery and combo add-on prompts consistently increase ticket size.' },
      { title: 'Seamless Kitchen Sync', text: 'Orders route directly to kitchen display screens (KDS) and printers with zero communication error.' },
      { title: 'Multi-Language UI', text: 'Supports English, Hindi, Marathi, and regional languages for effortless customer interaction.' }
    ],
    specs: [
      { label: 'Model Series', value: 'Smart Buddy SB-FK-100 (Wall/Counter) / SB-FK-200 (Single/Dual Sided Pedestal)' },
      { label: 'Screen Size & Type', value: '21.5" / 27" / 32" Full HD IPS Commercial Display (1080x1920 Portrait), 10-Point Touch' },
      { label: 'Touch Technology', value: 'Projected Capacitive (PCAP) with 3mm Vandal-Resistant Toughened Glass' },
      { label: 'Computing Hardware', value: 'Quad-Core Android Industrial Controller / Intel Core i3 Industrial PC, 8GB RAM, 128GB SSD' },
      { label: 'Operating System', value: 'Android 11/12 Enterprise OS or Windows 10/11 IoT' },
      { label: 'Receipt / Token Printer', value: '80mm High-Speed Direct Thermal Printer (200 mm/s, Auto-Cutter, Drop-in Paper Loading)' },
      { label: 'Payment Mount Bracket', value: 'Universal Mount for PineLabs, Pax, Verifone, Ingenico POS Terminals & UPI QR Screen' },
      { label: 'Barcode/QR Scanner', value: 'Built-in 2D Scanner for discount coupons, membership loyalty QR, and gift vouchers' },
      { label: 'Audio', value: 'Integrated 5W High-Fidelity Audio Speaker for order feedback and voice guidance' },
      { label: 'Enclosure Build', value: 'Ultra-Slim Heavy Duty CRCA Steel with Scratch-Resistant Automotive Finish' },
      { label: 'Power Requirements', value: '110-240V AC, 50/60Hz, 80W Max Power Consumption' },
      { label: 'Dimensions (H x W x D)', value: 'Floor Pedestal: 1720mm x 480mm x 400mm | Weight: 48 kg' }
    ],
    techDetails: [
      'Supports dual-screen back-to-back configuration on a single pedestal to maximize floor-space efficiency in food courts.',
      'Industrial thermal printer features easy drop-in paper loading with optical low-paper and cover-open sensors.',
      'Integrated Wi-Fi 6, Gigabit Ethernet, and optional 4G LTE modem ensure non-stop network connectivity for payments.',
      'Modular hardware layout enables tool-free maintenance and quick replacement of printer and payment modules.',
      'Customizable exterior vinyl branding and LED illuminated logo halo lighting available for restaurant chains.'
    ],
    applications: [
      'Quick Service Restaurants (QSR) & Cafes',
      'Mall Food Courts & Multiplex Concessions',
      'Corporate Cafeterias & Tech Park Pantries',
      'Airport Terminal Dining & Lounges',
      'University & College Food Cafeterias',
      'Amusement Parks & Stadium Food Counters',
      'Hotel Buffets & Self-Order Breakfast Bars',
      'Drive-thru & Takeaway Pickup Centers'
    ]
  },
  {
    filename: 'computer-kiosk.pdf',
    productTitle: 'SMART BUDDY COMPUTER & INFO KIOSK',
    modelCode: 'SB-CK-100 / SB-CK-300 Series',
    category: 'INTERACTIVE IT TERMINALS & CIVIC E-GOVERNANCE OEM',
    subtitle: 'Industrial Interactive Information Terminal, Public Service & OEM Computing Kiosk',
    summary:
      'The Smart Buddy Computer Kiosk by Aarya Innovtech is a ruggedized interactive computing station built for 24/7 public service access, civic e-governance, digital information lookup, visitor management, and customized OEM industrial applications. Engineered with heavy-gauge steel and industrial-grade electronics, it withstands demanding public use.',
    imagePath: path.resolve(publicDir, 'imagesss/printing kiosk 3.jpeg'),
    highlights: [
      'Industrial-grade All-in-One computing engine rated for 24/7/365 uninterrupted continuous operation.',
      'High-durability Capacitive Touchscreen display with IP65-rated front splash and dust proofing.',
      'Heavy-duty 1.6mm - 2.0mm mild steel enclosure with high-security locks protecting internal electronics.',
      'Customizable peripheral integration: Biometric fingerprint scanner, HD webcam, barcode scanner & A4/thermal printer.',
      'Centralized Remote Device Management (RDM) supporting over-the-air software updates, remote reboot, and diagnostics.',
      'Tailored OEM engineering with custom corporate branding, dual-color paint finishes, and custom display sizes.'
    ],
    featureCards: [
      { title: '24/7 Industrial Grade', text: 'Built with commercial grade motherboards, solid-state storage, and silent heat dissipation.' },
      { title: 'Vandal-Resistant Body', text: 'Heavy gauge steel body with tamper locks protects all computing hardware in unmonitored areas.' },
      { title: 'Custom OEM Integration', text: 'Can be configured with fingerprint scanners, smart card readers, metal keyboards, or webcams.' },
      { title: 'Multi-OS Compatibility', text: 'Supports Windows 10/11 Enterprise, Ubuntu Linux, and Android OS tailored to client software.' }
    ],
    specs: [
      { label: 'Model Series', value: 'Smart Buddy SB-CK-100 (19"-21.5") / SB-CK-300 (32"-55" Large Format)' },
      { label: 'Display Options', value: '19", 21.5", 27", 32", 43", 55" High-Brightness Full HD / 4K IPS Displays' },
      { label: 'Touch Panel', value: '10-Point Projected Capacitive (PCAP) / Infrared (IR) Touch with 4mm Toughened Glass' },
      { label: 'Processor Options', value: 'Intel Celeron / Core i3 / Core i5 / Core i7 or Rockchip ARM Octa-Core SoC' },
      { label: 'Memory & Storage', value: '8GB to 32GB DDR4/DDR5 RAM | 128GB to 1TB NVMe Industrial Solid State Drive' },
      { label: 'Operating System', value: 'Windows 10/11 Pro, Windows IoT Enterprise, Linux (Ubuntu/Debian), Android 11+' },
      { label: 'Optional Add-ons', value: 'A4 Laser Document Printer, Biometric Fingerprint Scanner, HD Camera, Metal Keypad' },
      { label: 'Audio & Media', value: 'Dual 5W High-Output Internal Stereo Speakers with Hardware Volume Attenuator' },
      { label: 'Enclosure Material', value: '1.6mm - 2.0mm Heavy Gauge Cold Rolled Steel with Epoxy Powder Coating' },
      { label: 'Network & Comms', value: 'Gigabit Ethernet LAN (RJ45), Dual-Band Wi-Fi 802.11ac/ax, Bluetooth 5.2, 4G LTE' },
      { label: 'Operating Voltage', value: '180V - 240V AC, 50Hz with In-Built Surge Suppressor & EMI Filter' },
      { label: 'Dimensions (H x W x D)', value: '1580mm x 540mm x 420mm | Approx Weight: 55 kg' }
    ],
    techDetails: [
      'Fanless industrial motherboard cooling architecture prevents dust intake and enhances component longevity.',
      'Cable-management channels ensure all power and signal wires are internally routed and inaccessible from exterior.',
      'Front bezel sealed with industrial gasket achieving IP65 water and dust ingress resistance.',
      'Supports auto-power-on after power failure (AC Power Recovery) for completely autonomous public operation.',
      'Custom OEM enclosure modifications available for client-specified internal hardware, logo branding, and paint colors.'
    ],
    applications: [
      'Smart City Information & Public Wi-Fi Kiosks',
      'Government e-Governance & e-Seva Portals',
      'Corporate Visitor Management & Gate Passes',
      'Museums, Science Centers & Tourist Centers',
      'Airports, Railway Stations & Bus Terminals',
      'Hospitals & Healthcare Patient Portals',
      'Banking Halls & Financial Service Centers',
      'Industrial Shop Floors & Production Dashboards'
    ]
  },
  {
    filename: 'sanitary-vending-machine.pdf',
    productTitle: 'SMART BUDDY SANITARY VENDING MACHINE',
    modelCode: 'SB-SVM-25 / 50 / 100 Series',
    category: 'WOMEN’S HYGIENE & PUBLIC RESTROOM SUPPORT',
    subtitle: 'Automated Wall-Mounted Sanitary Napkin Dispenser for Public, School & Corporate Restrooms',
    summary:
      'The Smart Buddy Sanitary Vending Machine by Aarya Innovtech is an automated wall-mountable dispensing unit designed to provide women with immediate, dignified, and 24/7 access to sanitary napkins. Ideal for public restrooms, schools, colleges, hostels, corporate offices, and transit stations, it integrates smoothly into Smart Buddy Electronic ECO Toilets and modern washrooms.',
    imagePath: path.resolve(publicDir, 'imagesss/sanitary vending machine.jpeg'),
    highlights: [
      'Multiple payment & access options: Multi-coin validator (Rs. 5, 10), token, push-button, or UPI QR / RFID smart card.',
      'Robust 1.2mm - 1.6mm cold-rolled mild steel cabinet with electrostatic anti-corrosion powder coating.',
      'High-visibility acrylic stock inspection window with Low-Stock / Empty LED warning indicator.',
      'Precision motorized anti-theft dispensing spiral mechanism ensuring exactly one napkin per transaction.',
      'Multiple storage capacity models: 25, 50, 75, and 100+ sanitary pads (individual or multi-brand support).',
      'Can be paired with Smart Buddy Sanitary Napkin Incinerator for complete menstrual hygiene lifecycle management.'
    ],
    featureCards: [
      { title: '24/7 Restroom Access', text: 'Provides immediate, discreet access to quality sanitary pads without reliance on staff.' },
      { title: 'Anti-Theft Drop Gate', text: 'Secure internal mechanical interlock guarantees only one napkin dispenses per valid token/coin.' },
      { title: 'Wall-Mount Compact', text: 'Space-saving slim wall-mountable profile suitable for individual washroom cubicles or lobbies.' },
      { title: 'Battery & Solar Ready', text: 'Equipped with internal battery backup ensuring uninterrupted dispensing during power cuts.' }
    ],
    specs: [
      { label: 'Model Series', value: 'Smart Buddy SB-SVM-25 (25 pads) / SB-SVM-50 (50 pads) / SB-SVM-100 (100 pads)' },
      { label: 'Storage Capacity', value: '25 / 50 / 75 / 100 Napkins (Adjustable spiral spacing for various pad sizes)' },
      { label: 'Dispensing Mode', value: 'Motorized Spiral Drive / Mechanical Push-Pull Mechanism (Zero-Electricity model available)' },
      { label: 'Payment Acceptance', value: 'Electronic Multi-Coin Validator (Rs. 5 & Rs. 10), Token Acceptor, Push-Button or UPI QR' },
      { label: 'Cabinet Material', value: '1.2mm - 1.6mm Heavy Duty CRCA Mild Steel with Anti-Bacterial Powder Coating' },
      { label: 'Status Display', value: '16x2 Backlit LCD Screen showing Instructions, Coin Value, and Stock Status' },
      { label: 'Low Stock Indicator', value: 'High-Brightness Red LED Indicator & Audible Buzzer when stock drops below 5 units' },
      { label: 'Power Supply', value: '220V AC, 50Hz with In-Built Rechargeable SMF/Lithium Battery Backup (72+ hours)' },
      { label: 'Security & Locking', value: 'Heavy Duty Tamper-Proof Cam Lock with 2 Master Keys & Reinforced Hinges' },
      { label: 'Dimensions (H x W x D)', value: 'SB-SVM-50: 600mm (H) x 380mm (W) x 160mm (D) | Approx Weight: 14 kg' },
      { label: 'Installation Type', value: 'Wall Mountable with Heavy-Duty Rawl Bolts (Supplied with unit)' },
      { label: 'Companion Option', value: 'Pairs with Smart Buddy Electric Sanitary Napkin Incinerator for safe waste disposal' }
    ],
    techDetails: [
      'Microcontroller-controlled stepper motor delivers smooth, jam-free dispensing for standard and winged napkin packs.',
      'Low power consumption design consumes negligible standby power (< 5W) and operates for days on internal battery.',
      'Transparent acrylic level gauge allows sanitation staff to check refill requirements at a single glance.',
      'Optional GSM module sends automatic SMS alerts to facilities management when napkin inventory is running low.',
      'Built according to Ministry of Drinking Water & Sanitation menstrual hygiene management (MHM) national guidelines.'
    ],
    applications: [
      'Smart Buddy Electronic ECO Toilets & Public Washrooms',
      'Schools, Colleges, Universities & Girls Hostels',
      'Corporate Washrooms & IT Park Restrooms',
      'Railway Stations, Metro Terminals & Bus Depots',
      'Airports, Shopping Malls & Cinema Multiplexes',
      'Hospitals, Nursing Homes & Medical Colleges',
      'Government Administrative Buildings & Courts',
      'Sports Stadiums & Community Centers'
    ]
  },
  {
    filename: 'food-vending-machine.pdf',
    productTitle: 'SMART BUDDY FOOD & BEVERAGE VENDING MACHINE',
    modelCode: 'SB-FVM-300 / SB-FVM-500 Series',
    category: 'AUTOMATED RETAIL & CLIMATE-CONTROLLED VENDING',
    subtitle: 'Automated 24/7 Refrigerated Snacks, Beverages & Packaged Foods Dispenser',
    summary:
      'The Smart Buddy Food & Beverage Vending Machine by Aarya Innovtech is a high-capacity, climate-controlled automated vending station. It delivers cold canned drinks, bottled water, snacks, sandwiches, and packaged foods around the clock with seamless cashless payments, smart drop sensors, and real-time cloud telemetry.',
    imagePath: path.resolve(publicDir, 'imagesss/food vending machines.png'),
    highlights: [
      'Dual-zone precision refrigerated cabinet maintaining snacks at 12-18°C and cold beverages at 3-6°C.',
      'High-speed digital payment acceptance: Dynamic UPI QR code, Bharat QR, Credit/Debit Cards, RFID & Cash.',
      'Infrared drop-sensor detection system guarantees 100% successful product dispense or initiates instant refund.',
      'Cloud-based IoT telemetry providing real-time inventory counts, temperature monitoring, and sales analytics.',
      'Universal adjustable dual-spiral and conveyor belt trays accommodating cans, bottles, chips, chocolates & meal boxes.',
      'Double-glazed heated anti-condensation tempered glass door illuminated with vibrant energy-efficient LED lighting.'
    ],
    featureCards: [
      { title: 'Dual-Zone Cooling', text: 'Precision eco-friendly refrigeration keeps drinks ice-cold and snacks fresh in independent temperature zones.' },
      { title: '100% Guaranteed Dispense', text: 'Optical drop sensor monitors product fall; if an item fails to drop, the user is never charged.' },
      { title: 'UPI & Cashless Ready', text: 'Customers scan dynamic UPI QR code on the color screen for 3-second instant checkout.' },
      { title: 'Cloud Inventory Alerts', text: 'Receive automated smartphone alerts for restocking, temperature fluctuations, and daily sales.' }
    ],
    specs: [
      { label: 'Model Series', value: 'Smart Buddy SB-FVM-300 (30 Selections) / SB-FVM-500 (60 Selections)' },
      { label: 'Capacity & Selections', value: '300 to 600 items across 6 adjustable shelves (30 to 60 distinct product slots)' },
      { label: 'Temperature Range', value: 'Dual Zone: Lower Zone 3°C - 8°C (Cold Drinks) | Upper Zone 12°C - 18°C (Snacks)' },
      { label: 'Refrigeration System', value: 'Energy-Efficient Inverter Compressor with Eco-Friendly R134a / R290 Refrigerant' },
      { label: 'Payment Options', value: 'UPI Dynamic QR Screen, Bharat QR, Credit/Debit POS Terminal, Cash/Coin Acceptor' },
      { label: 'Dispensing Technology', value: 'Dual-Direction Spiral Coils / Conveyor Belt with High-Torque DC Motors' },
      { label: 'Drop Sensor System', value: 'Multi-Beam Infrared Drop Sensor Array for 100% Guaranteed Delivery' },
      { label: 'Display Screen', value: '7" Touchscreen / Optional 21.5" Full HD Digital Signage & Selection Screen' },
      { label: 'Cabinet Construction', value: 'Galvanized Steel with High-Density CFC-Free Polyurethane Foam Insulation' },
      { label: 'Front Glass Door', value: 'Double-Layer Low-E Heated Tempered Vacuum Glass (Anti-Fog / Anti-Condensation)' },
      { label: 'Power Requirements', value: '220V - 240V AC, 50Hz, 380W Operating Power Consumption' },
      { label: 'Dimensions (H x W x D)', value: '1940mm x 1080mm x 860mm | Approx Weight: 310 kg' }
    ],
    techDetails: [
      'High-efficiency polyurethane foam cabinet insulation ensures minimal thermal loss and low electricity consumption.',
      'Adjustable shelf pitch and motor spacing allow custom configuration for various can sizes, PET bottles, and snack packs.',
      'Microcontroller-driven anti-tamper door lock and steel anti-theft baffle prevent reaching into the dispensing bin.',
      'Integrated GSM/4G SIM modem connects to central web portal for remote price updates, stock monitoring, and diagnostics.',
      'Power-loss memory protection stores all transaction logs, ensuring no data or payment discrepancy during power cuts.'
    ],
    applications: [
      'Corporate Campuses & IT Tech Parks',
      'Hospitals, Nursing Homes & Medical Centers',
      'Airports, Metro Stations & Railway Terminals',
      'Universities, Colleges & Student Hostels',
      'Gymnasiums, Fitness Centers & Sports Arenas',
      'Shopping Malls & Entertainment Complexes',
      'Manufacturing Plants & Factory Breakrooms',
      'Hotels, Co-Living Spaces & Residential Societies'
    ]
  }
];

function drawPageHeader(doc, product, pageNum, totalPages) {
  const margin = 36;
  const pageWidth = 595.28;
  const contentWidth = pageWidth - margin * 2;

  // Header background rectangle
  doc.rect(margin, margin, contentWidth, 54).fill(COLORS.primary);

  // Top accent strip
  doc.rect(margin, margin, contentWidth, 3).fill(COLORS.accent);

  // Company Brand Name & Division
  doc.fillColor(COLORS.textLight)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text(COMPANY.name, margin + 12, margin + 9);

  doc.font('Helvetica')
     .fontSize(7.5)
     .fillColor('#93c5fd')
     .text(`${COMPANY.brand} | ${COMPANY.division}`, margin + 12, margin + 26);

  doc.fontSize(6.8)
     .fillColor('#cbd5e1')
     .text(COMPANY.certifications, margin + 12, margin + 38);

  // Right side contact details
  doc.font('Helvetica-Bold')
     .fontSize(8)
     .fillColor(COLORS.textLight)
     .text(`Hotline: ${COMPANY.phone}`, margin + contentWidth - 210, margin + 9, { width: 200, align: 'right' });

  doc.font('Helvetica')
     .fontSize(7.2)
     .fillColor('#fde047')
     .text(COMPANY.website, margin + contentWidth - 210, margin + 23, { width: 200, align: 'right' });

  doc.fontSize(6.8)
     .fillColor('#cbd5e1')
     .text(COMPANY.email, margin + contentWidth - 210, margin + 37, { width: 200, align: 'right' });

  doc.y = margin + 62;
}

function drawPageFooter(doc, product, pageNum, totalPages) {
  const margin = 36;
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const contentWidth = pageWidth - margin * 2;
  const footerY = pageHeight - margin - 32;

  // Top line
  doc.rect(margin, footerY, contentWidth, 1).fill(COLORS.borderLight);

  // Footer text
  doc.fillColor(COLORS.textMuted)
     .font('Helvetica-Bold')
     .fontSize(6.8)
     .text(`AARYA INNOVTECH PVT. LTD. (SMART BUDDY) | Regd. Office: ${COMPANY.regdOffice}`, margin, footerY + 5, { width: contentWidth - 60 });

  doc.font('Helvetica')
     .fontSize(6.2)
     .text(`Factory: ${COMPANY.factory} | Contact: ${COMPANY.phone} | ${COMPANY.email} | ${COMPANY.website}`, margin, footerY + 16, { width: contentWidth - 60 });

  // Page numbering pill
  doc.font('Helvetica-Bold')
     .fontSize(7)
     .fillColor(COLORS.primary)
     .text(`Page ${pageNum} of ${totalPages}`, margin + contentWidth - 60, footerY + 10, { width: 60, align: 'right' });
}

function generateBrochure(product) {
  return new Promise((resolve, reject) => {
    const outputPath = path.resolve(brochuresDir, product.filename);
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 36, bottom: 36, left: 36, right: 36 },
      autoFirstPage: true
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    const margin = 36;
    const pageWidth = 595.28;
    const contentWidth = pageWidth - margin * 2;

    // ==========================================
    // PAGE 1: HERO, OVERVIEW, HIGHLIGHTS, CARDS
    // ==========================================
    drawPageHeader(doc, product, 1, 2);

    // Product Title Block
    const titleBoxY = 100;
    doc.rect(margin, titleBoxY, contentWidth, 42).fill(COLORS.bgLight);
    doc.rect(margin, titleBoxY, 4, 42).fill(COLORS.primary);

    // Category Pill
    doc.rect(margin + 12, titleBoxY + 5, 240, 11).fill(COLORS.badgeBg);
    doc.font('Helvetica-Bold')
       .fontSize(6.5)
       .fillColor(COLORS.badgeText)
       .text(product.category, margin + 16, titleBoxY + 7);

    // Title
    doc.font('Helvetica-Bold')
       .fontSize(14)
       .fillColor(COLORS.primary)
       .text(product.productTitle, margin + 12, titleBoxY + 18);

    // Subtitle / Tagline
    doc.font('Helvetica-Oblique')
       .fontSize(7.5)
       .fillColor(COLORS.textMuted)
       .text(product.subtitle, margin + 12, titleBoxY + 32);

    // Model code badge on right
    doc.rect(margin + contentWidth - 145, titleBoxY + 14, 135, 16).fill('#ecfdf5');
    doc.rect(margin + contentWidth - 145, titleBoxY + 14, 135, 16).lineWidth(0.5).stroke('#a7f3d0');
    doc.font('Helvetica-Bold')
       .fontSize(7.5)
       .fillColor('#065f46')
       .text(product.modelCode, margin + contentWidth - 140, titleBoxY + 18, { width: 125, align: 'center' });

    // 2-Column Hero Area (Image Left, Overview Right)
    const heroY = 148;
    const colWidth = (contentWidth - 14) / 2;

    // Left Column: Image Box
    const imgBoxWidth = colWidth;
    const imgBoxHeight = 220;
    doc.rect(margin, heroY, imgBoxWidth, imgBoxHeight).fill(COLORS.bgLight);
    doc.rect(margin, heroY, imgBoxWidth, imgBoxHeight).lineWidth(0.8).stroke(COLORS.border);

    if (fs.existsSync(product.imagePath)) {
      try {
        doc.image(product.imagePath, margin + 8, heroY + 8, {
          fit: [imgBoxWidth - 16, imgBoxHeight - 34],
          align: 'center',
          valign: 'center'
        });
      } catch (err) {
        console.warn(`Could not embed image for ${product.productTitle}:`, err.message);
      }
    }

    // Image Caption Banner at bottom of box
    doc.rect(margin, heroY + imgBoxHeight - 20, imgBoxWidth, 20).fill(COLORS.primary);
    doc.font('Helvetica-Bold')
       .fontSize(7)
       .fillColor(COLORS.textLight)
       .text(`Smart Buddy OEM Specification: ${product.productTitle}`, margin + 6, heroY + imgBoxHeight - 14, { width: imgBoxWidth - 12, align: 'center' });

    // Right Column: Overview & Highlights
    const rightColX = margin + colWidth + 14;
    doc.font('Helvetica-Bold')
       .fontSize(10)
       .fillColor(COLORS.primary)
       .text('Product Overview', rightColX, heroY);

    doc.rect(rightColX, heroY + 13, colWidth, 1).fill(COLORS.accent);

    doc.font('Helvetica')
       .fontSize(7.6)
       .fillColor(COLORS.textDark)
       .text(product.summary, rightColX, heroY + 18, { width: colWidth, align: 'justify', lineGap: 1.5 });

    const highlightsStartY = heroY + 80;
    doc.font('Helvetica-Bold')
       .fontSize(9)
       .fillColor(COLORS.primary)
       .text('Key Capabilities & Highlights', rightColX, highlightsStartY);

    doc.rect(rightColX, highlightsStartY + 12, colWidth, 1).fill(COLORS.accent);

    let currHighY = highlightsStartY + 17;
    product.highlights.slice(0, 5).forEach((h) => {
      // Checkmark icon badge
      doc.rect(rightColX, currHighY + 1, 8, 8).fill(COLORS.primary);
      doc.font('Helvetica-Bold')
         .fontSize(6)
         .fillColor(COLORS.textLight)
         .text('✓', rightColX + 1.5, currHighY + 2.2);

      doc.font('Helvetica')
         .fontSize(7.2)
         .fillColor(COLORS.textDark)
         .text(h, rightColX + 13, currHighY, { width: colWidth - 14, lineGap: 1 });

      currHighY += 25;
    });

    // 4 Value Proposition Cards (Bottom Half of Page 1)
    const cardsSectionY = 378;
    doc.font('Helvetica-Bold')
       .fontSize(11)
       .fillColor(COLORS.primary)
       .text('Core Value Proposition & Operational Advantages', margin, cardsSectionY);

    doc.rect(margin, cardsSectionY + 15, contentWidth, 1.5).fill(COLORS.accent);

    const cardWidth = (contentWidth - 12) / 2;
    const cardHeight = 84;
    const row1Y = cardsSectionY + 22;
    const row2Y = row1Y + cardHeight + 8;

    product.featureCards.forEach((card, idx) => {
      const isRight = idx % 2 === 1;
      const isBottom = idx >= 2;
      const cardX = isRight ? margin + cardWidth + 12 : margin;
      const cardY = isBottom ? row2Y : row1Y;

      // Card Background
      doc.rect(cardX, cardY, cardWidth, cardHeight).fill('#ffffff');
      doc.rect(cardX, cardY, cardWidth, cardHeight).lineWidth(0.8).stroke(COLORS.borderLight);

      // Card Left Accent Bar
      doc.rect(cardX, cardY, 3.5, cardHeight).fill(COLORS.primary);

      // Card Header
      doc.font('Helvetica-Bold')
         .fontSize(8.5)
         .fillColor(COLORS.primary)
         .text(`${idx + 1}. ${card.title}`, cardX + 12, cardY + 10, { width: cardWidth - 20 });

      // Card Description
      doc.font('Helvetica')
         .fontSize(7.3)
         .fillColor(COLORS.textMuted)
         .text(card.text, cardX + 12, cardY + 26, { width: cardWidth - 20, lineGap: 1.5 });
    });

    // Applications Strip at Bottom of Page 1
    const appStripY = 566;
    doc.rect(margin, appStripY, contentWidth, 68).fill(COLORS.bgLight);
    doc.rect(margin, appStripY, contentWidth, 68).lineWidth(0.8).stroke(COLORS.border);

    doc.font('Helvetica-Bold')
       .fontSize(8.5)
       .fillColor(COLORS.primary)
       .text('Recommended Deployment Locations & Applications', margin + 12, appStripY + 8);

    doc.rect(margin + 12, appStripY + 20, contentWidth - 24, 1).fill(COLORS.accent);

    const appColWidth = (contentWidth - 24) / 4;
    product.applications.forEach((app, i) => {
      const colIdx = i % 4;
      const rowIdx = Math.floor(i / 4);
      const appX = margin + 12 + colIdx * appColWidth;
      const appY = appStripY + 26 + rowIdx * 18;

      doc.circle(appX + 3, appY + 4, 2).fill(COLORS.primary);
      doc.font('Helvetica')
         .fontSize(6.8)
         .fillColor(COLORS.textDark)
         .text(app, appX + 9, appY + 1, { width: appColWidth - 12 });
    });

    // Page 1 Trust Badge
    const trustY = 644;
    doc.rect(margin, trustY, contentWidth, 42).fill('#f0fdf4');
    doc.rect(margin, trustY, contentWidth, 42).lineWidth(0.8).stroke('#bbf7d0');

    doc.font('Helvetica-Bold')
       .fontSize(8)
       .fillColor('#166534')
       .text('Why Choose Aarya Innovtech (Smart Buddy)?', margin + 12, trustY + 6);

    doc.font('Helvetica')
       .fontSize(6.8)
       .fillColor('#14532d')
       .text('• Indigenous OEM Engineering Since 2010   • Over 500+ Public & Corporate Deployments Across India\n• In-House R&D, Design, Sheet Metal Fabrication & IoT Telemetry Software Development\n• Pan-India Lifecycle Installation, Spare Parts Availability & Comprehensive AMC Maintenance Support', margin + 12, trustY + 18, { lineGap: 1.2 });

    drawPageFooter(doc, product, 1, 2);

    // ==========================================
    // PAGE 2: TECHNICAL SPECIFICATIONS & ARCHITECTURE
    // ==========================================
    doc.addPage();
    drawPageHeader(doc, product, 2, 2);

    // Page 2 Title Banner
    const p2TitleY = 100;
    doc.rect(margin, p2TitleY, contentWidth, 24).fill(COLORS.primary);
    doc.font('Helvetica-Bold')
       .fontSize(10.5)
       .fillColor(COLORS.textLight)
       .text(`DETAILED TECHNICAL SPECIFICATIONS: ${product.productTitle}`, margin + 10, p2TitleY + 7);

    // Specifications Table
    const tableTopY = 130;
    const tableCol1Width = 145;
    const tableCol2Width = contentWidth - tableCol1Width;
    const rowHeight = 18;

    // Table Header
    doc.rect(margin, tableTopY, contentWidth, 18).fill('#0f172a');
    doc.font('Helvetica-Bold')
       .fontSize(7.5)
       .fillColor(COLORS.textLight)
       .text('TECHNICAL PARAMETER', margin + 8, tableTopY + 5);
    doc.text('ENGINEERING SPECIFICATION / STANDARD DETAILS', margin + tableCol1Width + 8, tableTopY + 5);

    let curTableRowY = tableTopY + 18;

    product.specs.forEach((spec, sIdx) => {
      const isAlt = sIdx % 2 === 1;
      doc.rect(margin, curTableRowY, contentWidth, rowHeight).fill(isAlt ? COLORS.tableRowAlt : '#ffffff');
      doc.rect(margin, curTableRowY, contentWidth, rowHeight).lineWidth(0.5).stroke(COLORS.borderLight);

      // Col 1: Label
      doc.font('Helvetica-Bold')
         .fontSize(7)
         .fillColor(COLORS.primary)
         .text(spec.label, margin + 8, curTableRowY + 5, { width: tableCol1Width - 12 });

      // Col 2: Value
      doc.font('Helvetica')
         .fontSize(6.8)
         .fillColor(COLORS.textDark)
         .text(spec.value, margin + tableCol1Width + 8, curTableRowY + 5, { width: tableCol2Width - 14, lineGap: 0.5 });

      curTableRowY += rowHeight;
    });

    // Technical Details & Architectural Highlights
    const techArchY = curTableRowY + 12;
    doc.font('Helvetica-Bold')
       .fontSize(10.5)
       .fillColor(COLORS.primary)
       .text('Engineering Design & Architectural Highlights', margin, techArchY);

    doc.rect(margin, techArchY + 14, contentWidth, 1.5).fill(COLORS.accent);

    let curDetailY = techArchY + 20;
    product.techDetails.forEach((detail, dIdx) => {
      // Bullet badge
      doc.rect(margin, curDetailY + 1, 6, 6).fill(COLORS.primary);
      doc.font('Helvetica')
         .fontSize(7.3)
         .fillColor(COLORS.textDark)
         .text(detail, margin + 12, curDetailY, { width: contentWidth - 14, lineGap: 1.5 });

      curDetailY += 21;
    });

    // Inquiry & Order Information Box (Bottom of Page 2)
    const inquiryBoxY = curDetailY + 10;
    const inquiryBoxHeight = 770 - inquiryBoxY;

    doc.rect(margin, inquiryBoxY, contentWidth, inquiryBoxHeight).fill('#f8fafc');
    doc.rect(margin, inquiryBoxY, contentWidth, inquiryBoxHeight).lineWidth(1).stroke(COLORS.primary);

    doc.rect(margin, inquiryBoxY, contentWidth, 18).fill(COLORS.primary);
    doc.font('Helvetica-Bold')
       .fontSize(8.5)
       .fillColor(COLORS.textLight)
       .text('HOW TO ENQUIRE & ORDER CUSTOM CONFIGURATIONS', margin + 10, inquiryBoxY + 5);

    const inqColWidth = (contentWidth - 20) / 2;
    doc.font('Helvetica')
       .fontSize(7.2)
       .fillColor(COLORS.textDark)
       .text('Share your project location, estimated footfall, preferred payment modules, and custom OEM branding requirements. Our engineering team prepares tailored layout drawings, electrical specifications, and detailed commercial techno-commercial proposals.', margin + 10, inquiryBoxY + 26, { width: inqColWidth, lineGap: 1.2 });

    const inqRightX = margin + inqColWidth + 20;
    doc.font('Helvetica-Bold')
       .fontSize(7.5)
       .fillColor(COLORS.primary)
       .text('DIRECT SALES & TECHNICAL SUPPORT DESK:', inqRightX, inquiryBoxY + 24);

    doc.font('Helvetica')
       .fontSize(7.2)
       .fillColor(COLORS.textDark)
       .text(`• Direct Hotline: ${COMPANY.phone}\n• Email Enquiry: ${COMPANY.email}\n• Official Portal: ${COMPANY.website}\n• Plant Location: S-27, Ambad MIDC, Nashik, MH - 422010`, inqRightX, inquiryBoxY + 36, { lineGap: 2 });

    drawPageFooter(doc, product, 2, 2);

    doc.end();

    stream.on('finish', () => {
      console.log(`Generated: ${product.filename}`);
      resolve(outputPath);
    });

    stream.on('error', (err) => {
      console.error(`Error generating ${product.filename}:`, err);
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting generation of ${brochureData.length} unique product brochures...`);
  for (const product of brochureData) {
    await generateBrochure(product);
  }
  console.log('All product brochures generated successfully!');
}

run().catch(console.error);
