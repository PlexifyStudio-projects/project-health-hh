import { useMemo, useState } from "react";
import { Search, X, MessageSquare, Phone } from "lucide-react";
import { FAQ as DATA } from "@/data/faq";
import { Accordion } from "@/components/Accordion/Accordion";
import { Button } from "@/components/Button/Button";
import { CTABand } from "@/sections/CTABand/CTABand";
import { SITE } from "@/data/site";
import { cn } from "@/utils/cn";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import "./FAQ.scss";

type CatId = "all" | "patient" | "referral" | "insurance" | "career";

const CATS: Array<{ id: CatId; label: string; description: string }> = [
  { id: "all",       label: "All questions",        description: "Everything we get asked" },
  { id: "patient",   label: "Patients & Families",  description: "Coverage, admits, languages" },
  { id: "referral",  label: "Referral Sources",     description: "Hospitals, MDs, SNFs" },
  { id: "insurance", label: "Insurance",            description: "Plans, value-based, HEDIS" },
  { id: "career",    label: "Careers",              description: "Pay, CEUs, mentorship" },
];

export default function FAQPage() {
  const [cat, setCat] = useState<CatId>("all");
  const [query, setQuery] = useState("");

  useSeo({
    title: "FAQ | Plexify Health Home Health Care California",
    description:
      "Plain-English answers about home health coverage, Medicare, Medi-Cal, referrals, insurance and careers — from the Plexify Health team in California.",
    canonical: "https://plexifyhealth.com/faq",
    jsonLd: [
      buildBreadcrumbLd([
        { name: "Home", url: "https://plexifyhealth.com/" },
        { name: "FAQ", url: "https://plexifyhealth.com/faq" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: DATA.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  });

  const counts = useMemo(() => {
    const map: Record<CatId, number> = { all: DATA.length, patient: 0, referral: 0, insurance: 0, career: 0 };
    DATA.forEach((f) => { map[f.category] += 1; });
    return map;
  }, []);

  const items = useMemo(() => {
    const byCat = cat === "all" ? DATA : DATA.filter((f) => f.category === cat);
    if (!query.trim()) return byCat;
    const q = query.toLowerCase();
    return byCat.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [cat, query]);

  return (
    <>
      <section className="faq-hero">
        <div className="container container--wide">
          <span className="faq-hero__eyebrow">FAQ</span>
          <h1>Everything you wanted to know — <em>without the jargon</em>.</h1>
          <p>Plain-English answers from real Plexify clinicians and operators. Use the sidebar to jump by audience, or search any question across all categories.</p>

          <div className="faq-hero__search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search every FAQ..."
              aria-label="Search FAQs"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={14} />
              </button>
            )}
          </div>
          <p className="faq-hero__results" aria-live="polite">
            {items.length} {items.length === 1 ? "question" : "questions"}
            {cat !== "all" && <> · {CATS.find((c) => c.id === cat)?.label}</>}
            {query && <> · matching "{query}"</>}
          </p>
        </div>
      </section>

      <section className="faq-list section">
        <div className="container container--wide">
          <div className="faq-list__layout">
            <aside className="faq-sidebar" aria-label="FAQ categories">
              <span className="faq-sidebar__eyebrow">Browse by audience</span>
              <ol className="faq-sidebar__list">
                {CATS.map((c) => (
                  <li key={c.id} className={cn("faq-sidebar__item", cat === c.id && "is-active")}>
                    <button type="button" onClick={() => setCat(c.id)}>
                      <span className="faq-sidebar__label">
                        {c.label}
                        <span className="faq-sidebar__count">{counts[c.id]}</span>
                      </span>
                      <span className="faq-sidebar__desc">{c.description}</span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="faq-sidebar__help">
                <span className="faq-sidebar__help-eyebrow"><MessageSquare size={14} /> Still stuck?</span>
                <p>A real human is on the line every hour, every day.</p>
                <a href={SITE.phoneHref} className="faq-sidebar__help-phone"><Phone size={14} /> {SITE.phone}</a>
                <Button to="/contact" variant="outline" size="sm">Send a message</Button>
              </div>
            </aside>

            <div className="faq-list__main">
              {/* Compact filter chips for mobile */}
              <div className="faq-list__filters" role="tablist">
                {CATS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={cat === c.id}
                    className={cn("faq-list__filter", cat === c.id && "is-active")}
                    onClick={() => setCat(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {items.length === 0 ? (
                <div className="faq-list__empty">
                  <p>No questions match your search.</p>
                  <Button variant="outline" onClick={() => { setQuery(""); setCat("all"); }}>Reset filters</Button>
                </div>
              ) : (
                <Accordion items={items.map((f) => ({ question: f.question, answer: f.answer }))} />
              )}
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
