import type { AiNewsBriefing } from "@/content/ai-news/types";
import { formatSignalStrength } from "@/lib/ai-news-utils";
import { BriefingSection } from "@/components/ai-news/briefing/BriefingSection";
import { ARTICLE_TEMPLATE_SECTIONS } from "@/components/ai-news/briefing/article-template-sections";

type MarketPulseProps = {
  article: Pick<
    AiNewsBriefing,
    "theme_of_the_week" | "signal_strength" | "market_pulse"
  >;
};

export function MarketPulse({ article }: MarketPulseProps) {
  const { theme_of_the_week, signal_strength, market_pulse } = article;

  const { marketPulse } = ARTICLE_TEMPLATE_SECTIONS;

  return (
    <BriefingSection
      id={marketPulse.id}
      title={marketPulse.title}
      description={marketPulse.description}
    >
      <div className="grid w-full min-w-0 max-w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
        <div className="card-elevated min-w-0 rounded-2xl p-4 sm:p-5 md:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
            Theme of the week
          </p>
          <p className="mt-2.5 text-base font-medium leading-snug text-foreground break-words md:text-lg">
            {theme_of_the_week}
          </p>
          <p className="mt-4">
            <span className="inline-flex max-w-full flex-wrap rounded-lg border border-border/80 bg-background/30 px-2.5 py-1.5 text-xs text-muted">
              Signal:{" "}
              <span className="font-semibold text-accent">
                {formatSignalStrength(signal_strength)}
              </span>
            </span>
          </p>
        </div>
        <div className="card-elevated min-w-0 rounded-2xl p-4 sm:p-5 md:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Summary
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-foreground/90 break-words md:text-base">
            {market_pulse.summary}
          </p>
        </div>
      </div>

      <div className="card-elevated mt-3 min-w-0 rounded-2xl p-4 sm:mt-4 sm:p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          What changed this week
        </p>
        <ul className="mt-4 space-y-3">
          {market_pulse.what_changed_this_week.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
              <span
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              <span className="min-w-0 break-words">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </BriefingSection>
  );
}
