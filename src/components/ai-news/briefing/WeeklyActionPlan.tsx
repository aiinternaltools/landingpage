import { getTranslations } from "next-intl/server";
import type { AiNewsWeeklyAction } from "@/content/ai-news/types";
import { BriefingSection } from "@/components/ai-news/briefing/BriefingSection";
import { getArticleSections } from "@/components/ai-news/briefing/article-template-sections";

type WeeklyActionPlanProps = {
  items: AiNewsWeeklyAction[];
  band?: boolean;
};

export async function WeeklyActionPlan({ items, band }: WeeklyActionPlanProps) {
  const t = await getTranslations("aiNews");
  const { actionPlan } = getArticleSections(t);

  return (
    <BriefingSection
      id={actionPlan.id}
      band={band}
      title={actionPlan.title}
      description={actionPlan.description}
    >
      <ol className="space-y-3 sm:space-y-4">
        {items.map((item, index) => (
          <li
            key={item.action}
            className="card-elevated flex min-w-0 gap-3 rounded-2xl p-3.5 sm:gap-4 sm:p-4 md:p-5"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-muted text-sm font-bold text-accent sm:h-8 sm:w-8"
              aria-hidden
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-snug text-foreground break-words">
                {item.action}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted break-words">
                <span className="font-medium text-foreground/80">
                  {t("article.example")}{" "}
                </span>
                {item.example}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </BriefingSection>
  );
}
