"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { getReportAuditAreas } from "@/components/automation-audit/report/report-template-sections";
import type { Locale } from "@/i18n/routing";
import type { AutomationScores } from "@/lib/automation-audit/types";

type ScoreRadarChartProps = {
  scores: AutomationScores;
};

export function ScoreRadarChart({ scores }: ScoreRadarChartProps) {
  const t = useTranslations("automationAudit");
  const locale = useLocale() as Locale;
  const data = getReportAuditAreas(locale).map((area) => ({
    area: area.shortLabel,
    score: scores[area.id],
    fullMark: 100,
  }));

  return (
    <div className="h-72 w-full" aria-label={t("report.charts.radarAria")}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="rgba(15,23,42,0.1)" />
          <PolarAngleAxis
            dataKey="area"
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#0284c7"
            fill="#0284c7"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
