import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to access automation demos with limited demo credits (coming soon).",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Section pad="tight" className="pt-10 md:pt-16">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Demo access
        </h1>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Sign-in for the demo lab is not wired up yet. The goal is simple:
          create an account, receive a small allocation of demo credits, try
          selected proof-of-concept tools, then move to a custom automation if
          you need it in production.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted leading-relaxed">
          Authentication will likely use Supabase later; this route is reserved
          for that flow.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="primary">
            Request a custom automation
          </Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </Section>
    </main>
  );
}
