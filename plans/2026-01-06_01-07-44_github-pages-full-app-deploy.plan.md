# Goal: Deploy the full Angular app (public UI) to GitHub Pages
Background: This repo builds a static Angular app into `dist/awesome-comparisons/browser` and bundles datasets/config as static assets. The `/admin/config` route is developer-only and depends on a local backend.

## Task List
- [x] Confirm GitHub Pages target + repo name
- [x] Verify build output folder for Pages
- [x] Make runtime base path Pages-safe
- [x] Decide SPA routing strategy for Pages
- [x] Add GitHub Actions workflow for Pages deploy
- [x] Document the deploy process in README
- [x] Run a local production build smoke-check

## Task Outputs

> ### Repo inspection (tools: `shell_command`)
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "cat angular.json" }`
>   - Output summary: Angular build output path is `dist/awesome-comparisons`; built site is emitted under `dist/awesome-comparisons/browser`. Static assets include copies of `configuration/**` and `data/**` into the build output.
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "sed -n '1,120p' src/app/app.module.ts" }`
>   - Output summary: Router uses `{ useHash: false }` and app overrides `APP_BASE_HREF` using `window._app_base || '/'`.
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "cat src/index.html" }`
>   - Output summary: `<base href=\"/\">` and a script sets `window['_app_base'] = '/'`.
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "cat STATIC_DEPLOYMENT_ANALYSIS.md" }`
>   - Output summary: Public UI is static-host compatible; `/admin/config` requires local backend and is expected to be non-functional on static hosting.

> ### User confirmations (tools: conversation)
> - Target: GitHub Pages Project Pages at `/<repo>/`
> - Repo name: `awesome-comparisons` → base path `"/awesome-comparisons/"`
> - SPA strategy: Option A (minimal) → ensure `/awesome-comparisons/` loads; accept potential 404 on deep-link refresh (e.g. `/awesome-comparisons/admin/config`)

> ### Task: Make runtime base path Pages-safe (tools: `apply_patch`)
> - `apply_patch` updated `src/index.html` to derive `window['_app_base']` from the `<base href="...">` tag at runtime, so the app respects `--base-href "/awesome-comparisons/"` during Pages builds.

> ### Task: Add GitHub Actions workflow for Pages deploy (tools: `apply_patch`)
> - `apply_patch` added `.github/workflows/pages.yml`:
>   - Builds with `npm run build:prod -- --base-href "/awesome-comparisons/"`
>   - Uploads `dist/awesome-comparisons/browser` and deploys via `actions/deploy-pages`

> ### Task: Document the deploy process in README (tools: `apply_patch`)
> - `apply_patch` updated `README.md` with a “Deploy to GitHub Pages (full app)” section, including the workflow path, deployed output folder, expected URL, and GitHub Pages settings.

> ### Task: Run a local production build smoke-check (tools: `shell_command`)
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "npm run build:prod -- --base-href \"/awesome-comparisons/\"" }`
>   - Output summary: Build succeeded and emitted `dist/awesome-comparisons/browser/index.html` with `<base href="/awesome-comparisons/">`.

## Proposed Deployment Plan (GitHub Pages: `/<repo>/`)

### 1) Target and constraints (Pages specifics)
- Use GitHub Pages “Project Pages”: site served at `https://<org>.github.io/<repo>/`.
- Angular build must be produced with a matching base path (`/ <repo> /`) so scripts/assets resolve correctly.
- Because this app uses PathLocationStrategy (`useHash: false`), direct deep links can 404 on Pages unless we add a fallback strategy. In this app’s case, only `''` and `/admin/config` routes exist, so the public UI is effectively “single-route”; deep-link risk is low but still worth handling if we want `/admin/config` (or future routes) to be refresh-safe.

### 2) Build output for Pages
- Deploy the contents of `dist/awesome-comparisons/browser/` to Pages.
  - This contains `index.html`, JS/CSS bundles, and the `configuration/` + `data/` folders that the public UI fetches via `HttpClient`.

### 3) Make base path “just work” on Pages
- Ensure the built `index.html` has `<base href="/<repo>/">`.
  - Preferred: pass `--base-href "/<repo>/"` on the Angular build (via `npm run build -- --base-href "/<repo>/"`).
- Fix the runtime `APP_BASE_HREF` override so it matches the actual `<base>` tag rather than hardcoding `/`.
  - Recommended code change: in `src/index.html`, set `window['_app_base']` from the `<base>` tag at runtime, e.g. `document.querySelector('base')?.getAttribute('href')`.
  - Alternative: remove the `APP_BASE_HREF` provider override and let Angular use the `<base>` tag (but `src/app/app.module.ts` is generated-from-spec, so this likely requires updating the spec file instead of editing the TS directly).

### 4) SPA routing strategy on Pages (choose one)
- Option A (minimal): Do nothing. Public UI loads at `/<repo>/` and only breaks if someone deep-links to `/admin/config` and hits refresh.
- Option B (recommended): Add a Pages-friendly SPA fallback:
  - Generate a `404.html` that redirects to `index.html` while preserving the path (common “spa-github-pages” approach).
  - This keeps PathLocationStrategy working without switching to hash routes.
- Option C: Switch routing to hash in production (`useHash: true`) to avoid 404s without a custom 404 page.
  - This is a larger behavioral change and likely requires modifying the generating spec that produces `src/app/app.module.ts`.

### 5) Add GitHub Actions workflow to deploy
- Create `.github/workflows/pages.yml`:
  - Trigger: `push` to default branch (and optionally `workflow_dispatch`).
  - Steps:
    - `actions/checkout`
    - `actions/setup-node` (Node 20)
    - `npm ci`
    - `npm run build:prod -- --base-href "/<repo>/"` (optionally pin dataset selection)
    - Upload artifact from `dist/awesome-comparisons/browser`
    - Deploy with `actions/deploy-pages`
- Repository settings:
  - Enable Pages “GitHub Actions” as the source.

### 6) Docs / verification
- Update `README.md` with:
  - The Pages URL pattern and how to set the repo name in the workflow.
  - The “admin UI is local-only” caveat.
- Smoke-check locally:
  - Build with base-href set.
  - Serve the `dist/awesome-comparisons/browser` folder via a static file server and confirm the public UI loads and dataset files fetch correctly.
