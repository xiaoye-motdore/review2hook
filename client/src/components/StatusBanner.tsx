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

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 shrink-0 animate-spin"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export default function StatusBanner({ status, reviewCount, errorMessage }: StatusBannerProps) {
  if (status === "idle" || status === "complete") return null;

  if (status === "uploaded") {
    return (
      <div className="mb-4 flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 print:hidden">
        <CheckIcon />
        <span className="font-medium">
          File uploaded ✓{reviewCount != null ? ` — ${reviewCount} reviews found` : ""}
        </span>
      </div>
    );
  }

  if (status === "analyzing") {
    return (
      <div className="mb-4 flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 print:hidden">
        <Spinner />
        <span className="font-medium">
          {reviewCount != null ? `Analyzing ${reviewCount} reviews…` : "Analyzing reviews…"}
        </span>
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 print:hidden">
      {errorMessage}
    </div>
  );
}
