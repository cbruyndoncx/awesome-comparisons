# Runner H - https://www.h.com/
A web-focused autonomous agent that executes multi-step tasks via natural language, combining compact LLM planning with a vision-language model to interact with arbitrary web pages.

## General Info

### Classification
- Code/Autonomous agent (Web Automation)

### Version
v0.9 (2024-05)

### Repo
-

### Rating
- [4] Strong web automation and visual robustness
- [3] Early-stage platform; limited public tooling and ecosystem

### Short Description
A web-native autonomous agent that uses a compact planning LLM and a vision-language model to perform multi-step, visually grounded web tasks from simple natural-language instructions.

-

### Description
Runner H (from H Company) is an "action-oriented" autonomous web agent designed to perform complex, multi-step web tasks from simple natural-language instructions. It uses a compact reasoning LLM (H-LLM) to plan and orchestrate actions and a vision-language model (H-VLM / Holo-1) to visually interpret web pages and locate UI elements. The system is organized as a multi-agent stack (a master planner plus specialized sub-agents) that can run workflows, adapt to UI changes, and integrate with productivity tooling.

### Languages
- Python
- JavaScript
  - Node.js

### Notes
- Core tech: H-LLM (compact ~2B model) for reasoning/planning and H-VLM (Holo-1) as Runner's visual "eyes". The stack emphasizes function-calling, planning decomposition, and visual grounding to interact with arbitrary web UIs.
- Strengths: excels at unstructured, multi-step web automation where traditional API-based integrations or brittle RPA selectors fail. Self-healing/visual adaptation reduces breakage when sites change.
- Integrations: native connectors for common productivity apps reported (e.g., Google Workspace, Slack, Notion) and extensibility via connectors like Zapier for additional app workflows.
- Use cases: data extraction across sites, automated form filling and onboarding, multi-site workflows (e-commerce, lead enrichment), and automated testing scenarios that require visual validation.
- Limitations: early-stage product with limited public SDK/repo; cloud-hosted—which may pose data residency or BYOK concerns for some organisations. Pricing and enterprise controls were evolving during early launches.
- Related projects: H Company also released Tester H (an AI testing agent) and Holo-1 (open-source VLM) which are part of the same ecosystem.

### Last Update
2025-11-15
-

## Licensing

### Opensource
- No
  - Holo-1 (the VLM) has open-source releases, but Runner H’s orchestration and hosted agent product is closed-source as of initial public information.

### License
- Proprietary

### Free Trial
- Yes
  - Limited beta access was offered during initial launch windows.

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - Uses structured prompt templates for planner + subagents (system and user instructions).
  - Supports programmatic function-calling and templated prompts for connectors and QA/validation agents.
  - Prompts are used to steer visual grounding, action sequencing, error recovery, and human-in-the-loop confirmations.

### Tools
- Yes
  - Function-calling interfaces to browser automation, visual element detectors (VLM), and connector APIs (Google Workspace, Slack, Notion, Zapier).
  - Internal tooling for run orchestration: planner, subagents (browsing, extraction, QA), and retry/error-recovery modules.

### Resources
- Yes
  - Published materials and docs for Holo-1 (open-source VLM) plus product docs and connector guides for Runner H (limited public SDK during early releases).
  - Cloud-hosted APIs and connector endpoints used as runtime resources; some enterprise customers reported integration guides and onboarding docs.

## Deployment

### BYOK
- No

### LocalOffline
- No

## Developer Experience

### ContextManagement
- Yes
  - Runner H manages context through session-scoped task state and planner-generated action sequences. The master planner decomposes user requests into subtasks, and the orchestrator + sub-agents maintain per-task state, step logs, and intermediate results. Users can update context via follow-up natural-language instructions, by editing task parameters/templates before execution, or through connectors that persist external state (e.g., Google Sheets or Drive). The platform also supports human-in-the-loop confirmations and QA checks that allow context correction mid-flight.

### DirectFileReferences
- Yes
  - Runner H can reference and operate on files through integrated connectors (e.g., Google Workspace—Drive/Sheets, Slack attachments) and by following supplied URLs. Files can be downloaded, parsed (including visual parsing via the VLM), uploaded to target services, and used as inputs to workflows. This is typically done via integrations rather than direct filesystem mounts.

### Checkpoints
- Yes
  - The system records step-level logs and maintains run histories that provide the ability to review, replay, and intervene in task execution. There are human-in-the-loop approval gates and a QA/validation agent that can block or confirm changes before finalizing. While not a transactional "database rollback" in all cases, Runner H provides operational checkpoints, re-run/undo patterns, and error-recovery strategies to revert or correct actions performed by an agent.

### GitSupport
- No

## Extensible

### Extensible
- Yes

### Plugins
- Yes
  - Runner H supports a plugin-style integration model via connectors and automation integrations (Zapier, Google Workspace, Slack, webhooks). These bundle together commands, workflows (recipes), and event hooks so teams can package reusable automation bundles and integrate them into broader pipelines.

### Hooks
- Yes
  - Lifecycle events are available for task orchestration (examples: task_created / task_started / step_executed / step_failed / task_completed). Runner H exposes integration points via built-in connectors and third-party automation platforms (e.g., Zapier) and can emit webhooks or call external services at key events. These hooks support monitoring, approval gates, and downstream automation triggers.

### SlashCommands
- Yes
  - The platform supports reusable workflows/recipes (templates) that can be invoked on demand. These workflows can be triggered from the Runner H UI or via integrated apps (for example, Slack commands or scheduled jobs through connectors). Users can save common multi-step automations and re-run them as shorthand commands.

### Custom Modes
- Yes
  - Users can create specialist modes/workflows by configuring custom agents, connectors, and templates. Extensibility is provided through connectors (Google Workspace, Slack, Zapier, etc.), custom workflow templates, and configuration of agent behaviors (e.g., QA thresholds, retry policies). During beta the public SDK surface is limited, but the product is designed to be extensible via connectors and workflow configuration.

### Subagents
- Yes
  - Runner H is explicitly built as a multi-agent stack: a master planner (orchestrator) plus specialized sub-agents (browsing, extraction, QA, error-recovery, integrations). Each subagent is optimized for a domain task and the orchestrator coordinates them to complete complex multi-step workflows.

