# GitHub Copilot CLI - https://github.com/github/copilot-cli
GitHub Copilot CLI is a terminal-based AI assistant that provides a chat-like interface in your command line, enabling developers to generate shell commands from natural language, explain terminal operations, and receive AI-driven coding assistance directly in their terminal environment. Integrated with the GitHub CLI via gh copilot, the tool helps write, explain, and automate Git, GitHub, and shell operations using conversational prompts.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal

### Version
-

### Repo
https://github.com/github/copilot-cli

### Rating
-

### Short Description
Terminal-based AI assistant for generating and explaining shell commands via natural language

### Description
GitHub Copilot CLI operates as an interactive terminal assistant that translates natural language requests into executable shell commands and provides explanations for complex terminal operations. The tool supports two primary interaction modes: Interactive Mode (continuous chat-like conversation with follow-up questions) and Programmatic Mode (single-prompt execution via -p/--prompt flag for automation and scripting).

The CLI includes a flexible approval system for tool usage, allowing developers to control which commands Copilot can execute with options to approve commands one-time only, approve tools for the entire session, or deny specific tools entirely. Commands can be directly executed with ! prefix without AI model calls. The tool supports custom agents that can be invoked via /agent slash command, direct prompt references, or --agent command-line option.

### Languages
- Any
  - Language-agnostic shell command generation and explanation

### Notes
Requires Node.js 22+ and npm 10+. Free plan includes 50 chat requests per month; full access requires GitHub Copilot Individual, Business, or Enterprise subscription. Installation via npm install -g @github/copilot or gh copilot (GitHub CLI integration as of January 2026). Automatically inherits organization's Copilot policies and governance settings. Can create draft PRs and work in background for substantial changes.

### Last Update
2026-01-31

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Free plan with 50 chat requests per month
  - Full subscription plans: Individual, Business, Enterprise

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - Natural language prompts for command generation and code assistance

### Tools
- Yes
  - Shell command execution with approval system
  - Git and GitHub operations
  - Web search, fetch, extensions tools
  - Approval options: --allow-all-tools, --deny-tool flags

### Resources
- Yes
  - GitHub repository context
  - Documentation access

### ACP
- No

## Deployment

### BYOK
- No
  - Uses GitHub's AI infrastructure

### Local Offline
- No
  - Requires GitHub authentication and internet connectivity

## Developer Experience

### Context Management
- Yes
  - Session-based context in interactive mode
  - Repository-aware when run in code directories

### Direct File References
- Yes
  - Can reference files and code in active editor

### Checkpoints
- Yes
  - Creates new branches and commits unstaged changes as checkpoints for substantial changes
  - Draft PR creation for background work

### Git Support
- Yes
  - Native Git command generation and execution
  - GitHub CLI integration via gh copilot
  - Can create branches, commits, and draft pull requests
  - Granular control over git subcommands (e.g., deny git push)

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- Yes
  - /explain for understanding code and commands
  - /agent for selecting custom agents
  - /login for authentication

### Skills
- No

### Custom Modes
- Yes
  - Interactive mode for continuous chat
  - Programmatic mode for single-prompt automation (-p/--prompt flag)
  - Custom agent invocation via --agent flag

### Subagents
- Yes
  - Custom agents can be created and invoked
  - Example: refactoring agent, testing agent
  - Invoked via /agent command, direct prompts, or --agent CLI option
