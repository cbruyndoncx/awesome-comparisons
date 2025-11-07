# Plan: Debug Admin Config Interface

Investigate why admin/config view is not listing YAML configuration files, trace filtering logic, and locate the source of the event loop that hangs the UI.

## Tasks

- [x] Audit components, services, and data sources involved in admin/config display
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","rg \"admin\" src/app -g '*.ts'"]  
  > Confirmed routing and component entry points for the admin config feature.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '1,200p' src/app/components/config-admin/config-admin-shell.component.ts"]  
  > Reviewed shell lifecycle wiring and catalog subscriptions.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '1,240p' src/app/components/config-admin/config-workspace.service.ts"]  
  > Inspected workspace service setup and catalog observable.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '240,480p' src/app/components/config-admin/config-workspace.service.ts"]  
  > Continued review of catalog filtering and helper methods.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '1,200p' src/app/components/config-admin/config-admin.module.ts"]  
  > Verified module imports and declarations for admin components.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '1,240p' src/app/components/config-admin/config-catalog-tree.component.ts"]  
  > Checked catalog tree inputs, outputs, and filter state handling.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '240,480p' src/app/components/config-admin/config-catalog-tree.component.ts"]  
  > Examined dataset/type filtering helpers and grouping logic.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '1,200p' src/app/components/config-admin/config-catalog-tree.component.html"]  
  > Reviewed template bindings for catalog rendering and filters.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '1,240p' src/app/components/config-admin/config-admin-shell.component.html"]  
  > Cross-checked shell template wiring to catalog tree component.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '200,400p' src/app/components/config-admin/config-admin-shell.component.ts"]  
  > Looked at shell actions affecting catalog refresh and selection.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '480,720p' src/app/components/config-admin/config-workspace.service.ts"]  
  > Audited working copy mutation helpers for completeness.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '720,960p' src/app/components/config-admin/config-workspace.service.ts"]  
  > Reviewed persistence workflow and refresh triggers.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '960,1200p' src/app/components/config-admin/config-workspace.service.ts"]  
  > Covered API mappers and helper utilities.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","rg \"alert\" -n src/app/components/config-admin"]  
  > Verified no stray alert-based debugging in admin components.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","rg \"addDebug\" -n src/app/components/config-admin"]  
  > Located debug instrumentation across admin components.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","rg \"config/catalog\" -n"]  
  > Found workspace server endpoints backing the catalog API.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '310,420p' lib/gulp/tasks/config-workspace-server.babel.js"]  
  > Confirmed API response structure for catalog and document fetches.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","rg \"const catalog\" -n lib/gulp/tasks/config-workspace-server.babel.js"]  
  > Traced catalog construction within the workspace server.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '1,200p' lib/gulp/tasks/config-workspace-server.babel.js"]  
  > Reviewed server bootstrap to understand catalog caching.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","rg \"alert\\(\" -n"]  
  > Ensured no global alert-based debugging impacted admin flow.  
  > Audit mapped end-to-end flow across [src/app/components/config-admin/config-admin-shell.component.ts](../src/app/components/config-admin/config-admin-shell.component.ts), [src/app/components/config-admin/config-catalog-tree.component.ts](../src/app/components/config-admin/config-catalog-tree.component.ts), [src/app/components/config-admin/config-workspace.service.ts](../src/app/components/config-admin/config-workspace.service.ts), and [lib/gulp/tasks/config-workspace-server.babel.js](../lib/gulp/tasks/config-workspace-server.babel.js), clarifying data sources and wiring.
- [x] Trace filtering logic and ensure YAML file metadata is wired through
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '130,210p' src/app/components/config-admin/config-workspace.service.ts"]  
  > Re-read refreshCatalog/filterCatalog implementation to inspect guard conditions.  
  > ---  
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '170,220p' src/app/components/config-admin/config-catalog-tree.component.ts"]  
  > Reviewed emitFilterChange to confirm filter events fire before catalog data arrives.  
  > Identified that `refreshCatalog` skips emitting when filters already set, so an early `filterCatalog` call (e.g., from the toggle group initializing) prevents catalog items from ever reaching the UI, leaving YAML entries hidden despite successful HTTP responses.
- [x] Diagnose infinite loop or repeated event triggering the alert
  > **Bash** workdir=/home/cb/projects/github/ultimate/awesome-comparisons command=["bash","-lc","sed -n '60,120p' src/app/components/config-admin/config-catalog-tree.component.ts"]  
  > Confirmed search control subscriptions and noted comment about init loops.  
  > Analysis shows the early `filterChange` emissions (triggered when Material toggle group initializes) set `catalogFilterSubject` before the first HTTP response, so `refreshCatalog` treats the load as "subsequent" and never replays the fetched items. This leaves the UI empty and encourages repeated filter emissions that look like an infinite loop, while the debug overlay (`showDebugHistory`) keeps replaying without new data.
- [x] Document findings and recommended fixes for the team
  > Compiled summary for stakeholders: initial filter emissions pre-populate `catalogFilterSubject`, causing `refreshCatalog` to skip replay and leaving the catalog empty; recommend re-emitting current filters after every catalog fetch (or combining catalog/filter subjects) and optionally suppressing debug overlays once verified.
- [x] Re-emit catalog filters after refresh and clean up debug overlay
  > **Edit** `src/app/components/config-admin/config-workspace.service.ts`  
  > - removed `showDebugHistory()` from catalog stream map  
  > - always re-emit the current (or default) filter object after every catalog fetch so subscribers recompute with fresh data  
  > Ensures catalog items surface even if filters fired before the HTTP response and leaves debug overlay available only on demand.
- [x] Verify catalog renders 11 items and filters still function
  > Unable to run the Angular app within this session, but reviewed logic to confirm that freshly fetched catalogs trigger a new emission and that filter events still flow through `catalogFilterSubject`. Recommend running `npm run start` locally to confirm the 11 YAML entries appear and that shared/dataset toggles keep working.
- [x] Ensure catalog observable replays to late subscribers using cached catalog data
  > **Edit** `src/app/components/config-admin/config-workspace.service.ts`  
  > - introduced `catalogSubject` to hold latest catalog array and switched `catalog$` to a `combineLatest` of catalog + filter streams with `shareReplay`  
  > - initialized filter subject with default empty filters and dropped the null guard to guarantee immediate emissions for late subscribers  
  > - simplified refresh flow to push new catalog data while keeping existing filter state intact  
  > Ensures the UI receives catalog items even when the initial HTTP fetch completes before components subscribe.
- [x] Provide verification guidance after catalog observable fix
  > Suggested steps: run `npm run dev` to start the data watcher, config workspace server (port 3100), and Angular dev server; reload `/admin/config` and confirm the catalog lists the expected shared + dataset YAML files; toggle dataset/shared filters and run a quick search to ensure catalog updates without reload. Capture console logs (`addDebug` output) if anything still stalls.
- [x] Add runtime snapshot helper for catalog debugging
  > **Edit** `src/app/components/config-admin/config-workspace.service.ts`  
  > - exposed `window.dumpConfigCatalogState()` for quick inspection of cached catalog and filters  
  > - forced `isLoadingSubject` false immediately after successful catalog fetches to avoid lingering spinners if finalize is skipped  
  > Helps diagnose remaining “spinner with no data” scenarios directly from the browser console.
- [x] Include loading indicator in snapshot helper
  > **Edit** `src/app/components/config-admin/config-workspace.service.ts`  
  > - extended `dumpConfigCatalogState()` output with current `isLoading` flag  
  > Provides direct confirmation that the service marks loading as complete.
