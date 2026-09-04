import { useState } from "react";

interface AsinFormProps {
  onSubmit: (asin: string) => void;
  isLoading: boolean;
}

export default function AsinForm({ onSubmit, isLoading }: AsinFormProps) {
  const [asin, setAsin] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (asin.trim()) {
      onSubmit(asin.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={asin}
        onChange={(e) => setAsin(e.target.value)}
        placeholder="Enter an Amazon ASIN (e.g. B08XYZ1234)"
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="submit"
        disabled={isLoading || !asin.trim()}
        className="rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isLoading ? "Analyzing…" : "Analyze"}
      </button>
    </form>
  );
}
