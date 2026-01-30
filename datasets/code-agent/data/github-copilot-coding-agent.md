# GitHub Copilot Coding Agent - https://github.com/features/copilot
An asynchronous autonomous coding agent from GitHub that works in the background on assigned tasks, creating draft pull requests and executing development work via GitHub Actions.

## General Info

### Classification

- Code/Autonomous agent

### Version
GA (General Availability September 25, 2025; announced May 2025 at Microsoft Build)

### Repo
-

### Rating
- [5] Seamless integration into existing GitHub workflows with async background execution and PR-based review loops.
- [3] Best for well-scoped tasks; 60-minute session timeout, limited effectiveness on complex multi-file refactors, and context loss in large monorepos.

### Short Description
An asynchronous autonomous coding agent from GitHub that operates in the background via GitHub Actions, handling assigned development tasks and creating draft pull requests for human review, with support across GitHub, VS Code, and upcoming IDE integrations.

### Description
GitHub Copilot Coding Agent is an asynchronous AI developer that works independently in its own isolated development environment powered by GitHub Actions. When a task is assigned, the agent opens a draft pull request and executes work in the background, then requests human review once complete. It handles autonomous code refactoring across multiple files, test coverage improvements, defect fixing, new feature implementation, and application modernization for Java and .NET (including code assessment, remediation, and dependency management across thousands of files). Developers can preview progress in real-time, review changes, leave PR comments, and request modifications from Copilot, creating a collaborative loop. The agent is available across GitHub.com, VS Code (with plans to open-source Copilot Chat), and upcoming support for JetBrains, Eclipse, and Xcode. It supports additional models through GitHub Models, including Grok 3 from xAI. Available on both free and paid tiers, with advanced features like assigning GitHub issues to Copilot requiring Copilot Pro Plus.

### Languages
- Multi-language support
  - Broad language coverage through GitHub's language ecosystem
  - Specialized Java and .NET modernization capabilities (version upgrades, dependency management)
  - Strong support for Python, JavaScript/TypeScript, and common web/backend stacks

### Notes
- Distinguishing features: asynchronous background execution via GitHub Actions, PR-based collaborative review loop, application modernization for Java and .NET across thousands of files.
- Workflow: assign task to Copilot via GitHub or IDE, agent creates draft PR, works in background, requests review when complete; leave PR comments to request changes.
- 60-minute session timeout: work not committed within this timeframe is lost.
- Currently performs best on simplistic, well-scoped tasks rather than complex multi-file refactoring.
- Known limitations: code hallucinations (non-existent APIs), context loss in very large monorepos.
- Available on free and paid tiers; Copilot Pro Plus required for assigning GitHub issues to Copilot.
- IDE support: GitHub.com, VS Code (Copilot Chat being open-sourced), JetBrains, Eclipse, and Xcode planned.
- GitHub Models integration enables access to additional AI models including Grok 3 from xAI.
- Can work collaboratively with other AI agents throughout the development lifecycle.

### Last Update
2026-01-30

## Licensing

### Opensource
- No
  - Plans to open-source GitHub Copilot Chat in VS Code; core agent is proprietary

### License
- Proprietary

### Free Trial
- Yes
  - Free tier available with limited usage; Copilot Individual, Business, and Enterprise plans for full access; Pro Plus for advanced agent features

## MCP-Client

### MCP-Client
- No
  - No documented MCP client support for the coding agent as of January 2026; Copilot ecosystem focuses on GitHub-native integrations

### Prompts
- Yes
  - Accepts natural-language task assignments via GitHub issues, PR comments, and IDE interfaces
  - Supports iterative feedback through PR comment-based review loops

### Tools
- Yes
  - GitHub Actions-powered execution environment
  - Git operations (branches, commits, PR creation and modification)
  - Code search and repository navigation
  - CI system integration and automated testing
  - Application modernization tooling for Java and .NET

### Resources
- Yes
  - GitHub documentation, Copilot documentation, repository context, and in-product guidance

### ACP
- No

## Deployment

### BYOK
- No
  - Uses GitHub's AI infrastructure with GitHub Models for model selection; no documented external API key support

### Local Offline
- No
  - Agent runs in cloud-based GitHub Actions environments; IDE extensions require connectivity

## Developer Experience

### Context Management
- Yes
  - Repository-level context awareness for code generation
  - PR-based context with full change history and review comments
  - GitHub Models integration for model-specific capabilities

### Direct File References
- Yes
  - Operates on specific repository files; refactors across multiple files
  - Full repository access within GitHub Actions execution environment

### Checkpoints
- Yes
  - Git-based checkpointing through commits within draft PRs
  - Full change history visible in PR diff view
  - 60-minute session timeout is a constraint on checkpoint frequency

### Git Support
- Yes
  - Native GitHub integration: branch creation, commits, draft PRs, PR comments
  - Automated PR workflows triggered by task assignment
  - CI integration for test validation

## Extensible

### Extensible
- Yes
  - GitHub Actions workflows, GitHub Models for model selection, and IDE integrations

### Plugins
- Yes
  - GitHub Actions marketplace for workflow extensions
  - GitHub Models for additional AI model access (Grok 3, etc.)
  - IDE extension ecosystem (VS Code, JetBrains, Eclipse, Xcode)

### Hooks
- No
  - No documented lifecycle hook system for custom agent event handling

### SlashCommands
- No
  - No documented slash-command interface for the coding agent; interaction is through task assignment and PR comments

### Skills
- No
  - No documented reusable skills system

### Custom Modes
- No
  - No documented custom mode system; agent behavior is determined by task assignment context

### Subagents
- No
  - No documented subagent architecture; operates as a single autonomous agent per task within GitHub Actions
