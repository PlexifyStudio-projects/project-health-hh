import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Stethoscope, Activity, Hand, Mic, HandHeart, HeartHandshake,
  Check, TrendingUp, Sparkles,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { CTABand } from "@/sections/CTABand/CTABand";
import { ServicesBundle } from "@/sections/ServicesBundle/ServicesBundle";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import { cn } from "@/utils/cn";
import type { ServiceCategory } from "@/types";
import "./Services.scss";

const ICONS: Record<string, React.ElementType> = { Stethoscope, Activity, Hand, Mic, HandHeart, HeartHandshake };

type Filter = "All" | ServiceCategory;

const FILTERS: Filter[] = ["All", "Nursing", "Therapy", "Aide", "Social"];

export default function Services() {
  useSeo({
    title: "Home Health Services in California | Plexify Health",
    description:
      "Skilled nursing, physical, occupational and speech therapy, medical social work and home health aide — coordinated by an RN-led team across California.",
    canonical: "https://plexifyhealth.com/services",
    jsonLd: [
      buildBreadcrumbLd([
        { name: "Home", url: "https://plexifyhealth.com/" },
        { name: "Services", url: "https://plexifyhealth.com/services" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Plexify Health home health services",
        itemListElement: SERVICES.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.short,
            url: `https://plexifyhealth.com/services/${s.slug}`,
            provider: {
              "@type": "MedicalBusiness",
              name: "Plexify Health",
              url: "https://plexifyhealth.com/",
            },
            areaServed: { "@type": "State", name: "California" },
          },
        })),
      },
    ],
  });

  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return SERVICES;
    return SERVICES.filter((s) => s.category === filter);
  }, [filter]);

  return (
    <>
      {/* 1. Hero */}
      <section className="services-page-hero" data-section="services-hero">
        <div className="container container--wide">
          <span className="services-page-hero__eyebrow"><Sparkles size={12} /> Services</span>
          <h1>Six clinical disciplines. <em>One coordinated team.</em></h1>
          <p>
            Every Plexify patient is supported by a multidisciplinary team — RN-led — that adapts the plan as you recover. Browse the disciplines below, or jump straight to <Link to="/refer-a-patient">referral</Link>.
          </p>

          <ul className="services-page-hero__highlights" aria-label="Quick stats">
            <li><strong>24/7</strong><span>Nursing line</span></li>
            <li><strong>24h</strong><span>Avg. admit time</span></li>
            <li><strong>30%</strong><span>Lower readmissions</span></li>
            <li><strong>5</strong><span>CA regions</span></li>
          </ul>
        </div>
      </section>

      {/* 2. Filter chips */}
      <section className="services-filters section section--tight" aria-label="Filter services" data-section="services-filters">
        <div className="container container--wide">
          <div className="services-filters__bar" role="tablist" aria-label="Filter services by category">
            {FILTERS.map((f) => {
              const count = f === "All" ? SERVICES.length : SERVICES.filter((s) => s.category === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === f}
                  className={cn("services-filters__chip", filter === f && "is-active")}
                  onClick={() => setFilter(f)}
                >
                  {f}
                  <span className="services-filters__chip-count">{count}</span>
                </button>
              );
            })}
          </div>
          <p className="services-filters__hint">
            Filter by clinical category — most patients receive <em>two or more</em> at once.
          </p>
        </div>
      </section>

      {/* 3. Service rows */}
      <section className="services-list section" data-section="services-list">
        <div className="container container--wide">
          <ScrollReveal key={filter} childSelector=".service-row" stagger={0.06}>
            {filtered.map((s, i) => {
              const Icon = ICONS[s.iconName] ?? Stethoscope;
              const reverse = i % 2 === 1;
              return (
                <article key={s.slug} className={cn("service-row", reverse && "service-row--reverse")}>
                  <div className="service-row__media">
                    <img
                      src={s.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width="1280"
                      height="720"
                    />
                    {s.stat && (
                      <div className="service-row__stat" aria-label={`${s.stat.label}: ${s.stat.value}`}>
                        <span className="service-row__stat-icon"><TrendingUp size={14} /></span>
                        <strong>{s.stat.value}</strong>
                        <em>{s.stat.label}</em>
                      </div>
                    )}
                  </div>
                  <div className="service-row__body">
                    <div className="service-row__head">
                      <span className="service-row__icon"><Icon size={22} /></span>
                      {s.category && <span className="service-row__cat">{s.category}</span>}
                    </div>
                    <h2>{s.title}</h2>
                    <p className="service-row__short">{s.short}</p>
                    <ul className="service-row__features">
                      {s.features.slice(0, 5).map((f) => (
                        <li key={f}><Check size={16} /> {f}</li>
                      ))}
                    </ul>
                    <div className="service-row__actions">
                      <Link to={`/services/${s.slug}`} className="service-row__cta">
                        Learn more about {s.title} <ArrowRight size={16} />
                      </Link>
                      <Link to="/refer-a-patient" className="service-row__cta service-row__cta--ghost">
                        Refer a patient
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
            {filtered.length === 0 && (
              <p className="services-list__empty">No services in this category.</p>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* 4. How services bundle together */}
      <ServicesBundle />

      {/* 5. CTA */}
      <CTABand />
    </>
  );
}
