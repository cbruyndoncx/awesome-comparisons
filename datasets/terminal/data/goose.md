# Goose - https://block.github.io/goose/

Goose is Block's (formerly Square) fully open-source AI coding agent, built in Rust under Apache 2.0. It runs as both a desktop app and CLI, executes full autonomous development workflows, and supports 15+ LLM providers with no vendor lock-in. The tool itself is free — users pay only for underlying LLM API costs.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal
- Code/Autonomous agent

### Version
- GA (2025, accelerated as "Honk" late 2025)

### Repo
- https://github.com/block/goose

### Rating
- [4] Deepest MCP integration of any free CLI tool (3,000+ servers); true Apache 2.0 open source; model-agnostic
- [3] No built-in editor; lower raw coding benchmarks than proprietary tools; users manage their own model billing

### Short Description

- Block's open-source Apache 2.0 CLI coding agent; model-agnostic (15+ providers), 3,000+ MCP servers, subagents for parallel tasks, free except LLM API costs.

### Description

Goose is Block's open-source AI agent, built in Rust and released under Apache 2.0. It runs as a CLI or desktop application and executes full development workflows autonomously: code editing, shell commands, debugging, API calls, and multi-step task orchestration. It is model-agnostic and works with any of 15+ LLM providers including Anthropic, OpenAI, Gemini, Groq, and Ollama — including local models — letting users leverage existing API subscriptions or model credits.

MCP integration is a core differentiator: Goose supports 3,000+ MCP servers out of the box, connecting to GitHub, Jira, Slack, Docker, Kubernetes, databases, Figma, and custom tools via community-built extensions. Goose also functions as an ACP (Agent Client Protocol) server, enabling integration into VS Code, Zed, and JetBrains. Subagents allow parallel task delegation. Sessions are persistent and can be shared across machines.

### Languages
- Any

### Notes
- Pricing: $0 for the tool (Apache 2.0); pay only for LLM API calls. No per-seat licensing.
- Backed by Block (formerly Square); Linux Foundation affiliated.
- ACP server support: integrates into VS Code, Zed, JetBrains as an agent backend.
- Voice input and OS-level sandboxing available.
- 3,000+ MCP servers; community-extensible.

### Last Update
- 2026-05-13

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- Yes
  - Fully free and open source; no trial limitations.

## MCP-Client

### MCP-Client
- Yes
  - 3,000+ MCP servers supported out of the box.

### Prompts
- Yes

### Tools
- Yes

### Resources
- Yes

### ACP
- Yes
  - Functions as ACP server for VS Code, Zed, and JetBrains.

## Deployment

### BYOK
- Yes
  - Model-agnostic; supports 15+ providers via BYOK. Works with Ollama for fully local offline use.

### Local Offline
- Yes
  - Supports local models via Ollama and llama.cpp.

## Developer Experience

### Context Management
- Yes
  - Persistent sessions shareable across machines.

### Direct File References
- Yes

### Checkpoints
- No

### Git Support
- Yes

## Extensible

### Plugins
- Yes
  - MCP-based extension ecosystem; community-built extensions for common workflows.

### Hooks
- No

### SlashCommands
- Yes

### Skills
- No

### Custom Modes
- No

### Subagents
- Yes
  - Spawn parallel specialized subagents for distinct task delegation.
