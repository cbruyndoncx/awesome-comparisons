#!/usr/bin/env node
'use strict';

const { spawnSync } = require('child_process');
const { rmSync } = require('fs');
const path = require('path');

const rawArgs = process.argv.slice(2);
const datasetSelections = new Set();
const angularArgs = [];
const envDatasetValues = collectDatasetValues([process.env.DATASET, process.env.DATASETS]);
let forceAllDatasets = parseBoolean(process.env.ALL_DATASETS);
let hasCliDatasetArg = false;
let cleanOutputsFirst = parseBoolean(
    process.env.CLEAN_OUTPUTS ??
    process.env.BUILD_CLEAN ??
    process.env.CLEAN
);

for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (isDatasetFlag(arg)) {
        const nextValue = rawArgs[index + 1];
        index += 1;
        hasCliDatasetArg = true;
        forceAllDatasets = false;
        addDatasetValues(nextValue);
        continue;
    }
    const inlineDatasetValue = getInlineValue(arg, ['--dataset=', '--datasets=', '-d=']);
    if (inlineDatasetValue !== null) {
        hasCliDatasetArg = true;
        forceAllDatasets = false;
        addDatasetValues(inlineDatasetValue);
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

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const ngBinary = path.join(
    process.cwd(),
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'ng.cmd' : 'ng'
);

if (cleanOutputsFirst) {
    cleanGeneratedOutputs();
}

runCommand(npmCommand, buildDataPrepareArgs(datasetArgument, forceAllDatasets));
runCommand(npmCommand, buildMcpEnrichArgs(datasetArgument, forceAllDatasets));
runCommand(ngBinary, ['build', ...angularArgs]);

function runCommand(command, args) {
    const result = spawnSync(command, args, { stdio: 'inherit' });
    if (result.error) {
        throw result.error;
    }
    if (typeof result.status === 'number' && result.status !== 0) {
        process.exit(result.status);
    }
}

function buildDataPrepareArgs(datasetArg, includeAll) {
    const args = ['run', 'data:prepare'];
    const forwarded = [];
    if (includeAll) {
        forwarded.push('--all-datasets');
    } else if (datasetArg) {
        forwarded.push('--dataset', datasetArg);
    }
    if (forwarded.length > 0) {
        args.push('--', ...forwarded);
    }
    return args;
}

function buildMcpEnrichArgs(datasetArg, includeAll) {
    const args = ['run', 'mcp:enrich'];
    const forwarded = [];
    if (includeAll) {
        forwarded.push('--all-datasets');
    } else if (datasetArg) {
        forwarded.push('--dataset', datasetArg);
    }
    if (forwarded.length > 0) {
        args.push('--', ...forwarded);
    }
    return args;
}

function addDatasetValues(value) {
    collectDatasetValues([value]).forEach(entry => datasetSelections.add(entry));
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

function cleanGeneratedOutputs() {
    const projectRoot = process.cwd();
    const targets = [
        path.join(projectRoot, 'dist'),
        path.join(projectRoot, 'tmp'),
        path.join(projectRoot, 'src', 'assets', 'generated')
    ];
    console.log('Cleaning generated output directories before build...');
    targets.forEach(target => {
        try {
            rmSync(target, { recursive: true, force: true });
        } catch (error) {
            console.warn(`Unable to remove ${target}: ${error.message}`);
        }
    });
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
