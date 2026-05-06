import { useEffect, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import {
  Check, ArrowRight, ArrowLeft,
  HeartPulse, Briefcase, FileHeart, ShieldCheck, Building2,
  BadgeCheck, Plus,
} from "lucide-react";
import { AUDIENCES } from "@/data/audiences";
import { AUDIENCE_CONTENT } from "@/data/audience-content";
import { FAQ } from "@/data/faq";
import { Button } from "@/components/Button/Button";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Accordion } from "@/components/Accordion/Accordion";
import { CTABand } from "@/sections/CTABand/CTABand";
import { useAudience, type AudienceId } from "@/lib/audience";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import { PatientsBlueprint }   from "./blueprints/PatientsBlueprint";
import { CaregiversBlueprint } from "./blueprints/CaregiversBlueprint";
import { ReferralsBlueprint }  from "./blueprints/ReferralsBlueprint";
import { InsuranceBlueprint }  from "./blueprints/InsuranceBlueprint";
import { OwnersBlueprint }     from "./blueprints/OwnersBlueprint";
import "./AudienceDetail.scss";

const ICONS: Record<string, React.ElementType> = { HeartPulse, Briefcase, FileHeart, ShieldCheck, Building2 };

const BLUEPRINTS: Record<string, React.ElementType> = {
  patients:   PatientsBlueprint,
  caregivers: CaregiversBlueprint,
  referrals:  ReferralsBlueprint,
  insurance:  InsuranceBlueprint,
  owners:     OwnersBlueprint,
};

// Map AudienceKey (URL slug) → AudienceId (context)
const KEY_TO_ID: Record<string, AudienceId> = {
  patients:   "patient",
  caregivers: "nurse",
  referrals:  "referral",
  insurance:  "insurance",
  owners:     "owner",
};

// Per-audience SEO meta — uniquely targeted titles & descriptions.
const AUDIENCE_SEO: Record<string, { title: string; description: string }> = {
  patients: {
    title: "Home Health for Patients & Families | Plexify Health",
    description:
      "Heal at home with Medicare-covered skilled nursing, therapy and home health aide care across California. Same-day intake and bilingual care teams.",
  },
  caregivers: {
    title: "Home Health Nursing Careers in California | Plexify Health",
    description:
      "RN, LVN, PT, OT, ST and HHA careers across California. Top-of-market pay, free CEUs, real mentorship and flexible W2 or 1099 paths at Plexify Health.",
  },
  referrals: {
    title: "Refer Patients to Plexify Health | 60-Second Referrals",
    description:
      "Hospitals, physicians, SNFs and case managers refer in 60 seconds. Same-day admit confirmation and shared outcome dashboards across California.",
  },
  insurance: {
    title: "Home Health for Health Plans & Payers | Plexify Health",
    description:
      "Outcomes-driven home health that lifts HEDIS, Star Ratings and reduces readmissions 30%. Value-based contracting and real-time reporting across California.",
  },
  owners: {
    title: "For Home Health Agency Owners & CEOs | Plexify Health",
    description:
      "Scale your California home health operation with on-demand staffing, compliance playbooks, EMR integrations and JV/MSO partnership models.",
  },
};

export default function AudienceDetail() {
  const { slug } = useParams();
  const audience = AUDIENCES.find((a) => a.key === slug);
  const { setActive } = useAudience();

  // Sync audience context when route opens
  useEffect(() => {
    if (slug && KEY_TO_ID[slug]) setActive(KEY_TO_ID[slug]);
  }, [slug, setActive]);

  const seo = slug ? AUDIENCE_SEO[slug] : undefined;

  useSeo({
    title:
      seo?.title ??
      (audience ? `${audience.title} | Plexify Health` : "For You | Plexify Health"),
    description:
      seo?.description ?? audience?.description ?? "Plexify Health for every audience.",
    canonical: `https://plexifyhealth.com/for-you/${slug}`,
    ogImage: audience?.image,
    jsonLd: audience
      ? buildBreadcrumbLd([
          { name: "Home", url: "https://plexifyhealth.com/" },
          { name: "For You", url: "https://plexifyhealth.com/for-you" },
          {
            name: audience.title,
            url: `https://plexifyhealth.com/for-you/${audience.key}`,
          },
        ])
      : undefined,
  });

  const audienceId = slug ? KEY_TO_ID[slug] : undefined;
  const content = audienceId ? AUDIENCE_CONTENT[audienceId] : undefined;
  const audienceFaq = useMemo(
    () => (content ? FAQ.filter((f) => f.category === content.faqCategory) : []),
    [content]
  );
  const Blueprint = slug ? BLUEPRINTS[slug] : null;

  if (!audience || !audienceId || !content || !Blueprint) return <Navigate to="/for-you" replace />;
  const Icon = ICONS[audience.iconName] ?? HeartPulse;

  return (
    <>
      <section className={`audience-detail-hero audience-detail-hero--${audience.accent}`}>
        <div className="container container--wide">
          <Link to="/for-you" className="audience-detail-hero__back">
            <ArrowLeft size={14} /> All audiences
          </Link>
          <div className="audience-detail-hero__grid">
            <div>
              <span className="audience-detail-hero__icon"><Icon size={26} /></span>
              <span className="audience-detail-hero__eyebrow">For {audience.title.toLowerCase()}</span>
              <h1>{audience.tagline}</h1>
              <p>{audience.description}</p>

              <ul className="audience-detail-hero__chips" aria-label="What's true here">
                {audience.benefits.slice(0, 4).map((b) => (
                  <li key={b}><Check size={14} aria-hidden="true" /> {b}</li>
                ))}
              </ul>

              <div className="audience-detail-hero__actions">
                <Button to={audience.cta.to} variant="primary" iconRight={<ArrowRight size={16} />}>
                  {audience.cta.label}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  See what you get
                </Button>
              </div>
            </div>
            <div className="audience-detail-hero__media">
              <img
                src={audience.image}
                alt=""
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="1280"
                height="720"
              />
              <span className="audience-detail-hero__badge">
                <BadgeCheck size={14} /> {content.trustBadges[0]}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Audience-specific blueprint — 100% unique sections per slug */}
      <div id="features">
        <Blueprint />
      </div>

      {/* Universal FAQ + CTA tail (filtered to audience) */}
      <section className="audience-faq section">
        <div className="container container--narrow">
          <SectionHeader
            eyebrow={`FAQ · For ${audience.title.toLowerCase()}`}
            title={<>The questions <em>we hear most</em>.</>}
          />
          {audienceFaq.length > 0 ? (
            <Accordion items={audienceFaq.map((f) => ({ question: f.question, answer: f.answer }))} />
          ) : (
            <p className="audience-faq__empty">
              <Plus size={14} /> See our full FAQ across audiences <Link to="/faq">here</Link>.
            </p>
          )}
          <div className="audience-faq__footer">
            <Button to="/faq" variant="outline" iconRight={<ArrowRight size={14} />}>
              Read full FAQ
            </Button>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
