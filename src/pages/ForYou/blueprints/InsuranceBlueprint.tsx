import { ArrowRight, Database, TrendingUp, ShieldCheck, Star, BarChart3, Check } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { Button } from "@/components/Button/Button";
import { TESTIMONIALS } from "@/data/testimonials";
import "./blueprints.scss";

const HEDIS = [
  { measure: "Plan All-Cause Readmissions",      gap: "-30%",  status: "Top decile",    icon: TrendingUp },
  { measure: "Care of Older Adults — Med Review", gap: "+24%",  status: "Best in class", icon: ShieldCheck },
  { measure: "Falls Risk Assessment",            gap: "+38%",  status: "Top quartile",  icon: Star },
  { measure: "Transitions of Care (Discharge)",  gap: "+41%",  status: "Top decile",    icon: BarChart3 },
  { measure: "Statin Therapy Adherence (CHF)",   gap: "+18%",  status: "Top quartile",  icon: TrendingUp },
];

const CONTRACT_MODELS = [
  {
    title: "Shared savings",
    eyebrow: "Low risk",
    description: "Fee-for-service base + savings split when total cost of care beats target. Minimal downside, fastest to implement.",
    bullets: ["Quarterly true-up", "Risk-adjusted target", "Transparent attribution"],
    accent: "blue",
  },
  {
    title: "Episodic bundles",
    eyebrow: "Medium risk",
    description: "Per-episode payment for defined post-acute conditions (hip, knee, CHF, COPD). We own outcomes within the window.",
    bullets: ["30 / 60 / 90-day windows", "Stop-loss negotiable", "Quality gates required"],
    accent: "green",
  },
  {
    title: "Full risk capitation",
    eyebrow: "High alignment",
    description: "PMPM for full home-health spend on attributed members. Strongest alignment of incentives, highest ceiling for upside.",
    bullets: ["Member-attributed PMPM", "Reinsurance options", "Joint quality committee"],
    accent: "coral",
  },
];

const PAYER_VOICES = TESTIMONIALS.filter((t) => t.audience === "insurance").slice(0, 3);

export function InsuranceBlueprint() {
  return (
    <>
      {/* HEDIS impact */}
      <section className="bp-ins-hedis section section--bg-mist">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="HEDIS impact"
            title={<>Measures we <em>actually move</em>.</>}
            description="Plan-attributed gap closure across the home health-relevant HEDIS measures, against your most recent benchmark year."
          />
          <div className="bp-ins-hedis__table" role="table">
            <div className="bp-ins-hedis__row bp-ins-hedis__row--head" role="row">
              <span>Measure</span>
              <span>Gap closure</span>
              <span>Performance</span>
            </div>
            {HEDIS.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.measure} className="bp-ins-hedis__row" role="row">
                  <span data-col="Measure"><Icon size={16} aria-hidden="true" /> {h.measure}</span>
                  <span data-col="Gap closure" className="bp-ins-hedis__gap">{h.gap}</span>
                  <span data-col="Performance" className="bp-ins-hedis__status">{h.status}</span>
                </div>
              );
            })}
          </div>
          <p className="bp-ins-hedis__note">All numbers verifiable. We bring source data to every quarterly business review.</p>
        </div>
      </section>

      {/* Contract models */}
      <section className="bp-ins-contracts section">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Three ways to partner"
            title={<>Pick the <em>contract model</em> that fits.</>}
            description="We currently run all three structures in production with five California plans. Your network team decides which one starts the relationship."
          />
          <ScrollReveal childSelector=".bp-contract" stagger={0.08} className="bp-ins-contracts__grid">
            {CONTRACT_MODELS.map((c) => (
              <article key={c.title} className={`bp-contract bp-contract--${c.accent}`}>
                <span className="bp-contract__eyebrow">{c.eyebrow}</span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <ul>
                  {c.bullets.map((b) => <li key={b}><Check size={14} /> {b}</li>)}
                </ul>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Real-time data */}
      <section className="bp-ins-data section section--bg-cream">
        <div className="container container--wide">
          <div className="bp-ins-data__panel">
            <div>
              <span className="bp-ins-data__eyebrow"><Database size={12} /> Real-time API</span>
              <h2>Member-attributed data, in <em>your stack</em>.</h2>
              <p>Visit, outcome and member-attribution data streams to your analytics environment via secure API. No spreadsheet emails. No quarterly delays.</p>
              <div className="bp-ins-data__cta">
                <Button to="/contact" variant="primary" iconRight={<ArrowRight size={16} />}>Talk to network team</Button>
              </div>
            </div>
            <ul className="bp-ins-data__pings">
              <li><span className="bp-ins-data__dot" /> 14:32 · Member <strong>M-44218</strong> admit confirmed</li>
              <li><span className="bp-ins-data__dot" /> 14:31 · OASIS submitted · <strong>CHF</strong></li>
              <li><span className="bp-ins-data__dot" /> 14:29 · Visit complete · <strong>Skilled RN</strong></li>
              <li><span className="bp-ins-data__dot" /> 14:18 · 30-day check · <strong>No readmit</strong></li>
              <li><span className="bp-ins-data__dot" /> 14:11 · HEDIS gap <strong>closed</strong> · TRC</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Payer voices */}
      <section className="bp-ins-voices section">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="From the network desk"
            title={<>What payers <em>say about us</em>.</>}
          />
          <div className="bp-ins-voices__grid">
            {PAYER_VOICES.map((t) => (
              <article key={t.author} className="bp-ins-voice">
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <img src={t.image} alt="" loading="lazy" width="40" height="40" />
                  <div>
                    <strong>{t.author}</strong>
                    <em>{t.role}</em>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
