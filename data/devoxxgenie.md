# DevoxxGenie - https://github.com/devoxx/DevoxxGenieIDEAPlugin
An AI assistant plugin for IntelliJ IDEA that can use both local and cloud LLMs.

## Version
v0.x (initial releases 2024)

## Rating
- [5] Strong support for local LLMs and RAG
- [4] Very useful for Java/IDEA users; UI and workflows continue improving

## Repository
- https://github.com/devoxx/DevoxxGenieIDEAPlugin
  
## Languages
- Java

## Extensible
- Yes

## Description
DevoxxGenie is an IntelliJ IDEA plugin (100% Java-based) that provides an LLM-powered coding assistant inside the IDE. It was created by Stephan Janssen and focuses on flexibility: developers can connect cloud LLMs (OpenAI, Anthropic, Mistral, Google Gemini, etc.) or run models locally (Ollama, LMStudio, GPT4All, Llama.cpp, Exo and others). Key capabilities include Retrieval-Augmented Generation (RAG) for semantic code search, a project scanner, AST-aware context inclusion, multimodal drag-and-drop for images, streaming responses, chat history stored locally, and Model Context Protocol (MCP) integration.

## BYOK
- Yes

## LocalOffline
- Yes
  - Supports running local LLM backends (Ollama, GPT4All, Llama.cpp, LMStudio, etc.) and a fully-local RAG setup via Chroma DB + embeddings.

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- No

## Opensource
- Yes

## License
-

## MCPSupport
- Yes

## Notes
- RAG: Introduced in early releases (v0.4.0+). Uses local embeddings (e.g. Ollama + Nomic Text) and stores vectors in a local Chroma DB (often run via Docker) to provide semantic search over a project without sending source code to cloud providers.
- DEVOXXGENIE.md: The plugin can generate a DEVOXXGENIE.md project descriptor (via settings or the `/init` prompt) which is added to the system prompt to improve contextual responses.
- Multimodal: Drag-and-drop image support works with multimodal models (Google Gemini, Anthropic Claude, ChatGPT 4.x, LLaVA local models, etc.).
- Streaming: Responses stream token-by-token for an interactive feel.
- Cost Management: Includes a token cost estimator to preview input token costs when using cloud-based LLMs; remember output tokens also count toward billing.
- Requirements: Requires JDK 17+ and IntelliJ IDEA 2023.3.4+ (or compatible recent versions).
- Use cases: Code explanation, unit-test generation, code review/suggestions, natural-language code search, debugging with screenshots, and project-aware Q&A.
- Good fit for teams that need local/offline LLM execution or want flexible model selection inside IntelliJ.