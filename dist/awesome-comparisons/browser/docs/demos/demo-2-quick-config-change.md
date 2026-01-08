# Demo Scenario 2: The Quick Config Change
## Adding a New Criterion Using the Admin Interface

**Duration:** 5 minutes
**Purpose:** Demonstrate the visual configuration editor
**Audience:** Administrators, content managers, technical users

---

## Scenario Overview

**The Story:**
> "We've been comparing code editors, but we're missing an important criterion: Mobile Support. Let's add this field to our comparison using the visual admin interface - no code editing required!"

**What This Demonstrates:**
- Visual YAML editor (/admin interface)
- Adding new criteria without coding
- Live preview of changes (diff viewer)
- Group assignment
- Value display configuration
- Immediate reflection in main view

---

## Pre-Demo Preparation

### Setup Checklist (5 minutes before demo)

- [ ] Application running locally (http://localhost:4200)
- [ ] Admin interface accessible (/admin route)
- [ ] Code editor dataset loaded
- [ ] File system has write permissions
- [ ] Git status clean (or note existing changes)
- [ ] Second browser tab open to comparison view

### Equipment Needed

- Development environment running
- Two browser tabs:
  - Tab 1: /admin (admin interface)
  - Tab 2: /comparison (to show live changes)
- Screen large enough to show three-panel admin layout

### Backup Plan

- Pre-recorded video
- Screenshots at each step
- Prepared configuration file to copy/paste

---

## Demo Script

### INTRODUCTION (20 seconds)

**Say:**
> "One of the most powerful features of Awesome Comparisons is the visual admin interface. Let me show you how easy it is to add a new field to our comparison - we'll add 'Mobile Support' to the code editors dataset."

**Do:**
- Navigate to http://localhost:4200/admin
- Point out the three-panel layout:
  - Left: Catalog tree
  - Center: Editor
  - Right: Diff viewer

**Screen Shows:**
- Three-panel admin interface
- Catalog tree showing configuration files
- Clean, professional layout

---

### STEP 1: Navigate to Configuration File (30 seconds)

**Say:**
> "First, I need to find the configuration file for the code-editor dataset. Let me navigate through the catalog tree."

**Do:**
1. Look at the left panel (Catalog Tree)
2. Expand "Dataset Configurations" folder
3. Expand "code-editor" folder
4. Click on "comparison.yml"

**Screen Shows:**
```
📁 Shared Configurations
  📄 comparison-default.yml
  📄 groups.yml
  ...

📁 Dataset Configurations
  📁 code-editor
    📄 comparison.yml  ← CLICK HERE
  📁 prototyping
  📁 terminal
  ...
```

**Tip the Audience:**
> "The catalog tree shows all configuration files - both shared configurations that apply to all datasets, and dataset-specific configs."

---

### STEP 2: View Current Configuration (20 seconds)

**Say:**
> "Now the center panel shows the current configuration. I can see all the existing criteria defined for code editors."

**Do:**
- Scroll through the criteria list in the center panel
- Point out existing criteria like:
  - Classification
  - Rating
  - MCP Client
  - Git Support
  - etc.

**Screen Shows:**
- List of criteria in a visual form
- Each criterion has properties:
  - Name
  - Type
  - Searchable checkbox
  - Show in Table checkbox
  - Show in Details checkbox

**Tip the Audience:**
> "Each criterion has properties that control how it behaves - whether it's searchable, visible in the table, and what type of data it contains."

---

### STEP 3: Add New Criterion (60 seconds)

**Say:**
> "Let's add our new 'Mobile Support' criterion. I'll click the 'Add Criterion' button and fill in the details."

**Do:**

1. **Scroll to bottom of criteria list**
2. **Click "Add Criterion" button**
3. **Fill in the form:**

   **Field: Name**
   - Type: `Mobile Support`

   **Field: Type**
   - Select from dropdown: `label`
   - Explain: "Label type means it can have multiple tags like 'iOS, Android'"

   **Field: Searchable**
   - Check the box ✅
   - Explain: "Users can search for 'iOS' or 'Android'"

   **Field: Show in Table**
   - Check the box ✅
   - Explain: "It will appear as a column in the comparison table"

   **Field: Show in Details**
   - Check the box ✅
   - Explain: "It will also appear in the detail view"

4. **Click "Add" or confirm**

**Screen Shows:**
- Form for new criterion
- All fields filled out correctly
- Clear visual feedback

**Tip the Audience:**
> "This visual form makes it easy to configure criteria without touching YAML directly. But power users can still edit the YAML if they prefer."

---

### STEP 4: Assign to Group (30 seconds)

**Say:**
> "Now I need to assign this criterion to a group. Let's add it to the 'Features' group."

**Do:**

1. **Scroll to Groups section** (below criteria)
2. **Find "Features" group**
3. **Add "Mobile Support" to the criteria list**
   - Click "Add Criterion to Group"
   - Select "Mobile Support" from dropdown
   - Or drag-and-drop if supported

4. **Position it appropriately**
   - Place it after "Git Support" or at the end

**Screen Shows:**
- Groups section with list of groups
- "Features" group expanded
- "Mobile Support" added to the list

**Tip the Audience:**
> "Groups organize criteria into logical sections. This helps users find information quickly."

---

### STEP 5: Configure Value Display (45 seconds)

**Say:**
> "To make it visually appealing, let's add emoji displays for common values like 'Yes' and 'No'."

**Do:**

1. **Navigate to value-displays.yml**
   - Click on "Shared Configurations" → "value-displays.yml"

2. **Scroll to see existing displays**
   - Show "Yes" = ✅
   - Show "No" = ❌

3. **(Optional) Add new display**
   - Add "iOS only" = 🍎
   - Add "Android only" = 🤖
   - Add "Both" = 📱

**Screen Shows:**
- Value displays configuration
- Emoji mappings
- HTML templates

**Tip the Audience:**
> "Value displays let you map text values to visual representations - emojis, colors, icons. This makes the comparison more scannable."

**Alternative:**
> "The default Yes/No displays will work fine for now. We can always come back and customize them later."

---

### STEP 6: Preview Changes (Diff Viewer) (30 seconds)

**Say:**
> "Before I save, let me check the diff viewer to see exactly what will change."

**Do:**
1. **Look at the right panel** (Diff Viewer)
2. **Point out the changes:**
   - Green lines = additions
   - Red lines = removals (if any)
   - YAML formatting preserved

3. **Show the added criterion:**
```yaml
+ - name: "Mobile Support"
+   searchable: true
+   showInTable: true
+   showInDetails: true
+   type: "label"
```

**Screen Shows:**
- Side-by-side or unified diff
- Syntax highlighting
- Clear indication of what changed

**Tip the Audience:**
> "The diff viewer gives you confidence that you're making the right changes. It's a safety net before you commit."

---

### STEP 7: Save Configuration (20 seconds)

**Say:**
> "Everything looks good. Let's save the changes."

**Do:**
1. **Click "Save" button**
2. **Watch for confirmation message**
   - "Configuration saved successfully"
   - Or similar feedback

3. **Note the file update**
   - In development, the file actually writes to disk
   - Git will track the change

**Screen Shows:**
- Success message/toast
- Save button changes state
- No more unsaved changes indicator

---

### STEP 8: Verify in Main View (40 seconds)

**Say:**
> "Now let's see our new criterion in action. I'll switch to the comparison view."

**Do:**

1. **Switch to Tab 2** (comparison view at /comparison)
   - Or navigate from admin to comparison

2. **Look for the new column**
   - Scroll right in the table
   - Find "Mobile Support" column

3. **(Currently empty)**
   - Point out: "The column exists, but we haven't added data yet"

4. **Explain next steps:**
   - "Now content editors can add mobile support info to each tool"
   - "They'll edit the markdown files to include this new field"

**Screen Shows:**
- Comparison table with new "Mobile Support" column
- Column is visible but empty
- Proof that the configuration change worked

**Tip the Audience:**
> "The configuration is live immediately. Now we just need to populate the data. That's a job for content editors using the simple markdown format we saw earlier."

---

### CONCLUSION (20 seconds)

**Say:**
> "And that's it! We added a new criterion, assigned it to a group, configured its display properties, and verified it appears in the comparison - all in about 5 minutes using a visual interface. No YAML expertise required, though power users can still edit files directly if they prefer."

**Do:**
- Return to admin view
- Gesture to the three panels
- Smile and open for questions

---

## Key Talking Points

### During the Demo, Emphasize:

1. **No Coding Required**: "Notice I didn't write any code - just filled out a form"

2. **Live Preview**: "The diff viewer shows exactly what will change before I save"

3. **Immediate Effect**: "Changes are live right away - no build process, no restart"

4. **Organized Workflow**: "Configuration, grouping, and display are all managed in one place"

5. **Reversible**: "If I made a mistake, I can just undo the change"

---

## Handling Common Questions

### Q: "Can I edit the YAML directly instead of using the form?"
**A:** "Yes! The admin interface is optional. You can edit the YAML files directly in your editor if you prefer. Both approaches work."

### Q: "What happens if I make a syntax error?"
**A:** "The system validates the YAML before saving. If there's an error, you'll see a message and the save will be prevented."

### Q: "Can multiple people edit configurations at the same time?"
**A:** "Currently, it's file-based, so standard Git conflict resolution applies. We recommend coordinating via your team's workflow. Real-time collaboration is on the roadmap."

### Q: "How do I delete a criterion?"
**A:** "There's a delete button next to each criterion in the list. But be careful - removing a criterion that has data will make that data invisible."

---

## Troubleshooting During Demo

### Issue: Admin Interface Doesn't Load
- **Fix**: Check that you're on /admin route
- **Say**: "Let me make sure I'm on the admin URL..."

### Issue: Can't See Catalog Tree
- **Fix**: Check browser window width, may be responsive layout issue
- **Say**: "Let me maximize the window so we can see all panels..."

### Issue: Save Button Disabled
- **Fix**: Check for validation errors in the form
- **Say**: "Looks like I need to fill in all required fields..."

### Issue: Changes Don't Appear in Comparison View
- **Fix**: Hard refresh the comparison tab (Ctrl+Shift+R)
- **Say**: "Let me refresh to pick up the latest changes..."

---

## Variations for Different Audiences

### For Non-Technical Administrators
- Spend more time explaining each field
- Emphasize that it's "just a form"
- Show that mistakes can be undone
- Focus on the visual aspects

### For Technical Administrators
- Move faster through the form
- Show the actual YAML in diff viewer
- Briefly mention the file system changes
- Discuss inheritance and overrides

### For Decision Makers
- Focus on time saved vs manual YAML editing
- Emphasize reduced error rates
- Show how non-developers can manage configuration
- Highlight the safety of preview-before-save

---

## Practice Checklist

Before presenting:

- [ ] Run through the demo 2-3 times
- [ ] Verify admin interface is working
- [ ] Test file write permissions
- [ ] Prepare a criterion name that makes sense
- [ ] Check that diff viewer displays correctly
- [ ] Practice talking while clicking
- [ ] Time yourself (should be under 5 minutes)

---

## Post-Demo Actions

1. **Show Related Features**:
   - "You can also edit groups, value displays, and more"
   - "The catalog tree shows all available configurations"

2. **Offer Hands-On Time**:
   - "Want to try adding a criterion yourself?"

3. **Connect to Other Tutorials**:
   - "Tutorial Track C covers this in depth"
   - "You can practice on a test dataset"

4. **Discuss Workflow**:
   - "In production, you'd commit this change to Git"
   - "Your team would review it like any other code change"

---

## Success Metrics

Demo is successful if:

- ✅ Completed in under 5 minutes
- ✅ Audience understands the three panels
- ✅ Clear that no coding was required
- ✅ Diff viewer concept is clear
- ✅ Questions focus on "what else can I configure" not "how does this work"

---

## Quick Reference

**Timeline:**
- 0:00-0:20 - Introduction to admin interface
- 0:20-0:50 - Navigate to config file
- 0:50-1:10 - View current configuration
- 1:10-2:10 - Add new criterion
- 2:10-2:40 - Assign to group
- 2:40-3:25 - Configure value display
- 3:25-3:55 - Preview in diff viewer
- 3:55-4:15 - Save changes
- 4:15-4:55 - Verify in main view
- 4:55-5:00 - Conclusion

**Key Actions:**
1. Open /admin
2. Navigate to datasets/code-editor/comparison.yml
3. Add criterion: "Mobile Support"
4. Assign to "Features" group
5. Review diff
6. Save
7. Verify in /comparison

**Key Message:**
> "Visual configuration makes it easy for anyone to customize comparisons - no YAML expertise needed."
