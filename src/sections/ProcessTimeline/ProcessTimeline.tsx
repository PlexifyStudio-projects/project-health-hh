import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Phone, ClipboardCheck, FileText, HeartHandshake } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useAudience } from "@/lib/audience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AUDIENCE_CONTENT } from "@/data/audience-content";
import "./ProcessTimeline.scss";

const ICONS: Record<string, React.ElementType> = {
  Phone, ClipboardCheck, FileText, HeartHandshake,
};

export function ProcessTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { active } = useAudience();
  const content = AUDIENCE_CONTENT[active];
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const cards = gsap.utils.toArray<HTMLElement>(".process-card", root);
      const path = root.querySelector<SVGPathElement>(".process-timeline__connector-path");

      if (reduced) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        if (path) {
          const len = path.getTotalLength();
          path.style.strokeDasharray = `${len}`;
          path.style.strokeDashoffset = "0";
        }
        return;
      }

      // Stagger reveal for cards on enter
      gsap.from(cards, {
        y: 60,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 70%" },
      });

      // Connector line draws on scroll
      let connectorTrig: ScrollTrigger | null = null;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        connectorTrig = ScrollTrigger.create({
          trigger: root,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.8,
          animation: gsap.to(path, { strokeDashoffset: 0, ease: "none" }),
        });
      }

      // Subtle parallax on the big watermark digit
      const parallaxTrigs: ScrollTrigger[] = [];
      cards.forEach((card) => {
        const big = card.querySelector<HTMLElement>(".process-card__big-num");
        if (!big) return;
        const t = ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          animation: gsap.fromTo(big, { y: 20 }, { y: -20, ease: "none" }),
        });
        parallaxTrigs.push(t);
      });

      return () => {
        connectorTrig?.kill();
        parallaxTrigs.forEach((s) => s.kill());
        ScrollTrigger.getAll().forEach((s) => {
          if (s.trigger === root) s.kill();
        });
      };
    },
    { scope: ref, dependencies: [reduced, active] }
  );

  const totalDays = ["Day 0", "24h later", "Day 2-3", "Ongoing"];

  return (
    <section
      ref={ref}
      className="process-timeline section section--bg-cream"
      data-section="process"
      id="process"
    >
      <div className="container container--wide">
        <SectionHeader
          eyebrow={`How it works · For ${content.audienceLabel.toLowerCase()}`}
          title={<>{content.processIntro.split(" — ")[0]} <em>{content.processIntro.split(" — ")[1] ?? ""}</em></>}
          description={content.processSubtitle}
        />

        {/* Decorative connector — draws as user scrolls */}
        <svg
          className="process-timeline__connector"
          aria-hidden="true"
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="process-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#2D7FF9" />
              <stop offset="50%"  stopColor="#34C77B" />
              <stop offset="100%" stopColor="#FF8B6B" />
            </linearGradient>
          </defs>
          <path
            className="process-timeline__connector-path"
            d="M 8 30 L 992 30"
            fill="none"
            stroke="url(#process-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <ol className="process-timeline__list" aria-label="4-step admission process">
          {content.processSteps.map((p, i) => {
            const Icon = ICONS[p.iconName] ?? Phone;
            return (
              <li key={`${active}-${p.step}`} className="process-card">
                <span className="process-card__big-num" aria-hidden="true">
                  {String(p.step).padStart(2, "0")}
                </span>
                <div className="process-card__step">
                  <span className="process-card__icon"><Icon size={24} /></span>
                  <span className="process-card__num">
                    <small>Step</small>
                    <strong>{String(p.step).padStart(2, "0")}</strong>
                  </span>
                </div>
                <h3 className="process-card__title">{p.title}</h3>
                <p className="process-card__description">{p.description}</p>
                <span className="process-card__chip">{totalDays[i] ?? `Step ${p.step}`}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
