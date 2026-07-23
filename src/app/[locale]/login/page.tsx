import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
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

  const t = await getTranslations({ locale, namespace: "metadata.login" });

  return {
    title: t("title"),
    description: clampMetaDescription(t("description")),
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${locale}/login`,
      languages: {
        ...localeAlternates("/login").languages,
        "x-default": "/en/login",
      },
    },
  };
}

export default async function LoginPage({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const t = await getTranslations("login");

  return (
    <main className="flex flex-1 flex-col">
      <Section pad="tight" className="pt-10 md:pt-16">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          {t("description")}
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted leading-relaxed">
          {t("note")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="primary">
            {t("requestAutomation")}
          </Button>
          <Button href="/" variant="secondary">
            {t("backHome")}
          </Button>
        </div>
      </Section>
    </main>
  );
}
