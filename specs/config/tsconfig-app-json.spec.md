# Application TSConfig (`tsconfig.app.json`)

Angular 17 application-specific TypeScript configuration for the browser build.

## Target

[@describe](../../src/tsconfig.app.json)

## Capabilities

### Inherit shared settings from root config
- Extends the root `tsconfig.json` to inherit shared compiler settings and configurations

### Configure compiler options for browser build
- Sets the output directory to `../dist/out-tsc/app` for compiled application files
- Configures an empty types array to avoid automatic inclusion of ambient type definitions

### Define explicit entry files
- Specifies `main.ts` and `polyfills.ts` as the primary entry points for compilation

### Include source files
- Includes all TypeScript declaration files and source files in the compilation

### Exclude test files from compilation
- Excludes test runner configuration and spec files from the application build

## API

```json { .api }
{
  "extends": string,
  "compilerOptions": {
    "outDir": string,
    "types": string[]
  },
  "files": string[],
  "include": string[],
  "exclude": string[]
}
```

## Dependencies

### Shared configuration
- Inherits common compiler settings from the workspace root TSConfig. [@use](../../tsconfig.json)