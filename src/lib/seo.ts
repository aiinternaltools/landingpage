import type { Metadata } from "next";
import type { AiNewsBriefing } from "@/content/ai-news/types";
import {
  DEFAULT_OG_IMAGE,
  SITE_AUTHOR,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

type OpenGraphOpts = {
  title: string;
  description: string;
  url: string;
  locale: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  images?: string[];
};

export function buildSocialMetadata({
  title,
  description,
  url,
  locale,
  type = "website",
  publishedTime,
  modifiedTime,
  images = [DEFAULT_OG_IMAGE],
}: OpenGraphOpts): Pick<Metadata, "openGraph" | "twitter"> {
  const ogImages = images.map((src) => ({
    url: absoluteUrl(src),
    alt: title,
  }));

  return {
    openGraph: {
      type,
      locale: locale === "ro" ? "ro_RO" : "en_US",
      url: absoluteUrl(url),
      siteName: SITE_NAME,
      title,
      description,
      images: ogImages,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [SITE_AUTHOR],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    founder: {
      "@type": "Person",
      name: SITE_AUTHOR,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "ro"],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function articleJsonLd(
  article: AiNewsBriefing,
  locale: string,
): Record<string, unknown> {
  const path = `/${locale}/ai-news/${article.slug}`;
  const description =
    article.geo_summary?.short_answer ?? article.seo.meta_description;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "NewsArticle",
      "@id": `${absoluteUrl(path)}#article`,
      headline: article.seo.meta_title,
      description,
      datePublished: article.date_end,
      dateModified: article.date_end,
      inLanguage: locale,
      mainEntityOfPage: absoluteUrl(path),
      author: {
        "@type": "Person",
        name: SITE_AUTHOR,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(DEFAULT_OG_IMAGE),
        },
      },
      keywords: article.seo.keywords.join(", "),
      about: article.theme_of_the_week,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE_NAME,
          item: absoluteUrl(`/${locale}`),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "AI News",
          item: absoluteUrl(`/${locale}/ai-news`),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.recommended_article_angle.title,
          item: absoluteUrl(path),
        },
      ],
    },
  ];

  if (article.seo.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${absoluteUrl(path)}#faq`,
      mainEntity: article.seo.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  if (article.seo.definition_blocks.length > 0) {
    for (const block of article.seo.definition_blocks) {
      graph.push({
        "@type": "DefinedTerm",
        name: block.term,
        description: block.definition,
        inDefinedTermSet: absoluteUrl(path),
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
