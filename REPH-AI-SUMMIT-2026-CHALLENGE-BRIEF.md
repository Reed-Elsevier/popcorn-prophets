# REPH AI SUMMIT 2026 | ACADEME HACKATHON

## Challenge Brief

### Vision. Value. Velocity.

Accelerating AI impact through real-world solutions.

### The challenge

Use AI to make the Center’s knowledge work faster, safer, and smarter.

Build a working AI-powered prototype on the REPH-provided data and show one full scenario, from input to outcome.

## At a glance

| Item         | Details                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| Date         | October 2, 2026                                                                                                      |
| Build sprint | 10:00 AM – 3:15 PM, onsite (Snowdon & Denali)                                                                        |
| Demos        | 3:15 PM – 5:15 PM (MPH); winners announced at the AI Summit 2026 Closing Ceremony the same day                       |
| Teams        | 3 members, with at least one member who can develop or configure the software. Each participant joins only one team. |
| Output       | A live, working AI-powered prototype, a short write-up and a presentation of up to 10 minutes                        |
| Prizes       | PHP 50,000 (1st), PHP 30,000 (2nd), PHP 20,000 (3rd), subject to eligibility, compliance and REPH confirmation       |

## VISION | VALUE | VELOCITY

- Identify a challenge worth solving and define a clear AI-enabled future state.
- Show relevance through improved quality, productivity, efficiency, experience, risk reduction, or decision-making.
- Build a working prototype onsite and demonstrate the path from problem to outcome.

## 1. Your scenario: the Center

You are joining a fictional Philippine shared services and technology center (“the Center”) with sites in Quezon City and Iloilo. It runs operations, technology and knowledge work for five fictional business divisions of a global information and analytics group.

| Division                             | What the Center does for it                                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Lumina Scholarly & Health Publishing | Journal operations, peer review, content production, XML conversion, research integrity                        |
| Veritas Legal & Professional         | Case law indexing, headnotes, statutes and regulations, regulatory monitoring, legal QA                        |
| Sentinel Risk & Business Analytics   | Identity verification, fraud and anti-money-laundering alerts, KYC, due diligence                              |
| Agora Exhibitions & Events           | Exhibitor services, visitor registration, lead delivery, event customer service                                |
| Group Shared Services                | Finance, HR and learning, IT, the customer service hub, digital transformation and the AI Centre of Excellence |

### The story so far (2022 to September 2026)

- 2022–2023: Manual and rules-based. Work runs on people, spreadsheets and rule engines. Alerts are noisy, invoices arrive by email, and procedures go out of date.
- 2023–2024: Experimentation. A GenAI assistant launches, and hundreds of AI ideas are logged.
- 2025: Pilots to scale. A support copilot scales, a legal classification pilot starts, a production tool is upgraded and AI governance reviews become mandatory.
- 2026: Toward agentic operations. Knowledge, invoice and XML agents are in pilot.

Leaders now need answers: what is really working, what is not, and where should AI go next? Some AI projects clearly pay off, some look good on one number and hurt another, and some of the biggest opportunities are still hidden in the data. That is your job.

### The problem in brief

| Aspect                 | Details                                                                                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Current problem        | High-volume knowledge work (manuscripts, legal updates, fraud alerts, customer cases, invoices, event leads, IT requests) is still largely manual, and AI results are uneven. |
| Who is affected        | Operations teams and analysts, team leads and managers, the Center’s internal and external customers, and leaders deciding where to invest in AI.                             |
| Current way of working | People, spreadsheets, rule engines and email, with some AI copilots and pilots in selected teams.                                                                             |
| Pain points            | Rework and missed deadlines, noisy alerts, knowledge that is hard to find or out of date, manual hand-offs, and AI value that is claimed but not always proven.               |
| Success measures       | Measurable improvement against the baseline metrics in the data package (for example handling time, error or rework rate, false positives, turnaround time).                  |

## 2. The data you get

All data is synthetic: realistic, but fully made up. No real people, customers or companies. It covers about 116 connected tables across 11 areas, with records from January 2022 to September 2026. Tables link to each other through ID columns, so you can combine areas.

| Area              | Examples of what’s inside                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| A. Workforce      | Teams, employees, skills, learning, AI capability levels, hiring, team-level KPIs                  |
| B. Publishing     | Journals, manuscripts, peer reviews, published papers, citations, production jobs, XML defects     |
| C. Legal          | Case law, statutes, legal citations, regulatory updates, editorial tasks                           |
| D. Risk           | Identities, devices, accounts, transactions, watchlists, company ownership, alerts, investigations |
| E. Events         | Events, exhibitors, visitors, badge scans, leads, feedback                                         |
| F. Customers      | Customers, products, subscriptions, product usage, support cases and conversations, churn          |
| G. Finance        | Suppliers, purchase orders, invoices, invoice lines, exceptions, payments, budgets                 |
| H. Technology     | Applications, IT tickets, incidents, changes, access requests, system logs                         |
| I. Process mining | A process event log (case, activity, timestamp, person) for 8 core processes                       |
| J. AI portfolio   | AI use cases, models, projects, governance reviews, AI usage logs, prompts, feedback               |
| K. Knowledge      | Knowledge articles, SOPs, documents, meeting summaries, chat messages, emails, search logs         |

### Folders

- Area folders (A–K): clean tables in CSV and Parquet. Parquet is smaller and faster to load.
- raw/: messy copies of five tables (missing values, typos, mixed date formats, duplicates). Use them if your solution includes data cleaning.
- \_docs/: overview, data dictionary, table diagrams, sample rows and baseline metrics.

### Start here

1. Read \_docs/01_overview.md and the data dictionary (03_data_dictionary.md).
2. Look at \_docs/04_sample_rows.md to see real examples.
3. Check the baseline metrics in \_docs/05_hackathon_package.md. These are the numbers to beat.

The data includes known quality issues and synthetic elements, documented in \_docs/06_data_quality_plan.md. REPH will also hold challenge-specific test cases, including an unseen input judges may use during your live demo.

## 3. Choose a track

All teams work on the same official challenge and data package. Tracks are focus areas within that challenge, not separate competitions. State any assumptions you make during your demo.

Pick one track, or combine tracks. The best ideas often join data across areas, such as suppliers with company ownership, or support cases with product usage.

### 1) Publishing Integrity

Goal: Spot suspicious manuscripts and review behaviour before publication.

Key tables: manuscripts, peer_review_assignments, research_papers_published, citations, authors, institutions, research_integrity_flags

Questions:

- Which reviewers keep reviewing each other’s work, and how fast and how positively?
- Are there groups of papers with near-identical abstracts?
- Which signals best predict an integrity flag?

### 2) Content Production Copilot

Goal: Cut rework and missed deadlines from copyedit to release.

Key tables: content_production_jobs, xml_conversion_defects, research_papers_published

Questions:

- Which production stage is the bottleneck, and since when?
- What changed around it?
- Can you predict defects before QA?

### 3) Legal Research Assistant

Goal: Answer legal research questions and keep content up to date.

Key tables: legal_documents, legal_citations, regulatory_updates, regulatory_update_impacts, editorial_tasks

Questions:

- Is a given case still good law?
- Which jurisdictions miss the 72-hour update deadline most?
- Did the auto-classification pilot improve outcomes, or only speed?

### 4) Fraud & Identity Intelligence

Goal: Find fraud rings, hidden company ownership and noisy alert rules.

Key tables: individuals, devices, addresses, accounts, transactions, watchlists, business_entities, ownership_links, risk_alerts

Questions:

- Which identities share devices, addresses or phones?
- Which ownership chains lead to a watchlisted company?
- Can you score a new transaction and explain why?

### 5) Customer Support Agent

Goal: Triage, draft and resolve customer cases with grounded answers.

Key tables: support_cases, case_interactions, customers, subscriptions, product_usage_monthly, knowledge_articles

Questions:

- Route and prioritise a new case from its text.
- Which customers show signs they may leave?
- Did the support copilot cut handling time without hurting satisfaction?

### 6) Invoice-to-Pay Automation

Goal: Automate accounts payable and catch money leaks.

Key tables: invoices, invoice_lines, invoice_exceptions, payments, purchase_orders, suppliers

Questions:

- Can you detect split and duplicate invoices?
- When and why do invoice exceptions spike?
- Which steps are ready for straight-through processing?

### 7) Process Intelligence & Automation

Goal: Mine the event log to find bottlenecks and automation value.

Key tables: process_event_log, process_definitions, process_activities, automation_candidates, access_request_approvals

Questions:

- What are the common process paths and rework loops?
- Where do hand-offs pile up, and why?
- Is the 2023 automation survey still right?

### 8) Workforce Skills & AI Enablement

Goal: Plan capability building using team-level insights only.

Key tables: employee_skills, skills, learning_records, learning_paths, ai_capability_levels, job_requisitions, performance_metrics_aggregate

Questions:

- Where does demand for AI/data skills outgrow supply?
- Which learning paths move people from Level 1 to Level 2?
- Which team-level factors relate to attrition?

### 9) Enterprise Knowledge RAG

Goal: Build a grounded assistant over SOPs, articles, documents and meetings.

Key tables: knowledge_articles, sops, documents, meetings, action_items, search_logs, chat_messages, emails

Questions:

- Answer a how-to question with citations, and handle conflicting articles.
- Which searches return no results?
- Summarise decisions and open actions for a project.

### 10) Event Lead Intelligence

Goal: Score and route exhibitor leads.

Key tables: events, exhibitors, visitors, registrations, badge_scans, leads, event_feedback

Questions:

- Which leads become customers, and what predicts it?
- Which events and industries produce the best leads?
- What does feedback text say about the visitor experience?

### Cross-area ideas for ambitious teams

- Supplier risk 360: suppliers + company ownership + watchlists.
- Customer health score: usage + support cases + renewals + event leads.
- AI value audit: compare what AI projects claim with what the operational data shows.
- Knowledge gap closer: use zero-result searches and rising case types to draft new articles for review.
- Multi-agent operations: an agent finds a bottleneck in the event log, drafts a process fix and opens a project.

## 4. What you must build

Build something that works. A production-ready system is not required, but at least one complete scenario must run live, from input to outcome.

### Counts as a working prototype

- Accepts user or system input
- Executes genuine application or business logic
- Uses AI as a meaningful part of the outcome
- Processes data or performs a workflow
- Generates a visible and testable output
- Runs live during judging

### Does not qualify

- PowerPoint-only concept
- Static HTML or presentation website
- Wireframe, Figma design, or mockup
- Screenshots presented as software
- Hardcoded or manually staged output
- Recorded demo without live execution

Judges may give you a new test input you haven’t seen, or ask you to repeat your core flow. Disclose anything simulated, mocked, hardcoded, incomplete or dependent on a manual workaround. A backup recording is allowed for contingency, but it does not replace the live demo.

Build onsite: you may prepare your development environment beforehand, but you must not bring a substantially completed application. Open-source libraries, models and starter templates are allowed if disclosed.

## 5. How you’ll be judged

| Criterion                       | Weight | What judges look for                                                                                      |
| ------------------------------- | -----: | --------------------------------------------------------------------------------------------------------- |
| Working prototype functionality |    35% | Does it work from input to outcome? Is the live flow testable, coherent and more than a static interface? |
| Business impact and value       |    25% | Does it address a legitimate problem and show meaningful value for users, customers or the business?      |
| AI utilization                  |    15% | Is AI essential, appropriate and clearly connected to the outcome?                                        |
| Technical feasibility           |    15% | Is the design credible, well scoped, maintainable and ready for further controlled validation?            |
| Presentation and demonstration  |    10% | Are the problem, solution, limitations, live demo and expected value communicated clearly?                |

If there are more entries than demo slots, REPH will run an initial screening to select finalists. The judging panel’s decisions are final.

### Your presentation (up to 10 minutes, including the live demo)

- Make the problem real: open with the user scenario, the friction today, and why it matters.
- Reveal the AI idea: explain the solution in one sentence, why AI is essential, and the outcome it improves.
- Prove it live: run one complete input-to-outcome scenario on the REPH data, then respond to a judge-selected test input if asked.
- Show the value honestly: expected impact, evidence or assumptions, limitations, safeguards and any simulated parts.
- Land the pitch: end with your strongest takeaway and the one next validation step.

## 6. Technology and submission

Use only frameworks, languages, AI models, services and tools approved or permitted by REPH. Source code must be pushed to the GitHub repository. If hosting is needed, deploy on the REPH-approved AWS environment using EC2 or ECS.

| Category                  | Recommended options                                                      |
| ------------------------- | ------------------------------------------------------------------------ |
| AI and machine learning   | OpenAI, Anthropic Claude, or custom machine learning models              |
| Programming languages     | Python, JavaScript, TypeScript, Java, C#, or Go                          |
| Front-end frameworks      | React, Angular, Vue, Next.js, Streamlit, or Gradio                       |
| Back-end frameworks       | FastAPI, Flask, Express.js, Spring Boot, ASP.NET Core, or Node.js        |
| Data storage              | SQLite, PostgreSQL, MySQL, MongoDB, local databases, or vector databases |
| Repository and deployment | GitHub repository for source code; AWS EC2 or ECS for hosted deployment  |

Equipment: each team gets a laptop for the build sprint, plus event credentials and access instructions.

GitHub Copilot: provided to at least one member of each team.

Accounts: use only REPH-approved accounts, credentials, devices and repositories. Don’t share credentials outside your team, and report any suspected misuse.

Support: REPH can help with setup and troubleshooting, but won’t build your solution or write its core logic. You are responsible for making sure your prototype runs in the event environment.

### What to submit (before the build sprint ends)

- Working prototype showing at least one end-to-end scenario, with anything simulated clearly disclosed.
- Short write-up: problem statement, affected users, proposed solution, how AI is applied, tools and technologies, expected impact, scalability and next steps.
- Source and technical artefacts: GitHub repository (or source package), README with setup and test steps, dependency list and configuration notes, any test data needed to run it, and an architecture overview where relevant.
- Prototype declaration: confirm the submission is a demonstration prototype, not production-ready or endorsed by REPH, and that you followed the rules and disclosed simulated parts, dependencies, added data, third-party components, limitations and assumptions.

## 7. Data and responsible AI rules

- Use the REPH data package as your primary and required dataset. Additional public or synthetic data needs REPH’s prior approval and must be disclosed.
- Do not bring in personal, confidential or proprietary data.
- Use the data only for this hackathon. Don’t copy, share or keep it outside the event environment or after the event.
- Don’t present your assumptions, outputs or value estimates as validated REPH findings. Value estimates are preliminary unless backed by data.
- REPH names, logos and materials can’t be used outside the event without written approval.
- Disclose your data changes, generated data, AI models, APIs and reused components.
- No individual performance ranking. Workforce insights must be at team or group level.
- Keep a human in the loop. Where your solution recommends or influences decisions (for example fraud, risk or integrity), show the human review step and explain your reasoning.
- Ground your answers. Assistants should cite the source article or record, and say clearly when no source exists.

### Tips from the organizers

- Pick one clear user and one clear problem. Depth beats breadth.
- Get a thin end-to-end flow working early, then improve it.
- Show the before-and-after: which baseline metric did you beat?
- Look for patterns the data doesn’t label. The best insights are hidden.
- Test your AWS deployment well before demo time.

### After the hackathon

Selected prototypes may be considered for further discussion and development, subject to REPH review and approval:

Prototype → Validation → Controlled pilot → Production

- Prototype (does it work?)
- Validation (is it reliable?)
- Controlled pilot (does it add value?)
- Production (can it scale safely?)

Build to learn. Demonstrate value. Validate the next step.

The objective is not to build the largest solution. It is to show that a meaningful business problem can be addressed with a practical, working, AI-enabled prototype.
