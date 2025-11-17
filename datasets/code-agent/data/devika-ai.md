# Devika AI - https://github.com/stitionai/devika
An open-source agentic AI software engineer for end-to-end code generation, research, and project automation. (Note: Relationship to "Opcode" brand/website unclear)

## General Info

### Classification

- Code/Autonomous agent

### Version
Unknown (last checked 2025-10-19)

### Repo
- https://github.com/stitionai/devika

### Rating
- [4] Mature feature set for an open-source project (planning, multi-LLM support, local LLMs)
- [4] Actively developed community project with wide model compatibility

### Short Description
An open-source agentic software engineer (Devika / Opcode) that performs end-to-end development tasks: plans, researches, generates, and modifies code across projects using multi-LLM support and local runtimes.

-

### Description
Devika AI is an open-source "software engineer" agent that accepts high-level instructions, creates plans, researches needed information, and implements code across projects. It emphasizes multi-model support (cloud LLMs and local LLMs via Ollama), agentic planning and reasoning, project-based organization, and automation of development tasks including coding, testing, and deployment.

Key capabilities include automated planning (breaking objectives into actionable steps), web research (browse and extract relevant docs), code generation across multiple languages/stack contexts, repository/Git integration, and deployment helpers (for example, static site deployment to Netlify).

### Languages
- JavaScript / TypeScript
- Python
- Shell

### Notes
- Multi-model support: commonly used with Claude 3, GPT-4, Gemini, Mistral, Groq and local models via Ollama.
- Requirements: commonly references Bun (JavaScript runtime), Ollama for local LLMs, Git, and standard development tooling.
- Project organization: project-based workspace model with persistent state and task tracking so agents can continue work across sessions.
- Research and browsing: built-in research module for fetching and summarizing web documentation, API references, and examples.
- Use cases: full-stack feature implementation, repo maintenance, automated testing, documentation generation, and static site deployment.
- Community & contribution: open-source repo on GitHub encourages contributions; check repository for issues, contribution guidelines and exact license details.

### Last Update
2025-10-19
-

## Licensing

### Opensource
- Yes

### License
- MIT

### FreeTrial
- Yes
  - The project is open-source and free to run; commercial clouds/models used via BYOK may incur costs.

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - Uses configurable prompt templates and system messages for task decomposition, planning, and code generation. Prompts are exposed in configuration and can be tuned per-project.

### Tools
- Yes
  - Integrates with external tools and runtimes (Playwright for browsing/research, Git, shell execution, Bun for UI, Ollama for local models, and other model adapters). Tooling is pluggable via adapters.

### Resources
- Yes
  - Ships with documentation, example projects, model adapter configs, and tooling scripts (setup, Playwright, Dockerfiles) to assist deployments and experimentation.

## Deployment

### BYOK
- Yes
  - Supports configuring API keys/endpoints for OpenAI, Claude, Gemini, Mistral, Groq, Bing/Google search, Ollama, etc.

### LocalOffline
- Yes

## Developer Experience

### ContextManagement
- Yes
  - Project-based workspace model with persistent task and agent state. Context and project history are maintained across sessions to enable progressive work on repositories.

### DirectFileReferences
- Yes
  - Agent can read and write repository files, operate on project workspaces, and reference files when executing tasks or generating patches.

### Checkpoints
- Yes
  - Integrates with Git for commits and repository operations; workflows commonly use Git commits as checkpoints and the agent can make/revert commits as part of tasks.

### GitSupport
- Yes
  - Integrates with project repositories and can perform Git operations as part of its workflows.

## Extensible

### Extensible
- Yes
  - Modular architecture designed to add new model adapters, tools, and integrations

### Plugins
- Yes
  - Supports adapter-based extensions for new models and integrations; community contributions extend functionality via adapters and custom scripts.

### Hooks
- Yes
  - Provides lifecycle hooks and integration points in workflows (configuration files and adapter interfaces allow injecting behavior during planning and execution).

### SlashCommands
- Yes
  - Offers CLI and web UI commands for common operations (start/stop agent, create projects, run tasks); extensible via configuration and scripts.

### CustomModes
- Yes
  - Configurable modes and profiles (model selection, search/backoff strategies, and task verbosity) to tailor the agent's behavior for different workflows.

### Subagents
- Yes
  - Supports decomposing work into sub-tasks/agents (planner, researcher, executor) and orchestrates them to complete complex jobs; architecture enables parallel or staged task execution.

## Ungrouped Criteria

### Terminal
- Yes
  - Provides CLI and web UI components; integrates with local runtimes (Bun, Ollama) and shells for execution.

### SpecDrivenDevelopment

- 

---

### Notes on Spec Driven Development
- No explicit support for Tessl/Spec-driven frameworks is documented; Devika/Opcode focuses on agentic workflows and project orchestration rather than a specific spec-driven tooling standard.

