import { Link } from "react-router-dom";
import { Check, ArrowRight, Heart, Phone, Clock, Languages } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { Button } from "@/components/Button/Button";
import { TESTIMONIALS } from "@/data/testimonials";
import { INSURANCE } from "@/data/insurance-accepted";
import "./blueprints.scss";

const COVERED_SERVICES = [
  { title: "Skilled Nursing",       desc: "Wound, IV, post-op, chronic disease",     covered: "100%" },
  { title: "Physical Therapy",      desc: "Mobility, balance, fall prevention",      covered: "100%" },
  { title: "Occupational Therapy",  desc: "ADLs, hand therapy, home safety",         covered: "100%" },
  { title: "Speech Therapy",        desc: "Aphasia, swallowing, voice",              covered: "100%" },
  { title: "Medical Social Work",   desc: "Counseling, resources, planning",         covered: "100%" },
  { title: "Home Health Aide",      desc: "Bathing, mobility, companionship",        covered: "Paired" },
];

const FAMILY_VOICES = TESTIMONIALS.filter((t) => t.audience === "patient").slice(0, 4);

export function PatientsBlueprint() {
  return (
    <>
      {/* Coverage / what you get */}
      <section className="bp-patients-coverage section section--bg-mist">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Insurance & coverage"
            title={<>What's <em>covered for you</em>.</>}
            description="Most home health services are 100% covered for Medicare cardholders, Medi-Cal members and most private plans. We verify your specific plan in 24 hours."
          />
          <ScrollReveal childSelector=".bp-cov-card" stagger={0.06} className="bp-patients-coverage__grid">
            {COVERED_SERVICES.map((s) => (
              <div key={s.title} className="bp-cov-card">
                <span className="bp-cov-card__chip">{s.covered}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="bp-cov-card__check"><Check size={14} /></span>
              </div>
            ))}
          </ScrollReveal>

          <div className="bp-patients-coverage__plans">
            <span className="bp-patients-coverage__plans-eyebrow">Plans we work with</span>
            <ul>
              {INSURANCE.slice(0, 8).map((p) => <li key={p.name}>{p.name}</li>)}
            </ul>
            <Button to="/verify-insurance" variant="outline" size="sm" iconRight={<ArrowRight size={14} />}>
              Verify your plan
            </Button>
          </div>
        </div>
      </section>

      {/* Your first 24 hours */}
      <section className="bp-patients-first section">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="From call → care"
            title={<>Your first <em>24 hours</em>, mapped.</>}
            description="No paperwork mountains. No waiting rooms. Here's what most patients experience between picking up the phone and the first nurse visit at home."
          />
          <ol className="bp-patients-first__list">
            <li>
              <span className="bp-patients-first__time"><Phone size={14} /> Hour 0</span>
              <strong>You call us.</strong>
              <p>Tell us what you need — diagnosis, plans, family situation. Real human in 60 seconds.</p>
            </li>
            <li>
              <span className="bp-patients-first__time"><Clock size={14} /> Hour 2</span>
              <strong>Insurance verified.</strong>
              <p>Our team confirms coverage and emails the family with what to expect — no surprises.</p>
            </li>
            <li>
              <span className="bp-patients-first__time"><Heart size={14} /> Hour 24</span>
              <strong>RN at your door.</strong>
              <p>A nurse arrives at home (or video-visits), completes the OASIS evaluation, and sets up the plan with you and your family.</p>
            </li>
            <li>
              <span className="bp-patients-first__time"><Languages size={14} /> Day 2+</span>
              <strong>Visits begin.</strong>
              <p>Therapy, aide and follow-up nursing visits start. Bilingual care teams (EN / ES / TL / ZH / HY) at no extra cost.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Family voices — quotes collage */}
      <section className="bp-patients-voices section section--bg-cream">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Why families choose us"
            title={<>Voices from <em>real homes</em>.</>}
          />
          <div className="bp-patients-voices__grid">
            {FAMILY_VOICES.map((t, i) => (
              <article key={t.author} className={`bp-voice bp-voice--${i % 3 === 0 ? "warm" : i % 3 === 1 ? "blue" : "green"}`}>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <img src={t.image} alt="" loading="lazy" width="40" height="40" />
                  <span>
                    <strong>{t.author}</strong>
                    <em>{t.role}</em>
                  </span>
                </footer>
              </article>
            ))}
          </div>
          <div className="bp-patients-voices__cta">
            <Link to="/contact" className="bp-patients-voices__link">
              Talk to a real human <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
