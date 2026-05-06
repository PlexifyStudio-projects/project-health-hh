import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, FileHeart } from "lucide-react";
import { SITE } from "@/data/site";
import { cn } from "@/utils/cn";
import "./MobileBottomBar.scss";

/**
 * Sticky bottom CTA bar — phone-only.
 * Visibility rules:
 *  - Hidden until the user scrolls past the hero (or the first 60vh on pages without a hero).
 *  - Hidden when the soft keyboard is open (input/textarea focused or visualViewport shrinks).
 *  - Hidden when the footer is within 200px of the viewport bottom (so it doesn't overlap).
 *  - Hidden above 768px via CSS.
 */
export function MobileBottomBar() {
  const [visible, setVisible] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Scroll-based visibility (past hero / first viewport height)
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const hero = document.querySelector<HTMLElement>('[data-section="hero"], [data-section="about-hero"], .about-hero, .hero');
        const trigger = hero
          ? hero.getBoundingClientRect().bottom
          : window.innerHeight * 0.6 - window.scrollY;
        setVisible(trigger < window.innerHeight * 0.4);

        const footer = document.querySelector<HTMLElement>(".footer");
        if (footer) {
          const rect = footer.getBoundingClientRect();
          setNearFooter(rect.top < window.innerHeight + 200 && rect.top < window.innerHeight - 32);
        } else {
          setNearFooter(false);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // Soft keyboard detection: focus on input/textarea OR visualViewport shrinks > 150px.
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const tag = t.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || t.isContentEditable) {
        setKeyboardOpen(true);
      }
    };
    const onFocusOut = () => {
      // Defer to next tick so re-focus between fields doesn't flicker the bar.
      window.setTimeout(() => {
        const ae = document.activeElement as HTMLElement | null;
        const tag = ae?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA" && !ae?.isContentEditable) {
          setKeyboardOpen(false);
        }
      }, 50);
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    const vv = window.visualViewport;
    const onVV = () => {
      if (!vv) return;
      const diff = window.innerHeight - vv.height;
      setKeyboardOpen(diff > 150);
    };
    vv?.addEventListener("resize", onVV);

    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      vv?.removeEventListener("resize", onVV);
    };
  }, []);

  const hidden = !visible || keyboardOpen || nearFooter;

  return (
    <div
      className={cn("mobile-bottom-bar", hidden && "is-hidden")}
      role="region"
      aria-label="Quick actions"
      aria-hidden={hidden}
    >
      <div className="mobile-bottom-bar__inner">
        <Link
          to="/refer-a-patient"
          className="mobile-bottom-bar__cta mobile-bottom-bar__cta--primary"
          tabIndex={hidden ? -1 : 0}
        >
          <FileHeart size={16} aria-hidden="true" />
          <span>Refer a patient</span>
        </Link>
        <a
          href={SITE.phoneHref}
          className="mobile-bottom-bar__cta mobile-bottom-bar__cta--outline"
          aria-label={`Call 24/7 — ${SITE.phone}`}
          tabIndex={hidden ? -1 : 0}
        >
          <Phone size={16} aria-hidden="true" />
          <span>Call 24/7</span>
        </a>
      </div>
    </div>
  );
}
