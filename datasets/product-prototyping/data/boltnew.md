# Bolt.new - https://bolt.new/
Bolt.new is a browser-first, AI-powered full-stack development environment that lets you scaffold, run, edit, and deploy applications entirely from the web.

## General Info

### Classification
- Product/Prototyping

### Version
N/A (2025-10-19)

### Repo
- N/A

### Rating
- [4] Excellent for rapid full‑stack prototyping and demos
- [3] Limited offline / local-only workflows

### Short Description
Bolt.new is an AI-powered, browser-first full‑stack IDE that scaffolds, runs, edits, and deploys web applications using StackBlitz WebContainers and an integrated LLM assistant.

-

### Description
Bolt.new (by StackBlitz) combines an in‑browser IDE powered by WebContainers with an AI assistant that can generate full‑stack applications from natural language prompts. It runs Node.js in the browser, provides an interactive terminal, automatic package management, and tools for debugging, database wiring, and one‑click deployment. The AI assistant can scaffold frontends (React, Next.js, Vue, Svelte, Angular, etc.), create backend routes, configure databases, and help fix runtime errors — all without requiring local environment setup.

### Languages
- JavaScript
- TypeScript
- HTML/CSS
- (Limited) Python

### Notes
- Built on StackBlitz WebContainers tech to run a real Node.js environment fully in the browser.
- AI can generate both frontend and backend code, wire databases (examples: Supabase), and deploy to platforms like Netlify/Cloudflare with minimal friction.
- Great fit for prototyping, demos, learning, and quick experiments where zero local setup is a priority.
- Not designed for fully offline/local development or for bringing your own model; it is a cloud/browser service with proprietary components.
- Good integration for teams wanting fast iteration cycles, but teams that require self‑hosted or open‑source tooling may find limitations.

### Last Update
2025-10-19

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Yes
  - Public/free tier available with usage limits; paid plans for advanced features may exist.

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - Natural-language prompts are the primary interaction model; includes an "Enhance prompt" feature and supports iterative prompt refinement.
  - The assistant can inspect and modify project files, run terminal commands, and interact with the browser environment to execute requested tasks.

### Tools
- Yes
  - Exposes terminal, package manager, server controls, and deployment actions which the assistant can invoke.
  - Diff viewer and file editing functions act as tools for code modification and review.

### Resources
- Yes
  - Includes project templates, example apps, documentation, and built-in integrations (examples: Supabase, Netlify, Cloudflare).
  - The open-source bolt.diy variant provides additional provider integrations and model-selection configuration for self-hosted workflows.

## Deployment

### BYOK
- No

### LocalOffline
- No
  - Any additional details: Runs entirely in the browser using WebContainers; requires network access for AI features and many integrations.

## Developer Experience

### ContextManagement
- Yes
  - Project snapshots, file locking, and diff views are used to manage changes and context; snapshot restoration on reload and Git integration provide history.

### DirectFileReferences
- Yes
  - The assistant can read and edit project files directly; the UI surfaces file-level diffs and targeted edits for review.

### Checkpoints
- Yes
  - Project snapshot/restore and automatic persistence in WebContainers provide rollback points; optional Git integration supports commits and history.

### GitSupport
- Yes
  - Import/export with GitHub and connect projects to repos for persistence and collaboration.

## Extensible

### Extensible
- Yes
  - Supports npm packages and integrations (can install libraries and use third-party APIs)

### Plugins
- No
  - Supports integrations with third-party services, but there is no documented user-facing plugin system for bundling custom agent plugins as of the last update.

### Hooks
- No
  - No public lifecycle hook API for user-defined agent hooks is documented; automation is primarily through the assistant and built-in actions.

### SlashCommands
- No
  - Users can run CLI commands in the integrated terminal, but there is no distinct slash-command system exposed for the assistant.

### CustomModes
- No
  - Bolt includes predefined workflows (scaffold, edit, deploy) but does not expose user-created custom chat modes for the assistant.

### Subagents
- No
  - The platform and the bolt.diy roadmap mention multi-step agent architectures as an evolution, but there is no user-facing subagent definition system documented.

