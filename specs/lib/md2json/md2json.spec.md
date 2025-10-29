# Md2Json Converter

TypeScript implementation of markdown-to-JSON converter for the Ultimate Comparison Framework build chain.

## Target

[@generate](../../../lib/md2json/md2json.ts)

## Capabilities

### Convert markdown files to JSON format

 Walks the input directory (recursively) and converts markdown files to the legacy header/list JSON structure expected by gulp.

- Sorts `*.md` files alphabetically before processing
- Extracts the first line beginning with `#` (space optional) as the entry title; files without one are skipped with a warning
- Treats text between the title and the first `##` heading as the entry description; trimmed blank lines but preserves intentional line breaks
- Converts each `## Some Criterion` heading into a `type: "header"`, `level: 2` node, even if nested `###` sections appear later
- Captures nested `### Sub Criterion` headings under the active criterion as `type: "header"`, `level: 3` child nodes; each sub-header mirrors the same text/list structure as level-2 criteria
- Preserves the level-2 criterion’s own text and list nodes alongside any level-3 children (i.e., the parent content is emitted before/after its sub-sections)
- Text under each criterion heading becomes a `type: "text"` child
- List items beginning with `-` become a nested `type: "list"` node whose `children` are `type: "item"` nodes with `plainChildren: ""`
- Stops consuming the file when another single-`#` header is encountered (start of the next comparison entry)
- Maintains the same output shape as the Python tool (root header node containing `children` for description + criteria)
- Verified by [@test](../../../tests/lib/md2json/md2json.converter.spec.ts)

### Generate output files

Creates both individual JSON files and aggregated output files.

- Writes each converted entry as JSON to the tmp directory mirroring the markdown file’s relative path (`foo.md` → `tmp/foo.json`, `nested/bar.md` → `tmp/nested/bar.json`)
- Ensures tmp directories exist before writing (recursive create)
- Aggregates all successfully parsed entries into a single JSON array at the output path
- Honors `--pretty` flag for pretty-printing tmp files and the aggregated output; default output is minified
- Adds a `sourcePath` field to each aggregated entry containing the markdown filename relative to the input directory (including nested folder segments, normalized with forward slashes) so downstream tooling can link back to the source document
- Persists the `--level` parameter on the Md2Json instance even if unused, ensuring parity with scripts that expect the property
- Verified by [@test](../../../tests/lib/md2json/md2json.converter.spec.ts)

### Persist converter configuration

Stores runtime options required by higher-level tooling.

- Accepts `level` (default 2) and `pretty` (default false) when the class is constructed
- Exposes these options to downstream operations so gulp scripts can inspect behavior in the future
- Verified by [@test](../../../tests/lib/md2json/md2json.converter.spec.ts)

### Error handling and logging

Provides clear error messages and appropriate exit codes.

- Returns rejected promise or exits non-zero on read/write failures
- Preserves stderr logs for gulp integration
- Emits warnings for skipped files but continues processing
- Surfaces file system errors with context
- Verified by [@test](../../../tests/lib/md2json/md2json.converter.spec.ts)

## API

```typescript { .api }
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
  sourcePath?: string;
  children: Array<TextNode | ListNode | HeaderNode>;
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
  constructor(options?: { level?: number; pretty?: boolean });

  convertMarkdownToJson(markdown: string): HeaderNode | null;
  dirToJson(inputDir: string, tmpDir: string, outputPath: string): Promise<void>;
}
```

## Dependencies

### File system operations

For reading markdown files and writing JSON output.
[@use](fs)
[@use](path)
