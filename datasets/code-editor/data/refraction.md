# Refraction - https://refraction.dev
A small, practical AI assistant for developers focused on refactoring, test generation, documentation, and small code transforms rather than real-time in-editor completions.

## General Info

### Classification
- Code/Editor

### Version
(2025-10-19)

### Repo
-

### Rating
- [4] Code generation & refactoring quality
- [4] Value for money (budget-friendly paid tier)

### Short Description
<!-- ToDo -->

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
<!-- ToDo -->
<!-- Note Date last updated -->
-

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
<!-- ToDo -->
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Prompts
<!-- ToDo -->
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Tools
<!-- ToDo -->
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Resources
<!-- ToDo -->
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## Deployment

### BYOK
<!-- ToDo -->
<!-- Bring Your Own LLM API Key supported -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

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
<!-- ToDo -->
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

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
