# ToolJet - https://www.tooljet.com/
Open-source, low-code internal app builder with visual drag-and-drop authoring, extensible connectors, and optional AI-driven app generation.

## Version
v (2025-10-19)

## Rating
- [4] Strong for building internal dashboards and admin tools rapidly
- [5] Active open-source community and increasingly capable AI features
  
## Repository
- https://github.com/ToolJet/ToolJet

## Languages
- TypeScript / JavaScript
- Python
- SQL

## Extensible
- Yes
  - Custom connectors, plugins, and ability to import React components; CLI for extensions

## Description
ToolJet is an open-source low-code platform focused on building internal tools, dashboards, and admin applications quickly. It provides a visual drag-and-drop app builder, a built-in Postgres-backed "ToolJet Database" editor, workflow automation, and connectors to many external data sources. For organisations that need AI-assisted development, ToolJet offers enterprise features that generate apps from prompts, assist with query-building, and provide AI debugging and agent-builder capabilities.

## BYOK
- Yes
  - Users provide their own API keys for third-party services and LLMs when configuring integrations.

## LocalOffline
- Yes
  - Self-hostable via Docker and Kubernetes; can be run on-prem or in isolated/cloud VPCs.

## FreeTrial
- Yes
  - Community Edition is free and open-source; paid plans offer additional features and hosted options.

## GitSupport
- Yes
  - GitSync / CI integrations for versioning (GitHub/GitLab supported in paid/enterprise tiers).

## Terminal
- Yes
  - Supports JavaScript/Python snippets inside apps and provides a CLI for developers.

## Opensource
- Yes

## License
- Apache-2.0

## MCPSupport
- No

## Notes
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

