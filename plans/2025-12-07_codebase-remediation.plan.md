# Plan: Codebase Remediation and Modernization

This plan addresses critical technical debt, architectural anti-patterns, and tooling issues identified in the codebase review. The goal is to bring the project up to modern Angular standards, ensure type safety, and improve maintainability.

## Tasks

### Phase 1: Architecture Cleanup & Critical Fixes

- [x] Fix Module Imports
    - Replace `BrowserModule` with `CommonModule` in feature modules (`ComparisonModule`, `ConfigAdminModule`).
    - Ensure `BrowserModule` is only imported in `AppModule`.

- [x] Remove Singleton Anti-Pattern in `ComparisonComponent`
    - Remove `static instance` from `ComparisonComponent`.
    - Refactor usages to use Dependency Injection or a shared Service.

- [x] Enable Strict Mode (Incremental)
    - Update `tsconfig.json` to enable `strict: true`.
    - Update `angular.json` to enable `strictTemplates`.
    - Fix immediate compilation errors resulting from these changes.
      - [x] Fixed `js-yaml` v4 breaking changes in build scripts.
      - [x] Fixed Redux reducer type errors.
      - [x] Fixed component property initialization errors.
      - [ ] Fix remaining component initialization errors (Input components).
      - [ ] Fix `theme.service.ts` module resolution error.

### Phase 2: State Management Refactoring

- [ ] Split "God Reducer" (`uc.reducers.ts`)
    - Break down `masterReducer` into feature-specific reducers (e.g., `search.reducer`, `filter.reducer`, `data.reducer`).
    - Use `ActionReducerMap` to combine them.

- [ ] Enforce State Immutability
    - Enable NgRx runtime checks (`strictStateImmutability`, `strictActionImmutability`) in `AppModule`.
    - Refactor reducers to use spread operators or `ngrx/entity` instead of direct mutation.

### Phase 3: Tooling & Documentation

- [ ] Migrate Linter
    - Uninstall `tslint` and `codelyzer`.
    - Install `eslint`, `@angular-eslint/builder`, `@angular-eslint/schematics`.
    - Configure `.eslintrc.json`.

- [ ] Populate Documentation
    - Update `KNOWLEDGE.md` with project architecture, build process, and state management details.
