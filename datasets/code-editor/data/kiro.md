# Kiro - https://kiro.dev/

AWS Kiro is an agentic AI development IDE built on VS Code (Code OSS), launched by Amazon in 2025 and reaching GA in 2026. It introduces a spec-driven development workflow where requirements, design, and task documents are the source of truth — code becomes a build artifact derived from structured specs.

Kiro differentiates through deep AWS-native integration (Bedrock, CodeCatalyst, IAM, Lambda) and automated quality gates via Agent Hooks that fire on file save, PR open, and repo events. It ships as three surfaces: the IDE, a CLI, and an autonomous background agent that can open PRs independently.

**Dataset ID:** code-editor

## General Info

### Classification
- Code/Editor
- Code/Autonomous agent

### Version
- GA (2026)

### Repo
- -
  - Proprietary AWS product; no public GitHub repo for core IDE.

### Rating
- [4] Spec-driven workflow and automated quality gates are genuinely innovative for structured AI-assisted development
- [3] Locked to Amazon Bedrock models; no multi-provider support outside AWS ecosystem

### Short Description

- Agentic VS Code-based IDE by AWS with spec-driven development, Agent Hooks, and deep AWS-native integration.

### Description

Kiro is Amazon's agentic development IDE, built on Code OSS (VS Code open source) and released as GA in 2026. Its primary differentiator is a spec-driven development model: before generating code, Kiro enforces a three-phase workflow producing requirements.md, design.md, and tasks.md. These specs become the authoritative source of truth, making code a reproducible artifact and improving maintainability of AI-generated changes.

Agent Hooks provide event-driven automation that fires on file save, PR open, and other repo events — running security scans, linters, tests, and documentation updates automatically without manual prompting. Steering Files allow teams to encode custom rules, coding standards, and conditional context that loads by file type, reducing token waste. Kiro supports up to 4 parallel Subagents for independent subtasks and includes a headless mode for CI/CD pipeline integration. All three surfaces (IDE, CLI, Autonomous Agent) share configuration and steering file context.

### Languages
- Any
  - LSP support for 18 languages; semantic search across the full codebase.

### Notes
- Spec-driven: Three-phase workflow (requirements → design → tasks) before code generation reduces uncontrolled AI output.
- AWS ecosystem: Deep integration with CodeCatalyst, Q Developer, Bedrock, IAM, CloudFormation, and CloudWatch.
- Autonomous agent: Background agent can open PRs independently; production use requires human oversight guardrails (AWS outage incident, Dec 2025).
- 50+ MCP integrations including Figma, Terraform, Stripe, and Datadog.

### Last Update
- 2026-05-13

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Free tier available; paid plans for higher usage.

## MCP-Client

### MCP-Client
- Yes
  - Native MCP support with 50+ pre-built integrations.

### Prompts
- Yes

### Tools
- Yes

### Resources
- Yes

### ACP
- No

## Deployment

### BYOK
- No
  - Locked to Amazon Bedrock models (Claude Sonnet 4.5, Amazon Nova, DeepSeek, Qwen via Bedrock). No direct OpenAI or Google model access.

### Local Offline
- No
  - Cloud-dependent; requires AWS Bedrock connectivity.

## Developer Experience

### Context Management
- Yes
  - Steering Files load conditionally by file type; full codebase semantic search; spec documents provide persistent structured context.

### Direct File References
- Yes
  - @file references and codebase-aware context window.

### Checkpoints
- Yes
  - Checkpoint system for autonomous agent sessions.

### Git Support
- Yes
  - Autonomous agent can open PRs; native integration with CodeCatalyst and GitHub.

## Extensible

### Plugins
- Yes
  - Full VS Code extension compatibility.

### Hooks
- Yes
  - Agent Hooks fire on file save, PR open, and repo events; run 17+ automated quality gates.

### SlashCommands
- Yes

### Skills
- No

### Custom Modes
- Yes
  - Pre-approved Custom Agents for specialized tasks (e.g., AWS infrastructure agent).

### Subagents
- Yes
  - Up to 4 parallel Subagents for independent subtasks.
