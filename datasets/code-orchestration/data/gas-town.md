# Gas Town - https://github.com/steveyegge/gas-town

Gas Town is Steve Yegge's open-source orchestrator that coordinates 20-30 Claude Code instances working in parallel on a single codebase. Introduced January 2026, it uses a Mayor agent to decompose goals and dispatch Polecat worker agents to isolated git worktrees, with the Beads external memory framework tracking state across the entire fleet to avoid context bloat.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Terminal

### Version
- Open source (January 2026)

### Repo
- https://github.com/steveyegge/gas-town

### Rating
- [4] 20-30 parallel Claude Code agents on a single codebase; external memory via Beads avoids context bloat; git-backed state survives crashes
- [2] Designed for developers already managing 10+ agents; high complexity and cost; early-stage tooling not suited for most teams

### Short Description

- Orchestrates 20-30 parallel Claude Code instances; Mayor agent decomposes goals; Polecat workers in isolated git worktrees; Beads external memory; MEOW workflow pattern; January 2026.

### Description

Gas Town orchestrates large fleets of Claude Code instances — 20 to 30 agents — working simultaneously on a single codebase. The Mayor agent receives a high-level goal, analyzes the codebase, and decomposes work into structured tasks distributed as a convoy with Beads (external memory tokens). Polecat worker agents each claim tasks and execute in isolated git worktrees, preventing merge conflicts across the fleet. The Refinery component manages automated merges after verification.

The MEOW (Mayor-Enhanced Orchestration Workflow) pattern defines the canonical usage: state the goal to the Mayor → Mayor decomposes and creates a convoy → agents are spawned and work is distributed → progress is monitored by the Witness and Deacon components → Refinery finalizes merges. The Beads external memory framework is the key architectural choice over context window expansion — task state lives outside any agent's context, enabling the Mayor to coordinate dozens of agents without context bloat or loss of state across crashes.

### Languages
- Any
  - Optimized for Claude Code as the worker agent; language-agnostic at the orchestration level.

### Notes
- Designed for developers already running 10+ agents manually — not a beginner tool.
- Beads: external memory framework; task state tracked outside agent context windows.
- MEOW pattern: Mayor → convoy → agent spawn → distribute → monitor → complete.
- Components: Mayor (orchestrator), Polecats (workers), Beads (memory), Refinery (merge), Witness/Deacon (health monitoring).
- Git-backed state: survives crashes and restarts.
- High cost at scale (20-30 Claude Code instances running concurrently).

### Last Update
- 2026-05-14

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- Yes
  - Open source; costs are LLM API usage for 20-30 concurrent Claude Code instances.

## Parallelism

### Agent Topology
- Fixed

### Coordination Mode
- Autonomous

### Max Concurrent Agents
- 30
  - 20-30 Claude Code instances; practical limit set by LLM API rate limits and cost.

### Parallelism Model
- Free-form
  - Mayor distributes tasks to available Polecat workers without fixed wave ordering.

### Dependency Management
- Automatic
  - Mayor analyzes codebase and determines task decomposition and sequencing.

### Conflict Resolution
- Git Worktrees
  - Isolated git worktrees per Polecat; Refinery manages merges after verification.

## Coordination

### Coordination Mechanism
- Shared Memory
  - Beads external memory framework tracks all task state outside agent context windows.
- Git State
  - Git worktrees and branches as execution isolation; Refinery handles merges.

### Agent Types Supported
- Claude Code
  - Designed around Claude Code as the worker agent (Polecats).

### Verification
- Verifier Agent
  - Refinery component manages merge verification.
- Test Execution
  - Verification before Refinery merges branches.

## Deployment

### Self-hosted
- Yes

### BYOK
- Yes
  - Uses Claude Code with Anthropic API keys.

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- Natural Language Goal
  - Mayor receives a high-level goal and decomposes it into Polecat tasks via Beads ledger.

### External Task Integrations
- -
  - Beads JSONL ledger is internal; no external tracker integration documented.

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
  - Beads external memory ledger (JSONL) tracks all task state outside agent context windows; git-backed state survives crashes.

### Direct File References
- Yes
  - Mayor analyzes the codebase; specific files and modules referenced in task decomposition.

### Git Support
- Yes
  - Git worktree isolation per agent; Refinery automates merges; git-backed state survives crashes.

### Checkpoints
- Yes
  - Beads external memory persists state; Witness/Deacon monitor fleet health.

### Observability
- Yes
  - Witness and Deacon components monitor system health across the agent fleet.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- No

### Custom Agents
- No
  - Currently built around Claude Code as the worker agent.

### Hooks
- No

### Subagents
- Yes
  - Mayor dynamically spawns Polecat worker subagents per task.
