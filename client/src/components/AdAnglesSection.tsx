import type { AdAngle } from "../types";

export default function AdAnglesSection({ adAngles }: { adAngles: AdAngle[] }) {
  return (
    <ul className="space-y-3">
      {adAngles.map((angle) => (
        <li key={angle.hook} className="rounded-lg bg-slate-50 p-3">
          <p className="font-medium text-slate-800">&ldquo;{angle.hook}&rdquo;</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">targets: {angle.targetsTheme}</p>
        </li>
      ))}
    </ul>
  );
}
