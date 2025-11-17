# OpenCode - https://opencode.ai
A terminal-native, open-source AI coding assistant that brings LLM-powered code understanding, generation and editing directly into the developer's terminal. OpenCode focuses on privacy (local-first model support), extensibility (custom actions/skills), and deep integration with developer workflows (git, LSP, shell).

## General Info

### Classification
- Code/Editor

### Version
v (2025-10-19)

### Repo
- https://github.com/sst/opencode

### Rating
- [5] Terminal-native, privacy-first design
- [5] Broad LLM provider support (Models.dev)
- [4] Rich toolset for file, shell, and repo operations

### Short Description
A terminal-native, local-first AI coding assistant with a TUI for interactive planning and building; supports local and cloud LLMs, LSP integration, git-aware editing, and extensible skills/actions.

-

### Description
OpenCode is an open-source AI assistant designed for use from the terminal. It provides a conversational interface and a suite of programmatic tools (file operations, grep/glob, patch/apply, diagnostics, shell execution, fetch, Sourcegraph search, etc.) that allow the assistant to read, explain, modify and create code in the context of a repository. OpenCode supports both cloud and local LLMs (through Models.dev and adapters such as Ollama), can initialize project context, produce implementation plans, and then switch to a build mode to apply edits. Its architecture supports extensible actions/skills and hierarchical agents for complex tasks.

### Languages
- Any

### Notes
- Strong privacy posture: can run entirely with local models so source code does not need to be uploaded to third-party APIs.
- Rich tool set that mirrors common CLI developer actions (ls, grep, view, write, edit, patch, bash) so it can operate robustly on repositories.
- Useful workflow modes: Plan mode (no edits, design/strategy) and Build mode (apply changes). Includes undo/redo for edits.
- Integrates with LSP/diagnostics for precise error detection and fixes.
- Extensible via custom actions/skills and supports spawning sub-agents for task decomposition.
- Good fit for polyglot environments and CI/CD automation where a terminal-first interface and scriptability are advantages.
- Main website: https://opencode.ai — repo and docs live at https://github.com/sst/opencode

### Last Update
2025-10-19

## Licensing

### Opensource
- Yes

### License
- MIT

### FreeTrial
- Yes

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes

  - Includes built-in prompt templates and system prompts used by agents (Plan, Build) and subagents.
  - Supports user-customizable prompts/skills and slash-style commands for common workflows (e.g. /init, /undo, /redo).
  - Prompts and agent configurations can be saved and reused as part of session state.

### Tools
- Yes

  - Provides a programmatic toolset for repository operations: file read/write/patch, grep/glob, shell execution, diagnostics via LSP, fetch/http, Sourcegraph search, and git-aware actions.
  - Tools are exposed to the assistant for robust, repeatable edits and automated workflows.

### Resources
- Yes

  - Official docs and usage guides: https://opencode.ai/docs
  - Repository with examples, configuration and adapters: https://github.com/sst/opencode
  - Community and changelog available via the repo's issues and releases pages.

## Deployment

### BYOK
- Yes

### LocalOffline
- Yes
  - Supports running with local model backends (e.g. Ollama) and Models.dev adapters.

## Developer Experience

### ContextManagement
- Yes
  - OpenCode builds and maintains repository-aware context by scanning and indexing the project (repository analysis via `/init`) and persisting session state and conversation history in SQLite. It exposes project-scoped sessions, keeps file associations, and uses LSP and file-system reads to surface relevant snippets when answering questions or generating changes. See: https://github.com/sst/opencode and https://opencode.ai/docs

### DirectFileReferences
- Yes
  - Files can be directly referenced and manipulated via the CLI/TUI: file explorer panels, explicit read/view/edit actions, patch/apply operations, and path-based prompts. The assistant can open specific files, show diffs, write changes, and apply/revert patches programmatically.

### Checkpoints
- Yes
  - OpenCode supports undo/redo for edits, persistent session history (SQLite), and shows diffs/patches to review before applying. It also integrates with Git workflows so developers can rely on VCS history as an additional checkpoint mechanism.

### GitSupport
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Extensible via actions/skills, model adapters, and custom commands. Developers can add new "skills" or adapters (e.g., Ollama, Models.dev connectors) and script bespoke tool integrations. There is no single centralized marketplace documented; extensibility is file- and config-driven in the repo.

### Hooks
- No
  - There are no widely-documented lifecycle "hook" events for agent-generated actions similar to webhooks or lifecycle callbacks. Extensibility is provided via custom actions/skills and command extensions rather than a formal lifecycle hook system (see actions/skills and custom commands in the docs/repo).

### SlashCommands
- Yes
  - OpenCode provides slash-style commands for common workflows (examples include `/init` to analyze a repo, `/undo` and `/redo` to revert or restore changes). Users can create custom commands/prompts to speed repetitive interactions.

### CustomModes
- Yes
  - OpenCode provides at least two explicit modes: Plan Mode (read-only design/planning) and Build Mode (apply edits). Modes can be toggled in the TUI (Tab key), enabling different agent behaviours (e.g., generate a plan vs. make changes).

### Subagents
- Yes
  - The architecture supports hierarchical agents and the spawning of sub-agents (subtasks/skills) for decomposing complex work into smaller steps; custom actions/skills can act as specialized subagents for domain tasks.

## Ungrouped Criteria

### Terminal
- Yes

### SpecDrivenDevelopment
- Other
  - OpenCode is not bundled with or tied to specific spec-driven frameworks (BMAD, SpecKit, OpenSpec, Tessl, AgentOS, ClaudeFlow, SPARC, SuperClaude). It can, however, support spec-driven workflows through Plan Mode and scripted skills—developers would integrate their preferred SDD tooling themselves rather than rely on a built-in spec framework.

## Classification
- Code/Terminal
