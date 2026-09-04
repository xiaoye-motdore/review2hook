import { useLocale } from "../i18n/LocaleContext";

export default function Recommendations({ recommendations }: { recommendations: string[] }) {
  const { t } = useLocale();

  return (
    <section className="rounded-lg bg-card p-10 shadow-soft">
      <h2 className="text-xl text-ink">{t("recommendations.title")}</h2>
      <ul className="mt-5 space-y-4">
        {recommendations.map((line, index) => (
          <li key={index} className="flex gap-3.5 leading-relaxed text-ink/90">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-dark">
              {index + 1}
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
