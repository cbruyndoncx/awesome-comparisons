# Brokk - https://brokk.ai
[ An AI-native code assistant optimized for large codebases; standalone Java desktop app that provides workspace-driven context engineering, Deep Scan, Agentic Search, and agentic Code/Ask/Architect workflows. Ideal for supervising LLMs with compiler-grade context in monorepos (especially Java). ]

## General Info

### Classification
- Code/Editor

### Version
- v0.18+ (2025)
  - Modernization update added MCP support, expanded language imports (JS/TS/Python/Rust), Lutz Mode, BlitzForge, and Plan Mode.

### Repo
- https://github.com/BrokkAi/brokk

### Rating
- [4] Strong for large, statically-typed codebases (Java monorepos): excellent context management and static-analysis driven workflows
- [3] Desktop-first UI and GPL-3.0 licensing may be tradeoffs for some teams

### Short Description
An open-source, Java desktop application that provides compiler-grade, workspace-driven AI assistance for large repositories—featuring Deep Scan, Agentic Search, and focused Code/Ask/Architect agent workflows.

-

### Description
Brokk is a standalone, Java-based desktop application that rethinks AI-assisted coding for large repositories. Instead of treating a repo as text, Brokk builds compiler-grade context using static analysis (Joern) and semantic indexing, then exposes that curated context to LLMs via a Workspace. Key capabilities include Deep Scan (automated context recommendations), Agentic Search (symbol-aware project search), Code/Ask/Architect agents for different levels of intervention, dependency decompilation, and Git/history-aware context. Brokk's design focuses on reducing hallucinations and cost by giving models only the precise context they need rather than the entire repository.

### Languages
- Java
- JavaScript
- TypeScript
- Python
- Rust
- Other
  - One-click imports for JS/TS/Python/Rust added in 2025 modernization update; can handle enterprise-scale projects (e.g., NetBeans with 5M+ lines on 16GB RAM).

### Notes
- Workspace-first UX: users curate a Workspace of files, summaries, diffs and dependency artifacts so the LLM gets focused, relevant context.
- Deep Scan: runs a richer analysis over Workspace + instructions and recommends which files to include and in what form (editable, read-only, summary).
- Agentic Search: symbol-aware search (classes, methods, fields, usages, call graphs) across the full repo rather than simple text grep.
- Action set: Code (apply edits), Ask (question/answers on Workspace), Search (project exploration), Run in Shell (execute commands), Architect (multi-step planning and execution).
- Dependency handling: can import and decompile dependencies so the assistant understands third-party code and reduces hallucinations.
- Edit Loop: attempts to build/run tests after edits and feeds failures back to the LLM for automated revisions.
- Technical stack: Java desktop UI (Swing), Joern for static analysis, Jlama for local/pure-Java LLM inference; integrates with Maven/Gradle builds.
- Best fit: large enterprises and teams working on big Java monorepos or mixed-language monorepos where understanding cross-cutting references and history matters.
- Licensing note: GPL-3.0 is copyleft — derivative works that incorporate Brokk's code must be released under the same license.
- Not an IDE plugin: Brokk is a separate application (designed intentionally), though it can work alongside IDEs and version control workflows.
- 2025 updates: Lutz Mode (agentic research/planning/building loops for million-line codebases), BlitzForge (mass refactors at scale), Plan Mode (.18 update), renamed actions for clarity (Architect → "Code + Plan First", Code → "Code – Plan First", Search → "Answer + Search First", Ask → "Answer – Search First").

### Last Update
2026-01-30

## Licensing

### Opensource
- Yes

### License
- GNU General Public License v3.0 (GPL-3.0)

### Free Trial
- Yes
  - Open-source; free to run locally under the GPL-3.0 license (no hosted trial required to use the client).
  - No public hosted SaaS offering documented in the repo as of 2025-11-15; commercial/hosted options, if any, are not clearly listed in the OSS repository.

## MCP-Client
- Yes
  - MCP support added in the 2025 modernization update, enabling Model Context Protocol integrations.

### Prompts
- Yes
  - Brokk exposes action-specific prompts/templates and configurable model/prompt settings for different workflows (Code, Ask, Search, Architect), enabling tailored instructions per action.

### Tools
- Yes
  - Brokk integrates operational tools such as Run-in-Shell, build/test execution, dependency decompilation, Deep Scan automation, and Git-aware patch/diff management exposed as agent actions.

### Resources
- Yes
  - The Workspace can include decompiled dependency sources, compiled artifacts, summaries, and VCS history; these resources become first-class context for agent workflows.

### ACP
- No

## Deployment

### BYOK
- Yes

### Local Offline
- Yes
  - Brokk's client is open-source Java software; it ships with or can leverage Jlama for local/tiny-model inference and supports workflows that minimize cloud calls. Some advanced features may use hosted models depending on configuration.

## Developer Experience

### Context Management
- Yes
  - Workspace-driven context: users curate a Workspace containing selected files, generated summaries, diffs and dependency artifacts so the LLM receives only the focused context it needs (editable vs read-only panes).
  - Deep Scan: semantic, compiler-aware analysis recommends additional files and symbols to include based on the instruction and dataflow, reducing manual context selection.
  - Dependency summaries/decompilation: third-party libraries can be imported, summarized or decompiled into the Workspace so the assistant understands external APIs.
  - Build & history-aware context: Brokk infers build system details and can incorporate compiled artifacts and VCS history to provide richer, correct context for edits.

### Direct File References
- Yes
  - Files are referenced directly via the Workspace (explicit file inclusion), Agentic Search (symbol-aware file results and usages), and Deep Scan recommendations.
  - Code mode applies edits to concrete files in the Workspace and produces diffs/patches that are surfaced to Git; Ask mode answers are scoped to the files present in the Workspace.
  - Paths, symbols and call-graph locations are surfaced so prompts and agent actions can target precise files or symbols.

### Checkpoints
- Yes
  - Edits are produced as diffs/patches and Brokk is Git-aware; users can review changes, commit, or revert using standard VCS workflows.
  - The edit/build/test loop preserves build/test results and incremental revisions, allowing iterative rollback or refinement of agent-produced changes.

### Git Support
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Extensibility via the open-source client: Brokk's codebase and configuration enable integration points (model providers, build system adapters, dependency importers) and teams can extend behavior by modifying or contributing to the client.
  - BYOK and configurable model/provider integrations let organizations plug in their preferred LLMs and key management approaches.

### Hooks
- No

### SlashCommands
- No

### Skills
- No

### Custom Modes
- Yes
  - Interaction modes: Ask vs Code (different behavior and permissions for read-only exploration vs direct edits) and Architect (orchestration mode) let users tailor the level of automation.
  - Model/config overrides: Brokk allows configuring default models per action and selecting overrides for specific tasks, enabling cost/quality tradeoffs and task-specific tuning.

### Subagents
- Yes
  - Brokk provides distinct agent roles (Ask, Code, Architect) that act like specialized subagents for question answering, direct code edits, and multi-step autonomous planning/execution.
  - Architect enables multi-stage task planning and execution where the system composes sequences of agent actions and can iterate on results under human supervision.

