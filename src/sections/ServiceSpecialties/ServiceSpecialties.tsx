import {
  Bandage, Syringe, Activity, Stethoscope, Footprints, Brain, HeartPulse,
  Hand, Eye, Home, MessageSquare, UtensilsCrossed, Mic, FileText,
  HeartHandshake, ClipboardCheck, Compass, Sparkles, ShieldCheck, Layers,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import type { ServiceSpecialty } from "@/types";
import "./ServiceSpecialties.scss";

const ICONS: Record<string, React.ElementType> = {
  Bandage, Syringe, Activity, Stethoscope, Footprints, Brain, HeartPulse,
  Hand, Eye, Home, MessageSquare, UtensilsCrossed, Mic, FileText,
  HeartHandshake, ClipboardCheck, Compass, Sparkles, ShieldCheck,
};

interface Props {
  specialties: ServiceSpecialty[];
  serviceTitle: string;
}

export function ServiceSpecialties({ specialties, serviceTitle }: Props) {
  return (
    <section className="service-specialties section" data-section="specialties">
      <div className="container container--wide">
        <SectionHeader
          eyebrow="Specialties within this discipline"
          title={<>{serviceTitle} is <em>not one thing</em>.</>}
          description="Our clinicians sub-specialize. Match the patient to the right hands."
          align="left"
        />

        <ScrollReveal childSelector=".specialty-card" stagger={0.06} className="service-specialties__grid">
          {specialties.map((s, i) => {
            const Icon: React.ElementType = (s.iconName ? ICONS[s.iconName] : undefined) ?? Layers;
            return (
              <article key={`${s.title}-${i}`} className="specialty-card">
                <span className="specialty-card__icon"><Icon size={20} /></span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
