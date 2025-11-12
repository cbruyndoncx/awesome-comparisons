# Plan: Align Template Export With Grouped Criteria

Ensure Markdown template export only lists grouped dataset criteria in screen order, excluding system-only fields.

## Tasks

- [x] Inspect current template builders and exports to confirm inclusion/exclusion mechanics
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/comparison-template/template-builder.js"]`  
  > Reviewed shared builder structure to understand current dataset header, group rendering, and ungrouped handling.
  > ---
  > **Bash** `["bash","-lc","node lib/comparison-template/export-all-templates.js --dataset code-agent --output tmp/templates"]`  
  > Regenerated a sample template to reproduce ordering and inclusion issues.
  > ---
  > **Bash** `["bash","-lc","sed -n '320,380p' tmp/templates/code-agent-comparison-template.md"]`  
  > Inspected problematic “Ungrouped Criteria” output showing system fields and `[object Object]` artifacts.
- [x] Implement filtering and header adjustments so only grouped dataset criteria appear (plus intro id/description handling)
  > **ApplyPatch** `lib/comparison-template/template-builder.js`  
  > Added system criteria skip list, intro header handling for `id`/`description`, and configurable ungrouped filtering so builder emits only desired sections.
  > ---
  > **ApplyPatch** `src/app/components/comparison/settings/comparison-template-export.service.ts`  
  > Ensured grouped ids capture parent keys and passed intro criteria metadata into the shared builder.
  > ---
  > **ApplyPatch** `lib/comparison-template/export-all-templates.js`  
  > Propagated intro criteria, prevented duplicate group parents, and aligned CLI exporter with shared filtering.
  > ---
  > **Bash** `["bash","-lc","node lib/comparison-template/export-all-templates.js --dataset code-agent --output tmp/templates"]`  
  > Regenerated template mid-change to confirm builder adjustments took effect.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,120p' tmp/templates/code-agent-comparison-template.md"]`  
  > Reviewed header output and noted missing id instructions, prompting further fixes.
  > ---
  > **ApplyPatch** `src/app/components/comparison/settings/comparison-template-export.service.ts`  
  > Filtered ungrouped criteria to string ids only to eliminate `[object Object]` artifacts.
  > ---
  > **ApplyPatch** `lib/comparison-template/export-all-templates.js`  
  > Mirrored ungrouped filtering on the CLI exporter side.
  > ---
  > **Bash** `["bash","-lc","node -e \"const { TemplateExporter } = require('./lib/comparison-template/export-all-templates.js');\\n(async () => {\\n  const exporter = new TemplateExporter();\\n  const manifest = await exporter.loadManifest();\\n  const dataset = manifest.datasets.find(d => d.id === 'code-agent');\\n  const assets = await exporter.loadDatasetAssets(dataset);\\n  const normalized = exporter.normalizeConfigurationCriteria(assets.configuration.criteria || []);\\n  const criteriaIndex = exporter.buildCriteriaLookup(normalized);\\n  console.log('has id', criteriaIndex.has('id'));\\n})();\""]`  
  > Diagnosed missing name metadata (Map lacked `id` key) to guide normalization fix.
  > ---
  > **ApplyPatch** `lib/comparison-template/export-all-templates.js`  
  > Updated configuration normalization to coerce YAML-shaped `{ "id": { ... } }` entries into explicit string ids.
  > ---
  > **Bash** `["bash","-lc","node -e \"const { TemplateExporter } = require('./lib/comparison-template/export-all-templates.js');\\n(async () => {\\n  const exporter = new TemplateExporter();\\n  const manifest = await exporter.loadManifest();\\n  const dataset = manifest.datasets.find(d => d.id === 'code-agent');\\n  const assets = await exporter.loadDatasetAssets(dataset);\\n  const normalized = exporter.normalizeConfigurationCriteria(assets.configuration.criteria || []);\\n  const criteriaIndex = exporter.buildCriteriaLookup(normalized);\\n  console.log('has id', criteriaIndex.has('id'));\\n})();\""]`  
  > Re-ran diagnostic to confirm the criteria map now exposes the `id` entry for header rendering.
- [x] Rebuild a sample template and verify ordering/content meets requirements
  > **Bash** `["bash","-lc","node lib/comparison-template/export-all-templates.js --dataset code-agent --output tmp/templates"]`  
  > Regenerated the Markdown template with the finalized filtering logic.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,60p' tmp/templates/code-agent-comparison-template.md"]`  
  > Confirmed heading now includes id/description guidance while keeping the dataset intro intact.
  > ---
  > **Bash** `["bash","-lc","sed -n '300,360p' tmp/templates/code-agent-comparison-template.md"]`  
  > Verified that only the dataset-specific criteria remain in the trailing section and system fields are removed.
- [x] Summarize code changes and verification steps for handoff
  > Documented in the final assistant response for this task.

### Follow-up: Remove data-driven criteria/headings

- [x] Analyze AIE Models template to identify remaining non-configuration criteria
  > **Bash** `["bash","-lc","node lib/comparison-template/export-all-templates.js --dataset aie-model --output tmp/templates"]`  
  > Regenerated the AIE models template to capture current output for inspection.
  > ---
  > **Bash** `["bash","-lc","rg -n \"^##\" tmp/templates/aie-model-comparison-template.md"]`  
  > Verified the file still contained numerous headings (e.g., `Extensible`, `Terminal`) that do not exist in the curated defaults/configs.
- [x] Filter Angular feature groups and CLI exporter to use only configuration-defined group keys
  > **ApplyPatch** `src/app/components/comparison/settings/comparison-template-export.service.ts`  
  > Filtered declared criteria (requires `name`), restricted feature groups to configuration-defined parents, and added a configuration-based fallback builder so extra data-driven groups/criteria never reach the UI exporter.
  > ---
  > **ApplyPatch** `lib/comparison-template/export-all-templates.js`  
  > Mirrored the declared-criteria filtering, removed data-driven group synthesis, and ensured the CLI exporter builds the same curated group list as the UI.
- [x] Rebuild templates (incl. AIE Models) and confirm only configuration criteria remain
  > **Bash** `["bash","-lc","node lib/comparison-template/export-all-templates.js --dataset aie-model --output tmp/templates"]`  
  > Regenerated the dataset template after filtering logic updates.
  > ---
  > **Bash** `["bash","-lc","rg -n \"^##\" tmp/templates/aie-model-comparison-template.md"]`  
  > Confirmed only the expected General/Licensing sections plus the dataset-specific ungrouped criteria remain.

- [x] Trim extra whitespace around HTML comments in templates
  > **ApplyPatch** `lib/comparison-template/template-builder.js`  
  > Normalized markdown so blank lines around `<!-- -->` blocks collapse to a single newline, eliminating the visual gaps the user reported.
  > ---
  > **Bash** `["bash","-lc","node lib/comparison-template/export-all-templates.js --dataset aie-model --output tmp/templates"]`  
  > Rebuilt a sample template after the formatting tweak.
  > ---
  > **Bash** `["bash","-lc","sed -n '10,30p' tmp/templates/aie-model-comparison-template.md"]`  
  > Verified comment blocks now sit flush against adjacent headings/content without extra blank lines.

- [x] Use canonical IDs for criteria headings to avoid duplicate titles *(reverted)*
  > **ApplyPatch** `lib/comparison-template/template-builder.js`  
  > Initially switched headings to `criteria.id`, then reverted per follow-up request so headings continue to show the display name while suppressing duplicate comments.
  > ---
  > **Bash** `["bash","-lc","node lib/comparison-template/export-all-templates.js --dataset aie-model --output tmp/templates"]`  
  > Rebuilt the sample template after the revert to confirm headings render with the friendly names again.
- [x] Ensure duplicate-friendly names are filtered once even when ids differ
  > **ApplyPatch** `src/app/components/comparison/settings/comparison-template-export.service.ts`  
  > Added canonical key tracking that accounts for both ids and display names so grouped criteria block ungrouped ones with the same label (e.g., `LastUpdated` vs `Last Update`).
  > ---
  > **ApplyPatch** `lib/comparison-template/export-all-templates.js`  
  > Mirrored the canonical-key dedupe logic in the CLI exporter.
  > ---
  > **Bash** `["bash","-lc","node lib/comparison-template/export-all-templates.js --dataset aie-model --output tmp/templates"]`  
  > Confirmed the regenerated AIE models template now contains only one “Last Update” section.
