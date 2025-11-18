---
title: "Standardize Format for Unknown/Missing Values"
labels: data-quality, template-improvement
assignees:
---

## Issue #18: Standardize Format for Unknown/Missing Values

**Files:** Multiple
**Severity:** Low - Consistency
**Priority:** P7

### Description

Inconsistent formats for unknown or missing values:
- Some use `-`
- Some use `N/A`
- Some use `Unknown`
- Some use `Not publicly documented`
- Some leave blank

### Action Required

- [ ] Define standard format in template for unknown values
- [ ] Recommendation: Use "Unknown" for Yes/No fields, with explanation if needed
- [ ] Update all files to use consistent format
- [ ] Document in template/CONTRIBUTING guide

### Files to Update

- All files in `datasets/code-agent/data/`
