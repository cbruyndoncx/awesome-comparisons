# Update YOUR Comparison (v3)

This guide explains how to set up or update a comparison to work with v3 of the Ultimate Comparison Framework.

## Quick start — create a new dataset

1. Create a directory for your dataset and initialize the comparison skeleton (example using aie-model as reference):

```bash
mkdir -p datasets/my-comparison
cd datasets/my-comparison
# create description.md and a config/comparison.yml
# See datasets/aie-model/ for a working example
```

2. Add your comparison data files (markdown entries) under `datasets/my-comparison/data/`.

3. Register the dataset in `configuration/datasets.manifest.json` by adding an entry like:

```json
{
  "id": "my-comparison",
  "displayLabel": "My Comparison",
  "assetDirectory": "assets/generated/my-comparison/",
  "sources": {
    "dataDir": "datasets/my-comparison/data",
    "config": "datasets/my-comparison/config/comparison.yml",
    "style": "configuration/style.css",
    "configDefaults": [
      "configuration/comparison-default.yml",
      "configuration/defaults/general-licensing.yml"
    ]
  }
}
```

4. Save and run with dataset targeting (see below).

## Configuration overview

- Put configuration pieces under `configuration/` and use `sources.configDefaults` in dataset manifest entries to reuse shared config fragments.
- Each dataset can override default configuration keys by providing a local `comparison.yml` (or `comparison-default.yml`) inside the dataset folder.

## Repo field / repository-dependent columns

If you use repository-aware columns (where the column depends on a repository URL), include a `## Repo` section in your markdown entries with the repo URL as the first list item.

Example entry snippet:

```markdown
## Repo
- https://github.com/your/project

## ShortDescription
- This is an example entry
```


## Running & developing locally

- Ensure you have a node_modules directory (run `npm install` in the top-level repository if needed).
- Start the demo with dataset selection if available (check your package.json scripts). Typical command:

```bash
npm run dev -- --dataset my-comparison
```

or for per-dataset builds:

```bash
npm run build -- --dataset my-comparison
```


## Notes on md2json (data conversion)

The md -> JSON conversion is handled automatically during the data preparation step (`npm run data:prepare` / `npm run data:watch`). The project includes npm scripts to compile and run the md2json converter (TypeScript) as part of the normal data preparation workflow, so setting an environment variable such as `MD_TO_JSON_COMMAND` is not required.

If you are running builds or CI in a fresh environment, ensure your job runs the `data:prepare` step (or the equivalent npm script) so the converter is compiled and the datasets are transformed into the JSON artifacts the demo consumes.

Example (local):

```bash
# prepare data (compiles converter if needed, then converts markdown to JSON)
npm run data:prepare
```

If you prefer to provide a custom converter, add or override a script in package.json (for example, an `md2json:run` script) and call it from your build steps.

## Where to put descriptions and table configuration

- `description.md` in your dataset folder controls the site description for that dataset.
- `comparison.yml` controls criteria, ordering and table fields. See `configuration/` for examples.

## Help & examples

See `docs/uc-v3/` for detailed migration examples and CI/publish templates.
