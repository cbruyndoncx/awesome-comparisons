# Demo Scenario 4: Inheritance Magic
## How One Configuration Serves Multiple Datasets

**Duration:** 5 minutes
**Purpose:** Demonstrate the power of configuration inheritance
**Audience:** Administrators, technical decision makers

---

## Scenario Overview

**The Story:**
> "We have 7 different comparisons, but we don't want to define the same criteria 7 times. Let me show you how the inheritance system lets us define criteria once and use them everywhere - while still allowing custom overrides per dataset."

**What This Demonstrates:**
- Three-tier inheritance system
- Shared configuration reuse
- Dataset-specific overrides
- Manifest-driven inheritance mapping
- How changes propagate across datasets
- DRY principle in action

---

## Pre-Demo Preparation

### Setup Checklist

- [ ] Multiple datasets available (code-editor, prototyping, terminal, etc.)
- [ ] Text editor with these files open in tabs:
  - `configuration/comparison-default.yml`
  - `configuration/datasets.manifest.json`
  - `configuration/defaults/groups-advanced.yml`
  - `datasets/code-editor/config/comparison.yml`
  - `datasets/prototyping/config/comparison.yml`
- [ ] Browser ready with:
  - Tab 1: code-editor comparison
  - Tab 2: prototyping comparison
- [ ] Visual diagram prepared (optional, for clearer explanation)

### Equipment Needed

- IDE with multiple files open
- Browser with multiple tabs
- Split screen (code + browser)
- Diagram (optional, see below)

### Backup Plan

- Prepared screenshots
- Simplified example with fewer files
- Pre-made visual diagram

---

## Demo Script

### INTRODUCTION (30 seconds)

**Say:**
> "One of the most powerful features of Awesome Comparisons is how it handles configuration. Instead of duplicating the same criteria across 7 datasets, we use a three-tier inheritance system. Let me show you how this works."

**Do:**
- Show the repository structure
- Highlight `configuration/` folder
- Highlight `datasets/` folder

**Screen Shows:**
```
configuration/
  ├── comparison-default.yml       ← Shared by ALL
  ├── datasets.manifest.json       ← Controls inheritance
  └── defaults/
      ├── groups-advanced.yml      ← Blueprint
      └── value-displays.yml       ← Display mappings

datasets/
  ├── code-editor/
  │   └── config/comparison.yml    ← Dataset-specific
  ├── prototyping/
  │   └── config/comparison.yml    ← Dataset-specific
  ...
```

**Tip the Audience:**
> "This structure prevents duplication while allowing flexibility."

---

### STEP 1: Show Shared Configuration (60 seconds)

**Say:**
> "Let's start with the shared configuration. This file defines criteria that multiple datasets can use."

**Do:**

**Open:** `configuration/comparison-default.yml`

**Scroll to show criteria:**
```yaml
criteria:
  - name: "Classification"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "text"

  - name: "Version"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "text"

  - name: "Rating"
    searchable: false
    showInTable: true
    showInDetails: true
    type: "rating"

  - name: "Opensource"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "label"

  - name: "MCP Client"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "label"

  # ... 20+ more criteria
```

**Explain:**
- "This file has 30+ criteria defined"
- "Things like Version, Rating, OpenSource, License, etc."
- "These are common across many types of tools"

**Tip the Audience:**
> "Define once, use everywhere. This is the base layer of inheritance."

---

### STEP 2: Show Blueprint Configuration (45 seconds)

**Say:**
> "Next, we have blueprints that define how criteria should be grouped."

**Do:**

**Open:** `configuration/defaults/groups-advanced.yml`

**Show groups:**
```yaml
groups:
  - name: "General Info"
    criteria:
      - "Classification"
      - "Version"
      - "Rating"
      - "Short Description"

  - name: "Licensing"
    criteria:
      - "Opensource"
      - "License"
      - "Free Trial"

  - name: "Features"
    criteria:
      - "MCP Client"
      - "Prompts"
      - "Tools"
      - "Git Support"

  # ... more groups
```

**Explain:**
- "Blueprints define standard grouping patterns"
- "A dataset can inherit a blueprint instead of defining groups manually"
- "This ensures consistency across datasets"

**Tip the Audience:**
> "Blueprints are reusable organization patterns."

---

### STEP 3: Show the Manifest (90 seconds)

**Say:**
> "The manifest file is where the magic happens. It controls which datasets inherit which configurations."

**Do:**

**Open:** `configuration/datasets.manifest.json`

**Show and explain:**

```json
{
  "datasets": {
    "code-editor": {
      "id": "code-editor",
      "default": true,
      "shared": {
        "groups": "groups-advanced",
        "valueDisplays": "value-displays",
        "comparison": "comparison-default"
      }
    },
    "prototyping": {
      "id": "prototyping",
      "default": false,
      "shared": {
        "groups": "groups",
        "valueDisplays": "value-displays",
        "comparison": "comparison-default"
      }
    },
    "project-management": {
      "id": "project-management",
      "default": false,
      "shared": {
        "valueDisplays": "value-displays"
      }
    }
  }
}
```

**Point out:**

1. **code-editor**:
   - Inherits: comparison-default, groups-advanced, value-displays
   - "Full inheritance - uses all shared configs"

2. **prototyping**:
   - Inherits: comparison-default, groups (basic), value-displays
   - "Uses different grouping blueprint (groups instead of groups-advanced)"

3. **project-management**:
   - Inherits: only value-displays
   - "Custom criteria, but uses shared emoji displays"

**Explain:**
> "The manifest is the registry. Each dataset declares what it inherits. This gives maximum flexibility."

**Tip the Audience:**
> "You can mix and match - inherit everything, inherit partially, or go fully custom."

---

### STEP 4: Show Dataset Override (60 seconds)

**Say:**
> "Datasets can override anything they inherit. Let me show you an example."

**Do:**

**Open:** `datasets/code-editor/config/comparison.yml`

**Show:**
```yaml
# This dataset inherits comparison-default.yml
# But we can override specific criteria

criteria:
  # Add a new criterion (not in shared)
  - name: "Subagents"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "label"

  # Or override an existing one
  - name: "Version"
    searchable: false    # Changed from true in shared
    showInTable: true
    showInDetails: false # Changed from true in shared
    type: "text"
```

**Explain:**
- "This dataset adds 'Subagents' - not in the shared config"
- "It also modifies the 'Version' criterion - hiding it from details"
- "The shared criteria are still there, plus these additions/changes"

**Tip the Audience:**
> "Inherit the base, customize what you need. Best of both worlds."

---

### STEP 5: Demonstrate Propagation (90 seconds)

**Say:**
> "Now let me show you the real power. If I change the shared config, it affects all datasets that inherit it. Watch this."

**Do:**

**Step 1: Show Current State**

In browser:
1. Open **Tab 1**: code-editor comparison
2. Open **Tab 2**: prototyping comparison
3. Point out that both have "Rating" criterion visible in table

**Step 2: Make a Change**

**Edit:** `configuration/comparison-default.yml`

**Find the Rating criterion and change:**
```yaml
- name: "Rating"
  searchable: false
  showInTable: false    # Changed from true
  showInDetails: true
  type: "rating"
```

**Save the file**

**Step 3: Rebuild and Refresh**

Terminal:
```bash
npm run prepare-data
```

Browser:
- Refresh Tab 1 (code-editor)
- Refresh Tab 2 (prototyping)

**Step 4: Show the Result**

Point out:
- "Rating column is now HIDDEN in both datasets"
- "One change, multiple datasets affected"
- "Still visible in detail view (showInDetails: true)"

**Tip the Audience:**
> "This is the power of inheritance. Change once, apply everywhere. Consistent experience across all comparisons."

---

### STEP 6: Visualize the Hierarchy (45 seconds)

**Say:**
> "Let me visualize how this inheritance works."

**Do:**

**Draw or show diagram:**

```
┌─────────────────────────────────────┐
│   comparison-default.yml            │
│   (30+ criteria definitions)        │
│   ✓ Rating, Version, License, etc.  │
└──────────────┬──────────────────────┘
               ↓ inherits
┌─────────────────────────────────────┐
│   groups-advanced.yml               │
│   (grouping blueprint)              │
│   ✓ How to organize criteria        │
└──────────────┬──────────────────────┘
               ↓ inherits
┌─────────────────────────────────────┐
│   datasets/code-editor/config/      │
│   comparison.yml                    │
│   + Adds: Subagents                 │
│   ~ Overrides: Version settings     │
└─────────────────────────────────────┘
               ↓
         FINAL RESULT
    30+ shared criteria
    + 1 custom (Subagents)
    ~ 1 override (Version)
```

**Explain:**
- "Level 1: Shared defaults - the base"
- "Level 2: Blueprints - organization patterns"
- "Level 3: Dataset-specific - additions and overrides"
- "Result: Efficient, DRY, flexible"

---

### STEP 7: Show Value Display Inheritance (30 seconds)

**Say:**
> "Inheritance also works for visual displays. Let me show you the emoji mappings."

**Do:**

**Open:** `configuration/defaults/value-displays.yml`

**Show:**
```yaml
valueDisplays:
  "Yes":
    emoji: "✅"
    html: "<span class='yes'>Yes</span>"

  "No":
    emoji: "❌"
    html: "<span class='no'>No</span>"

  "Partial":
    emoji: "⚠️"
    html: "<span class='partial'>Partial</span>"
```

**In browser, navigate between datasets:**
1. code-editor - see "Yes" = ✅
2. prototyping - see "Yes" = ✅
3. project-management - see "Yes" = ✅

**Explain:**
> "All three datasets inherit the same value displays. Consistent visual language across the entire system."

---

### CONCLUSION (20 seconds)

**Say:**
> "And that's configuration inheritance! It's what allows us to:
> - Define criteria once, use everywhere
> - Maintain consistency across datasets
> - Allow customization where needed
> - Keep the system DRY (Don't Repeat Yourself)
> - Scale to dozens of datasets without duplication
>
> It's the secret sauce that makes managing multiple comparisons practical."

**Do:**
- Return to the manifest file
- Show the list of 7 datasets
- Emphasize the shared configuration they all use

---

## Key Talking Points

### During the Demo, Emphasize:

1. **DRY Principle**: "Define once, use everywhere"

2. **Flexibility**: "Inherit what you want, override what you need"

3. **Scalability**: "As we add more datasets, we don't duplicate config"

4. **Consistency**: "Users get familiar patterns across all comparisons"

5. **Maintainability**: "Fix a bug once, it's fixed everywhere"

---

## Handling Common Questions

### Q: "What if I want to remove an inherited criterion?"
**A:** "You can override it with `showInTable: false` and `showInDetails: false` to hide it, or not include it in your dataset's groups."

### Q: "Can I inherit from multiple sources?"
**A:** "Yes! The manifest lets you specify different sources for groups, value displays, and criteria. They all merge together."

### Q: "What happens if there's a conflict?"
**A:** "Last one wins. Dataset-specific config always overrides blueprints, which override defaults."

### Q: "Can I create my own blueprint?"
**A:** "Absolutely! Just add a new YAML file in configuration/defaults/ and reference it in the manifest."

---

## Troubleshooting During Demo

### Issue: Changes Don't Propagate
- **Fix**: Run `npm run prepare-data` and hard refresh browser
- **Say**: "Let me rebuild the data to pick up the changes..."

### Issue: Override Doesn't Work
- **Fix**: Check criterion name matches exactly (case-sensitive)
- **Say**: "Ah, names need to match exactly - let me verify..."

### Issue: Manifest Syntax Error
- **Fix**: Validate JSON syntax
- **Say**: "Let me check for a syntax error in the JSON..."

---

## Variations for Different Audiences

### For Technical Audiences
- Show the actual file merging logic
- Discuss object spread operators
- Mention potential for CI/CD validation
- Compare to CSS cascade or prototype chains

### For Non-Technical Audiences
- Use analogy: "Like templates in Word or themes in PowerPoint"
- Focus on the end result, not the mechanics
- Emphasize time saved

### For Decision Makers
- Focus on maintainability ROI
- Emphasize consistency across organization
- Show scaling potential (10, 20, 50 datasets)
- Discuss governance benefits

---

## Practice Checklist

Before presenting:

- [ ] Have all files open and ready
- [ ] Know exactly which files to show and when
- [ ] Practice the change-and-refresh sequence
- [ ] Verify inheritance is working
- [ ] Prepare the visual diagram
- [ ] Time yourself (5 minutes)

---

## Post-Demo Actions

1. **Deeper Dive**: "Want to see the BLUEPRINT.md doc? It has detailed technical explanation."

2. **Hands-On**: "Try making a change yourself and see it propagate."

3. **Connect to Tutorials**: "Tutorial Track C covers this in depth with practice exercises."

4. **Discuss Workflows**: "In production, you'd version control these changes and review them like code."

---

## Success Metrics

Demo is successful if:

- ✅ Completed in 5 minutes
- ✅ Clear understanding of three tiers
- ✅ "Aha moment" when change propagates
- ✅ Questions focus on "how can I use this" not "how does it work"
- ✅ Recognition of the DRY benefit

---

## Advanced Topics (If Time Allows)

### Topic: Known Blueprint Bug
**Mention:**
> "There's a documented bug in BLUEPRINT.md about group resolution in some edge cases. We're working on a fix, but it's rare enough not to affect most use cases."

### Topic: Validation
**Show:**
> "You can add JSON Schema validation to catch errors before deployment."

### Topic: Automation
**Discuss:**
> "You could auto-generate datasets from spreadsheets using the inheritance system as a template."

---

## Visual Diagram (Draw or Display)

```
INHERITANCE FLOW
════════════════

Layer 1: SHARED DEFAULT
┌────────────────────────┐
│ comparison-default.yml │
│ • 30+ base criteria    │
│ • Common to all tools  │
└───────────┬────────────┘
            │
            ↓ inherits

Layer 2: BLUEPRINT
┌────────────────────────┐
│ groups-advanced.yml    │
│ • Organization pattern │
│ • Criteria grouping    │
└───────────┬────────────┘
            │
            ↓ inherits

Layer 3: DATASET SPECIFIC
┌────────────────────────┐
│ datasets/*/config/     │
│ comparison.yml         │
│ + Add custom criteria  │
│ ~ Override inherited   │
└───────────┬────────────┘
            │
            ↓ produces

FINAL COMPILED CONFIG
┌────────────────────────┐
│ Used by application    │
│ • All criteria merged  │
│ • Overrides applied    │
│ • Ready to display     │
└────────────────────────┘


INHERITANCE MAPPING (Manifest)
═══════════════════════════════

datasets.manifest.json controls:

┌─────────────┬──────────────┬────────────┬──────────────┐
│ Dataset     │ Criteria     │ Groups     │ Displays     │
├─────────────┼──────────────┼────────────┼──────────────┤
│ code-editor │ ✅ default   │ ✅ advanced│ ✅ shared    │
│ prototyping │ ✅ default   │ ✅ basic   │ ✅ shared    │
│ pm-tools    │ ❌ custom    │ ❌ custom  │ ✅ shared    │
└─────────────┴──────────────┴────────────┴──────────────┘

Legend:
✅ = Inherits from shared
❌ = Defines its own
```

---

## Quick Reference

**Timeline:**
- 0:00-0:30 - Introduction to inheritance
- 0:30-1:30 - Show shared configuration
- 1:30-2:15 - Show blueprint configuration
- 2:15-3:45 - Explain manifest mappings
- 3:45-4:45 - Demonstrate dataset overrides
- 4:45-5:00 - Conclusion

**Key Files:**
1. `configuration/comparison-default.yml`
2. `configuration/defaults/groups-advanced.yml`
3. `configuration/datasets.manifest.json`
4. `datasets/code-editor/config/comparison.yml`

**Key Concepts:**
- Three-tier inheritance
- Manifest-driven mapping
- Override mechanism
- DRY principle

**Key Message:**
> "Inheritance lets us maintain 7 datasets with minimal duplication - define once, use everywhere, customize where needed."
