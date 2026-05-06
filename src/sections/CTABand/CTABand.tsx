import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Phone } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/Button/Button";
import { useMagnetic } from "@/hooks/useMagnetic";
import { SITE } from "@/data/site";
import { useAudience } from "@/lib/audience";
import { AUDIENCE_CONTENT } from "@/data/audience-content";
import "./CTABand.scss";

interface Props {
  title?: React.ReactNode;
  description?: string;
  /** When true, content is overridden by the active audience (used on Home). */
  audienceAware?: boolean;
}

export function CTABand({ title, description, audienceAware = true }: Props) {
  const { active } = useAudience();
  const content = AUDIENCE_CONTENT[active];
  const sectionRef = useRef<HTMLElement>(null);
  const magneticRef = useMagnetic<HTMLSpanElement>(0.3);

  const finalTitle =
    title ?? (audienceAware ? <>{content.ctaTitle} <em>{content.ctaTitleHighlight}</em></> : <>Ready to bring care <em>home?</em></>);
  const finalDescription =
    description ?? (audienceAware ? content.ctaDescription : "Talk to a real person in under 60 seconds.");

  const primary   = audienceAware ? content.ctaPrimary   : { label: "Refer a Patient",  to: "/refer-a-patient" };
  const secondary = audienceAware ? content.ctaSecondary : { label: "Verify Insurance", to: "/verify-insurance" };

  // Subtle scroll-driven scale pulse on the gradient mesh background
  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const mesh = root.querySelector<HTMLElement>(".cta-band__mesh");
      if (!mesh) return;

      gsap.fromTo(
        mesh,
        { scale: 1.02 },
        {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
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
    <section ref={sectionRef} className="cta-band" data-section="cta" id="cta">
      <div className="container container--wide">
        <div className="cta-band__card">
          {/* Animated gradient mesh layer */}
          <div className="cta-band__mesh" aria-hidden="true" />

          <div className="cta-band__content">
            <span className="cta-band__eyebrow">For {content.audienceLabel.toLowerCase()}</span>
            <h2 className="cta-band__title">{finalTitle}</h2>
            <p className="cta-band__description">{finalDescription}</p>
          </div>
          <div className="cta-band__actions">
            <span ref={magneticRef} className="cta-band__magnet">
              <Button to={primary.to} variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
                {primary.label}
              </Button>
            </span>
            <Button to={secondary.to} variant="outline" size="lg">
              {secondary.label}
            </Button>
            <a href={SITE.phoneHref} className="cta-band__phone">
              <Phone size={14} />
              <span><em>24/7</em>{SITE.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
