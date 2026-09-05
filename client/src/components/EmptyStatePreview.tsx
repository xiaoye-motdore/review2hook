import { useLocale } from "../i18n/LocaleContext";

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-accent">
      <rect x="3" y="12" width="4" height="9" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="10" y="7" width="4" height="14" rx="1" fill="currentColor" opacity="0.75" />
      <rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" />
    </svg>
  );
}

export default function EmptyStatePreview() {
  const { t } = useLocale();

  return (
    <div className="flex flex-col items-center gap-5 rounded-lg bg-card px-6 py-20 text-center shadow-soft">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
        <ChartIcon />
      </div>
      <h2 className="font-serif text-2xl text-ink">{t("emptyState.title")}</h2>
      <p className="max-w-sm text-base leading-relaxed text-muted">{t("emptyState.subtitle")}</p>
    </div>
  );
}
