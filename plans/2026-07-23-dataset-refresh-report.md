# Dataset Refresh Report — 2026-07-23

## Scope

This report summarizes the local changes made to the Awesome Comparisons datasets. The work covered model-landscape expansion, source-based re-verification of non-model records, completeness checks, and a full build verification. Changes are local and have not been committed or pushed.

## Executive summary

- Added 23 current AI model records, expanding `aie-model` from 36 legacy/current records to 59 records.
- Re-verified non-model records against current official product, documentation, repository, and company sources.
- Added 10 previously missing records:
  - `code-orchestration`: OpenAI Symphony, Open SWE
  - `product-prototyping`: Firebase Studio, Bubble AI App Generator, Hostinger Horizons
  - `business-competition`: IBM Cloud, Alibaba Cloud, Cloudflare, DigitalOcean, CoreWeave
- Corrected lifecycle, naming, URL, version, licensing, positioning, and regional-footprint claims in existing records.
- Added automated provenance, freshness, schema, and completeness checks.

## Dataset changes

### AIE / model landscape

Added current records for Claude Fable 5, Claude Mythos 5, Claude Mythos Preview, Claude Opus 4.7/4.8, Claude Sonnet 4.6/5, GPT-5.5/5.5 Pro/5.6, Gemini 3.1 Pro, Gemini 3.1 Flash-Lite, Gemini 3.5 Flash, DeepSeek V4, Qwen3-Coder-Next, Devstral 2, Devstral Small 2, Kimi K2.5/K2.6, GLM-5, Cursor Composer 2.5, Mistral Medium 3.5, and Leanstral 1.5.

Existing model records received lifecycle, last-verified, successor, and source metadata where applicable. Historic models remain marked as legacy rather than being removed.

### Code agents and editors

Confirmed and corrected notable changes including:

- Claude Code: closed-source proprietary product; removed the incorrect BSD/open-source claim.
- CodeRabbit: current plan structure and retirement of Lite/Pro Legacy plans.
- Qodo: corrected CodiumAI naming and current code-generation/product positioning.
- OpenHands: current 1.8.0 release reference.
- Replit Agent: Agent 4 supersedes Agent 3; Design Canvas replaces Design Mode.
- Manus: current public availability and Meta ownership.
- Amazon Q Developer: signup/support transition toward Kiro.
- Firebase Studio: lifecycle-constrained status and sunset information.
- Supermaven: discontinued standalone product status.
- Void Editor: development pause status.

### Terminal and orchestration

Corrected Kiro CLI’s placeholder URL, updated Letta to Letta Code, clarified Jules CLI uncertainty, and removed Warp’s unsupported open-source licensing claim.

Added:

- OpenAI Symphony — experimental Apache-2.0 orchestration reference implementation.
- Open SWE — experimental LangGraph-based coding-agent orchestration project.

### AI chat and other tools

- Updated ChatGPT’s current model family and retirement notes.
- Updated Claude Desktop’s current Cowork positioning and removed an unsupported fixed build number.
- Corrected Cogram from the inactive Jupyter assistant entry to the current Cogram project-information platform.
- Refreshed related source and status fields where official evidence supported a change.

### Product prototyping

Added:

- Firebase Studio — Google’s Gemini-powered agentic cloud development environment.
- Bubble AI App Generator — beta prompt-driven Bubble application generator.
- Hostinger Horizons — hosted AI web-app builder.

Also corrected current positioning or lifecycle information for Mocha, Replit Ghostwriter/Replit Agent, v0, app.build, Base44, Bolt, CodeCompanion, CodeWP, Create/Anything, Emergent, Lovable, Reflex, Softgen, ToolJet, Wrapifai, and Zoer.

### Business competition

Added IBM Cloud, Alibaba Cloud, Cloudflare, DigitalOcean, and CoreWeave as adjacent cloud, edge, developer-cloud, and AI-infrastructure competitors.

Updated region-footprint figures for the existing profiles:

- AWS: 39 regions / 123 availability zones.
- Google Cloud: 43 regions / 130 zones.
- Microsoft Azure: 70+ announced regions.
- Oracle Cloud Infrastructure: 50+ public cloud regions across 28 countries.

The new profiles deliberately distinguish strategic assessments from company-reported facts and leave unsupported Gartner fields unfilled.

## Validation and build results

The following checks pass:

- `validate:aie-model`: 59 model records.
- `validate:datasets`: 223 standard dataset records, zero stale-record warnings.
- `validate:business-competition`: 9 business profiles.
- `audit:completeness`: no template-heading gaps.
- Full all-datasets build: passed.

The local development server is currently available at `http://localhost:4200/`, with the config workspace server on port 3100.

## Known caveats

- Some product claims remain unverified where no authoritative current source exposed enough detail; those claims were not replaced with guesses.
- Strategic BCG and Porter’s Five Forces assessments are editorial judgments, not vendor-reported facts.
- Exact cloud-region counts can vary depending on whether announced, sovereign, government, service-specific, or generally available regions are counted.
- The build still emits existing non-blocking warnings for stale Browserslist data, a CommonJS `hogan.js` dependency, and a missing `code-editor` stylesheet.
- Generated `dist` and asset files were refreshed by the build; the working tree remains uncommitted for review.

## Primary source examples

- [OpenAI Symphony](https://github.com/openai/symphony)
- [Open SWE](https://docs.langchain.com/labs/swe)
- [Firebase Studio](https://firebase.google.com/docs/studio)
- [Bubble AI App Generator](https://bubble.io/ai-app-generator/)
- [Hostinger Horizons](https://www.hostinger.com/in/horizons)
- [IBM Cloud](https://www.ibm.com/cloud)
- [Alibaba Cloud](https://www.alibabacloud.com)
- [Cloudflare](https://www.cloudflare.com)
- [DigitalOcean](https://www.digitalocean.com)
- [CoreWeave](https://coreweave.com)
