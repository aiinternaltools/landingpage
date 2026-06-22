import { getTranslations } from "next-intl/server";
import type { AiNewsToolToTest } from "@/content/ai-news/types";
import { BriefingSection } from "@/components/ai-news/briefing/BriefingSection";
import { getArticleSections } from "@/components/ai-news/briefing/article-template-sections";

type ToolsToTestProps = {
  tools: AiNewsToolToTest[];
};

export async function ToolsToTest({ tools }: ToolsToTestProps) {
  const t = await getTranslations("aiNews");
  const { tools: toolsSection } = getArticleSections(t);

  if (tools.length === 0) {
    return (
      <BriefingSection id={toolsSection.id} title={toolsSection.title}>
        <p className="text-sm text-muted">{t("article.noToolsListed")}</p>
      </BriefingSection>
    );
  }

  return (
    <BriefingSection
      id={toolsSection.id}
      title={toolsSection.title}
      description={toolsSection.description}
    >
      <ul className="grid w-full min-w-0 max-w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {tools.map((tool) => (
          <li
            key={tool.name}
            className="card-elevated card-elevated-hover flex min-w-0 max-w-full flex-col overflow-hidden rounded-2xl p-4 sm:p-5"
          >
            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="briefing-break min-w-0 text-base font-semibold leading-snug text-foreground">
                {tool.name}
              </h3>
              <span className="w-fit max-w-full shrink-0 rounded-md border border-border bg-background/60 px-2 py-0.5 text-[11px] text-muted">
                {tool.category}
              </span>
            </div>
            <p className="mt-2 text-xs font-medium text-accent">
              {t("article.timeToTest", { time: tool.time_to_test })}
            </p>
            <p className="briefing-break mt-3 text-sm leading-relaxed text-muted">
              <span className="font-medium text-foreground">{t("article.bestFor")} </span>
              {tool.best_for}
            </p>
            <div className="mt-4 min-w-0 flex-1 rounded-lg border border-border/80 bg-background/40 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                {t("article.suggestedTest")}
              </p>
              <p className="briefing-break mt-1.5 text-sm leading-relaxed text-foreground/90">
                {tool.suggested_test}
              </p>
            </div>
            <p className="briefing-break mt-4 text-sm leading-relaxed text-foreground/90">
              <span className="font-medium text-accent">{t("article.businessValue")} </span>
              {tool.business_value}
            </p>
          </li>
        ))}
      </ul>
    </BriefingSection>
  );
}
