# Jan AI - https://www.jan.ai/
Open-source ChatGPT alternative that runs 100% offline on your computer with local LLM support and cloud provider integration.

**Dataset ID:** ai-chat

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
- Code/Other

### Version
<!-- Latest version used for update -->
- v0.7.6 (January 27, 2026)

### Repo
<!-- Associated Github repository -->
- https://github.com/janhq/jan

### Rating
<!-- Avg rating based on review comments -->
-

### Short Description
- Open-source ChatGPT alternative that runs 100% offline on your computer with local LLM support and cloud provider integration.

### Description
<!-- Few paragraphs about the product -->
Jan is an open-source AI platform that brings the best of open-source AI in an easy-to-use desktop application. It allows users to download and run large language models (LLMs) like Llama, Gemma, Mistral, Qwen, and thousands more from HuggingFace completely offline on their computer, with full control and privacy. Jan supports multiple inference engines including llama.cpp and TensorRT-LLM, and provides an OpenAI-compatible local API server at localhost:1337 for integration with other applications.

Beyond local models, Jan integrates seamlessly with cloud providers including OpenAI, Anthropic (Claude), Mistral, and Groq, allowing users to bring their own API keys and switch between local and remote models as needed. The platform emphasizes privacy-first architecture where everything runs locally when you want it to, while still offering flexibility to connect to cloud services when desired.

Jan features a modern, unified chat interface introduced in v0.7.6, includes the Jan V3 model optimized for faster performance and enhanced math/coding capabilities, and supports advanced features like Model Context Protocol (MCP) integration for agentic workflows, RAG-based document chat with knowledge retrieval, enhanced file attachments with improved parsing, and custom AI assistant creation with configurable parameters and instructions.

### Languages
<!-- Any or limited list of supported programming Languages -->
- Any

### Notes
- Technology stack: TypeScript (73.6%), Rust (18.8%), Tauri framework
- Inference engines: llama.cpp, TensorRT-LLM support
- OpenAI-compatible local API server at localhost:1337
- Multiple model support: HuggingFace, local, cloud providers
- Multi-step tool orchestration
- RAG knowledge retrieval system
- Enhanced file attachment handling
- Customizable model parameters (temperature, top_p, etc.)

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

### FreeTrial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
- Yes
  - Completely free and open source

## MCP-Client
<!-- Model Context Protocol support with capability details -->
- Yes
  - MCP integration for agentic workflows

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
  - Supports OpenAI, Anthropic, Groq, Mistral, and other API providers

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
- Yes
  - Can run 100% offline with local models
  - Desktop application with Docker/Kubernetes deployment options available via Jan Platform

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
- Yes
  - Configurable context windows (default 8192 tokens)
  - Remembers conversation history
  - RAG-based document retrieval

### Direct File References
<!-- Can with @file or similar provide context. -->
- Yes
  - Drag-and-drop file attachments (PDF, text)
  - Enhanced file parsing for context extraction

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
  - Extension system with core extensions
  - System monitoring
  - MCP server integration

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
  - Assistants feature for customizable AI behaviors with specific instructions and parameters

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
- No
