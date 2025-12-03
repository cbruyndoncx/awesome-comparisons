#!/usr/bin/env node
'use strict';

const { spawn } = require('child_process');
const path = require('path');
const { parseDatasetFlags, buildDataArgs, cleanGeneratedOutputs } = require('./lib/dataset-runner-utils.js');

const projectRoot = process.cwd();
const parsed = parseDatasetFlags(process.argv.slice(2), process.env);
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const ngServeArgs = ['--proxy-config', 'proxy.config.json'];
const subprocesses = [];
let shuttingDown = false;

if (parsed.cleanOutputsFirst) {
    cleanGeneratedOutputs(projectRoot);
}

const dataWatchArgs = ['run', 'data:watch'];
const dataFlagArgs = buildDataArgs(parsed.datasetArgument, parsed.forceAllDatasets);
if (dataFlagArgs.length > 0) {
    dataWatchArgs.push('--', ...dataFlagArgs);
}

spawnManaged(npmCommand, dataWatchArgs, { cwd: projectRoot });
spawnManaged(npmCommand, ['run', 'config:serve'], { cwd: projectRoot });
spawnManaged(getNgBinary(), ['serve', ...ngServeArgs, ...parsed.angularArgs], { cwd: projectRoot });

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function spawnManaged(command, args, options) {
    const child = spawn(command, args, { stdio: 'inherit', ...options });
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

function getNgBinary() {
    return path.join(
        projectRoot,
        'node_modules',
        '.bin',
        process.platform === 'win32' ? 'ng.cmd' : 'ng'
    );
}
