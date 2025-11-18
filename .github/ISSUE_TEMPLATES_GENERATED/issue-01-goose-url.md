---
title: "Fix Incorrect URL for Codename Goose"
labels: data-quality, critical
assignees:
---

## Issue #1: Fix Incorrect URL for Codename Goose

**File:** `datasets/code-agent/data/codenamegoose.md`
**Severity:** Critical - Wrong Information
**Priority:** P1

### Description

Line 1 lists `https://goose.ai/` which is a completely different company (AI inference API service). Codename Goose is a Block/Square project at github.com/block/goose with no official goose.ai domain.

### Action Required

- [ ] Remove goose.ai URL
- [ ] Add correct project URL (likely github.com/block/goose or block.xyz)
- [ ] Verify official website/documentation URL

### Files to Update

- `datasets/code-agent/data/codenamegoose.md` (Line 1)
