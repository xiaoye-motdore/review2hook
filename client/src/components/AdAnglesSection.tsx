import type { AdAngle } from "../types";

export default function AdAnglesSection({ adAngles }: { adAngles: AdAngle[] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Ad Angles</h2>
      <ul className="space-y-3">
        {adAngles.map((angle) => (
          <li key={angle.hook} className="rounded-lg bg-slate-50 p-3">
            <p className="font-medium text-slate-800">&ldquo;{angle.hook}&rdquo;</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
              targets: {angle.targetsTheme}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
