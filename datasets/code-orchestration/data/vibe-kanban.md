# Vibe Kanban - https://github.com/BloopAI/vibe-kanban

Vibe Kanban is BloopAI's open-source Rust-based CLI and web UI for orchestrating multiple AI coding agents in parallel. A Kanban board (To Do → In Progress → Review → Done) drives task assignment across agents (Claude Code, Gemini, Codex). Each agent runs in an isolated git worktree; a visual diff reviewer shows line-by-line changes before merge. Integrates as both MCP client and server. GitHub and Azure DevOps issue sync built in.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Terminal

### Version
- Open source (2025-2026)

### Repo
- https://github.com/BloopAI/vibe-kanban

### Rating
- [4] Kanban board + visual diff review is the most complete human-in-the-loop orchestration UI of any open-source tool; MCP client+server dual role; GitHub and Azure issue sync
- [3] Task assignment is still manual; no automatic dependency analysis or wave-based execution

### Short Description

- BloopAI open-source Rust CLI + web UI; Kanban board for parallel agent tasks; git worktree isolation; visual line-by-line diff review; MCP client+server; GitHub/Azure issue sync.

### Description

Vibe Kanban treats AI coding agents as asynchronous parallel workers managed through a Kanban workflow. Developers plan tasks on the board, assign them to agents (Claude Code, Gemini, Codex, or others), and agents execute in isolated git worktrees. The web UI shows each agent's board status in real time; a built-in visual code reviewer presents line-by-line diffs with comment and approval/rejection controls before anything merges.

GitHub and Azure DevOps integration allows issues to be fetched directly into the Kanban board, and completed branches pushed back automatically. Vibe Kanban acts as both an MCP client (connecting to external tool servers) and an MCP server (exposing its own capabilities to other agents), making it composable in larger orchestration setups. Built in Rust by BloopAI for performance and cross-platform support.

### Languages
- Any

### Notes
- Built in Rust by BloopAI; cross-platform (CLI + web UI).
- MCP dual role: client (connects to tool servers) and server (exposes capabilities).
- GitHub and Azure DevOps: fetch issues, push branches automatically.
- Kanban workflow: To Do → In Progress → Review → Done.
- Visual diff reviewer: line-by-line with comments and approve/reject controls.

### Last Update
- 2026-05-14

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- Yes
  - Fully open source.

## Parallelism

### Agent Topology
- Fixed
  - Agents assigned tasks manually via Kanban board; count set by operator.

### Coordination Mode
- Supervised

### Max Concurrent Agents
- -
  - Unlimited; limited by compute and API rate limits.

### Parallelism Model
- Free-form
  - Tasks assigned to agents via Kanban board; parallel execution without automatic sequencing.

### Dependency Management
- Manual
  - Developer manages task dependencies through Kanban board ordering.

### Conflict Resolution
- Git Worktrees
  - Isolated git worktrees per agent; visual diff review before any merge.

## Coordination

### Coordination Mechanism
- Git State
  - Each agent works in an isolated git worktree; Kanban board tracks task state.

### Agent Types Supported
- Claude Code
- Gemini
- Codex / OpenAI
- Custom / Any
  - Multi-agent support; switch between coding agents per task.

### Verification
- Human Review
  - Visual diff reviewer with line-by-line inspection, comments, approve/reject before merge.

## Deployment

### Self-hosted
- Yes

### BYOK
- Yes
  - BYOK for all agent providers.

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- Kanban Board
  - Internal board drives task creation; To Do → In Progress → Review → Done.
- GitHub Issues
  - Issues fetched directly from GitHub into the Kanban board.

### External Task Integrations
- GitHub Issues
  - Fetch issues and push branches automatically.
- Azure DevOps
  - Azure DevOps issue sync supported.

## MCP-Client

### MCP-Client
- Yes
  - Dual role: MCP client (connects to external servers) and MCP server (exposes capabilities).

### Tools
- Yes

### Prompts
- No

### Resources
- No

### ACP
- No

## Developer Experience

### Context Management
- Yes
  - Kanban board state and git branch history provide persistent task context.

### Direct File References
- Yes
  - Kanban task descriptions can include specific file references; GitHub issue links.

### Git Support
- Yes
  - Isolated git worktrees; GitHub and Azure DevOps issue sync; automatic branch push.

### Checkpoints
- Yes
  - Each agent branch is a checkpoint; Kanban Review column gates merges.

### Observability
- Yes
  - Real-time Kanban board showing all agent statuses; diff viewer for completed work.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- No

### Custom Agents
- Yes
  - Any coding agent supported.

### Hooks
- Yes
  - MCP server interface allows other agents to trigger Vibe Kanban actions.

### Subagents
- No
