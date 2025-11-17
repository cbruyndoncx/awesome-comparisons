---
title: "Review Classification Criteria and Reclassify Tools"
labels: data-quality, template-improvement
assignees:
---

## Issue #8: Review Classification Criteria and Reclassify Tools

**Files:** Multiple
**Severity:** Medium - Consistency
**Priority:** P3

### Description

Several tools are classified as "Code/Autonomous agent" when they are more specialized:
- `claude-desktop.md` (Line 8): General-purpose AI assistant, not primarily a code agent
- `diffblue_cover.md` (Line 8): Specialized Java unit test generator only
- `codiumai.md` (Line 8): Primarily test generation/QA tool with PR review

### Action Required

- [ ] Define clear classification criteria for "Code/Autonomous agent"
- [ ] Consider additional categories: "Test Generation Tool", "PR Review Tool", "AI Assistant with Coding"
- [ ] Reclassify tools to match their primary purpose
- [ ] Document classification criteria in a CONTRIBUTING or README file

### Files to Update

- `datasets/code-agent/data/claude-desktop.md` (Line 8)
- `datasets/code-agent/data/diffblue_cover.md` (Line 8)
- `datasets/code-agent/data/codiumai.md` (Line 8)
