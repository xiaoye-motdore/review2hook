import type { AdAngle } from "../types";
import { useLocale } from "../i18n/LocaleContext";

export default function AdAnglesSection({ adAngles }: { adAngles: AdAngle[] }) {
  const { t } = useLocale();

  return (
    <ul className="space-y-5">
      {adAngles.map((angle) => (
        <li key={angle.hook}>
          <p className="font-serif text-lg text-ink">&ldquo;{angle.hook}&rdquo;</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-muted">
            {t("adAngles.targets", { theme: angle.targetsTheme })}
          </p>
        </li>
      ))}
    </ul>
  );
}
