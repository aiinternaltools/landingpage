import { AuditAreaIcon } from "@/components/marketing-audit/icons/AuditAreaIcon";
import { EMPTY_STATE_COPY } from "@/components/marketing-audit/report/report-template-sections";
import { Card } from "@/components/ui/Card";
import type { AuditArea } from "@/lib/marketing-audit/types";

type AuditAreaPanelProps = {
  area: AuditArea;
  label: string;
  description: string;
  color: string;
  score: number;
  findings: string[];
};

function scoreBadgeClass(score: number): string {
  if (score >= 75) return "border-emerald-500/40 bg-emerald-500/15 text-emerald-400";
  if (score >= 50) return "border-amber-500/40 bg-amber-500/15 text-amber-400";
  return "border-rose-500/40 bg-rose-500/15 text-rose-400";
}

export function AuditAreaPanel({
  area,
  label,
  description,
  color,
  score,
  findings,
}: AuditAreaPanelProps) {
  const items = findings.length > 0 ? findings : [EMPTY_STATE_COPY.findings];

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${color}22`, color }}
          >
            <AuditAreaIcon area={area} className="h-5 w-5" />
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
      <ul className="mt-4 space-y-2">
        {items.map((item, i) => (
          <li
            key={`${area}-${i}`}
            className="flex gap-2 text-sm leading-relaxed text-muted-strong"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
