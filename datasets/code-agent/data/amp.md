# Amp - https://sourcegraph.com/amp
A research-preview, agentic AI coding assistant from Sourcegraph that focuses on autonomous, multi-step code reasoning and high-quality code edits rather than simple autocomplete. Runs as a VS Code extension and a CLI, and integrates with the Model Context Protocol (MCP) and project-level AGENT.md conventions to produce context-aware changes.

## General Info

### Classification

- Code/Autonomous agent

### Version
- Standalone product (spun out from Sourcegraph as independent company in 2025; continuous release cycle through Dec 2025)

### Repo
- Proprietary (no main public repository)
  - Example/demo: https://github.com/sourcegraph/amp-demo
  - Related: https://github.com/sourcegraph/cra-github (Amp Code Review app)

### Rating
- [4] Interface / UX (user-reported)
- [4] Code quality
- [4] Input processing (understanding intent)
- [3] Accuracy
- [3] Documentation / Community support
- [3] Update cadence / shipping

### Short Description
- Agentic AI coding assistant (VS Code extension + CLI) from Sourcegraph that performs multi-step autonomous code reasoning and coordinated repository edits using high-quality models and project-aware context.

### Description
Amp is designed as an "agentic" coding assistant that can autonomously reason through multi-step programming tasks, propose and apply coordinated code edits, and collaborate via shared conversation threads. It prioritises quality over token limits, dynamically selects high-quality models (e.g., Claude Sonnet 4 where available), and exposes both an IDE extension and a CLI for flexible workflows.

### Languages
- Any

### Notes
- Agentic design: Amp works as an autonomous agent that can perform multi-step reasoning, gather context from the repo, and iteratively refine changes.
- AGENT.md integration: Amp reads project AGENT.md files to adopt repo-specific conventions and standards, improving alignment with existing codebase patterns.
- Extended thinking: Supports adjustable "thinking budget" for deeper, higher-quality reasoning on complex tasks.
- Thread sharing & collaboration: Conversation threads can be synced and shared to a web console for team collaboration, knowledge sharing, and reproducibility of AI-driven change sequences.
- Command allowlisting: Security control that limits which shell/CLI commands the agent may execute, stored with project settings.
- Dual environment: Both VS Code extension and CLI are available — the CLI enables parallel, lightweight agent runs; the extension surfaces suggestions inline while preserving developer workflows.
- Security & testing: Best used alongside automated security testing (DAST/SAST) to catch vulnerabilities introduced during rapid AI-driven edits.
- Use cases: large-scale refactors, implementing cross-cutting features, writing complex algorithms, creating board-level changes spanning multiple files.
- Market position: Positioned as a next-generation, high-quality AI coding agent for teams wanting autonomous assistance beyond standard completion tools.
- 2025-2026 Update: Amp spun out from Sourcegraph as an independent research lab/company. Multi-model architecture added (Claude Sonnet 4, O3, with GPT-5 readiness). Fixed 200K token context window (unconstrained token usage). "Oracle" capability invokes powerful models for complex tasks. Agentic code review feature launched (Dec 2025). Thread Map visualization, Handoff mechanism for long-context drift (Nov 2025), ad-supported free tier (up to $10/day), public developer profiles, and tab completion engine added. CLI tool now provides full agentic functionality from terminal.

### Last Update
- 2026-01-30

## Licensing

### Opensource
- No
  - Amp is offered as a commercial Sourcegraph product; related example/demo repositories under the Sourcegraph org may be MIT or other OSS licenses, but the primary product is proprietary.

### License
- Proprietary
  - Related Sourcegraph example repositories (e.g., cra-github, amp-demo) may carry permissive licenses such as MIT; confirm per-repo LICENSE files for specifics.

### Free Trial
- Yes
  - Sourcegraph provides trial/pricing info for Amp; consult Sourcegraph sales/docs for details.

## MCP-Client

### MCP-Client
- Yes
  - Amp integrates with the Model Context Protocol (MCP) and can operate with MCP-compatible model/context providers.

### Prompts
- Yes
  - Amp uses structured prompts and prompt engineering under the hood; supports configurable prompts and project-level AGENT.md guidance.

### Tools
- Yes
  - Supports CLI operations, file/system actions, and integrations (e.g., running tests, git operations) with allowlisting controls.

### Resources
- Yes
  - Can surface and use repo resources, external docs, and model-provided context as part of multi-step reasoning.

### ACP
- No

## Deployment

### BYOK
- Yes

### Local Offline
- Yes
  - Supports MCP servers which can point to local or self-hosted model/context providers

## Developer Experience

### Context Management
- Yes
  - Manages repo context via code search, AGENT.md, and project-aware context windows; supports extended context budgets and multi-repo reasoning.

### Direct File References
- Yes
  - CLI and extension workflows can reference and operate on specific files; supports tracing and applying edits to particular files.

### Checkpoints
- Yes
  - Tracks file changes during sessions and provides mechanisms to review and revert edits (per-session change tracking, git-based workflows).

### Git Support
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Editor integrations (VS Code extension, Neovim plugin, JetBrains support) and example integrations demonstrate extensibility points; repository-level hooks/integrations available.

### Hooks
- Yes
  - Integration points exist for CI/automation and repo lifecycle events via CLI and AGENT.md-driven workflows.

### SlashCommands
- Yes
  - CLI and extension expose reusable commands and interactive command palette entries for common operations.

### Custom Modes
- Yes
  - Provides operational modes (e.g., smart vs fast) and configurable thinking budgets.

### Subagents
- Yes
  - Specialized agents/components (Librarian, review agents, task-specific helpers) enable task decomposition and targeted workflows.

