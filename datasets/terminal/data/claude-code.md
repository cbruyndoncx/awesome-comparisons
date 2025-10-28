# Claude Code - https://claude.ai/code
Claude Code is Anthropic's command-line, agentic developer assistant that integrates Claude models into terminal workflows to help write, refactor, and manage code across repositories.
## Version
v1.0 (2025-10-18)
## Rating
- [4] Strong reasoning and long-context handling
- [3] Can be costly at the highest-capability model tiers
- [4] Excellent for multi-file refactors and end-to-end developer workflows
## Repository
- 
## Languages
- Any
## Extensible
- Yes
## Description
Claude Code is a low-level, terminal-first developer tool from Anthropic that exposes Claude family models (Opus, Sonnet, Haiku tiers) to developer workflows. It is intentionally unopinionated and scriptable: it runs in the terminal, integrates with Git and other CLI tools, and can be wired into CI/CD, deployment systems, and custom automation. Claude Code asks permission before making file edits or running commands, and it can be configured to use Anthropic's public API, cloud-hosted model endpoints (e.g., Bedrock, Vertex AI), or organization-managed keys.

The tool is focused on large-context reasoning, multi-file code transformations, automated testing and verification, and agentic workflows where the assistant can run sequences of commands, apply patches, and validate results. It is suitable for both single developers and teams; for the latter it is offered as part of Anthropic's Team/Enterprise plans with central administration and enhanced security controls.
## BYOK
- Yes
## LocalOffline
- No
  - Any additional details like Ollama: Claude Code relies on remote model endpoints by default. Anthropic and enterprise customers can route requests through cloud provider-hosted model deployments, but a fully offline/local model runtime is not provided as a standard option.
## FreeTrial
- Yes
## GitSupport
- Yes
## Terminal
- Yes
## Opensource
- No
## License
- Proprietary
## MCP-Client
- Yes
## Notes
- Models: Offers multiple model tiers (commonly referenced as Opus (highest capability), Sonnet (workhorse), and Haiku (cost-efficient)). Opus is aimed at deep reasoning and large refactors; Sonnet balances cost and capability; Haiku is optimized for high-volume, lower-complexity tasks.
- Pricing: Available as seat-based subscriptions (Pro, Max tiers) and pay-as-you-go API token pricing. High-capability models (Opus) carry premium token costs; Sonnet often provides a better cost/performance tradeoff for everyday coding.
- Context window: Claude-family models marketed with very large context windows (useful for large repositories and multi-file edits).
- Platform support: macOS, Linux, Windows (CLI-first). Windows usage commonly requires Git for Windows for full CLI feature parity.
- Use cases: automated refactors, multi-file PR generation, test generation and repair, code review assistance, automated CI hooks, developer productivity automation.
- Safety & controls: interactive permission prompts, enterprise controls for data handling, and options to route through organization-managed endpoints.
- Ecosystem: community tooling and integrations exist (context engineers, wrappers, "awesome" lists) though the official product is closed-source.
- Further reading: consult the official Claude documentation at https://claude.ai/ and Anthropic's product pages for up-to-date pricing, model names, and deployment options.