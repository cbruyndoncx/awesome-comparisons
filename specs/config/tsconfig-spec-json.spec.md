# TypeScript Test Configuration

TypeScript configuration file specifically for test compilation, extending the main project configuration with test-specific settings.

## Target

[@describe](../../src/tsconfig.spec.json)

## Capabilities

### Extends Base Configuration

Ensures the test configuration inherits all compiler options from the main `tsconfig.json` for consistency with the primary build.

### Test Output Directory Configuration

Configures the compiler to emit test build artifacts into `../dist/out-tsc/spec`, keeping test outputs separate from the main application output.

### Test Type Definitions

Includes only the Jasmine type definitions to support the test framework and omits Node.js types for a cleaner test environment.

### Test File Inclusion

Specifies that test compilation includes the `test.ts` and `polyfills.ts` entry files, as well as all `*.spec.ts` and `*.d.ts` files within the test directory.

## API

```json { .api }
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../dist/out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "files": [
    "test.ts",
    "polyfills.ts"
  ],
  "include": [
    "**/*.spec.ts",
    "**/*.d.ts"
  ]
}
```

## Dependencies

### Base TypeScript Configuration

Extends the main project TypeScript configuration to inherit base compiler options.

[@use](../../tsconfig.json)

### Test Entry Files

References specific test entry files required for proper test compilation.

[@use](../../src/test.ts)  
[@use](../../src/polyfills.ts)