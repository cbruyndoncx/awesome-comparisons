# Letta - https://github.com/cpacker/MemGPT
Letta (formerly MemGPT) is an open-source, model-agnostic platform for building stateful AI agents with persistent memory capabilities. As a memory-first coding agent designed for terminal environments, Letta enables developers to work with agents that learn and improve across sessions rather than in isolated interactions, using a MemGPT-based architecture with self-editing memory split between in-context and out-of-context storage organized into editable memory blocks.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal

### Version
-

### Repo
https://github.com/cpacker/MemGPT

### Rating
-

### Short Description
Memory-first terminal coding agent with persistent learning and multi-agent systems

### Description
Letta Code functions as a terminal-based IDE agent that ranks as the #1 model-agnostic open-source coding harness on TerminalBench, achieving 42.5% overall score and ranking #4 overall and #2 among agents using Claude 4 Sonnet. The platform prioritizes long-lived agents that persist across sessions and improve with use, carrying memories across interactions.

The system implements a memory hierarchy distinguishing between in-context and out-of-context memory using memory blocks—persistent, editable components that agents can modify using tools. When context exceeds approximately 40,000 tokens, Letta performs recursive summarization of previous messages. The platform supports dynamic skill learning (36.8% relative improvement on Terminal-Bench 2.0), long-running agents for complex operations, multi-agent systems with shared memory, and tool integration for web search and code execution.

### Languages
- Python
- JavaScript

### Notes
Terminal-use agent implemented in under 200 lines of code using Letta's stateful agents SDK. Supports background mode streaming with resumable streams and crash recovery for long-running tasks (10+ minutes). Installed via pip (pymemgpt). Can be deployed as Letta Cloud (managed service) or self-hosted servers. Performance using Claude 4 Sonnet matches Claude Code using Claude Opus.

### Last Update
2026-01-31

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- Yes
  - Fully open source with free hosted endpoint via memgpt quickstart --backend memgpt

## MCP-Client

### MCP-Client
-

### Prompts
-

### Tools
- Yes
  - Custom tool definitions and execution (e.g., Google Search, web_search, run_code)

### Resources
- Yes
  - Connections to external data sources (e.g., PDF files) for RAG

### ACP
- No

## Deployment

### BYOK
- Yes
  - Supports OpenAI, free hosted endpoint, and local LLMs configurable through memgpt configure

### Local Offline
- Yes
  - Local LLM support for self-hosted models

## Developer Experience

### Context Management
- Yes
  - Memory blocks with read-only and read-write sections for planning
  - Recursive summarization (compaction) when context exceeds ~40,000 tokens
  - Infinite message history with searchable past conversations
  - /attach command to attach data sources to agent

### Direct File References
- Yes
  - Can load data from directories and databases

### Checkpoints
- Yes
  - /save command to save checkpoint of current agent/conversation state
  - Recovery-Bench functionality for error recovery from corrupted states

### Git Support
-

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- Yes
  - /exit to exit CLI
  - /attach to attach loaded data sources
  - /save to save checkpoints
  - /dump to view message log and context

### Skills
- Yes
  - Dynamic skill learning from library
  - Agents can discover, load, and utilize relevant skills to complete tasks
  - Pre-built skills for advanced memory and continual learning

### Custom Modes
- No

### Subagents
- Yes
  - Multi-agent systems with shared memory
  - Multiple conversations running in parallel within a single agent
  - All conversations share same memory blocks and searchable message history
