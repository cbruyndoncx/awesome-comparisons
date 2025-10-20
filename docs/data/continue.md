# Continue - https://continue.dev
Open-source AI coding assistant focused on developer control, model choice, and IDE/CLI integration.

## Version
v (2025-10-19)

## Rating
- [4] Strong customization and model choice
- [4] Good IDE & CLI coverage (VS Code, JetBrains, terminal)
- [3] Hub & team features maturing (1.0 release)

## Repository
- https://github.com/continuedev/continue

## Languages
- Any

## Extensible
- Yes
  - Continue is built to be extensible via blocks, MCP integrations and a hub for sharing assistants.

## Description
Continue is an open-source AI coding assistant and platform that brings AI capabilities into editors (VS Code, JetBrains), the terminal (CLI) and CI/CD workflows. It emphasizes developer control: choose models (cloud or local), customize prompts and agents, and run fully local/offline when required. The platform includes IDE extensions, a CLI (cn) with interactive and headless modes, and an optional Continue Hub for sharing and managing assistant building blocks.

## BYOK
- Yes
  - You can configure and use your own API keys and model endpoints, and switch between local/remote models.

## LocalOffline
- Yes
  - Supports local model workflows (e.g. via Ollama/local LLMs) and headless/offline operation for air-gapped environments.

## FreeTrial
- Yes
  - A free/solo tier exists (open-source extensions + hub access for public/shared blocks). Paid team/enterprise tiers add governance and private deployment options.

## GitSupport
- Yes
  - Native integrations (MCP-style integrations) for GitHub and git workflows; automation via CLI for PR/comments/summaries.

## Terminal
- Yes
  - The `cn` CLI provides an interactive TUI and a headless mode for scripted and CI uses.

## Opensource
- Yes
  - The project is open-source and community contributions are actively encouraged.

## License
- Apache-2.0

## MCP-Client
- Yes
  - Integrates with Model Context Protocols for adding context providers (GitHub, Jira, etc.) and usable via the hub.

## Notes
- Strengths:
  - Model-agnostic: swap between OpenAI, Anthropic, local LLMs, etc.
  - Full-stack integration: editor + terminal + CI/CD automation paths.
  - Privacy-first options: private data planes & local-only operation available for enterprises.
  - Extensible hub: shareable building blocks and verified partner integrations.

- Limitations & considerations:
  - 1.0 release stabilizes core features but some team/enterprise workflows continue to evolve.
  - Running high-quality local models requires additional infrastructure (GPU/memory) and ops work.

- Use cases:
  - Individual developers: in-editor autocomplete, chat, and edit-by-instruction.
  - Teams: shared assistants, governance policies, and private deployments.
  - CI/CD: automated refactors, batch code updates, and repository-level maintenance via headless agents.

- Competitive positioning:
  - Competes with GitHub Copilot, Codeium, Cursor, and commercial offerings, but differentiates on openness, model choice, and privacy.

- Useful links:
  - Official site / docs: https://continue.dev
  - Hub: https://hub.continue.dev
  - GitHub: https://github.com/continuedev/continue