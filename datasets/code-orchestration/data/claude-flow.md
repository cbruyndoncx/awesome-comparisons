# Claude-Flow - https://github.com/ruvnet/claude-flow

Claude-Flow is an enterprise-grade orchestration platform purpose-built for Claude-based multi-agent swarms. Hive-mind swarm intelligence coordinates 60+ configurable agents across 170+ MCP tools. Agents can spawn additional agents dynamically (true swarm topology). SONA self-learning framework enables adaptive agent behaviour; RuVector vector database provides RAG integration. Achieves 84.8% SWE-Bench score.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Autonomous agent

### Version
- v3 (2025-2026)

### Repo
- https://github.com/ruvnet/claude-flow

### Rating
- [4] True dynamic swarm topology — agents spawn child agents at runtime; 84.8% SWE-Bench; 352x faster WASM execution; purpose-built for Claude ecosystem
- [3] Claude-only; not model-agnostic; less suitable for teams using non-Anthropic models

### Short Description

- Claude-native multi-agent swarm platform; hive-mind swarm intelligence; 60+ agents; 170+ MCP tools; SONA self-learning; RuVector RAG; dynamic agent spawning; 84.8% SWE-Bench; v3.

### Description

Claude-Flow is an enterprise orchestration platform that extends Claude Code into a full multi-agent swarm system. The hive-mind swarm intelligence layer coordinates 60+ configurable agents that can dynamically spawn child agents based on discovered task complexity — making this a true swarm topology rather than fixed-count orchestration. Agents share state through persistent SQLite memory and leverage 170+ MCP tools for toolchain access.

The SONA self-learning framework enables agents to adapt their behaviour based on prior outcomes within and across sessions. RuVector, a built-in vector database, provides retrieval-augmented generation for codebase and documentation context. Native Claude Code integration makes it the deepest Claude-specific orchestration platform available. Performance benchmarks: 84.8% SWE-Bench score, 352x faster WASM execution vs baseline. The platform targets complex autonomous workflows, enterprise-scale AI solutions, and multi-agent coding tasks.

### Languages
- Any
  - Coding agent capabilities inherit Claude Code's language support.

### Notes
- Claude-only: not model-agnostic; requires Anthropic API access.
- SONA: self-learning framework; agents adapt behaviour from prior outcomes.
- RuVector: built-in vector DB for RAG; codebase and documentation retrieval.
- 84.8% SWE-Bench; 352x faster WASM execution.
- 60+ agents (v3); 170+ MCP tools.
- Persistent SQLite memory across agent sessions.
- Also available at github.com/INTGworld/claude-code-flow.

### Last Update
- 2026-05-14

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
  - Open source; Anthropic API costs apply.

## Parallelism

### Agent Topology
- Dynamic
  - Agents spawn child agents at runtime based on discovered task complexity; hive-mind swarm topology is emergent.

### Coordination Mode
- Autonomous

### Max Concurrent Agents
- 60
  - 60+ configurable agents in v3; dynamic spawning can exceed this.

### Parallelism Model
- Free-form
  - Hive-mind swarm assigns work dynamically; no fixed wave or DAG structure.

### Dependency Management
- Automatic
  - Swarm intelligence layer handles task routing and dependency resolution dynamically.

### Conflict Resolution
- Shared Memory
  - Persistent SQLite shared memory coordinates agent state; swarm layer resolves task contention.

## Coordination

### Coordination Mechanism
- Shared Memory
  - Persistent SQLite memory shared across all agents in the swarm.

### Agent Types Supported
- Claude Code
  - Purpose-built for Claude Code as the underlying agent runtime.

### Verification
- Test Execution
  - SWE-Bench-validated output quality; automated verification via agent hooks.

## Deployment

### Self-hosted
- Yes

### BYOK
- Yes
  - Anthropic API key required; BYOK model.

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- Natural Language Goal
  - Swarm receives a goal; hive-mind layer decomposes and distributes tasks dynamically.

### External Task Integrations
- GitHub Issues
  - Via underlying Claude Code git integration.

## MCP-Client

### MCP-Client
- Yes
  - 170+ MCP tools integrated.

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
  - Persistent SQLite memory shared across all agents; SONA self-learning retains cross-session outcomes.

### Direct File References
- Yes
  - RuVector vector DB enables codebase and documentation retrieval; Claude Code file awareness.

### Git Support
- Yes
  - Native Claude Code git integration.

### Checkpoints
- Yes
  - Persistent SQLite memory preserves swarm state across sessions.

### Observability
- Yes
  - Neural pattern recognition; advanced hooks; swarm activity logging.

## Extensible

### Plugins
- No

### Skills
- Yes
  - SONA self-learning framework; 60+ configurable agent skill types.

### Custom Modes
- Yes
  - 60+ configurable agent types; custom agents can be defined and deployed in the swarm.

### Custom Agents
- Yes
  - 60+ configurable agent types; custom agents can be defined.

### Hooks
- Yes
  - Advanced hooks for agent lifecycle events; SONA learning integration.

### Subagents
- Yes
  - Agents dynamically spawn child agents at runtime — core swarm mechanic.
