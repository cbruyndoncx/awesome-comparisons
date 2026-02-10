# Gemini CLI - https://github.com/google-gemini/gemini-cli

Open-source AI agent that brings Google's Gemini models directly to the terminal. Gemini CLI uses a reason-and-act (ReAct) loop with built-in tools and MCP server integrations to handle complex coding tasks like fixing bugs, creating features, improving test coverage, and automating operational workflows. It supports multimodal input (PDFs, images, sketches), Google Search grounding for real-time context, and a ~1M-token context window.

Since its 2025 launch, Gemini CLI has expanded rapidly with an extensions framework, lifecycle hooks, sub-agents, GitHub Actions integration, and a rebuilt terminal rendering engine with mouse support.

## General Info

### Classification
- Code/Terminal

### Version
v0.21.0 (2025-12-15)

### Repo
- https://github.com/google-gemini/gemini-cli

### Rating
- [4] Mature open-source CLI agent with strong MCP support, generous free tier, and rapid feature cadence
- [3] Extensions and sub-agents ecosystems are still maturing; enterprise features require Vertex AI or Code Assist tiers

### Short Description
- Open-source terminal AI agent powered by Google Gemini models, featuring MCP integration, lifecycle hooks, sub-agents, extensions, and a generous free tier (1,000 requests/day).

### Description
Gemini CLI is Google's open-source command-line AI agent that provides direct access to Gemini models (2.5 Flash, 2.5 Flash-Lite, 2.5 Pro, 3 Flash) in the terminal. It operates via a ReAct loop with built-in tools for file operations, shell commands, web fetching, and Google Search grounding. Developers can extend it through MCP servers, custom extensions, lifecycle hooks, and sub-agents. The tool supports multimodal input, conversation checkpointing, token caching, GEMINI.md context files for per-project customization, and non-interactive scripting for CI/CD automation. A free tier provides 60 requests/minute and 1,000 requests/day with a personal Google account.

### Languages
- Any

### Notes
- Models: Supports Gemini 2.5 Flash, 2.5 Flash-Lite, 2.5 Pro, and 3 Flash, selectable via the `-m` flag. All models share a ~1M-token context window.
- Free tier: 60 requests/minute, 1,000 requests/day with a personal Google account. Enterprise users can use Vertex AI or Code Assist Standard/Enterprise.
- Rendering engine: v0.15.0+ features a rebuilt terminal renderer eliminating flicker and prompt jumping, with mouse control support.
- GitHub Actions: Beta integration for automated issue triage, PR reviews, and on-demand assistance via `@gemini-cli` mentions.
- GEMINI.md: Project-level context files that customize agent behavior per repository, similar to .cursorrules or CLAUDE.md.
- Authentication: Supports Google Account (free), Gemini API key, or Google Cloud Vertex AI.
- Install: `npm install -g @google/gemini-cli@latest`

### Last Update
2026-01-30

## Licensing

### Opensource
- Yes
  - Fully open-source under Apache 2.0. Community contributions accepted via GitHub.

### License
- Apache-2.0

### Free Trial
- Yes
  - Free tier with 60 req/min and 1,000 req/day using a personal Google account. No credit card required.

## MCP-Client

### MCP-Client
- Yes
  - Native MCP server support for extending capabilities. Connect local or remote MCP servers for media generation (Imagen, Veo, Lyria), GitHub operations, and custom integrations.

### Prompts
- Yes

### Tools
- Yes

### Resources
- No

### ACP
- Yes
  - Gemini CLI supports the Agent Client Protocol (ACP) by Zed Industries for standardized editor-agent communication via JSON-RPC over stdio.

## Deployment

### BYOK
- Yes
  - Supports Gemini API keys from AI Studio and Google Cloud Vertex AI project credentials. Users can choose their own model endpoint and billing.

### Local Offline
- No
  - Requires network access to reach Gemini API endpoints. No local/offline model execution.

## Developer Experience

### Context Management
- Yes
  - GEMINI.md context files for per-project instructions. Token caching to optimize repeated context. Conversation checkpointing for saving and resuming sessions.

### Direct File References
- Yes
  - `@{path}` syntax to embed local file or directory content directly into prompts and custom commands.

### Checkpoints
- Yes
  - Conversation checkpointing allows saving and resuming complex development sessions without losing context.

### Git Support
- Yes
  - Git-aware workflows including automated commits, rebases, and PR management. GitHub MCP server provides 40+ repository operations.

## Extensible

### Plugins
- Yes
  - Extensions framework (v0.8.0+) enables complete customization of the CLI environment. Custom commands, context files, and MCP server integrations.

### Hooks
- Yes
  - Lifecycle hooks execute at predefined points: BeforeModel, AfterModel, BeforeTool, BeforeToolSelection, AfterAgent. Used for security enforcement, prompt injection, logging, and continuous iteration loops (Ralph loop pattern).

### SlashCommands
- Yes
  - Built-in slash commands (`/help`, `/chat`, `/deploy`, `/security:analyze`) plus custom command creation with `@{path}` file embedding.

### Skills
- Yes
  - Experimental Agent Skills feature based on Anthropic's open agent skills standard. Skills bundle specialized expertise and workflows, loaded on-demand to save context tokens. Autonomous activation — Gemini decides when to invoke a skill based on its description. Skill porters enable cross-platform reusability.

### Custom Modes
- No

### Subagents
- Yes
  - Built-in Codebase Investigator sub-agent for deep analysis and reverse engineering. Custom sub-agents configurable in settings.json with independent context windows, specialized tools, and optional model overrides. Experimental remote sub-agent support via Agent-to-Agent (A2A) protocol.
