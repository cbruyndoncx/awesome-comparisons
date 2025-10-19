# Claude Desktop - https://claude.ai/
[Claude's desktop application for accessing Claude models, Skills, and file-aware workflows]
## Version
v1.0 (2025-10-18)
## Rating
- [4] Strong multi-modal and long-context capabilities
- [4] Powerful "Skills" integration for automating structured workflows
## Repository
-
## Languages
- Any
## Extensible
- Yes

## Description
Claude Desktop is Anthropic's desktop application that brings the Claude family of models and the Skills ecosystem to a native app experience. It exposes capabilities such as file creation and editing (spreadsheets, slide decks, documents, PDFs), Skills-driven automation, and integrations that let Claude interact with local files and services. The desktop environment also supports extensions to simplify installing and connecting Model Context Protocol (MCP) servers and other local connectors.

Designed for Pro, Max, Team and Enterprise customers, Claude Desktop aims to make agentic workflows and productivity features (e.g., generating company-standard reports, programmatic file edits, and form-filling) accessible without switching contexts between browser tabs.

## BYOK
- No

## LocalOffline
- No
  - Any additional details like Ollama: Anthropic's desktop offering is primarily cloud-connected. Public documentation does not describe a fully local/offline model runtime. Enterprise/Team tooling (like Claude Code) can be configured to route through organization-managed endpoints; if BYOK/local hosting matters for your use case, contact Anthropic sales/support for enterprise deployment options.

## FreeTrial
- No

## GitSupport
- No

## Terminal
- No

## Opensource
- No

## License
- Proprietary (Anthropic)

## MCPSupport
- Yes

## Notes
- Skills: Claude Desktop leverages the Skills system to encode org-specific procedures and standards. Skills can be created and shared (Team/Enterprise controls apply), and Claude will automatically invoke relevant skills when they match a user's request.
- File operations: The app supports creating and editing Excel-like spreadsheets (including formulas), PowerPoint slide decks, Word documents, and fillable PDFs via Skills and built-in file tooling.
- Computer use & automation: Anthropic has been developing "computer use" capabilities that let Claude interact with desktop software and browser UIs programmatically; this underpins some advanced desktop automation features but is still experimental and constrained.
- Desktop extensions & MCP: Extensions and MCP-compatible helpers simplify connecting local services and MCP servers to Claude, reducing installation friction for advanced local integrations.
- Enterprise features: Many advanced deployment, security, and integration details (including BYOK, on-prem routing, and fine-grained admin controls) are oriented toward Team and Enterprise customers and are not fully documented in public product pages.
- Comparison note: For heavy developer workflows that require CLI-first, git-aware operations and explicit BYOK/local routing, Claude Code (Anthropic's CLI/terminal tool) is a more explicit offering; Claude Desktop is focused on productivity, file workflows, and Skills-driven automation inside a native app.