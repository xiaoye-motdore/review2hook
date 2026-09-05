import type { TranslationKey } from "../i18n/translations";

// Single source of truth for the analysis progress animation's timing, so
// the visual component and the "don't cut the animation short" minimum
// wait in App.tsx can never drift out of sync.
export const STEP_DURATION_MS = 1500;

export const ANALYSIS_STEP_KEYS: TranslationKey[] = [
  "progress.reading",
  "progress.clustering",
  "progress.extracting",
  "progress.generating",
  "progress.writing",
];

// Time to reveal every analysis step at least once. The "file uploaded"
// step (when present) is shown immediately and doesn't add to this.
export const MIN_ANALYSIS_DISPLAY_MS = ANALYSIS_STEP_KEYS.length * STEP_DURATION_MS;
