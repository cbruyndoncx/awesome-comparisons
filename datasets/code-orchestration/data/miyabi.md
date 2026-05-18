# Miyabi - https://github.com/miyabi-org/miyabi

Miyabi is a TypeScript-based AI agent orchestration framework built around Issue-Driven Development, treating GitHub as the operating system. It deploys 21 specialized agents (7 coding + 14 business agents) with 172+ MCP tools, using Git Worktree isolation to process multiple GitHub issues simultaneously without merge conflicts.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Autonomous agent

### Version
- Open source (2025-2026)

### Repo
- https://github.com/miyabi-org/miyabi

### Rating
- [4] Deepest GitHub-as-OS integration of any open-source orchestrator; 172+ MCP tools; 21 specialized agents across coding and business domains
- [3] TypeScript/Rust-focused; opinionated GitHub-native workflow

### Short Description

- TypeScript orchestration framework; 7 coding + 14 business agents; 172+ MCP tools; Issue-Driven Development with Git Worktree isolation; GitHub as OS.

### Description

Miyabi treats GitHub as the operating system for software development, orchestrating 21 specialized agents — 7 coding agents (Coordinator, CodeGen, Review, and others) plus 14 business agents — through GitHub Issues as the primary task interface. Each issue triggers parallel agent execution in isolated Git Worktrees, preventing merge conflicts while enabling concurrent development across multiple tasks.

The 172+ MCP tool integrations give agents access to the full development toolchain. The Coordinator agent decomposes issues into tasks, CodeGen agents implement in parallel, and Review agents validate output before automated PR creation. The entire lifecycle — task decomposition, code generation, quality review, and pull request — is automated within the GitHub workflow.

### Languages
- Any
  - Optimized for Rust-based projects; works with any language supported by connected MCP tools.

### Notes
- 21 agents: 7 coding (Coordinator, CodeGen, Review, and others) + 14 business agents.
- 172+ MCP tools for extended toolchain integration.
- GitHub Issues as primary task input interface.
- Automated PR creation after Review agent validation.

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
- 21
  - 7 coding + 14 business agents; multiple issues processed simultaneously.

### Parallelism Model
- Role-based
  - Fixed specialized roles: Coordinator, CodeGen, Review agents plus 14 business agents.
- Free-form
  - Multiple GitHub issues processed in parallel with independent worktrees.

### Dependency Management
- Automatic
  - Coordinator agent decomposes issues and sequences task delegation.

### Conflict Resolution
- Git Worktrees
  - Git Worktree isolation per issue; each agent gets a dedicated execution environment.

## Coordination

### Coordination Mechanism
- Git State
  - GitHub as OS; issues, PRs, and branches are the coordination substrate.
- Message Passing
  - Agents communicate through structured GitHub workflow events.

### Agent Types Supported
- Claude Code
  - Compatible via MCP integration.
- Custom / Any

### Verification
- Verifier Agent
  - Review agents validate output before PR creation.
- Human Review
  - Automated PR creation; developer reviews before merge.

## Deployment

### Self-hosted
- Yes

### BYOK
- Yes

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- GitHub Issues
  - Issue-Driven Development: each GitHub issue triggers full agent lifecycle.

### External Task Integrations
- GitHub Issues
  - Native GitHub integration; PRs created automatically after Review agent validation.

## MCP-Client

### MCP-Client
- Yes
  - 172+ MCP tools integrated.

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
  - GitHub Issues serve as persistent context; full issue and PR history maintained in GitHub.

### Direct File References
- Yes
  - GitHub Issues can reference specific files; CodeGen agents work on file-level tasks.

### Git Support
- Yes
  - GitHub-native; Git Worktree isolation; automated PR creation.

### Checkpoints
- Yes
  - PR review gates before merge.

### Observability
- Yes
  - GitHub Issues and PRs provide full audit trail of agent activity.

## Extensible

### Plugins
- No

### Skills
- No

### Custom Modes
- Yes
  - Custom agent roles beyond default Coordinator/CodeGen/Review can be defined.

### Custom Agents
- Yes
  - Additional agents can be defined and registered in the framework.

### Hooks
- Yes
  - GitHub webhook-driven lifecycle events.

### Subagents
- Yes
  - Coordinator spawns CodeGen and Review subagents per task.
