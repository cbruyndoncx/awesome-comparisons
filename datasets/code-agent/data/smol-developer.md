# Smol Developer - https://github.com/smol-ai/developer/
A lightweight open-source AI developer agent for generating small projects and prototypes from natural-language specifications.

## General Info

### Classification

- Code/Autonomous agent

### Version
<!-- ToDo -->
<!-- Latest version used for update -->
-

### Repo
- https://github.com/smol-ai/developer

### Rating
- [4] Lightweight and easy to experiment with
- [3] Powerful for small whole-program synthesis tasks but not a full IDE replacement

### Short Description
<!-- ToDo -->

-

### Description
Smol Developer is an opinionated, small-footprint AI "developer" agent that aims to turn high-level product descriptions or markdown specs into runnable, small codebases. It is implemented in Python and designed for experimentation and rapid prototyping: you can run it as a library, as a git-repo driven workflow, or call it via an API-like interface. The project focuses on whole-program synthesis (generating multiple coordinated files rather than isolated snippets) and uses prompt engineering patterns (Markdown specs, planning + implementation steps) to keep results coherent across files.

### Languages
- Any

### Notes
- Core value: whole-program synthesis — Smol focuses on producing small, coherent applications from a single natural-language specification rather than only single-file completions.
- Usage modes:
  - Git Repo Mode: operate against a checked-out repository for iterative development and human review.
  - Library Mode: import smol as a Python package to script generation steps (planning, specifying file paths, generate).
  - API/Recipe Mode: integrate the agent into higher-level tooling or automated flows.
- Prompting DSL: leans on Markdown as the canonical way to describe requirements and specs for the agent.
- Good fit: rapid prototyping, scaffolding, learning how to implement features with unfamiliar APIs, and generating small demo apps or PoCs.
- Limitations: quality and speed depend heavily on the chosen LLM (GPT-4 is common but slower/costly). The tool is experimental — outputs require human review, testing, and iteration. Not designed as a drop-in replacement for full IDE/code-review workflows.

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

## MCP-Client

### MCP-Client
<!-- ToDo -->
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

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
  - Smol can be used with locally hosted/open-source LLMs in some setups, but most common usage relies on a cloud LLM (e.g., OpenAI GPT-4) which requires network access and an API key.

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
  - The repo includes a "git repo mode" workflow that operates on a repository, enabling human-in-the-loop prototyping and iteration.

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
  - Usable as a Python library and in repo-driven workflows; CLI/recipe-style usage patterns exist for iterative development.

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
