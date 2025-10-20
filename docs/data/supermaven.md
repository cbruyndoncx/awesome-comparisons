# Supermaven - https://www.supermaven.com
AI-first code completion assistant focused on very large context windows, low-latency completions, and deep codebase understanding.

## Version
v (2025-10-19)

## Rating
- [5] Performance & speed (sub-300ms completion latency in reported benchmarks)
- [4] Context awareness & long-range understanding (very large context window enables whole-repo reasoning)

## Repository
- 

## Languages
- Any

## Extensible
- Yes
  - Integrates with major IDEs (VS Code, JetBrains, Neovim) and offers chat integrations; product roadmap and integrations may expand

## Description
Supermaven is an AI-powered code completion and developer-assistant platform built to provide ultra-fast, context-aware code suggestions across large codebases. It uses a proprietary neural architecture (not a vanilla transformer) optimized for very large context windows and low-latency token generation. Supermaven emphasizes developer flow by surfacing near-instant completions, "next location" predictions (jumping to the file/spot where changes are needed), and an AI chat interface tailored to code review, diffs and codebase attachments.

## BYOK
- No

## LocalOffline
- No

## FreeTrial
- Yes

## GitSupport
- Yes
  - Integrates with IDEs and understands repository context; includes features that operate across the repo and work with recent edits

## Terminal
- No
  - Primary integrations are editor/IDE plugins; Supermaven also provides its own editor/IDE experience rather than a terminal-first tool

## Opensource
- No

## License
- Proprietary

## MCP-Client
- No

## Notes
- Key differentiators: extremely large context window (public claims up to 1,000,000 tokens in marketing material), very low latency (reported ~250ms), and "next location prediction" that can jump to the file/line where the assistant thinks a change belongs.
- Integrations: official support for Visual Studio Code, JetBrains family of IDEs, and Neovim. Also offers an integrated editor/IDE built around the Supermaven assistant.
- Models & chat: Supermaven runs its own inference for completions and provides a chat interface that can surface large-context diffs; some product messaging references integrations with third-party models for chat features.
- Pricing (public tiers, subject to change): Free tier available; Standard plan and Pro plan historically reported at roughly $18/month and $29/month respectively; enterprise plans available for organizations.
- Best fit: developers and teams working on medium-to-large codebases who need fast, context-rich completions and cross-file reasoning (e.g., refactors, large feature work, legacy code maintenance).
- Limitations/considerations: proprietary/cloud-hosted service (no confirmed fully offline/self-hosted option), potential privacy and compliance considerations for sensitive code — review enterprise offerings and data handling policies before adoption.

