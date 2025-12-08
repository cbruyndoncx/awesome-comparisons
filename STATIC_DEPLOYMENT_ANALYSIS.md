# Static Deployment Analysis

## Executive Summary
The `awesome-comparisons` application is **fully compatible** with static deployment for its public-facing "Comparison View". The requirement to run without server-side services is met for the public interfaces.

## Verification Findings

### 1. Data Loading Mechanism
*   **Static Assets**: The application loads data exclusively from static JSON files (`comparison.json`, `data.json`) located in the `assets/` directory.
*   **No API Dependencies**: The `ConfigurationService` and `DatasetManifestService` use `HttpClient` to fetch these static files, which works perfectly on static hosting providers (GitHub Pages, Netlify, etc.).
*   **Dataset Discovery**: `DatasetManifestService` reads a `datasets.manifest.json` file to discover available datasets, requiring no dynamic backend logic.

### 2. Environment Configuration
*   **Production Build**: `src/environments/environment.prod.ts` is configured correctly for static deployment:
    ```typescript
    export const environment = {
        production: true,
        debug: false,
        repositoryUrl: '...',
        githubPagesUrl: '...'
    };
    ```
    It does not define or use any API endpoints.

### 3. Architecture Separation
*   **Public vs. Admin**: The codebase cleanly separates the public view (`ComparisonModule`) from the admin interface (`ConfigAdminModule`).
    *   **Public View**: Uses `ComparisonComponent` and `DatasetShellComponent`, which have zero dependencies on the config API.
    *   **Admin View**: `ConfigWorkspaceService` (used by the Admin UI) *does* attempt to contact `/api/config`. However, this service and module are only active when the user explicitly navigates to `/admin/config`.
*   **Routing**: The default route points to `DatasetShellComponent`, ensuring regular users never trigger the admin API calls.

## Deployment Instructions

To deploy the application statically:

1.  **Build**: Run the production build command.
    ```bash
    npm run build:prod
    ```
    This will generate the static artifacts in `dist/`.

2.  **Hosting**: Upload the contents of the `dist/` directory to any static file server.

3.  **Caveat**: The `/admin/config` route will not function in this environment, as it requires the local Node.js backend (`config-workspace`). This is expected behavior and does not impact the public comparison view.
