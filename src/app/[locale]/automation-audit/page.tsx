import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AutomationAuditTool } from "@/components/automation-audit/AutomationAuditTool";
import { localeAlternates } from "@/lib/i18n-metadata";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata.automationAudit" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/automation-audit`,
      languages: {
        ...localeAlternates("/automation-audit").languages,
        "x-default": "/en/automation-audit",
      },
    },
  };
}

export default async function AutomationAuditPage({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  return (
    <main className="flex flex-1 flex-col">
      <AutomationAuditTool />
    </main>
  );
}
