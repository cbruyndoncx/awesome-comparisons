# MutableAI - https://mutable.ai
AI-native developer platform that generates living documentation, code explanations, and automated code transformations for engineering teams.

## General Info

### Classification

- Code/Autonomous agent

### Version
N/A

### Repo
-

### Rating
- [4] Strong at automatic code documentation and codebase Q&A
- [3] Enterprise/on-prem features, but limited public pricing and roadmap visibility

### Short Description
AI-native developer platform that creates a living, editable code wiki (Auto Wiki), provides conversational codebase search/chat, generates architecture diagrams, and performs one-click or prompt-driven code transforms/refactors across files. Integrates with IDEs (VS Code), GitHub, CLI and offers on-premises deployment for enterprises.

### Description
MutableAI (mutable.ai) is an AI-first developer productivity platform focused on code understanding, documentation, and automated code transformations. Its core capabilities include automatically generating a living wiki for a codebase (with citations to specific files/lines), conversational codebase search/chat, generated architecture diagrams, and one-click refactors/transformations to improve readability, add types, or move prototypes toward production. The product emphasizes keeping docs in sync with code by updating documentation on code changes and offering editable AI-generated articles.

The platform is positioned for both individual developer workflows (autocomplete, assistant-like edits) and team/enterprise use (onboarding, knowledge transfer, auditability, and on-premises/enterprise deployment options).

### Languages
- JavaScript
- TypeScript
- Python
- Go
- Rust

### Notes
- Key features: AI-generated living wiki, code chat / Q&A, architecture diagrams, code transforms/refactors, citations to code lines, notifications on code changes, editable AI docs, prompt-driven code edits, upcoming test-generation features reported.
- Integrations: Reported integrations include VS Code, GitHub, Jupyter, and a CLI for local workflows.
- Pricing: Not publicly listed in detail; offers standard and enterprise tiers with on-prem/enterprise support — contact sales for pricing.

### Last Update
2025-11-15

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes

## MCP-Client

### MCP-Client
- Unknown
  - No public documentation found indicating Model Context Protocol (MCP) support.

### Prompts
- Yes
  - Supports natural-language prompt-driven edits, refactors and code generation; users can describe desired changes and the assistant applies multi-file modifications with previews.

### Tools
- Yes
  - Includes automated refactor/transform tools (one-click transforms), architecture/diagram generation, and CLI tooling for local workflows.

### Resources
- Yes
  - Public documentation, API/CLI, IDE extensions (VS Code), and integration guides are available to onboard and integrate MutableAI into development workflows.

## Deployment

### BYOK
- Unknown
  - No public documentation found regarding BYOK support; enterprise deployment options may vary.

### Local Offline
- No
  - Enterprise / on-premises deployment options are reported, but the standard cloud offering is not a fully local/offline product.

## Developer Experience

### Context Management
- Yes
  - Auto Wiki creates and maintains structured documentation of the codebase and the system updates documentation/context when code changes; this improves contextual answers in the chat and during transformations.

### Direct File References
- Yes
  - Documentation and chat responses include file/line citations and clickable links that reference specific files and locations in the repository (integrations available for IDEs and GitHub).

### Checkpoints
- Yes
  - Integrates with Git workflows: changes are previewed, applied in branches or via pull requests, and can be reverted/undone using standard VCS history.

### Git Support
- Yes

## Extensible

### Extensible
- Yes
  - Provides API, CLI and IDE extensions (VS Code, GitHub, Jupyter) to extend workflows and integrate with existing toolchains.

### Plugins
- No
  - No public plugin marketplace documented; extensibility is provided primarily via APIs, CLI and first-party IDE extensions rather than a user-facing plugin bundling system.

### Hooks
- No
  - No public lifecycle hook/plugin system clearly documented; integrations are typically via API/CLI and GitHub/CI workflows rather than explicit agent lifecycle hooks.

### SlashCommands
- No
  - No documented slash-command system; IDE extensions expose commands through the editor command palette rather than an in-app slash command interface.

### Custom Modes
- No
  - No public documentation describing user-defined specialist chat modes or configurable built-in modes beyond prompt-driven behavior and configurable project settings.

### Subagents
- No
  - No public documentation indicating user-definable subagents or multi-agent orchestration; functionality is delivered via feature-focused components (docs, chat, transforms) rather than user-configured subagents.

