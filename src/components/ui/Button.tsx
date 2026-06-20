import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
} & Pick<
    ComponentPropsWithoutRef<typeof Link>,
    "prefetch" | "replace" | "scroll"
  >;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white font-semibold hover:bg-accent/90 border border-transparent shadow-sm hover:shadow-md",
  secondary:
    "bg-surface border border-border-strong text-foreground font-medium hover:bg-surface-raised shadow-sm",
  ghost:
    "bg-transparent border border-transparent text-muted font-medium hover:border-border hover:text-foreground hover:bg-muted-bg",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm transition-[color,box-shadow,background-color] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const styles = `${base} ${variantClasses[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, prefetch, replace, scroll } = props;
    return (
      <Link href={href} className={styles} prefetch={prefetch} replace={replace} scroll={scroll}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={styles} {...rest}>
      {children}
    </button>
  );
}
