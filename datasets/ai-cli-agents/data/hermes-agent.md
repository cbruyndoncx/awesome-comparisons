# Hermes Agent - https://hermes-agent.nousresearch.com/docs

Hermes Agent is a self-improving AI assistant featuring a built-in learning loop that generates new skills from user interaction. It maintains a persistent, deepening model of the user to provide contextually aware assistance across multiple sessions.

## General Info

### Vendor
- Nous Research

### License
- MIT

### Open Source
- Yes

## Capabilities

### Interface Type
- CLI
- TUI
- Messaging Gateway
- Telegram
- Discord
- Slack
- WhatsApp
- Signal
- Email

### Platform Support
- MacOS
- Linux
- WSL2
- Android

### Model Providers
- Multi-provider

### Authentication
- API Key

## Extensibility

### MCP Support
- Yes

### Skills
- Yes

### Commands
- Yes

### Hooks
- No

### Subagents
- No

### Other
- Soul.md
- Cron Scheduling
- Skills Hub

## Source

### Source File
- hermes-agent.md

### Description
- The messaging gateway allows users to interact with the agent via mobile platforms like Telegram or Signal while the core process runs on a remote server. It features a unique self-improvement loop where it searches past conversations to build persistent procedural memory. For users transitioning from other ecosystems, the tool provides an automated migration path from OpenClaw to import existing memories and settings. The architecture is lightweight enough to run on a $5 VPS but scales to large GPU clusters for complex reasoning tasks. It further includes built-in cron scheduling to manage automated tasks across its supported communication channels.

## Rating

### Overall
- Innovation: [5]
- Accessibility: [5]
- Flexibility: [4]
