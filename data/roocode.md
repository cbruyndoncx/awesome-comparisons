# RooCode - https://roocode.ai
RooCode (formerly Roo Cline) is an AI-powered VS Code extension that acts as an autonomous coding assistant with customizable personas (modes), multi-model support, and project-level automation.
## Version
v3.3 (2024-10-18)
## Rating
- [4] Strong multi-mode assistant with deep VS Code integration
- [3] Experimental parts (VS Code LLM API, some provider integrations) can be rough
## Repository
- https://github.com/RooCodeInc/Roo-Code
## Languages
- TypeScript
- JavaScript
- Python
## Extensible
- Yes
  - VS Code extension architecture, custom modes, MCP (Model Context Protocol) servers, and provider/plugin integrations
## Description
RooCode is designed to be more than an autocomplete plugin — it functions as an autonomous agent inside VS Code that can read/write files, run terminal commands, automate browser interactions, and orchestrate multi-step development tasks. It exposes built-in personas (Code, Architect, Ask, Debug) and allows developers to create custom modes with tailored prompts, file restrictions, and permissions. The extension supports multiple AI providers (OpenAI, Anthropic, Google Gemini, OpenRouter and others) and can be configured to use different models for different tasks to balance cost and capability. It includes features such as cost/token tracking, auto-approve actions (optional autonomy), inline editing, and Model Context Protocol (MCP) integration for controlling external systems.
## BYOK
- Yes
## LocalOffline
- Yes
  - Can be configured to use local model runtimes via Ollama / LM Studio or other locally-hosted model endpoints (support and experience depends on provider and model compatibility). Fully offline workflows may be limited compared to cloud API usage.
## FreeTrial
- Yes
  - The extension itself is free/open-source; model usage costs depend on the API keys/providers you supply.
## GitSupport
- Yes
  - RooCode can run terminal/cli actions and operate on workspace files; many users run git commands through the integrated terminal or via custom MCP servers.
## Terminal
- Yes
  - Supports running terminal commands and automation as part of tasks and modes.
## Opensource
- Yes
## License
- Apache-2.0 
## MCPSupport
- Yes
  - MCP servers extend RooCode beyond the editor to interact with Docker, databases, browsers and other external tooling.
## Notes
- Operational modes: Code (implementation), Architect (design/architecture), Ask (Q&A/research), Debug (troubleshooting). Modes can auto-switch or be created by users.
- Provider flexibility: BYOK model lets teams choose vendors and control costs; OpenRouter is commonly supported for multi-provider access.
- Experimental VS Code Language Model API support is available, but feature parity and cost/usage visibility vary versus direct API connections.
- Cost tracking and usage reporting help teams monitor token usage across models and sessions.
- Installation: available on Visual Studio Marketplace; can also be built and installed from source (pnpm/npm workflows, build VSIX).
- Community & forks: active community forks and experimental branches exist; check the primary repo and its forks for the latest features.
- Considerations: while powerful, RooCode’s autonomy features require careful configuration (auto-approve actions, file restrictions) to avoid unintended changes. Local/offline model support exists but may require additional setup and offers different capabilities than cloud models.
