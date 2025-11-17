# Verdent for VS Code

Verdent for VS Code is the Visual Studio Code extension for Verdent AI — an agentic, plan-first coding assistant which orchestrates parallel subagents to design, implement, and verify code changes with built-in git worktree isolation and DiffLens visualizations.

## General Info

### Classification
- Code/Editor

### Version
- 2025 (initial public/early access)

### Repo
- Proprietary product — no public GitHub repo discovered

### Rating
- [4] Strong plan-first orchestration, parallel subagents, and git worktree isolation
- [3] Early-stage product with commercial/paid tiers

### Short Description
Verdent for VS Code brings Verdent AI's plan-first, multi-agent coding assistant into Visual Studio Code — offering parallel subagents, isolated git worktrees, DiffLens line-level explanations, built-in verification and testing, and integrated commit/PR workflows.

### Description
Verdent is designed around a "Plan First, Verify Early" methodology. The VS Code extension brings Verdent's orchestration and verification features into the editor so developers can:
- Create high-level plans that break tasks into subagents and subtasks
- Run Researcher and Verifier subagents to analyze code, propose changes, and automatically validate outcomes
- Execute agentic tasks that operate in isolated git worktrees to avoid conflicts
- Inspect changes via DiffLens and commit/rollback via integrated Git workflows

The extension is intended to reduce context switching by letting developers remain inside VS Code while Verdent handles routine engineering work.

### Languages
- Any

### Notes
- Key Features: Plan-first task decomposition and agent orchestration, parallel subagents with isolated git worktrees, built-in verifier for automated testing and web interactions, DiffLens for clear visibility into changes, commit/PR creation and rollback support from within the editor, customizable rules and permissions to control agent autonomy.
- Verdent Deck is the desktop counterpart focused on multi-agent orchestration; the VS Code extension brings the same capabilities into the editor.
- Product is commercial with early access and paid tiers; capabilities and pricing should be verified on the vendor site.
- Sources: Verdent product announcements and coverage (2025), reviews and demonstrations showing Verdent launching from within VS Code and the Verdent Deck demos.

### Last Update
2025-01-12

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- -

## MCP-Client

### MCP-Client
- -

### Prompts
- Yes
  - Verdent converts vague developer prompts into structured, executable plans via guided dialogue (Plan Mode). The extension surfaces templates and guided prompts to help scope tasks, decompose features into subtasks, and set collaborator permissions and verification strategies.
  - Prompts can include high-level goals, desired testing/verification steps, and policy/rule constraints to guide subagent behavior.

### Tools
- Yes
  - Verdent exposes a set of integrated tools to support plan-first development and verification workflows, including:
    - Browser action / browser capture tools for automated web interaction, screenshot capture, console/XHR logging, and DOM inspection used by Verifier subagents.
    - Worktree management controls to create isolated git worktrees per agent/session, enabling safe parallel development and easy rollback.
    - DiffLens for line-level natural-language explanations of changes and clickable diffs for quick inspection.
    - Built-in code review and verifier tooling (configurable model choice) to automatically review security, quality, and style with each change.
    - Project configuration and rule enforcement UI to define project-level context, build commands, deny-lists, and permission modes for agents.
  - Tools are accessible from the VS Code extension UI and Verdent Deck; some features are desktop-first and may be available earlier in the Deck app.

### Resources
- Yes
  - Public product announcements, demo videos, and press coverage (2024–2025) describe Verdent's Plan-First and Verify-Early methodology, Deck desktop app, and the VS Code extension. These sources are the primary publicly available resources and provide feature overviews, architecture descriptions, and demonstrations.
  - Official documentation, detailed prompt templates, and enterprise deployment guides appear to be available to customers and early access users; they were not publicly accessible in full at the time of the last update.

## Deployment

### BYOK
- -

### LocalOffline
- No
  - Cloud-first with extension-based integration into VS Code. Local offline modes not advertised; enterprise/enterprise-on-prem options may exist.

## Developer Experience

### ContextManagement
- Yes
  - Long-horizon memory and repository indexing

### DirectFileReferences
- Yes
  - Agents can surface and edit files directly in the workspace

### Checkpoints
- Yes
  - Worktree-level commits and rollbacks protect main branches

### GitSupport
- Yes
  - Integrated commit/PR workflows

## Extensible

### Extensible
- Yes
  - Verdent offers extension points and a VS Code plugin; specialized subagents (e.g., Researcher, Verifier) execute tasks in parallel and can be customized.

### Plugins
- Yes
  - Verdent provides a VS Code extension to bring Deck-style agent capabilities into the editor

### Hooks
- -

### SlashCommands
- -

### CustomModes
- -

### Subagents
- Yes
  - Specialized subagents (e.g., Researcher, Verifier) execute tasks in parallel

## Ungrouped Criteria

### Terminal
- Yes
  - Integrates with developer workflows and git; focused on high-level orchestration.

### SpecDrivenDevelopment
- -
