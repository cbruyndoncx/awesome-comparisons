# Antigravity - https://antigravity.dev
Antigravity is Google's free AI-powered agentic development platform that represents a fundamental shift from traditional manual coding to autonomous agent-driven development. Built as a VSCode fork with multi-agent orchestration capabilities, Antigravity enables AI agents to plan entire projects, write code across multiple files, test applications, and debug issues automatically through an integrated editor, terminal, and browser environment.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal

### Version
Preview (November 2025)

### Repo
-

### Rating
-

### Short Description
Google's free AI-powered agentic IDE with autonomous multi-agent orchestration

### Description
Antigravity is an agent-first development platform that functions as a terminal-integrated IDE designed to automate complex development tasks. Unlike traditional coding assistants that provide autocomplete suggestions, Antigravity orchestrates autonomous AI agents that can plan, implement, test, and debug complete features. The platform implements a three-surface architecture consisting of an Editor panel (VSCode-based), Agent Manager, Artifacts panel, Browser preview, and Terminal. As of January 2026, it remains in public preview.

The platform uses natural language commands triggered through keyboard shortcuts and supports two distinct execution modes: Fast mode for quick tasks and Planning mode for complex tasks requiring approval. Antigravity provides built-in MCP integration for connecting to external tools and services, supports multi-agent parallel execution, and generates transparent artifacts including task lists, implementation plans, and browser recordings that allow developers to verify agent logic and provide feedback.

### Languages
- Any

### Notes
Currently in experimental phase with documented operational issues including crashes and quota-management problems. Uses Gemini 3 Pro as primary model with generous usage limits during preview.

### Last Update
2026-01-31

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Free during preview period with generous Gemini 3 Pro usage limits

## MCP-Client

### MCP-Client
- Yes
  - Built-in MCP servers for Figma, GitHub, Stripe, PayPal, Looker, and Supabase
  - Custom MCP integration supported via mcp.json configuration

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

### Local Offline
- No

## Developer Experience

### Context Management
- Yes
  - Can include additional context using @ symbol for files, directories, MCP servers

### Direct File References
- Yes
  - @ symbol for referencing files and directories

### Checkpoints
- Yes
  - Rollback support to undo agent changes

### Git Support
- Yes
  - Seamless GitHub integration for commits, pull requests, and issues
  - Complete GitLab support including CI/CD workflows
  - Generates small, reviewable diffs for all agent modifications

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- Yes
  - Can reference saved prompts using / symbol
  - Cmd + I for inline completions
  - Cmd + L to toggle agent side panel

### Skills
- No

### Custom Modes
- Yes
  - Fast mode for quick tasks
  - Planning mode for complex tasks with approvable plans

### Subagents
- Yes
  - Multi-agent parallel execution with specialized agents for browser automation, terminal operations, and file handling
