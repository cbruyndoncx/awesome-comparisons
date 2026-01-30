# Refraction - https://refraction.dev
A small, practical AI assistant for developers focused on refactoring, test generation, documentation, and small code transforms rather than real-time in-editor completions.

## General Info

### Classification
- Code/Editor

### Version
- Unknown (last checked 2026-01)
  - Web-based SaaS with continuous updates; no public version releases

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
- 2025-2026 adoption metrics: 13,700+ active developers, 65,100+ code generations, 2.9M+ lines of code generated. Positioned as a specialized AI linting and code review tool in the broader AI coding assistant landscape.
- Competitive positioning: focused on discrete code tasks rather than full IDE replacement; competes with Cursor, GitHub Copilot, and Replit AI on specific code quality features.

### Last Update
2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
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

### ACP
- No

## Deployment

### BYOK
- No
  - There is no public documentation indicating that Refraction supports a Bring Your Own Key (BYOK) model for connecting external LLM API keys or selecting self-hosted models. Enterprise customers should contact Refraction sales/support for precise details.
### Local Offline
- No

## Developer Experience

### Context Management
- No
  - Refraction operates as a web-based code assistant that accepts pasted code snippets and natural-language prompts for discrete generations. There is no public documentation of persistent, project-level context management APIs or advanced context orchestration features.

### Direct File References
- No
  - The product provides an editor integration (Sublime Text extension) for in-editor usage, but there is no documentation indicating support for direct file path references, project-wide file indexing, or referencing files on disk via the web UI or an API.

### Checkpoints
- No
  - There is no documented checkpoint or undo system for reverting actions; Refraction stores generation history for user review, but this is not presented as a versioned checkpoint/rollback mechanism.

### Git Support
- Yes
  - Provides GitHub integration, including an "Autoreview" GitHub Marketplace plugin, and IDE/editor extensions (Sublime Text, VS Code) to work with repositories.

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

### Skills
- No

### Custom Modes
- No
  - There is no public information about creating persistent custom modes or specialist modes that alter the assistant's behavior across sessions. The product focuses on one-off, targeted generations rather than configurable modes.

### Subagents
- No
  - Refraction does not document any capability to define or orchestrate specialized AI subagents for task-specific workflows; its model is centered on discrete generation tasks (refactors, tests, docs) per request.

