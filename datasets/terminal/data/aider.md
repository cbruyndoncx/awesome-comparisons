#Aider - https://aider.chat
Aider is the first popular AI Coding CLI, with a fairly recently added webbased gui.
Aider is a python package and frequently updated with a mass following and an active Discord community.

## General Info

### Classification
- Code/Terminal

### Version
- Unknown (2025-10-18)
  - Actively maintained open-source project; check https://github.com/Aider-AI/aider for current version

### Repo
- https://github.com/Aider-AI/aider

### Rating
- [4] Popular, actively maintained OSS CLI with a large community
- [4] Strong Git integration and multi-LLM support; good for whole-repo edits

### Short Description
A terminal-first AI pair-programming CLI (with optional browser UI) that provides repo-aware, multi-file edits, automatic Git commits, and support for multiple remote and local LLM backends.

### Description
Aider is an open-source AI pair-programming tool focused on the terminal-first developer workflow. It allows developers to chat with LLMs, make multi-file edits, run linters/tests, and commit changes automatically via Git — all from the CLI (with an optional web GUI). Aider works across languages and large codebases by building and using a code-map of the repository to provide context-aware edits. It supports multiple remote LLM providers and local models, enabling private and offline workflows.

### Languages
- Any

### Notes
- BYOK model: users supply API keys for whichever LLM provider they choose (OpenAI, Anthropic, DeepSeek, etc.), allowing control over costs and provider choice.
- Local/model support: Aider can connect to local LLMs (self-hosted or via local runtimes), enabling fully offline workflows and private model usage.
- Cost optimization: Supports prompt-caching patterns and lets you choose cheaper models or local models to reduce usage costs.
- Workflow strengths: deep Git integration (auto-commit with sensible commit messages, undo commit, diff), in-chat file management (/add, /drop), lint/test runs, and automatic retries/fixes when tests fail.
- UX features: terminal-first chat, optional web GUI, voice input, ability to ingest web pages/images for context, and pointing to CONVENTIONS.md to enforce project-specific rules.
- Installation: pip-based installer (e.g., python -m pip install aider-install; then run aider-install), then run aider in a repo with your chosen model and API key.
- Good fit for: teams wanting repo-aware AI edits, those requiring private/local model runs, developers who prefer CLI workflows and Git-backed safety for AI edits.
- Limitations/considerations: Aider is a thin orchestration layer — actual model behavior, costs, and availability depend on chosen LLM provider or local runtime; evaluate model performance and token costs for your use case before large-scale adoption.

### Last Update
- 2025-10-18

## Licensing

### Opensource
- Yes

### License
- MIT

### FreeTrial
- N/A
  - Open-source tool (permanently free); users pay their own LLM provider for API usage, not a time-limited trial

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - Supports configurable prompt templates, system-level prompts, and prompt caching to reduce costs and speed up repeated tasks.
  - Prompts can be adjusted during chat and model selection is switchable in-session.

### Tools
- Yes
  - In-chat commands and workflow tooling: runs linters/tests, shows diffs, and commits changes to Git automatically.
  - Common in-chat commands include: /add (include files), /drop (remove files from context), /model (switch model), /undo (revert last AI change), and /reasoning-effort (control model reasoning depth).

### Resources
- Yes
  - Builds a repo code-map for contextual awareness and can ingest files, folders, URLs and images to provide rich contextual resources to the model.

## Deployment

### BYOK
- Yes

### LocalOffline
- Yes
  - Supports local model usage via adapters (community integrations exist for local runtimes such as Ollama and other self-hosted LLMs)

## Developer Experience

### ContextManagement
- Yes
  - Maintains a repository code-map to provide broad context and supports targeted context injection via @file, @folder, URLs, and by adding files to the chat.
  - Supports prompt caching and selective file inclusion to manage token usage and focus the model.

### DirectFileReferences
- Yes
  - Use @file / @folder references and the in-chat /add command to include specific files or folders in the session for precise edits.

### Checkpoints
- Yes
  - Uses Git commits as checkpoints; Aider auto-commits changes with sensible messages and provides /undo and standard git tooling to revert or inspect history.

### GitSupport
- Yes

## Extensible

### Extensible
- Yes
  - Supports multiple LLM backends and local model adapters; configurable via model adapters and API-key settings

### Plugins
- No
  - No formal plugin marketplace or plugin API; extensibility is achieved through model adapters, configuration, and local runtime integrations.

### Hooks
- No
  - No documented lifecycle hooks API for third-party plugins; automation is typically handled via configuration, scripts and Git workflows.

### SlashCommands
- Yes
  - Provides reusable in-chat slash commands for workflow control (e.g., /add, /drop, /model, /undo, /reasoning-effort, /help).

### CustomModes
- Yes
  - Built-in chat modes to tailor behavior: code (direct edits), architect (design/planning), ask (questions about code), help (explain Aider features).

### Subagents
- No
  - Does not expose a named subagent framework; supports autonomous execution modes (auto-approve) but not first-class subagent definitions.

### SpecDrivenDevelopment
- No
  - Aider is a terminal-first AI pair-programming CLI, not a spec-driven development tool.

