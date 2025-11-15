# Codename Goose - https://goose.ai/
Lightweight open-source agent framework for automating development and productivity workflows on-machine.

## General Info

### Classification

- Code/Autonomous agent

### Version
v1.10.3 (2025-10-19)

### Repo
- https://github.com/block/goose

### Rating
- [5] Strong open-source agent architecture and community focus
- [4] Powerful automation features; maturity depends on ecosystem of extensions

### Short Description
<!-- ToDo -->

-

### Description
Codename Goose is an open-source, on-machine AI agent framework created to automate multi-step tasks (initial focus on software engineering workflows). It is designed around an extensible tool system (Model Context Protocol / MCP) that lets the agent discover and interact with external services and developer tools (file systems, git, IDEs, CLIs, cloud APIs) through standardized interfaces. Goose supports multiple LLM providers and can operate via CLI or desktop interfaces, enabling both interactive assistance and autonomous workflows via shareable "Recipes" and project-level ".goosehints" guidance files.

### Languages
- Any

### Notes
- Key features: autonomous multi-step task execution, ".goosehints" project guidance, shareable and repeatable "Recipes" to capture workflows and make agentic behavior reproducible.
- Operational modes: Auto (full autonomy), Approve (prompt before making changes), Chat (suggestions only).
- Primary early use-cases: code generation & migrations, test generation, scaffolding, build/perf automation, and other developer productivity tasks.
- Strong emphasis on extensibility and preventing vendor lock-in by supporting multiple LLM providers and MCP-based extensions.
- Adoption and usefulness will depend on the growth of a healthy extension ecosystem (MCP servers) and high-quality recipes for common workflows.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- Yes

### License
<!-- ToDo -->
<!-- Opensource specific license or Proprietary for other commercial licenses -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- MIT
- Apache-2.0
- Proprietary
- FSL
- GPL-3.0
- AGPL-3.0
- BSD-3-Clause
- ISC
- MPL-2.0
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### FreeTrial
- Yes
  - Open-source and free to use; commercial offerings (if any) not required to run the core framework.

## MCP-Client

### MCP-Client
- Yes
  - Built around and interoperable with the Model Context Protocol (MCP) for tool discovery and standardized tool RPC.

### Prompts
<!-- ToDo -->
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Tools
<!-- ToDo -->
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Resources
<!-- ToDo -->
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## Deployment

### BYOK
- Yes

### LocalOffline
- Yes
  - Can run on-machine and integrate with local/self-hosted model providers via MCP-compatible bridges.

## Developer Experience

### ContextManagement
<!-- ToDo -->
<!-- Methods for managing and updating the context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### DirectFileReferences
<!-- ToDo -->
<!-- Can with @file or similar provide context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Checkpoints
<!-- ToDo -->
<!-- A way to undo using checkpoints or if autocommitted git history -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### GitSupport
- Yes
  - Integrates with git workflows to read/write/commit/branch as part of automated tasks.

## Extensible

### Extensible
- Yes

### Plugins
<!-- ToDo -->
<!-- A method of bundling together commands, agents and hooks (claude). -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Hooks
<!-- ToDo -->
<!-- Lifecycle events for the agent. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### SlashCommands
<!-- ToDo -->
<!-- Re-usable commands that can be manually triggered by the user. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### CustomModes
<!-- ToDo -->
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Subagents
<!-- ToDo -->
<!-- Define specialized AI subagents for task-specific workflows. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## Ungrouped Criteria

### Terminal
- Yes
  - Provides a CLI for scripting and interactive control.

### SpecDrivenDevelopment
<!-- ToDo -->
<!-- Has support for these Spec Driven Development methodologies: -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- BMAD
- SpecKit
- OpenSpec
- Tessl
- AgentOS
- ClaudeFlow
- SPARC
- SuperClaude
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
