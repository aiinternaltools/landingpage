import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing, type Locale } from "@/i18n/routing";
import { buildSocialMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const titleDefault = t("siteTitleDefault");
  const description = t("siteDescription");

  return {
    metadataBase: new URL("https://aiinternaltools.com"),
    title: {
      default: titleDefault,
      template: t("siteTitleTemplate"),
    },
    description,
    authors: [{ name: "Andrei Alexandru Gabriel" }],
    creator: "Andrei Alexandru Gabriel",
    publisher: "AI Internal Tools",
    ...buildSocialMetadata({
      title: titleDefault,
      description,
      url: `/${locale}`,
      locale,
    }),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const messages = await getMessages();
  const tNav = await getTranslations("nav");

  const navLabels = {
    community: tNav("community"),
    aiNews: tNav("aiNews"),
    useCases: tNav("useCases"),
    contact: tNav("contact"),
    openMenu: tNav("openMenu"),
    closeMenu: tNav("closeMenu"),
    menu: tNav("menu"),
    languageSwitcher: {
      label: tNav("languageSwitcher.label"),
      en: tNav("languageSwitcher.en"),
      ro: tNav("languageSwitcher.ro"),
    },
  };

  return (
    <NextIntlClientProvider
      locale={locale as Locale}
      messages={messages}
      key={locale}
    >
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <SetHtmlLang />
      <Navbar labels={navLabels} locale={locale as Locale} />
      <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
        {children}
      </div>
      <Footer />
    </NextIntlClientProvider>
  );
}
