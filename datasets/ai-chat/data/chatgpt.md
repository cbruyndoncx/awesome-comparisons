# ChatGPT - https://chatgpt.com
OpenAI's flagship conversational AI interface providing access to GPT models with web browsing, file analysis, code execution, image generation, and MCP protocol support for extensible integrations.

**Dataset ID:** ai-chat

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
- AIE/Model

### Version
<!-- Latest version used for update -->
- GPT-5.2 (January 2026)
  - GPT-5.2 Instant for high-volume fast responses
  - GPT-5.2 Thinking for deeper reasoning
  - GPT-5.3-Codex running 25% faster

### Repo
<!-- Associated Github repository -->
- None (proprietary service)
  - Community projects and reverse-engineered APIs exist
  - Official ChatGPT code not released by OpenAI

### Rating
<!-- Avg rating based on review comments -->
-

### Short Description
- OpenAI's flagship conversational AI interface providing access to GPT models with web browsing, file analysis, code execution, image generation, and MCP protocol support for extensible integrations.

### Description
<!-- Few paragraphs about the product -->
ChatGPT is OpenAI's primary conversational AI platform, offering tiered access to the GPT model family including GPT-5.2 Instant and GPT-5.2 Thinking variants. The platform provides a comprehensive suite of capabilities including advanced web browsing with source citations, extensive file upload support (up to 512 MB per file, 2 million tokens for text documents, 10 GB total storage), code interpreter functionality, DALL-E image generation, and voice interaction features.

The interface supports sophisticated context management through Projects, which maintain workspace-specific memory and file associations separate from general conversations. Memory features include both user-approved saved memories that persist across sessions and temporary chat modes for privacy-sensitive queries. ChatGPT 2026 introduces visual-first responses with highlighted key facts, conversation branching to explore alternative paths without losing original threads, and ChatGPT Health - a dedicated HIPAA-compliant space for health-related conversations with secure integration of medical records and wellness apps.

The platform now provides full Model Context Protocol (MCP) support through Developer Mode, enabling custom connectors for both read and write actions with Server-Sent Events, streaming HTTP protocols, and OAuth authentication. The extensibility ecosystem includes GPTs (custom AI assistants), custom actions via API schemas, and MCP Apps that return interactive UI components directly in conversations. Enterprise features include SSO, admin controls, shared workspaces, and API access through both a Responses API with reasoning controls and a Conversations API for durable threads.

### Languages
<!-- Any or limited list of supported programming Languages -->
- Any

### Notes
- Ad-supported free and Go tiers (Plus/Pro/Business/Enterprise remain ad-free)
- Multi-device access (web, iOS, Android, desktop apps)
- API access for developers
- Enterprise SSO and admin controls
- ChatGPT Health (HIPAA-compliant health conversations)
- Visual-first responses with highlighted key information
- Conversation branching preserves original threads while exploring alternatives

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
  - Free tier: GPT-4o-mini access, 10 messages per 5 hours, file/image uploads, basic web browsing, GPT Store access
  - Plus tier: 7-day free trial
  - Business: 14-day free trial

## MCP-Client
<!-- Model Context Protocol support with capability details -->
- Yes
  - Full MCP support available through Developer Mode (beta feature)
  - Connectors via Settings > Connectors > Advanced > Developer Mode

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
  - ChatGPT uses OpenAI's infrastructure exclusively
  - No documented support for third-party model providers

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
- No
  - Cloud-based service requiring internet connectivity
  - No local/offline deployment options available

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
- Yes
  - Projects feature maintains workspace-specific context and memory
  - Conversation-level memory that persists across sessions
  - Temporary chat mode for privacy-sensitive queries
  - GPT-4.1 family supports up to 1,000,000 tokens of context
  - File storage up to 10 GB per user
  - Project memory keeps conversations self-contained

### Direct File References
<!-- Can with @file or similar provide context. -->
- Yes
  - File uploads supported (up to 512 MB per file)
  - Text/documents support ~2 million tokens
  - Images up to 20 MB
  - Spreadsheets (CSV/XLSX) can exceed millions of tokens
  - Files can be attached to conversations and referenced throughout

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
- Yes
  - Conversation branching allows exploring new ideas without losing original threads
  - Branched chats preserved in project workspace
  - Can restore earlier conversation states

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
- No
  - No native Git integration
  - Community tools and GitHub Action integrations available
  - Custom GPTs can connect to GitHub API via custom actions

## Extensible
<!-- Is it possible to extend or customize the system in any way -->
<!-- Extensible -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
- Yes
  - GPT Store with custom AI assistants
  - Custom actions via API schemas (OpenAPI specification)
  - MCP Apps support interactive UI components
  - Custom connectors through MCP protocol

### Hooks
<!-- Lifecycle events for the agent. -->
- No

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
- No
  - Interaction through natural language only

### Skills
<!-- Reusable skill definitions whose details are loaded on demand; only name and description are kept in context. -->
- No
  - Skills are a Claude-specific feature

### CustomModes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
- Yes
  - GPTs provide specialized modes for specific tasks
  - Custom system prompts and configurations
  - Task-specific knowledge and capabilities

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
- No
  - GPTs operate as separate specialized assistants but not as coordinated subagents
