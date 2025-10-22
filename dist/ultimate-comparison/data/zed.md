# Zed - https://zed.dev
A next-generation, high-performance code editor focused on speed, real-time collaboration, and integrated AI assistance. Built in Rust with a GPU-rendered UI and a local-first philosophy for AI models.

## Version
vN/A (2025-10-19)

## Classification 
- Code/Editor

## Rating
- [5] Exceptional performance and responsiveness (GPU-driven UI, Rust)
- [4] Strong collaboration and AI integration, extension ecosystem still growing
  
## Repository
- https://github.com/zed-industries/zed
  
## Languages
- Any
  
## Extensible
- Yes
  - Extension registry available; growing ecosystem but smaller than VS Code's marketplace
  
## Description
Zed is a modern code editor engineered for low latency and smooth UX. It renders its UI on the GPU (GPUI approach) and is written in Rust, which together produce very fast startup, typing responsiveness, and large-file handling. Zed emphasizes real-time collaboration (multi-user editing, shared notes, chat) and tight integration with AI: an Assistant Panel for conversational, project-aware assistance and inline transformations that apply AI-suggested diffs directly in-editor. Zed also supports multibuffer editing, an integrated terminal, robust language support via Tree-sitter/WebAssembly and LSP, and a first-class Vim mode.

## BYOK
- Yes
  - Zed supports OpenAI-compatible providers and can be configured to use local LLM hosts (e.g., Ollama) so you can run models with your own keys or entirely offline.
  
## LocalOffline
- Yes
  - Zed can be configured to use local LLMs (via Ollama or other OpenAI-compatible endpoints) so prompts and code can stay on-device. It also supports running Ollama on remote GPU hosts (SSH/port-forwarding) if needed.
  
## FreeTrial
- Yes
  - The editor and source are available openly; binaries are freely downloadable. (See "Notes" about binary EULA nuance.)

## GitSupport
- Yes
  - Integrates with Git workflows; project-aware features and diagnostics help with common VCS tasks.
  
## Terminal
- Yes
  - Built-in integrated terminal and task runner.
  
## Opensource
- Yes
  - Core source available on GitHub
  
## License
- GPL
  - GPL-3.0 (core editor), AGPL for certain server/collab components; other crates/components may use Apache/MIT for specific parts
  
## MCP-Client
- Yes
  - MCP servers are integrated similar to other extensions like e.g. theming

### Prompts
- No

### Tools
- Yes

### Resources
- No
  
## Notes
- Performance: Uses a GPU-first rendering approach (handcrafted shaders) and is implemented in Rust — developers report substantially lower typing latency and better handling of very large files compared with many existing editors.
- AI features: Assistant Panel exposes the full LLM request (editable) and supports slash-commands (/file, /tab, /terminal, /diagnostics, /fetch). Inline transformations let you select code and apply AI-generated diffs (accept/reject), including multiple-cursor transformations. A `/workflow` concept is being expanded for orchestrating multi-step, multi-file changes.
- Collaboration: Built-in real-time collaboration, chat, shared notes and session-aware AI so teams can co-edit with shared assistant context. Some collab components are licensed under AGPL.
- Local models & privacy: Zed supports connecting to local model hosts like Ollama; this enables on-device model usage and BYOK workflows. Zed also supports OpenAI-compatible APIs if you prefer hosted models.
- Extensions: Extension registry now exists, enabling community contributions, but the ecosystem is younger and smaller than VS Code's—growing quickly.
- Binary vs source nuance: While the source is open under GPL/AGPL, the binaries distributed from zed.dev have their own EULA and the Zed team has noted this could diverge from the source in future distributions (similar to other editor projects). Review the repo and zed.dev terms if license specifics are important for your use case.
- Good fit: Developers who prioritize low-latency editing, collaboration-first workflows, and integrated AI (especially teams wanting local model hosting) will find Zed compelling. If you depend on a very mature extension marketplace, account for that gap today.


## ContextManagement
- Yes
  - Zed exposes the entire AI request/interaction as an editable text buffer in the Assistant/Agent Panel, allowing you to manage and mutate context directly (edit prior messages, remove sections, fork conversations by copying buffers) [zed.dev docs].
  - Context can be programmatically and interactively extended via slash commands that inject file contents, terminal output, diagnostics or HTTP responses into the assistant buffer (see /file, /tab, /terminal, /diagnostics, /fetch) which are inserted as folded blocks you can expand or collapse for fine-grained control.
  - The inline assistant can combine local selection context with the assistant panel buffer when invoked, enabling targeted transformations while preserving broader context.

## DirectFileReferences
- Yes
  - Files and whole directory trees can be inserted into the assistant panel using the /file command (or /tab for open tabs). Inserted content appears as folded blocks containing the file text; directory trees are inserted recursively as nested folds so you can include precise file-level context in prompts [zed.dev docs].
  - You can also insert selected text from the main editor into the assistant buffer via keyboard shortcuts or the command palette, and the Agent Panel tools can navigate and open files as the agent reads your workspace.

## Hooks
- No
  - Public documentation does not describe a documented lifecycle "hooks" API (e.g., editor lifecycle events exposed as hook callbacks) for third-party integrations. Zed does provide extension points (WebAssembly-based extensions, MCP servers) but explicit hook-style lifecycle events are not clearly documented in the available sources.

## SlashCommands
- Yes
  - Zed supports a set of slash commands in the Assistant/Agent Panel for context injection:
    - /file — insert file or directory tree contents
    - /tab — insert contents of currently open tabs
    - /terminal — insert terminal output
    - /diagnostics — insert aggregated diagnostics across the workspace
    - /fetch — insert the response from an arbitrary HTTP URL
  - Slash commands render inserted content as editable, foldable blocks inside the assistant buffer so you can control token usage and visibility when composing prompts.

## Subagents
- No
  - There is no explicit public documentation describing named "subagents" you can define and register. Zed does provide an Agent Panel with tool calling, profiles that restrict or grant tool access, and MCP server integration for custom tools — these enable agentic workflows, but the term "subagent" (as separately definable autonomous agents) is not documented in the sources used.

## CustomModes
- Yes
  - Zed supports configurable Assistant profiles (assistant.profiles in settings.json) which let you create custom agent/tool configurations (e.g., Read-only, Write-enabled, Minimal) governing what the assistant can access and do. Profiles can be created and edited via the UI or by modifying settings.json directly.
  - The editor also supports extensibility (extensions, settings, keymaps), so you can compose specialist workflows or modes via extensions plus profile/policy configuration.

## Plugins
- Yes
  - Zed has an extension system and a growing registry; extensions can add functionality and integrate with editor workflows. Extension development leverages WebAssembly and platform extension points, and MCP servers can provide additional tool capabilities to the Agent Panel.
  - The ecosystem is younger and smaller than VS Code's marketplace but is expanding; community and first-party extensions are distributed via the registry.

## Checkpoints
- Yes
  - When the AI agent makes edits, Zed creates a restore checkpoint for the pre-edit state and surfaces a "Restore Checkpoint" action on the message so you can revert the workspace to the state before the AI change. Checkpoints appear even if an edit was interrupted mid-change, offering a safety net for agentic editing workflows.

## SpecDrivenDevelopment
- Other
  - Zed itself does not ship a built-in spec-driven development framework (none of the listed frameworks are bundled with the editor). Zed is an extensible editor and can be used alongside spec-driven workflows or external tools (including Tessl, SpecKit, or custom tooling) via its extension system, Agent Panel tools, or external integrations, but no first-class, editor-native SDD framework is documented in the available sources.
