# Tabby - https://tabby.tabbyml.com
An open-source, self-hosted AI coding assistant for local code completion and chat.

## Version
v0.x (2025-10-19)

## Classification 
- Code/Editor

## Rating
- [4] Strong privacy and self-hosting features (good for sensitive codebases)
- [4] Good IDE integration and model flexibility, still maturing UX compared to large commercial offerings
  
## Repository
- https://github.com/TabbyML/tabby
  
## Languages
- Rust
- TypeScript
- JavaScript
- Python
- Shell

## Extensible
- Yes

## Description
Tabby is a self-hosted, open-source AI coding assistant that provides code completion, conversational code chat, and repository-aware suggestions. It is designed to run on your infrastructure (local machine, private cloud, or hosted VMs) and supports multiple LLM backends (e.g., CodeLlama, StarCoder, Ollama-managed models). Tabby focuses on data sovereignty, low-latency completions via adaptive caching and Tree-sitter based context extraction, and editor integrations (VS Code, Neovim/Vim, etc.).

## BYOK
- Yes

## LocalOffline
- Yes
  - Can run fully offline/self-hosted (Docker, from-source). Supports connecting to local model servers such as ollama/llama.cpp backends or on-prem inference stacks. 

## FreeTrial
- No
  - Community edition is free & open-source; Team/Enterprise tiers exist commercially for additional features/support.

## GitSupport
- Yes

## Terminal
- Yes
  - Server and agent provide CLI tools; Docker image and direct binary available for server usage.

## Opensource
- Yes

## License
- Apache License 2.0

## MCP-Client
- Yes

## Notes
- Self-hosted alternative to cloud assistants (e.g., Copilot) with emphasis on privacy and repository context.
- Works with a variety of model backends and allows teams to "bring your own model" or provider (BYOM/BYOK).
- Provides IDE integrations (official and community) for VS Code, Neovim/Vim, and other editors.
- Quickstart via Docker for local GPU-enabled deployments; building from source requires Rust and native deps.
- Community edition = Apache-2.0 licensed; Team/Enterprise editions add commercial capabilities.
- Best experience with access to GPU-backed inference or fast local model runners; smaller models usable for lightweight setups.
