# Plan: Business Strategy & Competitor Analysis Toolkit (SWOT, Porter, BCG, Gartner)

Create a reusable “business strategy” dataset and shared config tailored for competitor analysis and classic strategy frameworks (SWOT, Porter’s Five Forces, BCG Growth-Share, Gartner MQ), built on Awesome Comparisons v3 (multi-dataset, admin editor, shared defaults).

## Goals

- A single dataset (`business-competition`) to compare companies with strategy lenses in one view.
- Shared config defaults for business criteria, groupings, and value displays reusable across future datasets.
- Admin-friendly editing at `/admin` with clear forms and helpful displays (chips, H/M/L, quadrants).
- Minimal initial slice (SWOT + Porter + BCG + MQ) with room for phased extensions (PESTLE, 7S, Ansoff).

## Out of Scope (initial slice)

- Automated data ingestion from external sources (manual Markdown only).
- Custom charts beyond table/filter/detail views.
- Sensitive or confidential internal data.

## Architecture Fit

- Use `configuration/defaults/*.yml` for shared business criteria groups and value displays.
- Add `datasets/business-competition` for config + data.
- Register in `configuration/datasets.manifest.json` with `configDefaults` referencing new shared files.
- Standardize on the built-in TypeScript md2json converter (`lib/md2json/dist/cli.js`). Note: any Python converter references are outdated and will be removed in docs follow-up.

---

## Tasks

- [ ] Define scope + taxonomy (MVP)
  - Frameworks included: SWOT, Porter, BCG, Gartner MQ
  - Core company profile fields and strategic posture
  - Scales: Yes/No, H/M/L, Quadrant enums, numeric axes (where applicable)
  - Acceptance: A one-pager taxonomy doc captured in this repo plan and reflected in config defaults

- [ ] Shared value displays (configuration/defaults/business-value-displays.yml)
  - Add/extend displays:
    - `High/Medium/Low` → colored chips
    - `GartnerQuadrant` → Leader/Challenger/Visionary/Niche
    - `BCGQuadrant` → Star/Cash Cow/Question Mark/Dog
    - `RiskLevel` → Low/Moderate/High/Critical
  - Acceptance: Values render with icons/colors similar to existing `value-displays.yml`

- [ ] Shared groups and criteria (configuration/defaults/business-groups.yml)
  - Company Profile: Category (LABEL), Regions (TEXT), Customers (MARKDOWN), Partners (MARKDOWN)
  - Market & Positioning: Segment (LABEL), ICP (MARKDOWN), Differentiators (MARKDOWN), PricingModel (LABEL)
  - SWOT: Strengths, Weaknesses, Opportunities, Threats (MARKDOWN)
  - Porter’s Five Forces: SupplierPower, BuyerPower, NewEntrants, Substitutes, Rivalry (LABEL: H/M/L)
  - BCG Portfolio: MarketGrowthRate (LABEL: H/M/L), RelativeMarketShare (LABEL: H/M/L), BCGQuadrant (ENUM)
  - Gartner MQ: AbilityToExecute (LABEL: H/M/L), CompletenessOfVision (LABEL: H/M/L), GartnerQuadrant (ENUM)
  - Risk & Compliance: RiskLevel (ENUM), ComplianceNotes (MARKDOWN)
  - Acceptance: Groups show in filters/table/detail and are admin-editable

- [ ] Dataset scaffold (datasets/business-competition)
  - `config/comparison.yml`: set `title`, `subtitle`, rely on shared defaults; keep `criteria:` empty unless a dataset override is needed
  - `data/` with 2–3 sample companies and a `TEMPLATE.md`
  - Acceptance: Build produces `dist/business-competition/{comparison.json,data.json,style.css}` and mirrors into Angular assets

- [ ] Manifest entry (configuration/datasets.manifest.json)
  - Add dataset with `id: "business-competition"`, `displayLabel`, `assetDirectory: "assets/generated/business-competition/"`
  - Set `sources.config`, `sources.dataDir`, `sources.style`, and `configDefaults` including the new shared files
  - Acceptance: Dataset appears in selector and `/admin`

- [ ] Build + verify UI
  - Commands:
    - `npm run dev -- --dataset business-competition`
    - `npm run build -- --dataset business-competition`
  - Acceptance: Filters available, table renders criteria, details show markdown sections, chips display correctly

- [ ] Docs + onboarding
  - `docs/uc-v3/` page: “Business Toolkit” mapping frameworks → criteria
  - README quickstart line for the new dataset
  - Update any outdated converter notes to reflect TypeScript CLI (no Python env var required)
  - Acceptance: Docs guide a non-expert to add their first company entry

- [ ] Clean up converter docs (follow-up)
  - Remove references to `MD_TO_JSON_COMMAND` and Python converter from AGENTS.md and related docs
  - Align CHANGELOG/notes with current TS converter path
  - Acceptance: No stray references to Python converter remain

---

## Criteria Details (MVP)

- Common
  - `Category` (LABEL), `Regions` (TEXT), `Customers` (MARKDOWN), `Partners` (MARKDOWN)
  - `Differentiators` (MARKDOWN), `PricingModel` (LABEL: PerSeat/Usage/Hybrid/Open-Core/Enterprise)
- SWOT (MARKDOWN): `Strengths`, `Weaknesses`, `Opportunities`, `Threats`
- Porter (LABEL H/M/L): `SupplierPower`, `BuyerPower`, `NewEntrants`, `Substitutes`, `Rivalry`
- BCG
  - `MarketGrowthRate` (H/M/L)
  - `RelativeMarketShare` (H/M/L)
  - `BCGQuadrant` (ENUM: Star/CashCow/QuestionMark/Dog)
- Gartner MQ
  - `AbilityToExecute` (H/M/L)
  - `CompletenessOfVision` (H/M/L)
  - `GartnerQuadrant` (ENUM: Leader/Challenger/Visionary/Niche)
- Risk
  - `RiskLevel` (ENUM: Low/Moderate/High/Critical)
  - `ComplianceNotes` (MARKDOWN)

Note: If numeric axes are later preferred (e.g., 0–10), we’ll add `NUMBER` criteria and a simple banding display.

---

## Data Authoring Template (excerpt)

```
# Acme Corp - https://example.com

## General Info

### Classification
- SaaS Platform

### Short Description
- One-liner positioning.

### Description
Longer narrative describing product, market, and strategy.

## SWOT

### Strengths
- Bullet points…

### Weaknesses
- Bullet points…

### Opportunities
- Bullet points…

### Threats
- Bullet points…

## Porter’s Five Forces

### SupplierPower
- High

### BuyerPower
- Medium

### NewEntrants
- Low

### Substitutes
- Medium

### Rivalry
- High

## BCG Portfolio

### MarketGrowthRate
- High

### RelativeMarketShare
- Medium

### BCGQuadrant
- Star

## Gartner MQ

### AbilityToExecute
- High

### CompletenessOfVision
- Medium

### GartnerQuadrant
- Leader

## Risk & Compliance

### RiskLevel
- Moderate

### ComplianceNotes
- Notes on SOC2/ISO, privacy, etc.
```

---

## Open Questions for Review

- Do you want one combined dataset (per-company row includes all frameworks) or multiple specialized datasets (e.g., `swot-only`, `industry-forces`)?
COMBINED

- Preferred scales: keep H/M/L and enums initially, or start with numeric sliders (0–10) for more granularity?
H/M/L
But i want the indented unordered list for the explanataions of the choosen criteria values

- Which 2–3 companies should we seed as examples?
GOOGLE, AMAZON, ORACLE, MICROSOFT 

- Any confidential data constraints or redaction rules we should enforce in docs/PRs?
NO
---

## Risks & Mitigations

- Too many criteria at once → Start minimal, phase additional frameworks (PESTLE, 7S, Ansoff) in follow-ups.
- Ambiguity in scoring → Provide `TEMPLATE.md` with inline guidance and sample values.
- Converter confusion → Standardize on TS CLI, remove Python references in docs.

---

## Follow-ups 

- Add PESTLE, McKinsey 7S, Ansoff criteria groups
PLEASE INCLUDE THESE TOO IN THE DATASET


---

## Verification

- `npm run dev -- --dataset business-competition` loads dataset; filters show SWOT/Porter/BCG/MQ; details render markdown sections with chips for H/M/L and quadrant enums.
- `npm run build -- --dataset business-competition` outputs dataset bundle and mirrors assets.

