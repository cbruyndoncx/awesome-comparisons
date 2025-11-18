# Screenshot Guide for Tutorials
## Creating Visual Aids for Awesome Comparisons Documentation

This guide explains what screenshots to take, how to capture them, and where to use them in the tutorial materials.

---

## Table of Contents

1. [Required Screenshots](#required-screenshots)
2. [Screenshot Specifications](#screenshot-specifications)
3. [Capture Tools](#capture-tools)
4. [Annotation Guidelines](#annotation-guidelines)
5. [File Naming Convention](#file-naming-convention)
6. [Where to Place Screenshots](#where-to-place-screenshots)
7. [Quick Capture Checklist](#quick-capture-checklist)

---

## Required Screenshots

### Tutorial Track A: End User

**Total Screenshots Needed:** 15

#### 1. Main Comparison View
**File:** `comparison-main-view.png`
**What to Capture:**
- Full browser window showing comparison table
- Dataset selector visible (top-right)
- Search box visible
- At least 10 items in the table
- Multiple columns showing different criteria
- Clean, unfiltered state

**Purpose:** Shows the starting point for users
**Size:** 1920x1080 (full screen)
**Annotations:** Label: "Dataset Selector," "Search Box," "Comparison Table"

---

#### 2. Dataset Selector Dropdown
**File:** `dataset-selector-open.png`
**What to Capture:**
- Dataset selector dropdown menu open
- All available datasets visible:
  - Code/Editors (default)
  - Terminal CLI
  - Code Models
  - Code Agent
  - Prototyping
  - Other Code Tools
  - All

**Purpose:** Shows how to switch datasets
**Size:** Cropped to selector area (500x400)
**Annotations:** Arrow pointing to selector

---

#### 3. Search in Action
**File:** `search-offline.png`
**What to Capture:**
- Search box with "offline" typed in
- Table filtered to show only matching items
- Reduced number of results (from 30+ to ~8)
- Search term visible

**Purpose:** Demonstrates search functionality
**Size:** 1920x1080
**Annotations:** Highlight search box, show result count

---

#### 4. Multiple Filters Applied
**File:** `filters-applied.png`
**What to Capture:**
- Search term: "offline"
- BYOK filter: Yes
- Git Support filter: Yes
- Final results: 3-5 items
- Filter indicators visible (if any)

**Purpose:** Shows how filters narrow results
**Size:** 1920x1080
**Annotations:** Label each filter applied

---

#### 5. Detail View Panel
**File:** `detail-view-cline.png`
**What to Capture:**
- Detail view open for a tool (e.g., "Cline")
- Sidebar or modal showing full information
- All groups visible:
  - General Info
  - Licensing
  - Features
  - Developer Experience
- Repository link visible

**Purpose:** Shows detailed information view
**Size:** 1920x1080 or cropped to detail panel
**Annotations:** Label groups, highlight key sections

---

#### 6. Group Expansion/Collapse
**File:** `groups-expanded-collapsed.png`
**What to Capture:**
- Split image showing:
  - Left: Groups collapsed
  - Right: Groups expanded
- Clear visual difference

**Purpose:** Shows group functionality
**Size:** 1600x800 (side-by-side)
**Annotations:** Labels: "Collapsed" and "Expanded"

---

#### 7. Export Button
**File:** `export-button.png`
**What to Capture:**
- Close-up of Export button
- Hover state if possible
- Context showing it's in the toolbar

**Purpose:** Shows where to find export
**Size:** Cropped (400x300)
**Annotations:** Arrow or circle around button

---

#### 8. Excel Export Result
**File:** `excel-export-example.png`
**What to Capture:**
- Excel file opened
- Shows exported data:
  - Item names in column A
  - Criteria in subsequent columns
  - Data formatted cleanly

**Purpose:** Shows export output
**Size:** 1200x800
**Annotations:** Highlight key features

---

#### 9. Table Sorting
**File:** `table-sorted-by-rating.png`
**What to Capture:**
- Table sorted by Rating column
- Sort indicator visible (up/down arrow)
- Items arranged in order

**Purpose:** Shows sorting capability
**Size:** 1920x1080
**Annotations:** Highlight sort indicator

---

#### 10. Mobile/Responsive View (Optional)
**File:** `mobile-comparison-view.png`
**What to Capture:**
- Browser in mobile viewport (375x667)
- Comparison table adapted for mobile
- Touch-friendly interface

**Purpose:** Shows responsive design
**Size:** 375x667 (iPhone size)
**Annotations:** None needed

---

### Tutorial Track B: Content Editor

**Total Screenshots Needed:** 12

#### 11. Dataset Folder Structure
**File:** `dataset-folder-structure.png`
**What to Capture:**
- File explorer showing:
  ```
  datasets/code-editor/
  ├── config/
  │   └── comparison.yml
  ├── data/
  │   ├── cline.md
  │   ├── continue.md
  │   ├── cursor.md
  │   └── ...
  ├── dataset.yaml
  └── description.md
  ```

**Purpose:** Shows standard dataset structure
**Size:** 800x600
**Annotations:** Label key folders and files

---

#### 12. Markdown Entry in Editor
**File:** `markdown-entry-cline.png`
**What to Capture:**
- Text editor (VS Code) showing cline.md
- Full markdown structure visible:
  - Header with title and URL
  - Description paragraphs
  - Sections with ##
  - Criteria with ###
  - Values with -
- Syntax highlighting on

**Purpose:** Shows markdown format
**Size:** 1920x1080
**Annotations:** Label parts: "Header," "Section," "Criterion," "Value"

---

#### 13. Markdown Rendering Comparison
**File:** `markdown-raw-vs-rendered.png`
**What to Capture:**
- Split view:
  - Left: Raw markdown text
  - Right: How it appears in comparison
- Same tool shown both ways

**Purpose:** Connects markdown to output
**Size:** 1600x800
**Annotations:** Arrows showing correspondence

---

#### 14. Creating New File
**File:** `create-new-markdown-file.png`
**What to Capture:**
- File creation dialog or command
- In datasets/{dataset}/data/ folder
- Naming: codewizard.md (example)

**Purpose:** Shows file creation process
**Size:** 1000x600
**Annotations:** Highlight file name and location

---

#### 15. Git Commit in Terminal
**File:** `git-commit-new-entry.png`
**What to Capture:**
- Terminal showing:
  ```
  git add datasets/code-editor/data/codewizard.md
  git commit -m "Add CodeWizard to code-editor comparison"
  git push origin main
  ```
- Success messages visible

**Purpose:** Shows version control workflow
**Size:** 1200x400
**Annotations:** Highlight commands

---

### Tutorial Track C: Administrator

**Total Screenshots Needed:** 20

#### 16. Admin Interface Overview
**File:** `admin-interface-overview.png`
**What to Capture:**
- Full admin interface at /admin
- Three-panel layout clearly visible:
  - Left: Catalog Tree
  - Center: Criteria Editor
  - Right: Diff Viewer
- All panels populated with content

**Purpose:** Shows main admin interface
**Size:** 1920x1080
**Annotations:** Label all three panels

---

#### 17. Catalog Tree Expanded
**File:** `catalog-tree-expanded.png`
**What to Capture:**
- Left panel with folders expanded:
  - Shared Configurations
    - comparison-default.yml
    - groups.yml
    - groups-advanced.yml
    - value-displays.yml
  - Dataset Configurations
    - code-editor
    - prototyping
    - terminal
    - etc.

**Purpose:** Shows navigation structure
**Size:** Cropped to left panel (400x800)
**Annotations:** Highlight folder structure

---

#### 18. Criteria Form
**File:** `criteria-form-filled.png`
**What to Capture:**
- Center panel showing criterion being edited:
  - Name field: "Mobile Support"
  - Type dropdown: "label"
  - Checkboxes:
    - ✅ Searchable
    - ✅ Show in Table
    - ✅ Show in Details

**Purpose:** Shows criterion configuration
**Size:** Cropped to form (600x400)
**Annotations:** Label each field

---

#### 19. Groups Section
**File:** `groups-section.png`
**What to Capture:**
- Groups configuration section:
  - "Features" group expanded
  - List of criteria in group:
    - MCP Client
    - Prompts
    - Tools
    - Git Support
    - Mobile Support (new)

**Purpose:** Shows group organization
**Size:** Cropped (600x500)
**Annotations:** Highlight group structure

---

#### 20. Diff Viewer - Adding Criterion
**File:** `diff-viewer-add-criterion.png`
**What to Capture:**
- Right panel showing diff:
  - Green lines (additions):
    ```yaml
    + - name: "Mobile Support"
    +   searchable: true
    +   showInTable: true
    +   showInDetails: true
    +   type: "label"
    ```
  - Syntax highlighting
  - Line numbers

**Purpose:** Shows change preview
**Size:** Cropped to diff panel (600x400)
**Annotations:** Highlight added lines

---

#### 21. Save Confirmation
**File:** `save-confirmation.png`
**What to Capture:**
- Success message: "Configuration saved successfully"
- Save button in disabled/success state
- Optional: Timestamp of save

**Purpose:** Shows successful save
**Size:** Cropped (400x200)
**Annotations:** Highlight success message

---

#### 22. Manifest File
**File:** `datasets-manifest.png`
**What to Capture:**
- datasets.manifest.json open in editor
- JSON structure showing:
  ```json
  {
    "datasets": {
      "code-editor": {
        "id": "code-editor",
        "shared": {
          "comparison": "comparison-default",
          "groups": "groups-advanced",
          "valueDisplays": "value-displays"
        }
      }
    }
  }
  ```

**Purpose:** Shows inheritance configuration
**Size:** 1200x600
**Annotations:** Label inheritance declarations

---

#### 23. Configuration File - Shared
**File:** `comparison-default-yml.png`
**What to Capture:**
- comparison-default.yml open
- Showing multiple criteria definitions
- YAML syntax highlighted
- At least 10 criteria visible

**Purpose:** Shows shared configuration
**Size:** 1200x800
**Annotations:** Highlight structure

---

#### 24. Configuration File - Dataset Override
**File:** `dataset-specific-config.png`
**What to Capture:**
- datasets/code-editor/config/comparison.yml
- Showing overrides and additions:
  ```yaml
  criteria:
    - name: "Subagents"  # Custom addition
      ...
    - name: "Version"     # Override
      showInDetails: false  # Changed
  ```

**Purpose:** Shows dataset customization
**Size:** 1200x600
**Annotations:** Label "Addition" and "Override"

---

### Tutorial Track D: Developer

**Total Screenshots Needed:** 15

#### 25. Component Architecture
**File:** `component-architecture.png`
**What to Capture:**
- VS Code with file tree showing:
  ```
  src/app/
  ├── components/
  │   ├── comparison/
  │   │   ├── comparison.component.ts
  │   │   ├── comparison.component.html
  │   │   └── ...
  │   ├── config-admin/
  │   └── shared/
  ├── services/
  │   ├── configuration.service.ts
  │   ├── dataset.service.ts
  │   └── export.service.ts
  ├── store/
  │   ├── actions/
  │   ├── reducers/
  │   └── selectors/
  └── models/
  ```

**Purpose:** Shows code organization
**Size:** 800x1000
**Annotations:** Label key directories

---

#### 26. TypeScript Component Code
**File:** `component-code-example.png`
**What to Capture:**
- Component TypeScript file:
  ```typescript
  @Component({
    selector: 'app-comparison',
    templateUrl: './comparison.component.html'
  })
  export class ComparisonComponent {
    items$: Observable<ComparisonItem[]>;
    criteria$: Observable<Criterion[]>;

    constructor(private store: Store) {}
  }
  ```

**Purpose:** Shows code structure
**Size:** 1200x600
**Annotations:** Highlight key parts

---

#### 27. NgRx Store Setup
**File:** `ngrx-store-structure.png`
**What to Capture:**
- Store file structure:
  - actions/
  - reducers/
  - effects/
  - selectors/
- Open one file showing NgRx code

**Purpose:** Shows state management
**Size:** 1200x800
**Annotations:** Label NgRx concepts

---

#### 28. Build Output
**File:** `build-output.png`
**What to Capture:**
- Terminal showing:
  ```
  npm run build

  ✔ Browser application bundle generation complete
  ✔ Copying assets complete
  ✔ Index html generation complete

  Initial Chunk Files   | Names      |  Size
  main.js               | main       | 500 kB
  ...
  ```

**Purpose:** Shows build process
**Size:** 1200x400
**Annotations:** Highlight success messages

---

#### 29. Dev Server Running
**File:** `dev-server-running.png`
**What to Capture:**
- Terminal showing:
  ```
  npm start

  ** Angular Live Development Server is listening on localhost:4200 **
  ✔ Compiled successfully
  ```

**Purpose:** Shows development workflow
**Size:** 1200x300
**Annotations:** Highlight server URL

---

### Demos

#### 30. Demo 1 - Initial View
**File:** `demo1-initial-view.png`
**What to Capture:**
- Full comparison showing 30+ tools
- No filters applied
- Clean state

**Purpose:** Demo starting point
**Size:** 1920x1080

---

#### 31. Demo 1 - After Search
**File:** `demo1-after-search.png`
**What to Capture:**
- Search: "offline"
- ~8 results
- Highlight search box

**Purpose:** Shows search results
**Size:** 1920x1080
**Annotations:** Show result count

---

#### 32. Demo 1 - Final Filtered
**File:** `demo1-final-results.png`
**What to Capture:**
- 3 tools matching all criteria
- All filters applied and visible

**Purpose:** Shows final narrowed results
**Size:** 1920x1080
**Annotations:** Highlight final count

---

#### 33-35. Similar for other demos...

---

## Screenshot Specifications

### General Requirements

**Format:** PNG (for lossless quality)
**Color Profile:** sRGB
**Compression:** Moderate (balance quality and file size)

### Size Guidelines

| Screenshot Type | Recommended Size | Max File Size |
|----------------|------------------|---------------|
| Full browser | 1920x1080 | 500 KB |
| Cropped UI element | Varies, maintain aspect ratio | 200 KB |
| Code editor | 1200x800 | 300 KB |
| Terminal | 1200x400 | 150 KB |
| Mobile viewport | 375x667 | 200 KB |
| Diagrams | 1200x800 | 300 KB |

### Quality Standards

- **Resolution:** 72-96 DPI (web standard)
- **Sharpness:** Text must be readable at 100% zoom
- **Lighting:** Consistent brightness, no dark/washed out areas
- **Colors:** Accurate representation, avoid oversaturation
- **Cleanliness:** No personal information, notifications, or distractions

---

## Capture Tools

### Recommended Tools

#### macOS
1. **Built-in Screenshot Tool (Cmd+Shift+4)**
   - Free, built-in
   - Press Shift+Cmd+4, then drag to select area
   - Press Shift+Cmd+3 for full screen
   - Files save to Desktop

2. **CleanShot X** (Paid, $29)
   - Best for annotations
   - Built-in scrolling capture
   - Cloud upload
   - Professional features

3. **Skitch** (Free)
   - Simple annotations
   - Arrows, text, shapes
   - Easy to use

#### Windows
1. **Snipping Tool / Snip & Sketch**
   - Built-in (Win+Shift+S)
   - Basic but functional
   - Immediate editing

2. **ShareX** (Free, Open Source)
   - Powerful screenshot tool
   - Annotations
   - Upload integrations
   - Highly recommended

3. **Greenshot** (Free)
   - Lightweight
   - Quick annotations
   - Export options

#### Linux
1. **Flameshot** (Free, Open Source)
   - Modern screenshot tool
   - Good annotation features
   - Keyboard-friendly

2. **Shutter** (Free)
   - Feature-rich
   - Plugins available
   - Edit capabilities

3. **GNOME Screenshot** (Built-in)
   - Simple, works well
   - Keyboard shortcuts

#### Cross-Platform
1. **Firefox/Chrome DevTools**
   - Built into browsers
   - Perfect for web screenshots
   - Responsive mode for mobile views
   - F12 → Cmd/Ctrl+Shift+P → "Screenshot"

---

## Annotation Guidelines

### What to Annotate

**DO Annotate:**
- UI elements that aren't obvious (buttons, panels)
- Process flows (arrows showing steps)
- Key information (highlights, circles)
- Before/after changes (side-by-side comparisons)

**DON'T Annotate:**
- Self-explanatory elements
- Every single thing (keep it clean)
- Using distracting colors

### Annotation Style Guide

**Colors:**
- **Primary (Red #FF4444):** Important elements, errors
- **Secondary (Blue #4444FF):** Information, navigation
- **Success (Green #44FF44):** Successful actions, confirmations
- **Warning (Orange #FF8844):** Warnings, attention needed

**Shapes:**
- **Arrows:** Show direction, flow, or point to elements
- **Rectangles:** Highlight regions or groups
- **Circles/Ovals:** Draw attention to specific buttons or text
- **Numbers:** Show sequence of steps (1, 2, 3...)

**Text:**
- **Font:** Sans-serif (Arial, Helvetica)
- **Size:** 14-18pt (must be readable)
- **Background:** Semi-transparent box behind text
- **Keep it short:** 3-5 words maximum per annotation

### Annotation Examples

**Good:**
```
[Arrow pointing to search box] → "Search here"
[Circle around Export button]
[Rectangle highlighting filtered results] "5 results"
```

**Bad:**
```
"This is the search box where users can type their search queries to filter the items in the comparison table below"
[Too wordy, covers too much of the screen]
```

---

## File Naming Convention

### Pattern
```
{tutorial-track}_{section}_{description}.png
```

### Examples
```
track-a_01_comparison-main-view.png
track-a_02_dataset-selector.png
track-b_01_folder-structure.png
track-c_05_diff-viewer.png
demo1_01_initial-state.png
```

### Naming Rules
- **Lowercase:** All filenames lowercase
- **Hyphens:** Use hyphens, not underscores or spaces in description
- **Descriptive:** Name should explain what the screenshot shows
- **Sequential:** Number screenshots in order they appear
- **Track prefix:** Start with tutorial track identifier

---

## Where to Place Screenshots

### Directory Structure
```
docs/
├── tutorials/
│   └── images/
│       ├── track-a/
│       │   ├── comparison-main-view.png
│       │   ├── dataset-selector.png
│       │   └── ...
│       ├── track-b/
│       ├── track-c/
│       └── track-d/
└── demos/
    └── images/
        ├── demo-1/
        ├── demo-2/
        ├── demo-3/
        └── demo-4/
```

### In Markdown Files

**Syntax:**
```markdown
![Alt text](images/track-a/comparison-main-view.png)
```

**With caption:**
```markdown
![Comparison main view showing 30+ tools](images/track-a/comparison-main-view.png)
*Figure 1: The main comparison interface with all AI code editors listed*
```

**Sizing in Markdown (if needed):**
```markdown
<img src="images/track-a/comparison-main-view.png" alt="Comparison view" width="800">
```

---

## Quick Capture Checklist

### Before Capturing

- [ ] Clean browser/app state (no personal info)
- [ ] Disable notifications
- [ ] Close unnecessary tabs/windows
- [ ] Set consistent zoom level (100% or 110%)
- [ ] Use demo/test data (not real user data)
- [ ] Check screen resolution (1920x1080 recommended)
- [ ] Restart app if needed for clean state

### During Capture

- [ ] Frame the shot properly (include context)
- [ ] Ensure text is readable
- [ ] Capture at right moment (avoid animations mid-frame)
- [ ] Use consistent UI state across screenshots
- [ ] Check for errors or unexpected elements

### After Capture

- [ ] Review screenshot for clarity
- [ ] Crop if needed (remove unnecessary space)
- [ ] Add annotations if needed
- [ ] Optimize file size (compress if >500KB)
- [ ] Rename following convention
- [ ] Place in correct directory

---

## Screenshot Session Workflow

### Batch Capture Approach

**For efficiency, capture all screenshots in one session per tutorial track:**

#### Track A Session (60 min)
1. Set up browser: Clean state, demo data loaded
2. Capture screenshots 1-10 in sequence
3. Follow the tutorial flow naturally
4. Annotate all screenshots at end

#### Track B Session (45 min)
1. Set up IDE: VS Code with markdown files
2. Set up terminal: Commands ready
3. Capture screenshots 11-15
4. Show file creation process
5. Annotate

#### Track C Session (90 min)
1. Admin interface loaded
2. Prepare sample changes
3. Capture screenshots 16-24
4. Show before/after states
5. Annotate

#### Track D Session (60 min)
1. IDE with codebase open
2. Terminal with commands
3. Capture screenshots 25-29
4. Show code examples
5. Annotate

---

## Optimization Tips

### Reduce File Size

1. **Use PNG optimization tools:**
   ```bash
   # Using ImageOptim (macOS)
   imageoptim *.png

   # Using pngquant (cross-platform)
   pngquant *.png

   # Using OptiPNG
   optipng -o7 *.png
   ```

2. **Online tools:**
   - TinyPNG: https://tinypng.com
   - Squoosh: https://squoosh.app
   - ImageOptim Online: https://imageoptim.com/online

3. **Crop unnecessary areas:**
   - Remove blank space
   - Focus on relevant content
   - Use close-ups when appropriate

---

## Accessibility Considerations

### Alt Text Guidelines

**Good alt text:**
```markdown
![Admin interface showing three-panel layout with catalog tree on left, criteria editor in center, and diff viewer on right](images/track-c/admin-interface.png)
```

**Bad alt text:**
```markdown
![Screenshot](images/track-c/admin-interface.png)
```

### Alt Text Formula
```
[What] [where/context] [doing what] [showing what]
```

**Examples:**
- "Comparison table filtered to show 5 code editors with offline support"
- "Markdown file in VS Code showing criterion definition with triple hash syntax"
- "Terminal window displaying successful git commit for new tool entry"
- "Admin interface catalog tree expanded to show dataset configurations"

---

## Quality Control Checklist

Before finalizing screenshots:

### Technical Quality
- [ ] Resolution appropriate for use case
- [ ] Text is sharp and readable
- [ ] No compression artifacts
- [ ] Colors accurate
- [ ] File size reasonable

### Content Quality
- [ ] Shows what it's supposed to show
- [ ] No sensitive/personal information
- [ ] No distracting elements
- [ ] Consistent with other screenshots
- [ ] Representative of actual use

### Annotation Quality (if annotated)
- [ ] Annotations are clear
- [ ] Colors are consistent
- [ ] Text is readable
- [ ] Not covering important content
- [ ] Minimal but sufficient

---

## Advanced: Creating Diagrams

For conceptual diagrams (not screenshots):

### Tools
1. **Excalidraw** (https://excalidraw.com)
   - Hand-drawn style
   - Simple and clean
   - Export PNG

2. **Draw.io** (https://draw.io)
   - Professional diagrams
   - Many templates
   - Free

3. **Lucidchart**
   - Professional
   - Collaboration features
   - Paid (but free tier available)

### Diagram Examples Needed

1. **Three-tier inheritance flow**
   - Shared → Blueprint → Dataset
   - Arrows showing flow
   - Labels for each tier

2. **Data processing pipeline**
   - Markdown → JSON → Angular
   - Process boxes and arrows

3. **Admin interface layout**
   - Three panels labeled
   - Simple boxes with labels

---

## Getting Help

**Questions about screenshots?**
- Check existing screenshots in similar projects
- Ask in community forums
- Review this guide's examples

**Tools not working?**
- Try alternative tool from recommended list
- Check tool documentation
- Use browser built-in tools as fallback

---

## Summary

**Total Screenshots Needed:** ~50-60 across all tutorials

**Estimated Time:**
- Capture: 4-5 hours (all tracks)
- Annotation: 2-3 hours
- Optimization: 1 hour
- **Total:** 7-9 hours for complete screenshot suite

**Priority Order:**
1. **Track A** (end user) - Most important, used most
2. **Track C** (admin) - Shows unique features
3. **Demo screenshots** - For presentations
4. **Track B** (content editor) - Simpler, less critical
5. **Track D** (developer) - Code is self-explanatory

---

**Ready to capture? Start with Track A and work through the list systematically!** 📸
