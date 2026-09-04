import type { AdAngle } from "../types";

export default function AdAnglesSection({ adAngles }: { adAngles: AdAngle[] }) {
  return (
    <ul className="space-y-5">
      {adAngles.map((angle) => (
        <li key={angle.hook}>
          <p className="font-serif text-lg text-ink">&ldquo;{angle.hook}&rdquo;</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-muted">targets: {angle.targetsTheme}</p>
        </li>
      ))}
    </ul>
  );
}
