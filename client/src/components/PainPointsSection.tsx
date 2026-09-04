import type { PainPoint } from "../types";

export default function PainPointsSection({ painPoints }: { painPoints: PainPoint[] }) {
  return (
    <ul className="space-y-3">
      {painPoints.map((point) => (
        <li key={point.theme} className="rounded-lg bg-slate-50 p-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-800">{point.theme}</span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              {point.frequency} mentions
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">{point.description}</p>
        </li>
      ))}
    </ul>
  );
}
