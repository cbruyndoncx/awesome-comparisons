# Pi
https://github.com/mariozechner/pi

Pi is a minimal terminal-based coding agent harness designed as an alternative to traditional IDEs, enabling developers to interact with AI language models through a command-line interface. Built around the principle of "adapt pi to your workflows, not the other way around," Pi emphasizes constraints and minimalism to avoid unnecessary complexity while providing a complete orchestration system combining an agent loop, terminal UI framework, and execution tools.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal

### Version
-

### Repo
https://github.com/mariozechner/pi

### Rating
-

### Short Description
Minimal terminal coding agent harness with multi-provider support and extensible architecture

### Description
Pi operates as a terminal-based AI coding agent framework consisting of three main components: pi-ai (unified LLM API supporting multiple providers), agent loop (handles orchestration by processing user messages, executing tool calls, feeding results back to the LLM, and repeating until completion), and pi-tui (terminal user interface that renders conversations and agent interactions).

The system employs differential rendering where the interface only redraws changed components rather than re-rendering the entire screen, improving performance and responsiveness. This leverages the native terminal's built-in functionality like natural scrolling and search within the scrollback buffer, creating a linear conversation interface that mirrors chat-based interactions. Pi supports four primary tools: file operations (read/write), bash command execution, text replacements, and content search (grep/find/ls).

### Languages
- Any
  - Can execute tools in any language via bash tool (bash, NodeJS, Python, Go, etc.)

### Notes
Distributed via npm as command-line package. Supports Gateway architecture for multi-platform integration (WhatsApp, Telegram, Discord, iMessage). Includes pi-interactive-shell extension for autonomous CLI control within observable overlay (vim, htop, psql, ssh, docker logs). Supports streaming output, session continuation and branching.

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
-

### Prompts
-

### Tools
- Yes
  - File operations (read/write)
  - Bash command execution
  - Text replacements
  - Content search (grep/find/ls)

### Resources
-

### ACP
- No

## Deployment

### BYOK
- Yes
  - Supports Anthropic, OpenAI, Google, xAI, Groq, Cerebras, OpenRouter, and any OpenAI-compatible endpoint
  - Azure and Bedrock support

### Local Offline
- Yes
  - Supports any OpenAI-compatible endpoint including local models

## Developer Experience

### Context Management
- Yes
  - Mid-session model switching
  - Cost and token tracking
  - Message queuing during agent execution

### Direct File References
- Yes
  - Editor with fuzzy file search, path completion, and drag-and-drop functionality

### Checkpoints
- Yes
  - Session continuation and branching

### Git Support
-

## Extensible

### Plugins
- Yes
  - Aggressively extensible via TypeScript extensions
  - Third-party packages installable from npm or git

### Hooks
-

### SlashCommands
-

### Skills
- Yes
  - Skills support
  - Prompt templates

### Custom Modes
- Yes
  - Interactive mode (full TUI)
  - Print/JSON mode for scripts
  - RPC mode for process integration
  - SDK mode for embedding in custom applications
  - Tool restriction options (e.g., read-only mode for planning)

### Subagents
- Yes
  - Can recursively spawn itself within tmux sessions for full observability
