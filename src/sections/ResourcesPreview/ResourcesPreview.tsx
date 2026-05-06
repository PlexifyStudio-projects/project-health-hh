import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { ARTICLES } from "@/data/articles";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { Tag } from "@/components/Tag/Tag";
import { formatDate } from "@/utils/format";
import { useAudience } from "@/lib/audience";
import { AUDIENCE_CONTENT } from "@/data/audience-content";
import "./ResourcesPreview.scss";

interface Props {
  audienceAware?: boolean;
}

export function ResourcesPreview({ audienceAware = true }: Props) {
  const { active } = useAudience();
  const content = AUDIENCE_CONTENT[active];
  const sectionRef = useRef<HTMLElement>(null);

  // Filter by audience category, fall back to top 3 if too few
  const filtered = audienceAware && content.resourceCategory
    ? ARTICLES.filter((a) => a.category === content.resourceCategory)
    : ARTICLES;
  const items = (filtered.length >= 1 ? filtered : ARTICLES).slice(0, 3);

  // Magnetic effect for the "Read article" links — link follows cursor by ±4px
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const cards = Array.from(root.querySelectorAll<HTMLAnchorElement>(".article-card"));
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const link = card.querySelector<HTMLElement>(".article-card__more");
      if (!link) return;

      const xTo = gsap.quickTo(link, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(link, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // Cap at ±4px
        const dx = Math.max(-4, Math.min(4, (e.clientX - cx) * 0.04));
        const dy = Math.max(-4, Math.min(4, (e.clientY - cy) * 0.04));
        xTo(dx);
        yTo(dy);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach((c) => c());
    };
  }, [active, items.length]);

  return (
    <section ref={sectionRef} className="resources-preview section" data-section="resources" id="resources">
      <div className="container container--wide">
        <SectionHeader
          eyebrow={audienceAware ? `Reading for ${content.audienceLabel.toLowerCase()}` : "Resources"}
          title={<>Real guides, <em>written by clinicians</em>.</>}
          description={audienceAware
            ? `Curated for ${content.audienceLabel.toLowerCase()}. Refreshed every month.`
            : "From caregivers and care receivers to leaders building HH operations — read what our medical director and team write every month."}
        />

        <ScrollReveal childSelector=".article-card" stagger={0.08} className="resources-preview__grid">
          {items.map((a) => (
            <Link key={`${active}-${a.slug}`} to={`/resources/${a.slug}`} className="article-card">
              <div className="article-card__media">
                <img
                  src={a.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width="1280"
                  height="720"
                />
              </div>
              <div className="article-card__body">
                <div className="article-card__meta">
                  <Tag tone="blue">{a.category}</Tag>
                  <span>{formatDate(a.date)} · {a.readMinutes} min</span>
                </div>
                <h3 className="article-card__title">{a.title}</h3>
                <p className="article-card__excerpt">{a.excerpt}</p>
                <span className="article-card__more">
                  Read article <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
