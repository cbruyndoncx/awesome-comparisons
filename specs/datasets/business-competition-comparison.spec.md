# Business Competition Comparison Metadata

Provides display metadata for business competition dataset comparisons including titles, subtitles, select titles, table titles, and criteria labels.

## Target

[@generate](../../datasets/business-competition/config/comparison.yml)

## Capabilities

### Defines dataset display titles

The YAML configuration provides the overall `title` and `subtitle` for the business competition comparison dataset. The title should be "Business Strategy & Competition" and the subtitle should be "Enterprise strategy snapshot across SWOT, Porter, BCG, and Gartner lenses."

### Defines selection dropdown label

The `selectTitle` key specifies the label used for dataset selection controls, set to "Filter Criteria".

### Defines table title

The `tableTitle` key sets the heading for data tables to "Business Strategy Comparison".

### Uses merged defaults for criteria

The `criteria` array should be empty to allow the dataset to use merged default column definitions from the system.

## Configuration

The `comparison.yml` file contains the following top-level keys:

- `title`: string – set to "Business Strategy & Competition".
- `subtitle`: string – set to "Enterprise strategy snapshot across SWOT, Porter, BCG, and Gartner lenses."
- `selectTitle`: string – set to "Filter Criteria".
- `tableTitle`: string – set to "Business Strategy Comparison".
- `criteria`: array – empty array to use merged defaults.

## Dependencies

### Dataset configuration standards

Adheres to the standard dataset metadata structure and naming conventions.
[@use](../dataset-metadata.spec.md)