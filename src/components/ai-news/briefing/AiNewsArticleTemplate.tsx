import Link from "next/link";
import type { AiNewsBriefing } from "@/content/ai-news/types";
import { ArticleAudioPlayer } from "@/components/ai-news/ArticleAudioPlayer";
import { BeginnerCorner } from "@/components/ai-news/briefing/BeginnerCorner";
import { BriefingHero } from "@/components/ai-news/briefing/BriefingHero";
import { BriefingNav } from "@/components/ai-news/briefing/BriefingNav";
import { BriefingSection } from "@/components/ai-news/briefing/BriefingSection";
import { MarketPulse } from "@/components/ai-news/briefing/MarketPulse";
import { OperatorTake } from "@/components/ai-news/briefing/OperatorTake";
import { SourcesList } from "@/components/ai-news/briefing/SourcesList";
import { StoriesTabs } from "@/components/ai-news/briefing/StoriesTabs";
import { ToolsToTest } from "@/components/ai-news/briefing/ToolsToTest";
import { WeeklyActionPlan } from "@/components/ai-news/briefing/WeeklyActionPlan";
import {
  ARTICLE_TEMPLATE_CTA,
  ARTICLE_TEMPLATE_SECTIONS,
} from "@/components/ai-news/briefing/article-template-sections";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { Button } from "@/components/ui/Button";
import { collectUniqueSources } from "@/lib/ai-news-utils";

type AiNewsArticleTemplateProps = {
  article: AiNewsBriefing;
};

export function AiNewsArticleTemplate({ article }: AiNewsArticleTemplateProps) {
  const sources = collectUniqueSources(article.stories);
  const { stories: storiesSection, actionPlan } = ARTICLE_TEMPLATE_SECTIONS;

  return (
    <>
      <section
        aria-label="Article introduction"
        className="relative flex flex-col overflow-x-hidden border-b border-border max-md:min-h-0 md:min-h-[calc(100dvh-var(--header-height))]"
      >
        <PageBackdrop glow="hero" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16 bg-gradient-to-b from-transparent to-background max-md:h-20 sm:h-36"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 pt-3 pb-1 max-md:min-h-0 sm:px-6 sm:pt-6 sm:pb-0 lg:px-8">
          <Link
            href="/ai-news"
            className="mb-1 inline-flex shrink-0 items-center gap-1 text-xs text-muted transition-colors hover:text-accent sm:mb-0 sm:text-sm"
          >
            <span aria-hidden>←</span> All editions
          </Link>
          <BriefingHero article={article} className="flex-1" />
        </div>
        <BriefingNav className="relative z-10 mt-auto shrink-0" />
      </section>

      <div className="briefing-article mx-auto w-full min-w-0 max-w-4xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 md:space-y-16 md:py-12 lg:px-8">
        {article.audio ? (
          <ArticleAudioPlayer
            src={article.audio.src}
            title={article.audio.title}
            duration={article.audio.duration}
          />
        ) : null}

        <MarketPulse article={article} />

        <BriefingSection
          id={storiesSection.id}
          band={storiesSection.band}
          title={storiesSection.title}
          description={storiesSection.description}
        >
          <StoriesTabs stories={article.stories} />
        </BriefingSection>

        <ToolsToTest tools={article.tools_to_test} />
        <OperatorTake insight={article.strategic_insight} />
        <WeeklyActionPlan
          items={article.weekly_action_plan}
          band={actionPlan.band}
        />
        <BeginnerCorner term={article.beginner_term} />
        <SourcesList sources={sources} />

        <div className="card-elevated flex min-w-0 flex-col gap-4 rounded-2xl border-accent/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 md:p-8">
          <div>
            <p className="text-sm font-semibold text-foreground">
              {ARTICLE_TEMPLATE_CTA.title}
            </p>
            <p className="mt-1 text-sm text-muted">
              {ARTICLE_TEMPLATE_CTA.description}
            </p>
          </div>
          <Button
            href={ARTICLE_TEMPLATE_CTA.href}
            variant="primary"
            className="shrink-0"
          >
            {ARTICLE_TEMPLATE_CTA.buttonLabel}
          </Button>
        </div>
      </div>
    </>
  );
}
