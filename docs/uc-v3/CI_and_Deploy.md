# CI & Deployment (v3)

This document contains recommendations and examples for running CI and publishing the v3 site and per-dataset artifacts.

## Publishing approaches

1. docs/ directory (recommended for GitHub Pages)
   - Build site and place artifacts under `docs/<dataset-id>/` (or a combined site with dataset selector). Commit `docs/` to main and let GitHub Pages serve the site.
2. gh-pages branch (separate branch)
   - Push built artifacts to `gh-pages` branch. Use actions/CI to target dataset-scoped directories.
3. Per-dataset branches/sites
   - Publish individual dataset sites if you require separate hosting for each dataset.

## Example: GitHub Actions workflow (per-dataset)

This pseudocode demonstrates building and publishing per-dataset artifacts with GitHub Actions.

```yaml
name: Build and Publish
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Install
      run: npm ci
    - name: Build & prepare data for datasets
      run: |
        for ds in "default" "other"; do
          # prepare data (compiles converter and generates JSON) for the dataset
          npm run data:prepare -- --dataset "$ds"
          # build the site for the dataset
          npm run build -- --dataset "$ds"
          mkdir -p docs/$ds
          cp -r dist/* docs/$ds/
        done
    - name: Commit docs
      run: |
        git config user.name "github-actions"
        git config user.email "actions@github.com"
        git add docs
        git commit -m "Publish site (datasets)" || echo "No changes to commit"
        git push
```

Adjust dataset list generation dynamically by scanning `configuration/datasets.manifest.json` or other dataset discovery logic.

## Notes on assets and fonts

- Ensure your CI copies static assets (fonts, CSS) into the built site directories.
- If fonts are missing, check build steps that copy or bundle assets and confirm the correct relative paths.

## Verification steps

- After publishing, open `https://<org>.github.io/<repo>/` and confirm the dataset selector shows entries.
- Verify per-dataset pages are reachable (e.g., `docs/default/index.html`).

## Troubleshooting

- If a dataset is missing from the site, confirm dataset discovery works locally and that the correct dataset descriptors were provided to the build.
- Ensure `npm run data:prepare` (or the equivalent data preparation script) runs successfully in CI before the build step so the md -> JSON conversion is executed. If you use a custom converter or non-standard data workflow, ensure the converter is available in the CI environment.
