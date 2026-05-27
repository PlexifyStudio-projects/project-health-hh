import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, HeartPulse, Briefcase, FileHeart, ShieldCheck, Building2 } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AUDIENCES } from "@/data/audiences";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useAudience, type AudienceId } from "@/lib/audience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";
import "./AudienceGrid.scss";

const ICONS: Record<string, React.ElementType> = {
  HeartPulse, Briefcase, FileHeart, ShieldCheck, Building2,
};

// Map AudienceId (hero) <-> Audience.key (data)
const ID_TO_KEY: Record<AudienceId, string> = {
  patient:   "patients",
  nurse:     "caregivers",
  referral:  "referrals",
  insurance: "insurance",
  owner:     "owners",
};
const KEY_TO_ID: Record<string, AudienceId> = {
  patients:   "patient",
  caregivers: "nurse",
  referrals:  "referral",
  insurance:  "insurance",
  owners:     "owner",
};

export function AudienceGrid() {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { active: activeId, personalize } = useAudience();
  const activeKey = ID_TO_KEY[activeId];
  const reduced = useReducedMotion();

  // ---------- Spread reveal + breathing on active card ----------
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>(".audience-card", root);
      if (!cards.length) return;

      if (reduced) {
        gsap.set(cards, { autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: 1 });
        return;
      }

      // Compute initial offsets so all cards appear "stacked" toward the center
      const center = (cards.length - 1) / 2;
      cards.forEach((card, i) => {
        const offset = i - center;
        gsap.set(card, {
          autoAlpha: 0,
          x: offset * -22,                // pull toward center
          y: 18,
          rotation: offset * -3,           // splay slightly
          scale: 0.9,
          transformOrigin: "50% 80%",
        });
      });

      const spreadTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          end: "top 35%",
          scrub: 0.6,
        },
      });
      spreadTl.to(cards, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: "power3.out",
        duration: 1,
        stagger: { each: 0.06, from: "center" },
      });

      // ---------- Breathing animation on active card (only while in viewport) ----------
      const breathTweens: gsap.core.Tween[] = [];
      const breathTriggers: ScrollTrigger[] = [];
      cards.forEach((card) => {
        if (!card.classList.contains("is-current")) return;
        const tween = gsap.to(card, {
          scale: 1.01,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          paused: true,
        });
        breathTweens.push(tween);

        const trig = ScrollTrigger.create({
          trigger: card,
          start: "top 90%",
          end: "bottom 10%",
          onEnter: () => tween.play(),
          onEnterBack: () => tween.play(),
          onLeave: () => tween.pause(0),
          onLeaveBack: () => tween.pause(0),
        });
        breathTriggers.push(trig);
      });

      // ---------- Parallax-shift image opposite to cursor on hover ----------
      const parallaxCleanup: Array<() => void> = [];
      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>(".audience-card__media img");
        if (!img) return;
        const qx = gsap.quickTo(img, "x", { duration: 0.5, ease: "power3.out" });
        const qy = gsap.quickTo(img, "y", { duration: 0.5, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          // Image moves OPPOSITE to cursor, ±6px
          qx((0.5 - px) * 12);
          qy((0.5 - py) * 12);
        };
        const onLeave = () => { qx(0); qy(0); };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        parallaxCleanup.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => {
        spreadTl.scrollTrigger?.kill();
        spreadTl.kill();
        breathTweens.forEach((t) => t.kill());
        breathTriggers.forEach((s) => s.kill());
        parallaxCleanup.forEach((fn) => fn());
      };
    },
    { scope: ref, dependencies: [reduced, activeKey] }
  );

  return (
    <section ref={ref} className="audience-grid section" data-section="audiences" id="audiences">
      <div className="container container--wide">
        <SectionHeader
          eyebrow="Built for everyone in the journey"
          title={<>One platform, <em>five audiences</em>.</>}
          description="Plexify is designed end-to-end for the people who actually live in home health: patients and their families, the caregivers delivering care, the hospitals and physicians referring, the payers underwriting outcomes, and the agency leaders running operations. Click any card to personalize the entire site for that role."
        />

        <div className="audience-grid__list">
          {AUDIENCES.map((a) => {
            const Icon = ICONS[a.iconName] ?? HeartPulse;
            const slug = a.key;
            const isActive = activeKey === a.key;
            const isHovered = hovered === a.key;
            return (
              <article
                key={a.key}
                className={cn(
                  "audience-card",
                  `audience-card--${a.accent}`,
                  isActive && "is-current",
                  hovered && hovered !== a.key && !isActive && "is-dim"
                )}
                onMouseEnter={() => setHovered(a.key)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`${a.title} — ${a.tagline}`}
              >
                <div className="audience-card__media" aria-hidden="true">
                  <img
                    src={a.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="1280"
                    height="720"
                  />
                </div>
                <div className="audience-card__body">
                  <div className="audience-card__header">
                    <span className="audience-card__icon" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    {isActive && <span className="audience-card__badge">Selected</span>}
                  </div>
                  <h3 className="audience-card__title">{a.title}</h3>
                  <p className="audience-card__tagline">{a.tagline}</p>

                  <div className="audience-card__actions">
                    {!isActive ? (
                      <button
                        type="button"
                        className="audience-card__pick"
                        onClick={() => personalize(KEY_TO_ID[a.key])}
                      >
                        Personalize for me
                        <span aria-hidden="true">→</span>
                      </button>
                    ) : (
                      <span className="audience-card__active-mark">
                        ✓ Showing your view
                      </span>
                    )}
                    <Link to={`/for-you/${slug}`} className="audience-card__cta">
                      {a.cta.label}
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
                {(isActive || isHovered) && (
                  <span className="audience-card__glow" aria-hidden="true" />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
