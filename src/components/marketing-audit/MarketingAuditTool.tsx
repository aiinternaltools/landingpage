"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AuditWorkspace } from "@/components/marketing-audit/AuditWorkspace";
import { MarketingAuditForm } from "@/components/marketing-audit/MarketingAuditForm";
import { MarketingAuditProgress } from "@/components/marketing-audit/MarketingAuditProgress";
import { MarketingAuditReport } from "@/components/marketing-audit/report/MarketingAuditReport";
import { ReportScoreTeaser } from "@/components/marketing-audit/report/ReportScoreTeaser";
import { REPORT_TEMPLATE_SECTIONS } from "@/components/marketing-audit/report/report-template-sections";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import type { MarketingAuditReport as Report } from "@/lib/marketing-audit/types";

type AuditPhase = "input" | "running" | "teaser" | "report" | "error";

const PROGRESS_INTERVAL_MS = 8000;
const TEASER_DURATION_MS = 900;

function getHostname(url: string): string {
  try {
    return new URL(url.match(/^https?:\/\//i) ? url : `https://${url}`).hostname;
  } catch {
    return url;
  }
}

export function MarketingAuditTool() {
  const [targetUrl, setTargetUrl] = useState("");
  const [phase, setPhase] = useState<AuditPhase>("input");
  const [activeStep, setActiveStep] = useState(0);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasAuditedOnce, setHasAuditedOnce] = useState(false);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const teaserTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearProgressTimer = useCallback(() => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
  }, []);

  const clearTeaserTimer = useCallback(() => {
    if (teaserTimer.current) {
      clearTimeout(teaserTimer.current);
      teaserTimer.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      clearProgressTimer();
      clearTeaserTimer();
    },
    [clearProgressTimer, clearTeaserTimer]
  );

  const runAudit = async (urlInput?: string) => {
    const url = (urlInput ?? targetUrl).trim();
    if (!url) return;

    setTargetUrl(url);
    setPhase("running");
    setError(null);
    setReport(null);
    setActiveStep(0);
    setHasAuditedOnce(true);

    clearProgressTimer();
    clearTeaserTimer();
    progressTimer.current = setInterval(() => {
      setActiveStep((s) => Math.min(s + 1, 4));
    }, PROGRESS_INTERVAL_MS);

    try {
      const res = await fetch("/api/marketing-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: url }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          typeof data.error === "string" ? data.error : "Audit request failed"
        );
      }

      const nextReport = data as Report;
      setReport(nextReport);
      setActiveStep(4);
      setPhase("teaser");

      teaserTimer.current = setTimeout(() => {
        setPhase("report");
      }, TEASER_DURATION_MS);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Audit failed");
      setPhase("error");
    } finally {
      clearProgressTimer();
    }
  };

  const startNewAudit = (url?: string) => {
    clearTeaserTimer();
    if (url) setTargetUrl(url);
    setReport(null);
    setError(null);
    setActiveStep(0);
    setPhase("input");
  };

  const hero = REPORT_TEMPLATE_SECTIONS.hero;
  const showHero = phase === "input" && !hasAuditedOnce;

  return (
    <Section
      pad="tight"
      className="relative min-h-[calc(100dvh-var(--header-height))] overflow-hidden py-10 md:py-14"
    >
      {showHero ? <PageBackdrop glow="hero" /> : null}

      <div className="relative mx-auto max-w-6xl">
        <div
          className={`overflow-hidden text-center transition-all duration-500 ease-out ${
            showHero
              ? "mb-10 max-h-80 opacity-100"
              : "mb-6 max-h-0 opacity-0 pointer-events-none"
          }`}
          aria-hidden={!showHero}
        >
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="text-gradient">{hero.title}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {hero.description}
          </p>
        </div>

        {hasAuditedOnce && phase === "input" ? (
          <p className="mb-4 text-center text-sm text-muted">
            Enter a URL to run another audit
          </p>
        ) : null}

        <AuditWorkspace phase={phase}>
          {phase === "input" ? (
            <MarketingAuditForm
              targetUrl={targetUrl}
              loading={false}
              onUrlChange={setTargetUrl}
              onSubmit={() => runAudit()}
            />
          ) : null}

          {phase === "running" ? (
            <MarketingAuditProgress
              activeStep={activeStep}
              targetUrl={targetUrl}
            />
          ) : null}

          {phase === "teaser" && report ? (
            <ReportScoreTeaser
              hostname={getHostname(report.targetUrl)}
              overallScore={report.audit.scores.overall}
            />
          ) : null}

          {phase === "report" && report ? (
            <MarketingAuditReport
              report={report}
              onNewAudit={(url) => runAudit(url)}
              animate
            />
          ) : null}

          {phase === "error" ? (
            <div className="px-5 py-8 sm:px-8 sm:py-10">
              <p
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
                role="alert"
              >
                {error}
              </p>
              <div className="mt-5">
                <MarketingAuditForm
                  targetUrl={targetUrl}
                  loading={false}
                  onUrlChange={setTargetUrl}
                  onSubmit={() => runAudit()}
                  compact
                />
              </div>
              <div className="mt-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-xs"
                  onClick={() => startNewAudit()}
                >
                  Clear and start over
                </Button>
              </div>
            </div>
          ) : null}
        </AuditWorkspace>
      </div>
    </Section>
  );
}
