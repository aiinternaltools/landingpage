import type { MetadataRoute } from "next";
import { getAllArticles, type LocaleArticles } from "@/lib/ai-news";
import { SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

const STATIC_PATHS: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/community", changeFrequency: "monthly", priority: 0.6 },
  { path: "/ai-news", changeFrequency: "weekly", priority: 0.9 },
  { path: "/marketing-audit", changeFrequency: "monthly", priority: 0.8 },
  { path: "/automation-audit", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/use-cases/ai-social-media-assistant",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { path: "/use-cases/email-ai-agent", changeFrequency: "monthly", priority: 0.7 },
];

function localeAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/en${path}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: localeAlternates(page.path) },
      });
    }
  }

  for (const locale of routing.locales) {
    const articles = getAllArticles(false, locale as LocaleArticles);
    for (const article of articles) {
      const path = `/ai-news/${article.slug}`;
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(`${article.date_end}T12:00:00Z`),
        changeFrequency: "weekly",
        priority: 0.85,
        alternates: { languages: localeAlternates(path) },
      });
    }
  }

  return entries;
}
