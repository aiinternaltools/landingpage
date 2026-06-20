import type { Metadata } from "next";
import { EditionTimeline } from "@/components/ai-news/EditionTimeline";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { getAllArticleListItems } from "@/lib/ai-news";

export const metadata: Metadata = {
  title: "AI News",
  description:
    "Weekly AI news for business owners—filtered signal, practical takeaways for operations, marketing, productivity, and competitive advantage.",
};

const focusAreas = [
  "Operations & automation",
  "Marketing & growth",
  "Productivity",
  "Decision-making",
  "Competitive advantage",
];

export default function AiNewsPage() {
  const articles = getAllArticleListItems(false);

  return (
    <main className="flex flex-1 flex-col">
      <Section
        pad="tight"
        className="relative flex min-h-[calc(100dvh-var(--header-height))] flex-col justify-center overflow-hidden py-0"
      >
        <PageBackdrop glow="hero" />
        <div className="relative mx-auto w-full max-w-3xl px-2 text-center sm:px-0">
          <Eyebrow>Weekly briefing</Eyebrow>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl lg:leading-[1.1]">
            <span className="text-gradient">AI News</span> for business owners
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            Each week we filter the noise and explain what matters in AI—why it
            matters, and how you can use it to improve operations, marketing,
            productivity, decision-making, and competitive advantage.
          </p>
          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
            {focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted shadow-sm"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#edition-timeline"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-muted transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-8"
          aria-label="Scroll to edition timeline"
        >
          <span className="text-[11px] font-medium uppercase tracking-wider">
            Timeline
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
            aria-hidden
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </Section>

      <Section
        id="edition-timeline"
        className="section-band scroll-mt-20 border-t border-border"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              Edition timeline
            </h2>
            <p className="mt-2 text-sm text-muted">
              Track how AI signal evolved week over week.
            </p>
          </div>
          <Button href="/community" variant="secondary" className="shrink-0">
            Join the waitlist
          </Button>
        </div>

        {articles.length > 0 ? (
          <EditionTimeline editions={articles} />
        ) : (
          <div className="card-elevated mt-10 rounded-2xl px-6 py-12 text-center md:px-10">
            <p className="text-lg font-semibold text-foreground">First edition coming soon</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Add a weekly JSON file in{" "}
              <code className="rounded bg-background/80 px-1.5 py-0.5 text-xs text-foreground">
                src/content/ai-news/articles/
              </code>{" "}
              (see <code className="rounded bg-background/80 px-1.5 py-0.5 text-xs text-foreground">3-9_May2026.json</code>{" "}
              for the schema), then rebuild.
            </p>
            <p className="mt-6 text-sm text-muted">
              See{" "}
              <span className="font-medium text-foreground">
                src/content/ai-news/README.md
              </span>{" "}
              for the JSON format.
            </p>
          </div>
        )}
      </Section>
    </main>
  );
}
