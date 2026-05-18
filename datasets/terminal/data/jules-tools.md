# Jules Tools CLI - https://jules.google/

Jules Tools is Google's command-line interface for Jules, their asynchronous AI coding agent powered by Gemini 2.5 Pro. Launched in October 2025, it brings Jules directly into the developer's terminal for streamlined coding workflows.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal
- Code/Autonomous agent

### Version
- GA (August 2025; CLI October 2025)

### Repo
- -

### Rating
- [4] Async cloud-based agent now GA; Gemini 3.1 Pro backing; clear pricing tiers; environment snapshots for consistent execution
- [2] No extensibility (no MCP, hooks, plugins, or skills); cloud-only execution model

### Short Description
Command-line interface for Google's Jules AI coding agent, enabling terminal-based interaction with Gemini 2.5 Pro-powered asynchronous coding assistance.

### Description
Jules Tools is the command-line interface for Jules, Google's asynchronous coding agent launched in October 2025. The CLI lets developers interact with Jules directly from the terminal using commands, streamlining workflows by eliminating the need to switch between the web interface and GitHub.

Jules fetches repositories, clones them to a Cloud VM, and develops a plan utilizing the latest Gemini 2.5 Pro model. It operates asynchronously, allowing developers to focus on other tasks while it works in the background on coding tasks such as writing tests, building features, fixing bugs, and bumping dependency versions.

The tool integrates with existing repositories, understands full project context, and creates pull requests with the changes. Google has also made Jules' API public, allowing developers to integrate Jules into their existing workflows and development environments beyond the CLI.

### Languages
- Any

### Notes
- Model: Powered by Gemini 3.1 Pro (updated from 2.5 Pro)
- Async Operation: Works in background while developers focus on other tasks; submit and return to completed PRs
- GA: Exited public beta August 2025 after hundreds of UI and quality improvements; CLI launched October 2025
- Free Tier: 15 tasks/day, 3 concurrent tasks
- Paid Plans: Pro $19.99/month (100 tasks/day, 15 concurrent); Ultra $124.99/month (300 tasks/day, 60 concurrent)
- Features: Test writing, feature building, bug fixing, dependency updates, audio changelogs, multimodal input
- Environment Snapshots: Ensures faster, consistent execution across sessions
- User Steerability: Modify Jules' execution plan at different stages before and during execution
- Integration: Public API available for custom workflow integration
- Cloud Execution: Clones repositories to isolated Google Cloud VM

### Last Update
2026-05-14

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Free tier: 15 daily tasks, 3 concurrent tasks
  - Available worldwide where Gemini models are accessible

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes
  - Command-line prompts for task assignment
  - Natural language task descriptions

### Tools
- Yes
  - CLI commands for interacting with Jules
  - Public API for custom integrations

### Resources
- Yes
  - Official website: https://jules.google/
  - Documentation: https://jules.google/docs/
  - Google Developer Blog: https://developers.googleblog.com/

### ACP
- No

## Deployment

### BYOK
- No

### Local Offline
- No
  - Requires Cloud VM for repository cloning and execution

## Developer Experience

### Context Management
- Yes
  - Understands full repository context
  - Powered by Gemini 2.5 Pro's large context window

### Direct File References
- Yes

### Checkpoints
- Yes
  - Creates pull requests for review before merging

### Git Support
- Yes
  - Direct GitHub integration
  - Automatic PR creation

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- No

### Skills
- No

### Custom Modes
- Yes
  - Asynchronous background operation mode. Recurring scheduled tasks (e.g. weekly dependency checks, nightly lint fixes).

### Subagents
- No

## Ungrouped Criteria

### Terminal
- Yes

