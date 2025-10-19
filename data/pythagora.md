# Pythagora - https://pythagora.ai
A developer-focused AI platform that generates full-stack applications and automated tests from natural language prompts.

## Version
(2025-10-19)

## Rating
- [4] Strong for rapid prototyping and automated test generation
- [3] Maturity and enterprise polish can vary depending on use case

## Repository
- 

## Languages
- JavaScript / TypeScript
- React (frontend)
- Node.js / Express (backend)
- SQL (SQLite, PostgreSQL)

## Extensible
- Yes

## Description
Pythagora is an AI-driven development assistant that can generate full-stack web applications and automated unit tests from natural language descriptions. It integrates with developer workflows (notably VS Code) and provides tooling to scaffold frontend and backend code, wire up databases, create authentication flows, and produce Jest-based unit tests. The platform aims to accelerate the 80% of routine development (boilerplate, CRUD, UI scaffolding) so developers can focus on higher-level business logic.

## BYOK
- Yes

## LocalOffline
- No
  Requires cloud access to LLMs; not designed for fully offline usage.

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- Yes
  Offers CLI commands (e.g. npx pythagora ...) to generate tests and scaffold code.

## Opensource
- No

## License
- Proprietary

## MCPSupport
- 

## Notes
- Core capabilities:
  - Generate full applications from natural language prompts (frontend + backend + database)
  - Automated unit test generation (Jest), useful for helper functions and standalone units
  - Debugging primitives (logs, breakpoints, step-debugging) to help diagnose generated code
  - Integration with Git hosting (GitHub, GitLab, Bitbucket)

- Typical use cases:
  - Rapid prototyping and MVP development
  - Internal tooling and admin panels
  - Accelerating freelance or small-team projects
  - Auto-generating unit tests for existing helper code

- Testing notes:
  - Best results for standalone, exported functions; can generate many tests quickly
  - Example CLI usage reported: `npx pythagora --unit-tests --path ./src/utils/common.js` or target a single function
  - In evaluations, generated tests often uncovered real bugs in subject code

- Pricing / access:
  - Free starter tier available with usage limits (suitable for learning and small projects)
  - Paid tiers expand capabilities; may include un-watermarked apps, more tokens, and team features

- Security & privacy:
  - Code is processed via cloud LLMs (OpenAI or Pythagora API); review policies for sensitive code
  - Enterprise features may include team-only access and secure auth bridges

- Limitations & considerations:
  - Not fully offline — relies on cloud LLMs and internet connectivity

- Additional remarks:
  - Pythagora behaves more like an autonomous development agent (planning + execution) rather than a line-completion assistant
  - Good complement to developer workflows when paired with code review and CI/CD practices
