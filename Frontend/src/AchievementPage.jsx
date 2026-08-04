import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  GraduationCap,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { deduplicateImages } from "./utils/galleryUtils.js";

const imagePath = (section, file) => `/media/achievements/${section}/${file}`;
const optimizedImagePath = (section, file) =>
  `/media/optimized/achievements/${section}/${file.replace(/\.(jpe?g|png)$/i, ".jpg")}`;

const rawAchievementSections = [
  {
    id: "global-impact-forum",
    eyebrow: "National recognition",
    title: "Global Impact Forum and Udyog Bharati recognition moments",
    location: "Sakal Global Impact Forum and Udyog Bharati program",
    date: "Recognition event",
    icon: Trophy,
    hero: imagePath("global-impact-forum", "global-impact-stage-handshake.jpg"),
    heroAlt: "Handshake moment on the Global Impact Forum stage",
    summary:
      "A first-priority recognition section featuring Aarya Innovtech moments from the Global Impact Forum stage and Udyog Bharati program.",
    highlights: ["Global Impact Forum", "Certificate presentation", "Udyog Bharati recognition"],
    images: [
      ["global-impact-certificate-presentation.jpg", "Certificate presentation on stage at the Global Impact Forum"],

      ["udyog-bharati-recognition-group.jpg", "Udyog Bharati recognition group photograph"],
    ].map(([file, alt], i) => ({ id: `gif-${i}`, src: imagePath("global-impact-forum", file), alt })),
  },
  {
    id: "school-awards",
    eyebrow: "Education recognition",
    title: "Prize distribution and student recognition ceremony",
    location: "R. J. Chouhan Girls High School, Nashik Road",
    date: "School event",
    icon: GraduationCap,
    hero: optimizedImagePath("school-awards", "students-group-wide.jpeg"),
    heroAlt: "Group photograph with students during the school prize distribution ceremony",
    summary:
      "A school prize distribution program celebrating student achievement, discipline, and encouragement through public recognition.",
    highlights: ["Student awards", "Chief guest address", "School community"],
    images: [
      [optimizedImagePath("school-awards", "ganesh-prayer.jpeg"), "Ganesh prayer before the school ceremony"],
      [optimizedImagePath("school-awards", "lamp-lighting.jpeg"), "Lamp lighting ceremony"],
      [optimizedImagePath("school-awards", "chief-guest-award.jpeg"), "Chief guest receiving an award on stage"],
      [optimizedImagePath("school-awards", "stage-speech-wide.jpeg"), "Speaker addressing the audience from the stage"],
      [optimizedImagePath("school-awards", "school-group-stage.jpeg"), "Group photo on the school stage"],
      [optimizedImagePath("school-awards", "student-award-plaque.jpeg"), "Student receiving a plaque"],
    ].map(([src, alt], i) => ({ id: `sch-${i}`, src, alt })),
  },
  {
    id: "nashik-next",
    eyebrow: "Industry recognition",
    title: "Aarya Innovtech recognition at Nashik Next",
    location: "Sakal and Deepak Builders & Developers event",
    date: "7th anniversary recognition",
    icon: Trophy,
    hero: imagePath("nashik-next", "award-group-wide.jpeg"),
    heroAlt: "Aarya Innovtech recognition group photograph at Nashik Next",
    summary:
      "Recognition for Aarya Innovtech's journey, public-impact work, and the founder team.",
    highlights: ["Aarya Innovtech recognition", "Certificate presentation", "Founder visibility"],
    images: [
      ["recognition-collage.jpeg", "Aarya Innovtech recognition collage"],
    ].map(([file, alt], i) => ({ id: `nn-${i}`, src: imagePath("nashik-next", file), alt })),
  },
  {
    id: "moonje-institute",
    eyebrow: "Mentorship and institute connect",
    title: "Dr. Moonje Institute interaction and recognition",
    location: "Dr. Moonje Institute of Management and Computer Studies",
    date: "Student interaction",
    icon: BookOpen,
    hero: imagePath("moonje-institute", "auditorium-group.jpeg"),
    heroAlt: "Large student group photograph at Dr. Moonje Institute",
    summary:
      "A student interaction on entrepreneurship, leadership, and industry experience.",
    highlights: ["Student mentoring", "Faculty interaction", "Award exchange"],
    images: [
      ["student-leaders-group.jpeg", "Student leaders with guest speaker"],
      ["meeting-certificates-wall.jpeg", "Meeting room with certificates wall"],
      ["conference-room-discussion.jpeg", "Discussion in the conference room"],
      ["mentor-sofa-talk.jpeg", "Mentor speaking from the sofa"],
      ["student-question.jpeg", "Student asking a question"],
      ["plaque-presentation.jpeg", "Plaque presentation at the institute"],
    ].map(([file, alt], i) => ({ id: `mi-${i}`, src: imagePath("moonje-institute", file), alt })),
  },
];

const achievementSections = rawAchievementSections.map((section) => ({
  ...section,
  images: deduplicateImages(section.images),
}));

const achievementStats = [
  { value: "2026", label: "Forum recognition", icon: Award },
  { value: "1st", label: "Priority feature", icon: Sparkles },
];

const featuredMoments = achievementSections.slice(0, 4).map((section) => ({
  title: section.title,
  label: section.eyebrow,
  image: section.hero,
  target: section.id,
}));

function AchievementPage({ onNavigateHome }) {
  const scrollToEvent = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="achievements-page">
      <section className="achievements-page-hero">
        <div className="achievements-page-hero-bg" aria-hidden="true" />
        <div className="container achievements-page-hero-grid">
          <div className="achievements-page-copy" data-reveal>
            <div className="product-breadcrumb" aria-label="Breadcrumb">
              <button type="button" onClick={() => onNavigateHome("home")}>Home</button>
              <ArrowRight size={14} />
              <strong>Achievements</strong>
            </div>
            <span className="eyebrow light">
              <Award size={15} /> Achievements
            </span>
            <h1>Recognitions, public programs, and community impact moments.</h1>
            <p>
              Aarya Innovtech's achievement story is organized here by context:
              forum recognition, student programs, industry awards, institute mentoring, and professional dialogue.
            </p>
            <div className="achievements-page-actions">
              <button className="button primary" type="button" onClick={() => scrollToEvent(achievementSections[0].id)}>
                Explore events <ArrowRight size={17} />
              </button>
              <button className="button glass" type="button" onClick={() => onNavigateHome("contact")}>
                Contact team
              </button>
            </div>
          </div>

          <aside className="achievements-page-panel" data-reveal>
            <div className="achievements-page-panel-top">
              <Sparkles size={20} />
              <span>Section-wise gallery</span>
            </div>
            <div className="achievements-page-proof">
              {achievementStats.map(({ value, label, icon: Icon }) => (
                <article key={label}>
                  <Icon size={20} />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <div className="achievements-page-panel-note">
              <Building2 size={18} />
              <p>The strongest non-repeated images are grouped by event context for a cleaner Achievement page.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="achievement-featured section">
        <div className="container">
          <div className="section-heading split-heading" data-reveal>
            <div>
              <span className="eyebrow">
                <BadgeCheck size={15} /> Featured moments
              </span>
              <h2>Achievement stories grouped by event context.</h2>
            </div>
            <p>
              Each section below uses the images from the matching program, so visitors can
              quickly understand what kind of recognition or interaction took place.
            </p>
          </div>

          <div className="achievement-feature-grid">
            {featuredMoments.map((moment, index) => (
              <button
                type="button"
                className={index === 0 ? "is-featured" : ""}
                onClick={() => scrollToEvent(moment.target)}
                data-reveal
                style={{ "--achievement-feature-image": `url(${moment.image})`, "--reveal-delay": `${index * 65}ms` }}
                key={moment.target}
              >
                <img src={moment.image} alt={moment.title} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                <span>{moment.label}</span>
                <strong>{moment.title}</strong>
              </button>
            ))}
          </div>
        </div>
      </section>

      {achievementSections.map((section, sectionIndex) => {
        const Icon = section.icon;

        return (
          <section
            className={`achievement-event section ${sectionIndex % 2 ? "is-soft" : ""}`}
            id={section.id}
            style={{ "--achievement-section-image": `url(${section.hero})` }}
            key={section.id}
          >
            <div className="container">
              <div className="achievement-event-intro" data-reveal>
                <div>
                  <span className="eyebrow">
                    <Icon size={15} /> {section.eyebrow}
                  </span>
                  <h2>{section.title}</h2>
                  <p>{section.summary}</p>
                </div>
                <aside>
                  <strong>{section.location}</strong>
                  <span>{section.date}</span>
                </aside>
              </div>

              <div className="achievement-event-layout">
                <article className="achievement-event-hero" data-reveal>
                  <img src={section.hero} alt={section.heroAlt} loading={sectionIndex === 0 ? "eager" : "lazy"} decoding="async" />
                  <div>
                    <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                    <strong>{section.eyebrow}</strong>
                  </div>
                </article>

                <div className="achievement-event-facts" data-reveal>
                  {section.highlights.map((highlight) => (
                    <p key={highlight}>
                      <BadgeCheck size={15} />
                      {highlight}
                    </p>
                  ))}
                </div>
              </div>

              {section.images.length > 0 ? (
                <div className="achievement-gallery" data-reveal>
                  {section.images.map((image, imageIndex) => (
                    <figure
                      className={imageIndex === 0 ? "is-wide" : ""}
                      data-reveal
                      style={{ "--achievement-image": `url(${image.src})`, "--reveal-delay": `${Math.min(imageIndex, 10) * 38}ms` }}
                      key={image.id || image.src}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading={sectionIndex === 0 && imageIndex === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                      <figcaption>{image.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}


    </div>
  );
}

export default AchievementPage;
