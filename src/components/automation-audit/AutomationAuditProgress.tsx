"use client";

import { useTranslations } from "next-intl";

const STEP_KEYS = [
  "discovering",
  "selecting",
  "fetching",
  "detecting",
  "auditing",
  "summary",
] as const;

type AutomationAuditProgressProps = {
  activeStep: number;
  targetUrl: string;
};

export function AutomationAuditProgress({
  activeStep,
  targetUrl,
}: AutomationAuditProgressProps) {
  const t = useTranslations("automationAudit");

  const hostname = (() => {
    try {
      return new URL(
        targetUrl.match(/^https?:\/\//i) ? targetUrl : `https://${targetUrl}`
      ).hostname;
    } catch {
      return targetUrl;
    }
  })();

  const progressPct = Math.round(((activeStep + 1) / STEP_KEYS.length) * 100);

  return (
    <div
      className="audit-progress-enter px-5 py-8 sm:px-8 sm:py-10"
      role="status"
      aria-live="polite"
      aria-label={t("progress.ariaLabel")}
    >
      <div className="mb-6 border-b border-border/60 pb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t("progress.runningAudit")}
        </p>
        <p className="mt-1 text-base font-medium text-foreground">{hostname}</p>
        <p className="mt-1 text-xs text-muted">{t("progress.durationHint")}</p>
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
        {STEP_KEYS.map((key, i) => {
          const done = i < activeStep;
          const active = i === activeStep;
          const label = t(`progress.steps.${key}.label`);
          const detail = t(`progress.steps.${key}.detail`);
          return (
            <li
              key={key}
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
                <p>{label}</p>
                {active ? <p className="mt-0.5 text-xs text-muted">{detail}</p> : null}
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
