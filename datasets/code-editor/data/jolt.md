# Jolt - https://www.usejolt.ai

AI assistant for making multi-file, large-codebase changes and code understanding.

## General Info

### Classification
- Code/Editor

### Version
- Unknown (2025-10-19)

### Repo
-

### Rating
- [4] Strong for large, production codebases with multi-file edits and deep context

### Short Description
- Commercial AI coding assistant focused on global "HyperContext" for large, multi-repo codebases, enabling coherent multi-file edits, implementation plans, refactors, and code comprehension across enterprise projects.

-

### Description
Jolt is a commercial AI coding assistant designed for large production codebases (100K+ lines). It emphasizes global "HyperContext" awareness of an entire codebase so users can ask questions, make changes, and apply multi-file edits without manually selecting context files. Jolt can generate implementation plans, create coherent multi-file patches, locate root causes for bugs from logs, and help with documentation and refactors across big repositories.

### Languages
- TypeScript
- JavaScript
- Python
- Go
- Ruby
- Java
- Kotlin
- Scala
- C# / .NET
- HTML/CSS
- GraphQL
- Rust
- PHP
- Other
  - Protocol Buffers
  - Markdown / MDX
  - SCSS / LESS

### Notes
- Core differentiator: "HyperContext" — Jolt maintains awareness of the whole codebase to reliably surface relevant files and produce consistent multi-file edits.
- Integrations: Web app, desktop app, and IDE extensions (notably VS Code and Cursor).
- Models & backends: Uses a mix of LLM providers (publicly referenced: Google Gemini, Anthropic, OpenAI) for generation and search.
- Security & compliance: Marketed for enterprise use and claims SOC 2 Type II compliance for handling sensitive codebases.
- Target audience: Engineering teams working on large, legacy or multi-repo production systems where single-file assistants struggle.
- Common workflows: Chat-based edits for smaller changes, editable implementation plans for complex multi-file work, and automatic context discovery across repos and dependencies.
- Useful links:
  - Main site: https://www.usejolt.ai
  - Docs / support: https://docs.usejolt.ai

### Last Update
- 2025-10-19
-

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Commercial product with demos / trials and enterprise sales channels.

## MCP-Client

### MCP-Client



### Prompts
- Yes
  - Supports editable implementation plans and prompt tuning for multi-file changes and refactors.
  - Exposes prompt-driven workflows in the web app and IDE integrations for iterative plan edits.

### Tools
- Yes
  - Produces git-style patches and can apply multi-file edits via IDE extensions (VS Code, JetBrains, Neovim).
  - Integrates with repo workflows to export patches for review and apply changes through IDE plugins.

### Resources
- Yes
  - Public documentation and support resources via the web app and docs.usejolt.ai.
  - Web and desktop clients plus IDE extensions provide in-product guidance and help resources.

## Deployment

### BYOK
- No
  - No public documentation found indicating Bring-Your-Own-Key support for LLM encryption keys.

### LocalOffline

- No
  - Jolt operates as a cloud service with IDE integrations; offline/local-only usage is not advertised.

## Developer Experience

### ContextManagement
- Yes
  - HyperContext: Jolt's primary method is an automatic, global "HyperContext" index that discovers and maintains context across entire repositories (multi-repo support) so users do not need to manually select files. It runs in the web app and IDE extensions and keeps awareness of local, unsaved/changed files when used via IDE plugins.
  - Automatic context discovery: Jolt identifies relevant files for a task (callsites, tests, configs, module boundaries) and surfaces them in chat and in the UI.
  - Scope controls: In IDEs and the web app users can narrow workspace/repo scope (open folders, repo selection) so HyperContext focuses on a subset of files rather than the whole enterprise index.
  - Use cases: code comprehension, multi-file feature work, cross-file refactors, root-cause analysis from logs.

### DirectFileReferences
- Yes
  - Jolt can reference specific files and produce direct multi-file edits and git-style patches. Files are referenced in several ways:
    - Automatic selection: HyperContext locates and highlights relevant files for a given request.
    - Explicit selection in IDE extensions: users can open/pin files or select ranges to anchor changes.
    - Chat references: users may refer to file paths or paste snippets in chat to anchor edits.
    - Export/patch: edits can be exported or applied as patches (or applied directly via IDE integration) so changes map back to repository files.

### Checkpoints
- No
  - No public documentation of built-in checkpoint/undo features. Jolt supports exporting patches and integrates with git/IDE workflows, so rollbacks are typically handled via VCS (branches, commits) or IDE undo rather than an internal checkpoint system.

### GitSupport
- Yes
  - Can produce git patches and integrate with repositories; IDE extensions apply changes directly

## Extensible

### Extensible
- Yes
  - Integrates with IDEs (VS Code, Cursor), web app and desktop client; supports multi-repo context and external LLMs

### Plugins
- No

### Hooks
- No

### SlashCommands
- No

### Custom Modes
- No

### Subagents
- No

