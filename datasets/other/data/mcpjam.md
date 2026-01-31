# MCPJam Inspector
https://github.com/mcpjam/inspector

MCPJam Inspector is an open-source web-based debugging tool for testing Model Context Protocol (MCP) servers, frequently described as "Postman for MCP." Built with Next.js 15 and React 19, MCPJam provides a visual development workspace that lets developers test and validate MCP implementations without deploying them to production clients, offering comprehensive logging, visual OAuth 2.1 debugging, and an integrated LLM playground.

**Dataset ID:** other

## General Info

### Classification
- Code/Other

### Version
v0.9.30

### Repo
https://github.com/mcpjam/inspector

### Rating
1,000+ GitHub stars

### Short Description
Web-based MCP server testing and debugging tool with OAuth debugger and LLM playground

### Description
MCPJam Inspector functions as a specialized development workspace for MCP server development and testing, forked from Anthropic's official inspector to accelerate feature development and improve developer experience. The platform provides full JSON-RPC observability across STDIO, HTTP, and SSE transports, allowing developers to manually invoke MCP tools, resources, and prompts with comprehensive logging.

The OAuth Debugger provides message-level visibility into authentication processes, displaying detailed logging of JSON-RPC traffic and server logs when OAuth flows fail. It supports multiple OAuth client registration models including Dynamic Client Registration (DCR) and Client ID Metadata Documents (CIMD), allowing developers to switch between registration styles and observe behavior against the same backend configuration.

### Languages
- TypeScript
  - 94.3% TypeScript codebase

### Notes
Built with Next.js 15.4 App Router and React 19. Requires Node 22.7.5 or higher. Launched via npx @mcpjam/inspector. Backed by Open Core Ventures Catalyst program. Grew from 200 to 1,000+ GitHub stars in two months. Community of 120+ Discord members. 110 contributors. Open core business model with planned premium MCP evals for CI/CD integration.

### Last Update
2026-01-31

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- Yes
  - Fully open source with planned premium enterprise features (MCP evals)

## MCP-Client

### MCP-Client
- Yes
  - Testing tool for MCP servers, not an MCP client itself
  - Connects to and tests MCP servers via STDIO, SSE, and Streamable HTTP

### Prompts
- Yes
  - Can test MCP prompts

### Tools
- Yes
  - Can test MCP tools with manual triggering

### Resources
- Yes
  - Can test MCP resources

### ACP
- No

## Deployment

### BYOK
- Yes
  - LLM playground supports OpenAI, Anthropic Claude, and Ollama with custom API keys

### Local Offline
- Yes
  - Local development environment, can test local MCP servers

## Developer Experience

### Context Management
- Yes
  - Multi-server connection support with saved configurations

### Direct File References
- No

### Checkpoints
- No

### Git Support
- No

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- No

### Skills
- No

### Custom Modes
- Yes
  - OAuth Debugger mode for step-by-step authentication testing
  - LLM Playground mode for testing server interactions with different models

### Subagents
- No
