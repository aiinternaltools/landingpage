import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ClassificationDemo } from "@/components/use-cases/email-ai-agent/ClassificationDemo";
import { WorkflowDemos } from "@/components/use-cases/email-ai-agent/WorkflowDemos";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { getEmailAiAgent } from "@/content/index";
import { localeAlternates } from "@/lib/i18n-metadata";
import { clampMetaDescription } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: "metadata.useCases.emailAiAgent",
  });

  return {
    title: t("title"),
    description: clampMetaDescription(t("description")),
    alternates: {
      canonical: `/${locale}/use-cases/email-ai-agent`,
      languages: {
        ...localeAlternates("/use-cases/email-ai-agent").languages,
        "x-default": "/en/use-cases/email-ai-agent",
      },
    },
  };
}

const VIEWPORT_SECTION =
  "!py-0 flex min-h-[calc(100dvh-var(--header-height))] flex-col [&>div]:mx-auto [&>div]:flex [&>div]:w-full [&>div]:max-w-6xl [&>div]:flex-1 [&>div]:flex-col [&>div]:justify-center";

export default async function EmailAiAgentPage({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const content = getEmailAiAgent(locale as Locale);

  return (
    <main className="flex flex-1 flex-col">
      <Section className={`relative ${VIEWPORT_SECTION}`}>
        <PageBackdrop glow="hero" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[color-mix(in_srgb,var(--muted-bg)_42%,var(--background))]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-2 text-center">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:mt-5 md:text-4xl lg:text-[2.5rem] lg:leading-[1.12]">
            {content.headline}{" "}
            <span className="text-gradient">{content.headlineAccent}</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:mt-5 md:text-lg">
            {content.subhead}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="primary">
              {content.primaryCta}
            </Button>
            <Button href="#how-it-works" variant="secondary">
              {content.secondaryCta}
            </Button>
          </div>
        </div>
      </Section>

      <Section
        id="how-it-works"
        className={`section-band relative scroll-mt-[var(--header-height)] ${VIEWPORT_SECTION}`}
      >
        <PageBackdrop glow="none" />
        <div className="relative flex flex-1 flex-col justify-center px-2 py-8 md:py-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {content.challenge.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              {content.challenge.body}
            </p>
          </div>

          <div className="mt-8 grid gap-6 rounded-2xl border border-border bg-surface p-5 sm:p-6 md:mt-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                {content.method.eyebrow}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {content.method.heading}
              </h3>
            </div>
            <ol className="space-y-4">
              {content.method.steps.map((step) => (
                <li key={step.id} className="flex gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-xs font-bold text-accent">
                    {step.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section className="section-surface relative !py-12 md:!py-16">
        <div className="relative mx-auto max-w-6xl px-2">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {content.classification.heading}
            </h2>
            <p className="mt-2 text-sm text-muted md:text-base">
              {content.classification.body}
            </p>
          </div>
          <div className="mt-8 md:mt-10">
            <ClassificationDemo
              lanes={content.classification.lanes}
              inbox={content.classification.inbox}
            />
          </div>
        </div>
      </Section>

      <Section className="relative bg-background !py-12 md:!py-16">
        <div className="relative mx-auto max-w-6xl px-2">
          <h2 className="text-center text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {content.workflows.heading}
          </h2>
          <div className="mt-8 md:mt-10">
            <WorkflowDemos items={content.workflows.items} />
          </div>
        </div>
      </Section>

      <Section className={`relative bg-background ${VIEWPORT_SECTION}`}>
        <div className="relative flex flex-1 items-center justify-center px-2 py-6 md:py-10">
          <div className="card-elevated w-full rounded-2xl px-6 py-8 md:px-10 md:py-10">
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {content.finalCta.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {content.finalCta.body}
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="primary">
                {content.finalCta.button}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
