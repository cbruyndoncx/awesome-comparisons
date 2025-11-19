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
A self-hosted, repository-aware AI coding assistant providing low-latency code completion, inline chat, and knowledge-base (Answer Engine) features for secure, on-prem developer workflows.

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
- 2025-10-19

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
- Yes
  - Supports system and assistant prompts, chat message templates, and configurable prompt behavior via server configuration and the Answer Engine (Pages).
  - Saved prompts / templates and server-side prompt tuning available through configs and documentation pages.

### Tools
- Yes
  - Provides developer-facing tools such as repository indexing, Answer Engine (knowledge pages), code actions via IDE extensions, and integrations (GitHub/GitLab indexing, MR context).
  - Tooling surface is extended by editor plugins and server integrations.

### Resources
- Yes
  - Can index repository files, documentation, and external sources (e.g., GitLab Merge Requests) for context.
  - Supports connectors and pages (Answer Engine) to expose curated knowledge and documentation to the assistant.

## Deployment

### BYOK
- Yes

### LocalOffline
- Yes
  - Can run fully offline/self-hosted (Docker, from-source). Supports connecting to local model servers such as ollama/llama.cpp backends or on-prem inference stacks.

## Developer Experience

### ContextManagement
- Yes
  - Uses Tree-sitter based parsing and repository indexing to surface relevant context for completions and chat.
  - Adaptive caching and context windowing to reduce latency and improve relevance.

### DirectFileReferences
- Yes
  - Repository-aware chat and editor integrations allow referencing files, filenames and providing file-context in prompts; editor plugins can open or point to specific files.

### Checkpoints
- No
  - Relies on external version control (git) and server logs rather than built-in transactional checkpoints or automatic undo snapshots.

### GitSupport
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Extensible via editor plugins (official and community) and server integrations; community contributions add connectors and feature integrations.

### Hooks
- Yes
  - Server and integration configuration allow lifecycle behaviors and custom integrations (e.g., indexing pipelines, webhooks for external systems).

### SlashCommands
- Yes
  - Editor integrations and chat interfaces expose command-like interactions (mentions/slash-style commands) in supported clients.

### CustomModes
- Yes
  - Server-side presets, Answer Engine pages, and configurable chat/system prompts enable tailored modes for different workflows (e.g., review, refactor, docs lookup).

### Subagents
- No
  - Does not provide an out-of-the-box subagent orchestration system for multi-agent workflows; workflows are typically achieved via integrations and custom tooling.

