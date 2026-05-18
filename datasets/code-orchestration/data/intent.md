# Intent - https://www.augmentcode.com/intent

Intent is Augment Code's spec-driven multi-agent coding orchestration platform, launched in public beta February 2026. It uses Living Specs — self-updating documents that serve as a real-time source of truth — to coordinate a Coordinator, up to 6 Specialist agents running in parallel, and a Verifier agent. Each agent works in an isolated git worktree, eliminating merge conflicts.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Autonomous agent

### Version
- Public Beta (February 2026)

### Repo
- -
  - Proprietary product by Augment Code.

### Rating
- [5] Living Specs solve the core multi-agent synchronization problem — specs update in real-time as agents work, invalidating stale assumptions before other agents act on them
- [3] macOS only at launch; Windows on waitlist

### Short Description

- Spec-driven multi-agent orchestration with Living Specs that update in real-time; Coordinator + up to 6 parallel Specialists + Verifier; isolated git worktrees per agent.

### Description

Intent reimagines AI-assisted development around orchestrated multi-agent teamwork rather than single-agent chat. The core innovation is the Living Spec: a bidirectional, self-updating document that serves as the source of truth for the entire session. When a Specialist agent completes work, the Living Spec updates automatically. When a Specialist hasn't started a task yet, it sees the current spec state — not the original plan — preventing cascading failures from invalidated assumptions.

The architecture has three tiers: a Coordinator agent analyzes requirements and decomposes work into tasks with dependency ordering; up to 6 Specialist agents execute assigned tasks in parallel in isolated git worktrees; a Verifier agent validates output against the spec before integration. Three human approval gates provide oversight throughout. Intent supports BYOA (Bring Your Own Agent) — Specialists can be Claude Code, Codex, or OpenCode rather than Augment's native agents.

### Languages
- Any

### Notes
- BYOA: Supports Claude Code, Codex, OpenCode as Specialist agents.
- macOS only at launch; Windows waitlist.
- Pricing: Free tier + $20/month paid.
- Three approval gates for human oversight.
- Built-in Chrome browser and git workflow.

### Last Update
- 2026-05-14

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Free tier available.

## Parallelism

### Agent Topology
- Fixed

### Coordination Mode
- Autonomous

### Max Concurrent Agents
- 6
  - Up to 6 parallel Specialist agents per session.

### Parallelism Model
- Wave-based
  - Coordinator determines dependency ordering; independent tasks execute in parallel waves.

### Dependency Management
- Automatic
  - Coordinator agent analyzes task graph and sequences waves.

### Conflict Resolution
- Git Worktrees
  - Isolated git worktrees per agent; Living Spec synchronization prevents semantic conflicts before they occur.

## Coordination

### Coordination Mechanism
- Living Spec
  - Bidirectional self-updating spec document; all agents read current state, not original plan.

### Agent Types Supported
- Claude Code
- Codex / OpenAI
- Custom / Any
  - BYOA support: Claude Code, Codex, OpenCode, plus Augment native agents.

### Verification
- Verifier Agent
  - Dedicated Verifier validates output across all Specialist agents before integration.
- Human Review
  - Three approval gates throughout the session.

## Deployment

### Self-hosted
- No

### BYOK
- No
  - Managed platform with BYOA support.

### Cloud Managed
- Yes


### Local Offline
- No

## Task Management

### Task Source
- Natural Language Goal
  - Coordinator receives goal and decomposes into Specialist tasks.
- Spec Document
  - Living Spec is generated and maintained as tasks are assigned and executed.

### External Task Integrations
- GitHub Issues
  - Automated PR creation; Living Spec links to GitHub workflow.

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
- Yes
  - Living Spec is the context management layer; updates in real-time as agents complete work.

### Direct File References
- Yes
  - Goal specification and Living Spec reference specific files and service boundaries.

### Git Support
- Yes
  - Isolated git worktrees per agent; automated PR creation.

### Checkpoints
- Yes
  - Three human approval gates; pause and refine mid-session.

### Observability
- Yes
  - Real-time session monitoring; Living Spec shows current state of all agent work.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- Yes
  - BYOA: Specialists can be Claude Code, Codex, or OpenCode; custom agent configuration per session.

### Custom Agents
- Yes
  - BYOA: plug in Claude Code, Codex, or OpenCode as Specialist agents.

### Hooks
- No

### Subagents
- No
  - Fixed three-tier architecture: Coordinator → Specialists → Verifier.
