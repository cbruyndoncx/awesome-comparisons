# Codebase Review Report: Awesome Comparisons

## Executive Summary
The `awesome-comparisons` repository is an Angular 17 application designed as a "comparison framework". While the dependencies are modern, the codebase exhibits significant technical debt, architectural anti-patterns, and a lack of standard Angular practices. It appears to be a mix of legacy code patterns and over-engineered custom tooling, consistent with the assessment of being developed by a less experienced Angular developer (or an automated tool with loose constraints).

## detailed Findings

### 1. Configuration & Tooling
*   **Safety Checks Disabled**: The project explicitly disables critical safety features in `tsconfig.json` and `angular.json`:
    *   `strict: false`: Disables TypeScript strict type checking.
    *   `strictTemplates: false`: Disables Angular template type checking.
    *   `strictStateImmutability: false` in NgRx: Allows direct mutation of Redux state.
*   **Linting**: The project relies on `tslint.json` (deprecated) and `codelyzer`, but these are not properly configured in `package.json` for a modern Angular environment (which should use `angular-eslint`).
*   **Build Complexity**: There is a high degree of custom tooling (`lib/gulp`, `scripts/*.js`) wrapping standard Angular CLI commands. This adds unnecessary complexity and makes the build process harder to debug.

### 2. Angular Architecture & Best Practices
*   **Module Management**:
    *   Feature modules (e.g., `ComparisonModule`) import `BrowserModule`. This is a fundamental error; feature modules should import `CommonModule`. `BrowserModule` should only be imported once in `AppModule`.
*   **Component Design**:
    *   **Singleton Anti-Pattern**: `ComparisonComponent` assigns itself to a static property (`static instance = this`). This breaks the component lifecycle, dependency injection, and makes testing impossible.
    *   **Direct DOM/Change Detection**: Manual calls to `this.cd.markForCheck()` and direct access to global services/statics suggest a struggle with Angular's reactive data flow.
*   **State Management (NgRx)**:
    *   **God Reducer**: `uc.reducers.ts` is a monolithic file (>40KB) containing the "master reducer", which is unmaintainable.
    *   **Mutation**: Reducers directly mutate state (e.g., `state.criterias = ...`), violating the core principle of Redux immutability. This leads to unpredictable bugs.
    *   **Lack of Effects**: No NgRx Effects were observed. Side effects are likely mixed into components or services.

### 3. Documentation
*   **Status**: `README.md` is informative regarding usage. `AGENTS.md` suggests the project is managed by "Tessl" agents.
*   **Missing Docs**: `KNOWLEDGE.md` is empty.

### 4. Testing
*   **Absence of Tests**: There are very few, if any, unit tests (`.spec.ts`) visible in the feature directories. The testing infrastructure exists (`karma.conf.js`) but doesn't seem to be utilized.

## Recommendations

1.  **Enable Strict Mode**: Gradually enable `strict: true` in TypeScript and `strictTemplates: true` in Angular to catch bugs.
2.  **Refactor NgRx**: Split the "God reducer" into feature reducers. Enforce state immutability. Introduce Selectors for efficient state access.
3.  **Fix Component Architecture**: Remove static component instances. Use Services for state sharing (or the Store).
4.  **Standardize Tooling**: Reduce reliance on custom Gulp/Node scripts where Angular CLI builders can be used.
5.  **Modernize Linting**: Migrate from TSLint to ESLint.
6.  **Add Tests**: Begin adding unit tests for core logic, especially the reducers and data processing services.
