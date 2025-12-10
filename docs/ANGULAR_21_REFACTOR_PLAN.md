# Angular 21 Codebase Review & Refactoring Plan

## Executive Summary
The codebase has been successfully upgraded to Angular 21, but it currently runs in a "legacy compatibility" mode. It utilizes Webpack instead of esbuild, NgModule instead of Standalone Components, and Default Change Detection instead of OnPush. Modernizing these aspects will yield significant performance improvements (smaller bundles, faster runtime) and developer experience benefits.

## 1. High-Impact Refactoring Opportunities (Phase 1)
*Recommended for immediate implementation.*

### A. Migration to `application` Builder (High Performance)
*   **Current State**: Uses `@angular-devkit/build-angular:browser` (Webpack).
*   **Target State**: Use `@angular-devkit/build-angular:application` (esbuild + Vite).
*   **Benefit**: 2-4x faster builds, smaller bundles, better tree-shaking.
*   **Risk**: Low. Requires checking `zone.js` usage and simple config updates in `angular.json`.

### B. Change Detection Strategy (High Performance)
*   **Current State**: `ChangeDetectionStrategy.Default` (CheckAlways) is implicit in most components.
*   **Target State**: `ChangeDetectionStrategy.OnPush`.
*   **Benefit**: Massive reduction in change detection cycles. The app currently re-checks the entire component tree on every event.
*   **Action**: Add `changeDetection: ChangeDetectionStrategy.OnPush` to `ComparisonComponent` and others. Rely on `async` pipe or Signals to drive updates.

### C. Signal-Based State Management
*   **Current State**: Manual `BehaviorSubject` management and `store.select()` with `async` pipe. Manual memoization in `ComparisonComponent` (`activeFiltersCache`).
*   **Target State**: Use Angular Signals (`signal()`, `computed()`, `toSignal()`).
*   **Benefit**: Fine-grained reactivity. `activeFiltersCache` can be replaced with a `computed()` signal that updates only when dependencies change, eliminating manual cache invalidation logic.

## 2. Architecture Modernization (Phase 2)
*Recommended for medium-term implementation.*

### A. Standalone Components
*   **Current State**: Explicit `standalone: false` and heavy `NgModule` usage (`AppModule`, `ComparisonModule`).
*   **Target State**: Convert all components to `standalone: true`. Remove `AppModule`.
*   **Benefit**: Simplified architecture, better tree-shaking, lazy loading becomes trivial.

### B. Modern Dependency Injection
*   **Current State**: Constructor injection (`constructor(private store: Store...)`).
*   **Target State**: `inject()` function (`private store = inject(Store)`).
*   **Benefit**: Type-safe, composable, and decouples instantiation from class hierarchy.

### C. Typed Forms
*   **Current State**: `AddEntryModalComponent` uses `FormGroup` and `FormControl`.
*   **Target State**: Ensure strict typing `FormGroup<{ name: FormControl<string> }>`.
*   **Benefit**: Compile-time safety for form interactions.

## 3. NgRx Modernization (Phase 3)
*Recommended for long-term maintenance.*

### A. Functional Creators
*   **Current State**: Class-based Actions (`class UCSearchUpdateAction implements Action`) and switch-statement Reducers.
*   **Target State**: `createAction()` and `createReducer()`.
*   **Benefit**: Less boilerplate, better type inference, cleaner code.

### B. Immutability Checks
*   **Current State**: Explicitly disabled in `AppModule`: `strictStateImmutability: false`.
*   **Target State**: Enable strict checks.
*   **Benefit**: Prevents subtle bugs caused by accidental state mutation.

## 4. Code Quality & Cleanup
*   **Linting**: 270+ ESLint warnings exist (from previous summary). These should be addressed.
*   **Templates**: `comparison.template.html` uses new control flow (`@if`), which is excellent. Ensure all other templates follow suit.
*   **Legacy Utils**: `zone.js` is still present. Future Angular versions (21+) aim for Zoneless. Moving to OnPush and Signals prepares the app for Zoneless.

## Recommendations
1.  **Start with Phase 1**: Switch to esbuild and OnPush. These provide the best ROI.
2.  **Refactor `ComparisonComponent`**: It is the core of the app. converting it to use Signals for filter logic will simplify the complexity found in `activeFiltersCache`.
