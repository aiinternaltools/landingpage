import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export default function AiNewsNotFound() {
  return (
    <main className="flex flex-1 flex-col">
      <Section pad="tight" className="pt-16 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Edition not found</h1>
        <p className="mt-3 text-muted">
          This weekly briefing doesn&apos;t exist or isn&apos;t published yet.
        </p>
        <div className="mt-8">
          <Button href="/ai-news" variant="primary">
            Back to AI News
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          <Link href="/" className="text-accent hover:underline">
            Home
          </Link>
        </p>
      </Section>
    </main>
  );
}
