# Tutorial Track B: Content Editor Guide
## Adding and Updating Comparison Data

**Duration:** 45 minutes
**Target Audience:** People who will maintain comparison data
**Prerequisites:** Basic understanding of Markdown and file system navigation
**What You'll Learn:** How to add new items and update existing data

---

## Table of Contents

1. [Introduction](#introduction)
2. [Part 1: Understanding the Data Structure (10 mins)](#part-1-understanding-the-data-structure)
3. [Part 2: Add a New Item (15 mins)](#part-2-add-a-new-item)
4. [Part 3: Update Existing Items (10 mins)](#part-3-update-existing-items)
5. [Part 4: Practical Exercise (10 mins)](#part-4-practical-exercise)
6. [Best Practices](#best-practices)
7. [Quick Reference](#quick-reference)

---

## Introduction

Welcome! As a content editor, you'll be responsible for keeping comparison data accurate and up-to-date. This tutorial teaches you how to add new items and update existing ones using simple Markdown files.

### What You'll Learn
- Dataset folder structure
- Markdown entry format
- Naming conventions
- How to add new tools/products
- How to update existing data
- Testing your changes

### Tools You'll Need
- Text editor (VS Code, Sublime, Notepad++, or any text editor)
- Git (for version control)
- Terminal/Command line (basic commands)

---

## Part 1: Understanding the Data Structure (10 mins)

### Step 1.1: Dataset Folder Structure

Each comparison dataset has a standard structure:

```
datasets/{dataset-id}/
├── config/
│   └── comparison.yml          # Configuration (usually don't edit)
├── data/
│   ├── item-1.md              # First item
│   ├── item-2.md              # Second item
│   ├── item-3.md              # Third item
│   └── ...                    # More items
├── dataset.yaml               # Dataset metadata
└── description.md             # Dataset description
```

**Your Focus:** The `data/` folder - this is where you'll spend most of your time!

---

### Step 1.2: Explore the Data Folder

**Exercise: Look at Existing Entries**

1. **Navigate to a dataset:**
   ```bash
   cd /home/user/awesome-comparisons/datasets/code-editor/data/
   ```

2. **List all entries:**
   ```bash
   ls -la
   ```

3. **You'll see files like:**
   - `cline.md`
   - `continue.md`
   - `cursor.md`
   - `aider-desk.md`
   - etc.

**Naming Convention:**
- Lowercase
- Hyphenated (not underscores or spaces)
- Descriptive
- Examples: `cline.md`, `github-copilot.md`, `amazon-q-developer.md`

---

### Step 1.3: Anatomy of a Markdown Entry

**Let's examine an example entry:**

```bash
cat cline.md
```

**Typical Structure:**

```markdown
# Tool Name - https://repository-url
Brief description of the tool (1-2 paragraphs)

## Section Name
### Criterion Name
- Value goes here

### Another Criterion
- Another value

## Repo
- https://github.com/owner/repo-name
```

---

### Step 1.4: Understanding Sections and Criteria

**Sections** map to criteria groups (defined in configuration):
- General Info
- Licensing
- Features
- Developer Experience
- Extensibility

**Criteria** are individual fields:
- Classification
- Rating
- Version
- MCP Client
- Git Support
- etc.

**Format Pattern:**

```markdown
## Section Name
### Criterion Name
- Value
```

**Key Points:**
- Section = `##` (two hashes)
- Criterion = `###` (three hashes)
- Value = `-` (dash) followed by the value
- Section/Criterion names must match configuration exactly

---

### Step 1.5: Example: Complete Entry

Let's look at a complete example:

```markdown
# Cline - https://github.com/cline/cline
Cline is an AI-powered code editor that helps developers write better code faster.
It features autonomous coding capabilities, MCP support, and extensive customization options.

## General Info
### Classification
- Code Editor

### Version
- 1.0.0

### Rating
- 4.5

### Short Description
- AI-powered autonomous code editor

## Licensing
### Opensource
- Yes

### License
- Apache-2.0

### Free Trial
- Yes

## Features
### MCP Client
- Yes

### Prompts
- Yes

### Tools
- Yes

### Git Support
- Full integration

## Developer Experience
### Context Management
- Advanced

### Checkpoints
- Yes

## Extensibility
### Plugins
- Yes

### Hooks
- Yes

## Repo
- https://github.com/cline/cline
```

---

## Part 2: Add a New Item (15 mins)

### Step 2.1: Choose Your Item

**For this tutorial, let's add a fictional AI code editor:**
- Name: "CodeWizard"
- Repository: https://github.com/example/codewizard
- Description: A magical AI code editor with advanced spell-checking

---

### Step 2.2: Create the Markdown File

**Steps:**

1. **Navigate to the data folder:**
   ```bash
   cd /home/user/awesome-comparisons/datasets/code-editor/data/
   ```

2. **Create a new file:**
   ```bash
   touch codewizard.md
   ```

   Or use your text editor: File → New → Save as `codewizard.md`

3. **Open in your text editor:**
   ```bash
   code codewizard.md  # VS Code
   # or
   nano codewizard.md  # Terminal editor
   ```

---

### Step 2.3: Add the Header

**Start with the title and description:**

```markdown
# CodeWizard - https://github.com/example/codewizard
CodeWizard is a magical AI code editor that brings enchantment to your development workflow.
With advanced spell-checking (the coding kind!), intelligent autocompletion, and mystical refactoring capabilities, CodeWizard makes coding feel like magic.
```

**Header Format:**
- `# ` (hash + space) + Tool Name
- Space + `-` + Space
- Repository URL
- Blank line
- Description (1-3 paragraphs)

---

### Step 2.4: Add General Info Section

```markdown
## General Info
### Classification
- Code Editor

### Version
- 2.1.0

### Rating
- 4.7

### Short Description
- Magical AI code editor with advanced capabilities

### Last Updated
- 2024-11-18
```

**Tips:**
- Rating: 0-5 scale (can use decimals)
- Version: Semantic versioning (major.minor.patch)
- Date: YYYY-MM-DD format

---

### Step 2.5: Add Licensing Section

```markdown
## Licensing
### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes

### Pricing
- Free for personal use, $20/month for teams
```

**Common License Values:**
- MIT
- Apache-2.0
- GPL-3.0
- Proprietary
- BSD-3-Clause

---

### Step 2.6: Add Features Section

```markdown
## Features
### MCP Client
- Yes

### Prompts
- Advanced prompt engineering support

### Tools
- Built-in debugging, testing, and deployment tools

### Resources
- Extensive library of code snippets and templates

### Chat
- Yes

### Workspace
- Multi-workspace support

### Git Support
- Full Git integration with visual diff

### Context Management
- Intelligent context awareness

### Checkpoints
- Automatic save points
```

---

### Step 2.7: Add Developer Experience Section

```markdown
## Developer Experience
### Onboarding
- Interactive tutorial and documentation

### Learning Curve
- Moderate

### Documentation Quality
- Excellent

### Community Support
- Active Discord and GitHub discussions

### Update Frequency
- Weekly updates
```

---

### Step 2.8: Add Extensibility Section

```markdown
## Extensibility
### Plugins
- Yes - 200+ community plugins

### Hooks
- Yes

### Custom Modes
- Yes

### Subagents
- Yes
```

---

### Step 2.9: Add Repository Link

**Always end with the Repo section:**

```markdown
## Repo
- https://github.com/example/codewizard
```

This creates a clickable link in the interface.

---

### Step 2.10: Save and Verify

**Save Your File:**
- File → Save (or Ctrl+S / Cmd+S)
- Ensure it's saved in the correct location: `datasets/code-editor/data/codewizard.md`

**Verify the Format:**
```bash
cat codewizard.md
```

**Checklist:**
- [ ] File named correctly (lowercase, hyphenated)
- [ ] Header with title and URL
- [ ] Description paragraph(s)
- [ ] All required sections present
- [ ] Consistent formatting (`##` sections, `###` criteria, `-` values)
- [ ] Repo section at the end

---

## Part 3: Update Existing Items (10 mins)

### Step 3.1: Identify What Needs Updating

**Common Update Scenarios:**
- New version released
- Features added/changed
- Pricing updated
- Rating adjustment
- License changed
- Repository moved

---

### Step 3.2: Edit an Existing Entry

**Exercise: Update the Rating for Cline**

1. **Open the file:**
   ```bash
   code datasets/code-editor/data/cline.md
   ```

2. **Find the Rating criterion:**
   ```markdown
   ## General Info
   ### Rating
   - 4.5
   ```

3. **Update the value:**
   ```markdown
   ## General Info
   ### Rating
   - 4.8
   ```

4. **Save the file**

---

### Step 3.3: Add a New Criterion to Existing Entry

**Exercise: Add "Mobile Support" to an entry**

1. **Open the file**
2. **Find the appropriate section** (e.g., Features)
3. **Add the new criterion:**

```markdown
## Features
### MCP Client
- Yes

### Mobile Support
- iOS and Android apps available

### Prompts
- Yes
```

**Important:** The criterion name must match what's defined in the configuration. If it's not in the config, it won't display. Check with administrators if unsure.

---

### Step 3.4: Update Multiple Fields

**Exercise: Complete update of an entry**

**Scenario:** Tool XYZ released version 2.0 with new features

**Changes needed:**
- Update Version: 1.5.0 → 2.0.0
- Add new feature: "AI Pair Programming"
- Update rating: 4.2 → 4.5
- Update Last Updated date

**Steps:**
1. Open the file
2. Find each field
3. Update values
4. Save

---

### Step 3.5: Test Your Changes Locally

**Build and View:**

1. **Process the data:**
   ```bash
   cd /home/user/awesome-comparisons
   npm run prepare-data
   ```

2. **Start the dev server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   - Navigate to http://localhost:4200
   - Find your new/updated item
   - Verify all fields display correctly

4. **Check for errors:**
   - Look in browser console (F12)
   - Check terminal for build warnings

---

## Part 4: Practical Exercise (10 mins)

### Exercise: Add a Complete New Entry

**Your Mission:** Add a new AI code editor to the comparison

**Requirements:**
- Choose a real or fictional AI code editor
- Create a complete markdown entry with:
  - Proper header and description
  - All standard sections (General Info, Licensing, Features, etc.)
  - At least 15 criteria filled out
  - Proper formatting
  - Repository link

**Deliverable:**
- File: `datasets/code-editor/data/your-tool.md`
- Verify it appears in the comparison view

**Time limit:** 10 minutes

**Evaluation Criteria:**
- File named correctly
- All required sections present
- Values are realistic/accurate
- Proper markdown formatting
- Tool appears in comparison without errors

---

## Best Practices

### Content Quality

**DO:**
- ✅ Use accurate, up-to-date information
- ✅ Write clear, concise descriptions
- ✅ Be consistent with terminology
- ✅ Include version numbers when relevant
- ✅ Provide context for ratings
- ✅ Link to official sources

**DON'T:**
- ❌ Copy descriptions verbatim from marketing material
- ❌ Use biased or promotional language
- ❌ Leave fields empty without good reason
- ❌ Use inconsistent formatting
- ❌ Include personal opinions as facts

---

### Formatting Standards

**File Naming:**
```
✅ github-copilot.md
✅ cline.md
✅ amazon-q-developer.md

❌ GitHub Copilot.md
❌ Cline_Editor.md
❌ amazon q developer.md
```

**Section Formatting:**
```markdown
✅ Correct:
## Features
### MCP Client
- Yes

❌ Wrong:
##Features          (no space after ##)
### MCP client      (wrong capitalization)
-Yes                (no space after -)
```

---

### Value Formatting Guidelines

**Yes/No Fields:**
```markdown
✅ - Yes
✅ - No
✅ - Partial
✅ - In Development
```

**List Fields:**
```markdown
✅ - TypeScript, JavaScript, Python
✅ - Windows, macOS, Linux
```

**Descriptions:**
```markdown
✅ - Full Git integration with visual diff and merge tools
❌ - Yes (too brief for a description field)
```

**URLs:**
```markdown
✅ - https://github.com/owner/repo
✅ - https://docs.example.com
❌ - docs.example.com (missing protocol)
```

---

### Version Control Best Practices

**Commit Messages:**
```bash
✅ git commit -m "Add CodeWizard to code-editor comparison"
✅ git commit -m "Update Cline rating to 4.8"
✅ git commit -m "Add Mobile Support field to 5 editors"

❌ git commit -m "updates"
❌ git commit -m "fix"
```

**Workflow:**
```bash
# 1. Pull latest changes
git pull origin main

# 2. Create your changes
# (edit files)

# 3. Stage your changes
git add datasets/code-editor/data/codewizard.md

# 4. Commit with clear message
git commit -m "Add CodeWizard to code-editor comparison"

# 5. Push to repository
git push origin main
```

---

### Quality Checklist

Before submitting changes, verify:

**File Structure:**
- [ ] File in correct `datasets/{dataset-id}/data/` folder
- [ ] Filename follows naming convention
- [ ] File uses `.md` extension

**Content:**
- [ ] Title and URL in header
- [ ] Description present (1-3 paragraphs)
- [ ] All standard sections included
- [ ] Minimum 10 criteria filled out
- [ ] Repo section at end

**Format:**
- [ ] Sections use `##`
- [ ] Criteria use `###`
- [ ] Values use `-` with space
- [ ] No formatting errors
- [ ] Consistent capitalization

**Accuracy:**
- [ ] Information is current
- [ ] URLs are valid
- [ ] Version numbers are correct
- [ ] Rating is justified

**Testing:**
- [ ] Runs through data preparation without errors
- [ ] Displays correctly in UI
- [ ] All fields appear as expected
- [ ] No broken links

---

## Quick Reference

### Markdown Entry Template

```markdown
# Tool Name - https://repository-url
Brief description paragraph.

## General Info
### Classification
- Value

### Version
- X.Y.Z

### Rating
- 0-5

### Short Description
- One-line description

## Licensing
### Opensource
- Yes/No

### License
- License name

### Free Trial
- Yes/No

## Features
### Feature1
- Value

### Feature2
- Value

## Developer Experience
### Onboarding
- Description

### Learning Curve
- Easy/Moderate/Steep

## Extensibility
### Plugins
- Yes/No - details

### Hooks
- Yes/No

## Repo
- https://repository-url
```

---

### Common Criteria by Section

**General Info:**
- Classification
- Version
- Rating
- Short Description
- Last Updated

**Licensing:**
- Opensource
- License
- Free Trial
- Pricing

**Features:**
- MCP Client
- Prompts
- Tools
- Resources
- Chat
- Workspace
- Git Support

**Developer Experience:**
- Onboarding
- Learning Curve
- Documentation Quality
- Community Support
- Update Frequency

**Extensibility:**
- Plugins
- Hooks
- Custom Modes
- Subagents

---

### Command Reference

```bash
# Navigate to data folder
cd /home/user/awesome-comparisons/datasets/{dataset-id}/data/

# Create new entry
touch tool-name.md

# Edit entry
code tool-name.md
# or
nano tool-name.md

# View entry
cat tool-name.md

# Process data
npm run prepare-data

# Start dev server
npm start

# Git workflow
git status
git add datasets/{dataset-id}/data/tool-name.md
git commit -m "Add tool-name to {dataset-id} comparison"
git push origin main
```

---

## Troubleshooting

### Common Issues

**Issue:** Entry doesn't appear in comparison
- **Check:** File is in correct data folder
- **Check:** Filename is lowercase and hyphenated
- **Check:** File extension is `.md`
- **Check:** Data preparation ran successfully
- **Check:** Browser cache (hard refresh with Ctrl+Shift+R)

**Issue:** Criterion doesn't display
- **Check:** Criterion name matches configuration exactly
- **Check:** Proper section hierarchy (`##` section, `###` criterion)
- **Check:** Value uses `- ` format

**Issue:** Formatting looks broken
- **Check:** Consistent use of `##`, `###`, `-`
- **Check:** Spaces after hash marks and dashes
- **Check:** No special characters causing issues

**Issue:** Data preparation fails
- **Check:** YAML-like errors in markdown
- **Check:** File encoding (should be UTF-8)
- **Check:** No invalid characters in filenames

---

## Next Steps

**After This Tutorial:**

1. **Add 2-3 entries** to practice
2. **Update 3-5 existing entries** with new information
3. **Review other entries** to learn different approaches
4. **Join content editor team** discussions

**Want to Learn More?**

- **Track A:** Learn the end-user perspective
- **Track C:** Learn how to configure criteria and structure
- **Track D:** Learn the full system architecture

---

## Additional Resources

**Documentation:**
- [Update YOUR Comparison](../uc-v3/Update_YOUR_Comparison.md)
- [Overview](../uc-v3/Overview.md)
- [Troubleshooting](../uc-v3/Troubleshooting.md)

**Style Guides:**
- Check existing entries for examples
- Consult team standards document (if available)

**Get Help:**
- Ask administrators about new criteria
- Check with team lead about content guidelines
- Submit issues for bugs or unclear documentation

---

## Feedback

**How was this tutorial?**
- Did you successfully add a new entry?
- Were the instructions clear?
- What would make this better?

**Share feedback:** [Contact information]

---

## Completion Checklist

- [ ] Understand dataset folder structure
- [ ] Can read and interpret markdown entries
- [ ] Created a new entry from scratch
- [ ] Updated an existing entry
- [ ] Tested changes locally
- [ ] Verified entry appears in UI
- [ ] Understand formatting best practices
- [ ] Know how to commit changes with Git

**Congratulations! You're now a content editor for Awesome Comparisons!**
