# Markdown Renderer

Helper utility for rendering markdown content without external dependencies. Provides lightweight conversions for headings, emphasis, and line breaks.

## Target

[@generate](../../../src/app/shared/util/markdown.ts)

## Capabilities

### Render markdown to HTML

Converts markdown strings to HTML output. Returns empty string for falsy inputs.

### Render markdown to plain text

Converts markdown strings to HTML then strips all HTML tags to return plain text. Returns empty string for falsy inputs.

### Tree-shakable exports

Exports individual functions that can be imported selectively to support tree-shaking optimizations.

## API

```typescript { .api }
export function renderMarkdown(markdown: string | null | undefined): string;
export function renderMarkdownToText(markdown: string | null | undefined): string;
```

## Dependencies

None – uses lightweight string transformations to avoid external dependencies.
