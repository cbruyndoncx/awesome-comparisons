/**
 * Gulp task for MCP (Model Context Protocol) capabilities enrichment
 */

import { enrichComparisonData, generateMcpReport } from '../../mcp-enrichment/enrich-mcp-data.js';
import * as path from 'path';
import { existsSync } from 'fs';

/**
 * Process MCP enrichment data and add criteria to data elements
 * Works directly with raw JSON to preserve mcpEnrichment field
 */
function processMcpCriteria(paths, datasetContexts) {
    const { readFileSync, writeFileSync, existsSync } = require('fs');
    const path = require('path');

    datasetContexts.forEach(context => {
        // Use the paths from the context object
        const dataPath = context.files.dataJson;

        if (!existsSync(dataPath)) {
            return;
        }

        console.log(`  Processing MCP criteria for dataset: ${context.id}`);

        try {
            // Load raw JSON data to preserve mcpEnrichment field
            const rawData = JSON.parse(readFileSync(dataPath, "utf8"));

            // Process each entry with MCP enrichment
            let processedCount = 0;
            rawData.forEach(entry => {
                if (!entry.mcpEnrichment || entry.type !== 'header' || entry.level !== 1) {
                    return;
                }

                processedCount++;
                const enrichment = entry.mcpEnrichment;
                const caps = enrichment.capabilities;

                // Find MCP-Client header and add "Yes" value
                const mcpClientHeader = findHeaderInChildren(entry.children, 'MCP-Client');
                if (mcpClientHeader) {
                    // Clear existing children and add "Yes"
                    mcpClientHeader.children = [
                        {
                            type: 'list',
                            level: 2,
                            children: [
                                {
                                    type: 'item',
                                    level: 1,
                                    content: 'Yes',
                                    plainChildren: ''
                                }
                            ]
                        }
                    ];
                }

                // Add MCP Protocol Version
                if (enrichment.protocolVersion) {
                    const protocolHeader = findHeaderInChildren(entry.children, 'MCP-Protocol-Version');
                    if (protocolHeader) {
                        protocolHeader.children = [
                            {
                                type: 'text',
                                content: enrichment.protocolVersion
                            }
                        ];
                    }
                }

                // Add individual capability fields - they are siblings to MCP-Client, not children
                const capabilityFields = [
                    ['MCP-Tools', 'Tools', caps.tools],
                    ['MCP-Prompts', 'Prompts', caps.prompts],
                    ['MCP-Resources', 'Resources', caps.resources],
                    ['MCP-Roots', 'Roots', caps.roots],
                    ['MCP-Sampling', 'Sampling', caps.sampling],
                    ['MCP-Tasks', 'Tasks', caps.tasks]
                ];

                capabilityFields.forEach(([mcpName, simpleName, capValue]) => {
                    const hasCapability = capValue && (typeof capValue === 'boolean' || typeof capValue === 'object');
                    const labelValue = hasCapability ? 'Yes' : 'No';

                    // Look for both the MCP-prefixed name and the simple name as siblings
                    let capHeader = findHeaderInChildren(entry.children, mcpName);
                    if (!capHeader) {
                        capHeader = findHeaderInChildren(entry.children, simpleName);
                    }

                    // Only update if the header exists but has no content, or is just a placeholder
                    if (capHeader) {
                        // Check if header already has meaningful content (from markdown)
                        const hasExistingContent = capHeader.children &&
                            capHeader.children.length > 0 &&
                            capHeader.children.some(child =>
                                (child.type === 'list' && child.children && child.children.length > 0) ||
                                (child.type === 'text' && child.content && child.content.trim())
                            );

                        // Only overwrite if there's no existing content
                        if (!hasExistingContent) {
                            capHeader.children = [
                                {
                                    type: 'list',
                                    level: 2,
                                    children: [
                                        {
                                            type: 'item',
                                            level: 1,
                                            content: labelValue,
                                            plainChildren: ''
                                        }
                                    ]
                                }
                            ];
                        }
                    }
                });
            });

            // Write back the data with mcpEnrichment preserved
            writeFileSync(dataPath, JSON.stringify(rawData, null, 2), 'utf8');
            console.log(`    ✅ Processed MCP criteria for ${processedCount} entries`);

        } catch (error) {
            console.error(`    ❌ Error processing MCP criteria: ${error.message}`);
        }
    });
}

/**
 * Helper function to find a header by name in children array
 */
function findHeaderInChildren(children, headerName) {
    if (!children || !Array.isArray(children)) return null;

    for (const child of children) {
        if (child.type === 'header' && child.content && child.content.includes(headerName)) {
            return child;
        }
        // Recursively search in nested children
        if (child.children) {
            const found = findHeaderInChildren(child.children, headerName);
            if (found) return found;
        }
    }
    return null;
}

/**
 * Copy enriched data to asset targets
 */
function copyEnrichedDataToAssets(paths, datasetContexts) {
    const { copyFileSync, existsSync } = require('fs');
    const path = require('path');

    datasetContexts.forEach(context => {
        const sourceDataPath = context.files.dataJson;

        if (!existsSync(sourceDataPath)) {
            return;
        }

        // Copy to src/assets/generated (for dev)
        if (paths.assetsGenerated) {
            const targetDir = path.join(paths.assetsGenerated, context.assetRelativePath || context.id);
            const targetPath = path.join(targetDir, 'data.json');

            try {
                copyFileSync(sourceDataPath, targetPath);
                console.log(`  📋 Copied enriched data to: ${targetPath}`);
            } catch (error) {
                console.warn(`  ⚠️  Failed to copy to ${targetPath}: ${error.message}`);
            }
        }

        // Copy to dist/awesome-comparisons/assets/generated (for prod build)
        const angularAssetsPath = path.join(paths.dist, 'awesome-comparisons', 'assets', 'generated', context.assetRelativePath || context.id);
        if (existsSync(angularAssetsPath)) {
            const angularTargetPath = path.join(angularAssetsPath, 'data.json');

            try {
                copyFileSync(sourceDataPath, angularTargetPath);
                console.log(`  📋 Copied enriched data to: ${angularTargetPath}`);
            } catch (error) {
                console.warn(`  ⚠️  Failed to copy to ${angularTargetPath}: ${error.message}`);
            }
        }
    });
}

/**
 * Register MCP enrichment gulp tasks
 */
export function registerMcpEnrichmentTasks(gulp, paths, datasetContexts) {
    // Task: Enrich all datasets with MCP capabilities
    gulp.task('mcp:enrich', (done) => {
        console.log('\n🚀 Starting MCP enrichment for all datasets...\n');

        let successCount = 0;
        let skipCount = 0;

        datasetContexts.forEach(context => {
            const dataPath = context.files.dataJson;

            if (!existsSync(dataPath)) {
                console.log(`⏭️  Skipping ${context.id} (data.json not found at ${dataPath})`);
                skipCount++;
                return;
            }

            console.log(`\n📦 Processing dataset: ${context.id}`);
            const success = enrichComparisonData(dataPath);

            if (success) {
                successCount++;
            } else {
                skipCount++;
            }
        });

        console.log('\n' + '='.repeat(60));
        console.log(`✅ Successfully enriched: ${successCount} datasets`);
        console.log(`⏭️  Skipped: ${skipCount} datasets`);
        console.log('='.repeat(60) + '\n');

        // Process MCP criteria for enriched data
        if (successCount > 0) {
            console.log('\n🔧 Processing MCP criteria...\n');
            processMcpCriteria(paths, datasetContexts);
        }

        // Copy enriched data to assets for Angular app
        if (successCount > 0) {
            console.log('\n📋 Copying enriched data to assets...\n');
            copyEnrichedDataToAssets(paths, datasetContexts);
        }

        done();
    });

    // Task: Generate MCP capabilities report for all datasets
    gulp.task('mcp:report', (done) => {
        console.log('\n📊 Generating MCP capabilities reports...\n');

        datasetContexts.forEach(context => {
            const dataPath = context.files.dataJson;

            if (existsSync(dataPath)) {
                console.log(`\n📦 Dataset: ${context.id}`);
                generateMcpReport(dataPath);
            }
        });

        done();
    });

    // Task: Enrich single dataset (use --dataset flag)
    gulp.task('mcp:enrich-single', (done) => {
        const argv = require('minimist')(process.argv.slice(2));
        const datasetId = argv.dataset || argv.d;

        if (!datasetId) {
            console.error('❌ Please specify a dataset using --dataset or -d flag');
            console.log('Example: gulp mcp:enrich-single --dataset terminal');
            done();
            return;
        }

        const context = datasetContexts.find(ctx => ctx.id === datasetId);
        if (!context) {
            console.error(`❌ Dataset not found: ${datasetId}`);
            done();
            return;
        }

        const dataPath = context.files.dataJson;

        if (!existsSync(dataPath)) {
            console.error(`❌ Data file not found: ${dataPath}`);
            done();
            return;
        }

        console.log(`\n📦 Enriching dataset: ${datasetId}\n`);
        enrichComparisonData(dataPath);

        done();
    });
}
