# CodeLayer - https://github.com/humanlayer/humanlayer

Open-source IDE to orchestrate AI coding agents built by HumanLayer.

## General Info

### Classification
- Code/Editor

### Version
codelayer-0.1.0-20251003-140552-nightly (2025-10-03)

### Repo
- https://github.com/humanlayer/humanlayer

### Rating
- [4] Active community, frequent releases
- [5] Innovative AI-agent orchestration and productivity gains reported by users

### Short Description
Keyboard-first open-source IDE and orchestration layer for AI coding agents (HumanLayer CodeLayer) built around Claude Code; provides MULTICLAUDE parallel sessions, worktree-aware git integration, and advanced context engineering for team-scale agent workflows.

-

### Description
CodeLayer is an open-source, keyboard-first IDE and orchestration layer for AI coding agents (built on top of Claude Code). It focuses on "context engineering" and workflow orchestration so teams can use multiple AI agents in parallel to solve complex problems across large codebases. Key platform ideas include parallel Claude Code sessions (MULTICLAUDE), battle-tested agent workflows, worktree-aware git operations, and ergonomics for fast, keyboard-driven developer flows.

### Languages
- Any

### Notes
- Focus: orchestration of AI agents rather than just code completion — useful for teams working on large, legacy, or complex systems.
- Innovative features: Advanced Context Engineering and MULTICLAUDE (parallel Claude Code sessions across worktrees and cloud workers).
- Community & activity: ~5.5k stars, ~409 forks (active contributions and many releases; rapid iteration cadence).
- Polyglot codebase: frontend/tooling in TypeScript, backend/perf in Go; other languages for utilities.
- Use cases: team-scale AI-assisted development, PR generation/augmentation, multi-agent workflows, productivity tooling for dev teams.
- Caveats: depends on Claude Code (Anthropic) for core model capabilities, so on-prem / fully local usage is limited unless adapted by contributors.
- License is permissive (Apache 2.0) — good for commercial adoption and modification.
- Repo contains legacy HumanLayer SDK and documentation for historical context and SDK features.
- HumanLayer SDK: framework-agnostic API for human-in-the-loop workflows (require_approval, human_as_tool, omnichannel routing for approvals).
- 12 Factor Agents framework for reliable agent design patterns.
- Enterprise: RBAC, audit trails, compliance logging, data residency controls, secrets management.

### Last Update
2026-01-30

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- No

## MCP-Client

### MCP-Client
- Yes
  - Built-in MCP client and HumanLayer SDK enable tool/function calls, approvals, and lifecycle events (e.g., function_call.*, human_contact.*). Sessions can surface tool metadata and perform approved side-effecting operations via the platform's tool integrations.

### Prompts
- Yes
  - Supports prompt templates, session templates, and engineered prompt artifacts; prompts can be stored and loaded via configuration and shared across teams (prompt workshop/examples in repo/docs).

### Tools
- Yes
  - Integrates tool calling and function-style tools (Claude Code tool capabilities), webhooks, and SDK-driven tool definitions; supports approvals and human-in-the-loop function calls.

### Resources
- Yes
  - Official documentation, GitHub repo with examples, CLI, community channels (Discord/X), and demo/tutorial materials are available in the project repository and docs site.

### ACP
- No

## Deployment

### BYOK
- Yes
  - Environment and Claude settings support supplying external LLM API keys and configuring provider settings (e.g., ~/.claude/settings.json, env vars). CLI/desktop app can inherit shell environment variables so teams can use their own provider keys (AWS Bedrock, Anthropic, etc.).

### Local Offline
- No
  - Primarily designed to run with Claude Code / Anthropic-backed sessions rather than purely local model hosting]

## Developer Experience

### Context Management
- Yes
  - CodeLayer / HumanLayer provides multiple explicit context-management mechanisms: session-scoped context across Claude Code sessions, file and region pinning (attach files or file ranges to a session), worktree-aware context (each session can be bound to a git worktree/branch), context windows and prompt templates for engineered context snapshots, message/thread history preserved per session, and state objects that are carried through human approval flows and webhooks. These combine to enable deterministic context engineering and reproducible agent runs.

### Direct File References
- Yes
  - CodeLayer integrates with the repository and git worktrees so sessions can directly reference files, open diffs, and operate on file ranges. Sessions surface file metadata (path, revision, worktree) in prompts and diffs so agents and humans can operate on precise file references. The HumanLayer SDK also allows including file-like payloads in approvals and function calls so external systems can reconstruct the referenced files.

### Checkpoints
- Yes
  - Checkpoints are supported via git/worktree integration (explicit worktrees per session, diffs, and commits) plus session archiving and approval audit logs. Because CodeLayer operates alongside git, standard git workflows (commits, branches, resets) provide reversible checkpoints; HumanLayer also records approval histories and function-call traces for audit and rollback reasoning.

### Git Support
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - The platform is extensible: CodeLayer is open-source and designed to be extended via configuration, model selection, and SDK integrations. HumanLayer's SDK and webhooks let teams bundle commands, agent behaviors, and approval hooks into higher-level integrations (e.g., repo automation, CI hooks, Slack routing). The repo and SDK patterns enable building custom integrations or plugins that orchestrate agents and human approvals.

### Hooks
- Yes
  - HumanLayer exposes lifecycle and integration hooks via webhooks and SDK callbacks: function_call.* and human_contact.* events, agent message events, and agent_email.received (agent webhooks). These let external systems react to approval requests, completed function calls, agent launches, and other lifecycle events. The SDK also supports local callbacks/handlers to intercept or decorate tool calls (e.g., require approval before a side-effecting operation).

### SlashCommands
- Yes
  - The product supports reusable, user-triggered commands in two forms: (1) a keyboard-driven command palette / keybindings inside the CodeLayer IDE for launching common actions, sessions, or agent flows; and (2) integrations with messaging channels (Slack/email) where HumanLayer can surface approval prompts or trigger agents via message-based interactions (including Slack workflows or command-like interactions).

### Skills
- No

### Custom Modes
- Yes
  - Users can create specialist session modes by configuring models, prompt templates, and session settings (e.g., model type, temperature, tool access). The IDE and SDK permit different session types/workflows (review, refactor, PR authoring, exploratory), and CodeLayer's session-forking and template features let teams codify repeatable modes for specific developer tasks.

### Subagents
- Yes
  - CodeLayer is built for multi-agent orchestration: MULTICLAUDE enables running multiple Claude Code sessions in parallel (effectively specialized subagents) bound to separate worktrees or tasks. The HumanLayer SDK pattern also encourages defining specialized agent/tool functions (including "human as a tool") that act as subagents for task-specific workflows and human-in-the-loop approvals.

