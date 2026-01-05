# Mux - https://cmux.io
mux (Coding Agent Multiplexer) is a cross-platform desktop application for AI-assisted development with isolated workspace management.

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- AIE/Model
- Code/Autonomous agent
- Code/Editor
- Code/Other
- Code/Terminal
- Product/Prototyping
- IDE
  - Desktop application focused on managing multiple agentic workspaces in parallel.
### Version
<!-- Latest version used for update -->
- v0.6.0

### Repo
<!-- Associated Github repository -->
- https://github.com/coder/mux

### Rating
<!-- Avg rating based on review comments -->
- No public aggregate rating available
  - Project is actively developed with positive community feedback in GitHub issues and discussions; no central review score was found.

### Short Description

- Cross-platform desktop app for parallel/agentic development that runs isolated workspaces, supports multiple LLM backends, and integrates with git.

### Description
<!-- Few paragraphs about the product -->
- Desktop application for running multiple AI assistants in isolated workspaces, focused on long-running, parallel agent workflows and A/B experiments.
- mux (Coding Agent Multiplexer) provides an environment to run multiple AI coding assistants (agents) in parallel across isolated workspaces. Key features include local git worktrees and remote SSH workspaces, multi-model support (e.g., GPT-5, Claude/Sonnet-style models, Grok, Opus), adapters for local models (Ollama) and cloud providers (OpenRouter), a VS Code extension for jumping into mux workspaces, rich markdown/mermaid/LaTeX outputs, and a focused UX for planning and executing agent workflows (Plan/Exec, mode prompts, opportunistic compaction).
- The project is branded as Preview and is actively developed; pre-built binaries are provided for macOS, Linux and experimental Windows builds via GitHub Releases. Latest release (v0.6.0) published November 2025 with improved UI, Ollama/OpenRouter support, and VS Code integration.

### Languages
<!-- Any or limited list of supported programming Languages -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Any
- Java
- Bash
- XML
- Python
- Ruby
- Groovy
- JavaScript
- SQL
- Go
- Rust
- PHP
- TypeScript
- C#
- HTML/CSS
- Shell
- Swift
- Kotlin
- C/C++
- Scala
- GraphQL
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- General-purpose IDE/agent: supports any language the connected LLMs or local toolchains can handle; UI and integrations are language-agnostic.
### Notes

- Supports local LLMs via Ollama and cloud/back-end providers via OpenRouter.
- Includes VS Code extension and documentation at <https://cmux.io>.
- Licensed AGPL-3.0 (see GitHub repo) and distributed in a Preview state; expect bugs and active development.

### Last Update
<!-- Note Date last updated -->
- 2025-11-24

## Licensing
<!-- Licensing -->
### Opensource
<!-- Coding tool is released under opensource license -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Public repository: https://github.com/coder/mux
  - Distributed under AGPL-3.0 (see LICENSE in repo)

### License
<!-- Opensource specific license or Proprietary for other commercial licenses -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- AGPL-3.0
  - GNU Affero General Public License v3.0 (see https://github.com/coder/mux/blob/main/LICENSE)

### Free Trial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Open-source project and pre-built preview binaries available on GitHub Releases.

## MCP-Client
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
### MCP-Client
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- No
  - mux uses model adapters (Ollama, OpenRouter, etc.) rather than an MCP-specific client.

### Prompts
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Supports mode prompts, instruction-files, and Plan/Exec interaction modes; includes slash-style commands (e.g. /compact) and custom mode prompts.

### Tools
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Integrations for local model runtimes (Ollama), OpenRouter, git, and VS Code; agent tooling includes rich markdown rendering and terminal access for workspaces.

### Resources
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Extensive documentation available at <https://cmux.io>, GitHub repo with README and AGENTS.md for development guidance, and release binaries on GitHub Releases.

## Deployment
<!-- Deployment -->
### BYOK
<!-- Bring Your Own LLM API Key supported -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Supports configuring API keys/endpoints for OpenRouter and other cloud providers; local runtimes (Ollama) can be pointed at local model servers.

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Ollama adapter enables local model usage; repository/docs describe local and SSH workspace modes.

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Features like opportunistic compaction, instruction-files, and mode prompts help manage and compact context during long-running agent sessions.

### Direct File References
<!-- Can with @file or similar provide context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Workspaces map to git worktrees or SSH clones so agents have direct access to repository files; VS Code extension enables jumping into workspace files.

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Integrates with git (worktrees and divergence view) allowing standard git-based checkpoints, branches, and revert workflows.

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - First-class git integration: local worktrees, SSH clones, git divergence UI and review workflow.

## Extensible
<!-- Is it possible to extend or customize the system in any way -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- No
  - There is no documented third-party plugin marketplace; extensibility is primarily through adapters and the VS Code extension.

### Hooks
<!-- Lifecycle events for the agent. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Instruction-files, mode prompts and the agent loop provide lifecycle-style configuration points for agent behavior.

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - UI supports slash-style commands (examples: /compact) and vim-style inputs for efficient interactions.

### Custom Modes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Mode prompts and instruction-files enable creating tailored modes for different workflows (e.g., code-review, refactor, new-feature).

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
  - Designed to run multiple independent agent workspaces in parallel; supports multi-model orchestration and A/B experiments.
