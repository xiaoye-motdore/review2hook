import { useState } from "react";
import { useLocale } from "../i18n/LocaleContext";

export default function ExportBar({ reportText }: { reportText: string }) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("[ExportBar] clipboard write failed:", err);
    }
  }

  return (
    <div className="flex shrink-0 gap-3 rounded-lg border border-line bg-card p-2 shadow-soft print:hidden">
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-md px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
      >
        {copied ? t("export.copied") : t("export.copyReport")}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-md px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
      >
        {t("export.downloadPdf")}
      </button>
    </div>
  );
}
