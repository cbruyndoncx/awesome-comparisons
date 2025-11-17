# Warp - https://www.warp.dev
Modern AI-powered terminal and agentic development environment focused on unifying natural-language agents, terminal commands, and collaborative "Drive" features for teams.

## General Info

### Classification
- Code/Terminal

### Version
- v2.0
  - Specific release date unavailable; major v2.0 release occurred in September 2025

### Repo
- https://www.warp.dev

### Rating
- [5] Best-in-class terminal + AI integration (Agent Mode, Drive, Warp Code)
- [4] Commercial/proprietary product; some enterprise privacy controls but limited public BYOK/local-offline detail

### Short Description
- AI-powered terminal and Agentic Development Environment (ADE) that combines natural-language Agent Mode, Warp Code (live diffing and stepwise code edits), and Warp Drive (shared Workflows, Notebooks, prompts and environment variables) to enable collaborative, model-driven development workflows within the terminal.

-

### Description
Warp is a modern terminal that has evolved into an "Agentic Development Environment" (ADE). It tightly integrates large language models and agent workflows with the command line, providing natural-language command generation, an interactive chat/agent interface (Agent Mode), collaborative Drive features (Workflows, Notebooks, shared Environment Variables), and code-focused tooling (Warp Code with diff-tracking). Warp's interface lets developers mix prompts and shell commands in a single input, run multi-step agent plans, review and accept diffs produced by agents, and share/run parameterized Workflows across teams.

### Languages
- Any

### Notes
- Key features: Agent Mode (natural language -> commands), Warp Code (diff-tracking and stepwise code edits by agents), Drive (shared Workflows and Notebooks), Planning Mode and multi-agent orchestration.
- Privacy controls: granular autonomy settings (allowlists/denylists, pause/approve diffs, control file access), network logging, and zero-data-retention guarantees for enterprise customers.
- Strengths: Unified UX for prompt + shell input, native diff review for agent-made changes, strong collaboration primitives for teams.
- Limitations / unknowns: public documentation is limited on BYOK (bring-your-own-key) and fully offline local LLM operation; product is proprietary which may limit on-premise customization for some organizations.
- Recommended when: you want a first-class terminal with integrated AI agents and team sharing (Drive), and you prefer an opinionated, commercial product with enterprise privacy controls rather than an open-source self-hosted solution.

### Last Update
- 2025-11-16

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Yes

## MCP-Client

### MCP-Client
- Yes
  - Warp supports selecting/modeling different hosted LLM providers and includes enterprise features like zero-data-retention guarantees and proxying; it exposes autonomy controls for when agents may call MCP servers without human approval.

### Prompts
- Yes
  - Supports natural-language input as the primary interface; stored prompt templates and reusable prompts are persisted in Warp Drive and can seed Workflows and agents. Agents present a plan before execution and prompts can be edited or parameterized per Workflow.

### Tools
- Yes
  - Agents can invoke shell commands as tools, interact with Git, run code edits via Warp Code, call selected LLM providers via configured MCP/model integrations, and execute Drive Workflows.

### Resources
- Yes
  - Warp Drive stores shared resources (Workflows, Notebooks, commands, prompts, and environment variables) that agents can access as contextual artifacts.

## Deployment

### BYOK
- Yes
  - Warp allows configuration of LLM providers and supports enterprise proxy/BYOK arrangements (customer-supplied API keys or proxying) in enterprise plans. Public documentation is limited on fully self-hosted/on-prem BYOK flows; contact sales/enterprise docs for details.

### LocalOffline
- No
  - Note: Warp runs a local classifier to detect natural-language input, and some metadata/local processing happens on-device, but AI requests are typically proxied to selected LLM providers (OpenAI, Anthropic/Claude variants) unless explicitly configured via enterprise arrangements. There is no broadly-documented fully-offline LLM mode for the AI assistant as of the latest public releases.

## Developer Experience

### ContextManagement
- Yes
  - Methods include attaching files and images, referencing file paths, persisting Drive artifacts (Workflows/Notebooks/Env vars), and allowing agents to request additional context interactively during multi-step plans.

### DirectFileReferences
- Yes
  - You can reference and attach specific files/paths as context for agents; Warp Code surfaces file-level diffs and agents can propose edits to particular files which are shown in the live diff UI.

### Checkpoints
- Yes
  - Warp provides live diff review and approval before applying changes; edits from agents can be accepted, rejected or modified and then committed to Git. Drive artifacts also provide shared versions and history for collaborative workflows.

### GitSupport
- Yes
  - Git workflows are supported via the terminal and Warp's code/diff UX; the tool is used to author and review code diffs produced by agents.

## Extensible

### Extensible
- Yes
  - Support for Workflows, Notebooks, Drive-based sharing and agent configuration enables extensibility of team knowledge and repeatable automation patterns.

### Plugins
- No
  - No public plugin marketplace or documented plugin API; extensibility is primarily via Drive Workflows, Notebook artifacts, and model/agent configuration.

### Hooks
- No
  - No documented lifecycle hook API for agents; control is provided via agent permissions, allowlists/denylists and approval workflows.

### SlashCommands
- No
  - No public global slash-command system documented; parameterized Workflows serve as invocable shortcuts and templates.

### CustomModes
- Yes
  - Built-in modes include Command Mode, Agent Mode, and Planning Mode. Agent autonomy and behavior can be tuned per agent/Workflow (pause-for-approval, review diffs, allowlists/denylists).

### Subagents
- Yes
  - Warp supports running multiple agents and orchestrating multi-agent workflows. While there is multi-agent orchestration and task chaining, there is no widely-published "subagent API" name — orchestration is handled via the agent management UI and planning features.

## Ungrouped Criteria

### Terminal
- Yes

### SpecDrivenDevelopment
- No
  - Warp does not natively implement specific Spec Driven Development frameworks (BMAD, SpecKit, Tessl, etc.). Teams can encode processes in Drive Workflows and use Drive artifacts to approximate SDD practices, but there is no built-in, first-class support for the listed SDD frameworks.
