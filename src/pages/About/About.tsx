import { useMemo, useState } from "react";
import { Heart, Target, Compass, Users, Sparkles, Award, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { BadgeTrust } from "@/components/BadgeTrust/BadgeTrust";
import { CTABand } from "@/sections/CTABand/CTABand";
import { StatsBand } from "@/sections/StatsBand/StatsBand";
import { AboutTimeline } from "@/sections/AboutTimeline/AboutTimeline";
import { AboutPress } from "@/sections/AboutPress/AboutPress";
import { AboutMedicalBoard } from "@/sections/AboutMedicalBoard/AboutMedicalBoard";
import { TEAM } from "@/data/team";
import type { TeamDepartment } from "@/types";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import { cn } from "@/utils/cn";
import "./About.scss";

const VALUES = [
  {
    icon: Heart,
    title: "Compassion first",
    description:
      "Care that treats the whole human, not just the diagnosis. Every visit starts with presence — and ends with a plan the family understands.",
  },
  {
    icon: Target,
    title: "Outcomes obsessed",
    description:
      "Every plan is measured. We share visit-by-visit data with patients, physicians and plan partners so the work never hides.",
  },
  {
    icon: Compass,
    title: "Clinically-led",
    description:
      "Medical decisions are made by clinicians and evidence — not spreadsheets. Our medical board reviews every protocol we ship.",
  },
  {
    icon: Users,
    title: "Family at the center",
    description:
      "We build the plan with you, not around you. Caregivers are partners — coached, supported and never left in the dark.",
  },
];

const DEPARTMENTS: Array<TeamDepartment | "All"> = ["All", "Clinical", "Operations", "Leadership"];

export default function About() {
  useSeo({
    title: "About Plexify Health | Mission, Team & Clinical Board",
    description:
      "Meet the clinicians and operators behind Plexify Health — a Medicare-certified home health agency serving California since 2018, with a standing medical board and 240+ clinicians.",
    canonical: "https://plexifyhealth.com/about",
    jsonLd: [
      buildBreadcrumbLd([
        { name: "Home", url: "https://plexifyhealth.com/" },
        { name: "About", url: "https://plexifyhealth.com/about" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Plexify Health",
        url: "https://plexifyhealth.com",
        logo: "https://plexifyhealth.com/favicon.svg",
        foundingDate: "2018",
        founder: {
          "@type": "Person",
          name: "Dr. Elena Marquez",
          jobTitle: "Chief Medical Officer & Co-founder",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "100 Wilshire Blvd, Suite 1200",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          postalCode: "90017",
          addressCountry: "US",
        },
        areaServed: { "@type": "State", name: "California" },
        sameAs: [
          "https://facebook.com/plexifyhealth",
          "https://instagram.com/plexifyhealth",
          "https://linkedin.com/company/plexifyhealth",
          "https://youtube.com/@plexifyhealth",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-555-010-2026",
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: ["English", "Spanish", "Tagalog"],
        },
      },
    ],
  });

  const [dept, setDept] = useState<TeamDepartment | "All">("All");

  const filteredTeam = useMemo(() => {
    if (dept === "All") return TEAM;
    return TEAM.filter((m) => m.department === dept);
  }, [dept]);

  return (
    <>
      {/* 1. Hero — editorial "letter from the team" */}
      <section className="about-hero" data-section="about-hero" id="about-hero">
        {/* Top magazine-style metadata strip */}
        <div className="about-hero__strip container container--wide">
          <span className="about-hero__strip-mark">
            <Sparkles size={11} /> Vol. 01
          </span>
          <span className="about-hero__strip-meta">Plexify Health · Established 2018, Los Angeles</span>
          <span className="about-hero__strip-date">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
        </div>

        <div className="container container--wide about-hero__main">
          <div className="about-hero__story">
            <span className="about-hero__chapter">Chapter 01 — The why</span>
            <h1 className="about-hero__title">
              We built the home health agency we'd want for <em>our own families.</em>
            </h1>
            <p className="about-hero__lede">
              Plexify started with a question every clinician we know has asked at some point: <em>"why doesn't home health feel like the rest of medicine yet?"</em> We assembled the team, the playbooks, and the technology to answer it — one visit, one family at a time.
            </p>

            <figure className="about-hero__signature">
              <img
                src="https://images.pexels.com/photos/4173324/pexels-photo-4173324.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="Dr. Elena Marquez"
                width="56"
                height="56"
                loading="eager"
                decoding="async"
              />
              <figcaption>
                <strong>Dr. Elena Marquez</strong>
                <em>Chief Medical Officer · Co-founder</em>
              </figcaption>
            </figure>

            <div className="about-hero__badges">
              <BadgeTrust label="Medicare Certified" sublabel="Since 2018" />
              <BadgeTrust label="CHAP Accredited" sublabel="Re-cert 2025" />
              <BadgeTrust label="Joint Commission" sublabel="Disease-specific" />
            </div>

            <ul className="about-hero__meta">
              <li><MapPin size={14} /> 5 California regions</li>
              <li><Users size={14} /> 240+ clinicians on staff</li>
              <li><Award size={14} /> 5-star CMS quality</li>
            </ul>
          </div>

          <div className="about-hero__collage" aria-hidden="true">
            <figure className="about-hero__photo about-hero__photo--main">
              <img
                src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt=""
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="900"
                height="1200"
              />
              <figcaption>
                <span>01 / Clinical leadership</span>
              </figcaption>
            </figure>

            <figure className="about-hero__photo about-hero__photo--secondary">
              <img
                src="https://images.pexels.com/photos/7551621/pexels-photo-7551621.jpeg?auto=compress&cs=tinysrgb&w=720"
                alt=""
                loading="lazy"
                decoding="async"
                width="720"
                height="540"
              />
              <figcaption>
                <span>02 / In-home moments</span>
              </figcaption>
            </figure>

            <div className="about-hero__quote">
              <Sparkles size={12} aria-hidden="true" />
              <p>"Care that feels like family — because it kind of is."</p>
            </div>

            <div className="about-hero__since">
              <span className="about-hero__since-eyebrow">Founded</span>
              <strong>2018</strong>
              <span className="about-hero__since-meta">Los Angeles, CA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats band reused (non audience-aware) */}
      <StatsBand audienceAware={false} />

      {/* 3. Our story timeline */}
      <AboutTimeline />

      {/* 4. Mission + Values */}
      <section className="about-mission section" data-section="mission" id="mission">
        <div className="container container--wide">
          <div className="about-mission__layout">
            <div className="about-mission__statement">
              <span className="about-mission__eyebrow">Mission</span>
              <h2 className="about-mission__title">
                A home-health company that <em>earns its place</em> in your living room.
              </h2>
              <p>
                We exist to give every Californian the kind of clinical care, communication and compassion we'd want for our own parents. That means rigorous medicine, transparent outcomes, and clinicians who are paid, trained and supported well enough to stay for the long run.
              </p>
              <p>
                We measure ourselves on the things that actually matter: did the patient get better, did the family feel respected, did the physician get the data they needed?
              </p>
            </div>
            <ScrollReveal childSelector=".value-card" stagger={0.08} className="about-values__grid">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="value-card">
                    <span className="value-card__icon"><Icon size={22} /></span>
                    <h3>{v.title}</h3>
                    <p>{v.description}</p>
                  </div>
                );
              })}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Team grid with department filter */}
      <section className="about-team section section--bg-mist" data-section="team" id="team">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Our team"
            title={<>Clinicians and operators, <em>in equal measure</em>.</>}
            description="MDs, RNs, therapists and operators who've spent careers in hospitals, agencies and health systems — building one home where they all play nicely."
          />

          <div className="about-team__filters" role="tablist" aria-label="Filter team by department">
            {DEPARTMENTS.map((d) => (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={dept === d}
                className={cn("about-team__chip", dept === d && "is-active")}
                onClick={() => setDept(d)}
              >
                {d}
                <span className="about-team__chip-count">
                  {d === "All" ? TEAM.length : TEAM.filter((m) => m.department === d).length}
                </span>
              </button>
            ))}
          </div>

          <ScrollReveal key={dept} childSelector=".team-card" stagger={0.06} className="about-team__grid">
            {filteredTeam.map((m) => (
              <article key={m.name} className="team-card">
                <div className="team-card__photo">
                  <img
                    src={m.image}
                    alt={`Photo of ${m.name}, ${m.role} at Plexify Health`}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="600"
                  />
                  {m.department && <span className="team-card__dept">{m.department}</span>}
                </div>
                <h3>{m.name}</h3>
                <span className="team-card__role">{m.role}</span>
                {m.credentials && (
                  <ul className="team-card__creds">
                    {m.credentials.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                )}
                <p>{m.bio}</p>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Press / awards strip */}
      <AboutPress />

      {/* 7. Medical board */}
      <AboutMedicalBoard />

      {/* 8. CTA */}
      <CTABand />
    </>
  );
}
