# Dust - https://dust.tt
AI agent platform enabling organizations to deploy, orchestrate, and govern specialized AI agents with enterprise-grade security and comprehensive data integration.

**Dataset ID:** ai-chat

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
- Code/Autonomous agent
- AIE/Model

### Version
<!-- Latest version used for update -->
- v0.0.7

### Repo
<!-- Associated Github repository -->
- https://github.com/dust-tt/dust

### Rating
<!-- Avg rating based on review comments -->
- 1.3k GitHub stars

### Short Description
- AI agent platform enabling organizations to deploy, orchestrate, and govern specialized AI agents with enterprise-grade security and comprehensive data integration.

### Description
<!-- Few paragraphs about the product -->
Dust is an operating system for AI agents that enables organizations to deploy, orchestrate, and govern specialized AI agents working alongside teams. The platform connects agents to company knowledge and tools while maintaining security and control. Dust is model-agnostic, allowing you to use any LLM provider, and emphasizes that your data stays your data—never used for model training.

The platform provides a no-code agent builder that allows creating specialized agents for specific business functions in minutes. It features comprehensive data integration capabilities, connecting to Slack, Google Drive, Notion, Confluence, GitHub, and more, breaking down organizational data silos. Dust supports semantic search, data analysis, and web navigation capabilities while maintaining enterprise-grade security with SOC 2 Type II certification, GDPR compliance, and HIPAA compliance enablement.

Dust operates as both an MCP client and server, offering maximum flexibility. It can expose remote MCP servers to extend agent capabilities within its permission system, and it can also expose itself as an MCP server to external clients like Claude Desktop/Code, Goose, or Cursor, allowing employees to leverage company knowledge while giving visibility and control to administrators.

### Languages
<!-- Any or limited list of supported programming Languages -->
- Any

### Notes
- Operates as both MCP client and MCP server
- 50,000+ businesses and professionals
- Notable clients: Databricks, Accenture, Shopify, Cloudflare, Duolingo
- SOC 2 Type II, GDPR, HIPAA compliance
- Model-agnostic (supports any LLM provider)
- CLI tool available for local MCP server with selected Dust agents
- Real-time data synchronization with connected services
- Technology stack: TypeScript (91.7%), Rust (6.9%)

### Last Update
<!-- Note Date last updated -->
- February 9, 2026

## Licensing
<!-- Licensing -->
### Opensource
<!-- Is this released under opensource license -->
- Yes

### License
<!-- Opensource specific license or Proprietary for other commercial licenses -->
- MIT
  - Main repository and several components under MIT
  - Some proprietary features for commercial platform

### FreeTrial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
- Yes
  - 14-day free trial
  - No credit card required

## MCP-Client
<!-- Model Context Protocol support with capability details -->
- Yes
  - Operates as both MCP client (consuming external MCP servers) and MCP server (exposing Dust agents)
  - OAuth personal access tokens for authentication
  - SSE (Server-Sent Events) for request listening
  - Requires heartbeat every 5 minutes maximum
  - Per-client instance architecture for isolation
  - SDK available via @dust-tt/client with DustMcpServerTransport

### MCP-Protocol-Version
<!-- MCP protocol version (e.g., 2025-06-18) -->
- 2025-06-18

### MCP-Tools
<!-- Supports MCP tool execution -->
- Yes

### MCP-Prompts
<!-- Supports MCP prompt templates -->
- No

### MCP-Resources
<!-- Supports MCP resource access -->
- No

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
  - Platform is model-agnostic but BYOK not explicitly documented

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
- No
  - Primarily cloud-based platform
  - CLI tool available for local MCP server with selected Dust agents
  - No full on-premise deployment option documented

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
- Yes
  - Knowledge references can be added inline using "/" or Attach knowledge button
  - Pasting URLs retrieves associated content
  - Agent can access connected data sources (Slack, Notion, GitHub, etc.)
  - Fine-grained permissions control what data is accessible

### Direct File References
<!-- Can with @file or similar provide context. -->
- Yes
  - @mention syntax for agents and knowledge
  - Drag and drop files directly into conversations (JPEG, PNG, PDF)
  - "/" prefix for searching relevant content by title
  - URL pasting for content retrieval

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
- No

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
- Yes
  - GitHub integration for Issues, Pull Requests, Discussions, and codebase
  - Real-time synchronization for Issues, Discussions, and Pull Requests
  - Code synchronized every 8 hours
  - Agents can create/manage GitHub issues, retrieve PR info, generate code reviews
  - GitLab support also available

## Extensible
<!-- Is it possible to extend or customize the system in any way -->
<!-- Extensible -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
- Yes
  - Custom integration and LLM orchestration through Dust Apps
  - Can execute code that agents run
  - Custom tool creation for agents

### Hooks
<!-- Lifecycle events for the agent. -->
- No

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
- Yes
  - Skills can be invoked with slash prefix
  - Unified system with Skills

### Skills
<!-- Reusable skill definitions whose details are loaded on demand; only name and description are kept in context. -->
- Yes
  - Reusable packages of instructions, knowledge, and tools
  - Can be shared across multiple agents
  - Just-in-time skill addition/removal mid-conversation
  - Customize global skills with branding and instructions
  - Automatic context loading and frontmatter-controlled invocation

### CustomModes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
- Yes
  - Two modes of execution for agent interactions
  - Separate conversation mode vs. direct user interaction mode

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
- Yes
  - Agents can run other agents as tools via run_agent
  - Two execution modes: separate conversation with output return, or direct takeover
  - Modular architecture for specialized capabilities
