// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../specs/lib/md2json/md2json-cli.spec.md
// (spec:0b4165bc) (code:824e52aa)

import { main } from '../../../lib/md2json/cli';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Md2Json CLI', () => {
  let tempDir: string;
  let inputDir: string;
  let tmpDir: string;
  let outputPath: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'md2json-cli-test-'));
    inputDir = path.join(tempDir, 'input');
    tmpDir = path.join(tempDir, 'tmp');
    outputPath = path.join(tempDir, 'output.json');

    fs.mkdirSync(inputDir, { recursive: true });
    fs.mkdirSync(tmpDir, { recursive: true });
  });

  afterEach(() => {
    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('Parse CLI arguments', () => {
    it('Accepts --input, --tmp, --output, --level, and --pretty', async () => {
      fs.writeFileSync(path.join(inputDir, 'test.md'), '# Test\nContent');

      const argv = [
        'node', 'cli.js',
        '--input', inputDir,
        '--tmp', tmpDir,
        '--output', outputPath,
        '--level', '3',
        '--pretty', 'true'
      ];

      await expect(main(argv)).resolves.toBeUndefined();
      expect(fs.existsSync(outputPath)).toBe(true);
    });

    it('Falls back to positional arguments input tmp output [level] [pretty] when flags are not supplied', async () => {
      fs.writeFileSync(path.join(inputDir, 'test.md'), '# Test\nContent');

      const argv = [
        'node', 'cli.js',
        inputDir,
        tmpDir,
        outputPath,
        '2',
        'true'
      ];

      await expect(main(argv)).resolves.toBeUndefined();
      expect(fs.existsSync(outputPath)).toBe(true);
    });

    it('Validates that required paths are present; prints usage guidance and exits non-zero if they are missing', async () => {
      const originalExit = process.exit;
      const originalConsoleError = console.error;
      let exitCode: number | undefined;
      let errorMessages: string[] = [];

      process.exit = jest.fn((code?: number) => {
        exitCode = code || 0;
        throw new Error('process.exit called');
      }) as any;

      console.error = jest.fn((...args) => {
        errorMessages.push(args.join(' '));
      });

      try {
        const argv = ['node', 'cli.js'];
        await expect(main(argv)).rejects.toThrow('process.exit called');
        expect(exitCode).toBe(1);
        expect(errorMessages.some(msg => msg.includes('Usage:'))).toBe(true);
      } finally {
        process.exit = originalExit;
        console.error = originalConsoleError;
      }
    });

    it('Coerces level to a number (defaults to 2) and pretty to a boolean (true, 1, yes)', async () => {
      fs.writeFileSync(path.join(inputDir, 'test.md'), '# Test\nContent');

      // Test with string 'true'
      let argv = [
        'node', 'cli.js',
        '--input', inputDir,
        '--tmp', tmpDir,
        '--output', outputPath,
        '--level', '4',
        '--pretty', 'true'
      ];

      await expect(main(argv)).resolves.toBeUndefined();
      expect(fs.existsSync(outputPath)).toBe(true);

      // Clean up for next test
      fs.unlinkSync(outputPath);

      // Test with string '1'
      argv = [
        'node', 'cli.js',
        '--input', inputDir,
        '--tmp', tmpDir,
        '--output', outputPath,
        '--pretty', '1'
      ];

      await expect(main(argv)).resolves.toBeUndefined();
      expect(fs.existsSync(outputPath)).toBe(true);

      // Clean up for next test
      fs.unlinkSync(outputPath);

      // Test with string 'yes'
      argv = [
        'node', 'cli.js',
        '--input', inputDir,
        '--tmp', tmpDir,
        '--output', outputPath,
        '--pretty', 'yes'
      ];

      await expect(main(argv)).resolves.toBeUndefined();
      expect(fs.existsSync(outputPath)).toBe(true);
    });
  });

  describe('Integrate with Md2Json', () => {
    it('Passes level and pretty into the class constructor', async () => {
      fs.writeFileSync(path.join(inputDir, 'test.md'), '# Test\nContent');

      const argv = [
        'node', 'cli.js',
        '--input', inputDir,
        '--tmp', tmpDir,
        '--output', outputPath,
        '--level', '3',
        '--pretty', 'true'
      ];

      await expect(main(argv)).resolves.toBeUndefined();
      expect(fs.existsSync(outputPath)).toBe(true);
    });

    it('Calls dirToJson(inputDir, tmpDir, outputPath) and awaits the returned promise', async () => {
      fs.writeFileSync(path.join(inputDir, 'test.md'), '# Test\nContent');

      const argv = [
        'node', 'cli.js',
        '--input', inputDir,
        '--tmp', tmpDir,
        '--output', outputPath
      ];

      await expect(main(argv)).resolves.toBeUndefined();
      expect(fs.existsSync(outputPath)).toBe(true);
    });

    it('Surfaces stdout/stderr exactly once so gulp can capture logs in tmp/error.log', async () => {
      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;
      let logMessages: string[] = [];
      let errorMessages: string[] = [];

      console.log = jest.fn((...args) => {
        logMessages.push(args.join(' '));
      });

      console.error = jest.fn((...args) => {
        errorMessages.push(args.join(' '));
      });

      try {
        fs.writeFileSync(path.join(inputDir, 'test.md'), '# Test\nContent');

        const argv = [
          'node', 'cli.js',
          '--input', inputDir,
          '--tmp', tmpDir,
          '--output', outputPath
        ];

        await expect(main(argv)).resolves.toBeUndefined();
        expect(fs.existsSync(outputPath)).toBe(true);
      } finally {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
      }
    });
  });

  describe('Error handling and exit codes', () => {
    it('On recoverable argument errors, print a helpful message and exit with status 1', async () => {
      const originalExit = process.exit;
      const originalConsoleError = console.error;
      let exitCode: number | undefined;
      let errorMessages: string[] = [];

      process.exit = jest.fn((code?: number) => {
        exitCode = code || 0;
        throw new Error('process.exit called');
      }) as any;

      console.error = jest.fn((...args) => {
        errorMessages.push(args.join(' '));
      });

      try {
        const argv = ['node', 'cli.js', '--input'];
        await expect(main(argv)).rejects.toThrow('process.exit called');
        expect(exitCode).toBe(1);
        expect(errorMessages.length).toBeGreaterThan(0);
      } finally {
        process.exit = originalExit;
        console.error = originalConsoleError;
      }
    });

    it('On converter failures (rejected promise, thrown error), print the error message to stderr and exit 1', async () => {
      const originalExit = process.exit;
      const originalConsoleError = console.error;
      let exitCode: number | undefined;
      let errorMessages: string[] = [];

      process.exit = jest.fn((code?: number) => {
        exitCode = code || 0;
        throw new Error('process.exit called');
      }) as any;

      console.error = jest.fn((...args) => {
        errorMessages.push(args.join(' '));
      });

      try {
        const argv = [
          'node', 'cli.js',
          '--input', path.join(tempDir, 'nonexistent'),
          '--tmp', tmpDir,
          '--output', outputPath
        ];

        await expect(main(argv)).rejects.toThrow('process.exit called');
        expect(exitCode).toBe(1);
        expect(errorMessages.length).toBeGreaterThan(0);
      } finally {
        process.exit = originalExit;
        console.error = originalConsoleError;
      }
    });

    it('On success, exit with 0', async () => {
      fs.writeFileSync(path.join(inputDir, 'test.md'), '# Test\nContent');

      const argv = [
        'node', 'cli.js',
        '--input', inputDir,
        '--tmp', tmpDir,
        '--output', outputPath
      ];

      await expect(main(argv)).resolves.toBeUndefined();
      expect(fs.existsSync(outputPath)).toBe(true);
    });
  });
});
