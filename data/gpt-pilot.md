# GPT Pilot - https://github.com/Pythagora-io/gpt-pilot/
Open-source/Source-available AI developer companion that generates full-stack applications using multi-agent LLM workflows.
## Version

## Rating
- [4] Strong at end-to-end prototype and feature generation
- [3] Requires active human oversight for correctness, design and edge cases
## Repository
- https://github.com/Pythagora-io/gpt-pilot
## Languages
- Python
- JavaScript / TypeScript
## Extensible
- Yes
## Description
GPT Pilot (by Pythagora) is a source-available AI developer assistant designed to automate large parts of the software development lifecycle. It uses a multi-agent workflow to: clarify requirements, design architecture, break work into tasks, generate code, run tests, and iterate with human reviews. It targets generating production-ready features (not just snippets) and integrates with developer tooling like a VS Code extension and a CLI.
## BYOK
- Yes
  - Supports multiple LLM providers (OpenAI, Anthropic/Claude, Groq) via configuration — effectively a vendor-agnostic/BYOK model.
## LocalOffline
- Yes
  Can be run locally or inside Docker; configurable to use local LLM endpoints or self-hosted inference where supported.
## FreeTrial
- Yes
  The open/source-available GPT Pilot codebase is free to run; Pythagora also offers a commercial Pythagora Pro product with paid features.
## GitSupport
- Yes
## Terminal
- Yes
  CLI-driven project creation and workspace management are supported.
## Opensource
- No
  The project is distributed under a Functional Source License (FSL) / "Fair Source" style license (source-available) rather than an OSI-approved open-source license.
## License
- Functional Source License (FSL) / Fair Source (source-available, not MIT/Apache/GPL)
## MCPSupport
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
