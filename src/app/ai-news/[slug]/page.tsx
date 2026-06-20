import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiNewsArticleTemplate } from "@/components/ai-news/briefing/AiNewsArticleTemplate";
import { getArticleBySlug, getPublishedArticleSlugs } from "@/lib/ai-news";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.status === "draft") {
    return { title: "AI News" };
  }
  return {
    title: article.seo.meta_title,
    description: article.seo.meta_description,
    keywords: article.seo.keywords,
  };
}

export default async function AiNewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.status === "draft") {
    notFound();
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-x-hidden pb-16 md:pb-24">
      <AiNewsArticleTemplate article={article} />
    </main>
  );
}
