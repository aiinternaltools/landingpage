import { Section } from "@/components/layout/Section";

const steps = [
  {
    n: "01",
    title: "Discovery call",
    body: "30 minutes. You walk us through your current manual processes. We identify what's automatable and map out the workflow",
    stepClass: "text-accent",
  },
  {
    n: "02",
    title: "We design & build",
    body: "We design the automation, connect your systems (APIs, webhooks, AI), test everything, and make sure it actually works",
    stepClass: "text-foreground",
  },
  {
    n: "03",
    title: "Live & Monitored",
    body: "Few days later, it's running. We monitor performance, train your team, and provide ongoing support as your needs evolve",
    stepClass: "text-brand-green",
  },
] as const;

function StepCard({
  n,
  title,
  body,
  stepClass,
}: {
  n: string;
  title: string;
  body: string;
  stepClass: string;
}) {
  return (
    <article className="card-elevated card-elevated-hover h-full rounded-2xl p-6 md:p-7">
      <p className={`text-sm font-semibold tabular-nums tracking-wider ${stepClass}`}>
        {n}
      </p>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </article>
  );
}

export function HowItWorksSection() {
  return (
    <Section className="section-surface relative overflow-hidden border-t border-border">
      <h2 className="text-center text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        How it works
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted">
        A clear path from first call to production automation
      </p>

      <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
        {steps.map((step) => (
          <li key={step.n}>
            <StepCard {...step} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
