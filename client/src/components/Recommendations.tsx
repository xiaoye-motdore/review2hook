import { useLocale } from "../i18n/LocaleContext";
import type { RecommendationLine } from "../lib/deriveInsights";

export default function Recommendations({ recommendations }: { recommendations: RecommendationLine[] }) {
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
            <span>
              {line.map((part, partIndex) =>
                part.kind === "tag" ? (
                  <span
                    key={partIndex}
                    className="mx-0.5 inline-block rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[0.85em] text-accent-dark"
                  >
                    {part.content}
                  </span>
                ) : (
                  <span key={partIndex}>{part.content}</span>
                )
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
