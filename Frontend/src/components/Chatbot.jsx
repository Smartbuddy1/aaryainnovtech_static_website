import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { X, Send, Bot, User, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are the official customer support AI for AARYA INNOVTECH PVT. LTD. (OEM manufacturer established in 2010, based in Nashik, Maharashtra).
Your sole purpose is to provide accurate information about Aarya Innovtech, its website, products, technical specifications, kiosks, vending machines, waste management solutions, services, clients, careers, achievements, and contact details.

============================================================
COMPLETE PRODUCT CATALOG & CATEGORIES OF AARYA INNOVTECH:
============================================================

1. KIOSKS SERIES (Smart Buddy Interactive Kiosks):
   - Computer Kiosk: Ruggedized interactive computing terminal for 24/7 public service access, civic e-governance, digital information lookup, visitor management (19" to 55" display, Windows/Linux/Android, IP65 touch).
   - Ticket Kiosk: Self-service ticketing terminal with high-speed direct thermal receipt printer, 2D barcode/QR scanner, POS debit/credit card and dynamic UPI QR payments for transport, museums, cinema, token queue systems.
   - Health Kiosk: Comprehensive telemedicine and non-invasive health checkup kiosk measuring Blood Pressure, SPO2, BMI, ECG, body temperature, blood glucose, and tele-consultation camera.
   - Water ATM Kiosk: 24/7 automated clean drinking water dispensing station supporting coin acceptors and RFID smart cards for rural and urban community water projects.
   - Printing Kiosk: Autonomous self-service document printing, scanning, photocopy, and color laser printing terminal with cloud/USB/UPI integration.
   - Food Kiosk: Self-ordering interactive touch kiosk for quick-service restaurants (QSR), food courts, cafeterias, with dual-sided screen options, payment bracket, and thermal kitchen token printer.

2. SANITATION & PUBLIC HYGIENE:
   - Electronic ECO Toilet (e-Toilet / Smart Buddy SB-E2T Series): Modular, maintainable, fully automatic self-cleaning public toilets with automatic pre-flush, pressurized floor/wall cleaning, IoT status monitoring, automatic entry control (Push button, Coin/Token, Smart Card), solar power backup, and water sensors.
   - Bio-Digester: DRDO-approved anaerobic sewage and blackwater treatment system converting human waste into clean water and bio-gas with zero maintenance, no septic tank cleaning, and 100% eco-friendly discharge.
   - Sanitary Pad Incinerator: High-temperature smokeless electric napkin disposal unit with ceramic insulation, automatic cut-off timer, and emission filter for schools, colleges, public toilets, and offices.

3. WASTE MANAGEMENT & RECYCLING:
   - Organic Waste Composter (OWC): Fully automated 24-hour waste-to-rich-compost converter for food waste, garden waste, wet organic waste (Capacity: 25kg/day up to 2000kg/day) for residential societies, hotels, canteens, and municipal bodies.
   - PET Bottle Shredder / Reverse Vending Machine (RVM): High-speed automated bottle crusher that reduces PET bottle volume by 85%, dispensing discount coupons, cash-back, or loyalty points to encourage plastic recycling.

4. AUTOMATED VENDING MACHINES:
   - Sanitary Napkin Vending Machine: 24/7 automated pad dispensing machine (capacity 25 to 100 pads) with coin, token, and dynamic UPI QR payment support.
   - Food & Beverage Vending Machine: Spiral multi-tray refrigerated vending machine for packaged snacks, cold beverages, and healthy snacks with dual-temperature zones and multi-payment gateways.

============================================================
COMPANY CONTACT & LOCATION:
============================================================
- Company Name: Aarya Innovtech Pvt. Ltd.
- Phone: +91 88067 96868 / +91 99238 10197
- Email: sales@aaryainnovtech.com
- Regd. Office: 4A, Sayali Darshan A, Radha Nagar, Makhamalabad Road, Panchavati, Nashik - 422003
- Factory: S-27, Near Emerson, Ambad MIDC, Nashik, Maharashtra - 422010
- Working Hours: Sun - Fri: 09:00 AM - 06:00 PM (Saturday Closed)

============================================================
STRICT RESPONSE RULES:
============================================================
1. ONLY answer questions related to Aarya Innovtech Pvt. Ltd., its website, products, services, contact, careers, achievements, and company details.
2. If the user greets (hii, hello, hey, namaskar), greet them warmly and present Aarya Innovtech's key offerings.
3. If the user asks ANY question NOT related to Aarya Innovtech (e.g. general knowledge, math, other companies, chit-chat, movies, sports), you MUST strictly refuse by saying:
   - In English: "Sorry, I can only provide information regarding Aarya Innovtech Pvt. Ltd. and our products/services. Please feel free to ask about our Kiosks, Eco Toilets, Composters, Vending Machines, or contact details!"
   - In Marathi: "माफ करा, मी फक्त आर्या इनोव्हटेक (AARYA INNOVTECH) आणि आमच्या उत्पादनांविषयीच (उदा. कियोस्क, ईको टॉयलेट, कंपोस्टर, बायो-डायजेस्टर, व्हेंडिंग मशिन्स, संपर्क इत्यादी) माहिती देऊ शकतो. आपल्याला कंपनी किंवा आमच्या उत्पादनांविषयी काही विचारायचे असल्यास कृपया सांगा! 🙏"
4. If the user asks in Marathi (Devanagari or Romanized Marathi), ALWAYS reply in Marathi.`;

const SUGGESTED_QUESTIONS = [
  { label: "🏭 Products", query: "Show me the list of all products" },
  { label: "🖥️ Kiosks", query: "Show me all types of Kiosks you manufacture" },
  { label: "🚽 Eco Toilet", query: "Tell me about Electronic Eco Toilet" },
  { label: "♻️ Composter", query: "Tell me about Organic Waste Composter" },
  { label: "🧪 Bio-Digester", query: "Tell me about Bio-Digester" },
  { label: "🥤 RVM Shredder", query: "Tell me about PET Bottle Shredder" },
  { label: "🍫 Vending Machines", query: "Tell me about your Vending Machines" },
  { label: "📞 Contact Sales", query: "How can I contact the sales team?" },
  { label: "💰 Get Quote", query: "I want to request a price quotation" },
];

const isMarathiQuery = (query) => {
  const q = String(query || "").toLowerCase();
  if (/[\u0900-\u097F]/.test(q)) return true;
  const marathiTokens = [
    "marathi", "sanga", "sang", "dya", "aahe", "ahe", "ahet", "kay", "kasa", "kashi", "kiti", 
    "kuth", "kuthe", "kela", "madhe", "made", "kar", "kara", "pahije", "mahit", 
    "mahiti", "namaskar", "namaste", "shubhechha", "baddal", "babat", "kon", "koni", "kuthla", 
    "kuthle", "bol", "bola", "vikas", "kimat", "bhav", "patta", "sampark",
    "kahi", "vichar", "vicharayche", "vicharla", "shakto", "amhi", "tumhi", "pn", "tri", "hya", "tya", "ch"
  ];
  return marathiTokens.some(token => {
    const regex = new RegExp(`\\b${token}\\b`, 'i');
    return regex.test(q);
  });
};

const FALLBACK_TOPICS = [
  {
    id: "greetings",
    weight: 30,
    patterns: [
      /\b(hi+|hello+|hey+|greetings|namaste|namaskar|suprabhat)\b/i,
      /नमस्कार|नमस्ते|हॅलो|हाय|प्रणाम|शुभ\s*सकाळ|शुभ\s*दुपार|शुभ\s*संध्याकाळ|सुप्रभात/i,
      /\bgood\s*(morning|afternoon|evening)\b/i,
      /\bhow\s+are\s+you\b/i,
      /\bkasa\s+aahes?\b/i
    ],
    responseEn: `Hello! 👋 Welcome to **AARYA INNOVTECH PVT. LTD.** 🏢

We are an OEM manufacturing company established in 2010 based in Nashik, Maharashtra, specializing in smart public automation, sanitation, and sustainable waste management solutions.

🌟 **Our Key Solutions & Products:**
• 🖥️ **Interactive Kiosks**: Computer Kiosks, Ticket Kiosks, Health Kiosks, Water ATM Kiosks, Printing Kiosks, Food Kiosks
• 🚽 **Smart Sanitation**: Electronic ECO Toilets (e-Toilet) & DRDO Bio-Digester Sewage Systems
• ♻️ **Waste Management**: 24-Hour Organic Waste Composters (OWC) & PET Bottle Shredders (RVM)
• 🍫 **Automated Vending**: Sanitary Napkin Vending Machines & Snack Dispensers

How may I assist you today? Feel free to ask for product specifications, pricing, or company details!`,
    responseMr: `नमस्कार! 🙏 **आर्या इनोव्हटेक प्रायव्हेट लिमिटेड (AARYA INNOVTECH PVT. LTD.)** मध्ये आपले सहर्ष स्वागत आहे! 🏢

आम्ही २०१० पासून नाशिक, महाराष्ट्र येथे कार्यरत अग्रगण्य OEM मॅन्युफॅक्चरिंग कंपनी असून, स्मार्ट पब्लिक ऑटोमेशन, स्वच्छता तंत्रज्ञान आणि पर्यावरणपूरक कचरा व्यवस्थापनात तज्ज्ञ आहोत.

🌟 **आमची प्रमुख उत्पादने व सेवा:**
• 🖥️ **स्मार्ट कियोस्क**: कॉम्प्युटर, तिकीट, हेल्थ, वॉटर एटीएम, प्रिंटिंग आणि फूड कियोस्क
• 🚽 **स्वच्छता प्रणाली**: स्वयंचलित इलेक्ट्रॉनिक ईको टॉयलेट्स आणि DRDO बायो-डायजेस्टर
• ♻️ **कचरा व्यवस्थापन**: २४ तासांत खतनिर्मिती करणारे ऑर्गॅनिक वेस्ट कंपोस्टर (OWC) आणि बॉटल श्रेडर्स (RVM)
• 🍫 **व्हेंडिंग मशिन्स**: सॅनिटरी नॅपकिन व्हेंडिंग आणि स्नॅक्स व्हेंडिंग मशिन्स

आपल्याला कोणत्याही उत्पादनाची वैशिष्ट्ये, किंमत/कोटेशन किंवा माहिती हवी असल्यास कृपया विचारा!`
  },
  {
    id: "gratitude",
    weight: 25,
    patterns: [
      /\b(thanks|thank\s*you|thanks\s*a\s*lot|thankyou|thx|tysm|welcome|wlcm)\b/i,
      /\b(dhanyawad|dhanyavad|abhaar|abari|ok\s*thanks)\b/i,
      /धन्यवाद|आभार|आभारी\s*आहे|थँक्यू|वेलकम/i
    ],
    responseEn: `You're very welcome! 😊 If you have any more questions about **Aarya Innovtech's** products, kiosks, waste management solutions, or services, please feel free to ask. I'm here to help!`,
    responseMr: `आपले स्वागत आहे! 😊 आपल्याला **आर्या इनोव्हटेकच्या** कोणत्याही उत्पादनाविषयी (कियोस्क, ईको टॉयलेट, कंपोस्टर इ.) किंवा सेवेविषयी आणखी काही माहिती हवी असल्यास नक्की विचारा. मी मदतीसाठी नेहमी तत्पर आहे!`
  },
  {
    id: "acknowledgment",
    weight: 24,
    patterns: [
      /\b(ok|okay|sure|got\s*it|alright|fine)\b/i,
      /ओके|ठीक\s*आहे|बरोबर/i
    ],
    responseEn: `Great! 👍 Please let me know if you need any more information about our products or services. I'm here to help!`,
    responseMr: `ठीक आहे! 👍 तुम्हाला आमच्या उत्पादनांविषयी किंवा सेवेविषयी आणखी काही माहिती हवी असल्यास नक्की सांगा.`
  },
  {
    id: "company_name",
    weight: 25,
    patterns: [
      /\b(what\s+is\s+)?(your|the)?\s*company\s*name\b/i,
      /\bwhich\s+company\b/i,
      /\bwho\s+are\s+you\b/i,
      /\bwhat\s+is\s+your\s+name\b/i,
      /\bname\s+of\s+(your|the)\s+company\b/i,
      /\bcompany\s+nav\b/i,
      /\btumch(a|e)\s+nav\b/i,
      /कंपनीचे\s*नाव|कंपनीचं\s*नाव|नाव\s*काय\s*आहे|कोणती\s*कंपनी/i
    ],
    responseEn: `Our company name is **AARYA INNOVTECH PVT. LTD.** 🏢

We are an OEM engineering and manufacturing company established in 2010 based in Nashik, Maharashtra.

🌟 **Our Key Solutions:**
• 🖥️ **Interactive Kiosks** (Computer, Ticket, Health, Water ATM, Printing, Food)
• 🚽 **Electronic ECO Toilets (e-Toilet)** & **DRDO Bio-Digesters**
• ♻️ **Organic Waste Composters (OWC)** & **PET Bottle Shredders (RVM)**
• 🍫 **Automated Sanitary & Snack Vending Machines**

How can I help you today?`,
    responseMr: `आमच्या कंपनीचे नाव **आर्या इनोव्हटेक प्रायव्हेट लिमिटेड (AARYA INNOVTECH PVT. LTD.)** आहे. 🏢

आम्ही २०१० पासून नाशिक, महाराष्ट्र येथे कार्यरत अग्रगण्य OEM मॅन्युफॅक्चरिंग कंपनी आहोत.

🌟 **आमची प्रमुख उत्पादने:**
• 🖥️ **इंटरॅक्टिव्ह कियोस्क** (कॉम्प्युटर, तिकीट, हेल्थ, वॉटर एटीएम, प्रिंटिंग, फूड)
• 🚽 **इलेक्ट्रॉनिक ईको टॉयलेट** आणि **DRDO बायो-डायजेस्टर**
• ♻️ **ऑर्गॅनिक वेस्ट कंपोस्टर** आणि **प्लॅस्टिक बॉटल श्रेडर (RVM)**
• 🍫 **स्वयंचलित व्हेंडिंग मशिन्स**

मी आपल्याला कशी मदत करू शकतो?`
  },
  {
    id: "founder_leadership",
    weight: 24,
    patterns: [
      /\b(founder|directors?|ceo|owner|proprietor|management|leadership|who\s+started|who\s+owns|who\s+founded|who\s+is\s+the\s+(boss|head|leader|founder|director|owner))\b/i,
      /संस्थापक|डायरेक्टर|संचालक|मालक|प्रमुख|कंपनी\s*कोणाची/i
    ],
    responseEn: `👤 **Leadership & Management - Aarya Innovtech Pvt. Ltd.**:

• **Company**: Aarya Innovtech Pvt. Ltd. (Brand: **SMART BUDDY**)
• **Leadership**: The company is led by a veteran Engineering Director bringing over **16+ years of specialized experience** in industrial automation, special purpose machines, and sustainable hygiene engineering.
• **Establishment**: Founded in 2010 in Nashik, Maharashtra as a pioneering indigenous OEM manufacturer.
• **Corporate Office**: 4A, Sayali Darshan A, Radha Nagar, Makhamalabad Road, Panchavati, Nashik - 422003
• **Factory**: S-27, Near Emerson, Ambad MIDC, Nashik, Maharashtra - 422010

For executive inquiries, please contact **sales@aaryainnovtech.com** or call **+91 88067 96868**.`,
    responseMr: `👤 **नेतृत्व व व्यवस्थापन (Leadership & Management)**:

• **कंपनी**: आर्या इनोव्हटेक प्रायव्हेट लिमिटेड (ब्रँड: **SMART BUDDY**)
• **संचालक व नेतृत्व (Director)**: कंपनीचे नेतृत्व इंडस्ट्रियल ऑटोमेशन आणि हायजिन उत्पादने क्षेत्रातील **१६+ वर्षांपेक्षा जास्त अनुभव** असणाऱ्या तज्ज्ञ संचालकांकडे आहे.
• **स्थापना**: २०१० पासून नाशिक, महाराष्ट्र येथे अग्रगण्य OEM उत्पादक म्हणून कार्यरत.
• **कार्यालय**: ४ए, सायली दर्शन ए, राधा नगर, मखमलाबाद रोड, पंचवटी, नाशिक - ४२२००३
• **फॅक्टरी**: एस-२७, एमर्सन जवळ, अंबड एमआयडीसी, नाशिक, महाराष्ट्र - ४२२०१०

थेट व्यवस्थापनाशी संपर्क किंवा चौकशीसाठी **sales@aaryainnovtech.com** वर ईमेल करा किंवा **+91 88067 96868** वर कॉल करा.`
  },
  {
    id: "about_us",
    weight: 22,
    patterns: [
      /\babout\s*(us|you|the\s*company|aarya|innovtech)\b/i,
      /\bwho\s+we\s+are\b/i,
      /\bwhat\s+do\s+you\s+do\b/i,
      /\bcompany\s*(profile|overview|details|history|mission|vision)\b/i,
      /कंपनी\s*(माहिती|इतिहास|बद्दल|कार्य)/i,
      /कंपनी\s*काय\s*करते/i,
      /बद्दल\s*सांगा/i
    ],
    responseEn: `🏢 **About Aarya Innovtech Pvt. Ltd.**:

Established in 2010 in Nashik, Maharashtra, **Aarya Innovtech** is an ISO 9001:2015 certified OEM technology manufacturer delivering smart sanitation, automated waste recycling, and interactive hardware solutions across India.

🌟 **Core Domains:**
1. **Interactive Kiosks**: Custom touchscreen terminals for e-governance, healthcare, ticketing, and retail.
2. **Public Sanitation**: Smart automatic e-Toilets and DRDO-approved Bio-Digesters.
3. **Waste Management**: 24-hour rapid Organic Waste Composters (OWC) & PET bottle shredders.
4. **Vending Automation**: Automated sanitary pad & snack vending dispensers.

📍 **Offices**: Head Office in Panchavati, Nashik | Manufacturing Plant in Ambad MIDC, Nashik.`,
    responseMr: `🏢 **आर्या इनोव्हटेक प्रायव्हेट लिमिटेड बद्दल माहिती**:

२०१० मध्ये नाशिक, महाराष्ट्र येथे स्थापन झालेली **आर्या इनोव्हटेक** ही आयएसओ (ISO 9001:2015) प्रमाणित अग्रगण्य मॅन्युफॅक्चरिंग कंपनी आहे.

🌟 **मुख्य कार्यक्षेत्रे:**
१. **इंटरॅक्टिव्ह कियोस्क**: ई-गव्हर्नन्स, टेलिमेडिसिन, तिकीट व फूड सेल्फ-सर्व्हिस स्टेशन्स.
२. **स्वच्छता तंत्रज्ञान**: स्वयंचलित ईको टॉयलेट्स आणि डीआरडीओ बायो-डायजेस्टर सांडपाणी प्रणाली.
३. **कचरा व्यवस्थापन**: २४ तासांत खत तयार करणारे कंपोस्टर आणि प्लॅस्टिक बॉटल श्रेडर्स.
४. **व्हेंडिंग मशिन्स**: सॅनिटरी नॅपकिन व स्नॅक्स व्हेंडिंग मशिन्स.

📍 **पत्ता**: पंचवटी, नाशिक (कार्यालय) आणि अंबड एमआयडीसी, नाशिक (फॅक्टरी).`
  },
  {
    id: "contact",
    weight: 20,
    patterns: [
      /\b(contact|sales\s*team|sales|phone|mobile|email|address|location|factory|office|call\s*(us|you|me|team)?|where\s+are\s+you|where\s+is\s+(the\s+)?(office|factory|company)|hours?|timings?|nashik|ambad|panchavati)\b/i,
      /संपर्क|पत्ता|फोन|नंबर|मोबाईल|ईमेल|कार्यालय|फॅक्टरी|पत्ता\s*काय|नाशिक|अंबड|पंचवटी/i,
      /\bsampark\b/i,
      /\bpatta\b/i
    ],
    responseEn: `📞 **Contact Aarya Innovtech**:

• **Call Us**: +91 88067 96868 / +91 99238 10197
• **Email Us**: sales@aaryainnovtech.com
• **Regd. Office**: 4A, Sayali Darshan A, Radha Nagar, Makhamalabad Road, Panchavati, Nashik - 422003
• **Factory**: S-27, Near Emerson, Ambad MIDC, Nashik, Maharashtra - 422010
• **Working Hours**: Sun - Fri: 09:00 AM - 06:00 PM`,
    responseMr: `📞 **आर्या इनोव्हटेकशी संपर्क साधा**:

• **फोन नंबर**: +91 88067 96868 / +91 99238 10197
• **ईमेल**: sales@aaryainnovtech.com
• **नोंदणीकृत कार्यालय**: ४ए, सायली दर्शन ए, राधा नगर, मखमलाबाद रोड, पंचवटी, नाशिक - ४२२००३
• **फॅक्टरी**: एस-२७, एमर्सन जवळ, अंबड एमआयडीसी, नाशिक, महाराष्ट्र - ४२२०१०
• **वेळ**: रविवार ते शुक्रवार: सकाळी ०९:०० ते संध्याकाळी ०६:००`
  },
  {
    id: "quote",
    weight: 18,
    patterns: [
      /\b(quot(e|ation)s?|pric(e|ing|es)|cost|rates?|buy|purchase|how\s+much)\b/i,
      /किंमत|कोटेशन|भाव|दर|खर्च|किती\s*आहे|किंमत\s*काय/i,
      /\bkimat\b/i,
      /\bbhav\b/i
    ],
    responseEn: `💰 **Request a Quotation / Pricing**:

Please share your specific requirements (Product model, capacity, installation location, and quantity) and our engineering team will provide a customized quotation:

• **Email**: sales@aaryainnovtech.com
• **Call / WhatsApp**: +91 88067 96868 / +91 99238 10197
• **Working Hours**: Sun - Fri: 09:00 AM - 06:00 PM`,
    responseMr: `💰 **किंमत / कोटेशन मिळवण्यासाठी**:

कृपया तुमच्या गरजेनुसार मॉडेल, क्षमता आणि ठिकाण सांगा. आमची इंजिनिअरिंग टीम तुम्हाला त्वरित कोटेशन पाठवेल:

• **ईमेल**: sales@aaryainnovtech.com
• **कॉल / व्हॉट्सॲप**: +91 88067 96868 / +91 99238 10197
• **वेळ**: रविवार ते शुक्रवार: सकाळी ०९:०० ते संध्याकाळी ०६:००`
  },
  {
    id: "computer_kiosk",
    weight: 18,
    patterns: [
      /\bcomputer\s*kiosks?\b/i,
      /कॉम्प्युटर\s*कियोस्क/i
    ],
    responseEn: `🖥️ **Computer Kiosk (Interactive Public Terminal)**:

• **Display Sizes**: 19", 21.5", 32", 43", 55" Full HD / 4K capacitive/SAW touchscreen (IP65 rated).
• **OS & Processing**: Windows 11 Pro, Linux Ubuntu, or Android OS with Intel Core i3/i5/i7 or RK3399/3588 processors.
• **Features**: Heavy-duty vandal-proof CRCA steel enclosure, anti-glare toughened glass, integrated stereo speakers, secure cable routing.
• **Applications**: Public e-Governance, citizen portal lookup, visitor entry registration, wayfinding, queue token dispensing.`,
    responseMr: `🖥️ **कॉम्प्युटर कियोस्क (Computer Kiosk)**:

• **स्क्रीन आकार**: १९", २१.५", ३२", ४३", ५५" फुल एचडी / 4K टचस्क्रीन (IP65 सुरक्षित).
• **ऑपरेटिंग सिस्टीम**: विंडोज, लिनक्स किंवा अँड्रॉइड समर्थित (हाय-स्पीड प्रोसेसरसह).
• **वैशिष्ट्ये**: हेवी-ड्युटी व्हॅन्डल-प्रूफ स्टील बॉडी, अँटी-ग्लेअर ग्लास, इनबिल्ट स्पीकर्स.
• **उपयोग**: ई-गव्हर्नन्स, माहिती शोध, व्हिजिटर मॅनेजमेंट आणि सार्वजनिक सेवांसाठी उपयुक्त.`
  },
  {
    id: "ticket_kiosk",
    weight: 18,
    patterns: [
      /\bticket(ing)?\s*kiosks?\b/i,
      /\btoken\s*kiosks?\b/i,
      /तिकीट\s*कियोस्क|टोकन\s*कियोस्क/i
    ],
    responseEn: `🎟️ **Self-Service Ticket & Token Kiosk**:

• **Printing Unit**: Heavy-duty 80mm / 112mm direct thermal receipt printer with auto-cutter and paper low sensor.
• **Scanning & Payment**: Omnidirectional 1D/2D QR barcode scanner, POS debit/credit card bracket, dynamic UPI QR display.
• **Applications**: Metro/bus transit tickets, museum entry, cinema, parking tokens, hospital & bank queue management.`,
    responseMr: `🎟️ **तिकीट व टोकन कियोस्क (Ticket Kiosk)**:

• **प्रिंटिंग युनिट**: ऑटो-कटरसह ८० मिमी / ११२ मिमी हाय-स्पीड थर्मल प्रिंटर.
• **पेमेंट व स्कॅनिंग**: २डी क्युआर बारकोड स्कॅनर, पीओएस कार्ड आणि युपीआय (UPI) पेमेंट सुविधा.
• **उपयोग**: मेट्रो, बस तिकीट, संग्रहालय, सिनेमा, पार्किंग आणि हॉस्पिटल/बँक टोकन मॅनेजमेंट.`
  },
  {
    id: "health_kiosk",
    weight: 18,
    patterns: [
      /\bhealth\s*kiosks?\b/i,
      /\btelemedicine\b/i,
      /हेल्थ\s*कियोस्क|आरोग्य\s*कियोस्क/i
    ],
    responseEn: `🩺 **Telemedicine Health Kiosk**:

• **Diagnostic Tests**: Blood Pressure (NIBP), Pulse Oximetry (SpO2), Body Mass Index (BMI & Height/Weight), 12-Lead ECG, Non-contact Body Temperature, Blood Glucose & Cholesterol.
• **Tele-Consultation**: Full HD video camera, microphone, secure cloud EHR health report generation, instant thermal printout.
• **Applications**: Rural health clinics (PHCs), smart city health centers, corporate wellness hubs.`,
    responseMr: `🩺 **हेल्थ कियोस्क (Health & Telemedicine Kiosk)**:

• **तपासणी सुविधा**: रक्तदाब (BP), ऑक्सिजन (SpO2), बीएमआय (वजन व उंची), ईसीजी (ECG), तापमान, शुगर व कोलेस्ट्रॉल.
• **टेलिमेडिसिन**: डॉक्टरांशी थेट व्हिडिओ कॉल, डिजिटल हेल्थ रिपोर्ट आणि प्रिंटआउट.
• **उपयोग**: ग्रामीण प्राथमिक आरोग्य केंद्र (PHC), स्मार्ट सिटी दवाखाने आणि कॉर्पोरेट कंपन्या.`
  },
  {
    id: "water_atm_kiosk",
    weight: 18,
    patterns: [
      /\bwater\s*(atm|kiosks?)\b/i,
      /वॉटर\s*एटीएम|पिण्याचे\s*पाणी\s*कियोस्क/i
    ],
    responseEn: `💧 **Water ATM Kiosk (Automated Water Dispenser)**:

• **Dispensing Modes**: Multi-coin acceptor, RFID Smart Card tap-and-dispense, and UPI QR payment.
• **Control & Accuracy**: Solenoid valve flow-meter with programmable liter calibration (250ml to 20L).
• **Construction**: Food-grade SS304 internal plumbing with IP65 outdoor weatherproof weather enclosure and solar capability.`,
    responseMr: `💧 **वॉटर एटीएम कियोस्क (Water ATM Kiosk)**:

• **वितरण पर्याय**: नाणी (Coins), स्मार्ट कार्ड (RFID) आणि युपीआय क्युआर कोड.
• **अचूक नियंत्रण**: २५० मिली ते २० लिटरपर्यंत अचूक पाणी मोजणारे सेन्सर्स.
• **रचना**: फूड-ग्रेड स्टेनलेस स्टील (SS304), वॉटरप्रूफ बॉडी आणि सोलर बॅकअप सुविधा.`
  },
  {
    id: "printing_kiosk",
    weight: 18,
    patterns: [
      /\bprint(ing)?\s*kiosks?\b/i,
      /प्रिंटिंग\s*कियोस्क|झेरॉक्स\s*कियोस्क/i
    ],
    responseEn: `🖨️ **Autonomous Self-Service Printing Kiosk**:

• **Functions**: Document Printing (B&W and Color Laser), Scanning, and Photocopying.
• **Connectivity**: Cloud storage (Google Drive/Dropbox), USB pen-drive, Bluetooth, WhatsApp-to-print.
• **Payment**: Integrated UPI QR scanner for instant cashless payment.`,
    responseMr: `🖨️ **प्रिंटिंग कियोस्क (Self-Service Printing Kiosk)**:

• **सुविधा**: डॉक्युमेंट प्रिंटिंग (ब्लॅक अँड व्हाईट / कलर लेसर), स्कॅनिंग आणि झेरॉक्स.
• **कनेक्टिव्हिटी**: गुगल ड्राईव्ह, पेन ड्राईव्ह, व्हॉट्सॲप-टू-प्रिंट आणि ब्लूटूथ.
• **पेमेंट**: युपीआय (UPI) क्युआर कोडद्वारे त्वरित पेमेंट.`
  },
  {
    id: "food_kiosk",
    weight: 18,
    patterns: [
      /\bfood\s*kiosks?\b/i,
      /\bself[\s-]*order(ing)?\s*kiosks?\b/i,
      /फूड\s*कियोस्क|ऑर्डर\s*कियोस्क/i
    ],
    responseEn: `🍔 **Self-Ordering Food Kiosk (QSR / Restaurant Kiosk)**:

• **Display**: 21.5" to 32" vertical interactive touchscreen with capacitive multi-touch.
• **Integration**: Thermal kitchen order ticket (KOT) printer, barcode coupon scanner, EDC card bracket.
• **Applications**: Fast food chains, cafeterias, food courts, highway dhabas, cinema concessions.`,
    responseMr: `🍔 **फूड कियोस्क (Self-Ordering Food Kiosk)**:

• **स्क्रीन**: २१.५" ते ३२" व्हर्टिकल टचस्क्रीन.
• **इंटिग्रेशन**: किचन ऑर्डर तिकीट (KOT) प्रिंटर, डिस्काउंट स्कॅनर आणि कार्ड/युपीआय पेमेंट.
• **उपयोग**: रेस्टॉरंट्स, फूड कोर्ट्स, कॅफेटेरिया आणि चित्रपटगृहांसाठी आदर्श.`
  },
  {
    id: "kiosks",
    weight: 14,
    patterns: [
      /\bkiosks?\b/i,
      /\binteractive\s*terminals?\b/i,
      /कियोस्क/i
    ],
    responseEn: `At **AARYA INNOVTECH**, we manufacture a complete range of smart, heavy-duty **Interactive Kiosks**:

1. 🖥️ **Computer Kiosk**: Public e-governance & visitor info terminal.
2. 🎟️ **Ticket Kiosk**: Autonomous ticketing & token terminal with thermal printer.
3. 🩺 **Health Kiosk**: Telemedicine checkup station (BP, SpO2, BMI, ECG, temperature).
4. 💧 **Water ATM Kiosk**: 24/7 coin & RFID drinking water dispenser.
5. 🖨️ **Printing Kiosk**: Document print, scan & photocopy station.
6. 🍔 **Food Kiosk**: Touchscreen self-ordering terminal for restaurants & food courts.

📞 *Contact sales at sales@aaryainnovtech.com or +91 88067 96868 for quotes.*`,
    responseMr: `**आर्या इनोव्हटेक (AARYA INNOVTECH)** कडे उपलब्ध असणारे सर्व अत्याधुनिक **इंटरॅक्टिव्ह कियोस्क**:

1. 🖥️ **कॉम्प्युटर कियोस्क**: ई-गव्हर्नन्स व माहिती शोध स्टेशन.
2. 🎟️ **तिकीट कियोस्क**: स्वयंचलित तिकीट व टोकन मशीन.
3. 🩺 **हेल्थ कियोस्क**: टेलिमेडिसिन व डिजिटल आरोग्य तपासणी.
4. 💧 **वॉटर एटीएम कियोस्क**: शुद्ध पिण्याचे पाणी देणारे स्वयंचलित एटीएम.
5. 🖨️ **प्रिंटिंग कियोस्क**: डॉक्युमेंट प्रिंटिंग व झेरॉक्स स्टेशन.
6. 🍔 **फूड कियोस्क**: रेस्टॉरंट्ससाठी सेल्फ-ऑर्डरिंग टचस्क्रीन कियोस्क.

📞 *कोटेशनसाठी संपर्क: sales@aaryainnovtech.com किंवा +91 88067 96868.*`
  },
  {
    id: "eco_toilet",
    weight: 15,
    patterns: [
      /\b(eco[\s-]*toilet|e[\s-]*toilet|toilets?|urinals?|sanitation|restroom)\b/i,
      /टॉयलेट|शौचालय|ईको\s*टॉयलेट|स्वच्छता/i
    ],
    responseEn: `🚽 **Smart Buddy Electronic ECO Toilet (e-Toilet)**:

• **Automatic Operation**: Automatic pre-flush, pressurized floor and wall cleaning after visits.
• **Controlled Access**: Entry via Push Button, Coins/Tokens, or RFID Smart Cards.
• **IoT & Backup**: Real-time IoT monitoring, SMS alerts, power backup & water level sensors.
• **Variants**: Single unit, Twin blocks, Community Male/Female urinals, and Women-friendly units with napkin vending & incinerator.

📍 Installed across smart cities, highways, parks, and tourist locations across India.`,
    responseMr: `🚽 **स्मार्ट बडी इलेक्ट्रॉनिक ईको टॉयलेट (e-Toilet)**:

• **स्वयंचलित स्वच्छता**: वापरल्यानंतर ऑटोमॅटिक प्री-फ्लश, फ्लोअर आणि भिंतींची प्रेशरने स्वच्छता.
• **कंट्रोल प्रवेश**: पुश बटन, नाणी/टोकन किंवा आरएफआयडी स्मार्ट कार्डद्वारे प्रवेश.
• **स्मार्ट आयओटी**: सेन्सर्स, एसएमएस अलर्ट्स आणि पॉवर बॅकअप सुविधा.
• **मॉडेल्स**: सिंगल युनिट, ट्विन ब्लॉक्स, कम्युनिटी युरिनल्स आणि महिलांसाठी सॅनिटरी नॅपकिन व्हेंडिंग व इन्सिनरेटरसह युनिट्स.

📍 देशभरातील स्मार्ट सिटीज, महामार्ग, पर्यटन स्थळे व उद्यानांमध्ये यशस्वीरीत्या स्थापित.`
  },
  {
    id: "biodigester",
    weight: 15,
    patterns: [
      /\b(bio[\s-]*digesters?|sewage|septic|blackwater|drdo)\b/i,
      /बायो[\s-]*डायजेस्टर|डायजेस्टर|सांडपाणी|सेप्टिक/i
    ],
    responseEn: `🧪 **Bio-Digester Sewage Treatment System**:

• **DRDO-Approved Technology**: On-site anaerobic digestion converting human waste into pathogen-free clear water and bio-gas.
• **Zero Maintenance**: 100% maintenance-free with no recurring septic tank emptying or sludge clearance.
• **Eco-Friendly**: Odorless effluent suitable for gardening and groundwater recharge.`,
    responseMr: `🧪 **बायो-डायजेस्टर सांडपाणी प्रक्रिया प्रणाली (DRDO तंत्रज्ञान)**:

• **डीआरडीओ तंत्रज्ञान**: मानवी विष्ठेचे आणि सांडपाण्याचे सूक्ष्मजीवांद्वारे गंधहीन स्वच्छ पाण्यात रूपांतर.
• **झिरो मेंटेनन्स**: सेप्टिक टँक साफ करण्याची कोणतीही गरज नाही (100% Maintenance-Free).
• **पर्यावरणपूरक**: बाहेर पडणारे पाणी शेती व बागेसाठी पुनर्वापर करता येते.`
  },
  {
    id: "composter",
    weight: 15,
    patterns: [
      /\b(compost(er|ing)?s?|owc|organic\s*waste|food\s*waste|wet\s*waste)\b/i,
      /कंपोस्टर|कचरा|खत|सेंद्रिय\s*खत|ओला\s*कचरा/i
    ],
    responseEn: `♻️ **Organic Waste Composter (OWC)**:

• **24-Hour Conversion**: Fully automated machine converting food & organic waste into rich organic compost within 24 hours.
• **Capacities**: 25 kg/day up to 2000+ kg/day.
• **Features**: Odorless processing, stainless steel mixing chamber, energy-efficient heating, and low maintenance.
• **Applications**: Housing societies, hotels, IT parks, canteens, and municipal corporations.`,
    responseMr: `♻️ **ऑर्गॅनिक वेस्ट कंपोस्टर (OWC)**:

• **२४ तासांत खतनिर्मिती**: ओल्या कचऱ्याचे आणि अन्नाचे २४ तासांत उत्तम सेंद्रिय खतात रूपांतर करणारी स्वयंचलित मशिन.
• **क्षमता**: दररोज २५ किलो ते २०००+ किलोपर्यंत उपलब्ध.
• **वैशिष्ट्ये**: गंधहीन प्रक्रिया, स्टेनलेस स्टील बॉडी, कमी वीज वापर आणि कमी मेंटेनन्स.
• **उपयोग**: सोसायट्या, हॉटेल्स, कंपन्या, कँटीन आणि नगरपालिकांसाठी अत्यंत उपयुक्त.`
  },
  {
    id: "rvm",
    weight: 15,
    patterns: [
      /\b(rvm|reverse\s*vending|(pet\s*)?bottles?\s*(crusher|shredder)?|plastic\s*recycling|tin\s*cans?)\b/i,
      /बॉटल\s*श्रेडर|प्लॅस्टिक\s*श्रेडर|क्रशर/i
    ],
    responseEn: `🥤 **PET Bottle Shredder / Reverse Vending Machine (RVM)**:

• **High-Speed Crushing**: Instantly crushes plastic bottles and cans, reducing volume by 85%.
• **Incentive System**: Dispenses discount coupons, cashback vouchers, or reward points to encourage recycling.
• **Capacity**: High-capacity internal storage bins with automated bin-full sensors and digital touchscreen.`,
    responseMr: `🥤 **पीईटी बॉटल श्रेडर / रिव्हर्स व्हेंडिंग मशिन (RVM)**:

• **हाय-स्पीड क्रशिंग**: रिकाम्या प्लॅस्टिक बाटल्या आणि कॅन्स चुरा करून त्यांचा आकार ८५% कमी करते.
• **इन्सेंटिव्ह सिस्टीम**: बाटली टाकल्यावर युझरला डिस्काउंट कुपन्स, कॅशबॅक किंवा रिवॉर्ड्स मिळतात.
• **क्षमता**: डिजिटल टचस्क्रीन आणि स्वयंचलित बिन-फुल सेन्सर्ससह मोठी स्टोरेज क्षमता.`
  },
  {
    id: "incinerator",
    weight: 15,
    patterns: [
      /\b(incinerators?|sanitary\s*(pad|napkin)\s*incinerator|pad\s*disposal)\b/i,
      /इन्सिनरेटर|नॅपकिन\s*इन्सिनरेटर|पॅड\s*डिसपोजल/i
    ],
    responseEn: `🔥 **Sanitary Pad Incinerator**:

• **Smokeless & Safe**: High-temperature electric incineration that burns sanitary waste into sterile ash.
• **Automatic Cut-off**: Built-in timer and ceramic insulation for safety.
• **Ideal For**: Schools, colleges, corporate offices, hospitals, and public restrooms.`,
    responseMr: `🔥 **सॅनिटरी नॅपकिन इन्सिनरेटर**:

• **धूरमुक्त आणि सुरक्षित**: वापरलेले सॅनिटरी पॅड्स सुरक्षितपणे उच्च तापमानात जाळून त्यांची निर्जंतुक राख करणारी इलेक्ट्रिक मशिन.
• **ऑटोमॅटिक कट-ऑफ**: सुरक्षिततेसाठी इनबिल्ट टाइमर आणि सिरॅमिक इन्सुलेशन.
• **उपयोग**: शाळा, महाविद्यालये, हॉस्पिटल्स, ऑफिसेस आणि महिलांच्या शौचालयांसाठी आवश्यक.`
  },
  {
    id: "vending",
    weight: 15,
    patterns: [
      /\b(vending(\s*machines?)?|sanitary\s*(napkin|pad)\s*vending|food\s*vending|snack\s*vending)\b/i,
      /व्हेंडिंग|व्हेंडिंग\s*मशिन/i
    ],
    responseEn: `🍫 **Automated Vending Machines**:

1. **Sanitary Napkin Vending Machine**: 24/7 automated pad dispenser (25-100 pads) with coin, token, and dynamic UPI QR payments.
2. **Food & Beverage Vending Machine**: Spiral multi-tray refrigerated vending machine for packaged snacks, cold drinks, and refreshments with dual-temperature zones.`,
    responseMr: `🍫 **स्वयंचलित व्हेंडिंग मशिन्स (Automated Vending Machines)**:

1. **सॅनिटरी नॅपकिन व्हेंडिंग मशिन**: नाणे, टोकन किंवा यूपीआय क्युआर कोडद्वारे २४/७ नॅपकिन देणारी मशिन (२५ ते १०० पॅड्स क्षमता).
2. **फूड आणि बेव्हरेज व्हेंडिंग मशिन**: स्नॅक्स, शीतपेये आणि पॅकेज्ड फूडसाठी मल्टि-ट्रे रेफ्रिजरेटेड व्हेंडिंग मशिन.`
  },
  {
    id: "clients",
    weight: 15,
    patterns: [
      /\b(clients?|customers?|who\s+uses|partners?|government\s*projects?|smart\s*cit(y|ies)|municipal(\s*corporations?)?|railways?|defense)\b/i,
      /ग्राहक|क्लायंट्स|कोणी\s*वापरतात|भागीदार|स्मार्ट\s*सिटी|महापालिका/i
    ],
    responseEn: `🤝 **Our Valued Clients & Government Partners**:

Aarya Innovtech is trusted by major public and private organizations across India:
• **Smart City Projects**: Pune, Ranchi, Thane, Nashik, Kalyan-Dombivli.
• **Municipal Corporations & Urban Local Bodies** across Maharashtra, Jharkhand, Gujarat.
• **Institutions**: DRDO, Indian Railways, Highway Authorities, IT Parks, Universities.`,
    responseMr: `🤝 **आमचे प्रमुख ग्राहक आणि शासकीय प्रकल्प**:

आर्या इनोव्हटेकवर देशभरातील अग्रगण्य शासकीय व खासगी संस्थांचा विश्वास आहे:
• **स्मार्ट सिटी प्रकल्प**: पुणे, रांची, ठाणे, नाशिक, कल्याण-डोंबिवली.
• **महानगरपालिका व नगरपालिका**: महाराष्ट्र, झारखंड, गुजरात इत्यादी.
• **संस्था**: डीआरडीओ (DRDO), भारतीय रेल्वे, हायवे ऑथॉरिटी, आयटी पार्क्स व शैक्षणिक संस्था.`
  },
  {
    id: "achievements",
    weight: 15,
    patterns: [
      /\b(achievements?|awards?|certificat(es?|ions?)|iso|ce(\s*mark)?|mpcb|recognitions?|patents?)\b/i,
      /पुरस्कार|प्रमाणपत्र|अचिव्हमेंट्स|आयएसओ|प्रमाणित/i
    ],
    responseEn: `🏆 **Achievements & Certifications**:

• **ISO 9001:2015**: Certified Quality Management System.
• **CE & MPCB**: Compliance with European safety standards and Pollution Control Board norms.
• **DRDO Technology Transfer**: Approved manufacturer for Bio-Digester systems.
• **National Recognitions**: Recognized by Ministry of Housing and Urban Affairs (MoHUA) & Smart City initiatives.`,
    responseMr: `🏆 **यश व प्रमाणपत्रे (Achievements & Certifications)**:

• **ISO 9001:2015**: आंतरराष्ट्रीय दर्जाचे गुणवत्ता व्यवस्थापन प्रमाणपत्र.
• **CE व MPCB मान्यता**: युरोपियन मानके आणि प्रदूषण नियंत्रण मंडळाची पूर्ण मान्यता.
• **DRDO तंत्रज्ञान**: बायो-डायजेस्टर प्रणालीसाठी डीआरडीओचे मान्यताप्राप्त भागीदार.
• **राष्ट्रीय पुरस्कार**: स्मार्ट सिटी व स्वच्छ भारत अभियानांतर्गत विशेष सन्मान.`
  },
  {
    id: "careers",
    weight: 15,
    patterns: [
      /\b(careers?|jobs?|hiring|vacanc(y|ies)|openings?|work\s+with\s+us|resume|cv|apply)\b/i,
      /नोकरी|करिअर|जॉब|भरती|अर्ज/i
    ],
    responseEn: `💼 **Careers at Aarya Innovtech**:

We are constantly looking for talented engineers and professionals in:
• Embedded Systems & IoT Engineering
• Sheet Metal Fabrication & Mechanical Design
• Production & Assembly
• Sales, Business Development & Technical Support

📧 To apply, please send your resume to **sales@aaryainnovtech.com** or call **+91 88067 96868**.`,
    responseMr: `💼 **आर्या इनोव्हटेक येथे करिअरच्या संधी (Careers)**:

आम्ही नेहमी प्रतिभावान इंजिनिअर्स आणि तंत्रज्ञांच्या शोधात असतो:
• एम्बेडेड सिस्टीम्स व आयओटी (IoT) इंजिनिअरिंग
• मेकॅनिकल डिझाईन व शीट मेटल फॅब्रिकेशन
• उत्पादन व असेंब्ली
• विक्री, बिझनेस डेव्हलपमेंट आणि टेक्निकल सपोर्ट

📧 अर्ज करण्यासाठी आपला रेझ्युमे **sales@aaryainnovtech.com** वर पाठवा किंवा **+91 88067 96868** वर संपर्क साधा.`
  },
  {
    id: "gallery",
    weight: 15,
    patterns: [
      /\b(gallery|photos?|images?|pictures?|videos?|installations?|live\s*sites?)\b/i,
      /गॅलरी|फोटो|चित्रे|व्हिडिओ|इन्स्टॉलेशन/i
    ],
    responseEn: `📸 **Product Gallery & Installations**:

You can view real site photographs and video walkthroughs of our live installations on our website:
• **Interactive Kiosks** deployed at civic centers and colleges.
• **Electronic ECO Toilets** installed along highways and public gardens.
• **Organic Waste Composters** in residential townships.

Visit our **Gallery page** from the main menu or contact us for high-resolution project albums!`,
    responseMr: `📸 **प्रकल्प गॅलरी आणि इन्स्टॉलेशन्स (Gallery)**:

आमच्या उत्पादनांचे प्रत्यक्ष फोटो आणि व्हिडिओ आपण वेबसाइटवरील **Gallery** पेजवर पाहू शकता:
• स्मार्ट सिटी व महाविद्यालयांमधील **इंटरॅक्टिव्ह कियोस्क**.
• महामार्ग व उद्यानांमधील **इलेक्ट्रॉनिक ईको टॉयलेट्स**.
• सोसायट्यांमधील **ऑर्गॅनिक वेस्ट कंपोस्टर्स**.

अधिक फोटो किंवा प्रोजेक्ट अल्बमसाठी आमच्याशी संपर्क साधा!`
  },
  {
    id: "brochures",
    weight: 15,
    patterns: [
      /\b(brochures?|catalog(ue)?|datasheet|pdf|spec\s*sheet|download)\b/i,
      /माहितीपत्रक|ब्रोशर|कॅटलॉग|डाऊनलोड/i
    ],
    responseEn: `📄 **Download Product Brochures & Catalogs**:

Detailed PDF technical brochures and spec sheets are available for:
1. 🚽 Electronic ECO Toilet (e-Toilet)
2. 🧪 DRDO Bio-Digester Sewage System
3. ♻️ Organic Waste Composter (OWC)
4. 🖥️ Interactive Kiosks Series
5. 🥤 PET Bottle Shredder (RVM)
6. 🍫 Automated Vending Machines

📥 You can download them directly from the respective product pages or email **sales@aaryainnovtech.com** to receive the complete catalog.`,
    responseMr: `📄 **उत्पादनांचे ब्रोशर्स आणि कॅटलॉग (Brochures & Catalogs)**:

सर्व उत्पादनांचे सविस्तर टेक्निकल पीडीएफ ब्रोशर्स उपलब्ध आहेत:
१. 🚽 इलेक्ट्रॉनिक ईको टॉयलेट (e-Toilet)
२. 🧪 डीआरडीओ बायो-डायजेस्टर
३. ♻️ ऑर्गॅनिक वेस्ट कंपोस्टर (OWC)
४. 🖥️ सर्व स्मार्ट कियोस्क सिरीज
५. 🥤 पीईटी बॉटल श्रेडर (RVM)
६. 🍫 स्वयंचलित व्हेंडिंग मशिन्स

📥 आपण उत्पादन पेजवरून थेट डाउनलोड करू शकता किंवा **sales@aaryainnovtech.com** वर ईमेल करू शकता.`
  },
  {
    id: "all_products",
    weight: 10,
    patterns: [
      /\b((all\s*)?products?(\s*(list|catalog|range|models?))?|what\s+do\s+you\s+(manufacture|make|sell|offer))\b/i,
      /सर्व\s*उत्पादने|उत्पादने|प्रॉडक्ट्स/i
    ],
    responseEn: `🏭 **Aarya Innovtech - Complete Product Range**:

1. 🚽 **Sanitation**: Electronic ECO Toilets, Bio-Digester Systems, Sanitary Pad Incinerators.
2. ♻️ **Waste Management**: Organic Waste Composters (OWC), PET Bottle Shredders / RVM.
3. 🖥️ **Interactive Kiosks**: Computer Kiosks, Ticket Kiosks, Health Kiosks, Water ATM Kiosks, Printing Kiosks, Food Kiosks.
4. 🍫 **Automated Vending**: Sanitary Napkin Vending Machines, Food & Beverage Vending Machines.

*Ask me about any specific product for detailed specifications!*`,
    responseMr: `🏭 **आर्या इनोव्हटेक - सर्व उत्पादने (All Products)**:

1. 🚽 **स्वच्छता उत्पादने**: इलेक्ट्रॉनिक ईको टॉयलेट्स, बायो-डायजेस्टर, सॅनिटरी पॅड इन्सिनरेटर.
2. ♻️ **कचरा व्यवस्थापन**: ऑर्गॅनिक वेस्ट कंपोस्टर (OWC), पीईटी बॉटल श्रेडर (RVM).
3. 🖥️ **स्मार्ट कियोस्क**: कॉम्प्युटर, तिकीट, हेल्थ, वॉटर एटीएम, प्रिंटिंग आणि फूड कियोस्क.
4. 🍫 **व्हेंडिंग मशिन्स**: सॅनिटरी नॅपकिन व्हेंडिंग, स्नॅक्स व फूड व्हेंडिंग मशिन्स.

*कोणत्याही विशिष्ट उत्पादनाबद्दल सविस्तर माहितीसाठी आम्हाला विचारा!*`
  }
];

const getFallbackResponse = (query) => {
  const q = String(query || "").trim().toLowerCase();
  const isMarathi = isMarathiQuery(q);

  let bestTopic = null;
  let highestScore = 0;

  for (const topic of FALLBACK_TOPICS) {
    let matchCount = 0;
    for (const pattern of topic.patterns) {
      if (pattern.test(q)) {
        matchCount++;
      }
    }
    if (matchCount > 0) {
      const score = matchCount * topic.weight;
      if (score > highestScore) {
        highestScore = score;
        bestTopic = topic;
      }
    }
  }

  if (bestTopic) {
    return isMarathi ? bestTopic.responseMr : bestTopic.responseEn;
  }

  if (isMarathi) {
    return `माफ करा, मी फक्त **आर्या इनोव्हटेक (AARYA INNOVTECH)** आणि आमच्या उत्पादनांविषयीच (उदा. कियोस्क, ईको टॉयलेट, कंपोस्टर, बायो-डायजेस्टर, व्हेंडिंग मशिन्स, संपर्क इत्यादी) माहिती देऊ शकतो. 🙏

आपल्याला कंपनी किंवा आमच्या उत्पादनांविषयी काही विचारायचे असल्यास कृपया नक्की सांगा!`;
  }

  return `Sorry, I can only provide information regarding **Aarya Innovtech Pvt. Ltd.** and our products/services.

If you would like to know anything about our solutions (such as **Interactive Kiosks**, **Electronic ECO Toilets**, **Waste Composters**, **Bio-Digesters**, **Vending Machines**, or **Contact Details**), please feel free to ask!`;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hello 👋\nWelcome to AARYA INNOVTECH.\n\nI'm here to help you with:\n\n• Products & Kiosks\n• Pricing & Quotations\n• Technical Information\n• Product Selection\n• Company Details\n• Business Enquiries\n\nHow may I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // To keep track of the chat history for the API
  const [chatSession, setChatSession] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('chatbot-open');
    } else {
      document.body.classList.remove('chatbot-open');
    }
    return () => {
      document.body.classList.remove('chatbot-open');
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !chatSession) {
      try {
        const session = ai.chats.create({
            model: 'gemini-3.6-flash',
            config: {
                systemInstruction: SYSTEM_PROMPT,
            }
        });
        setChatSession(session);
      } catch (err) {
        console.error("Failed to initialize chat session", err);
      }
    }
  }, [isOpen, chatSession]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleReset = () => {
    try {
      const session = ai.chats.create({
        model: 'gemini-3.6-flash',
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });
      setChatSession(session);
    } catch (err) {
      console.error("Failed to reset session", err);
    }
    setMessages([
      {
        role: 'model',
        text: "Hello 👋\nWelcome to AARYA INNOVTECH.\n\nI'm here to help you with:\n\n• Products & Kiosks\n• Pricing & Quotations\n• Technical Information\n• Product Selection\n• Company Details\n• Business Enquiries\n\nHow may I assist you today?"
      }
    ]);
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = text.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    // Fast instant response from optimized knowledge base (<200ms)
    setTimeout(() => {
      const responseText = getFallbackResponse(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      setIsLoading(false);
    }, 200);
  };

  return (
    <>
      <button 
        className="chatbot-fab"
        onClick={() => setIsOpen(true)}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <Bot size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="chatbot-window"
          >
            <div className="chatbot-header">
              <div className="chatbot-header-title">
                <Bot size={20} />
                <div>
                  <h3>AARYA AI</h3>
                  <span>AARYA INNOVTECH PVT. LTD.</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button 
                  className="chatbot-reset" 
                  onClick={handleReset} 
                  title="Start fresh conversation"
                  type="button"
                  style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', opacity: 0.85 }}
                >
                  <RotateCcw size={16} />
                </button>
                <button className="chatbot-close" onClick={() => setIsOpen(false)} title="Close chat">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chatbot-message ${msg.role}`}>
                  <div className="message-icon">
                    {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className="message-bubble">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              
              <div className="chatbot-suggestions">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button 
                    key={idx} 
                    className="suggestion-chip"
                    onClick={() => handleSend(q.query || q.label || q)}
                    disabled={isLoading}
                    type="button"
                  >
                    {q.label || q}
                  </button>
                ))}
              </div>

              {isLoading && (
                <div className="chatbot-message model">
                  <div className="message-icon"><Bot size={16} /></div>
                  <div className="message-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input">
              <input 
                type="text" 
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              />
              <button onClick={() => handleSend(input)} disabled={!input.trim() || isLoading}>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
