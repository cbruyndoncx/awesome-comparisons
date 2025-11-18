# Issue Proposal: update_recipe.yaml Critical Review

**File Reviewed:** `/home/user/awesome-comparisons/scripts/update_recipe.yaml`
**Review Date:** 2025-11-17
**Total Issues Found:** 13

## Summary Statistics

- **Critical:** 1
- **High:** 2
- **Medium:** 5
- **Low:** 5

---

## CRITICAL ISSUES (Priority 1)

### Issue #1: Hardcoded Absolute Path - Environment Portability
- **Line:** 31
- **Severity:** CRITICAL
- **Category:** Portability
- **Problem:**
  ```yaml
  args:
  - /home/cb/TOOLBOX/MCP/perplexity-mcp/build/index.js
  ```
  The path `/home/cb/TOOLBOX/MCP/perplexity-mcp/build/index.js` is hardcoded for a specific user account (`cb`). This will fail on any machine where user `cb` doesn't exist, making the recipe non-portable.

- **Recommended Fix:**
  Use environment variables or relative paths. Document the requirement in a comment.

---

## HIGH SEVERITY ISSUES (Priority 2)

### Issue #2: Invalid Model Name
- **Line:** 41
- **Severity:** HIGH
- **Category:** Configuration Error
- **Problem:**
  ```yaml
  goose_model: gpt-5-mini
  ```
  The model `gpt-5-mini` does not exist. OpenAI has never released a "gpt-5" model. This will cause runtime failures.

- **Recommended Fix:**
  Replace with a valid OpenAI model like `gpt-4-turbo`, `gpt-4o`, or `gpt-3.5-turbo`.

### Issue #3: Provider/Model Mismatch
- **Lines:** 40-41
- **Severity:** HIGH
- **Category:** Configuration Error
- **Problem:**
  ```yaml
  goose_provider: openai
  goose_model: gpt-5-mini
  ```
  The provider/model combination is invalid and will cause API errors.

- **Recommended Fix:**
  Ensure provider and model are compatible. Use a valid OpenAI model.

---

## MEDIUM SEVERITY ISSUES (Priority 3)

### Issue #4: Incomplete Prompt Template Definition
- **Line:** 4
- **Severity:** MEDIUM
- **Category:** Clarity
- **Problem:**
  ```yaml
  prompt: Research the topic from {{ filename }} and focus on the ToDo sections and update markdown file {{ filename }}
  ```
  The prompt references "ToDo sections" but doesn't specify their format (markdown comments, checklist items, specific headings?).

- **Recommended Fix:**
  Clarify what constitutes a "ToDo section" and improve prompt formatting.

### Issue #5: Missing Template Definition
- **Lines:** 10, 13-16
- **Severity:** MEDIUM
- **Category:** Missing Information
- **Problem:**
  Instructions reference "the provided template" but no template is actually provided in this file or referenced externally.

- **Recommended Fix:**
  Include an example template structure or reference an external template file.

### Issue #6: Ambiguous "For Each Item" Instruction
- **Lines:** 8-9
- **Severity:** MEDIUM
- **Category:** Clarity
- **Problem:**
  ```yaml
  For each item:
    (1) research with reputable sources,
  ```
  Unclear what constitutes an "item" (files, sections, tools?).

- **Recommended Fix:**
  Specify what an "item" is and provide research depth guidance.

### Issue #7: Unclear Formatting Instruction
- **Line:** 11
- **Severity:** MEDIUM
- **Category:** Formatting
- **Problem:**
  ```yaml
  CRITICAL Do not add any other heading sections.
  ```
  Unusually formatted with inconsistent capitalization. Ambiguous meaning.

- **Recommended Fix:**
  Clarify intent and use proper YAML comment formatting.

### Issue #8: Vague Yes/No Value Instructions
- **Line:** 14
- **Severity:** MEDIUM
- **Category:** Clarity
- **Problem:**
  ```yaml
  For Yes/No only one value is valid. Any comments must be added as unordered indented list items.
  ```
  Doesn't specify valid values (Yes/No vs yes/no vs true/false?). No examples provided.

- **Recommended Fix:**
  Specify exact formatting and provide examples.

---

## LOW SEVERITY ISSUES (Priority 4)

### Issue #9: Trailing Whitespace
- **Line:** 47
- **Severity:** LOW
- **Category:** Formatting
- **Problem:** Trailing space after "required"

- **Recommended Fix:** Remove trailing whitespace.

### Issue #10: Null Description in Developer Extension
- **Line:** 22
- **Severity:** LOW
- **Category:** Clarity
- **Problem:**
  ```yaml
  description: null
  ```
  Unclear if intentional or an oversight.

- **Recommended Fix:** Provide a description or omit the field.

### Issue #11: Empty available_tools Lists
- **Lines:** 25, 37
- **Severity:** LOW
- **Category:** Clarity
- **Problem:** Empty lists in both extensions without explanation.

- **Recommended Fix:** Add comment explaining why lists are empty.

### Issue #12: Missing Node.js Dependency Documentation
- **Line:** 29
- **Severity:** LOW
- **Category:** Documentation
- **Problem:** Requires Node.js but doesn't document this requirement.

- **Recommended Fix:** Add comment documenting Node.js requirement.

### Issue #13: Missing Error Handling for MCP Extension
- **Lines:** 27-37
- **Severity:** LOW
- **Category:** Robustness
- **Problem:** No error handling if the MCP extension fails to load. `bundled: null` is unclear.

- **Recommended Fix:** Clarify `bundled` value and add documentation about error handling.

---

## Recommended Fix Priority

1. **Priority 1 (Critical):** Fix Issue #1 (hardcoded path) - blocks usage across environments
2. **Priority 2 (High):** Fix Issues #2-3 (invalid model) - causes runtime failures
3. **Priority 3 (Medium):** Fix Issues #4-8 (clarity improvements) - reduces ambiguity and errors
4. **Priority 4 (Low):** Fix Issues #9-13 (cleanup and documentation) - improves maintainability
