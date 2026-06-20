import { ReportConsultingCta } from "@/components/automation-audit/report/ReportConsultingCta";

type ReportFooterProps = {
  scopeNote: string;
};

export function ReportFooter({ scopeNote }: ReportFooterProps) {
  return (
    <div className="space-y-4">
      <p className="rounded-xl border border-border/80 bg-muted-bg/30 px-4 py-3 text-sm leading-relaxed text-muted">
        {scopeNote}
      </p>
      <ReportConsultingCta />
    </div>
  );
}
