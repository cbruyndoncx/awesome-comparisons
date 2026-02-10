# Mistral AI: Le Chat - https://chat.mistral.ai
Enterprise-ready AI assistant powered by Mistral's frontier models with MCP protocol support, deep research capabilities, voice mode, canvas editing, and privacy-first deployment.

**Dataset ID:** ai-chat

## General Info
<!-- General Info -->
### Classification
<!-- AI Native Dev ainativedev.io Classification -->
- AIE/Model

### Version
<!-- Latest version used for update -->
- 1.11.0 (January 29, 2026)

### Repo
<!-- Associated Github repository -->
- https://github.com/mistralai
  - Various tools and SDKs available; Le Chat itself is proprietary

### Rating
<!-- Avg rating based on review comments -->
-

### Short Description
- Enterprise-ready AI assistant powered by Mistral's frontier models with MCP protocol support, deep research capabilities, voice mode, canvas editing, and privacy-first deployment.

### Description
<!-- Few paragraphs about the product -->
Le Chat is Mistral AI's flagship conversational AI assistant that combines powerful frontier models with advanced features for both personal and professional use. Launched as a European alternative to ChatGPT, Le Chat offers multilingual reasoning powered by the Magistral model, deep research capabilities for structured analysis, and voice conversations through the Voxtral model. The platform includes Canvas, an interactive editor for creating and refining text, code, spreadsheets, and more with real-time AI collaboration.

Le Chat integrates with 20+ enterprise platforms through the Model Context Protocol (MCP), enabling secure connections to tools like GitHub, Atlassian, Snowflake, Databricks, Asana, and more. Users can organize work into Projects—context-rich folders that remember settings and tools—and leverage the Memories feature for personalized learning across sessions. The platform supports advanced image generation and editing through Black Forest Labs Flux Ultra, code interpretation in sandboxed environments, and custom agent creation for automating multi-step workflows.

Available as both a free service and premium tiers (Pro at $14.99/month, Team, and Enterprise), Le Chat Enterprise offers deployment flexibility with SaaS, cloud, or self-hosted options, SSO, RBAC, zero-retention mode, and strict ACL adherence for privacy-first data connections. The platform supports bring-your-own-key (BYOK) functionality and pay-as-you-go usage for power users.

### Languages
<!-- Any or limited list of supported programming Languages -->
- Any

### Notes
- Powered by Magistral (multilingual reasoning) and Voxtral (voice) models
- 20+ enterprise platform integrations via MCP
- Canvas interactive editor with version control and diff view
- Deep Research mode for structured analysis
- Image generation via Black Forest Labs Flux Ultra
- Code interpreter with sandboxed execution
- Available on Google Cloud Marketplace
- Coming to Azure AI and AWS Marketplace
- Free tier available with upgraded limits for Pro subscribers
- 128K token context window

### Last Update
<!-- Note Date last updated -->
- February 9, 2026

## Licensing
<!-- Licensing -->
### Opensource
<!-- Is this released under opensource license -->
- No

### License
<!-- Opensource specific license or Proprietary for other commercial licenses -->
- Proprietary

### FreeTrial
<!-- Free access (like opensource), or free (potentially limited) trial available -->
- Yes
  - Free tier with majority of features
  - Pro at $14.99/month with upgraded limits

## MCP-Client
<!-- Model Context Protocol support with capability details -->
- Yes
  - 20+ enterprise platform integrations
  - Custom MCP connectors for remote servers
  - Read and Write events for querying and executing actions

### MCP-Protocol-Version
<!-- MCP protocol version (e.g., 2025-06-18) -->
- 2025-06-18

### MCP-Tools
<!-- Supports MCP tool execution -->
- No

### MCP-Prompts
<!-- Supports MCP prompt templates -->
- No

### MCP-Resources
<!-- Supports MCP resource access -->
- No

### MCP-Roots
<!-- Supports MCP workspace roots -->
- Yes

### MCP-Sampling
<!-- Supports MCP LLM sampling -->
- Yes

### MCP-Tasks
<!-- Supports MCP asynchronous tasks -->
- No

### ACP
<!-- Agent Client Protocol support for standardized editor-agent communication (agentclientprotocol.org) -->
- No

## Deployment
<!-- Deployment -->
### BYOK
<!-- Bring Your Own LLM API Key supported -->
- Yes
  - Available on Le Chat Pro and Team plans
  - Especially for Mistral Vibe 2.0

### Local Offline
<!-- Support for local on-site deployment or local offline use -->
- Yes
  - Le Chat Enterprise offers self-hosted deployment
  - All data and processing remain inside your infrastructure
  - Can be deployed on-premise, in public/private cloud, or as Mistral-hosted SaaS

## Developer Experience
<!-- Developer Experience -->
### Context Management
<!-- Methods for managing and updating the context. -->
- Yes
  - Projects feature organizes conversations into context-rich folders
  - Each project has its own default Library and remembers enabled tools
  - Memories feature (opt-in) learns and remembers user preferences
  - File uploads directly into projects
  - 128K token context window

### Direct File References
<!-- Can with @file or similar provide context. -->
- Yes
  - Upload images and files (PDF, DOCX, PPT, XLSX, etc.)
  - Libraries allow indexing of uploaded files
  - Multi-turn conversations maintain context with uploaded files
  - @file syntax available in Mistral Code

### Checkpoints
<!-- A way to undo using checkpoints or if autocommitted git history -->
- No

### Git Support
<!-- Coding tool is aware of GIT and can work/integrate with GIT repos -->
- Yes
  - GitHub integration via MCP connectors
  - Manage issues, pull requests, repositories, and code analysis
  - Sentry integration for error monitoring
  - Linear integration for task creation

## Extensible
<!-- Is it possible to extend or customize the system in any way -->
<!-- Extensible -->
### Plugins
<!-- A method of bundling together commands, agents and hooks (claude). -->
- No
  - Uses MCP connectors instead

### Hooks
<!-- Lifecycle events for the agent. -->
- No

### SlashCommands
<!-- Re-usable commands that can be manually triggered by the user. -->
- Yes
  - Mistral Vibe 2.0 includes slash-command skills

### Skills
<!-- Reusable skill definitions whose details are loaded on demand; only name and description are kept in context. -->
- Yes
  - Mistral Vibe 2.0 includes custom skills functionality

### CustomModes
<!-- Create specialist modes that enable you to tailor the chat experience for specific tasks. -->
- Yes
  - Unified agent modes in Mistral Vibe 2.0
  - Deep Research mode for structured research
  - Code interpreter mode for sandboxed execution

### Subagents
<!-- Define specialized AI subagents for task-specific workflows. -->
- Yes
  - Mistral Vibe 2.0 introduces custom subagents
  - Built-in agent builder for creating custom AI workflows
  - Le Chat Agents for functional tools and micro-apps
