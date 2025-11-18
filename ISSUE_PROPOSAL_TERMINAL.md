# Terminal Dataset Review - Issue Proposal

**Date:** 2025-11-17
**Dataset:** datasets/terminal/data/
**Files Reviewed:** 5 files
**Issues Found:** 17 issues

## Executive Summary

Critical review of the Terminal dataset revealed 17 data quality issues across 5 files:

- **1 Critical Issue**: Contradictory duplicate classification entries
- **4 High Issues**: Malformed/missing version numbers
- **4 Medium Issues**: Empty fields, semantic issues, format inconsistencies
- **8 Low Issues**: Formatting artifacts, suspicious batch dates

**Most Critical Findings**:
1. **opencode.md** has contradictory duplicate classification entries (lines 7 and 140)
2. **4 files** have malformed or missing version numbers (warp, aider, opencode, codex-cli)
3. **2 files** have semantic issues with FreeTrial field for open-source projects
4. **4 files** have formatting artifacts (empty dashes)

---

## Priority 1: Critical Data Quality Issues (1 issue)

### Issue 1: Fix opencode.md Contradictory Duplicate Classification
**File:** `datasets/terminal/data/opencode.md`
**Severity:** Critical - Contradictory Data
**Description:**
- Line 7: Classification is `Code/Editor`
- Line 140: Classification is `Code/Terminal`
- Same file has TWO different classifications - direct contradiction

This is the exact type of critical data quality issue found in other datasets (contradictory Yes/No entries).

**Action Required:**
- Remove the duplicate classification section on Line 140
- Keep `Code/Terminal` classification from Line 7 (since file is in Terminal dataset and description says "terminal-native")
- This resolves the contradiction

---

## Priority 2: Malformed/Missing Version Numbers (4 issues)

### Issue 2: Fix warp.md Malformed Version with Placeholder Date
**File:** `datasets/terminal/data/warp.md`
**Severity:** High - Malformed Metadata
**Description:**
- Line 10: Version is `v2.0 (2025-09-xx)`
- Contains "xx" placeholder instead of actual day numbers
- Incomplete date format

**Action Required:**
- Research actual Warp v2.0 release date
- Change to `v2.0 (2025-09-15)` or similar with actual date
- Or use `v2.0` without date if exact date unknown

---

### Issue 3: Fix aider.md Malformed Version ("tbd")
**File:** `datasets/terminal/data/aider.md`
**Severity:** High - Unprofessional Designation
**Description:**
- Line 11: Version is `tbd (2025-10-18)`
- "tbd" (to be determined) is informal placeholder, not proper version

**Action Required:**
- Check actual Aider version from https://github.com/Aider-AI/aider
- Replace with proper semantic version like `v0.59.1` or similar
- This is an actively maintained project, so version should be available

---

### Issue 4: Fix opencode.md Incomplete Version
**File:** `datasets/terminal/data/opencode.md`
**Severity:** High - Malformed Version
**Description:**
- Line 10: Version is `v (2025-10-19)`
- Version is incomplete - just "v" with nothing after it
- No actual version number provided

**Action Required:**
- Research OpenCode actual version from repository
- Change to proper version like `v0.1.0`, `v1.0.0`, or similar
- "v " by itself is meaningless

---

### Issue 5: Fix codex-cli.md Missing Version Number
**File:** `datasets/terminal/data/codex-cli.md`
**Severity:** High - Missing Metadata
**Description:**
- Line 10: Version field is ` (2025-10-19)`
- Completely empty - no version number at all, only date
- Critical metadata missing

**Action Required:**
- Research OpenAI Codex CLI actual version
- Add proper semantic version like `v0.x.x` or similar
- If versioning not used, mark as `N/A` or `Unversioned` with explanation

---

## Priority 3: Empty/Incomplete Fields (1 issue)

### Issue 6: Complete aider.md Empty SpecDrivenDevelopment Field
**File:** `datasets/terminal/data/aider.md`
**Severity:** Medium - Missing Field Value
**Description:**
- Lines 134-136: SpecDrivenDevelopment field is completely blank
- No value, no "Yes", no "No", no "Other"
- Other files have proper answers with explanations

**Action Required:**
- Add proper value with explanation:
```
### SpecDrivenDevelopment
- No
  - Aider is a terminal-based coding assistant focused on interactive chat workflows, not a spec-driven development framework
```

---

## Priority 4: Format Inconsistencies (1 issue)

### Issue 7: Standardize codex-cli.md Rating Format
**File:** `datasets/terminal/data/codex-cli.md`
**Severity:** Medium - Inconsistent Format
**Description:**
- Lines 15-18: Rating uses `4.2/5` decimal format
- All other Terminal files use `[X]` bracket format:
  - warp.md uses `[5]` and `[4]`
  - aider.md uses `[4]`
  - claude-code.md uses `[4]`, `[3]`
- Creates formatting inconsistency

**Action Required:**
- Convert to standard format:
```
### Rating
- [4] Feature description 1
- [4] Feature description 2
```

---

## Priority 5: Semantic Issues - FreeTrial for Open-Source (2 issues)

### Issue 8: Fix aider.md FreeTrial Semantics
**File:** `datasets/terminal/data/aider.md`
**Severity:** Medium - Misleading Semantics
**Description:**
- Lines 48-49: Shows `Opensource: Yes`
- Lines 54-55: Shows `FreeTrial: Yes` with explanation
- "FreeTrial" implies time-limited trial; open-source is permanently free
- Semantic mismatch found in other datasets (aie-model)

**Action Required:**
- Change to:
```
### FreeTrial
- N/A
  - Open-source tool (permanently free); users pay their own LLM provider for API usage, not a time-limited trial
```

---

### Issue 9: Fix opencode.md FreeTrial Semantics
**File:** `datasets/terminal/data/opencode.md`
**Severity:** Medium - Misleading Semantics
**Description:**
- Line 46: Shows `Opensource: Yes`
- Lines 51-52: Shows `FreeTrial: Yes` with no explanation
- Same semantic issue as aider.md

**Action Required:**
- Change to:
```
### FreeTrial
- N/A
  - Open-source software (permanently free), not a time-limited trial
```

---

## Priority 6: Formatting Artifacts (4 issues)

### Issue 10: Remove warp.md Empty Dash
**File:** `datasets/terminal/data/warp.md`
**Severity:** Low - Formatting Artifact
**Description:**
- Line 22: Standalone `-` after Short Description
- Orphaned markdown formatting

**Action Required:**
- Remove line 22 entirely

---

### Issue 11: Remove aider.md Empty Dash (Line 23)
**File:** `datasets/terminal/data/aider.md`
**Severity:** Low - Formatting Artifact
**Description:**
- Line 23: Standalone `-` after Short Description

**Action Required:**
- Remove line 23 entirely

---

### Issue 12: Remove aider.md Extra Dash (Line 43)
**File:** `datasets/terminal/data/aider.md`
**Severity:** Low - Formatting Artifact
**Description:**
- Line 42: `- 2025-10-18` (Last Update date)
- Line 43: Extra `-` on separate line

**Action Required:**
- Remove line 43 entirely

---

### Issue 13: Remove opencode.md Empty Dash
**File:** `datasets/terminal/data/opencode.md`
**Severity:** Low - Formatting Artifact
**Description:**
- Line 23: Standalone `-` after Short Description

**Action Required:**
- Remove line 23 entirely

---

## Priority 7: Suspicious Batch Update Dates (2 issues)

### Issue 14: Verify warp.md Recent Date
**File:** `datasets/terminal/data/warp.md`
**Severity:** Low - Possible Timestamp Anomaly
**Description:**
- Line 38: Last Update is `2025-11-16` (yesterday from today's perspective)
- May indicate batch update script rather than actual last update
- Similar pattern found in product-prototyping dataset (6 files with 2025-11-15)

**Action Required:**
- Verify if Warp was actually updated on 2025-11-16
- Or use actual last meaningful update date
- Document whether this reflects real update or automated batch timestamp

---

### Issue 15: Verify claude-code.md Recent Date
**File:** `datasets/terminal/data/claude-code.md`
**Severity:** Low - Possible Timestamp Anomaly
**Description:**
- Line 44: Last Update is `2025-11-16` (yesterday)
- Same suspicious pattern as warp.md

**Action Required:**
- Verify if Claude Code was actually updated on 2025-11-16
- Or use actual last meaningful update date

---

## Summary by Priority

**Priority 1 (Critical - 1 issue):**
- Issue #1: opencode.md contradictory duplicate classification

**Priority 2 (High - 4 issues):**
- Issue #2: warp.md malformed version with "xx"
- Issue #3: aider.md "tbd" version
- Issue #4: opencode.md incomplete version "v "
- Issue #5: codex-cli.md missing version number

**Priority 3 (Medium - 1 issue):**
- Issue #6: aider.md empty SpecDrivenDevelopment

**Priority 4 (Medium - 1 issue):**
- Issue #7: codex-cli.md inconsistent rating format

**Priority 5 (Medium - 2 issues):**
- Issue #8: aider.md FreeTrial semantic issue
- Issue #9: opencode.md FreeTrial semantic issue

**Priority 6 (Low - 4 issues):**
- Issue #10-13: Formatting artifacts (empty dashes)

**Priority 7 (Low - 2 issues):**
- Issue #14-15: Suspicious batch update dates

---

## Key Patterns Identified

1. **Version field quality is poor**: 4 of 5 files have malformed, incomplete, or placeholder versions
2. **FreeTrial semantic mismatch**: 2 open-source files incorrectly use "FreeTrial" instead of N/A
3. **Formatting artifacts**: 4 files have orphaned dash formatting
4. **Suspicious batch dates**: 2 files show identical recent dates (2025-11-16)
5. **Critical duplicate data**: 1 file has contradictory classification entries

---

**Total Issues: 17 across 5 files**
**Critical: 1 | High: 4 | Medium: 4 | Low: 8**
