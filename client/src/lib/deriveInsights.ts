// Derives the "3-second glance" view (top finding + next-step recommendations)
// from the full analysis result. Purely a presentation-layer transform — no
// extra API call, since the four sections already contain everything needed.

import type { AdAngle, AnalysisResult, PainPoint } from "../types";

export interface TopFinding {
  topPainPoint: PainPoint;
  bestAdAngle: AdAngle | null;
  keyQuote: string | null;
}

export function deriveTopFinding(result: AnalysisResult): TopFinding | null {
  const topPainPoint = result.painPoints[0];
  if (!topPainPoint) return null;

  const bestAdAngle =
    result.adAngles.find((a) => a.targetsTheme === topPainPoint.theme) ?? result.adAngles[0] ?? null;

  const matchingGroup = result.consumerLanguage.find((c) => c.theme === topPainPoint.theme);
  const keyQuote = matchingGroup?.phrases[0] ?? result.consumerLanguage[0]?.phrases[0] ?? null;

  return { topPainPoint, bestAdAngle, keyQuote };
}

export function buildRecommendations(topFinding: TopFinding): string[] {
  const { topPainPoint, bestAdAngle, keyQuote } = topFinding;

  return [
    bestAdAngle
      ? `优先测试这条广告角度："${bestAdAngle.hook}"——直接针对当前最主要的用户痛点「${topPainPoint.theme}」。`
      : `优先针对最主要的用户痛点「${topPainPoint.theme}」设计并测试新的广告角度。`,
    `优先改进的产品短板：「${topPainPoint.theme}」——${topPainPoint.description}`,
    keyQuote
      ? `建议在广告文案中直接使用这句真实用户原话，增强可信度："${keyQuote}"`
      : `建议从"消费者原声"板块中挑选真实用户用语，用于广告文案，增强可信度。`,
  ];
}

export function formatReportText(
  result: AnalysisResult,
  topFinding: TopFinding | null,
  recommendations: string[]
): string {
  const lines: string[] = [];

  lines.push("HOOKMINER ANALYSIS REPORT");
  lines.push(`Product: ${result.product.title} (ASIN: ${result.product.asin})`);
  lines.push(`Reviews analyzed: ${result.reviewCount}`);
  lines.push("");

  if (topFinding) {
    lines.push("TOP FINDING");
    lines.push(`- Pain point: ${topFinding.topPainPoint.theme} (${topFinding.topPainPoint.frequency} mentions)`);
    if (topFinding.bestAdAngle) lines.push(`- Best ad angle: "${topFinding.bestAdAngle.hook}"`);
    if (topFinding.keyQuote) lines.push(`- Key consumer quote: "${topFinding.keyQuote}"`);
    lines.push("");
  }

  lines.push("WHAT TO DO NEXT (下一步建议)");
  recommendations.forEach((r) => lines.push(`- ${r}`));
  lines.push("");

  lines.push("CLUSTERED PAIN POINTS");
  result.painPoints.forEach((p) => lines.push(`- ${p.theme} (${p.frequency} mentions): ${p.description}`));
  lines.push("");

  lines.push("CONSUMER LANGUAGE");
  result.consumerLanguage.forEach((c) => {
    lines.push(`- ${c.theme}:`);
    c.phrases.forEach((phrase) => lines.push(`    "${phrase}"`));
  });
  lines.push("");

  lines.push("AD ANGLES");
  result.adAngles.forEach((a) => lines.push(`- "${a.hook}" (targets: ${a.targetsTheme})`));
  lines.push("");

  lines.push("STRATEGY NOTES (策略笔记)");
  lines.push(result.strategyNotes);

  return lines.join("\n");
}
