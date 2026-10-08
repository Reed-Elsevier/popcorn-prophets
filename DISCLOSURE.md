# Disclosure

Fill in as you build. Required for submission (mechanics §9, §11).

## Dev assistants
- GitHub Copilot Chat in VS Code (Claude model) + skills in `.agents/`

## AI models / APIs
- Vercel AI SDK via AWS Bedrock (Claude; provider/model switchable by env). Confirm approval with REPH.

## Mock, simulated or manual parts
- Brief generation falls back to a deterministic template (labelled "Template fallback" in the UI) when the AI call fails or no AI credentials are set.
- Upload page (skeleton) scores pasted JSON signals only; no LLM extraction yet.
- Reliability page shows static backtest numbers from an offline pandas analysis (PRD section 2), not recomputed live.
- ARR sums `annual_value_usd` without currency conversion (skeleton).

## Additional / generated data (approved only)
-

## External services & reusable components
- Team starter template `popcorn-prophets/reph-26-template` (basic dev environment only, no product features), copied into this repo
- Next.js, shadcn/ui (+ AI Elements and Kibo UI registry components), Drizzle, Better Auth (optional), SQLite (libSQL), AWS EC2 + Docker

## Known gaps / controls needed for a pilot
-
