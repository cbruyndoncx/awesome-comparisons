# Claude Code - https://claude.ai/code
Claude Code is Anthropic's command-line, agentic developer assistant that integrates Claude models into terminal workflows to help write, refactor, and manage code across repositories.

## General Info

### Classification
- Code/Terminal

### Version
v1.0 (2025-10-18)

### Repo
-

### Rating
- [4] Strong reasoning and long-context handling
- [3] Can be costly at the highest-capability model tiers
- [4] Excellent for multi-file refactors and end-to-end developer workflows

### Short Description
<!-- ToDo -->

-

### Description
Claude Code is a low-level, terminal-first developer tool from Anthropic that exposes Claude family models (Opus, Sonnet, Haiku tiers) to developer workflows. It is intentionally unopinionated and scriptable: it runs in the terminal, integrates with Git and other CLI tools, and can be wired into CI/CD, deployment systems, and custom automation. Claude Code asks permission before making file edits or running commands, and it can be configured to use Anthropic's public API, cloud-hosted model endpoints (e.g., Bedrock, Vertex AI), or organization-managed keys.

The tool is focused on large-context reasoning, multi-file code transformations, automated testing and verification, and agentic workflows where the assistant can run sequences of commands, apply patches, and validate results. It is suitable for both single developers and teams; for the latter it is offered as part of Anthropic's Team/Enterprise plans with central administration and enhanced security controls.

### Languages
- Any

### Notes
- Models: Offers multiple model tiers (commonly referenced as Opus (highest capability), Sonnet (workhorse), and Haiku (cost-efficient)). Opus is aimed at deep reasoning and large refactors; Sonnet balances cost and capability; Haiku is optimized for high-volume, lower-complexity tasks.
- Pricing: Available as seat-based subscriptions (Pro, Max tiers) and pay-as-you-go API token pricing. High-capability models (Opus) carry premium token costs; Sonnet often provides a better cost/performance tradeoff for everyday coding.
- Context window: Claude-family models marketed with very large context windows (useful for large repositories and multi-file edits).
- Platform support: macOS, Linux, Windows (CLI-first). Windows usage commonly requires Git for Windows for full CLI feature parity.
- Use cases: automated refactors, multi-file PR generation, test generation and repair, code review assistance, automated CI hooks, developer productivity automation.
- Safety & controls: interactive permission prompts, enterprise controls for data handling, and options to route through organization-managed endpoints.
- Ecosystem: community tooling and integrations exist (context engineers, wrappers, "awesome" lists) though the official product is closed-source.
- Further reading: consult the official Claude documentation at https://claude.ai/ and Anthropic's product pages for up-to-date pricing, model names, and deployment options.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Yes

## MCP-Client

### MCP-Client
- Yes

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
- Yes

### LocalOffline
- No
  - Any additional details like Ollama: Claude Code relies on remote model endpoints by default. Anthropic and enterprise customers can route requests through cloud provider-hosted model deployments, but a fully offline/local model runtime is not provided as a standard option.

## Developer Experience

### ContextManagement
<!-- ToDo -->
<!-- Methods for managing and updating the context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### DirectFileReferences
<!-- ToDo -->
<!-- Can with @file or similar provide context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Checkpoints
<!-- ToDo -->
<!-- A way to undo using checkpoints or if autocommitted git history -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### GitSupport
- Yes

## Extensible

### Extensible
- Yes

### Plugins
<!-- ToDo -->
<!-- A method of bundling together commands, agents and hooks (claude). -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Hooks
<!-- ToDo -->
<!-- Lifecycle events for the agent. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### SlashCommands
<!-- ToDo -->
<!-- Re-usable commands that can be manually triggered by the user. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### CustomModes
<!-- ToDo -->
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Subagents
<!-- ToDo -->
<!-- Define specialized AI subagents for task-specific workflows. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## Ungrouped Criteria

### Terminal
- Yes

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
