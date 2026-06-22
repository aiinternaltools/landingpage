"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

const EXAMPLE_URLS = [
  "https://pixelplot.ai",
  "https://stripe.com",
  "https://vercel.com",
] as const;

type MarketingAuditFormProps = {
  targetUrl: string;
  loading: boolean;
  onUrlChange: (url: string) => void;
  onSubmit: () => void;
  compact?: boolean;
};

export function MarketingAuditForm({
  targetUrl,
  loading,
  onUrlChange,
  onSubmit,
  compact = false,
}: MarketingAuditFormProps) {
  const t = useTranslations("marketingAudit");

  return (
    <form
      className={compact ? "w-full" : "px-5 py-8 sm:px-8 sm:py-10"}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="audit-url" className="sr-only">
        {t("form.urlLabel")}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="audit-url"
          type="url"
          inputMode="url"
          placeholder={t("form.urlPlaceholder")}
          value={targetUrl}
          onChange={(e) => onUrlChange(e.target.value)}
          disabled={loading}
          autoComplete="url"
          className="form-glow-panel min-w-0 flex-1 rounded-xl border border-border bg-muted-bg/60 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
          required
        />
        <Button type="submit" variant="primary" className="shrink-0" disabled={loading}>
          {loading ? t("form.auditing") : t("form.runAudit")}
        </Button>
      </div>

      {!compact ? (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted">{t("form.tryLabel")}</span>
            {EXAMPLE_URLS.map((url) => (
              <button
                key={url}
                type="button"
                disabled={loading}
                onClick={() => onUrlChange(url)}
                className="rounded-full border border-border bg-muted-bg/40 px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent/30 hover:text-foreground disabled:opacity-50"
              >
                {(() => {
                  try {
                    return new URL(url).hostname;
                  } catch {
                    return url;
                  }
                })()}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">{t("form.helperText")}</p>
        </>
      ) : null}
    </form>
  );
}
