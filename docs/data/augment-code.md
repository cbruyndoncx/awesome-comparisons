# Augment Code - https://augmentcode.com
AI-powered developer platform focused on deep codebase understanding and autonomous coding agents.

## Version
vN.N (yyyy-mm-dd)

## Classification 
- Code/Editor

## Rating
  

## Repository


## Languages
- Any
## Extensible
- Yes
  - Plugins / IDE extensions (VS Code, JetBrains, Vim/Neovim)
  - Integrations with GitHub, Jira, Confluence, Notion, Linear

## Description
Augment Code is an AI-first development platform built to help professional engineers work with large, complex codebases. It uses a high-capacity context engine (advertised ~200k tokens of context), continuous embeddings of code and docs, and persistent "Memories" to provide deeply contextual completions, autonomous agents, and stepwise "Next Edit" navigation through multi-file changes. It supports autonomous agents that can plan, build, and open pull requests, and integrates with many developer tools and infra via MCP and native integrations.

## BYOK
- Yes

## LocalOffline
- No
  - Cloud-first product; local/in-IDE operations likely use cloud model/augmentation

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- Yes 
  - CLI and TUI available

## Opensource
- No

## License
- Proprietary

## MCP-Client
- Yes

## Notes
- Strong focus on enterprise workflows and large monorepos; features include Smart Apply, Next Edit navigation, change checkpoints, persistent memories, and multi-modal inputs (screenshots, Figma).
- Industry benchmark claims (HWE Bench top-ranked, e.g., 65.4% on HWE) 

## ContextManagement
- Yes
  - Augment Code provides multiple context management methods: a high-capacity context engine (advertised ~200k tokens) that indexes entire repositories and their docs; persistent "Memories" that learn preferences and reuse prior decisions; explicit focus-context selection (file, folder, or code-block focus); on-demand reindexing/refresh; and MCP-based connectors to enrich context with external services (docs, CI, issue trackers).

## DirectFileReferences
- Yes
  - Files can be directly referenced and targeted: users select files or folders in the UI or editor extension, chat answers include source citations and file links, Next Edit and Smart Apply place edits into the correct files, and the CLI/TUI supports file-path targeting. Agents can open PRs and create checkpoints tied to specific files.

## Hooks
- Yes
  - Augment exposes lifecycle-style events and checkpoints that can be observed or acted on: plan/intent creation, edit proposal generation, Smart Apply execution, checkpoint creation, rollback/restore, PR opened/merged, and terminal command execution (with approval). Integrations and MCP connectors surface these events to external systems (e.g., CI, issue trackers) for automation and auditing.

## SlashCommands
- Yes
  - The platform supports re-usable, user-triggered commands across interfaces: editor commands (VS Code/JetBrains), CLI/TUI invocations, and chat actions (apply, propose, create checkpoint). These act like reusable operations users can invoke to apply agent capabilities consistently.

## Subagents
- Yes
  - Augment supports specialized autonomous agents or agent modes for task-specific workflows: local/IDE agents and remote/cloud agents that can plan, execute edits, run tests, and open PRs. Agents can be configured with different permissions, memories, and tool access via MCP connectors to create focused subagents for e.g., security fixes, refactors, or dependency upgrades.

## CustomModes
- Yes
  - Users can create specialist modes / profiles that tailor the assistant for particular tasks or styles: project profiles, role-specific modes (reviewer, maintainer, refactorer), model and memory selection, and policy/permission presets. These modes adjust agent behavior, allowed actions, and context-scope.

## Plugins
- Yes
  - Augment offers an extensibility model via editor plugins (VS Code, JetBrains, Vim/Neovim), MCP connectors and native integrations (GitHub, Jira, Confluence, Notion, Linear). These bundle commands, agent capabilities, and integration hooks so teams can compose workflows and connect external tools.

## Checkpoints
- Yes
  - The platform provides change checkpoints and snapshotting for safe experimentation: automatic change tracking, named checkpoints before applying edits, easy rollback/restore, and Git/PR-backed snapshots for human review. Checkpoints are central to Smart Apply / Next Edit flows.

## SpecDrivenDevelopment
- Other
  - Augment also demonstrates spec-aware behaviors (e.g., checking edits against OpenAPI specs and service contracts) but does not publish a single public SDD framework name. For projects using Tessl (this repository), Augment's features (Next Edit, checkpoints, spec/contract checks) complement a Tessl-style spec-driven workflow.

---

