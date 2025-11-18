# Demo 2: Quick Config Change - Video Script
## Adding a New Criterion Using the Admin Interface

**Video Duration:** 5-6 minutes
**Format:** Screencast with voiceover
**Recording Tool:** OBS, Loom, or Camtasia

---

## Pre-Recording Setup

### Technical Setup
- [ ] Screen resolution: 1920x1080 (Full HD)
- [ ] Application running at http://localhost:4200
- [ ] Both tabs ready:
  - Tab 1: /admin (Admin interface)
  - Tab 2: /comparison (Comparison view)
- [ ] Admin interface showing catalog tree
- [ ] File write permissions verified
- [ ] Git status clean (or aware of changes)
- [ ] Browser zoom: 100-110%
- [ ] Hide bookmarks bar for clean look
- [ ] Close unnecessary applications
- [ ] Notifications disabled

### Recording Settings
- [ ] Frame rate: 30 FPS minimum
- [ ] Audio clear and tested
- [ ] Cursor highlighting enabled
- [ ] Screen annotations ready (arrows, highlights)
- [ ] Export format: MP4 (H.264)

---

## Video Structure

### Introduction (0:00 - 0:25)
**On Screen:** Title card with "Demo 2: Quick Config Change"
**Voiceover:**
> "In this demo, I'll show you how easy it is to add a new criterion to your comparison using the visual admin interface. We're going to add 'Mobile Support' to the Code Editors comparison - without writing a single line of code."

**Action:** Fade from title card to browser at /admin

---

### Scene 1: Admin Interface Overview (0:25 - 0:50)
**On Screen:** Admin interface showing three-panel layout
**Voiceover:**
> "This is the Admin interface. Notice the three-panel layout: on the left is the catalog tree for navigation, the center shows our visual editor, and the right panel displays a live preview of our changes."

**Action:**
1. Hover cursor over left panel - label appears "Catalog Tree"
2. Hover over center panel - label "Editor"
3. Hover over right panel - label "Diff Viewer"
4. Brief pause on each panel

**Timing:**
- 3-4 seconds per panel
- Clear visual separation

**Camera/Cursor Notes:**
- Slow, deliberate movements
- Annotations can help label panels

---

### Scene 2: Navigate to Configuration File (0:50 - 1:20)
**On Screen:** Catalog tree in left panel
**Voiceover:**
> "First, I need to find the configuration file for the code-editor dataset. I'll navigate through the catalog tree."

**Action:**
1. Expand "Dataset Configurations" folder (click arrow)
2. Pause as it expands
3. Expand "code-editor" folder
4. Pause to show contents
5. Click on "comparison.yml"
6. Center panel updates with content

**Timing:**
- Each click followed by 1-second pause
- Clear folder structure visible

**Voiceover (continued):**
> "Here's the code-editor configuration. The center panel now shows all the current criteria defined for this dataset."

**Action:**
- Scroll through the criteria list slowly
- Point out a few examples: "Classification," "Rating," "Git Support"

**Camera/Cursor Notes:**
- Smooth scrolling
- Pause on interesting criteria

---

### Scene 3: View Current Configuration (1:20 - 1:45)
**On Screen:** Criteria list in center panel
**Voiceover:**
> "Let's look at what we currently have. Each criterion has properties that control how it behaves - whether it's searchable, visible in the table, and what type of data it contains."

**Action:**
1. Hover over one criterion entry
2. Point to properties:
   - Name field
   - Type dropdown
   - Checkboxes (Searchable, Show in Table, Show in Details)
3. Scroll through list to show multiple criteria

**Timing:**
- 5 seconds showing properties
- 3 seconds scrolling through list

**Camera/Cursor Notes:**
- Highlight each property as mentioned
- Annotations can help label fields

---

### Scene 4: Add New Criterion (1:45 - 3:00)
**On Screen:** Bottom of criteria list
**Voiceover:**
> "Now let's add our new 'Mobile Support' criterion. I'll scroll to the bottom and click the 'Add Criterion' button."

**Action:**
1. Scroll to bottom of criteria list
2. Click "Add Criterion" button
3. Form appears for new criterion

**Timing:**
- 2 seconds scrolling
- 1 second for form to appear

**Voiceover (continued):**
> "Great! Now I'll fill in the details for our new criterion."

**Action & Voiceover:**
1. **Name field:**
   - Click in name field
   - Type "Mobile Support"
   - *VO: "First, the name: Mobile Support"*

2. **Type dropdown:**
   - Click dropdown
   - Show options briefly
   - Select "label"
   - *VO: "For type, I'll choose 'label' - this means it can have multiple tags like iOS and Android"*

3. **Searchable checkbox:**
   - Check the box
   - *VO: "I'll make it searchable so users can search for specific platforms"*

4. **Show in Table checkbox:**
   - Check the box
   - *VO: "It should appear in the comparison table"*

5. **Show in Details checkbox:**
   - Check the box
   - *VO: "And also in the detail view"*

6. **Click Add/Confirm button**
   - *VO: "Perfect! Let me save this criterion."*

**Timing:**
- Each field: 3-5 seconds
- Clear typing visible
- Pause after each action

**Camera/Cursor Notes:**
- Type at moderate speed
- Show dropdown options clearly
- Click checkboxes with purpose

---

### Scene 5: Assign to Group (3:00 - 3:40)
**On Screen:** Groups section in editor
**Voiceover:**
> "Now I need to assign this criterion to a group. Groups organize criteria into logical sections. Let me add 'Mobile Support' to the 'Features' group."

**Action:**
1. Scroll down to Groups section
2. Find "Features" group
3. Expand if needed
4. Click "Add Criterion to Group" or similar
5. Select "Mobile Support" from dropdown
6. Position in list (e.g., after "Git Support")

**Alternative Method (if UI differs):**
- Drag and drop criterion into group
- Use checkbox to include in group

**Timing:**
- 5 seconds finding group
- 5 seconds adding criterion
- 2 seconds positioning

**Voiceover (continued):**
> "There we go! Mobile Support is now part of the Features group, which makes sense since it's a capability of the code editor."

**Camera/Cursor Notes:**
- Clear demonstration of group selection
- Show criterion added to list

---

### Scene 6: Preview in Diff Viewer (3:40 - 4:10)
**On Screen:** Right panel showing diff
**Voiceover:**
> "Before I save, let's check the diff viewer on the right. This shows me exactly what's changed in the configuration file."

**Action:**
1. Scroll right panel to show the addition
2. Highlight the new lines (green/plus signs)
3. Show the YAML structure

**Timing:**
- 5 seconds scrolling to change
- 5 seconds showing the diff

**Voiceover (continued):**
> "See the green lines? Those are the additions. The diff viewer gives me confidence that I'm making the right changes before I commit them."

**Action:**
- Point to specific lines being added
- Show YAML formatting

**Camera/Cursor Notes:**
- Clear highlighting of changes
- Annotations can help show diff markers

---

### Scene 7: Save Configuration (4:10 - 4:30)
**On Screen:** Save button in editor
**Voiceover:**
> "Everything looks good. Let me save the changes."

**Action:**
1. Click "Save" button
2. Wait for confirmation
3. Success message appears
4. Diff viewer updates/clears

**Timing:**
- 1 second click
- 2 seconds waiting
- 1 second confirmation

**Voiceover (continued):**
> "Great! The configuration has been saved successfully. The file has been updated on disk."

**Camera/Cursor Notes:**
- Clear click on Save button
- Show success message prominently

---

### Scene 8: Verify in Main View (4:30 - 5:10)
**On Screen:** Switch to comparison view tab (Tab 2)
**Voiceover:**
> "Now let's verify our new criterion appears in the comparison view. I'll switch to the comparison tab."

**Action:**
1. Click on Tab 2 (/comparison)
2. Wait for page to load
3. Scroll right in table to find new column
4. Locate "Mobile Support" column

**Timing:**
- 2 seconds tab switch
- 3 seconds finding column
- 2 seconds showing column

**Voiceover (continued):**
> "Perfect! There's our new 'Mobile Support' column. It's currently empty because we haven't added data yet, but the configuration is live and ready."

**Action:**
- Highlight the new column header
- Show that it's empty (expected)
- Briefly open detail view to show it there too

**Camera/Cursor Notes:**
- Clear visualization of new column
- Scrolling should be smooth

---

### Scene 9: Explain Next Steps (5:10 - 5:30)
**On Screen:** Still on comparison view showing Mobile Support column
**Voiceover:**
> "Now that the configuration is in place, content editors can add mobile support information to each tool by editing the markdown files. This is typically done using the simple markdown format we covered in Tutorial Track B."

**Action:**
- Brief scroll through the table
- Highlight a tool entry
- Optional: show a quick glimpse of markdown file (picture-in-picture)

**Timing:**
- 5 seconds on comparison view
- 3 seconds transition

**Camera/Cursor Notes:**
- Gestures toward empty cells
- Shows the workflow connection

---

### Conclusion (5:30 - 5:50)
**On Screen:** Split screen or return to admin view
**Voiceover:**
> "And that's it! In just 5 minutes, we added a new criterion, assigned it to a group, configured its properties, and verified it appears in the comparison - all using a visual interface. No YAML expertise required, though power users can still edit files directly if they prefer."

**Action:**
- Show admin interface briefly
- Show comparison view briefly
- Fade to end card

**Camera/Cursor Notes:**
- Professional transitions
- Clean conclusion

---

### End Card (5:50 - 6:00)
**On Screen:** End card with information
**Display:**
```
✅ Demo Complete!

Learn More:
📖 Tutorial Track C: Administrator Guide
🎬 More Demos: docs/demos/
🔗 Repository: [URL]

Try the Admin Interface!
```

**Voiceover:**
> "Thanks for watching! Check out Tutorial Track C for more on administration, or try the admin interface yourself with the link in the description."

---

## Recording Tips

### Before Recording
1. **Practice the workflow:** Do it 2-3 times smoothly
2. **Verify permissions:** Ensure file writes work
3. **Check UI:** Admin interface loads properly
4. **Test save:** Changes actually save
5. **Browser state:** Both tabs ready

### During Recording
1. **Pace:** Slightly slower than normal
2. **Cursor:** Visible and deliberate movements
3. **Pauses:** After each major action
4. **Breathing:** Natural, can be edited
5. **UI waits:** Wait for animations to complete

### After Recording
1. **Edit:** Cut long loading times
2. **Annotate:** Add labels/arrows to UI elements
3. **Captions:** Add subtitles for accessibility
4. **Transitions:** Smooth between tabs
5. **Highlight:** Add highlights to important elements

---

## Alternative Voiceover (Casual Style)

### Introduction
> "Hey! Want to see how easy it is to add fields to your comparison? I'm going to add 'Mobile Support' to our code editors list, and it'll take like 5 minutes. No coding needed. Let's do this!"

### Navigation
> "Okay, so this is the admin interface. Three panels here - tree on the left, editor in the middle, and a preview on the right. Pretty neat. Let me find the code-editor config... *[clicking]* ...there we go!"

### Adding Criterion
> "Alright, let's add our new field. I'll click 'Add Criterion'... *[clicking]* ...and fill this out. Name is 'Mobile Support'... type is 'label' because we want tags... make it searchable... show it in the table... and in details. Done!"

### Grouping
> "Now let's put it in a group. I'll add it to 'Features' because, well, mobile support is a feature, right? *[clicking]* There it is!"

### Diff View
> "Oh, this is cool - the diff viewer shows exactly what changed. See the green lines? That's our new stuff. Pretty handy for catching mistakes."

### Saving
> "Let's save this bad boy... *[clicking]* ...and boom! Saved. The file is updated and we're good to go."

### Verification
> "Now let's check if it actually worked... *[switching tabs]* ...yep! There's our new 'Mobile Support' column. It's empty right now, but the structure is there. Mission accomplished!"

### Conclusion
> "And that's how you add a field without touching any code. Pretty slick, right? Check the links below for more tutorials!"

---

## B-Roll Suggestions

**For polished video:**
1. **Opening:** Quick montage of admin interface features
2. **Navigation:** Zoomed-in view of catalog tree
3. **Form Filling:** Close-up of typing in form fields
4. **Diff View:** Highlighted comparison of before/after YAML
5. **Verification:** Split-screen showing admin and comparison
6. **Closing:** Time-lapse of someone adding multiple criteria

---

## Annotations/Graphics to Add

### Key Moments to Annotate:
1. **Three panels:** Label "Catalog Tree," "Editor," "Diff Viewer"
2. **Criterion properties:** Arrow pointing to each field type
3. **Group assignment:** Highlight the Features group
4. **Diff viewer:** Circle/highlight the added lines
5. **New column:** Arrow pointing to "Mobile Support" column

### Callout Boxes:
- "No coding required!"
- "Live preview"
- "Auto-saved to disk"
- "Instantly available"

---

## YouTube Description Template

```
🎯 Demo 2: Adding a Criterion with the Admin Interface

In this 5-minute demo, I show you how to use the visual admin interface to add a new criterion to your comparison - no code editing required!

What you'll see:
✅ Three-panel admin layout
✅ Visual criterion editor
✅ Group organization
✅ Live diff preview
✅ Instant verification in comparison view

⏱️ Timestamps:
0:00 - Introduction
0:25 - Admin interface overview
0:50 - Navigate to config file
1:20 - View current configuration
1:45 - Add new criterion (Mobile Support)
3:00 - Assign to Features group
3:40 - Preview changes in diff viewer
4:10 - Save configuration
4:30 - Verify in comparison view
5:30 - Conclusion

📚 Learn More:
• Tutorial Track C (Administrator): [link]
• All Demos: [link]
• Admin Interface Docs: [link]

💬 Questions about configuration? Ask in the comments!

#AwesomeComparisons #NoCode #Configuration #AdminTools
```

---

## Troubleshooting During Recording

### If Save Fails:
- Pause recording
- Check file permissions
- Retry save
- Continue from "Let me try that again..."

### If UI Doesn't Update:
- Refresh the comparison tab
- Mention: "I'll refresh to pick up the changes"
- Continue naturally

### If You Make a Typo:
- Pause 3 seconds
- Say "Let me correct that"
- Fix it
- Continue
- Edit out the mistake later

---

## Publishing Checklist

- [ ] Video rendered at 1080p
- [ ] Audio levels normalized
- [ ] Captions/subtitles added
- [ ] Annotations/arrows added to key moments
- [ ] Thumbnail created showing admin interface
- [ ] Title optimized: "Add Criteria Without Coding"
- [ ] Description with timestamps
- [ ] Tags: admin, configuration, no-code, visual editor
- [ ] Cards pointing to Tutorial Track C
- [ ] End screen with related videos

---

**Ready to record the admin magic? 🎬**
