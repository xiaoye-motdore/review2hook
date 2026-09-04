import type { PainPoint } from "../types";

export default function PainPointsSection({ painPoints }: { painPoints: PainPoint[] }) {
  return (
    <ul className="space-y-5">
      {painPoints.map((point) => (
        <li key={point.theme}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-ink">{point.theme}</span>
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-dark">
              {point.frequency} mentions
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">{point.description}</p>
        </li>
      ))}
    </ul>
  );
}
