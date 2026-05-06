import { Stethoscope, Activity, Hand, Mic, HandHeart, HeartHandshake } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import "./ServicesBundle.scss";

interface BundleService {
  iconName: string;
  title: string;
  role: string;
}

interface Bundle {
  scenario: string;
  description: string;
  primary: BundleService;
  supporting: BundleService[];
  outcome: string;
}

const ICONS: Record<string, React.ElementType> = { Stethoscope, Activity, Hand, Mic, HandHeart, HeartHandshake };

const BUNDLES: Bundle[] = [
  {
    scenario: "Post-surgical recovery",
    description: "Hip or knee replacement coming home from the hospital.",
    primary: { iconName: "Stethoscope", title: "Skilled Nursing", role: "Wound, meds, vitals" },
    supporting: [
      { iconName: "Activity", title: "Physical Therapy", role: "Mobility & strength" },
      { iconName: "Hand", title: "Occupational Therapy", role: "ADL re-training" },
      { iconName: "HeartHandshake", title: "Home Health Aide", role: "Bathing & transfers" },
    ],
    outcome: "Average 21 days to baseline mobility",
  },
  {
    scenario: "Post-stroke recovery",
    description: "Coordinated neuro-rehab with social-work support.",
    primary: { iconName: "Activity", title: "Physical Therapy", role: "Gait & balance" },
    supporting: [
      { iconName: "Mic", title: "Speech Therapy", role: "Aphasia & swallow" },
      { iconName: "Hand", title: "Occupational Therapy", role: "Dressing & cognition" },
      { iconName: "HandHeart", title: "Medical Social Work", role: "Family planning" },
    ],
    outcome: "Average 4-week functional gain",
  },
  {
    scenario: "Chronic disease at home",
    description: "CHF, COPD or diabetes — keep the patient out of the ED.",
    primary: { iconName: "Stethoscope", title: "Skilled Nursing", role: "Telemonitoring" },
    supporting: [
      { iconName: "HandHeart", title: "Medical Social Work", role: "Resources & counseling" },
      { iconName: "HeartHandshake", title: "Home Health Aide", role: "Personal care" },
    ],
    outcome: "30% lower readmissions vs. CMS",
  },
];

export function ServicesBundle() {
  return (
    <section className="services-bundle section section--bg-mist" data-section="services-bundle" id="bundles">
      <div className="container container--wide">
        <SectionHeader
          eyebrow="How services bundle"
          title={<>One referral. <em>One coordinated team</em>.</>}
          description="Most patients receive two to four services at once — orchestrated under a single RN-led plan of care."
        />

        <ScrollReveal childSelector=".services-bundle__card" stagger={0.08} className="services-bundle__grid">
          {BUNDLES.map((b) => {
            const PIcon = ICONS[b.primary.iconName] ?? Stethoscope;
            return (
              <article key={b.scenario} className="services-bundle__card">
                <header className="services-bundle__head">
                  <span className="services-bundle__chip">{b.scenario}</span>
                  <p className="services-bundle__desc">{b.description}</p>
                </header>

                <div className="services-bundle__diagram" aria-hidden="false">
                  <div className="services-bundle__primary">
                    <span className="services-bundle__primary-icon"><PIcon size={20} /></span>
                    <strong>{b.primary.title}</strong>
                    <em>{b.primary.role}</em>
                  </div>

                  <div className="services-bundle__lines">
                    {b.supporting.map((s) => {
                      const SIcon = ICONS[s.iconName] ?? Stethoscope;
                      return (
                        <div key={s.title} className="services-bundle__node">
                          <span className="services-bundle__line" aria-hidden="true" />
                          <span className="services-bundle__node-icon"><SIcon size={16} /></span>
                          <div className="services-bundle__node-body">
                            <strong>{s.title}</strong>
                            <em>{s.role}</em>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <footer className="services-bundle__foot">
                  <span className="services-bundle__outcome-label">Typical outcome</span>
                  <span className="services-bundle__outcome">{b.outcome}</span>
                </footer>
              </article>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
