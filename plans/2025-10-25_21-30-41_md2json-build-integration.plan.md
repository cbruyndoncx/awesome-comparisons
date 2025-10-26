# Plan: Compile md2json TypeScript during build

Ensure the TypeScript md2json converter/CLI compile automatically when running the existing npm build flow so `cli.js` exists without extra manual steps.

## Tasks

- [x] Add a dedicated TypeScript config/output directory for `lib/md2json` so the CLI compiles to JavaScript.
  > **Edit** `apply_patch` (lib/md2json/tsconfig.json)
  >
  > Added [lib/md2json/tsconfig.json](../lib/md2json/tsconfig.json) which extends the root settings but overrides `outDir`, `rootDir`, and forces CommonJS output into `lib/md2json/dist`, giving us a dedicated build target for the converter and CLI.
- [x] Update `package.json` scripts (e.g., `data:prepare`, `data:watch`, build pipeline) to run the md2json compilation automatically.
  > **Edit** `apply_patch` (package.json)
  >
  > Added an `md2json:compile` script (`tsc -p ./lib/md2json/tsconfig.json`) and chained it ahead of both `data:prepare` and `data:watch` so every existing flow that prepares data now emits the converter/CLI JavaScript automatically before gulp runs.
- [x] Run the new script to produce `lib/md2json/dist/cli.js`, verify the output is generated, and outline how to invoke it.
  > **MCP** `tessl - build`
  > - spec: ["specs/lib/md2json/md2json.spec.md","specs/lib/md2json/md2json-cli.spec.md"]
  >
  > Regenerated the converter/CLI after updating the spec to allow recursive header children and to mandate `{ level, pretty }` construction so TypeScript compiles cleanly.
  > ---
  > **Bash** `{"command":["bash","-lc","npm run md2json:compile"],"workdir":"/home/cb/projects/github/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Re-run md2json TypeScript compilation after spec updates to emit cli.js.","timeout_ms":120000}`
  >
  > Executed the new script successfully; `lib/md2json/dist/cli.js` and `md2json.js` now exist. Invoke the converter via `node ./lib/md2json/dist/cli.js --input <dir> --tmp <dir> --output <file>`.
  > ---
  > **Edit** `apply_patch` (package.json)
  >
  > Added an `md2json:run` helper script so `MD_TO_JSON_COMMAND` (or gulp) can reference `npm run md2json:run --` when wiring the converter into gulp, plus a `md2json:run:default` variant that self-compiles before executing the common `./data -> ./dist/data.json` flow.
