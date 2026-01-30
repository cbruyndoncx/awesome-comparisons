# Replit Agent - https://replit.com
An AI-powered autonomous coding agent integrated into Replit's cloud IDE that plans, writes, tests, and deploys full-stack applications including mobile apps.

## General Info

### Classification

- Code/Autonomous agent

### Version
Agent 3 (September 2025; up to 200 minutes continuous operation, 3x faster and 1/10th cost vs. earlier versions)

### Repo
-

### Rating
- [5] End-to-end application building with self-testing loops, Design Mode, mobile app support, and 50+ language coverage in a cloud IDE.
- [3] Cloud-only platform; best for greenfield projects and prototyping rather than integrating into existing complex codebases.

### Short Description
An autonomous AI coding agent built into Replit's cloud IDE that plans, writes, tests, debugs, and deploys full-stack web and mobile applications, featuring self-testing loops, Design Mode for visual development, Fast Build for rapid app generation, and support for 50+ programming languages.

### Description
Replit Agent evolved from Replit's earlier Ghostwriter assistant into a fully autonomous coding agent that operates within Replit's cloud-based IDE. Agent 3 (September 2025) can operate for up to 200 minutes continuously, planning, writing, testing, and refining entire software components without constant user intervention. A key feature is its embedded self-testing and debugging loop: once code is generated, the agent executes it, identifies errors, applies fixes, and reruns until tests pass. Design Mode (November 2025) creates interactive designs in under 2 minutes, combining visual development with AI assistance. Fast Build mode (December 2025) produces high-fidelity, production-ready apps in minutes from descriptions. The platform supports full-stack mobile app development with React Native and Expo integration for iOS and Android. Web Search for Agent eliminates knowledge cutoffs by fetching current documentation and real-time data. The agent supports 50+ programming languages on NixOS, automatic version control with edit logging and auto-rollback, and can create scheduled automations and specialized workflow agents with integrations to Slack, Telegram, and email.

### Languages
- Multi-language support (50+ programming languages)
  - Works with any language or framework running on NixOS
  - Strong support for Python, JavaScript/TypeScript, React Native, HTML/CSS, and common web frameworks

### Notes
- Distinguishing features: embedded self-testing and debugging loop, Design Mode for visual development, Fast Build for rapid prototyping, full-stack mobile app development with React Native/Expo, web search for real-time information.
- Agent v2 (February 2025) was powered by Claude 3.7 Sonnet; first 10 checkpoints free for all builders.
- Agent 3 performs up to 3x faster at 1/10th cost compared to earlier computer-use models.
- Custom Agent Instructions via replit.md for coding style preferences, project context, and workflow settings.
- Multi-tool calling delivers 15% cost savings and 30% faster results.
- Agent Queue system organizes requests like a task list for structured task management.
- General Agent removes template limitations, working on any codebase in any language on NixOS.
- Real-time collaboration includes shared execution environments and integrated chat.
- Developers report 10x productivity improvements; 85% recommendation rate and 90% renewal rate.
- Can generate specialized agents for workflows with integrations to Slack, Telegram, and email.
- Automatic version control with edit logging, code explanation tools, and auto-rollback.

### Last Update
2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Agent v2 offers first 10 checkpoints free; Replit Core and Teams plans provide full agent access

## MCP-Client

### MCP-Client
- No
  - No public documentation for Model Context Protocol client support as of January 2026

### Prompts
- Yes
  - Accepts natural-language task descriptions for autonomous application building
  - Custom instructions via replit.md for project-specific coding styles and preferences
  - Supports iterative feedback and mid-execution guidance

### Tools
- Yes
  - Integrated cloud IDE with terminal, code editor, and live preview
  - Built-in package management, database connectivity, and app storage
  - Deployment tools with automatic secrets syncing
  - Web search for current documentation and real-time data
  - Connectors to external services (Slack, Telegram, email)

### Resources
- Yes
  - Replit documentation, community templates, in-product tutorials, and replit.md project configuration

### ACP
- No

## Deployment

### BYOK
- No
  - Uses Replit's own AI model infrastructure; no documented BYOK support

### Local Offline
- No
  - Fully cloud-hosted platform; requires internet connectivity for all operations

## Developer Experience

### Context Management
- Yes
  - Project-wide codebase analysis within the cloud IDE
  - Custom instructions via replit.md for project context and preferences
  - Web Search for Agent provides current documentation beyond training cutoffs
  - Multi-tool calling for efficient context gathering

### Direct File References
- Yes
  - Operates on specific project files within the cloud IDE
  - Full file tree navigation and direct editing capabilities

### Checkpoints
- Yes
  - Automatic version control with logging of every edit
  - Auto-rollback features for reverting changes
  - Agent v2 introduced checkpoint-based progress tracking (first 10 free)

### Git Support
- Yes
  - Integrated Git support within the cloud IDE
  - Automatic version control and edit history
  - GitHub integration for import/export of repositories

## Extensible

### Extensible
- Yes
  - Custom instructions, external service connectors, scheduled automations, and specialized workflow agents

### Plugins
- Yes
  - External service integrations (Slack, Telegram, email)
  - Database connectors and app storage
  - NixOS package ecosystem for dependencies

### Hooks
- No
  - No documented lifecycle hook system for custom event handling

### SlashCommands
- No
  - No documented slash-command interface; interaction is through natural-language prompts and IDE controls

### Skills
- No
  - No documented reusable skills system; customization is through replit.md instructions

### Custom Modes
- Yes
  - Design Mode for visual interactive development
  - Fast Build mode for rapid high-fidelity app generation
  - Fast mode with intelligent handoffs to Agent for larger changes

### Subagents
- Yes
  - Can create specialized agents for specific workflows via natural-language descriptions
  - Scheduled automations that act as autonomous sub-workflows
  - Multi-tool calling enables parallel execution of multiple services
