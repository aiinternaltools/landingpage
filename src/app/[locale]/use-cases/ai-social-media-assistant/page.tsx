import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { WorkflowFlowChart } from "@/components/use-cases/ai-social-media-assistant/WorkflowFlowChart";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { getAiSocialMediaAssistant } from "@/content/index";
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
    namespace: "metadata.useCases.aiSocialMediaAssistant",
  });

  return {
    title: t("title"),
    description: clampMetaDescription(t("description")),
    alternates: {
      canonical: `/${locale}/use-cases/ai-social-media-assistant`,
      languages: {
        ...localeAlternates("/use-cases/ai-social-media-assistant").languages,
        "x-default": "/en/use-cases/ai-social-media-assistant",
      },
    },
  };
}

const VIEWPORT_SECTION =
  "!py-0 flex min-h-[calc(100dvh-var(--header-height))] flex-col [&>div]:mx-auto [&>div]:flex [&>div]:w-full [&>div]:max-w-6xl [&>div]:flex-1 [&>div]:flex-col [&>div]:justify-center";

function BenefitIcon({ id }: { id: string }) {
  const styles = {
    time: "border-border bg-muted-bg text-accent",
    brand: "border-border bg-muted-bg text-foreground",
    control: "border-border bg-muted-bg text-brand-green",
  } as const;
  const base = `flex size-9 shrink-0 items-center justify-center rounded-lg border ${styles[id as keyof typeof styles] ?? styles.time}`;

  if (id === "time") {
    return (
      <span className={base} aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  if (id === "brand") {
    return (
      <span className={base} aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 3l2.5 7.5H22l-6 4.5 2.5 7.5L12 18l-6.5 4.5L8 15 2 10.5h7.5L12 3z" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }

  return (
    <span className={base} aria-hidden>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
      </svg>
    </span>
  );
}

export default async function AiSocialMediaAssistantPage({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const content = getAiSocialMediaAssistant(locale as Locale);

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

      <Section id="how-it-works" className={`section-band relative scroll-mt-[var(--header-height)] ${VIEWPORT_SECTION}`}>
        <PageBackdrop glow="none" />
        <div className="relative flex flex-1 flex-col px-2 py-4 md:py-6">
          <div className="shrink-0 text-center md:mt-2">
            <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              How it works
            </h2>
            <p className="mx-auto mt-1 max-w-lg text-xs text-muted md:text-sm">
              {content.flowIntro}
            </p>
          </div>
          <div className="mt-4 flex flex-col items-center justify-start">
            <WorkflowFlowChart compact diagram={content.flowDiagram} />
          </div>
        </div>
      </Section>

      <Section className={`section-surface relative ${VIEWPORT_SECTION}`}>
        <div className="relative flex flex-1 flex-col justify-center px-2 py-6 md:py-10">
          <h2 className="text-center text-lg font-semibold tracking-tight text-foreground md:text-xl">
            {content.benefitsHeading}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-xs text-muted md:text-sm">
            {content.benefitsSubheading}
          </p>
          <ul className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
            {content.benefits.map((benefit) => (
              <li key={benefit.id}>
                <article className="card-elevated card-elevated-hover h-full rounded-2xl p-5">
                  <BenefitIcon id={benefit.id} />
                  <h3 className="mt-3 text-base font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{benefit.body}</p>
                </article>
              </li>
            ))}
          </ul>
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
