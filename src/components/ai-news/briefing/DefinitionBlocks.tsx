import { getTranslations } from "next-intl/server";
import type { AiNewsDefinitionBlock } from "@/content/ai-news/types";
import { BriefingSection } from "@/components/ai-news/briefing/BriefingSection";
import { getArticleSections } from "@/components/ai-news/briefing/article-template-sections";

type DefinitionBlocksProps = {
  blocks: AiNewsDefinitionBlock[];
};

export async function DefinitionBlocks({ blocks }: DefinitionBlocksProps) {
  if (blocks.length === 0) return null;

  const t = await getTranslations("aiNews");
  const { definitions } = getArticleSections(t);

  return (
    <BriefingSection
      id={definitions.id}
      title={definitions.title}
      description={definitions.description}
    >
      <dl className="grid min-w-0 gap-4 sm:grid-cols-2">
        {blocks.map((block) => (
          <div
            key={block.term}
            className="min-w-0 rounded-2xl border border-border p-4 sm:p-5"
          >
            <dt className="text-sm font-semibold text-foreground sm:text-base">
              {block.term}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">
              {block.definition}
            </dd>
          </div>
        ))}
      </dl>
    </BriefingSection>
  );
}
