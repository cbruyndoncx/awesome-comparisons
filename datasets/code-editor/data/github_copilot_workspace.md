# GitHub Copilot Workspace - https://github.com/features/copilot
A cloud-hosted, agentic development environment experiment from GitHub (technical preview). Copilot Workspace combined multi-agent planning, editable specifications, and automated implementation to help developers plan, write, test and iterate on code using natural language prompts.

## General Info

### Classification
- Code/Editor

### Version
Archived v0.1 (2025-05-30)

### Repo
-

### Rating
- [4] Innovative workflow and planning UX (spec + editable plan)
- [3] Integration with Codespaces and VS Code is useful
- [2] Limited availability — technical preview ended / not generally available

### Short Description
<!-- ToDo -->

-

### Description
GitHub Copilot Workspace was an experimental "agentic" IDE hosted by GitHub that let developers describe tasks in natural language, review an auto-generated specification and a concrete editable plan, and then apply changes across a repository. It used multiple specialized agents (planning, brainstorm, repair, follow-up) to propose implementations, run tests, and iteratively fix failures. The environment integrated with Codespaces, provided an integrated terminal, and offered a VS Code extension to continue sessions locally.

### Languages
- Any

### Notes
- Technical preview was sunset on 2025-05-30; many concepts (agent workflows, follow-ups, plan-driven edits) were later folded into broader GitHub Copilot features and Copilot Spaces.
- Known features: editable two-stage steering (specification + plan), brainstorm agent, repair agent for failing tests, follow-up system to fix dependent files across large repositories, integrated terminal with secure port forwarding, Codespaces integration, VS Code extension for session continuity.
- Model: GitHub reported experimenting with multiple models and selected GPT-4o for the Workspace preview; subsequent Copilot features support multiple model backends.
- Limitations: no documented BYOK or local/offline execution; service was cloud-only and proprietary. Pricing and GA plans were not published for the technical preview prior to sunset.
- Useful when comparing AI coding environments for enterprise adoption: strong UX for large-scope edits and planning, but lack of on-prem/local model options and the preview's discontinuation reduce viability for locked-down environments.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Yes

## MCP-Client

### MCP-Client
- No

### Prompts
<!-- ToDo -->
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Tools
<!-- ToDo -->
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Resources
<!-- ToDo -->
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## Deployment

### BYOK
- No

### LocalOffline
- No
  - All processing was cloud-hosted on GitHub's infrastructure; no documented offline/local model execution.

## Developer Experience

### ContextManagement
- Yes
  - Editable two-stage steering: Specification (current vs desired state) and concrete Plan that can be edited to change downstream code generation.
  - Session context versioning and history: Copilot Workspace tracked the session and allowed regeneration after spec/plan edits.
  - Regenerate/undo workflow: Edits to spec or plan trigger regeneration of downstream steps; generated diffs are editable and can be reverted or revised.
  - Codespaces / VS Code continuity: Context (file references, diffs, session) could be opened in a Codespace or VS Code extension to continue working locally.

### DirectFileReferences
- Yes
  - Plans explicitly list repository files that will be created, modified, or deleted; generated outputs are presented as file-level diffs.
  - Generated diffs and the plan allow direct navigation to and editing of specific files by path within the workspace UI (and via Codespaces/VS Code).
  - The system operates on the repository itself, so file paths in the plan map directly to repo files and can be applied as commits/PRs.

### Checkpoints
- Yes
  - Workspace tracked session state and maintained a history of edits; generated changes were presented as diffs and could be revised, undone, or committed as PRs.
  - While not marketed as a "checkpoint" API, the combination of session versioning, editable specs/plans, and Git-backed commits/PRs provided checkpoint-like rollback and recovery mechanisms.

### GitSupport
- Yes

## Extensible

### Extensible
- Yes

### Plugins
- No
  - While the Workspace integrated with developer tooling (Codespaces, VS Code extension) and could open sessions in those environments, there was no documented plugin system for bundling custom commands, agents, and hooks inside Workspace itself.

### Hooks
- No
  - No public lifecycle hook API was documented for attaching custom code to Workspace events. Automation and sequencing were handled internally by built-in agents and the follow-up system rather than user-attachable hooks.

### SlashCommands
- No
  - Interaction model was natural-language driven (tasks, specs, plans) rather than a slash-command interface documented for user-triggered commands.

### CustomModes
- No
  - There was no documented feature for users to create specialist modes that change the overall chat/agent behavior beyond editing specs/plans and choosing when to regenerate.

### Subagents
- Yes
  - Copilot Workspace used specialized built-in agents (e.g., brainstorm agent, plan agent, repair agent, follow-up) to handle different stages of the Task→Spec→Plan→Code workflow.
  - These agents coordinated to propose specs, generate concrete plans, produce code diffs, run tests, and attempt repairs when failures occurred.
  - There was no public surface documented for users to author or register their own custom agents; the agent set and behavior were provided by the Workspace service.

## Ungrouped Criteria

### Terminal
- Yes

### SpecDrivenDevelopment
- Other
  - GitHub Copilot Workspace implemented its own spec-driven workflow (Task → Spec → Plan → Code). This built-in approach functions as an internal spec-driven development method distinct from the listed frameworks; it produces editable specifications and concrete file-level plans which are then applied as code diffs and PRs.
