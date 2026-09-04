import { Router } from "express";
import { analyzeAsin } from "../services/analysisService.js";

const router = Router();

const ASIN_PATTERN = /^[A-Z0-9]{10}$/i;

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

export default router;
