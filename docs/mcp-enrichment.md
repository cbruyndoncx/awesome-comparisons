# MCP Client Capabilities Enrichment

This project integrates the [`mcp-client-capabilities`](https://github.com/apify/mcp-client-capabilities) package to automatically enrich comparison data with detailed Model Context Protocol (MCP) capabilities information.

## What is MCP?

The Model Context Protocol (MCP) is an open standard that enables AI applications to securely connect to external data sources and tools. The `mcp-client-capabilities` package maintains an authoritative registry of MCP clients and their supported features.

## Features

The MCP enrichment system:

1. **Automatically loads** the latest MCP capabilities data from the package (no manual maintenance needed)
2. **Cross-references** dataset entries with the MCP client registry
3. **Enriches** matched entries with detailed capability flags:
   - `tools` - Support for tool execution
   - `prompts` - Support for prompt templates
   - `resources` - Support for resource access
   - `roots` - Support for workspace directories
   - `sampling` - Support for LLM sampling
   - `elicitation` - Support for server requests
   - `logging` - Support for logging
   - `tasks` - Support for asynchronous tasks
4. **Validates** that entries claiming MCP support actually exist in the registry

## Usage

### Enrich All Datasets

```bash
npm run mcp:enrich
```

This will enrich all enabled datasets with MCP capabilities data.

### Enrich Specific Dataset

```bash
npm run mcp:enrich -- --dataset terminal
npm run mcp:enrich -- --dataset code-editor
```

### Generate MCP Capabilities Report

```bash
npm run mcp:report
npm run mcp:report -- --dataset terminal
```

This generates a summary report showing which entries have MCP support and their capabilities.

## Build Integration

✅ **MCP enrichment is automatically integrated** into the build process!

```bash
# Standard build (includes MCP enrichment automatically)
npm run build -- --dataset terminal

# Production build (includes MCP enrichment automatically)
npm run build:prod
```

The build pipeline automatically:
1. Generates data from markdown
2. **Enriches with MCP capabilities** ⬅️ automatic
3. Copies enriched data to assets
4. Builds the Angular application

### Manual Enrichment (Optional)

You can also run enrichment separately for development:

```bash
# Build data first
npm run data:prepare -- --dataset terminal

# Then enrich with MCP capabilities
npm run mcp:enrich -- --dataset terminal
```

## Enriched Data Structure

Enriched entries gain an `mcpEnrichment` field with this structure:

```json
{
  "mcpEnrichment": {
    "clientId": "claude-code",
    "title": "Claude Code",
    "url": "https://claude.com/product/claude-code",
    "protocolVersion": "2025-06-18",
    "capabilities": {
      "tools": {},
      "prompts": {},
      "resources": {},
      "roots": {},
      "sampling": false,
      "elicitation": false,
      "logging": false,
      "tasks": false
    }
  }
}
```

### Available in the UI

The `mcpEnrichment` data is automatically available in the Angular application. You can access it from any data entry that has MCP support:

```typescript
// In your Angular component
entries.forEach(entry => {
  if (entry.mcpEnrichment) {
    console.log('MCP Client:', entry.mcpEnrichment.clientId);
    console.log('Protocol:', entry.mcpEnrichment.protocolVersion);
    console.log('Capabilities:', entry.mcpEnrichment.capabilities);
  }
});
```

### Displaying MCP Capabilities

You can display MCP capability badges in your comparison table or detail views:

```html
<div *ngIf="entry.mcpEnrichment" class="mcp-capabilities">
  <span class="badge">MCP {{ entry.mcpEnrichment.protocolVersion }}</span>
  <span *ngIf="entry.mcpEnrichment.capabilities.tools" class="capability">Tools</span>
  <span *ngIf="entry.mcpEnrichment.capabilities.prompts" class="capability">Prompts</span>
  <span *ngIf="entry.mcpEnrichment.capabilities.resources" class="capability">Resources</span>
</div>
```

## Client Name Mapping

The enrichment system includes smart name matching that:

- Normalizes names (e.g., "Claude Code" → "claude-code")
- Handles known aliases (e.g., "cursor" → "cursor-vscode")
- Auto-maps exact matches from the registry

Known mappings:
- `claude-code` → `claude-code`
- `cursor` → `cursor-vscode`
- `zed` → `zed`
- `windsurf` → `windsurf`
- `continue` → `continue`
- `cline` → `cline`
- `goose` → `codenamegoose`
- And more...

## Adding New Mappings

To add custom client name mappings, edit `/lib/mcp-enrichment/enrich-mcp-data.js` and update the `knownMappings` object in the `createClientMapping()` function.

## Example: Terminal Dataset

When run on the terminal dataset:

```bash
$ npm run mcp:enrich -- --dataset terminal

🔄 Starting MCP capabilities enrichment...

✅ Loaded MCP capabilities for 42 clients
📋 Created mapping for 48 client name variations

  ✅ Enriched "Claude Code" with MCP data from "claude-code"
  ✅ Enriched "Crush" with MCP data from "crush"
  ✅ Enriched "OpenCode" with MCP data from "opencode"

✨ Enriched 3 entries with MCP capabilities
```

## Validation Warnings

The system will warn about potential issues:

```
⚠️  "some-tool" claims MCP support but not found in mcp-client-capabilities registry
```

This helps identify:
- Entries that need name mapping updates
- Clients not yet in the official registry
- Potential data entry errors

## Package Updates

To update to the latest MCP capabilities data:

```bash
npm update mcp-client-capabilities
```

The package is regularly updated with new clients and capability changes.

## Technical Details

- **Package**: `mcp-client-capabilities` (NPM)
- **Data Source**: `/node_modules/mcp-client-capabilities/dist/mcp_client_capabilities/mcp-clients.json`
- **Enrichment Script**: `/lib/mcp-enrichment/enrich-mcp-data.js`
- **Gulp Task**: `/lib/gulp/tasks/mcp-enrichment.babel.js`

## See Also

- [MCP Client Capabilities GitHub](https://github.com/apify/mcp-client-capabilities)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [awesome-comparisons Build System](./uc-v3/Overview.md)
