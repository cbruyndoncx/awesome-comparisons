# Junie CLI - https://www.jetbrains.com/junie/

JetBrains Junie CLI is the standalone terminal version of JetBrains' Junie AI coding agent, released in March 2026. It brings Junie's agentic capabilities to the command line independently of the JetBrains IDE, with BYOK support for OpenAI, Anthropic, Google, and Grok models. It runs on macOS, Linux, and Windows.

**Dataset ID:** terminal

## General Info

### Classification
- Code/Terminal
- Code/Autonomous agent

### Version
- GA (March 2026)

### Repo
- -
  - Proprietary JetBrains product; no public source repo.

### Rating
- [3] Solid BYOK flexibility and cross-platform support; extends Junie outside the IDE
- [3] Relatively new CLI; lacks the IDE-native inspection and test execution safety net of the IDE version

### Short Description

- Standalone CLI agent from JetBrains (March 2026) with BYOK support for OpenAI, Anthropic, Google, and Grok; cross-platform macOS/Linux/Windows.

### Description

Junie CLI is JetBrains' standalone terminal agent, released in March 2026 to make Junie fully independent from the IDE. It exposes the same two-mode workflow as the IDE version — Code Mode for autonomous task execution and Ask Mode for collaborative planning — but runs entirely from the command line. Unlike the IDE version, it does not have access to the host IDE's inspection framework or test runner for post-generation validation; those safety nets are IDE-only.

BYOK support covers OpenAI, Anthropic, Google, and Grok model providers, giving teams flexibility to use their preferred LLM. Pricing runs from $10/month for individuals to $60/month at the enterprise tier, shared with the IDE product.

### Languages
- Any

### Notes
- BYOK providers: OpenAI, Anthropic, Google, Grok.
- Does not include IDE inspection/test post-validation (IDE version only).
- Pricing: $10–$60/month (individual to enterprise), shared with JetBrains Junie IDE.
- Part of the JetBrains AI product stack that also includes JetBrains AI Assistant and the Junie IDE plugin.

### Last Update
- 2026-05-13

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Free plan available; paid tiers from $10/month.

## MCP-Client

### MCP-Client
- Yes

### Prompts
- Yes

### Tools
- Yes

### Resources
- Yes

### ACP
- No

## Deployment

### BYOK
- Yes
  - Supports OpenAI, Anthropic, Google, and Grok via bring-your-own key.

### Local Offline
- No
  - Requires connectivity to external LLM provider.

## Developer Experience

### Context Management
- Yes

### Direct File References
- Yes

### Checkpoints
- No

### Git Support
- Yes

## Extensible

### Plugins
- No

### Hooks
- No

### SlashCommands
- Yes

### Skills
- No

### Custom Modes
- No

### Subagents
- No
