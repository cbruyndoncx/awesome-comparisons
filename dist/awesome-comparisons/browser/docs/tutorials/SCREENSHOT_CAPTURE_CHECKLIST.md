# Screenshot Capture Checklist - Track A

Quick reference guide for manually capturing the 10 Track A screenshots.

## Prerequisites

- [ ] Dev server running: `npm start` → http://localhost:4200
- [ ] Screenshot tool ready (built-in browser tools recommended)
- [ ] Browser at 1920x1080 resolution
- [ ] Clean browser state (no personal info, notifications disabled)

## Browser Screenshot Tips

### Chrome/Edge
1. Press `F12` to open DevTools
2. Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
3. Type "screenshot"
4. Choose:
   - "Capture full size screenshot" (for full page)
   - "Capture screenshot" (for visible area)
   - "Capture node screenshot" (for specific element)

### Firefox
1. Press `Shift+F2` or use screenshot button in toolbar
2. Type `screenshot filename.png --fullpage`

---

## Screenshot 1: Main Comparison View
**File:** `comparison-main-view.png`
**Size:** 1920x1080 (full page)

**Steps:**
1. Navigate to http://localhost:4200
2. Wait for page to fully load
3. Ensure table shows 20+ items
4. Take full-page screenshot
5. Save to: `docs/tutorials/images/track-a/comparison-main-view.png`

**Checklist:**
- [ ] All UI elements visible (header, table, filters)
- [ ] No loading spinners
- [ ] Clean, professional appearance

---

## Screenshot 2: Dataset Selector Dropdown
**File:** `dataset-selector-open.png`
**Size:** Cropped to selector area (500x400 approx)

**Steps:**
1. From main view, locate dataset selector (usually top-right)
2. Click to open dropdown
3. Wait for menu to fully expand
4. Take screenshot of dropdown area (can crop later)
5. Save to: `docs/tutorials/images/track-a/dataset-selector-open.png`

**Checklist:**
- [ ] Dropdown menu visible with all options
- [ ] Current selection highlighted
- [ ] All dataset names readable
- [ ] Professional appearance

---

## Screenshot 3: Search in Action
**File:** `search-offline.png`
**Size:** 1920x1080 (full page)

**Steps:**
1. Refresh page to clear any filters
2. Locate search box
3. Type: `offline`
4. Press Enter or wait for auto-search
5. Wait for results to filter
6. Take full-page screenshot
7. Save to: `docs/tutorials/images/track-a/search-offline.png`

**Checklist:**
- [ ] Search term "offline" visible in search box
- [ ] Table filtered to ~5-10 results
- [ ] Search box highlighted or active
- [ ] Result count visible (if shown in UI)

---

## Screenshot 4: Multiple Filters Applied
**File:** `filters-applied.png`
**Size:** 1920x1080 (full page)

**Steps:**
1. Keep search "offline" active
2. Apply additional filters:
   - Find filter for "BYOK" or similar → Set to "Yes"
   - Find filter for "Git Support" → Set to "Yes"
3. Wait for results to update
4. Should show 3-5 final results
5. Take full-page screenshot
6. Save to: `docs/tutorials/images/track-a/filters-applied.png`

**Checklist:**
- [ ] Multiple filters visible
- [ ] Search term still visible
- [ ] Reduced result count (3-5 items)
- [ ] Filter indicators shown (if any)

---

## Screenshot 5: Detail View Panel
**File:** `detail-view-cline.png`
**Size:** 1920x1080 or cropped to detail panel

**Steps:**
1. Clear all filters (refresh page if needed)
2. Find "Cline" in the comparison table
3. Click on "Cline" to open detail view
4. Wait for detail panel/modal to open
5. Ensure all sections visible:
   - General Info
   - Licensing
   - Features
   - Developer Experience
6. Take screenshot
7. Save to: `docs/tutorials/images/track-a/detail-view-cline.png`

**Checklist:**
- [ ] Detail panel/modal fully visible
- [ ] All groups/sections shown
- [ ] Repository link visible
- [ ] Clear and readable

---

## Screenshot 6: Groups Expanded/Collapsed
**File:** `groups-expanded-collapsed.png`
**Size:** 1600x800 (side-by-side comparison)

**Steps:**
**Option A: Create composite image**
1. Capture detail view with groups collapsed
2. Capture same view with groups expanded
3. Use image editor to create side-by-side comparison
4. Label "Collapsed" and "Expanded"

**Option B: Single state**
1. Capture detail view showing both collapsed and expanded groups
2. Take screenshot

5. Save to: `docs/tutorials/images/track-a/groups-expanded-collapsed.png`

**Checklist:**
- [ ] Clear visual difference between states
- [ ] Labels if using side-by-side
- [ ] Both states clearly visible

---

## Screenshot 7: Export Button
**File:** `export-button.png`
**Size:** Cropped area (400x300 approx)

**Steps:**
1. Navigate to main comparison view
2. Locate Export button (usually in toolbar)
3. Hover over button (to show any tooltip)
4. Take screenshot of button and surrounding area
5. Crop to focus on button
6. Save to: `docs/tutorials/images/track-a/export-button.png`

**Checklist:**
- [ ] Export button clearly visible
- [ ] Hover state captured (if any)
- [ ] Context shows it's in toolbar
- [ ] Icon/text readable

---

## Screenshot 8: Excel Export Result
**File:** `excel-export-example.png`
**Size:** 1200x800

**Steps:**
1. Click Export button
2. Wait for Excel file to download
3. Open downloaded file in Excel or LibreOffice Calc
4. Ensure shows:
   - Item names in column A
   - Criteria in subsequent columns
   - Data properly formatted
5. Take screenshot of Excel window
6. Save to: `docs/tutorials/images/track-a/excel-export-example.png`

**Checklist:**
- [ ] Excel file open and visible
- [ ] Column headers readable
- [ ] At least 5-10 rows visible
- [ ] Data formatted cleanly
- [ ] Professional appearance

---

## Screenshot 9: Table Sorting
**File:** `table-sorted-by-rating.png`
**Size:** 1920x1080 (full page)

**Steps:**
1. Navigate to main comparison view
2. Locate "Rating" column header
3. Click on header to sort
4. Click again if needed to sort descending (highest first)
5. Verify sort indicator appears (arrow up/down)
6. Take full-page screenshot
7. Save to: `docs/tutorials/images/track-a/table-sorted-by-rating.png`

**Checklist:**
- [ ] Table sorted by rating
- [ ] Sort indicator visible (arrow)
- [ ] Items in correct order
- [ ] Professional appearance

---

## Screenshot 10: Mobile View (Optional)
**File:** `mobile-comparison-view.png`
**Size:** 375x667

**Steps:**
1. Open Chrome DevTools (`F12`)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select "iPhone SE" or set custom: 375x667
4. Navigate to main comparison
5. Wait for responsive layout to load
6. Take screenshot
7. Save to: `docs/tutorials/images/track-a/mobile-comparison-view.png`

**Checklist:**
- [ ] Mobile viewport size (375x667)
- [ ] Responsive layout active
- [ ] Touch-friendly interface
- [ ] All elements readable at mobile size

---

## Post-Capture Checklist

After capturing all screenshots:

### File Verification
- [ ] All 10 files present in `docs/tutorials/images/track-a/`
- [ ] Files named correctly (lowercase, hyphenated)
- [ ] File sizes reasonable (<500KB each)

### Quality Check
- [ ] Text readable in all screenshots
- [ ] No personal information visible
- [ ] No browser notifications or popups
- [ ] Consistent UI state across screenshots
- [ ] Professional appearance

### File List
```
docs/tutorials/images/track-a/
├── comparison-main-view.png
├── dataset-selector-open.png
├── search-offline.png
├── filters-applied.png
├── detail-view-cline.png
├── groups-expanded-collapsed.png
├── export-button.png
├── excel-export-example.png
├── table-sorted-by-rating.png
└── mobile-comparison-view.png
```

---

## Optimization (Optional)

If file sizes are large (>500KB), optimize using:

**Command line:**
```bash
# Using ImageMagick
mogrify -resize 1920x1080 -quality 85 *.png

# Using optipng
optipng -o7 *.png
```

**Online tools:**
- TinyPNG: https://tinypng.com
- Squoosh: https://squoosh.app

---

## Next Steps

Once all Track A screenshots are captured:

1. **Review quality** - Check each screenshot
2. **Add annotations** (optional) - Use tools like:
   - macOS: Preview (Tools → Annotate)
   - Windows: Paint 3D or Snip & Sketch
   - Cross-platform: GIMP, Photoshop
3. **Commit to git:**
   ```bash
   git add docs/tutorials/images/track-a/*.png
   git commit -m "Add Track A tutorial screenshots"
   git push
   ```

---

## Troubleshooting

**Problem:** Screenshot tool not capturing properly
- **Solution:** Use browser built-in tools (F12 → Screenshot)

**Problem:** UI elements missing or loading
- **Solution:** Wait 3-5 seconds after page load before capturing

**Problem:** File sizes too large
- **Solution:** Use optimization tools listed above

**Problem:** Cannot find specific UI element
- **Solution:** Check if dataset has that feature, or use alternative dataset

---

## Time Estimate

- Setup: 5 minutes
- Capture 10 screenshots: 20-30 minutes
- Review and optimization: 10 minutes
- **Total: 35-45 minutes**

---

## Questions?

If you encounter issues or need help:
1. Check the main Screenshot Guide: `docs/tutorials/SCREENSHOT_GUIDE.md`
2. Review existing screenshots in `docs/uc-v2/images/` for examples
3. Ask for help from the team

---

**Ready? Let's capture those screenshots! 📸**
