import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import "./ScrollReveal.scss";

export type ScrollRevealMode = "default" | "slide-up" | "scale-in" | "blur-in" | "slide-in-right";

interface Props {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  stagger?: number;
  childSelector?: string;
  /** Visual mode for the reveal. Defaults to current "slide-up" behavior. */
  mode?: ScrollRevealMode;
}

export function ScrollReveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
  stagger = 0,
  childSelector,
  mode = "default",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = childSelector
      ? Array.from(root.querySelectorAll<HTMLElement>(childSelector))
      : [root];

    const modeClass = mode === "default" ? "" : `reveal-target--${mode}`;

    // initial state via class — CSS handles transition
    targets.forEach((el) => {
      el.classList.add("reveal-target");
      if (modeClass) el.classList.add(modeClass);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = targets.indexOf(el);
            el.style.transitionDelay = `${delay + idx * stagger}s`;
            el.classList.add("is-revealed");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    targets.forEach((el) => io.observe(el));

    // Fail-safe: force reveal after 1.5s if observer didn't fire
    const failsafe = window.setTimeout(() => {
      targets.forEach((el) => el.classList.add("is-revealed"));
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [childSelector, delay, stagger, mode]);

  return (
    // @ts-expect-error – dynamic tag
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
