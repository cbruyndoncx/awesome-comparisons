# Aix Coder - https://www.aixcoder.com
AIXcoder (often styled aiXcoder or Aix Coder) is an AI-powered code-completion and generation assistant with a local-first design that emphasizes privacy and offline capability. It provides method-level code generation, smart completion, and code search, and integrates into popular IDEs to assist developers across languages and workflows.

## Version
(2025-10-19)

## Classification 
- Code/Editor

## Rating


## Repository
- 

## Languages
- Any

## Extensible
- Yes

## Description
AIXcoder is designed as a developer productivity tool that lives inside the IDE and can operate in local/offline mode so that source code does not leave the developer's machine. It offers context-aware code completion (single- and multi-line), method-level code generation from natural-language prompts, intelligent code search across repositories, and features intended to help with refactoring, debugging and finding relevant APIs. A key differentiator is a quantized local model (reported as a ~7B parameter model) that the vendor positions as performant enough to run on commodity hardware (e.g., laptops with ~8–16GB RAM) while delivering low-latency completions.

## BYOK


## LocalOffline
- Yes
  - AIXcoder emphasizes local/offline model operation so code and context can remain on-device. The product also offers cloud modes for extended functionality.

## FreeTrial

## GitSupport
- Yes
  - Integrates with repository search and can surface examples and API usage from GitHub/open-source code; version-control integration is part of the IDE workflow.

## Terminal

## Opensource

## License

## MCP-Client

## Notes
- Offline/local-first: One of the product's main selling points is the ability to run a quantized model locally to avoid sending source code to the cloud — appealing for privacy-sensitive and regulated environments.
- Model: Public materials reference an aiXcoder-7B model (quantized) that aims to balance capability and resource usage; vendor material claims strong benchmark performance relative to much larger models in certain code-completion tasks.
- Integrations: Official IDE integrations include VS Code, JetBrains (IntelliJ family), and Eclipse, making the tooling accessible within common developer environments.
- Features: Method-level code generation (generate a complete function from a description), multi-line/context-aware completions, code search across repos, and refactoring/debugging assistance.
- Resource profile: Because the local model is quantized, vendors indicate it can run on modest hardware (4–8GB for very small setups, better experience with 8–16GB and/or modest GPUs), though exact requirements depend on the chosen deployment mode and model precision.
- Enterprise options: There are team/enterprise offerings with custom intelligence, private deployment, and analytics for developer efficiency; details and pricing vary by vendor engagement.
- Unclear / not publicly confirmed: specific license details for the model and tooling, BYOK (bring-your-own-key) support for cloud features, explicit terminal/CLI tooling support, and whether the project or models are fully open-source. If these are critical, verify with the vendor or product documentation before selecting the tool.

## ContextManagement
- Yes
  - AIXcoder supports multiple context management approaches: local on-device inference (keeps workspace/context local), context windowing in the IDE plugin (captures nearby file contents and project context for completions), and optional cloud mode where selected context may be sent for enhanced generation.
  
## DirectFileReferences
- Yes
  - The IDE integrations surface repository and file-level examples; agent can reference files from the open repo search features and local workspace context when running locally.

## Hooks
- Yes
  - IDE plugin lifecycle hooks and model pinning enable attaching to lifecycle events (suggestion shown/accepted/rejected, telemetry emission). Enterprise/private deployments can be integrated into CI/CD to ensure deterministic suggestions.

## SlashCommands
- Yes
  - Within supported IDEs, aiXcoder exposes quick actions and command palette entries (e.g., trigger generation, search) that act like reusable commands; exact support depends on the IDE plugin.
  
## Subagents
- Yes
  - aiXcoder supports specialized workflows (search, generation, repair) that behave like subagents; enterprise/custom models or fine-tuned variants can be deployed to handle task-specific flows (e.g., network automation script generation).
  

## CustomModes

## Plugins
- Yes
  - aiXcoder bundles IDE plugins (VS Code, JetBrains, Eclipse) that package UI commands, context capture, and model inference; enterprise offerings include private bundles and integrations for internal tooling.

## Checkpoints


## SpecDrivenDevelopment

