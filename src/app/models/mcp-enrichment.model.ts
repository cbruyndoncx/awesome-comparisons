/**
 * MCP (Model Context Protocol) Enrichment Data Model
 *
 * Represents the enriched MCP capabilities data for a client entry.
 * This data is automatically populated during the build process from
 * the mcp-client-capabilities package.
 */

export interface McpEnrichmentData {
  clientId: string;
  title: string;
  url: string;
  protocolVersion: string;
  capabilities: McpCapabilities;
}

export interface McpCapabilities {
  tools: boolean | object;
  prompts: boolean | object;
  resources: boolean | object;
  roots: boolean | object;
  sampling: boolean | object;
  elicitation?: boolean | object;
  logging?: boolean | object;
  tasks: boolean | object;
}
