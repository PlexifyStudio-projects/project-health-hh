import { useEffect } from "react";

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  /** Optional Open Graph image URL — defaults to the site's og-image. */
  ogImage?: string;
  /** Open Graph type — "website" (default), "article", "profile" etc. */
  ogType?: "website" | "article" | "profile" | "product";
  /** Page-specific JSON-LD payload appended to <head>; auto-cleaned on unmount. */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  /** Skip auto crawling for utility pages (404, etc). */
  noindex?: boolean;
  /** Optional comma-separated keywords for the page (rarely impactful, but harmless). */
  keywords?: string;
}

const SEO_TAG_FLAG = "data-seo-managed";
const DEFAULT_OG_IMAGE = "https://plexifyhealth.com/og-image.svg";
const DEFAULT_ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

function setMeta(
  selector: string,
  attr: "name" | "property",
  attrValue: string,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrValue);
    el.setAttribute(SEO_TAG_FLAG, "1");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo({
  title,
  description,
  canonical,
  ogImage,
  ogType,
  jsonLd,
  noindex,
  keywords,
}: SeoProps) {
  useEffect(() => {
    // ---- TITLE
    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', "property", "og:title", title);
      setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    }

    // ---- DESCRIPTION
    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        description,
      );
      setMeta(
        'meta[name="twitter:description"]',
        "name",
        "twitter:description",
        description,
      );
    }

    // ---- CANONICAL + og:url
    if (canonical) {
      let link = document.head.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
      );
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
      setMeta('meta[property="og:url"]', "property", "og:url", canonical);
      setMeta(
        'meta[name="twitter:url"]',
        "name",
        "twitter:url",
        canonical,
      );
    }

    // ---- og:type
    setMeta(
      'meta[property="og:type"]',
      "property",
      "og:type",
      ogType ?? "website",
    );

    // ---- twitter:card always summary_large_image
    setMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    );

    // ---- IMAGE (always set, defaulting to brand image)
    const finalOgImage = ogImage || DEFAULT_OG_IMAGE;
    setMeta(
      'meta[property="og:image"]',
      "property",
      "og:image",
      finalOgImage,
    );
    setMeta(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      finalOgImage,
    );

    // ---- KEYWORDS (optional)
    if (keywords) {
      setMeta('meta[name="keywords"]', "name", "keywords", keywords);
    }

    // ---- ROBOTS
    if (noindex) {
      setMeta(
        'meta[name="robots"]',
        "name",
        "robots",
        "noindex,nofollow",
      );
    } else {
      setMeta(
        'meta[name="robots"]',
        "name",
        "robots",
        DEFAULT_ROBOTS,
      );
    }

    // ---- JSON-LD (per-page; cleaned on unmount/route change)
    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.setAttribute(SEO_TAG_FLAG, "page");
      scriptEl.text = JSON.stringify(jsonLd);
      document.head.appendChild(scriptEl);
    }

    return () => {
      // Reset robots so a stale "noindex" doesn't leak when leaving 404
      if (noindex) {
        setMeta(
          'meta[name="robots"]',
          "name",
          "robots",
          DEFAULT_ROBOTS,
        );
      }
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [title, description, canonical, ogImage, ogType, jsonLd, noindex, keywords]);
}

/**
 * Build a BreadcrumbList JSON-LD for any nested page.
 * Pass an ordered list of `{ name, url }`.
 */
export function buildBreadcrumbLd(
  trail: Array<{ name: string; url: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}
