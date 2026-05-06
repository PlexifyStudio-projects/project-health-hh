import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { STATS } from "@/data/stats";
import { StatCounter } from "@/components/StatCounter/StatCounter";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { useAudience } from "@/lib/audience";
import { AUDIENCE_CONTENT } from "@/data/audience-content";
import "./StatsBand.scss";

interface Props {
  /** When true, stats adapt to active audience. Default true. */
  audienceAware?: boolean;
}

export function StatsBand({ audienceAware = true }: Props) {
  const { active } = useAudience();
  const content = AUDIENCE_CONTENT[active];
  const stats = audienceAware ? content.stats : STATS;
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const watermark = root.querySelector<HTMLElement>(".stats-band__watermark");
      if (!watermark) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.fromTo(
        watermark,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((s) => {
          if (s.trigger === root) s.kill();
        });
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="stats-band section" data-section="stats" id="stats">
      <span className="stats-band__watermark" aria-hidden="true">NUMBERS</span>
      <div className="container container--wide">
        {audienceAware && (
          <div className="stats-band__intro">
            <span className="stats-band__eyebrow">Numbers · For {content.audienceLabel.toLowerCase()}</span>
          </div>
        )}
        <ScrollReveal childSelector=".stats-band__item" stagger={0.12} className="stats-band__list" mode="scale-in">
          {stats.map((s, i) => (
            <div key={`${active}-${s.label}`} className="stats-band__item">
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} description={s.description} index={i} />
            </div>
          ))}
        </ScrollReveal>

        {audienceAware && (
          <div className="stats-band__badges" aria-label="Trust badges">
            {content.trustBadges.map((b) => (
              <span key={b} className="stats-band__badge">{b}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
