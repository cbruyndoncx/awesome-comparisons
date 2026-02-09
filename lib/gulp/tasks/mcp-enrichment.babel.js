/**
 * Gulp task for MCP (Model Context Protocol) capabilities enrichment
 */

import { enrichComparisonData, generateMcpReport } from '../../mcp-enrichment/enrich-mcp-data.js';
import * as path from 'path';
import { existsSync } from 'fs';

/**
 * Process MCP enrichment data and add criteria to data elements
 */
function processMcpCriteria(paths, datasetContexts) {
    const { readFileSync, writeFileSync, existsSync } = require('fs');
    const yaml2json = require('js-yaml');
    const path = require('path');

    datasetContexts.forEach(context => {
        // Build file paths for this dataset
        const rootDir = path.join(paths.dist, '..');
        const dataPath = path.join(paths.dist, context.id, 'data.json');
        const configPath = path.join(rootDir, 'datasets', context.id, 'config', 'comparison.yml');
        const autoConfigPath = path.join(rootDir, 'tmp', context.id, 'comparison-auto-config.yml');

        if (!existsSync(dataPath)) {
            return;
        }

        console.log(`  Processing MCP criteria for dataset: ${context.id}`);

        // Load configuration
        let configuration;
        try {
            const { Configuration, Data, CriteriaData, Label, CriteriaTypes } = require('../model/model.module.js');

            // Load default configuration
            const defaultConfigPath = path.join(rootDir, 'configuration', 'defaults', 'groups-advanced.yml');
            const defaultConfig = Configuration.load(yaml2json.load(readFileSync(defaultConfigPath, "utf8")));

            // Load user configuration
            configuration = Configuration.load(yaml2json.load(readFileSync(configPath, "utf8")));

            // Combine with default config (defaults provide criteria definitions)
            configuration.combine(defaultConfig);

            // Combine with auto config (auto provides discovered values)
            if (existsSync(autoConfigPath)) {
                const autoConfig = Configuration.load(yaml2json.load(readFileSync(autoConfigPath, "utf8")));
                configuration.combine(autoConfig);
            }

            // Load data
            const data = Data.loadJson(JSON.parse(readFileSync(dataPath, "utf8")), configuration);

            // Process each element with MCP enrichment
            let processedCount = 0;
            data.dataElements.forEach(dataElement => {
                if (!dataElement.mcpEnrichment) {
                    return;
                }

                processedCount++;
                const enrichment = dataElement.mcpEnrichment;
                const caps = enrichment.capabilities;

                // Helper function
                function hasCapability(value) {
                    if (typeof value === 'boolean') return value;
                    if (typeof value === 'object' && value !== null) return true;
                    return false;
                }

                // Set MCP-Client to "Yes"
                if (configuration.containsCriteria('MCP-Client')) {
                    const criteria = configuration.getCriteria('MCP-Client');
                    const labelData = new CriteriaData(criteria.id, criteria.name, new Map([['Yes', new Label('Yes')]]), CriteriaTypes.LABEL);
                    dataElement.criteriaData.set(criteria.name, labelData);
                }

                // Set Protocol Version
                if (configuration.containsCriteria('MCP-Protocol-Version') && enrichment.protocolVersion) {
                    const criteria = configuration.getCriteria('MCP-Protocol-Version');
                    const textData = new CriteriaData(criteria.id, criteria.name, new Map(), CriteriaTypes.TEXT);
                    textData.text = enrichment.protocolVersion;
                    dataElement.criteriaData.set(criteria.name, textData);
                }

                // Set individual capabilities
                const capabilityMapping = [
                    ['MCP-Tools', caps.tools],
                    ['MCP-Prompts', caps.prompts],
                    ['MCP-Resources', caps.resources],
                    ['MCP-Roots', caps.roots],
                    ['MCP-Sampling', caps.sampling],
                    ['MCP-Tasks', caps.tasks]
                ];
                capabilityMapping.forEach(([criteriaId, capValue]) => {
                    if (configuration.containsCriteria(criteriaId)) {
                        const criteria = configuration.getCriteria(criteriaId);
                        const supported = hasCapability(capValue);
                        const labelValue = supported ? 'Yes' : 'No';
                        const labelData = new CriteriaData(
                            criteria.id,
                            criteria.name,
                            new Map([[labelValue, new Label(labelValue)]]),
                            CriteriaTypes.LABEL
                        );
                        dataElement.criteriaData.set(criteria.name, labelData);
                    }
                });
            });

            // Write updated data
            writeFileSync(dataPath, JSON.stringify(data.json()), 'utf8');
            console.log(`    ✅ Processed MCP criteria for ${processedCount} entries`);

        } catch (error) {
            console.error(`    ❌ Error processing MCP criteria: ${error.message}`);
        }
    });
}

/**
 * Copy enriched data to asset targets
 */
function copyEnrichedDataToAssets(paths, datasetContexts) {
    const { copyFileSync, existsSync } = require('fs');
    const path = require('path');

    datasetContexts.forEach(context => {
        const sourceDataPath = path.join(paths.dist, context.id, 'data.json');

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
            const dataPath = path.join(paths.dist, context.id, 'data.json');

            if (!existsSync(dataPath)) {
                console.log(`⏭️  Skipping ${context.id} (data.json not found)`);
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
            const dataPath = path.join(paths.dist, context.id, 'data.json');

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

        const dataPath = path.join(paths.dist, datasetId, 'data.json');

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
