/**
 * MCP Client Capabilities Enrichment Script
 *
 * This script enriches the comparison data with detailed MCP (Model Context Protocol)
 * capabilities from the mcp-client-capabilities package.
 *
 * It cross-references dataset entries with the authoritative MCP capabilities registry
 * and adds detailed capability flags (tools, prompts, resources, etc.) to the generated data.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load MCP capabilities data from the package
 */
function loadMcpCapabilities() {
    try {
        // Load from node_modules/mcp-client-capabilities package
        const mcpDataPath = join(__dirname, '../../node_modules/mcp-client-capabilities/dist/mcp_client_capabilities/mcp-clients.json');

        if (!existsSync(mcpDataPath)) {
            console.warn('⚠️  MCP capabilities data not found at:', mcpDataPath);
            return null;
        }

        const mcpData = JSON.parse(readFileSync(mcpDataPath, 'utf-8'));
        console.log(`✅ Loaded MCP capabilities for ${Object.keys(mcpData).length} clients`);
        return mcpData;
    } catch (error) {
        console.error('❌ Error loading MCP capabilities:', error.message);
        return null;
    }
}

/**
 * Normalize client name for matching
 * Examples: "claude-code" -> "claude-code", "Claude Code" -> "claude-code"
 */
function normalizeClientName(name) {
    return name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

/**
 * Create a mapping from our entry names to MCP client IDs
 */
function createClientMapping(mcpData) {
    const mapping = {};

    // Common mappings for known clients
    const knownMappings = {
        'claude-code': 'claude-code',
        'cursor': 'cursor-vscode',
        'zed': 'zed',
        'windsurf': 'windsurf',
        'continue': 'continue',
        'cline': 'cline',
        'gemini-cli': 'gemini-cli',
        'github-copilot-cli': 'github-copilot-cli',
        'opencode': 'opencode',
        'warp': 'warp',
        'aider': 'aider',
        'goose': 'codenamegoose',
        'claude-desktop': 'claude.ai'
    };

    // Add known mappings
    Object.assign(mapping, knownMappings);

    // Auto-map exact matches
    Object.keys(mcpData).forEach(mcpClientId => {
        const normalized = normalizeClientName(mcpClientId);
        mapping[normalized] = mcpClientId;
    });

    return mapping;
}

/**
 * Find MCP capabilities for a given entry
 */
function findMcpCapabilities(entryName, mcpData, clientMapping) {
    if (!mcpData || !entryName) return null;

    const normalized = normalizeClientName(entryName);
    const mcpClientId = clientMapping[normalized];

    if (mcpClientId && mcpData[mcpClientId]) {
        return {
            clientId: mcpClientId,
            ...mcpData[mcpClientId]
        };
    }

    return null;
}

/**
 * Extract entry name from hierarchical structure (level 1 header)
 */
function extractEntryName(entry) {
    if (!entry || entry.type !== 'header' || entry.level !== 1) return null;

    // Entry name is in content like "Aider - https://aider.chat"
    const content = entry.content || '';
    const parts = content.split(' - ');
    return parts[0].trim();
}

/**
 * Check if entry has MCP-Client: Yes in its hierarchical structure
 */
function checkMcpClientField(entry) {
    if (!entry || !entry.children) return false;

    // Recursively search for MCP-Client section
    function searchForMcpClient(node) {
        if (!node) return false;

        // Check if this is MCP-Client header
        if (node.type === 'header' && node.content && node.content.includes('MCP-Client')) {
            // Check children for "Yes" list item
            if (node.children) {
                return node.children.some(child =>
                    child.type === 'list' &&
                    child.children &&
                    child.children.some(item =>
                        item.content && item.content.trim() === 'Yes'
                    )
                );
            }
        }

        // Recursively search children
        if (node.children) {
            return node.children.some(child => searchForMcpClient(child));
        }

        return false;
    }

    return searchForMcpClient(entry);
}

/**
 * Enrich a single entry with MCP capabilities
 */
function enrichEntry(entry, mcpData, clientMapping) {
    if (!entry || entry.type !== 'header' || entry.level !== 1) return entry;

    const entryName = extractEntryName(entry);
    if (!entryName) return entry;

    const mcpCaps = findMcpCapabilities(entryName, mcpData, clientMapping);

    if (mcpCaps) {
        // Add MCP enrichment data
        entry.mcpEnrichment = {
            clientId: mcpCaps.clientId,
            title: mcpCaps.title,
            url: mcpCaps.url,
            protocolVersion: mcpCaps.protocolVersion,
            capabilities: {
                tools: mcpCaps.tools || false,
                prompts: mcpCaps.prompts || false,
                resources: mcpCaps.resources || false,
                roots: mcpCaps.roots || false,
                sampling: mcpCaps.sampling || false,
                elicitation: mcpCaps.elicitation || false,
                logging: mcpCaps.logging || false,
                tasks: mcpCaps.tasks || false
            }
        };

        // Log enrichment
        console.log(`  ✅ Enriched "${entryName}" with MCP data from "${mcpCaps.clientId}"`);

        // Validate MCP-Client field (check in children for "MCP-Client" header)
        const hasMcpClientYes = checkMcpClientField(entry);

        if (hasMcpClientYes) {
            console.log(`     ✓ Validated: Entry has "MCP-Client: Yes" and found in registry`);
        }
    } else {
        // Check if entry claims MCP support but not in registry
        const hasMcpClientYes = checkMcpClientField(entry);

        if (hasMcpClientYes) {
            console.log(`  ⚠️  "${entryName}" claims MCP support but not found in mcp-client-capabilities registry`);
        }
    }

    return entry;
}

/**
 * Enrich comparison data with MCP capabilities
 */
export function enrichComparisonData(dataPath, outputPath = null) {
    console.log('\n🔄 Starting MCP capabilities enrichment...\n');

    // Load MCP capabilities
    const mcpData = loadMcpCapabilities();
    if (!mcpData) {
        console.log('⚠️  Skipping MCP enrichment (no capabilities data available)\n');
        return false;
    }

    // Create client mapping
    const clientMapping = createClientMapping(mcpData);
    console.log(`📋 Created mapping for ${Object.keys(clientMapping).length} client name variations\n`);

    // Load comparison data
    if (!existsSync(dataPath)) {
        console.error(`❌ Data file not found: ${dataPath}\n`);
        return false;
    }

    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    console.log(`📂 Loaded comparison data from: ${dataPath}`);
    console.log(`   Entries: ${data.length}\n`);

    // Enrich each entry
    let enrichedCount = 0;
    data.forEach(entry => {
        const originalEntry = JSON.stringify(entry);
        enrichEntry(entry, mcpData, clientMapping);
        if (JSON.stringify(entry) !== originalEntry) {
            enrichedCount++;
        }
    });

    console.log(`\n✨ Enriched ${enrichedCount} entries with MCP capabilities`);

    // Write enriched data
    const output = outputPath || dataPath;
    writeFileSync(output, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`💾 Saved enriched data to: ${output}\n`);

    return true;
}

/**
 * Generate MCP capabilities summary report
 */
export function generateMcpReport(dataPath) {
    const mcpData = loadMcpCapabilities();
    if (!mcpData) return;

    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

    console.log('\n📊 MCP Capabilities Summary Report\n');
    console.log('='.repeat(60));

    let mcpEnabledCount = 0;
    let enrichedCount = 0;

    data.forEach(entry => {
        if (entry.type !== 'header' || entry.level !== 1) return;

        const entryName = extractEntryName(entry);
        const hasMcpClientYes = checkMcpClientField(entry);

        if (hasMcpClientYes) {
            mcpEnabledCount++;
            if (entry.mcpEnrichment) {
                enrichedCount++;
                const caps = entry.mcpEnrichment.capabilities;
                const supportedCaps = Object.entries(caps).filter(([k, v]) => v).map(([k]) => k);
                console.log(`\n✅ ${entryName}`);
                console.log(`   Protocol: ${entry.mcpEnrichment.protocolVersion}`);
                console.log(`   Capabilities: ${supportedCaps.join(', ') || 'none'}`);
            }
        }
    });

    console.log('\n' + '='.repeat(60));
    console.log(`Total entries: ${data.length}`);
    console.log(`MCP-enabled entries: ${mcpEnabledCount}`);
    console.log(`Enriched with capabilities data: ${enrichedCount}`);
    console.log('='.repeat(60) + '\n');
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    const command = args[0];
    const dataPath = args[1];

    if (command === 'enrich' && dataPath) {
        enrichComparisonData(dataPath);
    } else if (command === 'report' && dataPath) {
        generateMcpReport(dataPath);
    } else {
        console.log('Usage:');
        console.log('  node enrich-mcp-data.js enrich <data.json>  # Enrich data with MCP capabilities');
        console.log('  node enrich-mcp-data.js report <data.json>  # Generate MCP capabilities report');
    }
}
