# Kiro CLI - https://www.example.com
<!-- Add the comparison entry name plus canonical URL on first line. -->

<!-- Describe this comparison entry using one or two paragraphs. -->

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Code/Terminal
- Code/Autonomous agent
- Product/Prototyping
- AIE/Model

- Kiro CLI is the terminal client for AWS's Kiro agentic development platform; it brings agent-driven, spec-driven development flows to the shell and can act autonomously to modify multiple files, run tools, and follow project "steering" files.

### Version
<!-- Latest version used for update -->
- GA (General Availability)
  - Kiro CLI is the production/GA release of AWS's Kiro platform (the successor to Amazon Q Developer CLI). No single semantic version number is published like an open-source repo; updates are rolled out by AWS.

### Repo
<!-- Associated Github repository -->
- -
  - Kiro CLI is an AWS-managed product (no public GitHub repo for the core product). Documentation and download links are published by AWS.

### Rating
- [4] Full-featured agentic CLI with MCP, steering files, custom agents, checkpoints, and spec-driven workflows
- [3] Proprietary AWS-managed product; no BYOK or offline support

### Short Description

- Terminal client for AWS Kiro — an agentic, spec-driven development assistant that uses steering files, MCP integration, and custom agents to scaffold, modify and debug code from the command line.

### Description
<!-- Few paragraphs about the product -->
- Kiro CLI is the command-line interface for AWS's Kiro platform. It exposes the same agentic development capabilities available in the Kiro IDE to developers who prefer working in a terminal. Key capabilities include spec-driven workflows (spec generation and implementation), project "steering" via markdown files in a .kiro/steering/ directory, Model Context Protocol (MCP) integrations to surface external data sources, custom agents tailored to team workflows, and an Auto agent that selects optimal models for tasks.
- The CLI can open editors for long prompts, accept multimodal inputs (including screenshots in supported workflows), manage MCP servers, create and run agents, and checkpoint/rollback agent actions. It is intended for interactive development tasks (scaffolding, debugging, infra-as-code) and for automations where an agent can operate across multiple files and tools within a repository.

### Languages
<!-- Any or limited list of supported programming Languages -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Any

- Kiro is language-agnostic and can operate on repositories in virtually any language. Commonly used languages include JavaScript/TypeScript, Python, Java, Go, Rust, C#, C/C++, Ruby and others — the agent uses repository context and steering files to follow project conventions rather than being limited to a specific language.

### Notes

- Kiro CLI shares steering files and configuration with the Kiro IDE, enabling consistent behavior across IDE and terminal workflows.
- The product is a managed AWS offering that uses subscriptions/credits for model usage; teams manage access via AWS Identity Center and related AWS account controls.

### Last Update
2026-01-30

## Licensing
<!-- Licensing -->
### Opensource
<!-- Coding tool is released under opensource license -->
<!-- Keep only the label values that apply to this comparison. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- No

- Kiro CLI is an AWS-managed commercial product; the core product is not published as open source.

### License
<!-- Opensource specific license or Proprietary for other commercial licenses -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Proprietary

- Distributed and operated by AWS under their commercial terms; third-party models accessible via the service are subject to their respective licenses.

### Free Trial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
<!-- Keep only the label values that apply to this comparison. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- -

- Pricing and trial/credit offers are managed by AWS; availability of trial credits can vary by account and promotion — refer to AWS Kiro documentation or the Kiro subscription portal for current offers.
## MCP-Client
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
### MCP-Client
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- Kiro CLI supports the Model Context Protocol (MCP) and can register/connect to MCP servers to extend context (docs, APIs, data sources). MCP server configuration and management commands are available in the CLI.

### Prompts
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- The CLI supports both short interactive prompts and longer multi-line prompts (which open the user's configured editor). Prompts may include steering file context and repository files automatically.

### Tools
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- Kiro agents can run pre-approved tools (linters, formatters, test runners, shell commands) and teams can control which tools an agent is permitted to execute.

### Resources
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- The CLI consumes steering files, repository files, MCP server data, and system/workspace metadata as resources to ground agent actions.
### ACP
- No

## Deployment
<!-- Deployment -->
### BYOK
<!-- Bring Your Own LLM API Key supported -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- No

- Kiro is a managed AWS product with models and routing controlled by the service; it does not generally function as a BYOK wrapper for arbitrary external LLM API keys.

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- No

- Kiro CLI is designed to integrate with AWS-managed services and models; it is not designed as an offline, self-hosted LLM stack.
## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- Context is managed via steering files in .kiro/steering/ (workspace and global scopes), AGENTS.md, MCP servers, and automatic workspace/system context injection.

### Direct File References
<!-- Can with @file or similar provide context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- Agents can read repository files and steering files; prompts and agent actions can reference files directly so the agent sees the actual source it will modify.

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- The CLI offers checkpointing/rollback semantics for agent actions so users can revert agent changes or step back through execution stages.

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- Kiro integrates with Git-based workflows (reads repository state, can create commits/branches as part of agent operations) and is designed to operate inside standard Git repos.
## Extensible
<!-- Is it possible to extend or customize the system in any way -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- Kiro supports custom agents, hooks and project-specific steering which together provide extensibility similar to plugins. Teams can define agents optimized for particular workflows.

### Hooks
<!-- Lifecycle events for the agent. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- Lifecycle hooks can be configured to run tests, linters, or other automation at defined points in agent workflows.

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- No
  - The CLI exposes subcommands rather than chat-style slash commands.

### Skills
- Yes
  - Progressive context loading: skills load only metadata (name/description) at startup, with full documentation loading on-demand when needed. Supports 18 built-in language skills.

### Custom Modes
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- Custom agents and steering files create specialist modes for different tasks (e.g., backend agent, frontend agent, devops agent).

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes as indented "- " entries beneath the kept values. -->
- Yes

- Users can create focused agents for specific responsibilities; these agents have pre-approved tools, dedicated steering/context, and can persist configuration across sessions.
