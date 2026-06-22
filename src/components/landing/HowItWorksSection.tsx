"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";

const stepKeys = ["discovery", "build", "live"] as const;
const stepClasses = ["text-accent", "text-foreground", "text-brand-green"] as const;

function StepCard({
  n,
  title,
  body,
  stepClass,
}: {
  n: string;
  title: string;
  body: string;
  stepClass: string;
}) {
  return (
    <article className="card-elevated card-elevated-hover h-full rounded-2xl p-6 md:p-7">
      <p className={`text-sm font-semibold tabular-nums tracking-wider ${stepClass}`}>
        {n}
      </p>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </article>
  );
}

export function HowItWorksSection() {
  const t = useTranslations("landing.howItWorks");

  return (
    <Section className="section-surface relative overflow-hidden border-t border-border">
      <h2 className="text-center text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {t("title")}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted">
        {t("subtitle")}
      </p>

      <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
        {stepKeys.map((key, index) => (
          <li key={key}>
            <StepCard
              n={t(`steps.${key}.number`)}
              title={t(`steps.${key}.title`)}
              body={t(`steps.${key}.body`)}
              stepClass={stepClasses[index]}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
