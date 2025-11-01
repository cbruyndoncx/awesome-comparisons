# Comparison Template Export

Angular feature that lets users download a dataset-specific Markdown template of all comparison criteria grouped by feature grouping.

## Target

[@generate](../../../../src/app/components/comparison/settings/comparison-template-export.service.ts)
[@generate](../../../../lib/comparison-template/template-builder.js)
[@generate](../../../../lib/comparison-template/export-all-templates.js)
[@describe](../../../../src/app/components/comparison/comparison.component.ts)
[@describe](../../../../src/app/components/comparison/comparison.template.html)
[@describe](../../../../src/app/components/comparison/settings/comparison.settings.component.ts)
[@describe](../../../../src/app/components/comparison/settings/comparison.settings.template.html)

## Capabilities

### Generate Markdown template from active dataset

Creates a comprehensive Markdown template that includes every criterion from the active dataset, regardless of UI visibility or collapse state.

- Delegates Markdown assembly to a shared builder so UI-triggered and CLI-triggered exports remain identical, importing `buildTemplateDocument` directly from `lib/comparison-template/template-builder.js` with a standard ES module import and calling it without runtime fallbacks
- Template starts with dataset metadata including dataset ID and display label
- Maintains consistent group order matching FeatureGroupView
- Includes group label value with tooltip/instructional text when available, rendering guidance as HTML comments when absent
- Resolves dataset manifest entry, feature groups, and criteria map via `firstValueFrom` without chaining additional RxJS operators
- When building the criteria lookup, handle `Map`, plain objects, arrays, and generic `Iterable<[string, Criteria]>` collections without assuming an `entries()` helper
- Lists each child criterion or ungrouped criteria with its title, description, and a single instruction comment instead of repeating metadata tables
- For label-based criteria, enumerates possible values as a plain unordered list (no header, text only) and adds a single instruction comment telling authors to keep only relevant values, choose one Yes/No option or remove both if unknown, and capture any additional notes as indented `-` entries under the retained values
- Provides fallback behaviors when instructions or tooltips are missing, including comment-based guidance for undefined values

### Shared template builder module

Exports pure utilities that assemble comparison templates so they can run inside Angular services or Node CLI scripts.

- Provides a `buildTemplateDocument` helper that accepts dataset metadata (id, displayLabel, optional shortDescription), ordered feature groups, ungrouped criteria, and a criteria lookup map
- Builds the dataset header exactly as the UI exporter previously rendered it: H1 with display label, optional paragraph for `shortDescription`, then a bold `**Dataset ID:** <id>` line before the first section
- Normalizes headings, HTML comments, label value instructions, and placeholder bullets exactly once so both consumers share identical formatting, including preserving the configured order of label values (no alphabetic re-sorting)
- Exposes a reusable `normaliseText` helper that mirrors the Angular service behaviour for `{ template, variables }` objects, numbers, booleans, and strings, and ensures every comment/instruction invocation runs through that helper (e.g., `renderComment(normaliseText(...))`)
- Declares a shared `const CriteriaTypes = { LABEL: 'LABEL', MARKDOWN: 'MARKDOWN', TEXT: 'TEXT', RATING: 'RATING', REPOSITORY: 'REPOSITORY', NAME_URL: 'NAME_URL' }` (with optional aliases for older names) so comparisons use identical tokens without importing the gulp module, keeping the CLI dependency-free
- Normalizes incoming `criteria.type` strings by uppercasing and replacing hyphens with underscores before comparing against `CriteriaTypes`
- Uses `renderComment(group.label?.tooltip ?? group.label?.value ?? '')` for group-level guidance so empty values yield `<!-- -->` just like the browser exporter
- For label criteria, emits the instruction comment immediately before the value list and still appends the trailing `Add any supporting notes as indented "- " entries beneath the kept values.` comment after the list so the CLI matches the UI ordering
- Accepts label value collections provided as Maps, plain objects, or arrays and preserves the declared order when rendering the list
- Supplies a comment context with `id` and resolved `name` when calling `renderComment` for descriptions or instructions so template variables like `{name}` are expanded consistently
- Reuses the existing instruction logic (e.g., Yes/No guidance, free-text prompts) through a shared `buildCriteriaInstruction` helper so every criteria section emits the same single HTML comment the UI exporter used, placing it immediately before the placeholder list item or label values block even when a description is present; the helper must mirror the Angular service rules (detect Yes/No label values, return `null` for Markdown, and provide specific guidance for Text, Rating, Repository, and Name/URL types) and must not skip guidance merely because a description string exists
- The helper reproduces the exact wording from the Angular service:
  - `LABEL` with Yes/No options → `Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values.`
  - `LABEL` without both Yes/No → `Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values.`
  - `TEXT` → `Provide written details for <name>.` (falling back to the criteria id when the name is missing)
  - `RATING` → `Provide the rating value for <name> or remove if unknown.`
  - `REPOSITORY` → `List the relevant repository links for <name> or remove if not applicable.`
  - `NAME_URL`/default → `Add the appropriate content for <name>.` (falling back to "this section" when `name` is missing; if the criteria type is unknown or missing entirely, use the same sentence with "this section")
  - `MARKDOWN` → returns null so no redundant instruction comment is emitted
- Provides a `renderComment(value, context = {})` helper that first computes `const text = normaliseText(value, context);` and then applies the sanitization logic equivalent to the Angular service (`if (!text) return '<!-- -->'; return \\`<!-- ${sanitized} -->\\``); the service and CLI reuse this helper for group, description, and instruction comments
- Emits fallback comments for missing values (e.g., label criteria without configured values) using the shared comment helper, preserves whitespace rules, and trims trailing spaces before returning the Markdown string
- Exposes smaller helpers for dataset header, group sections, criteria sections, label value lists, and comment sanitization, and avoids any dependency on browser globals, Angular injection, or RxJS so it can run in Node without shims

### Template composition and formatting

Structures the Markdown template with proper hierarchy and formatting.

- Uses headers for groups and criteria organization (H1 for dataset, H2 for groups, H3 for criteria)
- Formats possible values as bullet lists using `- Value` items with plain text only (no header, no display markup, no per-value comments) and follows the list with an HTML comment reminding editors to add any supplementary explanation as nested `-` bullets
- For MARKDOWN criteria, relies on the criterion description comment (when present) and leaves a single `- ` placeholder (no extra instruction comment or fenced code block) so editors can write inline content
- Emits a dedicated \"Ungrouped Criteria\" section for any criterion not mapped to a FeatureGroupView
- Preserves consistent Markdown spacing: blank line before each heading, single blank line between value lists and next section, and no trailing spaces
- Expresses every instruction as an HTML comment positioned immediately before or after the related placeholder content, without prefix labels
- Keeps placeholder and editing guidance in HTML comments so the visible template remains tidy
- Normalizes Markdown output with no trailing spaces and proper blank line separation

### Command-line bulk export

Adds a Node-based CLI entry point so editors can regenerate every dataset template without opening the UI.

- Script lives at `lib/comparison-template/export-all-templates.js` and is exposed through an npm script `npm run templates:export`
- Reads dataset definitions from `configuration/datasets.manifest.json`, resolves each `assetDirectory`, and loads `comparison.json` plus optional `data.json` from either `src/<assetDirectory>` or `dist/<datasetId>`
- Reuses the shared builder to generate Markdown, ensuring command-line output matches the UI download exactly
- Normalizes configuration payloads by flattening criteria entries shaped as `{ "<id>": { ... } }` into objects with explicit `id` properties before passing them to the builder
- Normalizes criteria type tokens (uppercases and swaps hyphens for underscores) so shared instruction logic behaves consistently
- Writes each template to `<outputDir>/<datasetId>-comparison-template.md`, defaulting `outputDir` to `datasets/<datasetId>/config` (creating directories when needed); supports overrides via `--output` path and dataset filters via `--dataset id1,id2`
- Skips datasets whose assets are missing with a warning and fails the run if any template generation throws
- Prints a concise summary including counts of generated files so callers can script around the command

### File download functionality

Creates downloadable file with proper naming and encoding.

- Generates downloadable Blob with UTF-8 encoding
- Names file as `<datasetId>-comparison-template.md` with dataset ID lowercased and hyphenated
- Triggers download from settings dialog integration

### Settings dialog integration

Integrates template export functionality into the comparison settings interface.

- Adds "Download Template" button in comparison.settings.template.html alongside other settings actions with descriptive aria-label and tooltip
- Wires the click through ComparisonSettingsComponent via a new @Output to ComparisonComponent
- Hooks ComparisonComponent to call the export service and surface loading/disabled state when configuration or dataset data has not yet loaded
- Handles disabled state when no dataset or configuration is loaded and reflects this in the template button styling

## API

```typescript { .api }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComparisonTemplateExportService {
  
  /**
   * Builds a Markdown template from the active dataset configuration
   * @returns Promise<string> The generated Markdown template content
   */
  buildTemplate(): Promise<string>;
  
  /**
   * Downloads the generated template as a Markdown file
   * @returns Promise<void> Resolves when download is initiated
   */
  downloadTemplate(): Promise<void>;
}
```

## Dependencies

### Configuration and data services

Accesses active dataset configuration, groups, and manifest data to assemble template context.
[@use](../../../../src/app/components/comparison/configuration/configuration.service.ts)
[@use](../../../../src/app/components/output/feature-grouping.service.ts)
[@use](../../../../src/app/components/datasets/dataset-manifest.service.ts)
[@use](../../../../src/app/components/models/feature-grouping.model.ts)
[@use](../../../../lib/gulp/model/model.module.js)
[@use](../../../../lib/comparison-template/template-builder.js)

### NgRx store access

Retrieves current application state including feature groups and criteria map.
[@use](../../../../src/app/redux/uc.app-state.ts)
[@use](../../../../package.json#@ngrx/store)

### Browser APIs and DOM utilities

Handles file download functionality through browser document/window abstractions.
[@use](../../../../package.json#@angular/common)
[@use](../../../../package.json#@angular/core)

### RxJS utilities

Provides observable helpers used for dataset and state retrieval using `firstValueFrom` to capture single emissions without additional operators.
[@use](../../../../package.json#rxjs)

### UI integration points

Existing comparison components updated to surface the export control.
[@use](../../../../src/app/components/comparison/comparison.component.ts)
[@use](../../../../src/app/components/comparison/comparison.template.html)
[@use](../../../../src/app/components/comparison/settings/comparison.settings.component.ts)
[@use](../../../../src/app/components/comparison/settings/comparison.settings.template.html)

### Node CLI runtime

CLI script relies on Node built-ins for filesystem and path handling using CommonJS `const fs = require('fs');` and `const path = require('path');` statements (avoid the `node:` prefix so the code runs consistently across Node versions).
- Uses `fs` to read manifests, dataset assets, and write Markdown templates
- Uses `path` to resolve manifest entries and output locations relative to the repository
