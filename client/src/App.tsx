import { useEffect, useRef, useState } from "react";
import AsinForm from "./components/AsinForm";
import EmptyStatePreview from "./components/EmptyStatePreview";
import FileUploadZone from "./components/FileUploadZone";
import LanguageToggle from "./components/LanguageToggle";
import ResultsDisplay from "./components/ResultsDisplay";
import StatusBanner, { type AnalysisStatus } from "./components/StatusBanner";
import { useLocale } from "./i18n/LocaleContext";
import { analyzeAsin, analyzeUploadedFile, previewUploadedFile } from "./api/analyze";
import type { AnalysisResult } from "./types";

// Brief pause so the "File uploaded" state is actually perceivable before
// the UI moves on to "Analyzing" — without it the two state updates land
// in the same React render and the first is never painted.
const UPLOADED_STATE_PAUSE_MS = 600;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function TrustIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
      <path
        fillRule="evenodd"
        d="M10 1c-.256 0-.512.06-.749.179L3.32 4.106A2.09 2.09 0 002 6.023v3.505c0 4.024 2.606 7.5 6.75 8.99a2.5 2.5 0 001.5 0C14.394 17.028 17 13.552 17 9.528V6.023a2.09 2.09 0 00-1.32-1.917L10.75 1.18A1.68 1.68 0 0010 1zm2.53 6.28a.75.75 0 00-1.06-1.06L9 8.69 7.53 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3-3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function App() {
  const { t } = useLocale();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"demo" | "upload" | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const isBusy = status === "uploaded" || status === "analyzing";

  // Auto-scroll to the results as soon as a fresh analysis lands, so the
  // user doesn't have to scroll down manually to see it.
  useEffect(() => {
    if (result) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

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
      <div className="h-1 bg-accent print:hidden" />
      <LanguageToggle />

      <div className="mx-auto max-w-content px-6 py-16 sm:px-8">
        <header className="mb-14 print:hidden">
          <h1 className="text-4xl text-ink">Hookminer</h1>
          <p className="mt-3 text-lg leading-relaxed text-muted">{t("app.subtitle")}</p>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
            <TrustIcon />
            {t("app.trustLine")}
          </p>
        </header>

        <div className="mb-10 space-y-6 rounded-lg bg-card p-10 shadow-soft print:hidden">
          <FileUploadZone onFileSelected={handleFileSelected} isLoading={isBusy} fileName={fileName} />

          <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-muted">
            <div className="h-px flex-1 bg-line" />
            {t("app.orTryDemo")}
            <div className="h-px flex-1 bg-line" />
          </div>

          <AsinForm onSubmit={handleAsinSubmit} isLoading={isBusy} />
        </div>

        <StatusBanner status={status} reviewCount={reviewCount} errorMessage={error} />

        {!result && !isBusy && <EmptyStatePreview />}

        {result && (
          <div ref={resultsRef}>
            <p className="mb-6 text-sm text-muted print:hidden">
              {source === "upload"
                ? result.detectedTextColumn
                  ? t("results.showingUploadWithColumn", { column: result.detectedTextColumn })
                  : t("results.showingUploadNoColumn")
                : t("results.showingDemo")}
            </p>
            <ResultsDisplay result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
