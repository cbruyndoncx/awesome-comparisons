# Repository Guidelines

## MANDATORY: Use td for Task Management

Run td usage --new-session at conversation start (or after /clear). This tells you what to work on next.

Sessions are automatic (based on terminal/agent context). Optional:
- td session "name" to label the current session
- td session --new to force a new session in the same context

Use td usage -q after first read.

## Agent Rules
This file is updated running `tessl registry install`. If a linked file is missing, make sure to run the command to download any missing tiles from the registry.

## Knowledge Index
Documentation for dependencies and processes can be found in the [Knowledge Index](./KNOWLEDGE.md). The Knowledge Index is a centralized reference for documentation about dependencies and processes used in the project. It helps ensure consistency when selecting dependency versions and provides quick access to relevant documentation.

## Agent Workflow
- **Interview the user**: Before making significant changes, interview the user to get details and clarify requirements. Ask one or two questions at a time.
- **Provide feedback**: Ask for feedback on proposed plans before implementation. Highlight key choices or potential gaps.
- **Iterative approach**: Work in small increments, focusing on a few files at a time. Start with a simple version and add features iteratively.

## Plan Files
ALWAYS create plan files when planning. Create a new plan file in the `plans/` directory at the root of the project.
- Plan filename format: `YYYY-MM-DD_HH-mm-ss_descriptive-name.plan.md`
- Keep the plan file in sync with your native task tracking tool.
- Update the plan file immediately after completing EACH task. Do NOT batch updates.
- Plan File Structure:
    1. **Header**: Overall goal and background context.
    2. **Task List**: Markdown checkboxes for each task.
    3. **Task Outputs**: Document results as blockquotes after each task, including tool names, parameters, and summaries of output.

## Project Bootstrapping
Use Node 20+, then run `npm install` to populate `node_modules/`. Development targets Angular 21 with TypeScript 5 and NgRx 20, Gulp 4, and Angular CLI for build tooling. Build distributables with `npm run build` (invokes Angular CLI); publish with `npm run release`. Gulp now uses the built-in TypeScript md2json CLI located at `lib/md2json/dist/cli.js` for markdown-to-JSON conversion.

## Project Structure & Module Organization
Core Angular code lives in `src/app`, feature modules sit under `components/**`, and ngrx state is in `redux/**`. Global entry points (`main.ts`, `polyfills.ts`) plus HTML remain in `src/`. Comparison content lives in `data/`, YAML config in `configuration/`, and tooling (gulp, webpack, CLI) in `lib/`. Docs and static assets are under `docs/` and `src/assets/`.

## Build, Test, and Development Commands
- `npm run dev -- --dataset <id>`: concurrent watch mode (gulp data rebuild + config workspace at http://localhost:3100 via proxy + Angular dev server on http://localhost:4200).
- `npm run start -- --dataset <id>`: one-time data prepare, start config workspace server, then launch Angular dev server.
- `npm run build`: dataset-aware production build into `dist/` (use `--dataset <id>` and/or `--clean` as needed).
- `npm run build:prod`: production configuration build (runs environment generation).
- `npm run release`: build + stamp version metadata for release.

**Environment Setup for Data Processing**: The gulp data steps (`npm run data:prepare` and `npm run data:watch`) automatically invoke the TypeScript md2json CLI at `lib/md2json/dist/cli.js`. No environment variables are required—install Node 20+ and run `npm install`.

## Coding Style & Naming Conventions
Follow `.eslintrc.json`: four-space indentation, single quotes, semicolons, `prefer-const`, and max 140 columns. Angular selectors carry the `uc-` prefix, and component files stay co-located (`foo.component.ts/html/css`). Keep ngrx artifacts grouped by feature (`*.actions.ts`, `*.reducers.ts`). Avoid `console.debug/info/time` per lint rules; use PascalCase classes with camelCase members.

## Testing Guidelines
Automated specs are not yet present; rely on `npm run build` plus manual UI smoke tests (loading comparisons, filtering, exporting). When adding tests, colocate Jasmine specs as `*.spec.ts`, register them in `tsconfig.spec.json`, and wire them to `npm test` once the first suite lands.

## Commit & Pull Request Guidelines
Git history favors short, imperative subjects (e.g., "Add missing files"). Provide rationale or linked issues in the body when context is non-trivial. Pull requests should outline changes, list verification steps, and attach screenshots for UI tweaks. Flag configuration or data migrations so reviewers can reproduce them locally.
