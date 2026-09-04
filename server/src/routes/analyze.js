import { Router } from "express";
import multer from "multer";
import { analyzeAsin, analyzeUploadedFile, previewUpload } from "../services/analysisService.js";

const router = Router();

const ASIN_PATTERN = /^[A-Z0-9]{10}$/i;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/analyze", async (req, res) => {
  const { asin } = req.body ?? {};

  if (typeof asin !== "string" || !ASIN_PATTERN.test(asin.trim())) {
    return res.status(400).json({
      error: "Please provide a valid 10-character Amazon ASIN.",
    });
  }

  try {
    const result = await analyzeAsin(asin.trim().toUpperCase());
    res.json(result);
  } catch (err) {
    console.error("[route:/analyze] analyzeAsin threw:", err);
    res.status(err.status ?? 502).json({ error: err.message });
  }
});

// Parses/validates an upload without running AI calls, so the client can
// show an accurate "N reviews found" status before analysis starts.
router.post("/analyze/preview", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please choose a CSV or XLSX file to upload." });
  }

  try {
    const result = await previewUpload(req.file.buffer, req.file.originalname);
    res.json(result);
  } catch (err) {
    console.error("[route:/analyze/preview] previewUpload threw:", err);
    res.status(err.status ?? 502).json({ error: err.message });
  }
});

router.post("/analyze/upload", upload.single("file"), async (req, res) => {
  console.log("[route:/analyze/upload] request received, req.file:", req.file ? {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  } : null);

  if (!req.file) {
    console.warn("[route:/analyze/upload] no file on request, rejecting");
    return res.status(400).json({ error: "Please choose a CSV or XLSX file to upload." });
  }

  try {
    console.log("[route:/analyze/upload] calling analyzeUploadedFile...");
    const result = await analyzeUploadedFile(req.file.buffer, req.file.originalname);
    console.log("[route:/analyze/upload] analysis complete, reviewCount:", result.reviewCount);
    res.json(result);
  } catch (err) {
    console.error("[route:/analyze/upload] analyzeUploadedFile threw:", err);
    res.status(err.status ?? 502).json({ error: err.message });
  }
});

export default router;
