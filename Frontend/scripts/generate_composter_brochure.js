import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const brochuresDir = path.resolve(publicDir, 'brochures');
const composterImgPath = path.resolve(publicDir, 'imagesss/waste compo.jpeg');

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
  badgeBg: '#dcfce7',       // Green tint
  badgeText: '#15803d',     // Green 700
};

// Company Info
const COMPANY = {
  name: 'AARYA INNOVTECH PVT. LTD.',
  brand: 'SMART BUDDY',
  division: 'Solid Waste Management & Eco-Automation OEM',
  certifications: 'ISO 9001:2015 | ISO 14001:2015 | ISO 45001:2018 | CE Certified',
  phone: '+91 88067 96868 / +91 99238 10197',
  email: 'sales@aaryainnovtech.com',
  website: 'www.aaryainnovtech.com',
  regdOffice: '4A, Sayali Darshan A, Radha Nagar, Makhamalabad Rd, Panchavati, Nashik - 422003',
  factory: 'S-27, Near Emerson, Ambad MIDC, Nashik, Maharashtra - 422010',
};

function drawPageHeader(doc, pageNum, totalPages) {
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
     .fillColor('#86efac')
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

function drawPageFooter(doc, pageNum, totalPages) {
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

async function generateComposterBrochure() {
  const outputPath = path.resolve(brochuresDir, 'smart-buddy-organic-waste-composter.pdf');
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
  // PAGE 1: HERO, MACHINE IMAGE, OVERVIEW & ACCEPTED WASTE
  // ==========================================
  drawPageHeader(doc, 1, 2);

  // Title Block
  const titleBoxY = 100;
  doc.rect(margin, titleBoxY, contentWidth, 42).fill(COLORS.bgLight);
  doc.rect(margin, titleBoxY, 4, 42).fill(COLORS.primary);

  // Category Pill
  doc.rect(margin + 12, titleBoxY + 5, 265, 11).fill(COLORS.badgeBg);
  doc.font('Helvetica-Bold')
     .fontSize(6.5)
     .fillColor(COLORS.badgeText)
     .text('SOLID WASTE MANAGEMENT & CIRCULAR RECYCLING OEM', margin + 16, titleBoxY + 7);

  // Title
  doc.font('Helvetica-Bold')
     .fontSize(13.5)
     .fillColor(COLORS.primary)
     .text('SMART BUDDY ORGANIC WASTE COMPOSTER (OWC)', margin + 12, titleBoxY + 18);

  // Subtitle
  doc.font('Helvetica-Oblique')
     .fontSize(7.5)
     .fillColor(COLORS.textMuted)
     .text('Fully Automated In-Vessel Rapid Aerobic Composting Machine (Converts Waste in 24 Hours)', margin + 12, titleBoxY + 32);

  // Model badge
  doc.rect(margin + contentWidth - 145, titleBoxY + 14, 135, 16).fill('#ecfdf5');
  doc.rect(margin + contentWidth - 145, titleBoxY + 14, 135, 16).lineWidth(0.5).stroke('#a7f3d0');
  doc.font('Helvetica-Bold')
     .fontSize(7.5)
     .fillColor('#065f46')
     .text('SB-OWC Series (25 - 2000 kg/day)', margin + contentWidth - 140, titleBoxY + 18, { width: 125, align: 'center' });

  // 2-Column Hero Area (Image Left, Overview Right)
  const heroY = 148;
  const colWidth = (contentWidth - 14) / 2;

  // Left Column: User Provided Real Machine Photo
  const imgBoxWidth = colWidth;
  const imgBoxHeight = 224;
  doc.rect(margin, heroY, imgBoxWidth, imgBoxHeight).fill('#ffffff');
  doc.rect(margin, heroY, imgBoxWidth, imgBoxHeight).lineWidth(0.8).stroke(COLORS.border);

  if (fs.existsSync(composterImgPath)) {
    try {
      doc.image(composterImgPath, margin + 6, heroY + 6, {
        fit: [imgBoxWidth - 12, imgBoxHeight - 28],
        align: 'center',
        valign: 'center'
      });
    } catch (err) {
      console.warn("Could not embed composter image:", err.message);
    }
  }

  doc.rect(margin, heroY + imgBoxHeight - 18, imgBoxWidth, 18).fill(COLORS.primary);
  doc.font('Helvetica-Bold')
     .fontSize(7)
     .fillColor(COLORS.textLight)
     .text('Smart Buddy SB-OWC-300 Heavy Duty SS 304 Composting Machine', margin + 4, heroY + imgBoxHeight - 13, { width: imgBoxWidth - 8, align: 'center' });

  // Right Column: Overview & Highlights
  const rightColX = margin + colWidth + 14;
  doc.font('Helvetica-Bold')
     .fontSize(9.5)
     .fillColor(COLORS.primary)
     .text('Product & Technology Overview', rightColX, heroY);

  doc.rect(rightColX, heroY + 13, colWidth, 1).fill(COLORS.accent);

  doc.font('Helvetica')
     .fontSize(7.3)
     .fillColor(COLORS.textDark)
     .text(
       'The Smart Buddy Organic Waste Composter (OWC) is an advanced, fully automatic in-vessel aerobic composting system designed to treat biodegradable food and municipal waste on-site. Using special thermophilic microbial culture, precision heating, and continuous mechanical churning, it breaks down organic matter and yields rich, dry compost in just 18 to 24 hours with an 85-90% volume reduction.',
       rightColX, heroY + 18, { width: colWidth, align: 'justify', lineGap: 1.5 }
     );

  const compHighlights = [
    'Converts biodegradable organic waste into compost in 18-24 hours.',
    'Heavy-duty Stainless Steel 304 (SS 304) internal chamber and exterior.',
    'Reduces waste volume by 85% - 90%, minimizing landfill disposal costs.',
    'Built-in heating management (50-65°C) destroying pathogens and weed seeds.',
    '100% Odorless operation with integrated bio-filter and air circulation.',
    'PLC / Touchscreen based fully automatic cycle with safety interlocks.'
  ];

  let currHighY = heroY + 88;
  doc.font('Helvetica-Bold')
     .fontSize(8.5)
     .fillColor(COLORS.primary)
     .text('Key Operational Highlights', rightColX, currHighY);
  doc.rect(rightColX, currHighY + 11, colWidth, 1).fill(COLORS.accent);
  currHighY += 16;

  compHighlights.forEach((h) => {
    doc.rect(rightColX, currHighY + 1, 7, 7).fill(COLORS.primary);
    doc.font('Helvetica-Bold')
       .fontSize(5.5)
       .fillColor(COLORS.textLight)
       .text('✓', rightColX + 1.2, currHighY + 1.8);

    doc.font('Helvetica')
       .fontSize(6.9)
       .fillColor(COLORS.textDark)
       .text(h, rightColX + 11, currHighY, { width: colWidth - 12, lineGap: 0.8 });

    currHighY += 17;
  });

  // Middle Section: Accepted Waste Materials Grid
  const wasteSectionY = 380;
  doc.font('Helvetica-Bold')
     .fontSize(10)
     .fillColor(COLORS.primary)
     .text('Accepted Waste Materials & Compost Output', margin, wasteSectionY);
  doc.rect(margin, wasteSectionY + 13, contentWidth, 1).fill(COLORS.accent);

  const wasteBoxY = wasteSectionY + 18;
  const wasteBoxH = 64;
  doc.rect(margin, wasteBoxY, contentWidth, wasteBoxH).fill('#ffffff');
  doc.rect(margin, wasteBoxY, contentWidth, wasteBoxH).lineWidth(0.8).stroke(COLORS.border);

  const acceptedItems = [
    '• Fruits & Vegetables Scrap',
    '• Cooked & Leftover Food',
    '• Tea Leaves & Coffee Grounds',
    '• Dry Garden Leaves & Flowers',
    '• Eggshells & Meat Scraps',
    '• Shredded Cardboard & Paper',
    '• Agricultural & Plant Biomass',
    '• Bakery & Kitchen Waste'
  ];

  const wasteColW = contentWidth / 4;
  acceptedItems.forEach((item, i) => {
    const colI = i % 4;
    const rowI = Math.floor(i / 4);
    const itmX = margin + 8 + colI * wasteColW;
    const itmY = wasteBoxY + 8 + rowI * 24;

    doc.font('Helvetica-Bold')
       .fontSize(7)
       .fillColor(COLORS.primary)
       .text(item, itmX, itmY, { width: wasteColW - 12 });
    doc.font('Helvetica')
       .fontSize(5.8)
       .fillColor(COLORS.textMuted)
       .text('Biodegradable organic feed', itmX + 6, itmY + 10);
  });

  // 4 Core Value Cards
  const cardsY = 470;
  doc.font('Helvetica-Bold')
     .fontSize(10)
     .fillColor(COLORS.primary)
     .text('Core Value Proposition & Environmental Benefits', margin, cardsY);
  doc.rect(margin, cardsY + 13, contentWidth, 1).fill(COLORS.accent);

  const cardWidth = (contentWidth - 12) / 2;
  const cardH = 68;
  const valCards = [
    { title: '85-90% Volume Reduction', text: 'Drastically reduces the weight and volume of garbage transported to municipal dump yards.' },
    { title: 'Fast 24-Hour Cycle Time', text: 'Converts daily collected organic kitchen waste into ready-to-use bio-manure within 18 to 24 hours.' },
    { title: 'Odourless & Clean Process', text: 'Aerobic composting and thermophilic microbes operate without unpleasant smells, flies, or pests.' },
    { title: 'Nutrient-Rich Bio-Fertilizer', text: 'Produces high-grade organic compost rich in N-P-K nutrients, perfect for organic farming and landscaping.' }
  ];

  valCards.forEach((c, idx) => {
    const isRight = idx % 2 === 1;
    const isBottom = idx >= 2;
    const cX = isRight ? margin + cardWidth + 12 : margin;
    const cY = isBottom ? cardsY + 18 + cardH + 6 : cardsY + 18;

    doc.rect(cX, cY, cardWidth, cardH).fill('#ffffff');
    doc.rect(cX, cY, cardWidth, cardH).lineWidth(0.8).stroke(COLORS.borderLight);
    doc.rect(cX, cY, 3.5, cardH).fill(COLORS.primary);

    doc.font('Helvetica-Bold')
       .fontSize(8)
       .fillColor(COLORS.primary)
       .text(`${idx + 1}. ${c.title}`, cX + 10, cY + 7, { width: cardWidth - 16 });

    doc.font('Helvetica')
       .fontSize(6.8)
       .fillColor(COLORS.textMuted)
       .text(c.text, cX + 10, cY + 21, { width: cardWidth - 16, lineGap: 1.2 });
  });

  // Page 1 Trust Strip
  const p1TrustY = 636;
  doc.rect(margin, p1TrustY, contentWidth, 42).fill('#f0fdf4');
  doc.rect(margin, p1TrustY, contentWidth, 42).lineWidth(0.8).stroke('#bbf7d0');

  doc.font('Helvetica-Bold')
     .fontSize(7.5)
     .fillColor('#166534')
     .text('Approved Waste Management Technology for SWM Rules 2016 & Swachh Bharat Mission', margin + 10, p1TrustY + 5);

  doc.font('Helvetica')
     .fontSize(6.5)
     .fillColor('#14532d')
     .text('• Direct OEM Fabrication in Nashik, Maharashtra   • Over 300+ Installations across Municipalities, Townships & Hotels\n• Complies with Solid Waste Management (SWM) Rules 2016 for Bulk Waste Generators\n• Complete Life-Cycle AMC, Microbial Culture Supply, and Operator Training Support', margin + 10, p1TrustY + 16, { lineGap: 1.2 });

  drawPageFooter(doc, 1, 2);

  // ==========================================
  // PAGE 2: SPECIFICATIONS, MODEL SIZING TABLE & APPLICATIONS
  // ==========================================
  doc.addPage();
  drawPageHeader(doc, 2, 2);

  // Title
  const p2TitleY = 100;
  doc.rect(margin, p2TitleY, contentWidth, 24).fill(COLORS.primary);
  doc.font('Helvetica-Bold')
     .fontSize(10)
     .fillColor(COLORS.textLight)
     .text('DETAILED TECHNICAL SPECIFICATIONS: SMART BUDDY SB-OWC SERIES', margin + 10, p2TitleY + 7);

  // Specs Table
  const tableTopY = 130;
  const col1W = 145;
  const col2W = contentWidth - col1W;
  const rowH = 16.5;

  const compSpecs = [
    { label: 'Technology', value: 'Aerobic Thermophilic Microbial In-Vessel Rapid Composting' },
    { label: 'Body Material', value: 'High-Grade Stainless Steel 304 (Chamber & Outer Cover) / Optional Epoxy Coated MS' },
    { label: 'Processing Time', value: '18 to 24 Hours per batch (Continuous daily batch processing)' },
    { label: 'Volume Reduction', value: '85% to 90% organic waste volume reduction' },
    { label: 'Operating Temperature', value: '50°C to 65°C (Eliminates harmful pathogens, bacteria & weed seeds)' },
    { label: 'Mixing Mechanism', value: 'Heavy Duty Bi-Directional Ribbon Churner with High-Torque Geared Motor' },
    { label: 'Shredding System', value: 'In-built high-speed crusher/shredder blade for fast waste size reduction' },
    { label: 'Control Automation', value: 'Fully Automatic PLC Controller with Digital Touchscreen / Indicator Lamps' },
    { label: 'Safety Protections', value: 'Top Lid Safety Interlock (Auto Stop on open), Emergency Stop, Overload Trip' },
    { label: 'Heating Elements', value: 'Ceramic / Silicon Heating Pads with Intelligent Thermal PID Controllers' },
    { label: 'Odor Control', value: 'Bio-Filter / Activated Carbon Exhaust Filter with Forced Air Blower' },
    { label: 'Output Quality', value: 'Homogeneous, dry, dark brown nutrient-rich organic compost / soil conditioner' }
  ];

  doc.rect(margin, tableTopY, contentWidth, 18).fill('#0f172a');
  doc.font('Helvetica-Bold')
     .fontSize(7.5)
     .fillColor(COLORS.textLight)
     .text('TECHNICAL PARAMETER', margin + 8, tableTopY + 5);
  doc.text('ENGINEERING SPECIFICATION / STANDARD DETAILS', margin + col1W + 8, tableTopY + 5);

  let curY = tableTopY + 18;
  compSpecs.forEach((spec, idx) => {
    const isAlt = idx % 2 === 1;
    doc.rect(margin, curY, contentWidth, rowH).fill(isAlt ? COLORS.tableRowAlt : '#ffffff');
    doc.rect(margin, curY, contentWidth, rowH).lineWidth(0.5).stroke(COLORS.borderLight);

    doc.font('Helvetica-Bold')
       .fontSize(7)
       .fillColor(COLORS.primary)
       .text(spec.label, margin + 8, curY + 4, { width: col1W - 12 });

    doc.font('Helvetica')
       .fontSize(6.8)
       .fillColor(COLORS.textDark)
       .text(spec.value, margin + col1W + 8, curY + 4, { width: col2W - 14 });

    curY += rowH;
  });

  // Standard Capacity Sizing Guide Table
  const sizingY = curY + 8;
  doc.font('Helvetica-Bold')
     .fontSize(9.5)
     .fillColor(COLORS.primary)
     .text('Standard Model Range & Sizing Guide (25 kg/day to 2000 kg/day)', margin, sizingY);
  doc.rect(margin, sizingY + 12, contentWidth, 1).fill(COLORS.accent);

  const sizeTableTopY = sizingY + 17;
  const sizeColW = contentWidth / 5;
  const sizeRowH = 14;

  const sizeHeaders = ['Model Code', 'Capacity (kg/Day)', 'Power Rating', 'Dimensions (LxWxH)', 'Ideal Application'];
  const sizeRows = [
    ['SB-OWC-25', '25 kg/day', '1.5 kW / 230V', '900 x 600 x 850 mm', 'Small Cafes, Clinics, Villas'],
    ['SB-OWC-50', '50 kg/day', '2.2 kW / 230V', '1200 x 750 x 950 mm', 'Restaurants, Small Hostels'],
    ['SB-OWC-100', '100 kg/day', '3.0 kW / 415V', '1500 x 850 x 1100 mm', 'Societies (50-100 flats), Hotels'],
    ['SB-OWC-300', '300 kg/day', '5.5 kW / 415V', '1950 x 950 x 1250 mm', 'Large Societies, Tech Parks'],
    ['SB-OWC-500', '500 kg/day', '7.5 kW / 415V', '2300 x 1100 x 1400 mm', 'Colleges, Marriage Halls, Malls'],
    ['SB-OWC-1000', '1000 kg/day', '12.0 kW / 415V', '3000 x 1400 x 1650 mm', 'Townships, Vegetable Markets'],
    ['SB-OWC-2000', '2000 kg/day', '18.5 kW / 415V', 'Custom Modular Plant', 'Municipal SWM Processing Plants']
  ];

  doc.rect(margin, sizeTableTopY, contentWidth, sizeRowH).fill(COLORS.primary);
  sizeHeaders.forEach((h, i) => {
    doc.font('Helvetica-Bold')
       .fontSize(6.5)
       .fillColor(COLORS.textLight)
       .text(h, margin + i * sizeColW + 4, sizeTableTopY + 3.5, { width: sizeColW - 8 });
  });

  let curSizeY = sizeTableTopY + sizeRowH;
  sizeRows.forEach((row, rIdx) => {
    const isAlt = rIdx % 2 === 1;
    doc.rect(margin, curSizeY, contentWidth, sizeRowH).fill(isAlt ? COLORS.tableRowAlt : '#ffffff');
    doc.rect(margin, curSizeY, contentWidth, sizeRowH).lineWidth(0.5).stroke(COLORS.borderLight);

    row.forEach((cell, cIdx) => {
      doc.font(cIdx === 0 ? 'Helvetica-Bold' : 'Helvetica')
         .fontSize(6.2)
         .fillColor(cIdx === 0 ? COLORS.primary : COLORS.textDark)
         .text(cell, margin + cIdx * sizeColW + 4, curSizeY + 3.5, { width: sizeColW - 8 });
    });
    curSizeY += sizeRowH;
  });

  // Applications Grid
  const appY = curSizeY + 8;
  doc.font('Helvetica-Bold')
     .fontSize(9)
     .fillColor(COLORS.primary)
     .text('Recommended Installation Sectors & Bulk Waste Generators', margin, appY);
  doc.rect(margin, appY + 11, contentWidth, 1).fill(COLORS.accent);

  const appGridY = appY + 16;
  doc.rect(margin, appGridY, contentWidth, 48).fill(COLORS.bgLight);
  doc.rect(margin, appGridY, contentWidth, 48).lineWidth(0.8).stroke(COLORS.border);

  const compApps = [
    'Residential Societies & Townships',
    'Hotels, Resorts & Restaurants',
    'IT Parks & Corporate Cafeterias',
    'Vegetable & Fruit Mandis',
    'Universities, Colleges & Schools',
    'Marriage Halls & Banquet Venues',
    'Hospitals & Medical Campuses',
    'Municipal Decentralized Plants'
  ];

  const appCellW = (contentWidth - 16) / 4;
  compApps.forEach((app, idx) => {
    const colI = idx % 4;
    const rowI = Math.floor(idx / 4);
    const aX = margin + 8 + colI * appCellW;
    const aY = appGridY + 6 + rowI * 20;

    doc.circle(aX + 3, aY + 4, 2).fill(COLORS.primary);
    doc.font('Helvetica-Bold')
       .fontSize(6.6)
       .fillColor(COLORS.textDark)
       .text(app, aX + 9, aY + 1, { width: appCellW - 12 });
  });

  // Order & Inquiry Box
  const inqY = appGridY + 54;
  const inqH = 770 - inqY;

  doc.rect(margin, inqY, contentWidth, inqH).fill('#f8fafc');
  doc.rect(margin, inqY, contentWidth, inqH).lineWidth(1).stroke(COLORS.primary);

  doc.rect(margin, inqY, contentWidth, 16).fill(COLORS.primary);
  doc.font('Helvetica-Bold')
     .fontSize(8)
     .fillColor(COLORS.textLight)
     .text('HOW TO ENQUIRE & ORDER SMART BUDDY COMPOSTING MACHINES', margin + 10, inqY + 4);

  const inqColW = (contentWidth - 20) / 2;
  doc.font('Helvetica')
     .fontSize(6.8)
     .fillColor(COLORS.textDark)
     .text('Share your daily organic kitchen waste quantity (kg/day), available site electrical load (Single Phase / 3-Phase), and installation footprint. Our engineering team prepares turnkey layout drawings, ROI calculations, and complete techno-commercial proposals.', margin + 10, inqY + 22, { width: inqColW, lineGap: 1.2 });

  const inqRX = margin + inqColW + 20;
  doc.font('Helvetica-Bold')
     .fontSize(7.5)
     .fillColor(COLORS.primary)
     .text('DIRECT SALES & SWM ENGINEERING DESK:', inqRX, inqY + 20);

  doc.font('Helvetica')
     .fontSize(7)
     .fillColor(COLORS.textDark)
     .text(`• Direct Hotline: ${COMPANY.phone}\n• Email: ${COMPANY.email}\n• Web: ${COMPANY.website}\n• Plant: S-27, Ambad MIDC, Nashik, MH - 422010`, inqRX, inqY + 32, { lineGap: 2 });

  drawPageFooter(doc, 2, 2);

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.log(`Successfully generated Organic Waste Composter brochure: ${outputPath}`);
      resolve(outputPath);
    });
    stream.on('error', reject);
  });
}

generateComposterBrochure().catch(console.error);
