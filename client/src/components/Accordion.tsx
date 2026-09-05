import { useState, type ReactNode } from "react";
import { useLocale } from "../i18n/LocaleContext";

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function Accordion({ title, defaultOpen = false, children }: AccordionProps) {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg bg-card shadow-soft">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-8 py-6 text-left transition-colors hover:bg-accent-soft/60"
      >
        <span className="font-serif text-lg text-ink">{title}</span>
        <span className="flex items-center gap-2">
          <span className="text-xs text-muted">
            {isOpen ? t("accordion.clickToCollapse") : t("accordion.clickToExpand")}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {/* Kept mounted (not conditionally rendered) so print:block can force it
          visible in the printed report regardless of the on-screen collapsed state. */}
      <div className={`${isOpen ? "block" : "hidden"} print:block px-8 pb-8`}>{children}</div>
    </div>
  );
}
