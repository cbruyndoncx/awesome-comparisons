# Warp - https://www.warp.dev
Modern AI-powered terminal and agentic development environment focused on unifying natural-language agents, terminal commands, and collaborative "Drive" features for teams.

## General Info

### Classification
- Code/Terminal

### Version
v2.0 (2025-09-xx)

### Repo
- https://www.warp.dev

### Rating
- [5] Best-in-class terminal + AI integration (Agent Mode, Drive, Warp Code)
- [4] Commercial/proprietary product; some enterprise privacy controls but limited public BYOK/local-offline detail

### Short Description
<!-- ToDo -->

-

### Description
Warp is a modern terminal that has evolved into an "Agentic Development Environment" (ADE). It tightly integrates large language models and agent workflows with the command line, providing natural-language command generation, an interactive chat/agent interface (Agent Mode), collaborative Drive features (Workflows, Notebooks, shared Environment Variables), and code-focused tooling (Warp Code with diff-tracking). Warp's interface lets developers mix prompts and shell commands in a single input, run multi-step agent plans, review and accept diffs produced by agents, and share/run parameterized Workflows across teams.

### Languages
- Any

### Notes
- Key features: Agent Mode (natural language -> commands), Warp Code (diff-tracking and stepwise code edits by agents), Drive (shared Workflows and Notebooks), Planning Mode and multi-agent orchestration.
- Privacy controls: granular autonomy settings (allowlists/denylists, pause/approve diffs, control file access), network logging, and zero-data-retention guarantees for enterprise customers.
- Strengths: Unified UX for prompt + shell input, native diff review for agent-made changes, strong collaboration primitives for teams.
- Limitations / unknowns: public documentation is limited on BYOK (bring-your-own-key) and fully offline local LLM operation; product is proprietary which may limit on-premise customization for some organizations.
- Recommended when: you want a first-class terminal with integrated AI agents and team sharing (Drive), and you prefer an opinionated, commercial product with enterprise privacy controls rather than an open-source self-hosted solution.

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
- Yes

## MCP-Client

### MCP-Client
- Yes
  - Warp supports selecting/modeling different hosted LLM providers and includes enterprise features like zero-data-retention guarantees and proxying; it exposes autonomy controls for when agents may call MCP servers without human approval.

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
<!-- ToDo -->
<!-- Bring Your Own LLM API Key supported -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### LocalOffline
- No
  - Note: Warp runs a local classifier to detect natural-language input, and some metadata/local processing happens on-device, but AI requests are typically proxied to selected LLM providers (OpenAI, Anthropic/Claude variants) unless explicitly configured via enterprise arrangements. There is no broadly-documented fully-offline LLM mode for the AI assistant as of the latest public releases.

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
  - Git workflows are supported via the terminal and Warp's code/diff UX; the tool is used to author and review code diffs produced by agents.

## Extensible

### Extensible
- Yes
  - Support for Workflows, Notebooks, Drive-based sharing and agent configuration

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
