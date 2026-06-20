"use client";

import type { ReactNode } from "react";

type AuditPhase = "input" | "running" | "teaser" | "report" | "error";

type AuditWorkspaceProps = {
  phase: AuditPhase;
  children: ReactNode;
};

const phaseWidth: Record<AuditPhase, string> = {
  input: "max-w-xl",
  running: "max-w-2xl",
  teaser: "max-w-2xl",
  report: "max-w-6xl",
  error: "max-w-xl",
};

export function AuditWorkspace({ phase, children }: AuditWorkspaceProps) {
  return (
    <div
      className={`audit-workspace mx-auto w-full transition-[max-width] duration-500 ease-out ${phaseWidth[phase]}`}
    >
      <div className="card-elevated overflow-hidden rounded-2xl transition-shadow duration-500">
        {children}
      </div>
    </div>
  );
}
