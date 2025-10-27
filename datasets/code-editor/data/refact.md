# Refact.ai - https://refact.ai
An open-source autonomous AI coding assistant with RAG-powered completions and in-IDE agent features.
## Version
(2025-10-19)

## Classification 
- Code/Editor

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

## ContextManagement
- Yes
  - Refact.ai uses Retrieval-Augmented Generation (RAG) to maintain and update contextual state across a repository: whole-repo indexing, symbol-aware retrieval, and context windows sourced from the repo index.
  - In-IDE session/chat history is preserved and combined with retrieved artifacts to form answers; users can create custom system prompts to influence context.
  - Explicit context controls: @-commands (e.g., @file, @web, @definition, @references, @tree) let users attach or restrict specific sources of context for a given query.
  - Configurable model selection and BYOK allow controlling which LLM and key are used, indirectly affecting context generation and privacy.

## DirectFileReferences
- Yes
  - Files can be referenced directly via IDE integrations and chat: @file uploads, file attachments, and by invoking workspace tree/@tree to point the agent at specific files or directories.
  - RAG indexing maps symbols to file locations (definitions/references), enabling queries like “show usages of X” or “apply changes to file Y” that reference files precisely.
  - The agent can read and operate on repository files (open, edit, commit) when granted appropriate permissions in the self-hosted or hosted deployment.

## Hooks
- No

## SlashCommands
- Yes
  - Refact.ai exposes a set of in-chat @-commands (functionally equivalent to slash commands) such as @web, @file, @definition, @references, and @tree to trigger reusable behaviors and context attachments.
  - Users can create and reuse custom system prompts and prompt templates inside the workspace to replicate common command-like workflows.

## Subagents
- Yes
  - Refact.ai supports autonomous agent workflows that can be configured to run multi-step tasks (e.g., run tests, create branches, commit changes, open PRs) and integrate with external tools (Git, Docker, DBs, shell) when enabled.
  - Agents leverage the repo index + tool integrations to execute actions, follow-up on results, and iterate (plan→execute→verify) across the codebase.

## CustomModes
- Yes
  - Users can define custom system prompts, select specific LLMs, and configure workspace-level settings to create tailored modes for different tasks (refactor, document, test, review).
  - BYOK and model selection let teams create specialized modes that enforce privacy or use tuned models for in-house coding standards.

## Plugins
- Yes
  - Refact.ai provides IDE plugins (VS Code, JetBrains, Neovim) and connectors (GitHub/GitLab, databases, Docker) that bundle commands, agent behaviors, and integrations into reusable workflows.
  - Deployments (self-hosted Docker / enterprise images) and extension points allow organizations to integrate custom tools and scripts that the agent can call as part of its actions.

## Checkpoints
- Yes
  - Actions performed by the agent that modify repository state (branches, commits, PRs) are reversible using standard Git operations (revert, reset, branch/commit history) when the agent's git-level permissions are enabled.
  - Self-hosted deployments can enforce additional backup/versioning policies; enterprise deployments support retaining audit logs and rolling back via git or deployment snapshots.

## SpecDrivenDevelopment
- Other
  - None : Refact.ai is a code-assistant / autonomous-engineering agent and does not itself prescribe a specific spec-driven development framework
