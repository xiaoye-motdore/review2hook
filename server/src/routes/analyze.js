import { Router } from "express";
import multer from "multer";
import { analyzeAsin, analyzeUploadedFile } from "../services/analysisService.js";

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

  const result = await analyzeAsin(asin.trim().toUpperCase());
  res.json(result);
});

router.post("/analyze/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please choose a CSV or XLSX file to upload." });
  }

  try {
    const result = await analyzeUploadedFile(req.file.buffer, req.file.originalname);
    res.json(result);
  } catch (err) {
    res.status(err.status ?? 400).json({ error: err.message });
  }
});

export default router;
