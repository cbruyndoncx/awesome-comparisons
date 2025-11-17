---
title: "Fix MCP/Tessl Confusion in Smol Developer"
labels: data-quality, critical
assignees:
---

## Issue #2: Fix MCP/Tessl Confusion in Smol Developer

**File:** `datasets/code-agent/data/smol-developer.md`
**Severity:** Critical - Fundamental Misunderstanding
**Priority:** P1

### Description

Lines 58-59 state: "does not include a built-in MCP (Tessl) client"

This conflates two completely different technologies:
- **MCP** = Model Context Protocol (by Anthropic) for tool integration
- **Tessl** = Separate spec-driven development framework

This shows fundamental misunderstanding of what MCP is.

### Action Required

- [ ] Correct MCP-Client field with accurate information about MCP support
- [ ] Remove any references to Tessl in MCP context
- [ ] Research if smol-developer actually supports MCP protocol

### Files to Update

- `datasets/code-agent/data/smol-developer.md` (Lines 58-59)
