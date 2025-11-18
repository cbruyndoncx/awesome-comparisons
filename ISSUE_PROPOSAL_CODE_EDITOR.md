# GitHub Issues Proposal - Code Editor Review Findings

## Overview
This proposal outlines suggested GitHub issues to track corrections needed for the code-editor comparison files based on critical review findings.

---

## Priority 1: Critical Classification Errors (4 issues)

### Issue 1: Fix Misclassification of Nuanced (MCP Server, not Editor)
**File:** `datasets/code-editor/data/nuanced.md`
**Severity:** Critical - Wrong Category
**Description:**
- Line 7: Classified as "Code/Editor"
- Nuanced is an MCP server that provides code intelligence, not an editor itself
- This fundamentally misrepresents what the tool is

**Action Required:**
- Change classification from "Code/Editor" to appropriate category
- Consider "AIE/Model" or "Developer Tools" or "Code Intelligence"
- Potentially move to different dataset if not editor-related

---

### Issue 2: Fix Misclassification of From021 (Product Platform, not Editor)
**File:** `datasets/code-editor/data/from021.md`
**Severity:** Critical - Wrong Category
**Description:**
- Line 7: Classified as "Code/Editor"
- From021 is a product definition platform that generates PRDs and specs, not an editor
- Should only be "Product/Prototyping"

**Action Required:**
- Remove "Code/Editor" classification
- Keep only "Product/Prototyping"
- Consider moving to different dataset

---

### Issue 3: Fix Misclassification of Runner H (Automation Agent, not Editor)
**File:** `datasets/code-editor/data/runnerh.md`
**Severity:** Critical - Wrong Category
**Description:**
- Line 7: Classified as "Code/Editor"
- Runner H is a web automation agent, not an editor
- Should be "Code/Autonomous agent" or "Product/Automation"

**Action Required:**
- Change classification from "Code/Editor"
- Use "Code/Autonomous agent" or "Product/Automation"
- Consider moving to code-agent dataset

---

### Issue 4: Review Google AI Studio Classification
**File:** `datasets/code-editor/data/googleaistudio.md`
**Severity:** Medium - Classification Question
**Description:**
- Lines 10-13: Multiple classifications including "Code/Editor"
- Primarily a prototyping/model playground
- "Code/Editor" may not be appropriate

**Action Required:**
- Review if "Code/Editor" classification is accurate
- Consider focusing on "AIE/Model" + "Product/Prototyping"
- Document reasoning for classification choice

---

## Priority 2: Contradictory Duplicate Yes/No Entries (6 issues)

### Issue 5: Fix Multiple Contradictory Fields in Trae
**File:** `datasets/code-editor/data/trae.md`
**Severity:** High - Data Contradiction
**Description:**
Multiple fields have both "Yes" with explanation AND standalone "No":
- Lines 87-88: ContextManagement
- Lines 92-93: DirectFileReferences
- Lines 96-97: Checkpoints
- Lines 109-110: Plugins
- Lines 114-115: Hooks
- Lines 119-120: SlashCommands
- Lines 124-125: CustomModes
- Lines 129-130: Subagents

**Action Required:**
- Remove all standalone "No" entries
- Keep only the "Yes" entries with explanations
- Ensure each field has single clear answer

---

### Issue 6: Fix Multiple Contradictory Fields in Google AI Studio
**File:** `datasets/code-editor/data/googleaistudio.md`
**Severity:** High - Data Contradiction
**Description:**
Multiple fields have both "Yes" with notes AND standalone "No":
- Lines 85-86: Tools
- Lines 97-98: Resources
- Lines 141-142: CustomModes
- Lines 155-156: Plugins
- Lines 163-164: Hooks
- Lines 171-172: SlashCommands
- Lines 179-180: CustomModes (duplicate section)
- Lines 187-188: Subagents

**Action Required:**
- Remove all standalone "No" entries conflicting with "Yes"
- Fix duplicate CustomModes section
- Clean up all contradictory entries

---

### Issue 7: Fix Contradictory Fields in JetBrains AI Assistant
**File:** `datasets/code-editor/data/jetbrains_ai_assistant.md`
**Severity:** High - Data Contradiction
**Description:**
- Lines 85-86: Tools has both "Yes" and "No"
- Lines 92-94: Resources has both "Yes" and "No"

**Action Required:**
- Complete documentation with proper explanations
- Remove contradictory entries
- Ensure single answer per field

---

### Issue 8: Fix Contradictory Fields in Firebase Studio
**File:** `datasets/code-editor/data/firebase_studio.md`
**Severity:** High - Data Contradiction
**Description:**
- Lines 84-86: Resources has "Yes", "No", and comment
- Lines 140-142: CustomModes has both
- Lines 148-150: Subagents has both

**Action Required:**
- Remove contradictory entries
- Complete documentation properly
- Single answer per field

---

### Issue 9: Fix Contradictory Fields in Devoxx Genie
**File:** `datasets/code-editor/data/devoxx-genie.md`
**Severity:** High - Data Contradiction
**Description:**
Multiple fields with both "Yes" with notes and standalone "No":
- Lines 62-64: Prompts
- Lines 67-69: Tools
- Lines 72-74: Resources
- Lines 127-128: SlashCommands

**Action Required:**
- Remove standalone "No" entries
- Keep "Yes" entries with explanations

---

### Issue 10: Fix Contradictory ContextManagement in Ask Codi
**File:** `datasets/code-editor/data/ask-codi.md`
**Severity:** Medium - Data Contradiction
**Description:**
- Lines 86-88: ContextManagement has both "Yes" and "No"
- Appears to be template remnants

**Action Required:**
- Remove template "No" entry
- Keep appropriate answer with explanation

---

## Priority 3: Terminal Field Contradiction (1 issue)

### Issue 11: Fix Terminal Contradiction in Windsurf
**File:** `datasets/code-editor/data/windsurf.md`
**Severity:** High - Contradictory Information
**Description:**
- Line 138: Terminal marked as "No"
- Line 32: Description mentions "terminal integration"
- Contradictory information

**Action Required:**
- Change Terminal to "Yes" with note about terminal integration
- Ensure consistency between fields and description

---

## Priority 4: SpecDrivenDevelopment Issues (4 issues)

### Issue 12: Fix SpecDrivenDevelopment Contradiction in Trae
**File:** `datasets/code-editor/data/trae.md`
**Severity:** Medium - Contradictory Data
**Description:**
- Lines 138-147: Lists ALL SDD frameworks
- Note says it's "not tied to a specific framework"
- If not tied to specific framework, shouldn't list all

**Action Required:**
- Remove specific framework names
- Use "Other" with explanation about framework-agnostic approach

---

### Issue 13: Fix SpecDrivenDevelopment Contradiction in Google AI Studio
**File:** `datasets/code-editor/data/googleaistudio.md`
**Severity:** Medium - Contradictory Data
**Description:**
- Line 202: Says "None"
- Lines 203-213: Then lists all frameworks
- Contradictory

**Action Required:**
- If "None", remove all framework names
- Or use "Other" with explanation

---

### Issue 14: Complete SpecDrivenDevelopment in Jolt
**File:** `datasets/code-editor/data/jolt.md`
**Severity:** Medium - Incomplete Data
**Description:**
- Lines 163-177: Has TODO comment
- Lists all frameworks without notes or justification

**Action Required:**
- Complete the section properly
- Mark as "Other"/"None" with explanation
- Remove TODO comment

---

### Issue 15: Fix SpecDrivenDevelopment in Verdent Deck
**File:** `datasets/code-editor/data/verdent-deck.md`
**Severity:** Medium - Contradictory Data
**Description:**
- Line 135: Shows "Tessl"
- Line 136: Note says "no public indication that it prescribes a specific framework"
- Contradictory

**Action Required:**
- Change from "Tessl" to "Other" or "None"
- Align answer with explanation

---

## Priority 5: Malformed Version Numbers (13+ issues)

### Issue 16: Fix Malformed Version Numbers Across Multiple Files
**Files:** Multiple (13+ files affected)
**Severity:** Medium - Data Quality
**Description:**
Malformed version number formats:
- **zed.md** (Line 10): `vN/A (2025-10-19)` - mixing N/A with date
- **tabnine.md** (Line 9): `v(enterprise/cloud) (2025-10-29)` - unclear format
- **supermaven.md** (Line 10): `v (2025-10-19)` - empty version
- **sourcegraph.md** (Line 10): `vN/A (2025-10-19)` - same issue
- **github_copilot.md** (Line 10): `vN/A (2025-10-19)` - same issue
- **augment-code.md** (Line 10): `vN.N (yyyy-mm-dd)` - template not replaced
- **sourceai_dev.md, refraction.md, pythagora.md, jolt.md, easycodeai.md**: Empty or placeholder versions

**Action Required:**
- Use consistent format: actual version number or "Unknown (last checked DATE)"
- Remove "N/A" mixed with dates
- Replace placeholder text with actual data
- Document version number format policy

---

## Priority 6: Empty/Incomplete Required Fields (10+ issues)

### Issue 17: Complete Empty Fields in Verdent VSCode
**File:** `datasets/code-editor/data/verdent-vscode.md`
**Severity:** Medium - Incomplete Data
**Description:**
Multiple empty fields marked with "-":
- Line 53: FreeTrial
- Line 58: MCP-Client
- Line 83: BYOK
- Line 118: Hooks
- Line 121: SlashCommands
- Line 124: CustomModes
- Line 137: SpecDrivenDevelopment

**Action Required:**
- Research and fill all empty fields
- Use "Unknown" with explanation if information unavailable
- Complete SpecDrivenDevelopment section

---

### Issue 18: Complete Empty Fields in Verdent Deck
**File:** `datasets/code-editor/data/verdent-deck.md`
**Severity:** Medium - Incomplete Data
**Description:**
Multiple empty fields:
- Line 62: FreeTrial
- Line 81: BYOK
- Line 116: Hooks
- Line 119: SlashCommands
- Line 121: CustomModes

**Action Required:**
- Research and complete all fields
- Use "Unknown" if data unavailable

---

### Issue 19: Complete Empty MCP-Client Fields
**Files:** pythagora.md, firebase_studio.md, aix-coder.md
**Severity:** Medium - Incomplete Data
**Description:**
- **pythagora.md** (Line 85): MCP-Client empty
- **firebase_studio.md** (Line 63): MCP-Client empty
- **aix-coder.md** (Line 56): MCP-Client empty

**Action Required:**
- Research MCP (Model Context Protocol) support for each tool
- Fill with Yes/No answer and explanation
- Use "Unknown" if truly unavailable

---

### Issue 20: Complete Empty BYOK Fields
**Files:** marsx.md, from021.md, aix-coder.md
**Severity:** Medium - Incomplete Data
**Description:**
- **marsx.md** (Line 81): BYOK completely empty
- **from021.md** (Line 74): BYOK empty
- **aix-coder.md** (Line 73): BYOK empty

**Action Required:**
- Research BYOK support for enterprise deployment
- Fill with appropriate values
- Important for enterprise evaluation

---

### Issue 21: Complete Empty Checkpoints Fields
**Files:** kilocode.md, from021.md, aix-coder.md
**Severity:** Medium - Incomplete Data
**Description:**
- **kilocode.md**: Checkpoints empty
- **from021.md** (Line 94): Checkpoints empty
- **aix-coder.md** (Line 91): Checkpoints empty

**Action Required:**
- Research checkpoint/branching/rollback support
- Complete with Yes/No and explanation

---

### Issue 22: Complete Empty SpecDrivenDevelopment Sections
**Files:** tabby.md, verdent-vscode.md, kilocode.md, aix-coder.md
**Severity:** Medium - Incomplete Data
**Description:**
- **tabby.md** (Lines 135-141): Completely empty with only HTML comments
- **verdent-vscode.md** (Line 137): Empty
- **kilocode.md**: SpecDrivenDevelopment empty
- **aix-coder.md** (Line 127): SpecDrivenDevelopment empty

**Action Required:**
- Complete sections with framework support
- Use "Other"/"None" with explanation if no specific framework
- Remove HTML comments

---

### Issue 23: Complete Multiple Empty Fields in Kilocode
**File:** `datasets/code-editor/data/kilocode.md`
**Severity:** Medium - Incomplete Data
**Description:**
Multiple empty fields:
- Checkpoints
- Hooks
- SlashCommands
- SpecDrivenDevelopment

**Action Required:**
- Research and complete all empty fields
- Ensure comprehensive documentation

---

### Issue 24: Complete Multiple Empty Fields in EasyCodeAI
**File:** `datasets/code-editor/data/easycodeai.md`
**Severity:** Medium - Incomplete Data
**Description:**
Multiple fields empty (specific lines not provided in review)

**Action Required:**
- Review entire file
- Complete all empty required fields
- Use "Unknown" where appropriate

---

### Issue 25: Complete Multiple Empty Fields in AIX Coder
**File:** `datasets/code-editor/data/aix-coder.md`
**Severity:** Medium - Incomplete Data
**Description:**
Multiple empty fields:
- Line 56: MCP-Client
- Line 73: BYOK
- Line 91: Checkpoints
- Line 115: CustomModes
- Line 127: SpecDrivenDevelopment

**Action Required:**
- Complete all empty fields with proper research
- Comprehensive documentation needed

---

### Issue 26: Fix Duplicate MCP-Client Header in Refact
**File:** `datasets/code-editor/data/refact.md`
**Severity:** Low - Formatting
**Description:**
- Line 58: MCP-Client section header repeated
- Implementation note embedded incorrectly

**Action Required:**
- Clean up formatting
- Remove duplicate header
- Ensure proper structure

---

## Priority 7: Date Alignment Issues (2 issues)

### Issue 27: Fix Version/Update Date Mismatch in Windsurf
**File:** `datasets/code-editor/data/windsurf.md`
**Severity:** Low - Stale Data
**Description:**
- Line 10: Version date: 2025-10-19
- Line 41: Last Update: 2025-11-15
- Version from October but updated in November suggests stale version field

**Action Required:**
- Update version field to match Last Update
- Or add note explaining version dating policy

---

### Issue 28: Fix Version/Update Date Gap in Void Editor
**File:** `datasets/code-editor/data/void-editor.md`
**Severity:** Low - Stale Data
**Description:**
- Line 10: Version: v0.1 (2025-01 beta)
- Line 37: Last Update: 2025-11-15
- Large gap between version and update dates (10 months)

**Action Required:**
- Update version to current
- Or add note about versioning approach for beta software

---

## Priority 8: Formatting and Minor Issues (4 issues)

### Issue 29: Remove Editorial Brackets from CodeLayer
**File:** `datasets/code-editor/data/codelayer.md`
**Severity:** Low - Formatting
**Description:**
- Line 86: Contains evaluation notes with brackets like "[Brokk's client..."
- Editorial/review content in production data

**Action Required:**
- Remove all editorial brackets
- Clean content for production use

---

### Issue 30: Remove Editorial Brackets from Brokk AI Coder
**File:** `datasets/code-editor/data/brokk-ai-coder.md`
**Severity:** Low - Formatting
**Description:**
- Uses brackets in descriptions
- Editorial content mixed with data

**Action Required:**
- Remove editorial brackets
- Finalize content

---

### Issue 31: Fix Duplicate SpecDrivenDevelopment Header in GitHub Copilot
**File:** `datasets/code-editor/data/github_copilot.md`
**Severity:** Low - Formatting
**Description:**
- Lines 171-173: SpecDrivenDevelopment has two headers

**Action Required:**
- Remove duplicate header
- Clean up formatting

---

### Issue 32: Review Verbose GitSupport in Refraction
**File:** `datasets/code-editor/data/refraction.md`
**Severity:** Low - Content Quality
**Description:**
- Line 94: GitSupport section has unusual formatting
- Content about GitHub Marketplace plugin is verbose

**Action Required:**
- Review and potentially condense
- Ensure consistent formatting
- Content is correct, just verbose

---

## Summary Statistics

- **Total Issues Proposed:** 32
- **Critical Priority (P1):** 4 issues - Classification errors
- **High Priority (P2):** 6 issues - Contradictory duplicates
- **Medium Priority (P3-6):** 19 issues - Data quality, incomplete fields
- **Low Priority (P7-8):** 3 issues - Formatting, minor issues

- **Files Affected:** 28+ files (out of 42 total files)
- **Most Issues:**
  - trae.md (8 contradictory fields)
  - googleaistudio.md (8 contradictory fields + classification)
  - verdent-vscode.md (7 empty fields)
  - aix-coder.md (5 empty fields)

## Recommended Action Plan

1. **Week 1:** Address Priority 1 (Critical Classifications) - Issues #1-4
2. **Week 2:** Address Priority 2 (Contradictory Duplicates) - Issues #5-10
3. **Week 3:** Address Priority 3-4 (Terminal & SpecDrivenDevelopment) - Issues #11-15
4. **Week 4:** Address Priority 5-6 (Versions & Empty Fields) - Issues #16-26
5. **Week 5:** Address Priority 7-8 (Dates & Formatting) - Issues #27-32

## Labels Recommendation

Suggested labels for these issues:
- `data-quality` - For all issues
- `critical` - For Priority 1 classification issues
- `contradiction` - For duplicate Yes/No entries
- `incomplete` - For empty field issues
- `research-needed` - For issues requiring vendor research
- `formatting` - For Issues #26, #29-32
- `good-first-issue` - For simple formatting fixes

## Critical Findings Summary

This review found **significant data quality issues**:
1. **4 tools misclassified** as editors when they're not
2. **28+ files with contradictory Yes/No duplicate entries** (extremely problematic)
3. **13+ files with malformed version numbers**
4. **10+ files with empty/incomplete required fields**
5. **Multiple SpecDrivenDevelopment sections with logical contradictions**

**Recommendation:** Do NOT use this dataset for production comparisons until at least Priority 1 and Priority 2 issues are resolved. The contradictory duplicate entries make the data unreliable and could seriously mislead users.

---

**Generated:** 2025-11-17
**Reviewer:** Claude Code
**Source:** Critical review of datasets/code-editor/data/*.md files (42 files)
