# AskCodi - https://www.askcodi.com
AI-assisted coding assistant and unified LLM gateway for developers

## General Info

### Classification
- Code/Editor

### Version
- Unknown (last checked 2025-10-18)
  - Web service with continuous updates; no public version releases

### Repo
- https://github.com/askcodi
- https://github.com/AskCodi/Sublime-AskCodi

### Rating
- [4] Feature set and tooling
- [4] IDE integration and workflows
- [4] Privacy controls (no-save claims for extensions)
- [4] Value for individual developers

### Short Description
AI-assisted coding assistant and OpenAI-compatible multi-model LLM gateway with IDE integrations and modular "Codi Apps" for focused developer tasks.

### Description
AskCodi is an AI-powered coding assistant and OpenAI-compatible LLM gateway developed to help developers generate, explain, refactor, document, and test code. It combines a suite of focused developer tools (branded as "Codi Apps") with IDE extensions and an API that lets teams call multiple LLM providers through a single endpoint. AskCodi emphasizes practical developer workflows — inline completions, chat, code explanation, unit-test generation, SQL/regex builders, and automated refactors — and aims to reduce context-switching by integrating directly into popular editors.

### Languages
- Any

### Notes
- Company/platform: positioned as a developer-focused toolkit (modular "Codi Apps") and an OpenAI-compatible API gateway that supports multiple model providers.  
- Privacy: AskCodi advertises no-save behavior for its extensions (privacy-focused by design), but it is primarily a cloud service.  
- Pricing: offers a Free tier and paid tiers (reported consumer Premium yearly plan around mid-range pricing); paid tiers increase AI credits, access to advanced models, and higher limits.  
- Integrations: VS Code extension (marketplace), other IDE support (JetBrains/IntelliJ family, Sublime, Neovim and others via community extensions).  
- Use cases: rapid snippet generation, documentation and docstring creation, unit-test generation, SQL/regex generation, refactoring, and code explanation for onboarding or legacy code comprehension.  
- Notable strengths: multi-model gateway, modular task-oriented toolset, direct IDE integrations.  
- Caveats: not open-source and primarily cloud-based; enterprise/local deployment and exact BYOK/local-offline capabilities should be confirmed against AskCodi's current documentation or sales/enterprise channels for sensitive or regulated environments.

### Last Update
- 2025-10-18

## Licensing

### Opensource
- No

### License
Proprietary

### FreeTrial
- Yes

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - Built-in prompt templates and task-focused prompt UIs are available via Codi Apps and the workbook/chat interfaces; API is OpenAI-compatible so standard prompt engineering applies.

### Tools
- Yes
  - Codi Apps: modular tools (refactor, test generation, SQL/regex builders, explainers) exposed in the web UI and IDE extensions.
  - IDE command palette integrations, keyboard shortcuts, and contextual editor actions (generate/document/explain/test code).

### Resources
- Yes
  - Documentation and guides on askcodi.com, an OpenAI-compatible API, GitHub repositories for editor extensions (e.g., Sublime), and marketplace listings (VS Code, Package Control).

## Deployment

### BYOK
- Yes

### LocalOffline
- No

## Developer Experience

### ContextManagement
- Yes
  - Codespaces: full-project upload/workspace that provides the model with repository-wide context (files, deps, project structure) for more accurate, consistent suggestions.
  - Codi Workbook: continuous, Jupyter-style sessions that preserve conversational and code-generation context across interactions within a project.
  - IDE extensions: session- and project-scoped chat history in Codi Chat; model selection and project settings help tailor contextual behavior.

### DirectFileReferences
- Yes
  - IDE extensions and Codespaces allow the assistant to reference files by path and read project files — open-file context in editors and uploaded workspace content in Codespaces enable targeted file-level operations.
  - Project-level workbooks/conversations can be associated with a project workspace so prompts and generations can point to specific files or directories within that workspace.

### Checkpoints
- No
  - AskCodi does not publicly document a built-in "checkpoint/undo" feature for generated changes; typical recovery/rollback would be handled via VCS (git) in the uploaded Codespace or local editor. Confirm enterprise/backups features with AskCodi sales/support for advanced checkpointing.

### GitSupport
- Yes
  - Reads project context / Codespace-style integrations for richer suggestions

## Extensible

### Extensible
- Yes
  - Plugin / "Codi Apps" modular tools model

### Plugins
- Yes
  - Codi Apps: an internal modular plugin-like system of specialized tools that provide focused capabilities (refactors, test generation, SQL/regex builders, explainers).
  - IDE plugins: official extensions for VS Code and other community extensions for JetBrains, Neovim, Sublime, Zed, Cursor, Continue.dev that integrate AskCodi features directly into editors.

### Hooks
- No
  - No public documentation found describing lifecycle hooks (webhooks, pre/post-generation hooks, or plugin lifecycle events) for AskCodi; if required for automation, confirm with AskCodi support or enterprise docs.

### SlashCommands
- No
  - There is no clear, public reference to a Slack-style or chat-slash-command system in AskCodi's public docs. IDE integrations do expose commands via editor command palettes, but an explicit "slash command" interface in the chat is not documented.

### CustomModes
- Yes
  - Model selection and per-project settings let teams select different LLMs or presets for specific workflows (e.g., choose Claude vs. GPT for particular task types), effectively creating tailored modes.
  - Codi Apps + Workbook combinations function as configurable modes for focused tasks (e.g., a testing mode using the unit-test generator app).

### Subagents
- Yes
  - Codi Apps: modular, task-oriented tools (code generation, test generation, SQL/regex builders, explainers) act like specialized agents for distinct developer tasks and can be selected per workflow.
  - Workbooks and project-based conversations let you compose and reuse focused tool flows that function similarly to subagents for project-specific needs.

## Ungrouped Criteria

### Terminal
- No

### SpecDrivenDevelopment
- Other
  - Not applicable / no direct mapping: AskCodi is a developer tooling platform and LLM gateway rather than a spec-driven development framework; it does not advertise built-in support for any of the above SDD frameworks in public documentation.
