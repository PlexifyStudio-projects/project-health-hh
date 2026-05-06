import { ShieldCheck, BadgeCheck, Award, Stethoscope, HeartPulse, Users, Sparkles, Lock } from "lucide-react";
import { Marquee } from "@/components/Marquee/Marquee";
import { INSURANCE, ACCREDITATIONS } from "@/data/insurance-accepted";
import "./TrustBand.scss";

// Accreditations we want emphasized in the center band.
const EMPHASIZED = new Set(["The Joint Commission", "HIPAA Compliant"]);

export function TrustBand() {
  return (
    <section className="trust-band" data-section="trust" id="trust" aria-label="Trust signals">
      <div className="trust-band__heading container">
        <span className="trust-band__eyebrow">Trusted by patients, partners and payers</span>
      </div>

      {/* Row 1 — left-to-right: clinical accreditations & differentiators */}
      <Marquee
        speed="slow"
        direction="ltr"
        pauseOnHover
        className="trust-band__marquee trust-band__marquee--row-1"
      >
        {ACCREDITATIONS.map((a) => {
          const isEmphasized = EMPHASIZED.has(a.name);
          return (
            <span
              key={a.name}
              className={
                "trust-band__item trust-band__item--accred" +
                (isEmphasized ? " trust-band__item--emphasized" : "")
              }
            >
              {isEmphasized ? <Lock size={20} aria-hidden="true" /> : <ShieldCheck size={20} aria-hidden="true" />}
              <span>{a.name}</span>
            </span>
          );
        })}
        <span className="trust-band__item"><Award size={20} aria-hidden="true" /><span>5-Star CMS Quality</span></span>
        <span className="trust-band__item"><BadgeCheck size={20} aria-hidden="true" /><span>HIPAA Secured</span></span>
        <span className="trust-band__item"><HeartPulse size={20} aria-hidden="true" /><span>24/7 Nursing Line</span></span>
        <span className="trust-band__item"><Users size={20} aria-hidden="true" /><span>15,000+ Patients Served</span></span>
        <span className="trust-band__item"><Sparkles size={20} aria-hidden="true" /><span>Awwwards-grade UX</span></span>
        <span className="trust-band__item"><Stethoscope size={20} aria-hidden="true" /><span>RN/LVN-led care</span></span>
      </Marquee>

      {/* Row 2 — right-to-left: insurance partners */}
      <Marquee
        speed="normal"
        direction="rtl"
        pauseOnHover
        className="trust-band__marquee trust-band__marquee--row-2 trust-band__marquee--insurance"
      >
        {INSURANCE.map((i) => (
          <span key={i.name} className="trust-band__item trust-band__item--insurance">
            {i.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
