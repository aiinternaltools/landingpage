import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { PageBackdrop } from "@/components/ui/PageBackdrop";

export function CTASection() {
  return (
    <Section className="section-band relative overflow-hidden border-t border-border">
      <PageBackdrop glow="soft" />
      <div className="relative form-glow-panel rounded-2xl px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Ready to <span className="text-gradient">save time</span>?
        </h2>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Send the workflow. We&apos;ll help turn it into a practical automation
          plan.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/login" variant="primary">
            See demos
          </Button>
          <Button href="/contact" variant="secondary">
            Start a project
          </Button>
          <Button href="/community" variant="ghost">
            Join the waitlist
          </Button>
        </div>
      </div>
    </Section>
  );
}
