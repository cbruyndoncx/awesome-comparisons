# GitHub Issues Proposal - Coding Agent Review Findings

## Overview
This proposal outlines suggested GitHub issues to track corrections needed for the coding agent comparison files based on critical review findings.

---

## Priority 1: Critical Factual Errors (3 issues)

### Issue 1: Fix Incorrect URL for Codename Goose
**File:** `datasets/code-agent/data/codenamegoose.md`
**Severity:** Critical - Wrong Information
**Description:**
- Line 1 lists `https://goose.ai/` which is a completely different company (AI inference API service)
- Codename Goose is a Block/Square project at github.com/block/goose
- No official goose.ai domain exists for Codename Goose

**Action Required:**
- Remove goose.ai URL
- Add correct project URL (likely github.com/block/goose or block.xyz)
- Verify official website/documentation URL

---

### Issue 2: Fix MCP/Tessl Confusion in Smol Developer
**File:** `datasets/code-agent/data/smol-developer.md`
**Severity:** Critical - Fundamental Misunderstanding
**Description:**
- Lines 58-59 state: "does not include a built-in MCP (Tessl) client"
- This conflates two completely different technologies:
  - MCP = Model Context Protocol (by Anthropic) for tool integration
  - Tessl = Separate spec-driven development framework
- Shows fundamental misunderstanding of what MCP is

**Action Required:**
- Correct MCP-Client field with accurate information about MCP support
- Remove any references to Tessl in MCP context
- Research if smol-developer actually supports MCP protocol

---

### Issue 3: Fix Product Confusion in Claude Desktop SpecDrivenDevelopment Section
**File:** `datasets/code-agent/data/claude-desktop.md`
**Severity:** Critical - Wrong Product
**Description:**
- Lines 136-153 discuss Claude Code features, not Claude Desktop
- Two different products are being conflated
- SpecDrivenDevelopment section should focus on Claude Desktop capabilities only

**Action Required:**
- Remove all Claude Code-specific content from Claude Desktop file
- Research and document Claude Desktop's actual spec-driven development support
- Keep focus on Claude Desktop features only

---

## Priority 2: Contradictory Information (4 issues)

### Issue 4: Fix Contradictory Local Offline Answer in CodeRabbit
**File:** `datasets/code-agent/data/coderabbit.md`
**Severity:** High - Contradictory Data
**Description:**
- Lines 90-92: States Local Offline is "No" but mentions "self-hosted option is referenced by the vendor"
- If self-hosted is available, answer should be "Yes (Enterprise self-hosted option available)"

**Action Required:**
- Research CodeRabbit's actual self-hosted/on-premise offerings
- Update Local Offline field to accurately reflect availability
- Ensure Yes/No answer matches the explanation

---

### Issue 5: Fix Contradictory Hooks Answer in Codename Goose
**File:** `datasets/code-agent/data/codenamegoose.md`
**Severity:** High - Contradictory Data
**Description:**
- Lines 108-109: States Hooks are "No" but explains "users implement lifecycle behaviors via Recipes, extensions"
- The explanation contradicts the answer

**Action Required:**
- Clarify if Recipes/extensions constitute hooks functionality
- Update to "Yes (via Recipes and extensions)" if appropriate
- Ensure consistency between answer and explanation

---

### Issue 6: Fix Contradictory Local Offline Answer in Smol Developer
**File:** `datasets/code-agent/data/smol-developer.md`
**Severity:** High - Contradictory Data
**Description:**
- Lines 80-81: States Local Offline is "Yes" but explains "most common usage relies on a cloud LLM"
- Misleading if network access is required for typical usage

**Action Required:**
- Clarify the distinction between "can run offline" vs "typically runs offline"
- Consider answer like "Partial - supports local LLMs but commonly used with cloud providers"
- Ensure answer accurately reflects typical deployment scenarios

---

### Issue 7: Fix Inconsistent BYOK Information in Claude Desktop
**File:** `datasets/code-agent/data/claude-desktop.md`
**Severity:** Medium - Incomplete Information
**Description:**
- Line 78: States BYOK is "No"
- Line 82: Mentions enterprise deployment options may be available through Anthropic sales
- Contradictory information about enterprise capabilities

**Action Required:**
- Research Claude Desktop's actual enterprise BYOK options
- Update to "Yes (Enterprise only)" or clarify availability
- Ensure answer reflects all deployment options

---

## Priority 3: Classification Issues (3 issues)

### Issue 8: Review Classification Criteria and Reclassify Tools
**Files:** Multiple
**Severity:** Medium - Consistency
**Description:**
Several tools are classified as "Code/Autonomous agent" when they are more specialized:
- `claude-desktop.md` (Line 8): General-purpose AI assistant, not primarily a code agent
- `diffblue_cover.md` (Line 8): Specialized Java unit test generator only
- `codiumai.md` (Line 8): Primarily test generation/QA tool with PR review

**Action Required:**
- Define clear classification criteria for "Code/Autonomous agent"
- Consider additional categories: "Test Generation Tool", "PR Review Tool", "AI Assistant with Coding"
- Reclassify tools to match their primary purpose
- Document classification criteria in a CONTRIBUTING or README file

---

## Priority 4: Date and Version Issues (1 issue)

### Issue 9: Fix Malformed Version Numbers
**Files:** devika-ai.md, openhands.md, diffblue_cover.md
**Severity:** Medium - Data Quality
**Description:**
Several files have malformed version numbers:
- devika-ai.md (Line 11): `v (2025-10-19)` - missing actual version number
- openhands.md (Line 11): `v (2025-10-19)` - missing actual version number
- diffblue_cover.md (Line 11): `vN/A (2025-10-19)` - inconsistent format

**Action Required:**
- Research actual version numbers for each tool
- Use consistent format for unknown versions: "Unknown" or "N/A" (not "v ")
- Document version number policy in template

---

## Priority 5: Incomplete Required Fields (3 issues)

### Issue 10: Complete Empty MCP-Client Fields
**Files:** mutableai.md, diffblue_cover.md, openhands.md, devin.md
**Severity:** Medium - Incomplete Data
**Description:**
Multiple files missing MCP-Client Yes/No answers:
- mutableai.md (Line 59): `-`
- diffblue_cover.md (Line 56): `-`
- openhands.md (Line 56): Empty
- devin.md (Line 56): `-`

**Action Required:**
- Research MCP (Model Context Protocol) support for each tool
- Populate with Yes/No answer and explanation
- If truly unknown, mark as "Unknown" with note about research needed

---

### Issue 11: Complete Empty BYOK and Local Offline Fields
**Files:** mutableai.md, diffblue_cover.md, devin.md
**Severity:** Medium - Incomplete Data
**Description:**
Critical enterprise deployment fields are empty:
- mutableai.md: Empty BYOK (Line 76)
- diffblue_cover.md: Empty BYOK (Line 77), Empty Local Offline (Line 80)
- devin.md: Empty BYOK (Line 76)

**Action Required:**
- Research enterprise deployment options for each tool
- Fill in BYOK and Local Offline fields with Yes/No + explanation
- These are important for enterprise evaluation

---

### Issue 12: Complete Empty Extensibility Fields in Devin
**File:** `datasets/code-agent/data/devin.md`
**Severity:** Medium - Incomplete Data
**Description:**
Multiple critical extensibility fields are completely empty:
- Line 51: FreeTrial - `-`
- Line 56: MCP-Client - `-`
- Line 76: BYOK - `-`
- Lines 111-122: Hooks, SlashCommands, Subagents - all empty

**Action Required:**
- Research Devin's actual capabilities for all missing fields
- This is a major commercial product; information should be available
- Complete all extensibility sections
- Consider reaching out to Cognition Labs if information isn't public

---

## Priority 6: Specific Data Issues (4 issues)

### Issue 13: Verify and Fix Unverified MCP Claim in CodiumAI
**File:** `datasets/code-agent/data/codiumai.md`
**Severity:** High - Unverified Claim
**Description:**
- Line 78: States "Yes" for MCP-Client with claim that "Qodo/Codium integrates with the Model Context Protocol (MCP)"
- No public documentation found confirming CodiumAI has MCP integration
- May be incorrect or speculative

**Action Required:**
- Research CodiumAI/Qodo documentation for MCP support
- Contact vendor if needed to verify claim
- Update field based on verified information
- If unverified, mark as "Unknown - needs verification"

---

### Issue 14: Clarify Product Name Confusion in Devika AI
**File:** `datasets/code-agent/data/devika-ai.md`
**Severity:** Medium - Naming Confusion
**Description:**
- Line 1: States "Opcode (Devika AI) - https://opcode.sh"
- GitHub repo is stitionai/devika, not opcode-related
- Unclear relationship between Devika AI and Opcode

**Action Required:**
- Research if Devika AI was rebranded to Opcode
- Clarify which is the current/correct name
- Update file to use consistent naming throughout
- Add note about name changes if applicable

---

### Issue 15: Fix Repository vs Website Confusion in AMP
**File:** `datasets/code-agent/data/amp.md`
**Severity:** Low - Minor Error
**Description:**
- Line 14: Lists `https://ampcode.com` as repository
- This is the product website, not a code repository
- Actual repositories listed are demo/example repos

**Action Required:**
- Remove product website from repository field
- Either list actual GitHub repos only or state "Proprietary - no main public repo"
- Clarify which repos are official vs examples/demos

---

### Issue 16: Fix CLI vs Slash Command Confusion in Diffblue Cover
**File:** `datasets/code-agent/data/diffblue_cover.md`
**Severity:** Medium - Conceptual Error
**Description:**
- Lines 113-114: States SlashCommands is "Yes" but explains "CLI subcommands"
- CLI subcommands (`dcover test`) are NOT the same as slash commands in agent/chat context (`/review`)
- Conflates two different concepts

**Action Required:**
- Clarify definition of "SlashCommands" in template (chat interface commands)
- Update answer to "No - provides CLI commands but not chat-style slash commands"
- Ensure template is clear about the distinction

---

## Priority 7: Template and Consistency Issues (2 issues)

### Issue 17: Complete Empty SpecDrivenDevelopment Sections
**Files:** amp.md, mutableai.md
**Severity:** Low - Incomplete Data
**Description:**
- amp.md (Lines 137-140): Completely empty with just `---`
- mutableai.md (Lines 132-143): Duplicate empty sections with only HTML comments

**Action Required:**
- Research spec-driven development support for each tool
- If no support, explicitly state "No support for listed frameworks"
- Remove duplicate sections
- Ensure consistent approach across all files

---

### Issue 18: Standardize Format for Unknown/Missing Values
**Files:** Multiple
**Severity:** Low - Consistency
**Description:**
Inconsistent formats for unknown or missing values:
- Some use `-`
- Some use `N/A`
- Some use `Unknown`
- Some use `Not publicly documented`
- Some leave blank

**Action Required:**
- Define standard format in template for unknown values
- Recommendation: Use "Unknown" for Yes/No fields, with explanation if needed
- Update all files to use consistent format
- Document in template/CONTRIBUTING guide

---

## Priority 8: Language Support Clarification (1 issue)

### Issue 19: Clarify Language Support Across Multiple Files
**Files:** devin.md, devika-ai.md, codiumai.md, coderabbit.md
**Severity:** Medium - Incomplete/Unclear Data
**Description:**
Several files have unclear or incomplete language support:
- devin.md (Lines 29-31): Only lists Python and JS/TS for a general-purpose tool
- devika-ai.md (Lines 31-33): Unclear if listing implementation languages vs supported languages
- codiumai.md (Lines 34-35): Likely incomplete list
- coderabbit.md (Lines 29-37): Vague "Other - Other common languages"

**Action Required:**
- Clarify template: "Languages the tool SUPPORTS for code generation/analysis"
- Research actual language support for each tool
- Use consistent format: either list all or state "Multi-language (50+ languages)" with link
- Avoid vague entries like "Other common languages"

---

## Summary Statistics

- **Total Issues Proposed:** 19
- **Critical Priority:** 3 issues
- **High Priority:** 4 issues
- **Medium Priority:** 10 issues
- **Low Priority:** 2 issues

- **Files Affected:** 11 files (all files in datasets/code-agent/data/)
- **Most Issues:** mutableai.md (4 issues), diffblue_cover.md (4 issues), devin.md (3 issues)

## Recommended Action Plan

1. **Week 1:** Address Priority 1 (Critical Factual Errors) - Issues #1-3
2. **Week 2:** Address Priority 2 (Contradictory Information) - Issues #4-7
3. **Week 3:** Address Priority 3-4 (Classification & Version Issues) - Issues #8-9
4. **Week 4:** Address Priority 5-6 (Incomplete Fields & Data Issues) - Issues #10-16
5. **Week 5:** Address Priority 7-8 (Template & Consistency) - Issues #17-19

## Labels Recommendation

Suggested labels for these issues:
- `data-quality` - For all issues
- `critical` - For Priority 1 issues
- `research-needed` - For issues requiring vendor research
- `template-improvement` - For Issues #16, #17, #18
- `good-first-issue` - For simple fixes like #15

---

**Generated:** 2025-11-17
**Reviewer:** Claude Code
**Source:** Critical review of datasets/code-agent/data/*.md files
