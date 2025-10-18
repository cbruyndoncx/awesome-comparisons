# TypeScript Configuration

Root TypeScript configuration file that defines compilation settings and project structure for the Angular 17 application.

## Target

[@describe](../../tsconfig.json)

## Capabilities

### Compilation Target and Module System

Configures TypeScript compilation to target ES2022 with ES2020 modules for modern JavaScript features and better tree-shaking.

- Target is set to "es2022" [@test](./test-target-es2022.spec.ts)
- Module system is set to "es2020" [@test](./test-module-es2020.spec.ts)
- Module resolution uses "node" strategy [@test](./test-module-resolution.spec.ts)

### Output Configuration

Defines build output directories and base URL for module resolution.

- Base URL is set to current directory [@test](./test-base-url.spec.ts)
- Output directory is "./dist/out-tsc" [@test](./test-out-dir.spec.ts)
- Compile on save is disabled [@test](./test-compile-on-save.spec.ts)

### Module Resolution and Interoperability

Enables modern module resolution features for better compatibility with various module formats.

- JSON module resolution is enabled [@test](./test-resolve-json-module.spec.ts)
- ES module interoperability is enabled [@test](./test-es-module-interop.spec.ts)
- Library check skipping is enabled for performance [@test](./test-skip-lib-check.spec.ts)

### Type System and Strictness

Configures TypeScript's type checking with selective strictness for gradual migration.

- Strict mode is disabled for gradual migration [@test](./test-strict-mode.spec.ts)
- Consistent casing in file names is enforced [@test](./test-consistent-casing.spec.ts)
- Implicit override is not allowed [@test](./test-no-implicit-override.spec.ts)
- Property access from index signatures is allowed [@test](./test-no-property-access-index.spec.ts)
- Implicit returns are not allowed [@test](./test-no-implicit-returns.spec.ts)
- Fallthrough cases in switch statements are not allowed [@test](./test-no-fallthrough-cases.spec.ts)

### Class Field Definitions

Controls how class fields are handled for Angular compatibility.

- defineProperty is not used for class fields [@test](./test-use-define-class-fields.spec.ts)

### Decorator Support

Enables experimental decorator support and metadata emission for Angular dependency injection.

- Experimental decorators are enabled [@test](./test-decorators.spec.ts)
- Decorator metadata emission is enabled [@test](./test-decorator-metadata.spec.ts)

### Library and Type Definitions

Includes ES2022 and DOM libraries with Node.js type definitions.

- ES2022 and DOM libraries are included [@test](./test-lib-es2022.spec.ts)
- Node types are available [@test](./test-types-node-only.spec.ts)

### Angular Compiler Options

Configures Angular-specific compilation settings with relaxed strictness for gradual migration.

- Strict injection parameters is disabled [@test](./test-strict-injection-parameters.spec.ts)
- Strict input access modifiers is disabled [@test](./test-strict-input-access-modifiers.spec.ts)
- Strict templates is disabled [@test](./test-strict-templates.spec.ts)

## API

```json { .api }
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": false,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "useDefineForClassFields": false,
    "module": "es2020",
    "moduleResolution": "node",
    "target": "es2022",
    "lib": ["es2022", "dom"],
    "types": ["node"],
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "skipLibCheck": true
  },
  "angularCompilerOptions": {
    "strictInjectionParameters": false,
    "strictInputAccessModifiers": false,
    "strictTemplates": false
  }
}
```