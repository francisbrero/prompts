# prompts: Source-of-Truth Repository

Central repo for all prompts, Cursor rules, and multi-step workflows used by sprai and prAI.

## Project Purpose
- Single source of truth for prompts, rules, and workflows
- Clean authoring workflow (Markdown + front-matter)
- Public contributions via PR
- Easy sync by T3 app at build-time

## Folder/Tree Overview
```
prompts/
  research/
    market-landscape-analysis.md
  sales/
    outbound-personalizer.md
rules/
  cursor/
    outbound-phone-rule.md
workflows/
  gtm/
    quarterly-insights-workflow.md
scripts/
  validate.ts
.gitignore
package.json
README.md
```

- Slug = file name (kebab-case, no spaces)
- Category = immediate subfolder (e.g., research, sales)
- Each Markdown file = single asset

## Front-Matter Schema
```yaml
---
title: "Outbound Personalizer"
description: "Generates first-line email copy using firmographic data."
tags: ["sales", "email", "personalization"]
tool: "chatgpt"
example_output: |
  Hi Jane — I noticed your team just...
---
```
All five fields are required. Validation script auto-adds commit author, source_link, and last_updated at sync time (handled by T3 app).

## Contribution Steps
1. Fork → Branch → PR against `main`
2. Run `pnpm lint && pnpm validate` locally (CI will block otherwise)
3. Fill in PR template (categories, summary, testing notes)
4. On merge, GitHub Action re-validates

## Validation Rules
- Filename: kebab-case, .md extension
- Folder: must be inside /prompts, /rules, or /workflows + category subfolder
- Front-matter: all required keys present, no extras
- Tags: array of ≤ 5 kebab-case strings
- Tool: one of chatgpt, cursor, claude, openai, custom
- Markdown body: non-empty

Failure → non-zero exit code.
