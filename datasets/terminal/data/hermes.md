# Hermes - https://github.com/NousResearch/hermes-agent

Hermes is an open-source, terminal-first AI coding agent by Nous Research. It runs from the command line with an interactive TUI, slash-command autocomplete, session resume, and streaming tool output. Designed for developers who live in the shell, Hermes integrates directly with your repos, executes commands, edits files via LSP-aware patching, and supports git worktree isolation for safe parallel agent runs.

Beyond coding assistance, Hermes is a programmable agent runtime: it manages persistent memory (`MEMORY.md`, `USER.md`), accumulates reusable skills via a curator process, and supports scheduled background jobs. It is model-agnostic, routing through Anthropic, OpenAI, Nous, OpenRouter, or custom endpoints.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal

### Version
- v0.14.0 (v2026.5.16)
  - Actively developed pre-1.0; frequent releases with breaking changes between minor versions.

### Repo
- https://github.com/NousResearch/hermes-agent

### Rating
- [4] Terminal-first with full TUI, git worktree isolation, LSP integration, MCP+ACP, persistent memory and skills system; model-agnostic.
- [3] Pre-1.0 with frequent breaking changes; self-hosted only; significant configuration complexity for advanced setups.

### Short Description

- Open-source terminal AI coding agent by Nous Research; TUI with slash commands, session resume, git worktree isolation, LSP-aware edits, MCP+ACP support, persistent memory, and a self-improving skills system.

### Description

Hermes is Nous Research's open-source agent runtime designed to live in the developer's terminal rather than a browser tab. The interactive CLI offers multiline editing, slash-command autocomplete (`/model`, `/tools`, `/skills`, `/background`), conversation history with session resume (`--continue`, `--resume`), and a richer `--tui` mode with modal overlays and mouse support.

For coding workflows, Hermes launches from inside a project directory and can inspect files, run shell commands, and apply LSP-aware patches. Git worktree isolation (`-w` flag) lets the agent make changes in a separate branch so you can review diffs safely, and multiple worktrees can run in parallel. Command execution backends extend beyond the local machine to Docker, SSH, Modal, Daytona, and cloud containers — the same agent code runs against different targets by config.

Hermes persists identity and context in `~/.hermes/`: `SOUL.md` defines agent behavior, `MEMORY.md` and `USER.md` accumulate long-term facts, and `skills/` stores reusable workflows. A curator process can create and refine skills from experience. Cron-based background jobs, lifecycle hooks, plugins, and custom skins round out the extensibility surface.

### Languages
- Any
  - Model-agnostic; language support depends on the underlying LLM provider.

### Notes
- Git worktree isolation: run agent edits in a safe separate branch with `-w` flag.
- Skills system: reusable, self-created workflows managed by the curator component.
- Execution backends: local, Docker, SSH, Modal, Daytona, Singularity.
- Computer Use: experimental macOS desktop automation via MCP server (requires Accessibility permissions).
- `~/.hermes/` stores config, memory, skills, sessions, cron jobs, plugins, and logs.

### Last Update
- 2026-05-16

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
  - Fully open source; bring your own API keys for LLM providers.

## MCP-Client

### MCP-Client
- Yes
  - First-class MCP support as both client and server; auto-discovers tools at startup and registers them as callable tools (e.g. `mcp_filesystem_read_file`).

### Prompts
- Yes
  - Supports MCP-defined prompt templates via utility wrappers when a connected server exposes prompts.

### Tools
- Yes
  - Full MCP tool execution; tools auto-registered from connected servers with names like `mcp_<server>_<tool>`.

### Resources
- Yes
  - MCP resource listing and reading supported via utility wrappers.

### ACP
- Yes
  - Runs as an ACP server for editor integration (ACP-compatible clients can render chat, inspect tools, configure agent). ACP client support for multi-agent orchestration is in development.

## Deployment

### BYOK
- Yes
  - Model-agnostic; supports Anthropic, OpenAI, Nous, OpenRouter, and custom endpoints via API keys in `~/.hermes/.env`.

### Local Offline
- Yes
  - Supports local/custom model endpoints; fully self-hosted with no mandatory cloud dependency.

## Developer Experience

### Context Management
- Yes
  - Persistent memory via `MEMORY.md` and `USER.md`; session history in SQLite with FTS5; session resume across restarts.

### Direct File References
- Yes
  - Agent can read and write files directly within the project directory; LSP integration for semantic-aware edits.

### Checkpoints
- Yes
  - Git worktree isolation provides per-run branch checkpoints; full git history of agent changes available for review.

### Git Support
- Yes
  - Git worktree isolation (`-w` flag); automated branch management; agent-driven commits and diffs.

## Extensible

### Plugins
- Yes
  - Plugin system for installing/enabling/disabling/removing extensions via `hermes plugins`.

### Hooks
- Yes
  - Lifecycle hooks stored in `~/.hermes/hooks/` for agent lifecycle events.

### SlashCommands
- Yes
  - Rich slash-command system: `/model`, `/tools`, `/skills`, `/background`, `/reasoning`, `/voice`, and more.

### Skills
- Yes
  - Structured reusable workflows with docs and scripts; agent can create and refine skills; curator component manages and schedules skill maintenance.

### Custom Modes
- Yes
  - `SOUL.md` defines agent identity and behavior; provider/model switchable per session; custom execution backends configurable.

### Subagents
- Yes
  - Background sessions via `/background <prompt>`; git worktree isolation enables parallel agent runs on the same repo.
