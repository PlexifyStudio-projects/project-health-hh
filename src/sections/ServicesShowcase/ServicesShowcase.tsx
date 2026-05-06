import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Stethoscope, Activity, Hand, Mic, HandHeart, HeartHandshake } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SERVICES } from "@/data/services";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Button } from "@/components/Button/Button";
import { useAudience } from "@/lib/audience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AUDIENCE_CONTENT } from "@/data/audience-content";
import "./ServicesShowcase.scss";

const ICONS: Record<string, React.ElementType> = {
  Stethoscope, Activity, Hand, Mic, HandHeart, HeartHandshake,
};

export function ServicesShowcase() {
  const { active } = useAudience();
  const content = AUDIENCE_CONTENT[active];
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      if (reduced) {
        // Ensure tiles are visible if reduced motion was preferred.
        gsap.set(root.querySelectorAll<HTMLElement>(".service-tile"), { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      const tiles = gsap.utils.toArray<HTMLElement>(".service-tile", root);
      const grid = root.querySelector<HTMLElement>(".services-showcase__grid");
      if (!tiles.length || !grid) return;

      // ---- Cinematic reveal: long stagger sequence scrubbed by scroll ----
      gsap.set(tiles, { y: 80, autoAlpha: 0, scale: 0.94, transformOrigin: "50% 80%" });

      const revealTrig = ScrollTrigger.create({
        trigger: grid,
        start: "top 82%",
        end: "bottom 65%",
        scrub: 0.8,
        animation: gsap.timeline().to(tiles, {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          ease: "power3.out",
          duration: 1,
          stagger: { each: 0.18, from: "start" },
        }),
      });

      // ---- Ken-burns slow zoom on each tile's image when entering viewport ----
      const burnTrigs: ScrollTrigger[] = [];
      tiles.forEach((tile) => {
        const img = tile.querySelector<HTMLElement>(".service-tile__media img");
        if (!img) return;
        gsap.set(img, { scale: 1, transformOrigin: "50% 50%" });
        const t = gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.05,
            duration: 4,
            ease: "none",
            paused: true,
            overwrite: false,
          }
        );
        const st = ScrollTrigger.create({
          trigger: tile,
          start: "top 85%",
          once: true,
          onEnter: () => t.play(),
        });
        burnTrigs.push(st);
      });

      // ---- 3D tilt on hover with quickTo for buttery cursor follow ----
      const tiltCleanup: Array<() => void> = [];
      tiles.forEach((tile) => {
        const inner = tile.querySelector<HTMLElement>(".service-tile__inner");
        if (!inner) return;

        const qx = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3.out" });
        const qy = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3.out" });
        const qz = gsap.quickTo(inner, "y", { duration: 0.4, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const rect = tile.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          // ±7deg, anchored on cursor
          qx((px - 0.5) * 14);
          qy((0.5 - py) * 10);
          qz(-4);
        };
        const onLeave = () => {
          qx(0); qy(0); qz(0);
        };

        tile.addEventListener("pointermove", onMove);
        tile.addEventListener("pointerleave", onLeave);
        tiltCleanup.push(() => {
          tile.removeEventListener("pointermove", onMove);
          tile.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => {
        revealTrig.kill();
        burnTrigs.forEach((s) => s.kill());
        tiltCleanup.forEach((fn) => fn());
      };
    },
    { scope: ref, dependencies: [reduced, active] }
  );

  return (
    <section
      ref={ref}
      className="services-showcase section"
      data-section="disciplines"
      id="disciplines"
    >
      <div className="container container--wide">
        <SectionHeader
          eyebrow={content.servicesEyebrow}
          title={<>{content.servicesTitle}<em>{content.servicesTitleAccent}</em></>}
          description={content.servicesDescription}
        />

        <div className="services-showcase__grid">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.iconName] ?? Stethoscope;
            const frame = content.serviceFrames?.[s.slug];
            const tileImage = frame?.image ?? s.image;
            const tileShort = frame?.short ?? s.short;
            return (
              <Link key={`${active}-${s.slug}`} to={`/services/${s.slug}`} className="service-tile">
                <div className="service-tile__inner">
                  <div className="service-tile__media">
                    <img
                      src={tileImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width="1280"
                      height="720"
                    />
                  </div>
                  <div className="service-tile__body">
                    <span className="service-tile__icon"><Icon size={20} /></span>
                    <h3 className="service-tile__title">{s.title}</h3>
                    <p className="service-tile__short">{tileShort}</p>
                    <span className="service-tile__link">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="services-showcase__footer">
          <Button to="/services" variant="outline" iconRight={<ArrowRight size={16} />}>
            View all services
          </Button>
        </div>
      </div>
    </section>
  );
}
