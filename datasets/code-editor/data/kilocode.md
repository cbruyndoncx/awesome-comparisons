# Kilo Code - https://github.com/Kilo-Org/kilocode
Open-source AI coding assistant / VS Code extension

## General Info

### Classification
<!-- ToDo -->
<!-- AI Native Dev ainativedev.io Classification -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- AIE/Model
- Code/Autonomous agent
- Code/Editor
- Code/Other
- Code/Terminal
- Product/Prototyping
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Version
(2025-10-19)

### Repo
- https://github.com/Kilo-Org/kilocode

### Rating
- [4] Strong open-source AI coding assistant with broad model support and automation features
- [3] Some UI/issue rough edges reported; model consistency and cost management need attention
  - note: active community -> frequent updates

### Short Description
<!-- ToDo -->

-

### Description
Kilo Code is an open-source AI coding assistant implemented primarily as a Visual Studio Code extension. It combines natural-language code generation, multi-mode workflows (Architect, Coder, Debugger), and task automation to help developers plan, implement, and debug code within the editor. Kilo Code emphasizes context-awareness (project-level memory and indexing), extensibility via an MCP marketplace, and multi-model support so teams can choose models that match their needs for cost, latency, and privacy.

### Languages
- Any

### Notes
- Memory Bank: per-project persistent memory (stored in project files like .kilocode/rules/memory-bank/) that helps the assistant remember project-specific details and reduces repeated context prompts.
- Multi-mode design: Architect mode (planning & scaffolding), Coder mode (implementation), Debugger mode (investigation & fixes). Custom modes are supported for specialized workflows.
- Model Flexibility: Connects to many LLM providers (Claude, Gemini, OpenAI models, and local LMs). The platform can optionally provide credits to new users and also supports direct purchase of tokens at provider prices.
- Automation & Orchestration: Automates repetitive tasks such as refactors, dependency updates, test runs, and repository-wide edits with user approval. Also includes browser automation in some flows.
- Installation: Available on the Visual Studio Marketplace; can also be built and installed from source (.vsix). Development mode supports live reloading via F5 in VS Code.
- Strengths: Open-source, highly extensible (MCP), strong context-awareness and project memory, multi-model support including offline options.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- Yes
  - source available on GitHub, community contributions encouraged

### License
- MIT

### FreeTrial
- Yes
  - new users get onboarding credits via the platform (also can operate with your own keys)

## MCP-Client

### MCP-Client
- Yes
  - supports MCP Server Marketplace (JSON-based tool integrations / extensions)

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
  - supports connecting your own model/provider credentials when desired

### LocalOffline
- Yes
  - can be used with local model runtimes such as Ollama / LM Studio for offline or on-prem usage

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
  - deep Git/GitHub integration patterns for generating commit messages, searching codebase, and automating repo tasks

## Extensible

### Extensible
- Yes
  - MCP (Model Context Protocol) Server Marketplace for custom tools and integrations

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
  - incorporates terminal/CLI execution capabilities (inherited from Cline-style tooling) for running commands and automations

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
