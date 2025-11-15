# Codex CLI - https://github.com/openai/codex/
Codex CLI is an open-source command-line interface for interacting with OpenAI's Codex model and other compatible LLM providers.

## General Info

### Classification
- Code/Terminal

### Version
 (2025-10-19)

### Repo
- https://github.com/openai/codex

### Rating
<!-- ToDo -->
<!-- Avg rating based on review comments -->
<!-- Provide the rating value for Rating or remove if unknown. -->
-

### Short Description
<!-- ToDo -->

-

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
<!-- ToDo -->
<!-- Note Date last updated -->
-

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
<!-- ToDo -->
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Tools
<!-- ToDo -->
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Resources
<!-- ToDo -->
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## Deployment

### BYOK
- Yes
  - Uses API keys for model providers; supports configuring different gateways

### LocalOffline
- No
  - Primarily uses remote model providers, though configurations and gateways (e.g., LiteLLM/Ollama proxies) can enable local model endpoints in some setups

## Developer Experience

### ContextManagement
<!-- ToDo -->
<!-- Methods for managing and updating the context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### DirectFileReferences
<!-- ToDo -->
<!-- Can with @file or similar provide context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Checkpoints
<!-- ToDo -->
<!-- A way to undo using checkpoints or if autocommitted git history -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### GitSupport
- Yes
  - Can produce commits and be used to prepare PRs (depends on workflow and config)

## Extensible

### Extensible
- Yes (via provider gateways and config)

### Plugins
<!-- ToDo -->
<!-- A method of bundling together commands, agents and hooks (claude). -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Hooks
<!-- ToDo -->
<!-- Lifecycle events for the agent. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### SlashCommands
<!-- ToDo -->
<!-- Re-usable commands that can be manually triggered by the user. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### CustomModes
<!-- ToDo -->
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Subagents
<!-- ToDo -->
<!-- Define specialized AI subagents for task-specific workflows. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## Ungrouped Criteria

### Terminal
- Yes

### SpecDrivenDevelopment
<!-- ToDo -->
<!-- Has support for these Spec Driven Development methodologies: -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- BMAD
- SpecKit
- OpenSpec
- Tessl
- AgentOS
- ClaudeFlow
- SPARC
- SuperClaude
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
