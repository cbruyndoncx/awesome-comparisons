# Troubleshooting — v3 Migration & Build

This troubleshooting guide focuses on practical problems you may encounter while migrating from v2 to v3 or when building/publishing v3 datasets.

1) Dataset not discovered / missing from demo

Symptoms: Demo UI starts but your dataset does not appear in the dataset selector.

Checks and fixes:
- Ensure dataset descriptor exists and has an `id` and `path` (e.g., `datasets/default/dataset.yaml`).
- Verify top-level config includes the dataset under `datasets:` or that the discovery logic points to your dataset folder.
- Check logs produced by the demo or discovery script for errors parsing YAML or JSON. YAML parsing errors are common after manual edits.
- Confirm file permissions allow the build process to read dataset files.

2) Build fails due to missing md2json converter

Symptoms: Build errors referencing md2json or MD_TO_JSON_COMMAND.

Checks and fixes:
- Ensure the environment variable `MD_TO_JSON_COMMAND` is set and points to a working converter.
- If your CI runs inside a fresh environment, either install a converter in the job or commit a small converter script into the repo and invoke it in CI.
- Run the converter locally on a sample dataset to verify behavior before hooking it into CI.

3) Assets (fonts/CSS) missing after publish

Symptoms: Fonts or CSS are not loaded on published pages.

Checks and fixes:
- Confirm the CI step that copies static assets to `docs/<dataset-id>/` or the site root ran successfully.
- Check relative paths in built artifacts. If you move artifacts into a subdirectory, asset URLs may need prefix adjustments.
- Verify the built dist includes `assets/` and fonts; if not, update the build step to include them.

4) CLI flag not recognized (--dataset)

Symptoms: The CLI/script you use to build does not accept `--dataset`.

Checks and fixes:
- Not all repos implement a uniform CLI. Inspect `package.json` scripts and repo-specific tooling to see if dataset flags are supported.
- If your repo doesn't accept `--dataset`, set environment variables (e.g., DATASET=id) or update the script to pass dataset context to build steps.

5) Broken links in published site

Symptoms: Links that pointed to v2 output locations return 404.

Checks and fixes:
- Search your site and CI scripts for hard-coded v2 paths. Update them to dataset-scoped paths or add redirects.
- If you use a combined site under `docs/`, ensure index pages link to `docs/<dataset-id>/index.html` rather than old flat routes.

6) Tests failing after migration

Symptoms: Unit or integration tests that passed under v2 fail in v3.

Checks and fixes:
- Check test fixtures paths and dataset context in tests. Many tests rely on path layout or sample data locations.
- Run tests with a single dataset to isolate failures: `npm test -- --dataset default` (if supported).
- Update tests to load dataset descriptors or inject dataset context where required.

7) Publishing fails due to Git commit errors in CI

Symptoms: CI fails when trying to commit/force push built docs.

Checks and fixes:
- Ensure the CI job has permissions to push or uses a dedicated deploy key/token.
- Use actions/checkout with the appropriate fetch-depth and configure committer info before git commit.
- Consider pushing to a dedicated branch (gh-pages) instead of committing to main.

8) Dataset IDs collide or conflict

Symptoms: Two datasets use the same id which causes overwrites in build artifacts.

Checks and fixes:
- Ensure each dataset has a unique id. Make dataset IDs explicit in descriptors and top-level config.
- Validate dataset IDs in CI before running builds and fail fast when duplicates are found.

If you still have trouble, collect the following and open an issue or ask for help:
- The dataset descriptor (dataset.yaml/json).
- The top-level `configuration/` entries or datasets.manifest.json.
- The package.json scripts used to build/publish.
- CI workflow file (if publishing on CI).
- Any console/log output showing errors.
