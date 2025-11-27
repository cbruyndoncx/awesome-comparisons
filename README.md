# Awesome Comparisons

![Checks](https://github.com/ultimate-comparisons/ultimate-comparison-framework/workflows/Checks/badge.svg)

> **Awesome Comparisons** (formerly Ultimate Comparison Framework v2) is a powerful framework for creating feature-rich comparison websites with multi-dataset support, visual configuration editing, and shared criteria management.

Built with [Angular](https://angular.io/). Read the original paper: [The Ultimate Comparison Framework](http://ceur-ws.org/Vol-2575/paper9.pdf).

## Quick Start

```bash
npm install
npm run dev -- --dataset aie-model
## or launch the business strategy dataset
npm run dev -- --dataset business-competition
```

Then open `http://localhost:4200` (comparison) or `http://localhost:4200/admin` (config editor).

**→ Full guide:** [Creating Your Comparison](docs/uc-v3/Update_YOUR_Comparison.md)

## Key Features

- **Multi-dataset support** - Host multiple comparisons in one repository → [Learn more](docs/uc-v3/Overview.md)
- **Visual config editor** - Edit YAML at `/admin` with live preview → [Learn more](docs/uc-v3/Admin_Config_Interface.md)
- **Shared configuration** - Define criteria once, reuse across datasets → [Learn more](docs/uc-v3/Shared_Configuration.md)

## Documentation

**Start here:** [Documentation Index](docs/README.md)

**Quick links:**
- [Overview](docs/uc-v3/Overview.md) - Architecture and concepts
- [Update YOUR Comparison](docs/uc-v3/Update_YOUR_Comparison.md) - Create/update datasets
- [Migration from v2](docs/uc-v3/Migration_From_v2.md) - Upgrade guide
- [Admin Config Interface](docs/uc-v3/Admin_Config_Interface.md) - Visual editor guide
- [Shared Configuration](docs/uc-v3/Shared_Configuration.md) - Inheritance system
- [Business Toolkit](docs/uc-v3/Business_Toolkit.md) - Strategy frameworks + data authoring guide
- [FAQ](docs/uc-v3/FAQ.md) & [Troubleshooting](docs/uc-v3/Troubleshooting.md)

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev -- --dataset <dataset-id>

# Build for production
npm run build:prod

# Release (stamps version)
npm run release
```

**Admin interface:** Navigate to `/admin` when dev server is running.

See [docs/release-workflow.md](docs/release-workflow.md) for release process.

## License

Code: [MIT] | Content: [CC0-1.0]

  [CC0-1.0]: https://creativecommons.org/publicdomain/zero/1.0/
  [MIT]: https://opensource.org/licenses/MIT
