import type { AnalysisResult } from "../types";
import PainPointsSection from "./PainPointsSection";
import ConsumerLanguageSection from "./ConsumerLanguageSection";
import AdAnglesSection from "./AdAnglesSection";
import StrategyNotesSection from "./StrategyNotesSection";

export default function ResultsDisplay({ result }: { result: AnalysisResult }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">{result.product.title}</h2>
        <p className="text-sm text-slate-500">
          ASIN: {result.product.asin} · {result.reviewCount} reviews analyzed
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <PainPointsSection painPoints={result.painPoints} />
        <ConsumerLanguageSection consumerLanguage={result.consumerLanguage} />
        <AdAnglesSection adAngles={result.adAngles} />
        <StrategyNotesSection strategyNotes={result.strategyNotes} />
      </div>
    </div>
  );
}
