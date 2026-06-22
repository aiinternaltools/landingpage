import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { AiNewsArticleListItem } from "@/content/ai-news/types";
import { formatSignalStrength, signalStrengthLevel } from "@/lib/ai-news-utils";

type EditionTimelineProps = {
  editions: AiNewsArticleListItem[];
};

const BAR_WIDTHS = ["w-1/4", "w-1/2", "w-full"] as const;

function SignalBar({ level }: { level: number }) {
  const idx = Math.min(Math.max(level - 1, 0), 2);
  return (
    <div className="flex h-2 w-14 shrink-0 items-center sm:w-16" aria-hidden>
      <div className="h-full w-full overflow-hidden rounded-full bg-border/60">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-accent/50 to-accent ${BAR_WIDTHS[idx]}`}
        />
      </div>
    </div>
  );
}

type EditionTimelineItemProps = {
  edition: AiNewsArticleListItem;
  isLatest: boolean;
  isLast: boolean;
  t: Awaited<ReturnType<typeof getTranslations<"aiNews">>>;
};

function EditionTimelineItem({ edition, isLatest, isLast, t }: EditionTimelineItemProps) {
  const level = signalStrengthLevel(edition.signalStrength);

  return (
    <li className="relative grid grid-cols-[auto_auto_1fr] gap-x-3 sm:gap-x-4">
      <div className="relative flex flex-col items-center pt-5">
        <div
          className={`relative z-10 size-3.5 shrink-0 rounded-full border-2 sm:size-4 ${
            isLatest
              ? "border-accent bg-accent shadow-[0_0_12px_var(--accent-glow)]"
              : "border-accent/50 bg-background"
          }`}
        />
        {!isLast ? (
          <div
            className="absolute top-5 bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-accent/45 via-border to-border/30"
            aria-hidden
          />
        ) : null}
      </div>

      <div className="flex items-start pt-5">
        <SignalBar level={level} />
      </div>

      <div className={`min-w-0 pb-8 sm:pb-10 ${isLast ? "pb-0 sm:pb-0" : ""}`}>
        <EditionTimelineCard edition={edition} isLatest={isLatest} t={t} />
      </div>
    </li>
  );
}

type EditionTimelineCardProps = {
  edition: AiNewsArticleListItem;
  isLatest: boolean;
  t: Awaited<ReturnType<typeof getTranslations<"aiNews">>>;
};

function EditionTimelineCard({ edition, isLatest, t }: EditionTimelineCardProps) {
  return (
    <Link
      href={`/ai-news/${edition.slug}`}
      className={`card-elevated card-elevated-hover group block min-w-0 rounded-xl border-border/80 p-4 transition-transform hover:-translate-y-0.5 sm:p-5 ${
        isLatest ? "border-accent/30 ring-1 ring-accent/20" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
        <time dateTime={edition.publishedAt} className="font-medium text-foreground/80">
          {edition.weekLabel}
        </time>
        {edition.signalStrength ? (
          <span className="rounded-full border border-border px-2 py-0.5">
            {formatSignalStrength(edition.signalStrength, t)} {t("timeline.signalSuffix")}
          </span>
        ) : null}
        {isLatest ? (
          <span className="rounded-full border border-accent/30 bg-accent-muted px-2 py-0.5 font-medium text-accent">
            {t("timeline.latest")}
          </span>
        ) : null}
        {edition.hasAudio ? (
          <span className="flex items-center gap-0.5" title={t("timeline.audioAvailable")}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" strokeLinecap="round" />
            </svg>
          </span>
        ) : null}
      </div>

      <p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
        {edition.themeOfTheWeek ?? edition.title}
      </p>

      <p className="mt-3 flex items-center gap-1 text-xs font-medium text-accent">
        {t("timeline.readBriefing")}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </p>
    </Link>
  );
}

export async function EditionTimeline({ editions }: EditionTimelineProps) {
  const t = await getTranslations("aiNews");

  if (editions.length === 0) return null;

  const maxLevel = Math.max(
    ...editions.map((e) => signalStrengthLevel(e.signalStrength)),
    1,
  );

  const editionCountLabel =
    editions.length === 1
      ? t("timeline.oneEdition")
      : t("timeline.editionsCount", { count: editions.length });

  return (
    <div className="mt-10">
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border/80 bg-background/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t("timeline.signalEvolution")}
          </p>
          <p className="mt-1 text-sm text-muted">
            {t("timeline.signalEvolutionDescription")}
          </p>
        </div>
        <div className="flex items-end gap-2 sm:gap-3" aria-hidden>
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-6 rounded-t-sm bg-gradient-to-t from-accent/40 to-accent sm:w-8 ${
                  n === 1 ? "h-3" : n === 2 ? "h-5" : "h-7"
                } ${n === maxLevel ? "opacity-100" : "opacity-35"}`}
              />
              <span className="text-[10px] text-muted">
                {n === 1
                  ? t("timeline.signalLow")
                  : n === 2
                    ? t("timeline.signalMed")
                    : t("timeline.signalHigh")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ol className="relative mx-auto max-w-xl">
        {editions.map((edition, index) => (
          <EditionTimelineItem
            key={edition.slug}
            edition={edition}
            isLatest={index === 0}
            isLast={index === editions.length - 1}
            t={t}
          />
        ))}
      </ol>

      <p className="mt-6 text-center text-xs text-muted">
        {t("timeline.newestAtTop")} {editionCountLabel}
      </p>
    </div>
  );
}
