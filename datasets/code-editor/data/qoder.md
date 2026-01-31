# Qoder
https://qoder.com

Qoder is an agentic IDE developed by Alibaba that enables developers to delegate complete coding tasks to AI agents through autonomous programming. Representing Phase 3 of programming in the LLM era, Qoder moves beyond co-pilot assistance to fully autonomous agents that execute development tasks independently through Quest Mode, Chat Agent Mode, and Next Edit Suggestion (NES) capabilities.

**Dataset ID:** code-editor

## General Info

### Classification
- Code/Editor

### Version
-

### Repo
-

### Rating
-

### Short Description
Alibaba's agentic IDE with autonomous Quest Mode and intelligent multi-line edit prediction

### Description
Qoder operates as a comprehensive autonomous coding platform available on macOS and Windows. The platform features Quest Mode for delegating full tasks to autonomous agents that explore intent, plan actions, and execute across codebases with minimal human intervention. Quest supports three scenarios: Code with Spec (complex features with strict quality control), Build a Website (0-1 website creation), and Prototype Ideas (quick validation).

The Next Edit Suggestion (NES) system predicts multi-line code edits based on context using AST-based trajectory simulation, going beyond traditional single-line completion to modify existing code and suggest entire edit sequences. Enhanced context engineering uses hybrid retrieval architecture combining vector search, code graphs, and pre-indexed knowledge bases. Repo Wiki auto-generates structured project documentation by analyzing code architecture and design patterns.

### Languages
- JavaScript
- TypeScript
- Python
- Go
- C++
- Java
- C#
- Kotlin
- Rust
- PHP
- SQL
  - Supports over 200 programming languages total

### Notes
Multi-model backend automatically selects optimal AI (Claude for understanding/refactoring, GPT for generation, Gemini for multimodal). Quest supports local execution, parallel environments, and remote cloud execution for hours-long tasks with automatic recovery. ActionRL alignment achieves >53% increase in code generation ratio. Three-column layout: task list, conversation area, output area with live previews.

### Last Update
2026-01-31

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Free 2-week Pro trial with 300-1,000 credits
  - Free tier available ($0/mo) with limited basic models

## MCP-Client

### MCP-Client
- Yes
  - Supports MCP ecosystem for extending capabilities with community tools

### Prompts
- Yes

### Tools
- Yes
  - Built-in tools combined with MCP integration

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
  - Enhanced context engineering with hybrid retrieval architecture
  - Vector search, code graphs, and pre-indexed knowledge bases
  - Repo Wiki for auto-generated project documentation

### Direct File References
- Yes

### Checkpoints
- Yes
  - Quest Mode includes rollback plans and verification cycles

### Git Support
-

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
  - Quest Mode with three scenarios (Code with Spec, Build a Website, Prototype Ideas)
  - Chat Agent Mode for interactive pair programming
  - Next Edit Suggestion (NES) mode for multi-line predictions

### Subagents
- Yes
  - Quest Mode autonomous agents for full task delegation
  - Agents handle requirement clarification, spec generation, execution, and verification
  - Supports parallel execution in local, parallel, or remote cloud environments
