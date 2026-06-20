import { formatImpactLevel } from "@/lib/ai-news-utils";

type ImpactBadgeProps = {
  level: string;
  className?: string;
};

const toneClass = {
  act: "border-accent/45 bg-accent/20 text-accent",
  watch: "border-accent/25 bg-accent-muted text-foreground/90",
  neutral: "border-border bg-muted-bg/60 text-muted",
};

export function ImpactBadge({ level, className = "" }: ImpactBadgeProps) {
  const { label, tone } = formatImpactLevel(level);
  return (
    <span
      className={`inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${toneClass[tone]} ${className}`.trim()}
    >
      {label}
    </span>
  );
}
