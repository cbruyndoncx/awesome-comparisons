# LibreChat - https://librechat.ai/
Self-hosted AI chat platform unifying all major AI providers with MCP support, AI Agents, Code Interpreter, and enterprise multi-user authentication.

**Dataset ID:** ai-chat

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
- AIE/Model
- Code/Other

### Version
<!-- Latest version used for update -->
- v0.8.2 (January 28, 2026)

### Repo
<!-- Associated Github repository -->
- https://github.com/danny-avila/LibreChat

### Rating
<!-- Avg rating based on review comments -->
- 33,761 GitHub stars

### Short Description
- Self-hosted AI chat platform unifying all major AI providers with MCP support, AI Agents, Code Interpreter, and enterprise multi-user authentication.

### Description
<!-- Few paragraphs about the product -->
LibreChat is a self-hosted AI chat platform that unifies all major AI providers in a single, privacy-focused interface. As an enhanced ChatGPT clone, it provides comprehensive support for DeepSeek, Anthropic, AWS, OpenAI, Azure, Groq, Mistral, OpenRouter, Vertex AI, Gemini, and many other providers. The platform is fully open source under the MIT license and designed for anyone who values control over their AI infrastructure.

The platform stands out with its implementation of Model Context Protocol (MCP), positioning it among the first platforms to fully support MCP server integration. LibreChat offers AI Agents with a no-code framework, Artifacts for creating React/HTML components and Mermaid diagrams, Code Interpreter for secure code execution in multiple languages, and custom OpenAPI Actions for dynamic tool creation. Additional features include advanced conversation search powered by Meilisearch, message threading for context control, and comprehensive file handling with multi-modal support.

LibreChat provides enterprise-ready deployment with secure multi-user authentication including OAuth2-OIDC and LDAP/AD integration, user-level API key management (BYOK), Docker-based deployment options, and preset templates for saving conversation configurations. Acquired by ClickHouse in late 2025, LibreChat remains 100% open source and actively developed with support for the latest LLM releases including OpenAI's omni-pro, Claude 4, and Grok 4.

### Languages
<!-- Any or limited list of supported programming Languages -->
- Any

### Notes
- Acquired by ClickHouse in late 2025
- Remains 100% open source despite acquisition
- Among the first platforms to fully support MCP server integration
- Docker-based deployment with support for Zeabur, Railway, Sealos, Northflank, Cloudron, and Dokploy
- Multi-transport MCP support: STDIO, SSE, and Streamable HTTP
- User-specific isolated MCP server connections for multi-user deployments

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

### FreeTrial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
- Yes
  - Open source, free to use

## MCP-Client
<!-- Model Context Protocol support with capability details -->
- Yes
  - Multi-transport support: STDIO, SSE, and Streamable HTTP
  - OAuth authentication with Authorization Code Flow with PKCE and refresh tokens
  - User-specific isolated MCP server connections
  - Dynamic context injection using placeholder-based user information
  - Custom user-provided variables for API keys and credentials
  - Domain restrictions for MCP servers
  - Configuration via librechat.yaml or smithery.ai integration

### MCP-Protocol-Version
<!-- MCP protocol version (e.g., 2025-06-18) -->
- 2025-06-18
  - Implements structured tool outputs, OAuth security, elicitation, and resource links

### MCP-Tools
<!-- Supports MCP tool execution -->
- Yes

### MCP-Prompts
<!-- Supports MCP prompt templates -->
- No

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
- Yes
  - Users can provide their own API keys through the web interface for various AI providers

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
- Yes
  - Supports local model deployment through Ollama and LM Studio integration
  - Enables fully offline operation with self-hosted models
  - Docker-based self-hosting

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
- Yes
  - Message threading/splitting for multiple conversation contexts
  - Token limit control via fileTokenLimit
  - Dynamic user context in agent memory management

### Direct File References
<!-- Can with @file or similar provide context. -->
- Yes
  - Seamless file upload and processing with multi-modal support
  - File size and MIME type filtering
  - Direct upload to supported providers without intermediate processing
  - OCR and STT support

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
- No

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
- No
  - Not explicitly documented as a built-in feature
  - Integrations possible through MCP servers and custom actions

## Extensible
<!-- Is it possible to extend or customize the system in any way -->
<!-- Extensible -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
- Yes
  - MCP servers
  - Custom OpenAPI Actions

### Hooks
<!-- Lifecycle events for the agent. -->
- No

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
- No

### Skills
<!-- Reusable skill definitions whose details are loaded on demand; only name and description are kept in context. -->
- No

### CustomModes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
- Yes
  - AI Agents provide no-code framework for creating custom assistants with specialized configurations
  - Presets system for saving conversation templates and settings

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
- Yes
  - AI Agents framework allows creation of specialized agents with tools like DALL-E-3, semantic search, calculators, file management, and code execution
