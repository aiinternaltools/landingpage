import { getTranslations } from "next-intl/server";
import type { AiNewsBriefing } from "@/content/ai-news/types";

type OperatorTakeProps = {
  insight: AiNewsBriefing["strategic_insight"];
};

export async function OperatorTake({ insight }: OperatorTakeProps) {
  const t = await getTranslations("aiNews");

  return (
    <section
      id="operators-take"
      className="scroll-mt-[7.25rem] w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-accent/35 bg-gradient-to-br from-accent-muted via-muted-bg to-background p-4 sm:p-6 md:p-10"
      aria-labelledby="operators-take-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
        {t("article.operatorsTake")}
      </p>
      <h2
        id="operators-take-heading"
        className="mt-3 text-xl font-bold leading-snug tracking-tight text-foreground break-words sm:text-2xl md:text-3xl"
      >
        {insight.title}
      </h2>
      <p className="briefing-break mt-4 text-sm leading-relaxed text-foreground/90 sm:mt-5 sm:text-base md:text-lg">
        {insight.content}
      </p>
      <blockquote className="mt-6 min-w-0 border-l-2 border-accent pl-3 sm:mt-8 sm:pl-4 md:pl-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent sm:text-sm">
          {t("article.whatToDoDifferently")}
        </p>
        <p className="briefing-break mt-2 text-sm font-medium leading-relaxed text-foreground sm:text-base md:text-lg">
          {insight.operator_take}
        </p>
      </blockquote>
    </section>
  );
}
