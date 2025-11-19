# Replit Ghostwriter - https://replit.com/site/ghostwriter/
[AI-powered coding assistant integrated into the Replit cloud IDE for real-time code completion, explanation, transformation and generation.]

## General Info

### Classification
- Product/Prototyping

### Version
- Unknown (2025-10-19)
  - Integrated into Replit IDE; no separate version tracking

### Repo
-

### Rating
- [4] Strong for fast prototyping, education and collaborative cloud IDE workflows
- [3] Limited for privacy-sensitive or offline-first workflows due to cloud-only architecture

### Short Description
- AI coding assistant built into Replit's cloud IDE providing inline completions, natural-language code generation, explanations and refactoring tools for rapid prototyping and learning.

### Description
Replit Ghostwriter is a proprietary, cloud-based AI coding assistant built into the Replit online IDE. It offers inline code completions and suggestions, natural-language code generation, explainers that walk through code, and transformation/refactor capabilities. Ghostwriter is tightly integrated with Replit features (editor, shell, deployments, collaboration) so developers can iterate, share, and deploy from the browser with minimal setup.

Ghostwriter focuses on developer productivity in an always-online environment — useful for students, educators, hackathons, prototypes, and fast single-developer projects. It does not provide a local/offline model bundle and does not expose the underlying model weights or detailed model names in public documentation.

### Languages
- JavaScript
- TypeScript
- Python
- Java
- Go
- Ruby
- HTML/CSS
- SQL
- Bash

### Notes
- Key features: "Complete Code" (inline suggestions), "Explain Code" (natural-language explanations), "Transform Code" (refactors/rewrites), and "Generate Code" (from prompts).
- Pricing is tiered: Starter (free) with limited resources; Core (individual pro tier, commonly around $20/month with monthly credits when billed annually); Teams (team plans around $35/user/month annually with extra credits and collaboration features); Enterprise (custom pricing, SSO/SCIM and enterprise controls available).
- Billing uses a credit model: agent/AI compute, deployments and some resources consume credits; heavy usage can increase costs beyond subscription fees.
- Deployments: static deploys can be free but autoscale/reserved VM deployments carry additional costs starting from low-dollar/month tiers upward.
- Privacy/enterprise controls: enterprise plans advertise SSO and provisioning (SAML/SCIM). Public docs do not disclose BYOK, data residency or detailed data-retention controls — contact Replit sales for enterprise privacy/data-residency specifics.
- Models and internals: Replit does not publicly document exact model names or weights used by Ghostwriter; descriptions reference "frontier" or large-generation models in marketing material.
- Use cases: excellent for browser-first workflows, teaching, pair-programming, quick refactors and prototyping. Not suitable when strict on-premises, BYOK, or fully offline operation is required.
- Recommendation: for teams with strict compliance needs, engage Replit Enterprise sales to confirm options (SSO, data handling, contractual terms). For individual users, Core provides a convenient integrated experience with monthly usage credits.

### Last Update
- 2025-11-15
  - Note: This date may reflect documentation update; actively maintained SaaS product integrated into Replit IDE

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Yes
  - Replit offers a free Starter plan with limited access to Replit AI and a trial of Replit Agent. Ghostwriter's full features require a paid Replit Core subscription or purchase of AI credits/cycles.

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - Ghostwriter supports natural-language prompts through its chat interface and inline commands. Users craft prompts to generate code, refactor, and explain snippets. Replit recommends concise, context-rich prompts and breaking complex tasks into smaller steps for best results.

### Tools
- Yes
  - Ghostwriter provides inline editor tools: Complete Code, Explain Code, Transform Code, and Generate Code. It integrates with the Replit workspace, terminal, version history, and deployment tooling. There is no public Ghostwriter SDK; integrations rely on Replit platform APIs and Agent features.

### Resources
- Yes
  - Official documentation: <https://docs.replit.com/> and <https://replit.com/learn/> with tutorials and guides covering Ghostwriter and Replit Agent.
  - Blog and community resources: Replit Blog (<https://blog.replit.com/>), Replit Community forums, and YouTube tutorials demonstrating Ghostwriter workflows.
  - API and integration docs: Replit API documentation and platform docs for workspace integrations and deploy/webhook features.
  - Example projects and tutorials: sample repls and walkthroughs (e.g., Ghostwriter/Agent tutorials) available from the docs and community.

## Deployment

### BYOK
- No

### LocalOffline
- No

## Developer Experience

### ContextManagement
- Yes
  - Ghostwriter uses code context awareness: it inspects open files and surrounding code to generate contextually relevant completions, transformations, and explanations. It also powers Ghostwriter Chat, where the assistant leverages project context to answer questions and generate code snippets.

### DirectFileReferences
- Yes
  - Ghostwriter is integrated into the Replit IDE and can read the files in the current Replit project/workspace to provide suggestions and transformations. Developers can ask Ghostwriter to operate on specific files opened in the editor, and the assistant uses the open-file buffer and project files as context.

### Checkpoints
- Yes
  - Checkpoints/rollback functionality is part of Replit Agent (project history, diffs, and rollback to previous checkpoints). Replit's general workspace history (snapshots, version history) and Agent both provide mechanisms to revert or inspect prior states. Ghostwriter's generated edits can be undone via standard editor undo and Replit's version history.

### GitSupport
- Yes
  - Replit provides integrated Git and GitHub support via a visual Git pane and CLI access in the Shell. Developers can clone, commit, push, pull, and manage branches. Replit handles GitHub authentication securely, but warns against sharing tokens in Multiplayer sessions.

## Extensible

### Extensible
- No

### Plugins
- Yes
  - There is no public plugin SDK for Ghostwriter documented in user-facing materials. Replit's broader platform supports integrations and third-party apps at the workspace level (e.g., packages, APIs). For extensibility beyond the IDE, Replit's platform and Agent provide more appropriate integration points.

### Hooks
- Yes
  - The public documentation does not expose a formal plugin hook system for third-party integrations within Ghostwriter itself. However, Replit's platform-level features (like webhooks for deploys and the Replit API) can be combined with Ghostwriter workflows in the IDE. The Agent product offers richer lifecycle controls and automation hooks (plans, builds, deploys) which are distinct from Ghostwriter.

### SlashCommands
- Yes
  - Within the Replit IDE chat/command palette, Ghostwriter supports in-editor chat interactions and may accept slash-like quick commands in the chat UI for common tasks (e.g., refactor, explain, generate). Public docs do not provide a formal, documented slash-command syntax; behavior is primarily UI-driven rather than command-driven.

### CustomModes
- Yes
  - Ghostwriter exposes different usage modes in the UI (e.g., Chat vs. Inline Completion vs. Explain/Transform). Replit Agent offers explicit Plan vs Build modes for more autonomous workflows. Public docs do not document a user-facing API for creating new custom modes beyond UI options and Agent's planning features.

### Subagents
- Yes
  - Ghostwriter is complemented by Replit Agent, which provides multi-step planning, execution, and autonomous behaviors. While Ghostwriter itself is primarily an assistant for inline edits and chat, Agent can be considered a higher-level subagent for orchestrating builds, checkpoints and deployment workflows. There is no public API for defining custom subagents within Ghostwriter as of available documentation.

