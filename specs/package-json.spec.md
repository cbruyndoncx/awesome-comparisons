# Package Configuration

Package.json configuration file that defines project metadata, scripts, and dependencies for the Ultimate Comparison framework. This package provides both a library framework and a CLI tool for creating comparison websites.

## Target

[@describe](../package.json)

## Capabilities

### Project Metadata

Defines core package information including name, version, license, repository details, and CLI tool provision.

- Package name is "ultimate-comparison"
- Version follows semantic versioning
- MIT license is specified
- Repository points to ultimate-comparison-BASE GitHub repo
- Exposes "awcmp-cli" command through bin configuration pointing to ./lib/awcmp-cli/awcmp-cli

### Published Files

Controls what files are included when the package is published to npm.

- Includes dist, configuration, data, LICENSE, bin, and lib directories
- Excludes source files, development configurations, and node_modules

### Angular CLI Workflow Scripts

Defines npm scripts for the modern Angular 17 development workflow with gulp data preparation.

- "data:prepare" script runs gulp default task for data preparation
- "data:watch" script runs gulp dev task for continuous data watching
- "start" script prepares data then serves with Angular CLI
- "dev" script runs concurrent data watching and Angular CLI serve
- "build" script prepares data then builds with Angular CLI
- "build:prod" script prepares data then builds production configuration
- "test" script runs Angular CLI test command
- "release" script builds production version

### Angular 17 and NgRx Runtime Dependencies

Manages Angular 17 framework and NgRx 17 state management dependencies.

- Angular 17.3.8 framework packages
- NgRx 17.1.1 for state management
- RxJS 7.8.1 for reactive programming
- Zone.js 0.14.4 for change detection
- TypeScript library support with tslib

### Babel Transpilation Support

Runtime Babel packages required for gulp to transpile ES modules during data processing pipeline.

- @babel/core ^7.8.4 for core transpilation functionality
- @babel/preset-env ^7.8.4 for environment-specific transformations
- @babel/register ^7.8.3 for on-the-fly transpilation during gulp task execution
- Includes a top-level `"babel"` configuration block in package.json with presets set to `["@babel/preset-env"]` to enable legacy module transpilation

### Data and Export Libraries

Runtime dependencies for data processing and content export functionality.

- Gulp build system (gulp, gulp-exec, gulp-rename)
- Date handling with moment
- Markdown processing via in-house helper (no external dependency)
- Utility functions with lodash
- Command line argument parsing with minimist

### Runtime Tooling

Additional runtime dependencies for serving and development.

- Development server with angular-http-server

Note: The Babel configuration (presets: ["@babel/preset-env"]) is present to transpile the gulp build scripts.

### Development Tooling Dependencies

Manages Angular CLI tooling and testing framework dependencies for Node 20 compatibility. Includes patch-package to enable local patches to be applied during npm install.

- Angular DevKit build tools 17.3.8
- Angular CLI 17.3.8
- Angular compiler and language service
- Jasmine 5.1.1 testing framework
- Karma 6.4.2 test runner
- TypeScript 5.2.2 compiler
- Node 20 type definitions
- patch-package ^8.0.0 for applying local module patches during postinstall

### ESM Module Compatibility

Migrates away from CommonJS-only packages to reduce bundler warnings and rely on browser-native capabilities.

- Removes CommonJS `file-saver` package in favor of browser-native file download APIs
- Removes CommonJS `showdown` markdown renderer in favor of a lightweight in-house markdown helper
- Ensures compatibility with modern bundlers and ES module workflows

## API

```json { .api }
{
  "name": "string",
  "version": "string (semver)",
  "scripts": {
    "data:prepare": "string (command)",
    "data:watch": "string (command)",
    "start": "string (command)",
    "dev": "string (command)",
    "build": "string (command)",
    "build:prod": "string (command)",
    "test": "string (command)",
    "release": "string (command)"
  },
  "files": ["string (glob patterns)"],
  "bin": {
    "commandName": "string (path to executable)"
  },
  "license": "string",
  "repository": {
    "type": "string",
    "url": "string"
  },
  "babel": {
    "presets": ["string"]
  },
  "dependencies": {
    "packageName": "string (version range)"
  },
  "devDependencies": {
    "packageName": "string (version range)"
  }
}
```

## Dependencies

### Build Configuration

Angular CLI build configuration and workspace settings.
[@use](../angular.json)
