# Aix Coder - https://www.aixcoder.com
AIXcoder (often styled aiXcoder or Aix Coder) is an AI-powered code-completion and generation assistant with a local-first design that emphasizes privacy and offline capability. It provides method-level code generation, smart completion, and code search, and integrates into popular IDEs to assist developers across languages and workflows.

## General Info

### Classification
- Code/Editor

### Version
(2025-10-19)

### Repo
-

### Rating
<!-- ToDo -->
<!-- Avg rating based on review comments -->
<!-- Provide the rating value for Rating or remove if unknown. -->
-

### Short Description
<!-- ToDo -->
-

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
- Unclear / not publicly confirmed: specific license details for the model and tooling, BYOK (bring-your-own-key) support for cloud features, explicit terminal/CLI tooling support, and whether the project or models are fully open-source. If these are critical, verify with the vendor or product documentation before selecting the tool.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
<!-- ToDo -->
<!-- Coding tool is released under opensource license -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### License
<!-- ToDo -->
<!-- Opensource specific license or Proprietary for other commercial licenses -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- MIT
- Apache-2.0
- Proprietary
- FSL
- GPL-3.0
- AGPL-3.0
- BSD-3-Clause
- ISC
- MPL-2.0
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### FreeTrial
<!-- ToDo -->
<!-- Free access (like opensource), or free (potentially limited) trial available -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## MCP-Client

### MCP-Client
<!-- ToDo -->
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Prompts
<!-- ToDo -->
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Tools
<!-- ToDo -->
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Resources
<!-- ToDo -->
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## Deployment

### BYOK
<!-- ToDo -->
<!-- Bring Your Own LLM API Key supported -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

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
<!-- ToDo -->
<!-- A way to undo using checkpoints or if autocommitted git history -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

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
<!-- ToDo -->
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Subagents
- Yes
  - aiXcoder supports specialized workflows (search, generation, repair) that behave like subagents; enterprise/custom models or fine-tuned variants can be deployed to handle task-specific flows (e.g., network automation script generation).

## Ungrouped Criteria

### Terminal
<!-- ToDo -->
<!-- Coding tool can operate in a terminal/cli environment -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### SpecDrivenDevelopment
<!-- ToDo -->
<!-- Has support for these Spec Driven Development methodologies: -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- BMAD
- SpecKit
- OpenSpec
- Tessl
- AgentOS
- ClaudeFlow
- SPARC
- SuperClaude
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
