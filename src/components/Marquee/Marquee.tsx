import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/utils/cn";
import "./Marquee.scss";

export type MarqueeDirection = "ltr" | "rtl";

interface Props {
  children: ReactNode;
  speed?: "slow" | "normal" | "fast";
  /**
   * @deprecated use `direction="rtl"` instead. Kept for backwards compatibility.
   */
  reverse?: boolean;
  direction?: MarqueeDirection;
  className?: string;
  pauseOnHover?: boolean;
  /**
   * Color used for the SVG mask edges. Set to a transparent value or `"none"` to disable the fade.
   * Accepts any CSS color (default: white).
   */
  gradientMaskColor?: string;
}

export function Marquee({
  children,
  speed = "normal",
  reverse,
  direction,
  className,
  pauseOnHover = true,
  gradientMaskColor,
}: Props) {
  // Effective direction: explicit `direction` wins; fallback to legacy `reverse` -> rtl.
  const dir: MarqueeDirection = direction ?? (reverse ? "rtl" : "ltr");

  const style: CSSProperties | undefined = gradientMaskColor
    ? ({ ["--marquee-mask-color" as never]: gradientMaskColor } as CSSProperties)
    : undefined;

  return (
    <div
      className={cn(
        "marquee",
        `marquee--${speed}`,
        `marquee--${dir}`,
        pauseOnHover && "marquee--pauseable",
        className
      )}
      style={style}
    >
      <div className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
