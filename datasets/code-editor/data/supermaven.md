# Supermaven - https://www.supermaven.com
AI-first code completion assistant focused on very large context windows, low-latency completions, and deep codebase understanding.

## General Info

### Classification
- Code/Editor

### Version
v (2025-10-19)

### Repo
-

### Rating
- [5] Performance & speed (sub-300ms completion latency in reported benchmarks)
- [4] Context awareness & long-range understanding (very large context window enables whole-repo reasoning)

### Short Description
<!-- ToDo -->

-

### Description
Supermaven is an AI-powered code completion and developer-assistant platform built to provide ultra-fast, context-aware code suggestions across large codebases. It uses a proprietary neural architecture (not a vanilla transformer) optimized for very large context windows and low-latency token generation. Supermaven emphasizes developer flow by surfacing near-instant completions, "next location" predictions (jumping to the file/spot where changes are needed), and an AI chat interface tailored to code review, diffs and codebase attachments.

### Languages
- Any

### Notes
- Key differentiators: extremely large context window (public claims up to 1,000,000 tokens in marketing material), very low latency (reported ~250ms), and "next location prediction" that can jump to the file/line where the assistant thinks a change belongs.
- Integrations: official support for Visual Studio Code, JetBrains family of IDEs, and Neovim. Also offers an integrated editor/IDE built around the Supermaven assistant.
- Models & chat: Supermaven runs its own inference for completions and provides a chat interface that can surface large-context diffs; some product messaging references integrations with third-party models for chat features.
- Pricing (public tiers, subject to change): Free tier available; Standard plan and Pro plan historically reported at roughly $18/month and $29/month respectively; enterprise plans available for organizations.
- Best fit: developers and teams working on medium-to-large codebases who need fast, context-rich completions and cross-file reasoning (e.g., refactors, large feature work, legacy code maintenance).
- Limitations/considerations: proprietary/cloud-hosted service (no confirmed fully offline/self-hosted option), potential privacy and compliance considerations for sensitive code — review enterprise offerings and data handling policies before adoption.

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

## Developer Experience

### ContextManagement
- Yes
  - Supermaven manages and surfaces context via whole-repo indexing and a very large context window (marketing claims up to ~1,000,000 tokens). Available methods include: workspace/repository indexing, capturing recent edits and file diffs, chat session history (conversation context), and cross-file analysis ("next location"/file jump features) so completions are informed by project-wide state.

### DirectFileReferences
- Yes
  - Supermaven can reference files directly: its IDE integrations allow jumping to files/lines, attaching files or diffs inside the assistant chat, and applying suggested edits as diffs. The system is explicitly designed to reason over repository files rather than single-file completions.

### Checkpoints
- Yes
  - Agent-driven changes are presented as diffs and edits that can be previewed before applying; once applied typical safety nets exist (IDE undo, local VCS/git history). For teams using CI or repo protection, any autocommit workflows would still be revertable through standard git history.

### GitSupport
- Yes
  - Integrates with IDEs and understands repository context; includes features that operate across the repo and work with recent edits

## Extensible

### Extensible
- Yes
  - Integrates with major IDEs (VS Code, JetBrains, Neovim) and offers chat integrations; product roadmap and integrations may expand

### Plugins
- No
  - Supermaven ships as IDE plugins (VS Code, JetBrains, Neovim) but it does not advertise a plugin ecosystem for bundling agent behaviors, commands and hooks as user-installable extensions. Integration is through the official plugins rather than a third-party plugin marketplace.

### Hooks
- No
  - Public documentation does not describe a user-facing lifecycle hook API for attaching custom event handlers. Integration points are primarily IDE plugin entry points (actions, hotkeys) rather than a documented agent lifecycle hook system.

### SlashCommands
- No
  - While the product exposes hotkeys and chat-driven actions (apply-change, show-diff, jump-to-file), there is no widely-documented generic "slash command" system for reusable, user-defined commands in the public docs — behavior is primarily via the chat UI and IDE command palette/hotkeys.

### CustomModes
- No
  - There is no public indication that users can author custom assistant modes; available modes are product-provided (completion, chat, refactor suggestions). Customization is via settings and IDE integration rather than creating new assistant modes.

### Subagents
- No
  - Supermaven provides multi-model chat and specialized behaviors (completion vs. chat) but does not document a facility for users to define autonomous subagents/workflows. There is no public API for composing persistent task-specific subagents.

## Ungrouped Criteria

### Terminal
- No
  - Primary integrations are editor/IDE plugins; Supermaven also provides its own editor/IDE experience rather than a terminal-first tool

### SpecDrivenDevelopment
- Other
  - Not applicable — Supermaven is a developer productivity/code-completion platform, not a spec-driven development framework. It does not advertise alignment with or tooling for the listed spec-driven development systems.
