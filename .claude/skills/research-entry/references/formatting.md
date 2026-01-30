# Entry Formatting Specification

## Heading structure

```
# Entry Name - https://canonical-url.com    (H1: title + URL)

Description paragraph(s).                    (free text before first ##)

## Category Group                            (H2: major grouping, DO NOT modify)
### Field Name                               (H3: specific criterion, DO NOT modify)
- value                                      (list items under each field)
```

## Title line (H1)

Format: `# Name - https://url`
The URL is the canonical/official website. Use `-` if no URL exists.

## Description block

1-3 paragraphs between the H1 and the first H2. Factual summary of what the tool/product is and does.

## Yes/No fields

Fields like Opensource, Free Trial, MCP-Client, BYOK, etc. expect:

```markdown
### Field Name
- Yes
  - Optional clarification as indented bullet
```

or

```markdown
### Field Name
- No
  - Optional clarification as indented bullet
```

Use capitalized `Yes` or `No` only. Leave as `- ` (bare dash) if unknown.

## Label fields (Classification, License, Languages)

These fields list one or more values from a predefined set. The template shows all possible values — keep only those that apply and remove the rest.

```markdown
### Classification
- Code/Editor

### Languages
- Any

### License
- MIT
```

Add supporting notes as indented bullets beneath a kept value.

## Text fields (Version, Short Description, Description, Notes, etc.)

Free-form text as list items:

```markdown
### Version
v2.1.0 (2025-06-15)

### Short Description
- One or two sentence summary of the tool.

### Description
Multi-paragraph description of the tool's capabilities and positioning.

### Notes
- Bullet point with key detail
- Another relevant note
```

## Rating field

Format: `- [N] Commentary` where N is 1-5.

```markdown
### Rating
- [4] Strong AI integration with broad language support
- [3] Limited enterprise features but solid open-source community
```

## Repo field

GitHub or source repository URL, or `- -` if none/not applicable.

```markdown
### Repo
- https://github.com/org/repo
```

## Last Update field

ISO date of when the entry was last researched/updated.

```markdown
### Last Update
2025-10-29
```

Always set this to today's date when creating or updating an entry.

## General rules

- Use `-` (bare dash) for unknown/empty fields
- Do not add HTML comments to output files
- Do not invent sections not in the template
- Indented bullets (`  - detail`) provide clarifications under a value
- Preserve exact heading text — matching is case-sensitive
