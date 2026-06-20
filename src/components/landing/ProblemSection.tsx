import { Section } from "@/components/layout/Section";

const frictionPoints = [
  { label: "Leads", detail: "Qualify, route, update CRM" },
  { label: "Docs", detail: "Create packets and checklists" },
  { label: "Support", detail: "Draft answers from trusted content" },
  { label: "Reports", detail: "Summarize status in one view" },
  { label: "Handoffs", detail: "Move work between tools" },
  { label: "Knowledge", detail: "Find procedures fast" },
];

export function ProblemSection() {
  return (
    <Section className="section-band border-t border-border">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-medium text-accent">Where time leaks</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Repeated work is the easiest place to win.
          </h2>
          <p className="mt-4 max-w-xl text-muted leading-relaxed">
            If a workflow is predictable, it can usually be automated,
            summarized, or turned into a simple internal tool.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {frictionPoints.map(({ label, detail }) => (
            <li
              key={label}
              className="card-elevated card-elevated-hover rounded-2xl p-4"
            >
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="mt-1 text-xs text-muted">{detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
