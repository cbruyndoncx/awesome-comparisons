# Blinky - https://github.com/seahyinghang8/blinky

Blinky is a free, open-source VS Code extension that uses LLMs to automatically identify and fix backend code errors. It triangulates bug root causes by combining Language Server Protocol (LSP) analysis, print statement debugging, and LLM reasoning — then applies fixes via match-replace editing within the editor.

**Dataset ID:** code-agent

## General Info

### Classification
- Code/Autonomous agent

### Version
- Open source (2024-2025)

### Repo
- https://github.com/seahyinghang8/blinky

### Rating
- [3] Solid triangulation approach (LSP + print debugging + LLM) for backend debugging; free and open source
- [2] Backend-only scope; struggles with large-scale edits; requires manual reproduction step specification

### Short Description

- Open-source VS Code debugging agent combining LSP, print statement debugging, and LLM reasoning to autonomously identify and fix backend code errors.

### Description

Blinky is an open-source VS Code extension inspired by SWE-agent that focuses specifically on autonomous debugging. Rather than general code generation, it targets bug identification and repair: developers describe the issue and reproduction steps, and Blinky triangulates the root cause using three signals — Language Server Protocol analysis for type and reference information, strategic print statement injection to trace runtime behaviour, and LLM reasoning to synthesize findings into a fix. Changes are applied as match-replace edits directly in VS Code.

The tool uses a chat-based interface within VS Code and currently targets backend systems. It is free and open source, requiring only an OpenAI API key. Autonomy level is approximately 72%, meaning it resolves most issues but some complex bugs still require developer guidance.

### Languages
- Any
  - Backend-focused; best coverage for Python, TypeScript, JavaScript, Go.

### Notes
- Install from VS Code marketplace; requires OpenAI API key.
- Inspired by SWE-agent (Stanford).
- Backend systems only; frontend debugging not covered.
- Autonomy level: ~72%.
- Free and open source (no per-seat cost beyond LLM API usage).

### Last Update
- 2026-05-13

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
  - Fully open source; no trial restrictions.

## MCP-Client

### MCP-Client
- Yes

### Prompts
- No

### Tools
- Yes
  - Uses LSP tools and print-statement injection as debug instruments.

### Resources
- No

### ACP
- No

## Deployment

### BYOK
- Yes
  - Requires OpenAI API key (BYOK).

### Local Offline
- No
  - Requires OpenAI API connectivity.

## Developer Experience

### Context Management
- Yes
  - Chat-based session maintains bug context and debugging history.

### Direct File References
- Yes

### Checkpoints
- No

### Git Support
- No

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
- No

### Subagents
- No
