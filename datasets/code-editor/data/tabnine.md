# Tabnine - https://www.tabnine.com
AI-powered code completion and developer assistant focused on privacy and enterprise deployment

## General Info

### Classification
- Code/Editor

### Version
v(enterprise/cloud) (2025-10-19)

### Repo
-

### Rating
- [4] Strong for enterprises that require data privacy and on-prem deployment
- [3] Good code-completion quality; real-world accuracy varies by codebase

### Short Description
<!-- ToDo -->

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
<!-- ToDo -->
<!-- Note Date last updated -->
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
<!-- ToDo -->
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

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
<!-- ToDo -->
<!-- Bring Your Own LLM API Key supported -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

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
<!-- ToDo -->
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

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
  - While Tabnine does not provide a user-facing "create-your-own-agent" framework, it exposes configurable modes and behavior controls that let teams tailor the assistant experience:
    - Completion behaviour settings: Options for whole-line vs single-token suggestions, multiline completions, and acceptance behavior.
    - Model & deployment choices: Switch between local, private cloud, or vendor-hosted models; enterprise customers can enable organizational/model training or restrict to local models.
    - Policy & privacy settings: Admin-enforced policies (data-sharing, telemetry, model training opt-outs) alter how the assistant behaves across projects.
    - Workspace configuration: Per-project settings (exclude paths, language-level tuning) effectively produce different operational "modes" per repo.

### Subagents
- No

## Ungrouped Criteria

### Terminal
- No

### SpecDrivenDevelopment
- Other
  - Tabnine does not natively implement a spec-driven development framework. It is workflow-agnostic and can be used alongside SDD tools (Tessl, OpenSpec, etc.) but offers no built-in spec-to-code or spec-management features. Enterprise customers can integrate Tabnine into their development workflows (including spec-driven ones) by configuring model training, repository indexing, and IDE settings to align with SDD practices.
