# Auggie CLI - https://www.augmentcode.com/changelog/auggie-cli

Auggie is Augment's agentic coding CLI that runs in your terminal. It understands your codebase and helps you ship faster by analyzing code, making safe edits, and automating routine tasks — all via natural language.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal

### Version
v0.5.6 (2025)

### Repo
- https://github.com/augmentcode/auggie

### Rating
- [3] Strong context engine with automatic codebase mapping and CI/CD integration
- [3] Limited extensibility; no MCP or BYOK support documented

### Short Description
An AI agent that brings Augment Code's power to the terminal, featuring advanced context awareness and flexible integration into developer workflows.

### Description
Auggie CLI is an agentic coding assistant designed to integrate into every part of your development workflow. Using Augment's leading context engine, it maps project structure, dependencies, and patterns without manual context selection. The tool supports both interactive and non-interactive use, making it flexible for one-off commands, piped input, or integration into build systems.

Auggie can handle up to 10,000 commit histories, ensuring accurate code suggestions and modifications even in large codebases. The tool is positioned as a competitor to Claude Code, Gemini CLI, and other terminal-based AI coding agents.

### Languages
- Any

### Notes
- Installation: Available via npm for Node.js 22 or later (`npm install -g @augmentcode/auggie`)
- Context Engine: Automatically maps project structure and dependencies without manual context selection
- Flexible Usage: Supports interactive and non-interactive modes, piped input, and build system integration
- Codebase Scale: Can handle up to 10,000 commit histories
- Competition: Positioned as an alternative to Claude Code, Gemini CLI, and OpenAI's Codex CLI
- Released: 2025

### Last Update
2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - Natural language prompts for code generation, analysis, and modifications

### Tools
- Yes
  - Terminal-based tools for code analysis, editing, and automation

### Resources
- Yes
  - Official documentation: https://docs.augmentcode.com/cli/overview
  - GitHub repository: https://github.com/augmentcode/auggie
  - Product page: https://www.augmentcode.com/product/CLI

### ACP
- No

## Deployment

### BYOK
- No

### Local Offline
- No
  - Requires connection to Augment's cloud services for AI capabilities

## Developer Experience

### Context Management
- Yes
  - Advanced context engine that automatically maps project structure, dependencies, and patterns
  - Handles up to 10,000 commit histories

### Direct File References
- Yes
  - Can reference and edit specific files based on natural language requests

### Checkpoints
- No

### Git Support
- Yes
  - Integrates with git repositories and understands commit history

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- Yes
  - Custom commands via `auggie command <name>` and slash commands within the TUI. `/rules` for workspace rules viewing.

### Skills
- No

### Custom Modes
- Yes
  - Interactive mode (full-screen TUI) and automation/print mode (`--print` flag) for CI/CD pipelines.

### Subagents
- No

## Ungrouped Criteria

### Terminal
- Yes

