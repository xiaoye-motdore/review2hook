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
    <div className="flex shrink-0 gap-3 print:hidden">
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-lg bg-ink/5 px-4 py-2 text-sm text-ink transition-colors hover:bg-ink/10"
      >
        {copied ? "Copied ✓" : "Copy Report"}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg bg-ink/5 px-4 py-2 text-sm text-ink transition-colors hover:bg-ink/10"
      >
        Download PDF
      </button>
    </div>
  );
}
