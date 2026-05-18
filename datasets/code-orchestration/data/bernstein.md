# Bernstein - https://github.com/sipyourdrink-ltd/bernstein

Bernstein is an open-source deterministic orchestrator that coordinates 30+ CLI AI coding agents (Claude Code, Codex, Gemini CLI, Aider, and others) in parallel isolated git worktrees. The orchestrator itself uses zero LLM tokens — a single LLM call decomposes the goal into tasks, then plain Python handles all scheduling, routing, and merging deterministically.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Terminal

### Version
- Open source (2025-2026)

### Repo
- https://github.com/sipyourdrink-ltd/bernstein

### Rating
- [5] Zero LLM tokens on orchestration logic; deterministic, auditable, reproducible — every routing decision is logged and replayable
- [4] Test-driven verification (tests pass, lint clean, types correct) before any code merges to main

### Short Description

- Deterministic open-source orchestrator for 30+ CLI coding agents; single LLM decomposition call, then pure Python scheduling; isolated git worktrees; test-driven verification; HMAC audit logs.

### Description

Bernstein orchestrates 30+ CLI AI coding agents in parallel without spending LLM tokens on coordination. The workflow is: one LLM call decomposes the goal into tasks with roles and completion signals; from that point, a plain Python scheduler assigns tasks to agents, monitors worktrees, and merges verified code — no further LLM inference for routing. This makes orchestration reproducible, auditable, and dramatically cheaper than LLM-driven orchestrators.

Each agent works in an isolated git worktree on a separate branch. A Janitor component verifies concrete signals before merging: tests must pass, lint must be clean, types must be correct. Only verified code reaches main. HMAC-chained audit logs, signed agent cards, and per-artifact lineage make Bernstein suitable for regulated environments (DORA, NIS2, EU AI Act Article 12).

### Languages
- Any

### Notes
- Supports 30+ CLI agents: Claude Code, Codex, Gemini CLI, Aider, and 27+ others.
- Compliance: HMAC-chained audit logs, signed agent cards, per-artifact lineage (DORA, NIS2, EU AI Act Article 12).
- Zero LLM tokens on scheduling — only one decomposition call per goal.
- Janitor verifies: tests pass + lint clean + types correct before merge.

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
- Fixed

### Coordination Mode
- Autonomous

### Max Concurrent Agents
- 30
  - Supports 30+ CLI coding agents simultaneously; practical limit depends on compute.

### Parallelism Model
- DAG
  - Decomposition step produces task graph; Python scheduler executes independent tasks in parallel.

### Dependency Management
- Automatic
  - Single LLM decomposition call produces task graph with dependencies; Python handles sequencing from there.

### Conflict Resolution
- Git Worktrees
  - Isolated git worktrees per agent; only verified branches merge to main.

## Coordination

### Coordination Mechanism
- Git State
  - Each agent works in an isolated git worktree; Janitor merges only passing branches.

### Agent Types Supported
- Claude Code
- Codex / OpenAI
- Gemini
- Custom / Any
  - 30+ CLI agents supported including Aider, Gemini CLI, and custom agents.

### Verification
- Test Execution
  - Janitor verifies tests pass, lint clean, and types correct before any merge.

## Deployment

### Self-hosted
- Yes

### BYOK
- Yes
  - BYOK for LLM decomposition call; agents use their own model keys.

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- Natural Language Goal
  - Single LLM decomposition call converts goal into task graph; no external tracker needed.

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
  - Single upfront decomposition; no ongoing cross-session context management.

### Direct File References
- Yes
  - Decomposition references specific files and modules for task assignment.

### Git Support
- Yes
  - Isolated git worktrees; automated branch management and merge-to-main after verification.

### Checkpoints
- Yes
  - HMAC-chained audit log; every routing decision logged and replayable.

### Observability
- Yes
  - Per-artifact lineage; signed agent cards; full audit trail.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- No

### Custom Agents
- Yes
  - Any CLI agent that can be invoked from the shell can be registered.

### Hooks
- Yes
  - Completion signals and verification hooks configurable per task.

### Subagents
- No
