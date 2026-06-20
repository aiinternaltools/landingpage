import { Card } from "@/components/ui/Card";
import { EMPTY_STATE_COPY } from "@/components/automation-audit/report/report-template-sections";

type ExecutiveSummaryCardProps = {
  summary: string;
};

export function ExecutiveSummaryCard({ summary }: ExecutiveSummaryCardProps) {
  return (
    <Card className="border-accent/20 bg-accent-muted/30">
      <p className="text-base leading-relaxed text-foreground sm:text-lg">
        {summary.trim() || EMPTY_STATE_COPY.executiveSummary}
      </p>
    </Card>
  );
}
