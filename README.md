# Awesome Comparisons

![Checks](https://github.com/ultimate-comparisons/ultimate-comparison-framework/workflows/Checks/badge.svg)

> **Awesome Comparisons** (formerly Ultimate Comparison Framework v2) is a powerful framework for creating feature-rich comparison websites. This version introduces breaking changes including multi-dataset support, an admin configuration interface, and shared criteria/groupings. The rename to "Awesome Comparisons" helps avoid confusion with the previous v2 npm package.

Built with [Angular](https://angular.io/), Awesome Comparisons provides a complete solution for building, managing, and publishing comparison sites with advanced features like dataset switching, visual configuration editing, and blueprint-based inheritance.

> Scientifically interested? Read the original paper: [The Ultimate Comparison Framework](http://ceur-ws.org/Vol-2575/paper9.pdf).

## Quick Start

### Creating a Comparison

Use npm scripts to create and manage datasets. The previous v2 `uc` command has been replaced with dataset-aware npm scripts.

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

See `docs/uc-v3/` for detailed documentation, examples, and migration guidance from v2.

## Key Features

### Multiple Datasets
- Host multiple comparison datasets in a single repository
- Dataset selector UI for easy navigation
- Per-dataset configuration, styling, and build outputs
- Unified or separate publishing options

### Admin Configuration Interface
- Visual configuration editor at `/admin` route
- Edit criteria, groups, and value displays without touching YAML
- Live diff preview with syntax highlighting
- Catalog tree for navigating all dataset configs
- Real-time validation and error reporting

### Shared Configuration
- Define criteria once, reuse across datasets
- Blueprint-based grouping inheritance
- Dataset-specific overrides
- Modular configuration fragments in `configuration/defaults/`

### Developer Experience
- TypeScript-based md2json converter (no Java required)
- Dataset-aware build system
- GitHub Pages publishing with `docs/` output
- Comprehensive documentation and troubleshooting guides

## Configuration

### Global Configuration

The `configuration/` directory contains global settings and shared configuration fragments:

- **`datasets.manifest.json`**: Dataset registry listing all available datasets with metadata, paths, and inheritance configuration
- **`comparison-default.yml`**: Global default configuration values
- **`defaults/`**: Shared configuration fragments (criteria definitions, groupings, value displays)
  - `general-licensing.yml`: License and pricing criteria
  - `groups-advanced.yml`: Advanced grouping blueprints
  - `value-displays.yml`: Common value display configurations

### Dataset Configuration

Each dataset in `datasets/{id}/` has its own configuration:

- **`config/comparison.yml`**: Dataset-specific configuration that overrides shared defaults
- **`data/`**: Markdown entry files for comparison items
- **`description.md`**: Dataset description shown below the title

### Comparison Configuration Attributes

A `comparison.yml` file has the following attributes:

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

### Configuration Inheritance

Datasets can reuse shared configuration by specifying `sources.configDefaults` in `configuration/datasets.manifest.json`:

```json
"sources": {
  "configDefaults": [
    "configuration/comparison-default.yml",
    "configuration/defaults/general-licensing.yml",
    "configuration/defaults/groups-advanced.yml",
    "configuration/defaults/value-displays.yml"
  ]
}
```

This inheritance system allows you to:
- Define criteria once, reuse across datasets
- Share grouping blueprints
- Override shared settings per dataset
- Maintain consistency while allowing customization

See [docs/uc-v3/Shared_Configuration.md](docs/uc-v3/Shared_Configuration.md) for details.

## Creating Comparison Entries

For each item to compare, create a markdown file in the dataset's `data/` directory (e.g., `datasets/my-comparison/data/`).

If a criterion has type `repository`, include a `## Repo` section with the repository URL as the first list item:

```markdown
## Repo
- https://github.com/ultimate-comparisons/ultimate-comparison-BASE
```

## Documentation

Comprehensive documentation is available in the `docs/uc-v3/` directory:

- **[Overview](docs/uc-v3/Overview.md)** - System architecture, key features, and concepts
- **[Update YOUR Comparison](docs/uc-v3/Update_YOUR_Comparison.md)** - Creating and updating datasets
- **[Admin Config Interface](docs/uc-v3/Admin_Config_Interface.md)** - Using the visual configuration editor
- **[Shared Configuration](docs/uc-v3/Shared_Configuration.md)** - Working with shared criteria and groupings
- **[Migration from v2](docs/uc-v3/Migration_From_v2.md)** - Upgrading from Ultimate Comparison v2
- **[CI & Deploy](docs/uc-v3/CI_and_Deploy.md)** - Publishing to GitHub Pages
- **[FAQ](docs/uc-v3/FAQ.md)** - Frequently asked questions
- **[Troubleshooting](docs/uc-v3/Troubleshooting.md)** - Common problems and solutions

Legacy v2 documentation is archived in `docs/uc-v2/`.

## Release process

Refer to [docs/release-workflow.md](docs/release-workflow.md) for the full checklist. In short:

- Update changelogs and bump the npm version if needed.
- Run `npm run release` to build the site and stamp the compact `vX.Y.Z.yymmdd` label.
- Tag the release using the generated label and publish it through GitHub releases (`gh release create <label>` is recommended).
- Debug builds (`npm run dev`, `npm run build`) never modify the stamped footer, so you can iterate locally without touching release metadata.

## Development

### Requirements

- Node.js 12+ (14+ recommended)
- npm 6+

### Development Server

```bash
npm install
npm run dev -- --dataset <dataset-id>
```

The development server will start at `http://localhost:4200`. Navigate to `/admin` to access the configuration interface.

### Admin Interface

The admin configuration interface is available at `/admin` when running the dev server:

```bash
npm run dev
# Then open http://localhost:4200/admin
```

Features:
- Visual YAML editor for criteria and groupings
- Live diff preview
- Catalog tree navigation
- Real-time validation

See [docs/uc-v3/Admin_Config_Interface.md](docs/uc-v3/Admin_Config_Interface.md) for usage details.

## License

The code is licensed under [MIT], the content (located at `data`) under [CC0-1.0].

  [CC0-1.0]: https://creativecommons.org/publicdomain/zero/1.0/
  [MIT]: https://opensource.org/licenses/MIT
