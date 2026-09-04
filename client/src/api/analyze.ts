import type { AnalysisResult } from "../types";

export async function analyzeAsin(asin: string): Promise<AnalysisResult> {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ asin }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to analyze ASIN.");
  }

  return response.json();
}
