import type { ReactNode } from "react";

type BriefingSectionProps = {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  band?: boolean;
};

export function BriefingSection({
  id,
  title,
  description,
  children,
  className = "",
  band = false,
}: BriefingSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-[7.25rem] w-full min-w-0 max-w-full overflow-x-clip ${band ? "section-band rounded-2xl px-3 py-6 sm:px-6 sm:py-10 md:py-12" : ""} ${className}`.trim()}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <header className="mb-4 sm:mb-6 md:mb-7">
        <h2
          id={id ? `${id}-heading` : undefined}
          className="flex items-start gap-2.5 sm:gap-3"
        >
          <span
            className="mt-1.5 h-6 w-1 shrink-0 rounded-full bg-accent/80 sm:mt-2 sm:h-7"
            aria-hidden
          />
          <span className="min-w-0 flex-1 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl md:text-2xl">
            {title}
          </span>
        </h2>
        {description ? (
          <p className="briefing-break mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:mt-2.5 sm:text-base">
            {description}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
