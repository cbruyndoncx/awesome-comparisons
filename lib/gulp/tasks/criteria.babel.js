import { existsSync, readFileSync, writeFileSync } from "fs";
import yaml2json from "js-yaml";
import { Configuration, Criteria, CriteriaTypes, CriteriaValue, Data } from "../model/model.module.js";
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
        const json = yaml2json.safeLoad(readFileSync(filePath, "utf8"));
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

const RESERVED_CRITERIA_IDS = new Set([
    'Label-Criteria',
    'Markdown-Criteria',
    'Text-Criteria',
    'Name-Url-Criteria',
    'Repository-Criteria'
]);

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
        existsSync(files.config) ? yaml2json.safeLoad(readFileSync(files.config, "utf8")) : {},
        fallbackDefaults,
        true
    );
    const configuration = cloneConfiguration(configurationOverrides) || configurationOverrides;
    if (sharedDefaults) {
        configuration.combine(sharedDefaults);
    }
    const oldAutoConfiguration = Configuration.load(
        existsSync(files.autoConfig) ? yaml2json.safeLoad(readFileSync(files.autoConfig, "utf8")) : {},
        fallbackDefaults,
        true
    );
    if (sharedDefaults) {
        oldAutoConfiguration.combine(sharedDefaults);
    }
    const data = Data.loadJson(JSON.parse(readFileSync(files.dataJson, "utf8")) || [], configuration);
    const autoConfiguration = Configuration.empty(false);

    if (!configuration.containsCriteria("id")) {
        autoConfiguration.setCriteria(0, defaultConfiguration.getCriteria("id"));
    }

    if (!configuration.containsCriteria("ShortDescription")) {
        const shortDescriptionCriteria = defaultConfiguration.getCriteria("ShortDescription");
        if (!isNullOrUndefined(shortDescriptionCriteria)) {
            autoConfiguration.setCriteria(1, shortDescriptionCriteria);
        }
    }

    if (!configuration.containsCriteria("description")) {
        autoConfiguration.setCriteria(2, defaultConfiguration.getCriteria("description"));
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
            autoConfiguration.setCriteria(-1, Criteria.empty(criteria.id, types.get(criteria.id), false));
        }
    });

    data.dataElements.forEach(dataElement => {
        (dataElement.criteriaData || new Map()).forEach(criteriaData => {
            // Criteria is defined and not a Label
            if (configuration.containsCriteria(criteriaData.name) &&
                types.get(criteriaData.name) !== CriteriaTypes.LABEL) {
                return;

            } else
            // Criteria is defined and a Label
            if (configuration.containsCriteria(criteriaData.name)) {
                const criteria = configuration.getCriteria(criteriaData.name);
                const labels = criteriaData.labels;
                labels.forEach((value, key) => {
                    if (!criteria.values.has(key)) {
                        if (!autoConfiguration.containsCriteria(criteriaData.name)) {
                            autoConfiguration.setCriteria(-1, Criteria.empty(criteria.id, criteria.type, false));
                        }
                        autoConfiguration.getCriteria(criteriaData.name)
                            .values.set(key, new CriteriaValue(criteria.id, key));
                    }
                })
            }
            // Criteria is not defined
            else {
                const defaultLabel = defaultConfiguration.getCriteria("Label-Criteria")
                    || defaultConfiguration.getCriteria("default-label");
                const defaultMarkdown = defaultConfiguration.getCriteria("Markdown-Criteria")
                    || defaultConfiguration.getCriteria("default-markdown");
                const templateCriteria = criteriaData.labels.size > 0 ? defaultLabel : defaultMarkdown;

                if (isNullOrUndefined(templateCriteria)) {
                    return;
                }

                let autoCriteria;
                if (autoConfiguration.containsCriteria(criteriaData.name)) {
                    autoCriteria = autoConfiguration.getCriteria(criteriaData.name);
                } else {
                    autoCriteria = Criteria.copy(
                        criteriaData.name,
                        criteriaData.name,
                        templateCriteria
                    );
                    autoConfiguration.setCriteria(-1, autoCriteria);
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
            }
        });
    });

    (data.groups || new Map()).forEach((summary, groupKey) => {
        let targetCriteria = null;
        if (configuration.containsCriteria(groupKey)) {
            targetCriteria = configuration.getCriteria(groupKey);
        } else if (autoConfiguration.containsCriteria(groupKey)) {
            targetCriteria = autoConfiguration.getCriteria(groupKey);
        } else {
            const template = defaultConfiguration.getCriteria("Label-Criteria")
                || defaultConfiguration.getCriteria("default-label");
            if (!isNullOrUndefined(template)) {
                targetCriteria = Criteria.copy(groupKey, template.name || groupKey, template);
            } else {
                targetCriteria = Criteria.empty(groupKey, CriteriaTypes.LABEL, false);
            }
            targetCriteria.type = CriteriaTypes.LABEL;
            targetCriteria.table = false;
            targetCriteria.detail = false;
            targetCriteria.search = false;
            autoConfiguration.setCriteria(-1, targetCriteria);
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
        writeFileSync(files.autoConfig, yaml2json.safeDump(autoConfiguration.json()), "utf8");
        done();
    });


}
