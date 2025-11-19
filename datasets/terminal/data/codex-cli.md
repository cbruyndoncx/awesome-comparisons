# Codex CLI - https://github.com/openai/codex/
Codex CLI is an open-source command-line interface for interacting with OpenAI's Codex model and other compatible LLM providers.

## General Info

### Classification
- Code/Terminal

### Version
- Unknown (2025-10-19)
  - Version information not available for OpenAI Codex CLI

### Repo
- https://github.com/openai/codex

### Rating
- [4] Strong community and practitioner assessments
- [4] Effective terminal-first coding agent with configurable approval modes

### Short Description
- A terminal-first coding agent that reads, edits, and executes code using LLMs with configurable approval/sandbox modes and provider gateways.

### Description
Codex CLI provides a lightweight, terminal-first agent that lets developers read, modify, and execute code using large language models. It runs tasks in sandboxed environments, can run linters/tests, propose edits, and integrate changes back into a local repository or create pull requests. The CLI supports multiple operation modes (suggest, auto-edit, full-auto) which control how much automation is allowed without user approval.

### Languages
- Any

### Notes
- Supports multiple model providers (OpenAI, OpenRouter, Gemini, Ollama, Mistral, DeepSeek, xAI, Groq and other OpenAI-compatible endpoints) via configuration and gateways.
- Configuration stored in ~/.codex/config.toml; users can create reusable prompts and agent settings per-repo.
- Operational modes:
  - Suggest (default): proposes edits and commands; requires user approval before applying changes.
  - Auto Edit: autonomously reads/writes files, but asks before executing shell commands.
  - Full Auto: performs reads, writes, and executes commands in a sandboxed, network-disabled environment without additional prompts.
- AGENTS.md: repository-level guidance files can be added to help the agent understand project structure, test commands, and conventions.
- Useful for exploratory code tasks, automated refactors, running test-fix cycles, and generating PR-ready diffs; best results when the repository includes clear tests and documentation.

Sources: GitHub repository (https://github.com/openai/codex) and project documentation/examples aggregated from public write-ups about Codex CLI and its configuration.

### Last Update
- 2025-10-19
  - Date reflects the most recent project metadata checked during this update.

## Licensing

### Opensource
- Yes

### License
- MIT

### FreeTrial
- Yes
  - Availability depends on chosen model provider (OpenAI, Ollama, etc.)

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - Codex CLI supports reusable prompts, per-repo agent settings and prompt templates via configuration files (e.g., ~/.codex/config.toml and repository AGENTS.md).

### Tools
- Yes
  - Integrates with local tools (linters, test runners, build commands) and can propose/execute shell commands (subject to approval mode and sandboxing).

### Resources
- Yes
  - Can ingest repository files, AGENTS.md guidance, and external web search or provider-specific context when configured.

## Deployment

### BYOK
- Yes
  - Uses API keys for model providers; supports configuring different gateways and provider endpoints.

### LocalOffline
- No
  - Primarily uses remote model providers, though configurations and gateways (e.g., Ollama, LiteLLM proxies) can enable local model endpoints in some setups.

## Developer Experience

### ContextManagement
- Yes
  - Supports persistent guidance via AGENTS.md, per-repo config, and prompt templates; can manage context window by ingesting specified files and project documentation.

### DirectFileReferences
- Yes
  - Agents operate directly on repository files, can read and propose edits to specific files, and support passing file content or paths into prompts for context.

### Checkpoints
- Yes
  - Typical workflow uses git commits/diffs and can prepare commits or PRs; interactive modes ask for approval before applying changes, enabling easy rollback via git.

### GitSupport
- Yes
  - Can produce commits and prepare PR diffs (behavior depends on config and approval mode).

## Extensible

### Extensible
- Yes (via provider gateways and config)

### Plugins
- No
  - The project exposes provider gateways and integrations but does not provide a formal "plugin" packaging system in the core CLI (as of last review).

### Hooks
- No
  - There is no documented, generic plugin-hook lifecycle API; repository-level AGENTS.md and config provide the primary customization points.

### SlashCommands
- Yes
  - The interactive interface supports internal commands (for example switching models or toggling behavior) and the CLI exposes flags and subcommands to control operation modes.

### CustomModes
- Yes
  - Built-in modes (suggest, auto-edit, full-auto) and approval/sandbox configurations let teams tailor agent autonomy and safety boundaries.

### Subagents
- Yes
  - Workflows often include specialized agent roles (e.g., review agents, testing agents) and the CLI supports multi-step plans that can incorporate distinct agent behaviors.

