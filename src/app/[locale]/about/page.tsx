import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { getAboutProfile } from "@/content/index";
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

  const t = await getTranslations({ locale, namespace: "metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        ...localeAlternates("/about").languages,
        "x-default": "/en/about",
      },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const profile = getAboutProfile(locale as Locale);
  const t = await getTranslations("about");

  return (
    <main className="flex flex-1 flex-col">
      <Section pad="tight" className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        <PageBackdrop glow="soft" />
        <div className="relative mx-auto max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-muted">{profile.headline}</p>
          <p className="mt-1 text-sm text-muted">{profile.location}</p>
          <p className="mt-6 leading-relaxed text-muted">{profile.summary}</p>
          <p className="mt-4 leading-relaxed text-muted">{profile.whatIDo}</p>
          <p className="mt-4 text-sm text-muted">{profile.hiringLine}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary">
              {t("requestAutomation")}
            </Button>
            <Button href={`mailto:${profile.email}`} variant="secondary">
              {t("contact")}
            </Button>
          </div>
        </div>
      </Section>

      <Section className="section-surface border-t border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-semibold text-foreground">{t("selectedRoles")}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.roles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-border bg-muted-bg px-3 py-1 text-sm text-foreground"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>{t("stackEyebrow")}</Eyebrow>
          <h2 className="mt-3 text-xl font-semibold text-foreground">{t("coreStackTitle")}</h2>
          <p className="mt-2 text-sm text-muted">{t("coreStackIntro")}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {profile.coreStack.map((group) => (
              <li key={group.title} className="card-elevated rounded-2xl p-5">
                <h3 className="font-semibold text-foreground">{group.title}</h3>
                <p className="mt-1 text-sm text-accent">{group.summary}</p>
                <ul className="mt-3 space-y-1">
                  {group.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-muted">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="section-surface border-t border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-semibold text-foreground">{t("recognition")}</h2>
          <ul className="mt-6 space-y-6">
            {profile.highlights.map((item) => (
              <li key={item.title} className="border-b border-border pb-6 last:border-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-foreground">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent"
                      >
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <span className="text-xs text-muted">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{item.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
                {"stack" in item && item.stack ? (
                  <p className="mt-2 text-xs text-muted">{item.stack}</p>
                ) : null}
              </li>
            ))}
          </ul>
          {profile.militaryEarlier ? (
            <p className="mt-4 text-sm text-muted">{profile.militaryEarlier}</p>
          ) : null}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-semibold text-foreground">{t("education")}</h2>
          <ul className="mt-6 space-y-5">
            {profile.education.map((edu) => (
              <li key={edu.title} className="card-elevated rounded-2xl p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-foreground">{edu.title}</h3>
                  <span className="text-xs text-muted">{edu.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{edu.school}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{edu.detail}</p>
                {"projectHref" in edu && edu.projectHref ? (
                  <a
                    href={edu.projectHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
                  >
                    {t("encodeBootcampProject")} {t("projectRepoLink")}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="section-surface border-t border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-semibold text-foreground">{t("publications")}</h2>
          <p className="mt-2 text-sm text-muted">{t("publicationsIntro")}</p>
          <ul className="mt-6 space-y-3">
            {profile.publications.map((pub) => (
              <li key={pub.href}>
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-accent"
                >
                  {pub.title}
                </a>
                <p className="text-xs text-muted">{pub.venue}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-semibold text-foreground">{t("also")}</h2>
          <p className="mt-2 text-sm text-muted">{t("alsoIntro")}</p>
          <ul className="mt-6 space-y-4">
            {profile.skillGroups.map((group) => (
              <li key={group.label}>
                <h3 className="text-sm font-semibold text-foreground">{group.label}</h3>
                <p className="mt-1 text-sm text-muted">{group.items.join(" · ")}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-foreground">{t("languages")}</h3>
            <ul className="mt-2 flex flex-wrap gap-3">
              {profile.languages.map(({ language, level }) => (
                <li key={language} className="text-sm text-muted">
                  {language} — {level}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="section-band border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-foreground">{t("letsTalk")}</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">{t("letsTalkDescription")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="primary">
              {t("contactButton")}
            </Button>
            <Button href="/login" variant="secondary">
              {t("demosButton")}
            </Button>
            <Button href="/" variant="ghost">
              {t("homeButton")}
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
