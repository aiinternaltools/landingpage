type PageBackdropProps = {
  /** Stronger glow for hero-style pages */
  glow?: "hero" | "soft" | "none";
  className?: string;
};

export function PageBackdrop({ glow = "soft", className = "" }: PageBackdropProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 grid-bg opacity-100" />
      {glow === "hero" ? (
        <div className="absolute left-1/2 top-0 h-[24rem] w-[min(100%,36rem)] -translate-x-1/2 rounded-full bg-accent-bright/8 blur-[100px]" />
      ) : null}
      {glow === "soft" ? (
        <div className="absolute left-1/2 top-0 h-64 w-[min(100%,28rem)] -translate-x-1/2 rounded-full bg-accent-bright/6 blur-[90px]" />
      ) : null}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
