# CodeWP - https://codewp.ai
AI-assisted code generator focused on WordPress development: generates PHP/JS snippets, shortcodes, blocks and can export as plugins

## General Info

### Classification
- Product/Prototyping

### Version
- Unknown (2025-10-19)
  - Proprietary SaaS product; version information not publicly available

### Repo
-

### Rating
- [4] Ease of use — clean web UI and natural-language prompts make it fast for WP devs
- [4] WordPress expertise — specialized modes for popular WP plugins and builders
- [3] Extensibility/API — provides an API and export options but not fully open-source
- [4] Value for WP-specific tasks — free tier + paid plans tuned for agency workloads

### Short Description
CodeWP is an AI code-generation platform tailored for WordPress developers that turns natural-language prompts into ready-to-use PHP, JavaScript, and theme/plugin code snippets, with features like conversational editing, live WordPress preview, and plugin export.

-

### Description
CodeWP is a commercial AI code-generation tool tailored to WordPress development. It accepts natural-language prompts and returns ready-to-use WordPress code: functions, shortcodes, theme snippets, REST endpoints, block code, and can package snippets as plugins for easier deployment. The product emphasizes WordPress-specific compatibility by providing "modes" trained or tuned for common plugins and builders (ACF, Elementor, WooCommerce, Gravity Forms, Contact Form 7, MemberPress, Easy Digital Downloads, etc.). It also includes a searchable snippets library and a 24/7 chat assistant for guidance.

### Languages
- PHP
- JavaScript
- HTML
- CSS
- SQL

### Notes
- Pricing tiers (public info at time of research):
  - Free / Starter: limited monthly actions (about 100), 1 project, community support
  - Pro: ~$28/month — larger action quota (~10k/mo), multiple projects
  - Agency: ~$68/month — unlimited actions, unlimited projects, team features
- Key strengths:
  - WordPress-focused outputs that save time for common WP tasks
  - Specialized modes for major plugins and page builders help generate compatible code
  - Ability to export generated snippets as a plugin simplifies deployment
  - Large searchable snippets library and tutorials at https://codewp.ai/snippets/
- Considerations:
  - Not open source — code generation is a hosted service
  - Limited built-in Git or terminal integration; workflow expects copying generated code into your WP projects or using the plugin export
  - Review generated code and test in staging — as with all AI-generated code, manual review is recommended for security and compatibility
- Sources & further reading:
  - https://codewp.ai/
  - https://codewp.ai/snippets/
  - CodeWP v2.5 release notes / walkthroughs (public posts and videos, 2024-2025)

### Last Update
- 2025-11-15
  - Note: This date may reflect documentation update; actively maintained SaaS product

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Free starter tier includes a small monthly quota (e.g., ~100 actions) so you can evaluate before upgrading

## MCP-Client

### MCP-Client
- No

### Prompts
- Yes
  - CodeWP is prompt-first: natural-language prompts drive snippet generation and conversational edits.
  - The assistant supports follow-up/clarifying questions and iterative refinement of generated code.

### Tools
- Yes
  - Live WordPress preview (in-browser WP instance)
  - Export as plugin/packaging for deployment
  - Conversational chat assistant for code editing
  - Public snippets library and dashboard tooling (Snippets, Packages, Sites)

### Resources
- Yes
  - Searchable snippets library: https://codewp.ai/snippets/
  - Documentation and tutorials on the CodeWP site
  - Public walkthroughs and release notes for major updates (v2.5+)

## Deployment

### BYOK
- No

### Local Offline
- No

## Developer Experience

### Context Management
- Yes
  - CodeWP supports passing external context and conversational context to refine generation; includes dashboard "Sites" and "Packages" to organize project context.

### Direct File References
- Yes
  - CodeWP has a "package" system where the AI understands the context of the files within a package.

### Checkpoints
- No
  - Relies on the user's local version control.

### Git Support
- No

## Extensible

### Extensible
- Yes
  - Offers specialized "modes" for plugins (ACF, Elementor, WooCommerce, Gravity Forms, etc.) and an API/exports for integration

### Plugins
- No
  - CodeWP has extensions for VS Code and browsers, and can generate WordPress plugins, but it does not have a plugin system for extending its own functionality.

### Hooks
- No
  - CodeWP generates code that utilizes WordPress hooks, but it does not have its own hook system.

### SlashCommands
- No

### Custom Modes
- Yes
  - Provides targeted modes/presets for common WordPress ecosystems and builders; v2.5 added more advanced modes and presets.

### Subagents
- No

