# Firebase  - https://firebase.google.com
A cloud-first, AI-powered development environment from Google that combines prototyping agents, a full IDE, and managed Firebase backend provisioning to accelerate building web and mobile apps from prototype to production.

## Version
v0.1 (2025-04-22 preview)

## Classification 
- Code/Editor

## Rating
- [5] Rapid prototyping and automated backend provisioning
- [4] Deep Gemini integration for code assistance and UI generation
- [3] Vendor lock-in concerns; not open-source

## Repository
- 

## Languages
- JavaScript
- TypeScript
- Go
- Java
- Other
  - Support for other backend languages via templates and runtime options (examples include Go and Java in templates)

## Extensible
- Yes
  - Integrations: Figma import (Builder.io plugin), GitHub/GitLab/Bitbucket import, template gallery

## Description
Firebase Studio is an integrated, agentic development workspace built to speed application development by combining an App Prototyping agent (natural-language and image-driven app creation), a CodeOSS-based IDE (VS Code-compatible experience), and automatic Firebase service provisioning (Authentication, Firestore, Hosting, etc.). It uses Google's Gemini models to power conversational prototyping, contextual code assistance, and in-IDE help. Typical workflows include "describe an app in plain language → prototype generated app → switch to code to refine → one-click deploy to Firebase Hosting." The service is optimized for rapid MVPs, full-stack AI apps, and teams that want managed infrastructure with minimal setup.

## BYOK
- No
  - Gemini API keys and AI resources are provisioned as part of the workspace flow; explicit BYOK for model keys is not a first-class, user-driven workflow in the initial preview.

## LocalOffline
- No
  - Firebase Studio is a cloud-hosted workspace; the environment and AI features run in Google-managed infrastructure.

## FreeTrial
- Yes
  - Available during preview; typical Firebase usage quotas and billing apply once services are provisioned beyond free tier limits.

## GitSupport
- Yes
  - Import from GitHub, GitLab, Bitbucket; code workspace exposes repo integration and basic Git operations.

## Terminal
- Yes
  - Full coding workspace includes terminal access for builds, package managers, and CLI workflows.

## Opensource
- No

## License
- Proprietary

## MCP-Client
- 


## Notes
- App Prototyping agent: Create Next.js web app prototypes from natural language, images, or Figma designs. The agent can add auth and database patterns automatically when requested.
- Automated backend provisioning: Prompts that specify data/auth needs result in recommended App Blueprints (Firestore, Firebase Auth, Hosting) and one-click provisioning when publishing.
- Gemini integration: The environment is powered by Gemini models (Gemini in Firebase, upgraded to Gemini 2.5 during 2025 previews), providing code completion, refactor suggestions, test generation, and conversational guidance contextualized to the workspace.
- Templates & import: Large template gallery (dozens of starter apps) plus the ability to import existing projects or compressed archives from source control.
- Deployment: One-click publish to Firebase App Hosting with preview URLs and QR codes for quick device testing; handles builds and CDN deployment.
- Collaboration: Shareable workspaces and real-time collaboration for teams; supports rapid feedback cycles.
- Privacy & security considerations: Workspaces may provision AI resources and API keys automatically; teams should evaluate data residency and key management requirements (enterprise BYOK and compliance workflows may be limited in the initial preview).
- Best fit: Fast prototyping, startups and teams building Firebase-backed web/mobile apps, AI-enhanced frontends, and teams that prefer managed backend provisioning and tight Firebase integration.
- Limitations: Cloud-only, proprietary, potential vendor lock-in to Firebase/GCP services; enterprises with strict BYOK or on-prem requirements should validate security/compliance.


## ContextManagement
- Yes
  - Chat- and workspace-centered context: Gemini-in-Firebase chat + the Code OSS workspace provide the active context (open files, project settings, App Blueprints, Genkit configuration, and provisioned Firebase resources). Methods to update context include editing files in the IDE, committing to the integrated Git repo, changing project/settings in the workspace, re-running prototype prompts, and interacting with the in-IDE chat (Gemini) which reads workspace files to inform responses. There is no public programmatic "context API" documented in the preview — context is primarily managed via the workspace and chat.

## DirectFileReferences
- Yes
  - Files can be directly referenced and accessed inside the workspace: open files in the Code OSS-based IDE, import repositories (GitHub/GitLab/Bitbucket), upload archives, and use plugins (e.g., Builder.io Figma import) to bring design files into the project. Gemini and the App Prototyping agent access the workspace files to provide contextual code generation and edits. There is no public external file-reference API documented beyond the workspace and VCS integration.

## Hooks


## SlashCommands


## Subagents


## CustomModes


## Plugins
- Yes
  - Firebase Studio exposes integrations and plugin-like extensions in the preview (examples: Builder.io Figma import, Genkit integration, template gallery, and Git provider integrations). These are enabled/configured through the workspace UI (import plugin/integration or select templates) and by provisioning AI resources (Gemini/Genkit) into the workspace; developer-facing documentation for authoring third-party plugins or bundling commands/agents/hooks is not publicly detailed in the preview documentation.

## Checkpoints
- Yes
  - Undo and rollback are handled primarily via standard version control (Git) integration: commits, branches, and repo history allow reverting agent-made changes. Workspace share URLs, preview deployments and published app versions provide additional reference points, but there is no documented first-class "agent checkpoint" system independent of source control in the preview.

## SpecDrivenDevelopment
- Other
  - Firebase Studio does not advertise a named spec-driven development framework in public previews; its development patterns are centered on templates, App Blueprints, and the App Prototyping agent rather than a formal SDD framework like Tessl or SpecKit.
