"use client";

import { useTranslations } from "next-intl";

type ReportScoreTeaserProps = {
  hostname: string;
  overallScore: number;
};

function scoreTone(score: number): string {
  if (score >= 75) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-rose-400";
}

export function ReportScoreTeaser({
  hostname,
  overallScore,
}: ReportScoreTeaserProps) {
  const t = useTranslations("automationAudit");

  return (
    <div
      className="audit-teaser-enter flex flex-col items-center justify-center px-6 py-16 text-center sm:py-20"
      role="status"
      aria-live="polite"
      aria-label={t("teaser.readinessAria", { score: overallScore })}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-500/40 bg-emerald-500/10">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-emerald-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
        {t("teaser.complete")}
      </p>
      <p className="mt-2 text-lg font-medium text-foreground">{hostname}</p>
      <p className={`mt-4 text-5xl font-bold tabular-nums ${scoreTone(overallScore)}`}>
        {overallScore}
        <span className="text-2xl font-semibold text-muted">{t("teaser.scoreOutOf")}</span>
      </p>
      <p className="mt-3 text-sm text-muted">{t("teaser.buildingReport")}</p>
    </div>
  );
}
