# Ultimate Comparisons — v3 (multi-dataset)

![Checks](https://github.com/ultimate-comparisons/ultimate-comparison-framework/workflows/Checks/badge.svg)

> This repository is a v3 fork of the Ultimate Comparison Framework. v3 adds multi-dataset support, dataset-aware tooling, and updated build/publish workflows.



> This is the ultimate comparison framework written in [Angular](https://angular.io/).
> This repository is a v3 fork; the original package is published as [ultimate-comparison](https://www.npmjs.com/package/ultimate-comparison).
>
> Scientifically interested? - Read on at our paper [The Ultimate Comparison Framework](http://ceur-ws.org/Vol-2575/paper9.pdf).
>
## Create your own ultimate comparison (v3)

v3 provides a repository helper CLI called `awcmp-cli` (replacing the older `uc` helper). Use `awcmp-cli` to scaffold datasets non-interactively or use the repository npm scripts (data:prepare, dev, build) directly. Note: the v2 `uc` command is deprecated — use `awcmp-cli` or the npm scripts instead.

Quick steps to create and run a comparison:

1. Create a dataset directory (for example `datasets/my-comparison`) and add the required files (description.md, comparison.yml, and your entry markdown files).

```bash
mkdir -p datasets/my-comparison
# add description.md, comparison.yml and your markdown data files
```

2. Add a dataset descriptor (dataset.yaml or dataset.json) with at least `id` and `path` and add it to the top-level `datasets:` configuration if applicable.

3. Install dependencies and prepare data (the data preparation step compiles and runs the md->JSON converter):

```bash
npm install
npm run data:prepare -- --dataset my-comparison
```

4. Start the demo locally or build for production using the repository scripts:

```bash
npm run dev -- --dataset my-comparison
# or
npm run build -- --dataset my-comparison
```

See `docs/uc-v3/` for examples, configuration details and migration guidance from v2.

### Configuration

The configuration files are located in the `configuration` directory.

`description.md`: It contains the description of your comparison which can be seen by visitors.
It is located underneath the headline of your comparison.
![Description location on page](https://cdn.rawgit.com/ultimate-comparisons/ultimate-comparison-BASE/85cc1e93/docs/images/descritpion.png)

`comparison-example.yml`: Example configuration file containing comments on fields to explain their meaning.

`comparison-default.yml`: Default configuration, intended as backup of your local comparison.

`comparison.yml`: The used configuration. Missing values are taken from `comparison-default.yml` and written back into this file.
A `comparison.yml` has following attributes:

- `title`: The title of the comparison. It is the headline of the page.
  ![Title location on page](https://cdn.rawgit.com/ultimate-comparisons/ultimate-comparison-BASE/85cc1e93/docs/images/title.png)
- `subtitle`: The subtitle of the comparison. It is next to the headline of the page.
  ![Subtitle location on page](https://cdn.rawgit.com/ultimate-comparisons/ultimate-comparison-BASE/85cc1e93/docs/images/subtitle.png)
- `selectTitle`: It is the headline for the search criteria, meaning that the area meant to enter search parameters uses this as headline.
- `tableTitle`: It is the headline for the table, meaning that the area containing the table uses this as headline.
  ![Title of the table on page](https://cdn.rawgit.com/ultimate-comparisons/ultimate-comparison-BASE/85cc1e93/docs/images/tabletitle.png)
- `repository`: The link to the repository containing the comparison.
- `header`: The heading of the details page
    - `nameRef`: Heading of details page (field name) (1)
    - `labelRef`: Which label to add to the heading of the details page (field name) (2)
    - `urlRef`: Which url to show next to the heading of the details page (field name) (3)
  ![Details header construction](https://cdn.rawgit.com/ultimate-comparisons/ultimate-comparison-BASE/85cc1e93/docs/images/detailsheader.png)
- `body`: The body of the details page
    - `title`: The heading of the used field (1)
    - `bodyRef`: The field to use as content of the body (2). The default configuration points to `ShortDescription`, which is populated from the first paragraph of each comparison entry.
  ![Details body construction](https://cdn.rawgit.com/ultimate-comparisons/ultimate-comparison-BASE/85cc1e93/docs/images/detailsbody.png)
- `criteria`: List of fields that all comparison elements use. The attributes for each criteria are:
    - `name`: The display name of the criteria. Type: `string` (1)
    - `search`: Whether a text box should be added to the search form. Allowed values: `true` (1), `false`
    - `table`: Whether it should be included in the comparison table by default. Allowed values: `true` (2), `false`
    - `detail`: Whether it is in the detail page. Allowed values: `true`, `false`
    - `type`: The content type of the field. Allowed values: `url`, `markdown`, `text`, `label`, `rating`, `repository`
    - `andSearch`: Whether the search should be **match all** (`true`) or **match one** (`false`). Allowed values: `true` (3), `false` (3)
    - `values`: All allowed values the field can assume. Values can have the following attributes:
        - `description`: Part of the tooltip for every instance of the value. Type: `string`
        - `class`: CSS-class of the label. Type: `string` (label-only)
        - `backgroundColor`: The background color of the label. Applies only if no class is given. Type: `string` (label-only)
        - `color`: The text color of the label. Applies only if no class is given. Type: `string` (label-only)
        - `display`: Optional alternate text/emoji to render inside the grid/detail chips (falls back to the value name).
        - `displayHtml`: Optional inline HTML snippet (sanitized at runtime) for custom visuals such as SVG icons or checkmarks.
        - `minAge`: The minimum age of the last commit to apply this value. Type: `number` (repository-only)
        - `minAgeUnit`: The unit to apply to the minAge attribute. Allowed values: https://momentjs.com/docs/#/durations/as-iso-string/ (repository-only)
        - `maxAge`: The maximum age of the last commit to apply this value. Type: `number` (repository-only)
        - `maxAgeUnit`: The unit to apply to the maxAge attribute. Allowed values: https://momentjs.com/docs/#/durations/as-iso-string/ (repository-only)
    - `placeholder`: Text shown in the search bar if it is empty (4)
    - `rangeSearch`: Changes search to allow searching for number ranges. It allows searching for numbers and ranges of numbers. Only supports integers. (5)
    ![Various elements of criteria on the page](https://cdn.rawgit.com/ultimate-comparisons/ultimate-comparison-BASE/85cc1e93/docs/images/variouselements.png)

The framework reserves the first table column for the `Name`/`id` field and always places `ShortDescription` as the second column. Remaining table columns follow their configured `order` values.

Datasets declared in `configuration/datasets.manifest.json` can now reuse shared configuration fragments by specifying `sources.configDefaults`. Provide one or more YAML paths (e.g. `["configuration/comparison-default.yml", "configuration/defaults/groups.yml", "configuration/defaults/groups-advanced.yml", "configuration/defaults/value-displays.yml"]`) to pull in centrally maintained criteria groups or other defaults ahead of each dataset's local `comparison.yml`.

### Define comparison elements

For each thing, create a markdown file in `data`.
You can base it on `template.md`.
If one column depends on a repository (repo-attribute in `comparison.yml` true), you have to define a `## Repo` section and add the repository as first list item, eg:

```markdown
## Repo
- https://github.com/ultimate-comparisons/ultimate-comparison-BASE
```

## Update your comparison

To update the ultimate comparison framework that your comparison uses, just run `npm update` in the directory that contains your comparison.
It installs the latest version with the same major version number (ie. `2.x.x`).

## Development hints

When developing on the framework itself, these might be helpful hints:

### Linux

Use node 12.

### Windows

Development on Windows currently does not work.

- `npm install --global --production windows-build-tools`
  - Alternative: - `choco install python2 vcredist2013` (currently does not fully work)
- `node_modules/.bin/gulp default --gulpfile=/c/Users/login/git-repositories/uc/ultimate-comparison-BASE/lib/gulp/gulpfile.js --dir=node_modules/ultimate-comparison`

## License

The code is licensed under [MIT], the content (located at `data`) under [CC0-1.0].

  [CC0-1.0]: https://creativecommons.org/publicdomain/zero/1.0/
  [MIT]: https://opensource.org/licenses/MIT
