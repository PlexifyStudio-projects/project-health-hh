import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import type { ServiceQualifier } from "@/types";
import "./ServiceQualifies.scss";

interface Props {
  qualifiers: ServiceQualifier[];
  serviceTitle: string;
}

export function ServiceQualifies({ qualifiers, serviceTitle }: Props) {
  return (
    <section className="service-qualifies section" data-section="qualifies">
      <div className="container container--wide">
        <div className="service-qualifies__layout">
          <header className="service-qualifies__head">
            <span className="service-qualifies__eyebrow">Who qualifies</span>
            <h2 className="service-qualifies__title">
              You may qualify for {serviceTitle.toLowerCase()} if <em>any</em> of these apply.
            </h2>
            <p className="service-qualifies__sub">
              Most criteria are quickly verified by phone or with a doctor's note. We'll handle the rest with you.
            </p>
            <Button to="/verify-insurance" variant="primary" iconRight={<ArrowRight size={16} />}>Check my eligibility</Button>
          </header>

          <ScrollReveal as="ul" childSelector=".service-qualifies__item" stagger={0.06} className="service-qualifies__list">
            {qualifiers.map((q) => (
              <li key={q.label} className="service-qualifies__item">
                <span className="service-qualifies__check"><ShieldCheck size={18} /></span>
                <span className="service-qualifies__label">{q.label}</span>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
