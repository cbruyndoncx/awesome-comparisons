# Repository Guidelines

## Tessl & Spec Driven Development <!-- tessl-managed -->
This project uses the [Tessl spec driven development framework](.tessl/framework/agents.md) and toolkit for software development: @.tessl/framework/agents.md

## Agent Rules <!-- tessl-managed -->
@RULES.md follow the [instructions](RULES.md)

## Knowledge Index <!-- tessl-managed -->
Documentation for dependencies and processes can be found in the [Knowledge Index](./KNOWLEDGE.md)

## Plan Files <!-- tessl-managed -->
ALWAYS create [plan files](.tessl/framework/plan-files.md) when planning: @.tessl/framework/plan-files.md

## Project Bootstrapping <!-- tessl-managed -->
Use Node 20+, then run `npm install` to populate `node_modules/`. Development targets Angular 17 with TypeScript 5 and NgRx 17, Gulp 4, and Angular CLI for build tooling. Build distributables with `npm run build` (invokes Angular CLI); publish with `npm run release`. Gulp now uses the built-in TypeScript md2json CLI located at `lib/md2json/dist/cli.js` for markdown-to-JSON conversion, eliminating the need for Python converter environment variables. Review `.tessl/framework/bootstrap.md` for automation notes.

## Project Structure & Module Organization
Core Angular code lives in `src/app`, feature modules sit under `components/**`, and ngrx state is in `redux/**`. Global entry points (`main.ts`, `polyfills.ts`, `vendor.ts`) plus HTML remain in `src/`. Comparison content lives in `data/`, YAML config in `configuration/`, and tooling (gulp, webpack, CLI) in `lib/`. Docs and static assets are under `docs/` and `src/assets/`.

## Build, Test, and Development Commands
- `npm run dev`: concurrent watch mode (gulp data rebuild + webpack-dev-server on http://localhost:3000).
- `npm run start`: single precompile with `gulp:compile`, then launch the dev server.
- `npm run build`: production bundle into `dist/`; always run before commits to surface TypeScript or template errors.
- `npm run release`: invokes `lib/gulp/publish.js` to package and publish to npm.

**Environment Setup for Data Processing**: The gulp data steps (`npm run data:prepare` and `npm run data:watch`) automatically invoke the TypeScript md2json CLI at `lib/md2json/dist/cli.js`. No environment variables are required - only Node 20+ needs to be installed and `npm install` run to set up the development environment.

## Coding Style & Naming Conventions
Follow `tslint.json`: four-space indentation, single quotes, semicolons, `prefer-const`, and max 140 columns. Angular selectors carry the `uc-` prefix, and component files stay co-located (`foo.component.ts/html/css`). Keep ngrx artifacts grouped by feature (`*.actions.ts`, `*.reducers.ts`). Avoid `console.debug/info/time` per lint rules; use PascalCase classes with camelCase members.

## Testing Guidelines
Automated specs are not yet present; rely on `npm run build` plus manual UI smoke tests (loading comparisons, filtering, exporting). When adding tests, colocate Jasmine specs as `*.spec.ts`, register them in `tsconfig.spec.json`, and wire them to `npm test` once the first suite lands.

## Commit & Pull Request Guidelines
Git history favors short, imperative subjects (e.g., "Add missing files"). Provide rationale or linked issues in the body when context is non-trivial. Pull requests should outline changes, list verification steps, and attach screenshots for UI tweaks. Flag configuration or data migrations so reviewers can reproduce them locally.
