import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MarketingAuditTool } from "@/components/marketing-audit/MarketingAuditTool";
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

  const t = await getTranslations({ locale, namespace: "metadata.marketingAudit" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/marketing-audit`,
      languages: {
        ...localeAlternates("/marketing-audit").languages,
        "x-default": "/en/marketing-audit",
      },
    },
  };
}

export default async function MarketingAuditPage({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  return (
    <main className="flex flex-1 flex-col">
      <MarketingAuditTool />
    </main>
  );
}
