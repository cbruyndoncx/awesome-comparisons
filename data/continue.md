# Continue - https://continue.dev
Open-source AI coding assistant focused on developer control, model choice, and IDE/CLI integration.

## Version
v (2025-10-19)

## Classification 
- Code/Editor

## Rating
- [4] Strong customization and model choice
- [4] Good IDE & CLI coverage (VS Code, JetBrains, terminal)
- [3] Hub & team features maturing (1.0 release)

## Repository
- https://github.com/continuedev/continue

## Languages
- Any

## Extensible
- Yes
  - Continue is built to be extensible via blocks, MCP integrations and a hub for sharing assistants.

## Description
Continue is an open-source AI coding assistant and platform that brings AI capabilities into editors (VS Code, JetBrains), the terminal (CLI) and CI/CD workflows. It emphasizes developer control: choose models (cloud or local), customize prompts and agents, and run fully local/offline when required. The platform includes IDE extensions, a CLI (cn) with interactive and headless modes, and an optional Continue Hub for sharing and managing assistant building blocks.

## BYOK
- Yes
  - You can configure and use your own API keys and model endpoints, and switch between local/remote models.

## LocalOffline
- Yes
  - Supports local model workflows (e.g. via Ollama/local LLMs) and headless/offline operation for air-gapped environments.

## FreeTrial
- Yes
  - A free/solo tier exists (open-source extensions + hub access for public/shared blocks). Paid team/enterprise tiers add governance and private deployment options.

## GitSupport
- Yes
  - Native integrations (MCP-style integrations) for GitHub and git workflows; automation via CLI for PR/comments/summaries.

## Terminal
- Yes
  - The `cn` CLI provides an interactive TUI and a headless mode for scripted and CI uses.

## Opensource
- Yes
  - The project is open-source and community contributions are actively encouraged.

## License
- Apache-2.0

## MCP-Client
- Yes
  - Integrates with Model Context Protocols for adding context providers (GitHub, Jira, etc.) and usable via the hub.

## Notes
- Strengths:
  - Model-agnostic: swap between OpenAI, Anthropic, local LLMs, etc.
  - Full-stack integration: editor + terminal + CI/CD automation paths.
  - Privacy-first options: private data planes & local-only operation available for enterprises.
  - Extensible hub: shareable building blocks and verified partner integrations.

- Limitations & considerations:
  - 1.0 release stabilizes core features but some team/enterprise workflows continue to evolve.
  - Running high-quality local models requires additional infrastructure (GPU/memory) and ops work.

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

## ContextManagement
- Yes
  - Methods for managing and updating context:
    - Conversation-level context (chat state / memory) maintained by the agent across messages.
    - Extensions and tools: enable/disable extensions (platform__manage_extensions) to change available capabilities at runtime.
    - File edits: directly update repository files via developer__text_editor (view/insert/write/str_replace/undo_edit) to change canonical project context.
    - Subagents / tasks: pass contextual parameters to dynamic_task__create_task and subagent__execute_task so specialized subagents operate with explicit context.
    - Analysis tools: use developer__analyze and developer__shell to gather and refresh context (code structure, file contents) before making changes.
  - Sources:
    - .tessl/framework/agents.md (project spec & workflow guidance)
    - developer extension tool descriptions (developer__text_editor, developer__analyze, platform__manage_extensions)

## DirectFileReferences
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

## Hooks
- Yes
  - Lifecycle-like attachment points available:
    - Scheduled jobs (platform__manage_schedule) provide lifecycle actions (create, run_now, pause, unpause, delete, inspect, sessions) that act like hooks for recurring automation.
    - Subagent/task lifecycle: dynamic_task__create_task and subagent__execute_task expose start/finish semantics and can be monitored via their responses and session content (platform schedule sessions API).
    - developer__text_editor undo_edit provides a simple edit-level rollback hook.
  - Sources:
    - platform__manage_schedule tool description
    - dynamic_task__create_task and subagent__execute_task tool descriptions

## SlashCommands
- Yes
  - The environment provides reusable slash commands that users can trigger from the CLI:
    - /exit or /quit — Exit the session
    - /t — Toggle between Light/Dark/Ansi themes
    - /? or /help — Display help message
  - Comments:
    - These are small, user-facing commands; broader automation is implemented via the platform and developer tools rather than additional built-in slash commands.
  - Sources:
    - Session command list provided in the runtime instructions at the top of this environment

## Subagents
- Yes
  - Specialized subagents and task workflows are supported:
    - Use dynamic_task__create_task to spawn tasks with custom instructions, extension scoping, and execution settings.
    - Use subagent__execute_task to run tasks created by the dynamic task system; supports sequential or parallel execution modes.
    - Subagents can be given explicit context and are intended for parallelizable or long-running subtasks.
  - Sources:
    - dynamic_task__create_task and subagent__execute_task tool descriptions

## CustomModes
- Yes
  - Specialist modes can be created by combining extensions, execution settings, and curated prompts:
    - Enable/disable specific extensions (platform__manage_extensions) to tailor available tools for the mode.
    - Create dynamic tasks or scheduled recipes (platform__manage_schedule) that run with a specific configuration to emulate a mode.
    - Use prompt engineering and subagent settings to constrain behavior (e.g., read-only auditing mode vs. active-editing mode).
  - Sources:
    - platform__manage_extensions, dynamic_task__create_task, platform__manage_schedule tool descriptions

## Plugins
- Yes
  - Extension/recipe model allows bundling commands, agents and hooks:
    - Extensions are enable/disable units (platform__manage_extensions) that change the agent's available toolset.
    - Scheduled recipe jobs (platform__manage_schedule create) can package recurring workflows.
    - dynamic_task__create_task tasks can be used as reusable, parameterized operations that behave like plugins when stored and invoked programmatically.
  - Sources:
    - platform__manage_extensions
    - platform__manage_schedule
    - dynamic_task__create_task

## Checkpoints
- Yes
  - Undo and recovery mechanisms:
    - developer__text_editor undo_edit provides local edit rollback for the last text_editor operation.
    - Git operations via developer__shell (git commit, git revert, git reset) can be used to create and restore checkpoints in repository history.
    - When using todo__read/todo__write and plan files, maintain incremental commits to enable reverting high-level work.
  - Sources:
    - developer__text_editor tool description (undo_edit)
    - developer__shell usage for git commands

## SpecDrivenDevelopment
- Tessl
  - This project explicitly uses Tessl for Spec Driven Development. See .tessl/framework/agents.md and the project's Spec Driven Development documentation for detailed workflows and rules.
  - Sources:
    - .tessl/framework/agents.md
    - docs/spec-driven-development.md
