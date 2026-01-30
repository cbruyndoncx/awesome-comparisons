# CodeCompanion.ai - https://codecompanion.ai
A desktop AI coding assistant that exposes a ChatGPT-powered chatbot for working with code locally, executing shell commands, interacting with Git, and performing database queries.

## General Info

### Classification
- Product/Prototyping

### Version
- v7.0.45 (2025-06-01)
  - Major prior release: v6.4 (2025-01-22). Reworked chat context system, LLM Apply system, grep search tool, undo/checkpoint functionality

### Repo
- N/A
  - Proprietary desktop application; no public repository found

### Rating
- [4] Strong local-first privacy with BYOK model; autonomous agentic codebase understanding; 10,000+ users
- [3] Niche desktop tool with limited public documentation and no formal plugin/extension system

### Short Description
A desktop, local-first AI coding assistant (chat-driven) that reads and edits local code, runs shell commands, integrates with Git, and can translate natural language to SQL.

### Description
CodeCompanion.ai (desktop) is described in third-party write-ups as a local-first AI coding assistant powered by OpenAI's ChatGPT. It provides a chat interface that can read and reason about a user's codebase, generate and update files, run shell commands, assist with project setup and dependency installation, and translate natural language to SQL for database queries. The application emphasizes developer productivity by automating repetitive tasks and allowing commands to be executed from within the app.

### Languages
- Any

### Notes
- Privacy: Multiple sources emphasize a local-first design where code and data remain on the user's machine; network calls appear limited to OpenAI API usage.
- Features reported: semantic code search, natural-language-to-SQL, integrated terminal, Git integration, project scaffolding, file creation and updates, ability to execute shell commands and read outputs.
- Pricing/details: I could not find an official pricing page or clear subscription tiers in the public third-party descriptions. The vendor appears to support BYOK (use your OpenAI API key), which means costs for model usage are borne by the user via their OpenAI account.
- Open-source status: No authoritative indication that the desktop app is open source. There is an unrelated community project named codecompanion.nvim (a Neovim plugin) on GitHub; do not confuse the two.
- Documentation: Public, authoritative documentation or an official product site with detailed specs/pricing was not discovered in the sources I reviewed. Recommend checking the vendor domain (https://codecompanion.ai) and any official docs or contact channels for the latest details before deployment or purchase.
- Research summary based on multiple third-party write-ups and product summaries; authoritative vendor documentation and pricing were not found in the search results available.
- 2025-2026 updates: v7.0.45 released June 2025. Reworked chat context system to align with LLM format expectations, fixing infinite looping and invalid tool call issues. LLM Apply system replaces diff-based changes with cursor-style methodology using separate cheaper model for applying changes. Grep search tool added. Project-wide undo/checkpoint functionality. Better embeddings for code search and file suggestions. o3-mini model support. Auto-linting for 14+ languages. Over 10,000 users.

### Last Update
- 2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary
  - No authoritative public source indicates an open-source license or public repository for the desktop product; third-party write-ups describe it as a proprietary desktop application.

### Free Trial
- Other (BYOK model)
  - Requires user's own OpenAI API key (BYOK); no product-provided trial, but usage cost depends on user's OpenAI quota rather than vendor subscription

## MCP-Client

### MCP-Client
- No
  - The desktop product is described as running locally and making API calls to OpenAI using the user's key (BYOK). There is no documentation indicating a built-in MCP client connecting to external MCP servers.

### Prompts
- Yes
  - Chat-based prompt interface: natural-language prompts are the primary interaction model for coding tasks, code edits, and queries.

### Tools
- Yes
  - Built-in tools reported include: terminal/shell execution, Git integration, file-system access, and natural-language-to-SQL database querying.

### Resources
- Yes
  - Integrated resources reported: embedded terminal, browser/preview for documentation, and the ability to scan and index local project files for context.

### ACP
- No

## Deployment

### BYOK
- Yes

### Local Offline
- No
  - All user data (code, DBs, etc.) is described as being stored locally on the user's machine, but the assistant makes API calls to OpenAI for model inference — so it is not fully offline.

## Developer Experience

### Context Management
- Yes
  - Reported features include dynamic context management: project scanning, selective file inclusion/exclusion, and optimisations to reduce token usage for large codebases.

### Direct File References
- Yes
  - The assistant can open and reference local files directly and include file contents into the chat context for targeted edits and reasoning.

### Checkpoints
- Yes
  - Git integration is reported; users can rely on repository history/checkouts as checkpoints. An explicit in-app checkpoint UI is not documented in publicly-available third-party write-ups.

### Git Support
- Yes

## Extensible

### Plugins
- No
  - No public documentation found regarding plugin extensibility

### Hooks
- No
  - No public documentation found regarding lifecycle hooks or event system

### SlashCommands
- No
  - Chat-based interface is primary interaction method; no slash command support documented

### Custom Modes
- No
  - No public documentation found regarding user-definable custom modes


### Subagents
- Yes
  - Third-party summaries and release notes report parallel multi-agent research/task execution capabilities to allow the assistant to research and plan across a project before executing tasks.

