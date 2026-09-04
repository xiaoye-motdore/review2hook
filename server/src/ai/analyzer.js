// AI analysis layer. Each function builds a prompt (see prompts.js), sends
// it to DeepSeek, and returns the parsed result in the exact shape the
// frontend expects (see client/src/types.ts) — nothing downstream needs to
// know these results came from a real model call.

import { callDeepSeekJSON } from "./deepseekClient.js";
import {
  buildPainPointClusterPrompt,
  buildConsumerLanguagePrompt,
  buildAdAnglesPrompt,
  buildStrategyNotesPrompt,
} from "./prompts.js";

const SYSTEM_PROMPT =
  "You are a rigorous e-commerce customer research analyst. You always respond with a single valid JSON object and nothing else — no markdown formatting, no code fences, no commentary.";

// Caps prompt size/cost/latency for uploads with many reviews.
const MAX_REVIEWS_PER_PROMPT = 200;

function capReviews(reviews) {
  return reviews.slice(0, MAX_REVIEWS_PER_PROMPT);
}

export async function analyzePainPoints({ productTitle, reviews }) {
  const user = buildPainPointClusterPrompt({ productTitle, reviews: capReviews(reviews) });
  const { painPoints } = await callDeepSeekJSON({ system: SYSTEM_PROMPT, user });

  if (!Array.isArray(painPoints)) {
    throw new Error("DeepSeek response was missing a painPoints array.");
  }
  return painPoints;
}

export async function extractConsumerLanguage({ productTitle, reviews, painPoints }) {
  const user = buildConsumerLanguagePrompt({ productTitle, reviews: capReviews(reviews), painPoints });
  const { consumerLanguage } = await callDeepSeekJSON({ system: SYSTEM_PROMPT, user });

  if (!Array.isArray(consumerLanguage)) {
    throw new Error("DeepSeek response was missing a consumerLanguage array.");
  }
  return consumerLanguage;
}

export async function generateAdAngles({ productTitle, painPoints }) {
  const user = buildAdAnglesPrompt({ productTitle, painPoints });
  const { adAngles } = await callDeepSeekJSON({ system: SYSTEM_PROMPT, user });

  if (!Array.isArray(adAngles)) {
    throw new Error("DeepSeek response was missing an adAngles array.");
  }
  return adAngles;
}

export async function generateStrategyNotes({ productTitle, painPoints, adAngles }) {
  const user = buildStrategyNotesPrompt({ productTitle, painPoints, adAngles });
  const { strategyNotes } = await callDeepSeekJSON({ system: SYSTEM_PROMPT, user });

  if (typeof strategyNotes !== "string") {
    throw new Error("DeepSeek response was missing strategyNotes text.");
  }
  return strategyNotes;
}
