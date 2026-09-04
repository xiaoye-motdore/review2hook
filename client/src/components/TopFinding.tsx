import type { TopFinding as TopFindingData } from "../lib/deriveInsights";

export default function TopFinding({ topFinding }: { topFinding: TopFindingData }) {
  const { topPainPoint, bestAdAngle, keyQuote } = topFinding;

  return (
    <section className="rounded-lg bg-accent-soft p-10 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Top Finding</p>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-accent-dark/70">#1 Pain Point</p>
          <p className="mt-2 font-serif text-xl leading-snug text-ink">{topPainPoint.theme}</p>
          <p className="mt-1 text-sm text-muted">{topPainPoint.frequency} mentions</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-accent-dark/70">Best Ad Angle</p>
          <p className="mt-2 font-serif text-xl leading-snug text-ink">
            {bestAdAngle ? `“${bestAdAngle.hook}”` : "—"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-accent-dark/70">Key Consumer Quote</p>
          <p className="mt-2 font-serif text-xl leading-snug text-ink">{keyQuote ? `“${keyQuote}”` : "—"}</p>
        </div>
      </div>
    </section>
  );
}
