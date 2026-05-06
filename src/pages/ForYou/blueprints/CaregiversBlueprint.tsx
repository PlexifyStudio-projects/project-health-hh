import { Briefcase, GraduationCap, DollarSign, Sparkles, ArrowRight, MapPin, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { Button } from "@/components/Button/Button";
import { TESTIMONIALS } from "@/data/testimonials";
import "./blueprints.scss";

const PAY_BAND = [
  { role: "RN — Visiting",       w2: "$110-145k",   per: "$95-130/visit",  bonus: "Sign-on $5k" },
  { role: "LVN",                 w2: "$72-92k",     per: "$60-80/visit",   bonus: "Bilingual +$5/visit" },
  { role: "Physical Therapist",  w2: "$110-140k",   per: "$95-130/visit",  bonus: "Specialty +10%" },
  { role: "Occupational Therapy",w2: "$105-135k",   per: "$90-125/visit",  bonus: "Hand therapy +12%" },
  { role: "Speech-Language",     w2: "$100-130k",   per: "$90-120/visit",  bonus: "MBSImP +$10/visit" },
  { role: "Home Health Aide",    w2: "$48-62k",     per: "$28-36/hour",    bonus: "Continuous care +$2/hr" },
];

const PERKS = [
  { icon: DollarSign,    title: "Top-of-market pay",   desc: "Per-visit rates 18% above CA average." },
  { icon: GraduationCap, title: "Free CEUs for life",  desc: "Wound, IV, geriatric — paid by us." },
  { icon: Sparkles,      title: "Mentor on day one",   desc: "Senior RN ride-alongs, real onboarding." },
  { icon: Briefcase,     title: "1099 + W2 paths",     desc: "Pick what fits. Both fully supported." },
  { icon: MapPin,        title: "Geographic clusters", desc: "Smart routing, fewer windshield hours." },
  { icon: TrendingUp,    title: "Promotion ladder",    desc: "Senior · Lead · Specialist tracks." },
];

const NURSE_VOICES = TESTIMONIALS.filter((t) => t.audience === "nurse").slice(0, 3);

export function CaregiversBlueprint() {
  return (
    <>
      {/* Live roles + pay band */}
      <section className="bp-care-pay section section--bg-mist">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="What you'd earn"
            title={<>Pay bands, <em>published</em>.</>}
            description="Most agencies dance around comp. We don't. Here's what our visiting clinicians actually take home, by role."
          />
          <div className="bp-care-pay__live">
            <span className="bp-care-pay__live-pulse" />
            <strong>23 open roles</strong>
            <span>across 5 California regions, hiring this month</span>
            <Button to="/careers" variant="outline" size="sm" iconRight={<ArrowRight size={14} />}>See open roles</Button>
          </div>
          <div className="bp-care-pay__table" role="table" aria-label="Compensation by role">
            <div className="bp-care-pay__row bp-care-pay__row--head" role="row">
              <span role="columnheader">Role</span>
              <span role="columnheader">W2 (annual)</span>
              <span role="columnheader">1099 (per visit)</span>
              <span role="columnheader">Bonus</span>
            </div>
            {PAY_BAND.map((r) => (
              <div key={r.role} className="bp-care-pay__row" role="row">
                <span role="cell" data-col="Role"><strong>{r.role}</strong></span>
                <span role="cell" data-col="W2 (annual)">{r.w2}</span>
                <span role="cell" data-col="1099 (per visit)">{r.per}</span>
                <span role="cell" data-col="Bonus" className="bp-care-pay__bonus">{r.bonus}</span>
              </div>
            ))}
          </div>
          <p className="bp-care-pay__disclaimer">Bands reflect current California ranges. Final offers based on experience, specialty, geography and shift mix.</p>
        </div>
      </section>

      {/* Perks 6-grid */}
      <section className="bp-care-perks section">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Why nurses stay"
            title={<>Built for the way <em>clinicians actually work</em>.</>}
          />
          <ScrollReveal childSelector=".bp-perk" stagger={0.06} className="bp-care-perks__grid">
            {PERKS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bp-perk">
                  <span className="bp-perk__icon"><Icon size={20} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* What our nurses say */}
      <section className="bp-care-voices section section--bg-cream">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="From the field"
            title={<>What nurses <em>say about us</em>.</>}
          />
          <div className="bp-care-voices__grid">
            {NURSE_VOICES.map((t) => (
              <article key={t.author} className="bp-care-voice">
                <span className="bp-care-voice__quote">&ldquo;</span>
                <p>{t.quote}</p>
                <footer>
                  <img src={t.image} alt="" loading="lazy" width="44" height="44" />
                  <div>
                    <strong>{t.author}</strong>
                    <em>{t.role}</em>
                  </div>
                </footer>
              </article>
            ))}
          </div>
          <div className="bp-care-voices__cta">
            <Button to="/careers" variant="primary" iconRight={<ArrowRight size={16} />}>Apply in 5 minutes</Button>
            <span>Real human follow-up within 48 hours</span>
          </div>
        </div>
      </section>
    </>
  );
}
