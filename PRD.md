# PRD: Renewal Rescue Desk

Team: Popcorn Prophets | Event: REPH AI Summit 2026 Academe Hackathon | Track: 5, Customer Support Agent (combined with renewal data)

Status: draft. Items marked **[UNVERIFIED]** have not been checked against the data.

---

## 1. Summary

Renewal Rescue Desk is a ranked work queue for customer success managers (CSMs). It combines three signals that live in separate systems (product usage, support cases, renewals) to surface accounts that need attention before they renew. For each flagged account it shows the evidence, has an AI write a cited brief and propose next actions, and drafts the outreach for the CSM to approve, edit or dismiss.

It answers the Track 5 question "Which customers show signs they may leave?" and touches the track goal ("draft ... grounded answers"). It is a prioritization aid, not a churn predictor.

## 2. Problem

- 1,600 of 12,000 customers churned, losing about $87.7M ARR (about $55K each).
- The warning signs sit in three places: `product_usage_monthly`, `support_cases` and `renewal_opportunities`. No one sees them together, so an account can look acceptable in each view while heading out.
- A CSM owns many accounts and cannot read every case and usage chart.

### Evidence from the data (exploratory)

| Finding                                         | Number                                                     | Caveat                                                      |
| ----------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| Churned customers' usage, months before churn   | flat about 520 sessions until month -4, then 388, 244, 151 | Measured close to churn; a symptom as much as a warning     |
| Escalated case in last 90 days, forward-looking | precision 16%, recall 56%, lift 10x                        | In-sample                                                   |
| Usage drop >25% alone                           | flags 30% of customers; precision 3%, lift 1.9x            | Weak alone                                                  |
| Usage drop >25% AND escalated case              | precision 30%, recall 37%, lift 19x, flags 2%              | In-sample                                                   |
| Top 100 accounts per month by score             | precision 23% vs base rate 1.6% (15x)                      | In-sample                                                   |
| Lead time for churners flagged (score >= 5)     | median 38 days; 59% at least 30 days, 31% at least 60 days | Churn date equals subscription end date for 60% of churners |

Backtest method: monthly as-of dates from 2024-04 to 2026-06; active customers with usage history; label is churn within 90 days; base rate 1.6%.

Known weaknesses of this evidence:

- Thresholds were chosen after seeing the data (in-sample).
- The data is synthetic.
- Possible leakage if `escalated` is set after case creation **[UNVERIFIED]**.
- Panel rows overlap across months.
- No Strategic-tier customer has churned (0 of 638), so that tier shows no risk signal.

## 3. Users

**Primary: account owner / CSM.** The data has the role (`customers.account_owner_employee_id`, `renewal_opportunities.owner_employee_id`). Actual job titles in `employees` are **[UNVERIFIED]**.

**Secondary: head of customer success.** Portfolio view (ARR at risk, actions taken) and the decision log.

**Not users:** customers. The product never ranks or scores employees (hackathon rule).

Persona for the pitch: a CSM owns about 80 accounts; one is worth $80K and renews in 45 days; nothing tells her it is at risk.

## 4. Goals and non-goals

### Goals

- G1: Produce a ranked queue of at-risk accounts with readable reasons.
- G2: Show the evidence behind every flag so a CSM can verify it.
- G3: Use AI where it changes the outcome (cited brief, next-action proposals, outreach draft, extraction of unseen input).
- G4: Keep a human decision on every action, with a log.
- G5: Run one complete input-to-outcome scenario live, including an unseen account supplied by a judge.

### Non-goals

- Training or tuning a model.
- Sending any email or writing to any real system.
- Accurate per-customer churn probabilities.
- Ranking or comparing CSMs or support agents.
- A general chatbot or knowledge assistant.
- Answering the other two Track 5 questions (case routing, copilot effect). See section 10.

## 5. Success criteria (demo)

- A flagged account goes from queue to approved draft in one live run with no manual staging.
- A judge-provided account (CSV, JSON or pasted text) is scored through the same flow.
- Every claim in the AI brief is linked to a case ID or usage month, and uncited claims are not shown.
- The reliability panel shows the backtest numbers and caveats.
- All simulated, hardcoded or manual parts are disclosed on screen or in the pitch.

## 6. Functional requirements

Priority: **M** must, **S** should, **X** stretch.

### 6.1 Data and signals

| ID  | Pri | Requirement                                                                                                                                                                               |
| --- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1  | M   | Load `customers`, `subscriptions`, `product_usage_monthly`, `support_cases`, `case_interactions`, `renewal_opportunities`, `products` into Postgres (bulk `COPY`).                        |
| F2  | M   | Use a fixed as-of date (data ends 2026-09-30) and display it. Never use the system date.                                                                                                  |
| F3  | M   | Eligible accounts: customers with an active subscription and usage history. Exclude Prospects and already-churned customers.                                                              |
| F4  | M   | Compute per account: usage trend (sessions, last 3 months vs prior 3), escalated cases in last 90 days, average CSAT in last 90 days, case count in last 90 days, ARR, next renewal date. |
| F5  | M   | Score by additive points and store each triggered rule as a readable reason (see 6.2).                                                                                                    |
| F6  | M   | Rank by score, then ARR and renewal proximity.                                                                                                                                            |

### 6.2 Scoring rules (thresholds are team choices, not validated)

| Signal                               | Points |
| ------------------------------------ | ------ |
| Usage down more than 50%             | +5     |
| Usage down more than 25%             | +3     |
| At least 1 escalated case in 90 days | +2     |
| Average CSAT under 3.5 in 90 days    | +1     |
| 2 or more cases in 90 days           | +1     |

Escalation did most of the work in the backtest, and usage drop alone is weak. Re-tune the weights against the backtest before the event; do not describe them as validated.

### 6.3 Queue and account views

| ID  | Pri | Requirement                                                                                                   |
| --- | --- | ------------------------------------------------------------------------------------------------------------- |
| F7  | M   | Queue table: customer, ARR, renewal date, score, top reason, state. Filters for segment, region, tier, state. |
| F8  | M   | Account page: usage sparkline, case timeline, list of triggered rules, AI brief, draft.                       |
| F9  | S   | Portfolio header: ARR flagged, accounts renewing within 90 days, pending count.                               |

### 6.4 AI features

| ID  | Pri | Requirement                                                                                                                                                                                                                                           |
| --- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F10 | M   | **Brief:** summary and likely churn driver (one of the dataset's churn reasons), with `evidence[]` items citing a `case_id` or a usage month.                                                                                                         |
| F11 | M   | **Citation check in code:** any evidence ID not present in the input is dropped or flagged. Claims without a valid citation are not displayed.                                                                                                        |
| F12 | M   | **Outreach draft** that uses specifics (product, open case, days waiting), labelled "AI-generated, not sent".                                                                                                                                         |
| F13 | M   | **Unseen input extraction:** the user supplies a CSV, JSON or pasted text; the AI extracts usage series, cases and ARR into the standard schema; the user confirms the extracted values; then the account is scored by the same rules.                |
| F14 | S   | **Next-action proposals:** 2 to 3 options (for example escalate to engineering, offer a call, offer a credit), each citing case rows. The CSM chooses.                                                                                                |
| F15 | S   | **Related-account grouping:** if several flagged accounts share the same open subcategory and product, show one explanation and one draft internal ticket. Grouping is a plain group-by; the AI writes the explanation. Feasibility **[UNVERIFIED]**. |
| F16 | X   | Attach a grounded fix from `knowledge_articles` for the open issue. Only if the articles match the subcategories **[UNVERIFIED]**, and only because it changes the customer's outcome.                                                                |

### 6.5 Decisions and honesty

| ID  | Pri | Requirement                                                                                      |
| --- | --- | ------------------------------------------------------------------------------------------------ |
| F17 | M   | Approve, edit or dismiss (with reason) per account; store in a `decisions` table with timestamp. |
| F18 | M   | Reliability panel: backtest numbers and caveats from section 2.                                  |
| F19 | S   | "Why not flagged" explanation for an account that scores low.                                    |
| F20 | X   | Live backtest view re-computing precision at a chosen as-of date.                                |

## 7. AI design

The rules decide who is at risk, so the ranking is reproducible and explainable. The LLM is used only where it changes the outcome: extraction, explanation, proposing and drafting.

- **Input to the LLM:** computed signals plus only that customer's recent cases (and messages if useful), each with its ID.
- **Output:** structured JSON with `summary`, `likely_driver`, `evidence[]`, `actions[]`, `draft_email`.
- **Grounding:** code verifies every cited ID exists in the input. Missing data is stated, not guessed.
- **Caching:** store responses so the demo does not depend on API latency.

### Data limits on text

Case text is templated: 390,944 interactions contain only 82,603 distinct messages, the top lines are stock replies ("Any update on this? Our users are waiting."), and the average message is about 80 characters. Information lives in the structured fields (category, subcategory, product, priority, escalated, status). The brief should therefore lean on structured fields and treat text as a few sentiment cues.

## 8. Architecture

```
CSV -> Postgres (COPY) -> signal engine (SQL, precomputed customer_health) -> Next.js server actions / route handlers -> UI
                                                                         \-> LLM via src/lib/ai.ts (brief, actions, draft, extraction) -> Zod + citation check
UI -> decisions table
Upload -> parseTable -> LLM extraction -> confirm -> signal engine -> same account page
```

- Stack: the team template `popcorn-prophets/reph-26-template` (disclose it as a starter template). Next.js + TypeScript, Tailwind + shadcn/ui, Recharts, PostgreSQL + Drizzle, Zod, Vercel AI SDK, deployed on AWS EC2 with Docker.
- LLM provider: the template default is OpenRouter. **Planned change to AWS Bedrock (Claude)**, done by adding a Bedrock branch in `getModel()` in `src/lib/ai.ts`. All calls go through `generateStructured()`, so no feature code changes. Confirm the approved endpoint and model access at check-in.
- Features are vertical slices under `src/modules/` (queue, account, ai-brief, upload, decisions), one owner each.
- Planned actions: list accounts, get account detail, generate brief, generate draft, record decision, upload and extract.

## 9. UI outline

1. **Queue:** header totals, filters, table with priority score and top reason chips.
2. **Account page:** left column with signals and triggered rules; right column with the AI brief and evidence links; case timeline below.
3. **Draft panel:** editable text, "AI-generated, not sent" label, Approve / Edit / Dismiss.
4. **Upload:** drop file or paste text, confirm extracted fields, score.
5. **Reliability panel:** collapsible, with backtest numbers and caveats.

Employees appear only as an account-owner label.

## 10. Scope

**Must:** F1 to F8, F10 to F13, F17, F18.
**Should:** F9, F14, F15, F19.
**Stretch:** F16, F20.

Out of scope: routing a new case from text (Track 5 question 1) and the copilot handling-time analysis (question 3). The latter has unresolved evidence in my analysis, so do not promise it.

## 11. Demo script

1. Open with the persona: a CSM, 80 accounts, an $80K account renewing in 45 days.
2. Show the queue, then open the top account.
3. Walk through the signals, the triggered rules, and the cited brief; click an evidence link to the case row.
4. Show the proposed actions and the draft; edit a line; approve; show the decision log.
5. Upload a judge-provided account and run the same flow.
6. Open the reliability panel and state the limits.

## 12. Disclosures

- Data is synthetic and the REPH dataset is the only primary data source.
- Scoring thresholds are team choices, tuned in-sample.
- Drafts are not sent; no external systems are touched.
- Prospects and already-churned customers are excluded from the queue.
- Any hardcoded or cached demo data must be stated.

## 13. Risks and open items

| Item                                                                   | Impact                                  | Action                                                                                                                         |
| ---------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Precision is modest (about 23% in the top 100)                         | Judges may see it as weak prediction    | Present as a prioritized queue with evidence, not a prediction                                                                 |
| Case text is templated                                                 | Thin AI reading                         | Lean on structured fields; emphasize extraction, actions and drafting                                                          |
| `escalated` leakage **[UNVERIFIED]**                                   | Backtest may be optimistic              | Check when the flag is set before quoting numbers                                                                              |
| Related-account grouping **[UNVERIFIED]**                              | F15 may not hold                        | Check overlap of open subcategory and product across flagged accounts                                                          |
| `knowledge_articles` coverage **[UNVERIFIED]**                         | F16 may not hold                        | Check before committing                                                                                                        |
| Employee titles **[UNVERIFIED]**                                       | Persona wording                         | Check `employees`                                                                                                              |
| Strategic tier has 0 churn                                             | Wasted queue slots                      | Consider excluding or treating separately                                                                                      |
| Other teams' entries                                                   | Possible overlap                        | The org page shows 3 public repos (Risk-Tracer, FlowGuard, CSIry), none on Track 5; private repos are invisible                |
| Rules compliance                                                       | Disqualification risk                   | Human approval on every action; no employee ranking; cite all claims                                                           |
| LLM endpoint (template default is OpenRouter, planned move to Bedrock) | Data must not go to unapproved services | Confirm the approved endpoint at check-in; set a real model and a fallback, not `openrouter/free`; disclose in `DISCLOSURE.md` |
| Event laptop setup (Node 24, pnpm, Docker)                             | Lost setup time                         | Check early; fall back to a remote Postgres via `DATABASE_URL`                                                                 |
| Backtest runs offline in pandas                                        | Numbers in the UI would be static       | Port to SQL or show as precomputed and disclose                                                                                |

## 14. Team split (3 people)

- **Data and signals:** loader, signal engine, scoring weights, backtest.
- **Backend and LLM:** API, prompts, citation checker, extraction.
- **Frontend and demo:** UI, decision flow, demo script, disclosures.

## 15. Build order

1. Postgres load and SQL signal engine; print the top accounts.
2. Server actions for queue and account detail.
3. LLM brief and citation checker.
4. UI queue and account page.
5. Draft, actions and decision log.
6. Upload and extraction path.
7. Reliability panel and disclosures.

Steps 1 to 5 are the minimum for a live end-to-end scenario; 6 and 7 cover the unseen-input and honesty requirements.
