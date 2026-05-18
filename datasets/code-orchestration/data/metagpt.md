# MetaGPT - https://github.com/geekan/MetaGPT

MetaGPT simulates a complete software development company using AI agents. A single natural language requirement triggers a full organizational workflow: Product Manager writes the PRD, System Architect produces design docs, Engineers implement code, QA validates output. Accepted to ICLR 2024 (top 1.2%, #1 in LLM-based Agent category); 58,800+ GitHub stars.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Autonomous agent

### Version
- v0.8+ (2025-2026); MGX (MetaGPT X) launched February 2025

### Repo
- https://github.com/geekan/MetaGPT

### Rating
- [4] Most mature role-based coding orchestration framework; ICLR 2024 top paper; 58k+ stars and large community
- [3] SOPs are opinionated — adapting to non-standard workflows requires framework knowledge; output quality varies with task complexity

### Short Description

- Open-source software company simulation; single requirement in → PRD, architecture, code, docs, QA out; Product Manager, Architect, Engineer, QA agents coordinated by SOPs; 58k+ stars.

### Description

MetaGPT encodes the philosophy "Code = SOP(Team)" — software development Standard Operating Procedures materialized as AI agent coordination. A single natural language requirement triggers the full organizational workflow: the Product Manager agent writes requirements and user stories, the System Architect produces technical design and API specs, Engineers implement code, and the QA agent validates output. All coordination flows through SOPs that enforce structured handoffs between roles.

The framework takes one-line requirements as input and produces a complete artifact set: PRDs, system design docs, class diagrams, API schemas, source code, and test cases. MGX (MetaGPT X), launched February 2025, is marketed as the "world's first AI agent development team" — a hosted version of MetaGPT with additional business-facing agents. The framework is model-agnostic and supports any LLM backend.

### Languages
- Any

### Notes
- Core philosophy: "Code = SOP(Team)" — SOPs define all agent handoffs.
- Output artifacts: PRD, system design, class diagrams, API specs, source code, test cases.
- ICLR 2024: top 1.2%, oral presentation, ranked #1 in LLM-based Agent category.
- MGX (MetaGPT X, Feb 2025): hosted "AI development team" product.
- 58,800+ GitHub stars; large community.
- Model-agnostic; supports GPT-4, Claude, DeepSeek, local models.

### Last Update
- 2026-05-14

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- Yes
  - Fully open source. MGX hosted version has separate pricing.

## Parallelism

### Agent Topology
- Fixed

### Coordination Mode
- Autonomous

### Max Concurrent Agents
- -
  - Role-based sequential-by-default; parallel execution possible for independent Engineering tasks.

### Parallelism Model
- Role-based
  - Fixed roles: Product Manager → Architect → Engineer(s) → QA in SOP-defined sequence.

### Dependency Management
- Automatic
  - SOPs define handoff order; upstream outputs are inputs to downstream agents.

### Conflict Resolution
- SOP Handoffs
  - Sequential SOP handoffs minimize conflicts; Engineers work on assigned modules.

## Coordination

### Coordination Mechanism
- Role Handoff
  - Structured SOP-defined handoffs: each agent receives outputs from the prior role as context.

### Agent Types Supported
- Custom / Any
  - Model-agnostic; any LLM backend (GPT-4, Claude, DeepSeek, Ollama).

### Verification
- Verifier Agent
  - QA agent validates Engineer output before delivery.

## Deployment

### Self-hosted
- Yes

### BYOK
- Yes
  - Model-agnostic; BYOK for any supported LLM.

### Cloud Managed
- Yes
  - MGX hosted product (MetaGPT X).


### Local Offline
- Yes

## Task Management

### Task Source
- Natural Language Goal
  - Single-line requirement is the entry point; PM agent generates PRD as first step.
- Spec Document
  - PRD, system design, and class diagrams produced as intermediate task specs.

### External Task Integrations
- -

## MCP-Client

### MCP-Client
- Yes

### Tools
- Yes
  - Built-in tools: web search, code execution, file system access.

### Prompts
- No

### Resources
- No

### ACP
- No

## Developer Experience

### Context Management
- Yes
  - SOP-generated artifacts (PRD, design docs, class diagrams) serve as persistent context between stages.

### Direct File References
- No
  - Single-line NL requirement is the entry point; no direct file reference syntax.

### Git Support
- Yes
  - Code output saved to filesystem; git integration available.

### Checkpoints
- Yes
  - Each SOP stage produces artifacts that serve as checkpoints.

### Observability
- Yes
  - Per-agent logs and artifact outputs at each SOP stage.

## Extensible

### Plugins
- Yes

### Skills
- Yes
  - SOP definitions are reusable workflow specs; custom roles extend the default pipeline.

### Custom Modes
- Yes
  - Custom SOP roles and handoff sequences configurable beyond default PM/Architect/Engineer/QA.

### Custom Agents
- Yes
  - Custom roles and SOPs can be defined.

### Hooks
- Yes
  - SOP stage hooks for custom logic.

### Subagents
- Yes
  - Engineer role supports multiple parallel sub-agents for different modules.
