import { useLocale } from "../i18n/LocaleContext";
import type { RecommendationCard } from "../lib/deriveInsights";

export default function Recommendations({ recommendations }: { recommendations: RecommendationCard[] }) {
  const { t } = useLocale();

  return (
    <section className="rounded-lg bg-card p-10 shadow-soft">
      <h2 className="text-xl text-ink">{t("recommendations.title")}</h2>
      <ul className="mt-5 space-y-6">
        {recommendations.map((card, index) => (
          <li key={index}>
            <div className="flex gap-3.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-dark">
                {index + 1}
              </span>
              <p className="leading-relaxed text-ink/90">{card.instruction}</p>
            </div>
            {card.evidence.length > 0 && (
              <div className="ml-8 mt-2 space-y-1.5 rounded-md border border-line bg-ink/5 px-4 py-3">
                {card.evidence.map((line, lineIndex) => (
                  <p key={lineIndex} className="font-mono text-[0.85em] leading-relaxed text-accent-dark">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
