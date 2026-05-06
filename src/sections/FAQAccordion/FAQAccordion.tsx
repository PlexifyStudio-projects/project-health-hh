import { FAQ } from "@/data/faq";
import { Accordion } from "@/components/Accordion/Accordion";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Button } from "@/components/Button/Button";
import { ArrowRight } from "lucide-react";
import { useAudience } from "@/lib/audience";
import { AUDIENCE_CONTENT } from "@/data/audience-content";
import "./FAQAccordion.scss";

interface Props {
  limit?: number;
  category?: "patient" | "referral" | "insurance" | "career";
  /** When true (default), category is taken from active audience. */
  audienceAware?: boolean;
}

export function FAQAccordion({ limit, category, audienceAware = true }: Props) {
  const { active } = useAudience();
  const audienceCategory = AUDIENCE_CONTENT[active].faqCategory;
  const audienceLabel = AUDIENCE_CONTENT[active].audienceLabel;

  const effectiveCategory = category ?? (audienceAware ? audienceCategory : undefined);
  const items = (effectiveCategory ? FAQ.filter((f) => f.category === effectiveCategory) : FAQ).slice(0, limit ?? FAQ.length);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="faq-accordion section section--bg-cream" data-section="faq" id="faq">
      <div className="container container--narrow">
        <SectionHeader
          eyebrow={audienceAware ? `Questions for ${audienceLabel.toLowerCase()}` : "Questions, answered"}
          title={<>The questions we hear <em>most</em>.</>}
          description={audienceAware
            ? `The most common things ${audienceLabel.toLowerCase()} ask Plexify.`
            : "Quick answers about coverage, eligibility, referrals, and joining our care team."}
        />

        <Accordion items={items.map((f) => ({ question: f.question, answer: f.answer }))} />

        <div className="faq-accordion__footer">
          <p>Don't see your question?</p>
          <Button to="/faq" variant="outline" iconRight={<ArrowRight size={16} />}>
            Read full FAQ
          </Button>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
