# OpenAI Codex Agent - https://openai.com/index/introducing-codex/
An autonomous cloud-based coding agent from OpenAI that plans, writes, tests, debugs, and deploys software in secure sandboxed environments.

## General Info

### Classification

- Code/Autonomous agent

### Version
GPT-5.2-Codex (2025; most advanced coding model with long-horizon reasoning and context compaction)

### Repo
-

### Rating
- [5] Strong autonomous coding capabilities with sandboxed execution, iterative test-driven development, and multi-interface access (web, CLI, IDE).
- [3] Cloud-dependent with session time constraints; best suited for well-scoped tasks rather than massive multi-file refactors.

### Short Description
An autonomous coding agent from OpenAI that operates in secure cloud sandboxes to plan, write, test, debug, and deploy software, powered by GPT-5.2-Codex with long-horizon reasoning, dynamic thinking allocation, and integration across ChatGPT, CLI, and IDE environments.

### Description
OpenAI Codex has evolved from a code-completion co-pilot into a fully autonomous coding agent capable of handling complex software engineering workflows independently. It operates within secure cloud sandboxes where each task runs in isolated virtual environments with whitelisted dependencies and no outbound internet access except for version control. The agent handles autonomous feature development from natural language specs, intelligent debugging, iterative test-driven development (running tests until they pass), code review and refactoring, documentation generation, and infrastructure-as-code. GPT-5.2-Codex introduces long-horizon reasoning through context compaction for extended sessions, large-scale code transformations, and enhanced cybersecurity capabilities. The system reads AGENTS.md files in repositories to understand project-specific testing setups, coding standards, and architectural patterns. Container caching has reduced median task completion time by 90%. Available through ChatGPT Desktop, CLI, IDE extensions, and GitHub integration.

### Languages
- Multi-language support
  - Handles a wide range of programming languages and frameworks
  - Enhanced Windows environment support in GPT-5.2-Codex
  - Strong support for Python, JavaScript/TypeScript, Java, .NET, and common web stacks

### Notes
- Distinguishing features: sandboxed autonomous execution, dynamic thinking allocation (faster on simple tasks, longer on complex ones), context compaction for extended sessions, AGENTS.md project awareness, container caching for 90% faster task completion.
- Security model: isolated virtual environments, whitelisted dependencies, no outbound internet (except VCS), configurable internet access for pip install, permission-based approval for dangerous actions.
- Integration ecosystem: GitHub PRs, CLI and IDE extensions, ChatGPT Desktop, issue trackers, CI systems, and MCP servers.
- Codex Autofix feature for CI workflow automation.
- Available through Responses API with reasoning controls, structured outputs, and Conversations API for durable threads.
- Enterprise and research tiers with built-in usage tracking.
- GPT-5.2-Codex adds stronger vision performance for interpreting screenshots, technical diagrams, and UI surfaces.
- Human-in-the-loop workflows remain central; sandboxing and approval modes ensure developer control.

### Last Update
2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Available through ChatGPT free tier with limited usage; full capabilities require paid plans (Plus, Pro, Enterprise)

## MCP-Client

### MCP-Client
- Yes
  - CLI and IDE extensions can connect to MCP servers for external context and trusted tool surfaces

### Prompts
- Yes
  - Accepts natural-language task specifications for autonomous execution
  - Reads AGENTS.md for project-specific context, coding standards, and testing setups
  - Supports iterative prompting and mid-task feedback

### Tools
- Yes
  - Integrated terminal, code editor, browser, and test runner within sandboxed environments
  - GitHub integration for PRs and repository context
  - CI system and issue tracker integration
  - MCP server connections for external tools

### Resources
- Yes
  - AGENTS.md project configuration, OpenAI documentation, API reference, and in-product task tracking

### ACP
- Yes
  - Codex CLI supports ACP (Agent Client Protocol); exposes a standardized JSON-RPC over stdio interface for editor-agent communication per the open standard by Zed Industries

## Deployment

### BYOK
- No
  - Uses OpenAI's own model infrastructure; no documented support for third-party model providers

### Local Offline
- No
  - Runs as a cloud-hosted sandboxed agent; CLI available but requires OpenAI API connectivity

## Developer Experience

### Context Management
- Yes
  - Project-aware intelligence via AGENTS.md files for testing setups, coding standards, and architecture patterns
  - Context compaction for long-horizon reasoning in extended sessions
  - Dynamic thinking allocation that adapts computation to task complexity

### Direct File References
- Yes
  - Operates on specific repository files within sandboxed environments
  - GitHub integration for repository-level file access

### Checkpoints
- Yes
  - Git-based checkpointing through branches, commits, and PR creation
  - Sandboxed execution with rollback capabilities
  - 60-minute session timeout; uncommitted work is lost

### Git Support
- Yes
  - GitHub integration for PR proposals and repository context
  - Branch creation, commits, and automated PR workflows
  - Codex Autofix for CI automation

## Extensible

### Extensible
- Yes
  - MCP server integration, GitHub workflows, CI/CD hooks, and multi-interface access

### Plugins
- Yes
  - MCP server connections for incorporating external context and tool surfaces
  - GitHub, issue tracker, and CI system integrations

### Hooks
- No
  - No documented lifecycle hook system for custom event handling

### SlashCommands
- No
  - No documented slash-command interface; interaction is through natural-language prompts and GUI

### Skills
- No
  - No documented reusable skills system

### Custom Modes
- No
  - No documented custom mode system; task behavior is determined by prompt and AGENTS.md configuration

### Subagents
- No
  - No documented subagent or multi-agent architecture; operates as a single autonomous agent per task
