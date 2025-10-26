# Angular CLI Configuration

Angular CLI workspace configuration for the ultimate-comparison project.

## Target

[@generate](../../angular.json)

## Capabilities

### Single Application Project

Defines the ultimate-comparison application with uc prefix.

### Build Configuration

Configures build target with proper entry points and asset handling:
- Main entry point at src/main.ts
- Polyfills at src/polyfills.ts  
- TypeScript configuration at src/tsconfig.app.json
- Output directory at dist/ultimate-comparison
- Assets include favicon, assets, fonts directories and configuration/data content

### Environment-Specific Builds

Provides production and development build configurations:
- Production enables output hashing and file replacements
- Development preserves source maps and vendor chunks
- Bundle budgets for size monitoring

### Development Server

Configures dev-server target with build configuration options.

### Test Configuration

Configures test target with Karma builder and proper test setup.

### Default Project

Sets ultimate-comparison as the default project in the workspace.

## API

```json { .api }
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ultimate-comparison": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "prefix": "uc"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "uc",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/ultimate-comparison",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/fonts",
              {
                "glob": "**/*",
                "input": "configuration/",
                "output": "configuration/"
              },
              {
                "glob": "**/*", 
                "input": "data/",
                "output": "data/"
              }
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "3mb",
                  "maximumError": "5mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "200kb",
                  "maximumError": "400kb"
                }
              ]
            },
            "development": {
              "optimization": false,
              "sourceMap": true,
              "vendorChunk": true
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "buildTarget": "ultimate-comparison:build:development"
          },
          "configurations": {
            "production": {
              "buildTarget": "ultimate-comparison:build:production"
            }
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/fonts",
              {
                "glob": "**/*",
                "input": "configuration/",
                "output": "configuration/"
              },
              {
                "glob": "**/*",
                "input": "data/",
                "output": "data/"
              }
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          }
        }
      }
    }
  },
  "defaultProject": "ultimate-comparison"
}
```

## Dependencies

### Angular CLI

Provides the CLI tooling and workspace management capabilities referenced in the schema.
[@use](../../package.json)

### Angular DevKit Build Angular

Provides the browser, dev-server, and karma builders used in the architect configuration.
[@use](../../package.json)
