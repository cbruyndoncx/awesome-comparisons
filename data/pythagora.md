# Pythagora - https://pythagora.ai
A developer-focused AI platform that generates full-stack applications and automated tests from natural language prompts.

## Version
(2025-10-19)

## Classification 
- Code/Editor

## Rating
- [4] Strong for rapid prototyping and automated test generation
- [3] Maturity and enterprise polish can vary depending on use case

## Repository
- 

## Languages
- JavaScript
- TypeScript
  - React (frontend)
  - Node.js / Express (backend)
- SQL
  - SQLite, PostgreSQL

## Extensible
- Yes

## Description
Pythagora is an AI-driven development assistant that can generate full-stack web applications and automated unit tests from natural language descriptions. It integrates with developer workflows (notably VS Code) and provides tooling to scaffold frontend and backend code, wire up databases, create authentication flows, and produce Jest-based unit tests. The platform aims to accelerate the 80% of routine development (boilerplate, CRUD, UI scaffolding) so developers can focus on higher-level business logic.

## BYOK
- Yes

## LocalOffline
- No
  - Requires cloud access to LLMs; not designed for fully offline usage.

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- Yes
  - Offers CLI commands (e.g. npx pythagora ...) to generate tests and scaffold code.

## Opensource
- No

## License
- Proprietary

## MCP-Client
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


## ContextManagement
- Yes
  - Pythagora manages context through tight VS Code/workspace integration and a project-local "pythagora core" directory (or cloud workspace) that the platform scans and updates. Context is maintained via:
    - Workspace file scanning and direct file edits (the extension writes files into your repo/workspace).
    - A project-level config.json (Pythagora Core) where LLM keys, development mode (local/cloud), and other settings are declared.
    - Agent session logs and action traces (visibility into what the AI agents did during a run), which developers can review to understand and update context.
    - Git integration (the usual source-control history acts as a record of context changes).

## DirectFileReferences
- Yes
  - Pythagora can be pointed at specific directories and files. Common methods observed include:
    - VS Code extension: operate directly on the open workspace files.
    - CLI flags / commands (examples reported like `--path ./src` or `--unit-tests --path ./src/utils`) to target particular files or folders.
    - Editing the project `config.json` in the Pythagora core path to indicate which files/LLMs/settings to use.

## Hooks
- No
  - Public documentation does not describe a first-class, user-facing hook or lifecycle API. There may be internal events and the VS Code extension exposes commands, but a formal hooks system (webhooks, lifecycle callbacks) is not documented.

## SlashCommands
- Yes
  - Pythagora exposes CLI-style commands and VS Code command-palette entries. Known examples:
    - `npx pythagora` usage reported for scaffolding and unit-test generation.
    - VS Code commands provided by the extension for starting/stopping the assistant, toggling local/cloud mode, and invoking generation or test runs.

## Subagents
- Yes
  - Pythagora is designed around multiple specialized agents (publicly discussed as ~14 agents) that coordinate to plan, generate, review, test, debug and deploy applications. These subagents cover distinct roles such as planning, frontend generation, backend generation, test generation, and debugging.
  - The architecture appears to be orchestrated so that agents pass artifacts and logs among themselves; however, there is no public API documented for creating custom subagents or directly wiring new agent types (the system is opinionated and prebuilt agents do the heavy lifting).

## CustomModes
- Yes
  - Pythagora supports different development modes and configuration options:
    - Local mode vs Cloud mode (you can run a local Pythagora core path in VS Code or use the hosted/cloud workflow).
    - BYOK (bring-your-own-key) configuration via `config.json` to choose which LLMs to use.
    - Opinionated technology modes (React + Node by default) and settings that steer the generator toward the supported stacks.
  - These modes let teams control where work runs, which models are used, and how the assistant behaves in terms of deployment and file writes.

## Plugins
- Yes
  - The primary integration point is the VS Code extension which bundles commands, editor integrations, and the multi-agent orchestration into a single user-facing plugin. Additionally, Pythagora integrates with Git providers and deployment targets (one-click deploys), and supports configuration via a project-level core directory.
  - There is no public evidence of a broader third-party plugin marketplace or plugin SDK — the VS Code extension and built-in integrations act as the bundling mechanism.

## Checkpoints
- Yes
  - Undo/rollback workflows are supported indirectly via standard Git integration; Pythagora writes real files to the workspace/repo so developers can use their normal VCS workflows to create commits, branches and rollbacks.
  - The platform also provides activity logs and agent traces which can help reconstruct or revert changes.
  - There is no clearly documented in-platform "checkpoint" snapshot API (e.g., one-click snapshot/restore) beyond using Git and deployment snapshots.

## SpecDrivenDevelopment
- Other
  - Pythagora does not advertise adherence to the named spec-driven development frameworks. Its workflow centers on iterative generation, testing, and deployment powered by multi-agent orchestration rather than a formal SDD methodology. If integrating with a spec-driven process (for example Tessl), teams would rely on exporting the generated code and tests into their spec tooling and version control rather than integrate directly with a Pythagora-native SDD system.
