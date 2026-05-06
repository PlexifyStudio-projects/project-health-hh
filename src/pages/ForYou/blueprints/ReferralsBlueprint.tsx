import { Send, Activity, Network, Phone, Check } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { Button } from "@/components/Button/Button";
import { Marquee } from "@/components/Marquee/Marquee";
import { TESTIMONIALS } from "@/data/testimonials";
import "./blueprints.scss";

const EMR_PARTNERS = ["Epic", "Cerner", "Meditech", "Allscripts", "athenahealth", "eClinicalWorks", "Greenway", "HL7 / FHIR"];

const OUTCOMES = [
  { value: "8h",    label: "Avg admit time",     meta: "Same-day common" },
  { value: "99%",   label: "Confirmation",        meta: "Within same business day" },
  { value: "-30%",  label: "Lower readmits",      meta: "vs CMS national benchmark" },
  { value: "5min",  label: "Liaison response",    meta: "Avg reply time" },
  { value: "0",     label: "Surprise denials",    meta: "Pre-screened intake" },
  { value: "100%",  label: "EMR-integrated",      meta: "Per partner request" },
];

const HOSPITAL_VOICES = TESTIMONIALS.filter((t) => t.audience === "referral").slice(0, 3);

export function ReferralsBlueprint() {
  return (
    <>
      {/* 60s referral form preview */}
      <section className="bp-ref-form section section--bg-mist">
        <div className="container container--wide">
          <div className="bp-ref-form__grid">
            <div>
              <SectionHeader
                eyebrow="60-second referral"
                align="left"
                title={<>Submit in <em>under a minute</em>.</>}
                description="Online portal, secure fax or phone — accepted 24/7. Pre-filled patient packet from your EMR. Liaison reviews and confirms admit eligibility within 2 business hours."
              />
              <ul className="bp-ref-form__bullets">
                <li><Check size={14} /> Pre-filled OASIS prep</li>
                <li><Check size={14} /> Live status in your portal</li>
                <li><Check size={14} /> Secure HIPAA intake</li>
                <li><Check size={14} /> No PHI required to start</li>
              </ul>
              <div className="bp-ref-form__cta">
                <Button to="/refer-a-patient" variant="primary" size="lg" iconRight={<Send size={16} />}>
                  Start a referral
                </Button>
                <a href="tel:+15550102026" className="bp-ref-form__phone">
                  <Phone size={14} /> Or call (555) 010-2026
                </a>
              </div>
            </div>
            <aside className="bp-ref-form__preview" aria-label="Form preview">
              <span className="bp-ref-form__preview-eyebrow">Preview</span>
              <div className="bp-ref-form__field"><label>Patient initials</label><span>J.D.</span></div>
              <div className="bp-ref-form__field"><label>ZIP</label><span>91101</span></div>
              <div className="bp-ref-form__field"><label>Diagnosis category</label><span>Post-surgical · Hip</span></div>
              <div className="bp-ref-form__field"><label>Service needed</label><span>Skilled Nursing + PT</span></div>
              <div className="bp-ref-form__field bp-ref-form__field--urgent"><label>Urgency</label><span>Same-day</span></div>
              <div className="bp-ref-form__progress"><span style={{ width: "82%" }} /></div>
              <p className="bp-ref-form__progress-label">Most referrals complete in ~52 seconds</p>
            </aside>
          </div>
        </div>
      </section>

      {/* EMR partners marquee */}
      <section className="bp-ref-emr section">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="EMR-ready"
            title={<>Plugs into <em>your stack</em>.</>}
            description="Direct interfaces with major EMRs and HL7/FHIR for everyone else. Average integration 4–6 weeks with your IT team."
          />
        </div>
        <Marquee speed="slow">
          {EMR_PARTNERS.map((p) => (
            <span key={p} className="bp-ref-emr__pill"><Network size={14} /> {p}</span>
          ))}
          {EMR_PARTNERS.map((p) => (
            <span key={`${p}-2`} className="bp-ref-emr__pill"><Network size={14} /> {p}</span>
          ))}
        </Marquee>
      </section>

      {/* Outcomes table */}
      <section className="bp-ref-outcomes section section--bg-cream">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="What you'll see"
            title={<>Outcomes you can <em>show your team</em>.</>}
            description="Every patient you refer is tracked end-to-end. These are real numbers from our 2025 data, attributable to your discharge planner or office."
          />
          <ScrollReveal childSelector=".bp-out" stagger={0.06} className="bp-ref-outcomes__grid">
            {OUTCOMES.map((o) => (
              <div key={o.label} className="bp-out">
                <strong>{o.value}</strong>
                <span>{o.label}</span>
                <em>{o.meta}</em>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Hospital quotes */}
      <section className="bp-ref-voices section">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Trusted by"
            title={<>Hospitals, physicians & SNFs.</>}
          />
          <div className="bp-ref-voices__grid">
            {HOSPITAL_VOICES.map((t) => (
              <article key={t.author} className="bp-ref-voice">
                <Activity size={18} className="bp-ref-voice__icon" aria-hidden="true" />
                <p>{t.quote}</p>
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
