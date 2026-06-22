"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type ExecutiveSummaryLabelProps = {
  summary: string;
  className?: string;
};

type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";

export function ExecutiveSummaryLabel({ summary, className = "" }: ExecutiveSummaryLabelProps) {
  const t = useTranslations("aiNews");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  const [state, setState] = useState<PlayerState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const revokeBlob = useCallback(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      revokeBlob();
    };
  }, [revokeBlob]);

  function attachAudioListeners(audio: HTMLAudioElement) {
    audio.onended = () => setState("idle");
    audio.onerror = () => {
      setState("error");
      setErrorMessage(t("article.playbackFailed"));
    };
  }

  async function loadAndPlay() {
    setErrorMessage(null);
    setState("loading");

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? t("article.couldNotGenerateAudio"));
      }

      revokeBlob();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      const audio = audioRef.current ?? new Audio();
      audioRef.current = audio;
      audio.src = url;
      attachAudioListeners(audio);

      await audio.play();
      setState("playing");
    } catch (err) {
      setState("error");
      setErrorMessage(
        err instanceof Error ? err.message : t("article.couldNotPlaySummary"),
      );
    }
  }

  function handlePlayPause() {
    const audio = audioRef.current;

    if (state === "playing" && audio) {
      audio.pause();
      setState("paused");
      return;
    }

    if (state === "paused" && audio?.src) {
      void audio.play().then(() => setState("playing"));
      return;
    }

    void loadAndPlay();
  }

  const isLoading = state === "loading";
  const isPlaying = state === "playing";
  const isActive = isPlaying || state === "paused";

  const playLabel = isLoading
    ? t("article.generatingAudio")
    : isPlaying
      ? t("article.pauseSummary")
      : state === "paused"
        ? t("article.resumeSummary")
        : t("article.playSummary");

  const statusText =
    state === "error" && errorMessage
      ? errorMessage
      : isActive
        ? t("article.listening")
        : null;

  return (
    <aside
      className={`flex w-full items-center justify-between gap-2 rounded-full border py-1 pl-3 pr-1 shadow-sm backdrop-blur-sm transition-colors sm:w-auto sm:justify-start ${className} ${
        state === "error"
          ? "border-red-500/40 bg-surface/95"
          : isActive
            ? "border-accent/50 bg-accent-muted/95"
            : "border-accent/25 bg-surface/90"
      }`}
      aria-labelledby="exec-summary-label-title"
    >
      <div className="min-w-0 text-left leading-none">
        <p
          id="exec-summary-label-title"
          className="truncate text-xs font-semibold text-accent sm:hidden"
        >
          {t("article.executiveSummaryShort")}
        </p>
        <div className="hidden leading-tight sm:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
            {t("article.executiveSummaryDuration")}
          </p>
          <p className="text-[10px] text-muted">{t("article.executiveSummaryLabel")}</p>
        </div>
        {statusText ? (
          <p className="sr-only" role="status" aria-live="polite">
            {statusText}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={handlePlayPause}
        disabled={isLoading}
        aria-label={playLabel}
        title={state === "error" ? errorMessage ?? undefined : playLabel}
        aria-busy={isLoading}
        className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface disabled:opacity-70 disabled:hover:scale-100 sm:size-7 ${
          isPlaying ? "ring-2 ring-accent/40 ring-offset-1 ring-offset-surface" : ""
        }`}
      >
        {isLoading ? (
          <span
            className="size-3 animate-spin rounded-full border-2 border-muted/30 border-t-accent"
            aria-hidden
          />
        ) : isPlaying ? (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="ml-px" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </aside>
  );
}
