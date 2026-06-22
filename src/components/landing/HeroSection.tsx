"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { Section } from "@/components/layout/Section";

const statKeys = [
  { key: "fasterOperations", valueClass: "text-accent" },
  { key: "errorReduction", valueClass: "text-foreground" },
  { key: "timeSaved", valueClass: "text-brand-green" },
] as const;

export function HeroSection() {
  const t = useTranslations("landing.hero");

  return (
    <Section
      pad="tight"
      className="relative overflow-hidden pt-24 pb-28 md:pt-32 md:pb-36"
    >
      <PageBackdrop glow="hero" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground md:mt-10 md:text-5xl lg:text-6xl lg:leading-[1.08]">
          {t("titleBefore")}{" "}
          <span className="text-gradient">{t("titleAccent")}</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:mt-10 md:text-lg">
          {t("description")}
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Button href="/contact" variant="primary" className="min-w-[11rem]">
            {t("bookCall")}
          </Button>
          <Button href="/contact" variant="secondary" className="min-w-[11rem]">
            {t("getInTouch")}
          </Button>
        </div>
        <ul className="mt-24 grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3 md:mt-28 md:gap-6">
          {statKeys.map(({ key, valueClass }) => (
            <li
              key={key}
              className="card-elevated card-elevated-hover rounded-2xl px-7 py-7 md:px-8 md:py-8"
            >
              <p className={`text-3xl font-bold tracking-tight md:text-4xl ${valueClass}`}>
                {t(`stats.${key}.value`)}
              </p>
              <p className="mt-1.5 text-sm text-muted">{t(`stats.${key}.label`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
