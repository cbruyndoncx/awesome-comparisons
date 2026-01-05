# OpenHands (OpenDevin) - https://github.com/All-Hands-AI/OpenHands
Open-source autonomous AI software engineer (originally OpenDevin; now maintained as OpenHands)

## General Info

### Classification

- Code/Autonomous agent

### Version
Unknown (last checked 2025-10-19)

### Repo
- https://github.com/All-Hands-AI/OpenHands

### Rating
- [3] Alpha-stage: actively developed and rapidly changing
- [4] Ambitious functionality: autonomous coding, planning, sandboxed execution

### Short Description
OpenHands (formerly OpenDevin) is an open-source platform that provides autonomous AI software engineer agents capable of planning, writing, debugging, and executing code within an isolated workspace. The project includes a web UI/chat interface, a terminal/sandbox for executing commands, and integrations for multiple LLM backends.

### Description
OpenDevin is an open-source project that implements an autonomous AI software engineer: an agent capable of planning, writing, debugging, and executing code within a controlled workspace. The project provides a web UI, chat interface, terminal/sandbox for running bash commands, and integrations for large language model backends. The codebase is modular, container-first (Docker), and designed for community contributions and experimentation with autonomous developer agents.

### Languages
- Any

### Notes
- Project rebranded / continued as "OpenHands" (All-Hands-AI/OpenHands); several mirrors/forks exist under the original OpenDevin name.
- Primary deployment is Docker-based with a sandbox container for executing shell commands; workspace directories are mounted into the sandbox.
- Requires modern Docker, Python 3.10+, and Node.js for full local UI builds and tooling. 
- Current status: alpha — rapidly changing; default agents have limited capabilities but roadmap includes more robust agent types, evaluation pipelines, and improved UI.

### Last Update
2025-11-15

## Licensing

### Opensource
- Yes

### License
- MIT
  - Core OpenHands repositories are published under the permissive MIT license.
  - Some ecosystem components use different licenses (notably OpenHands-Cloud uses a Polyform Free Trial-style license for the cloud product), so verify individual repo LICENSE files for specific components.

### Free Trial
- Yes

## MCP-Client

### MCP-Client
- Unknown
  - No public documentation found indicating Model Context Protocol (MCP) support.


### Prompts
- Yes
  - Supports prompt templates and repository-level microagents. Repository customization via a .openhands directory (e.g. .openhands/microagents/ and repo.md) is supported for providing guidance and triggerable microagent prompts.

### Tools
- Yes
  - Includes interfaces for executing shell commands in sandboxes, web browsing (agent-assisted browsing), Git operations, LLM provider connectors and other extendable tool hooks.

### Resources
- Yes
  - Provides repo-level customization (.openhands), example microagents, setup.sh for repo setup, and documentation for running locally and with Docker.

## Deployment

### BYOK
- Yes

### Local Offline
- Yes
  - Can be run locally via Docker; supports local LLM backends where available (may still require internet for some models/providers).

## Developer Experience

### Context Management
- Yes
  - Repository-level context via .openhands/repo.md and microagents, in-memory/session context in agent runtime, and workspace file mounting for deterministic file access.

### Direct File References
- Yes
  - Agents can read and modify workspace files; repository customization and microagents support pointing agents at specific files and locations.

### Checkpoints
- Yes
  - Typical workflows rely on Git for commits/branches (agents can create commits and branches). Runtime isolation via Docker provides sandbox snapshots; users can revert via Git or recreate containers to rollback changes.

### Git Support
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Extension points via microagents and repository configuration; ecosystem includes additional repos (actions, resolvers, operator tooling) that integrate with the core system.

### Hooks
- Yes
  - Repo-level setup hooks (e.g. .openhands/setup.sh) and microagent trigger files provide lifecycle and customization hooks.

### SlashCommands
- No
  - No public documentation found for slash commands.

### Custom Modes
- Yes
  - Supports creating custom agent types, microagents and specialized workflows to tailor behavior for specific tasks.

### Subagents
- Yes
  - Supports multi-agent coordination and microagent patterns to compose specialized subagents for task-specific workflows.

