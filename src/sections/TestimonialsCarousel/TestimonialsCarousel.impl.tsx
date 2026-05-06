import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Pagination, Autoplay, Keyboard, A11y } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useAudience } from "@/lib/audience";
import { AUDIENCE_CONTENT } from "@/data/audience-content";
import "swiper/css";
import "swiper/css/pagination";
import "./TestimonialsCarousel.scss";

interface Props {
  audienceAware?: boolean;
}

// =====================
// Tiny text-scramble util — no library, ~700 bytes
// =====================
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

function scrambleElement(el: HTMLElement, finalText: string, durationMs = 400): () => void {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    el.textContent = finalText;
    return () => {};
  }
  const length = finalText.length;
  const start = performance.now();
  let raf = 0;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    let out = "";
    for (let i = 0; i < length; i++) {
      const reveal = i / length;
      if (t >= reveal) {
        out += finalText[i];
      } else {
        const c = finalText[i];
        if (c === " " || c === "\n") out += c;
        else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }
    el.textContent = out;
    if (t < 1) raf = requestAnimationFrame(tick);
    else el.textContent = finalText;
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export default function TestimonialsCarouselImpl({ audienceAware = true }: Props) {
  const { active } = useAudience();
  const content = AUDIENCE_CONTENT[active];
  const sectionRef = useRef<HTMLElement>(null);
  const cancelScrambleRef = useRef<(() => void) | null>(null);

  // Strict filter: each audience sees ONLY their own curated testimonials
  const items = audienceAware
    ? TESTIMONIALS.filter((t) => t.audience === active)
    : TESTIMONIALS;

  // Apply scramble + card flip on slide change
  useEffect(() => {
    return () => {
      if (cancelScrambleRef.current) cancelScrambleRef.current();
    };
  }, []);

  const handleSlideChange = (swiper: SwiperClass) => {
    const root = sectionRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Find the active slide's quote and the article (card) elements
    const slides = Array.from(root.querySelectorAll<HTMLElement>(".testimonial"));
    const activeIdx = swiper.realIndex;

    // 3D card flip on each visible slide — back-and-forth rotateY
    if (!reduce && slides.length > 0) {
      slides.forEach((slide, i) => {
        const dir = i < activeIdx ? -1 : 1;
        gsap.fromTo(
          slide,
          { rotateY: 5 * dir },
          { rotateY: 0, duration: 0.7, ease: "power3.out", overwrite: "auto" }
        );
      });
    }

    // Text scramble on the active slide's quote
    const activeSlideEl = swiper.slides[swiper.activeIndex] as HTMLElement | undefined;
    const quoteEl = activeSlideEl?.querySelector<HTMLElement>(".testimonial__quote");
    if (quoteEl) {
      const finalText = quoteEl.dataset.text ?? quoteEl.textContent ?? "";
      if (cancelScrambleRef.current) cancelScrambleRef.current();
      cancelScrambleRef.current = scrambleElement(quoteEl, finalText, 400);
    }
  };

  return (
    <section ref={sectionRef} className="testimonials section section--bg-mist" data-section="stories" id="stories">
      <div className="container container--wide">
        <SectionHeader
          eyebrow={audienceAware ? `Stories from ${content.audienceLabel.toLowerCase()}` : "Real stories"}
          title={<>People who lived it, <em>say it best</em>.</>}
          description={audienceAware
            ? `Real ${content.audienceLabel.toLowerCase()} who chose Plexify, in their own words.`
            : "Patients, families, nurses, hospital partners and payers — five voices, one truth."}
        />

        <Swiper
          modules={[Pagination, Autoplay, Keyboard, A11y]}
          key={active}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          keyboard
          a11y={{ enabled: true }}
          breakpoints={{
            768:  { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
          onSlideChange={handleSlideChange}
          className="testimonials__swiper"
        >
          {items.map((t, i) => (
            <SwiperSlide key={`${active}-${i}`} className="testimonials__slide">
              <article className="testimonial">
                <Quote className="testimonial__quote-mark" size={36} aria-hidden="true" />
                <p className="testimonial__quote" data-text={t.quote}>{t.quote}</p>
                <div className="testimonial__rating" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <footer className="testimonial__author">
                  <img
                    src={t.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="56"
                    height="56"
                  />
                  <div>
                    <strong>{t.author}</strong>
                    <span>{t.role}</span>
                  </div>
                </footer>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
