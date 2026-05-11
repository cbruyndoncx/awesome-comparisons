# CRITICAL — Carrier name normalization (ALWAYS apply, regardless of source casing)

The source PDFs use various casings and shorthand. ALWAYS normalize to the canonical broker-facing name:

| Source PDF says | You MUST output |
|---|---|
| TAKAFUL, Takaful, takaful | Takaful Emarat |
| FIDELITY, Fidelity, FIDELITY UNITED | Fidelity United Insurance |
| RAK, RAK INSURANCE, RAK Insurance | RAK Insurance |
| ORIENT, Orient Insurance | Orient Insurance PJSC |
| QIC | Qatar Insurance Company |

This applies to "Insurance Provider" facet AND to the plan_name H1.

# CRITICAL — Plan Tier rules (ALWAYS strip these)

"Plan Tier" must be the COVERAGE variant name ONLY. STRIP these prefixes/suffixes if they appear:

- ✂️ Strip carrier name: "TAKAFUL Plan 4 Opal" → "Plan 4 Opal"
- ✂️ Strip network prefix: "NAS-PLAN 4 Opal-DXB 20%" → "Plan 4 Opal-DXB 20%"
- ✂️ Strip territorial scope: "Dubai & Northern Emirates Family Care Plan" → "Family Care Plan"
- ✂️ Never invent: "Mid-tier", "Premium", "Basic" — these are interpretations, not source facts

EXAMPLES of correct Plan Tier values:
- "Health First Plan D (0% copay)"
- "Family Care Plan - Super Restricted"
- "Plan 4 Opal-DXB 20%"
- "Family Care Plan - Emerald"

# CRITICAL — plan_name (H1) format

The H1 line is `# {Carrier canonical name} {Plan tier}`. Use the normalized values from above. Examples:

- ✅ "Fidelity United Health First Plan D (0% copay)"
- ✅ "RAK Family Care Plan - Super Restricted"
- ✅ "Takaful Emarat Plan 4 Opal-DXB 20%"
- ❌ "TAKAFUL NAS-PLAN 4 Opal-DXB 20%" (uppercase + network leak)
- ❌ "RAK Insurance Dubai & Northern Emirates Family Care Plan - Super Restricted Network" (territory + redundant words)

Keep it tight: `{carrier} {tier}`. Skip "Insurance", "Network", territory words.

# CRITICAL — Orient basic-tier product-group mappings (Basic_Medical_*.pdf source)

The Basic_Medical premium summary table has product groups with their territorial scopes
collapsed into a single cell pair, separated by newlines. To map products to scopes:

| Product family | Territorial Scope |
|---|---|
| DMED (DMED, DMED-LSB, DMED-NLSB) | UAE and home country (as mentioned in the TOB) |
| IMED | UAE and home country (as mentioned in the TOB) |
| EMED | UAE and home country (as mentioned in the TOB) |
| NEMED | UAE excluding Abu Dhabi and Alain |
| NEMED-Lite | UAE excluding Dubai, Abu Dhabi and Alain |
| NEMED-Basic | UAE excluding Dubai, Abu Dhabi and Alain |

Use these mappings VERBATIM when extracting Territorial Scope for any Orient basic-tier plan.
Do NOT pick the wrong line from the collapsed table cell.

# CRITICAL — plan_name H1 carrier prefix uses BRAND name, not legal name

For "Insurance Provider" facet: use the full canonical legal name.
For the "plan_name" (H1 line): use only the BRAND prefix (no legal suffix like "PJSC").

| Insurance Provider value | plan_name H1 prefix |
|---|---|
| Orient Insurance PJSC | Orient |
| Fidelity United Insurance | Fidelity United |
| RAK Insurance | RAK |
| Takaful Emarat | Takaful Emarat |
| Qatar Insurance Company | QIC |

So for DMED-LSB: H1 is `# Orient DMED-LSB`, NOT `# Orient Insurance PJSC DMED-LSB`.

# Medical Network — multi-network bullets

When source says "PCP for outpatient & RN3 for inpatient" (or "PCP for outpatient and RN3 For Inpatient"), output TWO atomic bullets:

```
### Medical Network
- PCP for outpatient
- RN3 for inpatient
```

Do NOT collapse to one bullet with "&". Do NOT drop the inpatient network — both networks must appear.

# Other facet rules

- "Medical Network": include carrier+TPA prefix when source provides one. "NAS SUPER RESTRICTED" (NOT "SUPER RESTRICTED"). "NEXTCARE RN2" (NOT "RN2"). "NAS RN" (NOT "RN").
- "Maternity Declaration Requirement": this is NOT a Yes/No facet. Output the rule statement from source. Examples: "Pregnancy must be declared in MAF", "Undeclared pregnancy subject to re-underwriting". NEVER "Yes" or "No".
- "Outpatient Copay": only the consultation/OP copay rule. ONE atomic bullet ideally.
- "Premium Band Family-of-4": if a rate chart is in the source, derive a band like "AED 25,000-40,000" using the family-of-4 row aggregation. If only individual rates are visible, use "Quote on application".
- "Annual Aggregate Limit": exact format from source ("AED 1,000,000" not "AED 1 million" or "1M").
- "Overall Quality": format `[N] reason` where N is 1-5. Reason is one short sentence in the SAME bullet.
