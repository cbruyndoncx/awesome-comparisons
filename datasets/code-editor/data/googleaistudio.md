# Google AI Studio - https://aistudio.google.com
Browser-based development environment from Google for prototyping and experimenting with Gemini models and multimodal generative AI

## General Info

### Classification
- AIE/Model
- Product/Prototyping

- Primary focus: Model prototyping and experimentation playground (AIE/Model, Product/Prototyping)
- Supports agentic workflows, function-calling and tool integrations for building autonomous behaviors
- Note: While it has IDE-like features for building multimodal apps, it's primarily a model experimentation environment rather than a general-purpose code editor

### Version
 (2025-10-19)

### Repo
-

### Rating
- [5] Excellent for rapid prototyping and multimodal experimentation with Gemini family
- [4] Strong integration path to Vertex AI for production deployments
- [3] Limited transparency on enterprise pricing / BYOK / offline hosting

### Short Description
Browser-hosted IDE and playground for building, iterating and exporting multimodal apps that use Google's Gemini family (text, vision, audio/video and Live) with built-in media tools and integrations for moving prototypes toward Vertex AI.

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
2025-11-15

## Licensing

### Opensource
- No
  - Studio and Gemini are proprietary Google services; there are no public source repositories for the hosted Studio environment.

### License
- Proprietary

### Free Trial
- Yes
  - Core prototyping and experimentation features of AI Studio are available without charge.

## MCP-Client

### MCP-Client
<!-- ToDo -->
<!-- Coding tool has built-in MCP client so can connect to MCP servers -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- No

- AI Studio itself is a hosted Google product and does not expose a general-purpose built-in MCP client for connecting to arbitrary external MCP servers. Integration with MCP-style workflows is possible via community projects (e.g. an aistudio-mcp-server) and via the Gemini API / Vertex AI SDKs, but the hosted Studio UI expects Google-managed Gemini endpoints.

### Prompts
<!-- ToDo -->
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Studio provides prompt templates, editable prompt playgrounds and tools for A/B style prompt comparison. Prompts can be saved, reused and (where applicable) exported with projects and code snippets. Vertex AI prompt management can be used for production lifecycle.

### Tools
<!-- ToDo -->
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Supports function-calling / tool integrations, media tools (Nano Banana image editor, Veo video generator), and connectors to Google services (Search, Maps) and the Gemini API. Tools are surfaced in the Build/Playground flows and can be composed in multi-step apps.

### Resources
<!-- ToDo -->
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Files and datasets can be uploaded to projects (UI upload and Files API); Studio integrates with Google Drive for persistent storage and collaboration. Uploaded files include text, PDFs, images, audio and video and can be referenced programmatically via file URIs.

## Deployment

### BYOK
<!-- ToDo -->
<!-- Bring Your Own LLM API Key supported -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- No

- The hosted AI Studio environment runs on Google's Gemini models; you cannot plug arbitrary third‑party LLMs directly into the Studio UI. Developers using the Gemini API or the aistudio-mcp-server can supply their own Gemini API key when running self-hosted adapters, but that is separate from the hosted Studio experience.

### Local Offline
- No
  - Studio is a cloud-hosted web application; there is no known supported offline/self-hosted distribution of the Studio UI or Gemini models.

## Developer Experience

### Context Management
<!-- ToDo -->
<!-- Methods for managing and updating the context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Studio provides chat history, project-level saved snapshots/versions, and file-based context (uploaded files and Drive links). The Build workflows and prompt playground allow inserting files and adjusting context windows for multimodal prompts.

### Direct File References
<!-- ToDo -->
<!-- Can with @file or similar provide context. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Uploaded files receive stable file URIs (Files API) that can be referenced in prompts. The UI enables attaching files to prompts and the API supports reusing file identifiers so uploads do not need to be repeated.

### Checkpoints
<!-- ToDo -->
<!-- A way to undo using checkpoints or if autocommitted git history -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Studio maintains saved snapshots / project history (visible via the history UI) and creates Drive-backed versions for files. Users can restore prior snapshots, though community reports have documented occasional issues with snapshot previews or restores; project files also appear in Drive version history which can be used as a fallback.

### Git Support
- No
  - Studio offers code export but does not act as a git host. Exported snippets are intended to be copied into developer repositories.

## Extensible

### Extensible
- Yes
  - Integrates with Vertex AI and supports function-calling/tool integrations and programmatic access via the Gemini API and Files API.

### Plugins
<!-- ToDo -->
<!-- A method of bundling together commands, agents and hooks (claude). -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Studio surfaces tool integrations and connectors; while there isn't a public "plugin marketplace" identical to ChatGPT plugins, Studio/Vertex workflows allow registering connectors and tool adapters (function-calling) and community projects provide MCP adapters.

### Hooks
<!-- ToDo -->
<!-- Lifecycle events for the agent. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- No

- There is no documented, user-facing lifecycle hook system for embedding custom callbacks inside the hosted Studio UI. Integration points are provided via the Gemini API / Vertex AI and by exporting code to run custom hooks externally.

### SlashCommands
<!-- ToDo -->
<!-- Re-usable commands that can be manually triggered by the user. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- No

- The Studio UI does not advertise a dedicated slash-command palette for chat prompts; workflows rely on templates, saved prompts and the Build UI.

### Custom Modes
<!-- ToDo -->
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Studio provides specialized workflows and modes (Build, Generate, Edit, Live/Voice) and templates tailored to tasks such as image editing, video generation, voice apps and multimodal experiments.

### Subagents
<!-- ToDo -->
<!-- Define specialized AI subagents for task-specific workflows. -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes

- Studio supports composing multi-step apps via function-calling and tool integrations; integrations and MCP-style adapters enable creating specialised tool pipelines that act as subagents for tasks like transcription + summarization + extraction.

