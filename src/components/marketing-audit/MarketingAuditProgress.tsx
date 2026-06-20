"use client";

const STEPS = [
  { label: "Discovering pages", detail: "Sitemap, crawl & common paths" },
  { label: "Selecting top 5", detail: "Ranking by marketing importance" },
  { label: "Fetching HTML", detail: "Up to 5 pages in parallel" },
  { label: "Running marketing audit", detail: "AI scores & findings" },
  { label: "Generating summary", detail: "Executive recap & actions" },
] as const;

type MarketingAuditProgressProps = {
  activeStep: number;
  targetUrl: string;
};

export function MarketingAuditProgress({
  activeStep,
  targetUrl,
}: MarketingAuditProgressProps) {
  const hostname = (() => {
    try {
      return new URL(
        targetUrl.match(/^https?:\/\//i) ? targetUrl : `https://${targetUrl}`
      ).hostname;
    } catch {
      return targetUrl;
    }
  })();

  const progressPct = Math.round(((activeStep + 1) / STEPS.length) * 100);

  return (
    <div
      className="audit-progress-enter px-5 py-8 sm:px-8 sm:py-10"
      role="status"
      aria-live="polite"
      aria-label="Audit progress"
    >
      <div className="mb-6 border-b border-border/60 pb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Running audit
        </p>
        <p className="mt-1 text-base font-medium text-foreground">{hostname}</p>
        <p className="mt-1 text-xs text-muted">
          Usually takes 45–90 seconds. Keep this tab open.
        </p>
      </div>

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-muted-bg">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
          style={{ width: `${progressPct}%` }}
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <ul className="space-y-4">
        {STEPS.map((step, i) => {
          const done = i < activeStep;
          const active = i === activeStep;
          return (
            <li
              key={step.label}
              className={`flex items-start gap-3 text-sm ${
                active
                  ? "font-medium text-foreground"
                  : done
                    ? "text-muted-strong"
                    : "text-muted"
              }`}
            >
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs ${
                  done
                    ? "border-accent/50 bg-accent-muted text-accent"
                    : active
                      ? "border-accent bg-accent/20 text-accent"
                      : "border-border bg-muted-bg/40"
                }`}
              >
                {done ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    aria-hidden
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p>{step.label}</p>
                {active ? (
                  <p className="mt-0.5 text-xs text-muted">{step.detail}</p>
                ) : null}
              </div>
              {active ? (
                <span className="mt-1.5 inline-flex shrink-0 gap-1" aria-hidden>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:300ms]" />
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
