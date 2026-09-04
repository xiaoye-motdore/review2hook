import { useState } from "react";
import AsinForm from "./components/AsinForm";
import FileUploadZone from "./components/FileUploadZone";
import ResultsDisplay from "./components/ResultsDisplay";
import StatusBanner, { type AnalysisStatus } from "./components/StatusBanner";
import { analyzeAsin, analyzeUploadedFile, previewUploadedFile } from "./api/analyze";
import type { AnalysisResult } from "./types";

// Brief pause so the "File uploaded" state is actually perceivable before
// the UI moves on to "Analyzing" — without it the two state updates land
// in the same React render and the first is never painted.
const UPLOADED_STATE_PAUSE_MS = 600;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"demo" | "upload" | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const isBusy = status === "uploaded" || status === "analyzing";

  async function handleAsinSubmit(asin: string) {
    setError(null);
    setResult(null);
    setFileName(null);
    setReviewCount(null);
    setStatus("analyzing");
    try {
      const data = await analyzeAsin(asin);
      setResult(data);
      setSource("demo");
      setStatus("complete");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setResult(null);
    }
  }

  async function handleFileSelected(file: File) {
    setError(null);
    setResult(null);
    setFileName(file.name);
    setReviewCount(null);
    setStatus("idle");

    try {
      const preview = await previewUploadedFile(file);
      setReviewCount(preview.reviewCount);
      setStatus("uploaded");
      await wait(UPLOADED_STATE_PAUSE_MS);

      setStatus("analyzing");
      const data = await analyzeUploadedFile(file);
      setResult(data);
      setSource("upload");
      setStatus("complete");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setResult(null);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8 print:hidden">
          <h1 className="text-2xl font-bold text-slate-900">Hookminer</h1>
          <p className="mt-1 text-slate-600">
            Upload a reviews CSV or XLSX export to mine pain points, consumer language, and ad angles.
          </p>
        </header>

        <div className="mb-6 space-y-4 rounded-xl border border-slate-200 p-5 print:hidden">
          <FileUploadZone onFileSelected={handleFileSelected} isLoading={isBusy} fileName={fileName} />

          <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            or try the demo
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <AsinForm onSubmit={handleAsinSubmit} isLoading={isBusy} />
        </div>

        <StatusBanner status={status} reviewCount={reviewCount} errorMessage={error} />

        {result && (
          <>
            <p className="mb-3 text-sm text-slate-500 print:hidden">
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
