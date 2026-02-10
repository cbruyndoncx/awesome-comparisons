# Visual Studio Code - https://code.visualstudio.com
Open source AI code editor with native Model Context Protocol support for extending GitHub Copilot with custom tools and resources.

**Dataset ID:** other

## General Info

### Classification
- Code/Editor

### Version
1.109.0 (January 2026)

### Repo
https://github.com/microsoft/vscode

### Rating
181,563+ GitHub stars

### Short Description
Open source AI code editor with native Model Context Protocol support for extending GitHub Copilot with custom tools and resources.

### Description
Visual Studio Code implements full Model Context Protocol support starting from version 1.102, enabling developers to extend GitHub Copilot Chat capabilities through MCP servers. VS Code supports the complete MCP specification (protocol version 2025-06-18), including tools, prompts, resources, sampling, roots, elicitation (forms and URLs), and the newly introduced MCP Apps capability for rendering interactive UI components directly in conversations.

MCP servers in VS Code can be configured through multiple methods: the GitHub MCP server registry accessible via the Extensions view, workspace-specific .vscode/mcp.json files, user-level configuration for cross-workspace access, dev container configurations, or command-line interface. The editor supports all standard MCP transports including local standard input/output (stdio), streamable HTTP, and server-sent events (SSE) for legacy support. Enterprise administrators can configure internal MCP registries and enforce allowlist policies for organizational governance.

The January 2026 update (v1.109) transformed VS Code into a multi-agent orchestration hub with structured planning agents, parallel subagent execution, and unified orchestration across local and cloud environments. VS Code is among the first major AI code editors to support MCP Apps, enabling tool calls to return interactive dashboards, forms, visualizations, and multi-step workflows that render inline in chat conversations.

### Languages
- Any
  - Supports nearly all major programming languages

### Notes
MCP support generally available since v1.102. First major AI code editor with full MCP Apps support. Azure MCP Server built-in with Visual Studio 2026. MCP prompts appear as slash commands in Copilot Chat. Official SDKs for TypeScript, Python, Java, Kotlin, and C#. Built-in Git integration. Integrated terminal. AI-powered next edit suggestions. Remote development via GitHub Codespaces. Browser-based access through vscode.dev. Local history tracking. Accessibility features including screen reader support.

### Last Update
2026-01-31

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
  - Completely free and open source

## MCP-Client

### MCP-Client
- Yes
  - Full MCP specification support

### Prompts
- Yes

### Tools
- Yes

### Resources
- Yes

### Sampling
- Yes

### Roots
- Yes

### Elicitation
- Yes
  - Form and URL support

### Tasks
- Yes
  - Supports tool call requests

### ACP
- No

## Deployment

### BYOK
- Yes
  - GitHub Copilot subscription required for AI features
  - Can use with any MCP server

### Local Offline
- Yes
  - Local MCP servers via stdio transport
  - Can run completely offline without cloud features

## Developer Experience

### Context Management
- Yes
  - MCP resources can be dragged into workspace as semantic information
  - Workspace-specific and user-level configurations

### Direct File References
- Yes
  - Built-in file explorer and reference system

### Checkpoints
- Yes
  - Local history tracking
  - Git integration

### Git Support
- Yes
  - Built-in Git integration and source control

## Extensible

### Plugins
- Yes
  - Extensive extension marketplace
  - MCP server extensions (Azure MCP Server, Copilot MCP, MCP Marketplace)
  - Extension API for custom MCP server providers

### Hooks
- Yes
  - Extension lifecycle hooks

### SlashCommands
- Yes
  - MCP prompts appear as slash commands in Copilot Chat

### Skills
- No

### CustomModes
- No

### Subagents
- Yes
  - Multi-agent orchestration with structured planning agents
  - Parallel subagent execution
