"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import {
  getEmptyStateCopy,
  getImpactLabel,
  IMPACT_ORDER,
} from "@/components/automation-audit/report/report-template-sections";
import type {
  PrioritizedRecommendation,
  RecommendationImpact,
} from "@/lib/automation-audit/types";

type RecommendationsListProps = {
  recommendations: PrioritizedRecommendation[];
};

const impactStyles: Record<RecommendationImpact, string> = {
  High: "border-rose-500/40 bg-rose-500/15 text-rose-300",
  Medium: "border-amber-500/40 bg-amber-500/15 text-amber-300",
  Low: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
};

function ImpactBadge({
  impact,
  label,
}: {
  impact: RecommendationImpact;
  label: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${impactStyles[impact]}`}
    >
      {label}
    </span>
  );
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const t = useTranslations("automationAudit");
  const emptyStates = getEmptyStateCopy(t);

  if (recommendations.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted">{emptyStates.recommendations}</p>
      </Card>
    );
  }

  const counts = IMPACT_ORDER.map((impact) => ({
    impact,
    count: recommendations.filter((r) => r.impact === impact).length,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {counts.map(({ impact, count }) => (
          <div
            key={impact}
            className="card-elevated flex items-center gap-2 rounded-xl px-4 py-2"
          >
            <ImpactBadge impact={impact} label={getImpactLabel(t, impact)} />
            <span className="text-sm font-medium text-foreground">{count}</span>
          </div>
        ))}
      </div>

      {IMPACT_ORDER.map((impact) => {
        const group = recommendations.filter((r) => r.impact === impact);
        if (group.length === 0) return null;
        return (
          <Card
            key={impact}
            title={t("report.impact.impactSuffix", {
              impact: getImpactLabel(t, impact),
            })}
          >
            <ul className="space-y-3">
              {group.map((rec, i) => (
                <li
                  key={`${impact}-${i}`}
                  className="flex items-start gap-3 text-sm leading-relaxed sm:text-base"
                >
                  <ImpactBadge impact={rec.impact} label={getImpactLabel(t, rec.impact)} />
                  <span className="text-foreground">{rec.nextStep}</span>
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
