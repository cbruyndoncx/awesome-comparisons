# Zed - https://zed.dev
A next-generation, high-performance code editor focused on speed, real-time collaboration, and integrated AI assistance. Built in Rust with a GPU-rendered UI and a local-first philosophy for AI models.

## Version
vN/A (2025-10-19)

## Rating
- [5] Exceptional performance and responsiveness (GPU-driven UI, Rust)
- [4] Strong collaboration and AI integration, extension ecosystem still growing
  
## Repository
- https://github.com/zed-industries/zed
  
## Languages
- Any
  
## Extensible
- Yes
  - Extension registry available; growing ecosystem but smaller than VS Code's marketplace
  
## Description
Zed is a modern code editor engineered for low latency and smooth UX. It renders its UI on the GPU (GPUI approach) and is written in Rust, which together produce very fast startup, typing responsiveness, and large-file handling. Zed emphasizes real-time collaboration (multi-user editing, shared notes, chat) and tight integration with AI: an Assistant Panel for conversational, project-aware assistance and inline transformations that apply AI-suggested diffs directly in-editor. Zed also supports multibuffer editing, an integrated terminal, robust language support via Tree-sitter/WebAssembly and LSP, and a first-class Vim mode.

## BYOK
- Yes
  - Zed supports OpenAI-compatible providers and can be configured to use local LLM hosts (e.g., Ollama) so you can run models with your own keys or entirely offline.
  
## LocalOffline
- Yes
  - Zed can be configured to use local LLMs (via Ollama or other OpenAI-compatible endpoints) so prompts and code can stay on-device. It also supports running Ollama on remote GPU hosts (SSH/port-forwarding) if needed.
  
## FreeTrial
- Yes
  - The editor and source are available openly; binaries are freely downloadable. (See "Notes" about binary EULA nuance.)

## GitSupport
- Yes
  - Integrates with Git workflows; project-aware features and diagnostics help with common VCS tasks.
  
## Terminal
- Yes
  - Built-in integrated terminal and task runner.
  
## Opensource
- Yes
  - Core source available on GitHub
  
## License
- GPL-3.0 (core editor), AGPL for certain server/collab components; other crates/components may use Apache/MIT for specific parts
  
## MCPSupport
- Yes
  - MCP servers are integrated similar to other extensions like e.g. theming
  
## Notes
- Performance: Uses a GPU-first rendering approach (handcrafted shaders) and is implemented in Rust — developers report substantially lower typing latency and better handling of very large files compared with many existing editors.
- AI features: Assistant Panel exposes the full LLM request (editable) and supports slash-commands (/file, /tab, /terminal, /diagnostics, /fetch). Inline transformations let you select code and apply AI-generated diffs (accept/reject), including multiple-cursor transformations. A `/workflow` concept is being expanded for orchestrating multi-step, multi-file changes.
- Collaboration: Built-in real-time collaboration, chat, shared notes and session-aware AI so teams can co-edit with shared assistant context. Some collab components are licensed under AGPL.
- Local models & privacy: Zed supports connecting to local model hosts like Ollama; this enables on-device model usage and BYOK workflows. Zed also supports OpenAI-compatible APIs if you prefer hosted models.
- Extensions: Extension registry now exists, enabling community contributions, but the ecosystem is younger and smaller than VS Code's—growing quickly.
- Binary vs source nuance: While the source is open under GPL/AGPL, the binaries distributed from zed.dev have their own EULA and the Zed team has noted this could diverge from the source in future distributions (similar to other editor projects). Review the repo and zed.dev terms if license specifics are important for your use case.
- Good fit: Developers who prioritize low-latency editing, collaboration-first workflows, and integrated AI (especially teams wanting local model hosting) will find Zed compelling. If you depend on a very mature extension marketplace, account for that gap today.
