# Goal: Fix GitHub Actions install failure (NgRx peer deps vs Angular 21)
Background: GitHub Pages deploy workflow runs `npm ci`. It failed due to a peer dependency mismatch: `@ngrx/router-store@20.x` expects Angular 20, while this repo uses Angular 21.

## Task List
- [x] Identify conflicting dependencies
- [x] Upgrade NgRx packages to Angular 21-compatible versions
- [x] Regenerate lockfile and verify `npm ci` succeeds
- [x] Verify production build still succeeds

## Task Outputs

> ### Identify conflict (tools: conversation)
> - Reported by GitHub Actions: `@ngrx/router-store@20.1.0` requires `@angular/common@^20.0.0`, but repo uses `@angular/common@21.0.3`.

> ### Upgrade NgRx and update lockfile (tools: `apply_patch`, `shell_command`)
> - `apply_patch` updated `package.json` to `@ngrx/store@^21.0.0` and `@ngrx/router-store@^21.0.0`.
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "npm install --package-lock-only" }`
>   - Output summary: lockfile now resolves `@ngrx/store@21.0.1` and `@ngrx/router-store@21.0.1`.

> ### Verify CI commands (tools: `shell_command`)
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "npm ci" }` → succeeded.
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "npm run build:prod -- --base-href \"/awesome-comparisons/\"" }` → succeeded.

