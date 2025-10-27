# Kilo Code - https://github.com/Kilo-Org/kilocode
Open-source AI coding assistant / VS Code extension

## Version
(2025-10-19)

## Rating
- [4] Strong open-source AI coding assistant with broad model support and automation features
- [3] Some UI/issue rough edges reported; model consistency and cost management need attention
  - note: active community -> frequent updates

## Repository
- https://github.com/Kilo-Org/kilocode

## Languages
- Any

## Extensible
- Yes
  - MCP (Model Context Protocol) Server Marketplace for custom tools and integrations

## Description
Kilo Code is an open-source AI coding assistant implemented primarily as a Visual Studio Code extension. It combines natural-language code generation, multi-mode workflows (Architect, Coder, Debugger), and task automation to help developers plan, implement, and debug code within the editor. Kilo Code emphasizes context-awareness (project-level memory and indexing), extensibility via an MCP marketplace, and multi-model support so teams can choose models that match their needs for cost, latency, and privacy.

## BYOK
- Yes
  - supports connecting your own model/provider credentials when desired

## LocalOffline
- Yes
  - can be used with local model runtimes such as Ollama / LM Studio for offline or on-prem usage

## FreeTrial
- Yes
  - new users get onboarding credits via the platform (also can operate with your own keys)

## GitSupport
- Yes
  - deep Git/GitHub integration patterns for generating commit messages, searching codebase, and automating repo tasks

## Terminal
- Yes
  - incorporates terminal/CLI execution capabilities (inherited from Cline-style tooling) for running commands and automations

## Opensource
- Yes
  - source available on GitHub, community contributions encouraged

## License
- MIT

## MCP-Client
- Yes
  - supports MCP Server Marketplace (JSON-based tool integrations / extensions)

## Notes
- Memory Bank: per-project persistent memory (stored in project files like .kilocode/rules/memory-bank/) that helps the assistant remember project-specific details and reduces repeated context prompts.
- Multi-mode design: Architect mode (planning & scaffolding), Coder mode (implementation), Debugger mode (investigation & fixes). Custom modes are supported for specialized workflows.
- Model Flexibility: Connects to many LLM providers (Claude, Gemini, OpenAI models, and local LMs). The platform can optionally provide credits to new users and also supports direct purchase of tokens at provider prices.
- Automation & Orchestration: Automates repetitive tasks such as refactors, dependency updates, test runs, and repository-wide edits with user approval. Also includes browser automation in some flows.
- Installation: Available on the Visual Studio Marketplace; can also be built and installed from source (.vsix). Development mode supports live reloading via F5 in VS Code.
- Strengths: Open-source, highly extensible (MCP), strong context-awareness and project memory, multi-model support including offline options.


