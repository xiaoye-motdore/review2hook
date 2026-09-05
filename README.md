# Review2Hook

Turn Amazon reviews into ad-ready hooks.
把 Amazon 评论变成广告切入点的开源工具。

<!-- screenshot here -->

## What it does

Upload a reviews export (or try the built-in demo) and Review2Hook clusters the pain points, pulls out the exact phrases customers use, drafts ad angle hooks, and writes Chinese-language strategy notes — all in one pass.

上传评论文件（或使用内置演示数据），Review2Hook 会自动聚类用户痛点、提取消费者原声、生成广告角度，并撰写中文策略笔记。

## Features

- **Upload real reviews** — CSV or XLSX, with automatic detection of the review-text column across varying export formats (e.g. SellerSprite). 支持上传真实评论文件，自动识别评论文本所在列。
- **AI-powered analysis** (DeepSeek `deepseek-chat`) — clusters pain points ranked by frequency, extracts verbatim consumer language, generates ad angle hooks, and writes Chinese strategy notes.
- **Top Finding summary** — the single highest-impact pain point, best-matching ad angle, and a real consumer quote, at a glance.
- **What to do next** — actionable recommendations: pure-Chinese instructions with the underlying English evidence shown separately, never mixed inline.
- **Live analysis progress** — a multi-step animated indicator so the wait feels productive, not broken.
- **Bilingual UI** — English / 中文 toggle, persisted across sessions. The toggle only affects UI chrome — the underlying analysis output is untouched.
- **Export** — copy a formatted report to the clipboard, or download as PDF.
- **Demo mode** — try it instantly with built-in sample reviews, no upload required.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **File parsing**: ExcelJS (`.xlsx`/`.xls`), PapaParse (`.csv`)
- **AI**: DeepSeek API (`deepseek-chat`, OpenAI-compatible)

No database — every request is processed statelessly in memory.
无数据库，每次请求均为无状态的内存处理。

## Getting Started

### 1. Clone

```bash
git clone https://github.com/xiaoye-motdore/review2hook.git
cd review2hook
```

### 2. Install dependencies

```bash
npm install
```

This installs the root, `client/`, and `server/` dependencies (via `postinstall`).
此命令会自动安装根目录、`client/` 和 `server/` 的依赖。

### 3. Configure your API key

Copy the example env file:

```bash
cp server/.env.example server/.env
```

Then get a DeepSeek API key at **[platform.deepseek.com](https://platform.deepseek.com)** (sign up, top up credits, create a key), and paste it into `server/.env`:

```
DEEPSEEK_API_KEY=sk-...
```

请前往 **platform.deepseek.com** 注册账号并创建 API key，然后填入 `server/.env` 文件中的 `DEEPSEEK_API_KEY`。

`.env` is gitignored — never commit real API keys.
`.env` 已被 gitignore，请勿提交真实密钥。

### 4. Run it

```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3001 (proxied under `/api` by Vite)

## Project Structure

```
client/   React + TypeScript + Tailwind frontend
server/   Node.js + Express backend
  src/data/      review data fetching — demo data + CSV/XLSX upload parsing
  src/ai/        prompt templates + DeepSeek analysis calls
  src/services/  orchestrates data + AI layers
  src/routes/    HTTP layer
```

## License

MIT © 2026 xiaoye-motdore
