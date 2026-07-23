type Lane = {
  code: string;
  title: string;
  subtitle: string;
  wide?: boolean;
};

type InboxRow = {
  from: string;
  subject: string;
  badge: string;
};

type ClassificationDemoProps = {
  lanes: readonly Lane[];
  inbox: {
    label: string;
    status: string;
    rows: readonly InboxRow[];
  };
};

export function ClassificationDemo({ lanes, inbox }: ClassificationDemoProps) {
  return (
    <div className="space-y-5">
      <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {lanes.map((lane) => (
          <li
            key={lane.code}
            className={`flex items-start gap-3 rounded-xl border border-border bg-surface-raised px-3.5 py-3 ${
              lane.wide ? "border-l-[3px] border-l-brand-green sm:col-span-2 lg:col-span-4" : "border-l-[3px] border-l-accent"
            }`}
          >
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                lane.wide
                  ? "bg-brand-green-muted text-brand-green"
                  : "bg-accent-muted text-accent"
              }`}
            >
              {lane.code}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{lane.title}</p>
              <p className="mt-0.5 text-xs text-muted">{lane.subtitle}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-foreground px-4 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">
            {inbox.label}
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-bright">
            {inbox.status}
          </p>
        </div>
        <ul className="divide-y divide-border">
          {inbox.rows.map((row) => (
            <li
              key={`${row.from}-${row.subject}`}
              className="grid gap-2 px-4 py-3 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
            >
              <span className="truncate text-sm font-medium text-foreground">{row.from}</span>
              <span className="truncate text-sm text-muted">{row.subject}</span>
              <span className="inline-flex w-fit rounded-full border border-border bg-accent-muted px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                {row.badge}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
