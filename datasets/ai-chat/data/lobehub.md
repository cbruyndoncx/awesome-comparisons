# LobeHub - https://lobehub.com
Open-source AI workspace for building, collaborating with, and managing agent teammates through multi-agent orchestration with 10,000+ MCP-compatible tools.

**Dataset ID:** ai-chat

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
- AIE/Model
- Code/Autonomous agent
- Product/Prototyping

### Version
<!-- Latest version used for update -->
- v2.1.25 (February 9, 2026)

### Repo
<!-- Associated Github repository -->
- https://github.com/lobehub/lobehub

### Rating
<!-- Avg rating based on review comments -->
- 72.1k GitHub stars

### Short Description
- Open-source AI workspace for building, collaborating with, and managing agent teammates through multi-agent orchestration with 10,000+ MCP-compatible tools.

### Description
<!-- Few paragraphs about the product -->
LobeHub is the ultimate space for work and life — to find, build, and collaborate with agent teammates that grow with you. It positions itself as a next-generation AI productivity platform that treats agents as the fundamental unit of work, enabling human-agent co-evolution. The platform has evolved from a chat interface (LobeChat) into a comprehensive workspace for multi-agent collaboration, effortless agent team design, and sophisticated workflow orchestration.

The platform offers an extensive plugin ecosystem with over 10,000 MCP-compatible tools and skills available through one-click installation via a dedicated marketplace. LobeHub supports multiple AI model providers including OpenAI, Claude, Gemini, Ollama, DeepSeek, Qwen, and many others, with both cloud-based and local LLM deployment options. Key features include branching conversations for non-linear discussions, Chain of Thought visualization for transparent AI reasoning, Artifacts support for creating SVG graphics and interactive HTML, and personal memory capabilities for continual learning.

Built with privacy and flexibility in mind, LobeHub provides comprehensive self-hosting options via Docker and Docker Compose, supports bring-your-own-key (BYOK) configurations, and offers full offline capability through Ollama integration. The platform includes advanced features like knowledge bases with RAG (Retrieval-Augmented Generation), file upload support, multi-user management, custom themes, desktop applications (Mac, Windows, Linux), PWA support, and TTS/STT voice capabilities.

### Languages
<!-- Any or limited list of supported programming Languages -->
- Any

### Notes
- 72.1k GitHub stars, 14.6k forks
- Extensive plugin ecosystem with 10,000+ MCP-compatible tools
- Supports 20+ AI provider integrations
- Multi-modal capabilities: Vision, TTS, STT, image generation
- Chain of Thought visualization
- Artifacts support (SVG graphics, interactive HTML, documents)
- New registrants receive 450,000 free compute credits
- Progressive Web App (PWA) support
- Desktop applications for Mac, Windows, Linux

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
- Apache-2.0
  - With LobeHub Community License
  - Transitioned from MIT to Apache 2.0 starting with version 1.0
  - Includes commercialization authorization supplementary clause

### FreeTrial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
- Yes
  - Free Plan with basic assistant creation, multi-device syncing, limited integrations
  - New registrants receive 450,000 free compute credits
  - Open source version can be self-hosted for free

## MCP-Client
<!-- Model Context Protocol support with capability details -->
- Yes
  - Extensive MCP marketplace at lobehub.com/mcp
  - Transport options: Streamable HTTP (web/desktop), STDIO (desktop only), SSE (deprecated)

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

### MCP-Sampling
<!-- Supports MCP LLM sampling -->
- No

### MCP-Roots
<!-- Supports MCP workspace roots -->
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
  - Supports custom API keys for various AI providers
  - Environment variable configuration for OPENAI_API_KEY and other providers
  - Custom S3 endpoints and authentication services supported

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
- Yes
  - Full Ollama integration for local LLM deployment
  - Supports running completely offline with local models
  - Docker/Docker Compose deployment for on-premises hosting
  - Pre-configured with models like Llama3, Gemma, Mistral

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
- Yes
  - Knowledge base with file upload (documents, images, audio, video)
  - RAG (Retrieval-Augmented Generation) search
  - PostgreSQL with PGVector extension for vector operations
  - Branch conversations for multi-path exploration
  - Personal memory with continual learning

### Direct File References
<!-- Can with @file or similar provide context. -->
- Yes
  - File upload and knowledge base functionality
  - Can utilize files during conversations
  - Knowledge base page creation and file management

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
- No

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
- No
  - Uses Git for development but not integrated as a user feature
  - Offers Lobe Commit CLI tool for AI-generated Gitmoji commit messages

## Extensible
<!-- Is it possible to extend or customize the system in any way -->
<!-- Extensible -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
- Yes
  - Plugin marketplace with extensive ecosystem
  - Plugin store accessible via Extension Tools → Plugin Store
  - Developers can submit plugins via PR to lobe-chat-plugins repository
  - Integration with platforms like Bilibili, Steam, and third-party services

### Hooks
<!-- Lifecycle events for the agent. -->
- No

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
- No

### Skills
<!-- Reusable skill definitions whose details are loaded on demand; only name and description are kept in context. -->
- Yes
  - Library of 10,000+ skills via MCP integration
  - One-click installation from marketplace

### CustomModes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
- No

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
- Yes
  - Agent Groups enabling parallel collaboration
  - Multi-agent orchestration as core feature
  - Agents treated as teammates with scheduling and project organization
