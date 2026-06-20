"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, RefObject } from "react";
import { AiAgentHubIcon } from "@/components/use-cases/icons/AiAgentHubIcon";
import { GoogleSheetsIcon } from "@/components/use-cases/icons/GoogleSheetsIcon";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/use-cases/icons/SocialPlatformIcons";

type PlatformId = "linkedin" | "instagram" | "facebook" | "x";

type FlowDiagramContent = {
  agent: { title: string; subtitle: string; step: string; badge: string; subtitleHighlights?: readonly string[] };
  input: {
    step: string;
    title: string;
    body: string;
    flowLabel: string;
  };
  approval: {
    step: string;
    title: string;
    body: string;
    bodyHighlights?: readonly string[];
    flowLabel: string;
  };
  publishing: { step: string; title: string; body: string };
  platforms: readonly { id: PlatformId; name: string }[];
};

type WorkflowFlowChartProps = {
  diagram: FlowDiagramContent;
  compact?: boolean;
};

const platformIconMap: Record<
  PlatformId,
  ComponentType<{ className?: string; size?: number }>
> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  x: XIcon,
};

const PLATFORM_POSITIONS = [12.5, 37.5, 62.5, 87.5];

function HubSideConnections() {
  const agentY = 42;
  const leftX = 11;
  const agentLeft = 44;
  const agentRight = 56;
  const rightX = 89;

  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-0 h-[55%] w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={`M ${leftX} ${agentY} L ${agentLeft} ${agentY}`}
        fill="none"
        stroke="var(--border)"
        strokeWidth="0.5"
        strokeDasharray="2 2.5"
        strokeOpacity="0.9"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M ${leftX} ${agentY} L ${agentLeft} ${agentY}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.4"
        strokeDasharray="2 2.5"
        className="workflow-hub-dash"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M ${agentRight} ${agentY} L ${rightX} ${agentY}`}
        fill="none"
        stroke="var(--border)"
        strokeWidth="0.5"
        strokeDasharray="2 2.5"
        strokeOpacity="0.9"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M ${agentRight} ${agentY} L ${rightX} ${agentY}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.4"
        strokeDasharray="2 2.5"
        className="workflow-hub-dash workflow-hub-dash-delay"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function PublishingConnectors({
  activePlatformIndex,
  compact,
}: {
  activePlatformIndex: number | null;
  compact?: boolean;
}) {
  const busY = compact ? 16 : 28;
  const dropY = compact ? 26 : 40;

  return (
    <svg
      className={`pointer-events-none absolute inset-x-8 top-0 w-[calc(100%-4rem)] ${compact ? "h-6" : "h-10"}`}
      viewBox={`0 0 100 ${dropY}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <line
        x1="50"
        y1="0"
        x2="50"
        y2={busY}
        stroke="var(--accent)"
        strokeWidth="0.55"
        strokeDasharray="2.5 2.5"
        strokeOpacity="0.35"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="50"
        y1="0"
        x2="50"
        y2={busY}
        stroke="var(--accent)"
        strokeWidth="0.45"
        strokeDasharray="2.5 2.5"
        className="workflow-hub-dash"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={PLATFORM_POSITIONS[0]}
        y1={busY}
        x2={PLATFORM_POSITIONS[3]}
        y2={busY}
        stroke="var(--accent)"
        strokeWidth="0.55"
        strokeDasharray="2.5 2.5"
        strokeOpacity="0.35"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={PLATFORM_POSITIONS[0]}
        y1={busY}
        x2={PLATFORM_POSITIONS[3]}
        y2={busY}
        stroke="var(--accent)"
        strokeWidth="0.45"
        strokeDasharray="2.5 2.5"
        className="workflow-hub-dash"
        style={{ animationDelay: "0.3s" }}
        vectorEffect="non-scaling-stroke"
      />
      {PLATFORM_POSITIONS.map((x, i) => {
        const isPublishingPhase = activePlatformIndex !== null;
        const isActive = isPublishingPhase && activePlatformIndex === i;

        return (
          <g key={x}>
            <line
              x1={x}
              y1={busY}
              x2={x}
              y2={dropY}
              stroke="var(--accent)"
              strokeWidth={isActive ? "0.85" : "0.55"}
              strokeDasharray="2.5 2.5"
              strokeOpacity={
                isPublishingPhase ? (isActive ? 1 : 0.3) : 0.35
              }
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={x}
              y1={busY}
              x2={x}
              y2={dropY}
              stroke="var(--accent)"
              strokeWidth={isActive ? "0.7" : "0.45"}
              strokeDasharray="2.5 2.5"
              className={
                isActive || !isPublishingPhase ? "workflow-hub-dash" : undefined
              }
              style={{ animationDelay: `${0.45 + i * 0.15}s` }}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}

function SheetsInlineIcon({
  className = "",
  isActive = false,
}: {
  className?: string;
  isActive?: boolean;
}) {
  return (
    <span
      className={`inline-flex size-7 shrink-0 items-center justify-center rounded-md border transition-all duration-500 sm:size-8 ${
        isActive
          ? "border-accent bg-accent-muted ring-1 ring-accent/25"
          : "border-border bg-surface"
      } ${className}`}
    >
      <GoogleSheetsIcon className="size-4 sm:size-[1.125rem]" />
    </span>
  );
}

const STEP_PHASE_MS = 2200;
const TOTAL_PHASES = 7; // steps 1–3, then 4 platforms

function getPhaseState(phase: number) {
  if (phase <= 2) {
    return { activeStep: phase + 1, activePlatformIndex: null as number | null };
  }
  return { activeStep: 4, activePlatformIndex: phase - 3 };
}

const PANEL_DEFAULT = "border-border bg-surface shadow-sm";
const STEP_WRAP_ACTIVE =
  "rounded-2xl border-2 border-accent bg-surface shadow-lg ring-2 ring-accent/20";
const STEP_WRAP_DEFAULT =
  "rounded-2xl border-2 border-transparent bg-transparent shadow-sm ring-2 ring-transparent";

const PANEL_ACTIVE = STEP_WRAP_ACTIVE;
const AGENT_WRAP_ACTIVE = STEP_WRAP_ACTIVE;
const AGENT_WRAP_DEFAULT = STEP_WRAP_DEFAULT;

const PLATFORM_DEFAULT = "border-border bg-surface shadow-sm";
const PLATFORM_ACTIVE =
  "scale-110 !border-2 !border-accent !bg-surface shadow-md";

function platformHighlight(isActive: boolean, isPublishingPhase: boolean) {
  if (!isPublishingPhase) {
    return `${PLATFORM_DEFAULT} scale-100`;
  }

  return isActive ? PLATFORM_ACTIVE : `${PLATFORM_DEFAULT} scale-100`;
}

function panelHighlight(isActive: boolean) {
  return isActive ? PANEL_ACTIVE : PANEL_DEFAULT;
}

function activeLabelClasses(isActive: boolean) {
  return isActive ? "text-accent font-bold" : "text-muted";
}

function StepIndicator({
  activeStep,
  compact,
}: {
  activeStep: number;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex justify-center gap-2 ${compact ? "mb-2 mt-5" : "mb-0 mt-0"}`}
      aria-hidden
    >
      {[1, 2, 3, 4].map((step) => (
        <span
          key={step}
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-500 ${
            activeStep === step
              ? "bg-accent text-white shadow-md ring-2 ring-accent/30"
              : "border border-border bg-surface text-muted"
          }`}
        >
          Step {step}
        </span>
      ))}
    </div>
  );
}

function HighlightedText({
  text,
  highlights = [],
  isActive,
}: {
  text: string;
  highlights?: readonly string[];
  isActive: boolean;
}) {
  if (!highlights.length) {
    return <>{text}</>;
  }

  const pattern = new RegExp(
    `(${highlights.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) => {
        const isHighlight = highlights.some(
          (term) => term.toLowerCase() === part.toLowerCase(),
        );

        if (!isHighlight) {
          return part;
        }

        return (
          <span
            key={`${part}-${index}`}
            className={`font-semibold transition-all duration-500 ${
              isActive
                ? "rounded-sm bg-accent-muted px-0.5 text-accent"
                : "text-muted-strong"
            }`}
          >
            {part}
          </span>
        );
      })}
    </>
  );
}

function AgentCore({
  step,
  title,
  subtitle,
  subtitleHighlights,
  badge,
  isActive,
  compact,
}: FlowDiagramContent["agent"] & { isActive: boolean; compact?: boolean }) {
  return (
    <div
      className={`relative flex flex-col items-center text-center transition-all duration-700 ${compact ? "px-2 py-1" : "px-4 py-3"} ${isActive ? AGENT_WRAP_ACTIVE : AGENT_WRAP_DEFAULT}`}
    >
      <span
        className={`text-xs font-bold uppercase tracking-[0.18em] transition-all duration-500 ${activeLabelClasses(isActive)}`}
      >
        Step {step}
      </span>
      <div className={`relative ${compact ? "mt-2" : "mt-4"}`}>
        <div
          className={`pointer-events-none absolute -inset-3 rounded-full border-2 border-accent/40 ring-4 ring-accent/15 transition-all duration-700 ${
            isActive ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          aria-hidden
        />
        <div
          className={`relative flex items-center justify-center rounded-full border-2 bg-surface transition-all duration-700 ${
            compact
              ? "size-20 sm:size-24 md:size-28"
              : "size-28 sm:size-32 md:size-36"
          } ${
            isActive
              ? "border-accent shadow-lg ring-2 ring-accent/20"
              : "border-border shadow-sm ring-2 ring-transparent"
          }`}
        >
          <span className="absolute -top-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-strong sm:-top-2 sm:px-3">
            <span
              className={`size-1.5 shrink-0 rounded-full transition-colors duration-700 ${isActive ? "animate-pulse bg-brand-green" : "bg-muted"}`}
              aria-hidden
            />
            {badge}
          </span>
          <AiAgentHubIcon
            className={`transition-colors duration-700 ${
              compact
                ? "size-11 sm:size-12 md:size-14"
                : "size-16 sm:size-[4.5rem] md:size-20"
            } ${isActive ? "text-accent" : "text-muted"}`}
          />
        </div>
      </div>
      <h3
        className={`font-bold transition-colors duration-500 ${isActive ? "text-accent" : "text-foreground"} ${compact ? "mt-3 text-base sm:text-lg" : "mt-5 text-lg sm:text-xl"}`}
      >
        {title}
      </h3>
      <p
        className={`max-w-[15rem] leading-relaxed text-muted sm:max-w-xs ${compact ? "mt-1 text-[11px] sm:text-xs" : "mt-2 text-xs sm:text-sm"}`}
      >
        <HighlightedText
          text={subtitle}
          highlights={subtitleHighlights}
          isActive={isActive}
        />
      </p>
    </div>
  );
}

function SidePanel({
  step,
  sheetsAlign,
  title,
  body,
  bodyHighlights,
  flowLabel,
  isActive,
  panelRef,
  compact,
}: {
  step: string;
  sheetsAlign: "left" | "right";
  title: string;
  body: string;
  bodyHighlights?: readonly string[];
  flowLabel: string;
  isActive: boolean;
  panelRef?: RefObject<HTMLDivElement | null>;
  compact?: boolean;
}) {
  const alignClass =
    sheetsAlign === "left"
      ? "items-center text-center lg:items-end lg:text-right"
      : "items-center text-center lg:items-start lg:text-left";

  const flowRowClass =
    sheetsAlign === "left"
      ? "justify-center lg:justify-end"
      : "justify-center lg:justify-start";

  return (
    <div
      ref={panelRef}
      className={`flex w-full max-w-[17rem] flex-col rounded-2xl border transition-all duration-700 lg:w-[17rem] lg:max-w-none xl:w-[18rem] ${compact ? "p-4" : "p-5"} ${alignClass} ${isActive ? panelHighlight(true) : `card-elevated ${panelHighlight(false)}`}`}
    >
      <span
        className={`text-xs font-bold uppercase tracking-[0.18em] transition-all duration-500 ${activeLabelClasses(isActive)}`}
      >
        Step {step}
      </span>
      <div className={`flex items-start gap-2 ${compact ? "mt-2" : "mt-3"} ${flowRowClass}`}>
        <SheetsInlineIcon
          isActive={isActive}
          className={`transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-80"}`}
        />
        <p className={`text-[10px] font-bold uppercase leading-snug tracking-[0.14em] transition-colors duration-500 ${isActive ? "text-accent" : "text-muted"}`}>
          {flowLabel}
        </p>
      </div>
      <h3
        className={`font-semibold transition-colors duration-500 ${isActive ? "text-accent font-bold" : "text-foreground"} ${compact ? "mt-2 text-sm sm:text-base" : "mt-3 text-base sm:text-lg"}`}
      >
        {title}
      </h3>
      <p
        className={`leading-relaxed text-muted ${compact ? "mt-1.5 text-xs" : "mt-2 text-sm"}`}
      >
        <HighlightedText
          text={body}
          highlights={bodyHighlights}
          isActive={isActive}
        />
      </p>
    </div>
  );
}

function PlatformRow({
  platforms,
  activePlatformIndex,
  compact,
}: {
  platforms: FlowDiagramContent["platforms"];
  activePlatformIndex: number | null;
  compact?: boolean;
}) {
  return (
    <div className={`grid w-full grid-cols-4 ${compact ? "gap-1 sm:gap-2" : "gap-2 sm:gap-4"}`}>
      {platforms.map((platform, index) => {
        const Icon = platformIconMap[platform.id];
        const isPublishingPhase = activePlatformIndex !== null;
        const isActive =
          isPublishingPhase && activePlatformIndex === index;

        return (
          <div key={platform.id} className="flex flex-col items-center">
            <div
              className={`relative flex items-center justify-center rounded-full border bg-surface transition-all duration-500 ${
                compact ? "size-9 sm:size-10" : "size-12 sm:size-14"
              } ${platformHighlight(isActive, isPublishingPhase)}`}
            >
              <div
                className={`absolute inset-0 rounded-full border transition-opacity duration-500 ${isActive ? "border-accent/25" : "border-transparent"}`}
                aria-hidden
              />
              <Icon
                size={compact ? 18 : 22}
                className={
                  platform.id === "x" && !isActive
                    ? "text-foreground/60"
                    : platform.id === "x"
                      ? "text-foreground"
                      : undefined
                }
              />
            </div>
            <span
              className={`font-medium transition-colors duration-500 ${
                compact ? "mt-1 text-[9px] sm:text-[10px]" : "mt-2 text-[10px] sm:text-xs"
              } ${isActive ? "text-accent font-medium" : "text-muted"}`}
            >
              {platform.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PublishingPanel({
  publishing,
  platforms,
  isActive,
  activePlatformIndex,
  compact,
}: {
  publishing: FlowDiagramContent["publishing"];
  platforms: FlowDiagramContent["platforms"];
  isActive: boolean;
  activePlatformIndex: number | null;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto flex w-full max-w-2xl flex-col items-center xl:max-w-3xl ${compact ? "mt-1" : "mt-3"}`}
    >
      <div
        className={`w-px border-l border-dashed border-border ${compact ? "h-3" : "h-5"}`}
        aria-hidden
      />

      <div
        className={`relative w-full rounded-2xl border transition-all duration-700 ${isActive ? panelHighlight(true) : `card-elevated ${panelHighlight(false)}`} ${
          compact ? "px-4 pb-3 pt-5 sm:px-5" : "px-5 pb-5 pt-8 sm:px-8 sm:pb-6"
        }`}
      >
        <PublishingConnectors
          activePlatformIndex={activePlatformIndex}
          compact={compact}
        />

        <PlatformRow
          platforms={platforms}
          activePlatformIndex={activePlatformIndex}
          compact={compact}
        />

        <div className={`text-center ${compact ? "mt-2" : "mt-4"}`}>
          <p
            className={`text-xs font-bold uppercase tracking-[0.18em] transition-all duration-500 ${activeLabelClasses(isActive)}`}
          >
            Step {publishing.step}
          </p>
          <h3
            className={`font-semibold transition-colors duration-500 ${isActive ? "text-accent font-bold" : "text-foreground"} ${compact ? "mt-1 text-sm" : "mt-2 text-base sm:text-lg"}`}
          >
            {publishing.title}
          </h3>
          <p
            className={`mx-auto max-w-md leading-relaxed text-muted ${compact ? "mt-1 text-xs" : "mt-2 text-sm"}`}
          >
            {publishing.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function DesktopHub({
  diagram,
  activeStep,
  activePlatformIndex,
  compact,
}: {
  diagram: FlowDiagramContent;
  activeStep: number;
  activePlatformIndex: number | null;
  compact?: boolean;
}) {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftPanelRef.current;
    const right = rightPanelRef.current;
    if (!left || !right) return;

    const syncHeights = () => {
      left.style.minHeight = "";
      right.style.minHeight = "";
      const maxHeight = Math.max(left.offsetHeight, right.offsetHeight);
      left.style.minHeight = `${maxHeight}px`;
      right.style.minHeight = `${maxHeight}px`;
    };

    syncHeights();

    const observer = new ResizeObserver(syncHeights);
    observer.observe(left);
    observer.observe(right);
    window.addEventListener("resize", syncHeights);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeights);
    };
  }, [
    diagram.input.body,
    diagram.input.flowLabel,
    diagram.input.title,
    diagram.approval.body,
    diagram.approval.flowLabel,
    diagram.approval.title,
  ]);

  return (
    <div className="relative mx-auto hidden w-full max-w-6xl xl:max-w-7xl lg:block">
      <div className="relative px-2 xl:px-4">
        <HubSideConnections />

        <div
          className={`relative flex items-start justify-between gap-4 xl:gap-8 ${compact ? "pt-3" : "pt-8"}`}
        >
          <SidePanel
            panelRef={leftPanelRef}
            compact={compact}
            step={diagram.input.step}
            isActive={activeStep === 1}
            sheetsAlign="left"
            title={diagram.input.title}
            body={diagram.input.body}
            flowLabel={diagram.input.flowLabel}
          />

          <div className="flex shrink-0 justify-center px-2 py-2">
            <AgentCore {...diagram.agent} compact={compact} isActive={activeStep === 2} />
          </div>

          <SidePanel
            panelRef={rightPanelRef}
            compact={compact}
            step={diagram.approval.step}
            isActive={activeStep === 3}
            sheetsAlign="right"
            title={diagram.approval.title}
            body={diagram.approval.body}
            bodyHighlights={diagram.approval.bodyHighlights}
            flowLabel={diagram.approval.flowLabel}
          />
        </div>

        <PublishingPanel
          publishing={diagram.publishing}
          platforms={diagram.platforms}
          isActive={activeStep === 4}
          activePlatformIndex={activePlatformIndex}
          compact={compact}
        />
      </div>
    </div>
  );
}

function MobileHub({
  diagram,
  activeStep,
  activePlatformIndex,
  compact,
}: {
  diagram: FlowDiagramContent;
  activeStep: number;
  activePlatformIndex: number | null;
  compact?: boolean;
}) {
  return (
    <div className={`grid lg:hidden ${compact ? "gap-5" : "gap-8"}`}>
      <div className="mx-auto w-full max-w-sm">
        <SidePanel
          compact={compact}
          step={diagram.input.step}
          isActive={activeStep === 1}
          sheetsAlign="left"
          title={diagram.input.title}
          body={diagram.input.body}
          flowLabel={diagram.input.flowLabel}
        />
      </div>

      <AgentCore {...diagram.agent} compact={compact} isActive={activeStep === 2} />

      <div className="mx-auto w-full max-w-sm">
        <SidePanel
          compact={compact}
          step={diagram.approval.step}
          isActive={activeStep === 3}
          sheetsAlign="right"
          title={diagram.approval.title}
          body={diagram.approval.body}
          bodyHighlights={diagram.approval.bodyHighlights}
          flowLabel={diagram.approval.flowLabel}
        />
      </div>

      <PublishingPanel
        publishing={diagram.publishing}
        platforms={diagram.platforms}
        isActive={activeStep === 4}
        activePlatformIndex={activePlatformIndex}
        compact={compact}
      />
    </div>
  );
}

export function WorkflowFlowChart({ diagram, compact }: WorkflowFlowChartProps) {
  const [phase, setPhase] = useState(0);
  const { activeStep, activePlatformIndex } = getPhaseState(phase);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % TOTAL_PHASES);
    }, STEP_PHASE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <StepIndicator activeStep={activeStep} compact={compact} />
      <DesktopHub
        diagram={diagram}
        activeStep={activeStep}
        activePlatformIndex={activePlatformIndex}
        compact={compact}
      />
      <MobileHub
        diagram={diagram}
        activeStep={activeStep}
        activePlatformIndex={activePlatformIndex}
        compact={compact}
      />

      <div className="sr-only">
        <p>{diagram.input.flowLabel}</p>
        <p>{diagram.input.title}: {diagram.input.body}</p>
        <p>{diagram.agent.title}: {diagram.agent.subtitle}</p>
        <p>{diagram.approval.flowLabel}</p>
        <p>{diagram.approval.title}: {diagram.approval.body}</p>
        <p>{diagram.publishing.title}: {diagram.publishing.body}</p>
      </div>
    </div>
  );
}
