# Raycast - https://www.raycast.com
Productivity launcher with integrated AI chat supporting 32+ models, MCP protocol, and extensive extension ecosystem.

**Dataset ID:** ai-chat

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
- Code/Other

### Version
<!-- Latest version used for update -->
- v1.104.5 (February 9, 2026)

### Repo
<!-- Associated Github repository -->
- https://github.com/raycast/extensions
  - Extensions are MIT licensed; core app is proprietary

### Rating
<!-- Avg rating based on review comments -->
- 7,152 GitHub stars (extensions repository)

### Short Description
- Productivity launcher with integrated AI chat supporting 32+ models, MCP protocol, and extensive extension ecosystem.

### Description
<!-- Few paragraphs about the product -->
Raycast is a powerful productivity launcher for macOS (with Windows beta available) that combines system-wide shortcuts, built-in tools, and AI capabilities in a unified, keyboard-first interface. Raycast AI provides access to over 32 AI models from providers including OpenAI, Anthropic, Perplexity, Mistral, Google, and xAI, all accessible through a single chat interface.

The platform's AI capabilities include virtual assistant functionality for coding and writing, Quick AI for web search integration, and an automation assistant for creating custom AI commands. Users can chat with PDF documents, CSV files, and screen content, with seamless context management through attachments. Raycast supports both cloud-based AI through multiple providers and local offline models via Ollama integration for complete privacy.

Raycast implements the Model Context Protocol (MCP) as of version 1.98.0 (May 2025), enabling users to install and @-mention MCP servers in Quick AI, AI Chat, and custom presets. The platform includes a comprehensive MCP Registry extension for discovering official and community servers, making it easy to connect AI to external services and data sources. With support for BYOK (Bring Your Own Key) across Anthropic, Google, OpenAI, and OpenRouter, users maintain control over their API costs and data flow while accessing Raycast's unified interface.

### Languages
<!-- Any or limited list of supported programming Languages -->
- Any

### Notes
- 32+ AI models in single interface
- Model comparison mid-chat
- Always-on ChatGPT-style assistant
- 2,899+ contributors to extension ecosystem
- Thousands of community extensions in Raycast Store
- Integration with 100+ third-party apps (Linear, Slack, GitHub, Notion, etc.)
- Visual low-code editor (Postman Flows) for AI experimentation
- Experimental Ollama tool calling support
- Platform: macOS 13+ (primary), Windows (beta), iOS (in development)
- MCP Registry extension for server discovery

### Last Update
<!-- Note Date last updated -->
- February 9, 2026

## Licensing
<!-- Licensing -->
### Opensource
<!-- Is this released under opensource license -->
- No
  - Extensions are MIT licensed
  - Core app is proprietary

### License
<!-- Opensource specific license or Proprietary for other commercial licenses -->
- Proprietary
  - Extensions: MIT

### FreeTrial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
- Yes
  - Free tier: Core features + 50 AI messages (free forever)
  - Pro trial: 14-day free trial (does not include Advanced AI models)

## MCP-Client
<!-- Model Context Protocol support with capability details -->
- Yes
  - Added in Raycast v1.98.0 (May 8, 2025)
  - @-mention MCP servers in root search, AI Commands, AI Chat, and Presets
  - Registry extension for discovering official and community servers
  - Compatible with Claude and Cursor MCP server ecosystems
  - Deeplink installation: raycast://mcp/install?<config>

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
- Yes
  - listChanged: true

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
  - Supported providers: Anthropic, Google, OpenAI, OpenRouter
  - Note: Requests (except OpenRouter) processed through Raycast servers for API unification
  - BYOK usage may cost more than Raycast Pro subscription

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
- Yes
  - Ollama integration for local model execution
  - Access to 100+ local AI models
  - Experimental tool calling support
  - Complete privacy with local-only data storage

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
- Yes
  - File attachments (PDF, CSV, etc.)
  - Screen content integration
  - Dynamic placeholders in prompts
  - @-mention context injection via MCP servers and AI Extensions

### Direct File References
<!-- Can with @file or similar provide context. -->
- Yes
  - Chat with PDF documents and CSV files
  - Attachment system for providing context

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
- No

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
- No

## Extensible
<!-- Is it possible to extend or customize the system in any way -->
<!-- Extensible -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
- Yes
  - Thousands of community extensions in Raycast Store
  - MIT-licensed extension SDK
  - 2,899+ contributors
  - Categories: productivity, engineering, design, writing, time management

### Hooks
<!-- Lifecycle events for the agent. -->
- No

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
- Yes
  - Custom AI Commands with natural language
  - AI Extensions with @-mention support
  - Pre-configured command templates

### Skills
<!-- Reusable skill definitions whose details are loaded on demand; only name and description are kept in context. -->
- No

### CustomModes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
- Yes
  - AI Chat Presets for task-specific customization
  - Fine-tuned chat configurations

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
- No
