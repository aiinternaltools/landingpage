"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { getEmptyStateCopy } from "@/components/automation-audit/report/report-template-sections";
import type { DetectedTool } from "@/lib/automation-audit/types";

type DetectedToolsTableProps = {
  tools: DetectedTool[];
};

export function DetectedToolsTable({ tools }: DetectedToolsTableProps) {
  const t = useTranslations("automationAudit");
  const emptyStates = getEmptyStateCopy(t);

  const confidenceLabel: Record<DetectedTool["confidence"], string> = {
    high: t("report.websiteTools.confidence.high"),
    medium: t("report.websiteTools.confidence.medium"),
    low: t("report.websiteTools.confidence.low"),
  };

  if (tools.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted">{emptyStates.detectedTools}</p>
      </Card>
    );
  }

  return (
    <ul className="space-y-4">
      {tools.map((tool) => (
        <li key={tool.id}>
          <Card className="border-border/80">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-semibold leading-snug text-foreground">
                  {tool.automationSuggestion}
                </h4>
                <p className="mt-2 text-xs text-muted">
                  {t("report.websiteTools.likelyUsing")}{" "}
                  <span className="text-muted-strong">{tool.name}</span>
                  {" · "}
                  {confidenceLabel[tool.confidence]}{" "}
                  {t("report.websiteTools.signalFromWebsite")}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5">
              <p className="text-xs font-semibold text-emerald-400">
                {t("report.websiteTools.timeAndMoneySaved")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-strong">
                {tool.savingsNote}
              </p>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
