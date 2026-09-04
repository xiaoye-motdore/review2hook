import type { TopFinding as TopFindingData } from "../lib/deriveInsights";

export default function TopFinding({ topFinding }: { topFinding: TopFindingData }) {
  const { topPainPoint, bestAdAngle, keyQuote } = topFinding;

  return (
    <section className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Top Finding</p>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700/70">#1 Pain Point</p>
          <p className="mt-1 text-xl font-bold leading-snug text-slate-900">{topPainPoint.theme}</p>
          <p className="mt-1 text-sm text-slate-600">{topPainPoint.frequency} mentions</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700/70">Best Ad Angle</p>
          <p className="mt-1 text-xl font-bold leading-snug text-slate-900">
            {bestAdAngle ? `“${bestAdAngle.hook}”` : "—"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700/70">Key Consumer Quote</p>
          <p className="mt-1 text-xl font-bold leading-snug text-slate-900">
            {keyQuote ? `“${keyQuote}”` : "—"}
          </p>
        </div>
      </div>
    </section>
  );
}
