# Ona (Gitpod) - https://ona.com
Cloud development environments reimagined as autonomous AI engineering platform.

## General Info

### Classification
- Code/Editor

### Version
v1.0 (2025-09-01)

### Repo
- https://github.com/gitpod-io/gitpod

### Rating
- [4] Strong enterprise features and security posture
- [5] Highly productive autonomous agents for routine engineering tasks

### Short Description
Ona is the rebranded Gitpod: an AI-first cloud development platform combining preconfigured, sandboxed cloud development environments with autonomous AI engineering agents and enterprise-grade guardrails.



### Description
Ona is the rebrand and strategic evolution of Gitpod into an AI-first software engineering platform. Building on Gitpod's one-click, preconfigured cloud development environments, Ona layers autonomous AI "agents" that can plan, implement, test, review, and (with guardrails) deploy code inside secure, sandboxed environments. The platform is organized around three core pillars: Ona Environments (declarative, API-first dev environments with sandboxing and VPC deployment options), Ona Agents (autonomous AI collaborators that operate via natural language, IDE integrations, or automation pipelines), and Ona Guardrails (RBAC, audit trails, command controls, and compliance features for enterprise governance). Ona targets developer productivity at scale for both individual teams and large regulated enterprises.

### Languages
- Any

### Notes
- Ona represents a shift from IDE-as-product to "mission control" for autonomous engineering agents; the rebrand reflects this broader scope.
- Autonomous agents can operate with high independence inside sandboxed environments, enabling workflows where agents co-author, test, and merge code with minimal human intervention.
- Enterprise features include VPC deployment, SSO/OIDC, RBAC, command deny lists, and full audit trails—important for regulated industries.
- Reported internal metrics (company) indicate substantial productivity gains (agents co-authoring a large share of merged PRs); real-world gains will vary by org and workflow maturity.
- Good fit for teams that want to adopt AI-driven automation while retaining strict governance and compliance controls.
- Limitations: true autonomous workflows require careful policy and guardrail configuration; smaller teams without enterprise needs may not need the full Ona stack.
- Recommended evaluation steps: trial with a sandbox project, configure guardrails and VPC options, measure agent outputs against existing PR and review metrics, and validate audit/compliance reporting.

### Last Update
2025-09-01


## Licensing

### Opensource
- Yes
  - Core Gitpod components remain open-source; some agent and enterprise-grade features are commercial/proprietary.

### License
- MIT 
  - core open-source components

### FreeTrial
- Yes

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - Repository-level AGENTS.md lets teams define prompt templates and instruction blocks that Ona agents load at session start.
  - Agents support interactive prompts via chat, slash-commands, and workspace automation manifests (e.g., automations.yml).

### Tools
- Yes
  - Integrates with LLM providers (Anthropic Claude Sonnet by default; other models optional) and exposes automation/command execution primitives inside workspaces.
  - Supports editor integrations (VS Code, JetBrains, Zed, Cursor) and automation manifests for reusable toolchains.

### Resources
- Yes
  - Official Ona (Gitpod) documentation and blog posts; open-source Gitpod repository: <https://github.com/gitpod-io/gitpod>.
  - Enterprise docs for VPC, RBAC, and guardrails; onboarding guides and automation manifest examples in the docs site.

## Deployment

### BYOK
- Yes

### LocalOffline
- Yes
  - Ona supports private VPC and on-prem/private-hosted deployments for enterprises but is not a fully offline/local-only product.

## Developer Experience

### ContextManagement
- Yes
  - Ona provides explicit context management for its AI agents via a repository-level AGENTS.md that the agent loads at the start of a session. Additional context sources include workspace definitions (devcontainer.json), automation manifests (e.g. automations.yml / automation configs), environment variables and prebuild metadata, and repository files the agent can read on demand. These artifacts together let teams define project conventions, commands, and policies that are consistently applied by agents.

### DirectFileReferences
- Yes
  - AGENTS.md is designed to reference other files in the repo; Ona agents will read files referenced there and can access repository files directly in the sandboxed workspace. This enables pointing to style guides, architecture docs, and specific source files rather than duplicating their contents in the main agent config.

### Checkpoints
- Yes
  - Ona/Gitpod workflows provide workspace snapshots, prebuilds and the normal git history as mechanisms to revert or recover from agent actions. For enterprise users, Guardrails and audit trails further enable tracing and, where necessary, rolling back changes using standard VCS or snapshot workflows.

### GitSupport
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Ona integrates with IDE extensions and editor platforms (e.g., VS Code, JetBrains, Cursor, Zed) and exposes automation/extension points; bundling commands and automation into reusable packages is done via workspace/automation configuration and editor extension packs rather than a single "plugin store" model.

### Hooks
- Yes
  - Public docs for Gitpod historically exposed lifecycle hooks for workspaces (prebuilds, init/tasks) and Ona surface-level documentation references automation triggers; however, a clearly documented agent lifecycle hooks API (for attaching arbitrary external listeners to agent start/stop events) was not found in the available documentation. If you need explicit agent lifecycle hooks, verify in the Ona docs or with support for the latest agent API.

### SlashCommands
- Yes
  - Ona agents support slash-command style interactions to trigger automations and common engineering tasks from chat or IDE integrations. These commands are intended to quickly invoke tests, CI-like automations, or agent behaviours and are integrated into the agent UX across browser and IDE clients.

### CustomModes
- Yes
  - Agent behaviour and operating modes can be tailored via repository-level configuration (AGENTS.md), environment definitions, and automation manifests; teams can create specialized profiles/workspace configs that produce distinct agent behaviours or permissions for particular workflows.

### Subagents
- Yes
  - Ona is explicitly positioned as "mission control for your personal team of software engineering agents," allowing multiple specialized agents (roles/agents) to be defined and orchestrated for different tasks — e.g., code-gen agents, review agents, release agents — under centralized governance.

