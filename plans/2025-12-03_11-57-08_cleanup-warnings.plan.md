# Plan: Clean Build Warnings

Resolve Angular build warnings raised after the npm upgrade by removing duplicate theming output and excluding unused environment/vendor entry points.

## Tasks

- [x] Investigate Angular Material duplicate theme warning and implement a fix
  > **Bash** `sed -n '1,200p' src/styles/theme.scss`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  >
  > Inspected theming pipeline and found both global `mat.all-component-themes` and scoped color mixins, causing duplicate CSS generation.
  > ---
  > **Edit** `src/styles/theme.scss`
  > - Removed the redundant global `@include mat.all-component-themes($light-theme);` and scoped Material mixins per theme to diagnose duplication.
  > - Iterated on the approach and settled on Angular Material's recommended structure: emit the full light theme globally once, keep `.uc-light-theme` for custom CSS variables only, and scope `.uc-dark-theme` to `mat.all-component-colors($dark-theme)`.
  >
  > Eliminated the duplicate theme emission (colors + typography/density) that triggered the warnings while keeping custom CSS variable definitions untouched.
- [x] Remove unused environment and vendor files from compilation or integrate them properly
  > **Bash** `cat src/tsconfig.app.json`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  >
  > Confirmed config included `**/*.ts`, forcing every environment/vendor file into the compilation and triggering warnings.
  > ---
  > **Edit** `src/tsconfig.app.json`
  > - Updated `include` to only pull in declaration files so entry points stay limited to `main.ts`/`polyfills.ts`.
  >
  > By mirroring the Angular CLI default, unused source files (environment.prod/custom, vendor.ts) are no longer auto-included, preventing future warnings while still working with file replacements.
- [x] Re-run build to confirm warnings are resolved
  > **Bash** `npm run build`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - timeout_ms: `120000`
  >
  > Build initially failed because `mat.all-component-density` is unavailable in the current Angular Material version, confirming the need to fall back to the recommended pattern (global light theme, scoped dark colors only).
  > ---
  > **Bash** `npm run build`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - timeout_ms: `120000`
  >
  > Successful run after restructuring theming includes. All duplicate-style warnings are gone; the only remaining message is the pre-existing CommonJS notice for `diff2html/hogan.js`.
