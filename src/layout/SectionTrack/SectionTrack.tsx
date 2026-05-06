import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  Sparkles, Stethoscope, Users, Workflow, MessageCircle, MapPin, BookOpen, HelpCircle, Home,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HOME_SECTIONS } from "@/data/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";
import "./SectionTrack.scss";

const ICONS: Record<string, React.ElementType> = {
  Home, Sparkles, Stethoscope, Users, Workflow, MessageCircle, MapPin, BookOpen, HelpCircle,
};

export function SectionTrack() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(false);
  const ids = HOME_SECTIONS.map((s) => s.id);
  const active = useScrollSpy(isHome ? ids : [], 180);
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!isHome) { setVisible(false); return; }
    const handler = () => setVisible(window.scrollY > 220);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  // Scrub-driven progress fill (real scroll progress)
  useGSAP(() => {
    if (!isHome) return;
    const bar = progressRef.current;
    if (!bar) return;
    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
    const trig = ScrollTrigger.create({
      start: 0,
      end: () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
      scrub: true,
      onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
    });
    return () => { trig.kill(); };
  }, { scope: rootRef, dependencies: [isHome] });

  // Active dot spring pop + ghost-trail position update
  useGSAP(() => {
    if (!rootRef.current) return;
    const root = rootRef.current;
    const activeDot = root.querySelector<HTMLElement>(".section-track__item.is-active .section-track__dot");
    if (!activeDot) return;

    if (!reduced) {
      gsap.fromTo(
        activeDot,
        { scale: 0.8 },
        { scale: 1.18, duration: 0.55, ease: "back.out(2)" }
      );
    } else {
      gsap.set(activeDot, { scale: 1.18 });
    }

    // Ghost trail — fades behind the active dot at its position
    const ghost = ghostRef.current;
    const list = root.querySelector<HTMLElement>(".section-track__list");
    if (ghost && list) {
      const listRect = list.getBoundingClientRect();
      const dotRect = activeDot.getBoundingClientRect();
      const cx = dotRect.left + dotRect.width / 2 - listRect.left;
      gsap.killTweensOf(ghost);
      if (reduced) {
        gsap.set(ghost, { left: cx, opacity: 0 });
      } else {
        gsap.fromTo(
          ghost,
          { left: cx, opacity: 0.85, scale: 1 },
          { opacity: 0, scale: 2.4, duration: 0.9, ease: "power2.out" }
        );
      }
    }
  }, { scope: rootRef, dependencies: [active, reduced] });

  if (!isHome) return null;

  const activeIdx = HOME_SECTIONS.findIndex((s) => s.id === active);
  const total = HOME_SECTIONS.length;

  const handleJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const next = activeIdx >= 0 && activeIdx < total - 1 ? HOME_SECTIONS[activeIdx + 1] : null;

  return (
    <div ref={rootRef} className={cn("section-track", visible && "is-visible")} aria-hidden={!visible}>
      <div className="section-track__inner container container--wide">
        <div className="section-track__meta">
          <span className="section-track__eyebrow">Now viewing</span>
          <strong className="section-track__current">
            {active ? HOME_SECTIONS[activeIdx]?.label : "Top"}
          </strong>
          {next && (
            <span className="section-track__next">
              <span className="section-track__next-arrow" aria-hidden>↓</span>
              Next: <em>{next.label}</em>
            </span>
          )}
        </div>

        <ol className="section-track__list" aria-label="Page sections">
          <span ref={progressRef} className="section-track__progress" aria-hidden="true" />
          <span ref={ghostRef} className="section-track__ghost" aria-hidden="true" />
          {HOME_SECTIONS.map((s, i) => {
            const Icon = ICONS[s.iconName] ?? Sparkles;
            const isActive = active === s.id;
            const isPast = activeIdx >= 0 && i < activeIdx;
            return (
              <li key={s.id} className={cn("section-track__item", isActive && "is-active", isPast && "is-past")}>
                <a
                  href={`#${s.id}`}
                  onClick={handleJump(s.id)}
                  className="section-track__link"
                  aria-current={isActive ? "true" : undefined}
                  data-cursor="hover"
                >
                  <span className="section-track__dot" aria-hidden="true">
                    <Icon size={11} strokeWidth={2.5} />
                  </span>
                  <span className="section-track__label">{s.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
