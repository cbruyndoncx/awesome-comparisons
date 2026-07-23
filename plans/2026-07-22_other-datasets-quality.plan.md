# Other Dataset Quality Pass — 2026-07-22

## Goal

Give the non-model datasets deterministic provenance, freshness, schema, and completeness quality gates.

## Workstreams

- [x] Validate canonical source URLs across standard datasets.
- [x] Validate non-future Last Update dates across standard datasets.
- [x] Add the validator to the build preflight.
- [x] Re-research stale entries such as codebuff when their product details are refreshed.
- [x] Add schema-specific validation for business-competition profiles.
- [x] Audit records against their comparison templates and make undocumented fields explicit.

## Task output

> `scripts/validate-datasets.js` now checks 218 standard-dataset records. Codebuff was refreshed from its official GitHub and npm listings to version 1.0.684 (2026-07), leaving zero stale-record warnings. The business-competition dataset is intentionally excluded because it uses a separate company-profile schema without Last Update fields.

> Final verification: the all-datasets build passed with 59 aie-model records and 218 standard-dataset records.

> Business-competition is now covered by `validate-business-competition.js`; all four profiles pass the required company-profile section checks.

## Completeness audit

> `npm run audit:completeness` now reports no template-heading gaps. Legacy `MCP-Prompts`, `MCP-Tools`, and `MCP-Resources` headings are recognized as aliases for the normalized template fields; genuinely undocumented capabilities are represented explicitly as `Unknown` with a note. Core URL and update-date checks pass for all 218 standard records, with zero stale warnings at a 365-day threshold.
