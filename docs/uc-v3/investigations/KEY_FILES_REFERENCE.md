# Key Files Reference - Configuration Loading and Merging

All file paths are absolute paths from the repository root.

## Configuration Files (YAML/JSON)

### Central Registry
- `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/datasets.manifest.json`
  - Defines all datasets and their configuration chains
  - Specifies which default files each dataset uses
  - Highest-level configuration specification

### System Defaults
- `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/comparison-default.yml`
  - Base system defaults for all configurations
  - Defines default criteria templates (default-id, default-text, default-label, etc.)
  - Fallback values for title, subtitle, repository, etc.

### Shared Default Configurations
- `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/defaults/groups-advanced.yml`
  - Shared grouping/nesting structures (Deployment, DeveloperExperience, Extensible, etc.)
  - Applied to multiple datasets
  - Defines hierarchical criteria organization

- `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/defaults/general-licensing.yml`
  - Licensing-related criteria shared across datasets

- `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/defaults/value-displays.yml`
  - Value display definitions shared across datasets

- `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/defaults/general-licensing.yml`
  - General licensing criteria

### Auto-Generated Configuration
- `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/comparison-auto-config.yml`
  - Automatically generated configuration
  - Applied last during merge process
  - Lower precedence than explicit configs

### Dataset-Specific Configurations
- `/home/cb/projects/github/ultimate/awesome-comparisons/datasets/code-editor/config/comparison.yml`
  - Dataset: Code Editors
  - Highest precedence user configuration

- `/home/cb/projects/github/ultimate/awesome-comparisons/datasets/terminal/config/comparison.yml`
  - Dataset: Terminal CLI tools

- `/home/cb/projects/github/ultimate/awesome-comparisons/datasets/other/config/comparison.yml`
  - Dataset: Other Code Editing Tools

- `/home/cb/projects/github/ultimate/awesome-comparisons/datasets/aie-model/config/comparison.yml`
  - Dataset: AI Models and Model Tooling

- `/home/cb/projects/github/ultimate/awesome-comparisons/datasets/code-agent/config/comparison.yml`
  - Dataset: Code Agents and Agent Frameworks

- `/home/cb/projects/github/ultimate/awesome-comparisons/datasets/product-prototyping/config/comparison.yml`
  - Dataset: Prototyping and Product-Focused Tools


## Build/Processing Files

### Main Build Script (Gulp)
- `/home/cb/projects/github/ultimate/awesome-comparisons/lib/gulp/gulpfile.babel.js`
  - Lines 420-445: `config()` function - MAIN ORCHESTRATION
  - Lines 201-211: `loadDefaultConfigurationFromPaths()` - loads and merges default files
  - Lines 110-163: `createDatasetContext()` - validates and resolves paths
  - CRITICAL: This file controls the entire merge process


## Model Files (Configuration Classes)

### Configuration Model
- `/home/cb/projects/github/ultimate/awesome-comparisons/lib/gulp/model/configuration/configuration.js`
  - Lines 115-136: `combine(other)` - CORE MERGE LOGIC
  - Lines 60-76: `load(json, defaultConfig, useDefaults)` - creates instances with defaults
  - Lines 78-80: `empty()` - creates empty configuration
  - CRITICAL: Implements null-preserving merge logic

### Criteria Model
- `/home/cb/projects/github/ultimate/awesome-comparisons/lib/gulp/model/criteria/criteria.js`
  - Lines 251-281: `combine(other)` - RECURSIVE MERGE for criteria
  - Lines 199-234: `loadArray()` - loads criteria array with defaults
  - Lines 156-196: `load()` - loads individual criteria
  - Handles merging of criteria properties and values

### CriteriaValue Model
- `/home/cb/projects/github/ultimate/awesome-comparisons/lib/gulp/model/criteria/criteriaValue.js`
  - Represents individual criteria value options

### Utility Functions
- `/home/cb/projects/github/ultimate/awesome-comparisons/lib/gulp/model/util.js`
  - `isNullOrUndefined()` - determines if value should be overwritten
  - `deleteUndefinedKeys()` - removes null values from output
  - `resolveDefault()` - processes template values


## Runtime/Angular Files

### Configuration Service (Runtime Loading)
- `/home/cb/projects/github/ultimate/awesome-comparisons/src/app/components/comparison/configuration/configuration.service.ts`
  - Lines 124-131: `loadComparison()` - main entry point
  - Lines 133-147: `loadDatasetAssets()` - loads pre-built JSON files
  - Lines 154-344: `hydrateConfigurationPayload()` - hydrates configuration models
  - NOTE: Loads already-merged configs from assets (no additional merging)

### Other Related Services
- `/home/cb/projects/github/ultimate/awesome-comparisons/src/app/components/datasets/dataset-manifest.service.ts`
  - Manages dataset manifest and active dataset selection

- `/home/cb/projects/github/ultimate/awesome-comparisons/src/app/components/comparison/comparison.module.ts`
  - Module definition for comparison components


## Output Files (Generated)

### Built Distribution Output
- `/home/cb/projects/github/ultimate/awesome-comparisons/dist/code-editor/comparison.json`
  - Merged and serialized configuration for code-editor dataset
  - Generated by build process

- `/home/cb/projects/github/ultimate/awesome-comparisons/dist/terminal/comparison.json`
  - Merged configuration for terminal dataset

- `/home/cb/projects/github/ultimate/awesome-comparisons/dist/{datasetId}/comparison.json`
  - Pattern for all dataset outputs

### Angular Assets (Served to Client)
- `/home/cb/projects/github/ultimate/awesome-comparisons/src/assets/generated/code-editor/comparison.json`
  - Copied from dist/ during build
  - Served to Angular app at runtime

- `/home/cb/projects/github/ultimate/awesome-comparisons/src/assets/generated/{datasetId}/comparison.json`
  - Pattern for all dataset asset copies

- `/home/cb/projects/github/ultimate/awesome-comparisons/src/assets/generated/{datasetId}/data.json`
  - Data file for each dataset


## Quick Reference for Understanding the Flow

### To Understand the Merge Process:
1. Read: `/home/cb/projects/github/ultimate/awesome-comparisons/lib/gulp/gulpfile.babel.js` (lines 420-445)
2. Then: `/home/cb/projects/github/ultimate/awesome-comparisons/lib/gulp/model/configuration/configuration.js` (lines 115-136)

### To Understand What Gets Merged:
1. Read: `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/datasets.manifest.json`
2. Then: `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/comparison-default.yml`
3. Then: `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/defaults/groups-advanced.yml`
4. Then: `/home/cb/projects/github/ultimate/awesome-comparisons/datasets/code-editor/config/comparison.yml`

### To Understand Dataset Context:
1. Read: `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/datasets.manifest.json` (structure definition)
2. Then: `/home/cb/projects/github/ultimate/awesome-comparisons/lib/gulp/gulpfile.babel.js` (lines 110-163)

### To Understand Runtime Loading:
1. Read: `/home/cb/projects/github/ultimate/awesome-comparisons/src/app/components/comparison/configuration/configuration.service.ts` (lines 124-147)


## File Organization Summary

```
Configuration Input Files:
  /configuration/datasets.manifest.json          ← Registry
  /configuration/comparison-default.yml          ← Fallback defaults
  /configuration/defaults/*.yml                  ← Shared defaults
  /datasets/*/config/comparison.yml              ← Dataset-specific

Build Processing:
  /lib/gulp/gulpfile.babel.js                    ← Orchestrator
  /lib/gulp/model/configuration/configuration.js ← Merge logic
  /lib/gulp/model/criteria/criteria.js           ← Criteria merge
  /lib/gulp/model/util.js                        ← Utilities

Generated/Built Output:
  /dist/*/comparison.json                        ← Merged output
  /src/assets/generated/*/comparison.json        ← Served to app

Runtime/Angular:
  /src/app/components/comparison/configuration/configuration.service.ts
```


## Most Important Files (In Priority Order)

1. **CRITICAL**: `/home/cb/projects/github/ultimate/awesome-comparisons/lib/gulp/gulpfile.babel.js`
   - Controls entire merge flow
   - Lines 420-445 define the order of operations

2. **CRITICAL**: `/home/cb/projects/github/ultimate/awesome-comparisons/lib/gulp/model/configuration/configuration.js`
   - Implements merge logic
   - Lines 115-136 show how properties are merged

3. **IMPORTANT**: `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/datasets.manifest.json`
   - Defines configuration chains
   - Shows which files are used for each dataset

4. **IMPORTANT**: `/home/cb/projects/github/ultimate/awesome-comparisons/configuration/comparison-default.yml`
   - System defaults
   - Reference for fallback values

5. **REFERENCE**: Dataset-specific configs
   - `/home/cb/projects/github/ultimate/awesome-comparisons/datasets/code-editor/config/comparison.yml`
   - Shows real-world usage

