# GNAP - https://github.com/farol-team/gnap

GNAP (Git-Native Agent Protocol) is an open-source coordination protocol for multi-agent AI systems that uses a shared git repository as its entire infrastructure. Four JSON files define the complete coordination system — agent registry, capabilities, and a task board where tasks flow through todo → doing → done. No servers, databases, or vendor lock-in required.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration

### Version
- Open source (RFC, 2025-2026)

### Repo
- https://github.com/farol-team/gnap

### Rating
- [4] Zero infrastructure overhead — any agent that can git push can participate; fully decentralized and vendor-agnostic
- [3] Protocol-level spec, not a full platform; teams implement their own agents against the protocol

### Short Description

- Git-native multi-agent coordination protocol; 4 JSON files define agent registry and task board (todo/doing/done); no server or database; works with any agent that can git push.

### Description

GNAP is an open RFC for coordinating AI agent teams through a shared git repository, with no external infrastructure. The entire system is defined by four JSON entity types stored in the repo: agent registry (which agents exist and their capabilities), task definitions (work items with metadata), board state (todo/doing/done directories), and coordination rules. Agents participate by reading tasks from the board, moving them to doing, completing work, and pushing to done — all via standard git operations.

This approach makes GNAP compatible with any agent that can execute git commands — OpenHands, AutoGen, Claude Code, or custom agents. Since git is the coordination substrate, the full history of every task transition is preserved as an audit trail, and multiple agents can be added to or removed from a team by simply updating the registry file.

### Languages
- Any
  - Protocol-level; language of implementation is up to participating agents.

### Notes
- 4 JSON entity types: agent registry, capabilities, task definitions, board state.
- Task board structure: board/todo/ → board/doing/ → board/done/
- Works with OpenHands, AutoGen, Claude Code, and any git-capable agent.
- Full git history = complete audit trail of all task transitions.
- MIT licensed open RFC.

### Last Update
- 2026-05-14

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
  - Fully open source.

## Parallelism

### Agent Topology
- Dynamic

### Coordination Mode
- Supervised

### Max Concurrent Agents
- -
  - Unlimited; any number of agents can participate by registering in the agent registry.

### Parallelism Model
- Git-native
  - All coordination happens through git commits; agents claim tasks by moving JSON files through the board.

### Dependency Management
- Manual
  - Task dependencies declared in task definition JSON; agents respect ordering.

### Conflict Resolution
- Git Merge
  - Git merge conflicts resolve task assignment races; first agent to commit to doing wins.

## Coordination

### Coordination Mechanism
- Git State
  - Git repo is the single source of truth; all state is JSON files versioned in git.

### Agent Types Supported
- Claude Code
- Codex / OpenAI
- Custom / Any
  - Any agent that can execute git commands can participate.

### Verification
- Human Review
  - No built-in verifier; verification integrated via standard PR review.

## Deployment

### Self-hosted
- Yes
  - Runs on any git host (GitHub, GitLab, Gitea, local).

### BYOK
- Yes
  - Protocol only; agents bring their own model keys.

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- Git Task Board
  - Tasks are JSON files in board/todo/; agents claim by moving to board/doing/ via git commit.

### External Task Integrations
- GitHub Issues
  - Works on any git host: GitHub, GitLab, Gitea, or local.
- Custom / API
  - Any system that can write JSON files to a git repo can feed tasks in.

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
- Yes
  - Complete git history of every task state transition is the persistent context store.

### Direct File References
- No
  - Tasks defined as JSON files; no direct file @-reference syntax.

### Git Support
- Yes
  - Git is the entire coordination layer.

### Checkpoints
- Yes
  - Complete git history of every task state transition is the checkpoint log.

### Observability
- Yes
  - Git log provides full audit trail; board directory structure shows current state at a glance.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- No

### Custom Agents
- Yes
  - Register any agent in the agent registry JSON.

### Hooks
- Yes
  - Git hooks can trigger on task state transitions.

### Subagents
- No
