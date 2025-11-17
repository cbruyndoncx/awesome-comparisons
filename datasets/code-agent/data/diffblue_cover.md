# Diffblue Cover - https://www.diffblue.com/products/cover
AI-powered unit test generation for Java

## General Info

### Classification

- Code/Autonomous agent

### Version
vN/A (2025-10-19)

### Repo
-

### Rating
- [4] Strong for Java unit-test automation and inner-loop productivity
- [3] Enterprise pricing is high; smaller teams should evaluate quotas

### Short Description
Diffblue Cover autonomously generates, executes and maintains Java unit tests (JUnit/TestNG) from source code, via IDE plugins, CLI and CI integrations to accelerate coverage and regression safety.

-

### Description
Diffblue Cover is a commercial AI-driven product that automatically generates and maintains unit tests for Java code. It integrates into developer workflows (IntelliJ plugin for inner-loop use) and into CI/CD pipelines (CLI, CI plugins) for broader, project-level test generation. Cover uses ML techniques to produce compilable, runnable JUnit/TestNG tests to increase coverage, reduce manual test-writing toil, and help with regression testing and refactoring safety.

### Languages
- Java

### Notes
- Editions: Community (free, limited Methods Under Test), Developer (paid tiers with higher MUT quotas), Teams and Enterprise (larger-scale, CLI/CI integration, analytics/dashboard and on-prem/enterprise deployment options).
- Integrations: IntelliJ plugin, GitHub/GitLab, Jenkins and other CI systems, Docker and common Java build ecosystems (Maven/Gradle/Spring).
- Pricing model: free community tier with monthly MUT limits; developer subscriptions with fixed MUT bundles; Teams/Enterprise with capacity- and user-based pricing and bespoke contracts.
- Use-cases: fast inner-loop test creation for developers, bulk test generation for legacy codebases, regression testing and coverage improvements, test maintenance during refactors.
- Unknown / not publicly documented here: explicit BYOK/key-management details, detailed on-prem installation steps and specific license terms—contact Diffblue sales for enterprise security, on-prem deployment and licensing specifics.

### Last Update
2025-11-15

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Yes
  - The Community Edition provides a limited free tier (e.g. a small number of Methods Under Test per month).

## MCP-Client

### MCP-Client
-

### Prompts
- No
  - Diffblue Cover does not expose LLM-style textual prompting for test generation. Users trigger test generation via IDE actions or CLI/CI commands rather than crafting natural-language prompts.

### Tools
- Yes
  - CLI (dcover / dcover-cli) for project-level automation and CI integration
  - IntelliJ IDEA plugin for inner-loop, in-IDE test generation
  - CI integrations (GitHub/GitLab/Jenkins) and Docker images for pipeline usage

### Resources
- Yes
  - Official documentation and user guides: https://www.diffblue.com/docs/cover
  - Product pages and release notes: https://www.diffblue.com/products/cover and company blog
  - Community Edition download and trial instructions available from Diffblue website

## Deployment

### BYOK
-

### LocalOffline
-

## Developer Experience

### ContextManagement
- Yes
  - Project-aware analysis and incremental test maintenance; Cover tracks generated tests and can re-generate/update tests as code changes, integrating with the project's source layout and build system.

### DirectFileReferences
- No
  - Cover operates by scanning the project/source tree (IDE or CLI) rather than accepting ad-hoc @file references in a prompt-like fashion.

### Checkpoints
- No
  - Diffblue does not provide its own checkpoint/undo system; users should rely on VCS (git) to manage changes and review generated tests. Cover does, however, separate Diffblue-managed tests from user-written tests to reduce accidental edits.

### GitSupport
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - IntelliJ plugin, CI plugins/integration points, and Docker-based deployment artifacts for pipeline integration.

### Hooks
- No
  - There are no widely documented lifecycle hook APIs for Cover; integrations are achieved via standard CI/CD hooks and the CLI rather than a bespoke lifecycle hook system.

### SlashCommands
- Yes
  - CLI subcommands (e.g., test generation and diagnostic commands such as `dcover issues`), and IDE actions exposed in IntelliJ for invoking test generation on classes/methods.

### CustomModes
- No
  - While Cover offers features like Guided Coverage Improvement and Test Asset Insights, it does not expose user-definable "modes" in the sense of switchable chat/assistant personas.

### Subagents
- No
  - Diffblue's architecture may include internal components for analysis and generation, but it does not expose configurable AI subagents for end-users.

## Ungrouped Criteria

### Terminal
- Yes
  - CLI access is available in paid/teams tiers for CI and automation use-cases.

### SpecDrivenDevelopment
- 
  - No explicit integrations with the listed Spec Driven Development toolkits; Cover focuses on generating runnable JUnit/TestNG tests and integrates with standard Java build and CI tooling.
