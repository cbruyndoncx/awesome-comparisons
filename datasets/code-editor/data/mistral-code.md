# Mistral Code - https://mistral.ai
Mistral Code is an enterprise-focused AI coding assistant from Mistral AI that brings code generation, conversational help, and multi-step developer automation into IDEs and private deployments. It bundles several specialized models (Codestral, Codestral Embed, Devstral, Mistral Medium) and offers cloud, reserved, and air-gapped on-premises deployment options for secure enterprise use.

## General Info

### Classification
- Code/Editor

### Version
v1 (2025-06-04)

### Repo
-

### Rating
- [5] Strong enterprise focus with on-prem and air-gapped deployment options
- [4] Broad language coverage (80+ languages) and multi-model architecture

### Short Description
<!-- ToDo -->

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
  - Private beta availability; general availability and trial terms may vary

## MCP-Client

### MCP-Client
- Yes
  - Assuming continue.dev functionality is kept - doublecheck

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
  - Supports private deployments and enterprise key management practices through on-prem/air-gapped setups

### LocalOffline
- Yes
  - Supports air-gapped on-premises GPU deployment for fully offline operation

## Developer Experience

### ContextManagement
- Yes
  - RAG / semantic retrieval via Codestral Embed: Mistral Code indexes repositories and returns relevant snippets for prompt construction.
  - IDE-based context aggregation: open-file buffers, git diffs, terminal history and static-analysis metadata are used by the plugin to build contextual prompts for completions and agent tasks.
  - Agent session state for multi-step workflows (Devstral): agents persist task state across steps (scan → edit → test → PR) and Mistral Console exposes usage/acceptance metrics.
  - Admin controls to configure which context sources are allowed (repo indexing, terminal, local files) in enterprise/on‑prem deployments.

### DirectFileReferences
- Yes
  - Files can be directly referenced via the embedding index and semantic search (path-based results and file snippets returned to the assistant).
  - IDE plugin and agentic workflows operate on explicit files: open/edit staged changes, create draft pull requests, and include file paths in diffs/commits.
  - Private/on‑prem deployments keep repository indexing local so file references never leave the customer environment.

### Checkpoints
- Yes
  - Agentic edits are surfaced as draft changes / pull requests and pass through configurable approval workflows; audit logs record actions so changes can be reviewed and reversed via normal git history.
  - On‑prem deployments and RBAC reduce risk of unwanted auto-commits; standard VCS workflows (branches, PRs) serve as checkpoints for undoing agent actions.

### GitSupport
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
- Yes
  - Devstral provides agentic workflows (specialized agents) that perform multi-step, multi-file engineering tasks: scanning a repo, making edits, running tests, and drafting PRs.
  - Agents can be composed to chain retrieval → reasoning → edit → verification steps; enterprise flows include approval/authorization gates before applying changes.

## Ungrouped Criteria

### Terminal
- Yes
  - Agentic capabilities can reason over terminal output, run commands, and propose diffs under configurable approval flows

### SpecDrivenDevelopment
- Other
  - Mistral Code is not tied to a single spec-driven development framework; it is designed to integrate with existing engineering workflows and can be used alongside SDD approaches (Tessl, SpecKit, etc.) via agentic automation and code generation, but it does not natively implement a particular SDD toolchain.
