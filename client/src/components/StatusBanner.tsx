import { useLocale } from "../i18n/LocaleContext";
import AnalysisProgress from "./AnalysisProgress";

export type AnalysisStatus = "idle" | "uploaded" | "analyzing" | "complete" | "error";

interface StatusBannerProps {
  status: AnalysisStatus;
  reviewCount: number | null;
  errorMessage?: string | null;
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function StatusBanner({ status, reviewCount, errorMessage }: StatusBannerProps) {
  const { t } = useLocale();

  if (status === "idle" || status === "complete") return null;

  if (status === "uploaded") {
    return (
      <div className="mb-8 flex items-center gap-3 rounded-lg bg-accent-soft px-5 py-4 text-accent-dark print:hidden">
        <CheckIcon />
        <span>{reviewCount != null ? t("status.uploaded", { count: reviewCount }) : t("status.uploadedNoCount")}</span>
      </div>
    );
  }

  if (status === "analyzing") {
    return <AnalysisProgress />;
  }

  return (
    <div className="mb-8 rounded-lg bg-danger-soft px-5 py-4 text-sm text-danger print:hidden">{errorMessage}</div>
  );
}
