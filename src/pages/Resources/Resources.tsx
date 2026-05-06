import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search, Mail, Sparkles, X } from "lucide-react";
import { ARTICLES } from "@/data/articles";
import { Tag } from "@/components/Tag/Tag";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { Button } from "@/components/Button/Button";
import { CTABand } from "@/sections/CTABand/CTABand";
import { formatDate } from "@/utils/format";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import { cn } from "@/utils/cn";
import "./Resources.scss";

const CATS = ["All", ...Array.from(new Set(ARTICLES.map((a) => a.category)))];
const TAG_TONES: Record<string, "blue" | "green" | "coral" | "gold" | "ink"> = {
  "Patients & Families": "blue",
  "Careers":             "green",
  "Insurance":           "ink",
  "Owners & Leadership": "gold",
  "Therapy":             "coral",
  "Caregiving":          "coral",
};

function tagTone(category: string) {
  return TAG_TONES[category] ?? "blue";
}

export default function Resources() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  useSeo({
    title: "Home Health Resources & Guides | Plexify Health",
    description:
      "Clinician-written guides on home health, Medicare coverage, caregiver support, careers and payer playbooks. Updated monthly by the Plexify Health team in California.",
    canonical: "https://plexifyhealth.com/resources",
    jsonLd: [
      buildBreadcrumbLd([
        { name: "Home", url: "https://plexifyhealth.com/" },
        { name: "Resources", url: "https://plexifyhealth.com/resources" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Plexify Health Resources",
        url: "https://plexifyhealth.com/resources",
        publisher: {
          "@type": "Organization",
          name: "Plexify Health",
          logo: {
            "@type": "ImageObject",
            url: "https://plexifyhealth.com/favicon.svg",
          },
        },
        blogPost: ARTICLES.slice(0, 10).map((a) => ({
          "@type": "BlogPosting",
          headline: a.title,
          url: `https://plexifyhealth.com/resources/${a.slug}`,
          datePublished: a.date,
          image: a.image,
        })),
      },
    ],
  });

  const items = useMemo(() => {
    const byCat = filter === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === filter);
    if (!query.trim()) return byCat;
    const q = query.toLowerCase();
    return byCat.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [filter, query]);

  // Featured = 3 newest by date
  const featured = useMemo(
    () => [...ARTICLES].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 3),
    []
  );

  return (
    <>
      <section className="resources-hero">
        <div className="container container--wide">
          <span className="resources-hero__eyebrow">Resources</span>
          <h1>Guides written by people <em>who do the work</em>.</h1>
          <p>Clinical insights, operational playbooks and patient-friendly explainers — refreshed every month, peer-reviewed by our medical director.</p>

          <div className="resources-hero__meta">
            <span><Sparkles size={14} /> {ARTICLES.length} articles</span>
            <span>· {CATS.length - 1} topics</span>
            <span>· Updated monthly</span>
          </div>
        </div>
      </section>

      {/* Featured carousel */}
      <section className="resources-featured section">
        <div className="container container--wide">
          <div className="resources-featured__head">
            <span className="resources-featured__eyebrow">Editor's picks · This month</span>
            <h2>Latest from the team.</h2>
          </div>
          <ScrollReveal childSelector=".resources-featured__card" stagger={0.08} className="resources-featured__rail">
            {featured.map((a, i) => (
              <Link key={a.slug} to={`/resources/${a.slug}`} className={cn("resources-featured__card", i === 0 && "resources-featured__card--lead")}>
                <div className="resources-featured__media">
                  <img src={a.image} alt="" loading="lazy" decoding="async" />
                  <span className="resources-featured__badge"><Tag tone={tagTone(a.category)}>{a.category}</Tag></span>
                </div>
                <div className="resources-featured__body">
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <span className="resources-featured__meta">
                    {formatDate(a.date)} · {a.readMinutes} min read
                  </span>
                </div>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="resources-list section section--bg-mist">
        <div className="container container--wide">
          <div className="resources-list__bar">
            <div className="resources-list__filters" role="tablist" aria-label="Filter by category">
              {CATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  className={cn("resources-list__filter", filter === c && "is-active")}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="resources-list__search">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                aria-label="Search articles"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {items.length === 0 ? (
            <div className="resources-list__empty">
              <p>No articles match your search.</p>
              <Button variant="outline" onClick={() => { setQuery(""); setFilter("All"); }}>Reset filters</Button>
            </div>
          ) : (
            <ScrollReveal childSelector=".article-card" stagger={0.05} className="resources-list__grid">
              {items.map((a) => (
                <Link key={a.slug} to={`/resources/${a.slug}`} className="article-card">
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
                      <Tag tone={tagTone(a.category)}>{a.category}</Tag>
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
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="resources-newsletter section">
        <div className="container container--wide">
          <div className="resources-newsletter__card">
            <div className="resources-newsletter__copy">
              <span className="resources-newsletter__eyebrow"><Mail size={14} /> Newsletter</span>
              <h2>One email a month. <em>Zero spam.</em></h2>
              <p>The best new articles, real outcome data and operator playbooks — sent on the first Tuesday of each month.</p>
            </div>
            <form
              className="resources-newsletter__form"
              onSubmit={(e) => { e.preventDefault(); }}
              noValidate
            >
              <label className="visually-hidden" htmlFor="rs-email">Email address</label>
              <input id="rs-email" type="email" required placeholder="you@email.com" className="form-input" />
              <Button variant="primary" iconRight={<ArrowUpRight size={16} />}>Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
