# DeerFlow - https://github.com/bytedance/DeerFlow

DeerFlow is ByteDance's open-source AI SuperAgent harness, released February 2026, built on LangGraph and LangChain. A Lead agent decomposes tasks and dispatches them to parallel sub-agents in isolated contexts; a Reporter synthesizes final output. Reached 25,000+ stars and 3,000+ forks within days of release.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Autonomous agent

### Version
- v2.0 (February 2026)

### Repo
- https://github.com/bytedance/DeerFlow

### Rating
- [4] Battle-tested ByteDance architecture; handles multi-step tasks lasting minutes to hours without context overload; Markdown skills system for no-code workflow definition
- [3] General-purpose SuperAgent — not coding-specific; requires setup of recommended models (DeepSeek v3.2, Kimi 2.5, Qwen 3.5)

### Short Description

- ByteDance open-source SuperAgent harness (LangGraph/LangChain); Lead agent decomposes tasks to parallel sub-agents; sandboxed execution; persistent memory; 25k+ stars since Feb 2026.

### Description

DeerFlow is ByteDance's production-tested multi-agent orchestration harness, open-sourced in February 2026 as v2.0 on top of LangGraph and LangChain. The architecture uses a Lead agent that decomposes complex tasks into sub-tasks and dispatches them to specialized sub-agents running in parallel. Each sub-agent operates in a scoped context with its own tools and termination conditions, preventing context overload on long-running tasks. A Reporter agent synthesizes results from all sub-agents into cohesive output.

Core infrastructure includes sandboxed code execution for safety, persistent memory with aggressive context compression, an extensible Markdown-based skills system for defining workflows without code, and filesystem integration for intermediate results. Recommended models are DeepSeek v3.2, Kimi 2.5, and Qwen 3.5. Use cases include deep research, code reviews, test automation, data pipelines, and content creation.

### Languages
- Any

### Notes
- Built on LangGraph + LangChain.
- Recommended models: DeepSeek v3.2, Kimi 2.5, Qwen 3.5.
- Markdown skills system: no-code workflow definition.
- Handles tasks lasting minutes to hours.
- 25,000+ stars, 3,000+ forks within days of Feb 2026 release.

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
- Dynamic

### Coordination Mode
- Autonomous

### Max Concurrent Agents
- -
  - Unlimited; limited by compute and model rate limits.

### Parallelism Model
- DAG
  - Lead agent decomposes to task graph; independent sub-tasks dispatch in parallel.

### Dependency Management
- Automatic
  - Lead agent determines task dependencies and dispatches accordingly.

### Conflict Resolution
- Scoped Context
  - Each sub-agent has scoped context and isolated tool access; Reporter synthesizes results.

## Coordination

### Coordination Mechanism
- Message Passing
  - Lead agent dispatches tasks; sub-agents report back; Reporter synthesizes.
- Shared Memory
  - Persistent memory with aggressive context compression shared across agents.

### Agent Types Supported
- Custom / Any
  - Model-agnostic; any LangChain-compatible agent or model.

### Verification
- Verifier Agent
  - Reporter agent synthesizes and validates sub-agent outputs.

## Deployment

### Self-hosted
- Yes

### BYOK
- Yes
  - BYOK for all model providers.

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- Natural Language Goal
  - Lead agent receives a complex task description and decomposes into sub-agent tasks.

### External Task Integrations
- -

## MCP-Client

### MCP-Client
- Yes

### Tools
- Yes
  - Sandboxed code execution, filesystem, web search, and extensible skill tools.

### Prompts
- No

### Resources
- No

### ACP
- No

## Developer Experience

### Context Management
- Yes
  - Persistent memory with aggressive context compression shared across sub-agents.

### Direct File References
- Yes
  - Filesystem integration; sub-agents reference specific files as intermediate results.

### Git Support
- No
  - No native git integration; filesystem-based intermediate results.

### Checkpoints
- Yes
  - Persistent memory with context compression preserves session state.

### Observability
- Yes
  - LangGraph execution graph provides step-by-step visibility.

## Extensible

### Plugins
- Yes

### Skills
- Yes
  - Markdown-based skills system for no-code workflow definition; extensible skill library.

### Custom Modes
- Yes
  - Custom agent roles and skills defined via Markdown; LangGraph node configuration.

### Custom Agents
- Yes
  - Any LangChain-compatible agent.

### Hooks
- Yes
  - LangGraph lifecycle hooks.

### Subagents
- Yes
  - Lead agent dynamically spawns sub-agents based on task decomposition.
