import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import {
  Menu, X, Phone, ChevronDown, Calendar,
  Home, Sparkles, Stethoscope, Users, BookOpen, Briefcase, Mail,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PAGE_NAV, HEADER_CTAS, HOME_SECTIONS, SECTION_TO_PAGE } from "@/data/nav";
import { SITE } from "@/data/site";
import { Button } from "@/components/Button/Button";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";
import "./Header.scss";

const ICONS: Record<string, React.ElementType> = {
  Home, Sparkles, Stethoscope, Users, BookOpen, Briefcase, Mail,
};

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const reduced = useReducedMotion();

  const sectionIds = HOME_SECTIONS.map((s) => s.id);
  const activeSection = useScrollSpy(isHome ? sectionIds : [], 160);
  const activeFromScroll = isHome && activeSection ? SECTION_TO_PAGE[activeSection] ?? null : null;

  // What page nav item should be highlighted right now?
  const activeTo = isHome
    ? activeFromScroll ?? "/"
    : "/" + (location.pathname.split("/").filter(Boolean)[0] ?? "");

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Scrub-driven progress bar (real scroll progress via ScrollTrigger)
  useGSAP(() => {
    const bar = progressRef.current;
    if (!bar) return;
    gsap.set(bar, { scaleX: 0 });
    const trig = ScrollTrigger.create({
      start: 0,
      end: () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
      scrub: true,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });
    return () => { trig.kill(); };
  }, { scope: headerRef });

  // Smoother shrink — gsap-driven height + brand scale, replaces CSS transition jump
  useGSAP(() => {
    const header = headerRef.current;
    const brand = brandRef.current;
    if (!header) return;
    const targetH = scrolled ? 64 : 96;
    const brandScale = scrolled ? 0.92 : 1;
    gsap.to(header, { height: targetH, duration: 0.55, ease: "power3.out", overwrite: "auto" });
    if (brand) gsap.to(brand, { scale: brandScale, duration: 0.5, ease: "power3.out", overwrite: "auto" });
  }, { scope: headerRef, dependencies: [scrolled] });

  // Animated pill — FLIP-style width + x morph between active items, with icon rotation
  useGSAP(() => {
    const list = navListRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    const target = activeTo
      ? list.querySelector<HTMLElement>(`[data-to="${activeTo}"]`)
      : null;
    if (!target) {
      gsap.to(pill, { opacity: 0, duration: 0.25, ease: "power2.out" });
      return;
    }
    const listRect = list.getBoundingClientRect();
    const btnRect = target.getBoundingClientRect();
    // FLIP-style morph: animate x and width together for a clean cross-item slide
    gsap.to(pill, {
      x: btnRect.left - listRect.left,
      width: btnRect.width,
      opacity: 1,
      duration: 0.6,
      ease: "expo.out",
      overwrite: "auto",
    });

    // Icon rotation for the newly active item
    const icon = target.querySelector<HTMLElement>(".header__nav-icon");
    if (icon) {
      gsap.fromTo(icon, { rotate: -25, scale: 0.85 }, { rotate: 0, scale: 1, duration: 0.55, ease: "back.out(2)" });
    }
  }, { scope: headerRef, dependencies: [activeTo, isHome] });

  // Gradient sheen sweeping across the header background ~12s
  useGSAP(() => {
    if (reduced) return;
    const sheen = headerRef.current?.querySelector<HTMLElement>(".header__sheen");
    if (!sheen) return;
    gsap.set(sheen, { backgroundPositionX: "-150%" });
    const tween = gsap.to(sheen, {
      backgroundPositionX: "150%",
      duration: 4,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 8,
    });
    return () => { tween.kill(); };
  }, { scope: headerRef, dependencies: [reduced] });

  useEffect(() => {
    setMobileOpen(false);
    setOpenSub(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useGSAP(() => {
    gsap.from(".header__nav-item", { y: -10, opacity: 0, duration: 0.55, ease: "power3.out", stagger: 0.04, delay: 0.12 });
    gsap.from(".header__brand", { opacity: 0, x: -16, duration: 0.55, ease: "power3.out" });
    gsap.from(".header__actions > *", { y: -10, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power3.out", delay: 0.25 });
  }, { scope: headerRef });

  const enterSub = (label: string) => {
    if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpenSub(label);
  };
  const leaveSub = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenSub(null), 120);
  };

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      <header ref={headerRef} className={cn("header", scrolled && "is-scrolled")}>
        <span className="header__sheen" aria-hidden="true" />
        <span className="header__progress" aria-hidden="true">
          <span ref={progressRef} className="header__progress-bar" />
        </span>

        <div className="header__inner container container--wide">
          <Link to="/" ref={brandRef} className="header__brand" aria-label={`${SITE.name} home`}>
            <span className="header__brand-mark" aria-hidden="true">
              <svg viewBox="0 0 64 64" width="40" height="40">
                <defs>
                  <linearGradient id="header-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2D7FF9" />
                    <stop offset="55%" stopColor="#34C77B" />
                    <stop offset="100%" stopColor="#FF8B6B" />
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="14" fill="url(#header-grad)" />
                <path d="M32 46 L20 30 a8 8 0 1 1 12-9 a8 8 0 1 1 12 9 Z" fill="#fff" />
              </svg>
              <span className="header__brand-pulse" aria-hidden="true" />
            </span>
            <span className="header__brand-text">
              <strong>Plexify</strong>
              <em>Health</em>
            </span>
          </Link>

          <nav className="header__nav" aria-label="Primary">
            <ul ref={navListRef} className="header__nav-list">
              <span ref={pillRef} className="header__pill" aria-hidden="true" />
              {PAGE_NAV.map((item) => {
                const Icon = ICONS[item.iconName] ?? Home;
                const isActive = activeTo === item.to;
                const hasSub = !!item.submenu?.length;
                return (
                  <li
                    key={item.to}
                    className={cn("header__nav-item", hasSub && "has-sub", openSub === item.label && "is-sub-open")}
                    onMouseEnter={() => hasSub && enterSub(item.label)}
                    onMouseLeave={() => hasSub && leaveSub()}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      data-to={item.to}
                      data-cursor="hover"
                      className={cn("header__nav-link", isActive && "is-active")}
                    >
                      <span className="header__nav-icon" aria-hidden="true">
                        <Icon size={14} strokeWidth={2.4} />
                      </span>
                      <span className="header__nav-label">{item.label}</span>
                      {hasSub && <ChevronDown size={12} className="header__nav-chev" />}
                    </NavLink>

                    {hasSub && (
                      <div className={cn("header__sub", openSub === item.label && "is-open")} role="menu">
                        <ul>
                          {item.submenu!.map((s) => (
                            <li key={s.to}>
                              <NavLink
                                to={s.to}
                                className="header__sub-link"
                                role="menuitem"
                                data-cursor="hover"
                                data-tone={s.tone ?? "ink"}
                              >
                                <span className="header__sub-dot" aria-hidden="true" />
                                <span className="header__sub-text">
                                  <span className="header__sub-label">{s.label}</span>
                                  {s.description && <span className="header__sub-desc">{s.description}</span>}
                                </span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header__actions">
            <a href={SITE.phoneHref} className="header__phone" aria-label={`Call ${SITE.phone}`} data-cursor="hover">
              <span className="header__phone-pulse" aria-hidden="true" />
              <Phone size={14} />
              <span className="header__phone-text">{SITE.phone}</span>
            </a>
            <Button to={HEADER_CTAS.primary.to} variant="primary" size="sm" iconRight={<Calendar size={14} />} className="header__cta">
              {HEADER_CTAS.primary.label}
            </Button>
            <button
              type="button"
              className="header__burger"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              data-cursor="hover"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div className={cn("mobile-drawer", mobileOpen && "is-open")} aria-hidden={!mobileOpen}>
        <nav className="mobile-drawer__nav" aria-label="Mobile">
          <span className="mobile-drawer__eyebrow">Pages</span>
          <ul className="mobile-drawer__sections">
            {PAGE_NAV.map((item) => {
              const Icon = ICONS[item.iconName] ?? Home;
              return (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === "/"} className="mobile-drawer__link" onClick={() => setMobileOpen(false)}>
                    <span className="mobile-drawer__link-icon"><Icon size={18} /></span>
                    {item.label}
                  </NavLink>
                  {item.submenu && (
                    <ul className="mobile-drawer__sub">
                      {item.submenu.map((s) => (
                        <li key={s.to}>
                          <NavLink to={s.to} className="mobile-drawer__sublink" onClick={() => setMobileOpen(false)}>
                            {s.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mobile-drawer__cta">
            <Button to={HEADER_CTAS.primary.to} variant="primary" fullWidth>{HEADER_CTAS.primary.label}</Button>
            <Button to={HEADER_CTAS.secondary.to} variant="outline" fullWidth>{HEADER_CTAS.secondary.label}</Button>
            <a href={SITE.phoneHref} className="mobile-drawer__phone">
              <Phone size={16} /> {SITE.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
