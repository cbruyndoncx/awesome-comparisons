# Dataset Manifest Configuration

Configuration file that enumerates all datasets supported by the comparison site, defining their metadata and asset locations.

## Target

[@generate](../../configuration/datasets.manifest.json)

## Capabilities

### Dataset enumeration

Provides a structured list of available datasets with their metadata including display names, descriptions, asset directories, and visual styling options. Each entry also specifies the source markdown/configuration/asset files used during the build so tooling can regenerate every dataset consistently.

### Default dataset specification

Identifies which dataset should be used as the default when no specific dataset is requested by the user.

### Asset directory mapping

Maps each dataset to its corresponding asset directory containing the required data files (comparison.json, data.json, description.md, style.css) and the input sources needed to build them.

### Visual customization support

Allows datasets to specify optional accent colors and icons for visual differentiation in the UI.

### Build metadata for tooling

Includes a `sources` object per dataset listing the markdown directory plus configuration, description, and style files so the gulp pipeline can iterate through every dataset definition.

## API

```json { .api }
{
  "datasets": [
    {
      "id": "default",
      "displayLabel": "Default Dataset",
      "shortDescription": "Primary comparison dataset",
      "description": "The main comparison dataset built from the production markdown files.",
      "assetDirectory": "assets/generated/default/",
      "accentColor": "#007bff",
      "icon": "default-icon.svg",
      "isDefault": true,
      "sources": {
        "dataDir": "data",
        "config": "configuration/comparison.yml",
        "description": "configuration/description.md",
        "style": "configuration/style.css"
      }
    },
    {
      "id": "example", 
      "displayLabel": "Example Dataset",
      "shortDescription": "Lightweight sample dataset",
      "description": "A starter dataset rendered from data_example/ using the shared comparison-default.yml configuration.",
      "assetDirectory": "assets/generated/example/",
      "accentColor": "#28a745",
      "icon": "experimental-icon.svg",
      "isDefault": false,
      "sources": {
        "dataDir": "data_example",
        "config": "configuration/comparison-default.yml",
        "description": "configuration/description.md",
        "style": "configuration/style.css"
      }
    }
  ]
}
```

## Dependencies

### Build tooling integration

Build processes must iterate over this manifest to ensure each dataset has the required files (comparison.json, data.json, description.md) emitted inside its assetDirectory.

### Angular assets pipeline

The manifest file must be copied from configuration/ into the Angular assets pipeline (e.g., src/assets/configuration/datasets.manifest.json) so DatasetManifestService can fetch it at runtime.

### JSON formatting requirements

Maintain 2-space indentation and alphabetical ordering by dataset id within the datasets array for consistency and readability.
