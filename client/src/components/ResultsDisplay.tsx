import type { AnalysisResult } from "../types";
import { deriveTopFinding, buildRecommendations, formatReportText } from "../lib/deriveInsights";
import Accordion from "./Accordion";
import TopFinding from "./TopFinding";
import Recommendations from "./Recommendations";
import ExportBar from "./ExportBar";
import PainPointsSection from "./PainPointsSection";
import ConsumerLanguageSection from "./ConsumerLanguageSection";
import AdAnglesSection from "./AdAnglesSection";
import StrategyNotesSection from "./StrategyNotesSection";

export default function ResultsDisplay({ result }: { result: AnalysisResult }) {
  const topFinding = deriveTopFinding(result);
  const recommendations = topFinding ? buildRecommendations(topFinding) : [];
  const reportText = formatReportText(result, topFinding, recommendations);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{result.product.title}</h2>
          <p className="text-sm text-slate-500">
            ASIN: {result.product.asin} · {result.reviewCount} reviews analyzed
          </p>
        </div>
        <ExportBar reportText={reportText} />
      </div>

      {topFinding && <TopFinding topFinding={topFinding} />}

      {recommendations.length > 0 && <Recommendations recommendations={recommendations} />}

      <div className="space-y-3">
        <Accordion title="Clustered Pain Points">
          <PainPointsSection painPoints={result.painPoints} />
        </Accordion>
        <Accordion title="Consumer Language">
          <ConsumerLanguageSection consumerLanguage={result.consumerLanguage} />
        </Accordion>
        <Accordion title="Ad Angles">
          <AdAnglesSection adAngles={result.adAngles} />
        </Accordion>
        <Accordion title="策略笔记 (Strategy Notes)">
          <StrategyNotesSection strategyNotes={result.strategyNotes} />
        </Accordion>
      </div>
    </div>
  );
}
