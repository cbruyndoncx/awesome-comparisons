# Plan: CLI bulk template export

Enable generating comparison templates for every dataset directly from the command line while preserving existing UI export behavior.

## Tasks

- [x] Confirm dataset manifest and template export dependencies to reuse for CLI tooling
  > **Bash** `['bash', '-lc', "sed -n '1,200p' src/app/components/comparison/settings/comparison-template-export.service.ts"]`  
  > Reviewed [src/app/components/comparison/settings/comparison-template-export.service.ts](../src/app/components/comparison/settings/comparison-template-export.service.ts) to capture current template assembly flow, grouping logic, and criteria handling.
  > ---
  > **Bash** `['bash', '-lc', "sed -n '200,400p' src/app/components/comparison/settings/comparison-template-export.service.ts"]`  
  > Confirmed downstream helpers for criteria resolution, label value collection, and HTML comment rendering in [src/app/components/comparison/settings/comparison-template-export.service.ts](../src/app/components/comparison/settings/comparison-template-export.service.ts).
  > ---
  > **Bash** `['bash', '-lc', 'cat configuration/datasets.manifest.json']`  
  > Inspected [configuration/datasets.manifest.json](../configuration/datasets.manifest.json) to identify dataset IDs, config source paths, and metadata needed for bulk export iteration.
- [x] Update comparison template export spec to cover command-line bulk export requirements
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > @@
  > [@generate](../../../../src/app/components/comparison/settings/comparison-template-export.service.ts)
  > +[@generate](../../../../lib/comparison-template/template-builder.js)
  > +[@generate](../../../../lib/comparison-template/export-all-templates.js)
  > ```
  > Added shared builder and CLI script targets to [specs/app/components/comparison/comparison-template-export.spec.md](../specs/app/components/comparison/comparison-template-export.spec.md) so Tessl generates all required artifacts.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/comparison-template-export.spec.md
  > @@
  > - Template starts with dataset metadata including dataset ID and display label
  > + Template starts with dataset metadata including dataset ID and display label
  > +-
  > +### Shared template builder module
  > +
  > +Exports pure utilities that assemble comparison templates so they can run inside Angular services or Node CLI scripts.
  > ```
  > Expanded capability sections in [specs/app/components/comparison/comparison-template-export.spec.md](../specs/app/components/comparison/comparison-template-export.spec.md) to describe shared builder behavior and command-line requirements.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: specs/package-json.spec.md
  > @@
  > - "test" script runs Angular CLI test command
  > - "release" script builds production version
  > +- "templates:export" script invokes the bulk template CLI to regenerate Markdown templates for every dataset
  > ```
  > Updated [specs/package-json.spec.md](../specs/package-json.spec.md) so the npm script coverage reflects the new command-line export entry point.
- [x] Implement CLI command and supporting code to export templates for all datasets
  > **tessl build** `{"spec":["specs/app/components/comparison/comparison-template-export.spec.md"]}`  
  > Initial code generation for shared builder, service, and CLI after expanding the spec.
  > ---
  > **tessl build** `{"spec":["specs/app/components/comparison/comparison-template-export.spec.md"],"generateCode":["always"]}`  
  > Regenerated code while refining builder instructions and CLI behaviour; iterated repeatedly to align formatting and dependency handling.
  > ---
  > **apply_patch** (multiple spec tweaks)  
  > Adjusted [specs/app/components/comparison/comparison-template-export.spec.md](../specs/app/components/comparison/comparison-template-export.spec.md) and related files to refine builder logic, dependency declarations, and CLI requirements.
  > ---
  > **npm run templates:export -- --dataset code-editor**  
  > Generated a single dataset template to validate formatting and instruction placement.
  > ---
  > **npm run templates:export**  
  > Confirmed command-line bulk export produces templates for every dataset directory.
  > ---
  > **apply_patch** (rewrite builder and service)  
  > Replaced [lib/comparison-template/template-builder.js](../lib/comparison-template/template-builder.js) with a hand-crafted shared helper and updated [src/app/components/comparison/settings/comparison-template-export.service.ts](../src/app/components/comparison/settings/comparison-template-export.service.ts) plus [lib/comparison-template/export-all-templates.js](../lib/comparison-template/export-all-templates.js) to use the new builder, normalize types, and flatten configuration entries reliably.
- [x] Verify the CLI command output and guard against regressions in existing export flow
  > **npm run templates:export -- --dataset code-editor**  
  > Regenerated the code-editor template after manual rewrites; output now includes normalized headings, instructions, and value lists.
  > ---
  > **npm run templates:export**  
  > Bulk export succeeded for all datasets, producing Markdown files under each `datasets/<id>/config` directory.
  > ---
  > **npm run build**  
  > Angular build completed successfully (only existing theming warnings), confirming the shared builder and service integrate cleanly.
