# Claude Desktop - https://claude.ai/
[Claude's desktop application for accessing Claude models, Skills, and file-aware workflows]

## General Info

### Classification

- AI Assistant (with coding capabilities)

### Version
v1.0 (2025-10-18)

### Repo
-

### Rating
- [4] Strong multi-modal and long-context capabilities
- [4] Powerful "Skills" integration for automating structured workflows

### Short Description
- Native desktop application for Anthropic's Claude models that unifies chat, Skills, and file-aware workflows (create/edit documents, spreadsheets, slide decks, and PDFs) with optional MCP-based local integrations.

-

### Description
Claude Desktop is Anthropic's desktop application that brings the Claude family of models and the Skills ecosystem to a native app experience. It exposes capabilities such as file creation and editing (spreadsheets, slide decks, documents, PDFs), Skills-driven automation, and integrations that let Claude interact with local files and services. The desktop environment also supports extensions to simplify installing and connecting Model Context Protocol (MCP) servers and other local connectors.

Designed for Pro, Max, Team and Enterprise customers, Claude Desktop aims to make agentic workflows and productivity features (e.g., generating company-standard reports, programmatic file edits, and form-filling) accessible without switching contexts between browser tabs.

### Languages
- Any

### Notes
- Skills: Claude Desktop leverages the Skills system to encode org-specific procedures and standards. Skills can be created and shared (Team/Enterprise controls apply), and Claude will automatically invoke relevant skills when they match a user's request.
- File operations: The app supports creating and editing Excel-like spreadsheets (including formulas), PowerPoint slide decks, Word documents, and fillable PDFs via Skills and built-in file tooling.
- Computer use & automation: Anthropic has been developing "computer use" capabilities that let Claude interact with desktop software and browser UIs programmatically; this underpins some advanced desktop automation features but is still experimental and constrained.
- Desktop extensions & MCP: Extensions and MCP-compatible helpers simplify connecting local services and MCP servers to Claude, reducing installation friction for advanced local integrations.
- Enterprise features: Many advanced deployment, security, and integration details (including BYOK, on-prem routing, and fine-grained admin controls) are oriented toward Team and Enterprise customers and are not fully documented in public product pages.
- Comparison note: For heavy developer workflows that require CLI-first, git-aware operations and explicit BYOK/local routing, Claude Code (Anthropic's CLI/terminal tool) is a more explicit offering; Claude Desktop is focused on productivity, file workflows, and Skills-driven automation inside a native app.

### Last Update
- 2025-11-15

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- No

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - Claude supports structured prompts and can automatically invoke Skills when a prompt matches a Skill's trigger. Prompts can include file attachments and are used to request file operations (e.g., "Edit this spreadsheet to add a totals column").


### Tools
- Yes
  - Claude Desktop can access and invoke external tools via MCP servers and built-in tooling for file editing, document conversion, and task automation. Tools are surfaced through the UI when MCP servers are configured.


### Resources
- Yes
  - Claude Desktop provides in-app documentation for Skills, MCP setup, and file operations. Public resources include Anthropic's help center and developer documentation for MCP. Enterprise customers also receive additional admin and deployment documentation.


## Deployment

### BYOK
- No (Standard plans)
  - Enterprise deployment options may be available; contact Anthropic sales/support for BYOK requirements.

### LocalOffline
- No
  - Anthropic's desktop offering is primarily cloud-connected. Public documentation does not describe a fully local/offline model runtime. Enterprise/Team tooling may support organization-managed endpoints; contact Anthropic sales/support for enterprise deployment options.

## Developer Experience

### ContextManagement
- Yes
  - Claude Desktop supports project-scoped context and memory with configurable retention policies. Users can create session recaps, use project memory, and enable incognito mode to avoid long-term storage of sensitive content. Memory and context policies are configurable by administrators in Enterprise/Team plans.


### DirectFileReferences
- Yes
  - Claude Desktop supports referencing files inline using the `@` syntax (e.g., `@path/to/file.txt`) with tab-completion. Referencing a file pulls its content into the conversation context and may also load local CLAUDE.md context files in the same directory. The `@` syntax can also target MCP-exposed resources and directories. Users can also drag-and-drop files into the app to create references.


### Checkpoints
- Yes
  - Claude Desktop provides automatic checkpoints (snapshots) before Claude performs file or code edits. Checkpoints persist across sessions for a limited retention period (default ~30 days) and can be used to restore code, conversation, or both. They are accessible via UI shortcuts (e.g., Esc Esc or /rewind) and are intended as a safety net, not a replacement for Git or other VCS.


### GitSupport
- No

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Plugins bundle commands, Skills, hooks, MCP server configurations, and helper assets into installable packages. They are distributed via plugin registries and can be enabled per-project or globally.

### Hooks
- Yes
  - Hooks provide lifecycle event handlers (pre/post actions) that run automatically. Common uses include formatting, linting, CI checks, or notifying external systems after agent actions.

### SlashCommands
- Yes
  - Slash commands are user-invoked shortcuts (/command) for repeatable workflows. They are defined in project files (e.g., .claude/commands) and can invoke subagents, run scripts, or execute templated prompts.

### CustomModes
- Yes
  - Claude Desktop supports custom modes or specialist modes that tailor the chat experience for specific tasks (e.g., coding mode, review mode). These are often delivered via Skills or plugin configurations.

### Subagents
- Yes
  - Subagents are specialized AI assistants for task-specific workflows. They can be invoked by commands or Skills and run in isolated contexts to perform planning, analysis, or tool orchestration.


## Ungrouped Criteria

### Terminal
- No

### SpecDrivenDevelopment
- Tessl
  - Unknown - Claude Desktop does not have documented first-class support for Tessl workflows.
- SpecKit
  - Unknown - No documented SpecKit integration for Claude Desktop.
- OpenSpec
  - Unknown
- BMAD
  - Unknown
- AgentOS
  - Unknown
- ClaudeFlow
  - Unknown
- SPARC
  - Unknown
- SuperClaude
  - Unknown
  - Notes:
    - Claude Desktop is a general-purpose AI assistant focused on productivity and file workflows rather than coding-specific spec-driven development. For formal spec-driven development workflows that require tight VCS and build integrations, consider using dedicated coding agents.

