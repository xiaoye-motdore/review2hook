import { useState } from "react";

export default function ExportBar({ reportText }: { reportText: string }) {
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
    <div className="flex shrink-0 gap-2 print:hidden">
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        {copied ? "Copied ✓" : "Copy Report"}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Download PDF
      </button>
    </div>
  );
}
