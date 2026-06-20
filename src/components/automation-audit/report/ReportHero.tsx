import type { AutomationAuditReport } from "@/lib/automation-audit/types";

type ReportHeroProps = {
  report: AutomationAuditReport;
};

function scoreTone(score: number): string {
  if (score >= 75) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-rose-400";
}

export function ReportHero({ report }: ReportHeroProps) {
  const overall = report.audit.scores.overall;
  const hostname = (() => {
    try {
      return new URL(report.targetUrl).hostname;
    } catch {
      return report.targetUrl;
    }
  })();

  return (
    <div className="card-elevated rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Website audit complete
          </p>
          <h2 className="mt-2 truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {hostname}
          </h2>
          <p className="mt-1 truncate text-sm text-muted">{report.targetUrl}</p>
          <p className="mt-3 text-xs text-muted">
            Generated {new Date(report.generatedAt).toLocaleString()}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-center">
          <div
            className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-accent/30 bg-accent-muted sm:h-32 sm:w-32"
            role="img"
            aria-label={`Automation readiness ${overall} out of 100`}
          >
            <span
              className={`text-4xl font-bold tabular-nums sm:text-5xl ${scoreTone(overall)}`}
            >
              {overall}
            </span>
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted">
            Readiness score
          </p>
        </div>
      </div>
    </div>
  );
}
