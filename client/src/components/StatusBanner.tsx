import AnalysisProgress from "./AnalysisProgress";

export type AnalysisStatus = "idle" | "analyzing" | "complete" | "error";

interface StatusBannerProps {
  status: AnalysisStatus;
  includeUploadStep: boolean;
  errorMessage?: string | null;
}

export default function StatusBanner({ status, includeUploadStep, errorMessage }: StatusBannerProps) {
  if (status === "idle" || status === "complete") return null;

  if (status === "analyzing") {
    return <AnalysisProgress includeUploadStep={includeUploadStep} />;
  }

  return (
    <div className="mb-8 rounded-lg bg-danger-soft px-5 py-4 text-sm text-danger print:hidden">{errorMessage}</div>
  );
}
