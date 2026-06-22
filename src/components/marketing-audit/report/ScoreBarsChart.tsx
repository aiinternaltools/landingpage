"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getReportAuditAreas } from "@/components/marketing-audit/report/report-template-sections";
import type { Locale } from "@/i18n/routing";
import type { AuditScores } from "@/lib/marketing-audit/types";

type ScoreBarsChartProps = {
  scores: AuditScores;
};

export function ScoreBarsChart({ scores }: ScoreBarsChartProps) {
  const t = useTranslations("marketingAudit");
  const locale = useLocale() as Locale;
  const data = [
    ...getReportAuditAreas(locale).map((area) => ({
      name: area.shortLabel,
      score: scores[area.id],
      fill: area.color,
    })),
    {
      name: t("report.charts.overall"),
      score: scores.overall,
      fill: "#0284c7",
    },
  ];

  return (
    <div className="h-72 w-full" aria-label={t("report.charts.barsAria")}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(15,23,42,0.08)"
            horizontal={false}
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={72}
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid rgba(15,23,42,0.09)",
              borderRadius: "8px",
              color: "#0f172a",
              boxShadow: "0 4px 16px -4px rgba(15,23,42,0.12)",
            }}
            formatter={(value) => [`${value}/100`, "Score"]}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
