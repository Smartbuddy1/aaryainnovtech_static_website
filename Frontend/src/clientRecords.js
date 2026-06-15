export const clientRecords = [
  {
    filename: "11.jpeg",
    label: "Government of Maharashtra",
    website: "https://www.maharashtra.gov.in/",
  },
  {
    filename: "22.jpeg",
    label: "Government of NCT of Delhi",
    website: "https://delhi.gov.in/",
  },
  {
    filename: "33.jpg",
    label: "Government of Gujarat",
    website: "https://www.gujarat.gov.in/",
  },
  {
    filename: "44.png",
    label: "Government of Gujarat",
    website: "https://www.gujarat.gov.in/",
  },
  {
    filename: "55.png",
    label: "Delhi Government",
    website: "https://delhi.gov.in/",
  },
  {
    filename: "66.jpg",
    label: "Ministry of Home Affairs",
    website: "https://www.mha.gov.in/",
  },
  {
    filename: "77.jpg",
    label: "Ministry of Civil Aviation",
    website: "https://www.civilaviation.gov.in/",
  },
  {
    filename: "88.png",
    label: "Ministry of Textiles",
    website: "https://texmin.nic.in/",
  },
  {
    filename: "99.jpg",
    label: "Ministry of Education",
    website: "https://www.education.gov.in/",
  },
  {
    filename: "10.png",
    label: "Government of Kerala",
    website: "https://www.kerala.gov.in/",
  },
  {
    filename: "101.jpg",
    label: "Airports Authority of India",
    website: "https://www.aai.aero/",
  },
  {
    filename: "102.png",
    label: "Ministry of Finance",
    website: "https://www.finmin.nic.in/",
  },
  {
    filename: "103.jpg",
    label: "Defence Research and Development Organisation",
    website: "https://www.drdo.gov.in/",
  },
  {
    filename: "104.jpg",
    label: "Indian Army",
    website: "https://www.indianarmy.nic.in/",
  },
  {
    filename: "105.png",
    label: "Border Security Force",
    website: "https://bsf.gov.in/",
  },
  {
    filename: "106.jpg",
    label: "Department of Agriculture, Kerala",
    website: "https://keralaagriculture.gov.in/",
  },
  {
    filename: "107.png",
    label: "Central Reserve Police Force",
    website: "https://crpf.gov.in/",
  },
  {
    filename: "108.png",
    label: "Indian Railways",
    website: "https://indianrailways.gov.in/",
  },
  {
    filename: "109.png",
    label: "Government of Madhya Pradesh",
    website: "https://www.mp.gov.in/",
  },
  {
    filename: "110.jpg",
    label: "Ministry of Coal",
    website: "https://www.coal.nic.in/",
  },
  {
    filename: "111.png",
    label: "Government of Bihar",
    website: "https://state.bihar.gov.in/",
  },
  {
    filename: "112.png",
    label: "Government of Punjab",
    website: "https://punjab.gov.in/",
  },
  {
    filename: "113.png",
    label: "Government of Odisha",
    website: "https://odisha.gov.in/",
  },
  {
    filename: "114.png",
    label: "Government of Tamil Nadu",
    website: "https://www.tn.gov.in/",
  },
  {
    filename: "115.jpg",
    label: "Government of Telangana",
    website: "https://www.telangana.gov.in/",
  },
  {
    filename: "116.jpg",
    label: "Kendriya Bhandar",
    website: "https://www.kendriyabhandar.org/",
  },
  {
    filename: "117.png",
    label: "Government of Uttar Pradesh",
    website: "https://up.gov.in/",
  },
  {
    filename: "118.png",
    label: "Hindustan Petroleum",
    website: "https://www.hindustanpetroleum.com/",
  },
  {
    filename: "119.jpg",
    label: "Government of Jharkhand",
    website: "https://www.jharkhand.gov.in/",
  },
  {
    filename: "120.jpg",
    label: "Hindustan Aeronautics Limited",
    website: "https://hal-india.co.in/",
  },
  {
    filename: "121.jpg",
    label: "Reliance Industries Limited",
    website: "https://www.ril.com/",
  },
  {
    filename: "122.png",
    label: "State Bank of India",
    website: "https://sbi.co.in/",
  },
  {
    filename: "123.png",
    label: "Power Grid Corporation of India",
    website: "https://www.powergrid.in/",
  },
  {
    filename: "124.jpg",
    label: "Seva Automotive",
    website: "https://www.marutiseva.com/",
  },
  {
    filename: "125.png",
    label: "Smart Cities Mission",
    website: "https://smartcities.gov.in/",
  },
  {
    filename: "126.png",
    label: "Coal India Limited",
    website: "https://www.coalindia.in/",
  },
].map((client) => ({
  ...client,
  src: `/client/images/${client.filename}`,
}));
