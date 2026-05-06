import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import type { ServiceWeekStep } from "@/types";
import "./ServiceJourney.scss";

interface Props {
  steps: ServiceWeekStep[];
  serviceTitle: string;
}

export function ServiceJourney({ steps, serviceTitle }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const cards = root.querySelectorAll(".service-journey__step");
      const fill = root.querySelector(".service-journey__fill");

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });

      if (fill) {
        gsap.fromTo(
          fill,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 60%", scrub: 0.8 },
          }
        );
      }

      return () => {
        ScrollTrigger.getAll().forEach((s) => {
          if (s.trigger === root) s.kill();
        });
      };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="service-journey section section--bg-cream" data-section="journey">
      <div className="container container--wide">
        <SectionHeader
          eyebrow="What to expect"
          title={<>Your {serviceTitle.toLowerCase()} journey, <em>visit by visit</em>.</>}
          description="A typical episode of care. Your plan adapts to the goals you set with our team."
        />

        <ol className="service-journey__list" aria-label={`${serviceTitle} journey`}>
          <span className="service-journey__rail" aria-hidden="true">
            <span className="service-journey__fill" />
          </span>
          {steps.map((s, i) => (
            <li key={`${s.label}-${i}`} className="service-journey__step">
              <div className="service-journey__marker" aria-hidden="true">
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="service-journey__body">
                <span className="service-journey__chip">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
