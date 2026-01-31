# Neovate Code
https://github.com/NeovateAI

Neovate Code is an open-source AI-powered coding agent developed by Ant Group that provides a terminal CLI interface for code generation, debugging, testing, and refactoring tasks. As a model-agnostic platform supporting multiple AI providers, Neovate Code follows the latest AI coding best practices including Spec Driven Development and Parallel Agent approaches, offering both interactive and headless modes with robust session management and an extensible plugin system.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal

### Version
-

### Repo
https://github.com/NeovateAI

### Rating
-

### Short Description
Open-source terminal coding agent with multi-model support and extensible plugin architecture

### Description
Neovate Code operates as an intelligent coding assistant designed to understand codebases, follow coding patterns, and help developers implement features, fix bugs, and refactor code with context awareness. The platform provides a chat-driven development interface through natural conversation for coding tasks, with AGENTS.md rule files to define custom rules and project-specific behaviors.

Session persistence allows developers to continue work across sessions with history stored per working directory. The tool supports interactive mode (default conversational interface), headless mode for CI/CD integration and automation, and plan mode to review implementation plans before execution. Built-in plugin system enables substantial customization with companies like Ant Group and Kuaishou using it to build proprietary code agents.

### Languages
- Python
- JavaScript
- TypeScript
  - Supports additional languages through model capabilities

### Notes
Installed via npm (npm install -g @neovate/code). Supports multimodal input with drag-and-drop for images, screenshots, and diagrams. File references via @ symbol with fuzzy search. Session forking with esc-esc for branching workflows. Desktop client variant in development. Roadmap includes Smart Debug, Smart Review, and Smart Inspection tools.

### Last Update
2026-01-31

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
  - Fully open source

## MCP-Client

### MCP-Client
- Yes
  - Model Context Protocol support for enhanced integrations

### Prompts
- Yes

### Tools
- Yes
  - Custom tool integrations via plugin system

### Resources
- Yes
  - @ symbol for file and directory references with fuzzy search

### ACP
- No

## Deployment

### BYOK
- Yes
  - Supports OpenAI, Anthropic, Google, and other providers
  - Environment variable-based API key management
  - Interactive /login command for authentication

### Local Offline
- No

## Developer Experience

### Context Management
- Yes
  - Session persistence per working directory
  - History stored as .jsonl files in ~/.neovate/projects/<project_name>/
  - @ symbol for adding files and directories to context

### Direct File References
- Yes
  - @ symbol with fuzzy search matching for files and directories

### Checkpoints
- Yes
  - Session forking with esc-esc
  - /clear command preserves original session file

### Git Support
- Yes
  - Git workflow automation
  - Intelligent commit messages and branch management

## Extensible

### Plugins
- Yes
  - Built-in plugin system with multiple hooks
  - Custom providers, skills configuration, integration points
  - Companies build proprietary versions (Ant Group, Kuaishou)

### Hooks
- Yes
  - Multiple extension points throughout codebase

### SlashCommands
- Yes
  - /login for provider selection
  - /model for model selection
  - /clear for new session
  - Custom slash commands via plugins

### Skills
- Yes
  - Custom skill paths for project-specific capabilities

### Custom Modes
- Yes
  - Interactive mode (default conversational interface)
  - Headless mode for automation and CI/CD
  - Plan mode for reviewing implementation before execution

### Subagents
- Yes
  - Parallel Agent approach support
  - Multiple agents can work concurrently on tasks
