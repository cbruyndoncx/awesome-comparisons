# Continue - https://continue.dev
Open-source AI coding assistant focused on developer control, model choice, and IDE/CLI integration.

## General Info

### Classification
- Code/Editor

### Version
- v1.0+ (2025-2026)
  - 1.0 release stabilized core features; Mission Control redesign for automated development orchestration; Cascade agent for codebase-wide reasoning and multi-file edits.

### Repo
- https://github.com/continuedev/continue

### Rating
- [4] Strong customization and model choice
- [4] Good IDE & CLI coverage (VS Code, JetBrains, terminal)
- [3] Hub & team features maturing (1.0 release)

### Short Description
Open-source AI coding assistant and platform that brings AI capabilities into editors (VS Code, JetBrains), the terminal (CLI) and CI/CD workflows, emphasizing developer control, model choice, customization, and privacy.

-

### Description
Continue is an open-source AI coding assistant and platform that brings AI capabilities into editors (VS Code, JetBrains), the terminal (CLI) and CI/CD workflows. It emphasizes developer control: choose models (cloud or local), customize prompts and agents, and run fully local/offline when required. The platform includes IDE extensions, a CLI (cn) with interactive and headless modes, and an optional Continue Hub for sharing and managing assistant building blocks.

### Languages
- Any

### Notes
- Strengths:
  - Model-agnostic: swap between OpenAI, Anthropic, local LLMs, etc.
  - Full-stack integration: editor + terminal + CI/CD automation paths.
  - Privacy-first options: private data planes & local-only operation available for enterprises.
  - Extensible hub: shareable building blocks and verified partner integrations.

- Limitations & considerations:
  - 1.0 release stabilized core features; team/enterprise workflows continue to evolve.
  - Running high-quality local models requires additional infrastructure (GPU/memory) and ops work.

- 2025-2026 updates:
  - Mission Control redesign: converts signals from dev tools into automated fixes, PRs, and documentation.
  - Cascade agent: understands entire codebases, executes multi-file edits, handles debugging, runs terminal commands.
  - Supercomplete: advanced multi-line code prediction.
  - Memories: persistent contextual information across sessions.
  - Automated workflows: Sentry alert fixes, Snyk vulnerability patches, Sanity CMS docs, Netlify performance audits.
  - YAML-based configuration for separate chat and autocomplete model settings.

- Use cases:
  - Individual developers: in-editor autocomplete, chat, and edit-by-instruction.
  - Teams: shared assistants, governance policies, and private deployments.
  - CI/CD: automated refactors, batch code updates, and repository-level maintenance via headless agents.

- Competitive positioning:
  - Competes with GitHub Copilot, Codeium, Cursor, and commercial offerings, but differentiates on openness, model choice, and privacy.

- Useful links:
  - Official site / docs: https://continue.dev
  - Hub: https://hub.continue.dev
  - GitHub: https://github.com/continuedev/continue

### Last Update
2026-01-30

## Licensing

### Opensource
- Yes
  - The project is open-source and community contributions are actively encouraged.

### License
- Apache-2.0

### Free Trial
- Yes
  - A free/solo tier exists (open-source extensions + hub access for public/shared blocks). Paid team/enterprise tiers add governance and private deployment options.

## MCP-Client

### MCP-Client
- Yes
  - Integrates with Model Context Protocols for adding context providers (GitHub, Jira, etc.) and usable via the hub.

### Prompts
- Yes
  - Supports customizable prompts and agent definitions; teams can define behaviors via configuration-as-code
  - Modes (Chat / Plan / Agent) enable different prompt/tool access levels for safer workflows
  - Prompts and building blocks can be shared via Continue Hub for reuse across teams

### Tools
- Yes
  - MCP-style tool integrations (GitHub, Sentry, Snyk, Linear) allow the assistant to fetch contextual data
  - CLI (`cn`) provides headless automation and scripting; IDE extensions expose tool interactions in-editor
  - Supports configuring local and remote model endpoints (BYOK)

### Resources
- Yes
  - Continue Hub (hub.continue.dev) for shared assistants and reusable building blocks
  - Official docs at https://continue.dev and source at https://github.com/continuedev/continue
  - MCP integrations and context providers (GitHub, issue trackers, error monitoring) available as resources

### ACP
- No

## Deployment

### BYOK
- Yes
  - You can configure and use your own API keys and model endpoints, and switch between local/remote models.

### Local Offline
- Yes
  - Supports local model workflows (e.g. via Ollama/local LLMs) and headless/offline operation for air-gapped environments.

## Developer Experience

### Context Management
- Yes
  - Methods for managing and updating context:
    - Conversation-level context (chat state / memory) maintained by the agent across messages.
    - Extensions and tools: enable/disable extensions (platform__manage_extensions) to change available capabilities at runtime.
    - File edits: directly update repository files via developer__text_editor (view/insert/write/str_replace/undo_edit) to change canonical project context.
    - Subagents / tasks: pass contextual parameters to dynamic_task__create_task and subagent__execute_task so specialized subagents operate with explicit context.
    - Analysis tools: use developer__analyze and developer__shell to gather and refresh context (code structure, file contents) before making changes.
    - Sources:
      - .tessl/framework/agents.md (project spec & workflow guidance)
      - developer extension tool descriptions (developer__text_editor, developer__analyze)

### Direct File References
- Yes
  - Files can be directly referenced by path in tool calls and task context:
    - developer__text_editor accepts absolute or repo-relative paths for view/write/insert/str_replace operations.
    - todo__read and todo__write read/write the TODO file contents.
    - developer__analyze accepts a path to a directory or file to inspect.
    - Shell commands can operate on files and the output can be read back into the conversation.
  - Practical notes:
    - When editing, use exact relative paths from the repo root (as used by the developer extension).
    - developer__text_editor supports an undo_edit operation for safer iterations.
  - Sources:
    - Developer extension tool docs (developer__text_editor, developer__analyze, todo__read/todo__write)

### Checkpoints
- Yes
  - Undo and recovery mechanisms:
    - developer__text_editor undo_edit provides local edit rollback for the last text_editor operation.
    - Git operations via developer__shell (git commit, git revert, git reset) can be used to create and restore checkpoints in repository history.
    - When using todo__read/todo__write and plan files, maintain incremental commits to enable reverting high-level work.
  - Sources:
    - developer__text_editor tool description (undo_edit)
    - developer__shell usage for git commands

### Git Support
- Yes
  - Native integrations (MCP-style integrations) for GitHub and git workflows; automation via CLI for PR/comments/summaries.

## Extensible

### Extensible
- Yes
  - Continue is built to be extensible via blocks, MCP integrations and a hub for sharing assistants.

### Plugins
- Yes
  - Extension/recipe model allows bundling commands, agents and hooks:
    - Extensions are enable/disable units (platform__manage_extensions) that change the agent's available toolset.
    - Scheduled recipe jobs (platform__manage_schedule) can package recurring workflows.
    - dynamic_task__create_task tasks can be used as reusable, parameterized operations that behave like plugins when stored and invoked programmatically.
  - Sources:
    - platform__manage_extensions
    - platform__manage_schedule
    - dynamic_task__create_task

### Hooks
- Yes
  - Lifecycle-like attachment points available:
    - Scheduled jobs (platform__manage_schedule) provide lifecycle actions (create, run_now, pause, unpause, delete, inspect, sessions) that act like hooks for recurring automation.
    - Subagent/task lifecycle: dynamic_task__create_task and subagent__execute_task expose start/finish semantics and can be monitored via their responses and session content (platform schedule sessions API).
    - developer__text_editor undo_edit provides a simple edit-level rollback hook.
  - Sources:
    - platform__manage_schedule tool description
    - dynamic_task__create_task and subagent__execute_task tool descriptions

### SlashCommands
- Yes
  - The environment provides reusable slash commands that users can trigger from the CLI:
    - /exit or /quit — Exit the session
    - /t — Toggle between Light/Dark/Ansi themes
    - /? or /help — Display help message
  - Comments:
    - These are small, user-facing commands; broader automation is implemented via the platform and developer tools rather than additional built-in slash commands.
  - Sources:
    - Session command list provided in the runtime instructions at the top of this environment

### Skills
- No

### Custom Modes
- Yes
  - Specialist modes can be created by combining extensions, execution settings, and curated prompts:
    - Enable/disable specific extensions (platform__manage_extensions) to tailor available tools for the mode.
    - Create dynamic tasks or scheduled recipes (platform__manage_schedule) that run with a specific configuration to emulate a mode.
    - Use prompt engineering and subagent settings to constrain behavior (e.g., read-only auditing mode vs. active-editing mode).
  - Sources:
    - platform__manage_extensions, dynamic_task__create_task, platform__manage_schedule tool descriptions

### Subagents
- Yes
  - Specialized subagents and task workflows are supported:
    - Use dynamic_task__create_task to spawn tasks with custom instructions, extension scoping, and execution settings.
    - Use subagent__execute_task to run tasks created by the dynamic task system; supports sequential or parallel execution modes.
    - Subagents can be given explicit context and are intended for parallelizable or long-running subtasks.
  - Sources:
    - dynamic_task__create_task and subagent__execute_task tool descriptions

