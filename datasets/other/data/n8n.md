# n8n - https://n8n.io
n8n is a fair-code workflow automation platform that combines visual no-code building with custom code capabilities, offering 400+ integrations and native AI capabilities powered by LangChain. The platform supports Model Context Protocol (MCP) through both client and server implementations, allowing workflows to integrate with external MCP servers and expose n8n tools as MCP services to AI agents.

**Dataset ID:** other

## General Info

### Classification
- Code/Other

### Version
n8n@2.6.4

### Repo
https://github.com/n8n-io/n8n

### Rating
173,783+ GitHub stars

### Short Description
Fair-code workflow automation platform with MCP client/server support, 400+ integrations, and native AI agent capabilities

### Description
n8n is a workflow automation platform designed to give technical teams the flexibility of code with the speed of no-code development. The platform enables users to build automated workflows that connect multiple tools and services, supporting over 400 integrations while maintaining full control over deployments and data through self-hosting capabilities.

The platform features native AI integration through LangChain, allowing teams to build AI agent workflows with custom data and models. n8n implements Model Context Protocol (MCP) support through three specialized nodes: the MCP Client node enables workflows to use tools from external MCP servers as regular workflow steps, the MCP Client Tool node connects AI agents to external MCP server tools, and the MCP Server Trigger node exposes n8n workflows as MCP tools that external AI agents can discover and execute. The MCP implementation supports both Server-Sent Events (SSE) and streamable HTTP transport protocols.

n8n combines JavaScript and Python coding capabilities alongside visual workflow design, making it suitable for both technical and non-technical users. The platform offers enterprise features including advanced permissions, SSO, air-gapped deployments, and supports multiple deployment methods including Docker, npm, and cloud hosting at n8n.cloud.

### Languages
- TypeScript
  - 90.9% TypeScript codebase

### Notes
Latest version 2.6.4 released February 6, 2026. Built-in MCP support via @n8n/n8n-nodes-langchain package (v2.7.1). Over 900 ready-to-use workflow templates. 608 contributors. 54,688 forks. Self-hosting supported via Docker (docker.n8n.io/n8nio/n8n) or npm (npx n8n). Requires Node.js 20.19 to 24.x for npm installation. Default SQLite database with PostgreSQL support for production. Enterprise plan available with additional features and support. Fair-code model balances open-source visibility with sustainable commercial development.

### Last Update
2026-02-06

## Licensing

### Opensource
- Yes

### License
- Sustainable Use License (fair-code)
- n8n Enterprise License (commercial features)

### Free Trial
- Yes
  - Self-hosted Community Edition is completely free with unlimited executions
  - Cloud offering provides 14-day free trial for Starter and Pro plans (no credit card required)
  - Cloud pricing starts at €24/month for Starter plan with 2,500 executions

## MCP-Client

### MCP-Client
- Yes
  - MCP Client node uses tools from external MCP servers as workflow steps
  - MCP Client Tool node connects AI agents to external MCP server tools
  - MCP Server Trigger node exposes n8n workflows as MCP tools to external clients
  - Supports SSE and streamable HTTP transport protocols
  - Package: @n8n/n8n-nodes-langchain v2.7.1

### Prompts
- No

### Tools
- Yes

### Resources
- No

### ACP
- No

## Deployment

### BYOK
- Yes
  - Self-hosted deployment with full control over infrastructure
  - Supports custom AI model integrations via LangChain
  - Enterprise plan supports air-gapped deployments

### Local Offline
- Yes
  - Full self-hosting via Docker or npm
  - SQLite default database enables offline operation
  - No external dependencies required for core functionality

### Self-Hosting
- Yes
  - Docker: docker.n8n.io/n8nio/n8n
  - npm: npx n8n (requires Node.js 20.19-24.x)
  - Multiple deployment options: Docker Compose, Kubernetes, standalone server
  - Community Edition free with unlimited executions
  - Optional cloud hosting at n8n.cloud

## Developer Experience

### Context Management
- Yes
  - Multi-server MCP connection support
  - Workflow variables and environment variable management
  - PostgreSQL support for production state management

### Direct File References
- Yes
  - File system operations through workflow nodes
  - Direct file manipulation in JavaScript/Python code blocks

### Checkpoints
- Yes
  - Workflow execution history and logs
  - Error workflow support for recovery
  - Execution data retention configurable

### Git Support
- Yes
  - Enterprise plan includes Git version control for workflows
  - Self-hosted instances can version control workflow JSON files

## Extensible

### Plugins
- Yes
  - Community nodes available via npm packages
  - Custom node development supported
  - 400+ built-in integration nodes

### Hooks
- Yes
  - Webhook triggers for external integrations
  - Pre/post execution hooks available
  - Error workflow hooks

### SlashCommands
- No

### Skills
- No

### Custom Modes
- Yes
  - Code mode: JavaScript/Python execution
  - Visual mode: drag-and-drop workflow builder
  - AI Agent mode: LangChain-based agent workflows
  - MCP Server mode: expose workflows as MCP tools
  - MCP Client mode: integrate external MCP tools

### Subagents
- Yes
  - LangChain-based AI agent workflows
  - Multi-agent orchestration through workflow design
  - Agent tool chaining and conditional routing
