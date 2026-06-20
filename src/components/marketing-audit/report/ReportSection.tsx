import type { ReactNode } from "react";

type ReportSectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  band?: boolean;
};

export function ReportSection({
  id,
  title,
  description,
  children,
  band = false,
}: ReportSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${band ? "section-band rounded-2xl px-4 py-8 sm:px-6 sm:py-10" : "py-8 sm:py-10"}`}
      aria-labelledby={`${id}-heading`}
    >
      <header className="mb-6">
        <h2
          id={`${id}-heading`}
          className="flex items-start gap-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          <span
            className="mt-2 h-6 w-1 shrink-0 rounded-full bg-accent/80"
            aria-hidden
          />
          <span>{title}</span>
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl pl-4 text-sm leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
