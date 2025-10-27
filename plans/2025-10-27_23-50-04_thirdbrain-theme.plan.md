# Plan: Apply ThirdBrain.tech Theming

Align the Angular application styling with the visual identity of https://www.thirdbrain.tech/.

## Tasks

- [x] Audit current styling implementation to locate theme entry points
  > **Bash** `{"command":["bash","-lc","ls src"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Listed `src` to locate styling entry points.
  > ---
  > **Bash** `{"command":["bash","-lc","sed -n '1,160p' src/styles.css"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Confirmed minimal overrides in `src/styles.css`.
  > ---
  > **Bash** `{"command":["bash","-lc","ls src/styles"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Identified `theme.scss` as primary theme file.
  > ---
  > **Bash** `{"command":["bash","-lc","sed -n '1,200p' src/styles/theme.scss"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Reviewed Material theme variables and CSS custom properties.
  > ---
  > **Bash** `{"command":["bash","-lc","ls src/app/theme"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Located theme service implementation.
  > ---
  > **Bash** `{"command":["bash","-lc","sed -n '1,200p' src/app/theme/theme.service.ts"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Inspected runtime theme toggling and class usage.
  > ---
  > **Bash** `{"command":["bash","-lc","sed -n '1,200p' src/index.html"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Checked for existing global font includes.
  > ---
  > **Bash** `{"command":["bash","-lc","ls src/app/components"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Surveyed component directories impacted by theming.
  > ---
  > **Bash** `{"command":["bash","-lc","sed -n '1,160p' src/app/components/comparison/comparison.template.html"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Reviewed comparison layout markup for style hooks.
  > ---
  > **Bash** `{"command":["bash","-lc","sed -n '1,200p' src/app/components/comparison/comparison.component.css"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Captured component-level typography and color usage tied to CSS variables.
- [x] Extract ThirdBrain.tech theme tokens (colors, typography, spacing cues)
  > **Bash** `{"command":["bash","-lc","curl -s https://www.thirdbrain.tech/"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Initial attempt to fetch site HTML failed (exit 6) due to network restrictions.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s https://www.thirdbrain.tech/"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Need site HTML to replicate its visual theme in Angular app"}`
  >
  > Retrieved page markup for theme analysis after approval escalation.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s https://www.thirdbrain.tech/index.css"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Need theme CSS to replicate design in Angular app"}`
  >
  > Downloaded minified site stylesheet containing color tokens.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s https://www.thirdbrain.tech/index.css -o /tmp/thirdbrain-index.css"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Need complete CSS file to derive theme colors and typography"}`
  >
  > Saved CSS locally for easier inspection.
  > ---
  > **Bash** `{"command":["bash","-lc","sed 's/}/}\\n/g' /tmp/thirdbrain-index.css | sed 's/{/{\\n  /g' | head -n 120"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Previewed formatted sections of the minified CSS for structure clues (broken pipe warnings expected due to `head`).
  > ---
  > **Bash** `{"command":["bash","-lc","rg -- ':root' -n /tmp/thirdbrain-index.css"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Command failed because `-n` was misinterpreted as a path; noted for troubleshooting.
  > ---
  > **Bash** `{"command":["bash","-lc","rg --line-number \":root\" /tmp/thirdbrain-index.css"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Located `:root` declarations within the CSS file.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s https://www.thirdbrain.tech/ -o /tmp/thirdbrain.html"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Need site HTML to extract CSS variables for theming"}`
  >
  > Stored HTML locally to cross-check theme attribute usage.
  > ---
  > **Bash** `{"command":["bash","-lc","rg \":root\" /tmp/thirdbrain.html"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Verified no inline `:root` definitions present in HTML.
  > ---
  > **Bash** `{"command":["bash","-lc","python - <<'PY'\\nwith open('/tmp/thirdbrain-index.css') as f:\\n    data = f.read()\\nstart = data.find(':root')\\nprint(start)\\nprint(data[start:start+400])\\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Confirmed position of CSS variable block and captured initial slice.
  > ---
  > **Bash** `{"command":["bash","-lc","python - <<'PY'\\nwith open('/tmp/thirdbrain-index.css') as f:\\n    data = f.read()\\nfor token in ['--secondary','--primary','--dark','--light','--gray','--highlight','--lightgray','--darkgray','--codeFont','--bodyFont','--headingFont']:\\n    idx = data.find(token)\\n    print(token, idx)\\n    if idx != -1:\\n        segment = data[idx-100:idx+200]\\n        print(segment)\\n        print('\\\\n---\\\\n')\\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Enumerated occurrences of key CSS custom properties to understand usage contexts.
  > ---
  > **Bash** `{"command":["bash","-lc","python - <<'PY'\\nwith open('/tmp/thirdbrain-index.css') as f:\\n    data = f.read()\\nneedle = ':root{--light:#fefefe'\\nstart = data.find(needle)\\nend = data.find('}', start)\\nprint(data[start:end+1])\\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Extracted light-theme variable definitions: palette colors and font stacks (Inter, JetBrains Mono).
  > ---
  > **Bash** `{"command":["bash","-lc","python - <<'PY'\\nwith open('/tmp/thirdbrain-index.css') as f:\\n    data = f.read()\\nneedle = ':root[saved-theme=dark]{--light:#'\\nstart = data.find(needle)\\nprint(start)\\nif start != -1:\\n    end = data.find('}', start)\\n    print(data[start:end+1])\\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Captured dark-theme color variables mirroring site styling.
  > ---
  > **Bash** `{"command":["bash","-lc","python - <<'PY'\\nwith open('/tmp/thirdbrain-index.css') as f:\\n    data = f.read()\\nfor theme in [':root{', ':root[saved-theme=dark]{']:\\n    start = data.find(theme)\\n    while start != -1:\\n        end = data.find('}', start)\\n        block = data[start:end+1]\\n        if '--border' in block or '--card' in block or '--background' in block:\\n            print(block)\\n        start = data.find(theme, end)\\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Searched for additional structural tokens (borders/backgrounds); noted sparse direct definitions.
- [x] Update Angular global and component styles to match the extracted theme
  > **Edit** `apply_patch`
  > - summary: deleted legacy `src/styles/theme.scss` so the theme could be rebuilt around ThirdBrain tokens.
  > ---
  > **Edit** `apply_patch`
  > - summary: added rewritten `src/styles/theme.scss` with custom Tailwind-inspired palettes, typography, and CSS variables for light/dark themes.
  > ---
  > **Edit** `apply_patch`
  > - summary: refreshed `src/styles.css` to establish global typography, link styling, and selection colors.
  > ---
  > **Edit** `apply_patch`
  > - summary: injected ThirdBrain meta tags and external font links into `src/index.html` (later superseded by local hosting).
  > ---
  > **Edit** `apply_patch`
  > - summary: updated comparison component host selector to pull typography from theme variables.
  > ---
  > **Edit** `apply_patch`
  > - summary: aligned comparison search indicators with the new highlight color.
  > ---
  > **Edit** `apply_patch`
  > - summary: reworked grid layout styles to mirror ThirdBrain spacing, header treatment, and card presentation.
  > ---
  > **Edit** `apply_patch`
  > - summary: modernized select toolbar styling with gradient panels, accent actions, and focus handling.
  > ---
  > **Edit** `apply_patch`
  > - summary: added explicit focus outline support for toolbar buttons.
  > ---
  > **Edit** `apply_patch`
  > - summary: restyled filter group cards with accent toggles, shadows, and heading fonts.
  > ---
  > **Edit** `apply_patch`
  > - summary: normalized disabled toggle appearance across filter groups.
  > ---
  > **Edit** `apply_patch`
  > - summary: added focus treatment for filter group toggles to maintain accessibility.
- [x] Validate the updated styling via local build or lint checks
  > **Bash** `{"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Build timed out when Angular attempted to inline Google Fonts (network restricted).
  > ---
  > **Bash** `{"command":["bash","-lc","sed -n '1,200p' angular.json"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Reviewed Angular build configuration before adjusting font handling.
  > ---
  > **Edit** `apply_patch`
  > - summary: temporarily added `"inlineFonts": false` to `angular.json` to bypass remote font downloads. (Later removed after validation error.)
  > ---
  > **Bash** `{"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}`
  >
  > Build failed immediately because `inlineFonts` is not a valid top-level option in Angular 17.
  > ---
  > **Edit** `apply_patch`
  > - summary: removed invalid `"inlineFonts"` option from `angular.json` following schema error.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap' -o /tmp/thirdbrain-fonts.css"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Need font CSS to host Inter and JetBrains Mono locally for theming"}`
  >
  > Downloaded Google Fonts stylesheet (returned TTF sources).
  > ---
  > **Bash** `{"command":["bash","-lc","cat /tmp/thirdbrain-fonts.css"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Verified font CSS referenced TTF assets only.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s -H 'User-Agent: Mozilla/5.0' 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap' -o /tmp/thirdbrain-fonts.css"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Fetch WOFF2 font CSS with browser user agent for local bundling"}`
  >
  > Retried with browser UA; confirmed output still pointed at TTF sources.
  > ---
  > **Bash** `{"command":["bash","-lc","cat /tmp/thirdbrain-fonts.css"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Reconfirmed available font URLs for local download.
  > ---
  > **Bash** `{"command":["bash","-lc","ls src/fonts"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Checked existing font directory prior to adding ThirdBrain assets.
  > ---
  > **Bash** `{"command":["bash","-lc","mkdir -p src/fonts/thirdbrain"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Created directory for locally hosted Inter/JetBrains fonts.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s -L 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf' -o src/fonts/thirdbrain/Inter-400.ttf"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Download Inter font weight 400 for local theming"}`
  >
  > Stored Inter 400 locally.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s -L 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf' -o src/fonts/thirdbrain/Inter-500.ttf"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Download Inter font weight 500 for local theming"}`
  >
  > Stored Inter 500 locally.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s -L 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf' -o src/fonts/thirdbrain/Inter-600.ttf"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Download Inter font weight 600 for local theming"}`
  >
  > Stored Inter 600 locally.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s -L 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf' -o src/fonts/thirdbrain/Inter-700.ttf"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Download Inter font weight 700 for local theming"}`
  >
  > Stored Inter 700 locally.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s -L 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf' -o src/fonts/thirdbrain/Inter-800.ttf"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Download Inter font weight 800 for local theming"}`
  >
  > Stored Inter 800 locally.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s -L 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPQ.ttf' -o src/fonts/thirdbrain/JetBrainsMono-400.ttf"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Download JetBrains Mono font weight 400 for local theming"}`
  >
  > Stored JetBrains Mono 400 locally.
  > ---
  > **Bash** `{"command":["bash","-lc","curl -s -L 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8FqtjPQ.ttf' -o src/fonts/thirdbrain/JetBrainsMono-600.ttf"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Download JetBrains Mono font weight 600 for local theming"}`
  >
  > Stored JetBrains Mono 600 locally.
  > ---
  > **Edit** `apply_patch`
  > - summary: added `src/styles/fonts.css` with local `@font-face` rules for Inter and JetBrains Mono.
  > ---
  > **Edit** `apply_patch`
  > - summary: updated `angular.json` to load `src/styles/fonts.css` ahead of other global styles.
  > ---
  > **Edit** `apply_patch`
  > - summary: removed remote Google Fonts `<link>` tags from `src/index.html` after switching to local assets.
  > ---
  > **Bash** `{"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}`
  >
  > Build succeeded; Angular emitted warnings about duplicate Material theme styles (expected with dual theme generation).
  > ---
  > **Bash** `{"command":["bash","-lc","git status -sb"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Reviewed working tree state after build; noted generated `dist` outputs and new fonts directory.
