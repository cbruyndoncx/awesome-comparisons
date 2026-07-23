# Model Landscape Refresh — 2026

## Goal

Refresh the `aie-model` dataset while preserving historic models and making lifecycle status explicit.

## Workstreams

- [x] Add the first current-model refresh batch.
- [x] Add lifecycle metadata and historical filtering.
- [x] Add deterministic freshness and provenance validation.

### Task output: first refresh batch

> Completed: added nine high-priority model records from primary vendor documentation, with conservative claims where benchmark or pricing details were not independently verified. The direct Markdown-to-JSON converter accepted the dataset and produced 45 entries.

### Task output: lifecycle and validation

> Completed: added explicit Lifecycle and Last Verified metadata to all 45 records, added lifecycle and verification-date criteria to the dataset configuration, and added `npm run validate:aie-model`. The validator checks canonical source URLs, allowed lifecycle values, future verification dates, and configurable staleness (`AIE_MODEL_AS_OF`, `AIE_MODEL_MAX_AGE_DAYS`). Existing records without current re-verification are conservatively marked `legacy`.

> The validator now also runs automatically as part of `npm run build` through the `prebuild` hook.

> Added successor metadata for eight clear family transitions, including Opus 4.5 → 4.6, GPT-5.2 Codex → GPT-5.3 Codex, Gemini 2.5 → Gemini 3, Qwen2.5 Coder → Qwen3-Coder-Next, DeepSeek V3 → V4, GLM-4.6 → 4.7, GPT-5.3 Codex → GPT-5.5/5.6, and Codestral → Devstral 2.

### Task output: final current-model coverage and verification

> Completed: expanded the dataset to 57 records with current Claude, GPT, Gemini, Kimi, Mistral, Z.AI, and Cursor entries. The final targeted build passed through prebuild validation, Markdown conversion, MCP enrichment, and Angular bundle generation. The only remaining output is non-blocking warnings for stale Browserslist data, a CommonJS dependency, and an existing code-editor stylesheet reference.

### 1. Refresh current model coverage

- Verify and add current frontier models from OpenAI, Anthropic, Google, DeepSeek, Moonshot, Qwen, Mistral, Zhipu, MiniMax, and Cursor.
- Include Claude Fable 5, Claude Mythos 5, and Claude Mythos Preview.
- Prioritize authoritative vendor documentation and model cards.
- Record release date, availability, licensing, context, pricing, benchmarks, and source URL.

### 2. Add lifecycle and historical status

- Define statuses: `active`, `preview`, `restricted`, `legacy`, and `retired`.
- Preserve historic entries rather than deleting them.
- Add successor and retirement metadata where known.
- Make active models the default view; expose historic entries through a filter.

### 3. Add freshness and provenance checks

- Add `Last Verified` metadata to every model record.
- Require a primary source URL.
- Flag missing metadata, placeholder values, malformed versions, future dates, and stale records.
- Keep validation deterministic and inexpensive; no model calls should be required.

## Initial candidate additions

- OpenAI: GPT-5.5, GPT-5.5 Pro, GPT-5.6
- Anthropic: Sonnet 4.6, Sonnet 5, Opus 4.7, Opus 4.8, Fable 5, Mythos 5
- Google: Gemini 3.1 Pro, Gemini 3.5 Flash, Gemini 3.1 Flash-Lite
- DeepSeek: V3.2, V4 Pro, V4 Flash
- Moonshot: Kimi K2.5, Kimi K2.6, Kimi K3
- Qwen: Qwen3-Coder-Next, Qwen3.5, Qwen3-Coder-Plus
- Mistral: Devstral 2, Devstral Small 2, Mistral Medium 3.5, Leanstral
- Zhipu: GLM-5 and coding variants
- Cursor: Composer 2

## Definition of done

- Current major model families are represented.
- Historic and restricted models are clearly distinguished.
- Every record has freshness and source metadata.
- Dataset validation and application build pass.
