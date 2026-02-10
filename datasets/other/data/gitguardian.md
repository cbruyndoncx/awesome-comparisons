# GitGuardian - https://www.gitguardian.com

Non-Human Identity (NHI) security platform specializing in secrets detection and remediation, with an official MCP server that brings real-time secrets scanning directly into AI-powered development environments.

## General Info

### Classification
- Code/Other

### Version
- 0.5.0 (MCP Server - ggmcp)
  - GitGuardian platform latest update: February 2, 2026 (Dark Mode and UI improvements)
  - MCP server (ggmcp) version 0.5.0 available via GitHub
  - Python SDK (pygitguardian) version 1.29.0 released January 27, 2026

### Repo
- https://github.com/GitGuardian/ggmcp
  - MCP server for scanning and remediating hardcoded secrets
  - Organization: https://github.com/GitGuardian
  - Additional tools: ggshield (CLI for secret scanning), ggcanary (Terraform for canary tokens)

### Rating
- Highly Regarded
  - G2 Rating: 4.8/5 stars (214+ reviews)
  - #1 app on GitHub Marketplace
  - SOC 2 compliant
  - Trusted by major enterprises including Euronext, BASF, Datadog

### Short Description
- Security platform with MCP server integration providing real-time secrets detection and remediation directly in AI-powered IDEs, scanning for 500+ credential types to prevent leaks before code commits.

### Description
GitGuardian is a Non-Human Identity (NHI) security platform that specializes in detecting and remediating hardcoded secrets and credentials across the software development lifecycle. The platform uses battle-tested detection algorithms to identify 500+ types of secrets including API keys, database credentials, certificates, and tokens in code repositories. In July 2025, GitGuardian launched its official Model Context Protocol (MCP) server (ggmcp), bringing AI-assisted secrets security directly into developer workflows. The MCP server enables AI agents in IDEs like Cursor, Windsurf, and Claude Desktop to scan code for leaked secrets as developers write it, manage security incidents, and create honeytokens for unauthorized access detection - all without leaving the development environment.

GitGuardian provides comprehensive NHI governance with centralized inventory of secrets across vaults and identity sources, real-time monitoring of both internal repositories and public GitHub for exposed secrets, and automated remediation playbooks to streamline incident response. The platform offers deployment options as SaaS (US and EU regions) or self-hosted, with a free tier available. The MCP server operates with read-only permissions by default to ensure safe, non-destructive operations, and supports multiple authentication methods including OAuth, Personal Access Tokens, and per-request authorization for different deployment scenarios.

### Languages
- Any
  - GitGuardian scans code in any programming language
  - MCP server (ggmcp) is implemented in Python

### Notes
- 500+ secret detectors: Industry-leading API detects credentials, API keys, database passwords, certificates, and other sensitive data.
- MCP server integration: Official ggmcp server released July 2025 for AI IDE integration.
- Real-time detection: Scan code as it's written within Cursor, Windsurf, Claude Desktop, and Zed Editor.
- Incident management: View, assign, and resolve security incidents related to current projects.
- Honeytoken creation: Generate deceptive tokens to detect unauthorized access attempts.
- Multiple authentication methods: OAuth (default), Personal Access Token, and per-request authorization.
- Read-only by default: MCP server operates with read-only permissions to prevent unintended destructive actions.
- Multi-region support: US SaaS, EU SaaS, and self-hosted deployment options.
- Git hooks and CI/CD integration: ggshield CLI provides pre-commit hooks and pipeline integration.
- Free tier available: dashboard.gitguardian.com offers free access.
- Open-source MCP server: ggmcp released under MIT license.
- **2025-2026 updates:**
  - MCP server (ggmcp) launched July 2025 for AI-assisted secrets security in developer workflows.
  - Dark Mode and refreshed UI released February 2, 2026 with improved contrast and navigation.
  - Integration with major AI coding platforms: Cursor, Windsurf, Claude Desktop, Zed Editor, and ChatGPT (via OpenAPI/mcpo).
  - Automated remediation capabilities: AI agents can remove hardcoded secrets and create .env example files.
  - Git history analysis: Agents can scan git history to identify remaining hardcoded secrets.
  - Safety-first design: Sandboxed operations limited to safe, non-destructive tasks.
  - Version 0.5.0 of ggmcp with enhanced stability and feature set.

### Last Update
- 2026-02-09

## Licensing

### Opensource
- Yes
  - MCP server (ggmcp) is open source
  - GitGuardian platform is proprietary

### License
- MIT
  - MCP server (ggmcp) uses MIT license
  - GitGuardian platform is proprietary/commercial

### Free Trial
- Yes
  - Free tier available at dashboard.gitguardian.com
  - MCP server is fully open source and free to use

## MCP-Client

### MCP-Client
- No
  - GitGuardian provides an MCP server, not an MCP client

### Prompts
- No

### Tools
- No

### Resources
- No

### ACP
- No

## Deployment

### BYOK
- No
  - GitGuardian is a security service, not an AI assistant (doesn't use LLM API keys)
  - Requires GitGuardian API token or Personal Access Token for authentication

### Local Offline
- Yes
  - Self-hosted deployment option available
  - MCP server can run locally with stdio transport

## Developer Experience

### Context Management
- Yes
  - MCP server provides context-aware incident management for current projects

### Direct File References
- Yes
  - Scans specific files and directories for secrets

### Checkpoints
- No

### Git Support
- Yes
  - Git hooks via ggshield CLI
  - Git history scanning for hardcoded secrets
  - Integration with GitHub, GitLab, Bitbucket, and other VCS platforms

## Extensible

### Plugins
- No

### Hooks
- Yes
  - Pre-commit hooks via ggshield
  - CI/CD pipeline integration

### SlashCommands
- No

### Skills
- No

### Custom Modes
- No

### Subagents
- No
