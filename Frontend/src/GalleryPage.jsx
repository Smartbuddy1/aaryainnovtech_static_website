import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Camera,
  Globe2,
  PlayCircle,
  Trophy,
  Users,
} from "lucide-react";
import { deduplicateImages } from "./utils/galleryUtils.js";

const galleryPath = (section, file) => `/media/gallery/${section}/${file}`;
const optimizedGalleryPath = (section, file) =>
  `/media/optimized/gallery/${section}/${file.replace(/\.(jpe?g|png)$/i, ".jpg")}`;
const achievementPath = (section, file) => `/media/achievements/${section}/${file}`;

const rawGallerySections = [
  {
    id: "featured-videos",
    eyebrow: "Featured highlights",
    title: "Aarya Innovtech visual highlights",
    summary: "Portfolio visuals, recognition moments, and brand communication assets.",
    icon: PlayCircle,
    images: [
      {
        id: "feat-vid-company-portfolio",
        src: galleryPath("featured-videos", "smart-buddy-company-portfolio.mp4"),
        poster: galleryPath("featured-videos", "aarya-innovtech-company-portfolio-poster.jpg"),
        title: "Aarya Innovtech company portfolio reel",
        alt: "Aarya Innovtech company portfolio video opening with the company brand and engineering message",
        size: "wide",
        type: "video",
        width: 1280,
        height: 722,
      },
      {
        id: "feat-vid-kamal-puraskar-2017",
        src: galleryPath("featured-videos", "udyog-janani-kamal-puraskar-2017.mp4"),
        poster: galleryPath("featured-videos", "udyog-janani-kamal-puraskar-2017-poster.jpg"),
        title: "Udyog Janani Kamal Puraskar 2017",
        alt: "Udyog Janani Kamal Puraskar 2017 visual highlight",
        size: "wide",
        type: "video",
        width: 1280,
        height: 722,
      },
    ],
  },
  {
    id: "public-sanitation",
    eyebrow: "Public sanitation",
    title: "Electronic ECO Toilet site installations",
    summary: "Installed ECO Toilet blocks, civic site views, and official site-visit moments.",
    icon: Building2,
    images: [
      {
        id: "pub-san-eco-toilet-public-block",
        src: galleryPath("public-sanitation", "eco-toilet-public-block.jpg"),
        title: "Public ECO Toilet block",
        alt: "Electronic ECO Toilet block installed at a public site",
        size: "panorama",
        width: 1156,
        height: 521,
      },
      {
        id: "pub-san-eco-toilet-site-visit",
        src: galleryPath("public-sanitation", "eco-toilet-site-visit.jpg"),
        title: "Site visit at ECO Toilet block",
        alt: "Officials standing near an Electronic ECO Toilet installation",
        size: "panorama",
        width: 1600,
        height: 721,
      },
    ],
  },
  {
    id: "sports-league",
    eyebrow: "Sports and community",
    title: "Team moments at Sakal Premier League Nashik",
    summary: "Brand visibility, team photographs, and kit handover moments from the cricket team.",
    icon: Trophy,
    images: [
      {
        id: "sports-cricket-team-wide",
        src: galleryPath("sports-league", "aarya-innovtech-cricket-team-wide.jpg"),
        title: "Aarya Innovtech cricket team",
        alt: "Aarya Innovtech cricket team group photograph at Sakal Premier League Nashik",
        size: "large",
        width: 1600,
        height: 1200,
      },
      {
        id: "sports-kit-handover",
        src: galleryPath("sports-league", "aarya-innovtech-kit-handover.jpg"),
        title: "Team kit handover",
        alt: "Aarya Innovtech team kit handover at the Sakal Premier League Nashik event",
        size: "portrait",
        width: 900,
        height: 1600,
      },
      {
        id: "sports-team-stage",
        src: optimizedGalleryPath("sports-league", "aarya-innovtech-team-stage.jpg"),
        title: "Team stage photograph",
        alt: "Aarya Innovtech team group photograph in front of the event sponsor wall",
        size: "portrait",
        width: 3120,
        height: 4160,
      },
    ],
  },
  {
    id: "leadership",
    eyebrow: "Leadership",
    title: "Leadership and global exposure",
    summary: "A personal leadership moment that complements the company story and founder visibility.",
    icon: Globe2,
    images: [
      {
        id: "leadership-global-moment",
        src: galleryPath("leadership", "leadership-global-moment.jpg"),
        title: "Founder global moment",
        alt: "Aarya Innovtech founder photographed during an international travel moment",
        size: "portrait",
        width: 768,
        height: 1362,
      },
    ],
  },
  {
    id: "moonje-institute",
    eyebrow: "Mentorship and institute connect",
    title: "Dr. Moonje Institute interaction",
    summary: "Institute interaction moments, student leadership discussion, conference meeting, and recognition photographs.",
    icon: Users,
    images: [
      {
        id: "moonje-auditorium-group",
        src: achievementPath("moonje-institute", "auditorium-group.jpeg"),
        title: "Auditorium group",
        alt: "Large student group photograph at Dr. Moonje Institute",
        size: "wide",
        width: 1280,
        height: 853,
      },
      {
        id: "moonje-student-leaders-group",
        src: achievementPath("moonje-institute", "student-leaders-group.jpeg"),
        title: "Student leaders",
        alt: "Student leaders with guest speaker",
        width: 1280,
        height: 853,
      },
      {
        id: "moonje-meeting-certificates-wall",
        src: achievementPath("moonje-institute", "meeting-certificates-wall.jpeg"),
        title: "Certificates wall",
        alt: "Meeting room with certificates wall",
        width: 1600,
        height: 1200,
      },
      {
        id: "moonje-conference-room-discussion",
        src: achievementPath("moonje-institute", "conference-room-discussion.jpeg"),
        title: "Conference discussion",
        alt: "Discussion in the conference room",
        width: 1600,
        height: 1200,
      },
      {
        id: "moonje-mentor-sofa-talk",
        src: achievementPath("moonje-institute", "mentor-sofa-talk.jpeg"),
        title: "Mentor talk",
        alt: "Mentor speaking from the sofa",
        width: 1280,
        height: 853,
      },
      {
        id: "moonje-student-question",
        src: achievementPath("moonje-institute", "student-question.jpeg"),
        title: "Student question",
        alt: "Student asking a question",
        width: 1280,
        height: 853,
      },
      {
        id: "moonje-plaque-presentation",
        src: achievementPath("moonje-institute", "plaque-presentation.jpeg"),
        title: "Plaque presentation",
        alt: "Plaque presentation at the institute",
        width: 1280,
        height: 853,
      },
    ],
  },
];

const gallerySections = rawGallerySections.map((section) => ({
  ...section,
  images: deduplicateImages(section.images),
}));

const galleryHeroImages = deduplicateImages([
  { ...gallerySections[1].images[0], category: gallerySections[1].eyebrow },
  { ...gallerySections[2].images[0], category: gallerySections[2].eyebrow },
  { ...gallerySections[4].images[0], category: gallerySections[4].eyebrow },
]);

function GalleryPage({ onNavigateHome, onOpenMedia }) {
  const openMedia = (image) => {
    onOpenMedia?.({
      title: image.title,
      category: image.category,
      src: image.src,
      alt: image.alt,
      type: image.type,
      poster: image.poster,
    });
  };

  const scrollToGallerySection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="gallery-page">
      <section className="gallery-page-hero">
        <div className="gallery-page-hero-bg" aria-hidden="true" />
        <div className="container gallery-page-hero-grid">
          <div className="gallery-page-copy" data-reveal>
            <div className="product-breadcrumb" aria-label="Breadcrumb">
              <button type="button" onClick={() => onNavigateHome("home")}>Home</button>
              <ArrowRight size={14} />
              <strong>Visuals</strong>
            </div>
            <span className="eyebrow light">
              <Camera size={15} /> Visuals
            </span>
            <h1>Aarya Innovtech visuals.</h1>
            <p>
              A curated view of product installations, institutional interactions, team moments,
              and recognition visuals from the Aarya Innovtech journey.
            </p>
            <div className="gallery-page-actions">
              <button className="button primary" type="button" onClick={() => scrollToGallerySection(gallerySections[0].id)}>
                View visuals <ArrowRight size={17} />
              </button>
              <button className="button glass" type="button" onClick={() => onNavigateHome("contact")}>
                Contact team
              </button>
            </div>
            <div className="gallery-page-summary" aria-label="Gallery summary">
              <span><strong>{gallerySections.length}</strong> sections</span>
              <span><strong>2010+</strong> journey</span>
            </div>
          </div>

          <div className="gallery-hero-preview" data-reveal>
            {galleryHeroImages.map((image, index) => (
              <button
                className={`gallery-hero-tile tile-${index + 1}`}
                type="button"
                onClick={() => openMedia(image)}
                aria-label={`Open ${image.title}`}
                key={`hero-${image.id}`}
              >
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
                <span>{image.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <nav className="gallery-page-nav" aria-label="Gallery sections">
        <div className="container gallery-page-nav-inner">
          {gallerySections.map((section) => {
            const Icon = section.icon;
            return (
              <button type="button" onClick={() => scrollToGallerySection(section.id)} key={section.id}>
                <Icon size={15} />
                <span>{section.eyebrow}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="gallery-page-body">
        {gallerySections.map((section, sectionIndex) => {
          const Icon = section.icon;
          const sectionImages = section.images;

          return (
            <section className={`gallery-section ${sectionIndex % 2 ? "is-soft" : ""}`} id={section.id} key={section.id}>
              <div className="container">
                <div className="gallery-section-frame">
                  <div className="gallery-section-heading" data-reveal>
                    <div>
                      <span className="eyebrow">
                        <Icon size={15} /> {section.eyebrow}
                      </span>
                      <h2>{section.title}</h2>
                      <p>{section.summary}</p>
                    </div>
                  </div>

                  <div className={`gallery-page-grid ${sectionImages.length === 1 ? "is-single" : ""}`} data-reveal>
                    {sectionImages.map((image, imageIndex) => (
                      <button
                        className={`gallery-page-card is-${image.size || "standard"}`}
                        type="button"
                        onClick={() => openMedia({ ...image, category: section.eyebrow })}
                        aria-label={`Open ${image.title}`}
                        data-reveal
                        style={{
                          "--reveal-delay": `${imageIndex * 45}ms`,
                          "--gallery-ratio": image.width && image.height ? `${image.width} / ${image.height}` : undefined,
                        }}
                        key={image.id}
                      >
                        <span className="gallery-page-media">
                          <img
                            src={image.poster || image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            loading="lazy"
                            decoding="async"
                          />
                          {image.type === "video" && (
                            <span className="gallery-page-play-badge">
                              <PlayCircle size={16} /> Play video
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>


    </div>
  );
}

export default GalleryPage;

