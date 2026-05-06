import { Award, Newspaper, Star } from "lucide-react";
import { Marquee } from "@/components/Marquee/Marquee";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import "./AboutPress.scss";

interface PressItem {
  name: string;
  kind: "press" | "award";
  detail?: string;
}

const PRESS: PressItem[] = [
  { name: "Modern Healthcare", kind: "press", detail: "Innovator List 2024" },
  { name: "Home Health Care News", kind: "press", detail: "Top 50 Operators" },
  { name: "LA Business Journal", kind: "press", detail: "Best Places to Work" },
  { name: "CHAP Excellence Award", kind: "award", detail: "2025" },
  { name: "Becker's Hospital Review", kind: "press", detail: "Featured 2024" },
  { name: "CMS 5-Star Rating", kind: "award", detail: "All regions" },
  { name: "U.S. News & World Report", kind: "press", detail: "Quoted 2025" },
  { name: "AARP Caregiver's Choice", kind: "award", detail: "2024 / 2025" },
];

export function AboutPress() {
  return (
    <section className="about-press section" data-section="about-press" id="press">
      <div className="container container--wide">
        <SectionHeader
          eyebrow="Press & awards"
          title={<>Recognized for the work, <em>not the press release</em>.</>}
          description="Industry features, peer accolades and patient-driven awards we're proud to carry."
        />

        <div className="about-press__marquee">
          <Marquee speed="slow" gradientMaskColor="#FFFFFF">
            {PRESS.map((p, i) => {
              const Icon = p.kind === "award" ? Award : i === 0 ? Star : Newspaper;
              return (
                <div key={`${p.name}-${i}`} className="press-chip">
                  <span className="press-chip__icon"><Icon size={16} /></span>
                  <span className="press-chip__body">
                    <strong>{p.name}</strong>
                    {p.detail && <em>{p.detail}</em>}
                  </span>
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
