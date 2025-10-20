# GitHub Copilot Workspace - https://github.com/features/copilot
A cloud-hosted, agentic development environment experiment from GitHub (technical preview). Copilot Workspace combined multi-agent planning, editable specifications, and automated implementation to help developers plan, write, test and iterate on code using natural language prompts.

## Version
Archived v0.1 (2025-05-30)

## Rating
- [4] Innovative workflow and planning UX (spec + editable plan)
- [3] Integration with Codespaces and VS Code is useful
- [2] Limited availability — technical preview ended / not generally available

## Repository
- 

## Languages
- Any

## Extensible
- Yes

## Description
GitHub Copilot Workspace was an experimental "agentic" IDE hosted by GitHub that let developers describe tasks in natural language, review an auto-generated specification and a concrete editable plan, and then apply changes across a repository. It used multiple specialized agents (planning, brainstorm, repair, follow-up) to propose implementations, run tests, and iteratively fix failures. The environment integrated with Codespaces, provided an integrated terminal, and offered a VS Code extension to continue sessions locally.

## BYOK
- No

## LocalOffline
- No
  - All processing was cloud-hosted on GitHub's infrastructure; no documented offline/local model execution.

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- Yes

## Opensource
- No

## License
- Proprietary

## MCP-Client
- No

## Notes
- Technical preview was sunset on 2025-05-30; many concepts (agent workflows, follow-ups, plan-driven edits) were later folded into broader GitHub Copilot features and Copilot Spaces.
- Known features: editable two-stage steering (specification + plan), brainstorm agent, repair agent for failing tests, follow-up system to fix dependent files across large repositories, integrated terminal with secure port forwarding, Codespaces integration, VS Code extension for session continuity.
- Model: GitHub reported experimenting with multiple models and selected GPT-4o for the Workspace preview; subsequent Copilot features support multiple model backends.
- Limitations: no documented BYOK or local/offline execution; service was cloud-only and proprietary. Pricing and GA plans were not published for the technical preview prior to sunset.
- Useful when comparing AI coding environments for enterprise adoption: strong UX for large-scope edits and planning, but lack of on-prem/local model options and the preview's discontinuation reduce viability for locked-down environments.
