import { Hero } from "@/sections/Hero/Hero";
import { TrustBand } from "@/sections/TrustBand/TrustBand";
import { AudienceGrid } from "@/sections/AudienceGrid/AudienceGrid";
import { ServicesShowcase } from "@/sections/ServicesShowcase/ServicesShowcase";
import { ProcessTimeline } from "@/sections/ProcessTimeline/ProcessTimeline";
import { StatsBand } from "@/sections/StatsBand/StatsBand";
import { TestimonialsCarousel } from "@/sections/TestimonialsCarousel/TestimonialsCarousel";
import { CoverageMap } from "@/sections/CoverageMap/CoverageMap";
import { ResourcesPreview } from "@/sections/ResourcesPreview/ResourcesPreview";
import { FAQAccordion } from "@/sections/FAQAccordion/FAQAccordion";
import { CTABand } from "@/sections/CTABand/CTABand";
import { useSeo } from "@/lib/seo";

export default function Home() {
  useSeo({
    title: "Plexify Health | Home Health Care in California",
    description:
      "Skilled nursing, therapy and compassionate home health care delivered home across Greater LA and California. Medicare, Medi-Cal and most plans accepted.",
    canonical: "https://plexifyhealth.com/",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Plexify Health",
      url: "https://plexifyhealth.com/",
      inLanguage: "en-US",
      publisher: {
        "@type": "Organization",
        name: "Plexify Health",
        logo: {
          "@type": "ImageObject",
          url: "https://plexifyhealth.com/favicon.svg",
        },
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://plexifyhealth.com/resources?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  });

  return (
    <>
      <Hero />
      <TrustBand />
      <ServicesShowcase />
      <AudienceGrid />
      <ProcessTimeline />
      <StatsBand />
      <TestimonialsCarousel />
      <CoverageMap />
      <ResourcesPreview />
      <FAQAccordion limit={5} />
      <CTABand />
    </>
  );
}
