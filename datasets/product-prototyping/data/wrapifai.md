# Wrapifai - https://wrapifai.com
No-code platform to build embeddable AI-powered micro‑tools (calculators, generators, chatbots) focused on SEO and lead capture.

## General Info

### Classification
- Product/Prototyping

### Version
v1.0 (2025-10-19)

### Repo
-

### Rating
- [4] Fast no-code builder for marketers and small teams
- [3] Limited for advanced/custom full‑stack apps

### Short Description
<!-- ToDo -->

-

### Description
Wrapifai is a SaaS no-code builder for creating small AI-powered web tools you can embed into an existing website. Typical outputs are calculators, content generators, chat widgets and other micro‑apps designed to increase on‑site engagement and capture leads. The product emphasizes speed and SEO impact: build a tool from a short description, style it to match your brand, then deploy via embed or shareable link. Hosting, updates and basic analytics are handled by the platform.

### Languages
- JavaScript / TypeScript (front-end embeds)
- Python (integrations / data uploads)

### Notes
- Primary use case: SEO and lead generation. Interactive tools increase time‑on‑site and can be optimized for keyword targets.
- UX: Drag‑and‑drop/no‑code builder → quick to launch; good for non‑technical users and marketers.
- Integrations: Embeds via script/iframe, email capture, webhooks; analytics for engagement and conversions.
- Pricing (reported in public materials during beta): starts at around $29/month for paid tier; tiering and limits apply.
- Limitations: Not intended for building full web applications or heavily customized backend logic. Customization beyond the provided builder can be limited; vendor lock‑in for hosted tools.
- Security: Platform claims encrypted transmission and secure storage for collected leads (standard for SaaS tools) — verify for specific compliance needs.

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
  - Offers a free/beta tier with basic features and Wrapifai branding; paid tiers remove branding and add features.

## MCP-Client

### MCP-Client
- No

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
- No

### LocalOffline
- No

## Developer Experience

### ContextManagement
- Yes
  - [Explain avaiilable methods for managing and updating the context]
  - Upload custom datasets (CSV, JSON, TXT/PDF) into a tool project to provide contextual data
  - Configure prompt templates and variables via the visual builder; edit prompts in the dashboard to change behavior
  - Connect external data sources (APIs, databases, webhooks) so the tool can pull updated context at runtime
  - Use webhooks or the platform API to push updates or new documents to a tool’s dataset

### DirectFileReferences
- Yes
  - [Explain how files can be directly referenced in context.]
  - Files can be uploaded and associated with a specific tool (document ingestion). Uploaded files are used as source context for prompts and can be referenced by the tool’s prompt templates or data bindings
  - External URLs or API-driven data sources can be referenced so the tool pulls content on demand

### Checkpoints
- No
  - [Is it possible to undo actions taken by the agent by using checkpoints or if autocommitted to git, reversing the history ?]
  - No public evidence of a git-like commit history or automatic checkpointing; tool edits are managed through the dashboard and may have basic version controls, but no documented full rollback/commit workflow

### GitSupport
- No

## Extensible

### Extensible
- Yes
  - Supports webhooks, custom data uploads and integration points for connecting external services

### Plugins
- No
  - [Is there a method of bundling together commands, agents and hooks ? If so, explain how'
  - No formal plugin bundling system is publicly documented; integrations are handled via webhooks, embed code and API/endpoints per tool

### Hooks
- Yes
  - [Are there any lifecycle events for the agent generated that can be attached to.]
  - Webhooks are available for form submissions, lead capture events and conversion/interaction events so external systems can be notified in real-time
  - Integrations (email/webhook) enable downstream automation when users submit data or interact with the tool

### SlashCommands
- No
  - [Is there support for re-usable commands that can be manually triggered by the user.]

### CustomModes
- Yes
  - [Can the user create specialist modes that enable you to tailor the chat experience for specific tasks.]
  - The visual builder supports custom prompt templates, configurable inputs and styling, and duplicating/adapting tools to create alternate modes (e.g., "SEO mode", "Lead capture mode")

### Subagents
- Yes
  - [Is it possible to define specialized AI subagents for task-specific workflows ? If so, explain how.]
  - While Wrapifai does not expose a formal "subagent" authoring UI, you can implement task-specific flows by creating multiple focused tools, chaining calls via webhooks/APIs, and building multi-step prompt flows (conditional prompts, separate prompt templates per step)
  - Use webhooks or external functions to orchestrate multiple tools or processing stages, effectively enabling specialized agent-like workflows

## Ungrouped Criteria

### Terminal
- No

### SpecDrivenDevelopment
- BMAD
- SpecKit
- OpenSpec
- Tessl
- AgentOS
- ClaudeFlow
- SPARC
- SuperClaude
- Other
  -
