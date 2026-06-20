import { Card } from "@/components/ui/Card";
import { EMPTY_STATE_COPY } from "@/components/automation-audit/report/report-template-sections";
import type { ToolRecommendation } from "@/lib/automation-audit/types";

type ImprovementWorkflowsListProps = {
  recommendations: ToolRecommendation[];
};

const impactStyles: Record<ToolRecommendation["impact"], string> = {
  High: "border-rose-500/40 bg-rose-500/15 text-rose-300",
  Medium: "border-amber-500/40 bg-amber-500/15 text-amber-300",
  Low: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
};

function ImpactBadge({ impact }: { impact: ToolRecommendation["impact"] }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${impactStyles[impact]}`}
    >
      {impact}
    </span>
  );
}

export function ImprovementWorkflowsList({
  recommendations,
}: ImprovementWorkflowsListProps) {
  if (recommendations.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted">{EMPTY_STATE_COPY.improvements}</p>
      </Card>
    );
  }

  return (
    <ul className="space-y-4">
      {recommendations.map((rec, i) => (
        <li key={i}>
          <Card>
            <div className="flex flex-wrap items-start gap-3">
              <ImpactBadge impact={rec.impact} />
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-semibold text-foreground">
                  {rec.purpose || rec.toolName}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {rec.rationale}
                </p>
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

/** @deprecated Use ImprovementWorkflowsList */
export const ToolRecommendationsList = ImprovementWorkflowsList;
