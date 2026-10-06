const fs = require('fs');
let code = fs.readFileSync('Frontend/src/App.jsx', 'utf8');

const startIdx = code.indexOf('const homeAchievementSections = [');
const endIdx = code.indexOf('    ];', startIdx) + 6;

const fullArray = `const homeAchievementSections = [
  {
    id: "naari-shakti",
    label: "Women Empowerment",
    title: "Naari Shakti Award",
    images: [
      {
        title: "Naari Shakti Award presentation",
        src: achievementImagePath("Naari shakti", "award.jpeg"),
        alt: "Receiving the Naari Shakti award",
      },
      {
        title: "Naari Shakti Certificate",
        src: achievementImagePath("Naari shakti", "certificate.jpeg"),
        alt: "Naari Shakti certificate",
      },
      {
        title: "Naari Shakti Trophy",
        src: achievementImagePath("Naari shakti", "trophy.jpeg"),
        alt: "Naari Shakti trophy",
      },
      {
        title: "Naari Shakti Recognition",
        src: achievementImagePath("Naari shakti", "mam.jpeg"),
        alt: "Naari Shakti Recognition Moment",
      },
    ],
  },
  {
    id: "life-cycle-costing",
    label: "Professional Achievement",
    title: "Life Cycle Costing Event",
    images: [
      {
        title: "Life Cycle Costing award",
        src: achievementImagePath("life cycle costing", "award.jpeg"),
        alt: "Life Cycle Costing award",
      },
      {
        title: "Receiving recognition",
        src: achievementImagePath("life cycle costing", "award2.jpeg"),
        alt: "Receiving recognition",
      },
      {
        title: "Media and news coverage",
        src: achievementImagePath("life cycle costing", "news.jpeg"),
        alt: "Media and news coverage",
      },
      {
        title: "Speech at Life Cycle Costing event",
        src: achievementImagePath("life cycle costing", "speech.jpeg"),
        alt: "Speech at Life Cycle Costing event",
      },
    ],
  },
  {
    id: "networking",
    label: "Industry Connect",
    title: "Professional Networking and Roundtable",
    images: [
      {
        title: "Roundtable discussion",
        src: achievementImagePath("networking", "roundtable-discussion.jpeg"),
        alt: "Roundtable discussion with industry leaders",
      },
    ],
  },
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
  }
];`;

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + fullArray + code.substring(endIdx);
  fs.writeFileSync('Frontend/src/App.jsx', code);
  console.log('Fixed App.jsx with full array replacement');
} else {
  console.log('Could not find the bounds to replace');
}
