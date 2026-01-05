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
No-code builder for embeddable AI micro‑tools (calculators, generators, chatbots) focused on SEO-driven engagement and lead capture. Create tools from a short description, style to match your brand, and deploy via embed or shareable link with built-in analytics and integrations.

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
- 2025-10-19

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Offers a free/beta tier with basic features and Wrapifai branding; paid tiers remove branding and add features.

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - Configurable prompt templates in the visual builder; edit prompt text, variables and templates per tool.
  - Support for multi-step prompt flows and conditional prompts within a tool.
  - Ability to bind uploaded documents or datasets (CSV/JSON/TXT) as context for prompts.

### Tools
- Yes
  - Provides pre-built tool types: calculators, content generators, chat widgets and other micro‑apps.
  - Tools are created via the visual builder and can be customized (inputs, outputs, styling, behavior).
  - External tool-like integrations possible via webhooks and Zapier for chaining functionality.

### Resources
- Yes
  - Documentation, templates and onboarding guides available from the dashboard/website.
  - Built-in analytics and exportable data for tool interactions and lead captures.
  - Integrations: Zapier (7,000+ apps), webhooks, and basic API endpoints (contact support for full API specs).

## Deployment

### BYOK
- No

### LocalOffline
- No

## Developer Experience

### ContextManagement
- Yes
  - Upload custom datasets (CSV, JSON, TXT/PDF) into a tool project to provide contextual data
  - Configure prompt templates and variables via the visual builder; edit prompts in the dashboard to change behavior
  - Connect external data sources (APIs, databases, webhooks) so the tool can pull updated context at runtime
  - Use webhooks or the platform API to push updates or new documents to a tool’s dataset

### DirectFileReferences
- Yes
  - Files can be uploaded and associated with a specific tool (document ingestion). Uploaded files are used as source context for prompts and can be referenced by the tool's prompt templates or data bindings
  - External URLs or API-driven data sources can be referenced so the tool pulls content on demand

### Checkpoints
- No
  - No public evidence of a git-like commit history or automatic checkpointing; tool edits are managed through the dashboard and may have basic version controls, but no documented full rollback/commit workflow

### GitSupport
- No

## Extensible

### Extensible
- Yes
  - Supports webhooks, custom data uploads and integration points for connecting external services

### Plugins
- No
  - No formal plugin bundling system is publicly documented; integrations are handled via webhooks, embed code and API/endpoints per tool

### Hooks
- Yes
  - Webhooks are available for form submissions, lead capture events and conversion/interaction events so external systems can be notified in real-time
  - Integrations (email/webhook) enable downstream automation when users submit data or interact with the tool

### SlashCommands
- No
  - No slash command support documented; interface is primarily form/prompt-based rather than command-driven

### Custom Modes
- Yes
  - The visual builder supports custom prompt templates, configurable inputs and styling, and duplicating/adapting tools to create alternate modes (e.g., "SEO mode", "Lead capture mode")

### Subagents
- Yes
  - While Wrapifai does not expose a formal "subagent" authoring UI, you can implement task-specific flows by creating multiple focused tools, chaining calls via webhooks/APIs, and building multi-step prompt flows (conditional prompts, separate prompt templates per step)
  - Use webhooks or external functions to orchestrate multiple tools or processing stages, effectively enabling specialized agent-like workflows

