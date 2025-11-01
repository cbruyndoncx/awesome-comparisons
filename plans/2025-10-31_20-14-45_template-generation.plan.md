# Plan: Add template generation spec for comparison criteria

Create a Tessl spec that describes generating comparison templates reflecting grouped criteria.

## Tasks

- [x] Review repository spec structure and existing related specs
  > **Bash**
  > ```json
  > {"command":["bash","-lc","ls"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Listed repository root to confirm specs and planning directories.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","ls specs"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Confirmed existing spec hierarchy under `specs/`.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","find specs -maxdepth 3 -type f -name '*.spec.md'"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Listed available specs to identify potential placement for the new feature.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","cat specs/app/components/comparison-component.spec.md"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed existing [specs/app/components/comparison-component.spec.md](../specs/app/components/comparison-component.spec.md) to understand current component coverage.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","cat specs/app/components/output/table-feature-grouping.spec.md"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Checked [specs/app/components/output/table-feature-grouping.spec.md](../specs/app/components/output/table-feature-grouping.spec.md) for related grouping functionality.
- [x] Define scope/details for new template generation feature spec
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"template\" src/app/components/comparison -n"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Located template usages in comparison module to understand existing download triggers.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/comparison/settings/comparison.settings.component.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed [src/app/components/comparison/settings/comparison.settings.component.ts](../src/app/components/comparison/settings/comparison.settings.component.ts) inputs/outputs and grouping helpers for potential integration points.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/models/feature-grouping.model.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Inspected [src/app/models/feature-grouping.model.ts](../src/app/models/feature-grouping.model.ts) to confirm group/criteria data structures required for template export.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"xlsxDownload\" -n"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Checked where XLSX export flows originate to compare with planned template export trigger.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"downloadXlsx\" -n src/app"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Mapped XLSX handling within [src/app/components/comparison/comparison.component.ts](../src/app/components/comparison/comparison.component.ts) for reuse patterns.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","ls datasets"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Listed dataset directories to confirm per-dataset asset structure.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","ls datasets/aie-model"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Verified dataset asset folders (`config`, `data`, manifest) for sample dataset `aie-model`.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","ls datasets/aie-model/data"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Viewed Markdown records to understand expected template target format.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,80p' datasets/aie-model/data/codegeex.md"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Examined [datasets/aie-model/data/codegeex.md](../datasets/aie-model/data/codegeex.md) structure showing criteria headings and narrative content.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","ls datasets/aie-model/config"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Confirmed configuration presence alongside data entries.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","cat datasets/aie-model/config/comparison.yml"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed [datasets/aie-model/config/comparison.yml](../datasets/aie-model/config/comparison.yml) for criteria metadata, descriptions, and values.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"groups\" -n datasets/aie-model"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Checked dataset config for explicit group declarations (none found, implying runtime grouping assembly).
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"featureGroups\" -n"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Located store references to `featureGroups` supporting full-state access for export.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/output/feature-grouping.service.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Analyzed [src/app/components/output/feature-grouping.service.ts](../src/app/components/output/feature-grouping.service.ts) to capture grouping derivation and label metadata.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"tooltip\" -n"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Identified tooltip propagation within generated assets to ensure instructions are sourced correctly.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"template generation\" -n"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Verified that no prior template generation features exist in specs or code.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"dataset template\" -n"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Confirmed lack of dataset template exports to justify new functionality.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '150,230p' src/app/components/comparison/comparison.template.html"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Studied [src/app/components/comparison/comparison.template.html](../src/app/components/comparison/comparison.template.html) settings dialog bindings for hook point.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/output/generic-table.component.html"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed [src/app/components/output/generic-table.component.html](../src/app/components/output/generic-table.component.html) to understand tooltip usage tied to criteria descriptions.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/output/generic-table.component.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Confirmed [src/app/components/output/generic-table.component.ts](../src/app/components/output/generic-table.component.ts) exposes full criteria map for instructions.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/comparison/configuration/configuration.service.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Assessed [src/app/components/comparison/configuration/configuration.service.ts](../src/app/components/comparison/configuration/configuration.service.ts) hydration flow for dataset-specific metadata resolution.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"featureGroupingService\" -n src/app/components/comparison/configuration/configuration.service.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Located grouping parsing invocation to ensure export can reuse processed structure.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '300,380p' src/app/components/comparison/configuration/configuration.service.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Confirmed store dispatch of grouped criteria for export consumption.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","ls lib/gulp"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Located model module sources used by configuration metadata.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","ls lib/gulp/model"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Identified criteria/value type declarations supporting template formatting.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/model.module.d.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Pulled TypeScript typings for criteria/data models to plan strongly typed export helpers.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/criteria/criteria.d.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed `Criteria` shape for description and values fields used in template.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/criteria/criteriaValue.d.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Captured possible value metadata (`display`, `description`) for inclusion in export instructions.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/data/label.d.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Noted label tooltip properties that inform group-level instructions.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/data/tooltip.d.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Confirmed tooltip text/html fields available for formatting guidance.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/redux/uc.app-state.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Verified [src/app/redux/uc.app-state.ts](../src/app/redux/uc.app-state.ts) exposes `featureGroups`, `columns`, and `criterias` needed for full export context.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/datasets/dataset-manifest.service.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed [src/app/components/datasets/dataset-manifest.service.ts](../src/app/components/datasets/dataset-manifest.service.ts) to determine how to obtain active dataset identifiers and labels for file naming.
  > ---
  > **Summary**
  > Consolidated requirement: from the settings dialog trigger a dataset-aware export that gathers `FeatureGroupView` structures and full `Criteria` metadata (including hidden fields) to build a Markdown template listing each group, all criteria, possible label values, and descriptions/tooltips for guidance, named per active dataset.
- [x] Create Tessl spec describing the feature
  > **Tessl Build**
  > ```json
  > {"spec":["specs/app/components/comparison/comparison-template-export.spec.md"]}
  > ```
  > Re-ran build after dependency update; service regenerated and dependency verification succeeded.
  > ---
  > **Summary**
  > Finalized spec detailing dataset-aware template export service, Markdown formatting rules, file download mechanics, and settings dialog integration.
- [x] Integrate template download control into settings dialog
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/comparison/settings/comparison.settings.template.html"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed settings template structure to determine placement for the export control.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.component.ts
  > ... (added templateDownloadDisabled input, templateDownload output, and requestTemplateDownload helper)
  > *** End Patch
  > ```
  > Wired new input/output bindings enabling the template export action.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.template.html
  > ... (inserted Exports section with tooltip-wrapped Download Template button)
  > *** End Patch
  > ```
  > Injected Download Template button with tooltip and aria-label inside the settings dialog.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.component.css
  > ... (added styling for settings-export container and button states)
  > *** End Patch
  > ```
  > Added styling so the export button matches existing settings controls and conveys disabled state.
- [x] Hook ComparisonComponent to ComparisonTemplateExportService with disabled state handling
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/comparison/comparison.component.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Inspected component logic to plan injection points for the export service and disabled state helper.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.component.ts
  > ... (added ComparisonTemplateExportService injection and download state flag)
  > *** End Patch
  > ```
  > Injected the new export service and tracked in-progress state for template downloads.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.component.ts
  > ... (implemented isComparisonTemplateDownloadDisabled and downloadComparisonTemplate helpers)
  > *** End Patch
  > ```
  > Exposed helper methods to trigger downloads and compute disabled state.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.template.html
  > ... (bound templateDownloadDisabled input and templateDownload output to new helpers)
  > *** End Patch
  > ```
  > Plumbed the export controls through the settings component instance.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison-template-export.service.ts
  > ... (refactored buildTemplate to use feature grouping service, added formatting fallbacks, and centralized context builder)
  > *** End Patch
  > ```
  > Enhanced the export service to honor tooltip/label fallbacks, include visibility metadata, and share dataset context between build/download.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison-template-export.service.ts
  > ... (passed criteria map into buildUngroupedSection)
  > *** End Patch
  > ```
  > Ensured ungrouped criteria reuse the merged criteria map for consistent metadata.
- [x] Run targeted verification (lint/build) for new export flow
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Build timed out after ~22s despite completing most steps; reran with extended timeout to capture exit status.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"timeout_ms":600000,"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Angular build succeeded (warnings only), confirming export changes compile.
- [x] Update spec to describe HTML comment instructions
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (adjusted bullet points to require HTML comments for instructional guidance)
  > *** End Patch
  > ```
  > Updated spec language so instructions are emitted as HTML comments separate from template placeholders.
- [x] Emit HTML comment guidance in export service and verify build
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison-template-export.service.ts
  > ... (converted instruction placeholders to HTML comments, added renderComment helper)
  > *** End Patch
  > ```
  > Refined generated template output to use HTML comments for instructions and notes.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"timeout_ms":600000,"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Rebuilt application to ensure comment changes compile cleanly (expected Angular warnings only).
- [x] Investigate details tooltip display issue
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/comparison/details/comparison.details.template.html"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed details template to evaluate existing tooltip rendering and identify reliance on `label.tooltip.text`.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '240,320p' src/app/components/comparison/configuration/configuration.service.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Confirmed configuration service populates tooltip HTML but not the `text` field.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/data/tooltip.js"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Verified Tooltip factory leaves `.text` empty when derived from markdown, explaining missing inline display.
- [x] Fix details tooltip rendering to use HTML fallback
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.template.html
  > ... (updated tooltipAsText branches to render HTML comments via sanitizeHtml and prefixInternalLink fallbacks)
  > *** End Patch
  > ```
  > Modified details template so tooltip text leverages HTML fallback when markdown-based tooltips set `text` to empty.
- [x] Re-run build to validate tooltip changes
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"timeout_ms":600000,"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Build succeeded with existing warnings only, confirming tooltip adjustments compile.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"timeout_ms":600000,"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Rebuilt after header tooltip tweaks; output unchanged apart from expected Angular warnings.
- [x] Refine template instructions per feedback (spec + service)
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (clarified instruction comments, removed per-criterion metadata requirements)
  > *** End Patch
  > ```
  > Updated spec bullets so instructions rely on HTML comments, avoid repeating metadata, and describe LABEL/MARKDOWN behavior.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison-template-export.service.ts
  > ... (dropped metadata lines, added buildCriteriaInstruction helper, adjusted LABEL/MARKDOWN output)
  > *** End Patch
  > ```
  > Regenerated template content without per-criterion metadata, added label instructions, and removed markdown code blocks.
- [x] Rebuild after instruction refinements
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"timeout_ms":600000,"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Build passed with standard Angular warnings, validating instruction refinements.
- [x] Simplify LABEL value list output (spec + service)
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (clarified plain-text bullet requirements for label values)
  > *** End Patch
  > ```
  > Documented that label values render as plain bullet lists with no headers or display markup.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison-template-export.service.ts
  > ... (removed header and display text from label value output)
  > *** End Patch
  > ```
  > Adjusted service output to emit simple text-only bullet lists for label values.
- [x] Build after label value changes
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"timeout_ms":600000,"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Build succeeded with expected Angular warnings, confirming label list update.
- [x] Remove metadata repetition and convert content hints to HTML comments
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison-template-export.service.ts
  > ... (refactored group/criterion builders to emit HTML comments with content guidance, removed per-criterion metadata)
  > *** End Patch
  > ```
  > Refactored template generator to output HTML comment guidance, plain bullet lists, and tightened spacing.
- [x] Rebuild after spacing/comment refactor
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"timeout_ms":600000,"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Build completed with existing Angular warnings, validating the final formatting changes.
- [x] Remove instruction/summary labels and skip markdown instructions
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison-template-export.service.ts
  > ... (simplified HTML comments, skipped markdown instructions, tightened spacing)
  > *** End Patch
  > ```
  > Comments now contain only the guidance text, markdown criteria omit redundant instructions, and spacing ensures only single blank lines before headings.
- [x] Final build verification
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"timeout_ms":600000,"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Build succeeded (same Angular warnings), confirming latest comment/spacing adjustments.
- [x] Clarify label instructions for sub-bullets and dataset values
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (documented sub-bullet guidance and dataset-aware label lists)
  > *** End Patch
  > ```
  > Spec updated so label instructions explicitly direct editors to remove unused values, pick a single Yes/No, and add notes via indented `-` items.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison-template-export.service.ts
  > ... (merged configured/dataset labels and added sub-bullet reminder comments)
  > *** End Patch
  > ```
  > Template generation now merges dataset label values and appends comments reminding editors to use indented sub-bullets instead of inline parentheses.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"timeout_ms":600000,"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Rebuilt successfully (existing Angular warnings) to verify the refined guidance.
- [x] Update instructions to prefer HTML comments (avoid nested bullet parsing)
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (clarified that additional notes should be captured with HTML comments, not bullet entries)
  > *** End Patch
  > ```
  > Spec now directs editors to use HTML comments for supplemental notes to prevent auto-config from ingesting them as new label values.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison-template-export.service.ts
  > ... (adjusted label guidance comments accordingly)
  > *** End Patch
  > ```
  > Template comments now explicitly call for HTML comment notes and warn against adding extra `-` entries.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build"],"timeout_ms":600000,"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Build completed (expected Angular warnings) confirming the latest instruction adjustments compiled.
  > **Tessl Create**
  > ```json
  > {"prompt":"Create a spec named \"Comparison Template Export\" describing an Angular feature that lets users download a dataset-specific Markdown template of all comparison criteria grouped by feature grouping. The spec should:\n\n- Target a new service `ComparisonTemplateExportService` (provided in root) and capture the settings dialog integration for triggering downloads. Place the service under `src/app/components/comparison/settings/`.\n- Document that the template is generated from the active dataset via `ConfigurationService`, `FeatureGroupingService`, and `DatasetManifestService`, and must include every criterion, even ones hidden or collapsed in the UI at the moment of export.\n- Describe template composition: start with dataset metadata (dataset id/display label), keep group order consistent with `FeatureGroupView`, include group label value + tooltip/instructional text, list each child criterion (or ungrouped criteria) with name, type, description, placeholder, and for label-based criteria enumerate possible values (name, optional display emoji/text, value descriptions). Mention fallback behaviors when instructions/tooltips are missing.\n- Define Markdown layout expectations (headers for groups/criteria, bullet lists for values, fenced code block hint for freeform fields) and note that export should normalize Markdown (no trailing spaces, ensure blank line separation).\n- Require creation of a downloadable Blob with UTF-8 encoding named `<datasetId>-comparison-template.md` (dataset id lowercased, hyphenated) triggered from the settings dialog.\n- Capture UI integration: add a \"Download Template\" button inside `comparison.settings.template.html` alongside other settings actions, wire it through `ComparisonSettingsComponent` and up to `ComparisonComponent` so the service handles the download. Mention accessible labeling and disabled state when no dataset/configuration is loaded.\n- Provide an explicit API section for `ComparisonTemplateExportService` with at least `buildTemplate()` and `downloadTemplate()` signatures.\n- Include dependencies referencing ConfigurationService, FeatureGroupingService, DatasetManifestService, Angular HttpClient (if needed), Document/Window abstractions for download, and NgRx store access for `IUCAppState` when necessary.\n","spec":"specs/app/components/comparison/comparison-template-export.spec.md"}
  > ```
  > Generated initial spec scaffold at [specs/app/components/comparison/comparison-template-export.spec.md](../specs/app/components/comparison/comparison-template-export.spec.md).
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","cat specs/app/components/comparison/comparison-template-export.spec.md"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed generated spec content to verify coverage.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (patch content includes corrected target paths and added @describe entries)
  > *** End Patch
  > ```
  > Corrected target paths, added component references, and expanded capability details.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (patch content adjusts criterion detail wording and formatting expectations)
  > *** End Patch
  > ```
  > Refined criterion detail description and formatting notes.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (patch content adds ungrouped criteria section requirement)
  > *** End Patch
  > ```
  > Added explicit requirement for “Ungrouped Criteria” section.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (patch content extends dependency list with UI integration references)
  > *** End Patch
  > ```
  > Documented UI integration dependencies for settings dialog wiring.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' configuration/defaults/template-default.md"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed legacy template formatting to ensure spec captures indentation and guidance style.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (patch content updates instructions for placeholders, indentation, and value list formatting)
  > *** End Patch
  > ```
  > Adjusted spec to call out nested instruction bullets, square-bracket placeholders, and spacing requirements to match legacy template formatting conventions.
  > ---
  > **Tessl Build**
  > ```json
  > {"spec":["specs/app/components/comparison/comparison-template-export.spec.md"]}
  > ```
  > Initial build attempted; generation added new service but dependency verification failed due to missing rxjs reference in spec.
  > ---
  > **ApplyPatch**
  > ```text
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > ... (patch content adds RxJS dependency reference)
  > *** End Patch
  > ```
  > Updated spec dependencies to include RxJS utilities used by generated service.
  > ---
  > **Tessl Build**
  > ```json
  > {"spec":["specs/app/components/comparison/comparison-template-export.spec.md"]}
  > ```
  > Re-ran build after dependency update; service regenerated and dependency verification succeeded.
  > ---
  > **Summary**
  > Finalized spec detailing dataset-aware template export service, Markdown formatting rules, file download mechanics, and settings dialog integration.
