import type { AnalysisResult, UploadPreview } from "../types";

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

export async function previewUploadedFile(file: File): Promise<UploadPreview> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/analyze/preview", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to read uploaded file.");
  }

  return response.json();
}

export async function analyzeUploadedFile(file: File): Promise<AnalysisResult> {
  console.log("[api/analyze] building FormData for:", file.name, file.size, "bytes, type:", file.type);
  const formData = new FormData();
  formData.append("file", file);

  console.log("[api/analyze] POSTing to /api/analyze/upload...");
  const response = await fetch("/api/analyze/upload", {
    method: "POST",
    body: formData,
  });
  console.log("[api/analyze] response status:", response.status, response.ok);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    console.error("[api/analyze] server returned error:", body);
    throw new Error(body.error ?? "Failed to analyze uploaded file.");
  }

  const data = await response.json();
  console.log("[api/analyze] parsed response body:", data);
  return data;
}
