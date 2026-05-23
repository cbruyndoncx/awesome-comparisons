# Codebuff - https://github.com/CodebuffAI/codebuff
Open-source terminal AI coding agent that edits your codebase and runs terminal commands via natural language instructions, using a multi-agent architecture with model-agnostic routing.

**Dataset ID:** code-agent

## General Info

### Classification

- Code/Autonomous agent
- Code/Terminal

### Version
-

### Repo
- https://github.com/CodebuffAI/codebuff
  - Apache-2.0 license; install via `npm install -g codebuff`

### Rating
-

### Short Description
Terminal-native AI coding agent that edits codebases and executes shell commands via natural language, with a multi-agent architecture and model-agnostic routing via OpenRouter.

### Description
Codebuff is an open-source CLI coding agent that lets developers describe what they want in natural language and then autonomously edits files and runs terminal commands to accomplish it. It uses a multi-agent architecture where specialized agents coordinate to understand the project, plan changes, and apply precise edits across multiple files. The tool is model-agnostic and routes through OpenRouter, supporting Claude, GPT, Qwen, DeepSeek, and other providers. Codebuff can be used with BYOK (your own API keys) or through their hosted cloud router. A TypeScript SDK allows embedding Codebuff into CI/CD pipelines or custom tooling.

Freebuff is the free, ad-supported tier of Codebuff — the same CLI with usage subsidized by ads rather than a subscription. The hosted router also offers approximately 500 free credits per month with pay-as-you-go beyond that.

### Languages
- Any

### Notes
- Install: `npm install -g codebuff && cd your-project && codebuff`
- Freebuff = free, ad-supported usage mode (same CLI, model usage subsidized by ads)
- Hosted router: ~500 free credits/month, then usage-based pay-as-you-go
- BYOK: plug in your own OpenAI, Anthropic, or other provider API keys via OpenRouter
- Multi-agent: specialized agents for analysis, planning, and code editing coordinate on tasks
- TypeScript SDK available for programmatic/CI use
- Git workflow is manual — Codebuff edits files, you manage commits and PRs yourself
- "Codebuff agents are the new MCP" per README — positions agents as an alternative pattern, not an MCP client implementation

### Last Update
2025-05

## Licensing

### Opensource
- Yes
  - Apache-2.0

### License
- Apache-2.0

### Free Trial
- Yes
  - Freebuff is a free, ad-supported usage tier — no subscription required
  - Hosted router includes ~500 free credits/month

## MCP-Client

### MCP-Client
- No
  - No MCP client implementation; positions its own multi-agent pattern as an alternative

### Prompts
- No

### Tools
- No

### Resources
- No

### ACP
- No

## Deployment

### BYOK
- Yes
  - Model-agnostic via OpenRouter; supports Claude, GPT, Qwen, DeepSeek, and more
  - Configure your own API keys to bypass the hosted router

### Local Offline
- No
  - Requires connectivity to a model provider (cloud API or BYOK)

## Developer Experience

### Context Management
- Yes
  - Multi-agent architecture: specialized agents analyze the codebase and gather relevant context before applying changes

### Direct File References
- Yes
  - Edits files directly in the local project directory based on natural language instructions

### Checkpoints
- No
  - No built-in checkpoint or undo system; relies on user's own git workflow for rollback

### Git Support
- No
  - No built-in git commands; edits files in-place and leaves commit/PR management to the developer

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- No

### Skills
- No
  - Reusable workflows are composed through the multi-agent architecture and TypeScript SDK

### Custom Modes
- No

### Subagents
- Yes
  - Multi-agent architecture with specialized agents for analysis, planning, and code editing
  - Agents coordinate internally; composable and shareable via the SDK
