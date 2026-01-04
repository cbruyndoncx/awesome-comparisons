# Knowledge Index

## Project Architecture

The application is an Angular 21+ SPA that renders static comparison data. It uses NgRx 20+ for state management and Material components for UI.

### Key Directories
- `src/app`: Core Angular application.
- `src/app/components`: Feature modules and UI components.
- `src/app/redux`: NgRx state management (Actions, Reducers, State).
- `lib/gulp`: Build tooling and data processing scripts.
- `datasets`: Raw data for comparisons (Markdown/YAML).

## State Management

The application uses **NgRx 20+** for state management. The state architecture was refactored in Dec 2025 to improve maintainability.

### Structure
- **State Interface**: Defined in `src/app/redux/uc.app-state.ts`.
- **Actions**: Defined in `src/app/redux/uc.action.ts`.
- **Reducers**: Split into feature-specific files under `src/app/redux/reducers/`:
  - `search.reducer.ts`: Handles search queries and click events.
  - `data.reducer.ts`: Handles sorting and filtering logic.
  - `settings.reducer.ts`: Handles UI settings (columns, view modes).
  - `details.reducer.ts`: Handles the details modal.
  - `route.reducer.ts`: Hydrates state from URL parameters.
- **Utilities**: Reusable logic extracted to `src/app/redux/utils/`:
  - `filtering.util.ts`: Complex filtering algorithms.
  - `sorting.util.ts`: Sorting logic.
  - `state-url.util.ts`: URL synchronization.
  - `initialization.util.ts`: Initial state setup.

### Immutability
The application enforces state immutability. All reducers return new state objects rather than mutating existing ones.

## Build & Tooling

### Strict Mode
The project runs in **TypeScript Strict Mode** (`strict: true`). Template type checking (`strictTemplates`) is also enabled.
- `noImplicitAny`: Enabled.
- `strictNullChecks`: Enabled.
- `strictPropertyInitialization`: Enabled.

### Linting
Linting is handled by **ESLint** with **Angular ESLint**.
- Command: `npm run lint`
- Configuration: `.eslintrc.json`
- Replaced TSLint/Codelyzer in Dec 2025.

### Data Processing
Comparison data is processed from Markdown/YAML into JSON using Gulp tasks in `lib/gulp`. The build process generates `data.json` and `comparison.json` which are loaded at runtime.

