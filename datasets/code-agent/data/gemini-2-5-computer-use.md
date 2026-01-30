# Gemini 2.5 Computer Use - https://blog.google/technology/google-deepmind/gemini-computer-use-model/

Gemini 2.5 Computer Use is Google's specialized model built on Gemini 2.5 Pro's capabilities to power agents that can interact with user interfaces, navigate web browsers, click buttons, fill forms, and scroll through pages.

**Dataset ID:** code-agent

## General Info

### Classification
- Code/Autonomous agent

### Version
- 2.5 (October 2025)

### Repo
- N/A
  - Proprietary model; no public repository found.

### Rating
- [4] 18% performance increase on difficult evaluations (Autotab); 60%+ test rehabilitation rate (Google Payments)
- [4] Leads web and mobile control benchmarks; Gemini 2.5 Pro achieves 63.8% on SWE-Bench Verified

### Short Description
Specialized AI agent model enabling autonomous UI interaction through web browsers and mobile interfaces, with capabilities for clicking, form-filling, scrolling, and navigation.

### Description
Google's Gemini 2.5 Computer Use model was released in public preview in October 2025 via the Gemini API, accessible through Google AI Studio and Vertex AI. The specialized model is built on Gemini 2.5 Pro's capabilities and designed specifically to power agents that can interact with user interfaces.

The model can navigate web browsers autonomously, click buttons, fill out forms, and scroll through pages—all based on simple text prompts. Its core capabilities are exposed through the new `computer_use` tool in the Gemini API and should be operated within a loop. Inputs to the tool include the user request, a screenshot of the environment, and a history of recent actions.

The model has been powering several Google products including Project Mariner, the Firebase Testing Agent, and some agentic capabilities in AI Mode in Search. According to the AI agent company Autotab, the model increased performance by up to 18% on its most difficult evaluations for reliably parsing context.

Google's payments platform team implemented the model to fix fragile UI tests, successfully rehabilitating over 60% of test executions that previously would have failed. This demonstrates the model's practical effectiveness in real-world software testing and quality assurance scenarios.

### Languages
- Any
  - Operates at the UI level, language-agnostic

### Notes
- Release: October 2025 (public preview)
- API Access: Gemini API via Google AI Studio and Vertex AI
- Core Tool: `computer_use` tool in Gemini API
- Capabilities: Web navigation, button clicking, form filling, scrolling, page interaction
- Input Requirements: User request, screenshot, action history
- Real-World Applications: Project Mariner, Firebase Testing Agent, AI Mode in Search
- Performance: 18% improvement on difficult evaluations (Autotab)
- UI Test Success: 60%+ test rehabilitation rate (Google Payments)
- Benchmarks: Leads in web and mobile control with lower latency
- Developer: Google DeepMind
- Availability: Public preview
- 2025-2026 Update: Project Mariner computer use capabilities integrated into 2.5 Pro and 2.5 Flash. Gemini 2.5 Pro achieved 63.8% on SWE-Bench Verified and #1 on WebDev Arena leaderboard (ELO 1415). Deep Think experimental reasoning mode added for complex tasks. 1M token context window (expanding to 2M). MCP tool support added to Gemini API. Native audio I/O with affective dialogue via Live API. Indirect prompt injection protection makes it Google's most secure model family. 2.5 Flash optimized for efficiency (20-30% fewer tokens). Tool use via Live API connects to Calendar, Notes, Tasks, Photos, YouTube, Maps.

### Last Update
- 2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Available in public preview

## MCP-Client

### MCP-Client
- Yes
  - MCP tool support added to Gemini API and SDK for access to open-source tools

### Prompts
- Yes
  - Text prompts for UI interaction tasks

### Tools
- Yes
  - computer_use tool in Gemini API

### Resources
- Yes
  - Official blog: https://blog.google/technology/google-deepmind/gemini-computer-use-model/
  - Documentation: https://cloud.google.com/vertex-ai/generative-ai/docs/computer-use
  - Gemini API: https://ai.google.dev/gemini-api/docs/computer-use

### ACP
- No

## Deployment

### BYOK
- No

### Local Offline
- No
  - Requires cloud API access

## Developer Experience

### Context Management
- Yes
  - Maintains action history as context

### Direct File References
- No
  - Operates at UI level

### Checkpoints
- No
  - UI-level agent; no checkpoint system documented. Relies on external workflow orchestration.

### Git Support
- No
  - UI-level agent, not code repository aware

## Extensible

### Plugins
- No

### Hooks
- No
  - No lifecycle hook system documented for the computer use model.

### SlashCommands
- No

### Custom Modes
- No
  - No user-definable custom modes documented for the computer use model.

### Subagents
- Yes
  - Can be integrated into larger agentic workflows

## Ungrouped Criteria

### Terminal
- No
  - Operates through UI interaction, not terminal

