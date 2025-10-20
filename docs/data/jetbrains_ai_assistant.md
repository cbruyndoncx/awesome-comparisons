# JetBrains AI Assistant - https://www.jetbrains.com/ai/
A deeply integrated AI assistant built into JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm, CLion, DataGrip, etc.) that combines JetBrains' code understanding with selectable large language models to provide contextual chat, completions, refactorings, test and doc generation, and multi-file edits.

## Version
v2025.2 (2025-08-25)

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
