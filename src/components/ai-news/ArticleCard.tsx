import Link from "next/link";
import type { AiNewsArticleListItem } from "@/content/ai-news/types";
import { formatArticleDate, formatSignalStrength } from "@/lib/ai-news-utils";

type ArticleCardProps = {
  article: AiNewsArticleListItem;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="card-elevated card-elevated-hover group flex h-full flex-col rounded-2xl p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="rounded-full border border-accent/25 bg-accent-muted px-2.5 py-0.5 font-medium text-accent">
          {article.weekLabel}
        </span>
        <time dateTime={article.publishedAt}>
          {formatArticleDate(article.publishedAt)}
        </time>
        {article.signalStrength ? (
          <span className="rounded-md border border-border px-2 py-0.5 text-[11px]">
            {formatSignalStrength(article.signalStrength)} signal
          </span>
        ) : null}
        {article.hasAudio ? (
          <span className="flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3" strokeLinecap="round" />
            </svg>
            Audio
          </span>
        ) : null}
      </div>
      <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
        <Link
          href={`/ai-news/${article.slug}`}
          className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-muted line-clamp-2">{article.subtitle}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>
      <Link
        href={`/ai-news/${article.slug}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
      >
        Read briefing
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}
