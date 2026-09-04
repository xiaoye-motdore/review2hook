import { useState } from "react";
import AsinForm from "./components/AsinForm";
import ResultsDisplay from "./components/ResultsDisplay";
import { analyzeAsin } from "./api/analyze";
import type { AnalysisResult } from "./types";

export default function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(asin: string) {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeAsin(asin);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Hookminer</h1>
          <p className="mt-1 text-slate-600">
            Paste an Amazon ASIN to mine review pain points, consumer language, and ad angles.
          </p>
        </header>

        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5">
          <AsinForm onSubmit={handleSubmit} isLoading={isLoading} />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>

        {result && <ResultsDisplay result={result} />}
      </div>
    </div>
  );
}
