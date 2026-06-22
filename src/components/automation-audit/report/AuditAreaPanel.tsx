"use client";

import { useTranslations } from "next-intl";
import { AutomationAreaIcon } from "@/components/automation-audit/icons/AutomationAreaIcon";
import { getEmptyStateCopy } from "@/components/automation-audit/report/report-template-sections";
import { Card } from "@/components/ui/Card";
import type {
  AutomationArea,
  AutomationAreaAssessment,
} from "@/lib/automation-audit/types";

type AuditAreaPanelProps = {
  area: AutomationArea;
  label: string;
  description: string;
  color: string;
  score: number;
  assessment: AutomationAreaAssessment;
};

function scoreBadgeClass(score: number): string {
  if (score >= 75) return "border-emerald-500/40 bg-emerald-500/15 text-emerald-400";
  if (score >= 50) return "border-amber-500/40 bg-amber-500/15 text-amber-400";
  return "border-rose-500/40 bg-rose-500/15 text-rose-400";
}

function BulletList({
  items,
  emptyLabel,
  bulletClassName = "bg-accent/70",
}: {
  items: string[];
  emptyLabel: string;
  bulletClassName?: string;
}) {
  const list = items.length > 0 ? items : [emptyLabel];

  return (
    <ul className="space-y-2">
      {list.map((item, i) => (
        <li
          key={i}
          className="flex gap-2 text-sm leading-relaxed text-muted-strong"
        >
          <span
            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${bulletClassName}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function AuditAreaPanel({
  area,
  label,
  description,
  color,
  score,
  assessment,
}: AuditAreaPanelProps) {
  const t = useTranslations("automationAudit");
  const emptyStates = getEmptyStateCopy(t);

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${color}22`, color }}
          >
            <AutomationAreaIcon area={area} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">{label}</h3>
            <p className="mt-0.5 text-sm text-muted">{description}</p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-sm font-bold tabular-nums ${scoreBadgeClass(score)}`}
        >
          {score}
        </span>
      </div>

      <div className="mt-4 space-y-4 border-t border-border/60 pt-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            {t("report.areaPanel.whatWeNoticed")}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            {assessment.scoreRationale.trim() ||
              emptyStates.areaAssessment.scoreRationale}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {t("report.areaPanel.fromYourWebsite")}
          </p>
          <div className="mt-2">
            <BulletList
              items={assessment.evidence}
              emptyLabel={emptyStates.areaAssessment.evidence}
              bulletClassName="bg-muted"
            />
          </div>
        </div>

        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5">
          <p className="text-xs font-semibold text-emerald-400">
            {t("report.areaPanel.suggestedImprovement")}
          </p>
          <div className="mt-2">
            <BulletList
              items={assessment.improvements}
              emptyLabel={emptyStates.areaAssessment.improvements}
              bulletClassName="bg-emerald-400/80"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
