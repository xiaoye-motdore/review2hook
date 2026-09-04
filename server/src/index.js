import { fileURLToPath } from "node:url";
import path from "node:path";
import express from "express";
import cors from "cors";
import analyzeRouter from "./routes/analyze.js";

try {
  const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env");
  process.loadEnvFile(envPath);
} catch {
  // No server/.env present — fall back to real environment variables.
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api", analyzeRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`hookminer server listening on http://localhost:${PORT}`);
});
