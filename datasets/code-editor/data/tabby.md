# Tabby - https://tabby.tabbyml.com
An open-source, self-hosted AI coding assistant for local code completion and chat.

## General Info

### Classification
- Code/Editor

### Version
v0.x (2025-10-19)

### Repo
- https://github.com/TabbyML/tabby

### Rating
- [4] Strong privacy and self-hosting features (good for sensitive codebases)
- [4] Good IDE integration and model flexibility, still maturing UX compared to large commercial offerings

### Short Description
<!-- ToDo -->

-

### Description
Tabby is a self-hosted, open-source AI coding assistant that provides code completion, conversational code chat, and repository-aware suggestions. It is designed to run on your infrastructure (local machine, private cloud, or hosted VMs) and supports multiple LLM backends (e.g., CodeLlama, StarCoder, Ollama-managed models). Tabby focuses on data sovereignty, low-latency completions via adaptive caching and Tree-sitter based context extraction, and editor integrations (VS Code, Neovim/Vim, etc.).

### Languages
- Rust
- TypeScript
- JavaScript
- Python
- Shell

### Notes
- Self-hosted alternative to cloud assistants (e.g., Copilot) with emphasis on privacy and repository context.
- Works with a variety of model backends and allows teams to "bring your own model" or provider (BYOM/BYOK).
- Provides IDE integrations (official and community) for VS Code, Neovim/Vim, and other editors.
- Quickstart via Docker for local GPU-enabled deployments; building from source requires Rust and native deps.
- Community edition = Apache-2.0 licensed; Team/Enterprise editions add commercial capabilities.
- Best experience with access to GPU-backed inference or fast local model runners; smaller models usable for lightweight setups.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- Yes

### License
- Apache License 2.0

### FreeTrial
- No
  - Community edition is free & open-source; Team/Enterprise tiers exist commercially for additional features/support.

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

### LocalOffline
- Yes
  - Can run fully offline/self-hosted (Docker, from-source). Supports connecting to local model servers such as ollama/llama.cpp backends or on-prem inference stacks.

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

## Extensible

### Extensible
- Yes

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
  - Server and agent provide CLI tools; Docker image and direct binary available for server usage.

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
