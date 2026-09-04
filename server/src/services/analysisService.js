// Orchestration layer: pulls reviews from the data layer and runs them
// through the AI analysis layer, then assembles the combined result.

import { getProductInfo, fetchReviewsForAsin } from "../data/reviews.js";
import {
  analyzePainPoints,
  extractConsumerLanguage,
  generateAdAngles,
  generateStrategyNotes,
} from "../ai/analyzer.js";

export async function analyzeAsin(asin) {
  const product = getProductInfo(asin);
  const reviews = await fetchReviewsForAsin(asin);

  const painPoints = await analyzePainPoints({
    productTitle: product.title,
    reviews,
  });
  const consumerLanguage = await extractConsumerLanguage({
    productTitle: product.title,
    reviews,
  });
  const adAngles = await generateAdAngles({
    productTitle: product.title,
    painPoints,
  });
  const strategyNotes = await generateStrategyNotes({
    productTitle: product.title,
    painPoints,
    adAngles,
  });

  return {
    product,
    reviewCount: reviews.length,
    painPoints,
    consumerLanguage,
    adAngles,
    strategyNotes,
  };
}
