# Emergent.sh - https://emergent.sh/

Emergent.sh is an AI-powered full-stack app builder that converts natural language prompts into production-ready web applications. Five specialized AI agents (Architect, Designer, Developer, Integration, Product Manager) collaborate across planning, design, coding, API integration, and testing — with output synced to GitHub and zero vendor lock-in on the generated code.

**Dataset ID:** product-prototyping

## General Info

### Classification
- Product/Prototyping

### Version
- GA (2025; Y Combinator backed)

### Repo
- -
  - Proprietary product.

### Rating
- [4] Native API/OAuth handling (Stripe, Slack, Airtable, etc.) removes the backend wiring step that blocks most no-code builders; self-debugging loop reduces failed generations
- [3] Opinionated tech stack (React/Next.js + FastAPI + MongoDB); not suitable for custom frameworks

### Short Description

- Five-agent AI app builder (Architect, Designer, Developer, Integration, PM); native OAuth/API handling; self-debugging; React/Next.js/FastAPI/MongoDB output; GitHub sync; Y Combinator backed.

### Description

Emergent.sh builds complete full-stack web applications from natural language descriptions using five coordinated AI agents. The Architect designs system structure, the Designer produces UI/UX, the Developer implements code, the Integration agent handles external API connections, and the Product Manager manages scope. Unlike most AI builders, the Integration agent autonomously handles OAuth flows, API key management, authentication, retries, and error recovery for third-party services (Stripe, Slack, Airtable, and others) — eliminating the manual backend wiring step that typically requires developer intervention.

A self-debugging loop detects errors, analyzes root causes, generates fixes, and applies them without user intervention. Human-in-the-loop pause points allow overrides at any workflow stage. All output is production-ready code (React/Next.js frontend, FastAPI backend, MongoDB) synced bidirectionally to GitHub. Users own their code with no lock-in. A forking mechanism manages context limits by creating fresh windows while preserving all generated code.

### Languages
- JavaScript
- TypeScript
- Python
  - React/Next.js (frontend), FastAPI (backend), MongoDB (database).


### Frontend Stack
- Next.js
  - React/Next.js frontend; fixed opinionated stack.

### Backend Stack
- FastAPI (Python)
  - FastAPI backend; fixed opinionated stack.

### Database
- MongoDB
  - MongoDB; fixed opinionated stack.


### Style Library
- -
  - Style library not documented.

### Testing
- None
  - Self-debugging loop corrects errors but does not generate a test suite.

### Notes
- Pricing: free tier available; see emergent.sh for current plans.
- Tech stack: React/Next.js + FastAPI + MongoDB — not configurable.
- GitHub sync: bidirectional; full code ownership and export.
- Native integrations: Stripe, Slack, Airtable, OAuth providers, and others via Integration agent.
- E2 agent validates API integrations before Developer builds against them.
- Y Combinator backed.

### Last Update
- 2026-05-14

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - Natural language prompts drive the full workflow.

### Tools
- Yes
  - Built-in integrations: Stripe, Slack, Airtable, OAuth providers.

### Resources
- Yes
  - Image and asset handling; GitHub sync.

### ACP
- No

## Deployment

### BYOK
- No
  - Managed platform.

### Local Offline
- No
  - Cloud-hosted.

## Developer Experience

### Context Management
- Yes
  - Forking mechanism preserves generated code when context limits are reached.

### Direct File References
- Yes
  - GitHub sync; full code export.

### Checkpoints
- Yes
  - Human-in-the-loop pause points at any workflow stage.

### Git Support
- Yes
  - Bidirectional GitHub sync.

## Extensible

### Plugins
- No

### Hooks
- Yes
  - Human override points at any workflow stage.

### SlashCommands
- No

### Skills
- No

### Custom Modes
- No

### Subagents
- No
