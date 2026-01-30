# Claude Code - https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview
An agentic command-line coding tool from Anthropic that operates directly in the terminal, understanding codebases and executing real development actions through Claude.

## General Info

### Classification

- Code/CLI agent

### Version
v1.0 (Production release 2025; grew to billion-dollar product within six months)

### Repo
- https://github.com/anthropics/claude-code
  - Open-source under BSD license

### Rating
- [5] Powerful agentic CLI with deep codebase understanding, MCP integration, hooks, skills, subagents, and extensive automation capabilities.
- [4] Terminal-based workflow requires developer comfort with CLI; token consumption with subagents can be high.

### Short Description
An agentic command-line coding assistant from Anthropic that integrates directly into the developer's terminal, providing raw model access with codebase-aware context, parallel subagent execution, MCP integration, hooks, skills, and headless automation support.

### Description
Claude Code is Anthropic's CLI-based agentic coding tool designed to be intentionally low-level and unopinionated, giving developers close to raw model access without forcing specific workflows. It automatically pulls codebase context into prompts and can execute real actions including file editing, terminal commands, Git operations, and web searches. The tool supports the Model Context Protocol (MCP) as a first-class client for connecting to external tools and data sources. It features parallel subagent execution (up to 7 agents simultaneously) for tasks like codebase exploration and multi-file analysis, reusable markdown-based skills that work across Claude Code, Claude.ai, and Claude Desktop, and deterministic hooks that tie custom code to specific execution lifecycle moments. It supports headless operation for CI/CD pipelines and batch workflows, and integrates deeply with Git for commits, PRs, rebases, and conflict resolution. Claude Code can be configured with BYOK support for Anthropic API, AWS Bedrock, and Google Vertex AI.

### Languages
- Multi-language support
  - Works with any language or framework accessible from the terminal
  - Strongest demonstrated support for Python, JavaScript/TypeScript, and common web/backend stacks

### Notes
- Distinguishing features: low-level unopinionated design, parallel subagent execution (Explore, Plan, General-purpose), reusable skills system, deterministic hooks (PreToolUse, PostToolUse, PermissionRequest, UserPromptSubmit), MCP client with 100M+ monthly downloads ecosystem.
- Recommended workflow: Explore, Plan, Code, Commit pattern for most development tasks.
- Headless mode (`claude -p`) enables programmatic integration into CI/CD pipelines, batch migrations, and data processing workflows.
- Context engineering is central: optimizing relevant context, reducing bloat, and using strategic runtime injections for best results.
- Token consumption with subagents can exceed 200,000+ tokens rapidly; each subagent operates in its own context window.
- Many Anthropic engineers use Claude Code for 90%+ of their Git interactions.
- 2025-2026 context: Grew from experimental research project to production-grade tooling, reaching billion-dollar product status within six months. Organizations report 89% AI adoption with 800+ internally deployed AI agents.

### Last Update
2026-01-30

## Licensing

### Opensource
- Yes
  - Source code available on GitHub under BSD license

### License
- BSD

### Free Trial
- Yes
  - Available through Anthropic API credits; usage-based pricing model

## MCP-Client

### MCP-Client
- Yes
  - First-class MCP client support; add servers via `claude mcp add` command
  - Integrates with PR reviews, issue management, database querying, error tracking, design systems, and Zapier channels

### Prompts
- Yes
  - Accepts natural-language task prompts with codebase-aware context
  - Supports system prompts, project-specific instructions via CLAUDE.md files, and custom prompt templates

### Tools
- Yes
  - Built-in tools: file read/write, terminal execution, web search, glob, grep, Git operations
  - MCP server tools for external integrations (Notion, Slack, databases, etc.)
  - Subagent tools (Explore, Plan, General-purpose) for parallel task execution

### Resources
- Yes
  - Comprehensive documentation, CLAUDE.md project configuration files, skills definitions, and MCP resource access

### ACP
- Yes
  - Official ACP (Agent Client Protocol) support; Claude Code exposes a standardized JSON-RPC over stdio interface for editor-agent communication per the open standard by Zed Industries

## Deployment

### BYOK
- Yes
  - Supports Anthropic API direct, AWS Bedrock, and Google Vertex AI
  - Configure via environment variables or CLI flags

### Local Offline
- No
  - Requires API connectivity to Claude models (Anthropic, Bedrock, or Vertex)
  - CLI runs locally but model inference is cloud-based

## Developer Experience

### Context Management
- Yes
  - Automatically pulls codebase context into prompts
  - CLAUDE.md files for project-specific instructions and context
  - Subagents for parallel context gathering across large codebases
  - Context engineering principles: reduce bloat, strategic runtime injections, few non-conflicting instructions

### Direct File References
- Yes
  - Reads and edits specific files by path, supports glob and grep for file discovery
  - Subagent Explore mode for read-only file discovery and code search

### Checkpoints
- Yes
  - Git-based checkpointing through commits, branches, and PRs
  - Supports reverting, comparing patches, and resolving rebase conflicts

### Git Support
- Yes
  - Deep Git integration: commits, branches, PRs, rebases, conflict resolution, patch grafting
  - Automated commit message generation and subjective code review
  - GitHub automation via headless mode triggered by repository events

## Extensible

### Extensible
- Yes
  - MCP servers, hooks, skills, slash commands, subagents, and headless scripting

### Plugins
- Yes
  - MCP servers act as plugin-like extensions for external tool and data integration
  - Add via `claude mcp add --transport http <name> <url>`

### Hooks
- Yes
  - Deterministic lifecycle hooks: PreToolUse, PostToolUse, PermissionRequest, UserPromptSubmit
  - Can block tool calls, allow/deny permissions, and modify behavior at specific execution moments

### SlashCommands
- Yes
  - Built-in slash commands for common operations (e.g., /clear, /compact, /help, /init, /review, /cost)
  - Extensible through custom configurations

### Skills
- Yes
  - Reusable markdown-based building blocks stored globally (~/.claude/skills/) or per-project (.claude/skills/)
  - Claude auto-detects when to invoke skills
  - Portable across Claude Code, Claude.ai, and Claude Desktop

### Custom Modes
- No
  - No documented custom mode system; flexibility comes from skills, hooks, and MCP configuration instead

### Subagents
- Yes
  - Parallel execution of up to 7 subagents simultaneously
  - Built-in types: Explore (read-only file discovery), Plan (implementation planning), General-purpose (multi-step tasks)
  - Each subagent operates in its own context window and reports results back to the main agent
