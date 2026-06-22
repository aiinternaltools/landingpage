import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { routing, type Locale } from "@/i18n/routing";

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

  return {
    metadataBase: new URL("https://aiinternaltools.com"),
    title: {
      default: t("siteTitleDefault"),
      template: t("siteTitleTemplate"),
    },
    description: t("siteDescription"),
    icons: {
      icon: "/faviconAIT.png",
      apple: "/faviconAIT.png",
    },
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
      <SetHtmlLang />
      <Navbar labels={navLabels} locale={locale as Locale} />
      <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
        {children}
      </div>
      <Footer />
    </NextIntlClientProvider>
  );
}
