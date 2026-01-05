# app.build - https://app.build
[Open-source AI agent that generates production-ready full-stack applications from a single natural-language prompt.]

## General Info

### Classification
- Product/Prototyping

### Version
- v1.31.3 (2025-07-01)
  - Release date details unavailable; check repository for specific date

### Repo
- https://github.com/appdotbuild/platform

### Rating
- [5] Excellent for rapid full-stack scaffolding and deployment
- [4] Strong engineering UX; some limitations around custom model choices and enterprise integrations

### Short Description
Open-source AI agent that converts a single natural-language prompt (CLI or web) into a complete, deployable full-stack application, including frontend, backend, database provisioning, authentication, tests, GitHub repository creation, and automated deployment.

### Description
app.build is an open-source AI agent that turns a single terminal (or web) prompt into a complete, deployed full-stack web application. It scaffolds frontend and backend code, provisions a hosted Postgres database, wires up authentication, writes and runs tests, creates a GitHub repository in the user's account, and deploys the app to a live URL. The project emphasizes developer control by outputting a complete, editable codebase in the user's own GitHub repo rather than locking code behind a proprietary interface.

The default generated stacks commonly include React on the frontend and Fastify + Drizzle on the backend, built and served with Vite and TypeScript. app.build uses large language models (reported integrations include Anthropic Claude and Google Gemini) to generate code and orchestration logic, and it leverages Neon (serverless Postgres + Neon Auth) and Koyeb for database and deployment infrastructure.

### Languages
- TypeScript
- JavaScript
- HTML/CSS

### Notes
- Core workflow: user supplies a prompt (CLI or web UI) → agent generates full codebase → creates GitHub repository → provisions DB & auth → runs tests → deploys frontend and backend to live URL.
- Infrastructure integrations: Neon (serverless Postgres + Neon Auth) for database and auth; Koyeb (serverless deployments) for hosting/deployments.
- Stack examples: React + Vite (frontend), Fastify + Drizzle (backend/ORM), TypeScript throughout the generated projects.
- Developer experience: outputs editable code in the user's GitHub account and supports CI/CD (changes pushed to repo trigger redeploys).
- Use cases: rapid prototyping, proofs-of-concept, boilerplate acceleration for full-stack apps; can be used as a starting point for production projects with manual review.
- Open-source advantage: transparency and ability to self-host or fork the agent and control generated artifacts.
- Limitations/considerations: depends on remote LLMs and hosted infra; may require reviewing and hardening generated code before using in production; BYOK/enterprise model key options and advanced integrations may require additional configuration.
- Sources: coverage gathered from platform README and third-party posts about app.build (Neon/Koyeb posts, GitHub repo).

### Last Update
- 2025-07
  - Release series: v1.31.x published in July 2025 (referenced in project release notes / changelog)

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- Yes
  - The project is open-source and can be self-hosted without cost via the GitHub repository.
  - A hosted app.build service may offer paid tiers or usage limits for hosted generation; confirm on the project's website for current hosted pricing/limits.

## MCP-Client

### MCP-Client
- Unknown
  - No public documentation found regarding MCP (Model Context Protocol) support.### Prompts
- Yes
  - app.build's primary UX is a single natural-language prompt (CLI or web) that describes the desired application; the system also uses internal staged prompt templates and guided prompts during generation to produce models, ORM, handlers, and tests.

### Tools
- Yes
  - Integrations commonly observed or documented: Anthropic/Google LLM providers (configurable), Neon (serverless Postgres + Neon Auth), Koyeb (deployments), GitHub (repo creation & CI), GitHub Actions (CI/CD), Vite, Fastify, Drizzle ORM.
  - The platform orchestrates external infrastructure tooling (DB provisioning, deployments) as part of its pipeline rather than exposing a general-purpose tool marketplace.

### Resources
- Yes
  - Primary repository: https://github.com/appdotbuild/platform
  - Documentation and README in the repo provide usage examples, stack choices, and CLI/web instructions.
  - Example/template apps and CI/deploy pipeline code are included in the project repo for reference and self-hosting.
  - Community/support via GitHub issues; project may link to additional channels (Discord/Slack) from the repo landing page.

## Deployment

### BYOK
- Yes

### Local Offline
- No
  - app.build relies on remote LLMs and hosted infrastructure (Neon/Koyeb) for generation and deployment.

## Developer Experience

### Context Management
- Yes
  - app.build implements structured context management through an FSM-driven workflow and an error-analysis feedback loop. The agent performs incremental context enrichment (data model → ORM/tests → handlers), validates generated artifacts at each stage, and uses validation failures as feedback to adjust subsequent generation steps. The FSM provides guarded state transitions and guiding events (rather than fully imperative commands) so the system can maintain coherent context while allowing targeted intervention.

### Direct File References
- Yes
  - The platform is file-centric: app.build generates a complete, editable codebase and commits it to a user GitHub repository. The CLI/control plane operate on a filesystem/repo model (create files, run tests, push commits), which means files are directly created, written, and referenced as primary artifacts. While there is no publicly documented "in-repo file reference API" for ad-hoc file injection in prompts, the agent's workflow inherently reads/writes repo files and uses them as the single source of truth for the generated application.

### Checkpoints
- Yes
  - app.build uses Git (creating a full GitHub repository for each generated app) and CI/CD as implicit checkpoints. Each generation step produces commits and pipeline artifacts, giving users a natural rollback and audit trail. Additionally, the FSM/graph architecture enables targeted re-generation or intervention at intermediate states (avoiding a full restart) — effectively behaving like internal checkpoints during the generation process.

### Git Support
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- No
  - The public repository/README documents extensibility (open-source, configurable stacks, BYOK) but does not describe a formal plugin system or plugin packaging API. Integrations appear to be achieved via generated repos, CI/CD, and infrastructure connectors rather than a runtime plugin marketplace.

### Hooks
- Yes
  - app.build exposes a lifecycle composed of discrete pipeline stages (generation → DB provisioning → testing → deployment) via its control plane and deployment pipeline. These stages surface natural integration points (e.g., generated repo + CI, GitHub Actions triggers, deployment hooks to Koyeb/Neon). There is no documented first-class plugin hook API in the public README, but the architecture and use of Git/CICD provide pragmatic hook points (pre/post-generation, CI checks, and GitHub webhooks) for integrations.

### SlashCommands
- No
  - No evidence of a slash-command or chat-style command interface (e.g., in Slack/Discord) is documented in public materials; interaction is via CLI and web UI.

### Custom Modes
- No
  - There is no public documentation describing a user-facing "custom modes" feature that lets users define persistent specialist modes for the agent. Configurable stack choices and BYOK options exist, but no documented mechanism to create custom conversational/behavioral modes for the agent was found.

### Subagents
- Yes
  - The project architecture explicitly describes specialized "actors" and a parallel tree-search driven orchestration. These actors behave like subagents with narrow responsibilities (data modelling, ORM generation, test/handler creation). The FSM + parallel tree search coordinates multiple actor traces and enables exploration and selection of candidate solutions, effectively implementing a subagent-based workflow.

