# Refact.ai - https://refact.ai
An open-source autonomous AI coding assistant with RAG-powered completions and in-IDE agent features.
## Version
(2025-10-19)

## Rating
- [5] Excellent context-aware completions and agent capabilities
- [4] Strong IDE integrations (VS Code, JetBrains, Neovim)
- [4] Good documentation and deployment guides

## Repository
- https://github.com/smallcloudai/refact
  
## Languages
- Any
  
## Extensible
- Yes

## Description
Refact.ai is an open-source AI coding assistant and autonomous engineering agent that provides context-aware code completion, refactoring, in-IDE chat, debugging, test generation, and autonomous repository operations. It uses Retrieval-Augmented Generation (RAG) to make suggestions grounded in your codebase and supports multiple LLM providers via a BYOK (bring-your-own-key) approach. Refact.ai can be self-hosted (Docker) for on-premises deployments and integrates with common dev tools like GitHub/GitLab, databases, and CI workflows.

## BYOK
- Yes

## LocalOffline
- Yes
  - Self-hosted Docker deployment and on-prem options. Can be run without sending code to third-party services when configured to use local/private models and infrastructure.

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- Yes
  - Agent can execute shell commands, interact with Docker, run tests and debuggers (e.g., pdb) when permitted by deployment configuration.

## Opensource
- Yes

## License
- BSD-3

## MCP-Client
- 

## Notes
- Notable features: RAG-based whole-repo context, unlimited accurate autocompletion (uses models like Qwen2.5-Coder by default for completions), in-IDE chat tied to repo context, autonomous agent actions (branching, commits, PRs).
- Deployment: Docker images and docs available in the repo for self-hosted/on-prem deployments; enterprise offerings include managed AWS Marketplace images and Nvidia-optimized instances.
- Enterprise: fine-tuning support for organization codebases and multiple simultaneous fine-tunes for different teams.
- Benchmarking: ranks highly on SWE-bench (verified) for AI code agents in pass@1 and multimodal tasks.
- Pricing model: Free tier (e.g., initial "coins" allocation such as 5,000), Pro plans and Enterprise plans with additional features and on-prem support.
- Security & privacy: Self-hosted option allows code to remain inside your network; BYOK gives control over which LLMs and keys are used.


