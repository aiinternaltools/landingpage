import { getTranslations } from "next-intl/server";
import type { AiNewsGeoSummary } from "@/content/ai-news/types";
import { BriefingSection } from "@/components/ai-news/briefing/BriefingSection";
import { getArticleSections } from "@/components/ai-news/briefing/article-template-sections";

type GeoSummaryProps = {
  summary: AiNewsGeoSummary;
};

export async function GeoSummary({ summary }: GeoSummaryProps) {
  const t = await getTranslations("aiNews");
  const { quickAnswer } = getArticleSections(t);

  return (
    <BriefingSection
      id={quickAnswer.id}
      title={quickAnswer.title}
      description={quickAnswer.description}
    >
      <div className="min-w-0 space-y-4 rounded-2xl border border-border bg-muted-bg/40 p-4 sm:p-5 md:p-6">
        <p className="text-sm leading-relaxed text-foreground/95 sm:text-base">
          {summary.short_answer}
        </p>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          {summary.answer_engine_summary}
        </p>
      </div>
    </BriefingSection>
  );
}
