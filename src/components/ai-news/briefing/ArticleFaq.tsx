import { getTranslations } from "next-intl/server";
import type { AiNewsFaqItem } from "@/content/ai-news/types";
import { BriefingSection } from "@/components/ai-news/briefing/BriefingSection";
import { getArticleSections } from "@/components/ai-news/briefing/article-template-sections";

type ArticleFaqProps = {
  items: AiNewsFaqItem[];
};

export async function ArticleFaq({ items }: ArticleFaqProps) {
  if (items.length === 0) return null;

  const t = await getTranslations("aiNews");
  const { faq } = getArticleSections(t);

  return (
    <BriefingSection
      id={faq.id}
      band={faq.band}
      title={faq.title}
      description={faq.description}
    >
      <dl className="min-w-0 space-y-4">
        {items.map((item) => (
          <div
            key={item.question}
            className="min-w-0 rounded-2xl border border-border bg-background/40 p-4 sm:p-5"
          >
            <dt className="text-sm font-semibold leading-snug text-foreground sm:text-base">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </BriefingSection>
  );
}
