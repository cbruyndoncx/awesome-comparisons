# OpenCode - https://opencode.ai
A terminal-native, open-source AI coding assistant that brings LLM-powered code understanding, generation and editing directly into the developer's terminal. OpenCode focuses on privacy (local-first model support), extensibility (custom actions/skills), and deep integration with developer workflows (git, LSP, shell).

## Version
v (2025-10-19)

## Classification 
- Code/Editor

## Rating
- [5] Terminal-native, privacy-first design
- [5] Broad LLM provider support (Models.dev)
- [4] Rich toolset for file, shell, and repo operations

## Repository
- https://github.com/sst/opencode

## Languages
- Any

## Extensible
- Yes

## Description
OpenCode is an open-source AI assistant designed for use from the terminal. It provides a conversational interface and a suite of programmatic tools (file operations, grep/glob, patch/apply, diagnostics, shell execution, fetch, Sourcegraph search, etc.) that allow the assistant to read, explain, modify and create code in the context of a repository. OpenCode supports both cloud and local LLMs (through Models.dev and adapters such as Ollama), can initialize project context, produce implementation plans, and then switch to a build mode to apply edits. Its architecture supports extensible actions/skills and hierarchical agents for complex tasks.

## BYOK
- Yes

## LocalOffline
- Yes
  - Supports running with local model backends (e.g. Ollama) and Models.dev adapters.

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- Yes

## Opensource
- Yes

## License
- MIT

## MCP-Client
- Yes

## Notes
- Strong privacy posture: can run entirely with local models so source code does not need to be uploaded to third-party APIs.
- Rich tool set that mirrors common CLI developer actions (ls, grep, view, write, edit, patch, bash) so it can operate robustly on repositories.
- Useful workflow modes: Plan mode (no edits, design/strategy) and Build mode (apply changes). Includes undo/redo for edits.
- Integrates with LSP/diagnostics for precise error detection and fixes.
- Extensible via custom actions/skills and supports spawning sub-agents for task decomposition.
- Good fit for polyglot environments and CI/CD automation where a terminal-first interface and scriptability are advantages.
- Main website: https://opencode.ai — repo and docs live at https://github.com/sst/opencode
