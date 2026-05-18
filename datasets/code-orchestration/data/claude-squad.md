# Claude Squad - https://github.com/smashingpat/claude-squad

Claude Squad is a lightweight open-source tool for running multiple Claude Code agents in parallel against a shared repository, each in an isolated git worktree. Designed for solo developers who want the fastest path to parallel agent workflows with minimal setup — no orchestrator complexity, no business layer, just human-supervised parallel task assignment and selective merge.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Terminal

### Version
- Open source (2025-2026)

### Repo
- https://github.com/smashingpat/claude-squad

### Rating
- [3] Fastest and simplest entry point for parallel Claude Code workflows; minimal setup overhead
- [3] Minimal features — no Kanban, no dashboard, no business layer; human handles all coordination manually

### Short Description

- Lightweight open-source tool for parallel Claude Code agents in isolated git worktrees; human-supervised task assignment and merge; fastest minimal-setup parallel workflow for solo developers.

### Description

Claude Squad is the minimal-footprint option for running parallel Claude Code agents. Each agent gets its own git worktree under `.claude/worktrees/`, sharing the git object database but working in complete isolation. The developer assigns tasks to each agent, monitors their progress directly in the terminal, reviews diffs as separate branches, and merges selectively. There is no dashboard, no Kanban board, and no orchestration layer beyond the git worktree isolation.

Claude Code Desktop (redesigned April 2026) ships native multi-session support with built-in worktree management, making the core workflow that Claude Squad pioneered available natively. Claude Squad remains useful for teams wanting a scriptable, CLI-native alternative without the full Claude Code Desktop app. Typical workflow: dispatch 3-10 agents on independent tasks, run in parallel, review all diffs simultaneously, merge only approved branches.

### Languages
- Any

### Notes
- Worktrees stored at .claude/worktrees/; share git object database.
- No dashboard, no Kanban — terminal-native workflow.
- Claude Code Desktop (April 2026) now ships native multi-session worktree support natively.
- Best for: solo developers, simple parallel task workflows, scriptable CI pipelines.
- Human controls all task assignment and merge decisions.

### Last Update
- 2026-05-14

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
  - Fully open source; costs are Claude Code API usage.

## Parallelism

### Agent Topology
- Fixed
  - Developer manually assigns tasks to agents; count is operator-determined.

### Coordination Mode
- Supervised

### Max Concurrent Agents
- -
  - No hard limit; practical limit set by Claude API rate limits.

### Parallelism Model
- Free-form
  - Tasks assigned manually; agents execute independently with no automatic sequencing.

### Dependency Management
- Manual
  - Developer manages all task dependencies and ordering.

### Conflict Resolution
- Git Worktrees
  - Isolated git worktrees per agent; selective merge by developer.

## Coordination

### Coordination Mechanism
- Git State
  - Git worktrees are the sole coordination mechanism.

### Agent Types Supported
- Claude Code
  - Built specifically for Claude Code.

### Verification
- Human Review
  - Developer reviews each agent's diff as a separate branch before merging.

## Deployment

### Self-hosted
- Yes

### BYOK
- Yes
  - Uses Claude Code with Anthropic API key.

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- Natural Language Goal
  - Developer assigns task descriptions to each agent manually.

### External Task Integrations
- -

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
  - Minimal; worktree isolation only; no cross-session context persistence.

### Direct File References
- Yes
  - Developer assigns tasks with file-level context to each agent.

### Git Support
- Yes
  - Core mechanic: isolated git worktrees per agent.

### Checkpoints
- Yes
  - Each agent branch is an independent checkpoint.

### Observability
- No
  - Terminal output only; no dashboard or monitoring UI.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- No

### Custom Agents
- No
  - Claude Code only.

### Hooks
- No

### Subagents
- No
