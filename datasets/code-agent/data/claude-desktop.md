# Claude Desktop - https://claude.ai/
[Claude's desktop application for accessing Claude models, Skills, and file-aware workflows]

## General Info

### Classification

- Code/Autonomous agent

### Version
v1.0 (2025-10-18)

### Repo
-

### Rating
- [4] Strong multi-modal and long-context capabilities
- [4] Powerful "Skills" integration for automating structured workflows

### Short Description
<!-- ToDo -->

-

### Description
Claude Desktop is Anthropic's desktop application that brings the Claude family of models and the Skills ecosystem to a native app experience. It exposes capabilities such as file creation and editing (spreadsheets, slide decks, documents, PDFs), Skills-driven automation, and integrations that let Claude interact with local files and services. The desktop environment also supports extensions to simplify installing and connecting Model Context Protocol (MCP) servers and other local connectors.

Designed for Pro, Max, Team and Enterprise customers, Claude Desktop aims to make agentic workflows and productivity features (e.g., generating company-standard reports, programmatic file edits, and form-filling) accessible without switching contexts between browser tabs.

### Languages
- Any

### Notes
- Skills: Claude Desktop leverages the Skills system to encode org-specific procedures and standards. Skills can be created and shared (Team/Enterprise controls apply), and Claude will automatically invoke relevant skills when they match a user's request.
- File operations: The app supports creating and editing Excel-like spreadsheets (including formulas), PowerPoint slide decks, Word documents, and fillable PDFs via Skills and built-in file tooling.
- Computer use & automation: Anthropic has been developing "computer use" capabilities that let Claude interact with desktop software and browser UIs programmatically; this underpins some advanced desktop automation features but is still experimental and constrained.
- Desktop extensions & MCP: Extensions and MCP-compatible helpers simplify connecting local services and MCP servers to Claude, reducing installation friction for advanced local integrations.
- Enterprise features: Many advanced deployment, security, and integration details (including BYOK, on-prem routing, and fine-grained admin controls) are oriented toward Team and Enterprise customers and are not fully documented in public product pages.
- Comparison note: For heavy developer workflows that require CLI-first, git-aware operations and explicit BYOK/local routing, Claude Code (Anthropic's CLI/terminal tool) is a more explicit offering; Claude Desktop is focused on productivity, file workflows, and Skills-driven automation inside a native app.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- No

## MCP-Client

### MCP-Client
- Yes

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
- No

### LocalOffline
- No
  - Any additional details like Ollama: Anthropic's desktop offering is primarily cloud-connected. Public documentation does not describe a fully local/offline model runtime. Enterprise/Team tooling (like Claude Code) can be configured to route through organization-managed endpoints; if BYOK/local hosting matters for your use case, contact Anthropic sales/support for enterprise deployment options.

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
- No

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
- No

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
