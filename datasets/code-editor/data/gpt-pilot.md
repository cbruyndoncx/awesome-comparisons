# GPT Pilot - https://github.com/Pythagora-io/gpt-pilot/
Open-source/Source-available AI developer companion that generates full-stack applications using multi-agent LLM workflows.
## Version

## Classification 
- Code/Editor

## Rating
- [4] Strong at end-to-end prototype and feature generation
- [3] Requires active human oversight for correctness, design and edge cases
## Repository
- https://github.com/Pythagora-io/gpt-pilot
## Languages
- Python
- JavaScript
- TypeScript
## Extensible
- Yes
## Description
GPT Pilot (by Pythagora) is a source-available AI developer assistant designed to automate large parts of the software development lifecycle. It uses a multi-agent workflow to: clarify requirements, design architecture, break work into tasks, generate code, run tests, and iterate with human reviews. It targets generating production-ready features (not just snippets) and integrates with developer tooling like a VS Code extension and a CLI.
## BYOK
- Yes
  - Supports multiple LLM providers (OpenAI, Anthropic/Claude, Groq) via configuration — effectively a vendor-agnostic/BYOK model.
## LocalOffline
- Yes
  - Can be run locally or inside Docker; configurable to use local LLM endpoints or self-hosted inference where supported.
## FreeTrial
- Yes
  - The open/source-available GPT Pilot codebase is free to run; Pythagora also offers a commercial Pythagora Pro product with paid features.
## GitSupport
- Yes
## Terminal
- Yes
  - CLI-driven project creation and workspace management are supported.
## Opensource
- No
  - The project is distributed under a Functional Source License (FSL) / "Fair Source" style license (source-available) rather than an OSI-approved open-source license.
## License
- FSL
  - Functional Source License (FSL) / Fair Source (source-available, not MIT/Apache/GPL)
## MCP-Client
- 
  
## Notes
- BYOK: Configure your own API keys (OpenAI, Anthropic, Groq, etc.) in config.json or environment variables; no vendor lock-in by default.
- Local & Docker: Official examples and docker-compose are provided; workspace defaults to a local folder and Postgres is supported for persistence.
- Requirements: Python 3.9+; example-config.json / .env templates provided in the repo.
- Workflow: Generates programmatic unit/integration tests as it develops features; asks for human review at checkpoints ("95% automated / 5% human oversight" principle).
- License implications: FSL is source-available with usage restrictions (often includes time-limited commercial restrictions or non-compete terms). This is different from permissive OSS licenses (MIT/Apache) or copyleft licenses (GPL); review the FSL text before using in commercial or competitive products.
- Integration: Has a Pythagora VS Code extension for integrated usage; also usable purely via CLI for automation.
- Limitations: Not fully autonomous — human guidance required for ambiguous requirements, architectural decisions and final QA. Cost exposure comes from your chosen LLM provider when using BYOK.
- Useful links:
  - Repository: https://github.com/Pythagora-io/gpt-pilot
  - Project site: https://www.pythagora.ai
  - PyPI package: https://pypi.org/project/gpt-pilot/


## ContextManagement
- Yes
  - GPT Pilot uses a multi-part context management strategy designed for large codebases: context-rewinding, recursive conversations, and TDD-driven checkpoints. It maintains a project file/folder tree with human-readable descriptions and generates pseudocode summaries for functions and files. Before implementing a step it: (1) presents the workspace tree + descriptions so the LLM can narrow relevant files, (2) supplies pseudocode summaries for candidate files so the LLM can identify relevant functions, then (3) fetches the actual code for the selected files into the implementation conversation. This selective fetching + pseudocode approach keeps the LLM prompt size bounded while preserving the necessary local context.

## DirectFileReferences
- Yes
  - Files and folders are represented in the workspace with descriptions; GPT Pilot can present a project tree and selectively fetch files into the active conversation. It also stores generated code in a workspace (CLI-driven) and integrates with Git, VS Code, and a local workspace so the system can operate on real files, commit changes, and run tests. The pseudocode+file-description layer lets the system reference files at function-level granularity before pulling full source.

## Hooks

## SlashCommands

## Subagents
- Yes
  - GPT Pilot implements a multi-agent/subagent architecture with specialized roles (Product Owner, Specification Writer, Software Architect, DevOps, Tech Lead, Developer, Code Monkey, Reviewer, Troubleshooter, Debugger, Technical Writer). These agents are orchestrated to break down requirements into tasks/steps, generate pseudocode, implement code, run tests, and request human review. The agent behaviours and orchestration are implemented in the codebase and can be inspected/extended by modifying the project's agent orchestration/configuration (i.e., adding or changing agent logic requires code/config edits).

## CustomModes

## Plugins

## Checkpoints
- Yes
  - The workflow explicitly includes human review checkpoints and automated test generation at two granularities (unit tests after steps, integration/e2e tests after tasks). Work is persisted in a workspace with Git support and a CLI/VS Code integration, enabling manual rollbacks or inspection. The system's "95% automated / 5% human oversight" model makes checkpoints first-class (stop-and-review before progressing). 

## SpecDrivenDevelopment

- Other
  - GPT Pilot does not advertise one of the named spec frameworks; instead it uses a task/spec decomposition model combined with TDD and multi-agent roles (product-owner/spec-writer → architect → task decomposition → implementation steps + programmatic test goals). The workflow is spec-like (clear programmatic goals, user_review_goals, and auto-test generation) but implemented within the project-specific agent/task framework rather than a published spec-driven framework listed above.
