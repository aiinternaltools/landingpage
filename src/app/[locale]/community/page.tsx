import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { CommunityBenefitsSection } from "@/components/community/CommunityBenefitsSection";
import { CommunityJoinForm } from "@/components/community/CommunityJoinForm";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import {
  getCommunityBenefits,
  getCommunityInterests,
  getCommunityRoles,
  getCommunityWaitlist,
} from "@/content/index";
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

  const t = await getTranslations({ locale, namespace: "metadata.community" });

  return {
    title: t("title"),
    description: clampMetaDescription(t("description")),
    alternates: {
      canonical: `/${locale}/community`,
      languages: {
        ...localeAlternates("/community").languages,
        "x-default": "/en/community",
      },
    },
  };
}

export default async function CommunityPage({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const loc = locale as Locale;
  const waitlist = getCommunityWaitlist(loc);
  const benefits = getCommunityBenefits(loc);
  const roles = getCommunityRoles(loc);
  const interests = getCommunityInterests(loc);
  const t = await getTranslations("community");
  const trustItemKeys = ["noCreditCard", "firstFree", "leaveAnytime"] as const;

  return (
    <main className="flex flex-1 flex-col">
      <Section
        pad="tight"
        className="relative flex min-h-[calc(100dvh-var(--header-height))] flex-col justify-center overflow-hidden py-0"
      >
        <PageBackdrop glow="hero" />
        <div className="relative mx-auto w-full max-w-3xl px-2 text-center sm:px-0">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            <span className="text-gradient">{t("heroTitleBefore")}</span>{" "}
            {t("heroTitleAfter")}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            {t("heroDescription")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#join" variant="primary">
              {t("cta")}
            </Button>
            <Button href="/" variant="secondary">
              {t("backHome")}
            </Button>
          </div>
        </div>
      </Section>

      <Section className="relative border-t border-border py-14 md:py-20">
        <CommunityBenefitsSection
          benefits={benefits}
          freeAccessLimit={waitlist.freeAccessLimit}
        />
      </Section>

      <Section
        id="join"
        pad="tight"
        className="section-band relative flex min-h-[calc(100dvh-var(--header-height))] scroll-mt-[var(--header-height)] flex-col justify-center overflow-hidden border-t border-border !py-6 md:!py-8"
      >
        <PageBackdrop glow="soft" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {t("joinBadge", { limit: waitlist.freeAccessLimit.toLocaleString() })}
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {t("joinHeading")}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-[15px]">
              {t("joinDescription")}
            </p>
            <ul className="mt-5 space-y-2.5">
              {trustItemKeys.map((key) => (
                <li key={key} className="flex items-center gap-2 text-sm text-muted">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  {t(`trustItems.${key}`)}
                </li>
              ))}
            </ul>
            <p className="mt-5 hidden text-sm text-muted lg:block">
              {t("preferEmail")}{" "}
              <Link
                href="/contact"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                {t("getInTouch")}
              </Link>
            </p>
          </div>

          <div className="form-glow-panel overflow-hidden rounded-2xl lg:col-span-7 lg:ml-auto lg:w-full lg:max-w-2xl">
            <div className="border-b border-border/60 bg-background/20 px-5 py-3 text-xs text-muted sm:px-6">
              {t("waitlistFormLabel")}
            </div>
            <div className="px-5 py-5 sm:px-6">
              <CommunityJoinForm roles={roles} interests={interests} />
            </div>
          </div>

          <p className="text-center text-sm text-muted lg:col-span-12 lg:hidden">
            {t("preferEmail")}{" "}
            <Link
              href="/contact"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              {t("getInTouch")}
            </Link>
          </p>
        </div>
      </Section>
    </main>
  );
}
