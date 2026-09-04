import { useEffect, useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import type { TranslationKey } from "../i18n/translations";

// Cosmetic, time-based progression — the server doesn't stream real
// step-by-step progress, so this approximates it on a fixed clock. If the
// real analysis finishes early the whole banner just unmounts; if it runs
// long, the indicator holds on the last step rather than looping.
const STEP_KEYS: TranslationKey[] = [
  "progress.reading",
  "progress.clustering",
  "progress.extracting",
  "progress.generating",
  "progress.writing",
];

const STEP_DURATION_MS = 2000;

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function StepSpinner() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 animate-spin">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export default function AnalysisProgress() {
  const { t } = useLocale();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(0);
    const timers = STEP_KEYS.slice(1).map((_, i) =>
      setTimeout(() => setCurrentStep(i + 1), STEP_DURATION_MS * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="mb-8 rounded-lg bg-ink/5 px-5 py-5 print:hidden">
      <ul className="space-y-3">
        {STEP_KEYS.map((key, index) => {
          const isDone = index < currentStep;
          const isActive = index === currentStep;
          return (
            <li key={key} className="flex items-center gap-3 text-sm">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isDone ? "bg-accent text-white" : "text-accent"
                }`}
              >
                {isDone ? <CheckIcon /> : isActive ? <StepSpinner /> : <span className="h-1.5 w-1.5 rounded-full bg-line" />}
              </span>
              <span className={isDone ? "text-muted" : isActive ? "font-medium text-ink" : "text-muted/50"}>
                {t(key)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
