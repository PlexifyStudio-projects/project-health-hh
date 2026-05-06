import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowUpRight, BookOpen, ChevronDown, Quote } from "lucide-react";
import { ARTICLES } from "@/data/articles";
import { TEAM } from "@/data/team";
import { Tag } from "@/components/Tag/Tag";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { CTABand } from "@/sections/CTABand/CTABand";
import { formatDate } from "@/utils/format";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import { cn } from "@/utils/cn";
import "./Article.scss";

interface Section { id: string; title: string }

// Maps article category → an author from /data/team
function pickAuthor(category: string) {
  if (category === "Patients & Families") return TEAM[0]; // Dr. Elena Marquez
  if (category === "Careers") return TEAM[1];             // Sarah Chen
  if (category === "Owners & Leadership") return TEAM[2]; // Marcus Webb
  if (category === "Therapy") return TEAM[3];             // Aisha Patel
  if (category === "Insurance") return TEAM[2];           // Marcus Webb (operations)
  return TEAM[1]; // default to clinical ops
}

// Section structure used to render the body + TOC
const SECTIONS: Section[] = [
  { id: "intro",     title: "Why this matters" },
  { id: "context",   title: "The context" },
  { id: "key-points", title: "Three things to know" },
  { id: "evidence",  title: "What the evidence says" },
  { id: "next",      title: "What to do next" },
];

export default function Article() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [tocOpenMobile, setTocOpenMobile] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Author resolution moved up so it can be used in JSON-LD
  const articleAuthor = article ? pickAuthor(article.category) : undefined;

  useSeo({
    title: article
      ? `${article.title.length > 50 ? article.title.slice(0, 55).trim() + "…" : article.title} | Plexify Health`
      : "Article | Plexify Health",
    description: article?.excerpt,
    canonical: `https://plexifyhealth.com/resources/${slug}`,
    ogImage: article?.image,
    ogType: "article",
    jsonLd: article
      ? [
          buildBreadcrumbLd([
            { name: "Home", url: "https://plexifyhealth.com/" },
            { name: "Resources", url: "https://plexifyhealth.com/resources" },
            {
              name: article.title,
              url: `https://plexifyhealth.com/resources/${article.slug}`,
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: [article.image],
            datePublished: article.date,
            dateModified: article.date,
            articleSection: article.category,
            wordCount: article.readMinutes * 220,
            inLanguage: "en-US",
            author: articleAuthor
              ? {
                  "@type": "Person",
                  name: articleAuthor.name,
                  jobTitle: articleAuthor.role,
                  affiliation: {
                    "@type": "Organization",
                    name: "Plexify Health",
                  },
                }
              : { "@type": "Organization", name: "Plexify Health" },
            publisher: {
              "@type": "Organization",
              name: "Plexify Health",
              logo: {
                "@type": "ImageObject",
                url: "https://plexifyhealth.com/favicon.svg",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://plexifyhealth.com/resources/${article.slug}`,
            },
          },
        ]
      : undefined,
  });

  // Scroll-spy for TOC
  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;
    const headings = SECTIONS.map((s) => root.querySelector<HTMLElement>(`#${s.id}`)).filter(Boolean) as HTMLElement[];
    if (headings.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [slug]);

  const related = useMemo(() => {
    if (!article) return [];
    return ARTICLES
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .concat(ARTICLES.filter((a) => a.slug !== article.slug && a.category !== article.category))
      .slice(0, 3);
  }, [article]);

  if (!article || !articleAuthor) return <Navigate to="/resources" replace />;
  const author = articleAuthor;

  return (
    <>
      <article className="article">
        <div className="container container--narrow">
          <Link to="/resources" className="article__back"><ArrowLeft size={14} /> All articles</Link>
          <div className="article__meta">
            <Tag tone="blue">{article.category}</Tag>
            <span><Clock size={14} /> {article.readMinutes} min read · {formatDate(article.date)}</span>
          </div>
          <h1 className="article__title">{article.title}</h1>
          <p className="article__excerpt">{article.excerpt}</p>

          <div className="article__byline">
            <img src={author.image} alt={`Photo of ${author.name}`} loading="lazy" />
            <div>
              <strong>{author.name}</strong>
              <span>{author.role}</span>
            </div>
          </div>
        </div>

        <div className="article__hero">
          <img
            src={article.image}
            alt=""
            loading="eager"
            decoding="async"
            width="1280"
            height="720"
          />
        </div>

        {/* TOC + body grid */}
        <div className="container container--wide">
          <div className="article__layout">
            <aside className="article-toc" aria-label="Table of contents">
              {/* Mobile collapsible */}
              <button
                type="button"
                className="article-toc__mobile-trigger"
                aria-expanded={tocOpenMobile}
                aria-controls="article-toc-list"
                onClick={() => setTocOpenMobile((s) => !s)}
              >
                <span><BookOpen size={14} /> In this article</span>
                <ChevronDown size={16} className={cn("article-toc__chevron", tocOpenMobile && "is-open")} />
              </button>

              <div className={cn("article-toc__panel", tocOpenMobile && "is-open")} id="article-toc-list">
                <span className="article-toc__eyebrow"><BookOpen size={14} /> Contents</span>
                <ol className="article-toc__list">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id} className={cn("article-toc__item", activeId === s.id && "is-active")}>
                      <a href={`#${s.id}`} onClick={() => setTocOpenMobile(false)}>
                        <span className="article-toc__num">{String(i + 1).padStart(2, "0")}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>

                <div className="article-toc__share">
                  <span>Share</span>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer">X</a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://plexifyhealth.com/resources/${article.slug}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </aside>

            <div className="article__body" ref={bodyRef}>
              <p className="article__lede">
                {article.excerpt} The team at Plexify Health put together this guide to help you make sense of the topic and act on it — without wading through jargon.
              </p>

              <h2 id="intro">Why this matters</h2>
              <p>Home health care is one of the fastest-growing segments in U.S. healthcare. With over 13,000 agencies serving more than 5 million patients each year, and yet the patient experience and clinical outcomes still vary dramatically across providers. The choices you make about who delivers care — and how it's coordinated — can change recovery time, readmission risk and quality of life for years to come.</p>

              <blockquote className="article__pullquote">
                <Quote size={28} aria-hidden="true" />
                <p>"Most readmissions in the first 30 days are preventable when home health is well-coordinated. The data is clear, the operational playbook is hard."</p>
                <cite>— {author.name}, {author.role}</cite>
              </blockquote>

              <h2 id="context">The context</h2>
              <p>Care teams, payers and policymakers have spent the last five years redesigning the model. The 2026 Medicare home-health rule, value-based contracting, EMR-API maturity and post-pandemic patient expectations have all converged. The result: home is more capable than ever — but only when the agency on the other end is operating at the new bar.</p>

              <p>That's where the difference between providers shows up. A clinically-led team with real operational backbone — staffing depth, EMR integration, 24/7 nursing line — looks dramatically different from a billing-first agency that ticks Medicare boxes. Outcomes prove it.</p>

              <div className="article__callout">
                <strong>What you'll learn:</strong> The three pillars that separate top-decile home health, the financial mechanics that drive coverage decisions, and the practical steps to take this week.
              </div>

              <h2 id="key-points">Three things to know</h2>
              <ol className="article__list">
                <li><strong>Coverage is broader than most people think.</strong> Medicare, Medi-Cal, VA and most private plans cover medically-necessary home health for eligible patients. Most people pay nothing.</li>
                <li><strong>Quality measures are public.</strong> CMS publishes Star Ratings, hospitalization rates, and patient-experience data for every certified agency. Use them.</li>
                <li><strong>The team approach wins.</strong> RN-led multidisciplinary care reduces readmissions by up to 30% versus single-discipline visits — even matched for patient acuity.</li>
              </ol>

              <h2 id="evidence">What the evidence says</h2>
              <p>Multiple studies — and our own internal data across 15,000+ patients — show that the strongest predictor of post-discharge success isn't a single intervention. It's the cohesion of the care team. A primary RN who owns the plan, multi-discipline visits in the first 14 days, and a 24/7 nursing line for the family.</p>

              <p>Patients with that kind of coverage are admitted within 24 hours, reach goals 18% faster on average, and report 98% satisfaction post-discharge. Those numbers don't come from one star clinician — they come from how the operation is run.</p>

              <h2 id="next">What to do next</h2>
              <p>If you're a patient or family member: ask your discharge planner, primary care physician, or hospitalist about a home health referral. Verify your insurance coverage. Pick an agency with a published Star Rating of 4+ and a real 24/7 nursing line. We're here to help if you'd like a free assessment.</p>

              <p>If you're a clinician, referrer, payer or operator: the rest of our resources library digs deeper into each angle. Pick a path below — or just reach out. A real person on our team replies within one business day.</p>
            </div>
          </div>
        </div>
      </article>

      {/* Author panel */}
      <section className="article-author section section--bg-mist">
        <div className="container container--narrow">
          <div className="article-author__card">
            <img src={author.image} alt={author.name} loading="lazy" />
            <div className="article-author__body">
              <span className="article-author__eyebrow">About the author</span>
              <h3>{author.name}</h3>
              <span className="article-author__role">{author.role}</span>
              <p>{author.bio}</p>
              <Link to="/about" className="article-author__more">
                Meet the team <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section className="article-related section">
        <div className="container container--wide">
          <div className="article-related__head">
            <span className="article-related__eyebrow">Keep reading</span>
            <h2>Related guides.</h2>
          </div>
          <ScrollReveal childSelector=".article-related__card" stagger={0.06} className="article-related__grid">
            {related.map((a) => (
              <Link key={a.slug} to={`/resources/${a.slug}`} className="article-related__card">
                <div className="article-related__media">
                  <img src={a.image} alt="" loading="lazy" />
                </div>
                <div className="article-related__body">
                  <Tag tone="blue">{a.category}</Tag>
                  <h3>{a.title}</h3>
                  <span className="article-related__meta">{formatDate(a.date)} · {a.readMinutes} min</span>
                </div>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
