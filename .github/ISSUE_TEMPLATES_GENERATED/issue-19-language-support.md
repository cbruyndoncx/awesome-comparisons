---
title: "Clarify Language Support Across Multiple Files"
labels: data-quality, research-needed
assignees:
---

## Issue #19: Clarify Language Support Across Multiple Files

**Files:** devin.md, devika-ai.md, codiumai.md, coderabbit.md
**Severity:** Medium - Incomplete/Unclear Data
**Priority:** P8

### Description

Several files have unclear or incomplete language support:
- devin.md (Lines 29-31): Only lists Python and JS/TS for a general-purpose tool
- devika-ai.md (Lines 31-33): Unclear if listing implementation languages vs supported languages
- codiumai.md (Lines 34-35): Likely incomplete list
- coderabbit.md (Lines 29-37): Vague "Other - Other common languages"

### Action Required

- [ ] Clarify template: "Languages the tool SUPPORTS for code generation/analysis"
- [ ] Research actual language support for each tool
- [ ] Use consistent format: either list all or state "Multi-language (50+ languages)" with link
- [ ] Avoid vague entries like "Other common languages"

### Files to Update

- `datasets/code-agent/data/devin.md` (Lines 29-31)
- `datasets/code-agent/data/devika-ai.md` (Lines 31-33)
- `datasets/code-agent/data/codiumai.md` (Lines 34-35)
- `datasets/code-agent/data/coderabbit.md` (Lines 29-37)
