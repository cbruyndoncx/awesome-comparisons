# Amp - https://sourcegraph.com/amp
A research-preview, agentic AI coding assistant from Sourcegraph that focuses on autonomous, multi-step code reasoning and high-quality code edits rather than simple autocomplete. Runs as a VS Code extension and a CLI, and integrates with the Model Context Protocol (MCP) and project-level AGENT.md conventions to produce context-aware changes.

## General Info

### Classification

- Code/Autonomous agent

### Version
(2025-10-19)

### Repo
<!-- ToDo -->
<!-- Associated Github repository -->
-

### Rating
- [4] Interface / UX (user-reported)
- [4] Code quality
- [4]] Input processing (understanding intent)
- [3] Accuracy
- [3] Documentation / Community support
- [3] Update cadence / shipping

### Short Description
<!-- ToDo -->

-

### Description
Amp is designed as an "agentic" coding assistant that can autonomously reason through multi-step programming tasks, propose and apply coordinated code edits, and collaborate via shared conversation threads. It prioritises quality over token limits, dynamically selects high-quality models (e.g., Claude Sonnet 4 where available), and exposes both an IDE extension and a CLI for flexible workflows.

### Languages
- Any

### Notes
- Agentic design: Amp works as an autonomous agent that can perform multi-step reasoning, gather context from the repo, and iteratively refine changes.
- AGENT.md integration: Amp reads project AGENT.md files to adopt repo-specific conventions and standards, improving alignment with existing codebase patterns.
- Extended thinking: Supports adjustable "thinking budget" for deeper, higher-quality reasoning on complex tasks.
- Thread sharing & collaboration: Conversation threads can be synced and shared to a web console for team collaboration, knowledge sharing, and reproducibility of AI-driven change sequences.
- Command allowlisting: Security control that limits which shell/CLI commands the agent may execute, stored with project settings.
- Dual environment: Both VS Code extension and CLI are available — the CLI enables parallel, lightweight agent runs; the extension surfaces suggestions inline while preserving developer workflows.
- Security & testing: Best used alongside automated security testing (DAST/SAST) to catch vulnerabilities introduced during rapid AI-driven edits.
- Use cases: large-scale refactors, implementing cross-cutting features, writing complex algorithms, creating board-level changes spanning multiple files.
- Market position: Positioned as a next-generation, high-quality AI coding agent for teams wanting autonomous assistance beyond standard completion tools.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- No

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
- Yes

### LocalOffline
- Yes
  - Supports MCP servers which can point to local or self-hosted model/context providers

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
