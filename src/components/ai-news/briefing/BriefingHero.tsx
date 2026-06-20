import type { AiNewsBriefing } from "@/content/ai-news/types";
import { ExecutiveSummaryLabel } from "@/components/ai-news/briefing/ExecutiveSummaryLabel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { formatSignalStrength } from "@/lib/ai-news-utils";

type BriefingHeroProps = {
  article: AiNewsBriefing;
  className?: string;
};

export function BriefingHero({ article, className = "" }: BriefingHeroProps) {
  const { recommended_article_angle: angle, week_range, hook, signal_strength } = article;
  const signalLabel = formatSignalStrength(signal_strength);

  return (
    <header className={`relative flex flex-col py-2 sm:py-8 md:py-10 ${className}`.trim()}>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-start gap-3 sm:justify-center sm:gap-0">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Eyebrow className="max-w-full px-2 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-xs">
            <span className="hidden sm:inline">Executive AI briefing · </span>
            {week_range}
          </Eyebrow>
          <span className="rounded-full border border-accent/25 bg-accent-muted px-2 py-0.5 text-[10px] font-medium text-accent sm:px-2.5 sm:text-xs">
            Signal: {signalLabel}
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
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/90 sm:mt-5 sm:line-clamp-none sm:text-base md:mt-6 md:text-lg">
            {hook}
          </p>
          <p className="mt-2 text-[11px] text-muted sm:hidden">
            Scroll for the full briefing ↓
          </p>
        </div>
      </div>
    </header>
  );
}
