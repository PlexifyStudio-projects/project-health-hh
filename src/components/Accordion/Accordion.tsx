import { useState, useId, useRef, useEffect, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";
import "./Accordion.scss";

interface Item {
  question: ReactNode;
  answer: ReactNode;
}

interface Props {
  items: Item[];
  className?: string;
}

export function Accordion({ items, className }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const baseId = useId();
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const iconRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Set initial state on mount: collapse all closed panels, open first.
  useEffect(() => {
    panelRefs.current.forEach((panel, idx) => {
      if (!panel) return;
      if (idx === openIdx) {
        panel.style.height = "auto";
        panel.style.opacity = "1";
        panel.style.overflow = "hidden";
      } else {
        panel.style.height = "0px";
        panel.style.opacity = "0";
        panel.style.overflow = "hidden";
      }
    });
    iconRefs.current.forEach((icon, idx) => {
      if (!icon) return;
      gsap.set(icon, { rotate: idx === openIdx ? 45 : 0 });
    });
    // run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animateOpen = (panel: HTMLDivElement, icon: HTMLSpanElement | null) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      panel.style.height = "auto";
      panel.style.opacity = "1";
      if (icon) icon.style.transform = "rotate(45deg)";
      return;
    }

    // Measure target height: temporarily set to auto, read scrollHeight via rect
    panel.style.height = "auto";
    const target = panel.getBoundingClientRect().height;
    panel.style.height = "0px";

    gsap.to(panel, {
      height: target,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        panel.style.height = "auto";
      },
    });
    if (icon) {
      gsap.to(icon, {
        rotate: 45,
        duration: 0.5,
        ease: "back.out(1.6)",
      });
    }
  };

  const animateClose = (panel: HTMLDivElement, icon: HTMLSpanElement | null) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      panel.style.height = "0px";
      panel.style.opacity = "0";
      if (icon) icon.style.transform = "rotate(0deg)";
      return;
    }

    // Lock current height, then tween to 0
    const current = panel.getBoundingClientRect().height;
    panel.style.height = `${current}px`;

    gsap.to(panel, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
    if (icon) {
      gsap.to(icon, {
        rotate: 0,
        duration: 0.5,
        ease: "back.out(1.6)",
      });
    }
  };

  const handleToggle = (idx: number) => {
    const willClose = openIdx === idx;
    const nextOpen = willClose ? null : idx;
    const previous = openIdx;

    // Close currently open one (if different)
    if (previous !== null && previous !== nextOpen) {
      const prevPanel = panelRefs.current[previous];
      const prevIcon = iconRefs.current[previous];
      if (prevPanel) animateClose(prevPanel, prevIcon ?? null);
    }
    // Open new one
    if (nextOpen !== null) {
      const panel = panelRefs.current[nextOpen];
      const icon = iconRefs.current[nextOpen];
      if (panel) animateOpen(panel, icon ?? null);
    } else if (willClose) {
      // We're closing the active one
      const panel = panelRefs.current[idx];
      const icon = iconRefs.current[idx];
      if (panel) animateClose(panel, icon ?? null);
    }

    setOpenIdx(nextOpen);
  };

  return (
    <div className={cn("accordion", className)}>
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className={cn("accordion__item", isOpen && "is-open")}>
            <h3 className="accordion__heading">
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${idx}`}
                id={`${baseId}-trigger-${idx}`}
                onClick={() => handleToggle(idx)}
              >
                <span className="accordion__question">{item.question}</span>
                <span
                  ref={(el) => { iconRefs.current[idx] = el; }}
                  className="accordion__icon"
                  aria-hidden="true"
                >
                  <Plus size={20} />
                </span>
              </button>
            </h3>
            <div
              ref={(el) => { panelRefs.current[idx] = el; }}
              id={`${baseId}-panel-${idx}`}
              role="region"
              aria-labelledby={`${baseId}-trigger-${idx}`}
              className="accordion__panel"
            >
              <div className="accordion__answer">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
