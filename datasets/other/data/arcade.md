# Arcade - https://arcade.dev
Enterprise MCP runtime platform enabling AI agents to securely perform real-world actions through OAuth-protected APIs, tools, and integrations.

**Dataset ID:** other

## General Info

### Classification
- Code/Other
- Product/Prototyping

### Version
v2.0.9 (arcade-mcp)

### Repo
https://github.com/ArcadeAI/arcade-mcp

### Rating
804 GitHub stars

### Short Description
Enterprise MCP runtime platform enabling AI agents to securely perform real-world actions through OAuth-protected APIs, tools, and integrations.

### Description
Arcade is a Model Context Protocol (MCP) runtime designed to bridge the gap between conversational AI and actionable systems. It serves as an enterprise-ready intermediary layer that securely connects AI agents to MCPs, APIs, data sources, and external services, enabling agents to perform real-world actions on behalf of users. The platform handles complex authentication flows including OAuth 2.1, manages granular agent-level permissions, and provides comprehensive monitoring, logging, and evaluation capabilities built for production deployment.

The platform offers 100+ pre-built, battle-tested integrations for popular services including Gmail, Slack, GitHub, Google Calendar, Spotify, and many others. Arcade's URL elicitation capability enables MCP servers to provide users with secure login pages where users authenticate directly with services, granting agents only the limited permissions required. This authentication-first architecture ensures AI agents can access tools as the end user while maintaining security and compliance standards essential for enterprise use.

Arcade's MCP implementation supports the new streamable HTTP transport protocol, allowing developers to seamlessly combine MCP tools and Arcade's tools in their AI applications. The platform works with all major LLM providers and agent frameworks including LangChain, OpenAI Agents, CrewAI, and others. Developers can build custom integrations using Arcade's open-source SDK (arcade-mcp) or leverage the platform's Cloud service, with options for fully on-premises Kubernetes deployments via Helm charts for enterprises requiring data sovereignty.

### Languages
- TypeScript
- Python
- JavaScript
- Go

### Notes
100+ pre-built toolkits for Gmail, Slack, GitHub, Google Calendar, Figma, Linear, Ashby, PagerDuty, Atlassian suite. MCP Gateways feature to federate tools from multiple MCP servers. Arcade Evals for automated benchmarking. Supports STDIO, SSE, and Streamable HTTP transports. Gateway Assistant at https://ctl.arcade.dev/mcp. Free tier includes $76/month in value.

### Last Update
2026-02-06

## Licensing

### Opensource
- Yes
  - arcade-mcp SDK is MIT licensed
  - arcade-js is Apache-2.0

### License
- MIT
- Apache-2.0

### Free Trial
- Yes
  - Free tier: $76/month in value included (100 user challenges, 1,000 standard tool executions, 50 pro tool executions, 1 Arcade-hosted worker, up to 5 self-hosted workers)

## MCP-Client

### MCP-Client
- Yes
  - Enterprise MCP runtime platform

### Prompts
- No

### Tools
- No

### Resources
- No

### Elicitation
- Yes
  - URL elicitation for secure OAuth 2.1 flows

### ACP
- No

## Deployment

### BYOK
- Yes
  - BYOC (Bring Your Own Credentials) support
  - Supports custom API keys for LLM providers (OpenAI, Anthropic Claude, Ollama)
  - For Pro tools: provide your own API keys/credentials to avoid shared rate limits
  - Reduces cost to $0.01 per execution when using BYOC

### Local Offline
- Yes
  - Fully on-premises deployments via Kubernetes (1.30+)
  - Tested on AKS, GKE, and EKS
  - Hybrid deployment: connect on-premises MCP servers to Arcade Cloud
  - Helm chart and Docker images available

## Developer Experience

### Context Management
- Yes
  - Projects organize MCP servers, tools, and secrets
  - Multi-server connection support

### Direct File References
- No

### Checkpoints
- No

### Git Support
- Yes
  - GitHub integration toolkit available

## Extensible

### Plugins
- Yes
  - Custom tool SDK with arcade-mcp framework
  - 100+ pre-built toolkits

### Hooks
- No

### SlashCommands
- No

### Skills
- No

### CustomModes
- No

### Subagents
- No
