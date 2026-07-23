type ChatMessage = {
  role: "in" | "out" | "flag";
  text: string;
  note?: string;
};

type ChatDemo = {
  type: "chat";
  metaLabel?: string;
  status?: string;
  name?: string;
  detail?: string;
  messages: readonly ChatMessage[];
};

type DataDemo = {
  type: "data";
  title: string;
  subtitle: string;
  rows: readonly { label: string; value: string }[];
};

type WorkflowItem = {
  id: string;
  step: string;
  title: string;
  body: string;
  ticks: readonly string[];
  demo: ChatDemo | DataDemo;
};

type WorkflowDemosProps = {
  items: readonly WorkflowItem[];
  autoLabel?: string;
};

function TickList({ ticks }: { ticks: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {ticks.map((tick) => (
        <li key={tick} className="flex items-start gap-2 text-sm text-muted-strong">
          <span
            className="mt-1.5 size-1.5 shrink-0 rounded-[2px] bg-accent"
            aria-hidden
          />
          {tick}
        </li>
      ))}
    </ul>
  );
}

function ChatPanel({
  demo,
  autoLabel,
}: {
  demo: ChatDemo;
  autoLabel: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted-bg/40 p-3.5 sm:p-4">
      {demo.name ? (
        <div className="mb-3 border-b border-border pb-3">
          <div className="flex items-center justify-between gap-2">
            {demo.metaLabel ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                {demo.metaLabel}
              </p>
            ) : null}
            {demo.status ? (
              <span className="rounded-full bg-brand-green-muted px-2 py-0.5 text-[11px] font-semibold text-brand-green">
                {demo.status}
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 text-sm font-semibold text-foreground">{demo.name}</p>
          {demo.detail ? (
            <p className="mt-0.5 text-xs text-muted">{demo.detail}</p>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-2.5">
        {demo.messages.map((message, index) => {
          if (message.role === "flag") {
            return (
              <p
                key={index}
                className="rounded-lg border border-dashed border-accent/35 bg-accent-muted/50 px-3 py-2 text-xs leading-relaxed text-muted-strong"
              >
                {message.text}
                {message.note ? (
                  <em className="mt-0.5 block not-italic text-muted">{message.note}</em>
                ) : null}
              </p>
            );
          }

          if (message.role === "out") {
            return (
              <div
                key={index}
                className="ml-4 rounded-xl rounded-br-md bg-foreground px-3.5 py-2.5 text-sm leading-relaxed text-white sm:ml-8"
              >
                <p>{message.text}</p>
                <span className="mt-1.5 inline-flex rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  {autoLabel}
                </span>
              </div>
            );
          }

          return (
            <p
              key={index}
              className="mr-4 rounded-xl rounded-bl-md bg-muted-bg px-3.5 py-2.5 text-sm leading-relaxed text-foreground sm:mr-8"
            >
              {message.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function DataPanel({ demo }: { demo: DataDemo }) {
  return (
    <div className="rounded-xl border border-border bg-muted-bg/40 p-4">
      <div className="border-b border-border pb-3">
        <p className="text-sm font-semibold text-foreground">{demo.title}</p>
        <p className="mt-0.5 text-xs text-muted">{demo.subtitle}</p>
      </div>
      <dl className="mt-3 space-y-2">
        {demo.rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 text-sm">
            <dt className="text-muted">{row.label}</dt>
            <dd className="font-semibold text-brand-green">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function WorkflowDemos({ items, autoLabel = "Auto" }: WorkflowDemosProps) {
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.id}
          className={`card-elevated overflow-hidden rounded-2xl ${
            item.id === "support" || item.id === "supplier" ? "lg:col-span-2" : ""
          }`}
        >
          <div
            className={`grid gap-5 p-5 sm:p-6 ${
              item.id === "support" || item.id === "supplier"
                ? "lg:grid-cols-2 lg:items-start"
                : ""
            }`}
          >
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                  {item.step}
                </span>
                <h3 className="text-base font-semibold text-foreground md:text-lg">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              <TickList ticks={item.ticks} />
            </div>
            {item.demo.type === "chat" ? (
              <ChatPanel demo={item.demo} autoLabel={autoLabel} />
            ) : (
              <DataPanel demo={item.demo} />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
