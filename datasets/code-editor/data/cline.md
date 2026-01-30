# Cline - https://cline.bot
Cline is an open-source AI coding assistant implemented as a Visual Studio Code extension that provides file editing, terminal execution, browser automation, and customizable tool integrations to help developers perform multi-step development tasks with a human-in-the-loop workflow.

## General Info

### Classification
- Code/Editor

### Version
- v3.4+ (2025)
  - MCP Marketplace added February 2025; computer use capabilities (browser interaction via Claude); 300KB file size limit; repository-level custom rules (.clinerules).

### Repo
- https://github.com/cline/cline

### Rating
- [5] Strong AI-assisted workflows and tool integrations
- [4] Requires external model/API keys (BYOK) which gives flexibility but adds setup
- [4] Powerful features (browser automation, checkpoints) but depends on model capabilities

### Short Description
- VS Code extension AI coding assistant with file editing, terminal and browser automation, MCP plugin support, and checkpointed human-in-the-loop workflows.

### Description
Cline is designed to act as a development partner rather than a simple autocomplete. It can create and edit files with diff previews, run terminal commands, launch browsers and interact with pages (for testing or debugging), and install or use custom MCP tools. It keeps a structured memory bank (projectbrief.md, activeContext.md, progress.md) and uses checkpointing to snapshot steps so users can compare or restore states. Work is performed in a human-in-the-loop manner: Cline proposes changes and requests confirmation before saving.

### Languages
- Any

### Notes
- Supports multiple model providers (Anthropic Claude, OpenAI, Google Gemini, AWS Bedrock, and local hosts via Ollama/LM Studio).
- Provides plan & act modes to separate strategic planning from implementation.
- Checkpoint management lets you create snapshots at each step and restore or compare previous states.
- Can run dev servers (e.g., `npm run dev`), detect linter/compile errors, and assist with fixes.
- Memory bank files persist structured context across sessions to help the assistant retain project knowledge.
- Uses a usage-based model where you supply API keys (BYOK) and pay providers directly.
- Good fit for developers wanting an integrated AI assistant inside VS Code with extensible tooling and local model support.
- MCP Marketplace (v3.4): app store for AI capabilities with curated MCP servers for CI/CD, cloud monitoring, project management.
- Computer Use: can launch browsers to verify implementations, detect errors, and address issues automatically via Claude's computer use capabilities.
- Custom rules (.clinerules): repository-level rules to standardize development practices across teams.
- Local models: supports Ollama and LM Studio up to 70B parameters (Qwen3 Coder 30B recommended).

### Last Update
2026-01-30

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - Provides built-in prompt templates and plan/act mode prompts
  - Users can supply custom prompts and templates via MCP tools or extension settings
  - Community prompt presets available in the repo and docs

### Tools
- Yes
  - Integrates MCP tools (custom tool servers), terminal execution, browser automation, and file-editing operations
  - Supports adding third-party MCP servers to extend functionality (CI hooks, cloud APIs, issue trackers)

### Resources
- Yes
  - Official docs at https://cline.bot and extensive README and examples on the GitHub repo
  - CLI, extension, and MCP server examples included in the repository and community-contributed prompts

### ACP
- No

## Deployment

### BYOK
- Yes

### Local Offline
- Yes
  - Any additional details like Ollama: supports local model hosts (Ollama, LM Studio) as backends for offline/local use

## Developer Experience

### Context Management
- Yes
  - Cline maintains a structured "memory bank" (projectbrief.md, activeContext.md, progress.md) to persist and rebuild project understanding across sessions.
  - Checkpoint management creates snapshots at each step and tool call, allowing comparison, restore, and safe experimentation.
  - Plan & Act modes separate strategic planning from execution so context updates can be staged and reviewed before being committed.
  - Context usage is tracked (token/context progress) and Cline selectively reads/indexes files and docs to remain within model windows while preserving salient project state.

### Direct File References
- Yes
  - Cline reads, opens, edits and creates files directly inside the editor; it shows diffs and writes changes to file paths in the workspace.
  - Files are referenced by path and integrated into Cline's context (diff views, Timeline entries, and checkpoint snapshots) so the agent can cite and act on exact files.

### Checkpoints
- Yes
  - Built-in checkpointing snapshots workspace state at steps and tool calls; users can compare changes, restore previous snapshots, or revert risky edits.
  - File Timeline and standard Git history complement checkpointing for undo/rollback workflows.

### Git Support
- No

## Extensible

### Extensible
- Yes
  - VS Code extension plus MCP (Model Context Protocol) support for custom tools

### Plugins
- Yes
  - MCP provides a mechanism to bundle commands, tools and integrations: developers create MCP servers/tools and install them into Cline to extend functionality.
  - The VS Code extension model plus community MCP servers enables packaging sets of capabilities (commands, hooks, tool endpoints) that behave like plugins.

### Hooks
- Yes
  - MCP tools act as attachable integrations with lifecycle-like behaviors (tool installation, invocation, and result handling).
  - Checkpoint creation/restore and Plan→Act transitions behave as lifecycle events developers can rely on when orchestrating multi-step workflows.
  - Terminal execution and browser automation steps emit outputs (terminal output, screenshots, logs) that can be observed and reacted to as event-like signals.

### SlashCommands
- Yes
  - Cline exposes VS Code commands accessible via the command palette (e.g., open Cline, add a tool, invoke actions) which act as reusable user-triggered commands.
  - The project also documents a CLI reference (docs.cline.bot/cline-cli/cli-reference) for command-line interactions tied to the extension's features.

### Skills
- No

### Custom Modes
- Yes
  - Toggleable rulesets (.clinerules) and Plan vs Act modes let teams define specialist behavior profiles and switch modes to tailor the assistant for different tasks or policies.
  - Teams and projects can configure provider/backends (BYOK, local models) that change runtime behavior and constraints for the assistant.

### Subagents
- Yes
  - Through the Model Context Protocol (MCP) Cline can add and integrate custom tools/services ("add a tool" flow) that act as specialized subagents for task-specific workflows.
  - These MCP-backed tools can fetch external data (Jira, PagerDuty, cloud APIs), perform operations, and be invoked from plans, effectively functioning as domain-specific subagents.

