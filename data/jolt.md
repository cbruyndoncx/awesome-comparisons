# Jolt - https://www.usejolt.ai

AI assistant for making multi-file, large-codebase changes and code understanding.

## Version
(2025-10-19)

## Classification 
- Code/Editor

## Rating
- [4] Strong for large, production codebases with multi-file edits and deep context

## Repository
- 

## Languages
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

## Extensible
- Yes
  - Integrates with IDEs (VS Code, Cursor), web app and desktop client; supports multi-repo context and external LLMs

## Description
Jolt is a commercial AI coding assistant designed for large production codebases (100K+ lines). It emphasizes global "HyperContext" awareness of an entire codebase so users can ask questions, make changes, and apply multi-file edits without manually selecting context files. Jolt can generate implementation plans, create coherent multi-file patches, locate root causes for bugs from logs, and help with documentation and refactors across big repositories.

## BYOK


## LocalOffline

- No
  - Jolt operates as a cloud service with IDE integrations; offline/local-only usage is not advertised.

## FreeTrial
- Yes
  - Commercial product with demos / trials and enterprise sales channels.

## GitSupport
- Yes
  - Can produce git patches and integrate with repositories; IDE extensions apply changes directly]

## Terminal


## Opensource
- No

## License
- Proprietary

## MCP-Client


## Notes
- Core differentiator: "HyperContext" — Jolt maintains awareness of the whole codebase to reliably surface relevant files and produce consistent multi-file edits.
- Integrations: Web app, desktop app, and IDE extensions (notably VS Code and Cursor).
- Models & backends: Uses a mix of LLM providers (publicly referenced: Google Gemini, Anthropic, OpenAI) for generation and search.
- Security & compliance: Marketed for enterprise use and claims SOC 2 Type II compliance for handling sensitive codebases.
- Target audience: Engineering teams working on large, legacy or multi-repo production systems where single-file assistants struggle.
- Common workflows: Chat-based edits for smaller changes, editable implementation plans for complex multi-file work, and automatic context discovery across repos and dependencies.
- Useful links:
  - Main site: https://www.usejolt.ai
  - Docs / support: https://docs.usejolt.ai

## ContextManagement
- Yes
  - HyperContext: Jolt's primary method is an automatic, global "HyperContext" index that discovers and maintains context across entire repositories (multi-repo support) so users do not need to manually select files. It runs in the web app and IDE extensions and keeps awareness of local, unsaved/changed files when used via IDE plugins.
  - Automatic context discovery: Jolt identifies relevant files for a task (callsites, tests, configs, module boundaries) and surfaces them in chat and in the UI.
  - Scope controls: In IDEs and the web app users can narrow workspace/repo scope (open folders, repo selection) so HyperContext focuses on a subset of files rather than the whole enterprise index.
  - Use cases: code comprehension, multi-file feature work, cross-file refactors, root-cause analysis from logs.

## DirectFileReferences
- Yes
  - Jolt can reference specific files and produce direct multi-file edits and git-style patches. Files are referenced in several ways:
    - Automatic selection: HyperContext locates and highlights relevant files for a given request.
    - Explicit selection in IDE extensions: users can open/pin files or select ranges to anchor changes.
    - Chat references: users may refer to file paths or paste snippets in chat to anchor edits.
    - Export/patch: edits can be exported or applied as patches (or applied directly via IDE integration) so changes map back to repository files.

## Hooks
- No

## SlashCommands
- No

## Subagents
- No

## CustomModes
- No

## Plugins
- No

## Checkpoints
- No
  - No public documentation of built-in checkpoint/undo features. Jolt supports exporting patches and integrates with git/IDE workflows, so rollbacks are typically handled via VCS (branches, commits) or IDE undo rather than an internal checkpoint system.

## SpecDrivenDevelopment

