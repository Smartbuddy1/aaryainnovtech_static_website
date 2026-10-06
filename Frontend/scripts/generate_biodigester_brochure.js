import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const brochuresDir = path.resolve(publicDir, 'brochures');
const assetsDir = path.resolve(publicDir, 'media/brochure_assets');

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
  division: 'Eco-Hygiene, Public Utilities & Bio-Sanitation OEM',
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

async function generateBioDigesterBrochure() {
  const outputPath = path.resolve(brochuresDir, 'smart-buddy-bio-digester.pdf');
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
  // PAGE 1: HERO, 4-CHAMBER WORKING PROCESS & OVERVIEW
  // ==========================================
  drawPageHeader(doc, 1, 2);

  // Title Block
  const titleBoxY = 100;
  doc.rect(margin, titleBoxY, contentWidth, 42).fill(COLORS.bgLight);
  doc.rect(margin, titleBoxY, 4, 42).fill(COLORS.primary);

  // Category Pill
  doc.rect(margin + 12, titleBoxY + 5, 250, 11).fill(COLORS.badgeBg);
  doc.font('Helvetica-Bold')
     .fontSize(6.5)
     .fillColor(COLORS.badgeText)
     .text('ZERO-WASTE ON-SITE BIO-SANITATION TECHNOLOGY', margin + 16, titleBoxY + 7);

  // Title
  doc.font('Helvetica-Bold')
     .fontSize(14)
     .fillColor(COLORS.primary)
     .text('SMART BUDDY BIO-DIGESTER TANK (BDT)', margin + 12, titleBoxY + 18);

  // Subtitle
  doc.font('Helvetica-Oblique')
     .fontSize(7.5)
     .fillColor(COLORS.textMuted)
     .text('Eco-Friendly Anaerobic Waste Treatment System with DRDO Inoculum Technology', margin + 12, titleBoxY + 32);

  // Model badge
  doc.rect(margin + contentWidth - 145, titleBoxY + 14, 135, 16).fill('#ecfdf5');
  doc.rect(margin + contentWidth - 145, titleBoxY + 14, 135, 16).lineWidth(0.5).stroke('#a7f3d0');
  doc.font('Helvetica-Bold')
     .fontSize(7.5)
     .fillColor('#065f46')
     .text('SB-BDT Series (100L - 100kL)', margin + contentWidth - 140, titleBoxY + 18, { width: 125, align: 'center' });

  // Top Section: Image Diagram (User Photo 1) + Overview
  const heroY = 148;
  const colWidth = (contentWidth - 14) / 2;

  // Left Column: User Provided Tank & Diagram Image
  const imgBoxWidth = colWidth;
  const imgBoxHeight = 160;
  doc.rect(margin, heroY, imgBoxWidth, imgBoxHeight).fill('#ffffff');
  doc.rect(margin, heroY, imgBoxWidth, imgBoxHeight).lineWidth(0.8).stroke(COLORS.border);

  const diagramImgPath = path.resolve(assetsDir, 'bio_digester_diagram.png');
  if (fs.existsSync(diagramImgPath)) {
    try {
      doc.image(diagramImgPath, margin + 4, heroY + 6, {
        fit: [imgBoxWidth - 8, imgBoxHeight - 24],
        align: 'center',
        valign: 'center'
      });
    } catch (err) {
      console.warn("Could not embed bio_digester_diagram:", err.message);
    }
  }

  doc.rect(margin, heroY + imgBoxHeight - 16, imgBoxWidth, 16).fill(COLORS.primary);
  doc.font('Helvetica-Bold')
     .fontSize(6.8)
     .fillColor(COLORS.textLight)
     .text('Smart Buddy Bio-Digester Tank & 4-Chamber Digestion Principle', margin + 4, heroY + imgBoxHeight - 11, { width: imgBoxWidth - 8, align: 'center' });

  // Right Column: Overview & Highlights
  const rightColX = margin + colWidth + 14;
  doc.font('Helvetica-Bold')
     .fontSize(9.5)
     .fillColor(COLORS.primary)
     .text('Technology & Process Overview', rightColX, heroY);

  doc.rect(rightColX, heroY + 13, colWidth, 1).fill(COLORS.accent);

  doc.font('Helvetica')
     .fontSize(7.4)
     .fillColor(COLORS.textDark)
     .text(
       'The Smart Buddy Bio-Digester is a zero-waste on-site sanitation treatment system using high-efficiency Anaerobic Microbial Inoculum (AMI bacteria). It completely eliminates the need for expensive sewerage networks, sewage treatment plants (STPs), or periodic septic tank suction cleaning. Waste is converted into odorless water and biogas naturally.',
       rightColX, heroY + 18, { width: colWidth, align: 'justify', lineGap: 1.5 }
     );

  const keyHighlights = [
    'No sewerage network or STP plant dependency.',
    'Zero moving parts — completely maintenance-free operation.',
    '>99% Pathogen destruction & 99% Organic matter elimination.',
    'No de-sludging, vacuum suction, or manual scavenging needed.',
    'Effluent is 100% odorless, clear, and safe for gardening/irrigation.'
  ];

  let currHighY = heroY + 80;
  doc.font('Helvetica-Bold')
     .fontSize(8.5)
     .fillColor(COLORS.primary)
     .text('Key Environmental Highlights', rightColX, currHighY);
  doc.rect(rightColX, currHighY + 11, colWidth, 1).fill(COLORS.accent);
  currHighY += 15;

  keyHighlights.forEach((h) => {
    doc.rect(rightColX, currHighY + 1, 7, 7).fill(COLORS.primary);
    doc.font('Helvetica-Bold')
       .fontSize(5.5)
       .fillColor(COLORS.textLight)
       .text('✓', rightColX + 1.2, currHighY + 1.8);

    doc.font('Helvetica')
       .fontSize(7)
       .fillColor(COLORS.textDark)
       .text(h, rightColX + 11, currHighY, { width: colWidth - 12, lineGap: 0.8 });

    currHighY += 14;
  });

  // Middle Section: Large Detailed 4-Chamber Cross Section (User Photo 2)
  const crossSectionY = 316;
  const crossHeight = 220;

  doc.rect(margin, crossSectionY, contentWidth, crossHeight).fill('#ffffff');
  doc.rect(margin, crossSectionY, contentWidth, crossHeight).lineWidth(0.8).stroke(COLORS.border);

  // Section Header
  doc.rect(margin, crossSectionY, contentWidth, 20).fill(COLORS.primary);
  doc.font('Helvetica-Bold')
     .fontSize(8.5)
     .fillColor(COLORS.textLight)
     .text('DETAILED 4-CHAMBER WORKING MECHANISM & EFFLUENT PURIFICATION PROCESS', margin + 10, crossSectionY + 6);

  const crossImgPath = path.resolve(assetsDir, 'bio_digester_cross_section.png');
  if (fs.existsSync(crossImgPath)) {
    try {
      doc.image(crossImgPath, margin + 8, crossSectionY + 24, {
        fit: [contentWidth - 16, crossHeight - 64],
        align: 'center',
        valign: 'center'
      });
    } catch (err) {
      console.warn("Could not embed bio_digester_cross_section:", err.message);
    }
  }

  // Bottom Explanatory Strip inside Cross-Section Card
  const chamberNoteY = crossSectionY + crossHeight - 38;
  doc.rect(margin, chamberNoteY, contentWidth, 38).fill(COLORS.bgLight);
  doc.rect(margin, chamberNoteY, contentWidth, 1).fill(COLORS.borderLight);

  const chColWidth = contentWidth / 4;
  const chambers = [
    { num: 'Chamber 1', desc: 'Waste Inlet: High-density bacterial colonies initiate breakdown of organic solids.' },
    { num: 'Chamber 2', desc: 'Liquefaction: Anaerobic fermentation converts solids into organic acids.' },
    { num: 'Chamber 3', desc: 'Gas Venting: Methanogenesis releases methane & CO2; minimal sludge remains.' },
    { num: 'Chamber 4', desc: 'Water Outlet: Clear nutrient-rich effluent discharge safe for soil & plants.' }
  ];

  chambers.forEach((ch, idx) => {
    const chX = margin + idx * chColWidth;
    doc.font('Helvetica-Bold')
       .fontSize(7)
       .fillColor(COLORS.primary)
       .text(ch.num, chX + 6, chamberNoteY + 4);

    doc.font('Helvetica')
       .fontSize(6)
       .fillColor(COLORS.textMuted)
       .text(ch.desc, chX + 6, chamberNoteY + 14, { width: chColWidth - 10, lineGap: 0.8 });
  });

  // Bottom 4 Feature Cards
  const cardsY = 544;
  doc.font('Helvetica-Bold')
     .fontSize(10)
     .fillColor(COLORS.primary)
     .text('Why Bio-Digester is Superior to Conventional Septic Tanks', margin, cardsY);
  doc.rect(margin, cardsY + 13, contentWidth, 1).fill(COLORS.accent);

  const cardWidth = (contentWidth - 12) / 2;
  const cardH = 60;
  const advCards = [
    { title: 'Zero Maintenance & No Suction', text: 'Unlike septic tanks that need regular desludging, bio-digesters decompose 99% of solids automatically.' },
    { title: '100% Odorless & Fly-Proof', text: 'Closed anaerobic chamber process prevents foul odors, mosquitoes, flies, and cockroach infestation.' },
    { title: 'Pathogen & Disease Free', text: 'AMI bacteria destroy over 99.9% of harmful pathogens and fecal coliforms, preventing water contamination.' },
    { title: 'Reusable Liquid Effluent', text: 'Treated water contains valuable nitrogen and phosphorus nutrients, ideal for agricultural & garden irrigation.' }
  ];

  advCards.forEach((c, idx) => {
    const isRight = idx % 2 === 1;
    const isBottom = idx >= 2;
    const cX = isRight ? margin + cardWidth + 12 : margin;
    const cY = isBottom ? cardsY + 18 + cardH + 6 : cardsY + 18;

    doc.rect(cX, cY, cardWidth, cardH).fill('#ffffff');
    doc.rect(cX, cY, cardWidth, cardH).lineWidth(0.8).stroke(COLORS.borderLight);
    doc.rect(cX, cY, 3.5, cardH).fill(COLORS.primary);

    doc.font('Helvetica-Bold')
       .fontSize(7.8)
       .fillColor(COLORS.primary)
       .text(`${idx + 1}. ${c.title}`, cX + 10, cY + 6, { width: cardWidth - 16 });

    doc.font('Helvetica')
       .fontSize(6.8)
       .fillColor(COLORS.textMuted)
       .text(c.text, cX + 10, cY + 19, { width: cardWidth - 16, lineGap: 1 });
  });

  // Page 1 Trust Strip
  const p1TrustY = 688;
  doc.rect(margin, p1TrustY, contentWidth, 34).fill('#f0fdf4');
  doc.rect(margin, p1TrustY, contentWidth, 34).lineWidth(0.8).stroke('#bbf7d0');

  doc.font('Helvetica-Bold')
     .fontSize(7.5)
     .fillColor('#166534')
     .text('Approved Green Sanitation Solution for Swachh Bharat Mission & Smart Cities', margin + 10, p1TrustY + 5);

  doc.font('Helvetica')
     .fontSize(6.5)
     .fillColor('#14532d')
     .text('• Approved by DRDO & Ministry of Drinking Water and Sanitation   • Suitable for Extreme Cold & High Altitude\n• Complies with CPCB & NGT Environmental Discharge Norms   • Available in FRP, HDPE & RCC Tank Modules', margin + 10, p1TrustY + 16, { lineGap: 1 });

  drawPageFooter(doc, 1, 2);

  // ==========================================
  // PAGE 2: SPECIFICATIONS, CAPACITY SIZING & APPLICATIONS
  // ==========================================
  doc.addPage();
  drawPageHeader(doc, 2, 2);

  // Title
  const p2TitleY = 100;
  doc.rect(margin, p2TitleY, contentWidth, 24).fill(COLORS.primary);
  doc.font('Helvetica-Bold')
     .fontSize(10)
     .fillColor(COLORS.textLight)
     .text('TECHNICAL SPECIFICATIONS: SMART BUDDY BIO-DIGESTER TANK (BDT)', margin + 10, p2TitleY + 7);

  // Specs Table
  const tableTopY = 130;
  const col1W = 145;
  const col2W = contentWidth - col1W;
  const rowH = 17;

  const bioSpecs = [
    { label: 'Digestion Technology', value: 'Anaerobic Bio-Digestion using Psychrotrophic Inoculum' },
    { label: 'Bacterial Formulation', value: 'Anaerobic Microbial Inoculum (AMI / DRDO Inoculum Bacteria)' },
    { label: 'Tank Construction', value: 'High-Density FRP (Fiber Reinforced Plastic) / Polyethylene / RCC Modular' },
    { label: 'Chamber Configuration', value: 'Multi-Stage 4-Chamber Internal Baffle Wall Segregation' },
    { label: 'Installation Options', value: 'Underground Installation (Zero Footprint) or Above Ground on RCC Pad' },
    { label: 'Pathogen Destruction', value: '> 99.9% (Inactivates Typhoid, Cholera, Dysentery & Diarrhea pathogens)' },
    { label: 'Organic Matter Reduction', value: '99% Total Suspended Solids (TSS) and Organic Sludge Breakdown' },
    { label: 'Treated Water Output', value: 'Clear, Odorless, Safe Non-Toxic Liquid Effluent (Rich in N-P-K plant nutrients)' },
    { label: 'Biogas Output', value: 'Methane (CH4) & Carbon Dioxide (CO2) vented safely or tapped for heating' },
    { label: 'Cleaning Requirement', value: 'Zero De-Sludging / No Manual Scavenging or Vacuum Suction required' },
    { label: 'Operating Temperature', value: 'Sub-Zero -20°C up to +55°C (Effective in Glaciers, High-Altitude & Deserts)' },
    { label: 'Toilet Cleaner Safety', value: 'Commercially available organic and mild toilet cleaners are fully compatible' }
  ];

  doc.rect(margin, tableTopY, contentWidth, 18).fill('#0f172a');
  doc.font('Helvetica-Bold')
     .fontSize(7.5)
     .fillColor(COLORS.textLight)
     .text('TECHNICAL PARAMETER', margin + 8, tableTopY + 5);
  doc.text('ENGINEERING SPECIFICATION / FIELD STANDARDS', margin + col1W + 8, tableTopY + 5);

  let curY = tableTopY + 18;
  bioSpecs.forEach((spec, idx) => {
    const isAlt = idx % 2 === 1;
    doc.rect(margin, curY, contentWidth, rowH).fill(isAlt ? COLORS.tableRowAlt : '#ffffff');
    doc.rect(margin, curY, contentWidth, rowH).lineWidth(0.5).stroke(COLORS.borderLight);

    doc.font('Helvetica-Bold')
       .fontSize(7)
       .fillColor(COLORS.primary)
       .text(spec.label, margin + 8, curY + 4.5, { width: col1W - 12 });

    doc.font('Helvetica')
       .fontSize(6.8)
       .fillColor(COLORS.textDark)
       .text(spec.value, margin + col1W + 8, curY + 4.5, { width: col2W - 14 });

    curY += rowH;
  });

  // Sizing & Capacity Table
  const sizingY = curY + 10;
  doc.font('Helvetica-Bold')
     .fontSize(9.5)
     .fillColor(COLORS.primary)
     .text('Standard Capacity Sizing Guide (User Count vs Tank Volume)', margin, sizingY);
  doc.rect(margin, sizingY + 12, contentWidth, 1).fill(COLORS.accent);

  const sizeTableTopY = sizingY + 18;
  const sizeColW = contentWidth / 4;
  const sizeRowH = 15;

  const sizeHeaders = ['Daily User Count', 'Tank Capacity (Litres)', 'Dimensions (L x W x H)', 'Ideal Application'];
  const sizeRows = [
    ['5 - 10 Users', '1,000 Litres', '1500 x 900 x 900 mm', 'Individual Homes / Rural Houses'],
    ['25 - 50 Users', '2,500 Litres', '2100 x 1200 x 1100 mm', 'Public Toilets / Small Offices'],
    ['100 - 200 Users', '5,000 Litres', '3000 x 1400 x 1400 mm', 'Schools, Highway Petrol Pumps'],
    ['500+ Users', '10,000 - 50,000 L', 'Custom Modular Battery', 'Gram Panchayats, Hostels, Campuses']
  ];

  doc.rect(margin, sizeTableTopY, contentWidth, sizeRowH).fill(COLORS.primary);
  sizeHeaders.forEach((h, i) => {
    doc.font('Helvetica-Bold')
       .fontSize(6.8)
       .fillColor(COLORS.textLight)
       .text(h, margin + i * sizeColW + 6, sizeTableTopY + 4, { width: sizeColW - 10 });
  });

  let curSizeY = sizeTableTopY + sizeRowH;
  sizeRows.forEach((row, rIdx) => {
    const isAlt = rIdx % 2 === 1;
    doc.rect(margin, curSizeY, contentWidth, sizeRowH).fill(isAlt ? COLORS.tableRowAlt : '#ffffff');
    doc.rect(margin, curSizeY, contentWidth, sizeRowH).lineWidth(0.5).stroke(COLORS.borderLight);

    row.forEach((cell, cIdx) => {
      doc.font(cIdx === 0 ? 'Helvetica-Bold' : 'Helvetica')
         .fontSize(6.5)
         .fillColor(cIdx === 0 ? COLORS.primary : COLORS.textDark)
         .text(cell, margin + cIdx * sizeColW + 6, curSizeY + 4, { width: sizeColW - 10 });
    });
    curSizeY += sizeRowH;
  });

  // Applications Grid
  const appY = curSizeY + 10;
  doc.font('Helvetica-Bold')
     .fontSize(9.5)
     .fillColor(COLORS.primary)
     .text('Recommended Installation Sectors & Application Areas', margin, appY);
  doc.rect(margin, appY + 12, contentWidth, 1).fill(COLORS.accent);

  const appGridY = appY + 18;
  doc.rect(margin, appGridY, contentWidth, 54).fill(COLORS.bgLight);
  doc.rect(margin, appGridY, contentWidth, 54).lineWidth(0.8).stroke(COLORS.border);

  const bioApps = [
    'Public & Community E2T Toilets',
    'Rural Gram Panchayats & Villages',
    'Highway Petrol Pumps & Dhabas',
    'Indian Defense & Border Posts',
    'Schools, Colleges & Hostels',
    'Hill Stations & Glaciers (-20°C)',
    'Tourist Spots & Heritage Parks',
    'Railway Stations & Bus Depots'
  ];

  const appCellW = (contentWidth - 16) / 4;
  bioApps.forEach((app, idx) => {
    const colI = idx % 4;
    const rowI = Math.floor(idx / 4);
    const aX = margin + 8 + colI * appCellW;
    const aY = appGridY + 8 + rowI * 20;

    doc.circle(aX + 3, aY + 4, 2).fill(COLORS.primary);
    doc.font('Helvetica-Bold')
       .fontSize(6.8)
       .fillColor(COLORS.textDark)
       .text(app, aX + 9, aY + 1, { width: appCellW - 12 });
  });

  // Order & Inquiry Box
  const inqY = appGridY + 62;
  const inqH = 770 - inqY;

  doc.rect(margin, inqY, contentWidth, inqH).fill('#f8fafc');
  doc.rect(margin, inqY, contentWidth, inqH).lineWidth(1).stroke(COLORS.primary);

  doc.rect(margin, inqY, contentWidth, 16).fill(COLORS.primary);
  doc.font('Helvetica-Bold')
     .fontSize(8)
     .fillColor(COLORS.textLight)
     .text('HOW TO ENQUIRE & ORDER SMART BUDDY BIO-DIGESTER TANKS', margin + 10, inqY + 4);

  const inqColW = (contentWidth - 20) / 2;
  doc.font('Helvetica')
     .fontSize(7)
     .fillColor(COLORS.textDark)
     .text('Share your daily toilet user count, soil percolation conditions, and above/underground site preferences. Our engineering team will calculate the exact retention volume, provide CAD piping layouts, and supply the Bio-Digester tank along with initial AMI bacterial inoculum charge.', margin + 10, inqY + 22, { width: inqColW, lineGap: 1.2 });

  const inqRX = margin + inqColW + 20;
  doc.font('Helvetica-Bold')
     .fontSize(7.5)
     .fillColor(COLORS.primary)
     .text('DIRECT SALES & BIO-SANITATION ENQUIRY DESK:', inqRX, inqY + 20);

  doc.font('Helvetica')
     .fontSize(7)
     .fillColor(COLORS.textDark)
     .text(`• Direct Hotline: ${COMPANY.phone}\n• Email: ${COMPANY.email}\n• Web: ${COMPANY.website}\n• Plant: S-27, Ambad MIDC, Nashik, MH - 422010`, inqRX, inqY + 32, { lineGap: 2 });

  drawPageFooter(doc, 2, 2);

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.log(`Successfully generated Bio-Digester brochure: ${outputPath}`);
      resolve(outputPath);
    });
    stream.on('error', reject);
  });
}

generateBioDigesterBrochure().catch(console.error);
