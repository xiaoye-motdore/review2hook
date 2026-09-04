export default function Recommendations({ recommendations }: { recommendations: string[] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">What to do next（下一步建议）</h2>
      <ul className="mt-3 space-y-2.5">
        {recommendations.map((line, index) => (
          <li key={index} className="flex gap-3 text-slate-700">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
              {index + 1}
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
