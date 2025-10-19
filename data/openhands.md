# OpenHands (OpenDevin) - https://github.com/All-Hands-AI/OpenHands
Open-source autonomous AI software engineer (originally OpenDevin; now maintained as OpenHands)
## Version
v (2025-10-19)
## Rating
- [3] Alpha-stage: actively developed and rapidly changing
- [4] Ambitious functionality: autonomous coding, planning, sandboxed execution
## Repository
- https://github.com/All-Hands-AI/OpenHands
## Languages
- Python
- JavaScript / TypeScript
## Extensible
- Yes
## Description
OpenDevin is an open-source project that implements an autonomous AI software engineer: an agent capable of planning, writing, debugging, and executing code within a controlled workspace. The project provides a web UI, chat interface, terminal/sandbox for running bash commands, and integrations for large language model backends. The codebase is modular, container-first (Docker), and designed for community contributions and experimentation with autonomous developer agents.
## BYOK
- Yes
## LocalOffline
- Yes
  - Can be run locally via Docker; supports local LLM backends where available (may still require internet for some models).
## FreeTrial
- Yes
## GitSupport
- Yes
## Terminal
- Yes
## Opensource
- Yes
## License

## MCPSupport

## Notes
- Project rebranded / continued as "OpenHands" (All-Hands-AI/OpenHands); several mirrors/forks exist under the original OpenDevin name.
- Primary deployment is Docker-based with a sandbox container for executing shell commands; workspace directories are mounted into the sandbox.
- Requires modern Docker, Python 3.10+, and Node.js for full local UI builds and tooling. 
- Current status: alpha — rapidly changing; default agents have limited capabilities but roadmap includes more robust agent types, evaluation pipelines, and improved UI.