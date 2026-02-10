# Claude Code - https://claude.ai/code
Claude Code is Anthropic's command-line, agentic developer assistant that integrates Claude models into terminal workflows to help write, refactor, and manage code across repositories.

## General Info

### Classification
- Code/Terminal

### Version
v2.1.16 (2026-01)

### Repo
- -
  - Closed-source proprietary product from Anthropic

### Rating
- [4] Strong reasoning and long-context handling
- [3] Can be costly at the highest-capability model tiers
- [4] Excellent for multi-file refactors and end-to-end developer workflows

### Short Description
Claude Code is a terminal-first CLI that exposes Anthropic's Claude models to developer workflows for interactive code generation, multi-file refactors, automated testing, and scripted agentic tasks. It lets developers run prompts, apply edits, execute shell commands, and integrate with git from the terminal while preserving interactive safeguards (permission prompts and commit/checkpoint workflows).

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
- Further reading: consult the official Claude documentation at <https://claude.ai/> and the Claude Code overview at <https://claude.ai/code> for up-to-date pricing, model names, and deployment options.

### Last Update
2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes

### Tools
- Yes

### Resources
- Yes

### ACP
- Yes
  - Claude Code implements the Agent Client Protocol (ACP) by Zed Industries, enabling standardized editor-agent communication over JSON-RPC via stdio. Any ACP-compatible editor or IDE can connect to Claude Code as an agent backend.

## Deployment

### BYOK
- Yes

### Local Offline
- No
  - Claude Code relies on remote model endpoints by default. Anthropic and enterprise customers can route requests through cloud provider-hosted model deployments or organization-managed endpoints, but a fully offline/local model runtime is not provided as a standard option.

## Developer Experience

### Context Management
- Yes
  - Claude Code manages context via large-model context windows, automatic inclusion of a repository-level CLAUDE.md, and explicit file-injection/piping. Users can also supply files via stdin or configure the CLI to read specific paths into the session context.

### Direct File References
- Yes
  - The CLI can read files from the working tree, and its workflow includes asking permission to edit files or run commands. Project conventions (CLAUDE.md and .claude command files) are used to teach the assistant about frequently referenced files and commands.

### Checkpoints
- Yes
  - Claude Code integrates with git workflows and presents interactive prompts before making edits; typical usage includes creating commits, reviewable patches, or requiring user confirmation to apply changes so that git history acts as a checkpoint/undo mechanism.

### Git Support
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Claude Code supports project-level extensibility via the .claude directory (custom commands and scripts). Users can author reusable command files that become slash-style commands in the CLI, enabling repeatable automations.

### Hooks
- Yes
  - Project configuration and command files allow lifecycle-like behaviors (preflight instructions and custom scripts) that the CLI will surface during interactive sessions. Users can document expected behaviors in CLAUDE.md and trigger scripted sequences via custom commands.

### SlashCommands
- Yes
  - Custom project commands placed under .claude/commands are surfaced as slash-style commands and can be invoked from the CLI to run specialized workflows (for example, /project:fix-github-issue).

### Skills
- Yes
  - Skills are modular packages in .claude/skills/ containing a SKILL.md with YAML frontmatter (name, description) and optional bundled resources (scripts, references, assets). Only the name and description are loaded into context; full instructions load on demand when the skill triggers.

### Custom Modes
- Yes
  - The CLI allows model selection and configurable behaviors (e.g., read-only analysis, aggressive edit mode, or restricted tool sets). Users can create and store project-specific command templates and flags to emulate specialist modes for common tasks.

### Subagents
- Yes
  - Claude Code supports agentic, multi-step workflows where the assistant can run sequences of commands, apply edits, run tests, and re-evaluate results. Project scripts and MCP-style integrations can be used to orchestrate more complex subagent behaviors.

