# Paperclip - https://github.com/paperclip-ai/paperclip

Paperclip is an open-source Node.js + React platform that treats AI agents as employees and acts as the company management layer. Launched March 2, 2026, it reached 31,000+ GitHub stars within weeks. Agents from different providers (Claude Code, Codex, Cursor, OpenClaw) are "hired" into an org chart with budgets, reporting lines, and goal alignment. The platform solves the multi-agent coordination problem at the business process level rather than the code task level.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Autonomous agent

### Version
- GA (March 2026)

### Repo
- https://github.com/paperclip-ai/paperclip

### Rating
- [5] Uniquely solves the business management layer for AI agent teams — org charts, per-agent budgets, goal alignment, and governance that no other orchestrator provides; 31k+ stars in weeks
- [3] Broader than coding-only; not optimised for low-level git worktree coding workflows

### Short Description

- Node.js + React management layer for AI agent teams; org charts, per-agent budgets, governance, goal alignment; multi-provider (Claude Code, Codex, Cursor); 31k+ stars; March 2026.

### Description

Paperclip is the management layer above individual AI coding agents — "if OpenClaw is an employee, Paperclip is the company." It orchestrates teams of agents from different providers (Claude Code, Codex, Cursor, OpenClaw) through a unified dashboard with org charts, reporting hierarchies, per-agent monthly token budgets, goal alignment, audit trails, and rollback capability.

Agents wake on schedules, check their work queues, and execute tasks autonomously without human intervention. Atomic execution prevents double-work and concurrent spend conflicts. Persistent state means agents resume context across heartbeats. Multiple isolated businesses can run from a single deployment. The mobile-ready dashboard lets operators monitor and steer the entire agent workforce from anywhere. Unlike task-level orchestrators (Gas Town, Bernstein), Paperclip operates at the business process level — aligning agent work to company missions and enforcing governance.

### Languages
- Any

### Notes
- Launched March 2, 2026; 31,000+ GitHub stars within weeks of launch.
- Supports: Claude Code, Codex, Cursor, OpenClaw, and other providers.
- Per-agent monthly token budgets prevent runaway costs.
- Multi-company: run multiple isolated businesses from one deployment.
- Immutable audit logs, approval gates, rollback capability.
- Mobile-ready dashboard.

### Last Update
- 2026-05-14

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
  - Fully open source; costs are underlying agent API usage.

## Parallelism

### Agent Topology
- Fixed
  - Agents are configured ("hired") into the org chart; count is set by the operator.

### Coordination Mode
- Managed

### Max Concurrent Agents
- -
  - Unlimited; limited by configured agent count and budgets.

### Parallelism Model
- Role-based
  - Org chart defines agent roles, reporting lines, and work queue assignment.

### Dependency Management
- Manual
  - Goals and task queues configured by operator; agents execute assigned work autonomously.

### Conflict Resolution
- Atomic Execution
  - Atomic execution prevents concurrent spend conflicts; budget limits prevent resource contention.

## Coordination

### Coordination Mechanism
- Shared Memory
  - Persistent state shared across agent heartbeats; agents resume context across sessions.
- Message Passing
  - Work queues route tasks to appropriate agents based on org chart roles.

### Agent Types Supported
- Claude Code
- Codex / OpenAI
- Custom / Any
  - Multi-provider: Claude Code, Codex, Cursor, OpenClaw, and others.

### Verification
- Human Review
  - Approval gates and rollback capability; operator oversight via dashboard.

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
- Internal Queue
  - Work queues per agent role; tasks aligned to company goals and org chart.
- External Tracker
  - Agents can be wired to pull from external trackers via API integrations.

### External Task Integrations
- Custom / API
  - API-driven; any external tracker can feed the work queue.

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
  - Persistent state maintained across agent heartbeats; agents resume context between sessions.

### Direct File References
- No
  - Business/goal level task descriptions; no file-level reference syntax.

### Git Support
- Yes
  - Agents execute git-based coding tasks; git integration via underlying agent tools.

### Checkpoints
- Yes
  - Immutable audit logs; rollback capability; persistent agent state across heartbeats.

### Observability
- Yes
  - CEO dashboard: real-time agent activity, budget consumption, goal progress, audit trail.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- No

### Custom Agents
- Yes
  - Any agent provider can be integrated.

### Hooks
- Yes
  - Schedule-based wakeup hooks; approval gate hooks.

### Subagents
- No
  - Flat agent fleet managed by org chart; no dynamic spawning.
