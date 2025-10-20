# Ona (Gitpod) - https://ona.com
Cloud development environments reimagined as autonomous AI engineering platform.

## Version
v1.0 (2025-09-01)

## Classification 
- Code/Editor

## Rating
- [4] Strong enterprise features and security posture
- [5] Highly productive autonomous agents for routine engineering tasks
  
## Repository
- https://github.com/gitpod-io/gitpod
  
## Languages
- Any

## Extensible
- Yes

## Description
Ona is the rebrand and strategic evolution of Gitpod into an AI-first software engineering platform. Building on Gitpod's one-click, preconfigured cloud development environments, Ona layers autonomous AI "agents" that can plan, implement, test, review, and (with guardrails) deploy code inside secure, sandboxed environments. The platform is organized around three core pillars: Ona Environments (declarative, API-first dev environments with sandboxing and VPC deployment options), Ona Agents (autonomous AI collaborators that operate via natural language, IDE integrations, or automation pipelines), and Ona Guardrails (RBAC, audit trails, command controls, and compliance features for enterprise governance). Ona targets developer productivity at scale for both individual teams and large regulated enterprises.

## BYOK
- Yes

## LocalOffline
- Yes
  - Ona supports private VPC and on-prem/private-hosted deployments for enterprises but is not a fully offline/local-only product.

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- Yes

## Opensource
- Yes
  - Core Gitpod components remain open-source; some agent and enterprise-grade features are commercial/proprietary.

## License
- MIT 
  - core open-source components

## MCP-Client
- Yes

## Notes
- Ona represents a shift from IDE-as-product to "mission control" for autonomous engineering agents; the rebrand reflects this broader scope.
- Autonomous agents can operate with high independence inside sandboxed environments, enabling workflows where agents co-author, test, and merge code with minimal human intervention.
- Enterprise features include VPC deployment, SSO/OIDC, RBAC, command deny lists, and full audit trails—important for regulated industries.
- Reported internal metrics (company) indicate substantial productivity gains (agents co-authoring a large share of merged PRs); real-world gains will vary by org and workflow maturity.
- Good fit for teams that want to adopt AI-driven automation while retaining strict governance and compliance controls.
- Limitations: true autonomous workflows require careful policy and guardrail configuration; smaller teams without enterprise needs may not need the full Ona stack.
- Recommended evaluation steps: trial with a sandbox project, configure guardrails and VPC options, measure agent outputs against existing PR and review metrics, and validate audit/compliance reporting.
