# Trae AI - https://trae.ai
A modern AI-powered IDE and coding assistant ("The Real AI Engineer") focused on end-to-end developer workflows, built as a VS Code fork with multimodel access and autonomous builder/agent modes.

## General Info

### Classification
- Code/Editor

### Version
- v1.3.0+ (2025, rolling releases)
  - v1.3.0 (Apr 2025) added MCP support and Builder/SOLO enhancements; active development continues with frequent updates

### Repo
-

### Rating
- [5] Strong end-to-end workflow and multimodel access
- [4] Excellent web/dev tooling and deployment integration
- [3] Rapid feature development but proprietary with significant telemetry/privacy concerns (ByteDance); data collection reportedly active even when disabled in settings

### Short Description

- AI-first IDE (VS Code fork) providing multimodel AI assistants, planning-first Builder and autonomous SOLO modes, integrated deploys (Vercel), and multimodal inputs for end-to-end web development workflows.

### Description
Trae is an AI-first IDE intended to act as a full software engineering partner rather than only a completion tool. It is a fork of Visual Studio Code, so extensions, shortcuts and editor familiarity carry over. Trae provides multimodel access (examples: Claude 3.7 Sonnet, GPT-4o, Gemini 2.5 Pro in early releases), integrated chat, builder/agent modes that plan and execute multi-file changes, SOLO mode for autonomous project delivery, and one-click web deployment (Vercel). It emphasizes planning-first workflows (Builder Mode) and agent-driven automation (SOLO and custom agents), plus multimodal inputs (screenshots/designs) and a bilingual interface (English and Simplified Chinese).

### Languages
- Any

### Notes
- Built on VS Code so migration is low-friction for users of VS Code or Cursor.
- Distinguishing features: Builder Mode (planning + controlled execution), SOLO Mode (autonomous project creation), multimodel access, and one-click Vercel deploys.
- Strong emphasis on end-to-end web development workflows with integrated previews, browser/webview support, and terminal integration.
- Supports multimodal inputs (screenshots, design assets) to inform coding and debugging.
- Privacy/Trust considerations: Proprietary product with cloud-hosted model usage — review organizational policy before use in sensitive codebases.
- Competitive positioning: Targets Cursor and GitHub Copilot users but differentiates on zero-cost premium-model access, autonomous agent flows, and built-in deployment tooling.
- Privacy/Telemetry concerns: Independent analysis revealed extensive telemetry with persistent connections to ByteDance domains, device fingerprinting via machineId, behavioral tracking, and data collection reportedly active even when telemetry is disabled in settings. Subject to Chinese data regulations via parent company ByteDance (operated by Singapore-based SPRING(SG) PTE.LTD.).
- 2025-2026 updates: TRAE CN Enterprise Edition launched supporting massive repos (up to 10 million files, 1.5 billion lines of code) with millisecond-level GPU-cluster-backed response times. Customizable agent system with MCP integrations (e.g., Figma connection for UI-aware development). Integrated webview for in-IDE web page display. Windows version in development (Mac available). Bilingual interface (English + Simplified Chinese).

### Last Update
2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - As of early 2025 Trae was distributed free with access to several premium models included

## MCP-Client
- Yes
  - Model Context Protocol support added in v1.3.0 to enable custom agents and richer context handling

### Prompts
- Yes
  - Trae exposes reusable prompt templates via its MCP implementation; Builder and SOLO flows include prebuilt prompts for planning, multi-file change generation, and deployment workflows.
  - Prompts are editable within the IDE and can be invoked or customized by clients/agents before execution to enforce project conventions or coding standards.

### Tools
- Yes
  - Trae exposes tool integrations through MCP: common tools include search (#Web), run/test commands, Vercel deployment, and repository actions (commit/push). Tools can be invoked from planned execution flows or by agents during interactive sessions.
  - Tool execution requires user confirmation in Builder mode by default; SOLO mode can be configured for automated execution with safety constraints.

### Resources
- Yes
  - Trae exposes Resources through MCP servers for project files, indexed codebase snippets, web search (#Web), and persistent project metadata (.rules files). These resources are used to assemble prompts and provide grounding data for agents' planning and code generation.

### ACP
- No

## Deployment

### BYOK
- No

### Local Offline
- No
  - Trae runs cloud models and does not currently advertise a fully local/offline mode

## Developer Experience

### Context Management
- Yes
  - [Trae maintains and updates context using a combination of codebase indexing, persistent project "rules" files, and Model Context Protocol (MCP) sessions. The IDE indexes repository files and open buffers to provide file-level and project-level context to agents; rules/metadata files persist project conventions and preferences so the agent remembers them across sessions; MCP enables explicit context objects to be attached to agent calls (scoped contexts for tasks, file lists, or external resources). The Builder/ SOLO flows present "execution previews" before changes are applied so users can review and refine context or constraints.]

### Direct File References
- Yes
  - [Files can be directly referenced via the editor and agent commands: the Builder/agent can accept file paths or scoped file selections, the chat supports inline file references and #Context-like selectors, and the system indexes files so agents can open, diff, and patch specific files. Editor integration also permits selecting an open file or range to provide explicit context to the agent.]

### Checkpoints
- Yes
  - [Trae provides undo and checkpointing through several mechanisms: execution previews (inspect changes before apply), native Git/VCS integration (stage/commit/checkout to revert), and the Builder's planned-change workflow which can be canceled or rolled back. These combined affordances let teams undo agent actions or restore prior states.]

### Git Support
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - [Trae supports extensions and plugin-like integration via its VS Code ancestry (VS Code extensions compatibility) and by exposing MCP for bundling agent behaviors and tool integrations. Developers can package commands, agents, and hook logic in extension form or via MCP client modules to compose reusable feature bundles.]

### Hooks
- Yes
  - [Trae exposes lifecycle checkpoints in its planning+execution model: planning / preview ("think-before-doing"), execution (apply changes), deploy, and error/rollback. Through MCP-custom agents and the Builder API, users can attach pre-plan constraints, intercept previews, validate planned modifications, and trigger post-execution actions (e.g., run tests or create commits). While exact hook names/SDK methods depend on Trae's MCP client implementation, these lifecycle attachment points are available conceptually and via custom agents.]

### SlashCommands
- Yes
  - [Trae supports natural-language command syntax and special inline/directives (examples reported: @Agent, #Context) and provides chat/command surfaces (sidebar/inline). These act like reusable, user-invoked commands and can be used to scope agent behavior, request specific actions, or switch modes (e.g., invoking Builder or SOLO).]

### Skills
- No

### Custom Modes
- Yes
  - [Trae provides multiple specialist modes out-of-the-box (Builder Mode, SOLO Mode, SOLO Builder) and supports creating tailored workflows via custom agents and MCP-driven sessions. Modes change how the agent plans, previews, and executes changes (manual-review vs autonomous execution), and can be switched by command or configuration.]

### Subagents
- Yes
  - [Trae enables specialized subagents via the MCP client and custom agent definitions (SOLO, Builder, and user-defined agents). Users can create task-specific agents (e.g., testing agent, refactor agent, deploy agent) that encapsulate particular workflows and tool access scopes; these subagents can be invoked from the main Builder flow or chat.]

