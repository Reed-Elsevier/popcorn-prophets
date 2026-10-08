# Renewal Rescue Desk: Short Write-Up

**Team:** Popcorn Prophets **Event:** REPH AI Summit 2026 Academe Hackathon · Track 5, Customer Support Agent (combined with renewal data)

---

## Problem Statement

In the provided dataset, **1,600 of 12,000 customers churned**, losing about **$87.7M in annual recurring revenue (ARR)**, roughly $55K per customer.

The warning signs existed, but they lived in three separate systems: product usage, support cases and renewal records. An account can look acceptable in each view on its own while it is heading toward cancellation. Customer success managers (CSMs) own many accounts each and cannot read every support case and usage chart, so at-risk accounts are often noticed too late to act.

The challenge is not missing data. It is that **no one sees all three signals together, in time**.

## Affected Users or Teams

- **Primary: customer success managers / account owners.** They need to know which accounts to focus on before renewal, and why.
- **Secondary: head of customer success.** Needs a portfolio view of ARR at risk and a record of actions taken.
- **Indirectly: customers.** At-risk customers get earlier, more specific outreach about the issues they are actually experiencing.

The product never ranks or scores employees; staff appear only as an account-owner label.

## Proposed Solution

**Renewal Rescue Desk** is a ranked work queue that surfaces accounts needing attention before they renew. It works in three steps:

1. **Rank every account by risk.** A signal engine joins usage, support cases and renewal data per account and scores it with transparent rules:

   | Signal | Points |
   | --- | --- |
   | Usage down more than 50% (last 3 months vs prior 3) | +5 |
   | Usage down more than 25% | +3 |
   | At least 1 escalated case in 90 days | +2 |
   | Average CSAT under 3.5 in 90 days | +1 |
   | 2 or more cases in 90 days | +1 |

   Each triggered rule is stored as a readable reason. Accounts are ranked by score, then ARR and renewal proximity. These thresholds are team choices and have not been validated.

2. **AI writes a cited brief.** For each flagged account, the AI summarizes what is happening and the likely churn driver. Every claim must cite a real case ID or usage month.

3. **AI drafts the next move.** It proposes next actions and an outreach email, labelled "AI-generated, not sent." The CSM approves, edits or dismisses it, and every decision is logged.

A user can also upload an **unseen account** (CSV, JSON or pasted text). The AI extracts it into the standard format, the user confirms the values, and it is scored by the same rules.

## AI Application

The rules decide **who** is at risk, so the ranking is reproducible and explainable. AI is used where it changes the outcome:

- **Extraction:** turns an unseen, unstructured account file into structured usage, case and ARR data, so new accounts can be assessed without manual data entry.
- **Explanation:** writes a short brief connecting the signals into a likely churn driver, so a CSM understands an account in seconds instead of reading every case.
- **Action proposals:** suggests two to three next actions grounded in the account's actual cases.
- **Drafting:** writes outreach using specifics (product, open case, days waiting) that a CSM can send after review.

**Safeguards built into the AI layer:**

- Output is structured JSON (`summary`, `likely_driver`, `evidence[]`, `actions[]`, `draft_email`), validated with Zod.
- Code checks that every cited ID exists in the input; claims without a valid citation are not displayed.
- Missing data is stated, not guessed.
- A human approves every action; nothing is sent automatically.

Because support message text in the dataset is heavily templated (390,944 interactions contain only 82,603 distinct messages), the AI leans on structured case fields such as category, priority and escalation status rather than message text.

## Tools and Technologies

| Category | Used |
| --- | --- |
| Languages | TypeScript; Python (offline backtest analysis) |
| Framework | Next.js (server actions and route handlers) |
| UI | Tailwind CSS, shadcn/ui, Recharts |
| Data store | SQLite |
| Validation | Zod |
| AI integration | Vercel AI SDK |
| Models / APIs | AWS Bedrock |
| Data analysis | pandas (backtest) |
| Runtime and deployment | Node.js 24, pnpm, SQLite on AWS EC2 |
| Starter template | `popcorn-prophets/reph-26-template` |
| Development assistants | GitHub Copilot |

## Expected Impact or Value

- **Revenue protected:** each churned customer represents about $55K in ARR. As an illustrative example (not a forecast), saving 10 flagged accounts would keep about $550K.
- **Earlier warning:** in a backtest, flagged churners were caught a median of **38 days** before churning; 59% had at least 30 days of warning.
- **Better focus:** the top 100 flagged accounts per month churned at **23%**, against a **1.6%** base rate, about **15×** more concentrated than an unranked list.
- **Faster account review:** CSMs work from one ranked queue with cited reasons instead of checking three systems. Time savings have not yet been measured.
- **Accountability:** every recommendation is cited and every decision is logged.

## Scalability

- **Across segments and regions:** the queue already filters by segment, region and tier, so the same engine can serve regional or segment-based CS teams.
- **Across products:** the scoring rules work on any product with usage, support and renewal data; new products need only data mapping.
- **Across teams:** the same signals can serve support leads (accounts with repeated escalations), account management (renewal prep) and leadership (ARR-at-risk reporting).
- **New signals:** the additive rule design lets teams add signals such as billing issues without retraining a model.
- **New data sources:** the AI extraction path lets teams bring in accounts from other systems or formats without custom integration.

These are proposed extensions and have not been built or tested.

## Next Steps

**Validate**

- Re-tune the scoring rules and test them on data not used for tuning.
- Check when the `escalated` flag is set, to rule out data leakage.
- Run a controlled pilot with a CS team. Compare retention of flagged accounts against a control group, and track how often CSMs approve, edit or dismiss drafts.

**Secure**

- Route all AI calls through an approved endpoint (planned: Claude on AWS Bedrock) so customer data does not go to unapproved services.
- Add access control so CSMs see only their own accounts.
- Keep the decision log as an audit trail.

**Implement**

- Connect read-only to the real usage, support and CRM systems in place of CSV loads.
- Schedule the signal engine to refresh daily.
- Train CSMs on reading the queue and reviewing AI drafts, and collect their feedback to refine the rules.

## Prototype Declaration

> This submission is a hackathon prototype developed for demonstration and evaluation only. It is not production-ready, approved for deployment, or endorsed by REPH for operational use. The team confirms that it has complied with the event rules; used only permitted data, tools, accounts, and services; and disclosed all simulated elements, external dependencies, generated or additional data, third-party components, known limitations, security or privacy considerations, and material assumptions.
