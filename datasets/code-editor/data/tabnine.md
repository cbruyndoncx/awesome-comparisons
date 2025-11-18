# Tabnine - https://www.tabnine.com
AI-powered code completion and developer assistant focused on privacy and enterprise deployment

## General Info

### Classification
- Code/Editor

### Version
- Unknown (last checked 2025-10-29)
  - Tabnine uses different versioning for enterprise/cloud deployments; contact vendor for specific version information

### Repo
-

### Rating
- [4] Strong for enterprises that require data privacy and on-prem deployment
- [3] Good code-completion quality; real-world accuracy varies by codebase

### Short Description
Tabnine is an AI-driven code completion and in-IDE assistant that prioritizes enterprise-grade privacy, flexible deployment (cloud, private VPC, on-prem, air-gapped), and broad IDE support. It provides context-aware inline completions, an in-IDE chat assistant with apply/patch capabilities, and organization-aware suggestions that learn from your repositories while offering administrative controls for governance and compliance.

-

### Description
Tabnine is a commercial AI coding assistant that emphasizes privacy, flexible deployment, and broad IDE coverage. It provides context-aware inline code completions, an in-IDE chat for code explanation and refactoring, and organization-aware suggestions that learn from your repository and coding patterns. Tabnine targets teams and enterprises that need strong data governance — offering private, on-premises, VPC, and air-gapped deployment models as well as local model execution options so source code can be kept inside controlled environments.

### Languages
- Python
- JavaScript
- TypeScript
- Java
- C#
- Go
- Rust
- PHP
- C/C++
- Other
  - Many other popular languages (wide IDE/language support)

### Notes
- Strengths: strong privacy and governance features (SSO/SAML, SCIM, role-based access controls), flexible deployment (cloud, private cloud/VPC, on-prem, air-gapped), broad IDE support (VS Code, JetBrains IDEs, Visual Studio), and organization-aware completions that learn project patterns.
- Limitations: free/basic tier availability was reduced in 2025; on-prem/self-hosted deployments require operational expertise (Kubernetes, infra); most public performance benchmarks are vendor-provided — evaluate with a pilot before enterprise-wide roll-out.
- Ideal for: regulated industries (finance, healthcare, government, defense) and organizations that need data residency guarantees and enterprise governance.

### Last Update
2025-11-15
- Notable recent releases and highlights: v5.24.4 (2025-10-29) improvements to VS Code binary updates, chat Apply function and Agent robustness; v5.24.0 (2025-10-16) added hybrid search, markdown-from-remote codebase context, switchable/self-hosted model support (Qwen, Gemma), and Podman support. Multiple 2025 releases added SCIM/IdP sync, remote context scope (remote files/folders, terminal), and CSV usage reports.
-

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- No
  - Any additional details: Tabnine sunset its free Basic plan in 2025; access is primarily through paid tiers or enterprise licensing. Trial or pilot options may still be available via sales.

## MCP-Client

### MCP-Client
- Yes
  - Tabnine/Tabnine Agent supports Model Context Protocol (MCP) servers configured via an mcp_servers.json file. The Agent can launch local STDIO MCP servers, connect to remote MCP endpoints (HTTP/SSE), and manage server lifecycle for integrations that expose external tooling and data to the assistant.
  - Examples: local STDIO servers (command + args), remote HTTP endpoints with JWT/API key headers, and transport detection based on configuration.

### Prompts
- Yes
  - Tabnine offers an in-IDE chat interface that accepts freeform prompts and supports shared custom commands, concise chat modes, and @mentions. Users can paste or open file contents into the chat to provide explicit context; the chat can also accept custom commands and templates in enterprise deployments.

### Tools
- Yes
  - Tabnine exposes actionable tooling via its chat and Agent features: Apply (patch/apply edits), shared custom commands, Agent-driven automations, and integration with MCP servers to surface external tools (e.g., CI/CD, databases, cloud APIs) into the assistant workflow.

### Resources
- Yes
  - Tabnine consumes indexed workspace files, open-file contents, remote-repo contexts (when configured), and terminal context (optional). Enterprise/local deployments can restrict which files are indexed and whether content is sent to cloud models; MCP servers can expose additional structured resources.

## Deployment

### BYOK
- Yes
  - Tabnine supports OpenAI API-compatible endpoints and private certificate authorities for enterprise integrations, and allows organizations to configure custom model endpoints or self-hosted model deployments (Gemma, Qwen, etc.). These capabilities let enterprises use their own model endpoints and credentials in managed/private deployments.

### LocalOffline
- Yes
  - Supports local model execution and private/on-prem deployments. Offers VPC and air-gapped installation options for organizations with strict data residency and compliance requirements.

## Developer Experience

### ContextManagement
- Yes
  - Tabnine maintains and uses workspace context through a local project index and live file analysis. Methods for managing and updating context include:
    - Workspace indexing: Tabnine scans and indexes files in the opened project to provide organization-aware suggestions.
    - Include/exclude patterns: Users can configure which folders/files to exclude from indexing (via IDE plugin settings) to limit or focus context.
    - Re-index / refresh: IDE settings provide ways to re-index or refresh the local project index when the codebase changes.
    - Privacy controls: Enterprise and local deployments allow toggling whether code is sent to cloud models or kept local, which affects what context is available to cloud vs local models.
    - Model selection and scope: Admin-level settings in enterprise deployments can control which models are used and whether organizational learning (repository-level learning) is enabled.

### DirectFileReferences
- Yes
  - Tabnine consumes the indexed workspace and open-file contents as direct input for completions. Ways files can be referenced in context:
    - Implicit referencing: The completion engine automatically uses related files from the indexed workspace (imports, definitions, tests) to inform suggestions.
    - Editor-driven references: Opening a file or selecting text in the IDE surfaces that content to the completion/chat features; pasting file content into the chat or prompt allows explicit use of that file's contents.
    - Configuration controls: Include/exclude and scope settings control which files are considered part of the context. There is no documented API to request a file by arbitrary path inside the assistant prompt — use the editor or paste contents into the chat for explicit, ad-hoc references.

### Checkpoints
- No

### GitSupport
- Yes
  - Tabnine is repository-aware and supports multi-repo indexing and context. Notable integrations and capabilities:
    - Multi-repo awareness: Tabnine can index and reason across multiple repositories to provide cross-repo completions.
    - Perforce support: Local indexing support for Perforce (p4config/p4ignore) was added in 2025.
    - Indexing controls: Admins and users can configure which repositories and folders are indexed to meet privacy and performance requirements.

## Extensible

### Extensible
- Yes

### Plugins
- No

### Hooks
- No

### SlashCommands
- No

### CustomModes
- Yes
  - While Tabnine does not provide a full agent-creation framework, it exposes many configurable modes and admin controls including completion behaviour settings (whole-line vs token, multiline), model & deployment choices, policy & privacy settings, and per-workspace configuration that produce different operational modes per repo.

### Subagents
- No

## Ungrouped Criteria

### Terminal
- No

### SpecDrivenDevelopment
- Other
  - Tabnine does not natively implement a spec-driven development framework. It is workflow-agnostic and can be used alongside SDD tools (Tessl, OpenSpec, etc.) but offers no built-in spec-to-code or spec-management features. Enterprise customers can integrate Tabnine into their development workflows (including spec-driven ones) by configuring model training, repository indexing, and IDE settings to align with SDD practices.
