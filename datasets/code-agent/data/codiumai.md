# CodiumAI - https://qodo.ai
AI-powered test generation and code integrity platform (rebranded to Qodo)

## General Info

### Classification

- Test Generation & PR Review Tool

### Version
- Qodo platform with 5 specialized agents (Gen, Merge, Cover, Aware, Command); SWE-bench score 71.2% (2025-2026)

### Repo
- https://github.com/qodo-ai/pr-agent
- https://github.com/codium-ai/codium-code-examples
- https://github.com/codium-ai/codiumai-jetbrains-release

### Rating
- [4] Strong for automated test generation and PR analysis
- [3] General code completion compared to dedicated copilots

### Short Description

- AI-powered test generation, behavior-coverage analysis, and automated pull-request review platform (CodiumAI rebranded to Qodo in 2024).

### Description
CodiumAI (rebranded to Qodo) is an AI-first code quality platform focused on automated test generation, behavior coverage analysis, and AI-assisted pull request review. Rather than being a generic code completion assistant, its core capabilities generate meaningful unit and integration tests, map component behaviors to measure coverage, and provide actionable PR feedback. The company offers IDE plugins (VS Code, JetBrains family), a CLI/CI-friendly PR agent that can run in CI or self-hosted environments, and a suite of agentic features for automating QA workflows.

### Languages
- Python
- JavaScript / TypeScript
- Additional languages likely supported (check official documentation for complete list)

### Notes
- Rebranded to Qodo in 2024; platform and docs may be under either the Codium AI or Qodo name.
- Strong fit for teams that need better automated test coverage and PR-level code quality checks rather than just inline code completion.
- Provides behavior-coverage driven test generation which aims to produce diverse, behavior-focused tests instead of simple smoke tests.
- Offers IDE integrations, CI/CLI tools, and an open-source PR-Agent for self-hosting/CI use-cases.
- Enterprise offerings include additional controls and integrations; advanced models (including GPT-4) may be available on paid tiers.
- 2025-2026 Update: Qodo evolved into an enterprise-scale platform with 5 specialized agents (Qodo Gen, Merge, Cover, Aware, Command). New Codebase Intelligence Engine provides system-wide stateful model across module boundaries and cross-repo dependencies. Achieved verified 71.2% SWE-bench score and detects 42-48% of real-world runtime bugs. Added 15+ automated PR workflows including Jira/Azure DevOps validation, missing-test detection, and risk/complexity scoring. Multi-repo support (10-1000+ repos). Deployment options now include VPC, on-premise, zero-retention, SOC2, and GDPR compliance. Supports all major LLM providers (OpenAI, Claude, DeepSeek, Gemini, Meta AI). Pricing: free tier (250 msgs/month), team at $15/user.

- Repositories
  - https://github.com/qodo-ai/pr-agent
  - https://github.com/codium-ai/codium-code-examples
  - https://github.com/codium-ai/codiumai-jetbrains-release

### Last Update
- 2026-01-30

## Licensing

### Opensource
- Yes
  - Several components (notably the PR-Agent) are published as open-source while other parts of the platform remain proprietary or hosted.

### License
<!-- Opensource specific license or Proprietary for other commercial licenses -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- AGPL-3.0
- Proprietary

- PR-Agent (qodo-ai/pr-agent) is released under AGPL-3.0 (strong copyleft; network-use clause applies).
- The hosted Qodo product and some advanced features / models are provided under commercial/proprietary terms by the vendor.

### Free Trial
- Yes

## MCP-Client

### MCP-Client
- Yes
  - Qodo platform supports MCP-based integrations and agentic tooling for orchestrating specialized subagents and tool-specific pipelines.

### Prompts
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Provides configurable prompt templates and prompt engineering options in the product and PR-Agent settings; prompts are used for test generation, PR analysis, and feedback composition.

### Tools
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Supports tool integrations via MCP and native integrations (IDE plugins, GitHub/GitLab/Bitbucket, CLI). PR-Agent exposes capabilities to read diffs, fetch files, post comments, and run configured checks.

### Resources
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Public documentation, GitHub repositories (listed above), example projects, and CLI/Action integration guides are available.

### ACP
- No

## Deployment

### BYOK
<!-- Bring Your Own LLM API Key supported -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Self-hosted PR-Agent and local/CI installs accept environment-configured LLM API keys (e.g., OPENAI_KEY) and support custom model endpoints; this enables BYOK workflows when self-hosting.

### Local Offline
- No
  - Some components (for example PR-Agent) are available as open-source/self-hostable tools that can be run locally or in CI, but the full product and advanced model features are primarily cloud-based.

## Developer Experience

### Context Management
<!-- Methods for managing and updating the context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Uses deep repository indexing, PR-diff context, and MCP-driven tool contexts to provide rich, updating context to the agent. IDE plugins and PR-Agent surface contextual inputs automatically.

### Direct File References
<!-- Can with @file or similar provide context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- PR-Agent and IDE integrations can reference specific files and diffs in PRs; tools read file contents to generate tests and comments.

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Rollback and history rely on Git for checkpoints and audit trail. PR-Agent itself does not implement a separate versioned checkpoint UI but integrates with VCS history and CI workflows for undo/rollback.

### Git Support
- Yes

## Extensible

### Extensible
- Yes

### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Official IDE plugins for VS Code and JetBrains exist; integrations for Git hosting providers and CI are available.

### Hooks
<!-- Lifecycle events for the agent. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Supports webhook and CI lifecycle integrations; configuration options allow automation on PR events and comment-triggered actions.

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- PR comment slash-commands are supported (examples in repo/docs include commands such as `/add_docs` and other PR interaction triggers).

### Custom Modes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Agentic/Agent Mode and custom tool definitions via MCP allow tailoring behavior for specific workflows (test generation, security review, etc.).

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- MCP-based integrations and Qodo agentic tooling enable orchestrating specialized subagents/tools for task-specific pipelines.

