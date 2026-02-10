#!/usr/bin/env node

/**
 * Sync MCP enrichment data from JSON files back to markdown source files
 * This ensures the markdown files remain the source of truth with MCP capabilities
 */

const fs = require('fs');
const path = require('path');

// Dataset configurations
const datasets = [
  { id: 'code-editor', jsonPath: 'dist/data.json', dataDir: 'datasets/code-editor/data' },
  { id: 'terminal', jsonPath: 'dist/terminal/data.json', dataDir: 'datasets/terminal/data' },
  { id: 'code-agent', jsonPath: 'dist/code-agent/data.json', dataDir: 'datasets/code-agent/data' },
  { id: 'other', jsonPath: 'dist/other/data.json', dataDir: 'datasets/other/data' },
  { id: 'ai-chat', jsonPath: 'dist/ai-chat/data.json', dataDir: 'datasets/ai-chat/data' },
  { id: 'product-prototyping', jsonPath: 'dist/product-prototyping/data.json', dataDir: 'datasets/product-prototyping/data' },
  { id: 'aie-model', jsonPath: 'dist/aie-model/data.json', dataDir: 'datasets/aie-model/data' }
];

const projectRoot = process.cwd();

// Normalize name for filename matching
function normalizeForFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars except dash and space
    .replace(/\s+/g, '-')      // Replace spaces with dash
    .replace(/-+/g, '-')       // Replace multiple dashes with single
    .replace(/^-|-$/g, '');    // Remove leading/trailing dashes
}

// Extract entry name from markdown header (JSON content doesn't have # symbol)
function extractEntryName(content) {
  // Try without # first (JSON format)
  let match = content.match(/^(.+?)\s+-\s+https?:\/\//);
  if (match) return match[1].trim();

  // Try with # (markdown format)
  match = content.match(/^#\s+(.+?)\s+-\s+https?:\/\//);
  return match ? match[1].trim() : null;
}

// Find markdown file for an entry
function findMarkdownFile(entryName, dataDir) {
  const normalizedName = normalizeForFilename(entryName);
  const fullDataDir = path.join(projectRoot, dataDir);

  if (!fs.existsSync(fullDataDir)) {
    return null;
  }

  const files = fs.readdirSync(fullDataDir).filter(f => f.endsWith('.md'));

  // Try exact match first
  let mdFile = files.find(f => {
    const baseName = f.replace(/\.md$/, '');
    return baseName === normalizedName;
  });

  // Try partial match
  if (!mdFile) {
    mdFile = files.find(f => {
      const baseName = f.replace(/\.md$/, '').toLowerCase();
      return baseName.includes(normalizedName) || normalizedName.includes(baseName);
    });
  }

  return mdFile ? path.join(fullDataDir, mdFile) : null;
}

// Update MCP sections in markdown content
function updateMcpSections(mdContent, mcpEnrichment) {
  const { protocolVersion, capabilities } = mcpEnrichment;

  // Helper to format capability value
  const formatCapability = (cap) => {
    if (typeof cap === 'boolean') {
      return cap ? '- Yes' : '- No';
    }
    if (typeof cap === 'object' && cap !== null) {
      if (Object.keys(cap).length === 0) {
        return '- Yes';
      }
      return '- Yes\n  - ' + Object.entries(cap).map(([k, v]) => `${k}: ${v}`).join('\n  - ');
    }
    return '- Unknown';
  };

  let updated = mdContent;

  // Update MCP-Protocol-Version (for ai-chat format)
  if (updated.includes('### MCP-Protocol-Version')) {
    updated = updated.replace(
      /(### MCP-Protocol-Version\s*<!--[^>]*-->\s*\n-\s*)[^\n]*/,
      `$1${protocolVersion}`
    );
  }

  // Update capabilities
  const capabilityMap = {
    'MCP-Tools': capabilities.tools,
    'MCP-Prompts': capabilities.prompts,
    'MCP-Resources': capabilities.resources,
    'MCP-Roots': capabilities.roots,
    'MCP-Sampling': capabilities.sampling,
    'MCP-Tasks': capabilities.tasks,
    // For "other" category format
    'Tools': capabilities.tools,
    'Prompts': capabilities.prompts,
    'Resources': capabilities.resources,
  };

  for (const [sectionName, capValue] of Object.entries(capabilityMap)) {
    if (capValue === undefined) continue;

    const sectionRegex = new RegExp(
      `(### ${sectionName}\\s*(?:<!--[^>]*-->\\s*)?\\n)(?:- [^\n]*(?:\\n  - [^\n]*)*)?`,
      'g'
    );

    if (updated.match(sectionRegex)) {
      const replacement = `$1${formatCapability(capValue)}`;
      updated = updated.replace(sectionRegex, replacement);
    }
  }

  return updated;
}

// Process a dataset
function processDataset(dataset) {
  const jsonPath = path.join(projectRoot, dataset.jsonPath);

  if (!fs.existsSync(jsonPath)) {
    console.log(`⏭️  Skipping ${dataset.id}: JSON file not found`);
    return { updated: 0, skipped: 0 };
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  let updatedCount = 0;
  let skippedCount = 0;

  console.log(`\n📦 Processing dataset: ${dataset.id}`);

  // Find entries with mcpEnrichment
  const processEntry = (entry) => {
    if (entry.mcpEnrichment && entry.type === 'header' && entry.level === 1) {
      const entryName = extractEntryName(entry.content);

      if (!entryName) {
        console.log(`  ⚠️  Could not extract name from: ${entry.content}`);
        skippedCount++;
        return;
      }

      const mdFilePath = findMarkdownFile(entryName, dataset.dataDir);

      if (!mdFilePath) {
        console.log(`  ⚠️  No markdown file found for: ${entryName}`);
        skippedCount++;
        return;
      }

      try {
        const mdContent = fs.readFileSync(mdFilePath, 'utf8');
        const updatedContent = updateMcpSections(mdContent, entry.mcpEnrichment);

        if (updatedContent !== mdContent) {
          fs.writeFileSync(mdFilePath, updatedContent, 'utf8');
          console.log(`  ✅ Updated: ${entryName} (${path.basename(mdFilePath)})`);
          updatedCount++;
        } else {
          console.log(`  ℹ️  No changes needed: ${entryName}`);
          skippedCount++;
        }
      } catch (error) {
        console.log(`  ❌ Error updating ${entryName}: ${error.message}`);
        skippedCount++;
      }
    }

    // Recursively process children
    if (entry.children) {
      entry.children.forEach(processEntry);
    }
  };

  data.forEach(processEntry);

  console.log(`  📊 Updated: ${updatedCount}, Skipped: ${skippedCount}`);

  return { updated: updatedCount, skipped: skippedCount };
}

// Main execution
function main() {
  console.log('🚀 Starting MCP enrichment sync to markdown files...\n');

  let totalUpdated = 0;
  let totalSkipped = 0;

  for (const dataset of datasets) {
    const result = processDataset(dataset);
    totalUpdated += result.updated;
    totalSkipped += result.skipped;
  }

  console.log('\n============================================================');
  console.log(`✅ Total files updated: ${totalUpdated}`);
  console.log(`⏭️  Total skipped: ${totalSkipped}`);
  console.log('============================================================\n');
}

main();
