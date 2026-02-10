# Cherry Studio - https://www.cherry-ai.com
Cross-platform AI desktop client supporting 300+ assistants and 50+ LLM providers with autonomous coding, MCP integration, and unified access to frontier models.

**Dataset ID:** ai-chat

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
- Code/Autonomous agent
- Code/Other

### Version
<!-- Latest version used for update -->
- v1.7.17 (February 6, 2026)

### Repo
<!-- Associated Github repository -->
- https://github.com/CherryHQ/cherry-studio

### Rating
<!-- Avg rating based on review comments -->
-

### Short Description
- Cross-platform AI desktop client supporting 300+ assistants and 50+ LLM providers with autonomous coding, MCP integration, and unified access to frontier models.

### Description
<!-- Few paragraphs about the product -->
Cherry Studio is an agentic AI desktop application that provides unified access to multiple Large Language Model providers, both cloud-based and local. It integrates 300+ pre-configured AI assistants and supports major LLM cloud services including OpenAI, Gemini, Anthropic, DeepSeek, Perplexity, and Poe, as well as local models through Ollama and LM Studio. The application excels in its native support for the Model Context Protocol (MCP), allowing users to extend functionality through external tools, prompts, and resources.

Cherry Studio features autonomous coding capabilities, intelligent automation, and a comprehensive knowledge base system powered by embeddings with LibSQL vector storage. It handles multiple document types (PDF, DOCX, PPTX, XLSX, TXT, MD) with preprocessing capabilities, offers WebDAV file management, and includes practical features like global search, topic management, AI-powered translation, Mermaid chart visualization, and code syntax highlighting. The application is available across Windows, macOS, and Linux platforms, with mobile versions (Android/iOS) in active development.

### Languages
<!-- Any or limited list of supported programming Languages -->
- Any

### Notes
- 300+ pre-configured AI assistants
- Multiple MCP transport mechanisms: Stdio, SSE, Modern HTTP with bidirectional streaming
- LibSQL vector storage with bge-m3 embeddings
- WebDAV file management and backup
- Planned MCP Marketplace for ecosystem expansion
- Enterprise Edition offers fully private deployment
- OpenCode CLI tool integration (v1.7.17)
- Agent workspace with autonomous coding capabilities

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
- AGPL-3.0

### FreeTrial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
- Yes
  - Completely free for personal use
  - Enterprise Edition available for businesses

## MCP-Client
<!-- Model Context Protocol support with capability details -->
- Yes
  - Native support for Model Context Protocol
  - Multi-transport support: STDIO, SSE, and Modern HTTP
  - Tools icon appears in chat interface when function calls are supported
  - Progress reporting for long-running operations

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
- Yes
  - Users can integrate their own API keys for cloud services
  - Supports multiple provider API configurations

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
- Yes
  - Supports local model integration via Ollama and LM Studio
  - Enables offline operation without cloud dependency

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
- Yes
  - Knowledge base system with semantic search
  - Documents are chunked, embedded, and retrieved to augment prompts
  - LibSQL vector storage with embeddings (bge-m3 and others)
  - Selection Assistant with smart content selection
  - Planned Memory System with global context awareness

### Direct File References
<!-- Can with @file or similar provide context. -->
- Yes
  - Drag-and-drop interface for file upload
  - Supports multiple document formats (PDF, DOCX, PPTX, XLSX, TXT, MD, MDX)
  - WebDAV file management and backup
  - URL and sitemap import for knowledge base
  - Document preprocessing capabilities

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
- No

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
- No
  - Agent workspace supports "open-in-external-editor" but no direct git features

## Extensible
<!-- Is it possible to extend or customize the system in any way -->
<!-- Extensible -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
- Yes
  - MCP server support enables tool integration
  - Context information can be decomposed into independent modules (plugins)
  - Planned MCP Marketplace
  - Mini program support
  - OpenCode CLI tool integration

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
  - 300+ pre-configured AI assistants with customizable settings
  - Users can create custom assistants with specific:
    - Model selection
    - System prompts
    - Temperature settings
    - Tool integrations
    - Custom instructions and preferences

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
- Yes
  - AI Agent + Coding Agent architecture
  - Agents execute MCP tools with permission modes (default, acceptEdits, bypassPermissions, plan)
  - Agent workspace with autonomous coding capabilities
  - Support for specialized assistants (Web Search, PDF Reader, Citation Manager, etc.)
