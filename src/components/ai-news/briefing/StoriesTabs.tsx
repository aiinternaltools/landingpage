"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { AiNewsBriefingStory } from "@/content/ai-news/types";
import { StoryCard } from "@/components/ai-news/briefing/StoryCard";

type StoriesTabsProps = {
  stories: AiNewsBriefingStory[];
};

const navBtnClass =
  "flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted-bg/80 text-lg text-muted transition-colors hover:border-accent/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-30";

export function StoriesTabs({ stories }: StoriesTabsProps) {
  const t = useTranslations("aiNews");
  const locale = useLocale() as Locale;
  const baseId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const activeStory = stories[activeIndex];

  function scrollActiveTabIntoView(index: number) {
    const container = scrollRef.current;
    const tab = container?.querySelector<HTMLElement>(`[data-story-index="${index}"]`);
    if (!container || !tab) return;

    const tabCenter = tab.offsetLeft + tab.offsetWidth / 2;
    const targetLeft = tabCenter - container.clientWidth / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }

  useEffect(() => {
    scrollActiveTabIntoView(activeIndex);
  }, [activeIndex]);

  if (!activeStory) return null;

  function selectStory(index: number) {
    const next = Math.max(0, Math.min(stories.length - 1, index));
    if (next !== activeIndex) {
      setExpanded(false);
    }
    setActiveIndex(next);
  }

  return (
    <div className="min-w-0 max-w-full space-y-4 md:space-y-5">
      <div className="flex min-w-0 items-center gap-2 border-b border-border/60 pb-3 md:hidden">
        <button
          type="button"
          aria-label={t("article.previousStory")}
          disabled={activeIndex === 0}
          onClick={() => selectStory(activeIndex - 1)}
          className={navBtnClass}
        >
          <span aria-hidden>‹</span>
        </button>
        <div className="min-w-0 flex-1 px-1 text-center">
          <p className="text-[11px] text-muted">
            {t("article.storyOf", {
              current: activeIndex + 1,
              total: stories.length,
            })}
          </p>
          <p className="truncate text-sm font-semibold text-foreground">{activeStory.company}</p>
          <p className="truncate text-[11px] text-muted">{activeStory.category}</p>
        </div>
        <button
          type="button"
          aria-label={t("article.nextStory")}
          disabled={activeIndex === stories.length - 1}
          onClick={() => selectStory(activeIndex + 1)}
          className={navBtnClass}
        >
          <span aria-hidden>›</span>
        </button>
      </div>

      <div className="relative hidden min-w-0 overflow-hidden md:block">
        <div
          ref={scrollRef}
          role="tablist"
          aria-label={t("article.storiesTablist")}
          className="scrollbar-none scroll-fade-x flex w-full max-w-full flex-wrap gap-1.5 pb-0.5"
        >
          {stories.map((story, index) => {
            const selected = index === activeIndex;
            const tabId = `${baseId}-tab-${story.id}`;
            const panelId = `${baseId}-panel-${story.id}`;
            return (
              <button
                key={story.id}
                type="button"
                role="tab"
                id={tabId}
                data-story-index={index}
                aria-selected={selected}
                aria-controls={panelId}
                aria-label={t("article.storyOf", {
                  current: index + 1,
                  total: stories.length,
                }) + `: ${story.company}, ${story.category}`}
                title={`${story.company} — ${story.category}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectStory(index)}
                className={`inline-flex max-w-full shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-xs leading-none transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  selected
                    ? "border-accent/45 bg-accent-muted font-medium text-foreground ring-1 ring-accent/25"
                    : "border-border bg-muted-bg/40 text-muted hover:border-accent/20 hover:bg-muted-bg/80"
                }`}
              >
                <span className={selected ? "text-accent" : "text-muted"}>{index + 1}</span>
                <span className="text-muted/70" aria-hidden>
                  ·
                </span>
                <span className="min-w-0 truncate">{story.company}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${activeStory.id}`}
        aria-labelledby={`${baseId}-tab-${activeStory.id}`}
      >
        <StoryCard
          story={activeStory}
          index={activeIndex}
          expanded={expanded}
          onToggleExpanded={() => setExpanded((v) => !v)}
          locale={locale}
        />
      </div>

      <div className="hidden items-center justify-between gap-4 border-t border-border/80 pt-4 md:flex">
        <p className="text-xs text-muted">
          {t("article.storyOf", {
            current: activeIndex + 1,
            total: stories.length,
          })}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="min-h-10 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-foreground disabled:opacity-40"
            disabled={activeIndex === 0}
            onClick={() => selectStory(activeIndex - 1)}
          >
            {t("article.previous")}
          </button>
          <button
            type="button"
            className="min-h-10 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-foreground disabled:opacity-40"
            disabled={activeIndex === stories.length - 1}
            onClick={() => selectStory(activeIndex + 1)}
          >
            {t("article.next")}
          </button>
        </div>
      </div>
    </div>
  );
}
