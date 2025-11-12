#!/usr/bin/env node
// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../specs/app/components/comparison/comparison-template-export.spec.md
// (spec:578718f1) (code:567ef78b)

const fs = require('fs');
const path = require('path');
const { buildTemplateDocument, CriteriaTypes } = require('./template-builder');

/**
 * Command-line utility to export comparison templates for all datasets
 */
class TemplateExporter {
    constructor() {
        this.manifestPath = path.join(__dirname, '..', '..', 'configuration', 'datasets.manifest.json');
        this.args = this.parseArgs();
    }

    parseArgs() {
        const args = process.argv.slice(2);
        const result = {
            output: null,
            datasets: null,
            help: false
        };

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (arg === '--help' || arg === '-h') {
                result.help = true;
            } else if (arg === '--output' || arg === '-o') {
                result.output = args[++i];
            } else if (arg === '--dataset' || arg === '-d') {
                result.datasets = args[++i]?.split(',').map(id => id.trim()).filter(Boolean);
            }
        }

        return result;
    }

    showHelp() {
        console.log(`
Usage: export-all-templates.js [options]

Options:
  --output, -o <path>     Output directory (defaults to datasets/<datasetId>/config)
  --dataset, -d <ids>     Comma-separated dataset IDs to export (defaults to all)
  --help, -h              Show this help message

Examples:
  export-all-templates.js
  export-all-templates.js --output ./templates
  export-all-templates.js --dataset web-frameworks,databases
        `);
    }

    async run() {
        if (this.args.help) {
            this.showHelp();
            return;
        }

        try {
            const manifest = await this.loadManifest();
            const datasets = this.filterDatasets(manifest.datasets);

            console.log(`Exporting templates for ${datasets.length} dataset(s)...`);

            let generated = 0;
            let skipped = 0;
            const errors = [];

            for (const dataset of datasets) {
                try {
                    const success = await this.exportDatasetTemplate(dataset);
                    if (success) {
                        generated++;
                    } else {
                        skipped++;
                    }
                } catch (error) {
                    errors.push({ dataset: dataset.id, error: error.message });
                    console.error(`Error processing dataset ${dataset.id}: ${error.message}`);
                }
            }

            console.log(`\nSummary:`);
            console.log(`  Generated: ${generated} template(s)`);
            if (skipped > 0) {
                console.log(`  Skipped:   ${skipped} template(s) (missing assets)`);
            }
            if (errors.length > 0) {
                console.log(`  Errors:    ${errors.length} template(s)`);
                process.exit(1);
            }
        } catch (error) {
            console.error('Fatal error:', error.message);
            process.exit(1);
        }
    }

    async loadManifest() {
        if (!fs.existsSync(this.manifestPath)) {
            throw new Error(`Dataset manifest not found at ${this.manifestPath}`);
        }
        const content = fs.readFileSync(this.manifestPath, 'utf8');
        const manifest = JSON.parse(content);
        if (!manifest.datasets || !Array.isArray(manifest.datasets)) {
            throw new Error('Invalid manifest: missing datasets array');
        }
        return manifest;
    }

    filterDatasets(allDatasets) {
        if (!this.args.datasets) {
            return allDatasets;
        }
        const filtered = allDatasets.filter(dataset =>
            this.args.datasets.includes(dataset.id)
        );
        const missing = this.args.datasets.filter(id =>
            !allDatasets.some(dataset => dataset.id === id)
        );
        if (missing.length > 0) {
            console.warn(`Warning: Dataset(s) not found in manifest: ${missing.join(', ')}`);
        }
        return filtered;
    }

    async exportDatasetTemplate(dataset) {
        console.log(`Processing dataset: ${dataset.id}`);
        const assets = await this.loadDatasetAssets(dataset);
        if (!assets) {
            console.warn(`Skipping ${dataset.id}: assets not found`);
            return false;
        }

        const { configuration, data } = assets;
        const datasetMetadata = {
            id: dataset.id,
            displayLabel: dataset.displayLabel,
            shortDescription: dataset.shortDescription
        };

        const template = this.buildTemplate(datasetMetadata, configuration, data);
        const outputPath = this.getOutputPath(dataset);
        this.ensureDirectoryExists(path.dirname(outputPath));
        fs.writeFileSync(outputPath, template, 'utf8');
        console.log(`  → ${outputPath}`);
        return true;
    }

    async loadDatasetAssets(dataset) {
        const possiblePaths = [
            path.join(__dirname, '..', '..', 'src', dataset.assetDirectory),
            path.join(__dirname, '..', '..', 'dist', dataset.id),
            path.join(__dirname, '..', '..', dataset.assetDirectory)
        ];

        for (const basePath of possiblePaths) {
            const configPath = path.join(basePath, 'comparison.json');
            const dataPath = path.join(basePath, 'data.json');

            if (fs.existsSync(configPath)) {
                try {
                    const configuration = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                    let data = null;
                    if (fs.existsSync(dataPath)) {
                        data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
                    }
                    return { configuration, data };
                } catch (error) {
                    console.warn(`Error reading assets from ${basePath}: ${error.message}`);
                }
            }
        }
        return null;
    }

    buildTemplate(datasetMetadata, configuration, data) {
        // Normalize configuration criteria by flattening shaped entries
        const normalizedCriteria = this.normalizeConfigurationCriteria(configuration.criteria || []);
        const declaredCriteria = normalizedCriteria.filter(entry => this.isDeclaredCriteria(entry));

        // Build lookup map for criteria
        const criteriaIndex = this.buildCriteriaLookup(declaredCriteria);

        // Build configuration-defined groups
        const groups = [];
        const seenCriteria = new Set();

        declaredCriteria.forEach(entry => {
            if (Array.isArray(entry.children) && entry.children.length > 0) {
                const children = [];
                let primary = null;
                
                this.collectCanonicalKeys(entry).forEach(key => seenCriteria.add(key));

                if (entry.search) {
                    primary = { ...entry };
                    primary.values = primary.values instanceof Map ? primary.values : new Map();
                    children.push(primary);
                    this.collectCanonicalKeys(primary).forEach(key => seenCriteria.add(key));
                }
                
                entry.children
                    .map(id => criteriaIndex.get(id))
                    .filter(c => c)
                    .forEach(c => {
                        const childKeys = this.collectCanonicalKeys(c);
                        const isDuplicate = childKeys.some(key => seenCriteria.has(key));
                        if (!isDuplicate) {
                            children.push(c);
                            childKeys.forEach(key => seenCriteria.add(key));
                        }
                    });
                    
                if (children.length > 0) {
                    groups.push({
                        key: entry.id,
                        displayName: entry.name || entry.id,
                        children,
                        label: { 
                            value: entry.name || entry.id, 
                            tooltip: entry.description 
                        },
                        primaryCriteria: primary,
                        isExcluded: false,
                        isExpanded: !!entry.defaultExpanded
                    });
                    seenCriteria.add(entry.id);
                }
            }
        });

        // Ungrouped criteria - only include those not already in groups
        const ungrouped = declaredCriteria.filter(c => {
            if (typeof c?.id !== 'string') {
                return false;
            }
            const keys = this.collectCanonicalKeys(c);
            if (keys.length === 0) {
                return true;
            }
            return keys.every(key => !seenCriteria.has(key));
        });

        return buildTemplateDocument(
            datasetMetadata,
            groups,
            ungrouped,
            criteriaIndex,
            {
                introCriteria: {
                    id: criteriaIndex.get('id'),
                    description: criteriaIndex.get('description')
                }
            }
        );
    }

    normalizeConfigurationCriteria(criteria) {
        if (!Array.isArray(criteria)) {
            if (criteria && typeof criteria === 'object') {
                // Handle object format like { "id1": { props }, "id2": { props } }
                return Object.entries(criteria).map(([id, props]) => {
                    if (props && typeof props === 'object') {
                        return { id, ...props };
                    }
                    return { id };
                }).filter(e => e && e.id);
            }
            return [];
        }
        
        // Handle array format, but also check for nested object shapes
        return criteria.map(entry => {
            if (!entry || typeof entry !== 'object') {
                return null;
            }
            
            // If entry already has a string id, use it directly
            if (typeof entry.id === 'string' && entry.id.length > 0) {
                return entry;
            }
            
            // Handle entries shaped like { "id": { ...props } }
            if (entry.id && typeof entry.id === 'object' && Object.keys(entry).length === 1) {
                return { id: 'id', ...entry.id };
            }
            
            // Check if entry is shaped like { "someId": { props } }
            const keys = Object.keys(entry);
            if (keys.length === 1) {
                const id = keys[0];
                const props = entry[id];
                if (props && typeof props === 'object') {
                    return { id, ...props };
                }
            }
            
            return entry;
        }).filter(e => e && e.id);
    }

    isDeclaredCriteria(criteria) {
        if (!criteria || !criteria.id) {
            return false;
        }
        if (criteria.id === 'id' || criteria.id === 'description') {
            return true;
        }
        return typeof criteria.name === 'string' && String(criteria.name).trim().length > 0;
    }

    collectCanonicalKeys(criteria) {
        const keys = new Set();
        if (criteria && criteria.id) {
            const canonicalId = this.canonicalKey(criteria.id);
            if (canonicalId) {
                keys.add(canonicalId);
            }
        }
        if (criteria && criteria.name) {
            const canonicalName = this.canonicalKey(criteria.name);
            if (canonicalName) {
                keys.add(canonicalName);
            }
        }
        return Array.from(keys);
    }

    canonicalKey(value) {
        if (!value) {
            return '';
        }
        return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    buildCriteriaLookup(normalizedCriteria) {
        const criteriaIndex = new Map();
        normalizedCriteria.forEach(entry => {
            const crit = { ...entry };
            crit.type = crit.type ? String(crit.type).toUpperCase().replace(/-/g, '_') : CriteriaTypes.TEXT;

            // Normalize values to Map format
            if (crit.values) {
                if (crit.values instanceof Map) {
                    // keep as is
                } else if (Array.isArray(crit.values)) {
                    if (crit.values.length > 0 && Array.isArray(crit.values[0]) && crit.values[0].length >= 2) {
                        // Iterable entries format
                        crit.values = new Map(crit.values);
                    } else {
                        crit.values = new Map(crit.values.map(v => [v, { name: v }]));
                    }
                } else if (crit.values && typeof crit.values[Symbol.iterator] === 'function') {
                    // Handle generic iterables
                    try {
                        const entries = [];
                        for (const item of crit.values) {
                            if (Array.isArray(item) && item.length >= 2) {
                                entries.push(item);
                            } else {
                                entries.push([item, { name: item }]);
                            }
                        }
                        crit.values = new Map(entries);
                    } catch {
                        crit.values = new Map();
                    }
                } else if (typeof crit.values === 'object') {
                    crit.values = new Map(Object.entries(crit.values).map(([k, v]) =>
                        [k, typeof v === 'string' ? { name: v } : v]
                    ));
                } else {
                    crit.values = new Map();
                }
            } else {
                crit.values = new Map();
            }

            criteriaIndex.set(crit.id, crit);
        });
        return criteriaIndex;
    }

    parseDataGroups(groups) {
        if (groups instanceof Map) {
            return Array.from(groups.entries());
        } else if (Array.isArray(groups)) {
            return groups.map((g, i) => [`group_${i}`, g]);
        } else if (groups && typeof groups === 'object') {
            return Object.entries(groups);
        }
        return [];
    }

    isExcludedGroup(values) {
        const excluded = new Set(['no', 'none', 'n/a']);
        if (!values || !values.length) return false;
        return values.every(v => excluded.has((v || '').trim().toLowerCase()));
    }

    getOutputPath(dataset) {
        const slug = dataset.id
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-+|-+$)/g, '');
        const filename = `${slug}-comparison-template.md`;

        if (this.args.output) {
            return path.join(this.args.output, filename);
        }
        return path.join(__dirname, '..', '..', 'datasets', dataset.id, 'config', filename);
    }

    ensureDirectoryExists(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }
}

if (require.main === module) {
    new TemplateExporter().run();
}

module.exports = { TemplateExporter };
