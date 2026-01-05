# ToolJet - https://www.tooljet.com/
Open-source, low-code internal app builder with visual drag-and-drop authoring, extensible connectors, and optional AI-driven app generation.

## General Info

### Classification
- Product/Prototyping

### Version
- Unknown (2025-10-19)
  - Check https://github.com/ToolJet/ToolJet for current version

### Repo
- https://github.com/ToolJet/ToolJet

### Rating
- [4] Strong for building internal dashboards and admin tools rapidly
- [5] Active open-source community and increasingly capable AI features

### Short Description
Open-source low-code internal app builder for rapidly creating internal tools, dashboards, and admin panels with a visual drag-and-drop UI, 75+ connectors, a built-in Postgres-backed "ToolJet Database", and optional AI-assisted app generation and agent automation.

-

### Description
ToolJet is an open-source low-code platform focused on building internal tools, dashboards, and admin applications quickly. It provides a visual drag-and-drop app builder, a built-in Postgres-backed "ToolJet Database" editor, workflow automation, and connectors to many external data sources. For organisations that need AI-assisted development, ToolJet offers enterprise features that generate apps from prompts, assist with query-building, and provide AI debugging and agent-builder capabilities.

### Languages
- TypeScript
- JavaScript
- Python
- SQL

### Notes
- Key features:
  - Visual app builder with ~60+ UI components (tables, charts, forms, lists, etc.)
  - 75+ data source connectors (SQL/NoSQL, REST, GraphQL, SaaS APIs, cloud storage, LLMs)
  - Built-in ToolJet Database (Postgres-based editor) for quick data-driven apps
  - Workflow automation and server-side actions
  - Ability to run JS/Python for custom logic and transformations
  - Extensible via plugins, custom connectors, and CLI

- AI & Enterprise features:
  - Natural-language AI App Generation (generate app scaffolding from prompts)
  - AI Query Builder and AI Debugging utilities
  - Agent Builder for automating workflows
  - Advanced security, SSO, audit logs, and fine-grained RBAC in enterprise plans

- Security & deployment:
  - Supports self-hosting (Docker/Kubernetes) and cloud deployments (AWS/GCP/Azure)
  - Encryption and proxy-only data flows advertised; enterprise features include compliance controls

- Pricing summary (high-level):
  - Community Edition: free and open-source
  - Paid tiers: monthly per-builder / per-seat pricing for hosted and team features; enterprise/custom pricing for large deployments and SLA/support
  - Pricing and feature boundaries for AI capabilities vary; many AI conveniences are enterprise-tier features

- Limitations / considerations:
  - Self-hosting and scaling require infra expertise (K8s/Docker, DB management)
  - Complex data transformations sometimes need custom code (JS/Python)
  - Some advanced AI and enterprise features behind paid plans
  - Generated apps may still require manual refinement for production-grade behaviour and security
- MCP Support
  - Tooljet has native API integrations
  - Tooljet does not support MCP Servers
  - Tooljet itself has an MCP server , so can integrate with your MCP clients
- Useful links:
  - Official site: https://www.tooljet.com/
  - Docs: https://docs.tooljet.com/
  - GitHub: https://github.com/ToolJet/ToolJet

### Last Update
- 2025-11-15
  - Note: This date may reflect documentation update; actively maintained open-source project

## Licensing

### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- Yes
  - Community Edition is free and open-source; paid plans offer additional features and hosted options.

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - ToolJet supports natural-language prompting via its "Build with AI" app generation, AI Query Builder, and AI Debugging features. Users can provide prompts to scaffold apps, generate and refine queries (SQL/NoSQL), and receive AI-assisted debugging and suggestions. ToolJet integrates with LLM providers (e.g., OpenAI) allowing prompt templates and parameter controls. See the official docs for examples and guidance: https://docs.tooljet.com/

### Tools
- Yes
  - ToolJet exposes callable building blocks that function as "tools" for automations and agents: Agent Builder/automation workflows, server-side actions, queries, connectors (databases, REST/GraphQL, SaaS), and custom connectors/components. These can be orchestrated by AI agents or triggered from generated apps.

### Resources
- Yes
  - Official docs: https://docs.tooljet.com/
  - GitHub repo and examples: https://github.com/ToolJet/ToolJet
  - Community tutorials, sample apps, and videos demonstrating AI features and prompt examples.

## Deployment

### BYOK
- Yes
  - Users provide their own API keys for third-party services and LLMs when configuring integrations.

### Local Offline
- Yes
  - Self-hostable via Docker and Kubernetes; can be run on-prem or in isolated/cloud VPCs.

## Developer Experience

### Context Management
- Yes
  - ToolJet exposes multiple ways to manage and surface runtime/contextual data to apps: the built-in globals object (globals.currentUser, globals.groups, globals.theme, globals.urlparams, globals.environment, globals.modes), component bindings and template expressions (eg. {{components.myInput.value}}, {{queryName.data}}), URL parameters, environment identifiers, and the Inspector panel in the app builder that shows available context paths. ToolJet also supports external context integrations via the MCP (Model Context Protocol) bridge for AI assistants and programmatic access to users/workspaces/apps.

### Direct File References
- No
  - ToolJet apps do not provide arbitrary direct filesystem path access inside the app runtime. Files are handled via file-upload / file-picker components, storage connectors (S3, Google Cloud Storage, etc.), the ToolJet Database or external APIs; assets and uploaded files are referenced by URL or connector-managed storage rather than local filesystem paths.

### Checkpoints
- Yes
  - ToolJet supports versioning and rollback patterns via GitSync / CI integrations (GitHub/GitLab) and app versioning features (enterprise/hosted features). For self-hosted deployments you can also rely on database backups and container snapshots to restore state. Note that the availability and convenience of these checkpointing/rollback features depend on the edition (community vs. enterprise) and how you configure persistence/versioning.

### Git Support
- Yes
  - GitSync / CI integrations for versioning (GitHub/GitLab supported in paid/enterprise tiers).

## Extensible

### Extensible
- Yes
  - Custom connectors, plugins, and ability to import React components; CLI for extensions

### Plugins
- Yes
  - ToolJet is extensible: it supports custom connectors, plugins, importing React components, server-side actions, and a CLI for building extensions. Connectors let you add new data sources or SaaS integrations; custom components let you extend the UI beyond the built-in components.

### Hooks
- Yes
  - ToolJet provides event hooks and lifecycle triggers you can attach to: component events (onClick, onChange, onRowClick, etc.), query lifecycle hooks (onSuccess, onError, onFinally), page load / on-load actions, and server-side / automation workflows. These hooks are configured in the UI and can run JS/Python snippets, trigger queries, or call server-side actions.

### SlashCommands
- No
  - There is no built-in "slash command" palette feature documented as a first-class capability. Developers can implement their own command-like UI (input + event handlers) to emulate slash-commands or quick actions within an app.

### Custom Modes
- Yes
  - ToolJet includes built-in modes (edit, preview, view) surfaced via globals.modes and the Inspector. While there isn't a single "custom modes" API, developers can emulate custom modes and alternate UX states using URL parameters (globals.urlparams), environment identifiers (globals.environment), conditional rendering and logic driven by globals or app-level variables.

### Subagents
- Yes
  - ToolJet provides AI/automation capabilities (Agent Builder / automation workflows in enterprise editions) that act like specialized subagents: they can orchestrate queries, connectors, and LLM calls to automate tasks or respond to prompts. Additionally, integrations with LLMs and MCP enable external AI assistants to interact with ToolJet programmatically.

