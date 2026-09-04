import type { AnalysisResult } from "../types";
import { deriveTopFinding, buildRecommendations, formatReportText } from "../lib/deriveInsights";
import { useLocale } from "../i18n/LocaleContext";
import Accordion from "./Accordion";
import TopFinding from "./TopFinding";
import Recommendations from "./Recommendations";
import ExportBar from "./ExportBar";
import PainPointsSection from "./PainPointsSection";
import ConsumerLanguageSection from "./ConsumerLanguageSection";
import AdAnglesSection from "./AdAnglesSection";
import StrategyNotesSection from "./StrategyNotesSection";

export default function ResultsDisplay({ result }: { result: AnalysisResult }) {
  const { t } = useLocale();
  const topFinding = deriveTopFinding(result);
  const recommendations = topFinding ? buildRecommendations(topFinding) : [];
  const reportText = formatReportText(result, topFinding, recommendations, t);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h2 className="text-2xl text-ink">{result.product.title}</h2>
          <p className="mt-1 text-sm text-muted">
            {t("results.meta", { asin: result.product.asin, count: result.reviewCount })}
          </p>
        </div>
        <ExportBar reportText={reportText} />
      </div>

      {topFinding && <TopFinding topFinding={topFinding} />}

      {recommendations.length > 0 && <Recommendations recommendations={recommendations} />}

      <div className="space-y-5">
        <Accordion title={t("accordion.painPoints")}>
          <PainPointsSection painPoints={result.painPoints} />
        </Accordion>
        <Accordion title={t("accordion.consumerLanguage")}>
          <ConsumerLanguageSection consumerLanguage={result.consumerLanguage} />
        </Accordion>
        <Accordion title={t("accordion.adAngles")}>
          <AdAnglesSection adAngles={result.adAngles} />
        </Accordion>
        <Accordion title={t("accordion.strategyNotes")}>
          <StrategyNotesSection strategyNotes={result.strategyNotes} />
        </Accordion>
      </div>
    </div>
  );
}
