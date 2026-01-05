# EasyCode - https://easycode.ai
A local-first, agentic IDE focused on taking projects from idea to production with an opinionated Next.js + Supabase stack.

## General Info

### Classification
<!-- AI Native Dev ainativedev.io Classification -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Code/Editor
- Code/Autonomous agent
- Product/Prototyping
- Code/Terminal
- AIE/Model
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Local-first, agentic IDE optimized for Next.js + Supabase
- Ships as a standalone Flow IDE with VS Code and JetBrains integrations; provides agentic workflows and project-wide context management

### Version
Unknown (last checked 2025-10-19)

### Repo
-

### Rating
- [4] Strong for solo builders and founders who want to ship quickly
- [3] Opinionated stack limits applicability for teams with existing, different stacks
  - Tradeoff: deep integration and "finish-first" workflow vs flexibility

### Short Description

- Local-first, AI-driven IDE and VS Code/JetBrains integrations that guide projects from planning through implementation and deployment, opinionated around Next.js + Supabase.

### Description
EasyCode is a local-first AI-powered development environment that emphasizes finishing applications rather than only generating prototypes. It pairs an opinionated full-stack (Next.js + Supabase) with agentic features: project-wide context management, a planning workflow, file-by-file implementation suggestions, an integrated visual/data-flow debugger, and one-click deployment tooling. The product runs primarily on the user machine (local-first), keeping code and data under developer control and reducing cloud-credit surprises.

### Languages
- TypeScript
- JavaScript

### Notes
- Target users: non-technical founders, indie hackers, solo developers and consultants who need predictable time-to-product and prefer a guided, integrated workflow.
- Strengths: strong guidance from planning → implementation → debug → deploy, generous local credit model, tight integration for the chosen stack, agentic debugging and human developer credits for blockers.
- Limitations: locked-in stack (Next.js + Supabase), limited team collaboration features compared with cloud IDEs, no public OSS repo or permissive license available as of this note.
- Use-case fit: excellent for new projects or MVPs that can accept the opinionated stack; less suitable for migrating large existing codebases using other technologies.

### Last Update
<!-- Note Date last updated -->
- 2025-11-15

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Freemium model: free tier with limited daily credits (e.g. a free plan with daily credits for model usage); paid tiers unlock more credits/models.

## MCP-Client

### MCP-Client
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Integrates with external LLM providers via user API keys; no documented dedicated MCP client/service.

### Prompts
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Provides built-in system prompts, planning prompts (/Plan), and contextual prompt templates. Supports user-specified prompts and file-tagging to control context.

### Tools
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Ships with integrated debugger/tracer, project analyzers, deployment helpers and quick-edit tooling (CMD/CTRL+E) exposed in the IDE and extensions.

### Resources
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Documentation, tutorials and examples for Flow IDE, VS Code and JetBrains integrations are available on the EasyCode site and docs.

## Deployment

### BYOK
- No

### LocalOffline
- Yes
  - Local-first architecture; code and context are kept on the developer's machine rather than sent to third-party servers for model training or storage

## Developer Experience

### ContextManagement
<!-- Methods for managing and updating the context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Project-wide context awareness, automatic file relevance analysis, and manual file/tag selection (e.g., @file references) to scope prompts and implementations.

### DirectFileReferences
<!-- Can with @file or similar provide context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Supports manual file tagging and contextual references to include files in prompts and implementation tasks.

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Integrates with local git repositories and provides edition checkpoints and undo flows within the IDE; supports human review before commits.

### GitSupport
- Yes
  - Integrates with local repositories and provides VS Code extension workflows

## Extensible

### Extensible
- Yes
  - VS Code extension available (integrates chat, slash commands, inline quick edits)

### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Offers VS Code and JetBrains plugins/extensions; the Flow IDE acts as a native application with plugin-style integrations.

### Hooks
<!-- Lifecycle events for the agent. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- No public documentation of lifecycle hook system; primary extensibility surfaces are editor extensions and planner/implementation workflows.

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Includes slash commands such as /Plan for planning workflows and quick-edit triggers in the IDE and extensions.

### CustomModes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Distinct Planning, Implementation and Debugging modes that change how the agent reasons about the codebase and produces outputs.

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
- Agentic workflows and task decomposition suggest subagent-like behavior (automated planners, implementation workers and debug tracers); exposes multi-step task orchestration.

