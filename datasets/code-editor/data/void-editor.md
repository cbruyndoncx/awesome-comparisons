# Void Editor - http://voideditor.com
Open-source, privacy-first AI code editor built as a fork of Visual Studio Code that connects directly to LLMs (local or cloud) without routing data through a private backend.

## General Info

### Classification
- Code/Editor

### Version
- v0.1 (2025-01 beta)
  - Note: Beta version from January 2025; Last Update (2025-11-15) reflects continued development without version number change

### Repo
- https://github.com/voideditor/void

### Rating
- [4] Strong privacy and model-flexibility design
- [4] Rapidly evolving; Beta early UX rough edges

### Short Description
- Privacy-first fork of Visual Studio Code with built-in AI-assisted coding that connects directly to user-configured LLMs (local or cloud) without routing data through a private backend.

-

### Description
Void is an open-source, privacy-focused AI code editor that forks the Visual Studio Code experience and adds first-class AI-assisted coding features. Its core differentiator is that it never acts as an intermediary for model inference: the editor connects directly to whatever model or provider you configure (local or cloud), giving users full control of where their code and prompts are sent. Features include Tab autocomplete, inline Quick Edit, an integrated Chat with multiple modes (Chat, Agent, Gather), Agent Mode for multi-file automated edits, checkpoints for LLM changes, and tooling integrations for local model runtimes.

### Languages
- Any

### Notes
- Privacy-first architecture: no private backend proxying—connections go directly from the editor to the chosen model provider or local runtime.
- Model flexibility: works with local open-source models and major cloud providers (OpenAI, Anthropic, Google, etc.) by configuring your own keys or local endpoints.
- Agent Mode enables the AI to perform repository-wide tasks (read/write/delete files, run terminal commands) — use with care and review generated changes via checkpoints.
- Good choice for teams or individuals who need AI assistance but require data residency or on-prem constraints.

### Last Update
- 2025-11-15

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- Yes
  - Core editor is free and open-source.

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - Prompts are editable and savable; users can customize system/user messages and reuse prompt templates for Chat, Agent, and Gather modes.

### Tools
- Yes
  - Built-in AI tools include inline Quick Edit, Tab autocomplete, Chat (multi-mode), Agent Mode (multi-file edits), Gather Mode (read-only analysis), model integrations (Ollama, local runtimes), and terminal command execution for Agent workflows.

### Resources
- Yes
  - Documentation, examples, model adapter configs, and community guides available via the project repository and website; includes sample prompts and setup instructions for local model runtimes.

## Deployment

### BYOK
- Yes

### LocalOffline
- Yes
  - Supports running local/open-source models via integrations (Ollama, LM Studio, local runners) so inference can remain on-device or on-prem.

## Developer Experience

### ContextManagement
- Yes
  - Void maintains multi-file and workspace-level context via file indexing and a project-aware workspace model. The editor exposes this context to its AI features in several ways:
    - File indexing / workspace awareness: Void builds an index of the repository so the AI can reason over multiple files (cross-file references, symbol lookup, project-level search).
    - Chat attachments & contextual chat: users can include files or open buffers in the contextual AI chat so that the model receives precise file-level context for questions or fixes.
    - Prompt / request customization: the underlying prompts sent to models are visible and editable, enabling explicit control of what context is injected and how it is framed.
    - Model/context selection: users can choose local vs cloud models and control token/context-window usage (selecting models with different context sizes) to manage how much of the project fits into a single request.

### DirectFileReferences
- Yes
  - Files can be directly referenced and provided to the AI workflows:
    - Inline edits: AI can propose and apply edits directly to files opened in the editor (Ctrl+K inline editing and Fast Apply for large files).
    - Chat file attachments: the chat UI supports attaching files and referencing file paths so the assistant works from concrete file content.
    - Agent & Gather modes: Gather mode reads files in a read-only fashion for analysis; Agent mode can access and operate on files when permitted.
    - Command palette & search: file paths and search results can be used as inputs to AI actions (search + act workflows).

### Checkpoints
- Yes
  - Multiple mechanisms exist to undo or revert agent actions:
    - Editor undo stack: AI-applied edits are regular editor changes and can be undone with the editor's undo/redo commands.
    - Git / source control: typical Git workflows (commits, branches) can be used to checkpoint and revert agent changes; teams can require PRs for AI changes.
    - Read-only modes: Gather Mode provides a safe, read-only analysis option to avoid accidental changes.

### GitSupport
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Because Void is a VS Code fork, it inherits the extension/plugin model. In addition to built-in integrations (Ollama, DocSearch, etc.), developers can add extensions or propose new integrations via the project's plugin/extension mechanisms. This allows bundling commands, AI integrations, and UI elements into installable packages.

### Hooks
- Yes
  - Exposes VS Code-compatible extension hooks and lifecycle events; extension API and built-in AI workflows provide event points for actions like command invocation, file edits, and agent lifecycle (permission prompts, start/stop).

### SlashCommands
- Yes
  - Void provides keyboard-driven commands and a command palette (similar to VS Code) and exposes shortcuts for AI actions (examples: Ctrl+K for inline edits, Ctrl+L for chat). These commands are manually triggerable and reusable via the palette or keybindings.

### Custom Modes
- Yes
  - Void ships with specialized modes (Agent Mode, Gather Mode, Chat) and supports prompt and model configuration so users can create tailored workflows. Users can:
    - Save or edit prompts and model choices to approximate custom modes.
    - Use workspace settings and extensions (VS Code-compatible) to persist custom behavior per-project.

### Subagents
- Yes
  - Void supports autonomous "Agent Mode" which runs multi-step workflows where the model can read files, propose changes, and run terminal commands. While not described as a formal multi-agent framework, Agent Mode functions as a specialized subagent that can be granted permissions (read/write/terminal) and operate semi-autonomously.
  - Users can select models for Agent Mode (local or cloud) and control behavior through editable prompts and configuration, enabling task-specific agent behaviors (e.g., code-rewrite agent, audit agent via Gather Mode).

