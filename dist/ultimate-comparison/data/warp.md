# Warp - https://www.warp.dev
Modern AI-powered terminal and agentic development environment focused on unifying natural-language agents, terminal commands, and collaborative "Drive" features for teams.

## Version
v2.0 (2025-09-xx)

## Rating
- [5] Best-in-class terminal + AI integration (Agent Mode, Drive, Warp Code)
- [4] Commercial/proprietary product; some enterprise privacy controls but limited public BYOK/local-offline detail

## Repository
- https://www.warp.dev

## Languages
- Any

## Extensible
- Yes
  - Support for Workflows, Notebooks, Drive-based sharing and agent configuration

## Description
Warp is a modern terminal that has evolved into an "Agentic Development Environment" (ADE). It tightly integrates large language models and agent workflows with the command line, providing natural-language command generation, an interactive chat/agent interface (Agent Mode), collaborative Drive features (Workflows, Notebooks, shared Environment Variables), and code-focused tooling (Warp Code with diff-tracking). Warp's interface lets developers mix prompts and shell commands in a single input, run multi-step agent plans, review and accept diffs produced by agents, and share/run parameterized Workflows across teams.

## BYOK


## LocalOffline
- No
  - Note: Warp runs a local classifier to detect natural-language input, and some metadata/local processing happens on-device, but AI requests are typically proxied to selected LLM providers (OpenAI, Anthropic/Claude variants) unless explicitly configured via enterprise arrangements. There is no broadly-documented fully-offline LLM mode for the AI assistant as of the latest public releases.

## FreeTrial
- Yes

## GitSupport
- Yes
  - Git workflows are supported via the terminal and Warp's code/diff UX; the tool is used to author and review code diffs produced by agents.

## Terminal
- Yes

## Opensource
- No

## License
- Proprietary

## MCP-Client
- Yes
  - Warp supports selecting/modeling different hosted LLM providers and includes enterprise features like zero-data-retention guarantees and proxying; it exposes autonomy controls for when agents may call MCP servers without human approval.

## Notes
- Key features: Agent Mode (natural language -> commands), Warp Code (diff-tracking and stepwise code edits by agents), Drive (shared Workflows and Notebooks), Planning Mode and multi-agent orchestration.
- Privacy controls: granular autonomy settings (allowlists/denylists, pause/approve diffs, control file access), network logging, and zero-data-retention guarantees for enterprise customers.
- Strengths: Unified UX for prompt + shell input, native diff review for agent-made changes, strong collaboration primitives for teams.
- Limitations / unknowns: public documentation is limited on BYOK (bring-your-own-key) and fully offline local LLM operation; product is proprietary which may limit on-premise customization for some organizations.
- Recommended when: you want a first-class terminal with integrated AI agents and team sharing (Drive), and you prefer an opinionated, commercial product with enterprise privacy controls rather than an open-source self-hosted solution.
