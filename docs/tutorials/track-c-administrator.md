# Tutorial Track C: Administrator Guide
## Configuring and Customizing Comparisons

**Duration:** 60 minutes
**Target Audience:** People who will create new comparisons or modify structure
**Prerequisites:** Understanding of YAML, basic programming concepts
**What You'll Learn:** How to use the admin interface and configure comparison structure

---

## Table of Contents

1. [Introduction](#introduction)
2. [Part 1: Configuration System Deep Dive (15 mins)](#part-1-configuration-system-deep-dive)
3. [Part 2: Using the Admin Interface (20 mins)](#part-2-using-the-admin-interface)
4. [Part 3: Create a New Dataset (15 mins)](#part-3-create-a-new-dataset)
5. [Part 4: Practical Exercise (10 mins)](#part-4-practical-exercise)
6. [Advanced Topics](#advanced-topics)
7. [Quick Reference](#quick-reference)

---

## Introduction

As an administrator, you'll configure the structure and behavior of comparisons. This includes defining criteria, organizing groups, managing inheritance, and creating new datasets.

### What You'll Learn
- Configuration inheritance system
- Using the Admin interface (`/admin`)
- Creating and modifying criteria
- Managing groups
- Value display mappings
- Creating new datasets
- Dataset manifest management

### Tools You'll Need
- Web browser (for Admin interface)
- Text editor (for YAML editing)
- Git (for version control)
- Understanding of YAML syntax

---

## Part 1: Configuration System Deep Dive (15 mins)

### Step 1.1: Understanding the Configuration Hierarchy

The system uses **three-tier inheritance**:

```
Level 1: Shared Defaults
    ↓ (inherits from)
Level 2: Shared Blueprints
    ↓ (inherits from)
Level 3: Dataset-Specific Configs
    ↓ (final result)
Display in Application
```

**Why This Matters:**
- Define criteria once, use everywhere
- Consistent structure across datasets
- Easy to customize per-dataset
- Reduces duplication

---

### Step 1.2: Configuration File Locations

**Key Configuration Files:**

```
configuration/
├── comparison-default.yml       # Shared criteria definitions
├── datasets.manifest.json       # Inheritance mapping
└── defaults/
    ├── general-licensing.yml    # Shared licensing criteria
    ├── groups.yml               # Basic grouping blueprint
    ├── groups-advanced.yml      # Advanced grouping
    └── value-displays.yml       # Display mappings (emojis)
```

**Dataset-Specific:**
```
datasets/{dataset-id}/
├── config/
│   └── comparison.yml           # Dataset overrides
└── dataset.yaml                 # Dataset metadata
```

---

### Step 1.3: The Manifest File

**Location:** `configuration/datasets.manifest.json`

**Purpose:** Controls which shared configurations each dataset inherits

**Example:**
```json
{
  "datasets": {
    "code-editor": {
      "id": "code-editor",
      "default": true,
      "shared": {
        "groups": "groups-advanced",
        "valueDisplays": "value-displays",
        "comparison": "comparison-default"
      }
    },
    "prototyping": {
      "id": "prototyping",
      "shared": {
        "groups": "groups",
        "valueDisplays": "value-displays",
        "comparison": "comparison-default"
      }
    }
  }
}
```

**Key Fields:**
- `id`: Unique dataset identifier
- `default`: Whether this is the default dataset
- `shared.groups`: Which grouping blueprint to use
- `shared.valueDisplays`: Which value display config
- `shared.comparison`: Which base comparison config

---

### Step 1.4: Criteria Definition (YAML)

**Example from comparison-default.yml:**

```yaml
criteria:
  - name: "Classification"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "text"

  - name: "Rating"
    searchable: false
    showInTable: true
    showInDetails: true
    type: "rating"

  - name: "MCP Client"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "label"
```

**Field Explanations:**
- `name`: Criterion display name (must match markdown exactly)
- `searchable`: Include in search index
- `showInTable`: Display in comparison table
- `showInDetails`: Display in detail view
- `type`: Data type (text, label, rating, markdown, url, repository)

---

### Step 1.5: Groups Definition (YAML)

**Example from groups-advanced.yml:**

```yaml
groups:
  - name: "General Info"
    criteria:
      - "Classification"
      - "Version"
      - "Rating"
      - "Short Description"

  - name: "Licensing"
    criteria:
      - "Opensource"
      - "License"
      - "Free Trial"

  - name: "Features"
    criteria:
      - "MCP Client"
      - "Prompts"
      - "Tools"
      - "Git Support"
```

**Structure:**
- `groups`: Array of group objects
- Each group has `name` and `criteria` array
- Criteria order determines display order
- Group names should be descriptive

---

### Step 1.6: Value Displays (YAML)

**Example from value-displays.yml:**

```yaml
valueDisplays:
  "Yes":
    emoji: "✅"
    html: "<span class='yes'>Yes</span>"

  "No":
    emoji: "❌"
    html: "<span class='no'>No</span>"

  "Partial":
    emoji: "⚠️"
    html: "<span class='partial'>Partial</span>"
```

**Purpose:** Maps text values to visual representations

**Use Cases:**
- Emoji indicators for Yes/No
- Color-coded status
- Icons for different states
- Consistent visual language

---

## Part 2: Using the Admin Interface (20 mins)

### Step 2.1: Access the Admin Interface

**Steps:**

1. **Start the application:**
   ```bash
   cd /home/user/awesome-comparisons
   npm start
   ```

2. **Open in browser:**
   - Navigate to: `http://localhost:4200/admin/config`
   - The config workspace backend runs at `http://localhost:3100` and is proxied by the Angular dev server.

3. **You'll see three panels:**
   - **Left:** Catalog Tree (file browser)
   - **Center:** Criteria Editor (YAML form)
   - **Right:** Diff Viewer (changes preview)

---

### Step 2.2: Navigate the Catalog Tree

**Left Panel - File Navigation:**

**Structure:**
```
📁 Shared Configurations
  📄 comparison-default.yml
  📄 groups.yml
  📄 groups-advanced.yml
  📄 value-displays.yml

📁 Dataset Configurations
  📁 code-editor
    📄 comparison.yml
  📁 prototyping
    📄 comparison.yml
  ...
```

**Actions:**
- Click folders to expand/collapse
- Click files to load in editor
- Current file highlighted
- Dataset selector at top

---

### Step 2.3: Understanding the Criteria Form

**Center Panel - Visual Editor:**

When you select a configuration file, you'll see forms for:

**Criteria Section:**
- Name (text input)
- Type dropdown (text, label, rating, etc.)
- Searchable checkbox
- Show in Table checkbox
- Show in Details checkbox
- Additional options based on type

**Groups Section:**
- Group name input
- Criteria selection (multi-select)
- Reorder criteria
- Add/remove groups

**Value Displays Section:**
- Value text
- Emoji picker
- HTML template
- CSS class

---

### Step 2.4: Add a New Criterion

**Exercise: Add "API Support" criterion**

**Steps:**

1. **Select file in catalog:**
   - Navigate to: Shared Configurations → comparison-default.yml

2. **Scroll to Criteria section**

3. **Click "Add Criterion" button**

4. **Fill in the form:**
   - Name: `API Support`
   - Type: `label`
   - Searchable: ✅ checked
   - Show in Table: ✅ checked
   - Show in Details: ✅ checked

5. **Preview in Diff Viewer (right panel)**
   - You'll see the YAML that will be added

6. **Click "Save"**

**Result:** New criterion added to shared configuration

---

### Step 2.5: Modify an Existing Criterion

**Exercise: Make "Version" non-searchable**

**Steps:**

1. **Load comparison-default.yml**

2. **Find "Version" in criteria list**

3. **Uncheck "Searchable"**

4. **Review diff (shows before/after)**

5. **Save changes**

**Why?** Version numbers rarely need to be searchable

---

### Step 2.6: Create a New Group

**Exercise: Add "Integration" group**

**Steps:**

1. **Select groups-advanced.yml**

2. **Scroll to Groups section**

3. **Click "Add Group"**

4. **Fill in:**
   - Name: `Integration`
   - Description: `Integration and compatibility features`

5. **Add criteria to group:**
   - Select: API Support
   - Select: MCP Client
   - Select: Plugins

6. **Reorder if needed** (drag and drop)

7. **Save**

---

### Step 2.7: Configure Value Displays

**Exercise: Add display for "In Development" status**

**Steps:**

1. **Select value-displays.yml**

2. **Click "Add Value Display"**

3. **Fill in:**
   - Value: `In Development`
   - Emoji: `🚧`
   - HTML: `<span class="in-dev">In Development</span>`
   - CSS Class: `in-development`

4. **Preview the rendering**

5. **Save**

**Use Case:** Markdown entries can now use "In Development" and it will show with a construction emoji

---

### Step 2.8: Use the Diff Viewer

**Right Panel - Change Preview:**

**Features:**
- **Side-by-side diff:** Shows old vs new
- **Syntax highlighting:** YAML formatted
- **Line numbers:** Easy reference
- **Add/remove indicators:** Green for additions, red for removals
- **Real-time updates:** Changes as you edit

**Benefits:**
- Verify changes before saving
- Catch mistakes early
- Understand impact of changes
- Review complex modifications

---

### Step 2.9: Dataset-Specific Overrides

**Exercise: Override a criterion for specific dataset**

**Scenario:** Prototyping dataset doesn't need "Git Support"

**Steps:**

1. **Navigate to:** Dataset Configurations → prototyping → comparison.yml

2. **Find "Git Support" criterion**

3. **Uncheck "Show in Table"**
   - Keep in details view
   - Just hide from table

4. **Save**

**Result:** Git Support hidden in prototyping comparison table, but still appears elsewhere

---

## Part 3: Create a New Dataset (15 mins)

### Step 3.1: Plan Your Dataset

**Let's create:** "Cloud Storage Comparison"

**Criteria to include:**
- Provider Name
- Storage Capacity
- Price (monthly)
- Free Tier
- Platforms (Windows, Mac, Linux, Mobile)
- Security Features
- Collaboration Tools
- API Access

**Groups:**
- General Info
- Pricing
- Features
- Security

---

### Step 3.2: Create Dataset Folder Structure

**Steps:**

```bash
cd /home/user/awesome-comparisons/datasets

# Create dataset folder
mkdir cloud-storage

# Create subdirectories
mkdir cloud-storage/config
mkdir cloud-storage/data

# Create required files
touch cloud-storage/dataset.yaml
touch cloud-storage/description.md
touch cloud-storage/config/comparison.yml
```

---

### Step 3.3: Configure Dataset Metadata

**Edit: datasets/cloud-storage/dataset.yaml**

```yaml
id: cloud-storage
name: "Cloud Storage"
title: "Cloud Storage Providers Comparison"
description: "Compare features and pricing of cloud storage solutions"
icon: "cloud"
theme: "blue"
```

**Fields:**
- `id`: URL-safe identifier (kebab-case)
- `name`: Short name
- `title`: Full display title
- `description`: Brief description
- `icon`: Material icon name (optional)
- `theme`: Color theme (optional)

---

### Step 3.4: Write Dataset Description

**Edit: datasets/cloud-storage/description.md**

```markdown
# Cloud Storage Providers Comparison

This comparison helps you find the best cloud storage solution for your needs.
We compare major providers across pricing, storage capacity, security features,
and platform support.

## Included Providers

- Dropbox
- Google Drive
- Microsoft OneDrive
- Apple iCloud
- Box
- pCloud
- And more...

## Key Criteria

- Storage capacity and pricing
- Free tier offerings
- Security and encryption
- Cross-platform support
- Collaboration features
- API access for developers
```

---

### Step 3.5: Define Dataset Criteria

**Edit: datasets/cloud-storage/config/comparison.yml**

```yaml
criteria:
  - name: "Provider"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "text"

  - name: "Storage Capacity"
    searchable: false
    showInTable: true
    showInDetails: true
    type: "text"

  - name: "Monthly Price"
    searchable: false
    showInTable: true
    showInDetails: true
    type: "text"

  - name: "Free Tier"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "label"

  - name: "Platforms"
    searchable: true
    showInTable: false
    showInDetails: true
    type: "label"

  - name: "Security Features"
    searchable: true
    showInTable: false
    showInDetails: true
    type: "markdown"

  - name: "Collaboration"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "label"

  - name: "API Access"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "label"

groups:
  - name: "General Info"
    criteria:
      - "Provider"
      - "Storage Capacity"

  - name: "Pricing"
    criteria:
      - "Monthly Price"
      - "Free Tier"

  - name: "Features"
    criteria:
      - "Platforms"
      - "Collaboration"
      - "API Access"

  - name: "Security"
    criteria:
      - "Security Features"
```

---

### Step 3.6: Add Data Entries

**Create: datasets/cloud-storage/data/dropbox.md**

```markdown
# Dropbox - https://www.dropbox.com
Dropbox is a cloud storage service that lets you save files online and sync
them to your devices. Known for its reliability and ease of use.

## General Info
### Provider
- Dropbox

### Storage Capacity
- 2TB (Plus plan), 3TB+ (Professional)

## Pricing
### Monthly Price
- $11.99/month (Plus), $19.99/month (Professional)

### Free Tier
- Yes - 2GB free

## Features
### Platforms
- Windows, macOS, Linux, iOS, Android, Web

### Collaboration
- Yes - Advanced sharing and collaboration tools

### API Access
- Yes - Comprehensive developer API

## Security
### Security Features
- 256-bit AES encryption
- Two-factor authentication
- Remote wipe capability
- File recovery and version history
```

**Repeat for:** google-drive.md, onedrive.md, etc.

---

### Step 3.7: Register Dataset in Manifest

**Edit: configuration/datasets.manifest.json**

Add your new dataset:

```json
{
  "datasets": {
    "code-editor": { ... },
    "prototyping": { ... },
    "cloud-storage": {
      "id": "cloud-storage",
      "default": false,
      "shared": {
        "valueDisplays": "value-displays"
      }
    }
  }
}
```

**Note:**
- We're not inheriting shared criteria (dataset has unique structure)
- We ARE inheriting value displays (Yes/No emojis)

---

### Step 3.8: Test Your New Dataset

**Steps:**

1. **Prepare data:**
   ```bash
   npm run prepare-data
   ```

2. **Start dev server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   - Go to http://localhost:4200
   - Use dataset selector
   - Choose "Cloud Storage"

4. **Verify:**
   - All providers appear
   - Criteria display correctly
   - Groups are organized
   - Search works
   - Export works

---

## Part 4: Practical Exercise (10 mins)

### Exercise: Create "Web Browsers Comparison"

**Your Mission:** Create a complete new dataset for comparing web browsers

**Requirements:**

1. **Create folder structure:**
   - `datasets/web-browsers/`
   - All necessary subdirectories

2. **Define at least 8 criteria:**
   - Name, Version, Engine
   - Open Source, Privacy Features
   - Extensions Support, Developer Tools
   - Performance Score

3. **Organize into 3 groups:**
   - General Info
   - Privacy & Security
   - Developer Features

4. **Add 3 browser entries:**
   - Chrome
   - Firefox
   - Brave (or Safari, Edge, etc.)

5. **Register in manifest**

6. **Test locally**

**Time Limit:** 10 minutes

**Evaluation:**
- Dataset appears in selector
- All browsers display
- Criteria organized logically
- Search and filter work
- No console errors

---

## Advanced Topics

### Topic 1: Blueprint Inheritance

**Understanding Blueprints:**

Blueprints are reusable grouping patterns. Instead of defining groups for each dataset, you reference a blueprint.

**Example:**

**datasets.manifest.json:**
```json
"code-editor": {
  "shared": {
    "groups": "groups-advanced"
  }
}
```

**This means:** code-editor inherits group structure from `configuration/defaults/groups-advanced.yml`

**Dataset can override:**
- Add extra groups
- Reorder criteria within groups
- Hide specific groups

---

### Topic 2: Inheritance Resolution

**Order of precedence** (last wins):

1. **Shared default** (comparison-default.yml)
2. **Shared blueprint** (groups.yml, value-displays.yml)
3. **Dataset config** (datasets/*/config/comparison.yml)

**Example:**

```
comparison-default.yml defines:
  Rating: showInTable = true

datasets/prototyping/config/comparison.yml overrides:
  Rating: showInTable = false

Result: Rating hidden in prototyping table
```

---

### Topic 3: Advanced Value Displays

**Conditional Displays:**

```yaml
valueDisplays:
  "High":
    emoji: "🔴"
    html: "<span class='priority-high'>High</span>"
    className: "high"

  "Medium":
    emoji: "🟡"
    html: "<span class='priority-med'>Medium</span>"
    className: "medium"

  "Low":
    emoji: "🟢"
    html: "<span class='priority-low'>Low</span>"
    className: "low"
```

**With CSS:**
```css
.priority-high { color: #d32f2f; font-weight: bold; }
.priority-med { color: #f57c00; }
.priority-low { color: #388e3c; }
```

---

### Topic 4: Multi-Value Criteria

**For criteria with multiple values:**

**In markdown:**
```markdown
### Platforms
- Windows, macOS, Linux, iOS, Android
```

**In config:**
```yaml
- name: "Platforms"
  type: "label"
  multiValue: true
  separator: ","
```

**Result:** Each platform becomes a separate tag/pill in the UI

---

### Topic 5: Custom Criterion Types

**Available Types:**

- `text`: Plain text
- `label`: Tag/badge display
- `rating`: Star rating (0-5)
- `markdown`: Rich text with formatting
- `url`: Clickable link
- `repository`: GitHub/GitLab link with special handling
- `date`: Formatted date
- `boolean`: Yes/No

**Type-specific options:**

```yaml
# Rating type
- name: "Score"
  type: "rating"
  maxValue: 5

# URL type
- name: "Documentation"
  type: "url"
  openInNewTab: true

# Date type
- name: "Last Updated"
  type: "date"
  format: "YYYY-MM-DD"
```

---

### Topic 6: Dataset Themes

**Custom styling per dataset:**

**In dataset.yaml:**
```yaml
id: cloud-storage
theme:
  primaryColor: "#4285f4"
  accentColor: "#34a853"
  headerBackground: "#1a73e8"
```

**Create custom stylesheet:**
`datasets/cloud-storage/styles.css`

```css
.dataset-cloud-storage {
  --primary-color: #4285f4;
  --accent-color: #34a853;
}

.dataset-cloud-storage .header {
  background: var(--primary-color);
}
```

---

## Quick Reference

### Configuration File Hierarchy

```
Level 1: Shared
  configuration/comparison-default.yml
  configuration/defaults/*.yml

Level 2: Blueprint
  configuration/defaults/groups.yml
  configuration/defaults/value-displays.yml

Level 3: Dataset
  datasets/{id}/config/comparison.yml

Registry:
  configuration/datasets.manifest.json
```

---

### Criterion Definition Template

```yaml
- name: "Criterion Name"
  searchable: true|false
  showInTable: true|false
  showInDetails: true|false
  type: "text|label|rating|markdown|url|repository"
  # Optional type-specific fields
  multiValue: true|false
  separator: ","
  maxValue: 5
```

---

### Group Definition Template

```yaml
groups:
  - name: "Group Name"
    description: "Optional description"
    criteria:
      - "Criterion Name 1"
      - "Criterion Name 2"
      - "Criterion Name 3"
```

---

### Value Display Template

```yaml
valueDisplays:
  "Value Text":
    emoji: "🎯"
    html: "<span class='custom'>Value Text</span>"
    className: "custom-class"
```

---

### Admin Interface Keyboard Shortcuts

```
Ctrl/Cmd + S: Save current file
Ctrl/Cmd + F: Search in catalog
Ctrl/Cmd + Z: Undo last change
Ctrl/Cmd + /: Toggle diff viewer
Esc: Close dialogs
↑/↓: Navigate catalog tree
```

---

### CLI Commands for Administrators

```bash
# Prepare/update data
npm run prepare-data

# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Validate configuration
npm run validate-config

# Generate dataset report
npm run dataset-report
```

---

## Troubleshooting

### Common Issues

**Issue:** Criterion doesn't appear after adding
- **Check:** Ran `npm run prepare-data`
- **Check:** Criterion name matches exactly in markdown
- **Check:** `showInTable` or `showInDetails` is true
- **Check:** No YAML syntax errors

**Issue:** Group appears empty
- **Check:** Criteria names match defined criteria
- **Check:** Criteria are defined before being added to group
- **Check:** Dataset inherits correct blueprint

**Issue:** Value display doesn't work
- **Check:** Value text matches exactly (case-sensitive)
- **Check:** Dataset inherits value-displays config
- **Check:** No emoji rendering issues in browser

**Issue:** Dataset doesn't appear in selector
- **Check:** Registered in datasets.manifest.json
- **Check:** Dataset ID is unique
- **Check:** dataset.yaml exists and valid
- **Check:** Ran prepare-data after adding

**Issue:** Changes don't save in Admin UI
- **Check:** File permissions (write access)
- **Check:** Browser console for errors
- **Check:** Valid YAML syntax
- **Check:** Not editing read-only shared configs directly

---

## Best Practices

### Configuration Management

**DO:**
- ✅ Use shared configs for common criteria
- ✅ Override only what's necessary per dataset
- ✅ Keep groups logically organized
- ✅ Document custom configurations
- ✅ Test changes before committing
- ✅ Version control all configs

**DON'T:**
- ❌ Duplicate criteria across datasets
- ❌ Create too many groups (5-7 is optimal)
- ❌ Use inconsistent naming
- ❌ Forget to register datasets
- ❌ Make breaking changes without communication

---

### Naming Conventions

**Dataset IDs:**
- Lowercase
- Hyphen-separated
- Descriptive
- Examples: `cloud-storage`, `web-browsers`, `code-editor`

**Criterion Names:**
- Title Case
- Clear and concise
- Consistent terminology
- Examples: `Storage Capacity`, `API Support`, `Open Source`

**Group Names:**
- Title Case
- Broad categories
- 1-2 words preferred
- Examples: `General Info`, `Features`, `Security`

---

## Next Steps

**After This Tutorial:**

1. **Create a test dataset** with minimal data
2. **Experiment with the Admin UI** - try all features
3. **Study existing datasets** - learn from examples
4. **Document your configurations** - add comments in YAML
5. **Plan a real dataset** - identify use case and criteria

**Want to Learn More?**

- **Track D:** Learn the developer perspective and code architecture
- **Advanced Docs:** Read BLUEPRINT.md for deep technical details
- **Community:** Join discussions about configuration patterns

---

## Additional Resources

**Essential Documentation:**
- [Admin Config Interface](../uc-v3/Admin_Config_Interface.md)
- [Shared Configuration](../uc-v3/Shared_Configuration.md)
- [BLUEPRINT.md](../../BLUEPRINT.md)

**Examples:**
- Study `datasets/code-editor/` - most complete example
- Compare simple vs complex configurations
- Review existing manifests

---

## Completion Checklist

- [ ] Understand three-tier inheritance
- [ ] Can navigate Admin interface
- [ ] Created a new criterion
- [ ] Modified an existing criterion
- [ ] Created a new group
- [ ] Configured value displays
- [ ] Created a complete new dataset
- [ ] Registered dataset in manifest
- [ ] Tested new dataset locally
- [ ] Understand configuration best practices

**Congratulations! You're now an Awesome Comparisons administrator!**
