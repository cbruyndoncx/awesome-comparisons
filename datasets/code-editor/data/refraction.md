# Refraction - https://refraction.dev
A small, practical AI assistant for developers focused on refactoring, test generation, documentation, and small code transforms rather than real-time in-editor completions.

## General Info

### Classification
- Code/Editor

### Version
- Unknown (last checked 2025-10-19)
  - Web-based service with continuous updates; no public version releases

### Repo
-

### Rating
- [4] Code generation & refactoring quality
- [4] Value for money (budget-friendly paid tier)

### Short Description
A focused web-first AI assistant for developers that automates small, practical code tasks: refactors, unit test generation, documentation, regex creation, and snippet translations. Optimized for discrete generations rather than streaming in-editor completion.

-

### Description
Refraction is a web-first AI development assistant (refraction.dev) which helps developers automate repetitive tasks: generate unit tests, add or improve documentation, refactor and clean code, generate regular expressions, convert small code snippets between languages, and produce short code implementations from natural-language prompts. It is positioned for improving existing code and producing targeted outputs rather than acting as a continuous real-time code completion engine.

### Languages
- Any

### Notes
- Pricing: consumer/pro plan pricing reported in public materials at roughly $8/month for the Pro (unlimited generations) tier; Team and Enterprise tiers are available with additional collaboration, billing and SSO/SCIM/audit features.
- Strengths: fast, focused tooling for test generation, documentation, refactors and small code transforms; broad language coverage (56 languages); inexpensive compared with many other AI-dev assistants.
- Limitations: not open-source, hosted (no obvious offline/local mode), limited real-time in-editor pairing (it’s oriented around discrete generations rather than streaming in-line completions like Copilot), and limited public detail about the exact underlying model(s) (no explicit, verifiable public claim that it runs on a specific third-party model such as OpenAI).
- Data & privacy: product materials indicate generations and history are stored to provide a History feature; check Refraction's privacy policy / terms for details before sending sensitive code.
- Use-cases: adding unit tests, documenting legacy code, refactoring for clarity or minor performance improvements, generating regexes and language-to-language snippet translations.

### Last Update
- 2025-11-15

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Yes
  - New users get a limited number of free generations (commonly reported as ~10 free uses) and a short trial period to evaluate the service.

## MCP-Client

### MCP-Client
- No
  - There is no public documentation or indication that Refraction includes an MCP (Model Control Plane) client for connecting directly to external MCP servers.

### Prompts
- Yes
  - Refraction accepts natural-language prompts for discrete generations (e.g., "generate unit tests for this function", "add types", "refactor this code").

### Tools
- Yes
  - The product exposes focused tooling for specific code tasks (refactors, tests, docs, regex generation) via the web UI and the Sublime Text extension.

### Resources
- Yes
  - Refraction provides a history feature storing previous generations and may include documentation and usage guides on the web app (refer to refraction.dev for details).

## Deployment

### BYOK
- No
  - There is no public documentation indicating that Refraction supports a Bring Your Own Key (BYOK) model for connecting external LLM API keys or selecting self-hosted models. Enterprise customers should contact Refraction sales/support for precise details.
### LocalOffline
- No

## Developer Experience

### ContextManagement
- No
  - Refraction operates as a web-based code assistant that accepts pasted code snippets and natural-language prompts for discrete generations. There is no public documentation of persistent, project-level context management APIs or advanced context orchestration features.

### DirectFileReferences
- No
  - The product provides an editor integration (Sublime Text extension) for in-editor usage, but there is no documentation indicating support for direct file path references, project-wide file indexing, or referencing files on disk via the web UI or an API.

### Checkpoints
- No
  - There is no documented checkpoint or undo system for reverting actions; Refraction stores generation history for user review, but this is not presented as a versioned checkpoint/rollback mechanism.

### GitSupport
- Yes
  - Refraction provides GitHub integration features, including an "Autoreview" GitHub Marketplace plugin that can generate PR descriptions and automated reviews. It also offers IDE/editor extensions (Sublime Text, VS Code) and a Terminal extension to facilitate working with repositories. There is limited public documentation about a full-featured REST API or advanced repo management features; contact Refraction for enterprise or API access details.

## Extensible

### Extensible
- Yes
  - Editor extensions are available on paid tiers (editor plugins/support mentioned in product features)

### Plugins
- No
  - While Refraction provides an editor integration (a Sublime Text extension) for more convenient in-editor flows, there is no evidence of a broader extensibility/plugin system for bundling commands, agents, and hooks as a platform-facing plugin framework.

### Hooks
- No
  - No public documentation describes lifecycle events, webhooks, or attachable hooks for responding to Refraction events or generation lifecycle stages.

### SlashCommands
- No
  - There is no documented support for user-triggered reusable slash-style commands or command palettes exposed by the product.

### CustomModes
- No
  - There is no public information about creating persistent custom modes or specialist modes that alter the assistant's behavior across sessions. The product focuses on one-off, targeted generations rather than configurable modes.

### Subagents
- No
  - Refraction does not document any capability to define or orchestrate specialized AI subagents for task-specific workflows; its model is centered on discrete generation tasks (refactors, tests, docs) per request.

## Ungrouped Criteria

### Terminal
- No

### SpecDrivenDevelopment
- Other
  - None — Refraction is a focused developer productivity assistant (refactors, tests, docs) and is not a spec-driven development framework
