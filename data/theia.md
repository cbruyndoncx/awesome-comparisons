# Theia - https://theia-ide.org
Eclipse Theia: a modular, extensible, open-source IDE framework for desktop and cloud.

## Version
v1.65 (2025-10-19)

## Rating
- [5] Strong open-source, vendor-neutral alternative to proprietary IDEs
- [4] Highly extensible and VS Code extension compatible (via Open VSX)
- [3] AI-native features matured rapidly in 2025 but still evolving for some production scenarios

## Repository
- https://github.com/eclipse-theia/theia

## Languages
- TypeScript
- JavaScript
- HTML/CSS
- JSON

## Extensible
- Yes
  - Modular architecture designed for composing custom IDEs and integrating extensions (supports VS Code extensions via Open VSX)

## Description
Eclipse Theia is an open-source, modular IDE framework maintained under the Eclipse Foundation. It targets both desktop and cloud IDE scenarios and is designed to be embedded and extended to build tailored developer tools. Theia uses the Monaco editor and the Language Server Protocol (LSP) for language support, is implemented primarily in TypeScript/Node, and aims to provide a vendor-neutral alternative to commercial IDEs while offering compatibility with much of the VS Code extension ecosystem.

## BYOK
- Yes
  - Theia AI and integrations follow a bring-your-own-key / bring-your-own-model philosophy: you can configure external LLM providers or self-hosted models (e.g., Ollama, LlamaFile, hosted Anthropic/OpenAI keys) depending on deployment and data-control needs.

## LocalOffline
- Yes
  - Theia can run locally as a desktop app or be self-hosted on-premise. Its AI integrations support local/offline models (where supported by the chosen model runtime) enabling air-gapped or privacy-sensitive deployments.

## FreeTrial
- Yes
  - Theia is free/open-source (no trials); commercial services built on top of it may have separate licensing/pricing.

## GitSupport
- Yes
  - Native Git support via extensions (benefits from VS Code extension ecosystem). Git tooling, source control views and integrations are commonly added through Open VSX extensions.

## Terminal
- Yes
  - Integrated terminal available (desktop & web). AI features add inline assistance in terminals in recent AI-enabled builds.

## Opensource
- Yes

## License
- Eclipse Public License 2.0 (EPL-2.0)

## MCPSupport
- Yes

## Notes
- Compatibility: Theia aims for compatibility with the VS Code extension ecosystem via Open VSX and the Monaco editor, while remaining a distinct, vendor-neutral project (not a fork of VS Code).
- AI-native: In 2025 Theia added and matured AI-native capabilities (Theia AI framework), including context-aware assistants, multi-agent workflows, richer image support and native Claude Code IDE integration (1.65).
- Deployment: Flexible deployment as desktop app (Electron), web-hosted IDE, or embedded component inside platform products.
- Language support: Broad LSP-based language coverage; good fit for polyglot projects.
- Governance: Backed by the Eclipse Foundation which provides vendor-neutral stewardship.
- Use cases: Organizations that need a customizable, self-hosted IDE with strong extension and AI-integration options (especially where data control and on-prem deployment matter) will find Theia well-suited.
- Caveats: While AI features advanced rapidly in 2025, some integrations and workflows remain actively evolving—evaluate maturity for critical production use and test the specific provider/model setup you plan to use.
