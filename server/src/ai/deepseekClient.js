// Thin wrapper around the DeepSeek chat completions API (OpenAI-compatible
// request/response shape). Requires DEEPSEEK_API_KEY — see server/.env.

const DEEPSEEK_BASE_URL = "https://api.deepseek.com";
const DEEPSEEK_MODEL = "deepseek-chat";

function stripCodeFence(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return fenced ? fenced[1] : trimmed;
}

export async function callDeepSeekJSON({ system, user }) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not set. Add it to server/.env to enable AI analysis.");
  }

  const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    const error = new Error(`DeepSeek API error ${response.status}: ${body.slice(0, 300)}`);
    // Surfaced as a gateway failure — it's our upstream dependency that
    // failed, not a problem with the caller's request.
    error.status = 502;
    throw error;
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("DeepSeek response contained no content.");
  }

  try {
    return JSON.parse(stripCodeFence(content));
  } catch (err) {
    throw new Error(`Could not parse DeepSeek response as JSON: ${err.message}`);
  }
}
