# Codestral - https://mistral.ai/products/codestral

Mistral AI's specialized code-focused model family including Codestral for code completion and Devstral for agentic coding. Devstral (24B) outperforms models up to 671B parameters on SWE-Bench Verified with 128K-256K context support.

## General Info

### Classification
- AIE/Model

### Version
- Codestral (July 2025) / Devstral 2 (2025)

### Repo
- https://huggingface.co/mistralai

### Rating
- SWE-bench Verified: Outperforms DeepSeek V3 (671B) and Qwen3 (232B)
- Aider Polyglot: N/A

### Short Description
- Mistral's code-focused model family: Codestral for real-time code completion and Devstral for autonomous multi-step agentic coding workflows, with competitive SWE-bench performance at 24B parameters.

### Description
Codestral and Devstral are Mistral AI's specialized coding models released in 2025. Codestral is the premier code completion and generation model optimized for fill-in-the-middle completion and autocomplete workflows. Devstral, built on Mistral Small 3 with 24B parameters and 40 layers using grouped query attention, is designed for agentic coding -- autonomous multi-step software engineering workflows that interact with development environments, edit multiple files, and reason across entire codebases. Devstral supports 128K-256K token context and outperforms substantially larger models including DeepSeek V3 (671B) and Qwen3 (232B) on SWE-Bench Verified. Developed in partnership with All Hands AI (OpenHands), these models are part of Mistral Code, a comprehensive platform integrating Codestral, Codestral Embed, Devstral, and Mistral Medium with IDE support for VS Code and JetBrains.

### Languages
- Any

### Notes
- Devstral: 24B parameters, 128K-256K context, built on Mistral Small 3
- Outperforms models 10-28x larger on SWE-Bench Verified
- Codestral: optimized for real-time autocomplete and fill-in-the-middle
- Devstral runs on a single RTX 4090 or Mac with 32GB RAM
- Co-developed with All Hands AI (OpenHands framework)
- Mistral Code platform integrates with VS Code and JetBrains IDEs
- Devstral API: $0.1/M input, $0.3/M output tokens

### Last Update
- 2026-01-30

## Licensing

### Opensource
- Yes

### License
- Apache 2.0 (Devstral); Proprietary (Codestral)

### Free Trial
- Yes
