# Cursor - https://cursor.com

Cursor is an AI-first code editor and agent platform that layers advanced AI reasoning and multi-agent workflows on top of a familiar VS Code-like interface. The 2025 Cursor 2.0 release introduced Composer (a low-latency coding model) and a multi-agent development interface that runs agents in isolated worktrees or remote sandboxes, enabling parallel solution exploration and agentic workflows.

## Version
v2.0 (2025-10-29)

## Classification 
- Code/Editor

## Rating
- [4] Strong AI-first workflows, fast Composer model and multi-agent UI
- [3] Maturing ecosystem and enterprise features (good fit for teams ready to adopt agentic workflows)

## Repository
- -

## Languages
- Any

## Extensible
- Yes
  - Extension points for integrations, team commands, and model selection. Cursor emphasizes agent tooling and may provide hooks for custom integrations via its dashboard and extension APIs.

## Description
Cursor reimagines the developer workflow by making AI agents first-class collaborators. It combines conventional editor capabilities (file navigation, syntax highlighting, terminals) with chat-driven Composer and Agent modes that can generate, refactor, and test code across a repository. Cursor 2.0 focuses on low-latency, production-oriented AI tooling (Composer) and parallel agent execution for exploring multiple implementations safely.

## BYOK
- Yes
  - Cursor supports bring-your-own API keys / model endpoints so teams can choose preferred providers (OpenAI, Anthropic, Google, self-hosted endpoints where supported) and reduce exposure of secrets to the Cursor cloud where applicable.

## LocalOffline
- No
  - Cursor is primarily a cloud-first product. While BYOK lets you use private model endpoints, fully offline/local-only deployments are not a documented primary use-case as of the 2.0 release.

## FreeTrial
- Yes
  - Free Hobby tier available with limited agent requests; Pro trial options are commonly offered for evaluation.

## GitSupport
- Yes
  - Uses git worktrees and integrates with standard Git workflows. Multi-agent execution uses isolated worktrees to avoid merge conflicts while agents make changes.

## Terminal
- Yes
  - Integrated terminals and sandboxed terminal features (secure command execution for agent-run commands) are part of the 2.0 feature set.

## Opensource
- No
  - Cursor is a commercial product; the core platform and Composer model are proprietary.

## License
- Proprietary

## MCP-Client
- No
  - Not documented as an MCP client in the same style as some other editor integrations.

### Prompts
- Yes

### Tools
- Yes

### Resources
- Yes

## Notes
- Composer model: Cursor 2.0 introduced Composer, an in-house low-latency model tailored for coding and agentic workflows. Composer emphasizes speed (large-model-like capability with lower latency), semantic codebase search, and optimized multi-step editing.
- Multi-agent interface: Developers can run multiple agents in parallel (isolated by git worktrees or remotes) to compare different solutions and pick the best result. This enables safe parallel experimentation without file conflicts.
- Agent modes: "Composer" (scoped, low-latency code generation) and more autonomous "Agent" mode (broader repo-wide changes) let you trade control for autonomy depending on task scope.
- Embedded browser & testing: 2.0 includes an embedded browser and DOM inspection tools so agents can test web UIs and iterate on fixes.
- Security & sandboxes: Sandboxed terminals and admin controls are included for enterprise safety, with audit logs and team-level command controls.
- Model flexibility: Cursor supports multiple model providers and BYOK; teams can choose higher-accuracy or lower-latency models depending on workflow needs.
- Collaboration & teams: Team and Enterprise tiers add centralized billing, SSO, usage analytics, and admin controls for managing agent behavior across an organization.
- Pricing model: Tiered offering (Hobby free tier, Pro, Pro+, Ultra, Teams, Enterprise) with per-plan usage multipliers and add-ons. Pricing reflects model-inference costs and usage limits—pick plans carefully for heavy agent workloads.

## ContextManagement
- Yes
  - Chat buffers and Composer sessions expose context and let you include or edit file contents, terminal logs, and other contextual blocks used to ground agent reasoning.

## DirectFileReferences
- Yes
  - You can reference files or selections as part of prompts and Composer sessions; agents can operate on specified files or the entire repo depending on mode and permissions.

## Hooks
- No
  - No public lifecycle hook API documented for external integrations; Cursor focuses on agent tooling and dashboard-managed team commands.

## SlashCommands
- No
  - Cursor's interaction model centers on Composer/Agent UIs rather than slash-command sets like some other editor assistants.

## Subagents
- Yes
  - Multi-agent workflows act like subagents — multiple independent agents can be launched in parallel, each producing candidate changes in isolated worktrees for comparison and review.

## CustomModes
- Yes
  - Cursor supports Composer and Agent modes and exposes team-configurable commands and settings to create tailored workflows.

## Plugins
- Yes
  - Extension/integration points exist for model providers, team commands, and tooling integrations; the ecosystem is growing.

## Checkpoints
- Yes
  - Agent edits and Composer changes are presented as diffs and create checkpoints or restore points so you can revert unwanted changes.

## SpecDrivenDevelopment
- Other
  - Cursor does not ship a native spec-driven framework. It can be used alongside external spec-driven tools and workflows (Tessl, SpecKit, etc.) but does not provide a first-class SDD framework out-of-the-box.


## Last Update
2025-10-29


## Useful links
- Official site: https://cursor.com
- Announcement coverage: select product release posts and reviews (search for "Cursor 2.0 Composer multi-agent").
