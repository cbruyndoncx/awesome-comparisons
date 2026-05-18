# AgentScope - https://github.com/agentscope-ai/agentscope

AgentScope is Alibaba Tongyi Lab's production-ready multi-agent framework built around Agent-Oriented Programming (AOP). MsgHub provides multi-agent message routing with dynamic participant management; built-in MCP and A2A protocol support enables interoperability. Designed for 5-minute setup with serverless and Kubernetes deployment options.

**Dataset ID:** code-orchestration

## General Info

### Classification
- Code/Orchestration
- Code/Autonomous agent

### Version
- GA (2025-2026)

### Repo
- https://github.com/agentscope-ai/agentscope

### Rating
- [4] Production-ready with 5-minute setup; MsgHub message routing + MCP + A2A in one framework; OpenTelemetry observability built in
- [3] General-purpose framework — not coding-specific; requires additional wiring for software development workflows

### Short Description

- Alibaba Tongyi Lab multi-agent framework; MsgHub for message routing; MCP + A2A protocol support; ReAct agents; sequential and dynamic pipelines; serverless/K8s deployment; 5-min setup.

### Description

AgentScope is Alibaba Tongyi Lab's production multi-agent framework following the Agent-Oriented Programming (AOP) paradigm. MsgHub is the core coordination primitive: it manages multi-agent conversations with efficient message routing, dynamic participant management, and sequential or broadcast communication patterns. Agents are built on a ReAct architecture with parallel tool calls and asynchronous execution.

The framework has built-in support for Model Context Protocol (MCP) — individual MCP tools can be used as local callable functions, composed into toolkits, or wrapped into complex tools. A2A (Agent-to-Agent) protocol enables interoperability with agents from other frameworks. Built-in capabilities include memory, planning, real-time voice, evaluation, model finetuning, and human-in-the-loop steering. Deployment targets range from serverless to Kubernetes, with OpenTelemetry for observability.

### Languages
- Any
  - Python primary; Java implementation available in the agentscope-ai organization.

### Notes
- MsgHub: dynamic participant management; sequential and broadcast message patterns.
- MCP: use individual tools as local callables, compose toolkits, or wrap into complex tools.
- A2A: native Agent-to-Agent protocol support for cross-framework interoperability.
- OpenTelemetry: built-in observability.
- Deployment: serverless and Kubernetes targets.
- Java implementation available alongside Python core.

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
  - Dynamic pipeline orchestration; agents and participants added/removed at runtime via MsgHub.

### Coordination Mode
- Autonomous

### Max Concurrent Agents
- -
  - Unlimited; depends on deployment infrastructure.

### Parallelism Model
- DAG
  - Sequential and dynamic pipeline orchestration; dependency-aware dispatch.

### Dependency Management
- Automatic
  - Dynamic pipeline mode handles agent sequencing automatically.

### Conflict Resolution
- Message Routing
  - MsgHub manages message routing; participants can be dynamically added or removed to resolve contention.

## Coordination

### Coordination Mechanism
- Message Passing
  - MsgHub: multi-agent message routing with sequential and broadcast patterns.

### Agent Types Supported
- Custom / Any
  - Framework-agnostic via A2A protocol; any agent conforming to AOP interface.

### Verification
- Human Review
  - Human-in-the-loop steering built in.

## Deployment

### Self-hosted
- Yes
  - Serverless and Kubernetes deployment targets.

### BYOK
- Yes
  - Model-agnostic; any LLM provider.

### Cloud Managed
- No


### Local Offline
- Yes

## Task Management

### Task Source
- Natural Language Goal
  - Agents receive tasks through MsgHub message passing from an orchestrating caller.

### External Task Integrations
- Custom / API
  - A2A protocol enables integration with external task sources.

## MCP-Client

### MCP-Client
- Yes
  - Flexible MCP integration: individual tools, toolkits, or complex composed tools.

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
  - Persistent memory across agent sessions; MsgHub maintains conversation history.

### Direct File References
- No

### Git Support
- No
  - No native git integration documented.

### Checkpoints
- Yes
  - Persistent memory across agent sessions.

### Observability
- Yes
  - OpenTelemetry built in; comprehensive agent activity telemetry.

## Extensible

### Plugins
- Yes

### Skills
- Yes
  - Extensible skills framework; built-in capabilities include memory, planning, evaluation, and finetuning.

### Custom Modes
- Yes
  - AOP paradigm: any custom agent role can be defined and registered in the framework.

### Custom Agents
- Yes
  - AOP paradigm; any agent can be defined and registered.

### Hooks
- Yes
  - ReAct lifecycle hooks; evaluation and finetuning hooks.

### Subagents
- Yes
  - Dynamic participant management via MsgHub allows runtime agent spawning.
