# MarsX - https://marsx.dev
A development platform that blends AI, no-code/low-code and traditional pro-code to accelerate building web & mobile apps using a micro-app architecture.

## Version
v (2024)

## Classification 
- Code/Editor

## Rating
- [4] Rapid app composition and strong modular approach
- [4] Active open-source presence but ecosystem maturity varies by microapp
  
## Repository
- https://github.com/MarsX-dev/devhunt

## Languages
- JavaScript
- TypeScript

## Extensible
- Yes

## Description
MarsX is an open-source development platform and marketplace that combines AI assistance, no-code visual tooling, and traditional coding through a "Micro-App" architecture. Micro-apps are self-contained modules (UI, backend logic, DB schema, admin panels) that can be composed to build full applications quickly. The platform emphasizes rapid prototyping, reuse via a Micro AppStore, and an AI-driven workflow that tunes models per micro-app to suggest implementations and accelerate developer productivity.

## BYOK

## LocalOffline
- No
  - MarsX is primarily a cloud platform with a web-based IDE and Micro AppStore.

## FreeTrial
- Yes
  - MarsX offers a usable free plan and the core Mars engine is available as open-source.]

## GitSupport
- Yes

## Terminal
- Yes
  - Cloud IDE typically exposes developer tooling; advanced users can work with code directly.

## Opensource
- Yes

## License
- MIT
  - Core engine: MIT (varies by individual micro-app)

## MCP-Client

## Notes
- Core strengths: dramatic reduction in boilerplate (claims up to ~90% less code), modular micro-app composition, and an AI-assisted workflow that learns from micro-app usage.
- Marketplace model: micro-apps are contributed by third-party developers and may be free or premium; this enables rapid assembly but introduces variability in quality and licensing.
- Ideal for startups, rapid prototypes, and teams that want to combine visual editing with direct code access.
- Considerations: reliance on the MarsX ecosystem for micro-apps can create lock-in for large projects; evaluate individual micro-app licenses and security posture for production use.
- Usefull links:
  - https://marsx.dev/ 
  - https://github.com/MarsX-dev
  - https://github.com/MarsX-dev/devhunt


## ContextManagement
- Yes
  - MarsX uses a micro-app abstraction to limit and manage AI context: each Micro-App encapsulates UI, backend logic, DB schema and has its own AI model/fine-tuning lifecycle so the AI is given only the Micro‑App’s surface instead of an entire monolithic codebase.
  - Per-Micro-App model fine-tuning and usage aggregation: models are refined from Micro‑App usage and telemetry so suggestions and completions are contextually scoped to the Micro‑App’s domain.
  - Project-level context in the cloud IDE: the workspace exposes a project structure and component metadata (Micro‑App manifest/config) that the platform and AI use to resolve dependencies and orchestration between Micro‑Apps.
  - AI Landing Page Builder and natural-language-driven UI generation: developers provide high-level prompts; the AI synthesizes UI/components using Micro‑App primitives, effectively managing prompt/context to the relevant Micro‑Apps.

## DirectFileReferences
- Yes
  - The platform exposes Git and direct code editing in the cloud IDE, enabling developers to modify microapp source files directly within the workspace.
  - Micro‑Apps are packaged with manifests and source files that can be inspected and edited in the IDE or via Git, allowing direct references to files (components, API handlers, schema files) within a project.
  - When exporting or integrating externally, microapps can be published to the marketplace or pulled as packages; code can also be cloned via Git for local work.


## Hooks
- Unknown
  - The public materials describe microapps, AI models and marketplace mechanics, but do not provide an explicit list of lifecycle hooks or plugin hooks exposed to developers (e.g., pre-deploy, post-install hooks). Detailed hook semantics are not available in public docs discovered.

## SlashCommands
- Unknown
  - There's no explicit public documentation indicating the presence of a slash-command interface inside the MarsX IDE or chat interfaces. The platform does have a conversational AI interface for Micro‑App interactions, but whether it supports user-defined slash commands is not documented.

## Subagents
- Yes
  - MarsX's per-Micro‑App AI models act like specialized subagents: each microapp carries a model fine-tuned to its domain and usage, serving as a focused assistant for that micro-app's features.
  - The AI orchestrator coordinates between Micro‑App models when they are composed, effectively creating runtime subagent interactions where the parent microapp model delegates to child microapp models.

## CustomModes
- Unknown
  - There is no clear public documentation showing a user-facing "modes" system for switching the IDE or AI into different specialist modes. The platform does support hybrid No-Code/Code workflows and per-microapp model tuning which effectively create contextual modes, but explicit custom-mode APIs or user-creatable modes are not documented.



## Plugins
- Yes
  - MarsX provides a Micro‑App marketplace that acts like a plugin system: Micro‑Apps are bundled units containing UI, backend logic, DB schemas, admin panels and metadata which can be installed into projects to add functionality.
  - Micro‑Apps function as self-contained extensions that can be shared, versioned, monetized (free/premium) and composed together, similar to a plugin ecosystem for full‑stack features.

## Checkpoints
- Yes
  - Git integration and source control: MarsX exposes Git support for projects/microapps, enabling standard commit/rollback workflows and history-based recovery.
  - Micro‑App versioning and marketplace releases provide another checkpoint mechanism: published microapps can be versioned and rolled back to prior published releases.

## SpecDrivenDevelopment
- Other
  - MarsX follows a Micro‑App driven composition model rather than a named external spec-driven framework; the platform relies on self-contained Micro‑App manifests/specs (UI + API + DB schema) as the canonical unit of composition and reuse.

