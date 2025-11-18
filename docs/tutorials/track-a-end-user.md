# Tutorial Track A: End User Guide
## Finding and Using Comparisons

**Duration:** 30 minutes
**Target Audience:** People who want to use existing comparisons
**Prerequisites:** None - basic web browsing skills only
**What You'll Learn:** How to navigate, search, filter, and export comparison data

---

## Table of Contents

1. [Introduction](#introduction)
2. [Part 1: Navigate the Comparison (10 mins)](#part-1-navigate-the-comparison)
3. [Part 2: Export & Share (5 mins)](#part-2-export--share)
4. [Part 3: Practical Exercises (15 mins)](#part-3-practical-exercises)
5. [Tips & Tricks](#tips--tricks)
6. [Quick Reference](#quick-reference)

---

## Introduction

Welcome to the Awesome Comparisons system! This tutorial will teach you how to use the comparison interface to find the perfect tool, product, or service for your needs.

### What We'll Cover
- Navigating between different comparison datasets
- Using search and filters effectively
- Understanding criteria groupings
- Reading detailed item information
- Exporting data for sharing and analysis

### Your Learning Environment
For this tutorial, we'll use the live comparison site which contains comparisons of:
- AI Code Editors
- Terminal CLI tools
- AI Models
- Code Agents
- Prototyping Tools
- And more!

---

## Part 1: Navigate the Comparison (10 mins)

### Step 1.1: Access the Comparison Site

**Action:** Open your web browser and navigate to the comparison site
- URL: [Your deployment URL] or `http://localhost:4200` for local development

**What You See:**
- Navigation bar at the top
- Dataset selector (if multiple datasets available)
- Comparison table in the center
- Filter/search controls

**Screenshot:** [See comparison-main-view.png]

---

### Step 1.2: Understanding the Interface

**Main Components:**

1. **Dataset Selector** (Top right)
   - Dropdown to switch between comparisons
   - Shows current dataset name
   - Click to see all available datasets

2. **Comparison Table**
   - Each row = one item (tool, product, service)
   - Each column = one criterion
   - Sortable by clicking column headers

3. **Filter Panel** (Left sidebar or top)
   - Group-based filters
   - Search box
   - Criteria visibility toggles

4. **Action Buttons**
   - Export button
   - Detail view button
   - Additional actions menu

---

### Step 1.3: Switch Between Datasets

**Exercise:** Let's explore different comparisons

**Steps:**
1. Locate the **Dataset Selector** (usually top-right corner)
2. Click to open the dropdown
3. You'll see options like:
   - Code/Editors (default)
   - Terminal CLI
   - Code Models
   - Code Agent
   - Prototyping
   - Other Code Tools
   - All

4. **Try it:** Click on "Prototyping"

**What Changed:**
- The entire comparison changed
- Different items (tools) are now shown
- Different criteria columns may appear
- URL updated to reflect new dataset

**Navigation Tip:** The URL includes the dataset ID, so you can bookmark specific comparisons

---

### Step 1.4: Use the Search Function

**Scenario:** You want to find tools that support "offline" mode

**Steps:**

1. **Locate the Search Box**
   - Usually at the top of the comparison table
   - May be labeled "Search" or "Filter items"

2. **Type Your Search Term**
   - Enter: `offline`
   - Press Enter or wait for auto-search

3. **Review Results**
   - Table filters to show only matching items
   - Matches can be in any field (name, description, features)
   - Highlighted search terms (in some implementations)

4. **Clear Search**
   - Click the X button or clear the search box
   - All items return to the table

**Try These Searches:**
- `open source` - Find open-source tools
- `free` - Find tools with free tiers
- `git` - Find tools with Git support
- `API` - Find tools with API support

---

### Step 1.5: Filter by Criteria Groups

**Understanding Groups:**
Items are organized into collapsible groups like:
- General Info
- Licensing
- Features
- Developer Experience
- Extensibility

**Exercise: Filter by Group**

1. **Expand/Collapse Groups**
   - Click on group headers (e.g., "Features")
   - Group expands to show all criteria
   - Click again to collapse

2. **Show Only Specific Groups**
   - Look for "Show/Hide Columns" or similar control
   - Check/uncheck groups to show/hide
   - Helps focus on relevant criteria

3. **Filter Within Groups**
   - Some implementations allow filtering within groups
   - Example: In "Licensing" group, show only "Open Source = Yes"

---

### Step 1.6: Sort the Table

**Exercise: Find the Highest Rated Tools**

**Steps:**
1. Locate the **Rating** column
2. Click the column header
3. Table sorts ascending (low to high)
4. Click again to sort descending (high to low)
5. Click a third time to remove sorting

**Try Sorting By:**
- Name (alphabetically)
- Rating (highest first)
- Classification (group by type)
- Any other column

**Multi-Column Sort:**
- Some implementations support Shift+Click for secondary sorting
- Example: Sort by Classification, then by Rating within each classification

---

### Step 1.7: View Detailed Information

**Exercise: Deep Dive Into a Tool**

**Steps:**

1. **Find an Item of Interest**
   - Let's use "Cline" as an example

2. **Open Detail View**
   - Click on the item name or row
   - Or click a "Details" button/icon
   - Detail panel opens (sidebar or modal)

3. **Explore the Details**
   - Full description
   - All criteria organized by groups
   - Repository links
   - Additional metadata

4. **Navigate Between Items**
   - Previous/Next buttons
   - Or close and select another item

**What's in the Detail View:**
- Item name and description
- All criteria (even those hidden in table)
- Grouped and organized
- Links to external resources
- Repository information

---

## Part 2: Export & Share (5 mins)

### Step 2.1: Export to Excel

**Why Export:**
- Offline analysis
- Share with team members
- Create custom reports
- Import into other tools

**Steps:**

1. **Locate the Export Button**
   - Usually labeled "Export" or "Download"
   - May have an Excel icon

2. **Click to Export**
   - File downloads automatically
   - Usually named like: `comparison-{dataset}-{date}.xlsx`

3. **Open the Excel File**
   - All items included
   - All visible criteria included
   - Formatted for readability

**Export Tips:**
- Apply filters BEFORE exporting to export only filtered items
- Adjust visible columns to control what's exported
- Export creates a snapshot - won't auto-update

---

### Step 2.2: Share Specific Views

**Create Shareable Links:**

Many implementations support URL-based filtering:

**Example URLs:**
```
# Specific dataset
/comparison?dataset=code-editor

# With search filter
/comparison?dataset=code-editor&search=offline

# Specific item detail
/comparison/code-editor/cline
```

**To Share:**
1. Set up your desired view (filters, search, dataset)
2. Copy the URL from browser address bar
3. Share with colleagues
4. They see the same filtered view

---

### Step 2.3: Interpret the Data

**Understanding Criterion Types:**

1. **Text Fields**
   - Simple text values
   - Example: "Code Editor", "Web Application"

2. **Labels**
   - Tags or categories
   - Example: "TypeScript, JavaScript, Python"

3. **Ratings**
   - Numerical scores
   - Often 1-5 stars or 0-10 scale

4. **Yes/No/Partial**
   - Boolean or tri-state values
   - Often displayed with emojis: ✅ ❌ ⚠️

5. **URLs**
   - Clickable links
   - Often to documentation or repositories

6. **Markdown**
   - Rich text with formatting
   - May include lists, emphasis, links

**Reading Tip:** Hover over values for tooltips with more information

---

## Part 3: Practical Exercises (15 mins)

### Exercise 1: Find Your Perfect Code Editor (7 mins)

**Goal:** Find the best AI code editor that meets specific requirements

**Requirements:**
- Supports MCP (Model Context Protocol)
- Has offline capability
- Is open source
- Has a rating of 4.0 or higher

**Your Task:**

1. Navigate to the "Code/Editors" dataset
2. Use search or filters to narrow down options
3. Sort by rating
4. Compare top 3 candidates
5. View detailed information for your top choice
6. Export the comparison

**Deliverable:** Name of your chosen editor and 2-3 reasons why

---

### Exercise 2: Compare Prototyping Tools (8 mins)

**Goal:** Create a comparison matrix of prototyping tools for your team

**Scenario:**
Your team needs a prototyping tool with:
- Free tier available
- Good for web applications
- Fast iteration

**Your Task:**

1. Switch to the "Prototyping" dataset
2. Filter for tools with free tiers
3. Identify 3 tools that match your needs
4. Compare them across these criteria:
   - Pricing
   - Deployment options
   - Learning curve
   - Community/support

5. Export to Excel
6. Prepare a 1-minute recommendation

**Deliverable:** Excel file with your top 3 + recommendation

---

## Tips & Tricks

### Power User Shortcuts

1. **Keyboard Navigation**
   - Arrow keys to navigate table (if supported)
   - Enter to view details
   - Esc to close modals

2. **Advanced Search**
   - Use quotes for exact match: `"Model Context Protocol"`
   - Search multiple terms: `offline git support`
   - Exclude terms: `-commercial` (if supported)

3. **Quick Filtering**
   - Click on cell values to filter by that value (if supported)
   - Example: Click "Open Source" → See only open source tools

4. **Bookmarking**
   - Bookmark frequently used filtered views
   - Create browser shortcuts for different datasets

---

### Common Pitfalls

**Problem:** Search returns no results
- **Solution:** Check spelling, try synonyms, search fewer terms

**Problem:** Can't find a specific criterion
- **Solution:** Expand all groups, check detail view

**Problem:** Export doesn't include all columns
- **Solution:** Make columns visible before exporting

**Problem:** Data seems outdated
- **Solution:** Check "Last Updated" date, refresh page, contact maintainers

---

### When to Use Which Feature

| Goal | Feature to Use |
|------|----------------|
| Quick lookup of a known tool | Search by name |
| Find tools with specific features | Filter + Search |
| Compare 2-3 specific tools | Detail view side-by-side |
| Create custom report | Filter + Export |
| Share findings with team | Export or share URL |
| Explore all options | Browse full table |
| Find highest rated | Sort by Rating |

---

## Quick Reference

### Common Actions Cheat Sheet

```
Action                  | How To
------------------------|------------------------------------------
Switch dataset          | Click dataset selector → Choose dataset
Search                  | Type in search box → Enter
Filter by group         | Expand group → Use group filters
Sort table              | Click column header
View details            | Click item name/row
Export to Excel         | Click Export button
Clear all filters       | Click "Clear filters" or refresh page
Collapse all groups     | Click "Collapse all" (if available)
Share current view      | Copy URL from address bar
```

---

### Comparison Anatomy

```
┌─────────────────────────────────────────────┐
│  [Dataset Selector ▼]  [Search: _______]    │
├─────────────────────────────────────────────┤
│  ┌─────────────┐                            │
│  │  Filters    │   ┌─ Comparison Table ───┐│
│  │  ○ Group 1  │   │ Name  │ Rating│ Feat││
│  │  ○ Group 2  │   ├───────┼───────┼─────┤│
│  │  ○ Group 3  │   │ Tool1 │  4.5  │  ✅ ││
│  │             │   │ Tool2 │  4.0  │  ❌ ││
│  │  [Export]   │   │ Tool3 │  5.0  │  ✅ ││
│  └─────────────┘   └───────────────────────┘│
└─────────────────────────────────────────────┘
```

---

## Next Steps

**After This Tutorial:**

1. **Practice:** Spend 15-30 minutes exploring different datasets
2. **Experiment:** Try different filter combinations
3. **Share:** Export a comparison and share with a colleague
4. **Provide Feedback:** Report missing data or suggest improvements

**Want to Learn More?**

- **Track B:** Learn how to add/update comparison data
- **Track C:** Learn how to configure and customize comparisons
- **Track D:** Learn how to extend the system as a developer

---

## Additional Resources

**Documentation:**
- [System Overview](../uc-v3/Overview.md)
- [FAQ](../uc-v3/FAQ.md)
- [Troubleshooting](../uc-v3/Troubleshooting.md)

**Get Help:**
- Check the FAQ
- Contact maintainers
- Submit an issue on GitHub

---

## Feedback & Questions

**Did this tutorial help you?**
- What was clear?
- What was confusing?
- What's missing?

**Share your feedback:** [feedback form or email]

---

## Completion Checklist

Mark off as you complete:

- [ ] Accessed the comparison site
- [ ] Switched between datasets
- [ ] Used search to find items
- [ ] Filtered by criteria groups
- [ ] Sorted the table by different columns
- [ ] Viewed detailed information for an item
- [ ] Exported data to Excel
- [ ] Completed Exercise 1
- [ ] Completed Exercise 2
- [ ] Reviewed Tips & Tricks

**Congratulations! You're now an Awesome Comparisons power user!**
