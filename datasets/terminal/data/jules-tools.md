# Jules Tools CLI - https://jules.google/

Jules Tools is Google's command-line interface for Jules, their asynchronous AI coding agent powered by Gemini 2.5 Pro. Launched in October 2025, it brings Jules directly into the developer's terminal for streamlined coding workflows.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal
- Code/Autonomous agent

### Version
- Public Beta (October 2025)

### Repo
- -

### Rating
- -

### Short Description
Command-line interface for Google's Jules AI coding agent, enabling terminal-based interaction with Gemini 2.5 Pro-powered asynchronous coding assistance.

### Description
Jules Tools is the command-line interface for Jules, Google's asynchronous coding agent launched in October 2025. The CLI lets developers interact with Jules directly from the terminal using commands, streamlining workflows by eliminating the need to switch between the web interface and GitHub.

Jules fetches repositories, clones them to a Cloud VM, and develops a plan utilizing the latest Gemini 2.5 Pro model. It operates asynchronously, allowing developers to focus on other tasks while it works in the background on coding tasks such as writing tests, building features, fixing bugs, and bumping dependency versions.

The tool integrates with existing repositories, understands full project context, and creates pull requests with the changes. Google has also made Jules' API public, allowing developers to integrate Jules into their existing workflows and development environments beyond the CLI.

### Languages
- Any

### Notes
- Model: Powered by Gemini 2.5 Pro
- Async Operation: Works in background while developers focus on other tasks
- Launch: Public beta began August 2025, CLI launched October 2025
- Free Tier: Up to 15 individual daily tasks and 3 concurrent tasks
- Paid Plans: Google AI Pro ($19.99/month - 5x limits), Ultra ($124.99/month - 20x limits)
- Features: Test writing, feature building, bug fixing, dependency updates, audio changelogs
- Integration: Public API available for custom workflow integration
- Cloud Execution: Clones repositories to Cloud VM for development

### Last Update
- 2025-11-18

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
- -

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

## Deployment

### BYOK
- No

### LocalOffline
- No
  - Requires Cloud VM for repository cloning and execution

## Developer Experience

### ContextManagement
- Yes
  - Understands full repository context
  - Powered by Gemini 2.5 Pro's large context window

### DirectFileReferences
- Yes

### Checkpoints
- Yes
  - Creates pull requests for review before merging

### GitSupport
- Yes
  - Direct GitHub integration
  - Automatic PR creation

## Extensible

### Plugins
- -

### Hooks
- -

### SlashCommands
- -

### Custom Modes
- Yes
  - Asynchronous background operation mode
  - Available via Google AI Pro and Ultra plans with different capability limits

### Subagents
- -

## Ungrouped Criteria

### Terminal
- Yes

