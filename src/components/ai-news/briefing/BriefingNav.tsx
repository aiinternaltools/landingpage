import { ARTICLE_TEMPLATE_NAV } from "@/components/ai-news/briefing/article-template-sections";

type BriefingNavProps = {
  className?: string;
};

export function BriefingNav({ className = "" }: BriefingNavProps) {
  return (
    <nav
      aria-label="Jump to section"
      className={`sticky top-[var(--header-height)] z-40 border-t border-border bg-background/85 backdrop-blur-lg ${className}`.trim()}
    >
      <div className="mx-auto w-full min-w-0 max-w-4xl overflow-hidden px-4 sm:px-6 lg:px-8">
        <ul className="scrollbar-none scroll-fade-x flex w-full max-w-full gap-1 overflow-x-auto overscroll-x-contain py-2 touch-pan-x sm:py-2.5">
          {ARTICLE_TEMPLATE_NAV.map(({ id, label }) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                className="inline-flex rounded-full border border-transparent px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-border hover:bg-muted-bg/80 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
