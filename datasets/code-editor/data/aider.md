#Aider - https://aider.chat
Aider is the first popular AI Coding CLI, with a fairly recently added webbased gui.
Aider is a python package and frequently updated with a mass following and an active Discord community.
## Version
tbd (2025-10-18)
## Rating
- [4] Popular, actively maintained OSS CLI with a large community
- [4] Strong Git integration and multi-LLM support; good for whole-repo edits
## Repository
- https://github.com/Aider-AI/aider
## Languages
- Any
## Extensible
- Yes
  - Supports multiple LLM backends and local model adapters; configurable via model adapters and API-key settings
## Description
Aider is an open-source AI pair-programming tool focused on the terminal-first developer workflow. It allows developers to chat with LLMs, make multi-file edits, run linters/tests, and commit changes automatically via Git — all from the CLI (with an optional web GUI). Aider works across languages and large codebases by building and using a code-map of the repository to provide context-aware edits. It supports multiple remote LLM providers and local models, enabling private and offline workflows.
## BYOK
- Yes
## LocalOffline
- Yes
  - Supports local model usage via adapters (community integrations exist for local runtimes such as Ollama and other self-hosted LLMs)
## FreeTrial
- Yes
  - The tool itself is free/open-source (users pay the LLM provider they connect to)
## GitSupport
- Yes
## Terminal
- Yes
## Opensource
- Yes
## License
- MIT
## MCP-Client
- No
## Notes
- BYOK model: users supply API keys for whichever LLM provider they choose (OpenAI, Anthropic, DeepSeek, etc.), allowing control over costs and provider choice.
- Local/model support: Aider can connect to local LLMs (self-hosted or via local runtimes), enabling fully offline workflows and private model usage.
- Cost optimization: Supports prompt-caching patterns and lets you choose cheaper models or local models to reduce usage costs.
- Workflow strengths: deep Git integration (auto-commit with sensible commit messages, undo commit, diff), in-chat file management (/add, /drop), lint/test runs, and automatic retries/fixes when tests fail.
- UX features: terminal-first chat, optional web GUI, voice input, ability to ingest web pages/images for context, and pointing to CONVENTIONS.md to enforce project-specific rules.
- Installation: pip-based installer (e.g., python -m pip install aider-install; then run aider-install), then run aider in a repo with your chosen model and API key.
- Good fit for: teams wanting repo-aware AI edits, those requiring private/local model runs, developers who prefer CLI workflows and Git-backed safety for AI edits.
- Limitations/considerations: Aider is a thin orchestration layer — actual model behavior, costs, and availability depend on chosen LLM provider or local runtime; evaluate model performance and token costs for your use case before large-scale adoption.
