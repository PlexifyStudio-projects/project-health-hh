import { Sparkles, Users, MapPin, FileSignature, HeartHandshake } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import "./AboutTimeline.scss";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  highlight?: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2018",
    title: "Founded in Los Angeles",
    description: "Three clinicians and one operator open the first office on Wilshire — a single RN, a single iPad, a stubborn idea.",
    icon: Sparkles,
    highlight: "Day 1",
  },
  {
    year: "2020",
    title: "First 1,000 patients",
    description: "Through the pandemic, we tripled the clinical team and built a 24/7 nursing line that still defines us today.",
    icon: Users,
    highlight: "1K patients",
  },
  {
    year: "2022",
    title: "Multi-region expansion",
    description: "Service areas grow to San Fernando Valley, Ventura County, Orange County and the Inland Empire.",
    icon: MapPin,
    highlight: "5 regions",
  },
  {
    year: "2024",
    title: "Value-based contracts",
    description: "Five California health plans entrust Plexify with shared-savings and full-risk arrangements — outcomes-aligned care goes mainstream.",
    icon: FileSignature,
    highlight: "5 plans",
  },
  {
    year: "2026",
    title: "Today",
    description: "15,000+ patients served, 98% satisfaction, 30% lower readmissions than the CMS benchmark — and a roadmap that's only getting started.",
    icon: HeartHandshake,
    highlight: "Now",
  },
];

export function AboutTimeline() {
  return (
    <section className="about-timeline section section--bg-cream" data-section="about-timeline" id="our-story">
      <div className="container container--wide">
        <SectionHeader
          eyebrow="Our story"
          title={<>From a single visit, to a <em>statewide team</em>.</>}
          description="Eight years of compounding clinical decisions, infrastructure investments and family relationships."
        />

        <ScrollReveal childSelector=".about-timeline__item" stagger={0.08} className="about-timeline__list">
          <span className="about-timeline__rail" aria-hidden="true" />
          {MILESTONES.map((m, i) => {
            const Icon = m.icon;
            return (
              <article key={m.year} className={`about-timeline__item about-timeline__item--${i % 2 === 0 ? "left" : "right"}`}>
                <div className="about-timeline__node" aria-hidden="true">
                  <span className="about-timeline__node-dot" />
                </div>
                <div className="about-timeline__card">
                  <header className="about-timeline__card-head">
                    <span className="about-timeline__icon"><Icon size={18} /></span>
                    <span className="about-timeline__year">{m.year}</span>
                    {m.highlight && <span className="about-timeline__chip">{m.highlight}</span>}
                  </header>
                  <h3 className="about-timeline__title">{m.title}</h3>
                  <p className="about-timeline__desc">{m.description}</p>
                </div>
              </article>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
