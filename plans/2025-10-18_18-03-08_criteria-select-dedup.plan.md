# Plan: Fix Criterion Select Duplicates

Deduplicate criterion select options so each dropdown only shows values relevant to its column.

## Tasks

- [x] Investigate duplicated criterion values in generated data
  > **Bash** `ls`
  > Listed repository root contents to orient within project.
  > ---
  > **Bash** `cat .tessl/framework/plan-files.md`
  > Reviewed plan file guidelines that require documenting tasks and tool usage.
  > ---
  > **Bash** `rg "criteria" -n`
  > Located references to criteria handling across gulp tasks and Angular components.
  > ---
  > **Bash** `sed -n '1,200p' src/app/components/comparison/configuration/configuration.service.ts`
  > Reviewed how criteria options are prepared for the select component.
  > ---
  > **Bash** `sed -n '1,200p' src/app/components/input/select2/select2.component.ts`
  > Confirmed select component toggles options based on provided id/text values.
  > ---
  > **Bash** `ls lib/gulp/model`
  > Inspected model directory for criteria classes backing configuration data.
  > ---
  > **Bash** `ls lib/gulp/model/criteria`
  > Identified criteria implementation files for deeper review.
  > ---
  > **Bash** `sed -n '1,200p' lib/gulp/model/criteria/criteria.js`
  > Examined Criteria class, noting copy behavior that may reuse shared maps.
  > ---
  > **Bash** `sed -n '1,200p' lib/gulp/model/criteria/criteriaValue.js`
  > Checked CriteriaValue implementation to understand stored metadata.
  > ---
  > **Bash** `rg "select2" -n src`
  > Verified select component template usage with criteria values.
  > ---
  > **Bash** `jq '.criteria[] | {id, name, valueCount: (.values | length)}' src/assets/generated/comparison.json`
  > Confirmed generated comparison JSON shows criteria with identical value counts.
  > ---
  > **Bash** `head -n 40 src/assets/generated/comparison.json`
  > Observed repeated value arrays across different criteria in generated output.
  > ---
  > **Bash** `cat configuration/comparison.yml`
  > Noted primary configuration lacks explicit criteria definitions, relying on auto-generation.
  > ---
  > **Bash** `cat configuration/comparison-auto-config.yml`
  > Saw auto-config file assigns identical label sets to every criterion, matching UI issue.
  > ---
  > **Bash** `ls data`
  > Verified source markdown entries for comparison data.
  > ---
  > **Bash** `head -n 80 data/Aider.md`
  > Confirmed individual data files contain criterion-specific label lists.
  > ---
  > **Bash** `sed -n '1,200p' lib/gulp/model/data/data.js`
  > Reviewed data loader building in-memory structures.
  > ---
  > **Bash** `sed -n '1,200p' lib/gulp/model/data/dataElement.js`
  > Investigated DataElement construction and criteria aggregation.
  > ---
  > **Bash** `sed -n '1,200p' lib/gulp/model/data/criteriaData.js`
  > Understood criteria label parsing from markdown lists.
  > ---
  > **Bash** `head -n 20 src/assets/generated/data.json`
  > Validated generated data JSON retains correct per-criterion labels before auto-config.
  > ---
  > **Bash** `cat package.json`
  > Checked available scripts for regenerating comparison assets after code changes.

- [x] Implement isolated map copies in `Criteria.copy` to prevent cross-criterion value bleeding
  > **Edit** `lib/gulp/model/criteria/criteria.js`
  > ```diff
  > *** Begin Patch
  > *** Update File: lib/gulp/model/criteria/criteria.js
  > @@
  >   static copy(id, name, criteria) {
  > +    const values = new Map();
  > +    if (!isNullOrUndefined(criteria.values)) {
  > +      criteria.values.forEach((value, key) => values.set(key, value));
  > +    }
  > +    const lock = new Map();
  > +    if (!isNullOrUndefined(criteria.lock)) {
  > +      criteria.lock.forEach((value, key) => lock.set(key, value));
  > +    }
  >     return new Criteria(
  >       id,
  >       criteria.type,
  >       name,
  >       criteria.search,
  > @@
  >       criteria.placeholder,
  >       criteria.order,
  >       criteria.andSearch,
  >       criteria.rangeSearch,
  > -      criteria.values,
  > -      criteria.lock);
  > +      values,
  > +      lock);
  >   }
  > *** End Patch
  > ```
  > Cloned criteria maps before constructing copies so each criterion maintains its own value collection.

- [x] Regenerate comparison assets and verify per-criterion option sets
  > **Bash** `MD_TO_JSON_COMMAND="python md2json/md2json.py" npm run data:prepare`
  > Markdown conversion failed because the gulp task executed from `lib/gulp`, causing the relative script path to resolve to `lib/gulp/md2json/md2json.py`.
  > ---
  > **Bash** `pwd`
  > Retrieved repository root path to build an absolute converter command.
  > ---
  > **Bash** `MD_TO_JSON_COMMAND="python /home/cb/projects/github/ultimate/ultimate-comparison-framework/md2json/md2json.py" npm run data:prepare`
  > Regenerated data and configuration assets successfully; gulp output confirmed updated comparison files.
  > ---
  > **Bash** `rg "Languages:" -n -A5 -m1 configuration/comparison-auto-config.yml`
  > Verified Languages criterion definition in refreshed auto-config file.
  > ---
  > **Bash** `sed -n '20,60p' configuration/comparison-auto-config.yml`
  > Confirmed Languages retains only language-specific labels and Extensible now lists its own distinct values.
  > ---
  > **Bash** `sed -n '60,120p' configuration/comparison-auto-config.yml`
  > Spot-checked downstream criteria to ensure each dropdown has criterion-appropriate options.
- [x] Update auto-configuration to reuse existing criteria instances when aggregating values
  > **Edit** `lib/gulp/tasks/criteria.babel.js`
  > ```diff
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/criteria.babel.js
  > @@
  > -                const criteria = Criteria.copy(
  > -                    criteriaData.name,
  > -                    criteriaData.name,
  > -                    templateCriteria
  > -                );
  > -                // Criteria is a Label
  > -                if (criteria.type === CriteriaTypes.LABEL) {
  > -                    criteriaData.labels.forEach((label, key) => criteria.values.set(key, new CriteriaValue(criteria.id, key)))
  > -                }
  > -                autoConfiguration.setCriteria(-1, criteria);
  > +                let autoCriteria;
  > +                if (autoConfiguration.containsCriteria(criteriaData.name)) {
  > +                    autoCriteria = autoConfiguration.getCriteria(criteriaData.name);
  > +                } else {
  > +                    autoCriteria = Criteria.copy(
  > +                        criteriaData.name,
  > +                        criteriaData.name,
  > +                        templateCriteria
  > +                    );
  > +                    autoConfiguration.setCriteria(-1, autoCriteria);
  > +                }
  > +                // Criteria is a Label
  > +                if (autoCriteria.type === CriteriaTypes.LABEL) {
  > +                    if (criteriaData.labels.size === 0) {
  > +                        if (!autoCriteria.values.has("")) {
  > +                            autoCriteria.values.set("", new CriteriaValue(autoCriteria.id, ""));
  > +                        }
  > +                    } else {
  > +                        criteriaData.labels.forEach((label, key) => {
  > +                            if (!autoCriteria.values.has(key)) {
  > +                                autoCriteria.values.set(key, new CriteriaValue(autoCriteria.id, key));
  > +                            }
  > +                        });
  > +                    }
  > +                }
  >             }
  >         });
  >     });
  > *** End Patch
  > ```
  > Reused existing auto-generated criteria to accumulate labels across entries and captured empty selections explicitly.
- [x] Regenerate assets post-fix and validate dropdown options render complete sets (including empty values) without `[object Object]`
  > **Edit** `src/app/components/comparison/configuration/configuration.service.ts`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/configuration/configuration.service.ts
  > @@
  > +    private static resolveTemplateValue(value: any, context: Record<string, any>): string {
  > +        if (isNullOrUndefined(value)) {
  > +            return '';
  > +        }
  > +        if (typeof value === 'string') {
  > +            return value;
  > +        }
  > +        if (typeof value === 'object' && !Array.isArray(value)) {
  > +            const template = typeof value.template === 'string' ? value.template : '';
  > +            const variables = Array.isArray(value.variables) ? value.variables : [];
  > +            if (template.length > 0) {
  > +                let result = template;
  > +                variables.forEach(variable => {
  > +                    const replacement = !isNullOrUndefined(context[variable]) ? String(context[variable]) : '';
  > +                    if (result.indexOf('{}') !== -1) {
  > +                        result = result.replace("{}", replacement);
  > +                    }
  > +                    const namedToken = `{${variable}}`;
  > +                    if (result.indexOf(namedToken) !== -1) {
  > +                        result = result.replace(new RegExp(`\\{${variable}\\}`, 'g'), replacement);
  > +                    }
  > +                });
  > +                return result;
  > +            }
  > +        }
  > +        return '';
  > +    }
  > @@
  > -            this.configuration = Configuration.load(result[0]);
  > -            this.criteria = this.configuration.criteria.filter(criteria => criteria.search);
  > +            this.configuration = Configuration.load(result[0]);
  > +            this.configuration.criteria = this.configuration.criteria.map(criteria => {
  > +                const context: Record<string, any> = {
  > +                    id: criteria.id,
  > +                    name: typeof criteria.name === 'string' ? criteria.name : criteria.id,
  > +                    type: criteria.type
  > +                };
  > +                const resolvedName = ConfigurationService.resolveTemplateValue(criteria.name, context);
  > +                if (resolvedName.length > 0) {
  > +                    context.name = resolvedName;
  > +                    criteria.name = resolvedName;
  > +                }
  > +                const placeholder = ConfigurationService.resolveTemplateValue(criteria.placeholder, context);
  > +                if (placeholder.length > 0) {
  > +                    criteria.placeholder = placeholder;
  > +                }
  > +                const description = ConfigurationService.resolveTemplateValue(criteria.description, context);
  > +                if (description.length > 0) {
  > +                    criteria.description = description;
  > +                }
  > +                return criteria;
  > +            });
  > +            this.criteria = this.configuration.criteria.filter(criteria => criteria.search);
  > *** End Patch
  > ```
  > Added client-side template resolver so placeholders and descriptions render as readable strings.
  > **Bash** `MD_TO_JSON_COMMAND="python /home/cb/projects/github/ultimate/ultimate-comparison-framework/md2json/md2json.py" npm run data:prepare`
  > Rebuilt markdown-derived assets after criteria aggregation update.
  > ---
  > **Bash** `jq '.criteria[] | select(.Extensible != null).Extensible.values' src/assets/generated/comparison.json`
  > Verified `Extensible` dropdown now exposes full set of options (Yes/No/API/etc.) plus explicit empty entry.
  > ---
  > **Bash** `MD_TO_JSON_COMMAND="python /home/cb/projects/github/ultimate/ultimate-comparison-framework/md2json/md2json.py" npm run build`
  > Angular build succeeded after regenerating data; warnings about unused environment/vendor files persisted from baseline.
