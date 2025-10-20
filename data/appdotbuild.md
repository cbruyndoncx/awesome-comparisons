# app.build - https://app.build
[Open-source AI agent that generates production-ready full-stack applications from a single natural-language prompt.]

## Version
v1.31.3 (2025-07-??)

## Classification 
- Code/Editor

## Rating
- [5] Excellent for rapid full-stack scaffolding and deployment
- [4] Strong engineering UX; some limitations around custom model choices and enterprise integrations
  
## Repository
- https://github.com/appdotbuild/platform
  
## Languages
- TypeScript
- JavaScript
- HTML/CSS

## Extensible
- Yes
  
## Description
app.build is an open-source AI agent that turns a single terminal (or web) prompt into a complete, deployed full-stack web application. It scaffolds frontend and backend code, provisions a hosted Postgres database, wires up authentication, writes and runs tests, creates a GitHub repository in the user's account, and deploys the app to a live URL. The project emphasizes developer control by outputting a complete, editable codebase in the user's own GitHub repo rather than locking code behind a proprietary interface.

The default generated stacks commonly include React on the frontend and Fastify + Drizzle on the backend, built and served with Vite and TypeScript. app.build uses large language models (reported integrations include Anthropic Claude and Google Gemini) to generate code and orchestration logic, and it leverages Neon (serverless Postgres + Neon Auth) and Koyeb for database and deployment infrastructure.

## BYOK
- Yes
  
## LocalOffline
- No
  - [app.build relies on remote LLMs and hosted infrastructure (Neon/Koyeb) for generation and deployment.]

## FreeTrial

## GitSupport
- Yes

## Terminal
- Yes

## Opensource
- Yes

## License
- Apache-2.0

## MCP-Client

## Notes
- Core workflow: user supplies a prompt (CLI or web UI) → agent generates full codebase → creates GitHub repository → provisions DB & auth → runs tests → deploys frontend and backend to live URL.
- Infrastructure integrations: Neon (serverless Postgres + Neon Auth) for database and auth; Koyeb (serverless deployments) for hosting/deployments.
- Stack examples: React + Vite (frontend), Fastify + Drizzle (backend/ORM), TypeScript throughout the generated projects.
- Developer experience: outputs editable code in the user's GitHub account and supports CI/CD (changes pushed to repo trigger redeploys).
- Use cases: rapid prototyping, proofs-of-concept, boilerplate acceleration for full-stack apps; can be used as a starting point for production projects with manual review.
- Open-source advantage: transparency and ability to self-host or fork the agent and control generated artifacts.
- Limitations/considerations: depends on remote LLMs and hosted infra; may require reviewing and hardening generated code before using in production; BYOK/enterprise model key options and advanced integrations may require additional configuration.

<!-- Sources: coverage gathered from platform README and third-party posts about app.build (Neon/Koyeb posts, GitHub repo). -->
