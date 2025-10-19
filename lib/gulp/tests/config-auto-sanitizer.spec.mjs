import assert from "node:assert";

import { sanitizeAutoConfigForYaml } from "../tasks/autoConfigSanitizer.js";

const sampleAutoConfig = {
    criteria: [
        {
            LabelCriteria: {
                type: "LABEL",
                name: "Sample Label",
                values: {
                    "Yes\n  Works offline and caches data locally for air-gapped teams": {
                        color: "#000000",
                        backgroundColor: "#ffffff"
                    },
                    No: {
                        color: "#111111",
                        backgroundColor: "#eeeeee"
                    },
                    "Supports multiple LLM backends and local adapters; configurable via provider gateways and API keys": {
                        color: "#222222",
                        backgroundColor: "#dddddd"
                    }
                }
            }
        },
        {
            MarkdownCriteria: {
                type: "MARKDOWN",
                description: "Should remain unchanged"
            }
        }
    ]
};

const sanitized = sanitizeAutoConfigForYaml(JSON.parse(JSON.stringify(sampleAutoConfig)));

const labelCriteriaEntry = sanitized.criteria.find(entry => Object.prototype.hasOwnProperty.call(entry, "LabelCriteria"));
assert.ok(labelCriteriaEntry, "Label criteria entry should be present in sanitized output");
assert.ok(
    labelCriteriaEntry.LabelCriteria.values,
    "Label criteria values should be preserved in sanitized YAML representation"
);
assert.strictEqual(
    Object.keys(labelCriteriaEntry.LabelCriteria.values).length,
    3,
    "Sanitized label values should retain entries that are not indented explanations"
);
assert.ok(
    Object.prototype.hasOwnProperty.call(labelCriteriaEntry.LabelCriteria.values, "Yes"),
    "Sanitized label values should retain the primary label key"
);
assert.ok(
    Object.prototype.hasOwnProperty.call(labelCriteriaEntry.LabelCriteria.values, "No"),
    "Sanitized label values should retain existing secondary label keys"
);
assert.ok(
    Object.prototype.hasOwnProperty.call(labelCriteriaEntry.LabelCriteria.values, "Supports multiple LLM backends and local adapters; configurable via provider gateways and API keys"),
    "Sanitized label values should preserve non-indented entries even when descriptive"
);

const nonLabelEntry = sanitized.criteria.find(entry => Object.prototype.hasOwnProperty.call(entry, "MarkdownCriteria"));
assert.ok(nonLabelEntry, "Non-label criteria entry should remain present");
assert.deepStrictEqual(
    nonLabelEntry.MarkdownCriteria,
    sampleAutoConfig.criteria[1].MarkdownCriteria,
    "Non-label criteria should not be modified by sanitization"
);

assert.ok(
    Object.prototype.hasOwnProperty.call(sampleAutoConfig.criteria[0].LabelCriteria.values, "Yes\n  Works offline and caches data locally for air-gapped teams"),
    "Original auto config object should remain untouched"
);
assert.ok(
    Object.prototype.hasOwnProperty.call(sampleAutoConfig.criteria[0].LabelCriteria.values, "Supports multiple LLM backends and local adapters; configurable via provider gateways and API keys"),
    "Original auto config must retain descriptive entries for reference"
);

console.log("sanitizeAutoConfigForYaml tests passed.");
