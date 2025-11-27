# Business Groups Configuration

Business strategy criteria groups and fields configuration covering company profile, market positioning, SWOT analysis, Porter's Five Forces, BCG Matrix, Gartner Magic Quadrant, and Risk assessment frameworks.

## Target

[@generate](../../configuration/defaults/business-groups.yml)

## Capabilities

### Awesome Comparisons Criteria Array Structure

Provides structured criteria array format with MARKDOWN groups containing children lists and explicit order values. Each group serves as a container for related business analysis fields.

- Groups are defined as MARKDOWN type with children arrays referencing individual criteria
- Groups use explicit order values following 10,15,20,30,40,50,60 sequence for display positioning
- Child criteria increment order accordingly within their groups
- CompanyProfile and SWOT groups set `defaultExpanded: true` for initial display
- Groups generally disable search, table, and detail capabilities (`search: false`, `table: false`, `detail: false`)
- Structure supports hierarchical organization of business analysis frameworks

### Company Profile Group

Provides structured fields for capturing essential company information including basic details, market position, and organizational characteristics.

- CompanyProfile group contains Category, Regions, Customers, Partners criteria with order 10
- Uses MARKDOWN type for narrative company description fields
- Child criteria use MARKDOWN type with `search: false`, `table: false`, `detail: true`
- Set as `defaultExpanded: true` for initial display

### Market Positioning Group  

Captures market positioning elements including segments, ideal customer profiles, differentiators, and pricing models.

- MarketPositioning group contains Segment, ICP, Differentiators, PricingModel criteria with order 15
- Child criteria use MARKDOWN type with `search: false`, `table: false`, `detail: true`
- Includes descriptive positioning content fields

### SWOT Analysis Group

Enables comprehensive SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis framework with predefined categories and assessment criteria.

- SWOT group contains Strengths, Weaknesses, Opportunities, Threats criteria with order 20
- Child criteria use MARKDOWN type with `search: false`, `table: false`, `detail: true`
- Set as `defaultExpanded: true` for initial display
- Detail view enabled for comprehensive analysis

### Porter's Five Forces Group

Supports Porter's Five Forces competitive analysis model covering competitive rivalry, supplier power, buyer power, threat of substitution, and threat of new entry.

- PortersFiveForces group contains SupplierPower, BuyerPower, NewEntrants, Substitutes, Rivalry criteria with order 30
- Child criteria use LABEL type with High/Medium/Low string values ['High','Medium','Low']
- All label criteria enable `search: true`, `table: true`, `detail: true`
- Label criteria disable `andSearch: false`, `rangeSearch: false`

### BCG Matrix Group

Implements BCG Growth-Share Matrix framework with quadrants for portfolio evaluation based on market growth and relative market share.

- BCGPortfolio group contains MarketGrowthRate, RelativeMarketShare, BCGQuadrant criteria with order 40
- MarketGrowthRate and RelativeMarketShare use LABEL type with ['High','Medium','Low'] values
- BCGQuadrant uses LABEL type with ['Star', 'Cash Cow', 'Question Mark', 'Dog'] values
- BCGQuadrant includes description explaining quadrant value representation
- Detail view for portfolio matrix analysis

### Gartner Magic Quadrant Group

Provides Gartner Magic Quadrant evaluation framework with positioning criteria for market leadership assessment.

- GartnerMQ group contains AbilityToExecute, CompletenessOfVision, GartnerQuadrant criteria with order 50
- AbilityToExecute and CompletenessOfVision use LABEL type with ['High','Medium','Low'] values
- GartnerQuadrant uses LABEL type with ['Leader', 'Challenger', 'Visionary', 'Niche Player'] values
- GartnerQuadrant includes description explaining quadrant value representation
- Table and detail views for positioning analysis

### Risk Assessment Group

Offers comprehensive risk evaluation categories with severity assessments and compliance tracking.

- RiskAndCompliance group contains RiskLevel, ComplianceNotes criteria with order 60
- RiskLevel uses LABEL type with ['Low', 'Moderate', 'High', 'Critical'] values
- ComplianceNotes uses MARKDOWN type for narrative compliance content
- Search and detail capabilities for risk management

### Structured Placeholder Pattern

Implements placeholder system with object structure containing template and variables properties for dynamic placeholder text generation.

- Uses `&defaultPlaceholder` anchor with template "Provide details for {} ..." and variables array `[name]`
- Uses `&selectPlaceholder` anchor with template "Select {} ..." and variables array `[name]`
- MARKDOWN criteria reference `*defaultPlaceholder` for narrative input guidance
- LABEL criteria reference `*selectPlaceholder` for selection input guidance
- Template uses {} placeholder for variable substitution with name field
- Variables defined as array format `[name]` for placeholder substitution
- Ensures type-appropriate user experience with template-based substitution

## API

The YAML configuration uses Awesome Comparisons `criteria:` array format with explicit ordering and field type specifications. Groups are defined as MARKDOWN type with `children` arrays listing child criteria IDs, explicit `order` values (10,15,20,30,40,50,60), and `defaultExpanded: true` for CompanyProfile and SWOT groups. Individual criteria definitions specify field types with MARKDOWN criteria having `search: false`, `table: false`, `detail: true` and LABEL criteria having `search: true`, `table: true`, `detail: true`, `andSearch: false`, `rangeSearch: false`. LABEL values use specific string arrays for different assessment types. Placeholder system uses structured object format with template and variables properties for dynamic text generation.

```yaml
defaultPlaceholder: &defaultPlaceholder
  template: "Provide details for {} ..."
  variables: [name]

selectPlaceholder: &selectPlaceholder
  template: "Select {} ..."
  variables: [name]

criteria:
  - id: CompanyProfile
    type: MARKDOWN
    children: [Category, Regions, Customers, Partners]
    order: 10
    defaultExpanded: true
    search: false
    table: false
    detail: false
  - id: Category
    type: MARKDOWN
    order: 11
    search: false
    table: false
    detail: true
    placeholder: *defaultPlaceholder
  - id: SupplierPower
    type: LABEL
    values: ['High','Medium','Low']
    search: true
    table: true
    detail: true
    andSearch: false
    rangeSearch: false
    placeholder: *selectPlaceholder
  # Additional criteria following these patterns
```

## Dependencies

Strategic analysis framework definitions and field validation utilities.
[@use](./field-types)