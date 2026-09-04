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
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-content px-6 py-16 sm:px-8">
        <header className="mb-14 print:hidden">
          <h1 className="text-4xl text-ink">Hookminer</h1>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            Upload a reviews CSV or XLSX export to mine pain points, consumer language, and ad angles.
          </p>
        </header>

        <div className="mb-10 space-y-6 rounded-lg bg-card p-10 shadow-soft print:hidden">
          <FileUploadZone onFileSelected={handleFileSelected} isLoading={isBusy} fileName={fileName} />

          <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-muted">
            <div className="h-px flex-1 bg-line" />
            or try the demo
            <div className="h-px flex-1 bg-line" />
          </div>

          <AsinForm onSubmit={handleAsinSubmit} isLoading={isBusy} />
        </div>

        <StatusBanner status={status} reviewCount={reviewCount} errorMessage={error} />

        {result && (
          <>
            <p className="mb-6 text-sm text-muted print:hidden">
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
