import { useTranslations } from "next-intl";
import type { AiNewsBriefingStory } from "@/content/ai-news/types";
import type { Locale } from "@/i18n/routing";
import { ImpactBadge } from "@/components/ai-news/briefing/ImpactBadge";
import { formatArticleDate } from "@/lib/ai-news-utils";

type StoryCardProps = {
  story: AiNewsBriefingStory;
  index: number;
  expanded: boolean;
  onToggleExpanded: () => void;
  locale: Locale;
};

function BulletList({ items, title }: { items: string[]; title: string }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">{title}</h4>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-border" aria-hidden />
            <span className="min-w-0 break-words">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StoryCard({
  story,
  index,
  expanded,
  onToggleExpanded,
  locale,
}: StoryCardProps) {
  const t = useTranslations("aiNews");

  return (
    <article
      className="card-elevated min-w-0 rounded-2xl p-4 sm:p-5 md:p-7"
      aria-labelledby={`story-${story.id}-title`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-accent">
            {t("article.storyNumber", { number: index + 1 })}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
            <span className="font-medium text-foreground">{story.company}</span>
            <span className="hidden text-muted sm:inline" aria-hidden>
              ·
            </span>
            <span className="basis-full sm:basis-auto">{story.category}</span>
            <span className="hidden text-muted sm:inline" aria-hidden>
              ·
            </span>
            <time className="basis-full sm:basis-auto" dateTime={story.published_date}>
              {formatArticleDate(story.published_date, locale)}
            </time>
          </div>
          <h3
            id={`story-${story.id}-title`}
            className="mt-3 text-base font-semibold leading-snug tracking-tight text-foreground break-words sm:text-lg md:text-xl"
          >
            {story.headline}
          </h3>
        </div>
        <ImpactBadge level={story.impact_level} className="self-start" />
      </div>

      <div className="mt-5 rounded-xl border border-accent/35 bg-accent-muted p-3.5 sm:mt-6 sm:p-4 md:p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {t("article.ownerTakeaway")}
        </p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-foreground break-words md:text-base">
          {story.owner_takeaway}
        </p>
      </div>

      {!expanded ? (
        <div className="mt-5 sm:mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
            {t("article.whyItMatters")}
          </h4>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/90">
            {story.why_it_matters}
          </p>
          <button
            type="button"
            onClick={onToggleExpanded}
            className="mt-4 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-muted-bg/50 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/35 hover:bg-accent-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:mt-5 sm:w-auto sm:min-h-10"
            aria-expanded={false}
          >
            {t("article.readFullStory")}
            <span aria-hidden className="text-muted">↓</span>
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              {t("article.whatHappened")}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90 break-words md:text-base">
              {story.what_happened}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
              {t("article.whyItMatters")}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90 break-words md:text-base">
              {story.why_it_matters}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted break-words">
              {story.business_relevance}
            </p>
          </div>

          <BulletList
            items={story.practical_use_cases}
            title={t("article.practicalUseCases")}
          />
          <BulletList items={story.risks} title={t("article.risksToWatch")} />

          <button
            type="button"
            onClick={onToggleExpanded}
            className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-medium text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={true}
          >
            {t("article.showLess")}
            <span aria-hidden className="text-base leading-none">
              ↑
            </span>
          </button>
        </div>
      )}
    </article>
  );
}
