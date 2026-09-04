import { useLocale } from "../i18n/LocaleContext";

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="fixed right-6 top-5 z-10 flex items-center gap-1.5 text-sm print:hidden">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`transition-colors ${locale === "en" ? "font-semibold text-ink" : "text-muted hover:text-ink"}`}
      >
        EN
      </button>
      <span className="text-line">|</span>
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={`transition-colors ${locale === "zh" ? "font-semibold text-ink" : "text-muted hover:text-ink"}`}
      >
        中文
      </button>
    </div>
  );
}
