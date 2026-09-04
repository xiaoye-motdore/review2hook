import type { AnalysisResult } from "../types";
import { useLocale } from "../i18n/LocaleContext";

export default function CompleteBanner({ result }: { result: AnalysisResult }) {
  const { t } = useLocale();

  return (
    <div className="mb-8 rounded-lg bg-success-soft px-5 py-4 font-medium text-success print:hidden">
      {t("results.completeBanner", {
        reviewCount: result.reviewCount,
        painPointCount: result.painPoints.length,
        adAngleCount: result.adAngles.length,
      })}
    </div>
  );
}
