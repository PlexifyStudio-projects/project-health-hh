import { Quote, Stethoscope } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { TEAM } from "@/data/team";
import "./AboutMedicalBoard.scss";

interface BoardMember {
  name: string;
  title: string;
  affiliation: string;
}

const BOARD_ADVISORS: BoardMember[] = [
  { name: "Dr. Wei Liu, MD", title: "Cardiology Advisor",        affiliation: "Cedars-Sinai Heart Institute" },
  { name: "Dr. Anika Rao, MD", title: "Palliative Care Advisor", affiliation: "Stanford Health Care" },
  { name: "Dr. Sam Greenberg, MD", title: "Wound Care Advisor",  affiliation: "USC Keck School of Medicine" },
  { name: "Dr. Maria Santos, PharmD", title: "Pharmacy Advisor", affiliation: "UCSF School of Pharmacy" },
];

export function AboutMedicalBoard() {
  const cmo = TEAM.find((m) => m.isCMO);

  return (
    <section className="about-board section section--bg-mist" data-section="medical-board" id="medical-board">
      <div className="container container--wide">
        <SectionHeader
          eyebrow="Medical board"
          title={<>Decisions led by <em>practicing clinicians</em>.</>}
          description="A standing medical board reviews protocols, audits outcomes and approves every clinical pathway we use."
        />

        <div className="about-board__layout">
          {cmo && (
            <article className="about-board__cmo">
              <div className="about-board__cmo-photo">
                <img src={cmo.image} alt={`Photo of ${cmo.name}`} loading="lazy" />
                <span className="about-board__cmo-badge"><Stethoscope size={14} /> Chief Medical Officer</span>
              </div>
              <div className="about-board__cmo-body">
                <span className="about-board__cmo-quote-mark" aria-hidden="true"><Quote size={28} /></span>
                <blockquote className="about-board__cmo-quote">
                  Home is where the hardest medicine is practiced — and where the best is possible. We built Plexify so that <em>every visit</em> earns the family's trust.
                </blockquote>
                <div className="about-board__cmo-meta">
                  <strong>{cmo.name}</strong>
                  <span>{cmo.role}</span>
                  {cmo.credentials && (
                    <ul className="about-board__cmo-creds">
                      {cmo.credentials.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  )}
                  <p>{cmo.bio}</p>
                </div>
              </div>
            </article>
          )}

          <div className="about-board__advisors">
            <h3 className="about-board__advisors-title">Standing advisory board</h3>
            <ScrollReveal childSelector=".board-advisor" stagger={0.06} className="about-board__advisors-grid">
              {BOARD_ADVISORS.map((b) => (
                <div key={b.name} className="board-advisor">
                  <strong>{b.name}</strong>
                  <em>{b.title}</em>
                  <span>{b.affiliation}</span>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
