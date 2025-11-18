/**
 * Track A Screenshot Capture Script (Playwright)
 * Tutorial: End User Guide
 *
 * Captures 10 screenshots for the end user tutorial
 *
 * Prerequisites:
 * 1. Dev server running: npm start → http://localhost:4200
 * 2. Run: npm run screenshots:track-a
 */

const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:4200';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'tutorials', 'images', 'track-a');
const VIEWPORT = { width: 1920, height: 1080 };

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to take screenshot
const takeScreenshot = async (page, filename, options = {}) => {
  const filepath = path.join(OUTPUT_DIR, filename);
  await page.screenshot({
    path: filepath,
    fullPage: options.fullPage || false,
    ...options
  });
  console.log(`✓ Captured: ${filename}`);
};

async function captureTrackAScreenshots() {
  console.log('Starting Track A screenshot capture...\n');

  let browser;
  try {
    // Launch browser
    browser = await chromium.launch({
      headless: false, // Set to true for headless mode
      executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome' || '/usr/bin/chromium-browser'
    });

    const context = await browser.newContext({ viewport: VIEWPORT });
    const page = await context.newPage();

    // ========================================
    // Screenshot 1: Main Comparison View
    // ========================================
    console.log('1. Capturing main comparison view...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await takeScreenshot(page, 'comparison-main-view.png', { fullPage: true });

    // ========================================
    // Screenshot 2: Dataset Selector Dropdown
    // ========================================
    console.log('2. Capturing dataset selector dropdown...');
    try {
      const selectorButton = page.locator('select, [data-testid="dataset-selector"], .dataset-selector, button:has-text("dataset")').first();
      if (await selectorButton.isVisible({ timeout: 3000 })) {
        await selectorButton.click();
        await page.waitForTimeout(1000);

        // Capture the dropdown area
        const element = await selectorButton.boundingBox();
        if (element) {
          await takeScreenshot(page, 'dataset-selector-open.png', {
            clip: {
              x: Math.max(0, element.x - 50),
              y: Math.max(0, element.y - 50),
              width: Math.min(500, element.width + 100),
              height: Math.min(400, element.height + 300)
            }
          });
        } else {
          await takeScreenshot(page, 'dataset-selector-open.png');
        }
      } else {
        console.log('  ⚠ Dataset selector not found, taking full screenshot...');
        await takeScreenshot(page, 'dataset-selector-open.png');
      }
    } catch (error) {
      console.log(`  ⚠ Could not capture dataset selector: ${error.message}`);
      await takeScreenshot(page, 'dataset-selector-open.png');
    }

    // ========================================
    // Screenshot 3: Search in Action
    // ========================================
    console.log('3. Capturing search results for "offline"...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    try {
      const searchInput = page.locator('input[type="search"], input[placeholder*="Search" i], input[name="search"], .search-box input').first();
      await searchInput.waitFor({ state: 'visible', timeout: 5000 });
      await searchInput.fill('offline');
      await page.waitForTimeout(2000);
      await takeScreenshot(page, 'search-offline.png', { fullPage: true });
    } catch (error) {
      console.log(`  ⚠ Could not perform search: ${error.message}`);
      await takeScreenshot(page, 'search-offline.png', { fullPage: true });
    }

    // ========================================
    // Screenshot 4: Multiple Filters Applied
    // ========================================
    console.log('4. Capturing multiple filters applied...');
    // Keep search active, try to apply additional filters
    try {
      // Look for filter checkboxes or buttons
      const filters = page.locator('input[type="checkbox"], .filter-option, [role="checkbox"]');
      const filterCount = await filters.count();

      if (filterCount > 0) {
        // Click first 2 filters
        for (let i = 0; i < Math.min(2, filterCount); i++) {
          try {
            await filters.nth(i).click({ timeout: 2000 });
            await page.waitForTimeout(500);
          } catch (e) {
            // Continue if filter click fails
          }
        }
      }

      await page.waitForTimeout(2000);
      await takeScreenshot(page, 'filters-applied.png', { fullPage: true });
    } catch (error) {
      console.log(`  ⚠ Could not apply filters: ${error.message}`);
      await takeScreenshot(page, 'filters-applied.png', { fullPage: true });
    }

    // ========================================
    // Screenshot 5: Detail View Panel
    // ========================================
    console.log('5. Capturing detail view...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    try {
      // Try to click first item in table
      const firstItem = page.locator('table tbody tr, .comparison-item, .item-row, [data-testid="comparison-item"]').first();
      await firstItem.waitFor({ state: 'visible', timeout: 5000 });
      await firstItem.click();
      await page.waitForTimeout(2000);
      await takeScreenshot(page, 'detail-view-cline.png', { fullPage: true });
    } catch (error) {
      console.log(`  ⚠ Could not open detail view: ${error.message}`);
      await takeScreenshot(page, 'detail-view-cline.png', { fullPage: true });
    }

    // ========================================
    // Screenshot 6: Groups Expanded/Collapsed
    // ========================================
    console.log('6. Capturing group expansion states...');
    // This is best done as a composite - capture current state
    await takeScreenshot(page, 'groups-expanded-collapsed.png', { fullPage: true });
    console.log('  ℹ Note: You may want to manually create a side-by-side comparison');

    // ========================================
    // Screenshot 7: Export Button
    // ========================================
    console.log('7. Capturing export button...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    try {
      const exportButton = page.locator('button:has-text("Export"), button[aria-label*="Export" i], .export-button').first();
      if (await exportButton.isVisible({ timeout: 3000 })) {
        await exportButton.hover();
        await page.waitForTimeout(500);

        // Capture area around button
        const box = await exportButton.boundingBox();
        if (box) {
          await takeScreenshot(page, 'export-button.png', {
            clip: {
              x: Math.max(0, box.x - 100),
              y: Math.max(0, box.y - 50),
              width: Math.min(400, box.width + 200),
              height: Math.min(300, box.height + 100)
            }
          });
        } else {
          await takeScreenshot(page, 'export-button.png');
        }
      } else {
        await takeScreenshot(page, 'export-button.png');
      }
    } catch (error) {
      console.log(`  ⚠ Could not find export button: ${error.message}`);
      await takeScreenshot(page, 'export-button.png');
    }

    // ========================================
    // Screenshot 8: Excel Export Result
    // ========================================
    console.log('8. Excel export result (manual capture required)...');
    console.log('  ℹ Manual steps:');
    console.log('    - Click Export button in the UI');
    console.log('    - Open downloaded Excel file');
    console.log('    - Screenshot the Excel file');
    console.log('    - Save as: excel-export-example.png');

    // ========================================
    // Screenshot 9: Table Sorting
    // ========================================
    console.log('9. Capturing table sorted by rating...');
    try {
      // Click on a column header to sort
      const headers = page.locator('th, [role="columnheader"]');
      const headerCount = await headers.count();

      if (headerCount > 1) {
        // Click second header (often Rating)
        await headers.nth(1).click();
        await page.waitForTimeout(1000);
      }

      await takeScreenshot(page, 'table-sorted-by-rating.png', { fullPage: true });
    } catch (error) {
      console.log(`  ⚠ Could not sort table: ${error.message}`);
      await takeScreenshot(page, 'table-sorted-by-rating.png', { fullPage: true });
    }

    // ========================================
    // Screenshot 10: Mobile View
    // ========================================
    console.log('10. Capturing mobile responsive view...');
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 375, height: 667 });
    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2000);
    await takeScreenshot(mobilePage, 'mobile-comparison-view.png', { fullPage: true });
    await mobilePage.close();

    console.log('\n✅ Track A screenshot capture complete!');
    console.log(`📁 Screenshots saved to: ${OUTPUT_DIR}`);
    console.log('\n📝 Manual captures needed:');
    console.log('   - excel-export-example.png (open exported Excel file)');
    console.log('   - groups-expanded-collapsed.png (create side-by-side comparison)');

  } catch (error) {
    console.error('❌ Error during screenshot capture:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the script
if (require.main === module) {
  captureTrackAScreenshots()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { captureTrackAScreenshots };
