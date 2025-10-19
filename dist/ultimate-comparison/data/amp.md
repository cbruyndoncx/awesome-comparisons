# Amp - https://sourcegraph.com/amp
A research-preview, agentic AI coding assistant from Sourcegraph that focuses on autonomous, multi-step code reasoning and high-quality code edits rather than simple autocomplete. Runs as a VS Code extension and a CLI, and integrates with the Model Context Protocol (MCP) and project-level AGENT.md conventions to produce context-aware changes.

## Version
(2025-10-19)

## Rating
- [4] Interface / UX (user-reported)
- [4] Code quality
- [4]] Input processing (understanding intent)
- [3] Accuracy
- [3] Documentation / Community support
- [3] Update cadence / shipping

## Repository


## Languages
- Any

## Extensible
- Yes

## Description
Amp is designed as an "agentic" coding assistant that can autonomously reason through multi-step programming tasks, propose and apply coordinated code edits, and collaborate via shared conversation threads. It prioritises quality over token limits, dynamically selects high-quality models (e.g., Claude Sonnet 4 where available), and exposes both an IDE extension and a CLI for flexible workflows.

## BYOK
- Yes

## LocalOffline
- Yes
  - Supports MCP servers which can point to local or self-hosted model/context providers

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- Yes

## Opensource
- No

## License


## MCPSupport
- Yes

## Notes
- Agentic design: Amp works as an autonomous agent that can perform multi-step reasoning, gather context from the repo, and iteratively refine changes.
- AGENT.md integration: Amp reads project AGENT.md files to adopt repo-specific conventions and standards, improving alignment with existing codebase patterns.
- Extended thinking: Supports adjustable "thinking budget" for deeper, higher-quality reasoning on complex tasks.
- Thread sharing & collaboration: Conversation threads can be synced and shared to a web console for team collaboration, knowledge sharing, and reproducibility of AI-driven change sequences.
- Command allowlisting: Security control that limits which shell/CLI commands the agent may execute, stored with project settings.
- Dual environment: Both VS Code extension and CLI are available — the CLI enables parallel, lightweight agent runs; the extension surfaces suggestions inline while preserving developer workflows.
- Security & testing: Best used alongside automated security testing (DAST/SAST) to catch vulnerabilities introduced during rapid AI-driven edits.
- Use cases: large-scale refactors, implementing cross-cutting features, writing complex algorithms, creating board-level changes spanning multiple files.
- Market position: Positioned as a next-generation, high-quality AI coding agent for teams wanting autonomous assistance beyond standard completion tools.

