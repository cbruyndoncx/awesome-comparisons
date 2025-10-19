# Brokk - https://brokk.ai
[ An AI-native code assistant optimized for large codebases; standalone Java desktop app that provides workspace-driven context engineering, Deep Scan, Agentic Search, and agentic Code/Ask/Architect workflows. Ideal for supervising LLMs with compiler-grade context in monorepos (especially Java). ]

## Version
v0.1 (2025-10-19)

## Rating
- [4] Strong for large, statically-typed codebases (Java monorepos): excellent context management and static-analysis driven workflows
- [3] Desktop-first UI and GPL-3.0 licensing may be tradeoffs for some teams

## Repository
- https://github.com/BrokkAi/brokk

## Languages
- Java
- (can analyze and work with other languages via dependency decompilation / semantic indexing; used in demos with Python and mixed stacks)

## Extensible
- Yes

## Description
[Brokk is a standalone, Java-based desktop application that rethinks AI-assisted coding for large repositories. Instead of treating a repo as text, Brokk builds compiler-grade context using static analysis (Joern) and semantic indexing, then exposes that curated context to LLMs via a Workspace. Key capabilities include Deep Scan (automated context recommendations), Agentic Search (symbol-aware project search), Code/Ask/Architect agents for different levels of intervention, dependency decompilation, and Git/history-aware context. Brokk's design focuses on reducing hallucinations and cost by giving models only the precise context they need rather than the entire repository.]

## BYOK
- Yes

## LocalOffline
- Yes
  [Brokk's client is open-source Java software; it ships with or can leverage Jlama for local/tiny-model inference and supports workflows that minimize cloud calls. Some advanced features may use hosted models depending on configuration.]

## FreeTrial

## GitSupport
- Yes

## Terminal
- Yes

## Opensource
- Yes

## License
- GNU General Public License v3.0 (GPL-3.0)

## MCPSupport

## Notes
[Additional details:]
- Workspace-first UX: users curate a Workspace of files, summaries, diffs and dependency artifacts so the LLM gets focused, relevant context.
- Deep Scan: runs a richer analysis over Workspace + instructions and recommends which files to include and in what form (editable, read-only, summary).
- Agentic Search: symbol-aware search (classes, methods, fields, usages, call graphs) across the full repo rather than simple text grep.
- Action set: Code (apply edits), Ask (question/answers on Workspace), Search (project exploration), Run in Shell (execute commands), Architect (multi-step planning and execution).
- Dependency handling: can import and decompile dependencies so the assistant understands third-party code and reduces hallucinations.
- Edit Loop: attempts to build/run tests after edits and feeds failures back to the LLM for automated revisions.
- Technical stack: Java desktop UI (Swing), Joern for static analysis, Jlama for local/pure-Java LLM inference; integrates with Maven/Gradle builds.
- Best fit: large enterprises and teams working on big Java monorepos or mixed-language monorepos where understanding cross-cutting references and history matters.
- Licensing note: GPL-3.0 is copyleft — derivative works that incorporate Brokk's code must be released under the same license.
- Not an IDE plugin: Brokk is a separate application (designed intentionally), though it can work alongside IDEs and version control workflows.]
