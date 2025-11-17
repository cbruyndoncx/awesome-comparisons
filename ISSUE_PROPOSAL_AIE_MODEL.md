# GitHub Issues Proposal - AIE Model Review Findings

## Overview
This proposal outlines suggested GitHub issues to track corrections needed for the aie-model comparison files based on critical review findings.

---

## Priority 1: Critical Classification Errors (3 issues)

### Issue 1: Fix Misclassification of Kite (Coding Assistant, not Model)
**File:** `datasets/aie-model/data/kite.md`
**Severity:** Critical - Wrong Category
**Description:**
- Line 6-7: Classified as "AIE/Model"
- Kite was a desktop AI code-completion assistant/editor plugin, NOT a standalone model
- Line 1-2: "A desktop AI code-completion assistant"
- Line 28: "early AI-assisted coding tool... that provided context-aware code completions"
- Line 28: "Kite trained models" (it used models, it wasn't itself a model)

**Action Required:**
- Change classification from "AIE/Model" to "AIE/Agent" or "AIE/Tool"
- Kite was an editor integration/assistant product that used models, not a model itself

---

### Issue 2: Fix Misclassification of FauxPilot (Server Platform, not Model)
**File:** `datasets/aie-model/data/fauxpilot.md`
**Severity:** Critical - Wrong Category
**Description:**
- Line 6-7: Classified as "AIE/Model"
- FauxPilot is a server/platform that hosts models, not a model itself
- Line 1-2: "Open-source, locally-hosted code-completion server"
- Line 23: "FauxPilot is an open-source code-completion server"
- Line 29: "commonly used with Salesforce CodeGen models" (it uses models, it's not a model)

**Action Required:**
- Change classification from "AIE/Model" to "AIE/Infrastructure" or "AIE/Platform"
- FauxPilot is a hosting server for models, not a model itself

---

### Issue 3: Fix Misclassification of Codeium Enterprise (Service, not Model)
**File:** `datasets/aie-model/data/codeium_enterprise.md`
**Severity:** Critical - Wrong Category
**Description:**
- Line 6-7: Classified as "AIE/Model"
- Codeium Enterprise is an enterprise product/service, not a standalone model
- Line 1-2: "Secure, enterprise-grade AI coding assistant"
- Line 24: "Commercial enterprise edition of Codeium"
- Line 27: Describes "SaaS, self-hosted VPC, and fully air-gapped on-premises deployments"

**Action Required:**
- Change classification from "AIE/Model" to "AIE/Agent" or "AIE/Service/Enterprise"
- This is a commercial product offering, not just a model

---

## Priority 2: Data Quality Issues - Suspicious/Incorrect Dates (3 issues)

### Issue 4: Fix Suspicious Recent Date in PolyCoder
**File:** `datasets/aie-model/data/polycoder.md`
**Severity:** High - Data Quality
**Description:**
- Line 49: Last Update listed as "2025-11-16" (yesterday)
- Line 10: Version is "v2.7B (2022-03-01)" from March 2022
- Line 23: "published in early 2022"
- Line 46: "PolyCoder is a 2022-era model"
- This is a 3+ year old archived research project from 2022

**Action Required:**
- Verify the actual last update date from the repository
- If this is a documentation update date, clarify that
- Update to reflect actual last model/code update date (likely 2022)

---

### Issue 5: Fix Suspicious Recent Date in Kite
**File:** `datasets/aie-model/data/kite.md`
**Severity:** High - Data Quality
**Description:**
- Line 45: Last Update is "2025-11-16" (yesterday)
- Line 10: "Archived (2022-12-31)"
- Line 27-28: "Kite shut down operations in late 2022"
- Line 42: "As of 2025 the company is inactive"
- Company ceased operations in late 2022

**Action Required:**
- Update Last Update to reflect when company actually shut down (2022-12-31)
- Company is defunct; last update cannot be yesterday

---

### Issue 6: Verify Recent Date in Codeium Enterprise
**File:** `datasets/aie-model/data/codeium_enterprise.md`
**Severity:** Medium - Data Quality
**Description:**
- Line 45: Last Update is "2025-11-16" (yesterday)
- Same date as PolyCoder and Kite, suggesting batch template update
- Codeium Enterprise is active, but date seems suspiciously aligned with other files

**Action Required:**
- Verify this is the actual product update date
- Clarify if this is a documentation update vs product update date

---

## Priority 3: Malformed Version Numbers (1 issue)

### Issue 7: Fix Malformed Version Number in PolyCoder
**File:** `datasets/aie-model/data/polycoder.md`
**Severity:** Medium - Data Quality
**Description:**
- Line 10: Version is "v2.7B (2022-03-01)"
- "2.7B" is the model size (2.7 billion parameters), NOT a version number
- Line 24-26: "PolyCoder was released in multiple sizes (160M, 405M and 2.7B parameters)"
- These are model sizes, not versions

**Action Required:**
- Change version to actual version like "v1.0 (2022-03-01)" or just date
- Move parameter size information to description, not version field
- Document that 2.7B refers to parameters, not version

---

## Priority 4: Incomplete or Empty Content (3 issues)

### Issue 8: Fix Empty Line in StarCoder
**File:** `datasets/aie-model/data/starcoder.md`
**Severity:** Low - Incomplete Content
**Description:**
- Line 23: Contains only a dash "-" with no content
- Appears to be incomplete or placeholder content

**Action Required:**
- Either remove this line or complete the intended content
- Clean up placeholder markup

---

### Issue 9: Fix Empty Line in CodeLlama
**File:** `datasets/aie-model/data/codellama.md`
**Severity:** Low - Incomplete Content
**Description:**
- Line 22: Contains only a dash "-" with no content
- Same issue as StarCoder

**Action Required:**
- Either remove this line or complete the intended content
- Clean up placeholder markup

---

### Issue 10: Complete Empty Rating in FauxPilot
**File:** `datasets/aie-model/data/fauxpilot.md`
**Severity:** Low - Incomplete Content
**Description:**
- Line 17: Rating field is completely empty (just a dash)
- Every other file has either a rating or "N/A"

**Action Required:**
- Add a rating or explicitly mark as "N/A" if no rating is available
- Be consistent with other files

---

## Priority 5: Semantic/Conceptual Issues (1 issue)

### Issue 11: FreeTrial Field Semantic Mismatch for Open Source
**Files:** Multiple (starcoder.md, polycoder.md, kite.md, fauxpilot.md, codellama.md)
**Severity:** Medium - Conceptual
**Description:**
"FreeTrial" field is semantically mismatched for open-source models:
- **starcoder.md** (Line 56-59): "FreeTrial: Yes" - but this is an open-source model
- **polycoder.md** (Line 60-62): "FreeTrial: Yes" - freely downloadable weights
- **kite.md** (Line 58): "FreeTrial: Yes" - archived/defunct product
- **fauxpilot.md** (Line 49-51): "FreeTrial: Yes" - open-source software
- **codellama.md** (Line 50-52): "FreeTrial: Yes" - open-source model

"FreeTrial" typically means limited-time trial of commercial product. For open-source that's freely available without time limits, this doesn't semantically apply.

**Action Required:**
- Either:
  1. Rename field to "FreelyAvailable" or "NoChargeAccess"
  2. Use "N/A" for open-source where "trial" concept doesn't apply
  3. Add notes distinguishing "free trial of paid service" vs "freely available open source"
- Make consistent across all files

---

## Priority 6: Minor Issues / Observations (2 issues)

### Issue 12: Standardize StarCoder Version Format
**File:** `datasets/aie-model/data/starcoder.md`
**Severity:** Low - Consistency
**Description:**
- Line 10: Version is "v1 / 15.5B (initial: 2023)"
- Format mixes version, parameter count, and year informally
- Inconsistent with how other files handle versioning

**Action Required:**
- Consider clearer format like "v1 (15.5B parameters, 2023)"
- Document versioning convention for consistency

---

### Issue 13: Standardize CodeGeeX Version Format
**File:** `datasets/aie-model/data/codegeex.md`
**Severity:** Low - Consistency
**Description:**
- Line 10: "CodeGeeX v1 (13B, released Sep 2022); CodeGeeX2 (follow-up, released 2023-07-24)"
- Describes two versions in one line
- Inconsistent with how other files handle versioning

**Action Required:**
- Focus on primary/current version
- Or restructure to make multi-version information clearer
- Be consistent with other files

---

## Summary Statistics

- **Total Issues Proposed:** 13
- **Critical Priority (P1):** 3 issues - Classification errors
- **High Priority (P2):** 3 issues - Suspicious dates
- **Medium Priority (P3-5):** 5 issues - Malformed versions, semantic issues
- **Low Priority (P6):** 2 issues - Minor formatting

- **Files Affected:** 7 files (all files in datasets/aie-model/data/)
- **Most Issues:**
  - fauxpilot.md (3 issues)
  - polycoder.md (3 issues)
  - kite.md (3 issues)

## Issue Distribution by File

**starcoder.md**: 2 issues (empty line, version format)
**polycoder.md**: 3 issues (classification, date, version)
**kite.md**: 3 issues (classification, date, FreeTrial semantic)
**fauxpilot.md**: 3 issues (classification, empty rating, FreeTrial semantic)
**codellama.md**: 2 issues (empty line, FreeTrial semantic)
**codeium_enterprise.md**: 2 issues (classification, date)
**codegeex.md**: 1 issue (version format)

## Recommended Action Plan

1. **Week 1:** Address Priority 1 (Critical Classifications) - Issues #1-3
2. **Week 2:** Address Priority 2 (Suspicious Dates) - Issues #4-6
3. **Week 3:** Address Priority 3-5 (Versions & Semantic) - Issues #7-11
4. **Week 4:** Address Priority 6 (Minor Formatting) - Issues #12-13

## Labels Recommendation

Suggested labels for these issues:
- `data-quality` - For all issues
- `critical` - For Priority 1 classification issues
- `stale-data` - For suspicious date issues
- `semantic` - For Issue #11 (FreeTrial)
- `formatting` - For Issues #8-10, #12-13
- `good-first-issue` - For empty line fixes (#8-10)

## Critical Findings Summary

This review found **significant classification issues**:
1. **3 tools misclassified** as "AIE/Model" when they are not models (Kite, FauxPilot, Codeium Enterprise)
2. **3 files with suspicious "yesterday" dates** for archived/old projects
3. **1 malformed version number** (confusing model size with version)
4. **Semantic mismatch** in "FreeTrial" field for open-source projects

**Recommendation:** Address Priority 1 (classification errors) immediately as these fundamentally misrepresent what these tools are. The dataset categorization depends on accurate classifications.

---

**Generated:** 2025-11-17
**Reviewer:** Claude Code
**Source:** Critical review of datasets/aie-model/data/*.md files (7 files)
