export type AnalysisStatus = "idle" | "analyzing" | "complete" | "error";

export default function StatusBanner({ status, errorMessage }: { status: AnalysisStatus; errorMessage?: string | null }) {
  if (status !== "error") return null;

  return (
    <div className="mb-8 rounded-lg bg-danger-soft px-5 py-4 text-sm text-danger print:hidden">{errorMessage}</div>
  );
}
