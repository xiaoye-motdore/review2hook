// Prompt templates for the AI analysis layer. Each builder returns the
// user-message text sent to DeepSeek for one analysis step; analyzer.js
// pairs it with a shared system prompt and parses the JSON response into
// the exact shape the frontend expects (see client/src/types.ts).

export function buildPainPointClusterPrompt({ productTitle, reviews }) {
  return `You are analyzing customer reviews for the Amazon product "${productTitle}".

Reviews:
${reviews.map((r) => `- (${r.rating ?? "?"}★) ${r.text}`).join("\n")}

Task: Identify the recurring pain points across these reviews. Group them
into themes (clusters), and for each theme report:
- a short theme name
- how many reviews mention it (frequency)
- a 1-2 sentence description of the underlying problem

Order the themes from highest to lowest frequency.

Respond with ONLY a JSON object (no markdown, no code fences, no commentary)
in exactly this shape:
{
  "painPoints": [
    { "theme": "short theme name", "frequency": <integer>, "description": "1-2 sentence description" }
  ]
}`;
}

export function buildConsumerLanguagePrompt({ productTitle, reviews, painPoints }) {
  return `You are extracting authentic customer language from reviews for "${productTitle}".

These pain point themes were already identified in a prior analysis step:
${painPoints.map((p) => `- ${p.theme}`).join("\n")}

Reviews:
${reviews.map((r) => `- ${r.text}`).join("\n")}

Task: For each theme above, pull out exact phrases and wording customers use
(verbatim substrings copied from the reviews, not paraphrased) that relate to
that theme. Only include a theme if you found at least one matching phrase.

Respond with ONLY a JSON object (no markdown, no code fences, no commentary)
in exactly this shape:
{
  "consumerLanguage": [
    { "theme": "<must exactly match one of the theme names above>", "phrases": ["exact phrase", "exact phrase"] }
  ]
}`;
}

export function buildAdAnglesPrompt({ productTitle, painPoints }) {
  return `You are a direct-response copywriter creating ad angles for "${productTitle}".

Known customer pain points:
${painPoints.map((p) => `- ${p.theme}: ${p.description}`).join("\n")}

Task: Suggest one advertising hook per pain point, positioning this product
(or an improved version of it) as the solution to that specific pain point.

Respond with ONLY a JSON object (no markdown, no code fences, no commentary)
in exactly this shape:
{
  "adAngles": [
    { "hook": "short punchy ad hook", "targetsTheme": "<must exactly match one of the pain point theme names above>" }
  ]
}`;
}

export function buildStrategyNotesPrompt({ productTitle, painPoints, adAngles }) {
  return `你正在为产品 "${productTitle}" 撰写中文营销策略笔记。

已识别的客户痛点：
${painPoints.map((p) => `- ${p.theme}: ${p.description}`).join("\n")}

建议的广告角度：
${adAngles.map((a) => `- ${a.hook}`).join("\n")}

任务：结合以上痛点和广告角度，撰写简明的中文策略笔记，说明应该优先测试哪些角度、
潜在的产品改进方向，以及需要注意的风险。

请仅返回如下格式的 JSON（不要包含任何其他文字、说明或代码块标记）：
{
  "strategyNotes": "完整的中文策略笔记文本（可包含换行符）"
}`;
}
