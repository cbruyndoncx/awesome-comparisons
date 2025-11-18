# Gemini 2.5 Computer Use - https://blog.google/technology/google-deepmind/gemini-computer-use-model/

Gemini 2.5 Computer Use is Google's specialized model built on Gemini 2.5 Pro's capabilities to power agents that can interact with user interfaces, navigate web browsers, click buttons, fill forms, and scroll through pages.

**Dataset ID:** code-agent

## General Info

### Classification
- Code/Autonomous agent

### Version
- 2.5 (October 2025)

### Repo
- -

### Rating
- 18% performance increase on difficult evaluations (reported by Autotab)
- Outperforms competitors in web and mobile control benchmarks with lower latency

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

### Last Update
- 2025-11-18

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Yes
  - Available in public preview

## MCP-Client

### MCP-Client
- No

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

## Deployment

### BYOK
- No

### LocalOffline
- No
  - Requires cloud API access

## Developer Experience

### ContextManagement
- Yes
  - Maintains action history as context

### DirectFileReferences
- No
  - Operates at UI level

### Checkpoints
- -

### GitSupport
- No
  - UI-level agent, not code repository aware

## Extensible

### Plugins
- No

### Hooks
- -

### SlashCommands
- No

### CustomModes
- -

### Subagents
- Yes
  - Can be integrated into larger agentic workflows

## Ungrouped Criteria

### Terminal
- No
  - Operates through UI interaction, not terminal

### SpecDrivenDevelopment
- -
