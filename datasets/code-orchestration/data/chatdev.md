# ChatDev - https://github.com/OpenBMB/ChatDev

ChatDev (v2.0 / DevAll) is a zero-code multi-agent orchestration platform by OpenBMB, released January 2026. It evolved from a rigid virtual software company model to a flexible DAG-based orchestration platform. The MacNet architecture supports 1000+ agents in directed acyclic graph topologies. NeurIPS 2025 paper "Multi-Agent Collaboration via Evolving Orchestration" introduced the Puppeteer paradigm — a learnable central orchestrator that adapts collaboration strategies at runtime.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Autonomous agent

### Version
- v2.0 / DevAll (January 2026)

### Repo
- https://github.com/OpenBMB/ChatDev

### Rating
- [4] MacNet + Puppeteer architecture (NeurIPS 2025) enables genuinely dynamic orchestration that adapts at runtime; visual designer lowers barrier to complex multi-agent workflows
- [3] Originally coding-focused but v2.0 is multi-domain; coding-specific features less opinionated than Intent or Bernstein

### Short Description

- Zero-code multi-agent orchestration; MacNet DAG architecture supports 1000+ agents; Puppeteer learnable dynamic orchestrator; NeurIPS 2025; visual designer + Python SDK; January 2026.

### Description

ChatDev v2.0 (DevAll) retains the virtual software company origins (CEO, CPO, CTO, Programmer, Reviewer, Tester, Designer roles) but replaces the rigid sequential pipeline with a flexible MacNet architecture supporting directed acyclic graph topologies of 1000+ agents. The visual drag-and-drop workflow designer lets non-developers build complex agent networks without writing coordination code; a Python SDK gives advanced users programmatic control.

The key research contribution from NeurIPS 2025 is the Puppeteer paradigm: a learnable central orchestrator that dynamically adapts collaboration strategies based on runtime conditions rather than following a fixed execution plan. This makes ChatDev genuinely dynamic — the orchestrator improves its routing decisions over time based on observed outcomes. Agents adapt their collaboration patterns within a running session. Use cases span software development, research, 3D modeling, video creation, and data analysis.

### Languages
- Any

### Notes
- NeurIPS 2025: "Multi-Agent Collaboration via Evolving Orchestration" — MacNet + Puppeteer.
- MacNet: DAG topology for sophisticated agent communication without circular dependencies.
- Puppeteer: learnable central orchestrator; adapts routing strategies at runtime.
- Visual designer (no-code) + Python SDK (programmatic).
- Original roles still available: CEO, CPO, CTO, Programmer, Reviewer, Tester, Designer.
- Multi-domain: software development, research, 3D modeling, video, data analysis.

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
  - Puppeteer learnable orchestrator adapts collaboration strategies at runtime; DAG supports emergent agent topologies.

### Coordination Mode
- Autonomous

### Max Concurrent Agents
- 1000
  - MacNet DAG architecture tested at 1000+ agents.

### Parallelism Model
- DAG
  - MacNet directed acyclic graph; independent tasks execute in parallel within the DAG.

### Dependency Management
- Automatic
  - Puppeteer orchestrator dynamically determines agent routing and task sequencing.

### Conflict Resolution
- DAG Ordering
  - DAG structure enforces dependency ordering; no circular agent dependencies by design.

## Coordination

### Coordination Mechanism
- Message Passing
  - MacNet agent communication framework with dynamic routing.
- Shared Memory
  - Central orchestrator maintains session state for adaptive routing decisions.

### Agent Types Supported
- Custom / Any
  - Framework-agnostic; any agent can be defined via visual designer or Python SDK.

### Verification
- Verifier Agent
  - Reviewer and Tester role agents validate output.

## Deployment

### Self-hosted
- Yes

### BYOK
- Yes
  - Model-agnostic; BYOK for any LLM provider.

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- Natural Language Goal
  - Single natural language requirement triggers full MacNet DAG decomposition.
- Spec Document
  - PM agent generates PRD; Architect generates design doc as intermediate task specs.

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
- Yes
  - Puppeteer orchestrator checkpoints routing state; session state maintained across the DAG.

### Direct File References
- No
  - Entry point is a natural language requirement; no direct file reference syntax.

### Git Support
- Yes

### Checkpoints
- Yes
  - Learnable orchestrator checkpoints routing state for session continuity.

### Observability
- Yes
  - Visual workflow designer shows DAG execution state in real-time.

## Extensible

### Plugins
- Yes

### Skills
- Yes
  - Custom agent roles defined via visual drag-and-drop designer or Python SDK.

### Custom Modes
- Yes
  - Custom roles (beyond default CEO/CPO/CTO/Engineer/QA) via visual designer or SDK.

### Custom Agents
- Yes
  - Define custom roles via drag-and-drop designer or Python SDK.

### Hooks
- Yes
  - Python SDK lifecycle hooks.

### Subagents
- Yes
  - Agents spawn subagents dynamically within the DAG topology.
