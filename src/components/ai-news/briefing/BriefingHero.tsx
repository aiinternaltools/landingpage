import dynamic from "next/dynamic";
import { getLocale, getTranslations } from "next-intl/server";
import type { AiNewsBriefing } from "@/content/ai-news/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { formatSignalStrength } from "@/lib/ai-news-utils";
import type { Locale } from "@/i18n/routing";
import { SITE_AUTHOR } from "@/lib/site";

const ExecutiveSummaryLabel = dynamic(
  () =>
    import("@/components/ai-news/briefing/ExecutiveSummaryLabel").then(
      (m) => m.ExecutiveSummaryLabel,
    ),
  {
    loading: () => (
      <div
        className="h-9 w-full max-w-[14rem] rounded-full border border-border bg-muted-bg/50 sm:ml-auto"
        aria-hidden
      />
    ),
  },
);

type BriefingHeroProps = {
  article: AiNewsBriefing;
  className?: string;
};

export async function BriefingHero({ article, className = "" }: BriefingHeroProps) {
  const t = await getTranslations("aiNews");
  const locale = (await getLocale()) as Locale;
  const { recommended_article_angle: angle, week_range, hook, signal_strength } = article;
  const signalLabel = formatSignalStrength(signal_strength, t);

  return (
    <header className={`relative flex flex-col py-2 sm:py-8 md:py-10 ${className}`.trim()}>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-start gap-3 sm:justify-center sm:gap-0">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Eyebrow className="max-w-full px-2 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-xs">
            <span className="hidden sm:inline">{t("article.executiveBriefingPrefix")}</span>
            <time dateTime={article.date_start}>{week_range}</time>
          </Eyebrow>
          <span className="rounded-full border border-accent/25 bg-accent-muted px-2 py-0.5 text-[10px] font-medium text-accent sm:px-2.5 sm:text-xs">
            {t("article.signalLabel", { strength: signalLabel })}
          </span>
        </div>

        <ExecutiveSummaryLabel
          summary={article.executive_summary}
          className="w-full sm:ml-auto sm:w-fit sm:shrink-0"
        />

        <div className="min-w-0 sm:mt-4">
          <h1 className="text-[1.35rem] font-bold leading-[1.2] tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.1]">
            {angle.title}
          </h1>
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted sm:mt-4 sm:line-clamp-none sm:text-lg md:text-xl">
            {angle.subtitle}
          </p>
          <p className="mt-2 text-[11px] text-muted sm:mt-3 sm:text-xs">
            {t("article.byline", { author: SITE_AUTHOR })}
            <span aria-hidden> · </span>
            <time dateTime={article.date_end}>
              {t("article.updatedLabel")}{" "}
              {new Date(`${article.date_end}T12:00:00`).toLocaleDateString(
                locale === "ro" ? "ro-RO" : "en-US",
                { month: "short", day: "numeric", year: "numeric" },
              )}
            </time>
          </p>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/90 sm:mt-5 sm:line-clamp-none sm:text-base md:mt-6 md:text-lg">
            {hook}
          </p>
          <p className="mt-2 text-[11px] text-muted sm:hidden">
            {t("article.scrollForBriefing")}
          </p>
        </div>
      </div>
    </header>
  );
}
