# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.0.0-260518] - 2026-05-18

### Added

**New entries — `terminal` dataset**
- `hermes.md` — Nous Research open-source terminal agent; MIT; model-agnostic (local + cloud); git worktree isolation; LSP-aware edits; native MCP client+server; skills/curator system; ACP server support; multi-channel (Telegram, email, web)
- `openclaw.md` — Privacy-first open-source terminal agent; MIT; local/cloud LLMs; native MCP client+server; skills system; multi-channel integrations

### Fixed

**Parser & data model (systemic)**
- Fix ReDoS catastrophic backtracking in `splitNameUrl` — titles with dashes but no URL (e.g. `CommandCode - v0.25.14`) caused infinite gulp hang
- Fix `splitNameUrl` name extraction — version strings in titles no longer pollute tool names (CommandCode, Letta, Pi, Neovate Code now show clean names)
- Fix md2json parser — indented sub-bullets (`  - description`) now stored as `plainChildren` on parent item instead of being treated as separate top-level filter values
- Fix `getCriteria()` normalization — added fallback lookup by display name, resolving `### Tools` → `MCP-Tools`, `### Prompts` → `MCP-Prompts` etc. across 53+ data files
- Fix `criteriaData` key to use `criteria.id` ensuring Angular downstream lookups succeed
- Fix feature-grouping service — normalized children lookup so Parallelism and Coordination column groups correctly resolve camelCase criteria IDs (AgentTopology, CoordinationMode, etc.)
- Fix `processMcpEnrichment` — skip when no enrichment data present (prevents overwriting markdown Yes values with No); use `criteria.id` as Map key to prevent duplicate serialized entries

**MCP data fixes**
- Fix 164 entries across all datasets where `MCP-Client` overall was `No` but sub-fields (Tools/Prompts/Resources) were `Yes` — overall now set to `Yes` to match the more-detailed sub-field data

**Configuration**
- `datasets/terminal/config/comparison.yml` — hide `Local Offline` deployment filter (terminal CLI tools are always local by definition)
- `datasets/code-orchestration/config/comparison.yml` — scope Classification to orchestration values; hide Languages, MCP sub-fields, Extensible sub-fields not relevant to orchestrators

## [Unreleased] - 2026-05-14

### Added

**New dataset: `code-orchestration`**
- 17 entries covering multi-agent parallel coding orchestration systems: Intent, Bernstein, Miyabi, DeerFlow, MetaGPT, MagiC, AgentScope, Claude-Flow, ChatDev, GNAP, Gas Town, Antigravity, Conductor, Vibe Kanban, Claude Squad, Swarm Tools, Paperclip
- Dataset-specific template fields: Agent Topology (Fixed/Dynamic), Coordination Mode (Autonomous/Supervised/Managed), Parallelism Model, Coordination Mechanism, Verification, Task Source, External Task Integrations (GitHub, Jira, Linear, Azure DevOps, Trello, ClickUp, Notion, Asana)
- Template aligned with terminal/code-editor for shared fields: MCP-Client (Prompts, Resources, ACP), Deployment (Local Offline), Languages, Licensing comments, Extensible (Plugins, Skills, Custom Modes), Developer Experience (Context Management, Direct File References)

**New entries — `terminal` dataset**
- `goose.md` — Block/Square open-source Apache 2.0 CLI agent; 3,000+ MCP servers; BYOK; ACP server support
- `junie-cli.md` — JetBrains Junie CLI (March 2026); standalone cross-platform; BYOK for OpenAI/Anthropic/Google/Grok

**New entries — `code-editor` dataset**
- `kiro.md` — AWS Kiro IDE (GA 2026); VS Code-based; spec-driven development; Agent Hooks; 50+ MCP integrations
- `jetbrains-junie.md` — JetBrains Junie AI agent (Dec 2025); Code Mode + Ask Mode; post-generation validation; 10 JetBrains IDEs; ACP support
- `replit.md` — Replit browser-based cloud IDE; Ghostwriter + Replit Agent 3 (200-min autonomous runs)

**New entries — `code-agent` dataset**
- `blinky.md` — Open-source VS Code debugging agent; LSP + print-statement + LLM triangulation; MIT

**New entries — `product-prototyping` dataset**
- `emergent-sh.md` — Five-agent full-stack builder (Architect/Designer/Developer/Integration/PM); native OAuth/API handling; YC backed
- `reflex.md` — Python full-stack framework + AI builder; no JavaScript; Apache 2.0; MCP integration

**`product-prototyping` template enhancements**
- `Frontend Stack` — frontend framework of generated output (React, Next.js, Vue.js, Python/Reflex, No-code/Proprietary, Any)
- `Backend Stack` — backend framework of generated output (Next.js API Routes, Node.js/Fastify, FastAPI, Platform/BaaS, None, Any)
- `Database` — database of generated output (PostgreSQL, SQLite, MongoDB, Supabase, Neon, Built-in/Proprietary, None, Any)
- `Style Library` — CSS/component library in generated output (Tailwind CSS, shadcn/ui, MUI, Bootstrap, Flexible, None) with Fixed/Flexible notation
- `Testing` — test framework(s) in generated output (Unit Tests, Integration Tests, E2E Tests, Static Analysis, None)
- All 18 entries backfilled with the new fields

### Fixed
- Closed GitHub issues: #8 (Grok CLI — already in dataset), #9 (Mocha — already in dataset), #13 (CodeBot Delphi — already in dataset), #14 (emergent.sh), #15 (reflex.dev)
- `code-orchestration` dataset registered in `datasets.manifest.json` and `all` dataset aggregate

## [3.0.0] - 2025-10-28

### Added

- Support for multiple datasets in a single repository.
- Per-dataset configuration, metadata, and build targets.
- Dataset selector UI (tab strip) in the demo app and dataset-aware filters/grouping.
- New top-level config keys for dataset management under the `datasets:` namespace.
- New CLI flags: `--dataset <id>` to target a specific dataset and `--all-datasets` for bulk operations.
- New test fixtures for multi-dataset scenarios.

### Changed

- Reworked repository layout and discovery to allow multiple dataset definitions alongside each other.
- Updated tools and demo pages to select and visualize specific datasets.
- Refactored internal APIs to accept dataset context/identifiers.
- Updated build/publish workflows to support per-dataset artifacts.
- Organized tests to run per-dataset.
- Updated documentation under `docs/` and the `demo/` app to reflect multi-dataset usage and migration.

### Breaking Changes

- Paths, imports, and build outputs are now dataset-aware. Existing v2 layouts require migration.
- Some legacy single-repo configuration options have been renamed or removed in favor of the dataset model.
- Internal functions now require a dataset context argument.
- Build output path layout for artifacts has changed.

### Removed

- Java/Gradle md-to-json pipeline retired in favor of the built-in TypeScript md2json CLI at `lib/md2json/dist/cli.js` (no Java dependency).
- `lib/md-to-json` directory has been removed.

## [v2.0.0-alpha.32] – 2020-02-21

### Fixed

- Fix insertion of version and description in generated `package.json`
- md-to-json part at Java 11 (by updating [Gradle](https://gradle.org/) to 6.2)

## [v2.0.0-alpha.31] – 2018-08-09

### Added

- Publish `ultimate-comparison` on npmjs.org [#67](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/67)
- Add extraction of missing information from comparison data [#89](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/89)
- Add global style file to configuration folder
- Add permanent display of all references [#18](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/18)
- Add references to details page [#16](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/16)
- Add tooltips for details page
- Add word-break property for tooltips
- Enabling and disabling elements
- Clicking labels for filtering

### Changed

- Introduction of Angular 5 [#30](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/30)
- Introduction of Redux [#117](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/117)
- Change some styles
- Change output directory location
- Replaced angular2-select with ng2-select

### Breaking Changes

- Restructure comparison configuration [#128](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/128)

### Fixed

- Improved foreground colors when auto assigning
- Fixed problem with sorting `repo` columns [#114](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/114)
- Fixed problem on first load after restart
- Fix moving content when modal opened [#26](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/26)
- Fix quote markdown to json converting
- Fix Md2Json imports
- Add expand and shrink option for table [#90](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/90)

### Removed

- Remove [pandoc](https://pandoc.org/) dependency [#113](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/113)

## 1.0.0 – 2017-08-24

### Added

- This file
- Static VersionInformation class
- Section about difference of `update` and `master` branch in README.md
- Added force push for deployment
- Moved deployment to .travis.yml
- Added tslint
- Added unknown label for empty values
- Enabling and disabling elements

### Fixed

- Rate Limit exceeded for GitHub for up to 60 elements.

[Unreleased]: https://github.com/cbruyndoncx/awesome-comparisons/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/cbruyndoncx/awesome-comparisons/compare/v2.0.0-alpha.32...v3.0.0
[v2.0.0-alpha.32]: https://github.com/ultimate-comparisons/ultimate-comparison-BASE/compare/v2.0.0-alpha.31...v2.0.0-alpha.32
[v2.0.0-alpha.31]: https://github.com/ultimate-comparisons/ultimate-comparison-BASE/compare/1.0.0...v2.0.0-alpha.31
