# Md2Json CLI

Node entry point that wires command line arguments into the Md2Json converter.

## Target

[@generate](../../../lib/md2json/cli.ts)

## Capabilities

### Parse CLI arguments

Provide both modern flag support and the legacy positional fallbacks expected by existing gulp scripts.

- Accepts `--input`, `--tmp`, `--output`, `--level`, and `--pretty`
- Falls back to positional arguments `input tmp output [level] [pretty]` when flags are not supplied
- Validates that required paths are present; prints usage guidance and exits non-zero if they are missing
- Coerces `level` to a number (defaults to 2) and `pretty` to a boolean (`true`, `1`, `yes`)
- Parses arguments via `minimist`’s default export so the CLI works consistently under CommonJS
- Verified by [@test](../../../tests/lib/md2json-cli/md2json.cli.spec.ts)

### Integrate with Md2Json

Instantiates the generated `Md2Json` class and delegates conversion work.

- Passes `level` and `pretty` into the class constructor
- Constructs the converter with `{ level, pretty }` so options remain extensible
- Calls `dirToJson(inputDir, tmpDir, outputPath)` and awaits the returned promise
- Surfaces stdout/stderr exactly once so gulp can capture logs in `tmp/error.log`
- Verified by [@test](../../../tests/lib/md2json-cli/md2json.cli.spec.ts)

### Error handling and exit codes

- On recoverable argument errors, print a helpful message and exit with status `1`
- On converter failures (rejected promise, thrown error), print the error message to stderr and exit `1`
- On success, exit with `0`
- Verified by [@test](../../../tests/lib/md2json-cli/md2json.cli.spec.ts)

## API

```typescript { .api }
export async function main(argv: string[]): Promise<void>;
```

## Dependencies

### Argument parsing

[@use](minimist)

### Converter integration

Uses the `Md2Json` class defined by the sibling converter spec.

### Node typings

[@use](@types/node)
