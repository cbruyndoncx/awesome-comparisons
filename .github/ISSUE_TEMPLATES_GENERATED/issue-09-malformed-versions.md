---
title: "Fix Malformed Version Numbers"
labels: data-quality, good-first-issue
assignees:
---

## Issue #9: Fix Malformed Version Numbers

**Files:** devika-ai.md, openhands.md, diffblue_cover.md
**Severity:** Medium - Data Quality
**Priority:** P4

### Description

Several files have malformed version numbers:
- devika-ai.md (Line 11): `v (2025-10-19)` - missing actual version number
- openhands.md (Line 11): `v (2025-10-19)` - missing actual version number
- diffblue_cover.md (Line 11): `vN/A (2025-10-19)` - inconsistent format

### Action Required

- [ ] Research actual version numbers for each tool
- [ ] Use consistent format for unknown versions: "Unknown" or "N/A" (not "v ")
- [ ] Document version number policy in template

### Files to Update

- `datasets/code-agent/data/devika-ai.md` (Line 11)
- `datasets/code-agent/data/openhands.md` (Line 11)
- `datasets/code-agent/data/diffblue_cover.md` (Line 11)
