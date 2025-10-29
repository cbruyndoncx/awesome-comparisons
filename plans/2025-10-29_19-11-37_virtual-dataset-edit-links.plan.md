# Plan: Virtual Dataset Edit Links

Fix aggregated dataset edit links so they point to the correct source files while supporting multi-directory dataset manifests.

## Tasks

- [x] Update md2json CLI to recurse through subdirectories and retain relative `sourcePath` metadata.
  > **Bash** `sed -n '250,360p' lib/md2json/md2json.ts`
  > - Output: Displayed existing `dirToJson` implementation for reference.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: specs/lib/md2json/md2json.spec.md
  > @@
  > - Walks the input directory and converts markdown files to the legacy header/list JSON structure expected by gulp.
  > + Walks the input directory (recursively) and converts markdown files to the legacy header/list JSON structure expected by gulp.
  > @@
  > -- Writes each converted entry as JSON to the tmp directory mirroring the markdown filename (`foo.md` → `tmp/foo.json`)
  > +- Writes each converted entry as JSON to the tmp directory mirroring the markdown file’s relative path (`foo.md` → `tmp/foo.json`, `nested/bar.md` → `tmp/nested/bar.json`)
  > @@
  > -- Adds a `sourcePath` field to each aggregated entry containing the markdown filename relative to the input directory so downstream tooling can link back to the source document
  > +- Adds a `sourcePath` field to each aggregated entry containing the markdown filename relative to the input directory (including nested folder segments, normalized with forward slashes) so downstream tooling can link back to the source document
  > *** End Patch
  > ```
  > - Result: Failed — patch did not match existing lines; no changes applied.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: specs/lib/md2json/md2json.spec.md
  > @@
  > - Walks the input directory and converts markdown files to the legacy header/list JSON structure expected by gulp.
  > + Walks the input directory (recursively) and converts markdown files to the legacy header/list JSON structure expected by gulp.
  > @@
  > -- Writes each converted entry as JSON to the tmp directory mirroring the markdown filename (`foo.md` → `tmp/foo.json`)
  > +- Writes each converted entry as JSON to the tmp directory mirroring the markdown file’s relative path (`foo.md` → `tmp/foo.json`, `nested/bar.md` → `tmp/nested/bar.json`)
  > @@
  > -- Adds a `sourcePath` field to each aggregated entry containing the markdown filename relative to the input directory so downstream tooling can link back to the source document
  > +- Adds a `sourcePath` field to each aggregated entry containing the markdown filename relative to the input directory (including nested folder segments, normalized with forward slashes) so downstream tooling can link back to the source document
  > *** End Patch
  > ```
  > - Result: Updated md2json spec to document recursive traversal and normalized `sourcePath`.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/md2json/md2json.ts
  > @@
  > -      // Read all .md files and sort them alphabetically
  > -      const files = fs.readdirSync(inputDir)
  > -        .filter(file => file.endsWith('.md'))
  > -        .sort();
  > +      const collectMarkdownFiles = (dir: string): string[] => {
  > +        const entries = fs.readdirSync(dir, { withFileTypes: true });
  > +        const results: string[] = [];
  > +        entries.forEach(entry => {
  > +          const entryPath = path.join(dir, entry.name);
  > +          if (entry.isDirectory()) {
  > +            results.push(...collectMarkdownFiles(entryPath));
  > +          } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
  > +            results.push(entryPath);
  > +          }
  > +        });
  > +        return results;
  > +      };
  > +
  > +      const files = collectMarkdownFiles(inputDir)
  > +        .map(filePath => ({
  > +          absolute: filePath,
  > +          relative: path.relative(inputDir, filePath).replace(/\\/g, '/')
  > +        }))
  > +        .sort((a, b) => a.relative.localeCompare(b.relative, undefined, { sensitivity: 'base' }));
  > @@
  > -            const jsonFileName = file.replace('.md', '.json');
  > -            const jsonFilePath = path.join(tmpDir, jsonFileName);
  > +            const jsonFileName = file.relative.replace(/\.md$/i, '.json');
  > +            const jsonFilePath = path.join(tmpDir, jsonFileName);
  > +            const jsonDir = path.dirname(jsonFilePath);
  > +            if (!fs.existsSync(jsonDir)) {
  > +              fs.mkdirSync(jsonDir, { recursive: true });
  > +            }
  > @@
  > -            console.warn(`Warning: Skipping ${file} - no title found`);
  > +            console.warn(`Warning: Skipping ${file.relative} - no title found`);
  > @@
  > -          const errorMsg = `Error processing ${file}: ${error instanceof Error ? error.message : String(error)}`;
  > +          const errorMsg = `Error processing ${file.relative}: ${error instanceof Error ? error.message : String(error)}`;
  > *** End Patch
  > ```
  > - Result: Added recursive markdown discovery, preserved relative paths, and updated tmp output handling.
- [x] Preserve dataset-relative directory structure when merging data directories in the gulp pipeline.
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/gulpfile.babel.js
  > @@
  >  function prepareDatasetDataDirectory(dataset) {
  >      const dataDirs = dataset.dataDirs || dataset.sources.dataDirs || [dataset.sources.dataDir];
  >      if (!Array.isArray(dataDirs) || dataDirs.length === 0) {
  >          throw new Error(`Dataset "${dataset.id}" has no data directories configured.`);
  >      }
  >      if (dataDirs.length === 1) {
  >          return dataDirs[0];
  >      }
  >      const targetDir = dataset.mergedDataDir || path.join(dataset.tmpDir, 'merged-data');
  >      deleteFolderRecursive(targetDir);
  >      ensureDirExists(targetDir);
  >      dataDirs.forEach(sourceDir => {
  > -        const relativeRoot = path.relative(installedRootDirectory, sourceDir);
  > -        const destinationRoot = path.join(targetDir, relativeRoot);
  > +        const relativeToRoot = path.relative(installedRootDirectory, sourceDir).replace(/\\/g, '/');
  > +        let relativeRoot = relativeToRoot && !relativeToRoot.startsWith('..') ? relativeToRoot : '';
  > +        if (relativeRoot.length === 0) {
  > +            const normalized = sourceDir.replace(/\\/g, '/');
  > +            const datasetsIndex = normalized.indexOf('/datasets/');
  > +            if (datasetsIndex >= 0) {
  > +                relativeRoot = normalized.substring(datasetsIndex + 1);
  > +            } else {
  > +                relativeRoot = path.basename(sourceDir);
  > +            }
  > +        }
  > +        const destinationRoot = path.join(targetDir, relativeRoot);
  >          copyDirectoryContents(sourceDir, destinationRoot);
  >      });
  >      return targetDir;
  >  }
  > *** End Patch
  > ```
  > - Result: Ensured merged datasets keep their dataset-relative directory structure, even when absolute paths fall outside the project root.
- [x] Adjust Angular configuration services and manifest types to resolve edit links using new metadata.
  > **Bash** `sed -n '1,160p' specs/app/components/datasets/dataset-manifest-service.spec.md`
  > - Output: Reviewed manifest service spec to understand current `sources` fields.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: specs/app/components/datasets/dataset-manifest-service.spec.md
  > @@
  > -Loads configuration/datasets.manifest.json (copied to `assets/configuration/datasets.manifest.json`) via HttpClient once and caches the result. Manifest JSON is an object with a `datasets` array, so the service unwraps that collection, validates each entry (id, displayLabel, description, assetDirectory), and sorts results by displayLabel. Passes through optional `sources` metadata (dataDir, config, description, style, editBaseUrl) so downstream services can discover dataset-specific overrides without blocking validation.
  > +Loads configuration/datasets.manifest.json (copied to `assets/configuration/datasets.manifest.json`) via HttpClient once and caches the result. Manifest JSON is an object with a `datasets` array, so the service unwraps that collection, validates each entry (id, displayLabel, description, assetDirectory), and sorts results by displayLabel. Passes through optional `sources` metadata (dataDir, dataDirs, config, configDefaults, description, style, editBaseUrl) so downstream services can discover dataset-specific overrides without blocking validation.
  > @@
  >    sources?: {
  >      dataDir?: string;
  > +    dataDirs?: string[];
  >      config?: string;
  > +    configDefaults?: string[];
  >      description?: string;
  >      style?: string;
  >      editBaseUrl?: string;
  >    };
  >  }
  > *** End Patch
  > ```
  > - Result: Documented new dataset manifest metadata for multi-directory inputs.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/configuration/configuration.service.ts
  > @@
  > -        const datasetSegments = ConfigurationService.splitPath(activeDataset?.sources?.dataDir || '');
  >          ConfigurationService.data.dataElements = ConfigurationService.data.dataElements.map(dataElement => {
  > @@
  > -                dataElement.editLink = this.buildEditLink(dataElement, datasetSegments, editLinkBase);
  > +                dataElement.editLink = this.buildEditLink(dataElement, activeDataset, editLinkBase);
  > *** End Patch
  > ```
  > - Result: Routed edit-link generation through dataset-aware helper.
  > ---
  > **Bash** `rg "buildEditLink" -n src/app/components/comparison/configuration/configuration.service.ts`
  > - Output: Located existing helper definition for replacement.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/configuration/configuration.service.ts
  > @@
  > -    private buildEditLink(dataElement: DataElement, datasetSegments: string[], editLinkBase: string): string | null {
  > -        if (isNullOrUndefined(dataElement) || isNullOrUndefined(dataElement.sourcePath) || dataElement.sourcePath === '') {
  > -            return null;
  > -        }
  > -        const encodedSegments = [
  > -            ...datasetSegments,
  > -            ...ConfigurationService.splitPath(dataElement.sourcePath)
  > -        ].map(segment => encodeURIComponent(segment));
  > -        if (encodedSegments.length === 0) {
  > -            return null;
  > -        }
  > -        return `${editLinkBase}${encodedSegments.join('/')}`;
  > -    }
  > +    private buildEditLink(dataElement: DataElement, dataset: DatasetManifestEntry | null, editLinkBase: string): string | null {
  > +        if (isNullOrUndefined(dataElement) || isNullOrUndefined(dataElement.sourcePath) || dataElement.sourcePath === '') {
  > +            return null;
  > +        }
  > +        const sourceSegments = ConfigurationService.splitPath(dataElement.sourcePath);
  > +        if (sourceSegments.length === 0) {
  > +            return null;
  > +        }
  > +        const canonicalSegments = this.resolveSourceSegmentsForDataset(dataset, sourceSegments);
  > +        if (!canonicalSegments || canonicalSegments.length === 0) {
  > +            return null;
  > +        }
  > +        const encodedSegments = canonicalSegments.map(segment => encodeURIComponent(segment));
  > +        if (encodedSegments.length === 0) {
  > +            return null;
  > +        }
  > +        return `${editLinkBase}${encodedSegments.join('/')}`;
  > +    }
  > +
  > +    private resolveSourceSegmentsForDataset(dataset: DatasetManifestEntry | null, sourceSegments: string[]): string[] | null {
  > +        if (!Array.isArray(sourceSegments) || sourceSegments.length === 0) {
  > +            return null;
  > +        }
  > +        const leading = sourceSegments[0];
  > +        if (typeof leading === 'string' && leading.toLowerCase() === 'datasets') {
  > +            return sourceSegments;
  > +        }
  > +        const descriptors = ConfigurationService.describeDatasetDirectories(dataset);
  > +        if (descriptors.length === 0) {
  > +            return sourceSegments;
  > +        }
  > +        if (descriptors.length === 1) {
  > +            return descriptors[0].segments.concat(sourceSegments);
  > +        }
  > +        const matched = descriptors.find(descriptor => !!descriptor.key && descriptor.key === leading);
  > +        if (matched) {
  > +            return matched.segments.concat(sourceSegments.slice(1));
  > +        }
  > +        return descriptors[0].segments.concat(sourceSegments);
  > +    }
  > +
  > +    private static describeDatasetDirectories(dataset: DatasetManifestEntry | null): Array<{ key: string | null, segments: string[] }> {
  > +        if (!dataset || !dataset.sources) {
  > +            return [];
  > +        }
  > +        const rawDirectories = Array.isArray(dataset.sources.dataDirs) && dataset.sources.dataDirs.length > 0
  > +            ? dataset.sources.dataDirs
  > +            : (dataset.sources.dataDir ? [dataset.sources.dataDir] : []);
  > +        return rawDirectories
  > +            .map(entry => {
  > +                const segments = ConfigurationService.splitPath(entry);
  > +                const key = ConfigurationService.deriveDatasetKeyFromSegments(segments);
  > +                return {
  > +                    key,
  > +                    segments
  > +                };
  > +            })
  > +            .filter(descriptor => descriptor.segments.length > 0);
  > +    }
  > +
  > +    private static deriveDatasetKeyFromSegments(segments: string[]): string | null {
  > +        if (!Array.isArray(segments) || segments.length === 0) {
  > +            return null;
  > +        }
  > +        const datasetsIndex = segments.findIndex(segment => segment.toLowerCase() === 'datasets');
  > +        if (datasetsIndex >= 0 && datasetsIndex + 1 < segments.length) {
  > +            return segments[datasetsIndex + 1];
  > +        }
  > +        if (segments.length >= 2) {
  > +            const last = segments[segments.length - 1].toLowerCase();
  > +            if (last === 'data' || last === 'dataset') {
  > +                return segments[segments.length - 2];
  > +            }
  > +        }
  > +        return segments[segments.length - 1];
  > +    }
  > *** End Patch
  > ```
  > - Result: Replaced edit-link generation to honor preserved source directories and dataset keys.
  > ---
  > **Bash** `rg "resolveEditLinkBase" -n src/app/components/comparison/configuration/configuration.service.ts`
  > - Output: Confirmed surrounding helper order after refactor.
  > ---
  > **Bash** `sed -n '360,460p' src/app/components/comparison/configuration/configuration.service.ts`
  > - Output: Verified new helper placements and ensured trailing methods intact.
  > ---
  > **Bash** `sed -n '1,80p' src/app/components/datasets/dataset-manifest.service.ts`
  > - Output: Inspected generated manifest service to extend interface.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/datasets/dataset-manifest.service.ts
  > @@
  >    preferredTheme?: 'light' | 'dark';
  >    isDefault?: boolean;
  >    sources?: {
  >      dataDir?: string;
  > +    dataDirs?: string[];
  >      config?: string;
  > +    configDefaults?: string[];
  >      description?: string;
  >      style?: string;
  >      editBaseUrl?: string;
  >    };
  >  }
  > *** End Patch
  > ```
  > - Result: Updated manifest entry typings with new optional arrays for directory and default configs.
- [x] Run validation build to confirm merged datasets generate correct edit links.
  > **Bash** `npm run build`
  > - Output: Build succeeded; gulp merged datasets while md2json compiled recursively, Angular build completed with existing warnings only.
  > ---
  > **Bash** `jq '.[0].sourcePath' dist/all/data.json`
  > - Output: Confirmed first aggregated entry retained full path `datasets/aie-model/data/codegeex.md`.
  > ---
  > **Bash** `jq '.[10].sourcePath' dist/all/data.json`
  > - Output: Verified additional entry path `datasets/code-agent/data/coderabbit.md`, showing dataset prefixes preserved across sources.
