# Void Editor - http://voideditor.com
Open-source, privacy-first AI code editor built as a fork of Visual Studio Code that connects directly to LLMs (local or cloud) without routing data through a private backend. 

## Version
v0.1 (2025-01 beta)

## Rating
- [4] Strong privacy and model-flexibility design
- [4] Rapidly evolving; Beta early UX rough edges
  
## Repository
- https://github.com/voideditor/void
  
## Languages
- Any
  
## Extensible
- Yes
  
## Description
Void is an open-source, privacy-focused AI code editor that forks the Visual Studio Code experience and adds first-class AI-assisted coding features. Its core differentiator is that it never acts as an intermediary for model inference: the editor connects directly to whatever model or provider you configure (local or cloud), giving users full control of where their code and prompts are sent. Features include Tab autocomplete, inline Quick Edit, an integrated Chat with multiple modes (Chat, Agent, Gather), Agent Mode for multi-file automated edits, checkpoints for LLM changes, and tooling integrations for local model runtimes.

## BYOK
- Yes
  
## LocalOffline
- Yes
  - Supports running local/open-source models via integrations (Ollama, LM Studio, local runners) so inference can remain on-device or on-prem.
  
## FreeTrial
- Yes
  - Core editor is free and open-source.
  
## GitSupport
- Yes
  
## Terminal
- Yes
  
## Opensource
- Yes
  
## License
- Apache-2.0
  
## MCP-Client
- Yes
  
## Notes
- Privacy-first architecture: no private backend proxying—connections go directly from the editor to the chosen model provider or local runtime.
- Model flexibility: works with local open-source models and major cloud providers (OpenAI, Anthropic, Google, etc.) by configuring your own keys or local endpoints.
- Agent Mode enables the AI to perform repository-wide tasks (read/write/delete files, run terminal commands) — use with care and review generated changes via checkpoints.
- Good choice for teams or individuals who need AI assistance but require data residency or on-prem constraints.
  