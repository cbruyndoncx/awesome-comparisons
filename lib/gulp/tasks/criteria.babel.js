import { existsSync, readFileSync, writeFileSync } from "fs";
import yaml2json from "js-yaml";
import { Configuration, Criteria, CriteriaTypes, CriteriaValue, Data, CriteriaData, Label } from "../model/model.module.js";
import { determineColors } from "./determineColors.babel.js";
import { isNullOrUndefined } from "../model/util.js";

function loadDefaultConfiguration(defaultConfigPaths, fallbackPath) {
    const paths = Array.isArray(defaultConfigPaths) ? defaultConfigPaths.filter(Boolean) : [];
    if (paths.length === 0 && fallbackPath) {
        paths.push(fallbackPath);
    }
    if (paths.length === 0) {
        return null;
    }
    let merged = null;
    paths.forEach(filePath => {
        const json = yaml2json.load(readFileSync(filePath, "utf8"));
        const configuration = Configuration.load(json);
        merged = merged ? merged.combine(configuration) : configuration;
    });
    return merged;
}

function cloneConfiguration(configuration) {
    if (!configuration) {
        return null;
    }
    return Configuration.load(configuration.json(), configuration, false);
}

function mergeConfigurations(base, additional) {
    const target = cloneConfiguration(base) || base;
    if (target && additional) {
        target.combine(additional);
    } else if (!target) {
        return additional ? cloneConfiguration(additional) || additional : null;
    }
    return target;
}

function normalizeCriteriaKey(value) {
    if (typeof value !== "string") {
        return "";
    }
    return value.replace(/[^A-Za-z0-9]+/g, "").toLowerCase();
}

function buildCriteriaIdCandidate(value) {
    if (typeof value !== "string") {
        return "";
    }
    return value.replace(/[^A-Za-z0-9]+/g, "");
}

function rememberCriteriaAlias(aliasMap, id, name) {
    if (isNullOrUndefined(aliasMap) || isNullOrUndefined(id)) {
        return;
    }
    const normalizedId = normalizeCriteriaKey(id);
    if (normalizedId && !aliasMap.has(normalizedId)) {
        aliasMap.set(normalizedId, id);
    }
    if (typeof name === "string" && name.trim().length > 0) {
        const normalizedName = normalizeCriteriaKey(name);
        if (normalizedName && !aliasMap.has(normalizedName)) {
            aliasMap.set(normalizedName, id);
        }
    }
}

function resolveCriteriaId(aliasMap, rawName) {
    const normalized = normalizeCriteriaKey(rawName);
    if (normalized && aliasMap.has(normalized)) {
        return aliasMap.get(normalized);
    }
    const candidate = buildCriteriaIdCandidate(rawName);
    const fallbackId = candidate || `criteria${aliasMap.size + 1}`;
    rememberCriteriaAlias(aliasMap, fallbackId, rawName);
    return fallbackId;
}

function addAutoCriteria(autoConfiguration, aliasMap, index, criteria) {
    if (isNullOrUndefined(criteria)) {
        return;
    }
    autoConfiguration.setCriteria(index, criteria);
    rememberCriteriaAlias(aliasMap, criteria.id, criteria.name);
}

const RESERVED_CRITERIA_IDS = new Set([
    'Label-Criteria',
    'Markdown-Criteria',
    'Text-Criteria',
    'Name-Url-Criteria',
    'Repository-Criteria'
]);

/**
 * Helper to check if a capability value indicates support
 */
function hasCapability(value) {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'object' && value !== null) return true;
    return false;
}

/**
 * Process MCP enrichment data and populate MCP-related criteria
 */
function processMcpEnrichment(dataElement, configuration) {
    if (!dataElement.mcpEnrichment) {
        // No MCP support - set MCP-Client criteria to "No" only
        if (configuration.containsCriteria('MCP-Client')) {
            const criteria = configuration.getCriteria('MCP-Client');
            const labelData = new CriteriaData(criteria.id, criteria.name, new Map([['No', new Label('No')]]), CriteriaTypes.LABEL);
            dataElement.criteriaData.set(criteria.name, labelData);
        }
        return;
    }

    const enrichment = dataElement.mcpEnrichment;
    const caps = enrichment.capabilities;

    // Set MCP-Client to "Yes"
    if (configuration.containsCriteria('MCP-Client')) {
        const criteria = configuration.getCriteria('MCP-Client');
        const labelData = new CriteriaData(criteria.id, criteria.name, new Map([['Yes', new Label('Yes')]]), CriteriaTypes.LABEL);
        dataElement.criteriaData.set(criteria.name, labelData);
    }

    // Set Protocol Version (TEXT type)
    if (configuration.containsCriteria('MCP-Protocol-Version') && enrichment.protocolVersion) {
        const criteria = configuration.getCriteria('MCP-Protocol-Version');
        const textData = new CriteriaData(criteria.id, criteria.name, new Map(), CriteriaTypes.TEXT);
        textData.text = enrichment.protocolVersion;
        dataElement.criteriaData.set(criteria.name, textData);
    }

    // Set individual capabilities
    const capabilityMapping = [
        ['MCP-Tools', caps.tools],
        ['MCP-Prompts', caps.prompts],
        ['MCP-Resources', caps.resources],
        ['MCP-Roots', caps.roots],
        ['MCP-Sampling', caps.sampling],
        ['MCP-Tasks', caps.tasks]
    ];

    let addedCount = 0;
    capabilityMapping.forEach(([criteriaId, capValue]) => {
        if (configuration.containsCriteria(criteriaId)) {
            const criteria = configuration.getCriteria(criteriaId);
            const supported = hasCapability(capValue);
            const labelValue = supported ? 'Yes' : 'No';
            const labelData = new CriteriaData(
                criteria.id,
                criteria.name,
                new Map([[labelValue, new Label(labelValue)]]),
                CriteriaTypes.LABEL
            );
            dataElement.criteriaData.set(criteria.name, labelData);
            addedCount++;
        } else {
            console.log(`  Warning: Configuration does not contain criteria ${criteriaId}`);
        }
    });
    if (addedCount === 0 && dataElement.mcpEnrichment) {
        console.log(`  Warning: No capability criteria added for ${dataElement.name} despite having MCP enrichment`);
    }
}

function pruneReservedCriteria(configuration) {
    if (!configuration || !Array.isArray(configuration.criteria)) {
        return;
    }
    configuration.criteria = configuration.criteria.filter(criteria => {
        if (!criteria || typeof criteria.id !== 'string') {
            return true;
        }
        if (criteria.id.startsWith('default-')) {
            return false;
        }
        return !RESERVED_CRITERIA_IDS.has(criteria.id);
    });
}

export function criteria(paths, files, done) {
    const fallbackDefaults = loadDefaultConfiguration(null, files.fallbackConfig);
    const sharedDefaults = loadDefaultConfiguration(files.sharedDefaultConfigs);
    const defaultConfiguration = mergeConfigurations(fallbackDefaults, sharedDefaults);
    const configurationOverrides = Configuration.load(
        existsSync(files.config) ? yaml2json.load(readFileSync(files.config, "utf8")) : {},
        fallbackDefaults,
        true
    );
    const configuration = cloneConfiguration(configurationOverrides) || configurationOverrides;
    if (sharedDefaults) {
        configuration.combine(sharedDefaults);
    }
    const oldAutoConfiguration = Configuration.load(
        existsSync(files.autoConfig) ? yaml2json.load(readFileSync(files.autoConfig, "utf8")) : {},
        fallbackDefaults,
        true
    );
    if (sharedDefaults) {
        oldAutoConfiguration.combine(sharedDefaults);
    }
    const data = Data.loadJson(JSON.parse(readFileSync(files.dataJson, "utf8")) || [], configuration);
    const autoConfiguration = Configuration.empty(false);
    const criteriaAliasMap = new Map();
    if (configuration && Array.isArray(configuration.criteria)) {
        configuration.criteria.forEach(criteria => rememberCriteriaAlias(criteriaAliasMap, criteria.id, criteria.name));
    }

    if (!configuration.containsCriteria("id")) {
        addAutoCriteria(autoConfiguration, criteriaAliasMap, 0, defaultConfiguration.getCriteria("id"));
    }

    if (!configuration.containsCriteria("ShortDescription")) {
        const shortDescriptionCriteria = defaultConfiguration.getCriteria("ShortDescription");
        if (!isNullOrUndefined(shortDescriptionCriteria)) {
            addAutoCriteria(autoConfiguration, criteriaAliasMap, 1, shortDescriptionCriteria);
        }
    }

    if (!configuration.containsCriteria("description")) {
        addAutoCriteria(autoConfiguration, criteriaAliasMap, 2, defaultConfiguration.getCriteria("description"));
    }

    const types = new Map();
    configuration.criteria.forEach(criteria => {
        if (!isNullOrUndefined(criteria.type)) {
            types.set(criteria.id, criteria.type);
        } else {
            let textCount = 0;
            let labelCount = 0;
            data.dataElements.map(dataElement => dataElement.criteriaData.get(criteria.id))
                .filter(value => !isNullOrUndefined(value))
                .forEach(criteriaData => {
                    if (!isNullOrUndefined(criteriaData.text) && criteriaData.text.length > 0) {
                        textCount++;
                    }
                    if (!isNullOrUndefined(criteriaData.labels) && criteriaData.labels.size > 0) {
                        labelCount++;
                    }
                });
            types.set(criteria.id, textCount < labelCount ? CriteriaTypes.LABEL : CriteriaTypes.MARKDOWN);
            addAutoCriteria(autoConfiguration, criteriaAliasMap, -1, Criteria.empty(criteria.id, types.get(criteria.id), false));
        }
    });

    // Process MCP enrichment data for each element (note: enrichment data added later by mcp:enrich task)
    data.dataElements.forEach(dataElement => {
        processMcpEnrichment(dataElement, configuration);
    });

    data.dataElements.forEach(dataElement => {
        (dataElement.criteriaData || new Map()).forEach(criteriaData => {
            const criteriaId = resolveCriteriaId(criteriaAliasMap, criteriaData.name);
            const configurationHasCriteria = configuration.containsCriteria(criteriaId);
            const criteriaType = types.get(criteriaId);

            // Criteria is defined and not a Label
            if (configurationHasCriteria && criteriaType !== CriteriaTypes.LABEL) {
                return;
            }

            if (configurationHasCriteria) {
                const criteria = configuration.getCriteria(criteriaId);
                const labels = criteriaData.labels;
                labels.forEach((value, key) => {
                    if (!criteria.values.has(key)) {
                        if (!autoConfiguration.containsCriteria(criteriaId)) {
                            addAutoCriteria(autoConfiguration, criteriaAliasMap, -1, Criteria.empty(criteria.id, criteria.type, false));
                        }
                        autoConfiguration.getCriteria(criteriaId)
                            .values.set(key, new CriteriaValue(criteria.id, key));
                    }
                });
                return;
            }

            const defaultLabel = defaultConfiguration.getCriteria("Label-Criteria")
                || defaultConfiguration.getCriteria("default-label");
            const defaultMarkdown = defaultConfiguration.getCriteria("Markdown-Criteria")
                || defaultConfiguration.getCriteria("default-markdown");
            const templateCriteria = criteriaData.labels.size > 0 ? defaultLabel : defaultMarkdown;

            if (isNullOrUndefined(templateCriteria)) {
                return;
            }

            let autoCriteria;
            if (autoConfiguration.containsCriteria(criteriaId)) {
                autoCriteria = autoConfiguration.getCriteria(criteriaId);
            } else {
                autoCriteria = Criteria.copy(
                    criteriaId,
                    criteriaData.name,
                    templateCriteria
                );
                addAutoCriteria(autoConfiguration, criteriaAliasMap, -1, autoCriteria);
            }
            // Criteria is a Label
            if (autoCriteria.type === CriteriaTypes.LABEL) {
                if (criteriaData.labels.size === 0) {
                    if (!autoCriteria.values.has("")) {
                        autoCriteria.values.set("", new CriteriaValue(autoCriteria.id, ""));
                    }
                } else {
                    criteriaData.labels.forEach((label, key) => {
                        if (!autoCriteria.values.has(key)) {
                            autoCriteria.values.set(key, new CriteriaValue(autoCriteria.id, key));
                        }
                    });
                }
            }
        });
    });

    (data.groups || new Map()).forEach((summary, groupKey) => {
        const groupCriteriaId = resolveCriteriaId(criteriaAliasMap, groupKey);
        let targetCriteria = null;
        if (configuration.containsCriteria(groupCriteriaId)) {
            targetCriteria = configuration.getCriteria(groupCriteriaId);
        } else if (autoConfiguration.containsCriteria(groupCriteriaId)) {
            targetCriteria = autoConfiguration.getCriteria(groupCriteriaId);
        } else {
            const template = defaultConfiguration.getCriteria("Label-Criteria")
                || defaultConfiguration.getCriteria("default-label");
            if (!isNullOrUndefined(template)) {
                targetCriteria = Criteria.copy(groupCriteriaId, template.name || groupKey, template);
            } else {
                targetCriteria = Criteria.empty(groupCriteriaId, CriteriaTypes.LABEL, false);
            }
            targetCriteria.type = CriteriaTypes.LABEL;
            targetCriteria.table = false;
            targetCriteria.detail = false;
            targetCriteria.search = false;
            addAutoCriteria(autoConfiguration, criteriaAliasMap, -1, targetCriteria);
        }

        if (!isNullOrUndefined(summary.children)) {
            targetCriteria.children = summary.children;
        } else if (isNullOrUndefined(targetCriteria.children)) {
            targetCriteria.children = [];
        }

        if (!isNullOrUndefined(summary.labels)) {
            summary.labels.forEach(labelName => {
                if (!targetCriteria.values.has(labelName)) {
                    targetCriteria.values.set(labelName, new CriteriaValue(targetCriteria.id, labelName));
                }
            });
        }

        targetCriteria.table = false;
        targetCriteria.detail = false;
        targetCriteria.search = false;

        if (!types.has(targetCriteria.id)) {
            types.set(targetCriteria.id, targetCriteria.type || CriteriaTypes.LABEL);
        }
    });

    // Renew 'comparison-auto-config.yml' with auto-detected colors
    determineColors(defaultConfiguration, configuration, oldAutoConfiguration, autoConfiguration, function () {
        pruneReservedCriteria(autoConfiguration);
        writeFileSync(files.autoConfig, yaml2json.dump(autoConfiguration.json()), "utf8");

        // Write updated data.json with MCP criteria
        writeFileSync(files.dataJson, JSON.stringify(data.json()), 'utf8');

        done();
    });


}
