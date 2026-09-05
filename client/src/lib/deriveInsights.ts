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

// Each recommendation is a pure-Chinese instruction (the strategy) plus a
// separate list of raw English evidence strings (pain point labels, ad
// angle hooks, consumer quotes, descriptions) to render in a visually
// distinct block below it — never interleaved into the same sentence.
export interface RecommendationCard {
  instruction: string;
  evidence: string[];
}

export function buildRecommendations(topFinding: TopFinding): RecommendationCard[] {
  const { topPainPoint, bestAdAngle, keyQuote } = topFinding;

  const adAngleCard: RecommendationCard = bestAdAngle
    ? {
        instruction: "优先测试这条广告角度，直接针对当前最主要的用户痛点。",
        evidence: [bestAdAngle.hook, topPainPoint.theme],
      }
    : {
        instruction: "优先针对最主要的用户痛点，设计并测试新的广告角度。",
        evidence: [topPainPoint.theme],
      };

  const weaknessCard: RecommendationCard = {
    instruction: "优先改进这项产品短板。",
    evidence: [topPainPoint.theme, topPainPoint.description],
  };

  const quoteCard: RecommendationCard = keyQuote
    ? {
        instruction: "建议在广告文案中直接使用这句真实用户原话，增强可信度。",
        evidence: [keyQuote],
      }
    : {
        instruction: "建议从「消费者原声」板块中挑选真实用户用语，用于广告文案，增强可信度。",
        evidence: [],
      };

  return [adAngleCard, weaknessCard, quoteCard];
}

// Flattens a recommendation to plain text for the Copy Report export, where
// the visual instruction/evidence separation can't survive into clipboard
// text — quoting the evidence keeps it recognizable as raw source material.
export function flattenRecommendationCard(card: RecommendationCard): string {
  if (card.evidence.length === 0) return card.instruction;
  return `${card.instruction} ${card.evidence.map((e) => `"${e}"`).join(" / ")}`;
}

// Section-header labels follow the current UI language; the underlying
// analysis data (themes, descriptions, phrases, hooks, strategy notes) is
// copied verbatim, exactly as returned by the API.
export function formatReportText(
  result: AnalysisResult,
  topFinding: TopFinding | null,
  recommendations: RecommendationCard[],
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
  recommendations.forEach((card) => lines.push(`- ${flattenRecommendationCard(card)}`));
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
