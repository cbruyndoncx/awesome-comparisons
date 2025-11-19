# Devin - https://devin.ai
An autonomous AI software engineer that plans, writes, tests, debugs, and deploys software in a sandboxed environment.

## General Info

### Classification

- Code/Autonomous agent

### Version
v1 (2024-03)

### Repo
-

### Rating
- [5] Strong autonomous end-to-end software development capabilities: planning, coding, testing, debugging, and deployment.
- [3] Early-stage product: impressive demos but requires human oversight for correctness, security, and architecture decisions.

### Short Description
An autonomous agent from Cognition Labs that accepts high-level natural-language engineering tasks and executes end-to-end software workflows inside a sandboxed IDE (terminal, editor, browser), including planning, coding, testing, debugging, and Git integration.

-

### Description
Devin is designed as an autonomous software engineering agent created by Cognition Labs. Unlike code-completion assistants, Devin accepts high-level natural-language tasks, decomposes them into step-by-step plans, and executes those plans inside a sandboxed environment (editor, shell, browser). It can install dependencies, modify code, run tests, search documentation, iterate on failures, and create pull requests. The product is aimed at accelerating engineering teams or acting as a junior developer to complete discrete tasks with minimal supervision.

### Languages
- Multi-language support (specific languages not publicly documented)
  - Demos primarily showcase Python and JavaScript/TypeScript
  - As a general-purpose autonomous agent, likely supports additional languages

### Notes
- Distinguishing features: autonomous multi-step planning and execution, long-horizon reasoning across thousands of micro-steps, ability to research (browse docs) and iteratively debug.
- Use cases: implementing features, patching bugs in codebases, creating prototypes, running engineering interviews and technical assessments, and integrating changes via Git.
- Known demos: autonomous fixes to open-source libraries (e.g., a Sympy patch demo) and building toy/full-stack apps (Game of Life example) in public demos.
- Caution: As with any autonomous code-writing system, outputs can be incorrect, insecure, or misaligned with architectural constraints. Human review and sandboxing are critical. Also consider IP, secret handling, and compliance when connecting repos or CI.
- Industry context: Part of a broader shift toward autonomous AI agents that take direct action, not just provide suggestions; competes conceptually with other agent-style developer tools but remains distinct from open-source code assistants.

### Last Update
2025-02 (Devin 2.0 announcement / agent-native IDE updates)

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Unknown
  - No public information available about free trial availability; contact Cognition Labs for access.

## MCP-Client

### MCP-Client
- Unknown
  - No public documentation available for Model Context Protocol (MCP) support.

### Prompts
- Yes
  - Accepts high-level natural-language task prompts (e.g., "Implement feature X", "Fix failing tests for Y") and uses multi-step planning prompts internally.
  - Supports iterative, clarifying prompts and mid-execution feedback from users.

### Tools
- Yes
  - Integrated terminal, code editor, and browser within its sandboxed IDE
  - Git/GitHub integration (branches, commits, PR creation)
  - Dependency management and test runners accessible via the terminal

### Resources
- Yes
  - Public documentation, demos, blog posts and changelogs (Devin 2.0 announcement), plus in-product features like Devin Wiki and built-in search/indexing

## Deployment

### BYOK
- Unknown
  - No public documentation available regarding BYOK support.

### LocalOffline
- No
  - Runs as a cloud-hosted sandboxed agent rather than an offline/local-only product

## Developer Experience

### ContextManagement
- Yes
  - Performs project-wide codebase analysis, maintains session context across steps, and uses interactive planning to scope work before execution.

### DirectFileReferences
- Yes
  - Operates on exact repository files (opens/edits specific files), not just isolated snippets.

### Checkpoints
- Yes
  - Integrates with Git (creates branches/commits/PRs) and runs changes in sandboxed environments; users can review and revert via normal Git workflows.

### GitSupport
- Yes
  - Integrates with GitHub workflows and can open/modify repositories, create branches and PRs

## Extensible

### Extensible
- Yes
  - Integrations (GitHub, VS Code, Slack) and plugin-like connectors for repos and CI/CD

### Plugins
- Yes
  - Supports integrations and connectors for common developer tooling (GitHub, editor integrations, CI hooks)

### Hooks
- Unknown
  - No public documentation available regarding lifecycle hooks or custom event handlers.


### SlashCommands
- Unknown
  - No public documentation available regarding slash-command style interface.


### CustomModes
- Yes
  - Features and modes highlighted in product updates include Interactive Planning (plan-first workflows), Devin Search (codebase search), and Devin Wiki (knowledge base/documentation)

### Subagents
- Unknown
  - No public documentation available regarding subagent or multi-agent architecture.


