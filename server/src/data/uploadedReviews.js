// Data-fetching layer (upload path).
// Parses an uploaded CSV/XLSX buffer into the same review shape used by
// the mock data (see reviews.js): { id, text, rating }. Real-world exports
// (e.g. SellerSprite) use varying, sometimes localized, column names, so
// the review-text column is auto-detected rather than hardcoded.

import ExcelJS from "exceljs";
import Papa from "papaparse";

const TEXT_HEADER_CANDIDATES = [
  "review text",
  "reviewtext",
  "review content",
  "review body",
  "review",
  "content",
  "comment",
  "comments",
  "body",
  "text",
  "description",
  "内容",
  "评论内容",
  "评论正文",
  "评价内容",
];

const RATING_HEADER_CANDIDATES = ["rating", "star rating", "stars", "star", "星级", "评分"];
// Deliberately excludes bare "title"/"标题": in a reviews export that
// column holds each review's own title, not the product's — using it
// here would mislabel the product with a random review headline.
const TITLE_HEADER_CANDIDATES = ["product title", "商品标题", "product name", "listing title"];
const ASIN_HEADER_CANDIDATES = ["asin"];

// Headers containing any of these are never treated as the review-text
// column, even if their values happen to be long strings (e.g. URLs).
const BLACKLIST_SUBSTRINGS = [
  "link", "url", "http", "image", "img", "avatar", "video", "profile",
  "date", "time", "country", "asin", "sku", "id", "rating", "star",
  "星级", "国家", "链接", "头像", "视频", "日期", "时间", "评论人", "红人", "型号", "地址",
];

const MIN_AVG_TEXT_LENGTH = 15;

function normalizeHeader(header) {
  return String(header ?? "").trim().toLowerCase();
}

function findExactHeader(headers, candidates) {
  const normalizedCandidates = candidates.map(normalizeHeader);
  return headers.find((h) => normalizedCandidates.includes(normalizeHeader(h))) ?? null;
}

function detectTextColumn(headers, rows) {
  const exact = findExactHeader(headers, TEXT_HEADER_CANDIDATES);
  if (exact) return exact;

  let best = null;
  let bestAvgLength = 0;

  for (const header of headers) {
    const normalized = normalizeHeader(header);
    if (BLACKLIST_SUBSTRINGS.some((kw) => normalized.includes(kw))) continue;

    const values = rows.map((r) => String(r[header] ?? "").trim()).filter(Boolean);
    if (values.length < rows.length * 0.5) continue;

    const avgLength = values.reduce((sum, v) => sum + v.length, 0) / values.length;
    if (avgLength > bestAvgLength) {
      bestAvgLength = avgLength;
      best = header;
    }
  }

  return bestAvgLength >= MIN_AVG_TEXT_LENGTH ? best : null;
}

function mostCommonValue(rows, header) {
  const counts = new Map();
  for (const row of rows) {
    const value = String(row[header] ?? "").trim();
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  let best = "";
  let bestCount = 0;
  for (const [value, count] of counts) {
    if (count > bestCount) {
      best = value;
      bestCount = count;
    }
  }
  return best;
}

function parseCsvRows(buffer) {
  const text = buffer.toString("utf-8");
  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });
  return data;
}

async function parseXlsxRows(buffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.worksheets[0];
  if (!worksheet) return [];

  const headers = worksheet.getRow(1).values.slice(1).map((h) => String(h ?? "").trim());

  const rows = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const values = row.values.slice(1);
    const obj = {};
    headers.forEach((header, i) => {
      const cell = values[i];
      obj[header] = cell && typeof cell === "object" && "text" in cell ? cell.text : cell ?? "";
    });
    rows.push(obj);
  });
  return rows;
}

export async function parseReviewsFromBuffer(buffer, filename = "") {
  const isCsv = filename.toLowerCase().endsWith(".csv");
  console.log(`[uploadedReviews] parsing "${filename}" as`, isCsv ? "CSV" : "XLSX/XLS");

  let rows;
  try {
    rows = isCsv ? parseCsvRows(buffer) : await parseXlsxRows(buffer);
  } catch (err) {
    console.error("[uploadedReviews] failed to parse spreadsheet buffer:", err);
    throw err;
  }
  console.log("[uploadedReviews] rows parsed:", rows.length);

  const baseFilename = filename.replace(/\.[^./\\]+$/, "") || "Uploaded Reviews";

  if (rows.length === 0) {
    console.warn("[uploadedReviews] 0 rows found, nothing to analyze");
    return {
      product: { asin: "UPLOADED", title: baseFilename },
      reviews: [],
      headers: [],
      detectedTextColumn: null,
    };
  }

  const headers = Object.keys(rows[0]);
  console.log("[uploadedReviews] headers:", headers);

  const textHeader = detectTextColumn(headers, rows);
  const ratingHeader = findExactHeader(headers, RATING_HEADER_CANDIDATES);
  const titleHeader = findExactHeader(headers, TITLE_HEADER_CANDIDATES);
  const asinHeader = findExactHeader(headers, ASIN_HEADER_CANDIDATES);
  console.log("[uploadedReviews] detected columns:", { textHeader, ratingHeader, titleHeader, asinHeader });

  const reviews = [];
  if (textHeader) {
    rows.forEach((row, index) => {
      const text = String(row[textHeader] ?? "").trim();
      if (!text) return;

      const ratingRaw = ratingHeader ? Number(row[ratingHeader]) : NaN;
      reviews.push({
        id: index + 1,
        text,
        rating: Number.isFinite(ratingRaw) ? ratingRaw : null,
      });
    });
  } else {
    console.warn("[uploadedReviews] no text column detected — every candidate header and length heuristic missed");
  }
  console.log("[uploadedReviews] reviews extracted:", reviews.length);

  const asin = asinHeader ? mostCommonValue(rows, asinHeader) : "";
  const title = titleHeader ? mostCommonValue(rows, titleHeader) : "";

  return {
    product: {
      asin: asin || "UPLOADED",
      title: title || baseFilename,
    },
    reviews,
    headers,
    detectedTextColumn: textHeader,
  };
}
