function IconRefresh({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function IconCheckCircle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2 2 5-5" />
    </svg>
  );
}

function IconList({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HowItHelpsVisual() {
  return (
    <div className="relative w-full max-w-sm mx-auto lg:mx-0">
      <div
        className="absolute inset-0 rounded-2xl bg-accent-muted opacity-60 blur-2xl pointer-events-none"
        aria-hidden
      />
      <div className="relative rounded-2xl border border-border bg-muted-bg/70 p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          <IconList className="text-accent shrink-0" />
          <span>Plain terms</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
          Less repeat busywork.
        </h3>

        <ul className="mt-4 space-y-3" role="list">
          <li className="flex gap-3 rounded-xl border border-border bg-background/50 p-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted"
              aria-hidden
            >
              <IconRefresh />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-xs font-medium text-muted">Today</p>
              <p className="mt-0.5 text-sm text-foreground leading-snug">
                Same steps, every time.
              </p>
            </div>
          </li>
          <li className="flex gap-3 rounded-xl border border-accent/30 bg-accent-muted/80 p-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/35 bg-accent-muted text-accent"
              aria-hidden
            >
              <IconCheckCircle />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-xs font-medium text-accent">After</p>
              <p className="mt-0.5 text-sm text-foreground leading-snug">
                Runs on its own—step in if needed.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
