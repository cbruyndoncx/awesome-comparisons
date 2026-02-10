#!/usr/bin/env node
'use strict';

const { spawnSync, spawn } = require('child_process');
const path = require('path');
const { parseDatasetFlags, buildDataArgs, cleanGeneratedOutputs } = require('./lib/dataset-runner-utils.js');

const projectRoot = process.cwd();
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const ngBinary = path.join(
    projectRoot,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'ng.cmd' : 'ng'
);

const parsed = parseDatasetFlags(process.argv.slice(2), process.env);
const subprocesses = [];
let shuttingDown = false;

if (parsed.cleanOutputsFirst) {
    cleanGeneratedOutputs(projectRoot);
}

const dataPrepareArgs = ['run', 'data:prepare'];
const dataFlagArgs = buildDataArgs(parsed.datasetArgument, parsed.forceAllDatasets);
if (dataFlagArgs.length > 0) {
    dataPrepareArgs.push('--', ...dataFlagArgs);
}

runCommand(npmCommand, dataPrepareArgs);
runCommand(npmCommand, ['run', 'mcp:enrich']);
runCommand(npmCommand, ['run', 'mcp:sync']);
spawnManaged(npmCommand, ['run', 'config:serve']);
spawnManaged(ngBinary, ['serve', '--proxy-config', 'proxy.config.json', ...parsed.angularArgs]);

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function runCommand(command, args) {
    const result = spawnSync(command, args, { stdio: 'inherit' });
    if (result.error) {
        throw result.error;
    }
    if (typeof result.status === 'number' && result.status !== 0) {
        process.exit(result.status);
    }
}

function spawnManaged(command, args) {
    const child = spawn(command, args, { stdio: 'inherit', cwd: projectRoot });
    subprocesses.push(child);
    child.on('exit', code => {
        if (shuttingDown) {
            return;
        }
        shuttingDown = true;
        subprocesses.forEach(proc => proc.kill('SIGTERM'));
        process.exit(code ?? 0);
    });
}

function shutdown() {
    if (shuttingDown) {
        return;
    }
    shuttingDown = true;
    subprocesses.forEach(proc => proc.kill('SIGTERM'));
}
