# RooCode - https://roocode.ai
RooCode (formerly Roo Cline) is an AI-powered VS Code extension that acts as an autonomous coding assistant with customizable personas (modes), multi-model support, and project-level automation.

## General Info

### Classification
- Code/Editor

### Version
v3.3 (2024-10-18)

### Repo
- https://github.com/RooCodeInc/Roo-Code

### Rating
- [4] Strong multi-mode assistant with deep VS Code integration
- [3] Experimental parts (VS Code LLM API, some provider integrations) can be rough

### Short Description
<!-- ToDo -->

-

### Description
RooCode is designed to be more than an autocomplete plugin — it functions as an autonomous agent inside VS Code that can read/write files, run terminal commands, automate browser interactions, and orchestrate multi-step development tasks. It exposes built-in personas (Code, Architect, Ask, Debug) and allows developers to create custom modes with tailored prompts, file restrictions, and permissions. The extension supports multiple AI providers (OpenAI, Anthropic, Google Gemini, OpenRouter and others) and can be configured to use different models for different tasks to balance cost and capability. It includes features such as cost/token tracking, auto-approve actions (optional autonomy), inline editing, and Model Context Protocol (MCP) integration for controlling external systems.

### Languages
- Any

### Notes
- Operational modes: Code (implementation), Architect (design/architecture), Ask (Q&A/research), Debug (troubleshooting). Modes can auto-switch or be created by users.
- Provider flexibility: BYOK model lets teams choose vendors and control costs; OpenRouter is commonly supported for multi-provider access.
- Experimental VS Code Language Model API support is available, but feature parity and cost/usage visibility vary versus direct API connections.
- Cost tracking and usage reporting help teams monitor token usage across models and sessions.
- Installation: available on Visual Studio Marketplace; can also be built and installed from source (pnpm/npm workflows, build VSIX).
- Community & forks: active community forks and experimental branches exist; check the primary repo and its forks for the latest features.
- Considerations: while powerful, RooCode’s autonomy features require careful configuration (auto-approve actions, file restrictions) to avoid unintended changes. Local/offline model support exists but may require additional setup and offers different capabilities than cloud models.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### FreeTrial
- Yes
  - The extension itself is free/open-source; model usage costs depend on the API keys/providers you supply.

## MCP-Client

### MCP-Client
- Yes
  - MCP servers extend RooCode beyond the editor to interact with Docker, databases, browsers and other external tooling.

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
  - Can be configured to use local model runtimes via Ollama / LM Studio or other locally-hosted model endpoints (support and experience depends on provider and model compatibility). Fully offline workflows may be limited compared to cloud API usage.

## Developer Experience

### ContextManagement
- Yes
  - RooCode provides multiple context-management methods: semantic workspace indexing (configurable embedding providers and vector DBs), explicit file/selection mentions (using `@` to include files, ranges or terminal output), automatic context condensing when length limits are reached, configurable context limits per mode, and a persistent Memory Bank for long-lived project facts. The extension also supports MCP-based context extensions so external systems can contribute contextual data.

### DirectFileReferences
- Yes
  - Files and specific ranges can be referenced directly in prompts (via the editor UI and `@` mentions). RooCode can read/write workspace files, present diffs for review, and include terminal output or file snippets inline into the conversation for targeted edits or reasoning.

### Checkpoints
- Yes
  - RooCode implements checkpointing and diffs: it records change checkpoints (and ties into VS Code timeline/git workflows), shows diffs for review before applying edits, and allows reverting to previous states. Auto-approve settings can be gated with explicit checkpoints to prevent unwanted changes.

### GitSupport
- Yes
  - RooCode can run terminal/cli actions and operate on workspace files; many users run git commands through the integrated terminal or via custom MCP servers.

## Extensible

### Extensible
- Yes
  - VS Code extension architecture, custom modes, MCP (Model Context Protocol) servers, and provider/plugin integrations

### Plugins
- Yes
  - RooCode supports extension via MCP plugins/providers and integrates with multiple model providers. Teams can bundle together provider configurations, MCP servers, and custom modes to produce reusable plugin-like setups that encapsulate commands, tools, and integrations.

### Hooks
- Yes
  - RooCode exposes lifecycle-like behaviors via its modes and MCP integrations: custom modes can define pre/post actions and permission rules; MCP servers allow external tooling to register endpoints and respond to agent events; checkpointing and auto-approve flows provide hook points where the user can intercept or allow automated actions. Additionally, VS Code command palette integration and tasks provide natural hook points for automation.

### SlashCommands
- Yes
  - RooCode integrates with VS Code commands and provides re-usable actions through custom modes and task templates. Users can invoke RooCode functionality from the command palette, configure auto-approve command flows, and reuse mode-specific commands and personas for repeated workflows.

### CustomModes
- Yes
  - Users can create specialist modes (personas) with custom instructions, file restrictions, model selections, and permission boundaries. Modes are configurable and can be tied to specific models or providers, allowing tailoring of the assistant for tasks like architecture review, QA, or refactoring.

### Subagents
- Yes
  - RooCode supports composing multi-step workflows (Boomerang tasks) and persona-driven sub-workflows that act like subagents. MCP servers and custom modes can delegate specific responsibilities (running tests, managing containers, calling external APIs), enabling specialized subagent-like behavior for task-specific automation.

## Ungrouped Criteria

### Terminal
- Yes
  - Supports running terminal commands and automation as part of tasks and modes.

### SpecDrivenDevelopment
- Other
  - RooCode is an AI coding assistant/IDE extension rather than a spec-driven development framework. It does not ship with a native SDD framework, though it can be used alongside any spec-driven workflow (including Tessl or custom spec tools) by operating on the same workspace files and automating edits based on spec requirements.
