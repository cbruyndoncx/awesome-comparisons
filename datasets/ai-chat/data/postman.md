# Postman - https://postman.com
AI-powered API platform with Model Context Protocol (MCP) support, Postbot AI assistant, AI Agent Builder, and comprehensive API testing, development, and automation capabilities.

**Dataset ID:** ai-chat

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
- Code/Other
- Product/Prototyping

### Version
<!-- Latest version used for update -->
- 11.83.2 (February 3, 2026)

### Repo
<!-- Associated Github repository -->
- https://github.com/postmanlabs
- Main support repo: https://github.com/postmanlabs/postman-app-support
- MCP server repo: https://github.com/postmanlabs/postman-mcp-server

### Rating
<!-- Avg rating based on review comments -->
-

### Short Description
- API platform with AI-native capabilities including Postbot AI assistant, MCP client and server support, AI Agent Builder, and bring-your-own-model (BYOM) integration for testing, developing, and automating API workflows.

### Description
<!-- Few paragraphs about the product -->
Postman is an API platform that has evolved from a simple API testing tool into a comprehensive AI-native platform for building, testing, and managing APIs throughout their entire lifecycle. In 2026, Postman launched full support for the Model Context Protocol (MCP), enabling developers to create MCP requests to interact with MCP servers, test their tools, resources, and prompts through the familiar Postman interface, and generate custom MCP servers using the AI Tool Builder. The platform serves as both an MCP client (consuming MCP servers) and provides an MCP server (allowing AI agents to automate Postman workflows).

Postman's AI capabilities are anchored by Postbot, an AI assistant that helps users troubleshoot API requests, write test scripts and documentation, and analyze large datasets. The platform introduced Agent Mode in 2026, which turns natural language commands into automated actions across the API lifecycle, including sending requests, fixing errors, and updating tests. Users can connect any OpenAI-compatible endpoint with Bring Your Own Model (BYOM) support, working with proprietary, self-hosted, or local deployments directly within Postman. The platform supports browsing and switching between models from OpenAI, Anthropic, and Google, with built-in capabilities for comparing performance metrics like response times and token counts.

The AI Agent Builder, introduced in 2026, democratizes agent development by simplifying the creation, testing, and deployment of AI agents. It enables teams to evaluate and compare LLMs based on performance and cost, orchestrate intelligent automations as agentic workflows, and discover and integrate relevant APIs as agent tools without coding complexity. Postman's remote MCP server allows AI agents to test APIs by running collections, generate idiomatic client code from APIs, keep collections synchronized with code, and manage workflows with mock server environments. The platform works with all coding agents that support MCP, including Claude Code, VS Code, Cursor, Windsurf, and others, with secure communication over HTTPS and local stdio support for IDE integrations.

### Languages
<!-- Any or limited list of supported programming Languages -->
- Any
  - Supports API testing and code generation for all major programming languages
  - Code generators available for JavaScript, Python, Java, Go, Ruby, PHP, C#, Swift, Kotlin, and more

### Notes
- Postman v11 launched with AI-native capabilities in 2025-2026
- MCP support includes both client capabilities (consuming MCP servers) and server capabilities (exposing Postman API to AI agents)
- Three MCP server configurations: Minimal (essential tools), Code (client code generation), and Full (100+ Postman API tools)
- BYOM support added in January 2026 for OpenAI-compatible endpoints
- Postman CLI v1.27.0 includes native support for Linux ARM64 (January 2026)
- Free plan limited to single user starting March 1, 2026
- API Catalog feature launching March 2026 for portfolio management
- MCP Apps support for interactive data visualizations in responses
- Postman Flows provides visual, low-code editor for AI model experimentation

### Last Update
<!-- Note Date last updated -->
- February 9, 2026

## Licensing
<!-- Licensing -->
### Opensource
<!-- Is this released under opensource license -->
- No
  - Postman platform is proprietary, though some components and tools are open source

### License
<!-- Opensource specific license or Proprietary for other commercial licenses -->
- Proprietary

### FreeTrial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
- Yes
  - Free plan available (limited to 1 user starting March 2026, 25 runs, tight API/mock caps)
  - 30-day Enterprise trial available for advanced collaboration and automation features
  - Core features available on Free plan with upgrade options for teams

## MCP-Client
<!-- Model Context Protocol support with capability details -->
- Yes
  - Full MCP client support for creating requests, testing servers, and interacting with tools, resources, and prompts
  - Can export server configurations for use with Claude Desktop, VS Code, and Cursor

### MCP-Protocol-Version
<!-- MCP protocol version (e.g., 2025-06-18) -->
- 2025-06-18

### MCP-Tools
<!-- Supports MCP tool execution -->
- No

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
- Yes

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
- Yes
  - BYOM (Bring Your Own Model) support introduced January 2026
  - Connect any OpenAI-compatible endpoint
  - Works with proprietary, self-hosted, or local deployments
  - Supports OpenAI, Anthropic, Google, and other OpenAI-compatible providers
  - Expanded authentication options for providers with custom or non-standard requirements

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
- No
  - Postman is primarily cloud-based, requiring internet connectivity
  - MCP server can communicate via local stdio for IDE integrations
  - Some features may work offline but core AI capabilities require cloud access

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
- Yes
  - AI requests support model comparison and switching
  - Agent Mode maintains context for natural language automation
  - MCP requests can be saved, reused, shared, and documented
  - Collections organize and persist API requests with documentation
  - Workspaces provide context organization for teams

### Direct File References
<!-- Can with @file or similar provide context. -->
- Yes
  - Import/export capabilities for collections, environments, and data files
  - Support for external data files in test execution
  - API schema imports from various formats (OpenAPI, GraphQL, etc.)
  - Integration with Git repositories for version control

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
- Yes
  - Version history for collections
  - Git integration for versioning and branching
  - Forking and merging capabilities for collaborative workflows
  - Native Git workflows becoming core part of platform (2026)

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
- Yes
  - Import data from Git repositories
  - GitHub integration for syncing collections
  - Native Git workflows as core platform feature (launching 2026)
  - Version control for API definitions and collections

## Extensible
<!-- Is it possible to extend or customize the system in any way -->
<!-- Extensible -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
- Yes
  - Extensive integration marketplace with 30+ integrations
  - MCP server generation through AI Tool Builder
  - Custom MCP servers can be built using public APIs
  - Integration with external services (GitHub, Slack, Linear, Notion, etc.)

### Hooks
<!-- Lifecycle events for the agent. -->
- Yes
  - Pre-request scripts that run before sending requests
  - Test scripts that run after receiving responses
  - Collection-level and folder-level scripts
  - Environment variable manipulation through scripts

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
- No
  - Natural language Agent Mode instead of slash commands
  - Postbot responds to conversational requests
  - No documented slash command syntax

### Skills
<!-- Reusable skill definitions whose details are loaded on demand; only name and description are kept in context. -->
- Yes
  - Postbot has finite set of "skills" mapped from natural language instructions
  - Automatic test generation, debugging, documentation, data analysis
  - MCP servers expose tools, prompts, and resources as reusable capabilities
  - AI Agent Builder for creating and orchestrating intelligent workflows

### CustomModes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
- Yes
  - Agent Mode for natural language API workflow automation
  - Different MCP server configurations (Minimal, Code, Full)
  - Postman Flows for visual, low-code AI model experimentation
  - Custom workspace configurations for different project types

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
- Yes
  - AI Agent Builder for creating specialized AI agents
  - MCP server tools can be composed into agent workflows
  - Agent Mode orchestrates multi-step automations
  - Support for agentic frameworks through MCP integration
