# Smol Developer - https://github.com/smol-ai/developer/
A lightweight open-source AI developer agent for generating small projects and prototypes from natural-language specifications.

## General Info

### Classification

- Code/Autonomous agent

### Version
- v1 (library rewrite, pip install smol_dev); no formal versioned releases; commit-driven (last active 2025)

### Repo
- https://github.com/smol-ai/developer

### Rating
- [4] Lightweight and easy to experiment with
- [3] Powerful for small whole-program synthesis tasks but not a full IDE replacement

### Short Description
- Lightweight Python library/agent that generates small, runnable codebases and prototypes from markdown or natural-language specifications. Focused on whole-program synthesis and rapid prototyping rather than acting as a full IDE.

### Description
Smol Developer is an opinionated, small-footprint AI "developer" agent that aims to turn high-level product descriptions or markdown specs into runnable, small codebases. It is implemented in Python and designed for experimentation and rapid prototyping: you can run it as a library, as a git-repo driven workflow, or call it via an API-like interface. The project focuses on whole-program synthesis (generating multiple coordinated files rather than isolated snippets) and uses prompt engineering patterns (Markdown specs, planning + implementation steps) to keep results coherent across files.

### Languages
- Any

### Notes
- Core value: whole-program synthesis — Smol focuses on producing small, coherent applications from a single natural-language specification rather than only single-file completions.
- Usage modes:
  - Git Repo Mode: operate against a checked-out repository for iterative development and human review.
  - Library Mode: import smol as a Python package to script generation steps (planning, specifying file paths, generate).
  - API/Recipe Mode: integrate the agent into higher-level tooling or automated flows.
- Prompting DSL: leans on Markdown as the canonical way to describe requirements and specs for the agent.
- Good fit: rapid prototyping, scaffolding, learning how to implement features with unfamiliar APIs, and generating small demo apps or PoCs.
- Limitations: quality and speed depend heavily on the chosen LLM (GPT-4 is common but slower/costly). The tool is experimental — outputs require human review, testing, and iteration. Not designed as a drop-in replacement for full IDE/code-review workflows.
- 2025-2026 Update: Project in stable maintenance phase with incremental improvements. PR #158 (Apr 2025) migrated dependency management from Poetry to uv for faster builds. Multi-model provider support via litellm (Azure, OpenAI, Palm, Anthropic, Cohere, Replicate). Feedback loop remains 2-4 minutes per generation cycle with GPT-4. Community spawned smol-dev-js (JavaScript variant for incremental live project changes). Project focus remains on lightweight prototyping rather than full IDE workflows.

### Last Update
- 2026-01-30

## Licensing

### Opensource
- Yes

### License
- MIT
  - Repository distributed under the MIT license (per GitHub repository metadata and LICENSE file).

### Free Trial
- Yes
  - Project is open-source and free to use; using cloud LLMs (e.g., OpenAI) may incur costs depending on provider usage.

## MCP-Client

### MCP-Client
- No
  - Smol Developer does not include built-in support for the Model Context Protocol (MCP); it is a standalone Python library/repo workflow. Integration with MCP servers would need to be added by consumers.

### Prompts
- Yes
  - Prompts and markdown specs are central to the workflow; users provide specs in Markdown which drive the generation process.

### Tools
- Yes
  - Smol integrates with LLM providers (commonly OpenAI) and uses Modal for runtime/dependency orchestration in some deployment patterns.

### Resources
- Yes
  - The repository provides documentation, examples, and workflow recipes in the GitHub README.

### ACP
- No

## Deployment

### BYOK
- Yes
  - Users bring their own LLM API keys (e.g., OpenAI) for generation.

### Local Offline
- Partial (supports local LLMs but typically uses cloud)
  - Smol can be configured to use locally hosted/open-source LLMs, but most common usage relies on a cloud LLM (e.g., OpenAI GPT-4) which requires network access and an API key.

## Developer Experience

### Context Management
- Yes
  - Context is managed via repository-driven workflows and the Markdown spec + plan structure; users iterate against a git repo and can pass file/dir context into generation steps.

### Direct File References
- Yes
  - In repo mode the agent operates on files in the checked-out repository and can reference/modify files directly as part of the workflow.

### Checkpoints
- Yes
  - Checkpoints are provided by Git (git commits) when using repo mode; users can review, revert, and manage history through standard VCS operations.

### Git Support
- Yes
  - The primary interactive workflow is git-repo driven, enabling human-in-the-loop development, commits, diffs and review.

## Extensible

### Extensible
- Yes
  - Designed to be lightweight and modifiable; users can adapt prompts, model integration, and workflows.

### Plugins
- No
  - The project does not ship a formal plugin system; extensibility is achieved by forking or modifying the Python code and prompts.

### Hooks
- No
  - No documented lifecycle hook system; automation is typically orchestrated externally (scripts, CI, or user code).

### SlashCommands
- No
  - Not applicable to the core project (these concepts belong to other developer platforms/environments).

### Custom Modes
- No
  - Smol provides usage modes (repo/library/api) but not a formal custom-mode framework or built-in specialized chat modes.

### Subagents
- No
  - The repo does not implement a subagent orchestration framework; parallel specialized agents would need to be composed externally.

