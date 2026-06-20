import { Card } from "@/components/ui/Card";
import {
  EMPTY_STATE_COPY,
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

function ImpactBadge({ impact }: { impact: WorkflowOpportunity["impact"] }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${impactStyles[impact]}`}
    >
      {impact}
    </span>
  );
}

export function WorkflowOpportunitiesList({
  workflows,
}: WorkflowOpportunitiesListProps) {
  if (workflows.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted">{EMPTY_STATE_COPY.workflows}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {IMPACT_ORDER.map((impact) => {
        const group = workflows.filter((w) => w.impact === impact);
        if (group.length === 0) return null;
        return (
          <Card key={impact} title={`${impact} impact`}>
            <ul className="space-y-4">
              {group.map((workflow, i) => (
                <li key={`${impact}-${i}`} className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <ImpactBadge impact={workflow.impact} />
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
                        Why we suggest this:{" "}
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
