# Tutorial Screenshots - How to Create

This guide explains how to capture all screenshots needed for the tutorial documentation.

## Quick Start

### Option 1: Automated (Recommended)

```bash
# 1. Ensure dev server is running in another terminal
npm start

# 2. Wait for server to be ready at http://localhost:4200

# 3. Run the automated capture script
node scripts/capture-screenshots-track-a.js
```

### Option 2: Manual

Follow the detailed checklist:
- [Track A Manual Checklist](SCREENSHOT_CAPTURE_CHECKLIST.md)

---

## What You Need

### For Automated Capture

1. **Node.js and npm** (already installed)
2. **Puppeteer** (install if needed):
   ```bash
   npm install puppeteer
   ```
3. **Running dev server**:
   ```bash
   npm start
   # Wait for: http://localhost:4200
   ```

### For Manual Capture

1. **Web browser** (Chrome, Firefox, Edge)
2. **Screenshot tool**:
   - Chrome DevTools (F12 → Ctrl+Shift+P → "screenshot")
   - macOS: Cmd+Shift+4
   - Windows: Snipping Tool (Win+Shift+S)
   - Linux: Flameshot, GNOME Screenshot
3. **Running dev server** (same as above)

---

## Screenshot Requirements by Track

### Track A: End User Guide
**Total:** 10 screenshots
**Priority:** Highest
**Topics:** Navigation, search, filtering, export

**Screenshots:**
1. comparison-main-view.png
2. dataset-selector-open.png
3. search-offline.png
4. filters-applied.png
5. detail-view-cline.png
6. groups-expanded-collapsed.png
7. export-button.png
8. excel-export-example.png
9. table-sorted-by-rating.png
10. mobile-comparison-view.png (optional)

**Status:** ✅ Automated script available

### Track B: Content Editor Guide
**Total:** 5 screenshots
**Priority:** Medium
**Topics:** File structure, markdown editing, git workflow

**Screenshots:**
11. dataset-folder-structure.png
12. markdown-entry-cline.png
13. markdown-raw-vs-rendered.png
14. create-new-markdown-file.png
15. git-commit-new-entry.png

**Status:** ⏳ Manual capture required (file system + editor)

### Track C: Administrator Guide
**Total:** 9 screenshots
**Priority:** High
**Topics:** Admin interface, configuration, inheritance

**Screenshots:**
16. admin-interface-overview.png
17. catalog-tree-expanded.png
18. criteria-form-filled.png
19. groups-section.png
20. diff-viewer-add-criterion.png
21. save-confirmation.png
22. datasets-manifest.png
23. comparison-default-yml.png
24. dataset-specific-config.png

**Status:** ⏳ Automated script TODO

### Track D: Developer Guide
**Total:** 5 screenshots
**Priority:** Low
**Topics:** Code structure, architecture, build process

**Screenshots:**
25. component-architecture.png
26. component-code-example.png
27. ngrx-store-structure.png
28. build-output.png
29. dev-server-running.png

**Status:** ⏳ Manual capture required (IDE + terminal)

---

## Using the Automated Script

### Track A Script

The automated script (`scripts/capture-screenshots-track-a.js`) will:
- Launch headless Chrome
- Navigate to all required pages
- Apply filters and interactions
- Capture screenshots with proper naming
- Save to correct directories

**Run it:**
```bash
# Make sure dev server is running first!
npm start

# In another terminal:
node scripts/capture-screenshots-track-a.js
```

**Output:**
```
Starting Track A screenshot capture...

1. Capturing main comparison view...
✓ Captured: comparison-main-view.png

2. Capturing dataset selector dropdown...
✓ Captured: dataset-selector-open.png

...

✅ Track A screenshot capture complete!
📁 Screenshots saved to: docs/tutorials/images/track-a
```

### What the Script Can't Do

Some screenshots require manual capture:
- **Excel export result** - Requires opening Excel file
- **Side-by-side comparisons** - Need image editing
- **IDE screenshots** - File system and code editor views
- **Terminal output** - Command line interactions

### Customizing the Script

Edit `scripts/capture-screenshots-track-a.js`:

**Change viewport size:**
```javascript
const VIEWPORT = {
  width: 1920,  // Change width
  height: 1080, // Change height
  deviceScaleFactor: 1
};
```

**Adjust wait times:**
```javascript
await waitForLoad(page, 3000); // Increase if content loads slowly
```

**Change selectors:**
```javascript
const searchSelector = 'input[type="search"]'; // Update if UI changes
```

---

## Manual Capture Guide

For detailed manual instructions, see:
- [Track A Manual Checklist](SCREENSHOT_CAPTURE_CHECKLIST.md)

### Quick Manual Capture

**Using Chrome DevTools:**
1. Press `F12` to open DevTools
2. Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
3. Type "screenshot"
4. Select:
   - "Capture full size screenshot" (full page)
   - "Capture screenshot" (visible area)
   - "Capture node screenshot" (specific element)

**Using Firefox:**
1. Press `Shift+F2`
2. Type: `screenshot filename.png --fullpage`

**Mobile viewport:**
1. Press `F12` → Device toolbar (Ctrl+Shift+M)
2. Select device: iPhone SE (375x667)
3. Capture screenshot

---

## Screenshot Quality Standards

### Technical Requirements

| Aspect | Requirement |
|--------|-------------|
| Format | PNG (lossless) |
| Resolution | 72-96 DPI |
| Max file size | 500KB (full page), 200KB (cropped) |
| Color profile | sRGB |
| Viewport | 1920x1080 (desktop), 375x667 (mobile) |

### Content Requirements

- ✅ Text is readable at 100% zoom
- ✅ No personal information visible
- ✅ No browser notifications/popups
- ✅ Clean, professional appearance
- ✅ Consistent UI state
- ✅ All relevant elements visible

### Before Capturing

**Clean your browser:**
- [ ] Close unnecessary tabs
- [ ] Disable notifications
- [ ] Clear personal bookmarks from view
- [ ] Use incognito/private mode if needed
- [ ] Set zoom to 100%

**Prepare the app:**
- [ ] Dev server running
- [ ] Page fully loaded (no spinners)
- [ ] Demo data populated
- [ ] Clean state (no errors)

---

## File Organization

### Directory Structure

```
docs/tutorials/images/
├── track-a/          # End user screenshots
│   ├── comparison-main-view.png
│   ├── dataset-selector-open.png
│   └── ...
├── track-b/          # Content editor screenshots
│   ├── dataset-folder-structure.png
│   └── ...
├── track-c/          # Administrator screenshots
│   ├── admin-interface-overview.png
│   └── ...
└── track-d/          # Developer screenshots
    ├── component-architecture.png
    └── ...
```

### Naming Convention

**Pattern:**
```
{descriptive-name}.png
```

**Rules:**
- Lowercase only
- Hyphens (not underscores or spaces)
- Descriptive (explains what it shows)
- Sequential by tutorial section

**Examples:**
```
✅ comparison-main-view.png
✅ dataset-selector-open.png
✅ admin-interface-overview.png

❌ Screenshot1.png
❌ main_view.png
❌ Comparison Main View.png
```

---

## Post-Capture Tasks

### 1. Verify Screenshots

**Check each file:**
```bash
ls -lh docs/tutorials/images/track-a/
```

**Verify:**
- [ ] All expected files present
- [ ] Files named correctly
- [ ] File sizes reasonable (<500KB)
- [ ] No corrupted images

### 2. Review Quality

Open each screenshot and check:
- [ ] Text is readable
- [ ] No personal info
- [ ] No errors or glitches
- [ ] Professional appearance
- [ ] Correct content captured

### 3. Optimize (if needed)

**If files are too large:**

```bash
# Using ImageMagick
mogrify -quality 85 docs/tutorials/images/track-a/*.png

# Using optipng
optipng -o7 docs/tutorials/images/track-a/*.png

# Using pngquant
pngquant --quality=65-80 docs/tutorials/images/track-a/*.png
```

**Online tools:**
- TinyPNG: https://tinypng.com
- Squoosh: https://squoosh.app

### 4. Add Annotations (optional)

**When to annotate:**
- Highlight important UI elements
- Show interaction flow (arrows)
- Label unclear elements
- Indicate clickable areas

**Tools:**
- macOS: Preview (Tools → Annotate)
- Windows: Snip & Sketch, Paint 3D
- Linux: GIMP, Kolourpaint
- Cross-platform: GIMP, Photoshop, Figma

**Annotation style:**
- Red arrows for important elements
- Blue boxes for regions
- Yellow highlights for text
- Keep it minimal

### 5. Commit to Git

```bash
# Check what you're adding
git status

# Add screenshots
git add docs/tutorials/images/track-a/*.png

# Commit with descriptive message
git commit -m "Add Track A tutorial screenshots (end user guide)"

# Push to your branch
git push -u origin HEAD
```

---

## Troubleshooting

### Automated Script Issues

**Problem:** `Cannot find module 'puppeteer'`
```bash
# Solution: Install Puppeteer
npm install puppeteer
```

**Problem:** Script hangs or times out
```bash
# Solution: Increase timeouts in script
# Edit: scripts/capture-screenshots-track-a.js
# Change: await waitForLoad(page, 3000); // Increase to 5000
```

**Problem:** Screenshots are blank or incomplete
```bash
# Solution: Ensure dev server is fully ready
# Wait 10-15 seconds after "npm start" completes
# Then run the script
```

**Problem:** Selectors not found
```bash
# Solution: Update selectors in script to match your UI
# Check browser DevTools to find correct selectors
```

### Manual Capture Issues

**Problem:** Screenshot tool not working
- Try browser built-in tools (F12 → Screenshot)
- Use different screenshot tool
- Restart browser

**Problem:** UI elements missing
- Wait longer for page to load
- Refresh page and try again
- Check console for errors (F12)

**Problem:** File too large
- Use PNG optimization tools
- Crop unnecessary areas
- Reduce viewport size if appropriate

**Problem:** Can't find specific element
- Check if feature exists in current dataset
- Try different dataset
- Check if feature is behind flag/setting

---

## Tips & Best Practices

### Batch Capture

**Capture all screenshots in one session:**
1. Prepare environment once
2. Capture all screenshots sequentially
3. Review batch at end
4. Retake any that need improvement

**Benefits:**
- Consistent appearance
- Consistent data state
- More efficient
- Easier to track progress

### Consistency

**Keep consistent across screenshots:**
- Same dataset (if possible)
- Same zoom level (100%)
- Same browser window size
- Same UI state/theme
- Same demo data

### Time Estimates

| Track | Screenshots | Automated | Manual | Total |
|-------|-------------|-----------|--------|-------|
| A | 10 | 5 min | 30 min | 35 min |
| B | 5 | N/A | 20 min | 20 min |
| C | 9 | TBD | 40 min | 40 min |
| D | 5 | N/A | 15 min | 15 min |
| **Total** | **29** | - | - | **~2 hours** |

---

## Next Steps

### Phase 1: Track A (You are here)
- [x] Automated script created
- [x] Manual checklist created
- [ ] Capture screenshots
- [ ] Review quality
- [ ] Commit to git

### Phase 2: Track C (Admin)
- [ ] Create automated script (optional)
- [ ] Create manual checklist
- [ ] Capture screenshots
- [ ] Commit to git

### Phase 3: Track B & D (Manual)
- [ ] Create detailed checklists
- [ ] Capture file system/IDE screenshots
- [ ] Capture terminal screenshots
- [ ] Commit to git

### Phase 4: Annotations
- [ ] Review all screenshots
- [ ] Add annotations where needed
- [ ] Update tutorials with screenshot references

---

## Resources

### Documentation
- [Main Screenshot Guide](SCREENSHOT_GUIDE.md) - Comprehensive guide
- [Track A Checklist](SCREENSHOT_CAPTURE_CHECKLIST.md) - Manual capture steps
- [Tutorial Track A](track-a-end-user.md) - End user tutorial
- [Tutorial Track B](track-b-content-editor.md) - Content editor tutorial
- [Tutorial Track C](track-c-administrator.md) - Administrator tutorial
- [Tutorial Track D](track-d-developer.md) - Developer tutorial

### Tools
- **Puppeteer:** https://pptr.dev/
- **Chrome DevTools:** https://developer.chrome.com/docs/devtools/
- **TinyPNG:** https://tinypng.com
- **Squoosh:** https://squoosh.app
- **GIMP:** https://www.gimp.org/

---

## Questions or Issues?

**Need help?**
1. Check this README
2. Review the main Screenshot Guide
3. Check existing screenshots for examples
4. Ask the team

**Found a bug in the script?**
1. Check the console output
2. Try manual capture as fallback
3. Report issue with details
4. Consider fixing and contributing

---

**Ready to capture? Let's do this! 📸**

**Recommended order:**
1. Start with automated Track A
2. Manually capture missing screenshots
3. Move to Track C (admin interface)
4. Finish with Track B and D (file system/IDE)
