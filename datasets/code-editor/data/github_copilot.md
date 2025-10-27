# GitHub Copilot - https://github.com/features/copilot
AI pair-programmer and code assistant integrated across popular IDEs and GitHub.
## Version
vN/A (2025-10-19)
## Classification 
- Code/Editor

## Rating
- [5] Strong, context-aware code completion and multi-file assistance
- [4] Mature IDE integrations and collaboration features
- [3] Proprietary service with privacy/enterprise trade-offs
## Repository
- 
## Languages
- JavaScript
- TypeScript
- Python
- Go
- Java
- C#
- Ruby
- PHP
- C/C++
- Swift
- Rust
- SQL
- Shell
## Extensible
- Yes
  - Editor and IDE integrations (VS Code, Visual Studio, JetBrains, Xcode, Vim/Neovim, Eclipse), GitHub Marketplace extensions and CLI/Terminal integrations
## Description
GitHub Copilot is a cloud-hosted AI coding assistant from GitHub (Microsoft) that provides inline code completions, whole-function and multi-file suggestions, a conversational Copilot Chat interface, and autonomous coding agent features. It leverages multiple large models (including GPT-family and Claude models) to offer natural-language-to-code generation, contextual completions based on repository contents, and developer workflows such as generating pull requests, writing tests, and refactoring.

Copilot is positioned as an AI pair programmer: suggestions appear as you type in supported editors, and Copilot Chat enables interactive Q&A and multi-file code transformations. Enterprise offerings add organization-level controls, knowledge bases for chat context, and workflow features that let Copilot act on GitHub issues and propose pull requests.
## BYOK
- No
  - No public, general-purpose "bring your own key" option for the cloud-hosted Copilot service. Enterprise plans provide data controls and policy management but do not expose a documented BYOK for model keys as of 2025-10-19.
## LocalOffline
- No
  - Any offline/local-only model hosting is not offered for the standard Copilot cloud service. Some organizations use enterprise features to limit data sharing; however, Copilot itself runs in GitHub/Microsoft cloud.
## FreeTrial
- Yes
  - Copilot has free tiers (e.g., Copilot Free for qualifying users) and trial/paid plans (Pro/Business/Enterprise) with different capabilities.
## GitSupport
- Yes
  - Integrates with GitHub workflows: PR description generation, PR creation by the Copilot agent, and issue-to-PR workflows in enterprise features.
## Terminal
- Yes
  - Copilot Chat is available in supported terminals (Windows Terminal Canary, GitHub CLI integrations) and can be used from the command line in supported environments.
## Opensource
- No
## License
- Proprietary
## MCP-Client
- Yes
## Notes
- Copilot provides model selection and multi-model access (e.g., GPT-4o, Claude variants) in certain plans; model availability varies by tier.
- Copilot Chat supports multi-file edits from a single prompt and can incorporate repository context and organization knowledge bases in Enterprise.
- The Copilot autonomous coding agent can be assigned GitHub issues and produce pull requests for review; this increases automation but requires careful review for correctness and security.
- Privacy/data usage: Enterprise tiers offer stronger controls and indemnity options; evaluate data residency and IP policies if using Copilot on proprietary codebases.


## ContextManagement
- Yes
  - Methods available for managing and updating context:
    - Editor-provided references: client.file (active file content) and client.selection (current selection) passed when the Copilot Editor Context permission is granted.
    - GitHub references: github.current-url and github.repository to ground chat requests to a repository or page context.
    - Copilot Spaces and Knowledge Bases: curated collections of Markdown/docs that can be attached as grounding context for Copilot Chat in organization/enterprise settings.
    - Model Context Protocol (MCP) / extension APIs: allow explicit programmatic injection of context and integration with external systems.
    - Chat variables and explicit file references: using chat commands/variables (e.g., #file, #editors or file anchors) to reference or include specific files in a conversation.
    - User-controlled exclusions: context exclusion lists and per-file opt-outs to prevent sharing sensitive files.

## DirectFileReferences
- Yes
  - How files can be directly referenced in context:
    - client.file provides the full text of the active editor file to extensions when permitted.
    - Chat-specific file anchors and #file-like references can be used to point Copilot Chat at particular repository files for multi-file edits and analysis.
    - Copilot Chat in IDEs can operate on multiple open files (multi-file edits) when the chat prompt references them; in the web UI, github.current-url links a chat to the current page/PR/file view.
    - Repository-level knowledge bases let you include specific documentation files as searchable context the assistant can consult.

## Hooks
- Yes
  - Are there any lifecycle events for the agent generated that can be attached to:
    - Agents/skillsets provide extension points for request handling and response generation (agent lifecycle handling for incoming chat requests, response formatting, and function-call style interactions).
    - GitHub Apps and Copilot Extensions integrate via the Copilot Extensibility APIs which expose request/context arrival and response phases; developers implement handlers to process and respond to chat/agent requests.

## SlashCommands
- Yes
  - Is there support for re-usable commands that can be manually triggered by the user:
    - Copilot Chat supports conversational triggers and structured commands/inputs in the chat UI; extensions/agents can expose command-like actions that users invoke from the chat or editor context.
    - In IDE integrations, extension commands (command palette, context menu, chat commands) let users trigger predefined behaviors or workflows.

## Subagents
- Yes
  - Is it possible to define specialized AI subagents for task-specific workflows ? If so, explain how.
    - Copilot's extensibility distinguishes lightweight skillsets (task-focused handlers) from full agents, enabling developers to build specialized capabilities that act as subagents for constrained workflows.
    - Skillsets encapsulate routing, prompt templates, function evaluation and response shaping for focused tasks; agents provide custom logic and broader orchestration and may call other services or models.

## CustomModes
- Yes
  - Can the user create specialist modes that enable you to tailor the chat experience for specific tasks.
    - Custom instructions, persistent prompt files, Copilot Spaces, and workspace-level knowledge bases allow teams to define tailored modes and default context for chat sessions (for example: testing mode, security-aware suggestions, or style-guides).

## Plugins
- Yes
  - Is there a method of bundling together commands, agents and hooks ? If so, explain how'
    - Copilot Extensions / GitHub Apps act as bundles that package skillsets/agents, commands, and integration hooks; they are installed as apps or extensions in IDEs and on GitHub and include permission configuration (including Copilot Editor Context).
    - Organization-managed Copilot Spaces and knowledge bases let admins distribute curated plugins/contexts across teams.

## Checkpoints
- Yes
  - Is it possible to undo actions taken by the agent by using checkpoints or if autocommitted to git, reversing the history ?
    - Editor undo and local history: any automatic edits suggested by Copilot must be accepted by the user in the editor, and typical editor undo/redo and local history remain available.
    - PR/commit workflow: when Copilot creates commits or PRs (agent-driven), standard git workflows allow reverting commits, closing or reverting PRs, and using branch-based reviews to avoid autocommit risk.
    - Preview and review steps: Copilot Chat multi-file edits are surfaced for review before commit in supported integrations; enterprise policies can enforce review gates.

## SpecDrivenDevelopment


