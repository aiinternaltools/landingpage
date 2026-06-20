import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    n: "01",
    title: "Map",
    body: "Pinpoint the repeatable workflow and the tools involved.",
  },
  {
    n: "02",
    title: "Prototype",
    body: "Test the automation pattern with a working demo.",
  },
  {
    n: "03",
    title: "Ship",
    body: "Build the agent, app, or integration around your stack.",
  },
];

export function SolutionSection() {
  return (
    <Section>
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-accent">How it works</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          From messy process to working system.
        </h2>
        <p className="mt-4 text-muted leading-relaxed">
          Start small, prove value quickly, then wire it into the way your team
          already works.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map(({ n, title, body }) => (
          <Card key={n} className="relative overflow-hidden">
            <span className="text-xs font-mono text-accent/80">{n}</span>
            <h3 className="mt-2 text-base font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">{body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
