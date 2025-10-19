# Codex CLI - https://github.com/openai/codex-cli/
Codex CLI is an open-source command-line interface for interacting with OpenAI's Codex model and other compatible LLM providers.
## Version
 (2025-10-19)
## Rating


## Repository
- https://github.com/openai/codex-cli
## Languages
- Python
- JavaScript
## Extensible
- Yes (via provider gateways and config)
## Description
Codex CLI provides a lightweight, terminal-first agent that lets developers read, modify, and execute code using large language models. It runs tasks in sandboxed environments, can run linters/tests, propose edits, and integrate changes back into a local repository or create pull requests. The CLI supports multiple operation modes (suggest, auto-edit, full-auto) which control how much automation is allowed without user approval.
## BYOK
- Yes
  - Uses API keys for model providers; supports configuring different gateways
## LocalOffline
- No
  - Primarily uses remote model providers, though configurations and gateways (e.g., LiteLLM/Ollama proxies) can enable local model endpoints in some setups
## FreeTrial
- Yes
  - Availability depends on chosen model provider (OpenAI, Ollama, etc.)
## GitSupport
- Yes
  - Can produce commits and be used to prepare PRs (depends on workflow and config)
## Terminal
- Yes
## Opensource
- Yes
## License
- MIT
## MCPSupport
- Yes
## Notes
- Supports multiple model providers (OpenAI, OpenRouter, Gemini, Ollama, Mistral, DeepSeek, xAI, Groq and other OpenAI-compatible endpoints) via configuration and gateways.
- Configuration stored in ~/.codex/config.toml; users can create reusable prompts and agent settings per-repo.
- Operational modes:
  - Suggest (default): proposes edits and commands; requires user approval before applying changes.
  - Auto Edit: autonomously reads/writes files, but asks before executing shell commands.
  - Full Auto: performs reads, writes, and executes commands in a sandboxed, network-disabled environment without additional prompts.
- AGENTS.md: repository-level guidance files can be added to help the agent understand project structure, test commands, and conventions.
- Useful for exploratory code tasks, automated refactors, running test-fix cycles, and generating PR-ready diffs; best results when the repository includes clear tests and documentation.

Sources: GitHub repository (https://github.com/openai/codex-cli) and project documentation/examples aggregated from public write-ups about Codex CLI and its configuration.
