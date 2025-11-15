# Google AI Studio - https://aistudio.google.com
Browser-based development environment from Google for prototyping and experimenting with Gemini models and multimodal generative AI

## General Info

### Classification
<!-- ToDo -->
<!-- AI Native Dev ainativedev.io Classification -->
<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->
- AIE/Model
- Code/Autonomous agent
- Code/Editor
- Code/Other
- Code/Terminal
- Product/Prototyping
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Version
 (2025-10-19)

### Repo
-

### Rating
- [5] Excellent for rapid prototyping and multimodal experimentation with Gemini family
- [4] Strong integration path to Vertex AI for production deployments
- [3] Limited transparency on enterprise pricing / BYOK / offline hosting

### Short Description
<!-- ToDo -->

-

### Description
Google AI Studio is a web-based IDE and playground from Google that exposes the Gemini family of models (text, multimodal/vision, and Live/voice-enabled variants) through a unified, multimodal workflow. It aims to let developers, researchers and product teams prototype interactions that combine text, images, voice, screen-sharing and external context (URLs, Maps grounding) and then export working client/server snippets to accelerate production integration. The environment is primarily browser-hosted and intended for quick iteration, A/B style model comparisons, and as a stepping stone into Google Cloud's Vertex AI for enterprise scale.

### Languages
- Web UI
- Python
- Node.js
- Swift
- Kotlin

### Notes
- Multimodal strength: first-class support for text, images, voice, camera and screen-sharing makes Studio a powerful prototyping environment for rich interactions.
- Live and device-specific features: some Live/voice/screen features are available only on supported mobile devices (newer Android flagships) and via Chrome on desktop; capabilities and stability can vary by platform.
- Code export: Studio generates runnable SDK snippets (Python, Node.js, mobile SDKs) to help move experiments to production quickly.
- Vertex AI path: clear migration/upgrade path to Vertex AI for organizations that need enterprise controls, data governance and scalable deployment.
- Pricing & enterprise details: core Studio use is free for prototyping, but Google documents and community reports indicate advanced grounding or high-volume production may incur costs—validate with Google Cloud sales or the Vertex AI pricing pages for production plans.
- BYOK / data residency: no public documentation found indicating BYOK or self-hosted Gemini; expect data to be processed in Google Cloud unless an enterprise contract or Vertex AI offering provides specific guarantees.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- No
  - Studio and Gemini are proprietary Google services; there are no public source repositories for the hosted Studio environment.

### License
- Proprietary

### FreeTrial
- Yes
  - Core prototyping and experimentation features of AI Studio are available without charge.

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
<!-- ToDo -->
<!-- Bring Your Own LLM API Key supported -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### LocalOffline
- No
  - Studio is a cloud-hosted web application; there is no known supported offline/self-hosted distribution of the Studio UI or Gemini models.

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
- No
  - Studio offers code export but does not act as a git host. Exported snippets are intended to be copied into developer repositories.

## Extensible

### Extensible
- Yes
  - Integrates with Vertex AI and supports function-calling/tool integrations

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
- No
  - Interaction is through the web UI (Playground, chat, multimodal inputs) and exported code; no integrated shell/terminal is advertised.

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
