import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Extra wrapper classes for vertical padding */
  pad?: "default" | "tight";
};

export function Section({
  id,
  children,
  className = "",
  pad = "default",
}: SectionProps) {
  const py = pad === "tight" ? "py-14 md:py-20" : "py-20 md:py-28";
  return (
    <section id={id} className={`${py} px-5 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
