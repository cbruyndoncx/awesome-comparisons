# Release Notes — v3.0.0 (User-facing)

**Date:** 2025-10-28

This document is a concise, user-facing summary of the v3 fork and recommended migration steps to move from v2 to v3. It omits low-level implementation detail and focuses on what users need to know and do.

## Overview

v3 introduces multi-dataset support for repositories, a rebuilt md -> json converter (no Java required), UI improvements (dataset selector, grouping, theming), and updated docs/demo publishing for GitHub Pages. The demo site now supports selecting and viewing multiple datasets from the same repo.

## What's new (short)

- Multi-dataset repository support (per-dataset metadata, discovery, and per-dataset build outputs).
- Dataset selector UI (tab strip) in the demo app and dataset-aware filters/grouping.
- md2json converter rewritten in TypeScript; no Java build dependency required.
- Docs/demo moved to `docs/` for GitHub Pages; build pipeline updated accordingly.
- Styling, theming (light/dark), improved group/filter UX, and content improvements for multiple categories.

## Key breaking changes

- Tools and internal APIs are dataset-aware. Many functions now expect a dataset identifier/context.
- Build outputs are dataset-scoped (e.g., `public/<dataset-id>/` or `docs/<dataset-id>/` depending on your CI). Scripts that expect old flat paths will need updates.
- Repository layout: v3 expects dataset files organized per-dataset (e.g., `datasets/<id>/`). Existing single-flat layouts must be migrated.

## Quick migration (single dataset)

If your project contains a single dataset and you want a minimal migration:

1. Create a dataset directory and descriptor (example):

```bash
mkdir -p datasets/default
cat > datasets/default/dataset.yaml <<'YAML'
name: Default Dataset
id: default
path: datasets/default
title: "Default Dataset"
YAML
```

2. Update top-level config to include the dataset entry. If you have a `config.yml`/`config.yaml` or package config, add:

```yaml
datasets:
  - id: default
    path: datasets/default
    title: "Default Dataset"
```

> If you don't have a top-level config, the tooling will often auto-detect a single dataset.

3. Re-run your build using the dataset flag if available:

```bash
# Example CLI (tooling depends on your repo's scripts)
# If the repo provides a script:
npm run build -- --dataset default
# Or use an environment variable:
DATASET=default npm run build
```

## Quick migration (multiple datasets)

1. Create one directory per dataset:

```bash
mkdir -p datasets/project-a datasets/project-b
# move files into each directory, e.g.:
# git mv data/*.md datasets/project-a/
```

2. Add a dataset descriptor for each dataset (`dataset.yaml` or `dataset.json`) with at least `id` and `path`.

3. Add entries to top-level config under `datasets:` for each dataset.

4. Update CI/build scripts to run per-dataset (or add a `--dataset` flag). Example building all datasets:

```bash
# Pseudocode; adapt to your CI
for id in default other; do
  npm run build -- --dataset "$id"
done
```

## Publishing to GitHub Pages (docs/ approach)

v3 stores the site build under `docs/` by default for GitHub Pages. Typical flow:

```bash
# Build the app/site (example)
npm run build
# Copy or move the built dist into docs/ (some commits already do this automatically)
cp -r dist/ultimate-comparison docs/
# Commit and push
git add docs && git commit -m "Publish v3 site to docs/" && git push origin main
```

If you prefer a dedicated `gh-pages` branch or per-dataset branches, adjust your CI to publish dataset-scoped artifacts to the correct location.

## Recommended verification steps

- Verify dataset discovery: run discovery or start the demo and confirm your dataset appears in the selector.
- Build the demo and open `docs/index.html` locally to check the dataset selector and sample visualizations.
- Run unit tests per dataset (if present).
- Confirm links and assets (fonts, CSS) are present after build; see recent commits for font fixes.

## Examples & Helpful Commands

- Create a dataset descriptor (example YAML provided above).
- Build for a dataset (example):

```bash
npm run build -- --dataset default
```

- Tagging the release locally:

```bash
git tag -a v3.0.0 -m "v3.0.0 — multi-dataset support"
git push origin v3.0.0
```

- Create a GitHub release with `gh` (if you use GitHub CLI):

```bash
# Requires GitHub CLI (gh) and that you're authenticated
gh release create v3.0.0 -t "v3.0.0" -n "Multi-dataset support, md2json TypeScript converter, UI improvements"
```

## Help & support

If you'd like, I can:

- Generate a step-by-step migration script that moves existing files into `datasets/` and creates dataset descriptors.
- Update `docs/` with a migration guide containing exact commands for your repository layout.
- Rebuild the demo site locally and update the `gh-pages` branch.

Tell me which of the above you'd like me to do next, or say "done" if this is sufficient.
