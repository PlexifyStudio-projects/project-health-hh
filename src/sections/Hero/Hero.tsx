import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight, Phone, Sparkle, Heart, Briefcase, FileHeart, ShieldCheck, Building2, Play, Volume2,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/Button/Button";
import { SITE } from "@/data/site";
import { useAudience, type AudienceId } from "@/lib/audience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";
import "./Hero.scss";

interface HeroAudience {
  id: AudienceId;
  chip: string;
  shortChip: string;
  icon: React.ElementType;
  accent: "blue" | "green" | "coral" | "ink" | "gold";
  eyebrow: string;
  titleLines: Array<Array<{ text: string; tone?: "script" | "mark" | "regular" }>>;
  sub: string;
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
  videoSources: string[]; // multi-source fallback
  poster: string;
  stats: Array<{ label: string; value: string; meta: string }>;
  liveText: string;
}

// Pexels HD 1080 (~15MB each, much faster than UHD) with UHD fallback
const v = (id: string, ratio: "h" | "v" = "h") => {
  const hd = ratio === "h"
    ? `https://videos.pexels.com/video-files/${id}/${id}-hd_1920_1080_25fps.mp4`
    : `https://videos.pexels.com/video-files/${id}/${id}-hd_1080_1920_25fps.mp4`;
  const sd = ratio === "h"
    ? `https://videos.pexels.com/video-files/${id}/${id}-sd_960_540_25fps.mp4`
    : `https://videos.pexels.com/video-files/${id}/${id}-sd_540_960_25fps.mp4`;
  const uhd = ratio === "h"
    ? `https://videos.pexels.com/video-files/${id}/${id}-uhd_3840_2160_25fps.mp4`
    : `https://videos.pexels.com/video-files/${id}/${id}-uhd_2160_3840_25fps.mp4`;
  return [hd, sd, uhd];
};

const AUDIENCES: HeroAudience[] = [
  {
    id: "patient",
    chip: "I need care",
    shortChip: "Patient",
    icon: Heart,
    accent: "blue",
    eyebrow: "For patients & families",
    titleLines: [
      [
        { text: "Care" },
        { text: "that", tone: "script" },
        { text: "comes" },
      ],
      [
        { text: "to" },
        { text: "you.", tone: "mark" },
      ],
    ],
    sub: "Skilled nursing, physical, occupational and speech therapy delivered to your living room. 100% covered for Medicare cardholders.",
    primary:   { label: "Free consultation", to: "/contact" },
    secondary: { label: "Verify insurance",  to: "/verify-insurance" },
    videoSources: v("8327878", "h"),
    poster: "https://images.pexels.com/photos/7551621/pexels-photo-7551621.jpeg?auto=compress&cs=tinysrgb&w=1280",
    stats: [
      { label: "Family rating",  value: "4.9 ★", meta: "2,400+ verified" },
      { label: "Same-day admit", value: "24h",   meta: "7 days/week" },
      { label: "Medicare",       value: "100%",  meta: "Fully covered" },
    ],
    liveText: "142 patients in active care across California right now",
  },
  {
    id: "nurse",
    chip: "I'm a nurse",
    shortChip: "Nurse",
    icon: Briefcase,
    accent: "green",
    eyebrow: "For nurses & caregivers",
    titleLines: [
      [{ text: "A career" }, { text: "you'll", tone: "script" }],
      [{ text: "be" }, { text: "proud", tone: "mark" }, { text: "of." }],
    ],
    sub: "Top-of-market pay, real mentorship, manageable caseloads. Both 1099 and W2 paths — built by clinicians, for clinicians.",
    primary:   { label: "View open roles", to: "/careers" },
    secondary: { label: "What nurses say", to: "/for-you/caregivers" },
    videoSources: v("5752729", "v"),
    poster: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1280",
    stats: [
      { label: "Pay vs market", value: "+18%", meta: "All clinical roles" },
      { label: "Free CEUs",     value: "∞",    meta: "Yearly" },
      { label: "Avg tenure",    value: "3.4y", meta: "Clinical staff" },
    ],
    liveText: "37 nurses joined Plexify in the last 90 days",
  },
  {
    id: "referral",
    chip: "I refer patients",
    shortChip: "Referral",
    icon: FileHeart,
    accent: "coral",
    eyebrow: "For hospitals, physicians & SNFs",
    titleLines: [
      [{ text: "Refer in" }, { text: "60", tone: "mark" }, { text: "seconds." }],
      [{ text: "Same-day", tone: "script" }, { text: "admit." }],
    ],
    sub: "Hospitals, physicians, case managers and SNFs trust Plexify for fast, clean transitions of care. Real-time admit confirmation, shared dashboards.",
    primary:   { label: "Submit a referral", to: "/refer-a-patient" },
    secondary: { label: "Talk to liaison",   to: "/for-you/referrals" },
    videoSources: ["https://videos.pexels.com/video-files/4122849/4122849-uhd_3840_2160_25fps.mp4"],
    poster: "https://images.pexels.com/photos/4173324/pexels-photo-4173324.jpeg?auto=compress&cs=tinysrgb&w=1280",
    stats: [
      { label: "Avg admit time", value: "8h",    meta: "Same-day common" },
      { label: "Confirmation",   value: "Live",  meta: "Real-time portal" },
      { label: "Liaison",        value: "1:1",   meta: "Per partner" },
    ],
    liveText: "12 referrals admitted in the last 4 hours",
  },
  {
    id: "insurance",
    chip: "I'm a payer",
    shortChip: "Insurance",
    icon: ShieldCheck,
    accent: "ink",
    eyebrow: "For insurance partners",
    titleLines: [
      [{ text: "Lower" }, { text: "readmits.", tone: "script" }],
      [{ text: "Higher" }, { text: "stars.", tone: "mark" }],
    ],
    sub: "Outcomes-driven home health that moves your HEDIS, Star Ratings and total cost of care. Value-based contracting, transparent reporting.",
    primary:   { label: "Talk to network team", to: "/contact" },
    secondary: { label: "See outcomes",         to: "/for-you/insurance" },
    videoSources: ["https://videos.pexels.com/video-files/4225923/4225923-uhd_3840_2160_25fps.mp4", "https://videos.pexels.com/video-files/8327878/8327878-uhd_3840_2160_25fps.mp4"],
    poster: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1280",
    stats: [
      { label: "Readmits",  value: "-30%", meta: "vs CMS benchmark" },
      { label: "Stars",     value: "4★+",  meta: "Quality measures" },
      { label: "Reporting", value: "API",  meta: "Real-time" },
    ],
    liveText: "Currently delivering value-based contracts across 5 plans",
  },
  {
    id: "owner",
    chip: "I run an agency",
    shortChip: "Owner",
    icon: Building2,
    accent: "gold",
    eyebrow: "For agency leaders",
    titleLines: [
      [{ text: "Scale" }, { text: "your", tone: "script" }],
      [{ text: "HH" }, { text: "operation.", tone: "mark" }],
    ],
    sub: "On-demand clinical staffing, compliance-ready playbooks and EMR-agnostic data. Joint-venture and MSO models for owners ready to grow margin.",
    primary:   { label: "Book exec call",    to: "/contact" },
    secondary: { label: "Operator playbook", to: "/for-you/owners" },
    videoSources: ["https://videos.pexels.com/video-files/8327878/8327878-uhd_3840_2160_25fps.mp4"],
    poster: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1280",
    stats: [
      { label: "Margin lift",  value: "+22%", meta: "Year over year" },
      { label: "Time-to-fill", value: "<48h", meta: "Clinical staffing" },
      { label: "EMR ready",    value: "All",  meta: "API integrations" },
    ],
    liveText: "Operations live across 14 California offices",
  },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sparkleLayerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { active: activeId, setActive } = useAudience();
  const reduced = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const active = AUDIENCES.find((a) => a.id === activeId)!;
  const activeIdx = AUDIENCES.findIndex((a) => a.id === activeId);

  // Mouse parallax (pointer-driven)
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      const stage = root.current?.querySelector<HTMLElement>(".hero__stage");
      if (stage) gsap.to(stage, { "--hero-px": `${dx * 14}px`, "--hero-py": `${dy * 14}px`, duration: 0.9, ease: "power3.out" });
      const floats = root.current?.querySelectorAll<HTMLElement>(".hero__float");
      floats?.forEach((el, i) => {
        gsap.to(el, { x: dx * (i + 1) * 7, y: dy * (i + 1) * 7, duration: 0.9, ease: "power3.out" });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  // Sparkle trail over stage
  useEffect(() => {
    const layer = sparkleLayerRef.current;
    if (!layer) return;
    const onMove = (e: MouseEvent) => {
      const rect = layer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      if (Math.random() > 0.45) return;
      const dot = document.createElement("span");
      dot.className = "hero__spark";
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      layer.appendChild(dot);
      gsap.fromTo(
        dot,
        { opacity: 0.85, scale: 0.4, y: 0 },
        { opacity: 0, scale: 1.4, y: -40, duration: 1, ease: "power2.out", onComplete: () => dot.remove() }
      );
    };
    layer.addEventListener("mousemove", onMove);
    return () => layer.removeEventListener("mousemove", onMove);
  }, []);

  // Aggressive autoplay
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    setVideoReady(false);
    vid.muted = true;
    const tryPlay = () => {
      vid.play()
        .then(() => setVideoReady(true))
        .catch(() => { /* autoplay blocked, poster stays */ });
    };
    tryPlay();
    const onCanPlay = () => { setVideoReady(true); tryPlay(); };
    const onLoaded  = () => tryPlay();
    vid.addEventListener("canplay", onCanPlay);
    vid.addEventListener("loadedmetadata", onLoaded);
    return () => {
      vid.removeEventListener("canplay", onCanPlay);
      vid.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [activeId]);

  // Manual char-split on the emphasized script word — runs every audience change
  const splitTitleChars = () => {
    const scriptEls = root.current?.querySelectorAll<HTMLElement>(".hero__script");
    scriptEls?.forEach((el) => {
      if (el.dataset.split === "1") return;
      const text = el.textContent ?? "";
      el.textContent = "";
      el.setAttribute("aria-label", text);
      el.dataset.split = "1";
      // Render letters wrapped in masked spans for clean letter-by-letter reveal
      const frag = document.createDocumentFragment();
      [...text].forEach((ch) => {
        const wrap = document.createElement("span");
        wrap.className = "hero__char";
        wrap.setAttribute("aria-hidden", "true");
        const inner = document.createElement("span");
        inner.className = "hero__char-inner";
        inner.textContent = ch === " " ? " " : ch;
        wrap.appendChild(inner);
        frag.appendChild(wrap);
      });
      el.appendChild(frag);
    });
  };

  useGSAP(() => { splitTitleChars(); }, { scope: root, dependencies: [activeId] });

  // Mount animation
  useGSAP(() => {
    if (reduced) {
      // Static reveal — no transforms on the stage (preserves CSS-var transform)
      gsap.set([
        ".hero__switcher", ".hero__chip", ".hero__title-line", ".hero__sub",
        ".hero__ctas > *", ".hero__live-card", ".hero__float", ".hero__counter",
        ".hero__char-inner",
      ], { opacity: 1, y: 0, x: 0, scale: 1, yPercent: 0 });
      gsap.set(".hero__stage", { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero__switcher", { y: 16, opacity: 0, duration: 0.55, ease: "power2.out" })
      .from(".hero__chip", { y: 12, opacity: 0, duration: 0.45 }, "-=0.28")
      .from(".hero__title-line", { y: 64, opacity: 0, duration: 0.95, stagger: 0.085, ease: "expo.out" }, "-=0.25")
      .from(".hero__char-inner", { yPercent: 110, duration: 0.7, stagger: 0.04, ease: "expo.out" }, "-=0.78")
      .from(".hero__sub", { y: 14, opacity: 0, duration: 0.55 }, "-=0.5")
      .from(".hero__ctas > *", { y: 14, opacity: 0, duration: 0.5, stagger: 0.07 }, "-=0.4")
      .from(".hero__live-card", { y: 14, opacity: 0, duration: 0.5 }, "-=0.3")
      .from(".hero__stage", { "--hero-sk": 0.92, opacity: 0, duration: 1.05, ease: "power4.out" }, 0.2)
      .from(".hero__float", { y: 22, opacity: 0, scale: 0.94, duration: 0.6, stagger: 0.085, ease: "back.out(1.6)" }, "-=0.65")
      .from(".hero__counter", { x: 20, opacity: 0, duration: 0.5 }, "-=0.5");

    gsap.to(".hero__live-pulse", { scale: 1.5, opacity: 0.4, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, { scope: root, dependencies: [reduced] });

  // Scroll-driven parallax on stage + floats
  useGSAP(() => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;

    const trig = ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(stage, {
          "--hero-sy": `${p * -60}px`,
          "--hero-sk": 1 - p * 0.06,
        });
        const floats = root.current?.querySelectorAll<HTMLElement>(".hero__float");
        floats?.forEach((el, i) => {
          gsap.set(el, { yPercent: p * (i % 2 === 0 ? -22 : 18) });
        });
      },
    });

    return () => { trig.kill(); };
  }, { scope: root, dependencies: [reduced] });

  // Audience morph + horizontal shimmer wipe across the title
  const handleSelect = (id: AudienceId) => {
    if (id === activeId) return;
    if (reduced) { setActive(id); return; }

    const titleEl = titleRef.current;
    // Trigger CSS shimmer by toggling a class
    if (titleEl) {
      titleEl.classList.remove("is-shimmering");
      // force reflow to restart animation
      void titleEl.offsetWidth;
      titleEl.classList.add("is-shimmering");
      window.setTimeout(() => titleEl.classList.remove("is-shimmering"), 900);
    }

    const ctx = gsap.context(() => {
      gsap.to([".hero__title-line", ".hero__sub", ".hero__live-card", ".hero__ctas > *", ".hero__chip"], {
        y: -20, opacity: 0, duration: 0.32, ease: "power2.in", stagger: 0.02,
        onComplete: () => {
          setActive(id);
          requestAnimationFrame(() => {
            // React just rendered the new audience's title — split chars on the fresh DOM
            splitTitleChars();
            gsap.fromTo(
              [".hero__chip", ".hero__title-line", ".hero__sub", ".hero__ctas > *", ".hero__live-card"],
              { y: 22, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.04 }
            );
            gsap.fromTo(".hero__char-inner", { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.04, ease: "expo.out" });
            gsap.fromTo(".hero__stage", { opacity: 0.55, "--hero-sk": 0.97 }, { opacity: 1, "--hero-sk": 1, duration: 0.7, ease: "power3.out" });
            gsap.fromTo(".hero__float", { y: 14, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.06, ease: "back.out(1.6)" });
          });
        },
      });
    }, contentRef);
    return () => ctx.revert();
  };

  return (
    <section ref={root} className={cn("hero", `hero--${active.accent}`)} data-section="hero" id="hero">
      <div className="hero__mesh" aria-hidden="true">
        <span className="hero__blob hero__blob--1" />
        <span className="hero__blob hero__blob--2" />
        <span className="hero__blob hero__blob--3" />
        <span className="hero__noise" />
        <span className="hero__grid-lines" />
      </div>

      <div className="hero__switcher" role="tablist" aria-label="Tell us who you are">
        <span className="hero__switcher-label">Tell us who you are</span>
        <div className="hero__switcher-track">
          {AUDIENCES.map((a) => {
            const Icon = a.icon;
            const isActive = a.id === activeId;
            return (
              <button
                key={a.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(a.id)}
                className={cn("hero__switch", `hero__switch--${a.accent}`, isActive && "is-active")}
                data-cursor="hover"
              >
                <span className="hero__switch-icon" aria-hidden="true"><Icon size={14} strokeWidth={2.4} /></span>
                <span className="hero__switch-label">{a.chip}</span>
                <span className="hero__switch-short" aria-hidden="true">{a.shortChip}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="hero__inner container container--wide">
        <div ref={contentRef} className="hero__content">
          <div className="hero__chip">
            <span className="hero__chip-num">0{activeIdx + 1}</span>
            <span className="hero__chip-text">{active.eyebrow}</span>
            <Sparkle size={13} className="hero__chip-sparkle" />
          </div>

          <h1 ref={titleRef} className="hero__title">
            <span className="hero__title-shimmer" aria-hidden="true" />
            {active.titleLines.map((line, li) => (
              <span key={li} className="hero__title-line">
                {line.map((part, pi) => {
                  if (part.tone === "script")
                    return <span key={pi} className="hero__word"><em className="hero__script">{part.text}</em></span>;
                  if (part.tone === "mark")
                    return <span key={pi} className="hero__word hero__word--mark">{part.text}</span>;
                  return <span key={pi} className="hero__word">{part.text}</span>;
                })}
              </span>
            ))}
          </h1>

          <p className="hero__sub">{active.sub}</p>

          <div className="hero__ctas">
            <Button to={active.primary.to} variant="primary" size="md" iconRight={<ArrowUpRight size={16} />}>
              {active.primary.label}
            </Button>
            <Button to={active.secondary.to} variant="outline" size="md">
              {active.secondary.label}
            </Button>
            <a href={SITE.phoneHref} className="hero__phone-cta" aria-label={`Call ${SITE.phone}`} data-cursor="hover">
              <span className="hero__phone-pulse" aria-hidden="true" />
              <Phone size={14} />
              <span>
                <em>24/7</em>
                {SITE.phone}
              </span>
            </a>
          </div>

          <div className="hero__live-card">
            <span className="hero__live-pulse" aria-hidden="true" />
            <span className="hero__live-eyebrow">Live now</span>
            <span className="hero__live-text">{active.liveText}</span>
          </div>
        </div>

        <div className="hero__media" aria-hidden="true">
          <div
            className="hero__stage"
            ref={(el) => {
              stageRef.current = el;
              sparkleLayerRef.current = el;
            }}
            style={{ backgroundImage: `url(${active.poster})` }}
          >
            {/* Always-visible image fallback under the video — never grey stage */}
            <img
              key={`img-${active.id}`}
              src={active.poster}
              alt=""
              className="hero__stage-fallback"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1280"
              height="720"
            />
            <video
              ref={videoRef}
              key={active.id}
              poster={active.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={cn(videoReady && "is-ready")}
              onError={(e) => {
                // Hide broken video — img fallback beneath stays visible
                e.currentTarget.style.display = "none";
              }}
            >
              {active.videoSources.map((src) => (
                <source key={src} src={src} type="video/mp4" />
              ))}
            </video>

            {/* film-grain overlay over stage */}
            <span className="hero__stage-grain" />

            <button type="button" className="hero__play" aria-label="Watch our story" data-cursor="hover">
              <Play size={14} fill="currentColor" /> Story · 60s
            </button>
            <span className="hero__stage-tag">{active.eyebrow}</span>

            {/* Cinematic mute hint */}
            <span className="hero__stage-mute" aria-hidden="true">
              <Volume2 size={12} /> Muted preview
            </span>

            {/* Audience progress counter */}
            <span className="hero__counter" aria-hidden="true">
              <strong>0{activeIdx + 1}</strong>
              <span>/ 0{AUDIENCES.length}</span>
            </span>
          </div>

          {/* Floating glass cards */}
          {active.stats.map((s, i) => (
            <div key={`${active.id}-${i}`} className={cn("hero__float", `hero__float--${i + 1}`)}>
              <span className="hero__float-eyebrow">{s.label}</span>
              <strong className="hero__float-value">{s.value}</strong>
              <span className="hero__float-meta">{s.meta}</span>
            </div>
          ))}

          {/* Orbiting badge — bigger, more prominent */}
          <div className="hero__orbit" aria-hidden="true">
            <svg viewBox="0 0 200 200" width="140" height="140">
              <defs>
                <path id="orbit-path" d="M 100, 100 m -82, 0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0" />
              </defs>
              <text className="hero__orbit-text">
                <textPath href="#orbit-path" startOffset="0">
                  PLEXIFY HEALTH · COMPASSIONATE CARE · CLINICALLY-LED · 24/7 ·
                </textPath>
              </text>
            </svg>
            <span className="hero__orbit-center">
              <Sparkle size={22} fill="currentColor" />
            </span>
          </div>
        </div>
      </div>

      <div className="hero__bottom-marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="hero__marquee-group">
              <span>Skilled Nursing</span><span className="hero__marquee-dot">●</span>
              <span>Physical Therapy</span><span className="hero__marquee-dot">●</span>
              <span>Occupational Therapy</span><span className="hero__marquee-dot">●</span>
              <span>Speech-Language Therapy</span><span className="hero__marquee-dot">●</span>
              <span>Medical Social Work</span><span className="hero__marquee-dot">●</span>
              <span>Home Health Aide</span><span className="hero__marquee-dot">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
