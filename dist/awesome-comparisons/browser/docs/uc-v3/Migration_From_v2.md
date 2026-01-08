# Migration from v2 to v3

This guide helps maintainers migrate their v2-based comparisons to the v3 fork. It covers both simple single-dataset migrations and multi-dataset reorganizations.

Table of contents

- Quick migration (single dataset)
- Multi-dataset migration
- Configuration notes
- Build & CLI usage
- CI and publishing notes
- Troubleshooting

## Quick migration (single dataset)

This is the minimal path for small projects that previously relied on the v2 single-flat layout.

1. Create a dataset directory and descriptor:

```bash
mkdir -p datasets/default
cat > datasets/default/dataset.yaml <<'YAML'
name: Default Dataset
id: default
path: datasets/default
title: "Default Dataset"
YAML
```

2. Update top-level config (if you have one) to include the dataset entry:

```yaml
datasets:
  - id: default
    path: datasets/default
    title: "Default Dataset"
```

If you don't have a top-level config, many v3 tools will auto-detect a single dataset.

3. Move your data and local configuration (if present) into the dataset directory or set the dataset `path` to your existing data location.

4. Re-run the build using the dataset flag if available:

```bash
npm run build -- --dataset default
# or
DATASET=default npm run build
```


## Multi-dataset migration

1. Create directories for each dataset and add dataset descriptors (`dataset.yaml` or `dataset.json`) with at least `id` and `path`.

2. Move the related data files into each dataset folder. Example:

```bash
mkdir -p datasets/project-a datasets/project-b
# move markdown files
git mv data/*.md datasets/project-a/
# repeat for other datasets
```

3. Update top-level config to include an entry under `datasets:` for each dataset.

4. Update build and CI to run per-dataset. Example pseudo-code:

```bash
for id in project-a project-b; do
  npm run build -- --dataset "$id"
done
```

## Configuration notes

- v3 introduces a top-level `datasets:` array to enumerate datasets and provide per-dataset overrides.
- Many existing single-dataset keys are still recognized for compatibility, but you should migrate to the dataset-aware keys for future-proofing.
- See `configuration/` for examples of per-dataset defaults and config fragments.

## Build & CLI usage

- New CLI flags: `--dataset <id>` and `--all-datasets` (implementation may vary by repo script — check package.json scripts and any custom tooling).
- Build outputs are dataset-scoped: by default the demo and docs are intended to be published under `docs/<dataset-id>/` or `public/<dataset-id>/` depending on CI and configuration.

## CI & publishing notes

- For GitHub Pages the recommended approach is to use `docs/` and place dataset-specific content under `docs/<dataset-id>/`.
- Alternatively publish separate branches or a combined site with a dataset selector UI.

## Troubleshooting

- If the demo does not show a dataset, check dataset discovery (paths and dataset descriptor `id`/`path`).
- If build outputs are missing CSS/fonts, verify the static asset copy step in your CI or local build.


## References

- Plans and migration rationale: `plans/`
- Example dataset manifest: `configuration/datasets.manifest.json`
