# DevoxxGenie - https://github.com/devoxx/DevoxxGenieIDEAPlugin
An AI assistant plugin for IntelliJ IDEA that can use both local and cloud LLMs.

## General Info

### Classification
- Code/Editor

### Version
v0.x (initial releases 2024)

### Repo
- https://github.com/devoxx/DevoxxGenieIDEAPlugin

### Rating
- [5] Strong support for local LLMs and RAG
- [4] Very useful for Java/IDEA users; UI and workflows continue improving

### Short Description
An IntelliJ IDEA plugin that embeds an LLM-powered coding assistant with support for local and cloud models, Retrieval-Augmented Generation (RAG), MCP integration, project-scoped context and multimodal inputs.

-

### Description
DevoxxGenie is an IntelliJ IDEA plugin (100% Java-based) that provides an LLM-powered coding assistant inside the IDE. It was created by Stephan Janssen and focuses on flexibility: developers can connect cloud LLMs (OpenAI, Anthropic, Mistral, Google Gemini, etc.) or run models locally (Ollama, LMStudio, GPT4All, Llama.cpp, Exo and others). Key capabilities include Retrieval-Augmented Generation (RAG) for semantic code search, a project scanner, AST-aware context inclusion, multimodal drag-and-drop for images, streaming responses, chat history stored locally, and Model Context Protocol (MCP) integration.

### Languages
- Java

### Notes
- RAG: Introduced in early releases (v0.4.0+). Uses local embeddings (e.g. Ollama + Nomic Text) and stores vectors in a local Chroma DB (often run via Docker) to provide semantic search over a project without sending source code to cloud providers.
- DEVOXXGENIE.md: The plugin can generate a DEVOXXGENIE.md project descriptor (via settings or the `/init` prompt) which is added to the system prompt to improve contextual responses.
- Multimodal: Drag-and-drop image support works with multimodal models (Google Gemini, Anthropic Claude, ChatGPT 4.x, LLaVA local models, etc.).
- Streaming: Responses stream token-by-token for an interactive feel.
- Cost Management: Includes a token cost estimator to preview input token costs when using cloud-based LLMs; remember output tokens also count toward billing.
- Requirements: Requires JDK 17+ and IntelliJ IDEA 2023.3.4+ (or compatible recent versions).
- Use cases: Code explanation, unit-test generation, code review/suggestions, natural-language code search, debugging with screenshots, and project-aware Q&A.
- Good fit for teams that need local/offline LLM execution or want flexible model selection inside IntelliJ.

### Last Update
- 2025-08-06 (v0.7.0 release)

## Licensing

### Opensource
- Yes

### License
- MIT

### FreeTrial
- Yes

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - DevoxxGenie provides built-in prompt templates and allows users to create, save and manage custom prompts via the Prompts settings page.
  - The `/init` slash command can generate a DEVOXXGENIE.md project descriptor and add it to the system prompt for improved contextual responses.

### Tools
- Yes
  - DevoxxGenie integrates RAG tooling (ChromaDB) and local model runners (Ollama, GPT4All) to provide semantic search and local LLM execution. It also supports cloud provider tools via API connectors (OpenAI, Anthropic, Gemini, etc.).

### Resources
- Yes
  - Project README and JetBrains Marketplace listing provide usage docs and release notes. Community videos and blog posts (Devoxx talks, YouTube demos) supplement official docs.

## Deployment

### BYOK
- Yes

### LocalOffline
- Yes
  - Supports running local LLM backends (Ollama, GPT4All, Llama.cpp, LMStudio, etc.) and a fully-local RAG setup via Chroma DB + embeddings.

## Developer Experience

### ContextManagement
- Yes
  - Project Scanner: include entire project, specific packages, or selected files for prompt context.
  - DEVOXXGENIE.md: generate and maintain a project descriptor that is injected into the system prompt.
  - RAG (Retrieval-Augmented Generation): local embeddings + Chroma DB for semantic retrieval of relevant code instead of sending entire codebase.
  - Chat memory configuration: configurable message history length (default ~10) stored locally.
  - Include/exclude patterns and .gitignore awareness: filter files and directories with wildcards and respect .gitignore to avoid sending irrelevant or sensitive files.
  - AST-aware context: automatic inclusion of parent class and related symbols to improve code-understanding prompts.

### DirectFileReferences
- Yes
  - Drag-and-drop files or images directly into the input field to attach them to the prompt.
  - Explicitly add open files, specific files or directories via the Project Scanner or the UI to include them in context.
  - Copy/paste code snippets into the prompt; responses preserve syntax highlighting and can reference exact file paths when applicable.

### Checkpoints
- Yes
  - While DevoxxGenie doesn't provide a built-in "checkpoint/undo" system for code edits, typical IDE workflows provide recovery: IntelliJ Local History, VCS (Git) commits and rollbacks, and saved chat history to re-run decisions.
  - Chat history stored locally allows re-opening prior conversations and re-applying previously used prompts/contexts.

### GitSupport
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - DevoxxGenie itself is a JetBrains plugin and can be extended by modifying its source or contributing upstream; it supports connectors to different model backends (local or cloud) and MCP servers.
  - Prompts, MCP connectors and embedding/RAG pipelines are the primary extensibility points exposed to users and integrators.

### Hooks
- No
  - The plugin does not expose a documented lifecycle hook system for third‑party attachments; integrations are done via MCP servers or by extending the plugin source (JetBrains plugin APIs).

### SlashCommands
- Yes
  - Supports prompt-style slash commands from the input field (notably `/init` to create a DEVOXXGENIE.md project descriptor).
  - Commands and shortcuts are entered directly in the chat input and can be combined with context selections (files, images, project scanner options).

### CustomModes
- Yes
  - DEVOXXGENIE.md + saved prompts: create project-specific prompt templates and system prompts to tailor the assistant's behaviour.
  - Per-model settings: choose different LLM providers, model parameters, memory sizes and token cost constraints to create tailored working modes.
  - UI options (RAG on/off, project scanner scope, AST context inclusion) act as mode configuration switches.

### Subagents
- Yes
  - MCP (Model Context Protocol) integration: connect to external MCP servers which act as specialized agents/subagents for tool execution and richer workflows.
  - RAG and embedding pipelines function as retrieval subagents (local embedding provider + Chroma DB) to augment generation.
  - The architecture (Langchain4J + Java) enables integration with external model servers and agent-like workflows.

