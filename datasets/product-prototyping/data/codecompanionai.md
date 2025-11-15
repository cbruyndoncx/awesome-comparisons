# CodeCompanion.ai - https://codecompanion.ai
A desktop AI coding assistant that exposes a ChatGPT-powered chatbot for working with code locally, executing shell commands, interacting with Git, and performing database queries.

## General Info

### Classification
- Product/Prototyping

### Version
<!-- ToDo -->
<!-- Latest version used for update -->
-

### Repo
<!-- ToDo -->
<!-- Associated Github repository -->
-

### Rating
-

### Short Description
<!-- ToDo -->

-

### Description
CodeCompanion.ai (desktop) is described in third-party write-ups as a local-first AI coding assistant powered by OpenAI's ChatGPT. It provides a chat interface that can read and reason about a user's codebase, generate and update files, run shell commands, assist with project setup and dependency installation, and translate natural language to SQL for database queries. The application emphasizes developer productivity by automating repetitive tasks and allowing commands to be executed from within the app.

### Languages
- Any

### Notes
- Privacy: Multiple sources emphasize a local-first design where code and data remain on the user's machine; network calls appear limited to OpenAI API usage.
- Features reported: semantic code search, natural-language-to-SQL, integrated terminal, Git integration, project scaffolding, file creation and updates, ability to execute shell commands and read outputs.
- Pricing/details: I could not find an official pricing page or clear subscription tiers in the public third-party descriptions. The vendor appears to support BYOK (use your OpenAI API key), which means costs for model usage are borne by the user via their OpenAI account.
- Open-source status: No authoritative indication that the desktop app is open source. There is an unrelated community project named codecompanion.nvim (a Neovim plugin) on GitHub; do not confuse the two.
- Documentation: Public, authoritative documentation or an official product site with detailed specs/pricing was not discovered in the sources I reviewed. Recommend checking the vendor domain (https://codecompanion.ai) and any official docs or contact channels for the latest details before deployment or purchase.
- Research summary based on multiple third-party write-ups and product summaries; authoritative vendor documentation and pricing were not found in the search results available.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- No

### License
<!-- ToDo -->
<!-- Opensource specific license or Proprietary for other commercial licenses -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- MIT
- Apache-2.0
- Proprietary
- FSL
- GPL-3.0
- AGPL-3.0
- BSD-3-Clause
- ISC
- MPL-2.0
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### FreeTrial
- Yes
  - [The product is often described as using the user's own OpenAI API key (BYOK) which enables usage without a separate paid tier from the vendor; however any model usage will consume the user's OpenAI quota which may incur cost.]

## MCP-Client

### MCP-Client
<!-- ToDo -->
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

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
- Yes

### LocalOffline
- No
  - [All user data (code, DBs, etc.) is described as being stored locally on the user's machine, but the assistant makes API calls to OpenAI for model inference — so it is not fully offline.]

## Developer Experience

### ContextManagement
<!-- ToDo -->
<!-- Methods for managing and updating the context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### DirectFileReferences
<!-- ToDo -->
<!-- Can with @file or similar provide context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Checkpoints
<!-- ToDo -->
<!-- A way to undo using checkpoints or if autocommitted git history -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### GitSupport
- Yes

## Extensible

### Plugins
<!-- ToDo -->
<!-- A method of bundling together commands, agents and hooks (claude). -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Hooks
<!-- ToDo -->
<!-- Lifecycle events for the agent. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### SlashCommands
<!-- ToDo -->
<!-- Re-usable commands that can be manually triggered by the user. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### CustomModes
<!-- ToDo -->
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Subagents
<!-- ToDo -->
<!-- Define specialized AI subagents for task-specific workflows. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## Ungrouped Criteria

### Terminal
- Yes

### SpecDrivenDevelopment
<!-- ToDo -->
<!-- Has support for these Spec Driven Development methodologies: -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- BMAD
- SpecKit
- OpenSpec
- Tessl
- AgentOS
- ClaudeFlow
- SPARC
- SuperClaude
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->
