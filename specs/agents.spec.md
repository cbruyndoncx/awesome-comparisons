# Repository Guidelines Documentation

Provides comprehensive guidelines and instructions for developers working on this Angular TypeScript project, including development setup, coding standards, build processes, and workflow requirements.

## Target

[@describe](../AGENTS.md)

## Capabilities

### Tessl Framework Integration

Integrates with the Tessl spec-driven development framework and references core framework documentation.

- References Tessl framework agents documentation
- Links to RULES.md for agent instructions
- Points to Knowledge Index for dependency documentation
- Requires plan file creation for planning activities

### Project Environment Setup

Defines the technical requirements and bootstrapping process for the development environment.

- Requires Node 20+ for development
- Targets Angular 17 with TypeScript 5 and NgRx 17
- Uses Gulp 4 and Angular CLI for build tooling
- Provides `npm install` command for dependency installation
- References bootstrap documentation for automation
- Gulp now uses the built-in TypeScript md2json CLI located at `lib/md2json/dist/cli.js` for markdown-to-JSON conversion, eliminating the need for Python converter environment variables

### Project Structure Documentation

Documents the organization of code, assets, and configuration files within the project.

- Core Angular code organized in `src/app` directory
- Feature modules located under `components/**` structure
- State management in `redux/**` directory
- Global entry points in `src/` root
- Comparison data stored in `data/` directory
- Configuration files in `configuration/` directory
- Build tooling located in `lib/` directory
- Documentation and static assets organized appropriately

### Build and Development Commands

Provides comprehensive build, development, and deployment command documentation with environment requirements.

- `npm run dev` command for concurrent watch mode with gulp data rebuild and webpack-dev-server on localhost:3000
- `npm run start` command for single precompile with `gulp:compile` followed by dev server launch
- `npm run build` command invokes Angular CLI for production bundling to `dist/` directory
- `npm run release` command for package publishing via `lib/gulp/publish.js`
- `npm run data:prepare` and `npm run data:watch` automatically invoke the TypeScript md2json CLI at `lib/md2json/dist/cli.js`; no environment variables are required

### Code Style Standards

Enforces consistent coding standards and naming conventions across the project.

- Four-space indentation requirement
- Single quotes and semicolons enforcement
- Prefer-const rule application
- Maximum 140 column line length
- Angular selectors with `uc-` prefix
- Component file co-location pattern
- NgRx artifacts grouped by feature
- Console `debug`/`info`/`time` restrictions
- PascalCase classes with camelCase members

### Testing Strategy

Defines the current testing approach and future testing implementation guidelines.

- Current reliance on `npm run build` and manual UI smoke tests
- Manual testing covers loading comparisons, filtering, and exporting
- Future Jasmine specs co-located as `*.spec.ts` files
- Test registration in `tsconfig.spec.json`
- Integration with `npm test` command for test execution

### Version Control Guidelines

Establishes commit message standards and pull request requirements.

- Short, imperative commit subjects
- Detailed rationale in commit body when needed
- Pull request change outlines with verification steps
- Screenshot requirements for UI changes
- Configuration and migration flagging for reviewers

## API

```markdown { .api }
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
Use Node 20+, then run `npm install` to populate `node_modules/`. Development targets Angular 17 with TypeScript 5/NgRx 17, Gulp 4, and Angular CLI build. Build distributables with `npm run build`; publish with `npm run release`. Review `.tessl/framework/bootstrap.md` for automation notes.

## Project Structure & Module Organization
Core Angular code lives in `src/app`, feature modules sit under `components/**`, and NgRx state is in `redux/**`. Global entry points (`main.ts`, `polyfills.ts`, `vendor.ts`) plus HTML remain in `src/`. Comparison content lives in `data/`, YAML config in `configuration/`, and tooling (gulp, webpack, CLI) in `lib/`. Docs and static assets are under `docs/` and `src/assets/`.

## Build, Test, and Development Commands
- `npm run dev`: concurrent watch mode (gulp data rebuild + webpack-dev-server on http://localhost:3000).
- `npm run start`: single precompile with `gulp:compile`, then launch the dev server.
- `npm run build`: production bundle into `dist/`; always run before commits to surface TypeScript or template errors.
- `npm run release`: invokes `lib/gulp/publish.js` to package and publish to npm.
- Data preparation (`npm run data:prepare`/`npm run data:watch`) uses the built-in TypeScript md2json CLI at `lib/md2json/dist/cli.js`, no environment variables required.

## Coding Style & Naming Conventions
Follow `tslint.json`: four-space indentation, single quotes, semicolons, `prefer-const`, and max 140 columns. Angular selectors carry the `uc-` prefix, and component files stay co-located (`foo.component.ts/html/css`). Keep NgRx artifacts grouped by feature (`*.actions.ts`, `*.reducers.ts`). Avoid `console.debug/info/time` per lint rules; use PascalCase classes with camelCase members.

## Testing Guidelines
Automated specs are not yet present; rely on `npm run build` plus manual UI smoke tests (loading comparisons, filtering, exporting). When adding tests, colocate Jasmine specs as `*.spec.ts`, register them in `tsconfig.spec.json`, and wire them to `npm test` once the first suite lands.

## Commit & Pull Request Guidelines
Git history favors short, imperative subjects (e.g., "Add missing files"). Provide rationale or linked issues in the body when context is non-trivial. Pull requests should outline changes, list verification steps, and attach screenshots for UI tweaks. Flag configuration or data migrations so reviewers can reproduce them locally.
```

## Dependencies

### Tessl Framework

Framework providing spec-driven development methodology and tooling.
[@use](../.tessl/framework/agents.md)

### Project Rules

Agent instructions and behavioral guidelines for the project.
[@use](../RULES.md)

### Knowledge Index

Documentation index for dependencies and processes.
[@use](../KNOWLEDGE.md)

### Plan Files Framework

Documentation for creating plan files during development planning.
[@use](../.tessl/framework/plan-files.md)

### Bootstrap Documentation

Automation and setup documentation for the project.
[@use](../.tessl/framework/bootstrap.md)