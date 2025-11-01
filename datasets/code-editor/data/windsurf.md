# Windsurf - https://windsurf.ai
AI-powered agentic IDE and coding assistant focused on whole-project understanding and multi-file edits

## Version
v1.0 (2025-10-19)

## Classification 
- Code/Editor

## Rating
- [4] Strong whole-repo understanding, multi-file edits, and iterative AI flows
- [3] Proprietary platform with limited offline/local options compared with fully open-source alternatives

## Repository
- https://windsurf.ai

## Languages
- Any
  - Python, JavaScript/TypeScript, Go, Java, Ruby, C#, and most common programming languages (broad support via language-agnostic indexing)

## Extensible
- Yes

## Description
Windsurf is an AI-powered, agentic development environment (IDE-like) designed to understand entire codebases, perform multi-file edits, and run iterative "AI flows" that plan, modify, and validate changes across a project. It emphasizes deep indexing of repositories to provide context-aware code generation (not just token-level autocomplete), memory of project and team preferences, and integration with terminals and development workflows. Windsurf evolved from previous offerings in the space (notably Codeium-era projects) and targets both individual developers and teams who want higher-level automation and collaboration between humans and AI.

## BYOK
- Yes

## LocalOffline
- No
  - Windsurf is primarily a cloud-hosted agent; local/offline modes are limited compared with some local-first tools (though integrations and enterprise offerings may offer stronger controls).

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- No

## Opensource
- No

## License
- Proprietary

## MCP-Client
- Yes

## Notes
- Core features: Cascade (agentic flows with Write Mode and Chat Mode) with MCP support, Supercomplete (intent-aware completions across files), memory for team/project preferences, deep indexing for semantic repo understanding, multi-file edits, and terminal integration.
- Workflow: Windsurf indexes the repository to build a semantic map, then offers both targeted inline edits and larger multi-file changes through planned flows that can ask for confirmations and iteratively validate results.
- Use cases: rapid feature development, refactoring across large codebases, onboarding and enabling non-technical stakeholders to participate in app development, automated bug fixing and repeated task automation.
- Positioning: competes with agentic IDEs and advanced copilots (e.g., Cursor AI and other commercial copilots) by focusing on whole-project context and automated multi-file transformations.
- Privacy & controls: offers enterprise features (including BYOK) to help with key management; however, as a proprietary cloud service it may not meet all offline/local security needs.
- Background: built on advances in code-level LLM tooling; product messaging highlights agentic behavior (planning, execution, checkpoints) rather than only completion.
- Community artifacts: there are community-driven helper files and rules (e.g., .windsurfrules) circulated to help guide AI assistants on code style and project rules; these can be found in various GitHub repos but the main product is not open-source.

## ContextManagement
- Yes
  - Indexing Engine: Windsurf builds a full-codebase index that allows the agent to fetch relevant context from anywhere in the repo rather than only recent or open files. This index powers higher-quality completions and context-aware flows.
  - @-mentions & scoped references: Cascade supports mentioning specific files, symbols or sections to narrow the working context for a task or conversation.
  - Memories & AI Rules: Persistent user-defined rules and automatically generated memories let you keep long-lived project preferences, API choices, and style constraints for future sessions.

## DirectFileReferences
- Yes
  - Symbol/file references: You can directly reference files, functions or classes in conversation (via @-style references and the Cascade UI) so the agent resolves and uses the exact code locations.
  - File uploads and images: Files and screenshots can be attached/uploaded into Cascade for the agent to inspect and generate corresponding code or changes.

## Hooks
- Yes
  - AI Flows lifecycle: Cascade's flows have explicit stages (plan -> generate -> request approval -> execute commands -> iterate) that can be treated like lifecycle events and instrumented with rules and approvals.
  - Terminal/command approval hooks: Before executing terminal commands or making repo changes, Cascade prompts for confirmation and displays diffs, enabling an attachable checkpoint/approval step.

## SlashCommands
- Yes
  - Command palette & inline commands: Windsurf provides contextual command suggestions (including terminal commands) and an inline/command-palette style interface for invoking reusable commands or code transformations.

## Subagents
- Yes
  - Specialized flows & model selection: Cascade supports creating distinct AI flows with specific settings (model choice, memory, rules) to act like specialized subagents for task-specific workflows (e.g., refactor agent, test-generator agent).
  - Autonomous vs. assistant modes: Write Mode runs more autonomously (multi-step execution), effectively letting a sub-flow perform a sequence of edits and terminal actions under supervision.

## CustomModes
- Yes
  - Mode presets & rules: Users can pick between Write / Chat / Legacy modes and define AI rules and memories to create behaviourally customised modes for the assistant.
  - Persistence: Memories and project-level rules make these custom modes repeatable across sessions.

## Plugins
- Yes
  - VS Code extension compatibility: As a VS Code fork, Windsurf can leverage the existing extension/plugin ecosystem to bundle commands, linters, debuggers and UI integrations.
  - AI rules + extensions: Windsurf's AI rules and Cascade flows can be combined with extensions to create reusable bundles of behavior (commands + hooks + rules).

## Checkpoints
- Yes
  - Approval & diffs: Cascade shows diffs and asks for approval before applying code changes or running terminal commands, providing a human-in-the-loop checkpoint.
  - VCS integration: Because it operates inside a code editor and integrates with terminals, standard git workflows (commit, branch, revert) can be used to undo or roll back changes.

## SpecDrivenDevelopment
- Other
  - Windsurf is not tied to a single, opinionated spec-driven development framework. Instead it provides flexible automation primitives (flows, rules, memories, extensions) that teams can use to implement SDD processes such as Tessl or other internal spec workflows.
