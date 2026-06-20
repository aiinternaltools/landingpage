import { jsPDF } from "jspdf";
import { AUDIT_AREAS } from "@/lib/marketing-audit/constants";
import type {
  AuditScores,
  MarketingAuditReport,
  RecommendationImpact,
} from "@/lib/marketing-audit/types";

/** A4 portrait (mm) */
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

function sanitizeFilename(hostname: string): string {
  return hostname.replace(/[^a-z0-9.-]/gi, "-").toLowerCase();
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

function drawFooterRule(ctx: LayoutCtx) {
  const { pdf } = ctx;
  setDrawColor(pdf, COLORS.border);
  pdf.setLineWidth(0.25);
  pdf.line(MARGIN, PAGE_H - FOOTER_H, PAGE_W - MARGIN, PAGE_H - FOOTER_H);
}

function addFooter(ctx: LayoutCtx) {
  const { pdf, page, hostname } = ctx;
  drawFooterRule(ctx);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  setTextColor(pdf, COLORS.muted);
  pdf.text("Marketing Audit Report", MARGIN, PAGE_H - 5.5);
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
  fill: [number, number, number] = COLORS.surface,
  border = true
) {
  setFillColor(pdf, fill);
  pdf.roundedRect(x, y, w, h, 2.5, 2.5, border ? "FD" : "F");
  if (border) {
    setDrawColor(pdf, COLORS.border);
    pdf.setLineWidth(0.35);
  }
}

function drawScoreRing(
  pdf: jsPDF,
  cx: number,
  cy: number,
  radius: number,
  score: number
) {
  const tone = scoreRgb(score);

  setFillColor(pdf, COLORS.accentTint);
  setDrawColor(pdf, COLORS.accent);
  pdf.setLineWidth(1.2);
  pdf.circle(cx, cy, radius, "FD");

  setDrawColor(pdf, tone);
  pdf.setLineWidth(2.2);
  pdf.circle(cx, cy, radius - 1.5, "S");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  setTextColor(pdf, tone);
  pdf.text(String(score), cx, cy + 2.5, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  setTextColor(pdf, COLORS.muted);
  pdf.text("/ 100", cx, cy + 9, { align: "center" });
}

function drawScorePill(
  pdf: jsPDF,
  x: number,
  y: number,
  score: number,
  align: "left" | "right" = "left"
) {
  const tone = scoreRgb(score);
  const label = String(score);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  const pillW = 14;
  const pillH = 6;
  const pillX = align === "right" ? x - pillW : x;

  setFillColor(pdf, [
    Math.min(255, tone[0] + 180),
    Math.min(255, tone[1] + 180),
    Math.min(255, tone[2] + 180),
  ]);
  setDrawColor(pdf, tone);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(pillX, y - 4.5, pillW, pillH, 2, 2, "FD");

  setTextColor(pdf, tone);
  pdf.text(label, pillX + pillW / 2, y, { align: "center" });
}

function drawImpactPill(
  pdf: jsPDF,
  x: number,
  y: number,
  impact: RecommendationImpact
) {
  const { text, bg } = IMPACT_COLORS[impact];
  const label = impact.toUpperCase();
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(6.5);
  const pillW = 16;
  const pillH = 5;

  setFillColor(pdf, bg);
  setDrawColor(pdf, text);
  pdf.setLineWidth(0.25);
  pdf.roundedRect(x, y - 3.5, pillW, pillH, 1.5, 1.5, "FD");

  setTextColor(pdf, text);
  pdf.text(label, x + pillW / 2, y, { align: "center" });
}

function addParagraph(
  ctx: LayoutCtx,
  text: string,
  fontSize = 10,
  color: [number, number, number] = COLORS.text,
  maxWidth = CONTENT_W
) {
  const { pdf } = ctx;
  pdf.setFont("helvetica", "normal");
  setTextColor(pdf, color);
  const lines = wrappedLines(pdf, text, maxWidth, fontSize);
  const lh = lineHeight(fontSize);
  ensureSpace(ctx, lines.length * lh + 2);
  for (const line of lines) {
    pdf.text(line, MARGIN, ctx.y);
    ctx.y += lh;
  }
  ctx.y += 2;
}

function addSectionHeader(
  ctx: LayoutCtx,
  index: number,
  title: string,
  description?: string
) {
  ensureSpace(ctx, description ? 28 : 20);
  const { pdf } = ctx;
  const barH = description ? 22 : 14;

  setFillColor(pdf, COLORS.band);
  drawRoundedCard(pdf, MARGIN, ctx.y - 4, CONTENT_W, barH, COLORS.band, false);

  setFillColor(pdf, COLORS.accent);
  pdf.roundedRect(MARGIN, ctx.y - 4, 3, barH, 1, 1, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setTextColor(pdf, COLORS.accentDark);
  pdf.text(String(index).padStart(2, "0"), MARGIN + 6, ctx.y + 1);

  pdf.setFontSize(13);
  setTextColor(pdf, COLORS.text);
  pdf.text(title, MARGIN + 14, ctx.y + 1);

  ctx.y += description ? 9 : 7;

  if (description) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    setTextColor(pdf, COLORS.muted);
    const descLines = wrappedLines(pdf, description, CONTENT_W - 16, 9);
    for (const line of descLines) {
      pdf.text(line, MARGIN + 14, ctx.y);
      ctx.y += lineHeight(9);
    }
  }

  ctx.y += 8;
}

const COVER_PANEL_TITLE_TOP = 3;
const COVER_PANEL_TITLE_BODY = 11;
const COVER_PANEL_TITLE_GAP = 7;
const COVER_PANEL_HEADER_H =
  COVER_PANEL_TITLE_TOP + COVER_PANEL_TITLE_BODY + COVER_PANEL_TITLE_GAP;

function drawCoverPanelTitle(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  title: string
) {
  setFillColor(pdf, COLORS.accent);
  pdf.roundedRect(x + 4, y, 2, 9, 0.5, 0.5, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  setTextColor(pdf, COLORS.text);
  pdf.text(title, x + 9, y + 6.5);

  setDrawColor(pdf, COLORS.border);
  pdf.setLineWidth(0.2);
  pdf.line(x + 4, y + 10.5, x + w - 4, y + 10.5);
}

function addCoverMiniLabel(ctx: LayoutCtx, label: string) {
  const { pdf } = ctx;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setTextColor(pdf, COLORS.accentDark);
  pdf.text(label, MARGIN, ctx.y);
  ctx.y += 4;
}

function getScoreInsights(scores: AuditScores) {
  const ranked = AUDIT_AREAS.map((area) => ({
    label: area.shortLabel,
    score: scores[area.id],
  })).sort((a, b) => b.score - a.score);

  return {
    strongest: ranked[0],
    weakest: ranked[ranked.length - 1],
  };
}

function measureCoverScorePanelHeight(): number {
  return COVER_PANEL_HEADER_H + AUDIT_AREAS.length * 8 + 8;
}

function measureCoverQuickWinsPanelHeight(
  pdf: jsPDF,
  w: number,
  items: string[],
  maxItems = 3
): number {
  const list =
    items.length > 0
      ? items.slice(0, maxItems)
      : ["No quick wins identified."];
  const innerW = w - 14;
  const fontSize = 8.5;
  const lh = lineHeight(fontSize);
  let bodyH = 4;

  for (const item of list) {
    const lines = wrappedLines(pdf, item, innerW, fontSize);
    bodyH += lines.length * lh + 3;
  }

  return COVER_PANEL_HEADER_H + bodyH + 2;
}

function drawCoverSummaryCard(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  summary: string,
  maxLines = 6
): number {
  const padding = 4;
  const innerW = w - padding * 2;
  const fontSize = 9.5;
  const lh = lineHeight(fontSize);
  const allLines = wrappedLines(pdf, summary || "—", innerW, fontSize);
  const lines = allLines.slice(0, maxLines);
  const truncated = allLines.length > maxLines;
  const cardH = lines.length * lh + padding * 2 + (truncated ? 4 : 0) + 2;

  drawRoundedCard(pdf, x, y, w, cardH, COLORS.accentTint);

  pdf.setFont("helvetica", "normal");
  setTextColor(pdf, COLORS.text);
  let textY = y + padding + 3;
  for (const line of lines) {
    pdf.text(line, x + padding, textY);
    textY += lh;
  }

  if (truncated) {
    pdf.setFontSize(7.5);
    setTextColor(pdf, COLORS.muted);
    pdf.text("Full summary on page 2 →", x + padding, textY + 1);
  }

  return y + cardH;
}

function drawCoverScorePanel(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  scores: AuditScores,
  cardH: number
): number {
  const rows = AUDIT_AREAS.map((a) => ({
    label: a.shortLabel,
    score: scores[a.id],
    color: hexToRgb(a.color),
  }));
  const rowH = 8;
  const barH = 3.5;
  const labelW = 24;

  drawRoundedCard(pdf, x, y, w, cardH, COLORS.surface);
  drawCoverPanelTitle(pdf, x, y + COVER_PANEL_TITLE_TOP, w, "Score breakdown");

  let rowY = y + COVER_PANEL_HEADER_H;
  const barMaxW = w - labelW - 14;

  for (const row of rows) {
    setFillColor(pdf, row.color);
    pdf.circle(x + 5, rowY - 1, 1.4, "F");

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    setTextColor(pdf, COLORS.text);
    pdf.text(row.label, x + 8, rowY);

    const barX = x + labelW;
    setFillColor(pdf, COLORS.band);
    pdf.roundedRect(barX, rowY - 2.8, barMaxW, barH, 1, 1, "F");

    const fillW = Math.max(1.5, (row.score / 100) * barMaxW);
    setFillColor(pdf, row.color);
    pdf.roundedRect(barX, rowY - 2.8, fillW, barH, 1, 1, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    setTextColor(pdf, scoreRgb(row.score));
    pdf.text(String(row.score), x + w - 4, rowY, { align: "right" });

    rowY += rowH;
  }

  return y + cardH;
}

function drawCoverQuickWinsPanel(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  items: string[],
  cardH: number,
  maxItems = 3
): number {
  const list =
    items.length > 0
      ? items.slice(0, maxItems)
      : ["No quick wins identified."];
  const innerW = w - 14;
  const fontSize = 8.5;
  const lh = lineHeight(fontSize);

  const lineGroups = list.map((item) =>
    wrappedLines(pdf, item, innerW, fontSize)
  );

  drawRoundedCard(pdf, x, y, w, cardH, COLORS.surface);
  drawCoverPanelTitle(pdf, x, y + COVER_PANEL_TITLE_TOP, w, "Quick wins");

  let itemY = y + COVER_PANEL_HEADER_H;
  list.forEach((item, index) => {
    const lines = lineGroups[index];

    setFillColor(pdf, COLORS.accent);
    pdf.circle(x + 6, itemY + 1, 3, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    setTextColor(pdf, COLORS.white);
    pdf.text(String(index + 1), x + 6, itemY + 2.2, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(fontSize);
    setTextColor(pdf, COLORS.text);
    for (const line of lines) {
      pdf.text(line, x + 12, itemY);
      itemY += lh;
    }
    itemY += 2;
  });

  return y + cardH;
}

function drawCoverPriorityPanel(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  recommendations: MarketingAuditReport["executive"]["prioritizedRecommendations"]
): number {
  const highs = recommendations.filter((r) => r.impact === "High");
  const items =
    highs.length > 0
      ? highs.slice(0, 3)
      : recommendations.slice(0, 3);

  const innerW = w - 22;
  const fontSize = 8.5;
  const lh = lineHeight(fontSize);
  const headerH = 9;

  if (items.length === 0) {
    const cardH = headerH + 12;
    drawRoundedCard(pdf, x, y, w, cardH, COLORS.surface);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    setTextColor(pdf, COLORS.text);
    pdf.text("Priority actions", x + 4, y + 6);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(fontSize);
    setTextColor(pdf, COLORS.muted);
    pdf.text("No recommendations generated.", x + 4, y + headerH + 4);
    return y + cardH;
  }

  let bodyH = 4;
  const lineGroups: string[][] = [];
  for (const item of items) {
    const lines = wrappedLines(pdf, item.nextStep, innerW, fontSize);
    lineGroups.push(lines);
    bodyH += lines.length * lh + 3;
  }

  const cardH = headerH + bodyH;
  drawRoundedCard(pdf, x, y, w, cardH, COLORS.surface);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setTextColor(pdf, COLORS.text);
  pdf.text("Priority actions", x + 4, y + 6);

  let itemY = y + headerH;
  items.forEach((item, index) => {
    const lines = lineGroups[index];
    drawImpactPill(pdf, x + 4, itemY + 1, item.impact);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(fontSize);
    setTextColor(pdf, COLORS.text);
    for (const line of lines) {
      pdf.text(line, x + 22, itemY);
      itemY += lh;
    }

    if (index < items.length - 1) {
      itemY += 2;
      setDrawColor(pdf, COLORS.border);
      pdf.setLineWidth(0.15);
      pdf.line(x + 4, itemY, x + w - 4, itemY);
      itemY += 3;
    } else {
      itemY += 2;
    }
  });

  return y + cardH;
}

function addCover(ctx: LayoutCtx, report: MarketingAuditReport) {
  const { pdf } = ctx;
  const overall = report.audit.scores.overall;
  const cardH = 64;
  const cardY = ctx.y;

  drawRoundedCard(pdf, MARGIN, cardY, CONTENT_W, cardH, COLORS.surface);

  const textX = MARGIN + 6;
  let innerY = cardY + 9;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setTextColor(pdf, COLORS.accentDark);
  pdf.text("AUDIT COMPLETE", textX, innerY);
  innerY += 5;

  pdf.setFontSize(17);
  setTextColor(pdf, COLORS.text);
  pdf.text("Marketing Audit Report", textX, innerY);
  innerY += 8;

  pdf.setFontSize(13);
  setTextColor(pdf, COLORS.accentDark);
  pdf.text(ctx.hostname, textX, innerY);
  innerY += 6;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  setTextColor(pdf, COLORS.muted);
  const urlLines = wrappedLines(pdf, report.targetUrl, CONTENT_W - 54, 8);
  for (const line of urlLines.slice(0, 1)) {
    pdf.text(line, textX, innerY);
    innerY += lineHeight(8);
  }

  const meta = [
    `Generated ${new Date(report.generatedAt).toLocaleString()}`,
    `${report.discovery.pagesSelected} of ${report.discovery.totalDiscovered} pages · ${report.discovery.method.replace("+", " + ")}`,
  ];
  pdf.setFontSize(7.5);
  for (const line of meta) {
    pdf.text(line, textX, innerY);
    innerY += 4;
  }

  const ringCx = MARGIN + CONTENT_W - 20;
  const ringCy = cardY + cardH / 2 - 1;
  drawScoreRing(pdf, ringCx, ringCy, 16, overall);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(6.5);
  setTextColor(pdf, COLORS.muted);
  pdf.text("OVERALL SCORE", ringCx, cardY + cardH - 6, { align: "center" });

  ctx.y = cardY + cardH + 7;

  const chips = AUDIT_AREAS.map((area) => ({
    label: area.shortLabel,
    score: report.audit.scores[area.id],
    color: hexToRgb(area.color),
  }));

  const chipW = (CONTENT_W - 8) / chips.length;
  const chipH = 12;
  const chipY = ctx.y;

  const topScore = Math.max(...chips.map((chip) => chip.score));

  chips.forEach((chip, i) => {
    const x = MARGIN + i * (chipW + 2);
    const isTop = chip.score === topScore;

    drawRoundedCard(pdf, x, chipY, chipW, chipH, COLORS.card);
    if (isTop) {
      setDrawColor(pdf, COLORS.accent);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(x, chipY, chipW, chipH, 2.5, 2.5, "S");
    }

    setFillColor(pdf, chip.color);
    pdf.circle(x + 4.5, chipY + 4.5, 1.3, "F");

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    setTextColor(pdf, COLORS.muted);
    pdf.text(chip.label, x + 7.5, chipY + 4.8);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    setTextColor(pdf, scoreRgb(chip.score));
    pdf.text(String(chip.score), x + chipW - 3.5, chipY + 8, { align: "right" });
  });

  ctx.y = chipY + chipH + 5;

  const insights = getScoreInsights(report.audit.scores);
  setFillColor(pdf, COLORS.band);
  pdf.roundedRect(MARGIN, ctx.y - 3, CONTENT_W, 8, 1.5, 1.5, "F");
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  setTextColor(pdf, COLORS.muted);
  pdf.text(
    `Strongest: ${insights.strongest.label} (${insights.strongest.score})`,
    MARGIN + 4,
    ctx.y + 1.5
  );
  pdf.text(
    `Needs work: ${insights.weakest.label} (${insights.weakest.score})`,
    MARGIN + CONTENT_W / 2 + 2,
    ctx.y + 1.5
  );

  ctx.y += 9;
  addCoverMiniLabel(ctx, "AT A GLANCE");

  const summaryEndY = drawCoverSummaryCard(
    pdf,
    MARGIN,
    ctx.y,
    CONTENT_W,
    report.executive.executiveSummary,
    5
  );
  ctx.y = summaryEndY + 5;

  const colGap = 7;
  const colW = (CONTENT_W - colGap) / 2;
  const colLeft = MARGIN;
  const colRight = MARGIN + colW + colGap;
  const twoColY = ctx.y;
  const twoColH = Math.max(
    measureCoverScorePanelHeight(),
    measureCoverQuickWinsPanelHeight(pdf, colW, report.audit.quickWins, 3)
  );

  drawCoverScorePanel(
    pdf,
    colLeft,
    twoColY,
    colW,
    report.audit.scores,
    twoColH
  );
  drawCoverQuickWinsPanel(
    pdf,
    colRight,
    twoColY,
    colW,
    report.audit.quickWins,
    twoColH,
    3
  );

  ctx.y = twoColY + twoColH + 5;

  const priorityEndY = drawCoverPriorityPanel(
    pdf,
    MARGIN,
    ctx.y,
    CONTENT_W,
    report.executive.prioritizedRecommendations
  );
  ctx.y = priorityEndY + 5;

  newPage(ctx);
}

function addExecutiveSummaryCard(ctx: LayoutCtx, summary: string) {
  const { pdf } = ctx;
  const padding = 5;
  const innerW = CONTENT_W - padding * 2;
  const lines = wrappedLines(pdf, summary || "—", innerW, 10.5);
  const lh = lineHeight(10.5);
  const cardH = lines.length * lh + padding * 2 + 2;

  ensureSpace(ctx, cardH + 4);
  const cardY = ctx.y;

  drawRoundedCard(pdf, MARGIN, cardY, CONTENT_W, cardH, COLORS.accentTint);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10.5);
  setTextColor(pdf, COLORS.text);
  let textY = cardY + padding + 4;
  for (const line of lines) {
    pdf.text(line, MARGIN + padding, textY);
    textY += lh;
  }

  ctx.y = cardY + cardH + 6;
}

function addScoreBars(ctx: LayoutCtx, scores: AuditScores) {
  const { pdf } = ctx;
  const rows = [
    ...AUDIT_AREAS.map((a) => ({
      label: a.label,
      score: scores[a.id],
      color: hexToRgb(a.color),
    })),
    { label: "Overall", score: scores.overall, color: COLORS.accent },
  ];

  const rowH = 11;
  const barMaxW = CONTENT_W - 68;
  const barH = 5;
  const cardH = rows.length * rowH + 10;
  const cardY = ctx.y;

  ensureSpace(ctx, cardH + 4);
  drawRoundedCard(pdf, MARGIN, cardY, CONTENT_W, cardH, COLORS.surface);

  let rowY = cardY + 8;
  for (const row of rows) {
    setFillColor(pdf, row.color);
    pdf.circle(MARGIN + 6, rowY - 1, 1.8, "F");

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    setTextColor(pdf, COLORS.text);
    pdf.text(row.label, MARGIN + 10, rowY);

    const barX = MARGIN + 58;
    setFillColor(pdf, COLORS.band);
    pdf.roundedRect(barX, rowY - 3.5, barMaxW, barH, 1.5, 1.5, "F");

    const fillW = Math.max(2, (row.score / 100) * barMaxW);
    setFillColor(pdf, row.color);
    pdf.roundedRect(barX, rowY - 3.5, fillW, barH, 1.5, 1.5, "F");

    drawScorePill(pdf, MARGIN + CONTENT_W - 6, rowY, row.score, "right");

    rowY += rowH;
  }

  ctx.y = cardY + cardH + 6;
}

function addBullets(
  ctx: LayoutCtx,
  items: string[],
  fontSize = 9,
  indent = 6,
  maxWidth = CONTENT_W - 10
) {
  const { pdf } = ctx;
  pdf.setFont("helvetica", "normal");
  setTextColor(pdf, COLORS.text);

  for (const item of items) {
    const lines = wrappedLines(pdf, item, maxWidth, fontSize);
    const lh = lineHeight(fontSize);
    ensureSpace(ctx, lines.length * lh + 2);

    setFillColor(pdf, COLORS.accent);
    pdf.circle(MARGIN + indent - 2, ctx.y - 1.2, 0.9, "F");

    for (let i = 0; i < lines.length; i++) {
      pdf.text(lines[i], MARGIN + indent + 2, ctx.y);
      ctx.y += lh;
    }
    ctx.y += 1.5;
  }
  ctx.y += 2;
}

function addFindingsArea(
  ctx: LayoutCtx,
  label: string,
  description: string,
  score: number,
  color: [number, number, number],
  findings: string[]
) {
  ensureSpace(ctx, 24);
  const { pdf } = ctx;
  const startY = ctx.y;
  const headerH = 12;

  drawRoundedCard(pdf, MARGIN, startY, CONTENT_W, headerH, COLORS.card, false);
  setFillColor(pdf, color);
  pdf.roundedRect(MARGIN, startY, CONTENT_W, 2.5, 1, 1, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10.5);
  setTextColor(pdf, COLORS.text);
  pdf.text(label, MARGIN + 5, startY + 8);

  drawScorePill(pdf, MARGIN + CONTENT_W - 5, startY + 8, score, "right");

  ctx.y = startY + headerH + 3;

  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(8);
  setTextColor(pdf, COLORS.muted);
  const descLines = wrappedLines(pdf, description, CONTENT_W - 10, 8);
  for (const line of descLines) {
    ensureSpace(ctx, lineHeight(8));
    pdf.text(line, MARGIN + 5, ctx.y);
    ctx.y += lineHeight(8);
  }
  ctx.y += 2;

  addBullets(
    ctx,
    findings.length > 0 ? findings : ["No findings identified for this area."],
    9,
    7,
    CONTENT_W - 12
  );

  setDrawColor(pdf, COLORS.border);
  pdf.setLineWidth(0.2);
  pdf.line(MARGIN, ctx.y, MARGIN + CONTENT_W, ctx.y);
  ctx.y += 7;
}

function addQuickWinCard(ctx: LayoutCtx, items: string[]) {
  const { pdf } = ctx;
  const list = items.length > 0 ? items : ["No quick wins identified."];
  const innerW = CONTENT_W - 16;

  for (let index = 0; index < list.length; index++) {
    const item = list[index];
    const lines = wrappedLines(pdf, item, innerW, 9.5);
    const lh = lineHeight(9.5);
    const cardH = Math.max(14, lines.length * lh + 8);

    ensureSpace(ctx, cardH + 3);
    const cardY = ctx.y;
    drawRoundedCard(pdf, MARGIN, cardY, CONTENT_W, cardH, COLORS.surface);

    setFillColor(pdf, COLORS.accent);
    pdf.circle(MARGIN + 7, cardY + 7, 4, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    setTextColor(pdf, COLORS.white);
    pdf.text(String(index + 1), MARGIN + 7, cardY + 8.2, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    setTextColor(pdf, COLORS.text);
    let textY = cardY + 6;
    for (const line of lines) {
      pdf.text(line, MARGIN + 15, textY);
      textY += lh;
    }

    ctx.y = cardY + cardH + 3;
  }
  ctx.y += 2;
}

function addRecommendationSummary(
  ctx: LayoutCtx,
  recommendations: MarketingAuditReport["executive"]["prioritizedRecommendations"]
) {
  const groups: RecommendationImpact[] = ["High", "Medium", "Low"];
  const chipW = (CONTENT_W - 6) / 3;
  const chipH = 12;

  ensureSpace(ctx, chipH + 6);
  const chipY = ctx.y;

  groups.forEach((impact, i) => {
    const count = recommendations.filter((r) => r.impact === impact).length;
    const x = MARGIN + i * (chipW + 3);
    drawRoundedCard(ctx.pdf, x, chipY, chipW, chipH, COLORS.card);
    drawImpactPill(ctx.pdf, x + 4, chipY + 5.5, impact);
    ctx.pdf.setFont("helvetica", "bold");
    ctx.pdf.setFontSize(11);
    setTextColor(ctx.pdf, COLORS.text);
    ctx.pdf.text(String(count), x + chipW - 5, chipY + 8.5, { align: "right" });
  });

  ctx.y = chipY + chipH + 8;
}

function addRecommendations(
  ctx: LayoutCtx,
  recommendations: MarketingAuditReport["executive"]["prioritizedRecommendations"]
) {
  if (recommendations.length === 0) {
    addParagraph(ctx, "No prioritized recommendations were generated.", 9, COLORS.muted);
    return;
  }

  addRecommendationSummary(ctx, recommendations);

  const groups: RecommendationImpact[] = ["High", "Medium", "Low"];

  for (const impact of groups) {
    const items = recommendations.filter((r) => r.impact === impact);
    if (items.length === 0) continue;

    ensureSpace(ctx, 14);
    const { pdf } = ctx;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    setTextColor(pdf, IMPACT_COLORS[impact].text);
    pdf.text(`${impact} impact`, MARGIN + 2, ctx.y);
    ctx.y += 7;

    for (const item of items) {
      const lines = wrappedLines(pdf, item.nextStep, CONTENT_W - 28, 9.5);
      const lh = lineHeight(9.5);
      const cardH = Math.max(12, lines.length * lh + 6);

      ensureSpace(ctx, cardH + 2);
      const cardY = ctx.y;
      drawRoundedCard(pdf, MARGIN, cardY, CONTENT_W, cardH, COLORS.surface);
      drawImpactPill(pdf, MARGIN + 5, cardY + 6, impact);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9.5);
      setTextColor(pdf, COLORS.text);
      let textY = cardY + 6;
      for (const line of lines) {
        pdf.text(line, MARGIN + 24, textY);
        textY += lh;
      }

      ctx.y = cardY + cardH + 2.5;
    }
    ctx.y += 4;
  }
}

function addPagesTable(ctx: LayoutCtx, report: MarketingAuditReport) {
  const { pdf } = ctx;
  const colX = {
    path: MARGIN + 4,
    status: MARGIN + 48,
    html: MARGIN + 78,
    text: MARGIN + 118,
  };
  const rowH = 8;
  const headerH = 9;
  const rows = report.pagesAudited;
  const tableH = headerH + rows.length * rowH + 6;

  ensureSpace(ctx, tableH + 4);
  const tableY = ctx.y;
  drawRoundedCard(pdf, MARGIN, tableY, CONTENT_W, tableH, COLORS.surface);

  setFillColor(pdf, COLORS.band);
  pdf.rect(MARGIN + 0.5, tableY + 0.5, CONTENT_W - 1, headerH, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setTextColor(pdf, COLORS.muted);
  const headerY = tableY + 6;
  pdf.text("PATH", colX.path, headerY);
  pdf.text("STATUS", colX.status, headerY);
  pdf.text("HTML", colX.html, headerY);
  pdf.text("TEXT", colX.text, headerY);

  let rowY = tableY + headerH + 5;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);

  rows.forEach((page, index) => {
    if (index % 2 === 1) {
      setFillColor(pdf, COLORS.card);
      pdf.rect(MARGIN + 0.5, rowY - 4.5, CONTENT_W - 1, rowH, "F");
    }

    setTextColor(pdf, COLORS.text);
    pdf.text(page.path, colX.path, rowY);

    const ok = page.status === "success";
    setTextColor(pdf, ok ? [22, 163, 74] : [220, 38, 38]);
    pdf.setFont("helvetica", "bold");
    pdf.text(ok ? "OK" : page.error ?? "Error", colX.status, rowY);
    pdf.setFont("helvetica", "normal");

    setTextColor(pdf, COLORS.muted);
    pdf.text(
      page.htmlLength > 0 ? page.htmlLength.toLocaleString() : "—",
      colX.html,
      rowY
    );
    pdf.text(
      page.pageTextLength > 0 ? page.pageTextLength.toLocaleString() : "—",
      colX.text,
      rowY
    );

    rowY += rowH;
  });

  ctx.y = tableY + tableH + 4;

  if (report.discovery.totalDiscovered > report.discovery.pagesSelected) {
    const extra =
      report.discovery.totalDiscovered - report.discovery.pagesSelected;
    addParagraph(
      ctx,
      `${extra} additional page${extra === 1 ? "" : "s"} discovered but not included (limited to top ${report.discovery.maxPages}).`,
      8,
      COLORS.muted
    );
  }
}

export function buildReportPdf(report: MarketingAuditReport): jsPDF {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  drawTopAccentBar(pdf);

  const ctx: LayoutCtx = {
    pdf,
    y: MARGIN + 2,
    page: 1,
    hostname: getHostname(report.targetUrl),
  };

  addCover(ctx, report);

  addSectionHeader(
    ctx,
    1,
    "Executive Summary",
    "The headline takeaway for busy founders and operators."
  );
  addExecutiveSummaryCard(ctx, report.executive.executiveSummary);

  addSectionHeader(
    ctx,
    2,
    "Score Overview",
    "Performance across five marketing dimensions plus overall score."
  );
  addScoreBars(ctx, report.audit.scores);

  addSectionHeader(
    ctx,
    3,
    "Detailed Findings",
    "Evidence-based observations across every audit area."
  );
  for (const area of AUDIT_AREAS) {
    addFindingsArea(
      ctx,
      area.label,
      area.description,
      report.audit.scores[area.id],
      hexToRgb(area.color),
      report.audit.findings[area.id]
    );
  }

  addSectionHeader(
    ctx,
    4,
    "Quick Wins",
    "High-impact improvements you can act on this week."
  );
  addQuickWinCard(ctx, report.audit.quickWins);

  addSectionHeader(
    ctx,
    5,
    "Prioritized Recommendations",
    "Ranked next steps by expected impact."
  );
  addRecommendations(ctx, report.executive.prioritizedRecommendations);

  addSectionHeader(
    ctx,
    6,
    "Pages Audited",
    "The five highest-priority pages included in this audit."
  );
  addPagesTable(ctx, report);

  addFooter(ctx);
  return pdf;
}

export function saveReportPdf(report: MarketingAuditReport): void {
  const pdf = buildReportPdf(report);
  const hostname = getHostname(report.targetUrl);
  const date = new Date().toISOString().slice(0, 10);
  pdf.save(`marketing-audit-${sanitizeFilename(hostname)}-${date}.pdf`);
}
