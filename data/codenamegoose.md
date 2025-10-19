# Codename Goose - https://goose.ai/
Lightweight open-source agent framework for automating development and productivity workflows on-machine.
## Version
v1.10.3 (2025-10-19)
## Rating
- [5] Strong open-source agent architecture and community focus
- [4] Powerful automation features; maturity depends on ecosystem of extensions
## Repository
- https://github.com/block/goose
## Languages
- Any
## Extensible
- Yes
## Description
Codename Goose is an open-source, on-machine AI agent framework created to automate multi-step tasks (initial focus on software engineering workflows). It is designed around an extensible tool system (Model Context Protocol / MCP) that lets the agent discover and interact with external services and developer tools (file systems, git, IDEs, CLIs, cloud APIs) through standardized interfaces. Goose supports multiple LLM providers and can operate via CLI or desktop interfaces, enabling both interactive assistance and autonomous workflows via shareable "Recipes" and project-level ".goosehints" guidance files.
## BYOK
- Yes
## LocalOffline
- Yes
  Can run on-machine and integrate with local/self-hosted model providers via MCP-compatible bridges.
## FreeTrial
- Yes
  Open-source and free to use; commercial offerings (if any) not required to run the core framework.
## GitSupport
- Yes
  Integrates with git workflows to read/write/commit/branch as part of automated tasks.
## Terminal
- Yes
  Provides a CLI for scripting and interactive control.
## Opensource
- Yes
## License

## MCPSupport
- Yes
  Built around and interoperable with the Model Context Protocol (MCP) for tool discovery and standardized tool RPC.
## Notes
- Key features: autonomous multi-step task execution, ".goosehints" project guidance, shareable and repeatable "Recipes" to capture workflows and make agentic behavior reproducible.
- Operational modes: Auto (full autonomy), Approve (prompt before making changes), Chat (suggestions only).
- Primary early use-cases: code generation & migrations, test generation, scaffolding, build/perf automation, and other developer productivity tasks.
- Strong emphasis on extensibility and preventing vendor lock-in by supporting multiple LLM providers and MCP-based extensions.
- Adoption and usefulness will depend on the growth of a healthy extension ecosystem (MCP servers) and high-quality recipes for common workflows.

