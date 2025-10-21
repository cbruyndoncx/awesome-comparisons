# JetBrains AI Assistant - https://www.jetbrains.com/ai/
A deeply integrated AI assistant built into JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm, CLion, DataGrip, etc.) that combines JetBrains' code understanding with selectable large language models to provide contextual chat, completions, refactorings, test and doc generation, and multi-file edits.

## Version
v2025.2 (2025-08-25)

## Classification 
- Code/Editor

## Rating
- [5] Deep IDE integration and strong project-aware context
- [4] Multiple model/provider support and improving local/offline options
- [3] Feature parity between cloud and local models is limited

## Repository
-

## Languages
- Java
- Kotlin
- JavaScript
- TypeScript
- Python
- C/C++
- Go
- Rust
- PHP
- Ruby
- C#
- SQL
- Shell
- Other
  - YAML, JSON, Markdown, Text

## Extensible
- Yes
  - IDE plugin surface for different JetBrains products

## Description
JetBrains AI Assistant embeds AI workflows directly inside JetBrains IDEs and leverages the IDEs' static-analysis capabilities to provide context-aware help: inline completions, whole-function generation, conversational chat that understands the open project, multi-file diffs, automated test and documentation generation, commit message suggestions, and debugging assistance. JetBrains provides a model picker and automatic model selection to balance cost, latency and accuracy. The product emphasizes workflow continuity — minimizing context switching away from the IDE — and supports both cloud providers and local model servers for privacy-sensitive environments.

## BYOK
- Yes

## LocalOffline
- Yes
  - Local model/server support (Ollama, LM Studio and any server compatible with OpenAI-style endpoints) enables offline workflows and on-device completions. JetBrains added expanded local model support in 2025, including connections to llama.cpp/LiteLLM-style hosts and code-tuned models (Qwen, DeepSeek-Coder, Mellum variants).

## FreeTrial
- Yes
  - Core inline completions and many local workflows are free. Cloud-based features may use provider credits; JetBrains changed to a credit/quota model in 2025 for cloud usage visibility.

## GitSupport
- Yes
  - Assistive features for commit messages, PR descriptions, refactor-aware changes, and multi-file edits that can be staged/reviewed in the IDE.

## Terminal
- No
  - AI Assistant is provided inside JetBrains IDE UIs; there is no native terminal-only assistant shipped as a separate TUI (some IDE features can be used alongside integrated terminals).

## Opensource
- No

## License
- Proprietary

## MCP-Client
-

## Notes
- Strong advantage: combines JetBrains' long investment in static analysis with LLMs to produce higher-quality, context-aware suggestions and safer refactorings.
- Local vs cloud trade-offs: local model support enables private/offline use but may provide a reduced feature set compared to cloud models (e.g., some agent workflows and advanced reasoning may be cloud-only).
- Enterprise: AI Pro has been bundled into some JetBrains subscription tiers (All Products Pack, dotUltimate) since 2025.1 — check licensing for org-wide access and admin quota controls.
- Model & quota transparency: 2025 updates introduced clearer credit accounting and model cost visibility to help teams manage cloud usage.
- Good fit for teams already standardized on JetBrains IDEs or for users needing strong on-device privacy controls via local model hosting.

## ContextManagement
- Yes
  - JetBrains AI Assistant supports project-aware context management. In "Codebase" mode it automatically gathers context from the open project (open files, project tree, symbols, recent commits, and selected files). Users can also manually add context items (files, folders, images, symbols, commits) via the "Add context" UI in the chat, or reference specific files/symbols using in-chat @ references. Automatic context gathering can be disabled to restrict the assistant's view.

## DirectFileReferences
- Yes
  - The assistant can reference and include specific files and folders as explicit context for a chat or agent action. Users may add files/folders to the context panel or mention them with @-style references in chat to ensure the model uses that file content. In agent mode, multi-file edits are previewed and can be applied to the working tree.

## Hooks
- No
  - No public, documented lifecycle "hooks" specific to the AI Assistant (e.g., webhooks or plugin lifecycle events tied to assistant actions) are exposed in JetBrains' public AI Assistant documentation. However, JetBrains IDEs provide a plugin SDK with listener and extension points for IDE events, so plugin authors can hook into IDE lifecycle events and potentially integrate with or extend AI workflows via the general plugin API.

## SlashCommands
- No
  - There is no widely-documented, global "slash command" mechanic inside JetBrains AI Chat analogous to chat-platform slash commands. Users invoke functionality through the chat UI, mode selection (Chat vs Agent), context buttons, and model/option menus rather than typed slash commands. Some quick actions (e.g., apply suggestion, accept completion, run tests) are exposed as UI controls rather than textual slash commands.

## Subagents
- Yes
  - JetBrains provides an autonomous "agent" capability (often referenced as Junie or Agent mode) that can plan and execute multistep tasks: run tests or terminal commands, make multi-file edits, and report progress. This functions as a specialized subagent for complex workflows where the assistant performs a sequence of actions with user review points.

## CustomModes
- No
  - The product exposes distinct interaction modes (Chat mode and Agent/Autonomous mode) and allows selecting different model providers and configurations (cloud vs local models). However, there is no publicly-documented facility for end-users to create arbitrary custom "modes" beyond the provided chat/agent workflows and model/configuration choices.
  

## Plugins
- Yes
  - JetBrains IDEs support a rich plugin ecosystem. AI Assistant itself is delivered as IDE-integrated functionality and can interoperate with other plugins. Plugin authors can use the IntelliJ Platform plugin SDK to extend IDE behavior, integrate model endpoints, or build complementary tooling that works alongside the AI Assistant.

## Checkpoints
- Yes
  - The assistant supports review-before-apply for generated edits (preview diffs). Users can accept or reject changes. Additionally, JetBrains IDEs provide VCS integration (Git) and Local History, enabling undo/revert of applied changes even if the assistant makes edits. These mechanisms together act as checkpoints for recovery.

## SpecDrivenDevelopment
- Other
  - None specific: JetBrains AI Assistant is not tied to a named spec-driven development framework in public documentation. It integrates with IDE workflows rather than prescribing a particular spec-driven development methodology.
