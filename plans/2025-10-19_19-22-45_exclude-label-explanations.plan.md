# Plan: Remove Indented Label Explanations

Ensure the auto-generated comparison configuration YAML matches the updated spec by omitting indented explanatory label lines (e.g., `  Yes: ...`) while preserving the rest of the configuration data.

## Tasks

- [x] Confirm with the user exactly which label explanation formats must be removed and capture any exceptions.
  > The user confirmed the goal is to drop indented explanatory label lines (e.g., `  Yes: ...`, `  No: ...`) from the generated YAML, with no exceptions noted.
- [x] Review the auto-configuration generation pipeline (e.g., `lib/gulp/model` and related gulp tasks) to understand where label entries are serialized.
  > **Bash** `["bash","-lc","rg -n \"comparison-auto\" lib"]`
  > Output: Located references in `lib/gulp/gulpfile.babel.js:50` and `lib/gulp/tasks/criteria.babel.js:114`.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/tasks/criteria.babel.js"]`
  > Output: Reviewed criteria task flow, confirming auto config write via `safeDump(autoConfiguration.json())`.
  > ---
  > **Bash** `["bash","-lc","ls lib/gulp/model"]`
  > Output: Listed model modules including configuration, criteria, data, and util helpers.
  > ---
  > **Bash** `["bash","-lc","ls lib/gulp/model/configuration"]`
  > Output: Found `configuration.js` along with type declarations.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/configuration/configuration.js"]`
  > Output: Confirmed `Configuration.json()` serialization behavior and criteria aggregation.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/criteria/criteria.js"]`
  > Output: Inspected criteria loading and `json()` output to understand value formatting.
  > ---
  > **Bash** `["bash","-lc","sed -n '200,400p' lib/gulp/model/criteria/criteria.js"]`
  > Output: Verified `Criteria.json()` returns map with `values` and other metadata.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/criteria/criteriaValue.js"]`
  > Output: Checked `CriteriaValue.json()` for description/color serialization.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/tasks/determineColors.babel.js"]`
  > Output: Noted color assignment for auto-generated criteria values.
  > ---
  > **Bash** `["bash","-lc","cat configuration/comparison-auto-config.yml"]`
  > Output: Observed numerous auto-generated label value entries with explanatory text keys (827 total lines, inspected locally).
  > ---
  > **Bash** `["bash","-lc","rg \"  Yes\" -n configuration/comparison-auto-config.yml"]`
  > Output: Found entries demonstrating indented label explanations.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,120p' configuration/comparison-default.yml"]`
  > Output: Reviewed default configuration template for context.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,160p' configuration/comparison.yml"]`
  > Output: Compared hand-maintained config to auto-generated output.
- [x] Implement filtering logic to drop indented explanatory label lines while keeping other configuration content intact.
  > **Tessl Build** `tessl - build`
  > - spec: ["specs/lib/gulp/gulpfile-babel.spec.md"]
  >
  > Tessl reported `Invalid spec input` because the spec lacks `@generate` links, so nothing was built.
  > --- 
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/criteria.babel.js
  > @@
  > -    citation(paths, files, configuration, autoConfiguration, defaultConfiguration, function () {
  > -        writeFileSync(files.autoConfig, yaml2json.safeDump(autoConfiguration.json()), "utf8");
  > -
  > -        done();
  > -    });
  > +    citation(paths, files, configuration, autoConfiguration, defaultConfiguration, function () {
  > +        const autoConfigJson = autoConfiguration.json();
  > +        if (Array.isArray(autoConfigJson.criteria)) {
  > +            autoConfigJson.criteria = autoConfigJson.criteria.map(criteriaEntry => {
  > +                const entries = Object.entries(criteriaEntry || {});
  > +                if (entries.length !== 1) {
  > +                    return criteriaEntry;
  > +                }
  > +                const [criteriaId, criteriaBody] = entries[0];
  > +                if (!criteriaBody || isNullOrUndefined(criteriaBody.type)) {
  > +                    return criteriaEntry;
  > +                }
  > +                const criteriaType = String(criteriaBody.type).toUpperCase();
  > +                if (criteriaType === CriteriaTypes.LABEL && !isNullOrUndefined(criteriaBody.values)) {
  > +                    // Drop auto-generated label value metadata to avoid explanatory lines in YAML output.
  > +                    const sanitizedBody = { ...criteriaBody };
  > +                    delete sanitizedBody.values;
  > +                    return { [criteriaId]: sanitizedBody };
  > +                }
  > +                return criteriaEntry;
  > +            });
  > +        }
  > +
  > +        writeFileSync(files.autoConfig, yaml2json.safeDump(autoConfigJson), "utf8");
  > +
  > +        done();
  > +    });
  > *** End Patch
  > ```
  > Output: Applied manual filtering before writing `comparison-auto-config.yml`, removing label value blocks from YAML output.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/criteria.babel.js
  > @@
  > -import { determineColors } from "./determineColors.babel.js";
  > -import { citation } from "./citation.babel.js";
  > -import { isNullOrUndefined } from "../model/util.js";
  > +import { determineColors } from "./determineColors.babel.js";
  > +import { citation } from "./citation.babel.js";
  > +import { isNullOrUndefined } from "../model/util.js";
  > +
  > +export function sanitizeAutoConfigForYaml(autoConfigJson) {
  > +    if (isNullOrUndefined(autoConfigJson)) {
  > +        return autoConfigJson;
  > +    }
  > +
  > +    if (Array.isArray(autoConfigJson.criteria)) {
  > +        autoConfigJson.criteria = autoConfigJson.criteria.map(criteriaEntry => {
  > +            const entries = Object.entries(criteriaEntry || {});
  > +            if (entries.length !== 1) {
  > +                return criteriaEntry;
  > +            }
  > +            const [criteriaId, criteriaBody] = entries[0];
  > +            if (isNullOrUndefined(criteriaBody) || isNullOrUndefined(criteriaBody.type)) {
  > +                return criteriaEntry;
  > +            }
  > +            const criteriaType = String(criteriaBody.type).toUpperCase();
  > +            if (criteriaType === CriteriaTypes.LABEL && !isNullOrUndefined(criteriaBody.values)) {
  > +                // Drop auto-generated label value metadata to avoid explanatory lines in YAML output.
  > +                const sanitizedBody = { ...criteriaBody };
  > +                delete sanitizedBody.values;
  > +                return { [criteriaId]: sanitizedBody };
  > +            }
  > +            return criteriaEntry;
  > +        });
  > +    }
  > +
  > +    return autoConfigJson;
  > +}
  > *** End Patch
  > ```
  > Output: Added reusable sanitizer to strip label value blocks before serializing YAML.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/autoConfigSanitizer.js
  > @@
  > -                Object.entries(criteriaBody.values).forEach(([valueKey, valueBody]) => {
  > +                Object.entries(criteriaBody.values).forEach(([valueKey, valueBody]) => {
  >                     if (isNullOrUndefined(valueBody)) {
  >                         return;
  >                     }
  > +                    if (/\n/.test(valueKey) || /^\s/.test(valueKey)) {
  > +                        console.log(`sanitizeAutoConfigForYaml: trimming multi-line or indented value key for ${criteriaId}:`, JSON.stringify(valueKey));
  > +                    }
  >                     const firstLine = String(valueKey).split(/\r?\n/, 1)[0];
  >                     const normalizedKey = firstLine.trim();
  >                     if (normalizedKey.length === 0) {
  >                         return;
  >                     }
  > @@
  >                 });
  > 
  >                 sanitizedBody.values = sanitizedValues;
  >                 return { [criteriaId]: sanitizedBody };
  >             }
  > 
  >             return criteriaEntry;
  >         });
  >     }
  > *** End Patch
  > ```
  > Output: Added temporary debug logging to surface candidate keys with embedded newlines or indentation.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/data/label.js
  > @@
  > -    if (isNullOrUndefined(this.tooltip)) {
  > +    if (isNullOrUndefined(this.tooltip)) {
  >           this.tooltip = new Tooltip();
  >       }
  >   }
  > 
  >   static loadJson(json, criteria) {
  >       const name = json.content;
  >       const tooltip = Tooltip.fromHtmlString(json.plainChildren);
  > @@
  > -    if (!isNullOrUndefined(criteria)) {
  > +    if (!isNullOrUndefined(criteria)) {
  >           const criteriaValue = criteria.getValue(json.content);
  >           if (!isNullOrUndefined(criteriaValue)) {
  >               clazz = criteriaValue.clazz;
  >               color = criteriaValue.color;
  >               backgroundColor = criteriaValue.backgroundColor;
  >           }
  > @@
  > -    }
  > -
  > -    return new Label(name, tooltip, clazz, color, backgroundColor, stars, comment);
  > +    }
  > +    if (typeof name === "string" && name.trim().toLowerCase().startsWith("via ")) {
  > +      console.log("Label.loadJson debug:", {
  > +        name,
  > +        level: json.level,
  > +        plainChildren: json.plainChildren
  > +      });
  > +    }
  > +
  > +    return new Label(name, tooltip, clazz, color, backgroundColor, stars, comment);
  >   }
  > *** End Patch
  > ```
  > Output: Instrumented label loading to observe entries that represent follow-up explanations.
  > ---
  > **Bash** `["bash","-lc","npm run build"]`
  > Output: Ran the build with instrumentation active to review logged label data (standard warnings persisted).
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/autoConfigSanitizer.js
  > @@
  > -                    if (/\n/.test(valueKey) || /^\s/.test(valueKey)) {
  > -                        console.log(`sanitizeAutoConfigForYaml: trimming multi-line or indented value key for ${criteriaId}:`, JSON.stringify(valueKey));
  > -                    }
  > +                    const words = normalizedKey.split(/\s+/).filter(Boolean);
  > +                    const looksLikeExplanation =
  > +                        words.length > 6 ||
  > +                        /^[("'`]/.test(normalizedKey) ||
  > +                        /[;:]/.test(normalizedKey) ||
  > +                        /\b(via|supports|integrates|provides|offers|includes|enables|allows|delivers|leverages|requires|ensures|works)\b/i.test(normalizedKey);
  > +                    if (looksLikeExplanation) {
  > +                        return;
  > +                    }
  >                     if (Object.prototype.hasOwnProperty.call(sanitizedValues, normalizedKey)) {
  >                         return;
  >                     }
  >                     sanitizedValues[normalizedKey] = valueBody;
  >                 });
  > 
  > -                sanitizedBody.values = sanitizedValues;
  > -                return { [criteriaId]: sanitizedBody };
  > +                if (Object.keys(sanitizedValues).length === 0) {
  > +                    return criteriaEntry;
  > +                }
  > +
  > +                sanitizedBody.values = sanitizedValues;
  > +                return { [criteriaId]: sanitizedBody };
  >             }
  > 
  >             return criteriaEntry;
  >         });
  >     }
  > *** End Patch
  > ```
  > Output: Replaced debug logging with heuristic filtering that prunes explanatory follow-up lines while preserving valid label entries.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/autoConfigSanitizer.js
  > @@
  > -                    const words = normalizedKey.split(/\s+/).filter(Boolean);
  > -                    const looksLikeExplanation =
  > -                        words.length > 6 ||
  > -                        /^[("'`]/.test(normalizedKey) ||
  > -                        /[;:]/.test(normalizedKey) ||
  > -                        /\b(via|supports|integrates|provides|offers|includes|enables|allows|delivers|leverages|requires|ensures|works)\b/i.test(normalizedKey);
  > +                    let primaryKey = normalizedKey.replace(/\s*\(.*/, "").replace(/\s+-\s+.*/, "").trim();
  > +                    if (primaryKey.length === 0) {
  > +                        primaryKey = normalizedKey;
  > +                    }
  > +                    const words = primaryKey.split(/\s+/).filter(Boolean);
  > +                    const looksLikeExplanation =
  > +                        words.length > 6 ||
  > +                        /^[("'`]/.test(primaryKey) ||
  > +                        /[;:]/.test(primaryKey) ||
  > +                        /\b(via|supports|integrates|provides|offers|includes|enables|allows|delivers|leverages|requires|ensures|works)\b/i.test(primaryKey);
  >                     if (looksLikeExplanation) {
  >                         return;
  >                     }
  > -                    if (Object.prototype.hasOwnProperty.call(sanitizedValues, normalizedKey)) {
  > +                    const finalKey = primaryKey;
  > +                    if (Object.prototype.hasOwnProperty.call(sanitizedValues, finalKey)) {
  >                         return;
  >                     }
  > -                    sanitizedValues[normalizedKey] = valueBody;
  > +                    sanitizedValues[finalKey] = valueBody;
  >                 });
  > 
  >                 if (Object.keys(sanitizedValues).length === 0) {
  >                     return criteriaEntry;
  >                 }
  > 
  >                 sanitizedBody.values = sanitizedValues;
  >                 return { [criteriaId]: sanitizedBody };
  >             }
  > 
  >             return criteriaEntry;
  >         });
  >     }
  > *** End Patch
  > ```
  > Output: Trimmed trailing explanations (parentheticals and em-dash clauses) before heuristic analysis so primary labels like “Yes” are preserved while follow-up sentences continue to be pruned.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/autoConfigSanitizer.js
  > @@
  > -                    let primaryKey = normalizedKey.replace(/\s*\(.*/, "").replace(/\s+-\s+.*/, "").trim();
  > -                    if (primaryKey.length === 0) {
  > -                        primaryKey = normalizedKey;
  > -                    }
  > -                    const words = primaryKey.split(/\s+/).filter(Boolean);
  > -                    const looksLikeExplanation =
  > -                        words.length > 6 ||
  > -                        /^[("'`]/.test(primaryKey) ||
  > -                        /[;:]/.test(primaryKey) ||
  > -                        /\b(via|supports|integrates|provides|offers|includes|enables|allows|delivers|leverages|requires|ensures|works)\b/i.test(primaryKey);
  > -                    if (looksLikeExplanation) {
  > -                        return;
  > -                    }
  > -                    const finalKey = primaryKey;
  > -                    if (Object.prototype.hasOwnProperty.call(sanitizedValues, finalKey)) {
  > -                        return;
  > -                    }
  > -                    sanitizedValues[finalKey] = valueBody;
  > +                    const lines = String(valueKey).split(/\r?\n/);
  > +                    const keptLines = lines.filter((line, index) => index === 0 || !/^ {2}/.test(line));
  > +                    const sanitizedKey = keptLines.map(line => line.trim()).join(" ").trim();
  > +                    if (sanitizedKey.length === 0) {
  > +                        return;
  > +                    }
  > +                    if (Object.prototype.hasOwnProperty.call(sanitizedValues, sanitizedKey)) {
  > +                        return;
  > +                    }
  > +                    sanitizedValues[sanitizedKey] = valueBody;
  >                 });
  > ```
  > Output: Simplified sanitization to drop indented explanatory lines while keeping original label values.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/data/label.js
  > @@
  > -    if (typeof name === "string" && name.trim().toLowerCase().startsWith("via ")) {
  > -      console.log("Label.loadJson debug:", {
  > -        name,
  > -        level: json.level,
  > -        plainChildren: json.plainChildren
  > -      });
  > -    }
  > -
  >     return new Label(name, tooltip, clazz, color, backgroundColor, stars, comment);
  >   }
  > *** End Patch
  > ```
  > Output: Removed temporary label instrumentation after completing diagnostics.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/tasks/criteria.babel.js"]`
  > Output: Verified sanitizer export placement and ensured criteria task context remained intact.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/criteria.babel.js
  > @@
  > -    citation(paths, files, configuration, autoConfiguration, defaultConfiguration, function () {
  > -        const autoConfigJson = autoConfiguration.json();
  > -        if (Array.isArray(autoConfigJson.criteria)) {
  > -            autoConfigJson.criteria = autoConfigJson.criteria.map(criteriaEntry => {
  > -                const entries = Object.entries(criteriaEntry || {});
  > -                if (entries.length !== 1) {
  > -                    return criteriaEntry;
  > -                }
  > -                const [criteriaId, criteriaBody] = entries[0];
  > -                if (!criteriaBody || isNullOrUndefined(criteriaBody.type)) {
  > -                    return criteriaEntry;
  > -                }
  > -                const criteriaType = String(criteriaBody.type).toUpperCase();
  > -                if (criteriaType === CriteriaTypes.LABEL && !isNullOrUndefined(criteriaBody.values)) {
  > -                    // Drop auto-generated label value metadata to avoid explanatory lines in YAML output.
  > -                    const sanitizedBody = { ...criteriaBody };
  > -                    delete sanitizedBody.values;
  > -                    return { [criteriaId]: sanitizedBody };
  > -                }
  > -                return criteriaEntry;
  > -            });
  > -        }
  > -
  > -        writeFileSync(files.autoConfig, yaml2json.safeDump(autoConfigJson), "utf8");
  > +    citation(paths, files, configuration, autoConfiguration, defaultConfiguration, function () {
  > +        const autoConfigJson = sanitizeAutoConfigForYaml(autoConfiguration.json());
  > +
  > +        writeFileSync(files.autoConfig, yaml2json.safeDump(autoConfigJson), "utf8");
  > 
  >         done();
  >     });
  > *** End Patch
  > ```
  > Output: Updated the criteria task to rely on the sanitizer helper before writing YAML.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Add File: lib/gulp/tasks/autoConfigSanitizer.js
  > +import { isNullOrUndefined } from "../model/util.js";
  > +
  > +export function sanitizeAutoConfigForYaml(autoConfigJson) {
  > +    if (isNullOrUndefined(autoConfigJson)) {
  > +        return autoConfigJson;
  > +    }
  > +
  > +    if (Array.isArray(autoConfigJson.criteria)) {
  > +        autoConfigJson.criteria = autoConfigJson.criteria.map(criteriaEntry => {
  > +            const entries = Object.entries(criteriaEntry || {});
  > +            if (entries.length !== 1) {
  > +                return criteriaEntry;
  > +            }
  > +
  > +            const [criteriaId, criteriaBody] = entries[0];
  > +            if (isNullOrUndefined(criteriaBody) || isNullOrUndefined(criteriaBody.type)) {
  > +                return criteriaEntry;
  > +            }
  > +
  > +            const criteriaType = String(criteriaBody.type).toUpperCase();
  > +            if (criteriaType === "LABEL" && !isNullOrUndefined(criteriaBody.values)) {
  > +                // Drop auto-generated label value metadata to avoid explanatory lines in YAML output.
  > +                const sanitizedBody = { ...criteriaBody };
  > +                delete sanitizedBody.values;
  > +                return { [criteriaId]: sanitizedBody };
  > +            }
  > +
  > +            return criteriaEntry;
  > +        });
  > +    }
  > +
  > +    return autoConfigJson;
  > +}
  > *** End Patch
  > ```
  > Output: Factored sanitizer into dedicated module to avoid importing CriteriaTypes during lightweight tests.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/criteria.babel.js
  > @@
  > -import { determineColors } from "./determineColors.babel.js";
  > -import { citation } from "./citation.babel.js";
  > -import { isNullOrUndefined } from "../model/util.js";
  > +import { determineColors } from "./determineColors.babel.js";
  > +import { citation } from "./citation.babel.js";
  > +import { isNullOrUndefined } from "../model/util.js";
  > +import { sanitizeAutoConfigForYaml } from "./autoConfigSanitizer.js";
  > +export { sanitizeAutoConfigForYaml } from "./autoConfigSanitizer.js";
  > *** End Patch
  > ```
  > Output: Wired the criteria task to consume and re-export the shared sanitizer helper.
- [x] Update or add tests that cover removal of indented label explanations within the config-processing pipeline.
  > **Bash** `["bash","-lc","mkdir -p lib/gulp/tests"]`
  > Output: Created tests directory for gulp tasks (noop if already present).
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Add File: lib/gulp/tests/config-auto-sanitizer.spec.mjs
  > +import assert from "node:assert";
  > +
  > +import { sanitizeAutoConfigForYaml } from "../tasks/criteria.babel.js";
  > +
  > +const sampleAutoConfig = {
  > +    criteria: [
  > +        {
  > +            LabelCriteria: {
  > +                type: "LABEL",
  > +                name: "Sample Label",
  > +                values: {
  > +                    Yes: {
  > +                        color: "#000000",
  > +                        backgroundColor: "#ffffff"
  > +                    },
  > +                    No: {
  > +                        color: "#111111",
  > +                        backgroundColor: "#eeeeee"
  > +                    }
  > +                }
  > +            }
  > +        },
  > +        {
  > +            MarkdownCriteria: {
  > +                type: "MARKDOWN",
  > +                description: "Should remain unchanged"
  > +            }
  > +        }
  > +    ]
  > +};
  > +
  > +const sanitized = sanitizeAutoConfigForYaml(JSON.parse(JSON.stringify(sampleAutoConfig)));
  > +
  > +const labelCriteriaEntry = sanitized.criteria.find(entry => Object.prototype.hasOwnProperty.call(entry, "LabelCriteria"));
  > +assert.ok(labelCriteriaEntry, "Label criteria entry should be present in sanitized output");
  > +assert.strictEqual(
  > +    labelCriteriaEntry.LabelCriteria.values,
  > +    undefined,
  > +    "Label criteria values must be stripped from sanitized YAML representation"
  > +);
  > +
  > +const nonLabelEntry = sanitized.criteria.find(entry => Object.prototype.hasOwnProperty.call(entry, "MarkdownCriteria"));
  > +assert.ok(nonLabelEntry, "Non-label criteria entry should remain present");
  > +assert.deepStrictEqual(
  > +    nonLabelEntry.MarkdownCriteria,
  > +    sampleAutoConfig.criteria[1].MarkdownCriteria,
  > +    "Non-label criteria should not be modified by sanitization"
  > +);
  > +
  > +assert.ok(
  > +    sampleAutoConfig.criteria[0].LabelCriteria.values,
  > +    "Original auto config object should remain untouched"
  > +);
  > +
  > +console.log("sanitizeAutoConfigForYaml tests passed.");
  > *** End Patch
  > ```
  > Output: Added Node-based smoke test to ensure sanitizer strips label value blocks.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tests/config-auto-sanitizer.spec.mjs
  > @@
  > -import { sanitizeAutoConfigForYaml } from "../tasks/criteria.babel.js";
  > +import { sanitizeAutoConfigForYaml } from "../tasks/autoConfigSanitizer.js";
  > *** End Patch
  > ```
  > Output: Updated test to import sanitizer directly from its dedicated module.
  > ---
  > **Bash** `["bash","-lc","node lib/gulp/tests/config-auto-sanitizer.spec.mjs"]`
  > Output: Test passed (Node reported module-type warning but assertions succeeded).
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tests/config-auto-sanitizer.spec.mjs
  > @@
  > -                values: {
  > -                    "Yes\n  Works offline and caches data locally for air-gapped teams": {
  > -                        color: "#000000",
  > -                        backgroundColor: "#ffffff"
  > -                    },
  > -                    No: {
  > -                        color: "#111111",
  > -                        backgroundColor: "#eeeeee"
  > -                    }
  > -                }
  > +                values: {
  > +                    "Yes\n  Works offline and caches data locally for air-gapped teams": {
  > +                        color: "#000000",
  > +                        backgroundColor: "#ffffff"
  > +                    },
  > +                    No: {
  > +                        color: "#111111",
  > +                        backgroundColor: "#eeeeee"
  > +                    },
  > +                    "Supports multiple LLM backends and local adapters; configurable via provider gateways and API keys": {
  > +                        color: "#222222",
  > +                        backgroundColor: "#dddddd"
  > +                    }
  > +                }
  > @@
  > -assert.strictEqual(
  > -    Object.keys(labelCriteriaEntry.LabelCriteria.values).length,
  > -    2,
  > -    "Sanitized label values should include entries for each distinct option"
  > -);
  > +assert.strictEqual(
  > +    Object.keys(labelCriteriaEntry.LabelCriteria.values).length,
  > +    2,
  > +    "Sanitized label values should include only trimmed primary options"
  > +);
  > @@
  > assert.ok(
  >     Object.prototype.hasOwnProperty.call(labelCriteriaEntry.LabelCriteria.values, "No"),
  >     "Sanitized label values should retain existing secondary label keys"
  > );
  > +assert.ok(
  > +    !Object.prototype.hasOwnProperty.call(labelCriteriaEntry.LabelCriteria.values, "Supports multiple LLM backends and local adapters; configurable via provider gateways and API keys"),
  > +    "Sanitized label values should drop explanatory follow-up lines"
  > +);
  > @@
  > assert.ok(
  >     Object.prototype.hasOwnProperty.call(sampleAutoConfig.criteria[0].LabelCriteria.values, "Yes\n  Works offline and caches data locally for air-gapped teams"),
  >     "Original auto config object should remain untouched"
  > );
  > +assert.ok(
  > +    Object.prototype.hasOwnProperty.call(sampleAutoConfig.criteria[0].LabelCriteria.values, "Supports multiple LLM backends and local adapters; configurable via provider gateways and API keys"),
  > +    "Original auto config must retain explanatory entries for reference"
  > +);
  > *** End Patch
  > ```
  > Output: Expanded the test expectations to cover explanatory entries and confirm sanitization heuristics.
  > ---
  > **Bash** `["bash","-lc","node lib/gulp/tests/config-auto-sanitizer.spec.mjs"]`
  > Output: Re-ran the Node-based test confirming the refined heuristics (same module-type warning noted).
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tests/config-auto-sanitizer.spec.mjs
  > @@
  > -assert.strictEqual(
  > -    Object.keys(labelCriteriaEntry.LabelCriteria.values).length,
  > -    2,
  > -    "Sanitized label values should include only trimmed primary options"
  > -);
  > +assert.strictEqual(
  > +    Object.keys(labelCriteriaEntry.LabelCriteria.values).length,
  > +    3,
  > +    "Sanitized label values should retain entries that are not indented explanations"
  > +);
  > @@
  > -assert.ok(
  > -    !Object.prototype.hasOwnProperty.call(labelCriteriaEntry.LabelCriteria.values, "Supports multiple LLM backends and local adapters; configurable via provider gateways and API keys"),
  > -    "Sanitized label values should drop explanatory follow-up lines"
  > -);
  > +assert.ok(
  > +    Object.prototype.hasOwnProperty.call(labelCriteriaEntry.LabelCriteria.values, "Supports multiple LLM backends and local adapters; configurable via provider gateways and API keys"),
  > +    "Sanitized label values should preserve non-indented entries even when descriptive"
  > +);
  > @@
  > -assert.ok(
  > -    Object.prototype.hasOwnProperty.call(sampleAutoConfig.criteria[0].LabelCriteria.values, "Supports multiple LLM backends and local adapters; configurable via provider gateways and API keys"),
  > -    "Original auto config must retain explanatory entries for reference"
  > -);
  > +assert.ok(
  > +    Object.prototype.hasOwnProperty.call(sampleAutoConfig.criteria[0].LabelCriteria.values, "Supports multiple LLM backends and local adapters; configurable via provider gateways and API keys"),
  > +    "Original auto config must retain descriptive entries for reference"
  > +);
  > *** End Patch
  > ```
  > Output: Finalized the smoke test so it now verifies the simplified sanitization rule.
  > ---
  > **Bash** `["bash","-lc","node lib/gulp/tests/config-auto-sanitizer.spec.mjs"]`
  > Output: Latest run confirms the updated expectations; Node still surfaces the module-type warning.
- [x] Run `npm run build` to verify the configuration pipeline succeeds with the updated logic.
  > **Bash** `["bash","-lc","npm run build"]`
  > Output: Build completed successfully; gulp data prep skipped markdown conversion (missing `MD_TO_JSON_COMMAND`) and emitted expected development column fetch warnings, Angular build succeeded with standard unused file notices.
  > ---
  > **Bash** `["bash","-lc","npm run build"]`
  > Output: Rebuilt after adding instrumentation; observed same warnings plus the expected sanitizer/label debug logs.
  > ---
  > **Bash** `["bash","-lc","npm run build"]`
  > Output: Final build with heuristics applied—warnings unchanged, YAML regenerated with trimmed label values.
  > ---
  > **Bash** `["bash","-lc","npm run build"]`
  > Output: Re-ran build after normalizing label keys; warnings unchanged and YAML updated to keep primary labels while dropping explanatory lines.
  > ---
  > **Bash** `["bash","-lc","npm run build"]`
  > Output: Verified simplified sanitizer (drop lines with two-space indent) with the usual warnings; generated assets stayed consistent.
- [x] Document the outcome and confirm the behavior change with the user.
  > **Tessl Edit** `tessl__edit`
  > - file: "specs/lib/gulp/gulpfile-babel.spec.md"
  > - prompt: "Adjust the Configuration Management capability description to reflect that the auto-generated YAML now trims label value entries to remove explanatory follow-up lines while preserving the core value blocks. Update the existing bullet so it states that only the additional indented explanations are stripped, keeping the main value and its metadata intact."
  > Output: Updated the spec bullet to describe trimming explanatory follow-up lines while retaining label metadata.
  > Capturing key changes (sanitized auto config generation, supporting tests, successful build) and summarizing for the user in the final response.
