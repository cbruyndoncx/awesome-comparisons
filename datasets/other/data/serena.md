# Serena - https://github.com/oraios/serena

Open-source coding agent toolkit providing semantic code understanding and intelligent editing capabilities through Language Server Protocol (LSP) integration. Emerged in 2025 as a powerful MCP server for AI coding assistants.

## General Info

### Classification
- Code/Other

### Version
- 2025 (MCP server released April 5, 2025)
  - No formal versioned releases published in search results; distributed via GitHub and pip.

### Repo
- https://github.com/oraios/serena

### Rating
- Highly Regarded
  - Recognized by GitHub Copilot and VS Code teams as one of nine sponsored open-source projects; community describes it as a "game changer" with "enormous productivity boost."

### Short Description
- Open-source coding agent toolkit with semantic code analysis via LSP integration, distributed as an MCP server for Claude Code, Cursor, and other AI assistants.

### Description
Serena is an innovative open-source coding agent toolkit that emerged in 2025, providing semantic code understanding and intelligent editing capabilities through language server integration. Built on the widely-implemented Language Server Protocol (LSP), Serena enables AI models to work with symbol-level operations rather than reading entire files or performing basic string manipulations. It supports language servers for Python, Java, TypeScript, and other languages, enabling sophisticated symbol-level understanding and code manipulation. Designed as a free alternative to expensive coding assistants, Serena is distributed primarily as an MCP (Model Context Protocol) server that integrates with Claude Code, Cursor, Cline, VSCode, and other AI platforms.

### Languages
- Any
  - Supports 30+ languages via Solid-LSP: Python, JavaScript, TypeScript, Java, C#, C/C++, Go, Rust, Kotlin, Ruby, PHP, Swift, Scala, Haskell, Elixir, Erlang, Clojure, Dart, Elm, Groovy (partial), Julia, MATLAB, R, Perl, Lua, Bash, PowerShell, Nix, YAML, TOML, Markdown, Zig.

### Notes
- LSP-based semantic analysis: Uses Language Server Protocol for symbol-level code understanding and manipulation.
- MCP server implementation: Distributed as an MCP server that integrates with multiple AI coding platforms.
- Symbol-level operations: Enables AI models to work with code at the symbol level rather than text/string level.
- Multi-language support: 30+ languages via Solid-LSP library wrapping language server implementations.
- Shell command execution: Can run tests, linters, build scripts with explicit permission control.
- Free and open-source: Designed as accessible alternative to proprietary coding assistants.
- Wide integration: Works with Claude Code, Claude Desktop, Cursor, Cline, VSCode, IntelliJ, OpenHands CLI, and ChatGPT (via OpenAPI/mcpo).
- Framework-agnostic: Not tied to any specific LLM, framework, or interface.
- Developer: Created by Oraios AI with strong community adoption.
- Emerged in 2025 as a key infrastructure tool for AI coding.
- **2025-2026 updates:**
  - MCP server officially released April 5, 2025.
  - Sponsored by GitHub Copilot and VS Code teams as one of nine recognized open-source projects for making "coding agents smarter and more efficient."
  - Expanded to 30+ language support via Solid-LSP library.
  - Added codebase indexing and ".serena/memories" directory for semantic project understanding.
  - Token efficiency improvements: agents read only necessary code sections, reducing token usage and speeding responses.
  - Extensible tool system: developers subclass `serena.agent.Tool` and implement `apply` method.
  - OpenAPI tool calling support added for non-MCP clients like ChatGPT.

### Last Update
- 2026-01-30

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes

## MCP-Client

### MCP-Client
- No
  - Serena is an MCP server, not a client

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
  - As an open-source toolkit, users can deploy and configure it with their own infrastructure

### Local Offline
- Yes
  - Can be deployed and run locally

## Developer Experience

### Context Management
- Yes

### Direct File References
- Yes

### Checkpoints
- No

### Git Support
- Yes

## Extensible

### Plugins
- Yes
  - Extensible through LSP servers and custom integrations

### Hooks
- Yes

### SlashCommands
- No

### Custom Modes
- No

### Subagents
- No

