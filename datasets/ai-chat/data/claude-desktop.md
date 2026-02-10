# Claude Desktop - https://claude.ai
AI-powered desktop application for macOS and Windows with MCP support, file drag-and-drop, Claude Cowork autonomous agent, and seamless integration with local tools and services.

**Dataset ID:** ai-chat

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
- AIE/Model
- Code/Other

### Version
<!-- Latest version used for update -->
- 1.1.2321 (February 8, 2026)

### Repo
<!-- Associated Github repository -->
- No official public repository for Claude Desktop app itself
- Related: https://github.com/anthropics/claude-code

### Rating
<!-- Avg rating based on review comments -->
-

### Short Description
- Native desktop application for macOS and Windows that brings Claude AI into your everyday workflow with quick access, file drag-and-drop, MCP desktop extensions for tool integrations, and Mac-specific features like screenshot sharing and voice input.

### Description
<!-- Few paragraphs about the product -->
Claude Desktop is Anthropic's native application that provides seamless access to Claude AI directly from your desktop environment. The app is always accessible from your dock and includes quick entry for instant access from any application, plus desktop extensions to connect Claude with your local tools and files. You can bring up Claude from any app without switching windows, snap screenshots, share windows (Mac only), or drag files directly into your chat.

The desktop app supports integrations through the Model Context Protocol (MCP), allowing you to connect Claude with services like Google Calendar, Slack, GitHub, Linear, Notion, and more. Once connected, Claude can read your calendar, send messages, create issues, and interact with your tools directly. Desktop Extensions (.mcpb files) make installing MCP servers as simple as clicking a button, bundling entire MCP servers including all dependencies into single installable packages.

In January 2026, Anthropic released Claude Cowork, a feature that transforms Claude into an autonomous desktop coworker capable of taking on tasks directly on your computer—organizing files, creating documents, running multi-step projects—with minimal manual intervention. The desktop app features integration with files, databases, and system tools, making it a comprehensive AI assistant for everyday productivity and development workflows.

### Languages
<!-- Any or limited list of supported programming Languages -->
- Any

### Notes
- Claude Desktop (the chat app) is different from Claude Code (the developer CLI tool)
- Claude Code has additional features like git integration, worktrees, and checkpoints
- Some features (like Cowork) require Pro or higher subscription
- Mac-specific features include screenshot sharing, window sharing, and voice input
- Desktop-native features: Quick entry from any app, dock integration, file drag-and-drop

### Last Update
<!-- Note Date last updated -->
- February 9, 2026

## Licensing
<!-- Licensing -->
### Opensource
<!-- Is this released under opensource license -->
- No

### License
<!-- Opensource specific license or Proprietary for other commercial licenses -->
- Proprietary

### FreeTrial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
- Yes
  - Free tier available (Claude Free plan with access to Sonnet 4.5 and Haiku 4.5)
  - When major upgrades are released, Anthropic often offers 14-day Pro trials for new users
  - Available to all plan types: Free, Pro, Max, Team, and Enterprise

## MCP-Client
<!-- Model Context Protocol support with capability details -->
- Yes

### MCP-Protocol-Version
<!-- MCP protocol version (e.g., 2025-06-18) -->
- 2025-06-18

### MCP-Tools
<!-- Supports MCP tool execution -->
- Yes

### MCP-Prompts
<!-- Supports MCP prompt templates -->
- Yes

### MCP-Resources
<!-- Supports MCP resource access -->
- Yes

### MCP-Roots
<!-- Supports MCP workspace roots -->
- No

### MCP-Sampling
<!-- Supports MCP LLM sampling -->
- No

### MCP-Tasks
<!-- Supports MCP asynchronous tasks -->
- No

### ACP
<!-- Agent Client Protocol support for standardized editor-agent communication (agentclientprotocol.org) -->
- No

## Deployment
<!-- Deployment -->
### BYOK
<!-- Bring Your Own LLM API Key supported -->
- No
  - The official Claude Desktop app uses Anthropic's service and does not support BYOK
  - Note: Third-party open-source alternatives like Kuse offer BYOK functionality, but this is not a feature of the official app

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
- No
  - Claude Desktop requires internet connectivity to access Claude's cloud-based AI services
  - While local MCP servers can interact with your machine, they don't enable fully offline operation

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
- Yes
  - Sessions track their own context and changes
  - Claude automatically summarizes conversations when context fills up
  - You can manually ask Claude to compact context to free up space
  - Session management in sidebar with rename, archive, and context usage viewing

### Direct File References
<!-- Can with @file or similar provide context. -->
- Yes
  - Drag and drop files directly into chat
  - Claude can read files and accept pasted snippets
  - File inclusion through MCP servers and extensions
  - Support for .claudeignore files to exclude irrelevant directories

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
- No
  - Standard chat interface does not have checkpoint/undo functionality
  - Note: This differs from Claude Code which has git-based checkpoints

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
- No
  - Standard Claude Desktop chat interface does not have direct git integration
  - Git integration available through MCP servers (e.g., github-mcp-server)
  - Note: Claude Code (the developer CLI tool) has full git integration, but that's a separate product

## Extensible
<!-- Is it possible to extend or customize the system in any way -->
<!-- Extensible -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
- Yes
  - Desktop Extensions (.mcpb files) for installing MCP servers
  - One-click installation of MCP servers
  - Enterprise can upload custom extensions and control access via allowlist

### Hooks
<!-- Lifecycle events for the agent. -->
- No
  - No public lifecycle hook API documented

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
- Yes
  - Skills can be invoked with /skill-name syntax
  - Custom skills defined in .claude/skills/ directories
  - Skills work across Claude.ai web, Claude Desktop, and Claude Code

### Skills
<!-- Reusable skill definitions whose details are loaded on demand; only name and description are kept in context. -->
- Yes
  - Skills are reusable prompts that extend Claude's capabilities
  - Defined as markdown files in .claude/skills/
  - Can be user-invoked or model-invoked (automatic)
  - Organization-wide skill management for Team and Enterprise plans
  - Partner-built skills available through open standard (Agent Skills)

### CustomModes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
- Yes
  - Plan mode for structured planning workflow
  - Specialized agent skills for complex capabilities
  - Organization can create custom modes for specific tasks

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
- Yes
  - Claude Cowork enables autonomous task delegation (Pro and above)
  - Can handle multi-step projects with minimal manual intervention
  - Available to Pro, Max, Team, and Enterprise subscribers
