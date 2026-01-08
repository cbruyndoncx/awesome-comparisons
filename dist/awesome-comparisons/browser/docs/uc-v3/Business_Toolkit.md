# Business Strategy Toolkit Dataset

The **business-competition** dataset turns Awesome Comparisons into a strategy assessment workspace that merges classic consulting frameworks (SWOT, Porter's Five Forces, BCG Growth-Share, Gartner Magic Quadrant) with structured company profiles. Use it to capture competitor intel, track risk posture, and present executive-ready scorecards.

## Framework Coverage

| Framework | Criteria IDs | Notes |
|-----------|--------------|-------|
| Company Profile | `Category`, `Regions`, `Customers`, `Partners` | Narrative fields describing footprint and relationships |
| Market & Positioning | `Segment`, `ICP`, `Differentiators`, `PricingModel` | Explain ICPs and monetization models |
| SWOT | `Strengths`, `Weaknesses`, `Opportunities`, `Threats` | Markdown bullets per quadrant |
| Porter's Five Forces | `SupplierPower`, `BuyerPower`, `NewEntrants`, `Substitutes`, `Rivalry` | Label values High/Medium/Low with an indented bullet explaining each choice |
| BCG Growth-Share | `MarketGrowthRate`, `RelativeMarketShare`, `BCGQuadrant` | Use H/M/L + the `Star/Cash Cow/Question Mark/Dog` enum |
| Gartner Magic Quadrant | `AbilityToExecute`, `CompletenessOfVision`, `GartnerQuadrant` | Provide text rationale for the chosen position |
| Risk & Compliance | `RiskLevel`, `ComplianceNotes` | `RiskLevel` uses Low/Moderate/High/Critical with supporting narrative |

The shared defaults live in:

- `configuration/defaults/business-groups.yml`
- `configuration/defaults/business-value-displays.yml`

The dataset manifest entry (`configuration/datasets.manifest.json`) points the `business-competition` dataset at these defaults so builds automatically mirror the new criteria/value displays.

## Authoring Workflow

1. Copy `datasets/business-competition/data/TEMPLATE.md` and rename it to match the company (`acme.md`).
2. Fill the **General Info** and **Company Profile** sections.
3. For every label-style criterion (e.g., `SupplierPower`), record the value as `- High`/`Medium`/`Low`, then add an indented unordered list item explaining the rationale:
   ```markdown
   ### SupplierPower
   - High
     - Specialized TPU/GPU supply and subsea cable contracts keep suppliers influential
   ```
4. Populate SWOT, BCG, Gartner, and Risk sections with markdown bullet lists drawing on research/interviews.
5. Run `npm run data:prepare -- --dataset business-competition` (or `npm run build -- --dataset business-competition`) to regenerate `dist/business-competition/**`.
6. Review the dataset at `http://localhost:4200/?dataset=business-competition` or the admin editor at `/admin` to adjust values via forms.

## Quick Start

```bash
npm run dev -- --dataset business-competition
# or build once
npm run build -- --dataset business-competition
```

The dev server mirrors data into `src/assets/generated/business-competition/` automatically, so table + detail views pick up the new strategy dimensions immediately.
