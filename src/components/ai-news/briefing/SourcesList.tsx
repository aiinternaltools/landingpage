import type { AiNewsSource } from "@/content/ai-news/types";
import { BriefingSection } from "@/components/ai-news/briefing/BriefingSection";
import { ARTICLE_TEMPLATE_SECTIONS } from "@/components/ai-news/briefing/article-template-sections";

type SourcesListProps = {
  sources: AiNewsSource[];
};

export function SourcesList({ sources }: SourcesListProps) {
  const { sources: sourcesSection } = ARTICLE_TEMPLATE_SECTIONS;

  if (sources.length === 0) {
    return (
      <BriefingSection id={sourcesSection.id} title={sourcesSection.title}>
        {/* TODO: no sources in story data */}
        <p className="text-sm text-muted">Sources not provided for this edition.</p>
      </BriefingSection>
    );
  }

  return (
    <BriefingSection id={sourcesSection.id} title={sourcesSection.title}>
      <ul className="card-elevated divide-y divide-border overflow-hidden rounded-2xl">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-12 flex-col justify-center gap-1 px-3.5 py-3 transition-colors hover:bg-accent-muted/30 active:bg-accent-muted/40 sm:min-h-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3.5"
            >
              <span className="text-sm font-medium leading-snug text-foreground break-words transition-colors group-hover:text-accent">
                {source.title}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted">
                {source.publisher}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-50 transition-opacity group-hover:opacity-100"
                  aria-hidden
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </BriefingSection>
  );
}
