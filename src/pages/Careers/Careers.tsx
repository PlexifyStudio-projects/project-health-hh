import { useEffect, useMemo, useState } from "react";
import {
  Briefcase, GraduationCap, Heart, DollarSign, ArrowRight,
  Phone, ClipboardCheck, FileText, HeartHandshake, MapPin, Clock,
} from "lucide-react";
import { Button } from "@/components/Button/Button";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { TestimonialsCarousel } from "@/sections/TestimonialsCarousel/TestimonialsCarousel";
import { CTABand } from "@/sections/CTABand/CTABand";
import { useAudience } from "@/lib/audience";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import { cn } from "@/utils/cn";
import "./Careers.scss";

const PERKS = [
  { icon: DollarSign,    title: "Top-of-market pay",          description: "Competitive base + sign-on bonuses for hard-to-fill geographies and specialties." },
  { icon: GraduationCap, title: "Free CEUs",                  description: "All clinical staff get free continuing education and specialty certifications." },
  { icon: Heart,         title: "Culture that respects you",  description: "Real mentorship, manageable caseloads, and admin support — so you can be a clinician." },
  { icon: Briefcase,     title: "1099 & W2 paths",            description: "Choose what fits your life. Both come with admin tools, scheduling and onboarding." },
];

interface Role {
  title: string;
  location: string;
  type: string;
  discipline: "RN" | "LVN" | "PT" | "OT" | "ST" | "HHA" | "Admin";
}
const ROLES: Role[] = [
  { title: "Registered Nurse (RN) — Visiting",     location: "Greater LA",            type: "W2 or 1099, Full-time", discipline: "RN" },
  { title: "Licensed Vocational Nurse (LVN)",      location: "Orange County",         type: "W2, Full-time",         discipline: "LVN" },
  { title: "RN Case Manager",                      location: "San Fernando Valley",   type: "W2, Full-time",         discipline: "RN" },
  { title: "Physical Therapist (PT)",              location: "San Fernando Valley",   type: "1099, PRN",             discipline: "PT" },
  { title: "Occupational Therapist (OT)",          location: "Inland Empire",         type: "W2, Full-time",         discipline: "OT" },
  { title: "Speech-Language Pathologist (ST)",     location: "Greater LA",            type: "1099, PRN",             discipline: "ST" },
  { title: "Home Health Aide (CHHA)",              location: "All regions",           type: "W2, Full or part-time", discipline: "HHA" },
  { title: "Clinical Admissions Coordinator",      location: "Los Angeles HQ",        type: "W2, Full-time",         discipline: "Admin" },
  { title: "Referral Liaison",                     location: "Ventura County",        type: "W2, Full-time",         discipline: "Admin" },
];

type DiscFilter = "All" | Role["discipline"];
const DISCIPLINES: Array<{ id: DiscFilter; label: string }> = [
  { id: "All",   label: "All disciplines" },
  { id: "RN",    label: "RN" },
  { id: "LVN",   label: "LVN" },
  { id: "PT",    label: "PT" },
  { id: "OT",    label: "OT" },
  { id: "ST",    label: "ST" },
  { id: "HHA",   label: "HHA" },
  { id: "Admin", label: "Admin" },
];

const PROCESS_STEPS = [
  { icon: FileText,        day: "Day 0",     title: "Quick application",     description: "5-minute online form. Upload your license and resume — that's it. No essays, no marathon tests." },
  { icon: Phone,           day: "48 hours",  title: "Clinical conversation", description: "30-minute call with our Director of Clinical Ops. Real clinician asking real questions." },
  { icon: ClipboardCheck,  day: "Week 1",    title: "Match & onboard",       description: "Mentor pairing, specialty area and a caseload tailored to your goals — not the other way around." },
  { icon: HeartHandshake,  day: "Day 1+",    title: "First visit & beyond",  description: "Day-one shadow with a senior clinician. Quarterly clinical rounds. Free CEUs for life." },
];

const COLLAGE = [
  { src: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=900", caption: "Morning rounds in Pasadena" },
  { src: "https://images.pexels.com/photos/4173324/pexels-photo-4173324.jpeg?auto=compress&cs=tinysrgb&w=900", caption: "Patient ride-along, Glendale" },
  { src: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=900", caption: "CEU session at HQ" },
  { src: "https://images.pexels.com/photos/6749774/pexels-photo-6749774.jpeg?auto=compress&cs=tinysrgb&w=900", caption: "Therapy team huddle" },
];

export default function Careers() {
  const [discipline, setDiscipline] = useState<DiscFilter>("All");
  const { setActive } = useAudience();

  // Switch site to "nurse" audience while on Careers
  useEffect(() => { setActive("nurse"); }, [setActive]);

  useSeo({
    title: "Home Health Careers in California | Plexify Health",
    description:
      "RN, LVN, PT, OT, ST and HHA careers across California — top-of-market pay, free CEUs, real mentorship and W2 or 1099 paths at Plexify Health.",
    canonical: "https://plexifyhealth.com/careers",
    jsonLd: [
      buildBreadcrumbLd([
        { name: "Home", url: "https://plexifyhealth.com/" },
        { name: "Careers", url: "https://plexifyhealth.com/careers" },
      ]),
      ...ROLES.map((r) => ({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: r.title,
        description: `${r.title} role at Plexify Health, a Medicare-certified home health agency in California. ${r.type}. Top-of-market pay, free CEUs and real mentorship.`,
        employmentType: r.type.toLowerCase().includes("part") ? "PART_TIME" : "FULL_TIME",
        datePosted: "2026-01-01",
        validThrough: "2026-12-31",
        hiringOrganization: {
          "@type": "Organization",
          name: "Plexify Health",
          sameAs: "https://plexifyhealth.com",
          logo: "https://plexifyhealth.com/favicon.svg",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: r.location,
            addressRegion: "CA",
            addressCountry: "US",
          },
        },
        applicantLocationRequirements: {
          "@type": "Country",
          name: "USA",
        },
        directApply: true,
      })),
    ],
  });

  const roles = useMemo(
    () => (discipline === "All" ? ROLES : ROLES.filter((r) => r.discipline === discipline)),
    [discipline]
  );

  return (
    <>
      <section className="careers-hero">
        <div className="container container--wide">
          <div className="careers-hero__content">
            <span className="careers-hero__eyebrow">Careers</span>
            <h1>Build the career <em>you got into nursing for</em>.</h1>
            <p>Real mentorship, real respect, real pay. Join a clinically-led team where you're treated like a clinician — not a billing line.</p>

            <div className="careers-hero__actions">
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={16} />}
                onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                See open roles
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                How hiring works
              </Button>
            </div>

            <ul className="careers-hero__pills" aria-label="Quick facts">
              <li>18% above market pay</li>
              <li>3.4y avg tenure</li>
              <li>50+ free CEUs / year</li>
              <li>Mentor on day one</li>
            </ul>
          </div>
          <div className="careers-hero__media" aria-hidden="true">
            <img
              src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1280"
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1280"
              height="853"
            />
          </div>
        </div>
      </section>

      <section className="careers-perks section section--bg-mist">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Why Plexify"
            title={<>Built for clinicians, <em>by clinicians</em>.</>}
            description="Our CMO and Director of Clinical Ops both came from the field. Every policy is run past clinicians before it ships."
          />
          <ScrollReveal childSelector=".perk-card" stagger={0.08} className="careers-perks__grid">
            {PERKS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="perk-card">
                  <span className="perk-card__icon"><Icon size={22} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* Day in the life — collage */}
      <section className="careers-day section">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="A day in the life"
            title={<>Real visits, <em>real moments</em>.</>}
            description="No stock photos. Snippets from a typical week with our Plexify clinicians across California."
          />
          <div className="careers-day__collage" role="list">
            {COLLAGE.map((c, i) => (
              <figure key={c.src} className={`careers-day__tile careers-day__tile--${i + 1}`} role="listitem">
                <img src={c.src} alt={c.caption} loading="lazy" />
                <figcaption>{c.caption}</figcaption>
              </figure>
            ))}
            <div className="careers-day__quote">
              <span><Heart size={14} /> What our team says</span>
              <p>"It's the first agency where my CMO actually answers texts about clinical edge cases — same day."</p>
              <cite>— James O., RN</cite>
            </div>
          </div>
        </div>
      </section>

      <section className="careers-roles section section--bg-mist" id="open-roles" data-section="open-roles">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Open roles"
            title={<>We're hiring across <em>every discipline</em>.</>}
            description="Filter by your specialty — or browse them all. Every listing is real and confirmed by our hiring team."
          />

          <div className="careers-roles__filters" role="tablist" aria-label="Filter open roles by discipline">
            {DISCIPLINES.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={discipline === d.id}
                className={cn("careers-roles__filter", discipline === d.id && "is-active")}
                onClick={() => setDiscipline(d.id)}
              >
                {d.label}
              </button>
            ))}
          </div>

          {roles.length === 0 ? (
            <div className="careers-roles__empty">
              <p>No roles in that discipline right now — but send your resume anyway.</p>
              <Button to="/contact" variant="outline" iconRight={<ArrowRight size={14} />}>Talk to recruiting</Button>
            </div>
          ) : (
            <ul className="careers-roles__list">
              {roles.map((r) => (
                <li key={r.title} className="role-row">
                  <div className="role-row__main">
                    <h3>{r.title}</h3>
                    <p>
                      <span><MapPin size={12} /> {r.location}</span>
                      <span><Clock size={12} /> {r.type}</span>
                      <span className="role-row__chip">{r.discipline}</span>
                    </p>
                  </div>
                  <Button to="/contact" variant="outline" iconRight={<ArrowRight size={14} />}>Apply</Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Application process */}
      <section className="careers-process section" id="process">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="How hiring works"
            title={<>From application — <em>to first visit</em>.</>}
            description="No recruiter games. No marathon process. Most clinicians are matched within two weeks."
          />
          <ol className="careers-process__list" aria-label="4-step hiring process">
            <span className="careers-process__line" aria-hidden="true" />
            {PROCESS_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="careers-process__step">
                  <span className="careers-process__dot" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <div>
                    <span className="careers-process__num">Step {String(i + 1).padStart(2, "0")}</span>
                    <span className="careers-process__chip">{s.day}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* What our nurses say — audience-aware (we set active=nurse on mount) */}
      <TestimonialsCarousel />

      <CTABand
        title={<>Don't see your role? <em>Talk to us</em>.</>}
        description="We're always meeting great clinicians. Send your resume and we'll find a fit."
        audienceAware={false}
      />
    </>
  );
}
