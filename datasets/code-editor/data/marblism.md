# Marblism - https://marblism.ai
AI platform offering role-specific "AI Employees" for business automation and an AI app builder that generates full‑stack React/Node projects.

## General Info

### Classification
- Code/Editor

### Version
v (2025-10-19)

### Repo
-

### Rating
- [4] Strong for SMBs, solopreneurs and rapid prototyping
- [3] Generated code often needs manual hardening for production

### Short Description
<!-- ToDo -->

-

### Description
Marblism provides two complementary offerings: (1) a suite of role-specific "AI Employees" (Eva, Penny, Sonny, Stan, Cara, Linda) that autonomously handle business tasks such as inbox/calendar triage, SEO blog writing, social scheduling, lead generation/outreach, customer support, and basic legal document review; and (2) an AI app builder that scaffolds full‑stack React + Node applications (DB schema, backend endpoints, front-end pages, auth, basic integrations) from prompts. The platform focuses on fast onboarding and autonomous operation for non-technical founders and small teams.

### Languages
- JavaScript
- TypeScript

### Notes
- Primary value: replaces or augments routine human work for small teams (email, content, social, outreach, support) and accelerates prototyping for web apps.
- Notable AI Employees: Eva (assistant/inbox & calendar), Penny (SEO/blog), Sonny (social media), Stan (sales outreach), Cara (support), Linda (legal review).
- App builder features: creates DB schemas, backend APIs, front-end pages, authentication (JWT/Google), S3 uploads, mail integration; targeted at React + Node stacks.
- Pricing: positioned affordably (examples cited $39/month for unlimited AI Employees tasks); also offers tiered app-builder plans / free tier for limited use.
- Strengths: very fast prototyping, simple onboarding (<30 minutes), GitHub repo output, useful for MVPs and solo founders.
- Limitations: not enterprise-grade (compliance, on-premises), limited tech stack (React/Node), generated code usually needs manual review/hardening for production, documentation/support primarily community/Discord.

### Last Update
<!-- ToDo -->
<!-- Note Date last updated -->
-

## Licensing

### Opensource
- No

### License
- Proprietary

### FreeTrial
- Yes

## MCP-Client

### MCP-Client
- No

### Prompts
<!-- ToDo -->
<!-- Default description for Prompts -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Tools
<!-- ToDo -->
<!-- Default description for Tools -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

### Resources
<!-- ToDo -->
<!-- Default description for Resources -->
<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->
- Yes
- No
<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->

## Deployment

### BYOK
- No

### LocalOffline
- No

## Developer Experience

### ContextManagement
- Yes
  - Marblism uses role-specific "AI Employees" (e.g., Eva, Penny, Sonny) that retain task- and role-level context for ongoing autonomous workflows. Context is also supplied and updated via connected accounts and integrations (email/calendar, GitHub, S3, mail) and through app-builder prompts and project settings during onboarding and app scaffolding. Public documentation does not detail the exact persistence model or memory API exposed to end users.

### DirectFileReferences
- No
  - Files can be referenced indirectly by the platform when the app builder generates or clones GitHub repositories: generated project files and assets are written to a repo that users can inspect and pull. The platform also supports uploads/attachments (e.g., S3 uploads) and integrates with GitHub which enables direct file access via repository links. There is no public documentation of a generic file-browse API for arbitrary external files beyond these integrations.

### Checkpoints
- Yes
  - Generated code and projects are pushed to GitHub repositories, which provides standard version-control checkpoints (commits, branches, revert). Because the platform writes to Git repos, users can undo or revert generated changes via normal Git workflows. There is no widely advertised separate "checkpoint/restore" feature beyond standard VCS usage in public product notes.

### GitSupport
- Yes
  - Generates/clones GitHub repositories for created apps

## Extensible

### Extensible
- Yes

### Plugins
- No

### Hooks
- No
  - Integrations (GitHub repository creation/push, mail integrations, S3 uploads, and external account connections) imply event-driven interactions and integration endpoints that can function like hooks for automation. The product surface indicates output/actions (repo push, deployed app artifacts) that external systems can react to. There is no explicit public reference to a user-facing "webhooks management" UI or exhaustive lifecycle hook API in the available product notes.

### SlashCommands
- No
  - The platform exposes reusable role-driven actions via its AI Employees (pre-built role behaviours that can be triggered to perform tasks like inbox triage, social scheduling, outreach). While not literally described as "slash commands," these role actions act as repeatable, triggerable automation primitives in the product. There is no public mention of a chat-style slash-command syntax for end users.

### CustomModes
- Yes
  - Users can customize how the AI Employees operate via onboarding choices, role selection, and prompt/configuration templates used by the app builder. This allows creation of specialist operational modes (e.g., a Penny configuration for SEO-focused output versus a Stan configuration for sales outreach). There is no public documentation describing an exposed "custom mode" editor or marketplace; customization appears to be driven through role settings and prompt inputs.

### Subagents
- Yes
  - Marblism's "AI Employees" are functionally specialized subagents tailored to distinct business roles (e.g., inbox/calendar assistant, SEO/blog writer, sales outreach, customer support). Users pick and configure these agents for task-specific workflows; the app builder similarly scaffolds role-specific modules and endpoints for generated apps. The platform therefore supports the concept of specialized subagents, though details about exposing developer-level subagent creation or a public SDK are not documented.

## Ungrouped Criteria

### Terminal
- No

### SpecDrivenDevelopment
- Other
  - Marblism does not publicly advertise adherence to a named spec-driven development methodology from the list above. Its product model centers on role templates, prompt-driven scaffolding and generated repositories rather than an explicit spec-driven framework like Tessl.
