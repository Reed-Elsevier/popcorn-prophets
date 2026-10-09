# Disclosure

Fill in as you build. Required for submission (mechanics §9, §11).

## Dev assistants
- GitHub Copilot Chat in VS Code (Claude model) + skills in `.agents/`
- OpenAI Codex (GPT-6) for deployment diagnosis and configuration.

## AI models / APIs
- Vercel AI SDK via AWS Bedrock: Claude Sonnet 5.5 (primary), Claude Haiku 4.5 (optional fallback in the example configuration); provider/model switchable by env. Confirm approval with REPH.
- "Ask your portfolio" chat (`/ask` page plus a floating widget on every other page): same Bedrock/Claude model, tool-calling over read-only account/case/usage queries; account data in tool results is sent to the model. Agent loop (up to 6 steps) with tools: portfolio overview, account search/detail, case themes/search, AI brief, and `proposeDecision`, which only renders an approval card; a human must click Approve/Dismiss to record a decision.
- Claude Sonnet 5.5 via AWS Bedrock (`global.anthropic.claude-sonnet-5-5`) is configured for the portal deployment, using the server's AWS role.

## Mock, simulated or manual parts
- Brief generation falls back to a deterministic template (labelled "Template fallback" in the UI) when the AI call fails or no AI credentials are set.
- Upload page extracts signals with an LLM and requires user confirmation before deterministic scoring; it does not save the uploaded account to the portfolio.
- Reliability page shows static backtest numbers from an offline pandas analysis (PRD section 2), not recomputed live.
- ARR sums `annual_value_usd` without currency conversion (skeleton).

## Additional / generated data (approved only)
- The user confirmed the supplied local dataset is synthesized and approved its upload to Hackathon Deploy. Only the five F_customer CSVs used by the loader are uploaded: customers, subscriptions, product_usage_monthly, support_cases, and renewal_opportunities. These files remain excluded from Git and the Docker build context.

## External services & reusable components
- Team starter template `popcorn-prophets/reph-26-template` (basic dev environment only, no product features), copied into this repo
- Next.js, shadcn/ui (+ AI Elements and Kibo UI registry components), Drizzle, Better Auth (optional), SQLite (libSQL), AWS EC2 + Docker
- Organiser-provided Hackathon Deploy portal builds the repository Dockerfile on AWS EC2 and supplies an AWS role for Bedrock. The portal offers automatic deployment repair using Claude.

## Known gaps / controls needed for a pilot
- The standalone Docker image initializes an empty SQLite schema. At startup it loads approved uploaded CSVs from DATA_DIR when present, using the existing scoring rules. Local databases and data files are excluded from the image.
- SQLite state is stored in the container and can be lost when the container is replaced. A persistent database volume is needed before a pilot.
