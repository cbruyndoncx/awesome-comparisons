# CHANGELOG_V3_DETAILED

Version: v3.0.0 (Draft detailed changelog)
Date range: 2025-01-01 — 2025-10-28

This file summarizes all commits on the `main` branch in 2025 that make up the v3 fork work (as requested).

Highlights
---------
- Introduced multi-dataset support and UI (dataset selector, tab strip).
- Converted md2json tooling to a TypeScript-based converter (no Java required).
- Updated demo/docs layout to publish into docs/ for GitHub Pages and moved dist copy steps accordingly.
- Added grouping and filtering UI improvements, theming (light/dark), and styling tweaks.
- Added many content updates and new dataset content (feature-comparison, editors, code categories).
- CI/build-related changes: dist rebuilds, sass loader fixes, removed outdated dependencies (citation.js), packaging prep.

Grouped summary of notable changes (by area)
-------------------------------------------
- docs/gh-pages
  - Moved the built demo/site into docs/ for GitHub Pages publishing (commits: dist copied to docs, rebuild and copied to docs for ghpages, update gh pages docs).
  - Prepared docs updates for gh pages deploy and removed deployed site before rebuilding.

- Multi-dataset & UI
  - Working with datasets, added a tab strip, dataset selection UI, dataset grouping and basic light/dark theming in Material styling.
  - Reorganized directories and renamed sections to feature-comparison, and kept datasets-only structure.
  - Grouping in tables and on details pages, grouping selection tweaks, show/hide filters, and expand/collapse filter groups.

- Content & Categories
  - Added classification code/editors, ainative code editor section, and multiple content updates to populate dataset entries.
  - Standardized licenses and added edit links to markdown notes for easier content contribution.

- Tooling & Build
  - Converted md2json to a TypeScript converter to avoid Java dependency.
  - Rebuilt and forced a dist/ folder, dist/ultimate-comparison folder for gh-pages, and added scripts for indentation fixes.
  - Sass loader fix; removed outdated citation.js due to permanent failure.
  - Prep for package install from this GitHub repo.

- Styling & Assets
  - Improved styling, fixed missing fonts, tweaks to feature comparison UI, default group expanded setting.

Full commit list (2025 commits on main, earliest → latest)
--------------------------------------------------------
Below is the full chronological list of commits on `main` from 2025 relevant to v3 work. Each line: <short-hash>  <date>  <author>  <summary>

773eefe 2025-10-18  Carine Bruyndoncx  compiled without java with python md2json
90898ac 2025-10-18  Carine Bruyndoncx  working version, standard template, content updates needed
ec8404d 2025-10-19  Carine Bruyndoncx  first batch done, prep for ainativedev code editor category
c3e935a 2025-10-19  Carine Bruyndoncx  added ainative code editor section
24ce92c 2025-10-19  Carine Bruyndoncx  any comments need indented list to be visible in details
f258b86 2025-10-19  Carine Bruyndoncx  working version, ToDo make comments into indented unordered lists
0ace721 2025-10-19  Carine Bruyndoncx  added script to fix indentation
f43bb55 2025-10-19  Carine Bruyndoncx  standardizing licenses
a31538e 2025-10-19  Carine Bruyndoncx  rebuild and forced dist/ folder
4295541 2025-10-19  Carine Bruyndoncx  Ignore Angular cache (.angular/cache/)
34abd39 2025-10-19  Carine Bruyndoncx  dist/ultimate-comparison folder for gh pages
41abbd0 2025-10-20  Carine Bruyndoncx  move ultimate comparison into docs folder for gh pages
3ecf90c 2025-10-20  Carine Bruyndoncx  classification code/editors added
d8448c6 2025-10-21  Carine Bruyndoncx  code/editor category first pass additional content fields
dee1124 2025-10-22  Carine Bruyndoncx  comparison tweaks
04ac51d 2025-10-22  Carine Bruyndoncx  working version with grouping in table and settings
36b26b7 2025-10-22  Carine Bruyndoncx  grouping also on details page
423965f 2025-10-22  Carine Bruyndoncx  copied dist to docs
e0d3cd4 2025-10-22  Carine Bruyndoncx  little intro description.md
440839f 2025-10-26  Carine Bruyndoncx  typescript md2json converter
170a86e 2025-10-26  Carine Bruyndoncx  grouping selection tweaks
5b99362 2025-10-26  Carine Bruyndoncx  show hide filters and expand collapse filter groups
662b520 2025-10-26  Carine Bruyndoncx  default group expanded setting
b6535b0 2025-10-26  Carine Bruyndoncx  docs update for gh pages deploy
db66d1e 2025-10-26  Carine Bruyndoncx  prep for package install from this github repo
73d7365 2025-10-26  Carine Bruyndoncx  removed citation.js because of permanent failure - outdated
0fac5c7 2025-10-26  Carine Bruyndoncx  sass loader fix
6c9d29a 2025-10-26  Carine Bruyndoncx  working with datasets
a308d8c 2025-10-26  Carine Bruyndoncx  kinda with a tab strip
d538642 2025-10-27  Carine Bruyndoncx  datasets and basic light/dark theming in material styling
4177df1 2025-10-27  Carine Bruyndoncx  rebuild and copied to docs for ghpages
7fb89f1 2025-10-27  Carine Bruyndoncx  reorg dir, only keep datasets and rename to feature-comparison
37efd59 2025-10-27  Carine Bruyndoncx  reorg dir, only keep datasets and rename to feature-comparison
78b225d 2025-10-27  Carine Bruyndoncx  tweaks to feature comparison
6372388 2025-10-27  Carine Bruyndoncx  update gh pages docs
8581168 2025-10-28  Carine Bruyndoncx  improved styling
d787a79 2025-10-28  Carine Bruyndoncx  missing fonts
e12e67b 2025-10-28  Carine Bruyndoncx  Modify windsurf.md for terminal updates
8d064b1 2025-10-28  Carine Bruyndoncx  add edit link to markdown note
baecc90 2025-10-28  Carine Bruyndoncx  add edit link to markdown note
44b59f6 2025-10-28  Carine Bruyndoncx  build
2e53eaf 2025-10-28  Carine Bruyndoncx  removing deployed site first
381307a 2025-10-28  Carine Bruyndoncx  uc v2 in subdirectory

Notes & next steps
------------------
- I summarized and grouped the work based on commit messages. If you want, I can:
  - Expand each grouped section with file-level changes (diffs) and list which files were changed per commit.
  - Produce a human-friendly "user-facing" release notes version that omits internal details and includes migration commands.
  - Tag a release and create a GitHub release body with this changelog content.

If you'd like me to produce one of those, tell me which and I will proceed.
