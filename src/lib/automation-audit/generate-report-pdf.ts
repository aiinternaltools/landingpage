import { jsPDF } from "jspdf";
import {
  AUTOMATION_AREAS,
  REPORT_CONSULTING_CTA,
  SCOPE_NOTE,
} from "@/lib/automation-audit/constants";
import type {
  AutomationAuditReport,
  AutomationScores,
  RecommendationImpact,
} from "@/lib/automation-audit/types";

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 14;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOTER_H = 12;

const COLORS = {
  text: [26, 27, 34] as [number, number, number],
  muted: [100, 104, 120] as [number, number, number],
  accent: [96, 165, 250] as [number, number, number],
  accentDark: [37, 99, 235] as [number, number, number],
  accentTint: [239, 246, 255] as [number, number, number],
  surface: [255, 255, 255] as [number, number, number],
  card: [250, 251, 253] as [number, number, number],
  band: [245, 247, 250] as [number, number, number],
  border: [226, 230, 237] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

const IMPACT_COLORS: Record<
  RecommendationImpact,
  { text: [number, number, number]; bg: [number, number, number] }
> = {
  High: { text: [190, 24, 38], bg: [254, 226, 226] },
  Medium: { text: [180, 83, 9], bg: [254, 243, 199] },
  Low: { text: [21, 128, 61], bg: [220, 252, 231] },
};

type LayoutCtx = {
  pdf: jsPDF;
  y: number;
  page: number;
  hostname: string;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = Number.parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function scoreRgb(score: number): [number, number, number] {
  if (score >= 75) return [16, 185, 129];
  if (score >= 50) return [245, 158, 11];
  return [244, 63, 94];
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function setTextColor(pdf: jsPDF, rgb: [number, number, number]) {
  pdf.setTextColor(rgb[0], rgb[1], rgb[2]);
}

function setFillColor(pdf: jsPDF, rgb: [number, number, number]) {
  pdf.setFillColor(rgb[0], rgb[1], rgb[2]);
}

function setDrawColor(pdf: jsPDF, rgb: [number, number, number]) {
  pdf.setDrawColor(rgb[0], rgb[1], rgb[2]);
}

function lineHeight(fontSize: number, factor = 1.45): number {
  return fontSize * factor * 0.352778;
}

function wrappedLines(
  pdf: jsPDF,
  text: string,
  maxWidth: number,
  fontSize: number
): string[] {
  pdf.setFontSize(fontSize);
  return pdf.splitTextToSize(text.trim() || "—", maxWidth);
}

function drawTopAccentBar(pdf: jsPDF) {
  setFillColor(pdf, COLORS.accent);
  pdf.rect(0, 0, PAGE_W, 5, "F");
}

function addFooter(ctx: LayoutCtx) {
  const { pdf, page, hostname } = ctx;
  setDrawColor(pdf, COLORS.border);
  pdf.setLineWidth(0.25);
  pdf.line(MARGIN, PAGE_H - FOOTER_H, PAGE_W - MARGIN, PAGE_H - FOOTER_H);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  setTextColor(pdf, COLORS.muted);
  pdf.text("Automation Audit Report", MARGIN, PAGE_H - 5.5);
  pdf.text(`${hostname} · Page ${page}`, PAGE_W - MARGIN, PAGE_H - 5.5, {
    align: "right",
  });
}

function newPage(ctx: LayoutCtx) {
  addFooter(ctx);
  ctx.pdf.addPage();
  ctx.page += 1;
  drawTopAccentBar(ctx.pdf);
  ctx.y = MARGIN + 2;
}

function ensureSpace(ctx: LayoutCtx, needed: number) {
  if (ctx.y + needed > PAGE_H - MARGIN - FOOTER_H) {
    newPage(ctx);
  }
}

function drawRoundedCard(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: [number, number, number] = COLORS.surface
) {
  setFillColor(pdf, fill);
  setDrawColor(pdf, COLORS.border);
  pdf.setLineWidth(0.35);
  pdf.roundedRect(x, y, w, h, 2.5, 2.5, "FD");
}

function addSectionHeader(ctx: LayoutCtx, index: number, title: string) {
  ensureSpace(ctx, 18);
  const { pdf } = ctx;
  setFillColor(pdf, COLORS.band);
  drawRoundedCard(pdf, MARGIN, ctx.y - 4, CONTENT_W, 12, COLORS.band);
  setFillColor(pdf, COLORS.accent);
  pdf.roundedRect(MARGIN, ctx.y - 4, 3, 12, 1, 1, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setTextColor(pdf, COLORS.accentDark);
  pdf.text(String(index).padStart(2, "0"), MARGIN + 6, ctx.y + 1);
  pdf.setFontSize(12);
  setTextColor(pdf, COLORS.text);
  pdf.text(title, MARGIN + 14, ctx.y + 1);
  ctx.y += 14;
}

function addParagraph(ctx: LayoutCtx, text: string, fontSize = 9.5) {
  const { pdf } = ctx;
  pdf.setFont("helvetica", "normal");
  setTextColor(pdf, COLORS.text);
  const lines = wrappedLines(pdf, text, CONTENT_W, fontSize);
  const lh = lineHeight(fontSize);
  ensureSpace(ctx, lines.length * lh + 2);
  for (const line of lines) {
    pdf.text(line, MARGIN, ctx.y);
    ctx.y += lh;
  }
  ctx.y += 3;
}

function addBullets(ctx: LayoutCtx, items: string[]) {
  for (const item of items) {
    const lines = wrappedLines(ctx.pdf, item, CONTENT_W - 8, 9);
    const lh = lineHeight(9);
    ensureSpace(ctx, lines.length * lh + 2);
    setFillColor(ctx.pdf, COLORS.accent);
    ctx.pdf.circle(MARGIN + 2, ctx.y - 1.2, 0.9, "F");
    for (const line of lines) {
      ctx.pdf.text(line, MARGIN + 6, ctx.y);
      ctx.y += lh;
    }
    ctx.y += 1.5;
  }
  ctx.y += 2;
}

function addScoreBars(ctx: LayoutCtx, scores: AutomationScores) {
  const rows = [
    ...AUTOMATION_AREAS.map((a) => ({
      label: a.shortLabel,
      score: scores[a.id],
      color: hexToRgb(a.color),
    })),
    { label: "Overall", score: scores.overall, color: COLORS.accent },
  ];
  const rowH = 9;
  const cardH = rows.length * rowH + 10;
  ensureSpace(ctx, cardH + 4);
  const cardY = ctx.y;
  drawRoundedCard(ctx.pdf, MARGIN, cardY, CONTENT_W, cardH, COLORS.surface);
  let rowY = cardY + 8;
  for (const row of rows) {
    ctx.pdf.setFont("helvetica", "normal");
    ctx.pdf.setFontSize(8.5);
    setTextColor(ctx.pdf, COLORS.text);
    ctx.pdf.text(row.label, MARGIN + 5, rowY);
    const barX = MARGIN + 28;
    const barMaxW = CONTENT_W - 48;
    setFillColor(ctx.pdf, COLORS.band);
    ctx.pdf.roundedRect(barX, rowY - 3, barMaxW, 4, 1, 1, "F");
    setFillColor(ctx.pdf, row.color);
    ctx.pdf.roundedRect(
      barX,
      rowY - 3,
      Math.max(2, (row.score / 100) * barMaxW),
      4,
      1,
      1,
      "F"
    );
    ctx.pdf.setFont("helvetica", "bold");
    setTextColor(ctx.pdf, scoreRgb(row.score));
    ctx.pdf.text(String(row.score), MARGIN + CONTENT_W - 6, rowY, {
      align: "right",
    });
    rowY += rowH;
  }
  ctx.y = cardY + cardH + 6;
}

function addCover(ctx: LayoutCtx, report: AutomationAuditReport) {
  const { pdf } = ctx;
  const overall = report.audit.scores.overall;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setTextColor(pdf, COLORS.accentDark);
  pdf.text("SCAN COMPLETE", MARGIN, ctx.y);
  ctx.y += 6;
  pdf.setFontSize(18);
  setTextColor(pdf, COLORS.text);
  pdf.text("Automation Opportunity Report", MARGIN, ctx.y);
  ctx.y += 9;
  pdf.setFontSize(13);
  setTextColor(pdf, COLORS.accentDark);
  pdf.text(ctx.hostname, MARGIN, ctx.y);
  ctx.y += 7;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  setTextColor(pdf, COLORS.muted);
  pdf.text(report.targetUrl, MARGIN, ctx.y);
  ctx.y += 5;
  pdf.text(report.audit.businessSnapshot.businessType, MARGIN, ctx.y);
  ctx.y += 5;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  setTextColor(pdf, scoreRgb(overall));
  pdf.text(`${overall}/100`, MARGIN, ctx.y + 8);
  pdf.setFontSize(8);
  setTextColor(pdf, COLORS.muted);
  pdf.text("automation readiness", MARGIN, ctx.y + 14);
  ctx.y += 22;
  if (report.detectedTools.length > 0) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    setTextColor(pdf, COLORS.muted);
    pdf.text("DETECTED ON SITE", MARGIN, ctx.y);
    ctx.y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    setTextColor(pdf, COLORS.text);
    const tools = report.detectedTools.map((t) => t.name).join(" · ");
    for (const line of wrappedLines(pdf, tools, CONTENT_W, 8)) {
      pdf.text(line, MARGIN, ctx.y);
      ctx.y += lineHeight(8);
    }
    ctx.y += 4;
  }
  newPage(ctx);
}

export function buildReportPdf(report: AutomationAuditReport): jsPDF {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  drawTopAccentBar(pdf);
  const ctx: LayoutCtx = {
    pdf,
    y: MARGIN + 2,
    page: 1,
    hostname: getHostname(report.targetUrl),
  };

  addCover(ctx, report);

  addSectionHeader(ctx, 1, "Executive Summary");
  addParagraph(ctx, report.executive.executiveSummary);
  ctx.y += 6;

  addSectionHeader(ctx, 2, "Business Summary");
  addParagraph(
    ctx,
    `Type: ${report.audit.businessSnapshot.businessType}\nAudience: ${report.audit.businessSnapshot.audience}\nOffer: ${report.audit.businessSnapshot.offerSummary}`
  );
  ctx.y += 4;

  addSectionHeader(ctx, 3, "Automation Readiness");
  addScoreBars(ctx, report.audit.scores);

  addSectionHeader(ctx, 4, "What We Found on Your Website");
  if (report.detectedTools.length > 0) {
    addParagraph(
      ctx,
      "Tools probably in your stack — automations below focus on saving time and money.",
      8.5
    );
    for (const tool of report.detectedTools) {
      ensureSpace(ctx, 28);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      setTextColor(pdf, COLORS.text);
      pdf.text(`${tool.name} (${tool.confidence} confidence)`, MARGIN, ctx.y);
      ctx.y += 5;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      setTextColor(pdf, COLORS.accentDark);
      pdf.text("Automate:", MARGIN + 2, ctx.y);
      ctx.y += 4;
      addParagraph(ctx, tool.automationSuggestion, 8.5);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      setTextColor(pdf, [16, 120, 80]);
      pdf.text("Saves:", MARGIN + 2, ctx.y);
      ctx.y += 4;
      addParagraph(ctx, tool.savingsNote, 8.5);
      ctx.y += 2;
    }
  } else {
    addParagraph(ctx, "No tool signals on public pages.", 8.5);
  }
  ctx.y += 4;

  addSectionHeader(ctx, 5, "Workflow Findings");
  for (const area of AUTOMATION_AREAS) {
    const assessment = report.audit.areaAssessments[area.id];
    ensureSpace(ctx, 28);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    setTextColor(pdf, COLORS.text);
    pdf.text(
      `${area.label} · ${report.audit.scores[area.id]}/100`,
      MARGIN,
      ctx.y
    );
    ctx.y += 5;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    setTextColor(pdf, COLORS.accentDark);
    pdf.text("Why this score:", MARGIN + 2, ctx.y);
    ctx.y += 4;
    addParagraph(ctx, assessment.scoreRationale, 8.5);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    setTextColor(pdf, COLORS.muted);
    pdf.text("Evidence from your site:", MARGIN + 2, ctx.y);
    ctx.y += 4;
    addBullets(
      ctx,
      assessment.evidence.length > 0
        ? assessment.evidence
        : ["No specific signals found on the audited pages for this area."]
    );
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    setTextColor(pdf, [16, 120, 80]);
    pdf.text("How to improve:", MARGIN + 2, ctx.y);
    ctx.y += 4;
    addBullets(ctx, assessment.improvements);
    ctx.y += 2;
  }

  addSectionHeader(ctx, 6, "Workflow Recommendations");
  addParagraph(ctx, SCOPE_NOTE, 8);
  ctx.y += 2;
  for (const wf of report.audit.workflowOpportunities) {
    ensureSpace(ctx, 12);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    setTextColor(pdf, COLORS.text);
    pdf.text(`${wf.title} [${wf.impact}]`, MARGIN, ctx.y);
    ctx.y += 4;
    addParagraph(ctx, wf.description, 8.5);
  }
  for (const rec of report.audit.toolRecommendations) {
    ensureSpace(ctx, 12);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    setTextColor(pdf, COLORS.text);
    pdf.text(`${rec.toolName} [${rec.impact}]`, MARGIN, ctx.y);
    ctx.y += 4;
    addParagraph(ctx, `${rec.purpose}. ${rec.rationale}`, 8.5);
    if (rec.connectionHint) {
      pdf.setFontSize(7.5);
      setTextColor(pdf, COLORS.accentDark);
      pdf.text(rec.connectionHint, MARGIN, ctx.y);
      ctx.y += 5;
    }
  }

  addSectionHeader(ctx, 7, "Quick Wins");
  addBullets(
    ctx,
    report.audit.quickWins.length > 0
      ? report.audit.quickWins
      : ["No quick wins identified."]
  );

  addSectionHeader(ctx, 8, "Prioritized Actions");
  for (const rec of report.executive.prioritizedRecommendations) {
    ensureSpace(ctx, 8);
    const colors = IMPACT_COLORS[rec.impact];
    setFillColor(pdf, colors.bg);
    pdf.roundedRect(MARGIN, ctx.y - 3, 14, 4, 1, 1, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6.5);
    setTextColor(pdf, colors.text);
    pdf.text(rec.impact[0], MARGIN + 4.5, ctx.y);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    setTextColor(pdf, COLORS.text);
    for (const line of wrappedLines(pdf, rec.nextStep, CONTENT_W - 20, 9)) {
      pdf.text(line, MARGIN + 18, ctx.y);
      ctx.y += lineHeight(9);
    }
    ctx.y += 2;
  }

  ctx.y += 4;

  ensureSpace(ctx, 40);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  setTextColor(pdf, COLORS.muted);
  for (const line of wrappedLines(pdf, report.scopeNote, CONTENT_W, 8)) {
    pdf.text(line, MARGIN, ctx.y);
    ctx.y += lineHeight(8);
  }
  ctx.y += 4;

  ensureSpace(ctx, 36);
  setFillColor(pdf, COLORS.accentTint);
  setDrawColor(pdf, COLORS.accent);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(MARGIN, ctx.y - 2, CONTENT_W, 32, 2, 2, "FD");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  setTextColor(pdf, COLORS.text);
  pdf.text(REPORT_CONSULTING_CTA.title, MARGIN + 4, ctx.y + 4);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  setTextColor(pdf, COLORS.muted);
  let ctaY = ctx.y + 10;
  for (const line of wrappedLines(pdf, REPORT_CONSULTING_CTA.description, CONTENT_W - 8, 8.5)) {
    pdf.text(line, MARGIN + 4, ctaY);
    ctaY += lineHeight(8.5);
  }
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8.5);
  setTextColor(pdf, COLORS.accentDark);
  pdf.textWithLink(
    `${REPORT_CONSULTING_CTA.buttonLabel} →`,
    MARGIN + 4,
    ctaY + 4,
    { url: REPORT_CONSULTING_CTA.pdfHref }
  );
  ctx.y = ctaY + 14;

  addFooter(ctx);
  return pdf;
}

export function saveReportPdf(report: AutomationAuditReport): void {
  const pdf = buildReportPdf(report);
  const hostname = getHostname(report.targetUrl);
  const date = new Date().toISOString().slice(0, 10);
  pdf.save(
    `automation-audit-${hostname.replace(/[^a-z0-9.-]/gi, "-").toLowerCase()}-${date}.pdf`
  );
}
