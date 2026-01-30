# Verdent Deck - https://verdent.ai

Verdent Deck is a desktop agent control center from Verdent AI that enables developers to plan, run, and validate autonomous coding agents to produce production-ready code and manage changes via integrated Git worktrees.

## General Info

### Classification
- Code/Editor
- Code/Autonomous agent
- Product/Prototyping

### Version
- 2025-2026 (active development, early access)
  - Multi-model support added (Claude Sonnet, Opus 4.5, Gemini 3 Pro, GPT-5 with Codex)

### Repo
- Proprietary product — no public GitHub repo discovered

### Rating
- [4] Strong plan-first orchestration, parallel subagent execution, and git worktree integration
- [3] Early-stage product with commercial pricing model

### Short Description
- Desktop control center for Verdent AI that orchestrates plan-first autonomous coding agents, runs parallel subagents with repository-wide indexing, validates changes, and manages commits/rollbacks via Git worktrees from a native desktop interface.

### Description
Verdent (Verdent AI) is a recent, outcome-driven developer tooling platform that focuses on agentic workflows rather than line-level code completions. Verdent Deck is the desktop application counterpart to Verdent's VS Code integration — a visual control center for running multiple isolated agent sessions, assigning tasks, reviewing diffs, and committing or rolling back changes. It emphasizes an iterative plan-first approach where developers provide high-level goals, Verdent decomposes them into executable plans, runs specialized subagents (often in parallel), and returns validated results for developer review.

Key capabilities include project-wide code indexing, plan decomposition, parallel subagent execution, automated validation and diffs (DiffLens-like UI), Git worktree integration (create commits, open PRs, rollbacks), and session/task management across long-running horizons. The Deck app initially targeted macOS (M-series and later) with cross-platform support planned.

### Languages
- Any
- JavaScript
- TypeScript
- Python
- Go
- Java
- Rust
- C/C++
- HTML/CSS
- SQL
- Shell

### Notes
- Product name: user asked for "Verdent Desk" — the product is commonly referred to as Verdent Deck (desktop app); Verdent also offers a VS Code extension.
- Verdent positions itself as an outcome-driven assistant that emphasizes plan-first decomposition, parallel agent execution, and validation stages to produce higher-quality, production-ready code compared with line-completion tools.
- Early access / paid subscription model with credits was reported in public coverage; detailed pricing and enterprise plans should be confirmed on the vendor site.
- Verdent aims to reduce manual overhead by letting agents handle repetitive engineering work while humans focus on strategy and validation.
- Sources: Vendor and press coverage (product announcements and interviews, 2025), early user reports and blog posts discussing Verdent's plan-first approach and Deck application.
- 2025-2026 updates: Built-in AI code reviews for security, quality, and best practices with direct Git commit support. Reasoning depth controls and planning mode toggle. Multi-model support added (Claude Sonnet, Opus 4.5, Gemini 3 Pro, GPT-5 with Codex). Proactive clarifying questions for vague tasks. Parallel task management for concurrent background code generation. Demonstrated real-time building of complete applications including HTML/CSS/JS frontend, APIs, database setup, testing, and documentation. Founded by TikTok's former head of algorithms.

### Last Update
2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - 7-day free trial with 100 credits.

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes

### Tools
- Yes

### Resources
- Yes

### ACP
- No

## Deployment

### BYOK
- No
  - No public documentation found for BYOK support.

### Local Offline
- No
  - Cloud-first product; local-only operation not advertised

## Developer Experience

### Context Management
- Yes
  - Verdent indexes full repositories and maintains long-horizon session context so agents can reason about project-wide structure rather than only the active file.

### Direct File References
- Yes
  - Integrates with repo files and exposes relevant files to agents; VS Code extension offers in-editor actions while Deck manages sessions and diffs.

### Checkpoints
- Yes
  - Git worktree integration provides commit/rollback and branch management per agent session to prevent unwanted repository-level collisions.

### Git Support
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
- No
  - No public documentation found.

### SlashCommands
- No
  - No public documentation found.

### Skills
- No

### Custom Modes
- No
  - No public documentation found.

### Subagents
- Yes
  - Work is decomposed and routed to specialized subagents that execute in parallel where appropriate.

