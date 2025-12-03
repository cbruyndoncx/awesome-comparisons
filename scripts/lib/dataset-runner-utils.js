'use strict';

const { rmSync } = require('fs');
const path = require('path');

function parseDatasetFlags(argv, env) {
    const datasetSelections = new Set();
    const angularArgs = [];
    const envDatasetValues = collectDatasetValues([env.DATASET, env.DATASETS]);
    let forceAllDatasets = parseBoolean(env.ALL_DATASETS);
    let hasCliDatasetArg = false;
    let cleanOutputsFirst = parseBoolean(env.CLEAN_OUTPUTS ?? env.BUILD_CLEAN ?? env.CLEAN);

    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
        if (isDatasetFlag(arg)) {
            const nextValue = argv[index + 1];
            index += 1;
            hasCliDatasetArg = true;
            forceAllDatasets = false;
            addDatasetValues(datasetSelections, nextValue);
            continue;
        }
        const inlineDatasetValue = getInlineValue(arg, ['--dataset=', '--datasets=', '-d=']);
        if (inlineDatasetValue !== null) {
            hasCliDatasetArg = true;
            forceAllDatasets = false;
            addDatasetValues(datasetSelections, inlineDatasetValue);
            continue;
        }
        if (arg === '--clean' || arg === '--clean-first' || arg === '--full-build') {
            cleanOutputsFirst = true;
            continue;
        }
        if (arg === '--no-clean' || arg === '--incremental-build') {
            cleanOutputsFirst = false;
            continue;
        }
        if (arg === '--all-datasets' || arg === '--allDatasets') {
            forceAllDatasets = true;
            continue;
        }
        const inlineAllDatasets = getInlineValue(arg, ['--all-datasets=']);
        if (inlineAllDatasets !== null) {
            forceAllDatasets = parseBoolean(inlineAllDatasets);
            continue;
        }
        const inlineClean = getInlineValue(arg, ['--clean=', '--clean-first=', '--full-build=']);
        if (inlineClean !== null) {
            cleanOutputsFirst = parseBoolean(inlineClean);
            continue;
        }
        angularArgs.push(arg);
    }

    if (!hasCliDatasetArg) {
        envDatasetValues.forEach(value => datasetSelections.add(value));
    }

    const datasetArgument = !forceAllDatasets && datasetSelections.size > 0
        ? Array.from(datasetSelections).join(',')
        : null;

    return {
        datasetArgument,
        angularArgs,
        forceAllDatasets,
        cleanOutputsFirst
    };
}

function buildDataArgs(datasetArg, includeAll) {
    const args = [];
    if (includeAll) {
        args.push('--all-datasets');
    } else if (datasetArg) {
        args.push('--dataset', datasetArg);
    }
    return args;
}

function cleanGeneratedOutputs(projectRoot) {
    const targets = [
        path.join(projectRoot, 'dist'),
        path.join(projectRoot, 'tmp'),
        path.join(projectRoot, 'src', 'assets', 'generated')
    ];
    console.log('Cleaning generated output directories before run...');
    targets.forEach(target => {
        try {
            rmSync(target, { recursive: true, force: true });
        } catch (error) {
            console.warn(`Unable to remove ${target}: ${error.message}`);
        }
    });
}

function collectDatasetValues(values) {
    if (!Array.isArray(values)) {
        return [];
    }
    return values
        .flatMap(value => {
            if (value === undefined || value === null) {
                return [];
            }
            if (Array.isArray(value)) {
                return collectDatasetValues(value);
            }
            if (typeof value === 'boolean') {
                return [];
            }
            return String(value)
                .split(',')
                .map(entry => entry.trim())
                .filter(entry => entry.length > 0);
        });
}

function addDatasetValues(set, value) {
    collectDatasetValues([value]).forEach(entry => set.add(entry));
}

function isDatasetFlag(arg) {
    return arg === '--dataset' || arg === '--datasets' || arg === '-d';
}

function getInlineValue(arg, prefixes) {
    if (!arg || typeof arg !== 'string') {
        return null;
    }
    for (const prefix of prefixes) {
        if (arg.startsWith(prefix)) {
            return arg.substring(prefix.length);
        }
    }
    return null;
}

function parseBoolean(value) {
    if (value === undefined || value === null || value === '') {
        return false;
    }
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'number') {
        return value !== 0;
    }
    const normalized = String(value).trim().toLowerCase();
    if (normalized.length === 0) {
        return false;
    }
    return !['false', '0', 'no', 'off'].includes(normalized);
}

module.exports = {
    parseDatasetFlags,
    buildDataArgs,
    cleanGeneratedOutputs,
    collectDatasetValues,
    addDatasetValues,
    getInlineValue,
    parseBoolean
};
