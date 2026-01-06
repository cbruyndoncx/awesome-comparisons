# Gulp Build System

Build automation system for the Ultimate Comparison framework using Gulp 4. Handles data processing, configuration management, and file transformations for comparison websites.

## Target

[@describe](../../../lib/gulp/gulpfile.babel.js)

## Capabilities

### Path and Directory Management

Dynamically resolves installation paths based on whether the package is installed via npm or running from source.

- Determines correct root directory when running from node_modules [@test](./tests/path-resolution.spec.js)
- Handles custom directory override via --dir argument [@test](./tests/path-resolution.spec.js)
- Creates proper file path mappings for tmp, dist, data, config, and assets directories [@test](./tests/path-resolution.spec.js)
- Strips node_modules/awesome-comparisons path components from installation directory [@test](./tests/path-resolution.spec.js)
- Handles both forward slash and backslash path separators for cross-platform compatibility [@test](./tests/path-resolution.spec.js)

### Markdown to JSON Data Processing

Converts markdown files to JSON using an external Python-based converter, replacing the legacy Java/Gradle implementation.

- Uses external Python converter script instead of Java/Gradle-based processing
- Reads conversion command from MD_TO_JSON_COMMAND environment variable [@test](./tests/markdown-processing.spec.js)
- Logs a warning and skips conversion when MD_TO_JSON_COMMAND is not set, then calls the callback immediately [@test](./tests/markdown-processing.spec.js)
- Deletes existing tmp JSON directory before processing [@test](./tests/markdown-processing.spec.js)
- Constructs the conversion command with `--input "<paths.data>" --output "<files.dataJson>" --tmp "<paths.json>"`, wrapping all paths in double quotes [@test](./tests/markdown-processing.spec.js)
- Appends optional arguments from MD_TO_JSON_ARGS environment variable if provided [@test](./tests/markdown-processing.spec.js)
- Executes the external converter via child_process.execSimple and captures stdout/stderr [@test](./tests/markdown-processing.spec.js)
- Creates the tmp directory if it does not exist after execution [@test](./tests/markdown-processing.spec.js)
- Writes stderr output to the error log file and logs stdout/stderr to the console [@test](./tests/markdown-processing.spec.js)

### Configuration Management

Merges user configuration with auto-generated configuration and outputs final JSON. Trims label value entries in the auto-generated YAML to remove explanatory follow-up lines while preserving main value blocks and metadata.

- Loads user configuration from comparison.yml [@test](./tests/config-processing.spec.js)
- Loads auto configuration from comparison-auto-config.yml [@test](./tests/config-processing.spec.js)
- Combines configurations using Configuration.load and combine methods [@test](./tests/config-processing.spec.js)
- Strips additional indented explanatory lines from label values while keeping the main value and its metadata intact
- Writes merged configuration as comparison.json to dist directory [@test](./tests/config-processing.spec.js)

### Asset Management

Copies static assets and configuration files to distribution directory.

- Copies style.css to dist directory [@test](./tests/asset-management.spec.js)
- Handles dist directory copying between root and node_modules locations [@test](./tests/asset-management.spec.js)
- Skips copying when source and destination directories are identical [@test](./tests/asset-management.spec.js)
- Copies all files from node module dist to root dist when directories differ [@test](./tests/asset-management.spec.js)

### Dataset Manifest Orchestration

Expands the build to support multiple datasets defined in configuration/datasets.manifest.json.

- Loads and validates the manifest file; fails the build when manifest is missing or empty
- Iterates each dataset definition, resolving dataset-specific source directories (markdown, configuration, style) via the `sources` metadata
- Runs the markdown conversion, criteria enrichment, development column enrichment, and config merging per dataset using isolated tmp/dist destinations
- Copies comparison.json, data.json, and style.css into `src/assets/generated/<datasetId>/` and `dist/awesome-comparisons/assets/generated/<datasetId>/`
- Ensures generated files exist only beneath their dataset-specific directories (no legacy root mirrors)
- Copies the manifest itself to `src/assets/configuration/datasets.manifest.json` so the Angular app can request it at runtime
- Validates that required files exist for every dataset and throws descriptive errors when inputs or generated outputs are missing

### Release Management

Maintains footer metadata for official releases.

- Writes `VersionInformation.ts` during release stamping, deriving the build label from `--build`, `--label`, `--tag`, or defaulting to `v<semver core>.<yymmdd>` when none are provided [@test](./tests/release-management.spec.js)
- Copies the package version from `package.json` into `VersionInformation.version` [@test](./tests/release-management.spec.js)
- Sets `tagDate` using `moment().format('YYYY-MM-DD')` for deterministic ISO dates [@test](./tests/release-management.spec.js)
- Builds the release link using the repository base (`https://github.com/cbruyndoncx/awesome-comparisons` by default) or overrides supplied via `--repo`/`--tag-link` [@test](./tests/release-management.spec.js)

### Development Watch Tasks

Provides file watching capabilities for development workflow.

- Watches markdown files and triggers full rebuild [@test](./tests/watch-tasks.spec.js)
- Watches configuration files and triggers config rebuild [@test](./tests/watch-tasks.spec.js)
- Watches style files and triggers asset rebuild [@test](./tests/watch-tasks.spec.js)
- Uses glob patterns to watch files in nested directories [@test](./tests/watch-tasks.spec.js)
- Monitors multiple file types including .md, .yml, and .css [@test](./tests/watch-tasks.spec.js)
- Includes manifest-provided markdown directories so every dataset rebuilds when its data changes

### Task Orchestration

Defines and manages gulp task dependencies and execution order.

- Executes default task series: copyDist, markdown, changeCriteria, development-column, assets, config [@test](./tests/task-orchestration.spec.js)
- Runs development task with file watching [@test](./tests/task-orchestration.spec.js)
- Manages parallel watch tasks for different file types [@test](./tests/task-orchestration.spec.js)
- Combines series and parallel task execution patterns [@test](./tests/task-orchestration.spec.js)

### Global Variable and Constants Management

Defines path structures and file naming conventions used throughout the build system.

- Defines paths object with json, dist, data, config, and assets directories [@test](./tests/constants-management.spec.js)
- Defines names object with standard filenames like data.json, comparison.yml [@test](./tests/constants-management.spec.js)
- Defines files object with complete file paths for all build artifacts [@test](./tests/constants-management.spec.js)
- Defines globs object with glob patterns for file watching [@test](./tests/constants-management.spec.js)
- Uses path.join for cross-platform path construction [@test](./tests/constants-management.spec.js)

### Error Handling and Logging

Manages build process errors and provides debugging information.

- Logs installation directory resolution steps to console [@test](./tests/error-handling.spec.js)
- Captures and logs stdout/stderr from external command execution [@test](./tests/error-handling.spec.js)
- Writes error information to dedicated log files [@test](./tests/error-handling.spec.js)
- Provides warning messages for missing environment configuration [@test](./tests/error-handling.spec.js)

## API

```javascript { .api }
// Gulp task definitions
gulp.task('default', gulp.series(copyDist, markdown, changeCriteria, 'development-column', assets, config));
gulp.task('release', function () { /* version management */ });
gulp.task('development-column', function (done) { /* development column processing */ });
gulp.task('update-data', function () { /* watch markdown files */ });
gulp.task('update-config', function () { /* watch config files */ });
gulp.task('update-style', function () { /* watch style files */ });
gulp.task('update', gulp.parallel(/* all update tasks */));
gulp.task('dev', gulp.series(copyDist, 'default', 'update'));

// Core functions
function assets() { /* copy static assets */ }
function config(done) { /* merge and output configuration */ }
function markdown(callback) { /* convert markdown to JSON */ }
function changeCriteria(done) { /* process criteria */ }
function copyDist(done) { /* copy distribution files */ }

// Path configuration objects
const paths = {
    json: string,     // temporary JSON output directory
    dist: string,     // distribution directory
    data: string,     // markdown data directory
    config: string,   // configuration directory
    assets: string    // assets directory
};

const files = {
    config: string,           // main configuration file path
    dataJson: string,         // output JSON data file path
    autoConfig: string,       // auto configuration file path
    errorLog: string,         // error log file path
    versionInformation: string // version file path
};

const names = {
    data: string,               // data filename
    versionInformation: string, // version info filename
    config: string,            // config filename
    defaultConfig: string,     // default config filename
    autoConfig: string,        // auto config filename
    configJson: string         // JSON config filename
};

const globs = {
    markdown: string,     // markdown file glob pattern
    config: string,       // config file glob pattern
    defaultConfig: string, // default config glob pattern
    description: string,  // description file glob pattern
    style: string,        // style file glob pattern
    bib: string,         // bibliography file glob pattern
    csl: string          // CSL style file glob pattern
};

// Command line arguments
const argv = {
    dir: string,  // directory override argument
    tag: string   // version tag for releases
};

// Environment variables
process.env.MD_TO_JSON_COMMAND: string;  // markdown converter command
process.env.MD_TO_JSON_ARGS: string;     // additional converter arguments
```

## Dependencies

### Internal Task Dependencies

Criteria processing functionality for handling comparison criteria.
[@use](../../../lib/gulp/tasks/criteria.babel.js)

Development column processing for managing development-specific data columns.
[@use](../../../lib/gulp/tasks/developmentColumn.babel.js)

Utility functions including folder deletion operations.
[@use](../../../lib/gulp/tasks/util.babel.js)

Configuration model for loading and combining YAML configurations.
[@use](../../../lib/gulp/model/model.module.js)

### External Dependencies

Gulp 4 build system for task automation.
[@use](gulp)

Gulp exec plugin for executing shell commands.
[@use](gulp-exec)

Moment.js for date formatting in release management.
[@use](moment)

Node.js path module for file path operations.
[@use](path)

Node.js child_process for executing external commands.
[@use](child_process)

Node.js fs module for file system operations.
[@use](fs)

YAML parser for configuration file processing.
[@use](js-yaml)

Minimist for command line argument parsing.
[@use](minimist)
