# JetBrains Junie - https://www.jetbrains.com/junie/

JetBrains Junie is an AI coding agent embedded directly into JetBrains IDEs, integrated into the unified AI Chat panel since December 2025. It operates across all 10 JetBrains IDEs including IntelliJ IDEA, PyCharm, GoLand, and Android Studio, offering two operating modes: Code Mode for autonomous task execution and Ask Mode for collaborative planning.

Junie's key differentiator is post-generation validation — it runs the IDE's built-in inspection framework and executes tests automatically after code changes, catching type mismatches, compilation errors, and semantic issues before the developer sees the result.

**Dataset ID:** code-editor

## General Info

### Classification
- Code/Editor
- Code/Autonomous agent

### Version
- GA (December 2025 / Junie CLI March 2026)

### Repo
- -
  - Proprietary JetBrains product.

### Rating
- [4] Deep IDE-native integration with post-generation validation (inspections + test execution) is a strong safety net
- [3] Best for single-project tasks; less effective for cross-service or multi-repo feature work

### Short Description

- AI coding agent embedded in all JetBrains IDEs with autonomous Code Mode, collaborative Ask Mode, and built-in post-generation validation.

### Description

JetBrains Junie is an agentic AI assistant that lives inside JetBrains IDEs, accessible from the AI Chat panel alongside JetBrains AI Assistant. It was integrated into the unified chat interface in December 2025 and supports all 10 JetBrains IDEs. Junie operates in two modes: Code Mode autonomously writes code, refactors, runs tests, and verifies changes with no intervention required; Ask Mode answers questions, brainstorms, and proposes execution plans for developer review before any changes are made.

A key architectural decision is post-generation safety validation: after generating code, Junie automatically runs IDE inspections for syntax and semantic errors and executes the project's test suite, catching issues like type mismatches and compilation failures. This reduces the feedback loop for catching LLM-introduced bugs. In March 2026 JetBrains released Junie CLI, a standalone cross-platform (macOS, Linux, Windows) version with BYOK support for OpenAI, Anthropic, Google, and Grok models, making Junie accessible outside the IDE.

### Languages
- Any
  - Inherits language intelligence from the host IDE; deepest support for Java (IntelliJ IDEA), Python (PyCharm), Kotlin (Android Studio), Go (GoLand).

### Notes
- Workflow: Describe task → Review proposed plan → Execute → Validate — all without leaving the editor.
- Junie CLI (March 2026): standalone cross-platform agent; BYOK support for OpenAI, Anthropic, Google, Grok.
- Less effective for features spanning multiple services or repositories.
- JetBrains Agent Client Protocol enables integration of third-party agents like Cursor into the JetBrains ecosystem.

### Last Update
- 2026-05-13

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Free plan available; paid tiers from $10/month (individual) to $60/month (enterprise).

## MCP-Client

### MCP-Client
- Yes
  - MCP support via JetBrains AI ecosystem.

### Prompts
- Yes

### Tools
- Yes

### Resources
- Yes

### ACP
- Yes
  - JetBrains Agent Client Protocol (ACP) for standardized editor-agent communication; allows third-party agents to integrate.

## Deployment

### BYOK
- Yes
  - Junie CLI supports BYOK with OpenAI, Anthropic, Google, and Grok. IDE version uses JetBrains AI service.

### Local Offline
- No
  - Requires connectivity to JetBrains AI service or external LLM provider (Junie CLI).

## Developer Experience

### Context Management
- Yes
  - Full project indexing; IDE-native codebase understanding; context scoped to open project.

### Direct File References
- Yes

### Checkpoints
- No

### Git Support
- Yes
  - Aware of Git state; can commit and apply changes within IDE VCS integration.

## Extensible

### Plugins
- Yes
  - Hosted within JetBrains plugin ecosystem; VS Code extensions not supported.

### Hooks
- No

### SlashCommands
- Yes

### Skills
- No

### Custom Modes
- No

### Subagents
- No
