"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { getEmptyStateCopy } from "@/components/marketing-audit/report/report-template-sections";

type QuickWinsListProps = {
  quickWins: string[];
};

export function QuickWinsList({ quickWins }: QuickWinsListProps) {
  const t = useTranslations("marketingAudit");
  const emptyStates = getEmptyStateCopy(t);
  const items = quickWins.length > 0 ? quickWins : [emptyStates.quickWins];

  return (
    <Card>
      <ol className="space-y-3">
        {items.map((win, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed sm:text-base">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-muted text-xs font-bold text-accent">
              {quickWins.length > 0 ? i + 1 : "—"}
            </span>
            <span className="text-foreground">{win}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
