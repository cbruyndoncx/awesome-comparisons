# Droid CLI - https://factory.ai/product/cli

Droid CLI is part of Factory AI's developer platform, offering AI assistants (called Droids) inside IDEs and terminals that maintain context across tools and workflows. Droid is the #1 software development agent on Terminal-Bench.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal
- Code/Autonomous agent

### Version
- 2025

### Repo
- -

### Rating
- [4] State-of-the-art Terminal-Bench performance (58.75% on v0.1.1), rich MCP integration, custom droids and skills
- [3] Proprietary platform; enterprise pricing may limit individual adoption

### Short Description
AI software engineering agent from Factory AI that operates in terminals and IDEs with persistent contextual memory across workflows.

### Description
Droid CLI is Factory AI's autonomous coding agent that provides interactive AI assistants inside IDEs and terminals while maintaining contextual memory across different tools and platforms. With a score of 58.75% on Terminal-Bench, Droid sets the new state-of-the-art for AI agents' ability to complete complex end-to-end tasks in terminal environments.

The platform offers code completion, PR review suggestions, automated fixes, and can automate workflows from design docs to CI and review. Droid Exec is Factory's headless CLI mode that runs non-interactive commands for automation in CI pipelines, cron jobs, pre-commit hooks, and batch operations. Droids keep their knowledge across tools and platforms, following users through their workflow without losing context.

### Languages
- Any

### Notes
- Terminal-Bench Performance: 58.75% on v0.1.1 (state-of-the-art), testing 80 human-verified, Dockerized tasks
- Benchmark Coverage: Coding, build/test, dependency management, data/ML workflows, systems, networking, security, and core CLI
- Free Trial: 20M tokens included
- Droid Exec: Headless CLI mode for automation (CI pipelines, cron jobs, pre-commit hooks)
- Persistent Context: Maintains knowledge across tools and platforms
- Features: Code completion, PR reviews, automated fixes, workflow automation
- Installation: Simple curl command to get started

### Last Update
2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - 20M tokens included

## MCP-Client

### MCP-Client
- Yes
  - Native MCP tool system with three autonomy levels (low, high, confirmation-free). Supports streamable HTTP servers, parallel tool confirmations, and per-server tool enable/disable.

### Prompts
- Yes

### Tools
- Yes
  - Interactive and headless CLI modes
  - Code completion and PR review tools
  - Automated workflow tools

### Resources
- Yes
  - Official documentation: https://docs.factory.ai/cli/getting-started/quickstart
  - Product page: https://factory.ai/product/cli
  - Features: https://factorycli.com/features

### ACP
- No

## Deployment

### BYOK
- Yes
  - Custom BYOK models loaded from settings.json. Supports GPT-5.2 and other providers via model selector.

### Local Offline
- No

## Developer Experience

### Context Management
- Yes
  - Droids maintain contextual memory across tools and platforms
  - Persistent knowledge throughout workflows

### Direct File References
- Yes

### Checkpoints
- No

### Git Support
- Yes
  - PR review suggestions and automated fixes
  - Workflow automation from design docs to CI

## Extensible

### Plugins
- No

### Hooks
- Yes
  - 7 lifecycle hook types with configurable exit codes (success, warning, block, abort). Permanently enabled, no longer experimental. Configurable via `/hooks` command.

### SlashCommands
- Yes
  - Built-in commands: `/statusline`, `/wrapped`, `/settings`, `/hooks`. Tab auto-completion for custom commands.

### Skills
- Yes
  - Auto-included Skill tool in custom droids. LLM-powered auto-generation of custom droids for specialized tasks.

### Custom Modes
- Yes
  - Interactive mode (chat-first REPL) and Droid Exec (headless single-shot for CI/CD). Spec mode presents multiple implementation options.

### Subagents
- Yes
  - Custom droids enabled by default. Specialized types: Reliability Droid (incidents), Product Droid (tickets/PM), Knowledge Droid (codebase analysis), Tutorial Droid (onboarding).

## Ungrouped Criteria

### Terminal
- Yes

