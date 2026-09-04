// AI analysis layer.
// These functions are placeholders: they build the prompt (see prompts.js)
// but do not call any AI API yet. They return mock structured output shaped
// like what a real model call would eventually produce, so the rest of the
// app (routes, frontend) can be built against a stable contract now.
//
// To wire up a real model later: send the built prompt to an LLM API and
// parse its response into the same shape these functions return.

import {
  buildPainPointClusterPrompt,
  buildConsumerLanguagePrompt,
  buildAdAnglesPrompt,
  buildStrategyNotesPrompt,
} from "./prompts.js";

export async function analyzePainPoints({ productTitle, reviews }) {
  const _prompt = buildPainPointClusterPrompt({ productTitle, reviews });

  return [
    {
      theme: "Blade dulls quickly",
      frequency: 6,
      description:
        "Customers report the blade loses sharpness after light use and needs frequent resharpening.",
    },
    {
      theme: "Rust and corrosion",
      frequency: 5,
      description:
        "Blades show rust spots within days to weeks even with normal dry storage.",
    },
    {
      theme: "Sap/resin buildup jams the blade",
      frequency: 4,
      description:
        "Sticky sap residue accumulates on the blade during use, making it harder to close and cut cleanly.",
    },
    {
      theme: "Hand fatigue / handle size",
      frequency: 4,
      description:
        "The handle is too small or the grip material degrades, causing hand cramping or discomfort on longer sessions.",
    },
    {
      theme: "Mechanical failure (spring, screw, hinge)",
      frequency: 4,
      description:
        "Small components — the spring, retaining screw, or hinge — fail or fall out, sometimes within days of purchase.",
    },
    {
      theme: "Struggles with thicker branches",
      frequency: 3,
      description:
        "The shears handle thin stems fine but bind or fail to cut cleanly on thicker woody branches.",
    },
    {
      theme: "Confusing/unreliable safety lock",
      frequency: 3,
      description:
        "The safety lock is stiff or unclear, sometimes popping open unintentionally in storage or a bag.",
    },
  ];
}

export async function extractConsumerLanguage({ productTitle, reviews }) {
  const _prompt = buildConsumerLanguagePrompt({ productTitle, reviews });

  return [
    {
      theme: "Blade dulls quickly",
      phrases: [
        "went dull after only two weeks",
        "sharpening it every other week",
        "have to sharpen it constantly",
      ],
    },
    {
      theme: "Rust and corrosion",
      phrases: [
        "rusted within a week",
        "rust spots on the blade within days",
        "started rusting after just a few weeks",
      ],
    },
    {
      theme: "Sap/resin buildup jams the blade",
      phrases: [
        "sap and resin gunk up the blade",
        "blades get so sticky and gunky",
        "barely closes anymore",
      ],
    },
    {
      theme: "Hand fatigue / handle size",
      phrases: [
        "my hand cramps up after 15 minutes",
        "grip material started to peel off",
        "handle is too small for my grip size",
      ],
    },
    {
      theme: "Mechanical failure (spring, screw, hinge)",
      phrases: [
        "spring mechanism popped out the first day",
        "tiny screw holding the blades together fell out",
        "broke clean in half after three uses",
      ],
    },
  ];
}

export async function generateAdAngles({ productTitle, painPoints }) {
  const _prompt = buildAdAnglesPrompt({ productTitle, painPoints });

  return [
    {
      hook: "Still sharp after season two — not week two.",
      targetsTheme: "Blade dulls quickly",
    },
    {
      hook: "Rust-proof blades that survive your shed, not just your first trim.",
      targetsTheme: "Rust and corrosion",
    },
    {
      hook: "Non-stick blades that shrug off sap — no mid-prune scrubbing.",
      targetsTheme: "Sap/resin buildup jams the blade",
    },
    {
      hook: "An all-day grip your hand won't quit on before you do.",
      targetsTheme: "Hand fatigue / handle size",
    },
    {
      hook: "Built to outlast the first month — no popped springs, no lost screws.",
      targetsTheme: "Mechanical failure (spring, screw, hinge)",
    },
  ];
}

export async function generateStrategyNotes({ productTitle, painPoints, adAngles }) {
  const _prompt = buildStrategyNotesPrompt({ productTitle, painPoints, adAngles });

  return (
    "【策略笔记 - 占位内容，尚未接入 AI 模型】\n\n" +
    "优先测试角度：\n" +
    "1. 「防锈」和「持久锋利」这两个角度覆盖了最高频的差评痛点，建议优先投放测试。\n" +
    "2. 「防粘刀刃」角度差异化明显，可作为次优先测试角度。\n\n" +
    "产品改进方向：\n" +
    "- 若能验证真实产品在防锈涂层和刀刃硬度上的优势，广告素材可直接引用具体材质/工艺作为信任背书。\n\n" +
    "风险提示：\n" +
    "- 当前文案基于占位数据生成，实际投放前需替换为真实评论分析结果，避免夸大宣传引发差评反噬。"
  );
}
