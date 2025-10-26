// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from md2json.spec.md
// (spec:b1fd1adf) (code:22099835)

import fs from 'fs';
import path from 'path';
import minimist from 'minimist';

export interface BaseNode {
  type: string;
  level?: number;
  content?: string;
  children?: Array<BaseNode | ListItemNode>;
}

export interface HeaderNode extends BaseNode {
  type: "header";
  level: number;
  content: string;
  children: Array<TextNode | ListNode>;
}

export interface TextNode extends BaseNode {
  type: "text";
  content: string;
}

export interface ListNode extends BaseNode {
  type: "list";
  level: number;
  children: ListItemNode[];
}

export interface ListItemNode extends BaseNode {
  type: "item";
  level: number;
  content: string;
  plainChildren: string;
}

export class Md2Json {
  public level?: number;
  public pretty: boolean;

  constructor(options: { level?: number; pretty?: boolean }) {
    this.level = options.level;
    this.pretty = !!options.pretty;
  }

  convertMarkdownToJson(markdown: string): HeaderNode | null {
    const lines = markdown.split(/\r?\n/);
    let i = 0;
    let match: RegExpMatchArray | null = null;

    // Find first level-1 header
    while (i < lines.length) {
      match = lines[i].match(/^# (.+)$/);
      if (match) break;
      i++;
    }
    if (!match) {
      return null;
    }
    const title = match[1].trim();
    const root: HeaderNode = {
      type: "header",
      level: 1,
      content: title,
      children: []
    };

    i++;
    // Collect description lines until first '## ' or next '# '
    const descLines: string[] = [];
    while (i < lines.length) {
      const line = lines[i];
      if (/^# /.test(line)) break;
      if (/^## /.test(line)) break;
      descLines.push(line);
      i++;
    }
    // Trim blank lines in description
    let start = 0;
    let end = descLines.length;
    while (start < end && descLines[start].trim() === "") start++;
    while (end > start && descLines[end - 1].trim() === "") end--;
    const desc = descLines.slice(start, end).join("\n");
    if (desc) {
      root.children.push({ type: "text", content: desc });
    }

    let currentParent: HeaderNode | null = null;
    let listNode: ListNode | null = null;

    // Process the rest until next level-1 header
    for (; i < lines.length; i++) {
      const line = lines[i];
      if (/^# /.test(line)) {
        break; // Next entry
      }
      const h2 = line.match(/^## (.+)$/);
      if (h2) {
        // New criterion header
        currentParent = {
          type: "header",
          level: 2,
          content: h2[1].trim(),
          children: []
        };
        root.children.push(currentParent);
        listNode = null;
        continue;
      }
      if (!currentParent) {
        continue;
      }
      const listMatch = line.match(/^\s*-\s+(.*)$/);
      if (listMatch) {
        // List item
        const text = listMatch[1].trim();
        if (!listNode) {
          listNode = {
            type: "list",
            level: currentParent.level,
            children: []
          };
          currentParent.children.push(listNode);
        }
        listNode.children.push({
          type: "item",
          level: listNode.level,
          content: text,
          plainChildren: ""
        });
        continue;
      }
      if (line.trim() === "") {
        listNode = null;
        continue;
      }
      // Text block under current criterion
      const textLines = [line];
      let j = i + 1;
      for (; j < lines.length; j++) {
        const nl = lines[j];
        if (nl.trim() === "" || /^##? /.test(nl) || /^\s*-\s+/.test(nl)) {
          break;
        }
        textLines.push(nl);
      }
      const content = textLines.join("\n").trim();
      if (content) {
        (currentParent.children as Array<TextNode | ListNode>).push({
          type: "text",
          content
        });
      }
      i = j - 1;
    }

    return root;
  }

  async dirToJson(inputDir: string, tmpDir: string, outputPath: string): Promise<void> {
    // Validate input directory
    let inStat;
    try {
      inStat = await fs.promises.stat(inputDir);
    } catch {
      console.error(`Error: Input directory does not exist: ${inputDir}`);
      process.exit(1);
    }
    if (!inStat.isDirectory()) {
      console.error(`Error: Input path is not a directory: ${inputDir}`);
      process.exit(1);
    }

    // Ensure tmp directory exists
    try {
      await fs.promises.mkdir(tmpDir, { recursive: true });
    } catch (err) {
      console.error(`Error creating tmp directory ${tmpDir}:`, err);
      process.exit(1);
    }

    // Read and sort markdown files
    let files: string[];
    try {
      files = await fs.promises.readdir(inputDir);
    } catch (err) {
      console.error(`Error reading input directory ${inputDir}:`, err);
      process.exit(1);
      return;
    }
    const mdFiles = files.filter(f => f.endsWith(".md")).sort();

    const entries: HeaderNode[] = [];
    for (const file of mdFiles) {
      const fullPath = path.join(inputDir, file);
      let data: string;
      try {
        data = await fs.promises.readFile(fullPath, "utf-8");
      } catch (err) {
        console.error(`Error reading file ${fullPath}:`, err);
        process.exitCode = 1;
        continue;
      }
      const entry = this.convertMarkdownToJson(data);
      if (!entry) {
        console.error(`Warning: Skipping file without title: ${file}`);
        continue;
      }
      entries.push(entry);

      const outFile = path.join(tmpDir, `${path.basename(file, ".md")}.json`);
      try {
        const jsonString = this.pretty
          ? JSON.stringify(entry, null, 2)
          : JSON.stringify(entry);
        await fs.promises.writeFile(outFile, jsonString, "utf-8");
      } catch (err) {
        console.error(`Error writing file ${outFile}:`, err);
        process.exitCode = 1;
      }
    }

    // Write aggregated output
    try {
      const aggregated = this.pretty
        ? JSON.stringify(entries, null, 2)
        : JSON.stringify(entries);
      await fs.promises.writeFile(outputPath, aggregated, "utf-8");
    } catch (err) {
      console.error(`Error writing aggregated output ${outputPath}:`, err);
      process.exitCode = 1;
    }
  }
}

export async function main(argv: string[]): Promise<void> {
  const args = minimist(argv.slice(2), {
    string: ["input", "tmp", "output", "level"],
    boolean: ["pretty"],
    alias: { i: "input", t: "tmp", o: "output", l: "level", p: "pretty" },
    default: { pretty: false }
  });

  let input: string | undefined = args.input;
  let tmp: string | undefined = args.tmp;
  let output: string | undefined = args.output;
  let level: number | undefined = args.level !== undefined ? parseInt(args.level, 10) : undefined;
  let pretty: boolean = args.pretty;

  const pos = args._ as string[];
  if (!input && pos[0]) input = pos[0];
  if (!tmp && pos[1]) tmp = pos[1];
  if (!output && pos[2]) output = pos[2];
  if (level === undefined && pos[3]) level = parseInt(pos[3], 10);
  if (args.pretty === undefined && pos[4]) pretty = pos[4] === "true";

  if (!input || !tmp || !output) {
    console.error(
      "Usage: md2json --input <inputDir> --tmp <tmpDir> --output <outputPath> [--level <level>] [--pretty]"
    );
    process.exit(1);
  }

  const converter = new Md2Json({ level, pretty });
  await converter.dirToJson(input, tmp, output);
}

if (require.main === module) {
  main(process.argv).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
