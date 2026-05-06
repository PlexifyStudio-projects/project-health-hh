import { useParams, Link, Navigate } from "react-router-dom";
import {
  Check, ArrowRight, Stethoscope, Activity, Hand, Mic, HandHeart, HeartHandshake,
  ArrowLeft, TrendingUp,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { Button } from "@/components/Button/Button";
import { CTABand } from "@/sections/CTABand/CTABand";
import { FAQAccordion } from "@/sections/FAQAccordion/FAQAccordion";
import { ServiceQualifies } from "@/sections/ServiceQualifies/ServiceQualifies";
import { ServiceJourney } from "@/sections/ServiceJourney/ServiceJourney";
import { ServiceSpecialties } from "@/sections/ServiceSpecialties/ServiceSpecialties";
import { ServiceCoverage } from "@/sections/ServiceCoverage/ServiceCoverage";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import "./ServiceDetail.scss";

const ICONS: Record<string, React.ElementType> = { Stethoscope, Activity, Hand, Mic, HandHeart, HeartHandshake };

// Per-service SEO meta — concise, unique, optimized lengths.
const SEO_META: Record<string, { title: string; description: string }> = {
  "skilled-nursing": {
    title: "Skilled Nursing at Home in California | Plexify Health",
    description:
      "RN/LVN-led skilled nursing at home: medication management, wound care, IV therapy, post-surgical recovery and chronic disease care across California.",
  },
  "physical-therapy": {
    title: "Home Physical Therapy in California | Plexify Health",
    description:
      "In-home physical therapy across California: post-surgical rehab, fall prevention, balance training and pain management by licensed PTs. Medicare covered.",
  },
  "occupational-therapy": {
    title: "In-Home Occupational Therapy in CA | Plexify Health",
    description:
      "In-home occupational therapy across California: ADL training, home modifications, cognitive rehab and adaptive equipment. Covered by Medicare and Medi-Cal.",
  },
  "speech-therapy": {
    title: "Speech Therapy at Home in California | Plexify Health",
    description:
      "In-home speech-language therapy: aphasia, dysphagia (swallowing), cognitive-communication and voice treatment by licensed SLPs across California.",
  },
  "medical-social-work": {
    title: "Medical Social Work at Home in CA | Plexify Health",
    description:
      "Licensed clinical social workers connect patients and families to community resources, advance care planning and benefits navigation across California.",
  },
  "home-health-aide": {
    title: "Home Health Aide Services in California | Plexify Health",
    description:
      "Certified home health aides for bathing, grooming, mobility and companionship — under nursing supervision and the Plexify plan of care across California.",
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  const meta = service ? SEO_META[service.slug] : undefined;

  useSeo({
    title:
      meta?.title ??
      (service ? `${service.title} | Plexify Health` : "Service | Plexify Health"),
    description:
      meta?.description ??
      service?.description ??
      "Plexify Health home health services across California.",
    canonical: `https://plexifyhealth.com/services/${slug}`,
    ogImage: service?.image,
    jsonLd: service
      ? [
          buildBreadcrumbLd([
            { name: "Home", url: "https://plexifyhealth.com/" },
            { name: "Services", url: "https://plexifyhealth.com/services" },
            {
              name: service.title,
              url: `https://plexifyhealth.com/services/${service.slug}`,
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            name: service.title,
            description: service.description,
            image: service.image,
            url: `https://plexifyhealth.com/services/${service.slug}`,
            procedureType: "https://schema.org/TherapeuticProcedure",
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: service.title,
            name: service.title,
            description: service.description,
            image: service.image,
            url: `https://plexifyhealth.com/services/${service.slug}`,
            category: service.category,
            areaServed: { "@type": "State", name: "California" },
            provider: {
              "@type": "MedicalBusiness",
              name: "Plexify Health",
              url: "https://plexifyhealth.com/",
              telephone: "+1-555-010-2026",
              address: {
                "@type": "PostalAddress",
                streetAddress: "100 Wilshire Blvd, Suite 1200",
                addressLocality: "Los Angeles",
                addressRegion: "CA",
                postalCode: "90017",
                addressCountry: "US",
              },
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${service.title} — included care components`,
              itemListElement: service.features.map((f) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: f },
              })),
            },
          },
        ]
      : undefined,
  });

  if (!service) return <Navigate to="/services" replace />;

  const Icon = ICONS[service.iconName] ?? Stethoscope;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      {/* 1. Hero */}
      <section className="service-detail-hero">
        <div className="container container--wide">
          <Link to="/services" className="service-detail-hero__back">
            <ArrowLeft size={14} /> All services
          </Link>
          <div className="service-detail-hero__grid">
            <div className="service-detail-hero__content">
              <div className="service-detail-hero__head">
                <span className="service-detail-hero__icon"><Icon size={28} /></span>
                {service.category && <span className="service-detail-hero__cat">{service.category}</span>}
              </div>
              <h1>{service.title}</h1>
              <p>{service.description}</p>

              {service.stat && (
                <div className="service-detail-hero__stat" aria-label={`${service.stat.label}: ${service.stat.value}`}>
                  <span className="service-detail-hero__stat-icon"><TrendingUp size={14} /></span>
                  <strong>{service.stat.value}</strong>
                  <em>{service.stat.label}</em>
                </div>
              )}

              <div className="service-detail-hero__ctas">
                <Button to="/refer-a-patient" variant="primary" iconRight={<ArrowRight size={16} />}>Refer a patient</Button>
                <Button to="/contact" variant="outline">Schedule consultation</Button>
              </div>
            </div>

            <div className="service-detail-hero__media">
              <img
                src={service.image}
                alt=""
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="1280"
                height="720"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features */}
      <section className="service-detail-features section section--bg-mist">
        <div className="container container--wide">
          <header className="service-detail-features__head">
            <span className="service-detail-features__eyebrow">What's included</span>
            <h2>Inside <em>{service.title}</em></h2>
            <p>Every component is delivered by a credentialed clinician under our RN-led plan of care.</p>
          </header>
          <ul className="service-detail-features__list">
            {service.features.map((f) => (
              <li key={f}><Check size={18} /> <span>{f}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Who qualifies */}
      {service.qualifiers && service.qualifiers.length > 0 && (
        <ServiceQualifies qualifiers={service.qualifiers} serviceTitle={service.title} />
      )}

      {/* 4. What to expect — visit/week timeline */}
      {service.timeline && service.timeline.length > 0 && (
        <ServiceJourney steps={service.timeline} serviceTitle={service.title} />
      )}

      {/* 5. Specialties within this discipline */}
      {service.specialties && service.specialties.length > 0 && (
        <ServiceSpecialties specialties={service.specialties} serviceTitle={service.title} />
      )}

      {/* 6. Insurance & coverage */}
      {service.coverage && service.coverage.length > 0 && (
        <ServiceCoverage coverage={service.coverage} serviceTitle={service.title} />
      )}

      {/* 7. Related services */}
      <section className="service-detail-related section">
        <div className="container container--wide">
          <header className="service-detail-related__head">
            <span className="service-detail-related__eyebrow">Related services</span>
            <h2>Often paired with <em>{service.title}</em></h2>
          </header>
          <div className="service-detail-related__grid">
            {others.map((s) => {
              const RIcon = ICONS[s.iconName] ?? Stethoscope;
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="service-detail-related__card">
                  <span className="service-detail-related__icon"><RIcon size={20} /></span>
                  <strong>{s.title}</strong>
                  <em>{s.short}</em>
                  <span className="service-detail-related__cta">
                    Explore <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <FAQAccordion limit={4} category="patient" />

      {/* 9. CTA */}
      <CTABand />
    </>
  );
}
