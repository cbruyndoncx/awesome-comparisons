---
title: "Fix Repository vs Website Confusion in AMP"
labels: data-quality, good-first-issue
assignees:
---

## Issue #15: Fix Repository vs Website Confusion in AMP

**File:** `datasets/code-agent/data/amp.md`
**Severity:** Low - Minor Error
**Priority:** P6

### Description

- Line 14: Lists `https://ampcode.com` as repository
- This is the product website, not a code repository
- Actual repositories listed are demo/example repos

### Action Required

- [ ] Remove product website from repository field
- [ ] Either list actual GitHub repos only or state "Proprietary - no main public repo"
- [ ] Clarify which repos are official vs examples/demos

### Files to Update

- `datasets/code-agent/data/amp.md` (Line 14)
