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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={asin}
        onChange={(e) => setAsin(e.target.value)}
        placeholder="Enter an Amazon ASIN (e.g. B08XYZ1234)"
        className="flex-1 rounded-lg border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
      />
      <button
        type="submit"
        disabled={isLoading || !asin.trim()}
        className="rounded-lg bg-accent px-6 py-3 font-medium text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-muted/40"
      >
        {isLoading ? "Analyzing…" : "Analyze"}
      </button>
    </form>
  );
}
