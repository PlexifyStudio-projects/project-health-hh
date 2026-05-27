import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AUDIENCES } from "@/data/audiences";
import "./audience-transition.scss";

export type AudienceId = "patient" | "nurse" | "referral" | "insurance" | "owner";

// Map context id -> data key (audiences.ts is keyed by slug).
const ID_TO_KEY: Record<AudienceId, string> = {
  patient: "patients",
  nurse: "caregivers",
  referral: "referrals",
  insurance: "insurance",
  owner: "owners",
};

interface Ctx {
  active: AudienceId;
  /** Switch audience instantly (no transition) — used by route sync and the hero switcher. */
  setActive: (id: AudienceId) => void;
  /** Switch audience with a subtle confirmation toast — used by "Personalize for me". */
  personalize: (id: AudienceId) => void;
  /** True briefly while the personalize cross-fade runs (lets sections ease their content swap). */
  isTransitioning: boolean;
}

const AudienceContext = createContext<Ctx>({
  active: "patient",
  setActive: () => {},
  personalize: () => {},
  isTransitioning: false,
});

// How long the confirmation toast stays on screen (must cover the CSS enter+hold+exit).
const TOAST_MS = 2600;
// Short window where `isTransitioning` is true so the page can gently cross-fade its content.
const FADE_MS = 420;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface Toast {
  id: AudienceId;
  title: string;
  accent: string;
}

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<AudienceId>("patient");
  const [toast, setToast] = useState<Toast | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const personalize = useCallback(
    (id: AudienceId) => {
      if (id === active) return;

      const meta = AUDIENCES.find((a) => a.key === ID_TO_KEY[id]);

      if (!meta || prefersReducedMotion()) {
        setActive(id);
        return;
      }

      // Restart cleanly if a previous toast is still showing.
      clearTimers();

      // Brief "settling" cross-fade so the content visibly refreshes, plus a small toast.
      setIsTransitioning(true);
      setActive(id);
      setToast({ id, title: meta.title, accent: meta.accent });

      timers.current.push(window.setTimeout(() => setIsTransitioning(false), FADE_MS));
      timers.current.push(window.setTimeout(() => setToast(null), TOAST_MS));
    },
    [active, clearTimers]
  );

  useEffect(() => clearTimers, [clearTimers]);

  // Gentle, page-wide cross-fade while the audience swaps — a soft cue that the
  // content just refreshed, without covering anything.
  useEffect(() => {
    document.body.classList.toggle("is-personalizing", isTransitioning);
    return () => document.body.classList.remove("is-personalizing");
  }, [isTransitioning]);

  return (
    <AudienceContext.Provider value={{ active, setActive, personalize, isTransitioning }}>
      {children}

      {toast && (
        <div
          className={`audience-toast audience-toast--${toast.accent}`}
          role="status"
          aria-live="polite"
        >
          <span className="audience-toast__check" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span className="audience-toast__text">
            <span className="audience-toast__eyebrow">Personalized for</span>
            <strong className="audience-toast__title">{toast.title}</strong>
          </span>
          <span className="audience-toast__progress" aria-hidden="true" />
        </div>
      )}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  return useContext(AudienceContext);
}
