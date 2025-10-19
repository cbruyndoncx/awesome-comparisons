# Runner H - https://www.h.com/
A web-focused autonomous agent that executes multi-step tasks via natural language, combining compact LLM planning with a vision-language model to interact with arbitrary web pages.

## Version
v0.9 (2024-05)

## Rating
- [4] Strong web automation and visual robustness
- [3] Early-stage platform; limited public tooling and ecosystem
  
## Repository
- 
  
## Languages
- Python
- JavaScript / Node.js
  
## Extensible
- Yes
  
## Description
Runner H (from H Company) is an "action-oriented" autonomous web agent designed to perform complex, multi-step web tasks from simple natural-language instructions. It uses a compact reasoning LLM (H-LLM) to plan and orchestrate actions and a vision-language model (H-VLM / Holo-1) to visually interpret web pages and locate UI elements. The system is organized as a multi-agent stack (a master planner plus specialized sub-agents) that can run workflows, adapt to UI changes, and integrate with productivity tooling.

## BYOK
- No

## LocalOffline
- No

## FreeTrial
- Yes
  - Limited beta access was offered during initial launch windows.

## GitSupport
- No
  
## Terminal
- No
  
## Opensource
- No
  - Holo-1 (the VLM) has open-source releases, but Runner H’s orchestration and hosted agent product is closed-source as of initial public information.

## License

## MCPSupport
- No

## Notes
- Core tech: H-LLM (compact ~2B model) for reasoning/planning and H-VLM (Holo-1) as Runner's visual "eyes". The stack emphasizes function-calling, planning decomposition, and visual grounding to interact with arbitrary web UIs.
- Strengths: excels at unstructured, multi-step web automation where traditional API-based integrations or brittle RPA selectors fail. Self-healing/visual adaptation reduces breakage when sites change.
- Integrations: native connectors for common productivity apps reported (e.g., Google Workspace, Slack, Notion) and extensibility via connectors like Zapier for additional app workflows.
- Use cases: data extraction across sites, automated form filling and onboarding, multi-site workflows (e-commerce, lead enrichment), and automated testing scenarios that require visual validation.
- Limitations: early-stage product with limited public SDK/repo; cloud-hosted—which may pose data residency or BYOK concerns for some organisations. Pricing and enterprise controls were evolving during early launches.
- Related projects: H Company also released Tester H (an AI testing agent) and Holo-1 (open-source VLM) which are part of the same ecosystem.