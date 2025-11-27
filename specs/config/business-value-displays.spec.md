# Business Value Displays Configuration

Shared value-display configuration for business-strategy criteria including High/Medium/Low chips, risk levels, and quadrant labels.

## Target

[@generate](../../configuration/defaults/business-value-displays.yml)

## Capabilities

### Criteria Array Structure

Provides a criteria array structure mirroring configuration/defaults/value-displays.yml for consistent configuration format across the application.

- Uses criteria array format for standardized configuration structure
- Maintains consistency with existing value-displays configuration patterns

### YAML Anchor for High/Medium/Low Values

Defines a reusable YAML anchor (&hmlChip) for High/Medium/Low value display configurations used across multiple business strategy criteria.

- High value displays as "🔴 High" with red circle emoji
- Medium value displays as "🟡 Medium" with yellow circle emoji  
- Low value displays as "🟢 Low" with green circle emoji
- Anchor is reused for SupplierPower, BuyerPower, NewEntrants, Substitutes, Rivalry, MarketGrowthRate, RelativeMarketShare, AbilityToExecute, and CompletenessOfVision criteria

### Risk Level Configuration

Provides standardized display configurations for risk assessment levels in business strategy analysis.

- RiskLevel criterion with four levels: Low, Moderate, High, Critical
- Uses color-coded emoji text chips: 🟢 Low, 🟡 Moderate, 🟠 High, 🔴 Critical
- Provides progressive visual indication of risk severity

### Gartner Magic Quadrant Configuration

Provides standardized display configurations for Gartner Magic Quadrant positioning.

- GartnerQuadrant criterion with four positions
- Leader displays as "⭐ Leader" with star emoji
- Challenger displays as "🗺️ Challenger" with map emoji
- Visionary displays as "🔭 Visionary" with telescope emoji
- Niche Player displays as "🧭 Niche Player" with compass emoji

### BCG Matrix Quadrant Configuration

Provides standardized display configurations for BCG Growth-Share Matrix positioning.

- BCGQuadrant criterion with four categories
- Star displays as "🌟 Star" with glowing star emoji
- Cash Cow displays as "💰 Cash Cow" with money bag emoji
- Question Mark displays as "❓ Question Mark" with question mark emoji
- Dog displays as "🐾 Dog" with paw prints emoji

### Configuration Format Migration

Updates from the previous node-based structure to criteria array format for consistency.

- Removes previous valueChips, riskLevels, and quadrantLabels node structures
- Migrates to criteria array format matching other configuration files
- Removes generated file header to align with standard configuration format

## API

This YAML configuration file defines a criteria array containing shared value display definitions for business strategy datasets, using YAML anchors for reusable High/Medium/Low configurations and providing emoji-enhanced text displays for risk levels and strategic positioning frameworks.

## Dependencies

### Configuration Pattern Reference

Mirrors the structure and patterns established in the existing value-displays configuration.
[@use](../../configuration/defaults/value-displays.yml)