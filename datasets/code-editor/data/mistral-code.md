# Mistral Code - https://mistral.ai
Mistral Code is an enterprise-focused AI coding assistant from Mistral AI that brings code generation, conversational help, and multi-step developer automation into IDEs and private deployments. It bundles several specialized models (Codestral, Codestral Embed, Devstral, Mistral Medium) and offers cloud, reserved, and air-gapped on-premises deployment options for secure enterprise use.

## General Info

### Classification
- Code/Editor

### Version
- v1 (2025-06-04)

### Repo
- N/A (proprietary; IDE integration via Continue.dev open-source plugin)

### Rating
- [5] Strong enterprise focus with on-prem and air-gapped deployment options
- [4] Broad language coverage (80+ languages) and multi-model architecture

### Short Description
Mistral Code is an enterprise-grade AI developer assistant that integrates specialized models for code completion, semantic search, and agentic multi-step automation into IDEs with on-prem, cloud, and air-gapped deployment options.

-

### Description
Mistral Code is a packaged AI developer assistant designed for enterprise adoption. Announced in mid-2025, it combines multiple specialized models to handle code completion (Codestral), embeddings and code search (Codestral Embed), agentic multi-step developer tasks (Devstral), and chat-style assistance (Mistral Medium). The product emphasizes security, governance and observability: teams can run it in the cloud, on reserved capacity, or fully on-premises in air-gapped GPU environments so that source code never leaves company boundaries. It integrates with developer IDEs (private beta for VSCode and JetBrains via Continue), supports fine-tuning on private codebases, and provides admin controls, RBAC, audit logs, metrics, and approval workflows to fit regulated environments.

### Languages
- Any

### Notes
- Core model stack: Codestral (autocomplete / fill-in-the-middle), Codestral Embed (embeddings / search), Devstral (agentic workflows), Mistral Medium (chat assistance).
- Built on top of the Continue open tooling for IDE integration (<https://continue.dev>), with private beta plugins for VSCode and JetBrains.
- Designed to address common enterprise blockers: connectivity & data residency, customization (fine-tuning), deeper task coverage (multi-step workflows), and consolidated SLAs.
- Adopted in production by organizations for hybrid/hardened deployments (examples reported: banks, large enterprises, system integrators).
- Not a drop-in open-source model; organizations seeking fully open-source stacks should evaluate the underlying Mistral model releases and Continue separately.
- Useful where governance, observability, and private-model customization are required for regulated codebases.
- 2025 updates: Devstral reportedly outperforms OpenAI GPT-4.1-mini by 20%+ on AI programming benchmarks; enterprise deployments report 90% code completion accuracy and 100% developer adoption; supports fine-tuning and distillation of lightweight model variants on private repos.
- Supports code migration between languages/frameworks and automated performance analysis with optimization suggestions.

### Last Update
2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Private beta availability; general availability and trial terms may vary

## MCP-Client

### MCP-Client
- Yes
  - Integrates with Continue.dev for IDE plugin functionality (private beta for VSCode and JetBrains); enterprise deployments expose admin console and integration points for enterprise management.

### Prompts
- Yes
  - Supports chat-style prompts (Mistral Medium) and natural-language agent instructions for Devstral workflows; prompts can be composed from IDE context (open files, diffs, terminal output) and indexed repository snippets.

### Tools
- Yes
  - Provides tool-like capabilities via Devstral (agent actions: scan, edit, test, draft PR), Codestral-powered completions, and Codestral Embed semantic search; IDE integrations expose these as actionable UI commands and workflows.

### Resources
- Yes
  - Embedding/indexing (Codestral Embed), IDE plugins (Continue.dev integrations), and admin/observability console (Mistral Console). Enterprise deployments include APIs/management surfaces for indexing, policy, and usage telemetry.

### ACP
- No

## Deployment

### BYOK
- Yes
  - Supports private deployments and enterprise key management practices through on-prem/air-gapped setups

### Local Offline
- Yes
  - Supports air-gapped on-premises GPU deployment for fully offline operation

## Developer Experience

### Context Management
- Yes
  - RAG / semantic retrieval via Codestral Embed: Mistral Code indexes repositories and returns relevant snippets for prompt construction.
  - IDE-based context aggregation: open-file buffers, git diffs, terminal history and static-analysis metadata are used by the plugin to build contextual prompts for completions and agent tasks.
  - Agent session state for multi-step workflows (Devstral): agents persist task state across steps (scan → edit → test → PR) and Mistral Console exposes usage/acceptance metrics.
  - Admin controls to configure which context sources are allowed (repo indexing, terminal, local files) in enterprise/on‑prem deployments.

### Direct File References
- Yes
  - Files can be directly referenced via the embedding index and semantic search (path-based results and file snippets returned to the assistant).
  - IDE plugin and agentic workflows operate on explicit files: open/edit staged changes, create draft pull requests, and include file paths in diffs/commits.
  - Private/on‑prem deployments keep repository indexing local so file references never leave the customer environment.

### Checkpoints
- Yes
  - Agentic edits are surfaced as draft changes / pull requests and pass through configurable approval workflows; audit logs record actions so changes can be reviewed and reversed via normal git history.
  - On‑prem deployments and RBAC reduce risk of unwanted auto-commits; standard VCS workflows (branches, PRs) serve as checkpoints for undoing agent actions.

### Git Support
- Yes
  - Integrates with repositories for retrieval-augmented generation, code search, and fine-tuning

## Extensible

### Extensible
- Yes
  - Fine-tuning / post-training on private repos
  - Integration via plugins and Continue.dev

### Plugins
- Yes
  - Official IDE plugins for VS Code and JetBrains (private beta/GA progression) integrate completions, semantic search and one-click automations into the editor UI.
  - Integration with Continue.dev and the plugin model enables embedding Mistral Code features into IDE/tooling workflows and connecting to enterprise infrastructure (SSO, audit logs).

### Hooks
- Yes
  - Continue.dev plugin lifecycle and agent workflows allow integration points for CI/CD and enterprise automation; admin console and agent APIs provide eventing and approval hooks for governance and observability.

### SlashCommands
- Yes
  - IDE-exposed commands and quick actions (e.g., invoke Devstral task, run semantic search, create draft PR) available in VS Code and JetBrains plugins.

### Skills
- No

### Custom Modes
- Yes
  - Preset agent modes and Devstral workflows for common specialist tasks (code review, refactor, documentation, testing) and configurable behavior via admin settings and fine-tuning.

### Subagents
- Yes
  - Devstral provides agentic workflows (specialized agents) that perform multi-step, multi-file engineering tasks: scanning a repo, making edits, running tests, and drafting PRs.
  - Agents can be composed to chain retrieval → reasoning → edit → verification steps; enterprise flows include approval/authorization gates before applying changes.

