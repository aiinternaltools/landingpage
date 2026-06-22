"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import {
  getEmptyStateCopy,
  getImpactLabel,
  IMPACT_ORDER,
} from "@/components/automation-audit/report/report-template-sections";
import type { WorkflowOpportunity } from "@/lib/automation-audit/types";

type WorkflowOpportunitiesListProps = {
  workflows: WorkflowOpportunity[];
};

const impactStyles: Record<WorkflowOpportunity["impact"], string> = {
  High: "border-rose-500/40 bg-rose-500/15 text-rose-300",
  Medium: "border-amber-500/40 bg-amber-500/15 text-amber-300",
  Low: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
};

function ImpactBadge({
  impact,
  label,
}: {
  impact: WorkflowOpportunity["impact"];
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

export function WorkflowOpportunitiesList({
  workflows,
}: WorkflowOpportunitiesListProps) {
  const t = useTranslations("automationAudit");
  const emptyStates = getEmptyStateCopy(t);

  if (workflows.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted">{emptyStates.workflows}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {IMPACT_ORDER.map((impact) => {
        const group = workflows.filter((w) => w.impact === impact);
        if (group.length === 0) return null;
        return (
          <Card
            key={impact}
            title={t("report.impact.impactSuffix", {
              impact: getImpactLabel(t, impact),
            })}
          >
            <ul className="space-y-4">
              {group.map((workflow, i) => (
                <li key={`${impact}-${i}`} className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <ImpactBadge
                      impact={workflow.impact}
                      label={getImpactLabel(t, workflow.impact)}
                    />
                    <h4 className="text-sm font-semibold text-foreground">
                      {workflow.title}
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {workflow.description}
                  </p>
                  {workflow.evidence.trim() ? (
                    <p className="text-xs text-muted">
                      <span className="font-medium text-muted-strong">
                        {t("report.workflowOpportunities.whyWeSuggest")}{" "}
                      </span>
                      {workflow.evidence}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
