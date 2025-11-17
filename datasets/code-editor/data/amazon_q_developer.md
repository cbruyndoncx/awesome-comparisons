# Amazon Q Developer- https://aws.amazon.com/q/
Amazon Q Developer (sometimes shortened to "Amazon Q") is AWS's developer-facing generative-AI platform that provides conversational assistance, code generation, and developer tooling integrated directly into popular IDEs and the AWS Console. It consolidates earlier AWS coding assistants (including CodeWhisperer) into a single experience and adds workspace-aware chat, documentation generation, security scanning, and integrations with external context providers.

## General Info

### Classification
- Code/Editor

### Version
vN/A (2025-10-19)

### Repo
- https://aws.amazon.com/q/ (service documentation)

### Rating
- [4] IDE & AWS integration (deep integration with AWS services and IDE toolchains)
- [4] Productivity (context-aware chat, inline suggestions, code actions, and docs generation)
- [3] Privacy/enterprise controls (cloud-hosted, limited BYOK/local/offline options)
- [4] Extensibility (MCP/plugins and third-party integrations)

### Short Description
- AWS's developer-focused generative-AI assistant embedded in IDEs and the AWS Console, providing workspace-aware chat, inline code actions, documentation generation, security scanning, and MCP-based integrations.

### Description
Amazon Q Developer is an AWS-hosted generative-AI assistant for developers that embeds into IDEs (VS Code, JetBrains family, Eclipse, Visual Studio) and the AWS Console. It provides:
- Conversational chat and agentic workflows for understanding and modifying code
- Inline suggestions and code actions (Explain, Refactor, Fix, Optimize, Generate Tests, etc.) directly from the editor
- Documentation generation (e.g., create README or component docs via chat commands)
- Security scanning and guidance surfaced alongside code suggestions
- Integrations with external context providers through MCP and plugin aliases (e.g., CloudZero, Datadog, Wiz)
- Code transformation and migration helpers for language/OS modernization

Amazon Q unifies prior AWS assistants (CodeWhisperer features were integrated into the Amazon Q experience in 2024) and is intended to accelerate development on AWS services while providing deeper context about a project and its cloud resources.

### Languages
- Any

### Notes
- Supported IDEs: Visual Studio Code, JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.), Eclipse, and Visual Studio — feature parity varies by IDE (VSCode and JetBrains typically have the richest feature set).
- Authentication: Supports AWS Builder ID and IAM Identity Center. Builder ID allows individuals to use Amazon Q without an AWS account; IAM Identity Center sessions for Amazon Q may have extended durations (90 days for setups created on/after 2024-04-18 in some configurations).
- Example editor actions: select code → right-click → Amazon Q → Explain / Refactor / Fix / Optimize / Generate Tests / Send to Prompt / Inline Chat.
- Documentation generation: a chat command (e.g. `/doc`) can be used to create README or other docs by analyzing the workspace.
- Security & reference tracking: inherits capabilities from CodeWhisperer lineage — surfaces potential vulnerabilities, license/reference links when generated code closely matches examples, and provides remediation guidance.
- Third-party plugins: Amazon Q supports integrations with monitoring/security providers via a plugin alias system in the AWS Console; examples reported include CloudZero, Datadog, Wiz (these pull provider data via APIs and Q surfaces results and deep links without sending the user's chat content to the provider).
- Use cases: onboarding and code comprehension, generating boilerplate, test generation, migrating or modernizing code, documenting projects, security scanning and remediation guidance, and creating AWS infra-aware code snippets.
- Limitations: cloud-hosted (no fully local/offline mode), generated code requires human review for correctness/security/licensing, enterprise controls and BYOK options are limited compared to self-hosted offerings.
- Related: Amazon CodeWhisperer functionality was consolidated into Amazon Q Developer around April 2024; for legacy references check CodeWhisperer docs (https://aws.amazon.com/codewhisperer/).

### Last Update
- 2025-10-19

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Yes
  - Notes: AWS has offered free tiers or developer-friendly access for prior services (CodeWhisperer) and provides Builder ID sign-in options; enterprise pricing & feature bundles for Amazon Q are documented in AWS pricing/docs.

## MCP-Client

### MCP-Client
- Yes
  - Notes: Supports Model Context Protocol / MCP server connections to bring external context into conversations and agent workflows.

### Prompts
- Yes
  - Centralized prompt management available: local (workspace), global (user), and MCP-provided prompts.
  - CLI and UI commands: `/prompts list`, `/prompts create`, `/prompts edit`, `/prompts details` and content preview before execution.
  - Invocation: prompts can be invoked in chat with the `@` prefix (e.g., `@code-review`).
  - Storage locations: local prompts saved under `.amazonq/prompts/`, user/global prompts under `~/.aws/amazonq/prompts/`, MCP prompts surfaced from configured MCP servers.
### Tools
- Yes
  - Editor integrations: inline actions (Explain, Refactor, Fix, Optimize, Generate Tests, Send to Prompt, Inline Chat) available in VS Code, JetBrains IDEs, Eclipse, and Visual Studio (feature parity varies).
  - CLI & agent commands: `/prompts` management, `/doc`, `/dev`, `/transform`, `/review`, `/test` and other slash/agent commands for multi-step workflows and automation.
  - Security & QA tooling: built-in security scanning, license/reference tracking, automated code review and unit-test generation workflows.
  - MCP & plugin integrations: supports MCP server connectors and AWS Console plugin aliases (e.g., CloudZero, Datadog, Wiz) to surface external data and actions inside chats.
  - Model & infra integrations: integrates with Amazon Bedrock/Titan models and AWS services (CodeCatalyst, SageMaker, CloudShell) to enable workspace-aware assistance and ML/infra tasks.
  - Automation/agents: agentic workflows that can orchestrate changes across multiple files, generate documentation, run transformations, and apply code fixes.

### Resources
- Yes
  - Official docs & guides: AWS product documentation and Getting Started guides covering IDE installation, Builder ID/IAM authentication, and feature walkthroughs.
  - Tutorials & blog posts: step-by-step tutorials (e.g., generating documentation, test generation) and example walkthroughs demonstrating real-world usage patterns.
  - Community prompt libraries: Promptz and community repos (e.g., awesome-q-developer) for shared prompts, agents, and rules.
  - Videos & quick-starts: short videos and demos showing setup and common workflows for IDEs like VS Code and JetBrains.
  - Examples & samples: sample projects showing /doc usage, code refactoring, test generation, and transformation workflows.
## Deployment

### BYOK
- No

### LocalOffline
- No

## Developer Experience

### ContextManagement
- Yes
  - Amazon Q provides multiple methods to manage and update context for IDE conversations and agentic workflows:
    - Workspace context: the IDE plugin can analyze the open workspace (project files, dependency manifests, build files) to provide workspace-aware responses and code generation.
    - File-level context: selecting a file or code range and invoking actions (Explain / Refactor / Fix / Send to Prompt / Inline Chat) passes that precise code as context for the assistant.
    - Inline chat context: editor-integrated chat threads that retain recent messages and file references so follow-up prompts remain aware of prior discussion and selected files.
    - MCP (Model Context Protocol) servers: external MCP connectors supply additional contextual sources (Jira, Figma, monitoring/security tools) which are merged into the assistant's context when configured via mcp.json and enabled in settings.
    - Command-based context triggers: chat commands (e.g., /doc) initiate workspace-wide analyses that explicitly gather and use project context to produce artifacts (README, docs, etc.).

### DirectFileReferences
- Yes
  - Files can be directly referenced and used as context by the IDE plugin:
    - Select-and-action model: highlight code or open a file and invoke Amazon Q actions to send that file/range as direct context to the assistant.
    - Workspace analysis: commands like /doc trigger automated scanning of repository structure and key files to generate documentation or summaries.
    - Deep linking in IDE: generated edits and files are applied directly into the local repository (via standard editor apply/replace flows) so references are maintained in-place.

### Checkpoints
- Yes
  - Undo / rollback options in typical workflows include:
    - Editor undo and local change staging: changes generated by Amazon Q are applied through the IDE, so standard undo/redo and editor history apply immediately after edits.
    - Git / VCS: recommended rollback mechanism—users can commit or stash before applying changes and use git to revert unwanted modifications (no built-in Q checkpointing was documented).
    - No documented built-in persistent "checkpoint" or automatic snapshot feature inside Amazon Q itself; rely on editor and VCS for safe rollback.

### GitSupport
- Yes
  - Works with repository workflows via IDE integrations; generated suggestions and transformations can be applied to local repos but require human review for correctness and licensing.

## Extensible

### Extensible
- Yes
  - Supports Model Context Protocol (MCP) connections and a plugin/alias system for third-party tooling (monitoring, security providers)

### Plugins
- Yes
  - Amazon Q supports a plugin/alias system and MCP-based integrations:
    - AWS Console plugin aliases: third-party providers (CloudZero, Datadog, Wiz) are configured as aliases; prefixing queries with an alias causes Amazon Q to call that provider's APIs and surface results with deep links.
    - MCP servers: act as plugin-style connectors that expose structured context and actions to the assistant (e.g., Jira issues, Figma designs, cluster data from an EKS MCP server).
    - Privacy model: plugin usage is designed to avoid sending chat transcripts to third-party providers during configuration and use (data flows are described in docs as provider API calls initiated by the Q service and surfaced to the user).
    - Bundling: while there isn't a published "plugin SDK" in the same sense as browser extensions, MCP provides the protocol for bundling tool connectors, and the AWS Console aliasing provides the user-visible mechanism to call them.

### Hooks
- No
  - There is no public documentation describing a lifecycle-events/hooks API for attaching custom agent lifecycle callbacks inside Amazon Q Developer plugins. MCP enables external context providers and tool integrations, but explicit lifecycle hook APIs for agent-generated events (e.g., "onBeforeChange", "onAfterApply", or persistent event subscriptions") are not documented in the available sources.

### SlashCommands
- Yes
  - Amazon Q exposes chat/command triggers in supported surfaces:
    - /doc: workspace documentation generation (create README, component docs) by analyzing the project.
    - Editor actions exposed via context menus and inline chat (these act like command triggers: Explain, Refactor, Fix, Optimize, Generate Tests, Send to Prompt).
    - AWS Console plugin alias prefixing: in the AWS console chat, prefixing questions with a plugin alias triggers calls to third-party plugin APIs (CloudZero, Datadog, Wiz) and surfaces provider data inline.

### CustomModes
- Yes
  - Customization and tailoring mechanisms include:
    - IDE settings: toggles and preferences (e.g., enable MCP, plugin aliases) to adjust how Amazon Q behaves in the developer's environment.
    - Project-scoped context: configuring MCP servers and workspace analysis yields domain-specific behavior for a particular repository.
    - Plugin aliasing in the AWS Console: using different aliases effectively changes the plugin/toolset the assistant will consult, producing different response modes for queries.
  - Note: there is no strong public documentation of a formal "mode authoring" UI for end-users to create persistent named personas; tailoring today is primarily achieved via configuration and MCP/plugin composition.

### Subagents
- Yes
  - Amazon Q supports agentic and multi-tool workflows that act like specialized subagents:
    - Feature development agents: natural-language feature descriptions can spawn agentic workflows that modify multiple files across the workspace to implement that feature.
    - MCP-enabled connectors: MCP servers act as specialized tool connectors (Jira, Figma, EKS server) that the assistant can query as part of an orchestrated workflow.
    - Automated test/code-review agents: built-in units for generating tests and performing code reviews behave like task-specialist agents executed within the IDE.

## Ungrouped Criteria

### Terminal
- No
  - Primary surface: IDE plugins and AWS Console chat. There is no official terminal-only interactive CLI assistant equivalent documented as the main surface.

### SpecDrivenDevelopment
- No
  - No documented, built-in support or official integrations for specific Spec Driven Development frameworks (BMAD, SpecKit, OpenSpec, Tessl, AgentOS, ClaudeFlow, SPARC, SuperClaude). Amazon Q provides workspace analysis, prompts, and MCP integrations that can be incorporated into spec-driven workflows, but there is no evidence of first-class adapters or direct support for these named frameworks.
