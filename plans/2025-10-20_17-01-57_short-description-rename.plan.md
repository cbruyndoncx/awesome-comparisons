# Plan: Rename Intro Description Field

Renaming the auto-generated intro paragraph field to `ShortDescription` to avoid confusion with the dedicated Description criteria.

## Tasks

- [x] Audit pipeline and UI references to intro description
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"ShortDescription\""],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > No matches found (exit code 1).
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"first paragraph\""],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > No matches found (exit code 1).
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,160p' lib/gulp/model/default.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Reviewed default model to locate description criteria setup.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls lib/gulp"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Listed gulp directory contents to inspect available tasks and models.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls lib/gulp/tasks"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Enumerated gulp task files.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"firstParagraph\" lib -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > No matches found (exit code 1).
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls lib"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Listed top-level tooling directories.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls lib/uc"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Checked legacy uc package contents.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls lib/uc/uc"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed bootstrap script location.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","find lib/uc/uc -maxdepth 2 -type d"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Verified script path has no nested directories.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","find lib -maxdepth 2 -type f | head"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Spot-checked files under lib.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","file lib/uc/uc"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed uc helper is a bash script.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,160p' lib/uc/uc"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Reviewed setup script for context on configuration defaults.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"MD_TO_JSON\" -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Identified markdown conversion workflow references.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls md2json"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Listed markdown converter assets.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' md2json/md2json.py"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Inspected converter implementation to understand description extraction.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '200,400p' md2json/md2json.py"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Continued reviewing converter logic.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"description\" lib/gulp -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Collected description usages across gulp models.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/data/dataElement.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Examined DataElement serialization for intro paragraph handling.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"\\\\.description\" src -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Located frontend references to description property.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/comparison/details/comparison.details.component.ts"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Reviewed detail component interactions with description data.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,240p' src/app/components/comparison/configuration/configuration.service.ts"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Investigated how configuration service hydrates description HTML.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '240,480p' src/app/components/comparison/configuration/configuration.service.ts"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Continued review of configuration service description usage.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/data/data.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Checked data aggregation for description field propagation.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/criteria/criteria.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Analyzed criteria defaults impacting description identifiers.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/comparison-default.yml"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Reviewed default comparison YAML for bodyRef and criteria naming.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls configuration"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Listed project configuration files for further inspection.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,160p' configuration/comparison.yml"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Checked custom comparison config for description references.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '160,320p' configuration/comparison.yml"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Continued review of configuration criteria list.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","head -n 40 configuration/comparison.yml"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Verified absence of explicit short description override.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","head -n 80 configuration/comparison-auto-config.yml"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Inspected auto-generated config for description mentions.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"bodyRef\" -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Located bodyRef usage across defaults and docs.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"Short Description\" -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Identified files labelling the short description criteria.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/comparison/details/comparison.details.template.html"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Reviewed template bindings for description data.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/configuration/configuration.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed criteria lookup logic based on IDs.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"bodyRef\" README.md -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Checked README guidance referencing bodyRef.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '40,80p' README.md"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed documentation context for bodyRef usage.
- [x] Update data models and configuration defaults to use `ShortDescription`
  > **Edit (apply_patch)** – `lib/gulp/model/data/dataElement.js` (rename intro paragraph storage to `shortDescription` and update criteria mapping)
  > Success.
  > ---
  > **Edit (apply_patch)** – `lib/gulp/model/data/dataElement.d.ts` (mirror `shortDescription` property and constructor signature)
  > Success.
  > ---
  > **Edit (apply_patch)** – `src/app/components/comparison/configuration/configuration.service.ts` (switch HTML/LateX hydration to `shortDescription`)
  > Success.
  > ---
  > **Edit (apply_patch)** – `lib/gulp/model/comparison-default.yml` (default body title/ref swapped to `ShortDescription`, type to markdown)
  > Success.
  > ---
  > **Edit (apply_patch)** – `lib/gulp/model/default.js` (synchronise generated defaults with `ShortDescription`)
  > Success.
  > ---
  > **Edit (apply_patch)** – `configuration/comparison-default.yml` (update distributable defaults to `ShortDescription`)
  > Success.
  > ---
  > **Edit (apply_patch)** – `docs/configuration/comparison-default.yml` (refresh documented defaults to `ShortDescription`)
  > Success.
  > ---
  > **Edit (apply_patch)** – `lib/gulp/model/criteria/criteria.js` (auto-add default `ShortDescription` criteria when missing)
  > Success.
  > ---
  > **Edit (apply_patch)** – `lib/gulp/model/criteria/criteria.js` (load default config payload for `ShortDescription`)
  > Success.
  > ---
  > **Edit (apply_patch)** – `lib/gulp/model/criteria/criteria.js` (guard default config lookup when defaults unavailable)
  > Success.
  > ---
  > **Edit (apply_patch)** – `README.md` (document default `bodyRef` now `ShortDescription`)
  > Success.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"shortDescription\" -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Verified updated symbol usage across repo.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","python - <<'PY'\nimport json\nfrom pathlib import Path\npath = Path('src/assets/generated/comparison.json')\ndata = json.loads(path.read_text())\n# update details body\nbody = data.get('details', {}).get('body', {})\nif body:\n    body['title'] = 'Short Description'\n    body['bodyRef'] = 'ShortDescription'\n\nupdated_criteria = []\nfor entry in data.get('criteria', []):\n    if 'description' in entry:\n        value = entry['description']\n        value['name'] = 'Short Description'\n        entry = {'ShortDescription': value}\n    updated_criteria.append(entry)\n\n# ensure ShortDescription entry exists\nif not any('ShortDescription' in entry for entry in updated_criteria):\n    updated_criteria.insert(1, {\n        'ShortDescription': {\n            'name': 'Short Description',\n            'type': 'MARKDOWN',\n            'search': False,\n            'table': False,\n            'detail': False,\n            'description': '',\n            'placeholder': '',\n            'order': '',\n            'andSearch': False,\n            'rangeSearch': False\n        }\n    })\n\ndata['criteria'] = updated_criteria\npath.write_text(json.dumps(data, separators=(',', ':')) + '\\n')\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Rewrote generated comparison config to point body at `ShortDescription`.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","python - <<'PY'\nimport json\nwith open('src/assets/generated/comparison.json') as fh:\n    data = json.load(fh)\nbody = data['details']['body']\nprint(body)\nfor entry in data['criteria'][:5]:\n    print(entry)\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed details body now references `ShortDescription` and new criteria entry present.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","python - <<'PY'\nimport json\nwith open('src/assets/generated/comparison.json') as fh:\n    data = json.load(fh)\nprint(any('description' in entry for entry in data['criteria']))\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Verified legacy `description` key removed from criteria.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","python - <<'PY'\nfrom pathlib import Path\npath = Path('docs/main.js')\ntext = path.read_text()\ntext = text.replace(\"title: Description\\n    bodyRef: description\", \"title: Short Description\\n    bodyRef: ShortDescription\")\ntext = text.replace(\"  - description:\\n      name: Short Description\\n      search: false\\n      detail: false\\n      type: text\", \"  - ShortDescription:\\n      name: Short Description\\n      search: false\\n      detail: false\\n      type: markdown\")\npath.write_text(text)\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Initial replacement attempt (no effect because bundle stores literal `\\n` sequences).
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"bodyRef\" -n docs/main.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed bodyRef still pointed at `description` after first attempt.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","python - <<'PY'\nfrom pathlib import Path\ntext = Path('docs/main.js').read_text()\nsegment = text.split('body:\\n',1)[1][:80]\nprint(repr(segment[:40]))\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Encountered `IndexError` while probing literal encoding (evidence string uses escaped newlines).
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","python - <<'PY'\nfrom pathlib import Path\ntext = Path('docs/main.js').read_text()\nprint(text[:100])\nprint(repr(text[:100]))\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Inspected prefix to verify `\\n` representation.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","python - <<'PY'\nfrom pathlib import Path\ntext = Path('docs/main.js').read_text()\nidx = text.find('title: Description')\nprint(idx)\nprint(repr(text[idx:idx+40]))\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Located literal slice showing escaped newlines to adjust replacement strategy.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","python - <<'PY'\nfrom pathlib import Path\npath = Path('docs/main.js')\ntext = path.read_text()\ntext = text.replace(\"title: Description\\\\n    bodyRef: description\", \"title: Short Description\\\\n    bodyRef: ShortDescription\")\ntext = text.replace(\"  - description:\\\\n      name: Short Description\\\\n      search: false\\\\n      detail: false\\\\n      type: text\", \"  - ShortDescription:\\\\n      name: Short Description\\\\n      search: false\\\\n      detail: false\\\\n      type: markdown\")\npath.write_text(text)\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Applied adjusted replacement using escaped newlines.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"ShortDescription\" docs/main.js -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Verified docs bundle now includes `ShortDescription`.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","git status -sb"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed our touched files among many pre-existing changes; no new unexpected edits beyond tracked set.
- [x] Update UI usage, specs, and generated assets as needed
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"bodyRef\" src -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Verified compiled assets now reference `ShortDescription` in detail body configuration.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"getCriteriaData\\('ShortDescription'\" -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed data model exposes new accessor for detail retrieval.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"ShortDescription\" README.md docs configuration src -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Ensured docs, defaults, and runtime assets consistently use the new identifier.
- [x] Validate or document build/test steps
  > **Bash**
  > ```
  > {"command":["bash","-lc","MD_TO_JSON_COMMAND=\"python md2json/md2json.py\" npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":0}
  > ```
  > Build command aborted immediately (timeout defaulted to 4 ms); rerunning with explicit timeout.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","MD_TO_JSON_COMMAND=\"python md2json/md2json.py\" npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":600000}
  > ```
  > Gulp markdown step failed: converter path resolved relative to `lib/gulp`, producing `python .../lib/gulp/md2json/md2json.py` not found.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","MD_TO_JSON_COMMAND=\"python /home/cb/projects/github/ultimate/ultimate-comparison-framework/md2json/md2json.py\" npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":600000}
  > ```
  > Build aborted: `Criteria.loadArray` threw when default config missing; prompted guard fix.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","MD_TO_JSON_COMMAND=\"python /home/cb/projects/github/ultimate/ultimate-comparison-framework/md2json/md2json.py\" npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":600000}
  > ```
  > Build succeeded; noted standard Angular warnings about unused environment and vendor files.
- [x] Ensure ShortDescription appears as the second table column
  > **Edit (apply_patch)** `lib/gulp/model/comparison-default.yml`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/comparison-default.yml
  > @@
  >    - ShortDescription:
  >        name: Short Description
  >        search: false
  >        detail: false
  > -      type: markdown
  > +      table: true
  > +      order: '1'
  > +      type: markdown
  > *** End Patch
  > ```
  > Enabled table display and assigned `order: '1'` in default comparison template.
  > ---
  > **Edit (apply_patch)** `configuration/comparison-default.yml`
  > ```
  > *** Begin Patch
  > *** Update File: configuration/comparison-default.yml
  > @@
  >    - ShortDescription:
  >        name: Short Description
  >        search: false
  >        detail: false
  > -      type: markdown
  > +      table: true
  > +      order: '1'
  > +      type: markdown
  > *** End Patch
  > ```
  > Mirrored defaults into workspace configuration snapshot.
  > ---
  > **Edit (apply_patch)** `docs/configuration/comparison-default.yml`
  > ```
  > *** Begin Patch
  > *** Update File: docs/configuration/comparison-default.yml
  > @@
  >    - ShortDescription:
  >        name: Short Description
  >        search: false
  >        detail: false
  > -      type: markdown
  > +      table: true
  > +      order: '1'
  > +      type: markdown
  > *** End Patch
  > ```
  > Synced documentation copy of comparison defaults.
  > ---
  > **Edit (apply_patch)** `lib/gulp/model/default.js`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/default.js
  > @@
  >    "  - ShortDescription:\n" +
  >    "      name: Short Description\n" +
  >    "      search: false\n" +
  >    "      detail: false\n" +
  > +  "      table: true\n" +
  > +  "      order: '1'\n" +
  >    "      type: markdown\n" +
  > *** End Patch
  > ```
  > Updated generated YAML template to keep defaults consistent.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","python - <<'PY'\nfrom pathlib import Path\ntext = Path('docs/main.js').read_text()\nsegment = '  - ShortDescription:\\\\n      name: Short Description\\\\n      search: false\\\\n      detail: false\\\\n      type: markdown'\nif segment in text:\n    new_segment = '  - ShortDescription:\\\\n      name: Short Description\\\\n      search: false\\\\n      detail: false\\\\n      table: true\\\\n      order: \\\\'1\\\\'\\\\n      type: markdown'\n    text = text.replace(segment, new_segment)\nPath('docs/main.js').write_text(text)\nPY"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Refreshed bundled docs configuration snippet.
  > ---
  > **Edit (apply_patch)** `README.md`
  > ```
  > *** Begin Patch
  > *** Update File: README.md
  > @@
  >      - `placeholder`: Text shown in the search bar if it is empty (4)
  >      - `rangeSearch`: Changes search to allow searching for number ranges. It allows searching for numbers and ranges of numbers. Only supports integers. (5)
  >      ![Various elements of criteria on the page](https://cdn.rawgit.com/ultimate-comparisons/ultimate-comparison-BASE/85cc1e93/docs/images/variouselements.png)
  > +
  > +The framework reserves the first table column for the `Name`/`id` field and always places `ShortDescription` as the second column. Remaining table columns follow their configured `order` values.
  > *** End Patch
  > ```
  > Documented the enforced column ordering.
  > ---
  > **Edit (apply_patch)** `lib/gulp/tasks/criteria.babel.js`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/criteria.babel.js
  > @@
  >      if (!configuration.containsCriteria("id")) {
  >          autoConfiguration.setCriteria(0, defaultConfiguration.getCriteria("id"));
  >      }
  >  
  > +    if (!configuration.containsCriteria("ShortDescription")) {
  > +        const shortDescriptionCriteria = defaultConfiguration.getCriteria("ShortDescription");
  > +        if (!isNullOrUndefined(shortDescriptionCriteria)) {
  > +            autoConfiguration.setCriteria(1, shortDescriptionCriteria);
  > +        }
  > +    }
  > +
  >      if (!configuration.containsCriteria("description")) {
  > -        autoConfiguration.setCriteria(1, defaultConfiguration.getCriteria("description"));
  > +        autoConfiguration.setCriteria(2, defaultConfiguration.getCriteria("description"));
  >      }
  > *** End Patch
  > ```
  > Ensured auto-generated configuration injects the default `ShortDescription` column ahead of `description` when missing.
  > ---
  > **Edit (apply_patch)** `src/app/components/comparison/configuration/configuration.service.ts`
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/configuration/configuration.service.ts
  > @@
  >                 if (description.length > 0) {
  >                     criteria.description = description;
  >                 }
  >                 return criteria;
  >             });
  > 
  > +            const idCriteria = processedCriteria.find(criteria => criteria.id === 'id');
  > +            if (idCriteria) {
  > +                idCriteria.table = true;
  > +            }
  > +
  > +            const shortCriteria = processedCriteria.find(criteria => criteria.id === 'ShortDescription');
  > +            if (shortCriteria) {
  > +                shortCriteria.table = true;
  > +                if (isNullOrUndefined(shortCriteria.order) || shortCriteria.order === '') {
  > +                    shortCriteria.order = '1';
  > +                }
  > +                if (!shortCriteria.name || shortCriteria.name.trim().length === 0 || shortCriteria.name === 'ShortDescription') {
  > +                    shortCriteria.name = 'Short Description';
  > +                }
  > +            }
  > @@
  > -            this.configuration.criteria = ConfigurationService.sortCriteriaByOrder(processedCriteria);
  > -            this.tableColumns = this.configuration.criteria.filter(criteria => criteria.table).map(criteria => criteria.id);
  > +            this.configuration.criteria = ConfigurationService.sortCriteriaByOrder(processedCriteria);
  > +            const tableCriteria = this.configuration.criteria.filter(criteria => criteria.table);
  > +            const primaryColumns: Array<string> = [];
  > +            const remainingColumns: Array<string> = [];
  > +
  > +            tableCriteria.forEach(criteria => {
  > +                if (criteria.id === 'id') {
  > +                    primaryColumns[0] = criteria.id;
  > +                } else if (criteria.id === 'ShortDescription') {
  > +                    primaryColumns[1] = criteria.id;
  > +                } else {
  > +                    remainingColumns.push(criteria.id);
  > +                }
  > +            });
  > +
  > +            this.tableColumns = primaryColumns.filter(Boolean).concat(remainingColumns);
  > *** End Patch
  > ```
  > Forced the runtime configuration to elevate `ShortDescription` into the second column and keep other columns ordered.
- [x] Rebuild assets to confirm new column order
  > **Bash**
  > ```
  > {"command":["bash","-lc","MD_TO_JSON_COMMAND=\"python /home/cb/projects/github/ultimate/ultimate-comparison-framework/md2json/md2json.py\" npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":600000}
  > ```
  > Build completed successfully; regenerated assets incorporate the updated `ShortDescription` defaults (Angular emitted its customary unused-file warnings).
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","MD_TO_JSON_COMMAND=\"python /home/cb/projects/github/ultimate/ultimate-comparison-framework/md2json/md2json.py\" npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":600000}
  > ```
  > Rebuilt after runtime ordering adjustments; output remained clean aside from the recurring Angular warnings.
