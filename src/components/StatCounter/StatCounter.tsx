import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { TrendingUp } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import "./StatCounter.scss";

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  index?: number;
}

// Generate a deterministic sparkline path
function sparkline(seed: number): string {
  const points: number[] = [];
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    const noise = Math.sin(seed * 7.31 + i * 1.7) * 0.18;
    const trend = t * 0.55;
    points.push(0.2 + trend + noise * (1 - t * 0.4));
  }
  const w = 84;
  const h = 28;
  return points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = (1 - Math.max(0, Math.min(1, p))) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

// SVG ring geometry
const RING_RADIUS = 44;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Convert a value to a 0..1 ring-fill ratio (cap at 86% for the editorial arc style). */
function ringRatio(value: number, suffix: string): number {
  // For percentages, use the value directly (0..100). Otherwise infer a sensible cap.
  if (suffix.includes("%")) return Math.min(1, value / 100) * 0.86;
  if (suffix.includes("/")) return 0.86; // 24/7 always feels "complete"
  // For "K+" or generic, scale logarithmically capped at 0.86
  const norm = Math.min(1, Math.log10(Math.max(1, value) + 1) / 2.2);
  return norm * 0.86;
}

export function StatCounter({ value, suffix = "", prefix = "", label, description, index = 0 }: Props) {
  const numRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const sparkPathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const el = numRef.current;
      const root = rootRef.current;
      const ring = ringRef.current;
      const spark = sparkPathRef.current;
      if (!el || !root) return;

      const obj = { val: 0 };
      const targetRatio = ringRatio(value, suffix);
      const dashTarget = RING_CIRCUMFERENCE * (1 - targetRatio);

      // Reset displayed number to 0 (in case value changed via audience switch)
      el.textContent = "0";

      // Build paused tweens — fired by trigger OR by initial visibility check
      const numTween = gsap.to(obj, {
        val: value,
        duration: 2,
        ease: "power3.out",
        snap: { val: 1 },
        paused: true,
        onUpdate() { el.textContent = String(Math.round(obj.val)); },
      });

      let ringTween: gsap.core.Tween | null = null;
      if (ring) {
        gsap.set(ring, { strokeDasharray: RING_CIRCUMFERENCE, strokeDashoffset: RING_CIRCUMFERENCE });
        ringTween = gsap.to(ring, {
          strokeDashoffset: dashTarget,
          duration: 1.8,
          ease: "power2.out",
          paused: true,
        });
      }

      let sparkTween: gsap.core.Tween | null = null;
      if (spark) {
        const total = spark.getTotalLength?.() ?? 200;
        gsap.set(spark, { strokeDasharray: total, strokeDashoffset: total });
        sparkTween = gsap.to(spark, {
          strokeDashoffset: 0,
          duration: 1.6,
          delay: 0.2,
          ease: "power2.out",
          paused: true,
        });
      }

      const fire = () => {
        numTween.restart();
        ringTween?.restart();
        sparkTween?.restart();
      };

      // ScrollTrigger fires fire() when scrolled into view (incl. enterBack)
      const trig = ScrollTrigger.create({
        trigger: root,
        start: "top bottom-=80",
        onEnter: fire,
        onEnterBack: fire,
      });

      // Also fire immediately if section is already visible on mount
      const r = root.getBoundingClientRect();
      const inView = r.top < window.innerHeight - 80 && r.bottom > 0;
      if (inView) fire();

      return () => {
        trig.kill();
        numTween.kill();
        ringTween?.kill();
        sparkTween?.kill();
      };
    },
    { scope: rootRef, dependencies: [value, suffix] }
  );

  const sparkPath = sparkline(value + index);

  return (
    <div ref={rootRef} className="stat-counter">
      <div className="stat-counter__head">
        <span className="stat-counter__index">{String(index + 1).padStart(2, "0")}</span>
        <TrendingUp size={14} className="stat-counter__trend" />
      </div>

      <div className="stat-counter__hero">
        <svg
          className="stat-counter__ring"
          viewBox="0 0 100 100"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={`ring-grad-${index}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2D7FF9" />
              <stop offset="60%" stopColor="#34C77B" />
              <stop offset="100%" stopColor="#FF8B6B" />
            </linearGradient>
          </defs>
          <circle
            className="stat-counter__ring-track"
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            strokeWidth="3"
          />
          <circle
            ref={ringRef}
            className="stat-counter__ring-arc"
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke={`url(#ring-grad-${index})`}
            strokeWidth="3"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>

        <div className="stat-counter__value">
          {prefix && <span className="stat-counter__prefix">{prefix}</span>}
          <span ref={numRef} className="stat-counter__num">0</span>
          {suffix && <span className="stat-counter__suffix">{suffix}</span>}
        </div>
      </div>

      <svg className="stat-counter__spark" viewBox="0 0 84 28" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`spark-grad-${index}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#2D7FF9" stopOpacity="0.55" />
            <stop offset="55%"  stopColor="#34C77B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FF8B6B" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          ref={sparkPathRef}
          d={sparkPath}
          fill="none"
          stroke={`url(#spark-grad-${index})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d={`${sparkPath} L 84 28 L 0 28 Z`} fill={`url(#spark-grad-${index})`} fillOpacity="0.08" />
      </svg>

      <div className="stat-counter__foot">
        <div className="stat-counter__label">{label}</div>
        {description && <p className="stat-counter__description">{description}</p>}
      </div>
    </div>
  );
}
