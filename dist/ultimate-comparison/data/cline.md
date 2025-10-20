# Cline - https://cline.bot
Cline is an open-source AI coding assistant implemented as a Visual Studio Code extension that provides file editing, terminal execution, browser automation, and customizable tool integrations to help developers perform multi-step development tasks with a human-in-the-loop workflow.
## Version

## Rating
- [5] Strong AI-assisted workflows and tool integrations
- [4] Requires external model/API keys (BYOK) which gives flexibility but adds setup
- [4] Powerful features (browser automation, checkpoints) but depends on model capabilities
## Repository
- https://github.com/cline/cline
## Languages
- Any 
## Extensible
- Yes
  - VS Code extension plus MCP (Model Context Protocol) support for custom tools
## Description
Cline is designed to act as a development partner rather than a simple autocomplete. It can create and edit files with diff previews, run terminal commands, launch browsers and interact with pages (for testing or debugging), and install or use custom MCP tools. It keeps a structured memory bank (projectbrief.md, activeContext.md, progress.md) and uses checkpointing to snapshot steps so users can compare or restore states. Work is performed in a human-in-the-loop manner: Cline proposes changes and requests confirmation before saving.
## BYOK
- Yes
## LocalOffline
- Yes
  - Any additional details like Ollama: supports local model hosts (Ollama, LM Studio) as backends for offline/local use
## FreeTrial
- Yes
## GitSupport
- No
## Terminal
- Yes
## Opensource
- Yes
## License
- MIT
## MCP-Client
- Yes
## Notes
- Supports multiple model providers (Anthropic Claude, OpenAI, Google Gemini, AWS Bedrock, and local hosts via Ollama/LM Studio).
- Provides plan & act modes to separate strategic planning from implementation.
- Checkpoint management lets you create snapshots at each step and restore or compare previous states.
- Can run dev servers (e.g., `npm run dev`), detect linter/compile errors, and assist with fixes.
- Memory bank files persist structured context across sessions to help the assistant retain project knowledge.
- Uses a usage-based model where you supply API keys (BYOK) and pay providers directly.
- Good fit for developers wanting an integrated AI assistant inside VS Code with extensible tooling and local model support.