import type { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
  className?: string;
  /** Optional titled card */
  title?: string;
  description?: string;
};

export function Card({ children, className = "", title, description }: CardProps) {
  return (
    <div
      className={`card-elevated card-elevated-hover rounded-2xl p-6 ${className}`.trim()}
    >
      {(title ?? description) ? (
        <div className="mb-4">
          {title ? (
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
          ) : null}
          {description ? (
            <p className="mt-1 text-sm text-muted leading-relaxed">{description}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
