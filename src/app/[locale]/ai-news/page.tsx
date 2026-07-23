import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { EditionTimeline } from "@/components/ai-news/EditionTimeline";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { getAllArticleListItems, type LocaleArticles } from "@/lib/ai-news";
import { routing, type Locale } from "@/i18n/routing";
import { buildSocialMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: "AI News" };
  }

  const t = await getTranslations({ locale, namespace: "metadata.aiNews" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `/${loc}/ai-news`;
  }
  languages["x-default"] = "/en/ai-news";

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/ai-news`,
      languages,
    },
    ...buildSocialMetadata({
      title,
      description,
      url: `/${locale}/ai-news`,
      locale,
    }),
  };
}

export default async function AiNewsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const t = await getTranslations("aiNews");
  const articles = getAllArticleListItems(false, locale as LocaleArticles);

  const focusAreaKeys = [
    "operations",
    "marketing",
    "productivity",
    "decisionMaking",
    "competitiveAdvantage",
  ] as const;

  return (
    <main className="flex flex-1 flex-col">
      <Section
        pad="tight"
        className="relative flex min-h-[calc(100dvh-var(--header-height))] flex-col justify-center overflow-hidden py-0"
      >
        <PageBackdrop glow="hero" />
        <div className="relative mx-auto w-full max-w-3xl px-2 text-center sm:px-0">
          <Eyebrow>{t("index.eyebrow")}</Eyebrow>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl lg:leading-[1.1]">
            <span className="text-gradient">{t("index.titleBefore")}</span>{" "}
            {t("index.titleAfter")}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            {t("index.description")}
          </p>
          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
            {focusAreaKeys.map((key) => (
              <li
                key={key}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted shadow-sm"
              >
                {t(`index.focusAreas.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#edition-timeline"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-muted transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-8"
          aria-label={t("index.scrollToTimeline")}
        >
          <span className="text-[11px] font-medium uppercase tracking-wider">
            {t("index.timeline")}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
            aria-hidden
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </Section>

      <Section
        id="edition-timeline"
        className="section-band scroll-mt-20 border-t border-border"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {t("index.editionTimelineTitle")}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {t("index.editionTimelineDescription")}
            </p>
          </div>
          <Button href="/community" variant="secondary" className="shrink-0">
            {t("index.joinWaitlist")}
          </Button>
        </div>

        {articles.length > 0 ? (
          <EditionTimeline editions={articles} />
        ) : (
          <div className="card-elevated mt-10 rounded-2xl px-6 py-12 text-center md:px-10">
            <p className="text-lg font-semibold text-foreground">{t("index.emptyTitle")}</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              {t("index.emptyDescriptionBefore")}{" "}
              <code className="rounded bg-background/80 px-1.5 py-0.5 text-xs text-foreground">
                {t("index.articlesPath")}
              </code>{" "}
              {t("index.emptyDescriptionMiddle")}{" "}
              <code className="rounded bg-background/80 px-1.5 py-0.5 text-xs text-foreground">
                {t("index.emptySchemaExample")}
              </code>{" "}
              {t("index.emptyDescriptionAfter")}
            </p>
            <p className="mt-6 text-sm text-muted">
              {t("index.emptyReadmeBefore")}{" "}
              <span className="font-medium text-foreground">
                {t("index.readmePath")}
              </span>{" "}
              {t("index.emptyReadmeAfter")}
            </p>
          </div>
        )}
      </Section>
    </main>
  );
}
