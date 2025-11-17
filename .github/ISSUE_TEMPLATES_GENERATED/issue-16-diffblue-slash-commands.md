---
title: "Fix CLI vs Slash Command Confusion in Diffblue Cover"
labels: data-quality, template-improvement
assignees:
---

## Issue #16: Fix CLI vs Slash Command Confusion in Diffblue Cover

**File:** `datasets/code-agent/data/diffblue_cover.md`
**Severity:** Medium - Conceptual Error
**Priority:** P6

### Description

- Lines 113-114: States SlashCommands is "Yes" but explains "CLI subcommands"
- CLI subcommands (`dcover test`) are NOT the same as slash commands in agent/chat context (`/review`)
- Conflates two different concepts

### Action Required

- [ ] Clarify definition of "SlashCommands" in template (chat interface commands)
- [ ] Update answer to "No - provides CLI commands but not chat-style slash commands"
- [ ] Ensure template is clear about the distinction

### Files to Update

- `datasets/code-agent/data/diffblue_cover.md` (Lines 113-114)
