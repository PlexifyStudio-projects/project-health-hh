import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ShieldCheck, HeartPulse, Sparkles, Users, Compass } from "lucide-react";
import { AudienceGrid } from "@/sections/AudienceGrid/AudienceGrid";
import { CTABand } from "@/sections/CTABand/CTABand";
import { TestimonialsCarousel } from "@/sections/TestimonialsCarousel/TestimonialsCarousel";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { StatCounter } from "@/components/StatCounter/StatCounter";
import { Button } from "@/components/Button/Button";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import { AUDIENCES } from "@/data/audiences";
import "./ForYouHub.scss";

const HUB_STATS = [
  { value: 15,  suffix: "K+", label: "Lives touched",       description: "Patients & families served since 2018" },
  { value: 5,   suffix: "",   label: "Audiences served",    description: "End-to-end across the journey" },
  { value: 24,  suffix: "/7", label: "Always-on support",   description: "Phone, online, in-person" },
  { value: 100, suffix: "%",  label: "Built for everyone",  description: "Not bolted on after the fact" },
];

const PILLARS = [
  {
    icon: HeartPulse,
    title: "Clinically led",
    description: "Every audience touchpoint is reviewed by our CMO and Director of Clinical Ops — not a marketing team alone.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-first",
    description: "HIPAA, Joint Commission, CMS — your data, your patients and your contracts are handled by people who know the rules.",
  },
  {
    icon: Sparkles,
    title: "Outcomes obsessed",
    description: "Readmissions, satisfaction, HEDIS, retention — we report quarterly and improve every cycle.",
  },
  {
    icon: Users,
    title: "Five voices, one platform",
    description: "Patient, caregiver, referrer, payer, owner — each gets their own personalized view, copy and stats.",
  },
  {
    icon: Compass,
    title: "Real human path",
    description: "Sixty-second forms, 48-hour follow-ups, real clinicians answering the phone. No bots, no maze.",
  },
];

const QUICK_LINKS = [
  { to: "/for-you/patients",   label: "I'm a patient or family",  desc: "Start a free in-home assessment" },
  { to: "/for-you/caregivers", label: "I'm a clinician",          desc: "RN, LVN, PT, OT, ST, HHA careers" },
  { to: "/for-you/referrals",  label: "I refer patients",         desc: "Hospitals, MDs, SNFs, case mgmt" },
  { to: "/for-you/insurance",  label: "I run a health plan",      desc: "Network, HEDIS & Stars" },
  { to: "/for-you/owners",     label: "I run an HH agency",       desc: "JV, MSO and growth partnerships" },
];

export default function ForYouHub() {
  useSeo({
    title: "Built for Everyone | Plexify Health Home Health Care",
    description:
      "Patients, caregivers, referrals, insurance partners and agency owners — Plexify Health is built for every audience in the California home health journey.",
    canonical: "https://plexifyhealth.com/for-you",
    jsonLd: [
      buildBreadcrumbLd([
        { name: "Home", url: "https://plexifyhealth.com/" },
        { name: "For You", url: "https://plexifyhealth.com/for-you" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Plexify Health audiences",
        itemListElement: AUDIENCES.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: a.title,
          url: `https://plexifyhealth.com/for-you/${a.key}`,
        })),
      },
    ],
  });

  return (
    <>
      <section className="for-you-hero">
        <div className="container container--wide">
          <span className="for-you-hero__eyebrow">For You</span>
          <h1>Find your <em>path through home health</em>.</h1>
          <p>Whether you're a patient or caregiver, a hospital or insurance partner, or an agency leader — start where you are. Pick the door that fits you, and we'll personalize the entire site.</p>

          <ul className="for-you-hero__quicks" aria-label="Quick paths">
            {QUICK_LINKS.map((q) => (
              <li key={q.to}>
                <Link to={q.to} className="for-you-hero__quick">
                  <span className="for-you-hero__quick-label">{q.label}</span>
                  <span className="for-you-hero__quick-desc">{q.desc}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AudienceGrid />

      <section className="for-you-stats section">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="By the numbers · For everyone"
            title={<>One platform, <em>five audiences</em>, real results.</>}
            description="The same operation that admits a Medicare patient on a Saturday answers a payer's HEDIS question on Monday. Numbers that hold up across every door."
          />
          <ScrollReveal childSelector=".for-you-stats__item" stagger={0.1} className="for-you-stats__list">
            {HUB_STATS.map((s, i) => (
              <div key={s.label} className="for-you-stats__item">
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} description={s.description} index={i} />
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="for-you-why section section--bg-mist">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Why Plexify, for everyone"
            title={<>Five reasons every audience <em>stays with us</em>.</>}
            description="Each pillar shows up differently for patients vs. payers vs. owners — but they all sit on the same operational backbone."
          />
          <ScrollReveal childSelector=".for-you-why__card" stagger={0.08} className="for-you-why__grid">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="for-you-why__card">
                  <span className="for-you-why__icon" aria-hidden="true"><Icon size={22} /></span>
                  <h3 className="for-you-why__title">{p.title}</h3>
                  <p className="for-you-why__desc">{p.description}</p>
                </article>
              );
            })}
          </ScrollReveal>

          <div className="for-you-why__cta">
            <Button to="/about" variant="outline" iconRight={<ArrowRight size={14} />}>How we built Plexify</Button>
          </div>
        </div>
      </section>

      <TestimonialsCarousel audienceAware={false} />

      <CTABand />
    </>
  );
}
