import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { AiNewsArticleTemplate } from "@/components/ai-news/briefing/AiNewsArticleTemplate";
import {
  getArticleBySlug,
  getPublishedArticleSlugs,
  type LocaleArticles,
} from "@/lib/ai-news";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of getPublishedArticleSlugs(locale as LocaleArticles)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: "AI News" };
  }

  const article = getArticleBySlug(slug, locale as LocaleArticles);
  if (!article || article.status === "draft") {
    return { title: "AI News" };
  }

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `/${loc}/ai-news/${slug}`;
  }
  languages["x-default"] = `/en/ai-news/${slug}`;

  return {
    title: article.seo.meta_title,
    description: article.seo.meta_description,
    keywords: article.seo.keywords,
    alternates: {
      canonical: `/${locale}/ai-news/${slug}`,
      languages,
    },
  };
}

export default async function AiNewsArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const article = getArticleBySlug(slug, locale as LocaleArticles);

  if (!article || article.status === "draft") {
    notFound();
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-x-hidden pb-16 md:pb-24">
      <AiNewsArticleTemplate article={article} />
    </main>
  );
}
