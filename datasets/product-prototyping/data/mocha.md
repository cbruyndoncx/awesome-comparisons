# Mocha - https://getmocha.com
An AI-powered no-code app builder that turns ideas into live web applications in minutes without coding. Built by a Y Combinator W23 company, Mocha features a coding agent that generates full-stack TypeScript/React applications with integrated backend, database, authentication, and hosting.

## General Info

### Classification
- Product/Prototyping

### Version
- v1.2 (2025-2026)
  - Mocha Max: High-power agent mode with increased compute for complex tasks, improved reasoning, and stronger structural support

### Repo
-

### Rating
- [4] Usability: Polished chat-based UX accessible to non-developers with conversational planning and real-time iteration
- [4] Output quality: Generates usable full-stack React + TypeScript code but may require manual review for complex edge cases

### Short Description
- AI-first no-code platform from Y Combinator that converts natural-language prompts into deployable full-stack web applications with integrated backend, database, auth, and hosting on Cloudflare

### Description
Mocha is an AI-powered no-code app builder founded in 2023 and backed by Y Combinator (W23). The platform enables entrepreneurs, designers, and non-developers to build and publish web applications through conversational prompts without writing code. Mocha's coding agent generates complete TypeScript/React applications using an opinionated tech stack (TypeScript, React, Hono API framework, SQLite database) and handles deployment to Cloudflare infrastructure. The platform reached #1 on Product Hunt and is trusted by approximately 200,000 builders.

Unlike template-based no-code builders, Mocha actually writes code that users own and can export. The platform provides an all-in-one stack with built-in authentication, database, backend API, hosting, and deployment with zero setup required. Users can iterate on designs through a chat interface, switch to dev mode for direct code editing, or use direct edit mode for text changes without consuming credits.

### Languages
- TypeScript
- JavaScript
  - React framework for frontend
  - Hono framework for API endpoints
- HTML/CSS
  - Generated as part of React components
- SQL
  - SQLite database

### Notes
- Core strengths:
  - Vibe coding: Describe desired app functionality with words or images and iterate through conversational interface
  - True all-in-one stack: Backend, database, authentication, payments, hosting with zero configuration
  - Code ownership: Export complete project code at any time with full freedom to modify and deploy elsewhere
  - Opinionated tech stack: TypeScript + React + Hono + SQLite eliminates decision paralysis
  - Cloudflare deployment: Automatic hosting and deployment with custom domain support

- Developer features:
  - Dev Mode: View and edit code directly with real-time preview updates
  - Direct Edit Mode: Click-to-edit text without consuming credits
  - Discuss Mode: Conversational planning and debugging assistance
  - API integration: Connect external backends by providing API keys

- Pricing (2025-2026):
  - Starter: Free with 120 credits, deploy 1 app
  - Bronze: $20/month for 1,500 credits, publish up to 5 apps, custom domains
  - Silver: $50/month for 4,500 credits, publish up to 15 apps, priority support
  - Gold: $200/month for 20,000 credits, publish up to 25 apps, early access to new features
  - All paid plans support custom domains and watermark removal

- Limitations and considerations:
  - No custom tech stacks: Cannot bring your own frameworks or libraries
  - No external deployment: Must use Cloudflare hosting (though code can be exported)
  - No Figma import: Screenshots and descriptions serve as alternatives
  - App complexity limits vary by subscription tier
  - Generated code should be reviewed for accessibility, security, and edge-case handling

- Typical workflow:
  - 1. Describe the app or upload screenshots/wireframes
  - 2. Iterate through chat to refine features, design, and functionality
  - 3. Preview in real-time as the agent builds
  - 4. Deploy to mocha.app subdomain or connect custom domain
  - 5. Export code for further customization or migration

- Useful links:
  - Product: https://getmocha.com
  - Documentation: https://docs.getmocha.com
  - Pricing: https://getmocha.com/pricing
  - Y Combinator profile: https://www.ycombinator.com/companies/mocha

### Last Update
- 2026-02-09

## Licensing

### Opensource
- No
  - Mocha platform and coding agent are proprietary; generated code uses open-source frameworks (React, TypeScript) that users own and can export

### License
- Proprietary

### Free Trial
- Yes
  - Free Starter plan with 120 credits and ability to deploy one app; no credit card required

## MCP-Client

### MCP-Client
- No
  - No documented Model Context Protocol client support for connecting to external MCP servers

### Prompts
- Yes
  - Natural-language prompts are the primary interaction model; conversational chat interface for describing features and iterating on designs

### Tools
- Yes
  - Built-in developer tools: dev mode for code editing, direct edit mode, discuss mode for planning, real-time preview, code export

### Resources
- Yes
  - Supports image uploads (screenshots, wireframes), external API integration via keys, custom domain connections

### ACP
- No

## Deployment

### BYOK
- No
  - Mocha uses proprietary cloud-based AI models; no workflow to supply your own LLM API key

### Local Offline
- No
  - Cloud service with web-based interface; code generation and hosting happen on Cloudflare servers; requires internet connection

## Developer Experience

### Context Management
- Yes
  - Chat-based interface preserves project context, previous prompts, and iteration history to inform subsequent generations

### Direct File References
- Yes
  - Dev mode allows viewing and editing generated code files; users can export complete codebase at any time

### Checkpoints
- Yes
  - Chat history provides revision tracking; code export enables version control integration; iterative chat allows reverting to previous states

### Git Support
- No
  - No built-in Git integration; users must manually export code and commit to their own repositories

## Extensible

### Plugins
- No
  - No public plugin marketplace or bundling system; integrations handled via platform features rather than user-facing plugins

### Hooks
- No
  - No documented public lifecycle hook system for agent customization or workflow triggers

### SlashCommands
- No
  - Chat interface driven by natural language rather than slash-command primitives

### Skills
- No

### Custom Modes
- Yes
  - Dev Mode for code editing, Direct Edit Mode for text changes, Discuss Mode for planning; Mocha Max high-power agent mode for complex tasks

### Subagents
- Yes
  - Mocha Max agent mode features task planning, automated reasoning, and specialized workflows for handling complex app-building scenarios
