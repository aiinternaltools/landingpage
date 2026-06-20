import type { AiNewsBriefing } from "@/content/ai-news/types";
import { BriefingSection } from "@/components/ai-news/briefing/BriefingSection";
import { ARTICLE_TEMPLATE_SECTIONS } from "@/components/ai-news/briefing/article-template-sections";

type BeginnerCornerProps = {
  term: AiNewsBriefing["beginner_term"];
};

export function BeginnerCorner({ term }: BeginnerCornerProps) {
  const { beginner } = ARTICLE_TEMPLATE_SECTIONS;

  return (
    <BriefingSection id={beginner.id} title={beginner.title}>
      <div className="card-elevated min-w-0 rounded-2xl p-4 sm:p-5 md:p-8">
        <p className="text-xl font-bold leading-snug tracking-tight text-gradient break-words sm:text-2xl">
          {term.term}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/90 break-words md:text-base">
          {term.simple_explanation}
        </p>
        <div className="mt-5 rounded-xl border border-border bg-background/50 p-3.5 sm:mt-6 sm:p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Business example
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted break-words">
            {term.business_example}
          </p>
        </div>
      </div>
    </BriefingSection>
  );
}
