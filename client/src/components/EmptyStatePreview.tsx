import { useLocale } from "../i18n/LocaleContext";
import TopFinding from "./TopFinding";
import Recommendations from "./Recommendations";
import type { TopFinding as TopFindingData } from "../lib/deriveInsights";

// Static sample content — purely illustrative, never real analysis data.
const SAMPLE_TOP_FINDING: TopFindingData = {
  topPainPoint: {
    theme: "Battery drains fast",
    frequency: 6,
    description: "Customers report the battery dies quickly during moderate use.",
  },
  bestAdAngle: {
    hook: "All-day power that outlasts the job, not just the box.",
    targetsTheme: "Battery drains fast",
  },
  keyQuote: "died after 10 minutes of use",
};

const SAMPLE_RECOMMENDATIONS = [
  "优先测试针对电池续航痛点的广告角度。",
  "优先改进的产品短板：电池续航能力。",
  "建议在广告文案中使用真实用户原话，增强可信度。",
];

export default function EmptyStatePreview() {
  const { t } = useLocale();

  return (
    <div className="relative mt-4">
      <div aria-hidden="true" className="pointer-events-none select-none space-y-8 opacity-50 blur-[2px]">
        <TopFinding topFinding={SAMPLE_TOP_FINDING} />
        <Recommendations recommendations={SAMPLE_RECOMMENDATIONS} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <p className="rounded-lg bg-card px-6 py-3 text-center font-serif text-lg text-ink shadow-soft">
          {t("emptyState.overlay")}
        </p>
      </div>
    </div>
  );
}
