---
name: research-entry
description: Research and maintain comparison dataset entries. Use when the user wants to create a new comparison entry, update an existing entry, research a tool/product for a dataset, fill in [TODO] or incomplete fields in an entry, or add a new item to the awesome-comparisons datasets. Supports all datasets (code-editor, terminal, aie-model, code-agent, product-prototyping, other, business-competition).
---

# Research Entry

Research and maintain structured markdown entries across comparison datasets.

## Modes

**Create** — Research a topic, produce a new entry from the dataset's template.
**Update** — Read an existing entry, research incomplete sections ([TODO] or bare `-`), fill them in.

## Workflow

### 1. Determine dataset and mode

Read the manifest at `configuration/datasets.manifest.json` to list available datasets.
Ask the user which dataset if ambiguous. Infer mode from context (new topic = create, existing file = update).

### 2. Locate paths

- **Template**: `datasets/{dataset-id}/config/{dataset-id}-comparison-template.md`
- **Data dir**: `datasets/{dataset-id}/data/`
- **Entry file**: `datasets/{dataset-id}/data/{entry-name}.md`

Entry filenames: lowercase, hyphens for spaces, no special characters (e.g. `claude-code.md`).

### 3. Research

Use Perplexity MCP tools for web research:
- `mcp__perplexity__search` for broad feature/capability searches
- `mcp__perplexity__get_documentation` for official docs and API details

Minimum 2-3 reputable sources (official docs, GitHub repos, technical blogs).
For each claim, verify across sources before writing.

### 4. Author or update the entry

**Create mode:**
1. Read the dataset template
2. Verify the file does not already exist in the data directory
3. Write a new markdown file following the template exactly
4. Fill every section with researched content

**Update mode:**
1. Read the existing entry file
2. Identify sections with `[TODO]`, bare `-`, or empty content
3. Research those specific areas
4. Update only incomplete sections; preserve all existing content

### 5. Confirm

Present a summary of changes to the user before writing.

## Formatting rules

See [references/formatting.md](references/formatting.md) for the complete formatting specification covering heading structure, Yes/No fields, label fields, and list conventions.

## Constraints

- NEVER modify heading structure (## or ###). Only fill content within sections.
- NEVER overwrite an existing file in create mode unless explicitly told to.
- Use `-` for fields that remain unknown after research.
- Do not add sections not present in the template.
- Strip HTML comments (`<!-- -->`) from output — they are template guidance only.
