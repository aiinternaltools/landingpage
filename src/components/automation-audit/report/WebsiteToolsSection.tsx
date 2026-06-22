"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { ImprovementWorkflowsList } from "@/components/automation-audit/report/ToolRecommendationsList";
import { DetectedToolsTable } from "@/components/automation-audit/report/DetectedToolsTable";
import type { DetectedTool, ToolRecommendation } from "@/lib/automation-audit/types";

type WebsiteToolsSectionProps = {
  detectedTools: DetectedTool[];
  improvements: ToolRecommendation[];
};

export function WebsiteToolsSection({
  detectedTools,
  improvements,
}: WebsiteToolsSectionProps) {
  const t = useTranslations("automationAudit");

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-sm font-semibold text-foreground">
          {t("report.websiteTools.alreadyUsingTitle")}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {t("report.websiteTools.alreadyUsingDescription")}
        </p>
        <div className="mt-4">
          <DetectedToolsTable tools={detectedTools} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">
          {t("report.websiteTools.additionalTitle")}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {t("report.websiteTools.additionalDescription")}
        </p>
        <div className="mt-4">
          <ImprovementWorkflowsList recommendations={improvements} />
        </div>
      </div>
    </div>
  );
}
