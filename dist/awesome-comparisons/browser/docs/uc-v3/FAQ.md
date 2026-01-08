# FAQ — v3 (Frequently Asked Questions)

This FAQ collects short answers to common questions about v3 of the Ultimate Comparison Framework.

Q: What is the main difference between v2 and v3?
A: v3 introduces multi-dataset support. Repositories can host multiple datasets (each with its own data and configuration). Tooling, build outputs, and many internal APIs are dataset-aware.

Q: Do I have to reorganize my repository to use v3?
A: Not strictly. v3 attempts to support simple single-dataset repositories automatically, but migrating to a dataset directory layout (e.g., `datasets/<id>/`) is recommended for compatibility and future-proofing.

Q: How do I tell the tooling which dataset to build or serve?
A: Use the dataset context mechanisms provided by your repo scripts. Common patterns:
- CLI flags: `--dataset <id>` or `--all-datasets`
- Environment variables: `DATASET=<id>`
- Tooling that reads `configuration/datasets.manifest.json` or top-level `datasets:` entries

Q: Does v3 still require Java for md2json conversion?
A: No. v3 removed the Java md-to-json pipeline. The md -> JSON conversion runs during the repository's data preparation step (e.g., `npm run data:prepare`) and the converter is built and executed via the project's npm scripts. You do not need to set an `MD_TO_JSON_COMMAND` environment variable when using the standard data flow.

Q: Where should I put site artifacts for GitHub Pages?
A: The recommended approach is to use the `docs/` directory and place dataset-scoped artifacts under `docs/<dataset-id>/` or a combined site with a dataset selector UI. Alternatively, you can continue to publish to `gh-pages` branch if preferred.

Q: Will custom scripts I wrote for v2 still work?
A: They may need updates if they depend on v2 path/layout or internal API behavior. Key things to check: output path expectations, dataset discovery, and any direct calls to internal functions that are now dataset-aware.

Q: How do I structure per-dataset configuration?
A: Each dataset can contain a local `comparison.yml` or `comparison-default.yml`. Top-level `configuration/` can include shared fragments. Use `sources.configDefaults` in dataset entries to reuse shared config.

Q: Can I run tests per-dataset?
A: Yes. The test harness in v3 is organized to run tests per-dataset. Look at package.json scripts and test configuration; you may need to pass a dataset argument to run selectors or load fixtures.

Q: How do I contribute to v3?
A: Follow the repository's Agent/Tessl guidelines (AGENTS.md, RULES.md). Create ADRs for significant design decisions. For docs contributions, update `docs/uc-v3` or the v2 docs if relevant and open a PR describing the change.

Q: Is there a migration script?
A: There is no universal migration script included by default because repo layouts vary widely. The migration guide contains sample commands and pseudocode; if you want, we can generate a tailor-made migration script for your repo layout.

Q: How should I name my dataset IDs?
A: Use simple, URL-safe slugs (lowercase letters, digits, hyphens). The ID is used in paths and build outputs, so avoid characters that require escaping.

Q: Will v3 break existing published sites?
A: If your site/publishing workflow expects v2 paths, you may need to update CI scripts or move artifacts. v3 favors dataset-scoped paths; verify your CI and external links after migration.

Q: Where can I find more help?
A: See the docs in `docs/uc-v3/`, the plans/ directory for design rationale and migration examples, and open an issue with reproduction details if you run into a problem.
