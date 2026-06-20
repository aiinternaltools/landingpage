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
  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-sm font-semibold text-foreground">
          What you&apos;re likely already using
        </h3>
        <p className="mt-1 text-sm text-muted">
          Based on signals from your public website — each item includes a practical
          automation you could run.
        </p>
        <div className="mt-4">
          <DetectedToolsTable tools={detectedTools} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">
          Additional automations you could add
        </h3>
        <p className="mt-1 text-sm text-muted">
          Workflow ideas that would strengthen areas we could not fully see on your
          site alone.
        </p>
        <div className="mt-4">
          <ImprovementWorkflowsList recommendations={improvements} />
        </div>
      </div>
    </div>
  );
}
