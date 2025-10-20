# PearAI - https://trypear.ai
PearAI is an open-source AI-powered code editor that aims to be an all-in-one development environment integrating multiple AI tools and capabilities into a familiar VSCode-like experience. Much of the AI agent functionality is built upon RooCode and Cline.

## Version
v1.x (active; releases during 2024-2025)

## Classification 
- Code/Editor

## Rating
- [4] Strong project vision and open-source approach
- [3] Early-stage rough edges; initial licensing controversy

## Repository
- 

## Languages
- Any

## Extensible
- Yes
  - Fork of VSCode + modular submodules for AI features; supports plugins and integrations

## Description
PearAI provides a unified AI-first IDE experience by combining the familiarity of VSCode with integrated AI features like contextual chat, project-aware code understanding, inline edits with diffs, and model routing to pick the best available AI model for coding tasks. The platform emphasizes local code privacy while enabling rich multi-file context and automated workflows.

## BYOK
- Yes
  - Users can supply their own API keys for models (BYOK), enabling use with different model providers and preserving control over credentials.

## LocalOffline
- Yes

## FreeTrial
- Yes
  - Free tier available with basic features and BYOK support; paid tiers unlock advanced features

## GitSupport
- Yes
  - Integrates with Git workflows; offers @diff referencing of branch changes and commit workflow helpers

## Terminal
- Yes
  - Built on VSCode fork; includes integrated terminal and @terminal context command

## Opensource
- Yes
 
## License
- MIT

## MCP-Client
- No

## Notes
- Core features:
  - Context-aware codebase queries via @codebase, @docs, @diff, @terminal, @problems commands
  - Keyboard-driven workflow: CMD+I for inline edits (with diffs), CMD+L to start chats with selected code, CMD+SHIFT+L to append to chat
  - PearAI Router: automatically routes requests to the best performing AI model available, reducing the need to manage multiple subscriptions
  - PearAI Agent: autonomous coding assistant functionality for automating tasks (planned/early)
  - PearAI Creator, Login, Launch: roadmap features for project generation, auth scaffolding, and deployment (Netlify) respectively
- History & controversy: PearAI launched with a rocky start after initially shipping under a proprietary license despite significant code coming from Continue.dev; the project later reverted to an open-source license and apologized, stabilizing community trust
- Audience: developers who want an open-source, AI-first IDE experience with strong project context awareness and extensibility

