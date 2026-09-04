import { useState } from "react";
import AsinForm from "./components/AsinForm";
import FileUploadZone from "./components/FileUploadZone";
import ResultsDisplay from "./components/ResultsDisplay";
import { analyzeAsin, analyzeUploadedFile } from "./api/analyze";
import type { AnalysisResult } from "./types";

export default function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"demo" | "upload" | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleAsinSubmit(asin: string) {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeAsin(asin);
      setResult(data);
      setSource("demo");
      setFileName(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFileSelected(file: File) {
    setIsLoading(true);
    setError(null);
    setFileName(file.name);
    try {
      const data = await analyzeUploadedFile(file);
      setResult(data);
      setSource("upload");
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
            Upload a reviews CSV or XLSX export to mine pain points, consumer language, and ad angles.
          </p>
        </header>

        <div className="mb-8 space-y-4 rounded-xl border border-slate-200 bg-white p-5">
          <FileUploadZone onFileSelected={handleFileSelected} isLoading={isLoading} fileName={fileName} />

          <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            or try the demo
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <AsinForm onSubmit={handleAsinSubmit} isLoading={isLoading} />

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        {result && (
          <>
            <p className="mb-3 text-sm text-slate-500">
              {source === "upload"
                ? `Showing analysis of your uploaded file${
                    result.detectedTextColumn ? ` (review text read from column "${result.detectedTextColumn}")` : ""
                  }.`
                : "Showing demo data (garden pruning shears)."}
            </p>
            <ResultsDisplay result={result} />
          </>
        )}
      </div>
    </div>
  );
}
