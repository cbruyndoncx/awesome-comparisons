# Bolt DIY - https://bolt.diy/
Bolt.diy is an open-source, model-agnostic AI-assisted development platform for building, editing, and deploying full-stack web applications directly in the browser or self-hosted environments.

## General Info

### Classification
- Product/Prototyping

### Version
v1.0 (2025-10-19)

### Repo
- https://github.com/stackblitz-labs/bolt.diy

### Rating
- [5] Strong multi-LLM support and browser-based development environment
- [4] Rapid prototyping and migration use-cases

### Short Description
Bolt.diy is a browser-based, open-source AI-assisted full-stack development IDE that uses StackBlitz WebContainers and a multi-LLM, Model Context Protocol (MCP) architecture to generate, run, edit, and deploy Node.js web applications from natural-language prompts.

-

### Description
Bolt.diy brings AI-assisted coding to full-stack web development. It runs on StackBlitz WebContainers in the browser and supports self-hosting and Docker deployments. The platform lets you create, run, edit, and deploy Node.js applications with natural language prompts and integrates with a wide range of LLM providers.

### Languages
- TypeScript
- JavaScript
- HTML/CSS

### Notes
- Multi-LLM architecture: supports OpenAI, Anthropic, Google Gemini, Mistral, Ollama, HuggingFace, DeepSeek, Groq, and others.
- Uses StackBlitz WebContainers for a full browser-based dev environment with NPM support and hot reload.
- Installation paths: Cloud (browser), Local (Node.js + pnpm), Docker.
- Good for prototyping, migrating legacy apps, and experimenting with multiple LLMs.
- Export options: ZIP export, deploy to Netlify/Cloudflare, Docker image.

### Last Update
2025-11-15

## Licensing

### Opensource
- Yes

### License
- MIT

### FreeTrial
- Yes

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - Supports attaching images and files to prompts and provides prompt-enhancement features and reusable prompt templates.

### Tools
- Yes
  - Exposes MCP tools (tool-calling) allowing the assistant to call external services, run functions, and interact with resources.

### Resources
- Yes
  - MCP Resources expose file-like and API-backed data (files, API responses, DB results). Integrations (e.g., Supabase) surface as MCP resources.

## Deployment

### BYOK
- Yes

### LocalOffline
- Yes
  - Self-hosted / Docker with local model providers like Ollama
  - Running locally with Ollama or other on-prem model hosts enables offline development.

## Developer Experience

### ContextManagement
- Yes
  - Context is managed via MCP, attachments to prompts (files/images), and provider/session context mechanisms to supply code and project state to models.

### DirectFileReferences
- Yes
  - Allows attaching files to prompts and direct file editing in the browser editor; prompts and AI actions can reference project files.

### Checkpoints
- Yes
  - Git integration, automatic commits for major operations, and revert/versioning support provide checkpoint-like workflows.

### GitSupport
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Provider classes, MCP servers and modular provider architecture let you extend functionality with custom integrations.

### Hooks
- Yes
  - MCP lifecycle and provider hooks allow tool/lifecycle integrations and custom server behaviors.

### SlashCommands
- No
  - No explicit slash-command system documented; interactive actions are performed via the conversational assistant and UI controls rather than chat-style slash commands.

### CustomModes
- Yes
  - Bolt.diy supports specialized modes via provider configurations, project templates and MCP-driven tool sets that enable tailored assistant behaviour for tasks like scaffolding, refactoring, or deployment.

### Subagents
- Yes
  - MCP tooling and provider integrations enable multi-step workflows where assistants can call external tools and services (effectively subagents) to perform specialized tasks (e.g., DB migrations, deploy pipelines).  Not described as named "subagents" in docs but the behavior is supported via MCP tool-calls.


## Ungrouped Criteria

### Terminal
- Yes

### SpecDrivenDevelopment
- No
  - Bolt.diy does not natively implement a Spec-Driven Development (SDD) framework such as Tessl or GitHub Spec Kit. It is an AI-powered IDE focused on prompt-driven code generation and interactive editing. Teams can adopt SDD practices on top of bolt.diy (for example by keeping spec files in the repository and using the assistant to follow them), but there is no built-in SDD enforcement or formal spec workflow in the documented features.

