# Demo Scenario 3: Creating a New Comparison from Scratch
## Project Management Tools Dataset

**Duration:** 10 minutes
**Purpose:** Demonstrate creating a complete new dataset
**Audience:** Administrators, potential users evaluating extensibility

---

## Scenario Overview

**The Story:**
> "Our team needs to choose a project management tool. Let's create a brand new comparison dataset for project management tools like Trello, Asana, and Monday.com - from scratch in just 10 minutes."

**What This Demonstrates:**
- Creating dataset folder structure
- Defining custom criteria
- Organizing groups
- Adding data entries
- Registering in manifest
- End-to-end dataset creation workflow

---

## Pre-Demo Preparation

### Setup Checklist (10 minutes before demo)

- [ ] Terminal/command line ready
- [ ] Text editor open (VS Code recommended)
- [ ] Browser with local dev server ready
- [ ] Git status clean (for clear demonstration)
- [ ] Research 3 PM tools for realistic data
- [ ] Have logo URLs ready (optional)

### Equipment Needed

- IDE/Text editor (VS Code, Sublime, etc.)
- Terminal
- Browser
- Split screen capability (editor + terminal, or editor + browser)

### Research Beforehand

Gather basic info for 3 PM tools:
- **Trello**: Pricing, features, integrations
- **Asana**: Pricing, features, integrations
- **Monday.com**: Pricing, features, integrations

### Backup Plan

- Pre-created dataset folder to copy
- Pre-written markdown entries
- Pre-configured manifest entry

---

## Demo Script

### INTRODUCTION (30 seconds)

**Say:**
> "Let me show you how to create a completely new comparison from scratch. We're going to build a project management tools comparison with criteria for pricing, features, and integrations - and we'll have it live in just 10 minutes."

**Do:**
- Show blank terminal
- Show file explorer at repository root
- Set expectations

**Screen Shows:**
- Clean workspace
- Repository root directory
- Ready to build

---

### STEP 1: Create Folder Structure (60 seconds)

**Say:**
> "First, we need to create the standard folder structure for our new dataset. Let me create the folders."

**Do:**

```bash
cd /home/user/awesome-comparisons/datasets

# Create main folder
mkdir project-management

# Create subdirectories
mkdir project-management/config
mkdir project-management/data

# Create required files
touch project-management/dataset.yaml
touch project-management/description.md
touch project-management/config/comparison.yml
```

**Screen Shows:**
```
datasets/
└── project-management/     ← NEW
    ├── config/
    │   └── comparison.yml
    ├── data/
    ├── dataset.yaml
    └── description.md
```

**Tip the Audience:**
> "This is the standard structure for every dataset. It's simple and consistent."

---

### STEP 2: Configure Dataset Metadata (90 seconds)

**Say:**
> "Now let's configure the dataset metadata - basic information about our comparison."

**Do:**

**Open:** `datasets/project-management/dataset.yaml`

**Type:**
```yaml
id: project-management
name: "Project Management"
title: "Project Management Tools Comparison"
description: "Compare features and pricing of popular project management tools"
icon: "assignment"
theme: "blue"
```

**Explain each field:**
- `id`: URL identifier (matches folder name)
- `name`: Short display name
- `title`: Full title for page header
- `description`: Brief description
- `icon`: Material icon name (optional)
- `theme`: Color theme (optional)

**Screen Shows:**
- Clean YAML file
- Well-formatted metadata
- Clear structure

**Tip the Audience:**
> "This metadata controls how the dataset appears in the selector and on the page."

---

### STEP 3: Write Dataset Description (60 seconds)

**Say:**
> "Let's add a description that explains what this comparison is about."

**Do:**

**Open:** `datasets/project-management/description.md`

**Type:**
```markdown
# Project Management Tools Comparison

Find the perfect project management tool for your team. This comparison
covers the most popular PM tools across pricing, features, team size
support, and integrations.

## Included Tools

- Trello - Visual board-based project management
- Asana - Comprehensive task and project tracking
- Monday.com - Flexible work operating system
- And more...

## Key Criteria

- **Pricing**: Free tier availability and paid plans
- **Team Features**: Collaboration and communication tools
- **Integrations**: Connect with your existing tools
- **Use Cases**: Best fit for different team sizes and industries
```

**Screen Shows:**
- Markdown formatted description
- Clear sections
- Professional presentation

---

### STEP 4: Define Criteria (120 seconds)

**Say:**
> "Now the important part - defining what we want to compare. Let's create our criteria."

**Do:**

**Open:** `datasets/project-management/config/comparison.yml`

**Type:**
```yaml
criteria:
  # General Info
  - name: "Tool Name"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "text"

  - name: "Best For"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "text"

  - name: "Rating"
    searchable: false
    showInTable: true
    showInDetails: true
    type: "rating"

  # Pricing
  - name: "Free Tier"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "label"

  - name: "Starting Price"
    searchable: false
    showInTable: true
    showInDetails: true
    type: "text"

  - name: "Pricing Model"
    searchable: true
    showInTable: false
    showInDetails: true
    type: "text"

  # Features
  - name: "Max Team Size"
    searchable: false
    showInTable: true
    showInDetails: true
    type: "text"

  - name: "Mobile Apps"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "label"

  - name: "Integrations"
    searchable: true
    showInTable: false
    showInDetails: true
    type: "markdown"

  - name: "Key Features"
    searchable: true
    showInTable: false
    showInDetails: true
    type: "markdown"
```

**Explain:**
- "We have 10 criteria covering the basics"
- "Mix of types: text, rating, label, markdown"
- "Some visible in table, some only in details"

**Screen Shows:**
- Well-structured YAML
- Variety of criterion types
- Logical organization

---

### STEP 5: Organize Into Groups (90 seconds)

**Say:**
> "Let's organize these criteria into logical groups for better readability."

**Do:**

**Continue in comparison.yml, add:**

```yaml
groups:
  - name: "General Info"
    description: "Basic information about the tool"
    criteria:
      - "Tool Name"
      - "Best For"
      - "Rating"

  - name: "Pricing"
    description: "Cost and pricing structure"
    criteria:
      - "Free Tier"
      - "Starting Price"
      - "Pricing Model"

  - name: "Features"
    description: "Key features and capabilities"
    criteria:
      - "Max Team Size"
      - "Mobile Apps"
      - "Integrations"
      - "Key Features"
```

**Screen Shows:**
- Three clear groups
- Criteria organized logically
- Easy to scan

**Tip the Audience:**
> "Groups help users find information quickly. Keep them focused - 3-5 groups is ideal."

---

### STEP 6: Add First Data Entry - Trello (150 seconds)

**Say:**
> "Now let's add our first tool - Trello. This is just a simple markdown file."

**Do:**

**Create:** `datasets/project-management/data/trello.md`

**Type:**
```markdown
# Trello - https://trello.com
Trello is a visual project management tool based on boards, lists, and
cards. It's great for small teams and simple project tracking.

## General Info
### Tool Name
- Trello

### Best For
- Small teams, visual thinkers, simple workflows

### Rating
- 4.5

## Pricing
### Free Tier
- Yes - unlimited cards and up to 10 boards

### Starting Price
- $5 per user/month

### Pricing Model
- Per user, monthly or annual billing

## Features
### Max Team Size
- Unlimited (but best for teams under 50)

### Mobile Apps
- iOS, Android

### Integrations
- Slack, Google Drive, Dropbox, Jira, GitHub, and 100+ more via Power-Ups

### Key Features
- **Kanban boards** for visual project tracking
- **Power-Ups** for extending functionality
- **Butler automation** for repetitive tasks
- **Templates** for quick setup
- **Card aging** to identify stale tasks
```

**Explain while typing:**
- "Header format: Tool Name - URL"
- "Description paragraph(s)"
- "Sections match our criteria exactly"
- "Triple hash for criteria name"
- "Dash for the value"

**Screen Shows:**
- Complete markdown entry
- Clean formatting
- All criteria filled out

---

### STEP 7: Add Second Entry - Asana (60 seconds)

**Say:**
> "Let me quickly add a second tool - Asana. I'll speed through this one."

**Do:**

**Create:** `datasets/project-management/data/asana.md`

**Type (quickly):**
```markdown
# Asana - https://asana.com
Asana is a comprehensive work management platform for teams to organize,
track, and manage their work.

## General Info
### Tool Name
- Asana

### Best For
- Medium to large teams, complex projects

### Rating
- 4.4

## Pricing
### Free Tier
- Yes - up to 15 people

### Starting Price
- $10.99 per user/month

### Pricing Model
- Per user, monthly or annual billing

## Features
### Max Team Size
- Unlimited

### Mobile Apps
- iOS, Android

### Integrations
- 200+ integrations including Slack, Zoom, Adobe Creative Cloud, Salesforce

### Key Features
- **Timeline view** for Gantt-style planning
- **Workload management** to balance team capacity
- **Goals tracking** to align work with objectives
- **Portfolios** to track multiple projects
- **Forms** to standardize request intake
```

**Tip the Audience:**
> "Once you have one entry as a template, the others are quick to add."

---

### STEP 8: Add Third Entry - Monday.com (60 seconds)

**Say:**
> "And one more - Monday.com."

**Do:**

**Create:** `datasets/project-management/data/monday.md`

**Type (quickly):**
```markdown
# Monday.com - https://monday.com
Monday.com is a flexible Work OS that powers teams to run projects and
workflows with confidence.

## General Info
### Tool Name
- Monday.com

### Best For
- Teams wanting high customization

### Rating
- 4.6

## Pricing
### Free Tier
- Yes - up to 2 users

### Starting Price
- $8 per user/month

### Pricing Model
- Per user, monthly or annual, minimum 3 seats

## Features
### Max Team Size
- Unlimited

### Mobile Apps
- iOS, Android

### Integrations
- 40+ native integrations plus Zapier for thousands more

### Key Features
- **Customizable boards** with 10+ view types
- **Automations** with no-code builder
- **Dashboards** for high-level overview
- **Time tracking** built-in
- **Templates** for 200+ use cases
```

**Screen Shows:**
- Third entry complete
- Consistent formatting across all three

---

### STEP 9: Register in Manifest (90 seconds)

**Say:**
> "Almost done! We need to register our new dataset in the manifest file so the system knows about it."

**Do:**

**Open:** `configuration/datasets.manifest.json`

**Find** the `datasets` object and **add:**

```json
{
  "datasets": {
    "code-editor": { ... },
    "prototyping": { ... },
    "project-management": {
      "id": "project-management",
      "default": false,
      "shared": {
        "valueDisplays": "value-displays"
      }
    }
  }
}
```

**Explain:**
- `id` matches folder name and dataset.yaml
- `default: false` - not the default dataset
- `shared.valueDisplays` - inherit emoji displays for Yes/No
- Not inheriting criteria (we defined our own)

**Screen Shows:**
- Manifest file with new entry
- Proper JSON formatting
- No syntax errors

**Tip the Audience:**
> "The manifest is the registry. If it's not here, the system won't find it."

---

### STEP 10: Test the Dataset (60 seconds)

**Say:**
> "Let's see it in action! First, we'll process the data, then view it."

**Do:**

**In terminal:**
```bash
# Process markdown to JSON
npm run prepare-data

# Start dev server (if not already running)
npm start
```

**In browser:**
```
1. Navigate to http://localhost:4200
2. Click dataset selector
3. Find "Project Management"
4. Click to switch to it
```

**Screen Shows:**
- Build process running
- Dev server starting
- Browser showing new dataset
- All three tools displayed
- Criteria organized in groups
- Everything working!

**Tip the Audience:**
> "And there it is - a fully functional comparison we built from scratch in 10 minutes!"

---

### STEP 11: Quick Tour (30 seconds)

**Say:**
> "Let's quickly verify everything works."

**Do:**

1. **Search**: Type "Trello" - it appears
2. **Filter**: Show only tools with free tier
3. **View Details**: Click on Asana - detail panel opens
4. **Export**: Click export - Excel downloads

**Screen Shows:**
- All features working
- Data displays correctly
- Groups are collapsible
- Professional appearance

---

### CONCLUSION (20 seconds)

**Say:**
> "And that's how you create a new comparison from scratch! In about 10 minutes, we:
> - Created the folder structure
> - Defined 10 criteria
> - Organized them into groups
> - Added 3 tools
> - Registered in the manifest
> - And now it's live and working!
>
> You can add more tools anytime - it's just more markdown files."

**Do:**
- Show the final product one more time
- Return to dataset list showing all datasets
- Highlight the new "Project Management" option

---

## Key Talking Points

### During the Demo, Emphasize:

1. **Speed**: "From nothing to working in 10 minutes"

2. **Simplicity**: "Just folders, YAML, and markdown"

3. **Consistency**: "Same structure for every dataset"

4. **Flexibility**: "Define exactly the criteria you need"

5. **Reusability**: "Once you've done one, the others are easy"

---

## Handling Common Questions

### Q: "Can I import data from a spreadsheet?"
**A:** "Not directly, but you can write a script to convert CSV to markdown. The format is simple enough to template."

### Q: "How many datasets can I have?"
**A:** "As many as you want! The system handles multiple datasets efficiently."

### Q: "Can I share criteria across datasets?"
**A:** "Yes! That's what the shared configuration is for. You can define criteria once and reuse them."

### Q: "What if I want to change criteria later?"
**A:** "Just edit the comparison.yml file. Existing data for unchanged criteria remains intact."

---

## Troubleshooting During Demo

### Issue: Data Preparation Fails
- **Fix**: Check YAML syntax, markdown formatting
- **Say**: "Let me check for a syntax error..."

### Issue: Dataset Doesn't Appear in Selector
- **Fix**: Verify manifest registration, refresh browser
- **Say**: "Let me make sure it's registered properly..."

### Issue: Criteria Don't Display
- **Fix**: Check exact name matching between config and markdown
- **Say**: "The names need to match exactly - let me verify..."

### Issue: Groups Don't Show
- **Fix**: Verify groups YAML, check criteria names
- **Say**: "Let me double-check the group configuration..."

---

## Variations for Different Audiences

### For Quick Demo (5 minutes)
- Pre-create folder structure
- Show only 1 tool entry
- Skip description file
- Focus on workflow concept

### For Technical Audience
- Show Git commits at each step
- Discuss file format choices
- Mention automation possibilities
- Show how to add custom scripts

### For Decision Makers
- Focus on end result
- Emphasize time to value
- Show variety of possible datasets
- Discuss scalability

---

## Practice Checklist

Before presenting:

- [ ] Know the exact commands by heart
- [ ] Have tool data researched
- [ ] Practice typing the YAML and markdown
- [ ] Test the full flow 2-3 times
- [ ] Prepare for common typos
- [ ] Time yourself
- [ ] Have backup prepared

---

## Post-Demo Actions

1. **Show Possibilities**:
   - "You could create comparisons for any domain"
   - "Examples: SaaS tools, hardware, services, anything"

2. **Offer Resources**:
   - "Tutorial Track C covers this in depth"
   - "Template files are in the repo"

3. **Discuss Next Steps**:
   - "Add more tools over time"
   - "Customize the criteria as you learn"
   - "Get team feedback and iterate"

4. **Connect to Bigger Picture**:
   - "This is one dataset of many"
   - "They all share the same infrastructure"
   - "Consistency across your organization"

---

## Success Metrics

Demo is successful if:

- ✅ Completed in under 10 minutes
- ✅ Dataset appears in selector
- ✅ All 3 tools display correctly
- ✅ Search and filter work
- ✅ Audience asks "what else can I compare"
- ✅ Clear understanding of workflow

---

## Files Created Checklist

At the end, you should have created:

- [ ] `datasets/project-management/` (folder)
- [ ] `datasets/project-management/config/` (folder)
- [ ] `datasets/project-management/data/` (folder)
- [ ] `datasets/project-management/dataset.yaml`
- [ ] `datasets/project-management/description.md`
- [ ] `datasets/project-management/config/comparison.yml`
- [ ] `datasets/project-management/data/trello.md`
- [ ] `datasets/project-management/data/asana.md`
- [ ] `datasets/project-management/data/monday.md`
- [ ] Updated `configuration/datasets.manifest.json`

---

## Quick Reference

**Timeline:**
- 0:00-0:30 - Introduction
- 0:30-1:30 - Create folder structure
- 1:30-3:00 - Configure metadata and description
- 3:00-5:00 - Define criteria
- 5:00-6:30 - Organize groups
- 6:30-9:00 - Add 3 tool entries
- 9:00-9:30 - Register in manifest
- 9:30-10:00 - Test and conclusion

**Key Message:**
> "Creating a new comparison is straightforward - just folders, YAML, and markdown. Anyone can do it."
