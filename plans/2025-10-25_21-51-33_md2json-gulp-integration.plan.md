# Plan: Make gulp always use md2json npm script

Remove the `MD_TO_JSON_COMMAND` dependency by having the gulp `markdown` task call `npm run md2json:run` with the appropriate paths.

## Tasks

- [x] Update `lib/gulp/gulpfile.babel.js` so `markdown` always shells out to `npm run md2json:run -- --input ... --tmp ... --output ...` instead of reading environment variables.
  > **Edit** `apply_patch` (lib/gulp/gulpfile.babel.js)
  >
  > Replaced the `MD_TO_JSON_COMMAND` lookup with a fixed `npm run md2json:run` invocation so gulp always executes the TypeScript converter, keeping path arguments aligned with the existing `paths`/`files` values.
- [x] Verify the command string matches the existing path logic (`paths.data`, `paths.json`, `files.dataJson`) and update any related logging/documentation if needed.
  > **Bash** `{"command":["bash","-lc","sed -n '130,190p' lib/gulp/gulpfile.babel.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Initially verified the npm command usage, but after the user report, switched gulp to invoke the converter directly via an absolute `node .../lib/md2json/dist/cli.js` path so the working-directory change inside gulp no longer causes duplicate/relative arguments.
