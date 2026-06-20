import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const categories = [
  {
    title: "Lead routing",
    description: "Score, enrich, assign, and update CRM fields.",
  },
  {
    title: "Knowledge assistants",
    description: "Fast answers grounded in your SOPs and docs.",
  },
  {
    title: "Document workflows",
    description: "Build packets from templates, rules, and CRM data.",
  },
  {
    title: "Dashboards",
    description: "Rollups and short summaries leadership can scan.",
  },
  {
    title: "Support copilots",
    description: "Triage, draft replies, and suggest next steps.",
  },
  {
    title: "Cross-tool handoffs",
    description: "Tasks, tickets, and updates triggered automatically.",
  },
];

export function ToolCategories() {
  return (
    <Section id="use-cases" className="section-band border-t border-border">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">Use cases</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Pick the workflow that costs you time.
          </h2>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ title, description }) => (
          <Card key={title} title={title} description={description} />
        ))}
      </div>

      <div className="card-elevated mt-12 rounded-2xl p-6 md:flex md:items-center md:justify-between md:gap-8">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-foreground">
            Need a workflow like this?
          </p>
          <p className="mt-1 text-sm text-muted leading-relaxed">
            Share the process. We&apos;ll map what to automate first.
          </p>
        </div>
        <div className="mt-4 shrink-0 md:mt-0">
          <Button href="/contact" variant="primary">
            Request automation
          </Button>
        </div>
      </div>
    </Section>
  );
}
