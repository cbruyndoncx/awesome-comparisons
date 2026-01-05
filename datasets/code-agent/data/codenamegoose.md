# Codename Goose - https://github.com/block/goose
Lightweight open-source agent framework for automating development and productivity workflows on-machine.

## General Info

### Classification

- Code/Autonomous agent

### Version
v1.10.3 (2025-10-19)

### Repo
- https://github.com/block/goose

### Rating
- [5] Strong open-source agent architecture and community focus
- [4] Powerful automation features; maturity depends on ecosystem of extensions

### Short Description
Lightweight open-source agent framework for automating developer workflows and productivity tasks on-machine. Extensible via the Model Context Protocol (MCP); supports Recipes, .goosehints, subagents, and local/offline operation.

### Description
Codename Goose is an open-source, on-machine AI agent framework created to automate multi-step tasks (initial focus on software engineering workflows). It is designed around an extensible tool system (Model Context Protocol / MCP) that lets the agent discover and interact with external services and developer tools (file systems, git, IDEs, CLIs, cloud APIs) through standardized interfaces. Goose supports multiple LLM providers and can operate via CLI or desktop interfaces, enabling both interactive assistance and autonomous workflows via shareable "Recipes" and project-level ".goosehints" guidance files.

### Languages
- Any

### Notes
- Key features: autonomous multi-step task execution, ".goosehints" project guidance, shareable and repeatable "Recipes" to capture workflows and make agentic behavior reproducible.
- Operational modes: Auto (full autonomy), Approve (prompt before making changes), Chat (suggestions only).
- Primary early use-cases: code generation & migrations, test generation, scaffolding, build/perf automation, and other developer productivity tasks.
- Strong emphasis on extensibility and preventing vendor lock-in by supporting multiple LLM providers and MCP-based extensions.
- Adoption and usefulness will depend on the growth of a healthy extension ecosystem (MCP servers) and high-quality recipes for common workflows.

### Last Update
2025-10-19
- Released v1.10.3 on 2025-10-19 (per repository release tag).

## Licensing

### Opensource
- Yes

### License
- Apache-2.0
  - Repository licensed under Apache-2.0 (per project GitHub license).

### Free Trial
- Yes
  - Open-source and free to use; commercial offerings (if any) not required to run the core framework.

## MCP-Client

### MCP-Client
- Yes
  - Built around and interoperable with the Model Context Protocol (MCP) for tool discovery and standardized tool RPC.

### Prompts
- Yes
  - Recipes include system instructions and initial prompts; Recipes and sub-recipes provide prompt templates and parameterization for structured agent behavior.

### Tools
- Yes
  - Interacts with external tools via MCP servers; built-in extensions and a growing MCP ecosystem expose capabilities like file-system access, git, browser control, and cloud integrations.

### Resources
- Yes
  - Documentation, example recipes, built-in extensions and a catalog of MCP servers are provided to help bootstrap agent capabilities and integrations.

## Deployment

### BYOK
- Yes

### Local Offline
- Yes
  - Can run on-machine and integrate with local/self-hosted model providers via MCP-compatible bridges; Dockerized self-contained deployments are supported.

## Developer Experience

### Context Management
- Yes
  - Context is managed via Recipes and sub-recipes, conversation state, and configuration files (e.g. .goosehints). Recipe parameters, sub-recipes and extension scopes are used to control and scope context passed to LLMs.

### Direct File References
- Yes
  - Supports reading/writing code and project files through file-system and git MCP servers; recipes and extensions can reference files for context or patching changes.

### Checkpoints
- Yes
  - Integrates with git workflows (read/write/commit/branch) and includes Approve Mode for human review before making irreversible changes, enabling checkpoint-like workflows.

### Git Support
- Yes
  - Integrates with git workflows to read/write/commit/branch as part of automated tasks.

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Extensions (MCP servers) act as a plugin mechanism to bundle commands, tools and integrations; Goose ships with built-in extensions and supports adding custom MCP servers.

### Hooks
- Yes (via Recipes and extensions)
  - No explicit lifecycle hook system, but users can implement lifecycle behaviors via Recipes, extensions and approve/confirm flows.

### SlashCommands
- No
  - The project provides a CLI for interactive and scripted control, but chat-style slash-commands are not a documented feature.

### Custom Modes
- Yes
  - Built-in modes include Auto, Approve and Chat; recipes and configuration allow customizing agent behavior for specialized workflows.

### Subagents
- Yes
  - Supports sub-recipes and subagents to delegate specialized work and compose larger workflows from smaller agent units.

