# Conductor - https://melty.sh/conductor

Conductor by Melty Labs is a free macOS application that runs multiple Claude Code and Codex agents in parallel against the same repository. Each agent works in an isolated git worktree on its own branch. A central dashboard shows all active agents, their branches, and diffs — developers accept, request changes, or merge pull requests without leaving the app. Users pay only for their underlying Claude or Codex subscriptions.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Terminal

### Version
- GA (2026)

### Repo
- -
  - Proprietary product by Melty Labs; free to use.

### Rating
- [4] Free tool with no additional cost beyond Claude/Codex subscriptions; clean dashboard for parallel agent review and merge; works alongside existing editors rather than replacing them
- [3] macOS only; limited to Claude Code and Codex as agent backends

### Short Description

- Free macOS app by Melty Labs; parallel Claude Code and Codex agents in isolated git worktrees; central dashboard for diff review and PR merge; no extra cost beyond agent subscriptions.

### Description

Conductor is Melty Labs' free macOS orchestration app for running multiple Claude Code and Codex agents concurrently on the same repository. Each agent operates in an isolated git worktree on a dedicated branch, preventing merge conflicts across the parallel fleet. The central dashboard shows every active agent's current branch, work status, and generated diffs side by side, enabling developers to review, accept, request changes, or merge pull requests from a single interface.

The tool is designed to complement existing editors rather than replace them — it sits alongside VS Code or any other IDE and handles the orchestration layer transparently. There is no additional cost beyond the user's existing Claude Code Max or Codex subscriptions, making it one of the most accessible entry points into parallel agent workflows.

### Languages
- Any

### Notes
- Free tool; costs are Claude Code Max or Codex subscription only.
- macOS only (Apple Silicon and Intel).
- Works alongside existing editors — does not replace IDE.
- Central dashboard: branch status, diffs, PR accept/request-changes/merge.
- By Melty Labs (makers of Melty AI editor).

### Last Update
- 2026-05-14

## Licensing

### Opensource
- No

### License
- Proprietary
  - Free to use; closed source.

### Free Trial
- Yes
  - Completely free; no paid tier.

## Parallelism

### Agent Topology
- Fixed
  - Developer manually spins up agents; count is operator-determined.

### Coordination Mode
- Supervised

### Max Concurrent Agents
- -
  - No documented limit; practical limit set by Claude/Codex API rate limits.

### Parallelism Model
- Free-form
  - Each agent assigned tasks independently by the developer; no automatic sequencing.

### Dependency Management
- Manual
  - Developer assigns tasks and manages dependencies between parallel branches.

### Conflict Resolution
- Git Worktrees
  - Isolated git worktrees per agent; developer reviews and merges selectively via dashboard.

## Coordination

### Coordination Mechanism
- Git State
  - Each agent works in an isolated git worktree; dashboard aggregates branch state.

### Agent Types Supported
- Claude Code
- Codex / OpenAI

### Verification
- Human Review
  - Central dashboard for line-by-line diff review before any merge.

## Deployment

### Self-hosted
- No
  - macOS desktop application.

### BYOK
- Yes
  - Uses user's existing Claude Code or Codex subscription.

### Cloud Managed
- No


### Local Offline
- No

## Task Management

### Task Source
- Natural Language Goal
  - Developer assigns task descriptions to each agent via the Conductor dashboard.

### External Task Integrations
- GitHub Issues
  - Branch and PR review integrated with GitHub workflow.

## MCP-Client

### MCP-Client
- Yes

### Tools
- No

### Prompts
- No

### Resources
- No

### ACP
- No

## Developer Experience

### Context Management
- No
  - Session-based; no cross-session context persistence.

### Direct File References
- Yes
  - Developer can specify file paths and context in task descriptions per agent.

### Git Support
- Yes
  - Core mechanic: isolated git worktrees per agent; PR creation and merge via dashboard.

### Checkpoints
- Yes
  - Each agent's branch is a checkpoint; developer controls what merges to main.

### Observability
- Yes
  - Central dashboard shows all agent branches, statuses, and diffs in real time.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- No

### Custom Agents
- No
  - Limited to Claude Code and Codex.

### Hooks
- No

### Subagents
- No
