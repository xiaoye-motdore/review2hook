// Orchestration layer: pulls reviews from the data layer and runs them
// through the AI analysis layer, then assembles the combined result.

import { getProductInfo, fetchReviewsForAsin } from "../data/reviews.js";
import { parseReviewsFromBuffer } from "../data/uploadedReviews.js";
import {
  analyzePainPoints,
  extractConsumerLanguage,
  generateAdAngles,
  generateStrategyNotes,
} from "../ai/analyzer.js";

async function runAnalysis(product, reviews) {
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

export async function analyzeAsin(asin) {
  const product = getProductInfo(asin);
  const reviews = await fetchReviewsForAsin(asin);
  return runAnalysis(product, reviews);
}

export async function analyzeUploadedFile(buffer, filename) {
  const { product, reviews, headers, detectedTextColumn } = await parseReviewsFromBuffer(buffer, filename);

  if (reviews.length === 0) {
    const message =
      headers.length > 0
        ? `Couldn't find a review text column in this file. Columns found: ${headers.join(", ")}`
        : "This file appears to be empty.";
    const error = new Error(message);
    error.status = 400;
    throw error;
  }

  const result = await runAnalysis(product, reviews);
  return { ...result, detectedTextColumn };
}
