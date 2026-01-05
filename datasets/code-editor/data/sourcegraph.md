# Sourcegraph - https://sourcegraph.com
A code intelligence platform for universal code search, navigation, large-scale refactors, and AI-assisted development (Cody).

## General Info

### Classification
- Code/Editor

### Version
- Unknown (last checked 2025-10-19)
  - Sourcegraph uses rolling releases; check sourcegraph.com/changelog for current version

### Repo
- https://github.com/sourcegraph/sourcegraph-public-snapshot
  - note: core repo made private Aug 2024; public snapshot available historically)

### Rating
- [5] Powerful multi-repo code search and navigation at scale
- [4] Strong enterprise features (batch changes, code insights, self-hosting)
- [3] License and governance concerns after relicensing/private repo move

### Short Description
- Enterprise-grade universal code search, cross-repository navigation, large-scale automated refactors, and an AI assistant (Cody) for multi-repo code understanding and developer productivity.

-

### Description
Sourcegraph is a platform that provides precise, scalable code search and code navigation across many repositories, languages and code hosts. Core capabilities include universal code search, cross-repository symbol navigation (go-to-definition, find-references), Batch Changes for large-scale automated code edits, Code Insights dashboards, and an integrated AI assistant called Cody which provides context-aware code help and multi-repo reasoning inside IDEs and a chat interface. Deployments can be self-hosted (on-prem) or Sourcegraph Cloud.

### Languages
- Any

### Notes
- Strengths:
  - Exceptional at searching and navigating very large mono-repos and multi-repo organizations.
  - Batch Changes enables safe, auditable, large-scale automated refactors across repositories.
  - Code Insights provide queryable metrics and dashboards for engineering metrics (migrations, ownership, adoption tracking).
  - Cody adds AI-assisted code understanding and generation with multi-repo context.
  - Self-hosted deployment gives full data control for security-conscious organizations.

- Considerations:
  - Licensing and openness: Sourcegraph transitioned away from Apache 2.0 and made core components proprietary/private in 2023–2024; this has community and vendor-lock-in implications to evaluate.
  - Cloud vs self-hosted: Cloud provides convenience and managed features but requires trust in vendor; self-hosting removes that but adds operational overhead.
  - Pricing: multiple tiers (free/self-hosted free edition, Business, Enterprise, and Cody-specific tiers). Confirm current pricing with Sourcegraph sales or website for up-to-date details.

- Useful links / reading:
  - Product: https://sourcegraph.com
  - Company: https://about.sourcegraph.com
  - Historical repo (public snapshot / info): https://github.com/sourcegraph/sourcegraph (status may be private)
  - News/discussion about relicensing and repo privatization: public coverage across developer news sites and community threads (June 2023 – Aug 2024 timeline)

- When to choose Sourcegraph:
  - You need precise, enterprise-grade code search and cross-repo navigation across thousands of repositories and many languages.
  - You require large-scale automated code changes (Batch Changes) or engineering metrics (Code Insights).
  - You need an AI assistant that can reason across multiple repositories and provide actionable code suggestions (Cody), and you can accept the vendor/license model.

### Last Update
- 2025-11-15

## Licensing

### Opensource
- No
  - Historically Apache 2.0 (OSS) until 2023; in 2023–2024 Sourcegraph moved large portions of the project to an enterprise/proprietary license and in Aug 2024 made the core repository private. Some related projects (e.g., parts of Cody or community tooling) remain open source.

### License
- Proprietary
  - Sourcegraph Enterprise (formerly Apache 2.0 for much of the codebase prior to relicensing)

### Free Trial
- Yes
  - Free tier/self-hosted free edition for small teams and public code; paid Business/Enterprise plans for larger teams and advanced features.

## MCP-Client

### MCP-Client
- Yes
  - Cody and the AI integrations support bringing multi-repo and file-context into model prompts (context-enhanced chat); suitable for advanced, model-backed code assistance workflows.

### Prompts
- Yes
  - Cody and AI integrations support RAG-style prompts that include search and embedding results (multi-repo file snippets, symbols, and metadata) into model inputs. Prompts can be provided via the web UI, IDE extensions, and APIs; deployments expose configuration for context size and prompt templates.

### Tools
- Yes
  - Cody supports actionable code generation and code actions (patch generation), integration with Batch Changes for large-scale edits, IDE extension commands, and the src CLI for scripted workflows.

### Resources
- Yes
  - Provides indexed repository content, embeddings, symbol graph, search results, Code Insights, and APIs for retrieving context and content for assistant prompts and automation.

## Deployment

### BYOK
- No
  - Sourcegraph Cloud does not publicly advertise a generic BYOK feature; however self-hosted deployments give organizations full control over their infrastructure and encryption boundaries.

### Local Offline
- Yes
  - Self-hosted deployments support offline/private hosting and do not require sending code to Sourcegraph cloud. This is a common choice for enterprises with strict data residency or security requirements.

## Developer Experience

### Context Management
- Yes
  - Sourcegraph provides multiple methods for managing and updating context:
    - Search contexts: user-defined or admin-defined named sets of repositories and revisions that limit and focus searches and context retrieval.
    - Cody context retrieval: blends keyword search and embedding-based semantic search to select relevant files and snippets for prompts (local file context, open repository context, and remote codebase context via the indexed Sourcegraph instance).
    - Indexing and re-indexing: Sourcegraph continuously indexes repositories; re-indexing keeps file-level and symbol-level context up to date for accurate retrieval.
    - Repository-level configuration: external services and repository sync settings (repos, repositoryQuery, exclude, excludePersonalRepositories) influence what code is available for context.

### Direct File References
- Yes
  - Files can be directly referenced in context via Sourcegraph's code search URLs, search contexts, and repository path references. Cody can include specific files/snippets from the Sourcegraph index into prompts; users and integrations can pass file paths or results from search queries to the assistant.

### Checkpoints
- Yes
  - Sourcegraph's Batch Changes and code change workflows are designed to be auditable and reversible through version control. Administrators can rely on Git history and repository state to revert changes; self-hosted deployments provide full control over commit histories. There is also support for observability and monitoring of external requests.

### Git Support
- Yes
  - Deep integrations with Git-based hosts and workflows; built to index and search Git repositories at scale.

## Extensible

### Extensible
- Yes
  - Integrations: IDE plugins (VS Code, JetBrains, Visual Studio, Eclipse), browser extensions, code host integrations (GitHub, GitLab, Bitbucket), API and webhooks, app/extensions framework

### Plugins
- Yes
  - Sourcegraph provides an extensions framework, IDE plugins, and integrations for IDEs (VS Code, JetBrains, Visual Studio) and code hosts (GitHub, GitLab, Bitbucket). These bundle commands, search capabilities, and code intelligence features that operate together with Cody and the platform.

### Hooks
- Yes
  - Sourcegraph exposes lifecycle- and integration-related events via external service syncing and webhook mechanisms (note: the `webhooks` property on external service config has been deprecated in favor of dedicated webhook configuration docs). Webhooks enable event-driven updates for repository changes used by features like code monitoring, and Sourcegraph maintains observability for external HTTP requests.

### SlashCommands
- Yes
  - Sourcegraph supports CLI tooling (e.g., src CLI / developer tools) and integrations that allow scripted interactions and automation. While not "slash commands" in the chat app sense, IDE and extension commands plus the CLI offer similar actionable command workflows.

### Custom Modes
- Yes
  - Cody and Sourcegraph provide configurable behaviors via deployment choices (self-hosted vs cloud), search contexts, user-defined settings, and extension points. This enables tailoring the assistant's behavior and retrieval scope for specific teams or workflows.

### Subagents
- Yes
  - Sourcegraph/Cody architecture supports specialized retrieval and LLM components that act like subagents: semantic retrievers (embeddings), keyword search, and completion-tuned LLMs for chat, code action generation, and multi-repo reasoning. Enterprises can deploy dedicated Cody instances (e.g., self-hosted Cody Enterprise) for tailored workflows.

