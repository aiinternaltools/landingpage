import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { REPORT_CONSULTING_CTA } from "@/lib/automation-audit/constants";

type ReportConsultingCtaProps = {
  variant?: "banner" | "inline";
};

export function ReportConsultingCta({ variant = "banner" }: ReportConsultingCtaProps) {
  const cta = REPORT_CONSULTING_CTA;

  if (variant === "inline") {
    return (
      <div className="rounded-xl border border-border/80 bg-muted-bg/30 px-4 py-3">
        <p className="text-xs leading-relaxed text-muted">
          For a more detailed analysis of your real workflows and stack,{" "}
          <span className="text-muted-strong">book a free consulting call</span>{" "}
          — we’ll go beyond what’s visible on your website.
        </p>
        <Button href={cta.href} variant="secondary" className="mt-3">
          {cta.buttonLabel}
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-accent/25 bg-accent-muted/20">
      <h3 className="text-lg font-semibold text-foreground">{cta.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{cta.description}</p>
      <Button href={cta.href} variant="primary" className="mt-5">
        {cta.buttonLabel}
      </Button>
    </Card>
  );
}
