# Aix Coder - https://www.aixcoder.com
AIXcoder (often styled aiXcoder or Aix Coder) is an AI-powered code-completion and generation assistant with a local-first design that emphasizes privacy and offline capability. It provides method-level code generation, smart completion, and code search, and integrates into popular IDEs to assist developers across languages and workflows.

## General Info

### Classification
- Code/Editor

### Version
- Unknown (last checked 2025-10-19)
  - No public version number documented; check vendor site for current release

### Repo
-

### Rating
- [4] Strong local-first/privacy design with offline model capability
- [3] Good IDE integration (VS Code, JetBrains, Eclipse)
- [3] Limited public documentation compared to major competitors

### Short Description
- AI-powered code completion and method-level code generation assistant with local-first (offline) model support and IDE integrations.

### Description
AIXcoder is designed as a developer productivity tool that lives inside the IDE and can operate in local/offline mode so that source code does not leave the developer's machine. It offers context-aware code completion (single- and multi-line), method-level code generation from natural-language prompts, intelligent code search across repositories, and features intended to help with refactoring, debugging and finding relevant APIs. A key differentiator is a quantized local model (reported as a ~7B parameter model) that the vendor positions as performant enough to run on commodity hardware (e.g., laptops with ~8–16GB RAM) while delivering low-latency completions.

### Languages
- Any

### Notes
- Offline/local-first: One of the product's main selling points is the ability to run a quantized model locally to avoid sending source code to the cloud — appealing for privacy-sensitive and regulated environments.
- Model: Public materials reference an aiXcoder-7B model (quantized) that aims to balance capability and resource usage; vendor material claims strong benchmark performance relative to much larger models in certain code-completion tasks.
- Integrations: Official IDE integrations include VS Code, JetBrains (IntelliJ family), and Eclipse, making the tooling accessible within common developer environments.
- Features: Method-level code generation (generate a complete function from a description), multi-line/context-aware completions, code search across repos, and refactoring/debugging assistance.
- Resource profile: Because the local model is quantized, vendors indicate it can run on modest hardware (4–8GB for very small setups, better experience with 8–16GB and/or modest GPUs), though exact requirements depend on the chosen deployment mode and model precision.
- Enterprise options: There are team/enterprise offerings with custom intelligence, private deployment, and analytics for developer efficiency; details and pricing vary by vendor engagement.
- Unclear / not publicly confirmed: specific license details for the whole product, BYOK (bring-your-own-key) support for cloud features, explicit terminal/CLI tooling support across all distributions, and whether every component is fully open-source. If these are critical, verify with the vendor or product documentation before selecting the tool.

### Last Update
- 2025-10-19

## Licensing

### Opensource
- No
  - aiXcoder's commercial product is proprietary; however, the aiXcoder-7B model code and weights are published on GitHub under an open-source license (see notes).

### License
- Proprietary
  - aiXcoder product/distribution is commercially licensed.
  - Note: The aiXcoder-7B model repository is available under Apache-2.0 (model code and weights) on GitHub.

### FreeTrial
- Yes
  - Some distribution channels and IDE marketplace entries list free access or free tiers for the plugin; enterprise features are commercial. Confirm current trial/pricing on the vendor site or marketplace.

## MCP-Client

### MCP-Client
- Unknown
  - No public documentation found regarding MCP (Model Context Protocol) support; primarily focuses on local model inference
### Prompts
- Yes
  - Supports natural-language prompts for method-level generation and NL-to-code workflows.

### Tools
- Yes
  - IDE plugins for VS Code, JetBrains, and Eclipse; local inference tooling and quantization examples available in model repositories.

### Resources
- Yes
  - Official documentation, IDE marketplace entries, and a public GitHub repository for aiXcoder-7B (model and usage examples).

## Deployment

### BYOK
- Unknown
  - Local-first model runs offline without API keys; BYOK for cloud features not publicly documented
### LocalOffline
- Yes
  - AIXcoder emphasizes local/offline model operation so code and context can remain on-device. The product also offers cloud modes for extended functionality.

## Developer Experience

### ContextManagement
- Yes
  - AIXcoder supports multiple context management approaches: local on-device inference (keeps workspace/context local), context windowing in the IDE plugin (captures nearby file contents and project context for completions), and optional cloud mode where selected context may be sent for enhanced generation.

### DirectFileReferences
- Yes
  - The IDE integrations surface repository and file-level examples; agent can reference files from the open repo search features and local workspace context when running locally.

### Checkpoints
- No
  - No built-in checkpoint/undo system documented; use standard IDE local history or git for rollback
### GitSupport
- Yes
  - Integrates with repository search and can surface examples and API usage from GitHub/open-source code; version-control integration is part of the IDE workflow.

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - aiXcoder bundles IDE plugins (VS Code, JetBrains, Eclipse) that package UI commands, context capture, and model inference; enterprise offerings include private bundles and integrations for internal tooling.

### Hooks
- Yes
  - IDE plugin lifecycle hooks and model pinning enable attaching to lifecycle events (suggestion shown/accepted/rejected, telemetry emission). Enterprise/private deployments can be integrated into CI/CD to ensure deterministic suggestions.

### SlashCommands
- Yes
  - Within supported IDEs, aiXcoder exposes quick actions and command palette entries (e.g., trigger generation, search) that act like reusable commands; exact support depends on the IDE plugin.

### CustomModes
- Yes
  - Supports local vs cloud mode, different model configurations, and enterprise custom models for specialized workflows
### Subagents
- Yes
  - aiXcoder supports specialized workflows (search, generation, repair) that behave like subagents; enterprise/custom models or fine-tuned variants can be deployed to handle task-specific flows (e.g., network automation script generation).

