# Cogram - https://cogram.ai/
[AI-powered coding assistant for Jupyter Notebooks / data-science workflows. Note: there is a different product with the same name at cogram.com (construction/architecture).]

## General Info

### Classification
- Other

### Version
- 0.11.23 (OUTDATED - Last update 2022-01-24)
  - PyPI: jupyter-cogram 0.11.23 (2022-01-24)
  - NOTE: Product appears to have no updates since January 2022 (~4 years old). Verify current status and availability on cogram.ai before use

### Repo
- Unknown / Not Found
  - No official public source repository located for cogram.ai jupyter-cogram extension; community/test repositories may exist but are unofficial

### Rating
- Not Available
  - Insufficient public review data to provide a rating; product appears inactive since 2022

### Short Description
- AI coding assistant for Jupyter Notebooks that generates Python code from natural-language comments and provides context-aware autocompletions for data-science workflows.

### Description
Cogram.ai is an AI assistant focused on accelerating data-science work in Jupyter Notebooks. It generates or autocompletes Python code from natural-language comments, offers code explanations, and can help convert English queries into SQL. The tool is distributed as a Jupyter extension (pip-installable) and requires an API token obtained by signing up on cogram.ai.

### Languages
- Python

### Notes
- **⚠️ PRODUCT STATUS WARNING - POTENTIALLY INACTIVE/ABANDONED:**
  - Latest recorded update: January 24, 2022 (~4 years old)
  - No recent PyPI releases or updates found since 2022
  - Verify current product availability and maintenance status on cogram.ai before use or evaluation
  - Consider alternative active Jupyter AI assistants if cogram.ai proves unavailable
- Two different Cogram products exist: cogram.ai (coding assistant) and cogram.com (construction / meeting docs). Make sure to confirm which product you mean.
- Installation references: pip package and Jupyter nbextension (users sign up for an API token). Example pip install: `pip install -U jupyter-cogram` (community references).
- Official BYOK and enterprise privacy guarantees for cogram.ai were not found in public docs; some enterprise / privacy language appears associated with the other Cogram product (construction), so exercise caution when evaluating privacy claims.
- No official open-source repository for cogram.ai discovered; community/test repos exist but appear unofficial.

### Last Update
- 2022-01-24
  - Date of latest PyPI release (jupyter-cogram 0.11.23)

## Licensing

### Opensource
- No

### License
- Proprietary
  - PyPI-distributed package; no official public source repository located. Licensing appears to be commercial/proprietary rather than an OSS license.

### Free Trial
- Unknown (Likely outdated)
  - Marketing materials from 2022 suggested free account/trial available, but trial terms (duration, limitations) were not documented. Product appears inactive since 2022; verify current availability on cogram.ai before attempting to use

## MCP-Client

### MCP-Client
- No
  - No evidence that the Jupyter extension includes a built-in MCP client for connecting to MCP servers.

### Prompts
- Yes
  - Supports natural-language comments in notebook cells to produce code (manual Tab-triggered completions and an autosuggest mode).

### Tools
- No
  - The extension provides inline code completions and generation, but does not expose a separate "tools" panel or toolchain within the extension.

### Resources
- No
  - No evidence of bundled resource management (e.g., dataset indexing or separate resource browser) in public docs for the jupyter-cogram package.

## Deployment

### BYOK
- Unknown
  - No public documentation found regarding BYOK (Bring Your Own Key) capability for the proprietary Cogram.ai service

### LocalOffline
- No
  - Appears cloud-hosted; no documented offline/local inference option found for the jupyter-cogram extension.

## Developer Experience

### ContextManagement
- Yes
  - Uses the notebook execution and cell history (code above the cursor) as context to generate more accurate suggestions.

### DirectFileReferences
- No
  - No indication that the jupyter-cogram extension provides direct file reference management or file browsing capabilities in the documented interface

### Checkpoints
- No
  - No indication the extension provides its own checkpointing/undo system; relies on Jupyter's native checkpoints and notebook infrastructure.

### GitSupport
- No
  - No explicit Git integration documented for the jupyter-cogram extension.

## Extensible

### Extensible
- Plugins / Jupyter extension

### Plugins
- No
  - The product is distributed as a Jupyter nbextension; there is no public documentation describing a plugin marketplace or third-party plugin mechanism within the extension itself.

### Hooks
- No
  - No documentation found describing lifecycle hooks exposed for custom integrations.

### SlashCommands
- No
  - No evidence of slash-commands support in the Jupyter extension.

### Custom Modes
- No
  - No public documentation about creating specialist/custom modes for the assistant beyond autosuggest/manual completion settings.

### Subagents
- No
  - No evidence of definable subagents or specialized agent workflows in the jupyter-cogram public docs.

