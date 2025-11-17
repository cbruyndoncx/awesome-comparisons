---
title: "Fix Contradictory LocalOffline Answer in CodeRabbit"
labels: data-quality, research-needed
assignees:
---

## Issue #4: Fix Contradictory LocalOffline Answer in CodeRabbit

**File:** `datasets/code-agent/data/coderabbit.md`
**Severity:** High - Contradictory Data
**Priority:** P2

### Description

Lines 90-92: States LocalOffline is "No" but mentions "self-hosted option is referenced by the vendor"

If self-hosted is available, answer should be "Yes (Enterprise self-hosted option available)"

### Action Required

- [ ] Research CodeRabbit's actual self-hosted/on-premise offerings
- [ ] Update LocalOffline field to accurately reflect availability
- [ ] Ensure Yes/No answer matches the explanation

### Files to Update

- `datasets/code-agent/data/coderabbit.md` (Lines 90-92)
