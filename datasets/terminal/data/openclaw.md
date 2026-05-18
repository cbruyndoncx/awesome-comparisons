# OpenClaw - https://github.com/openclaw/openclaw

OpenClaw is a free, open-source AI agent and terminal CLI designed as a privacy-friendly alternative to hosted coding assistants. It runs entirely on your own machine using local or cloud LLMs (Llama 3, Claude, GPT, Gemini, and others), giving full control over data and model choice. The agent can read and write files, execute shell commands, search codebases, and automate multi-step tasks from the terminal.

Beyond coding, OpenClaw is designed as a general-purpose digital assistant that can integrate with Telegram, email, web research, and external services via its skills and MCP support. Configuration is managed through `openclaw` subcommands (`openclaw onboard`, `openclaw models`, `openclaw skills`, `openclaw doctor`) and a config file with `mcp.servers` for connecting to MCP servers.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal

### Version
- 2026
  - Active development; no stable 1.0 yet. Check GitHub releases for latest.

### Repo
- https://github.com/openclaw/openclaw

### Rating
- [4] Privacy-first local execution; model-agnostic (local + cloud); native MCP client; skills system; multi-channel integrations (Telegram, email, web).
- [3] Pre-1.0 maturity; general-purpose focus means coding workflows share space with non-coding integrations.

### Short Description

- Privacy-friendly open-source terminal AI agent; runs local or cloud LLMs; file/shell access; native MCP client; skills system; multi-channel integrations.

### Description

OpenClaw is an open-source terminal agent that prioritizes privacy by running on your own machine. It supports a wide range of LLM providers — local models (Llama 3, Mistral, etc.) as well as cloud APIs (Claude, GPT, Gemini) — configured via `openclaw models`. The agent handles multi-step tasks: reading and writing files, running shell commands, searching codebases, and chaining tool calls across a session.

The skills system (`openclaw skills`) allows installing packaged workflows, including MCP-backed ones. Native MCP client support lets OpenClaw register tools from external MCP servers (GitHub, Notion, databases, analytics) directly via `mcp.servers` config, and OpenClaw can also be exposed as an MCP server itself through `openclaw-mcp` container images, enabling other MCP-compatible clients (Claude Code, Cursor, etc.) to delegate tasks to it.

Beyond coding, OpenClaw integrates with Telegram, email, and web research as channels, making it usable as a persistent background assistant. The `openclaw doctor` command checks agent health and MCP connectivity.

### Languages
- Any
  - Model-agnostic; language support depends on the underlying LLM.

### Notes
- Dual MCP role: acts as MCP client (connects to external servers) and can be exposed as MCP server via `openclaw-mcp` container image.
- Skills installable as zipped packages; MCP servers can be registered as skills.
- `openclaw doctor` for health and MCP diagnostics.
- Multi-channel: Telegram, email, web research in addition to terminal.

### Last Update
- 2026-05-17

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
  - Fully open source; bring your own API keys or use local models.

## MCP-Client

### MCP-Client
- Yes
  - Native MCP client support; MCP servers configured under `mcp.servers` in config. Also exposable as an MCP server via `openclaw-mcp`.

### Prompts
- Yes
  - MCP-defined prompt templates supported via connected MCP servers.

### Tools
- Yes
  - Full MCP tool execution; tools registered from connected MCP servers and callable during agent sessions.

### Resources
- Yes
  - MCP resource access supported via connected servers.

### ACP
- No

## Deployment

### BYOK
- Yes
  - Supports local models (Llama 3, Mistral, etc.) and cloud APIs (Claude, GPT, Gemini) via `openclaw models` config.

### Local Offline
- Yes
  - Designed to run fully locally with local LLMs; no mandatory cloud dependency.

## Developer Experience

### Context Management
- Yes
  - Session-based context; skills system for reusable workflows; `openclaw doctor` for health monitoring.

### Direct File References
- Yes
  - Agent can read and write files directly; codebase search supported.

### Checkpoints
- No

### Git Support
- Yes
  - Can execute git commands via shell tool access.

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- No

### Skills
- Yes
  - Skills system (`openclaw skills`) for installable packaged workflows including MCP-backed integrations.

### Custom Modes
- No

### Subagents
- No
