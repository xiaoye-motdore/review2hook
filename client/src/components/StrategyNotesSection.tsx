export default function StrategyNotesSection({ strategyNotes }: { strategyNotes: string }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">策略笔记 (Strategy Notes)</h2>
      <p className="whitespace-pre-line text-sm text-slate-700">{strategyNotes}</p>
    </section>
  );
}
