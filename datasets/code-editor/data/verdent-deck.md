# Code/Editors

AI Native Dev Code Editor category

**Dataset ID:** code-editor

## MCP-Client

### MCP-Client

- No

### Prompts

- Yes

### Tools

- Yes

### Resources

- Yes

## General Info

### Classification

- Code/Editor
- Code/Autonomous agent
- Product/Prototyping

### Version

- 2025 (initial public/early access)

### Repo

- Proprietary product — no public GitHub repo discovered

### Rating

- -

### Short Description

Verdent Deck is a desktop agent control center from Verdent AI that enables developers to plan, run, and validate autonomous coding agents to produce production-ready code and manage changes via integrated Git worktrees.

### Description

Verdent (Verdent AI) is a recent, outcome-driven developer tooling platform that focuses on agentic workflows rather than line-level code completions. Verdent Deck is the desktop application counterpart to Verdent's VS Code integration — a visual control center for running multiple isolated agent sessions, assigning tasks, reviewing diffs, and committing or rolling back changes. It emphasizes an iterative plan-first approach where developers provide high-level goals, Verdent decomposes them into executable plans, runs specialized subagents (often in parallel), and returns validated results for developer review.

Key capabilities include project-wide code indexing, plan decomposition, parallel subagent execution, automated validation and diffs (DiffLens-like UI), Git worktree integration (create commits, open PRs, rollbacks), and session/task management across long-running horizons. The Deck app initially targeted macOS (M-series and later) with cross-platform support planned.

## Languages

- Any (multi-language support via AI backends)
- JavaScript / TypeScript
- Python
- Go
- Java
- Rust
- C/C++
- HTML/CSS
- SQL
- Shell scripts

## Licensing

### Opensource

- No

### License

- Proprietary

### FreeTrial

- -

## Deployment

### BYOK

- -

### LocalOffline

- No (cloud-first product; local-only operation not advertised)

## Developer Experience

### ContextManagement

- Yes
  - Verdent indexes full repositories and maintains long-horizon session context so agents can reason about project-wide structure rather than only the active file.

### DirectFileReferences

- Yes
  - Integrates with repo files and exposes relevant files to agents; VS Code extension offers in-editor actions while Deck manages sessions and diffs.

### Checkpoints

- Yes
  - Git worktree integration provides commit/rollback and branch management per agent session to prevent unwanted repository-level collisions.

### GitSupport

- Yes
  - Built-in workflows for creating commits, opening pull requests, and rolling back changes from the Deck interface.

## Extensible

### Extensible

- Yes
  - Platform exposes agentic workflows and configuration (rules/policies) to steer agent behavior across projects.

### Plugins

- Yes
  - Verdent provides a VS Code extension to bring Deck-style agent capabilities into the editor.

### Hooks

- -

### SlashCommands

- -

### CustomModes

- -

### Subagents

- Yes
  - Work is decomposed and routed to specialized subagents that execute in parallel where appropriate.

## Ungrouped Criteria

### Terminal

- Yes
  - Integrates with developer workflows and git; Deck is focused on high-level orchestration rather than being a terminal IDE replacement.

### Notes

- Product name: user asked for "Verdent Desk" — the product is commonly referred to as Verdent Deck (desktop app); Verdent also offers a VS Code extension.
- Verdent positions itself as an outcome-driven assistant that emphasizes plan-first decomposition, parallel agent execution, and validation stages to produce higher-quality, production-ready code compared with line-completion tools.
- Early access / paid subscription model with credits was reported in public coverage; detailed pricing and enterprise plans should be confirmed on the vendor site.

### Last Update

- 2025-11

### SpecDrivenDevelopment

- Tessl (conceptually aligns with outcome-driven planning and spec-to-code workflows)

### General Info

- Verdent aims to reduce manual overhead by letting agents handle repetitive engineering work while humans focus on strategy and validation.

### RepositoryActive

- -

### Rating-Criteria

- -


## Sources / Further Reading

- Vendor and press coverage (product announcements and interviews, 2025)
- Early user reports and blog posts discussing Verdent's plan-first approach and Deck application


---

*Generated note: verdent-deck.md*
