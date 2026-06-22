"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { getEmptyStateCopy } from "@/components/marketing-audit/report/report-template-sections";

type ExecutiveSummaryCardProps = {
  summary: string;
};

export function ExecutiveSummaryCard({ summary }: ExecutiveSummaryCardProps) {
  const t = useTranslations("marketingAudit");
  const emptyStates = getEmptyStateCopy(t);

  return (
    <Card className="border-accent/20 bg-accent-muted/30">
      <p className="text-base leading-relaxed text-foreground sm:text-lg">
        {summary.trim() || emptyStates.executiveSummary}
      </p>
    </Card>
  );
}
