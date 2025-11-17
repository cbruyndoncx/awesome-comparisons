# PearAI - https://trypear.ai
PearAI is an open-source AI-powered code editor that aims to be an all-in-one development environment integrating multiple AI tools and capabilities into a familiar VSCode-like experience. Much of the AI agent functionality is built upon RooCode and Cline.

## General Info

### Classification
- Code/Editor

### Version
v1.x (active; releases during 2024-2025)

### Repo
-

### Rating
- [4] Strong project vision and open-source approach
- [3] Early-stage rough edges; initial licensing controversy

### Short Description
- Open-source, AI-first, VSCode-like code editor and framework that integrates multiple AI models and tools (BYOK) with model routing (PearAI Router), contextual @-commands, inline edits with diffs, and agentic automation (RooCode/Cline).

-

### Description
PearAI provides a unified AI-first IDE experience by combining the familiarity of VSCode with integrated AI features like contextual chat, project-aware code understanding, inline edits with diffs, and model routing to pick the best available AI model for coding tasks. The platform emphasizes local code privacy while enabling rich multi-file context and automated workflows.

### Languages
- Any

### Notes
- Core features:
  - Context-aware codebase queries via @codebase, @docs, @diff, @terminal, @problems commands
  - Keyboard-driven workflow: CMD+I for inline edits (with diffs), CMD+L to start chats with selected code, CMD+SHIFT+L to append to chat
  - PearAI Router: automatically routes requests to the best performing AI model available, reducing the need to manage multiple subscriptions
  - PearAI Agent: autonomous coding assistant functionality for automating tasks (planned/early)
  - PearAI Creator, Login, Launch: roadmap features for project generation, auth scaffolding, and deployment (Netlify) respectively
- History & controversy: PearAI launched with a rocky start after initially shipping under a proprietary license despite significant code coming from Continue.dev; the project later reverted to an open-source license and apologized, stabilizing community trust
- Audience: developers who want an open-source, AI-first IDE experience with strong project context awareness and extensibility

### Last Update
- 2025-11-15 — researched and updated: clarified Short Description, Prompts, Tools, Resources, Router, BYOK, licensing and history.

## Licensing

### Opensource
- Yes

### License
- MIT

### FreeTrial
- Yes
  - Free tier available with basic features and BYOK support; paid tiers unlock advanced features

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - Built-in slash/command prompts and templates; configurable via config.json/config.ts
  - Supports selection-to-chat prompts (CMD/CTRL+L), inline edit prompts (CMD/CTRL+I), and reusable prompt shortcuts
  - Teams can create custom prompts and natural-language command mappings

### Tools
- Yes
  - Integrated tools: terminal, git, diff/inline-edit preview, file/folder attachments, @commands, model provider integrations (BYOK), PearAI Router, agent integrations (RooCode/Cline), third-party connectors (Continue, Perplexity, Mem0)
  - Extensible via plugin/extension system

### Resources
- Yes
  - Documentation, configuration examples (config.json/config.ts), demo videos and blog posts
  - Open-source repositories and community discussions (GitHub issues/PRs); roadmap and changelog available

## Deployment

### BYOK
- Yes
  - Users can supply their own API keys for models (BYOK), enabling use with different model providers and preserving control over credentials.

### LocalOffline
- Yes

## Developer Experience

### ContextManagement
- Yes
  - PearAI provides multiple methods for managing and updating context: project-aware @commands (e.g. @codebase, @code, @filename, @foldername, @docs, @terminal, @diff, @problems), a local codebase index for retrieving relevant snippets, inline selection-to-chat flows (CMD+L / CTRL+L), and a memory layer (Mem0) for persisting conversational or developer-specific context. Users can also add documentation manually to the chat context and supply local files for the assistant to reference.

### DirectFileReferences
- Yes
  - PearAI supports directly referencing files and folders in prompts and chats via commands like @filename and @foldername, attaching files/docs to chats, and including selected code from open editor tabs. The @diff and @code commands enable referencing specific changes and functions across the repo.

### Checkpoints
- Yes
  - PearAI presents diffs for inline edits before applying changes, supports local undo in the editor, and integrates with Git so changes can be committed and reverted. The @diff workflow and preview/accept model provide checkpoints prior to committing AI-generated edits; standard Git operations (revert/reset) and editor undo serve as recovery mechanisms.

### GitSupport
- Yes
  - Integrates with Git workflows; offers @diff referencing of branch changes and commit workflow helpers

## Extensible

### Extensible
- Yes
  - Fork of VSCode + modular submodules for AI features; supports plugins and integrations

### Plugins
- Yes
  - PearAI is extensible and built on a VSCode-like architecture; it supports plugins/integrations that can bundle commands, tooling, and integrations. Developers can extend behavior by adding integrations (model providers via BYOK, documentation sources, or custom tooling) and packaging those as extensions/plugins compatible with the environment.

### Hooks
- No
  - There are no widely documented, first-class "agent lifecycle" hook events (e.g., onRequest, onResponse, onApplyPatch) exposed in PearAI's public docs. Extensibility via the VSCode-like extension/plugin model may permit custom integrations that observe editor events, but explicit agent lifecycle hook APIs are not documented.

### SlashCommands
- Yes
  - PearAI includes reusable slash/command-style actions (examples in product docs include /edit and other command triggers), keyboard shortcuts (CMD/CTRL+I, CMD/CTRL+L, CMD/CTRL+SHIFT+L) and an @-command system to invoke contextual behaviors. These can be reused across chats and workflows to trigger editing, context injection, diffs and more.

### CustomModes
- Yes
  - Users can create tailored workflows by configuring model routing, toggling built-in tools, supplying BYOK keys, and using custom command sequences. Because PearAI is a VSCode fork and supports extensions/plugins, teams can implement specialist modes (e.g., a Web3 mode that loads specific docs, models, and snippets) through configuration and extensions.

### Subagents
- Yes
  - PearAI surfaces agent-like automation features (PearAI Agent is listed as planned/early) and routes tasks to specialized models or toolsets (Aider, Supermaven, Continue, Perplexity, Mem0). Users can achieve subagent-like workflows by combining model routing, tool integrations, and scripted command sequences; PearAI's router automatically selects the best-performing model for each task.

## Ungrouped Criteria

### Terminal
- Yes
  - Built on VSCode fork; includes integrated terminal and @terminal context command

### SpecDrivenDevelopment
- Other
  - PearAI does not appear to target or natively implement a specific spec-driven development framework. It is an AI-first IDE focused on contextual coding assistance, model routing, and extensibility rather than a spec-driven code-generation lifecycle. If teams use PearAI in a spec-driven workflow, they typically map their own specs/docs into the workspace via the @docs and project context features.
