# Product-Prototyping Dataset Review - Issue Proposal

**Date:** 2025-11-17
**Dataset:** datasets/product-prototyping/data/
**Files Reviewed:** 9 files
**Issues Found:** 24 issues

## Executive Summary

Critical review of the product-prototyping dataset revealed 24 data quality issues across 9 files:

- **6 Critical Issues**: Template text not filled in, missing core metadata, contradictory data
- **10 High Issues**: Malformed/missing versions, empty critical fields, formatting problems
- **6 Medium Issues**: Suspicious dates, incomplete explanations, formatting inconsistencies
- **2 Low Issues**: Empty fields, minor formatting oddities

**Most Critical Findings**:
1. **wrapifai.md** contains extensive unfilled template text (bracketed questions instead of answers)
2. **codecompanionai.md** is missing version, rating, repo, and multiple extensibility fields
3. **replit-ghostwriter.md** has contradictory Yes/No entries in SlashCommands field
4. **6 files** have malformed or missing version numbers
5. **6 files** show identical suspicious batch update date (2025-11-15)

---

## Priority 1: Critical Data Quality Issues (6 issues)

### Issue 1: Complete wrapifai.md Template Fields
**File:** `datasets/product-prototyping/data/wrapifai.md`
**Severity:** Critical - Template Not Filled
**Description:**
Lines 90-140 contain unfilled template text instead of actual answers:
- Line 90: `"- [Explain avaiilable methods for managing and updating the context]"` (also misspelled "avaiilable")
- Line 98: `"- [Explain how files can be directly referenced in context.]"`
- Line 104: `"- [Is it possible to undo actions taken by the agent by using checkpoints...]"`
- Line 118: `"- [Is there a method of bundling together commands, agents and hooks?...]"`
- Line 123: `"- [Are there any lifecycle events for the agent generated...]"`
- Line 129: `"- [Is there support for re-usable commands...]"`
- Line 133: `"- [Can the user create specialist modes...]"`
- Line 138: `"- [Is it possible to define specialized AI subagents...]"`

These are copy-pasted template instructions, not actual content.

**Action Required:**
- Research WrapifAI's actual capabilities for each field
- Replace all bracketed template questions with proper Yes/No/Other answers and substantive explanations
- Fix spelling: "avaiilable" → "available"

---

### Issue 2: Fix codecompanionai.md Missing Version
**File:** `datasets/product-prototyping/data/codecompanionai.md`
**Severity:** Critical - Missing Core Metadata
**Description:**
- Lines 10-11: Version field contains only a dash "-" with no version number
- This is core metadata that should always be present

**Action Required:**
- Research CodeCompanion.ai's current version
- Add proper version like `v1.2.0 (2025-10-19)` or mark as `Unknown` with explanation

---

### Issue 3: Fix codecompanionai.md Missing Rating
**File:** `datasets/product-prototyping/data/codecompanionai.md`
**Severity:** Critical - Missing Core Metadata
**Description:**
- Lines 18-19: Rating field is empty (just a dash)
- All other files have ratings or "N/A"

**Action Required:**
- Add rating with [1-5] scores and explanations
- Or explicitly mark as "No rating available" if assessment not possible

---

### Issue 4: Fix Contradictory SlashCommands in replit-ghostwriter.md
**File:** `datasets/product-prototyping/data/replit-ghostwriter.md`
**Severity:** Critical - Contradictory Data
**Description:**
Lines 123-126 have BOTH "Yes" with explanation AND "No":
```
123: ### SlashCommands
124:   - Yes
125:     - Within the Replit IDE chat/command palette, Ghostwriter supports...
126: - No
```
This is a direct contradiction making data unusable.

**Action Required:**
- Remove the standalone "No" on Line 126
- Keep "Yes" with the explanation about informal command support

---

### Issue 5: Complete codecompanionai.md Empty Extensibility Fields
**File:** `datasets/product-prototyping/data/codecompanionai.md`
**Severity:** Critical - Multiple Missing Fields
**Description:**
Lines 99-122 have multiple empty fields:
- Lines 99-101: Plugins (blank)
- Lines 102-104: Hooks (blank)
- Lines 105-107: SlashCommands (blank)
- Lines 108-110: CustomModes (blank)
- Lines 120-122: SpecDrivenDevelopment (blank/dash only)

**Action Required:**
- Research CodeCompanion.ai's extensibility features
- Fill all fields with proper Yes/No/Other answers and explanations

---

### Issue 6: Fix codecompanionai.md Missing Repo Field
**File:** `datasets/product-prototyping/data/codecompanionai.md`
**Severity:** Critical - Unclear Metadata
**Description:**
- Lines 14-15: Repo field contains only a dash "-"
- For proprietary products, "N/A" with explanation is expected

**Action Required:**
- Change from bare dash to `N/A - Proprietary product` or add GitHub repo if available

---

## Priority 2: Malformed Version Numbers (6 issues)

### Issue 7: Fix appdotbuild.md Malformed Version Date
**File:** `datasets/product-prototyping/data/appdotbuild.md`
**Severity:** High - Malformed Metadata
**Description:**
- Line 10: Version is `v1.31.3 (2025-07-??)`
- Contains "??" instead of actual date - incomplete/unprofessional

**Action Required:**
- Change to `v1.31.3 (2025-07-15)` with actual day
- Or use `v1.31.3 (2025-07)` without day if exact date unknown

---

### Issue 8: Fix codewp.md Malformed Version
**File:** `datasets/product-prototyping/data/codewp.md`
**Severity:** High - Missing Version
**Description:**
- Line 10: Version is `N/A (2025-10-19)`
- Shows date but no actual version number

**Action Required:**
- Research actual version number
- Change to `v2.5 (2025-10-19)` or `Unknown (2025-10-19)` with note

---

### Issue 9: Fix replit-ghostwriter.md Malformed Version
**File:** `datasets/product-prototyping/data/replit-ghostwriter.md`
**Severity:** High - Malformed Syntax
**Description:**
- Line 10: Version is `vN/A (2025-10-19)`
- "vN/A" is odd formatting

**Action Required:**
- Change to `Unknown (2025-10-19)` or `N/A`

---

### Issue 10: Fix tooljet.md Incomplete Version
**File:** `datasets/product-prototyping/data/tooljet.md`
**Severity:** High - Incomplete Version
**Description:**
- Line 10: Version is `v (2025-10-19)`
- Just "v" with no number following it

**Action Required:**
- Research actual version
- Change to `v2.0.0 (2025-10-19)` or proper version number

---

### Issue 11: Fix v0.md Missing Version Number
**File:** `datasets/product-prototyping/data/v0.md`
**Severity:** High - Missing Version
**Description:**
- Line 10: Version is just `(2025-10-18)`
- Contains only date, no version number at all

**Action Required:**
- Change to `Unknown (2025-10-18)` or research proper version like `v1.2.0 (2025-10-18)`

---

### Issue 12: Fix boltnew.md Empty SpecDrivenDevelopment
**File:** `datasets/product-prototyping/data/boltnew.md`
**Severity:** High - Missing Field
**Description:**
- Line 135: SpecDrivenDevelopment field is completely empty
- File appears to end abruptly with "### End of file" marker on Line 137

**Action Required:**
- Add `- No` with explanation about Bolt.new not being a spec-driven framework
- Remove "### End of file" marker (unusual formatting)

---

## Priority 3: Empty/Incomplete Fields (3 issues)

### Issue 13: Complete codewp.md Empty Fields
**File:** `datasets/product-prototyping/data/codewp.md`
**Severity:** Medium - Multiple Incomplete Fields
**Description:**
Multiple fields contain only blank lines or dashes:
- Lines 108-109: DirectFileReferences (blank)
- Lines 110-113: Checkpoints (blank)
- Lines 123-129: SlashCommands (blank)
- Lines 132-133: CustomModes (blank)

**Action Required:**
- Research CodeWP's capabilities
- Fill all fields with proper Yes/No/Other answers and explanations

---

### Issue 14: Remove appdotbuild.md Trailing Dashes
**File:** `datasets/product-prototyping/data/appdotbuild.md`
**Severity:** Medium - Formatting Artifacts
**Description:**
- Line 22: Lone dash "-" after Short Description
- Line 47: Lone dash "-" in Last Update section
- Formatting artifacts from template

**Action Required:**
- Remove these trailing dashes
- Clean up formatting

---

### Issue 15: Fix v0.md Empty SpecDrivenDevelopment
**File:** `datasets/product-prototyping/data/v0.md`
**Severity:** Medium - Empty Field
**Description:**
- Lines 160-162: SpecDrivenDevelopment section is completely empty

**Action Required:**
- Add `- No` with brief explanation about v0 not being a spec-driven framework

---

## Priority 4: Malformed SpecDrivenDevelopment Fields (3 issues)

### Issue 16: Fix codewp.md Malformed SpecDrivenDevelopment
**File:** `datasets/product-prototyping/data/codewp.md`
**Severity:** High - Confusing Format
**Description:**
Lines 143-154 list unsupported options as bullets instead of clear answer:
```
143: ### SpecDrivenDevelopment
144: -
145:   - BMAD
146:   - SpecKit
...
154:   - Note: CodeWP is not primarily a spec-driven development tool...
```

**Action Required:**
- Restructure to standard format:
```
### SpecDrivenDevelopment
- No
  - CodeWP is not primarily a spec-driven development framework...
```

---

### Issue 17: Fix tooljet.md Malformed SpecDrivenDevelopment
**File:** `datasets/product-prototyping/data/tooljet.md`
**Severity:** Medium - Confusing Format
**Description:**
Lines 166-174 list options without primary answer first:
```
165: ### SpecDrivenDevelopment
166: - BMAD
167: - SpecKit
...
174: - Other
175:   - ToolJet does not natively implement...
```

**Action Required:**
- Restructure to:
```
### SpecDrivenDevelopment
- Other
  - ToolJet does not natively implement a specific spec-driven development framework...
```

---

### Issue 18: Fix wrapifai.md Malformed SpecDrivenDevelopment
**File:** `datasets/product-prototyping/data/wrapifai.md`
**Severity:** Medium - Incomplete Format
**Description:**
Lines 147-157 list all options as bullets, ending with "Other" but no explanation:
```
147: ### SpecDrivenDevelopment
148: - BMAD
...
156: - Other
157:   -
```
Line 157 is just a dash with no content.

**Action Required:**
- Restructure to:
```
### SpecDrivenDevelopment
- Other
  - Wrapifai is not a spec-driven development framework...
```

---

## Priority 5: Suspicious Batch Update Dates (1 issue affecting 6 files)

### Issue 19: Clarify Batch Update Dates
**Files:**
- bolt-diy.md (Line 40)
- codecompanionai.md (Line 38)
- codewp.md (Line 56)
- replit-ghostwriter.md (Line 49)
- tooljet.md (Line 72)
- v0.md (Line 67)

**Severity:** Medium - Metadata Confusion
**Description:**
All 6 files show identical "Last Update: 2025-11-15" date (2 days ago), suggesting batch documentation update rather than product releases. This pattern indicates:
- bolt-diy version from 2025-10-19 but "updated" 2025-11-15
- codewp version from 2025-10-19 but "updated" 2025-11-15
- Discrepancy between version dates and update dates

**Action Required:**
- Clarify whether "Last Update" refers to documentation update vs product release
- Consider adding separate fields for each
- Or add notes explaining the discrepancy
- Or change to actual product release dates

---

## Priority 6: Minor Issues (5 issues)

### Issue 20: Add bolt-diy.md FreeTrial Explanation
**File:** `datasets/product-prototyping/data/bolt-diy.md`
**Severity:** Low - Missing Context
**Description:**
- Line 51: FreeTrial shows "Yes" but provides no explanation

**Action Required:**
- Add explanation:
```
### FreeTrial
- Yes
  - Open-source project - freely available, no time-limited trial
```

---

### Issue 21: Fix wrapifai.md Trailing Dash
**File:** `datasets/product-prototyping/data/wrapifai.md`
**Severity:** Low - Formatting Oddity
**Description:**
- Lines 40-41: Trailing dash after Last Update date
```
39: ### Last Update
40: 2025-10-19
41: -
```

**Action Required:**
- Remove trailing dash, change to:
```
### Last Update
- 2025-10-19
```

---

### Issue 22: Clarify codecompanionai.md FreeTrial Semantics
**File:** `datasets/product-prototyping/data/codecompanionai.md`
**Severity:** Low - Semantic Confusion
**Description:**
Lines 50-52 say "FreeTrial: Yes" but product requires BYOK (user's own OpenAI API key). The "free" aspect comes from BYOK, not from a product trial.

**Action Required:**
- Consider clearer wording:
```
### FreeTrial
- Other/BYOK
  - Requires user's own OpenAI API key; no product-provided trial, but usage cost depends on user's OpenAI quota
```

---

### Issue 23: Standardize Version Field Format Consistency
**Files:** Multiple files
**Severity:** Low - Consistency
**Description:**
Version field formats are inconsistent across files:
- Some use `vX.Y.Z (YYYY-MM-DD)` format
- Some use `(YYYY-MM-DD)` only
- Some use `N/A (YYYY-MM-DD)`
- Some use `vN/A (YYYY-MM-DD)`
- Some use `v (YYYY-MM-DD)`

**Action Required:**
- Establish standard format convention
- Apply consistently across all files
- Suggested: `vX.Y.Z (YYYY-MM-DD)` or `Unknown (YYYY-MM-DD)` if version unavailable

---

### Issue 24: Remove boltnew.md "End of file" Marker
**File:** `datasets/product-prototyping/data/boltnew.md`
**Severity:** Low - Structural Oddity
**Description:**
- Line 137: File ends with "### End of file" comment
- Unusual formatting suggesting editing artifact or incomplete file

**Action Required:**
- Remove explicit "End of file" marker
- File should end naturally after last field content

---

## Summary by Priority

**Priority 1 (Critical - 6 issues):**
- Issue #1: wrapifai.md unfilled template text (Lines 90-140)
- Issue #2: codecompanionai.md missing version (Line 10)
- Issue #3: codecompanionai.md missing rating (Line 18)
- Issue #4: replit-ghostwriter.md contradictory SlashCommands (Lines 123-126)
- Issue #5: codecompanionai.md empty extensibility fields (Lines 99-122)
- Issue #6: codecompanionai.md missing repo (Line 14)

**Priority 2 (High - 6 issues):**
- Issue #7: appdotbuild.md malformed version date (Line 10)
- Issue #8: codewp.md malformed version (Line 10)
- Issue #9: replit-ghostwriter.md malformed version (Line 10)
- Issue #10: tooljet.md incomplete version (Line 10)
- Issue #11: v0.md missing version (Line 10)
- Issue #12: boltnew.md empty SpecDrivenDevelopment (Line 135)

**Priority 3 (Medium - 3 issues):**
- Issue #13: codewp.md empty fields (Lines 108-133)
- Issue #14: appdotbuild.md trailing dashes (Lines 22, 47)
- Issue #15: v0.md empty SpecDrivenDevelopment (Lines 160-162)

**Priority 4 (Medium - 3 issues):**
- Issue #16: codewp.md malformed SpecDrivenDevelopment (Lines 143-154)
- Issue #17: tooljet.md malformed SpecDrivenDevelopment (Lines 166-174)
- Issue #18: wrapifai.md malformed SpecDrivenDevelopment (Lines 147-157)

**Priority 5 (Medium - 1 issue affecting 6 files):**
- Issue #19: Suspicious batch update dates (2025-11-15)

**Priority 6 (Low - 5 issues):**
- Issue #20: bolt-diy.md FreeTrial missing explanation (Line 51)
- Issue #21: wrapifai.md trailing dash (Line 41)
- Issue #22: codecompanionai.md FreeTrial semantic confusion (Lines 50-52)
- Issue #23: Version field format inconsistency (multiple files)
- Issue #24: boltnew.md "End of file" marker (Line 137)

---

## Recommended Fix Order

1. **IMMEDIATE**: Fix Priority 1 critical issues (wrapifai.md template text, codecompanionai.md missing data, contradictory entries)
2. Fix Priority 2 malformed versions (6 files)
3. Fix Priority 3-4 empty fields and malformed SpecDrivenDevelopment (6 issues)
4. Address Priority 5 batch date clarification (6 files)
5. Clean up Priority 6 minor issues (5 issues)

---

## Key Patterns Identified

1. **Version field quality is poor**: 6 of 9 files have malformed, incomplete, or missing versions
2. **Template completion failure**: wrapifai.md contains extensive unfilled template text
3. **SpecDrivenDevelopment format problems**: 4 files have confusing/non-standard formats
4. **Suspicious batch update**: 6 files show identical 2025-11-15 dates suggesting documentation update
5. **codecompanionai.md severely incomplete**: Missing version, rating, repo, and 5 extensibility fields

---

**Total Issues: 24 across 9 files**
**Critical: 6 | High: 6 | Medium: 7 | Low: 5**
