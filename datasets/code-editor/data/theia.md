# Theia - https://theia-ide.org
Eclipse Theia: a modular, extensible, open-source IDE framework for desktop and cloud.

## General Info

### Classification
- Code/Editor

### Version
v1.65 (2025-10-19)

### Repo
- https://github.com/eclipse-theia/theia

### Rating
- [5] Strong open-source, vendor-neutral alternative to proprietary IDEs
- [4] Highly extensible and VS Code extension compatible (via Open VSX)
- [3] AI-native features matured rapidly in 2025 but still evolving for some production scenarios

### Short Description
- A modular, extensible open-source IDE framework for desktop and cloud, built with TypeScript and the Monaco editor; uses LSP for language support and provides compatibility with VS Code extensions via Open VSX.

### Description
Eclipse Theia is an open-source, modular IDE framework maintained under the Eclipse Foundation. It targets both desktop and cloud IDE scenarios and is designed to be embedded and extended to build tailored developer tools. Theia uses the Monaco editor and the Language Server Protocol (LSP) for language support, is implemented primarily in TypeScript/Node, and aims to provide a vendor-neutral alternative to commercial IDEs while offering compatibility with much of the VS Code extension ecosystem.

### Languages
- Any

### Notes
- Compatibility: Theia aims for compatibility with the VS Code extension ecosystem via Open VSX and the Monaco editor, while remaining a distinct, vendor-neutral project (not a fork of VS Code).
- AI-native: In 2025 Theia added and matured AI-native capabilities (Theia AI framework), including context-aware assistants, multi-agent workflows, richer image support and native Claude Code IDE integration (1.65).
- Deployment: Flexible deployment as desktop app (Electron), web-hosted IDE, or embedded component inside platform products.
- Language support: Broad LSP-based language coverage; good fit for polyglot projects.
- Governance: Backed by the Eclipse Foundation which provides vendor-neutral stewardship.
- Use cases: Organizations that need a customizable, self-hosted IDE with strong extension and AI-integration options (especially where data control and on-prem deployment matter) will find Theia well-suited.
- Caveats: While AI features advanced rapidly in 2025, some integrations and workflows remain actively evolving—evaluate maturity for critical production use and test the specific provider/model setup you plan to use.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- Yes

### License
- EPL-2.0
  - Eclipse Public License 2.0 (EPL-2.0)

### Free Trial
- Yes
  - Theia is free/open-source (no trials); commercial services built on top of it may have separate licensing/pricing.

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - Theia AI includes a prompt management system with editable prompt templates, prompt fragments, workspace-specific prompts and prompt variants. The chat UI and extension APIs allow viewing and editing prompts; 1.65 added persistent prompt history and 1.66 added slash-command style invocations.

### Tools
- Yes
  - Theia exposes APIs and extension points for integrating external developer tools and LSP-based services. Theia AI bundles utilities for tools like code generators, test agents, image and artifact viewers, and provides extension contributions for registering custom tools and task runners.

### Resources
- Yes
  - Theia maintains documentation, example extensions, and release notes in its GitHub repo and website. Theia AI includes sample prompt fragments, agent examples, and integration guides for common LLM providers and deployment scenarios.

## Deployment

### BYOK
- Yes
  - Theia AI and integrations follow a bring-your-own-key / bring-your-own-model philosophy: you can configure external LLM providers or self-hosted models (e.g., Ollama, LlamaFile, hosted Anthropic/OpenAI keys) depending on deployment and data-control needs.

### Local Offline
- Yes
  - Theia can run locally as a desktop app or be self-hosted on-premise. Its AI integrations support local/offline models (where supported by the chosen model runtime) enabling air-gapped or privacy-sensitive deployments.

## Developer Experience

### Context Management
- Yes
  - Theia provides multiple, well-defined mechanisms for managing and updating context: workspace scopes (user/workspace/folder) for preferences; a WorkspaceService and WorkspaceState for persisting extension-specific data; context keys and keybinding/menu "when" expressions to gate UI and commands; editor/selection/active widget context propagated by the frontend; and programmatic APIs (e.g. ContextKeyService, PreferenceService, WorkspaceService) that extensions use to observe and update context.

### Direct File References
- Yes
  - Theia exposes direct file and URI APIs for referencing and manipulating files: FileSystem/FileSystemProvider (backend), URI objects, WorkspaceService for workspace roots, and EditorManager/EditorOpener for opening files. Extensions typically use these services to resolve file paths, create/open editors (EditorManager.open(uri)), and watch file changes (FileSystem.watch). Theia also interoperates with VS Code-style URIs when using VS Code plugins.

### Checkpoints
- Yes
  - Theia provides several mechanisms that function as checkpoints or enable recovery: workspace state persistence (open editors, layout), crash/restart recovery, cloud/workspace snapshots in managed deployments, and extensible local-history or snapshot extensions. For source-controlled checkpoints, Theia integrates with Git extensions (commit/branch/rollback) so users can revert changes via standard VCS workflows. For richer checkpoint semantics, authors typically add an extension (local history, snapshotting service, or backend snapshot API).

### Git Support
- Yes
  - Native Git support via extensions (benefits from VS Code extension ecosystem). Git tooling, source control views and integrations are commonly added through Open VSX extensions.

## Extensible

### Extensible
- Yes
  - Modular architecture designed for composing custom IDEs and integrating extensions (supports VS Code extensions via Open VSX)

### Plugins
- Yes
  - Theia bundles commands, contributions, and lifecycle hooks via the extension/package model. An extension is packaged with frontend and optional backend parts and declares contribution points (commands, menus, views, preferences) in its package.json. Theia also supports VS Code-style plugins (via the plugin extension) and Open VSX packaging to reuse existing VS Code extensions.

### Hooks
- Yes
  - Theia provides lifecycle and contribution hooks via well-known contribution interfaces: FrontendApplicationContribution (initialize, onStart, onStop), BackendApplicationContribution, CommandContribution, MenuContribution, KeybindingContribution, and LanguageClient contributions. Extensions register disposables and use activation events (commands, file types, workspace events) to run code at specific lifecycle points. There are also workspace events (onDidChangeWorkspace, onWillSaveTextDocument, onDidChangeTextDocument) and backend/frontend RPC lifecycle hooks.

### SlashCommands
- Yes
  - Theia has a first-class commands system. Extensions declare commands via CommandContribution and register handlers with CommandRegistry; commands appear in the Command Palette and can be bound to keybindings or menus. Users can manually trigger commands from the palette, context menus, or keybindings. Commands can be enabled/disabled via context expressions and can execute either frontend logic or delegate work to the backend/container.

### Custom Modes
- Yes
  - Theia supports custom "modes" through language/monaco registrations, custom editors, themes, keymaps, and preference scopes. Extensions can register language contributions (syntax, tokens, language IDs), Monaco editor modes, and view/editor behavior, enabling specialist modes tailored for tasks (e.g., embedded development, data science notebooks, AI copilots).

### Subagents
- Yes
  - While Theia does not mandate a specific "AI subagent" framework, it fully supports implementing specialized subagents via extensions: backend services or microservices (HTTP/WebSocket/RPC) that host LLMs or agent orchestration, frontend contributions that present agent UIs (views, webviews, quick-open), and integration points for multi-agent workflows (task APIs, terminals, debug adapters). Projects like Theia AI (and other community extensions) demonstrate how to implement multi-agent assistants and orchestrate them from Theia extensions.

