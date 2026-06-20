import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { landingUseCases } from "@/content/use-cases";

function UseCaseCard({
  title,
  tagline,
  href,
}: {
  title: string;
  tagline?: string;
  href: string;
}) {
  return (
    <article className="card-elevated card-elevated-hover group overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-4 px-6 py-5 sm:px-7 sm:py-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-2xl md:text-[1.65rem] md:leading-snug">
            {title}
          </h3>
          {tagline ? (
            <p className="mt-2 text-sm leading-relaxed text-muted">{tagline}</p>
          ) : null}
        </div>
        <Link
          href={href}
          aria-label={`Discover the workflow: ${title}`}
          className="inline-flex w-fit items-center gap-2 self-end text-xs font-medium text-muted-strong transition-colors group-hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm"
        >
          <span>Discover the workflow</span>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted-bg text-muted-strong transition-colors group-hover:border-accent/40 group-hover:bg-accent-muted group-hover:text-accent">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>
    </article>
  );
}

export function UseCasesSection() {
  return (
    <Section id="use-cases" className="section-band relative overflow-hidden border-t border-border">
      <h2 className="relative text-center text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        Use cases
      </h2>
      <p className="relative mx-auto mt-3 max-w-lg text-center text-sm text-muted">
        Workflows we automate most often for operational teams
      </p>

      <ul className="relative mx-auto mt-12 grid max-w-2xl gap-5 md:gap-6">
        {landingUseCases.map(({ id, title, tagline, href }) => (
          <li key={id}>
            <UseCaseCard title={title} tagline={tagline} href={href} />
          </li>
        ))}
      </ul>

      <div className="card-elevated relative mt-8 overflow-hidden rounded-2xl p-6 sm:mt-10 sm:p-8">
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-lg">
            <span className="inline-flex rounded-full border border-border bg-muted-bg px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-strong">
              Custom automation
            </span>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Your workflow isn&apos;t listed?
            </h3>
          </div>
          <Button
            href="/contact"
            variant="primary"
            className="shrink-0 md:min-w-[14rem]"
          >
            Request custom automation
          </Button>
        </div>
      </div>
    </Section>
  );
}
