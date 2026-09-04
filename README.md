# Hookminer

Paste an Amazon ASIN, get back clustered review pain points, the exact
consumer language behind them, suggested ad angles, and Chinese-language
strategy notes.

## Status

Mock data only for now:

- `server/src/data/reviews.js` returns 30 hardcoded reviews for a garden
  pruning shear, regardless of the ASIN submitted. Swap this for a real
  review-fetching integration later.
- `server/src/ai/analyzer.js` builds prompts (see `server/src/ai/prompts.js`)
  but returns mock structured output instead of calling a model. Swap the
  function bodies for real API calls later — the prompt templates and
  return shapes are already in place.

## Structure

```
client/   React + TypeScript + Tailwind frontend
server/   Node.js + Express backend
  src/data/      review data fetching (mock for now)
  src/ai/        prompt templates + analysis functions (mock for now)
  src/services/  orchestrates data + AI layers
  src/routes/    HTTP layer
```

## Run it

```bash
npm install
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3001 (proxied under `/api` by Vite)
