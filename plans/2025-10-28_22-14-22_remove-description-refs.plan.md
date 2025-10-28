# Plan: Remove description.md references

Cleanup build pipeline and UI after removing dataset `description.md` files.

## Tasks

- [x] Identify description.md references
  > **Bash**
  > command: ["bash","-lc","rg \"description\\.md\""]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Located remaining references across gulp build, dataset manifests, specs, and Angular templates.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\\\\.md\" -n"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Confirmed specific line numbers for cleanup in `lib/gulp/gulpfile.babel.js`, manifest JSON, and Angular templates.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"buildDatasetAssetUrl\" -n src"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Identified dataset asset loading logic in `src/app/components/comparison/configuration/configuration.service.ts`.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '120,180p' src/app/components/comparison/configuration/configuration.service.ts"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed the HTTP request sequence to understand how description markdown was fetched.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\" src/app -g \"*.html\" -n"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Found the comparison template card rendering the dataset description.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '1,60p' src/app/components/comparison/comparison.template.html"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Inspected the HTML structure showing the Markdown description card.
- [x] Update Gulp build to stop using description.md
  > **Bash**
  > command: ["bash","-lc","sed -n '1,200p' lib/gulp/gulpfile.babel.js"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed path definitions and dataset context setup to plan removal of description assets.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"datasetDescriptionFiles\" -n lib/gulp/gulpfile.babel.js"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Located watcher configuration that reacted to description file changes.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\" lib/gulp/gulpfile.babel.js -n"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Enumerated every code path referencing description assets within the gulpfile.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '200,360p' lib/gulp/gulpfile.babel.js"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Examined asset copying logic to confirm where description.md was being copied.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '360,520p' lib/gulp/gulpfile.babel.js"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed gulp task definitions and watchers dependent on description assets.
  > ---
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: lib/gulp/gulpfile.babel.js
  > @@
  > -    defaultConfig: path.join(paths.config, names.defaultConfig),
  > -    description: path.join(paths.config, 'description.md'),
  > +    defaultConfig: path.join(paths.config, names.defaultConfig),
  >     dataJson: path.join(paths.dist, names.data),
  >     autoConfig: path.join(paths.config, names.autoConfig),
  >     versionInformation: path.join(paths.assets, names.versionInformation)
  > };
  > @@
  > -const datasetDescriptionFiles = uniqueEntries(datasetContexts.map(context => context.sources.description));
  > const datasetStyleFiles = uniqueEntries(datasetContexts.map(context => context.sources.style));
  > @@
  > -    const descriptionFile = ensureFile(resolveSourcePath(sources.description, files.description), `Dataset "${entry.id}" description file`);
  >     const styleFile = ensureFile(resolveSourcePath(sources.style, files.style), `Dataset "${entry.id}" style file`);
  > @@
  >          sources: {
  >             dataDir,
  >             config: configFile,
  > -            description: descriptionFile,
  >             style: styleFile
  >         },
  > @@
  > -const datasetAssetFileNames = ['comparison.json', 'data.json', 'description.md', 'style.css'];
  > +const datasetAssetFileNames = ['comparison.json', 'data.json', 'style.css'];
  > @@
  > -        const descriptionTarget = path.join(dataset.distDir, 'description.md');
  > -        copyFileSync(dataset.sources.description, descriptionTarget);
  > -        copyDatasetFile(dataset, descriptionTarget, 'description.md');
  > -
  >         const styleTarget = path.join(dataset.distDir, 'style.css');
  >         copyFileSync(dataset.sources.style, styleTarget);
  >         copyDatasetFile(dataset, styleTarget, 'style.css');
  > @@
  > -gulp.task('update-description', function () {
  > -    gulp.watch(datasetDescriptionFiles, gulp.series(changeCriteria, assets, config));
  > -});
  > -
  > gulp.task('update-style', function () {
  >     gulp.watch(datasetStyleFiles, assets);
  > });
  > 
  > -gulp.task('update', gulp.parallel('update-data', 'update-config', 'update-description', 'update-style'));
  > +gulp.task('update', gulp.parallel('update-data', 'update-config', 'update-style'));
  > *** End Patch
  > ```
  > Output: Removed description-specific asset handling from the gulp build pipeline.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"sources.description\" lib/gulp/gulpfile.babel.js"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Verified no lingering references to description sources remain in the gulpfile.
  > ---
  > **Bash**
  > command: ["bash","-lc","python - <<'PY'\nfrom pathlib import Path\npath = Path('configuration/datasets.manifest.json')\nlines = [line for line in path.read_text().splitlines(True) if 'config/description.md' not in line]\npath.write_text(''.join(lines))\nPY"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Removed description paths from the primary dataset manifest sources.
  > ---
  > **Bash**
  > command: ["bash","-lc","python - <<'PY'\nfrom pathlib import Path\npath = Path('src/assets/configuration/datasets.manifest.json')\nlines = [line for line in path.read_text().splitlines(True) if 'config/description.md' not in line]\npath.write_text(''.join(lines))\nPY"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Synced Angular asset manifest copy to drop description references.
  > ---
  > **Bash**
  > command: ["bash","-lc","head -n 40 configuration/datasets.manifest.json"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Spot-checked manifest to confirm sources only enumerate data, config, and style files.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '1,160p' specs/lib/gulp/gulpfile-babel.spec.md"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed spec coverage to identify description.md expectations that needed updating.
  > ---
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: specs/lib/gulp/gulpfile-babel.spec.md
  > @@
  > -### Asset Management
  > -
  > -Copies static assets and configuration files to distribution directory.
  > -
  > -- Copies description.md and style.css to dist directory [@test](./tests/asset-management.spec.js)
  > +### Asset Management
  > +
  > +Copies static assets and configuration files to distribution directory.
  > +
  > +- Copies style.css to dist directory [@test](./tests/asset-management.spec.js)
  > @@
  > -### Dataset Manifest Orchestration
  > -
  > -Expands the build to support multiple datasets defined in configuration/datasets.manifest.json.
  > -
  > -- Loads and validates the manifest file; fails the build when manifest is missing or empty
  > -- Iterates each dataset definition, resolving dataset-specific source directories (markdown, configuration, description, style) via the `sources` metadata
  > -- Runs the markdown conversion, criteria enrichment, development column enrichment, and config merging per dataset using isolated tmp/dist destinations
  > -- Copies comparison.json, data.json, description.md, and style.css into `src/assets/generated/<datasetId>/` and `dist/ultimate-comparison/assets/generated/<datasetId>/`
  > -- Ensures generated files exist only beneath their dataset-specific directories (no legacy root mirrors)
  > -- Copies the manifest itself to `src/assets/configuration/datasets.manifest.json` so the Angular app can request it at runtime
  > -- Validates that required files exist for every dataset and throws descriptive errors when inputs or generated outputs are missing
  > +### Dataset Manifest Orchestration
  > +
  > +Expands the build to support multiple datasets defined in configuration/datasets.manifest.json.
  > +
  > +- Loads and validates the manifest file; fails the build when manifest is missing or empty
  > +- Iterates each dataset definition, resolving dataset-specific source directories (markdown, configuration, style) via the `sources` metadata
  > +- Runs the markdown conversion, criteria enrichment, development column enrichment, and config merging per dataset using isolated tmp/dist destinations
  > +- Copies comparison.json, data.json, and style.css into `src/assets/generated/<datasetId>/` and `dist/ultimate-comparison/assets/generated/<datasetId>/`
  > +- Ensures generated files exist only beneath their dataset-specific directories (no legacy root mirrors)
  > +- Copies the manifest itself to `src/assets/configuration/datasets.manifest.json` so the Angular app can request it at runtime
  > +- Validates that required files exist for every dataset and throws descriptive errors when inputs or generated outputs are missing
  > @@
  > -### Development Watch Tasks
  > -
  > -Provides file watching capabilities for development workflow.
  > -
  > -- Watches markdown files and triggers full rebuild [@test](./tests/watch-tasks.spec.js)
  > -- Watches configuration files and triggers config rebuild [@test](./tests/watch-tasks.spec.js)
  > -- Watches description files and triggers description rebuild [@test](./tests/watch-tasks.spec.js)
  > -- Watches style files and triggers asset rebuild [@test](./tests/watch-tasks.spec.js)
  > -- Uses glob patterns to watch files in nested directories [@test](./tests/watch-tasks.spec.js)
  > -- Monitors multiple file types including .md, .yml, and .css [@test](./tests/watch-tasks.spec.js)
  > -- Includes manifest-provided markdown directories so every dataset rebuilds when its data changes
  > +### Development Watch Tasks
  > +
  > +Provides file watching capabilities for development workflow.
  > +
  > +- Watches markdown files and triggers full rebuild [@test](./tests/watch-tasks.spec.js)
  > +- Watches configuration files and triggers config rebuild [@test](./tests/watch-tasks.spec.js)
  > +- Watches style files and triggers asset rebuild [@test](./tests/watch-tasks.spec.js)
  > +- Uses glob patterns to watch files in nested directories [@test](./tests/watch-tasks.spec.js)
  > +- Monitors multiple file types including .md, .yml, and .css [@test](./tests/watch-tasks.spec.js)
  > +- Includes manifest-provided markdown directories so every dataset rebuilds when its data changes
  > @@
  >  ```javascript { .api }
  >  // Gulp task definitions
  >  gulp.task('default', gulp.series(copyDist, markdown, changeCriteria, 'development-column', assets, config));
  >  gulp.task('release', function () { /* version management */ });
  >  gulp.task('development-column', function (done) { /* development column processing */ });
  >  gulp.task('update-data', function () { /* watch markdown files */ });
  >  gulp.task('update-config', function () { /* watch config files */ });
  > -gulp.task('update-description', function () { /* watch description files */ });
  >  gulp.task('update-style', function () { /* watch style files */ });
  >  gulp.task('update', gulp.parallel(/* all update tasks */));
  >  gulp.task('dev', gulp.series(copyDist, 'default', 'update'));
  > *** End Patch
  > ```
  > Output: Updated gulp spec documentation to reflect removal of description asset handling.
  > ---
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: specs/config/datasets-manifest.spec.md
  > @@
  > -Maps each dataset to its corresponding asset directory containing the required data files (comparison.json, data.json, description.md, style.css) and the input sources needed to build them.
  > +Maps each dataset to its corresponding asset directory containing the required data files (comparison.json, data.json, style.css) and the input sources needed to build them.
  > @@
  > -Includes a `sources` object per dataset listing the markdown directory plus configuration, description, and style files so the gulp pipeline can iterate through every dataset definition.
  > +Includes a `sources` object per dataset listing the markdown directory plus configuration and style files so the gulp pipeline can iterate through every dataset definition.
  > @@
  >          "dataDir": "data",
  > -        "config": "configuration/comparison.yml",
  > -        "description": "configuration/description.md",
  > +        "config": "configuration/comparison.yml",
  >          "style": "configuration/style.css"
  >        }
  > @@
  >          "dataDir": "data_example",
  > -        "config": "configuration/comparison-default.yml",
  > -        "description": "configuration/description.md",
  > +        "config": "configuration/comparison-default.yml",
  >          "style": "configuration/style.css"
  >        }
  > @@
  > -Build processes must iterate over this manifest to ensure each dataset has the required files (comparison.json, data.json, description.md) emitted inside its assetDirectory.
  > +Build processes must iterate over this manifest to ensure each dataset has the required files (comparison.json, data.json) emitted inside its assetDirectory.
  > *** End Patch
  > ```
  > Output: Adjusted manifest spec expectations to match the new source file set.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\\\\.md\" configuration/datasets.manifest.json"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Confirmed no remaining description path references in the primary manifest.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\\\\.md\" src/assets/configuration/datasets.manifest.json"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Verified Angular asset manifest is free of description references.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\\\\.md\" lib/gulp/gulpfile.babel.js"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Ensured gulpfile updates removed every description.md occurrence.
- [x] Update HTML template to remove description details
  > **Bash**
  > command: ["bash","-lc","sed -n '1,120p' src/app/components/comparison/configuration/configuration.service.ts"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed service state properties to prepare for removing description handling.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '130,220p' src/app/components/comparison/configuration/configuration.service.ts"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Inspected dataset asset loading flow to adjust Promise responses.
  > ---
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/configuration/configuration.service.ts
  > @@
  > -    public static data: Data = new Data([]);
  > -    public description = '';
  > +    public static data: Data = new Data([]);
  >     public criteria: Array<Criteria> = [];
  >     public configuration: Configuration = Configuration.empty();
  > @@
  > -        const requests = [
  > -            this.http.get(this.buildDatasetAssetUrl(dataset, 'comparison.json')),
  > -            this.http.get(this.buildDatasetAssetUrl(dataset, 'data.json')),
  > -            this.http.get(this.buildDatasetAssetUrl(dataset, 'description.md'), {responseType: 'text'})
  > -        ];
  > +        const requests = [
  > +            this.http.get(this.buildDatasetAssetUrl(dataset, 'comparison.json')),
  > +            this.http.get(this.buildDatasetAssetUrl(dataset, 'data.json'))
  > +        ];
  >         this.currentDataset = dataset;
  >         Promise.all(requests.map(res => res.toPromise()))
  > -            .then(result => {
  > +            .then(([configurationSource, dataSource]) => {
  >                 this.currentDatasetId = dataset.id;
  > -                this.hydrateConfigurationPayload(result);
  > +                this.hydrateConfigurationPayload(configurationSource, dataSource);
  >             })
  >             .catch(error => {
  >                 console.error(`Failed to load dataset ${dataset.id}:`, error);
  >             });
  > @@
  > -    private hydrateConfigurationPayload(result: any[]): void {
  > +    private hydrateConfigurationPayload(configurationSource: any, dataSource: any): void {
  >         // Set configuration model
  > -        this.configuration = Configuration.load(result[0]);
  > +        this.configuration = Configuration.load(configurationSource);
  > @@
  > -        // Set data model
  > -        ConfigurationService.data = Data.loadJson(result[1], this.configuration);
  > +        // Set data model
  > +        ConfigurationService.data = Data.loadJson(dataSource, this.configuration);
  > @@
  > -        // Set description
  > -        this.description = ConfigurationService.getHtml(
  > -            String(result[2]));
  > -
  >         const grouping = this.featureGroupingService.parseGroupedMarkdown({
  >             configuration: this.configuration,
  >             data: ConfigurationService.data
  >         });
  > *** End Patch
  > ```
  > Output: Removed description fetching from the configuration service and updated data hydration to accept only configuration/data payloads.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"this\\\\.description\" src/app/components/comparison/configuration/configuration.service.ts"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Verified no remaining assignments to the removed description property.
  > ---
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.template.html
  > @@
  > -        <pcard>
  > -            <div [innerHTML]="configurationService.description | sanitizeHtml" class="description"></div>
  > -        </pcard>
  > -
  >         <pcard [heading]="configurationService.configuration?.selectTitle">
  > *** End Patch
  > ```
  > Output: Removed the dataset description card from the comparison template.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"configurationService\\\\.description\" -n"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Confirmed the UI no longer references the description binding.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\\\\.md\" -n"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Detected remaining build-tool references, including webpack clean exclusions, for further cleanup.
  > ---
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: lib/webpack/config.js
  > @@
  > -        'data.json',
  > -        'comparison.json',
  > -        'description.md',
  > -        'style.css'
  > +        'data.json',
  > +        'comparison.json',
  > +        'style.css'
  > *** End Patch
  > ```
  > Output: Dropped description.md from webpack clean exclusions to align with removed asset.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\\\\.md\" lib -n"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Verified the webpack config no longer references description.md.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '1,160p' specs/app/components/comparison/configuration/configuration-service.spec.md"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed spec to remove guarantees about loading description markdown.
  > ---
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: specs/app/components/comparison/configuration/configuration-service.spec.md
  > @@
  > -Loads configuration, data, and description files from HTTP endpoints and processes them into usable models. Fetches all assets relative to the active dataset returned by DatasetManifestService, reloading automatically whenever the dataset selection changes.
  > +Loads configuration and data files from HTTP endpoints and processes them into usable models. Fetches all assets relative to the active dataset returned by DatasetManifestService, reloading automatically whenever the dataset selection changes.
  >  
  > -Loads comparison.json configuration file [@test](./configuration-service.test.ts)
  > - Loads data.json data file [@test](./configuration-service.test.ts)
  > -- Loads description.md markdown file [@test](./configuration-service.test.ts)
  > + Loads comparison.json configuration file [@test](./configuration-service.test.ts)
  > + Loads data.json data file [@test](./configuration-service.test.ts)
  > - Processes all files concurrently using Promise.all [@test](./configuration-service.test.ts)
  > @@
  >  export class ConfigurationService {
  >      public static data: Data;
  > -    public description: string;
  >      public criteria: Array<Criteria>;
  >      public configuration: Configuration;
  > *** End Patch
  > ```
  > Output: Updated service spec to reflect the streamlined asset loading behavior.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\\\\.md\" specs/app/components/comparison/configuration/configuration-service.spec.md"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Confirmed the service spec no longer references description.md.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\\\\.md\" specs -n"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Ensured all specs are free from description.md mentions post-update.
  > ---
  > **Bash**
  > command: ["bash","-lc","rg \"description\\\\.md\" src"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Verified application source no longer references description.md assets.
- [x] Validate build step or run targeted check
  > **Bash**
  > command: ["bash","-lc","git status -sb"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed working tree; noted pre-existing dataset and dist changes unrelated to this task.
  > ---
  > **Bash**
  > command: ["bash","-lc","npm run build"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Build succeeded. Gulp default task completed without description asset errors; Angular build finished with existing theme duplication warnings.
  > ---
  > **Bash**
  > command: ["bash","-lc","git status -sb"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Confirmed repository remains dirty due to prior dataset/dist updates; no new unexpected files introduced by this change.
