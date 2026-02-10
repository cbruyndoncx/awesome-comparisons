# Gemini Code Assist - https://codeassist.google/

Google's dedicated Gemini coding assistant that supports multi-modal capabilities, advanced refactoring, and integrates seamlessly with Google Cloud services. Released in 2025 as Google's comprehensive AI coding solution.

## General Info

### Classification
- Code/Editor

### Version
- Rolling updates (2025-2026)
  - Agent Mode introduced 2025; MCP migration October 2025; Gemini 2.5 Flash/Pro models; 1M token context window.

### Repo
- -

### Rating
- [5] Extremely generous free tier (180K completions/month, 90x GitHub Copilot Free)
- [4] Agent Mode with autonomous multi-step reasoning and 1M token context
- [4] Strong MCP support and multi-IDE coverage (VS Code, JetBrains, Android Studio)

### Short Description
- Google's dedicated Gemini coding assistant with multi-modal support, advanced refactoring capabilities, and deep integration with Google Cloud services.

### Description
Gemini Code Assist is Google's AI-powered coding assistant that leverages the Gemini model family to provide intelligent code completion, generation, and refactoring capabilities. It offers multi-modal support allowing developers to interact with code using text, images, and other formats. The tool integrates deeply with Google Cloud services, making it particularly powerful for cloud-native development workflows.

### Languages
- Any

### Notes
- Agent Mode: autonomous multi-step reasoning that analyzes entire codebase (architecture, dependencies, patterns), plans multi-file refactoring, generates tests with edge cases, debugs by tracing call stacks, and verifies changes iteratively. Presents plan for approval before executing.
- MCP (October 2025): migrated from deprecated Tool Calling API; adds session management, tool discovery, streaming responses, and better observability.
- 1M token context window: supports Gemini 2.5 Flash (speed) and Gemini 2.5 Pro (enhanced reasoning).
- Free tier: 180K completions/month (90x GitHub Copilot Free), no credit card required.
- IDE support: VS Code, IntelliJ, PyCharm, WebStorm, Android Studio, Google Cloud Shell Editor.
- Custom commands: automate repeated steps; chat history for resuming sessions; rule-based response guidance.
- Context controls: automatic .gitignore enforcement, optional .aiexclude files, terminal output attachment for debugging.
- Enterprise: Standard and Enterprise editions with higher quotas, private codebase indexing, and Google Cloud service integrations.
- Auto-outline: AI-assisted documentation generating English-language summaries of code blocks.

### Last Update
2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes

## MCP-Client
- Yes
  - MCP migration October 2025 from deprecated Tool Calling API; adds session management, tool discovery, streaming responses, and enhanced observability for tool invocations.

### Prompts
- Yes

### Tools
- Yes

### Resources
- Yes

### ACP
- No

## Deployment

### BYOK
- No

### Local Offline
- No

## Developer Experience

### Context Management
- Yes

### Direct File References
- Yes

### Checkpoints
- No

### Git Support
- Yes

## Extensible

### Plugins
- Yes

### Hooks
- No

### SlashCommands
- Yes
  - Custom commands to automate repeated steps; chat history for resuming sessions; rule-based response guidance for team standards.

### Skills
- No

### Custom Modes
- Yes
  - Rule-based response guidance for team standards/preferences; per-project context controls (.aiexclude, .gitignore enforcement); model selection (Flash vs Pro).

### Subagents
- Yes
  - Agent Mode orchestrates specialized sub-tasks: planning, code generation, test generation, debugging, and verification in autonomous multi-step workflows.

