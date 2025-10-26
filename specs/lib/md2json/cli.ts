// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from md2json.spec.md
// (spec:b1fd1adf) (code:51a36f6f)

import * as fs from 'fs';
import * as path from 'path';
import * as minimist from 'minimist';
import { Md2Json } from './md2json';

export async function main(argv: string[]): Promise<void> {
    const args = minimist(argv.slice(2));
    
    let inputDir: string;
    let tmpDir: string;
    let outputPath: string;
    let level: number | undefined;
    let pretty: boolean = false;

    // Check for flag-based arguments first
    if (args.input && args.tmp && args.output) {
        inputDir = args.input;
        tmpDir = args.tmp;
        outputPath = args.output;
        level = args.level ? parseInt(args.level, 10) : undefined;
        pretty = args.pretty === true || args.pretty === 'true';
    } else if (args._.length >= 3) {
        // Fall back to positional arguments
        inputDir = args._[0];
        tmpDir = args._[1];
        outputPath = args._[2];
        level = args._[3] ? parseInt(args._[3], 10) : undefined;
        pretty = args._[4] === 'true' || args._[4] === true;
    } else {
        console.error('Error: Missing required arguments. Usage: --input <dir> --tmp <dir> --output <file> [--level <num>] [--pretty]');
        process.exit(1);
    }

    // Validate that input directory exists
    try {
        const inputStat = await fs.promises.stat(inputDir);
        if (!inputStat.isDirectory()) {
            console.error(`Error: Input path ${inputDir} is not a directory`);
            process.exit(1);
        }
    } catch (error) {
        console.error(`Error: Input directory ${inputDir} does not exist`);
        process.exit(1);
    }

    // Ensure tmp directory exists or can be created
    try {
        await fs.promises.mkdir(tmpDir, { recursive: true });
    } catch (error) {
        console.error(`Error: Cannot create tmp directory ${tmpDir}: ${error}`);
        process.exit(1);
    }

    // Ensure output directory exists
    try {
        const outputDir = path.dirname(outputPath);
        await fs.promises.mkdir(outputDir, { recursive: true });
    } catch (error) {
        console.error(`Error: Cannot create output directory ${path.dirname(outputPath)}: ${error}`);
        process.exit(1);
    }

    try {
        const converter = new Md2Json({ level, pretty });
        await converter.dirToJson(inputDir, tmpDir, outputPath);
    } catch (error) {
        console.error(`Error during conversion: ${error}`);
        process.exit(1);
    }
}

// Only run main if this file is executed directly
if (require.main === module) {
    main(process.argv).catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
