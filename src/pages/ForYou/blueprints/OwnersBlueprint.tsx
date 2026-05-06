import { ArrowRight, Layers, Wrench, Globe, TrendingUp, Check, Building2, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { Button } from "@/components/Button/Button";
import { TESTIMONIALS } from "@/data/testimonials";
import "./blueprints.scss";

const PARTNERSHIP_MODELS = [
  {
    title: "JV (Joint Venture)",
    eyebrow: "Equity partnership",
    blurb: "Shared equity, shared upside. Best for owners ready to expand into new geography or specialty lines.",
    bullets: ["Equity split negotiated", "Shared P&L control", "Brand co-presence"],
    accent: "coral",
  },
  {
    title: "MSO",
    eyebrow: "Managed services",
    blurb: "Plexify operates back-office, staffing and compliance under your brand. You keep the patient relationship.",
    bullets: ["Your brand · our ops", "Compliance fully managed", "Monthly fixed fee"],
    accent: "blue",
  },
  {
    title: "Advisory",
    eyebrow: "Light-touch",
    blurb: "Fractional leadership and access to playbooks. For owners who want to grow on their own with our brain trust.",
    bullets: ["Quarterly board prep", "Playbook library access", "Recruiting templates"],
    accent: "green",
  },
];

const TOOLKIT = [
  { icon: Wrench,    title: "Compliance playbooks",    desc: "Survey prep, OASIS audits, plan-of-care templates — battle-tested." },
  { icon: Layers,    title: "Recruiting flywheel",     desc: "Pipeline of vetted RN/LVN/PT/OT/ST. Average fill 48 hours." },
  { icon: Globe,     title: "Multi-region coverage",   desc: "Plug into our 5-region California footprint or co-expand." },
  { icon: TrendingUp,title: "Margin-lift roadmap",     desc: "Specialty-line additions designed to add 22% in year one." },
];

const OWNER_VOICES = TESTIMONIALS.filter((t) => t.audience === "owner").slice(0, 3);

export function OwnersBlueprint() {
  return (
    <>
      {/* 3 partnership models */}
      <section className="bp-own-models section section--bg-mist">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Three deal structures"
            title={<>JV · MSO · <em>Advisory</em>.</>}
            description="Three ways we partner with HH owners and operators. Each balances control, risk and capital differently — we'll model the trade-offs with your real numbers."
          />
          <ScrollReveal childSelector=".bp-model" stagger={0.08} className="bp-own-models__grid">
            {PARTNERSHIP_MODELS.map((m) => (
              <article key={m.title} className={`bp-model bp-model--${m.accent}`}>
                <span className="bp-model__eyebrow">{m.eyebrow}</span>
                <h3>{m.title}</h3>
                <p>{m.blurb}</p>
                <ul>
                  {m.bullets.map((b) => <li key={b}><Check size={14} /> {b}</li>)}
                </ul>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Margin lift visualization */}
      <section className="bp-own-margin section">
        <div className="container container--wide">
          <div className="bp-own-margin__panel">
            <div className="bp-own-margin__copy">
              <span className="bp-own-margin__eyebrow"><TrendingUp size={12} /> Margin lift, modeled</span>
              <h2>Year one: <em>+22% margin</em>, average partner.</h2>
              <p>Adding specialty lines via Plexify avoids hiring/credentialing overhead and unlocks bundled-payment revenue. Here's a typical 12-month operator P&L overlay.</p>
              <div className="bp-own-margin__cta">
                <Button to="/contact" variant="primary" iconRight={<ArrowRight size={16} />}>Run my numbers</Button>
              </div>
            </div>
            <div className="bp-own-margin__chart" aria-label="Year-1 margin chart">
              <div className="bp-own-margin__bars">
                {[18, 24, 22, 30, 28, 34, 32, 38, 36, 42, 40, 46].map((h, i) => (
                  <span key={i} className="bp-own-margin__bar" style={{ height: `${h * 1.6}px` }} />
                ))}
              </div>
              <div className="bp-own-margin__legend">
                <span>Month 1</span>
                <span>Month 12</span>
              </div>
              <div className="bp-own-margin__delta">+22%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section className="bp-own-toolkit section section--bg-cream">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="What we hand you"
            title={<>The <em>operator's toolkit</em>.</>}
          />
          <ScrollReveal childSelector=".bp-tool" stagger={0.06} className="bp-own-toolkit__grid">
            {TOOLKIT.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="bp-tool">
                  <span className="bp-tool__icon"><Icon size={20} /></span>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* Owner voices */}
      <section className="bp-own-voices section">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="From operators"
            title={<>What owners <em>tell us</em>.</>}
          />
          <div className="bp-own-voices__grid">
            {OWNER_VOICES.map((t) => (
              <article key={t.author} className="bp-own-voice">
                <Building2 size={18} aria-hidden="true" />
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
          <div className="bp-own-voices__cta">
            <Button to="/contact" variant="primary" size="lg" iconRight={<Calendar size={16} />}>Book exec call</Button>
          </div>
        </div>
      </section>
    </>
  );
}
