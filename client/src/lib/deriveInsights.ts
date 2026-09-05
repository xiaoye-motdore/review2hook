// Derives the "3-second glance" view (top finding + next-step recommendations)
// from the full analysis result. Purely a presentation-layer transform — no
// extra API call, since the four sections already contain everything needed.

import type { AdAngle, AnalysisResult, PainPoint } from "../types";
import type { TranslationKey } from "../i18n/translations";

type Translate = (key: TranslationKey, params?: Record<string, string | number>) => string;

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

// A recommendation is Chinese narrative text (the strategy) interleaved
// with short tagged spans of raw English data (the evidence — pain point
// labels, ad angle hooks, consumer quotes) so the two never blur together.
export type RecommendationPart = { kind: "text"; content: string } | { kind: "tag"; content: string };
export type RecommendationLine = RecommendationPart[];

function text(content: string): RecommendationPart {
  return { kind: "text", content };
}

function tag(content: string): RecommendationPart {
  return { kind: "tag", content };
}

export function buildRecommendations(topFinding: TopFinding): RecommendationLine[] {
  const { topPainPoint, bestAdAngle, keyQuote } = topFinding;

  const adAngleLine: RecommendationLine = bestAdAngle
    ? [
        text("优先测试这条广告角度："),
        tag(bestAdAngle.hook),
        text("——直接针对当前最主要的用户痛点 "),
        tag(topPainPoint.theme),
        text("。"),
      ]
    : [text("优先针对最主要的用户痛点 "), tag(topPainPoint.theme), text(" 设计并测试新的广告角度。")];

  const weaknessLine: RecommendationLine = [
    text("优先改进的产品短板："),
    tag(topPainPoint.theme),
    text("——"),
    tag(topPainPoint.description),
  ];

  const quoteLine: RecommendationLine = keyQuote
    ? [text("建议在广告文案中直接使用这句真实用户原话，增强可信度："), tag(keyQuote)]
    : [text("建议从「消费者原声」板块中挑选真实用户用语，用于广告文案，增强可信度。")];

  return [adAngleLine, weaknessLine, quoteLine];
}

// Flattens a recommendation line to plain text for the Copy Report export,
// where tags can't be styled — quoting them keeps the evidence recognizable.
export function flattenRecommendationLine(line: RecommendationLine): string {
  return line.map((part) => (part.kind === "tag" ? `"${part.content}"` : part.content)).join("");
}

// Section-header labels follow the current UI language; the underlying
// analysis data (themes, descriptions, phrases, hooks, strategy notes) is
// copied verbatim, exactly as returned by the API.
export function formatReportText(
  result: AnalysisResult,
  topFinding: TopFinding | null,
  recommendations: RecommendationLine[],
  t: Translate
): string {
  const lines: string[] = [];

  lines.push(t("report.title"));
  lines.push(t("report.product", { title: result.product.title, asin: result.product.asin }));
  lines.push(t("report.reviewsAnalyzed", { count: result.reviewCount }));
  lines.push("");

  if (topFinding) {
    lines.push(t("report.topFinding"));
    lines.push(
      `- ${t("report.painPointLabel")}: ${topFinding.topPainPoint.theme} (${t("common.mentions", {
        count: topFinding.topPainPoint.frequency,
      })})`
    );
    if (topFinding.bestAdAngle) lines.push(`- ${t("report.adAngleLabel")}: "${topFinding.bestAdAngle.hook}"`);
    if (topFinding.keyQuote) lines.push(`- ${t("report.quoteLabel")}: "${topFinding.keyQuote}"`);
    lines.push("");
  }

  lines.push(t("report.whatToDoNext"));
  recommendations.forEach((line) => lines.push(`- ${flattenRecommendationLine(line)}`));
  lines.push("");

  lines.push(t("report.painPoints"));
  result.painPoints.forEach((p) =>
    lines.push(`- ${p.theme} (${t("common.mentions", { count: p.frequency })}): ${p.description}`)
  );
  lines.push("");

  lines.push(t("report.consumerLanguage"));
  result.consumerLanguage.forEach((c) => {
    lines.push(`- ${c.theme}:`);
    c.phrases.forEach((phrase) => lines.push(`    "${phrase}"`));
  });
  lines.push("");

  lines.push(t("report.adAngles"));
  result.adAngles.forEach((a) => lines.push(`- "${a.hook}" (${t("adAngles.targets", { theme: a.targetsTheme })})`));
  lines.push("");

  lines.push(t("report.strategyNotes"));
  lines.push(result.strategyNotes);

  return lines.join("\n");
}
