# Amazon Q Developer- https://aws.amazon.com/q/
Amazon Q Developer (sometimes shortened to "Amazon Q") is AWS's developer-facing generative-AI platform that provides conversational assistance, code generation, and developer tooling integrated directly into popular IDEs and the AWS Console. It consolidates earlier AWS coding assistants (including CodeWhisperer) into a single experience and adds workspace-aware chat, documentation generation, security scanning, and integrations with external context providers.

## Version
vN/A (2025-10-19)

## Classification 
- Code/Editor

## Rating
- [4] IDE & AWS integration (deep integration with AWS services and IDE toolchains)
- [4] Productivity (context-aware chat, inline suggestions, code actions, and docs generation)
- [3] Privacy/enterprise controls (cloud-hosted, limited BYOK/local/offline options)
- [4] Extensibility (MCP/plugins and third-party integrations)

## Repository
- https://aws.amazon.com/q/ (service documentation)

## Languages
- Any
## Extensible
- Yes
  - Supports Model Context Protocol (MCP) connections and a plugin/alias system for third-party tooling (monitoring, security providers)

## Description
Amazon Q Developer is an AWS-hosted generative-AI assistant for developers that embeds into IDEs (VS Code, JetBrains family, Eclipse, Visual Studio) and the AWS Console. It provides:
- Conversational chat and agentic workflows for understanding and modifying code
- Inline suggestions and code actions (Explain, Refactor, Fix, Optimize, Generate Tests, etc.) directly from the editor
- Documentation generation (e.g., create README or component docs via chat commands)
- Security scanning and guidance surfaced alongside code suggestions
- Integrations with external context providers through MCP and plugin aliases (e.g., CloudZero, Datadog, Wiz)
- Code transformation and migration helpers for language/OS modernization

Amazon Q unifies prior AWS assistants (CodeWhisperer features were integrated into the Amazon Q experience in 2024) and is intended to accelerate development on AWS services while providing deeper context about a project and its cloud resources.

## BYOK
- No

## LocalOffline
- No

## FreeTrial
- Yes
  - Notes: AWS has offered free tiers or developer-friendly access for prior services (CodeWhisperer) and provides Builder ID sign-in options; enterprise pricing & feature bundles for Amazon Q are documented in AWS pricing/docs.

## GitSupport
- Yes
  - Works with repository workflows via IDE integrations; generated suggestions and transformations can be applied to local repos but require human review for correctness and licensing.

## Terminal
- No
  - Primary surface: IDE plugins and AWS Console chat. There is no official terminal-only interactive CLI assistant equivalent documented as the main surface.

## Opensource
- No

## License
- Proprietary

## MCP-Client
- Yes
  - Notes: Supports Model Context Protocol / MCP server connections to bring external context into conversations and agent workflows.

## Notes
- Supported IDEs: Visual Studio Code, JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.), Eclipse, and Visual Studio — feature parity varies by IDE (VSCode and JetBrains typically have the richest feature set).
- Authentication: Supports AWS Builder ID and IAM Identity Center. Builder ID allows individuals to use Amazon Q without an AWS account; IAM Identity Center sessions for Amazon Q may have extended durations (90 days for setups created on/after 2024-04-18 in some configurations).
- Example editor actions: select code → right-click → Amazon Q → Explain / Refactor / Fix / Optimize / Generate Tests / Send to Prompt / Inline Chat.
- Documentation generation: a chat command (e.g. `/doc`) can be used to create README or other docs by analyzing the workspace.
- Security & reference tracking: inherits capabilities from CodeWhisperer lineage — surfaces potential vulnerabilities, license/reference links when generated code closely matches examples, and provides remediation guidance.
- Third-party plugins: Amazon Q supports integrations with monitoring/security providers via a plugin alias system in the AWS Console; examples reported include CloudZero, Datadog, Wiz (these pull provider data via APIs and Q surfaces results and deep links without sending the user's chat content to the provider).
- Use cases: onboarding and code comprehension, generating boilerplate, test generation, migrating or modernizing code, documenting projects, security scanning and remediation guidance, and creating AWS infra-aware code snippets.
- Limitations: cloud-hosted (no fully local/offline mode), generated code requires human review for correctness/security/licensing, enterprise controls and BYOK options are limited compared to self-hosted offerings.
- Related: Amazon CodeWhisperer functionality was consolidated into Amazon Q Developer around April 2024; for legacy references check CodeWhisperer docs (https://aws.amazon.com/codewhisperer/).

