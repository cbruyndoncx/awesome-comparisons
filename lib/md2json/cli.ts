// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../specs/lib/md2json/md2json-cli.spec.md
// (spec:0b4165bc) (code:4ac701e9)

import minimist from 'minimist';
import { basename } from 'path';
import { Md2Json } from './md2json';

export async function main(argv: string[]): Promise<void> {
  const args = minimist(argv.slice(2));
  const scriptName = basename(argv[1] || 'cli.js');

  // Extract arguments with flag support and positional fallbacks
  const input = args.input || args._[0];
  const tmp = args.tmp || args._[1];
  const output = args.output || args._[2];
  const level = args.level !== undefined
    ? Number(args.level)
    : (args._[3] !== undefined ? Number(args._[3]) : 2);
  const pretty = args.pretty !== undefined
    ? coerceToBool(args.pretty)
    : (args._[4] !== undefined ? coerceToBool(args._[4]) : false);

  // Validate required arguments
  if (!input || !tmp || !output) {
    console.error(
      `Usage: node ${scriptName} [--input <dir>] [--tmp <dir>] [--output <file>] [--level <num>] [--pretty <bool>]\n` +
      `   or: node ${scriptName} <input> <tmp> <output> [level] [pretty]`
    );
    process.exit(1);
  }

  try {
    const converter = new Md2Json({ level, pretty });
    await converter.dirToJson(input, tmp, output);
    process.exit(0);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}

function coerceToBool(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    return lower === 'true' || lower === 'yes' || lower === '1';
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  return false;
}

if (require.main === module) {
  main(process.argv).catch(() => {
    // Errors handled inside main()
  });
}
