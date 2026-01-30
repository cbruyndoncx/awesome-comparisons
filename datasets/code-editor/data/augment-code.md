# Augment Code - https://augmentcode.com
AI-powered developer platform focused on deep codebase understanding and autonomous coding agents.

## General Info

### Classification
- Code/Editor

### Version
- Rolling updates (2025-2026)
  - Design Mode launched November 2025; 70.6% SWE-bench accuracy; $252M raised.

### Repo
- https://augmentcode.com
- GitHub: https://github.com/augmentcode
  - https://github.com/augmentcode/augment-swebench-agent
  - https://github.com/augmentcode/review-pr

### Rating
- [5] Enterprise-grade AI coding platform with industry-leading SWE-bench accuracy (70.6%)
- [4] Deep codebase understanding with ~200k token context and autonomous agents
- [4] Strong security certifications (SOC 2 Type II, ISO 27001, ISO/IEC 42001)

### Short Description
- AI-first developer platform for deep codebase understanding, large-context completions (~200k tokens), autonomous agents, and multi-file "Next Edit" workflows.

### Description
Augment Code is an AI-first development platform built to help professional engineers work with large, complex codebases. It uses a high-capacity context engine (advertised ~200k tokens of context), continuous embeddings of code and docs, and persistent "Memories" to provide deeply contextual completions, autonomous agents, and stepwise "Next Edit" navigation through multi-file changes. It supports autonomous agents that can plan, build, and open pull requests, and integrates with many developer tools and infra via MCP and native integrations.

### Languages
- Any

### Notes
- Strong focus on enterprise workflows and large monorepos; features include Smart Apply, Next Edit navigation, change checkpoints, persistent memories, and multi-modal inputs (screenshots, Figma).
- Industry benchmarks: 70.6% SWE-bench accuracy; HWE Bench top-ranked (65.4% on HWE).
- Autonomous agents operating on Claude Sonnet 4 for 24/7 remote coordination across multiple repositories.
- Design Mode (November 2025) enables visual development with agents creating interactive designs.
- Plan Mode performs read-only codebase analysis before making changes.
- PR review agents detect architectural violations, SQL injection vulnerabilities, and N+1 query problems.
- Security: SOC 2 Type II, ISO 27001:2022, ISO/IEC 42001:2023 certifications; first AI coding assistant to achieve ISO/IEC 42001 compliance.
- Pricing: credit-based model from $20/month (Indie) to $200/month (Max) plus enterprise plans.

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
  - Supports reusable prompt templates and agent configurations for chat and autonomous agent workflows.
  - Prompts are used to drive "Next Edit" suggestions, Smart Apply flows, and agent planning.

### Tools
- Yes
  - Provides MCP connectors and tool integrations for external systems (VCS, issue trackers, CI, documentation).
  - Native integrations and editor plugins enable file-level operations and terminal/CLI tooling.

### Resources
- Yes
  - Public documentation, blog posts, demo materials, and example GitHub repositories under the augmentcode org.

### ACP
- No

## Deployment

### BYOK
- Yes

### Local Offline
- No
  - Cloud-first product; local/in-IDE operations likely use cloud model/augmentation

## Developer Experience

### Context Management
- Yes
  - Augment Code provides multiple context management methods: a high-capacity context engine (advertised ~200k tokens) that indexes entire repositories and their docs; persistent "Memories" that learn preferences and reuse prior decisions; explicit focus-context selection (file, folder, or code-block focus); on-demand reindexing/refresh; and MCP-based connectors to enrich context with external services (docs, CI, issue trackers).

### Direct File References
- Yes
  - Files can be directly referenced and targeted: users select files or folders in the UI or editor extension, chat answers include source citations and file links, Next Edit and Smart Apply place edits into the correct files, and the CLI/TUI supports file-path targeting. Agents can open PRs and create checkpoints tied to specific files.

### Checkpoints
- Yes
  - The platform provides change checkpoints and snapshotting for safe experimentation: automatic change tracking, named checkpoints before applying edits, easy rollback/restore, and Git/PR-backed snapshots for human review. Checkpoints are central to Smart Apply / Next Edit flows.

### Git Support
- Yes

## Extensible

### Extensible
- Yes
  - Plugins / IDE extensions (VS Code, JetBrains, Vim/Neovim)
  - Integrations with GitHub, Jira, Confluence, Notion, Linear

### Plugins
- Yes
  - Augment offers an extensibility model via editor plugins (VS Code, JetBrains, Vim/Neovim), MCP connectors and native integrations (GitHub, Jira, Confluence, Notion, Linear). These bundle commands, agent capabilities, and integration hooks so teams can compose workflows and connect external tools.

### Hooks
- Yes
  - Augment exposes lifecycle-style events and checkpoints that can be observed or acted on: plan/intent creation, edit proposal generation, Smart Apply execution, checkpoint creation, rollback/restore, PR opened/merged, and terminal command execution (with approval). Integrations and MCP connectors surface these events to external systems (e.g., CI, issue trackers) for automation and auditing.

### SlashCommands
- Yes
  - The platform supports re-usable, user-triggered commands across interfaces: editor commands (VS Code/JetBrains), CLI/TUI invocations, and chat actions (apply, propose, create checkpoint). These act like reusable operations users can invoke to apply agent capabilities consistently.

### Skills
- No

### Custom Modes
- Yes
  - Users can create specialist modes / profiles that tailor the assistant for particular tasks or styles: project profiles, role-specific modes (reviewer, maintainer, refactorer), model and memory selection, and policy/permission presets. These modes adjust agent behavior, allowed actions, and context-scope.

### Subagents
- Yes
  - Augment supports specialized autonomous agents or agent modes for task-specific workflows: local/IDE agents and remote/cloud agents that can plan, execute edits, run tests, and open PRs. Agents can be configured with different permissions, memories, and tool access via MCP connectors to create focused subagents for e.g., security fixes, refactors, or dependency upgrades.

