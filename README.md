# Review2Hook

Turn Amazon reviews into ad-ready hooks.
把 Amazon 评论变成广告切入点的开源工具。

<!-- screenshot here -->

## What it does

Upload a reviews export (or try the built-in demo) and Review2Hook clusters the pain points, pulls out the exact phrases customers use, drafts ad angle hooks, and writes Chinese-language strategy notes — all in one pass.

上传评论文件（或使用内置演示数据），Review2Hook 会自动聚类用户痛点、提取消费者原声、生成广告角度，并撰写中文策略笔记。

## Features

- **Upload real reviews** — CSV or XLSX, with automatic detection of the review-text column across varying export formats (e.g. SellerSprite). 支持上传真实评论文件，自动识别评论文本所在列。
- **AI-powered analysis** (DeepSeek by default, or any OpenAI-compatible API) — clusters pain points ranked by frequency, extracts verbatim consumer language, generates ad angle hooks, and writes Chinese strategy notes.
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
- **AI**: DeepSeek API by default (`deepseek-chat`); swappable for any OpenAI-compatible API via `.env`

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

Review2Hook uses **DeepSeek by default**, but works with **any OpenAI-compatible API** — OpenAI, Gemini's OpenAI-compat endpoint, or anything else that speaks the same chat-completions format. Swap providers entirely through `server/.env`, no code changes needed.

Review2Hook 默认使用 **DeepSeek**，但支持**任何 OpenAI 兼容的 API**——OpenAI、Gemini 的 OpenAI 兼容接口，或其他兼容该格式的模型均可。只需在 `server/.env` 中配置，无需改代码。

Copy the example env file:

```bash
cp server/.env.example server/.env
```

**Default (DeepSeek):** get a key at **[platform.deepseek.com](https://platform.deepseek.com)** (sign up, top up credits, create a key), and set:

```
DEEPSEEK_API_KEY=sk-...
```

**Using a different provider:** set `API_BASE_URL`, `API_KEY`, and `MODEL` instead — `API_KEY` takes priority over `DEEPSEEK_API_KEY` when both are set. For example, to use OpenAI:

```
API_BASE_URL=https://api.openai.com/v1
API_KEY=sk-...
MODEL=gpt-4o-mini
```

默认使用 DeepSeek：前往 **platform.deepseek.com** 注册账号并创建 API key，填入 `DEEPSEEK_API_KEY`。

想换成其他提供商：改用 `API_BASE_URL`、`API_KEY`、`MODEL` 三个变量即可（两者都设置时 `API_KEY` 优先于 `DEEPSEEK_API_KEY`）。JSON 输出模式的支持情况因模型而异，请选择支持结构化 JSON 输出的模型。

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
