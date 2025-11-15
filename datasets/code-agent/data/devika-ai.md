# Opcode (Devika AI) - https://opcode.sh
An open-source agentic AI software engineer for end-to-end code generation, research, and project automation.

## General Info

### Classification

- Code/Autonomous agent

### Version
v (2025-10-19)

### Repo
- https://github.com/stitionai/devika

### Rating
- [4] Mature feature set for an open-source project (planning, multi-LLM support, local LLMs)
- [4] Actively developed community project with wide model compatibility

### Short Description
<!-- ToDo -->

-

### Description
Devika AI is an open-source "software engineer" agent that accepts high-level instructions, creates plans, researches needed information, and implements code across projects. It emphasizes multi-model support (cloud LLMs and local LLMs via Ollama), agentic planning and reasoning, project-based organization, and automation of development tasks including coding, testing, and deployment.

Key capabilities include automated planning (breaking objectives into actionable steps), web research (browse and extract relevant docs), code generation across multiple languages/stack contexts, repository/Git integration, and deployment helpers (for example, static site deployment to Netlify).

### Languages
- JavaScript / TypeScript
- Python
- Shell

### Notes
- Multi-model support: commonly used with Claude 3, GPT-4, Gemini, Mistral, Groq and local models via Ollama.
- Requirements: commonly references Bun (JavaScript runtime), Ollama for local LLMs, Git, and standard development tooling.
- Project organization: project-based workspace model with persistent state and task tracking so agents can continue work across sessions.
- Research and browsing: built-in research module for fetching and summarizing web documentation, API references, and examples.
- Use cases: full-stack feature implementation, repo maintenance, automated testing, documentation generation, and static site deployment.
- Community & contribution: open-source repo on GitHub encourages contributions; check repository for issues, contribution guidelines and exact license details.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- Yes

### License
- MIT

### FreeTrial
- Yes
  - The project is open-source and free to run; commercial clouds/models used via BYOK may incur costs.

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
  - Supports configuring API keys/endpoints for OpenAI, Claude, Gemini, Mistral, Groq, Bing/Google search, Ollama, etc.

### LocalOffline
- Yes

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
  - Integrates with project repositories and can perform Git operations as part of its workflows.

## Extensible

### Extensible
- Yes
  - Modular architecture designed to add new model adapters, tools, and integrations

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
  - Provides CLI and web UI components; integrates with local runtimes (Bun, Ollama) and shells for execution.

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
