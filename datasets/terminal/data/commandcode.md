# CommandCode - v0.25.14 (May 2026)
  - 218+ releases shipped; active weekly cadence https://commandcode.ai
CommandCode is a terminal-based AI coding agent that continuously learns and adapts to individual developer coding styles and preferences. Using a proprietary meta neuro-symbolic AI model called "taste-1," CommandCode addresses the frustration of AI-generated code that is technically correct but doesn't match personal coding patterns by learning through every interaction and progressively aligning with developer conventions for variable naming, code structure, testing preferences, and architectural patterns.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal

### Version
-

### Repo
-

### Rating
-

### Short Description
Terminal-based AI coding agent with adaptive learning that matches your coding style

### Description
CommandCode is a CLI tool that operates as an autonomous coding agent, distinguishing itself through continuous learning capabilities. Unlike traditional AI assistants that reset after each interaction, CommandCode uses its proprietary "taste-1" meta neuro-symbolic AI model combining large language models with continuous reinforcement learning to acquire and encode personal coding patterns.

The agent learns from explicit feedback (accepted/rejected suggestions), implicit feedback (manual edits), and context from project decisions. It stores learned preferences in project memory files (.commandcode/taste/taste.md), allowing progressive improvement across sessions. The system treats every developer action as a learning signal, capturing years of micro-decisions about variable naming conventions, when to extract helper functions, preferred design patterns, and testing structures.

### Languages
- TypeScript
- Python
- JavaScript
- HTML

### Notes
Installed via npm (npm i -g command-code) or shorthand cmdc alias (v0.25.13, Windows-compatible). Claimed performance improvements include 10x faster coding, 2x faster code reviews, and 5x fewer bugs. Learned taste can be shared across teams using npx taste push/pull commands.
- taste-1: neuro-symbolic AI model pairing LLMs with learned developer preferences; every accept/reject/edit is a training signal; auto-generates reusable skills from observed patterns.
- v0.25.x additions (May 2026): cmdc alias for Windows compatibility; ZDR-only provider flag (CMD_ZDR=1); plan-based model access control in model selector.

### Last Update
2026-05-14

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
-

## MCP-Client

### MCP-Client
-

### Prompts
-

### Tools
-

### Resources
-

### ACP
- No

## Deployment

### BYOK
- Yes
  - Requires API key from CommandCode.ai

### Local Offline
- No

## Developer Experience

### Context Management
- Yes
  - Persistent context management through /memory command system
  - Maintains project-specific information across sessions
  - Contextual memory systems that remember decisions and preferences over time

### Direct File References
- Yes

### Checkpoints
- No

### Git Support
- Yes
  - Git-aware operations for project understanding

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- Yes
  - /memory for persistent context
  - /resume to continue past conversations

### Skills
- No

### Custom Modes
- No

### Subagents
- No
