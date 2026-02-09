# Grok CLI - https://github.com/superagent-ai/grok-cli
An open-source AI agent that brings the power of Grok directly into your terminal with conversational AI, smart file operations, bash integration, and MCP tools support.

## General Info

### Classification
- Code/Terminal

### Version
- Latest (2026-02)
  - Created: 2025-07-14
  - Last updated: 2026-02-08
  - 2,322+ GitHub stars

### Repo
- https://github.com/superagent-ai/grok-cli

### Rating
- [4] Strong conversational AI with intelligent tool selection and automated file operations
- [4] Excellent extensibility via MCP (Model Context Protocol) servers
- [4] High-speed code editing with Morph Fast Apply at 4,500+ tokens/sec with 98% accuracy
- [3] Requires X.AI API key (BYOK); not fully self-contained

### Short Description
- Open-source terminal AI assistant powered by Grok models that provides conversational AI, smart file operations, bash integration, and Model Context Protocol (MCP) tools for extending capabilities directly in your shell environment

### Description
Grok CLI is an MIT-licensed, open-source terminal application developed by the team at Vibe that integrates X.AI's Grok models directly into command-line workflows. Built over a single weekend, the tool has gained significant traction with over 2,300 GitHub stars and recognition from notable figures including Boris Cherny (Creator of Claude Code, MTS at Anthropic).

The tool provides a conversational natural language interface powered by Grok models (primarily Grok-3) with automatic tool selection for viewing, creating, and editing files, executing shell commands, and performing complex multi-step tasks. Grok CLI can handle up to 400 tool execution rounds by default to manage sophisticated workflows, and it supports OpenAI-compatible APIs allowing integration with multiple model providers (X.AI, OpenAI, OpenRouter, Groq).

Built with TypeScript and the Ink framework (React-based terminal UI), Grok CLI runs on Bun 1.0+ (with Node.js 18+ fallback) and offers both interactive and headless modes. The interactive mode provides a real-time conversational interface, while headless mode enables single-prompt execution suitable for scripting and CI/CD pipelines. The tool integrates Morph's Fast Apply model for high-speed code editing at 4,500+ tokens/sec with 98% accuracy, providing rapid code transformations.

### Languages
- Any
  - Language-agnostic; supports any programming language through file operations and bash commands

### Notes
- Models: Supports grok-code-fast-1 (default), grok-4-latest, grok-3-latest, grok-3-fast, grok-3-mini-fast, and any OpenAI-compatible models via custom endpoints
- Installation: Available via Bun (`bun add -g @vibe-kit/grok-cli`) or npm (`npm install -g @vibe-kit/grok-cli`)
- Tech stack: TypeScript, Bun runtime, Ink UI framework (React-based terminal UI), OpenAI-compatible REST API
- Context window: Supports large context with Grok's 1M+ token context window for project-wide analysis and modifications
- Platform support: Cross-platform (macOS, Linux, Windows) via Bun/Node.js runtime
- Use cases: Interactive terminal AI assistance, automated file operations, git workflow automation (commit/push), code editing and refactoring, CI/CD integration, custom tool workflows via MCP
- MCP integration: Supports Model Context Protocol servers including Linear integration, GitHub integration, custom stdio and HTTP-based servers, environment variable support for authentication
- Custom instructions: Project-level (`.grok/GROK.md`) and global (`~/.grok/GROK.md`) instruction files with priority-based loading system
- Configuration: Two-tier system with user-level (`~/.grok/user-settings.json`) for global settings and project-level (`.grok/settings.json`) for project-specific config
- Morph Fast Apply: Optional high-speed code editing at 4,500+ tokens/sec with 98% accuracy using abbreviated edit format
- Tool rounds: Configurable `--max-tool-rounds` parameter (default 400) controls execution complexity and prevents infinite loops
- API key management: Supports environment variables, `.env` files, command flags, and user settings JSON for flexible credential management
- Community: Active Discord server for user support and collaboration
- Further reading: GitHub repository at https://github.com/superagent-ai/grok-cli and official site at https://www.superagent.sh/open-source/grok-cli

### Last Update
- 2026-02-09

## Licensing

### Opensource
- Yes
  - MIT-licensed open-source project available on GitHub

### License
- MIT

### Free Trial
- Yes
  - Fully open-source and free to use; requires X.AI API key (bring your own key)

## MCP-Client

### MCP-Client
- Yes
  - Full Model Context Protocol (MCP) support for connecting to MCP servers including Linear, GitHub, custom stdio, HTTP, and SSE transports

### Prompts
- Yes
  - Natural language conversational interface with support for custom instructions via `.grok/GROK.md` files at project and global levels

### Tools
- Yes
  - Intelligent automatic tool selection for file operations (view, create, edit), bash command execution, git operations, and extensible MCP-based tools

### Resources
- Yes
  - GitHub repository: https://github.com/superagent-ai/grok-cli
  - Official site: https://www.superagent.sh/open-source/grok-cli
  - Discord community for support
  - Command reference and documentation via DeepWiki

### ACP
- No
  - No documented Agent Client Protocol (ACP) support; uses MCP (Model Context Protocol) instead for extensibility

## Deployment

### BYOK
- Yes
  - Requires user-provided API keys from X.AI (Grok), OpenAI, OpenRouter, Groq, or other OpenAI-compatible providers
  - Multiple configuration methods: environment variables, `.env` files, command-line flags, user settings JSON

### Local Offline
- No
  - Requires internet connection and remote API endpoints for Grok or other LLM models
  - Code is open-source and can be self-hosted, but model inference requires cloud-based API access

## Developer Experience

### Context Management
- Yes
  - Large context support with Grok's 1M+ token context window
  - Custom instruction files: project-level (`.grok/GROK.md`) and global (`~/.grok/GROK.md`) with priority-based loading
  - Conversational context preserved throughout interactive sessions

### Direct File References
- Yes
  - Smart file operations with AI automatically viewing, creating, and editing files
  - Abbreviated edit format support with Morph Fast Apply for rapid code changes
  - Direct file access within working directory and project context

### Checkpoints
- No
  - No built-in checkpoint or undo system documented
  - Users can leverage git for version control and manual checkpoints

### Git Support
- Yes
  - Git-aware: recognizes git repositories and can check git status
  - Automated git workflows: commit-and-push command with AI-generated commit messages
  - Branch management and common git operations through bash integration

## Extensible

### Plugins
- No
  - No plugin bundling system; extensibility provided through MCP servers rather than traditional plugins

### Hooks
- No
  - No documented lifecycle hook system for agent customization

### SlashCommands
- No
  - Command-line interface uses flags and options rather than slash commands
  - CLI options: `-V` (version), `-d` (directory), `-k` (API key), `-m` (model), `-p` (headless prompt), `--max-tool-rounds`, `-h` (help)

### Skills
- No
  - No reusable skill definition system; functionality extended via MCP tools instead

### Custom Modes
- Yes
  - Interactive mode: Real-time conversational interface (`grok` or `grok -d /path/to/project`)
  - Headless mode: Single-prompt execution for scripting and CI/CD (`grok --prompt "task"` or `grok -p "task"`)
  - Morph Fast Apply mode: High-speed code editing at 4,500+ tokens/sec when available

### Subagents
- No
  - Single-agent architecture with intelligent tool selection; no documented multi-agent or subagent system
