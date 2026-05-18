# Swarm Tools - https://github.com/joelhooks/swarm-tools

Swarm Tools is a TypeScript/Bun framework for parallel AI coding agent orchestration, built around an event sourcing architecture with PGLite (Postgres compiled to WASM) as the embedded local-first database. Created by Joel Hooks as a direct Gas Town alternative with a flatter, distributed coordination model versus Gas Town's hierarchical Mayor/Polecat approach.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Terminal

### Version
- Open source (2025-2026)

### Repo
- https://github.com/joelhooks/swarm-tools

### Rating
- [4] Event sourcing + PGLite enables local-first operation with no external servers; flat distributed architecture is more composable than Gas Town's hierarchy
- [3] Less mature and less documented than Gas Town; fewer built-in role primitives

### Short Description

- TypeScript/Bun parallel coding agent orchestration; event-sourced architecture; PGLite (Postgres WASM) local-first storage; flat distributed model; Gas Town alternative by Joel Hooks.

### Description

Swarm Tools takes a distributed, event-sourced approach to multi-agent coding orchestration — contrasting with Gas Town's hierarchical Mayor/Polecat model. The "events are truth" philosophy means all agent activity is recorded as an immutable event log in PGLite (Postgres compiled to WASM), a local-first embedded database requiring no external servers. Agents coordinate through event streams rather than a central orchestrator.

Built on TypeScript, Bun (fast JS runtime), Zod for schema validation, and Turborepo for monorepo management, with Effect-TS for functional programming patterns. Each worker reserves and operates on its own git worktree. The flat coordination model makes the system more composable and easier to extend than hierarchical alternatives, though it requires more explicit workflow design from the developer.

### Languages
- Any
  - TypeScript/JavaScript primary; language-agnostic at the agent level.

### Notes
- "Events are truth": immutable event log is the single source of truth.
- PGLite: Postgres compiled to WASM; runs locally, no external database server required.
- Built with: TypeScript, Bun, Zod, Turborepo, Effect-TS.
- Flat distributed model vs Gas Town's hierarchical Mayor/Polecat structure.
- Git worktrees for agent isolation (same as Gas Town).
- Created by Joel Hooks.

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
  - Workers configured upfront; event log tracks their activity.

### Coordination Mode
- Supervised

### Max Concurrent Agents
- -
  - Unlimited; limited by compute and API rate limits.

### Parallelism Model
- Free-form
  - Flat distributed coordination; no hierarchical sequencing.

### Dependency Management
- Manual
  - Developer defines task dependencies in event stream configuration.

### Conflict Resolution
- Git Worktrees
  - Git worktrees per agent; event log detects conflicting state transitions.

## Coordination

### Coordination Mechanism
- Shared Memory
  - PGLite event log is the shared state; all agents read and write events.
- Git State
  - Each agent works in an isolated git worktree.

### Agent Types Supported
- Custom / Any
  - Model-agnostic; any CLI agent can be wired in.

### Verification
- Test Execution
  - Event sourcing enables replay-based verification of agent outcomes.

## Deployment

### Self-hosted
- Yes

### BYOK
- Yes
  - Model-agnostic; BYOK for LLM providers.

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- Internal Queue
  - Event-sourced PGLite queue; tasks enter as events and workers claim them.

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
- Yes
  - PGLite event log is the persistent context store; full event replay capability.

### Direct File References
- Yes
  - Filesystem integration; workers reference specific files in task events.

### Git Support
- Yes
  - Git worktree isolation per agent.

### Checkpoints
- Yes
  - Immutable event log; full replay capability from any point.

### Observability
- Yes
  - Event log provides complete audit trail of all agent activity.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- No

### Custom Agents
- Yes
  - Any agent that can emit and consume events.

### Hooks
- Yes
  - Event-driven hooks on any agent lifecycle transition.

### Subagents
- No
