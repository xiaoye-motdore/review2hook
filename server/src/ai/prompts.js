// Prompt templates for the AI analysis layer.
// These are not wired up to a live model yet — analyzer.js currently
// returns mock output instead of sending these to an API. Keeping the
// templates here now means the analyzer functions can switch to real
// calls later without changing their signatures.

export function buildPainPointClusterPrompt({ productTitle, reviews }) {
  return `You are analyzing customer reviews for the Amazon product "${productTitle}".

Reviews:
${reviews.map((r) => `- (${r.rating}★) ${r.text}`).join("\n")}

Task: Identify the recurring pain points across these reviews. Group them
into themes (clusters), and for each theme report:
- a short theme name
- how many reviews mention it (frequency)
- a 1-2 sentence description of the underlying problem

Return the themes ranked from most to least frequent.`;
}

export function buildConsumerLanguagePrompt({ productTitle, reviews }) {
  return `You are extracting authentic customer language from reviews for "${productTitle}".

Reviews:
${reviews.map((r) => `- ${r.text}`).join("\n")}

Task: Pull out exact phrases and wording customers use to describe their
problems with this product (not paraphrased). Group similar phrases
together and note which pain point theme each group of phrases relates to.`;
}

export function buildAdAnglesPrompt({ productTitle, painPoints }) {
  return `You are a direct-response copywriter creating ad angles for "${productTitle}".

Known customer pain points:
${painPoints.map((p) => `- ${p.theme}: ${p.description}`).join("\n")}

Task: Suggest advertising hooks/angles that address these pain points,
positioning this product (or an improved version of it) as the solution.
For each angle provide a short hook line and the pain point it targets.`;
}

export function buildStrategyNotesPrompt({ productTitle, painPoints, adAngles }) {
  return `你正在为产品 "${productTitle}" 撰写中文营销策略笔记。

已识别的客户痛点：
${painPoints.map((p) => `- ${p.theme}: ${p.description}`).join("\n")}

建议的广告角度：
${adAngles.map((a) => `- ${a.hook}`).join("\n")}

任务：结合以上痛点和广告角度，撰写简明的中文策略笔记，说明应该优先测试哪些角度、
潜在的产品改进方向，以及需要注意的风险。`;
}
