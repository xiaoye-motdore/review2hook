import { useEffect, useState, type ReactNode } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { ANALYSIS_STEP_KEYS, STEP_DURATION_MS } from "../lib/progressSteps";

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

function StepRow({ done, children }: { done: boolean; children: ReactNode }) {
  return (
    <li className="flex animate-step-in items-center gap-3 text-sm">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          done ? "bg-accent text-white" : "text-accent"
        }`}
      >
        {done ? <CheckIcon /> : <StepSpinner />}
      </span>
      <span className={done ? "text-muted" : "font-medium text-ink"}>{children}</span>
    </li>
  );
}

export default function AnalysisProgress() {
  const { t } = useLocale();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(0);
    const timers = ANALYSIS_STEP_KEYS.slice(1).map((_, i) =>
      setTimeout(() => setCurrentStep(i + 1), STEP_DURATION_MS * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Steps are only added to the DOM as they're reached (not pre-rendered
  // and re-styled) so each one's entrance animation actually plays when it
  // appears, rather than all of them animating together on first mount.
  const visibleSteps = ANALYSIS_STEP_KEYS.slice(0, currentStep + 1);

  return (
    <div className="rounded-lg bg-ink/5 px-5 py-5 print:hidden">
      <ul className="space-y-3">
        {visibleSteps.map((key, index) => (
          <StepRow key={key} done={index < currentStep}>
            {t(key)}
          </StepRow>
        ))}
      </ul>
    </div>
  );
}
