# Antigravity - https://antigravity.dev/

Antigravity (Google) is an AI coding orchestration platform featuring Manager View — a unified interface for assigning tasks to multiple parallel coding agents and monitoring their progress simultaneously. Supports up to 5 concurrent agents across isolated worktrees, with the Manager agent coordinating task decomposition and delegation.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Terminal

### Version
- GA (2025-2026)

### Repo
- -
  - Proprietary Google product.

### Rating
- [4] Manager View provides clear orchestration UX for parallel agent oversight; Google-backed infrastructure
- [3] Limited to 5 concurrent agents; less extensible than open-source alternatives

### Short Description

- Google's multi-agent coding orchestration with Manager View UI; up to 5 parallel agents; Manager agent coordinates task decomposition and delegation.

### Description

Antigravity is Google's multi-agent AI coding orchestration platform, featuring a Manager View interface that lets developers assign tasks to multiple parallel coding agents and monitor their progress from a single dashboard. The Manager agent is responsible for decomposing high-level goals into subtasks and delegating them to worker agents operating in isolated environments.

Up to 5 agents can run concurrently, each working on independent subtasks. The Manager View provides real-time visibility into all active agents, enabling mid-run steering and early intervention if an agent drifts from the intended scope. Antigravity is also accessible as a CLI tool for terminal-first workflows.

### Languages
- Any

### Notes
- Manager View: unified dashboard for multi-agent task assignment and monitoring.
- Up to 5 concurrent agents.
- Also available as CLI (see terminal dataset entry).
- Google-backed infrastructure.

### Last Update
- 2026-05-14

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes

## Parallelism

### Agent Topology
- Fixed

### Coordination Mode
- Autonomous

### Max Concurrent Agents
- 5

### Parallelism Model
- Free-form
  - Manager assigns tasks to available agents; parallel execution across isolated environments.

### Dependency Management
- Automatic
  - Manager agent decomposes and sequences task delegation.

### Conflict Resolution
- Scoped Context
  - Isolated execution environments per agent; Manager coordinates integration.

## Coordination

### Coordination Mechanism
- Message Passing
  - Manager agent delegates tasks and collects results from worker agents.

### Agent Types Supported
- Gemini
  - Powered by Google Gemini models.
- Custom / Any

### Verification
- Human Review
  - Manager View enables real-time monitoring and mid-run steering.

## Deployment

### Self-hosted
- No

### BYOK
- No
  - Google-managed infrastructure.

### Cloud Managed
- Yes


### Local Offline
- No

## Task Management

### Task Source
- Natural Language Goal
  - Manager agent receives goal and decomposes into worker agent tasks.

### External Task Integrations
- -

## MCP-Client

### MCP-Client
- Yes

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
- No
  - Session-based; no cross-session context persistence documented.

### Direct File References
- No

### Git Support
- Yes

### Checkpoints
- Yes
  - Mid-run pause and steering via Manager View.

### Observability
- Yes
  - Manager View: real-time dashboard for all parallel agent sessions.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- No

### Custom Agents
- No

### Hooks
- No

### Subagents
- Yes
  - Manager spawns worker subagents for delegated tasks.
