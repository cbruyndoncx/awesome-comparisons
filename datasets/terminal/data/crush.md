# Crush - https://github.com/charmbracelet/crush
Crush is a glamorous terminal-based AI coding agent developed by Charmbracelet that integrates multiple large language models directly into terminal workflows. Built with Bubble Tea terminal UI framework, Crush combines AI capabilities with real-time code understanding through Language Server Protocol integration and external system connectivity via Model Context Protocol, providing a visually appealing and intelligent collaborative coding workspace in the command line.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal

### Version
v0.33.2

### Repo
https://github.com/charmbracelet/crush

### Rating
19,107 GitHub stars (as of January 2026)

### Short Description
Terminal-based AI coding agent with glamorous TUI and multi-model LLM support

### Description
Crush operates as a CLI-based agentic coding tool that maintains multiple work sessions per project while providing context-aware assistance for development tasks. The tool integrates Language Server Protocols for semantic code understanding, file and directory access, and Model Context Protocol servers for external integrations.

Crush supports multi-model flexibility with providers including OpenAI, Anthropic Claude, Google Gemini, Groq, OpenRouter, and Vercel AI Gateway, with custom provider configurations for both OpenAI-compatible and Anthropic-compatible APIs. Users can switch between different LLMs mid-session without losing conversational context. The platform provides a comprehensive diff and review system allowing developers to inspect proposed changes within the terminal UI before accepting or rejecting modifications.

### Languages
- Any
  - LSP integration supports any language with LSP implementation available

### Notes
Built upon Charmbracelet's broader ecosystem of Go-based libraries and tools. The Charm ecosystem reportedly powers 25,000+ applications. Supports installation via Homebrew, npm, Arch Linux, Go, FreeBSD, and Nix. Recent updates include expandable thinking, improved UI structure, and interface enhancements.

### Last Update
2026-01-31

## Licensing

### Opensource
- Yes

### License
- FSL
  - FSL-1.1-MIT (business-source license with irrevocable eventual fallback to MIT)

### Free Trial
- Yes
  - Fully open source with no restrictions

## MCP-Client

### MCP-Client
- Yes
  - Supports HTTP, stdio, and SSE (Server-Sent Events) transport types
  - Can integrate with external services through standardized MCP server connections

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
- Yes
  - Supports custom provider configurations for OpenAI-compatible and Anthropic-compatible APIs

### Local Offline
- Yes
  - Can work with local or self-hosted LLM providers

## Developer Experience

### Context Management
- Yes
  - Session-based context system with multiple concurrent work sessions per project
  - Each session preserves conversation history and file context across runs
  - Sessions support inheritance (child sessions inherit from parent sessions)
  - crush.md file serves as project context anchor with metadata

### Direct File References
- Yes
  - File and directory access within projects

### Checkpoints
- Yes
  - Full diff and undo support

### Git Support
- Yes
  - Git integration capabilities when present in project

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- No

### Skills
- No

### Custom Modes
- Yes
  - Session templates for reusable workflow patterns
  - Different session types: Project Sessions, Exploration Sessions, Learning Sessions, Debugging Sessions

### Subagents
- No
