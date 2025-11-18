/**
 * Track A Screenshot Capture Script
 *
 * This script automates the capture of all screenshots needed for Tutorial Track A (End User Guide)
 *
 * Prerequisites:
 * 1. Run `npm install puppeteer` (if not already installed)
 * 2. Start the dev server: `npm start` in another terminal
 * 3. Wait for server to be ready at http://localhost:4200
 * 4. Run this script: `node scripts/capture-screenshots-track-a.js`
 *
 * The script will:
 * - Navigate to various pages
 * - Apply filters and search terms
 * - Capture screenshots with proper naming
 * - Save to docs/tutorials/images/track-a/
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:4200';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'tutorials', 'images', 'track-a');
const VIEWPORT = {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1
};

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper function to wait for content to load
const waitForLoad = async (page, ms = 2000) => {
  await page.waitForTimeout(ms);
};

// Helper function to take screenshot
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
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    // ========================================
    // Screenshot 1: Main Comparison View
    // ========================================
    console.log('1. Capturing main comparison view...');
    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });
    await waitForLoad(page, 3000);
    await takeScreenshot(page, 'comparison-main-view.png', { fullPage: true });

    // ========================================
    // Screenshot 2: Dataset Selector Dropdown
    // ========================================
    console.log('2. Capturing dataset selector dropdown...');

    // Try to find and click the dataset selector
    try {
      // Look for dataset selector button/dropdown
      const selectorExists = await page.$('[data-test-id="dataset-selector"], .dataset-selector, select[name="dataset"]');

      if (selectorExists) {
        await page.click('[data-test-id="dataset-selector"], .dataset-selector, select[name="dataset"]');
        await waitForLoad(page, 1000);

        // Take screenshot of just the dropdown area
        const element = await page.$('[data-test-id="dataset-selector"], .dataset-selector');
        if (element) {
          await element.screenshot({
            path: path.join(OUTPUT_DIR, 'dataset-selector-open.png')
          });
          console.log('✓ Captured: dataset-selector-open.png');
        } else {
          await takeScreenshot(page, 'dataset-selector-open.png');
        }
      } else {
        console.log('  ⚠ Dataset selector not found, skipping...');
      }
    } catch (error) {
      console.log(`  ⚠ Could not capture dataset selector: ${error.message}`);
    }

    // ========================================
    // Screenshot 3: Search in Action
    // ========================================
    console.log('3. Capturing search results for "offline"...');

    // Navigate back to main view
    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });
    await waitForLoad(page, 2000);

    // Find search box and type "offline"
    try {
      const searchSelector = 'input[type="search"], input[placeholder*="Search"], input[name="search"], .search-box input';
      await page.waitForSelector(searchSelector, { timeout: 5000 });
      await page.type(searchSelector, 'offline');
      await waitForLoad(page, 2000);
      await takeScreenshot(page, 'search-offline.png', { fullPage: true });
    } catch (error) {
      console.log(`  ⚠ Could not perform search: ${error.message}`);
    }

    // ========================================
    // Screenshot 4: Multiple Filters Applied
    // ========================================
    console.log('4. Capturing filtered results...');

    // This requires knowledge of the specific filter UI
    // For now, we'll capture the current state with search applied
    // You may need to manually apply additional filters
    await takeScreenshot(page, 'filters-applied.png', { fullPage: true });

    // ========================================
    // Screenshot 5: Detail View Panel
    // ========================================
    console.log('5. Capturing detail view...');

    // Navigate back to clear filters
    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });
    await waitForLoad(page, 2000);

    // Try to click on first item in table
    try {
      const firstItemSelector = 'table tbody tr:first-child, .comparison-item:first-child, .item-row:first-child';
      await page.waitForSelector(firstItemSelector, { timeout: 5000 });
      await page.click(firstItemSelector);
      await waitForLoad(page, 2000);
      await takeScreenshot(page, 'detail-view-cline.png', { fullPage: true });
    } catch (error) {
      console.log(`  ⚠ Could not open detail view: ${error.message}`);
    }

    // ========================================
    // Screenshot 6: Groups Expanded/Collapsed
    // ========================================
    console.log('6. Capturing group expansion states...');

    // This requires creating a side-by-side comparison
    // For now, capture current state
    await takeScreenshot(page, 'groups-expanded-collapsed.png');

    // ========================================
    // Screenshot 7: Export Button
    // ========================================
    console.log('7. Capturing export button...');

    // Navigate back to main view
    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });
    await waitForLoad(page, 2000);

    // Try to find export button
    try {
      const exportSelector = 'button:has-text("Export"), button[aria-label*="Export"], .export-button, button.export';
      const exportButton = await page.$('button');

      if (exportButton) {
        // Hover over button to show any tooltips
        await exportButton.hover();
        await waitForLoad(page, 500);
      }

      await takeScreenshot(page, 'export-button.png');
    } catch (error) {
      console.log(`  ⚠ Could not capture export button: ${error.message}`);
    }

    // ========================================
    // Screenshot 8: Excel Export Result
    // ========================================
    console.log('8. Excel export result (manual capture required)...');
    console.log('  ℹ This screenshot needs to be captured manually:');
    console.log('    - Click Export button');
    console.log('    - Open the downloaded Excel file');
    console.log('    - Take screenshot of the Excel file');
    console.log('    - Save as: excel-export-example.png');

    // ========================================
    // Screenshot 9: Table Sorting
    // ========================================
    console.log('9. Capturing sorted table...');

    // Try to click on Rating column header to sort
    try {
      const ratingHeaderSelector = 'th:has-text("Rating"), [data-column="rating"] th, .rating-header';
      const headers = await page.$$('th');

      if (headers.length > 0) {
        // Click the second header (often Rating)
        await headers[1].click();
        await waitForLoad(page, 1000);
      }

      await takeScreenshot(page, 'table-sorted-by-rating.png', { fullPage: true });
    } catch (error) {
      console.log(`  ⚠ Could not sort table: ${error.message}`);
      await takeScreenshot(page, 'table-sorted-by-rating.png', { fullPage: true });
    }

    // ========================================
    // Screenshot 10: Mobile View (Optional)
    // ========================================
    console.log('10. Capturing mobile responsive view...');

    // Change viewport to mobile size
    await page.setViewport({
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true
    });

    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });
    await waitForLoad(page, 2000);
    await takeScreenshot(page, 'mobile-comparison-view.png', { fullPage: true });

    console.log('\n✅ Track A screenshot capture complete!');
    console.log(`📁 Screenshots saved to: ${OUTPUT_DIR}`);
    console.log('\nNext steps:');
    console.log('1. Review all screenshots for quality');
    console.log('2. Manually capture excel-export-example.png');
    console.log('3. Add annotations if needed');
    console.log('4. Commit screenshots to git');

  } catch (error) {
    console.error('❌ Error during screenshot capture:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the script
captureTrackAScreenshots().catch(console.error);
