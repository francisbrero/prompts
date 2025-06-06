# PRD: **`prompts`** Source-of-Truth Repository

**Purpose**: Central, version-controlled store for all prompts, Cursor rules, and multi-step workflows used by *sprai and prAI*.

| Field                 | Value                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------- |
| **Owner**             | Francis Brero                                                                           |
| **Repo URL**          | [https://github.com/francisbrero/prompts](https://github.com/francisbrero/prompts)      |
| **Stack**             | pnpm · Node 18+ · TypeScript                                                            |
| **Primary Consumers** | 1) Public readers (via T3 site sync) 2) Francis (author) 3) External contributors (PRs) |
| **Release Target**    | Initialize repo & CI in next sprint                                                     |

---

## 1 · Problem & Goal

Content (prompts, rules, workflows) is scattered across personal notes and social posts, making reuse and contribution hard.
This repo will act as **single source of truth**, enabling:

* **Clean authoring workflow** (Markdown + front-matter).
* **Public contributions via PR** with automated lint/validation.
* **Easy sync by the T3 app** at build-time.

---

## 2 · In-Scope (v1)

| Area          | Included                                                 | Excluded (Future)                                                |
| ------------- | -------------------------------------------------------- | ---------------------------------------------------------------- |
| Folders       | `/prompts`, `/rules`, `/workflows`, each sub-categorised | Docs export, JSON index build                                    |
| Format        | Markdown (`.md`) with YAML front-matter                  | JSON & tool-specific formats (except sample rule JSON if needed) |
| Metadata      | `title`, `description`, `tags`, `tool`, `example_output` | Popularity stats, version diffing                                |
| Validation    | Node script + CI action                                  | GitHub bot comments                                              |
| Contributions | PRs with template + README guide                         | Automated PR labels                                              |

---

## 3 · Directory & Naming Convention

```
/prompts/
  research/
    market-landscape-analysis.md
  sales/
    outbound-personalizer.md
/rules/
  cursor/
    outbound-phone-rule.md
/workflows/
  gtm/
    quarterly-insights-workflow.md
/scripts/
  validate.ts
.gitignore
package.json
README.md
```

* **Slug = file name** (kebab-case, no spaces).
* Category is the immediate subfolder (`research`, `sales`, etc.).
* Each Markdown file contains a single asset.

---

## 4 · Front-Matter Schema

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

*All five fields are **required***.
The validation script auto-adds commit `author`, `source_link`, and `last_updated` at sync time (handled downstream by T3 app).

---

## 5 · Contribution Workflow

1. **Fork ➔ Branch ➔ PR** against `main`.
2. Run `pnpm lint && pnpm validate` locally (CI will block otherwise).
3. PR template prompts author to fill in categories, summary, and testing notes.
4. On merge, GitHub Action re-validates.

---

## 6 · Validation Rules (v1)

| Check             | Rule                                                                         |
| ----------------- | ---------------------------------------------------------------------------- |
| Filename          | kebab-case, `.md` extension                                                  |
| Folder            | Must exist inside `/prompts`, `/rules`, or `/workflows` + category subfolder |
| Front-matter keys | All required keys present, no extras                                         |
| Tags              | Array of ≤ 5 kebab-case strings                                              |
| Tool              | One of `chatgpt`, `cursor`, `claude`, `openai`, `custom`                     |
| Markdown body     | Non-empty                                                                    |

Failure → non-zero exit code.

---

## 7 · Tasks for Cursor AI Coder

> Each task is **self-contained**, ends with a **build/validate step**, and links official docs for speed.
> Run commands from repo root using **pnpm**.

### **Task 1 — Repo Bootstrap**

1. `git init` (if not already) → add `.gitignore` (`node_modules`, `.DS_Store`).
2. `pnpm init -y`  (set `name`, `author`).
3. Add **pnpm** workspace config (root only).
4. Create folders: `/prompts`, `/rules`, `/workflows` with `.gitkeep`.
5. **Verify**: `pnpm install` (no deps yet) ✔️

**Docs**

* pnpm init → [https://pnpm.io/cli/init](https://pnpm.io/cli/init)

---

### **Task 2 — README & PR Template**

1. Write `README.md` covering: project purpose, folder/tree overview, front-matter schema, contribution steps.
2. Add `.github/PULL_REQUEST_TEMPLATE.md` with checklist (ran `pnpm validate`, added tags).
3. **Verify**: `pnpm build` (noop) ✔️

**Docs**

* PR templates → [https://docs.github.com/en/github/building-a-strong-community/about-pull-request-templates](https://docs.github.com/en/github/building-a-strong-community/about-pull-request-templates)

---

### **Task 3 — Validation Script**

1. `pnpm add -D typescript ts-node gray-matter fs-extra chalk glob`
2. `scripts/validate.ts`:

   * Loop through `/prompts|rules|workflows/**/*.md`
   * Parse front-matter (gray-matter)
   * Enforce rules (see §6)
   * Print colored errors, exit 1 on failure
3. Add `"validate": "ts-node scripts/validate.ts"` to `package.json`.
4. **Verify**: Run `pnpm validate` (should pass with empty folders).

**Docs**

* gray-matter → [https://github.com/jonschlinkert/gray-matter](https://github.com/jonschlinkert/gray-matter)
* glob v9 → [https://github.com/isaacs/node-glob#readme](https://github.com/isaacs/node-glob#readme)

---

### **Task 4 — Example Content**

1. Create `prompts/research/market-landscape-analysis.md` with valid (dummy) content.
2. `pnpm validate` should still pass.
3. **Verify**: commit passes.

---

### **Task 5 — GitHub Actions CI**

1. Add `.github/workflows/ci.yml`:

```yaml
name: CI
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: "latest" }
      - run: pnpm install --frozen-lockfile
      - run: pnpm validate
```

2. **Verify**: Push branch, ensure CI green.

**Docs**

* GitHub Actions + pnpm → [https://github.com/pnpm/action-setup](https://github.com/pnpm/action-setup)

---

### **Task 6 — Pre-Commit Hook (optional but recommended)**

1. `pnpm add -D husky`
2. `npx husky install && pnpm pkg set scripts.prepare="husky install"`
3. `npx husky add .husky/pre-commit "pnpm validate"`
4. **Verify**: Commit any change – hook blocks on failures.

**Docs**

* Husky v9 → [https://typicode.github.io/husky](https://typicode.github.io/husky)

---

## 8 · Acceptance Criteria

* Repo builds with `pnpm validate` returning **0**.
* At least one sample prompt present.
* CI workflow passes on pushes / PRs.
* README clearly documents schema and contribution process.
