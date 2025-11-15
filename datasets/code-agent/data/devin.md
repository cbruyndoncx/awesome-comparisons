# Devin - https://devin.ai
An autonomous AI software engineer that plans, writes, tests, debugs, and deploys software in a sandboxed environment.

## General Info

### Classification

- Code/Autonomous agent

### Version
v1 (2024-03)

### Repo
-

### Rating
- [5] Strong autonomous end-to-end software development capabilities: planning, coding, testing, debugging, and deployment.
- [3] Early-stage product: impressive demos but requires human oversight for correctness, security, and architecture decisions.

### Short Description
<!-- ToDo -->

-

### Description
Devin is designed as an autonomous software engineering agent created by Cognition Labs. Unlike code-completion assistants, Devin accepts high-level natural-language tasks, decomposes them into step-by-step plans, and executes those plans inside a sandboxed environment (editor, shell, browser). It can install dependencies, modify code, run tests, search documentation, iterate on failures, and create pull requests. The product is aimed at accelerating engineering teams or acting as a junior developer to complete discrete tasks with minimal supervision.

### Languages
- Python
- JavaScript/TypeScript

### Notes
- Distinguishing features: autonomous multi-step planning and execution, long-horizon reasoning across thousands of micro-steps, ability to research (browse docs) and iteratively debug.
- Use cases: implementing features, patching bugs in codebases, creating prototypes, running engineering interviews and technical assessments, and integrating changes via Git.
- Known demos: autonomous fixes to open-source libraries (e.g., a Sympy patch demo) and building toy/full-stack apps (Game of Life example) in public demos.
- Caution: As with any autonomous code-writing system, outputs can be incorrect, insecure, or misaligned with architectural constraints. Human review and sandboxing are critical. Also consider IP, secret handling, and compliance when connecting repos or CI.
- Industry context: Part of a broader shift toward autonomous AI agents that take direct action, not just provide suggestions; competes conceptually with other agent-style developer tools but remains distinct from open-source code assistants.

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
-

## MCP-Client

### MCP-Client
-

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
-

### LocalOffline
- No
  - Runs as a cloud-hosted sandboxed agent rather than an offline/local-only product

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
  - Integrates with GitHub workflows and can open/modify repositories, create branches and PRs

## Extensible

### Extensible
- Yes
  - Integrations (GitHub, VS Code, Slack) and plugin-like connectors for repos and CI/CD

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
  - Provides an interactive shell in its UI so the agent can run commands and manage environments

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
