# Plan: Simplify Admin Config Module Loading

Replace lazy loading for `/admin/config` with eager-loaded module and verify catalog renders, reducing moving parts during debugging.

## Tasks

- [x] Update `app.module.ts` to import `ConfigAdminModule` directly and replace lazy route
  > **Edit** `src/app/app.module.ts`  
  > - added eager import for `ConfigAdminModule` and `ConfigAdminShellComponent`  
  > - replaced `/admin/config` lazy route with direct component route and included module in root imports  
  > Eliminates lazy loading barrier so admin components register immediately at bootstrap.
- [x] Rebuild Angular app to ensure configuration loads
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","npm run build"]  
  > Build succeeded; Angular CLI emitted updated bundle with eager-loaded admin module (hash `cf717dd33b471a46`).
- [ ] Verify dev server renders catalog without spinner (manual guidance)
  > Run `npm run dev` (or `npm run config:serve` + `ng serve --proxy-config proxy.config.json`) so both the workspace API and Angular dev server start clean, then hard-refresh `/admin/config`. Use `dumpConfigCatalogState()` in the browser console to confirm catalog length and `isLoading` flag once the bundle reloads.
- [ ] Summarize results and next actions
