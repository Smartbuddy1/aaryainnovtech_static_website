import React, { useEffect, useRef } from "react";
import { PlayCircle } from "lucide-react";

const testimonials = [
  {
    title: "ECO Toilet site feedback 01",
    role: "Public sanitation feedback",
    video: "/media/testimonials/eco-toilet-site-feedback-01.mp4",
    poster: "/media/testimonials/posters/eco-toilet-site-feedback-01-poster.jpg",
  },
  {
    title: "ECO Toilet site feedback 02",
    role: "Site feedback",
    video: "/media/testimonials/eco-toilet-site-feedback-02.mp4",
    poster: "/media/testimonials/posters/eco-toilet-site-feedback-02-poster.jpg",
  },
  {
    title: "Client testimonial 01",
    role: "Field feedback",
    video: "/media/testimonials/video6150114488919007873.mp4",
    poster: "/media/testimonials/posters/video6150114488919007873-poster.png",
  },
  {
    title: "Client testimonial 02",
    role: "Client feedback",
    video: "/media/testimonials/video6150114488919007874.mp4",
    poster: "/media/testimonials/posters/video6150114488919007874-poster.png",
  },
  {
    title: "Client testimonial 03",
    role: "Project feedback",
    video: "/media/testimonials/video6150114488919007876.mp4",
    poster: "/media/testimonials/posters/video6150114488919007876-poster.png",
  },
  {
    title: "Client testimonial 04",
    role: "Site note",
    video: "/media/testimonials/video6150114488919007877.mp4",
    poster: "/media/testimonials/posters/video6150114488919007877-poster.png",
  },
  {
    title: "Client testimonial 05",
    role: "Installation review",
    video: "/media/testimonials/video6150114488919007878.mp4",
    poster: "/media/testimonials/posters/video6150114488919007878-poster.png",
  },
  {
    title: "Client testimonial 06",
    role: "Field testimonial",
    video: "/media/testimonials/video6150114488919007879.mp4",
    poster: "/media/testimonials/posters/video6150114488919007879-poster.png",
  },
];

function HomeTestimonials({ onOpenMedia }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const revealElements = Array.from(section.querySelectorAll("[data-reveal]"));
    const frameId = window.requestAnimationFrame(() => {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="testimonials section" id="testimonials" ref={sectionRef}>
      <div className="container testimonial-grid">
        <div className="testimonial-title section-heading split-heading" data-reveal>
          <div>
            <span className="eyebrow"><PlayCircle size={15} /> Testimonials</span>
            <h2>Video feedback from project sites.</h2>
          </div>
        </div>

        <div className="testimonial-list" aria-label="Client testimonial videos" data-reveal>
          <div className="testimonial-marquee-track">
            {[0, 1].map((groupIndex) => (
              <div
                className="testimonial-marquee-group"
                aria-hidden={groupIndex > 0 ? "true" : undefined}
                key={`testimonial-group-${groupIndex}`}
              >
                {testimonials.map((testimonial, index) => {
                  const isDuplicate = groupIndex > 0;

                  return (
                    <article
                      className="testimonial-card testimonial-video-card"
                      data-reveal="card"
                      style={{ "--reveal-delay": `${index * 55}ms` }}
                      key={`${groupIndex}-${testimonial.video}`}
                    >
                      <div className="testimonial-video-shell">
                        <button
                          className="testimonial-video-trigger"
                          type="button"
                          tabIndex={isDuplicate ? -1 : undefined}
                          onClick={() => onOpenMedia({
                            title: "Testimonial video",
                            category: "Client feedback",
                            src: testimonial.video,
                            poster: testimonial.poster,
                            type: "video",
                          })}
                          aria-label="Play testimonial video"
                        >
                          {testimonial.poster ? (
                            <img src={testimonial.poster} alt="" loading="lazy" decoding="async" />
                          ) : (
                            <span className="testimonial-video-fallback">Video</span>
                          )}
                          <span><PlayCircle size={34} /> Play video</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeTestimonials;
