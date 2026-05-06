import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./Cursor.scss";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Clear any stale inline sizing from previous renders / removed magnetic snap
    if (ring.current) {
      ring.current.style.width = "";
      ring.current.style.height = "";
      ring.current.style.borderRadius = "";
    }

    const xDot = gsap.quickTo(dot.current!, "x", { duration: 0.04, ease: "power2.out" });
    const yDot = gsap.quickTo(dot.current!, "y", { duration: 0.04, ease: "power2.out" });
    const xRing = gsap.quickTo(ring.current!, "x", { duration: 0.18, ease: "power3.out" });
    const yRing = gsap.quickTo(ring.current!, "y", { duration: 0.18, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element)?.closest("a,button,[data-cursor='hover']");
      if (t) {
        ring.current?.classList.add("is-hover");
        dot.current?.classList.add("is-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = (e.target as Element)?.closest("a,button,[data-cursor='hover']");
      if (t) {
        ring.current?.classList.remove("is-hover");
        dot.current?.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    document.body.classList.add("has-custom-cursor");
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [reduced]);

  return (
    <>
      <div ref={ring} className="cursor cursor--ring" aria-hidden="true" />
      <div ref={dot}  className="cursor cursor--dot"  aria-hidden="true" />
    </>
  );
}
