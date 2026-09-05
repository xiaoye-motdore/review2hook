// Thin wrapper around an OpenAI-compatible chat completions API. Defaults
// to DeepSeek, but the base URL, key, and model are all configurable via
// server/.env (API_BASE_URL / API_KEY / MODEL), so any OpenAI-compatible
// provider (OpenAI, Gemini's OpenAI-compat endpoint, etc.) can be swapped
// in without code changes. DEEPSEEK_API_KEY is kept as a fallback for the
// default DeepSeek setup.

const DEFAULT_BASE_URL = "https://api.deepseek.com";
const DEFAULT_MODEL = "deepseek-chat";

function stripCodeFence(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return fenced ? fenced[1] : trimmed;
}

export async function callDeepSeekJSON({ system, user }) {
  const apiKey = process.env.API_KEY || process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY (or DEEPSEEK_API_KEY) is not set. Add it to server/.env to enable AI analysis.");
  }
  const baseUrl = process.env.API_BASE_URL || DEFAULT_BASE_URL;
  const model = process.env.MODEL || DEFAULT_MODEL;

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
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
    const error = new Error(`AI API error ${response.status}: ${body.slice(0, 300)}`);
    // Surfaced as a gateway failure — it's our upstream dependency that
    // failed, not a problem with the caller's request.
    error.status = 502;
    throw error;
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("AI API response contained no content.");
  }

  try {
    return JSON.parse(stripCodeFence(content));
  } catch (err) {
    throw new Error(`Could not parse AI API response as JSON: ${err.message}`);
  }
}
