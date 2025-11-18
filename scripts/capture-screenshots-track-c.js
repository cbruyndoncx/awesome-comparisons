/**
 * Track C Screenshot Capture Script (Playwright)
 * Tutorial: Administrator Guide
 *
 * Captures 9 screenshots for the administrator tutorial
 *
 * Prerequisites:
 * 1. Dev server running: npm start → http://localhost:4200
 * 2. Admin interface accessible at: http://localhost:4200/admin
 * 3. Run: npm run screenshots:track-c
 */

const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:4200';
const ADMIN_URL = `${BASE_URL}/admin`;
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'tutorials', 'images', 'track-c');
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

async function captureTrackCScreenshots() {
  console.log('Starting Track C screenshot capture...\n');

  let browser;
  try {
    // Launch browser
    browser = await chromium.launch({
      headless: false,
      executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome' || '/usr/bin/chromium-browser'
    });

    const context = await browser.newContext({ viewport: VIEWPORT });
    const page = await context.newPage();

    // ========================================
    // Screenshot 16: Admin Interface Overview
    // ========================================
    console.log('16. Capturing admin interface overview...');
    await page.goto(ADMIN_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await takeScreenshot(page, 'admin-interface-overview.png', { fullPage: true });

    // ========================================
    // Screenshot 17: Catalog Tree Expanded
    // ========================================
    console.log('17. Capturing catalog tree expanded...');
    try {
      // Try to expand catalog tree folders
      const expandButtons = page.locator('button:has-text("Shared"), button:has-text("Dataset"), [role="treeitem"]');
      const count = await expandButtons.count();

      // Click first few to expand
      for (let i = 0; i < Math.min(3, count); i++) {
        try {
          await expandButtons.nth(i).click({ timeout: 2000 });
          await page.waitForTimeout(500);
        } catch (e) {
          // Continue if click fails
        }
      }

      // Try to capture just the left panel
      const catalogTree = page.locator('.catalog-tree, .file-tree, [data-testid="catalog-tree"]').first();
      if (await catalogTree.isVisible({ timeout: 2000 })) {
        const box = await catalogTree.boundingBox();
        if (box) {
          await takeScreenshot(page, 'catalog-tree-expanded.png', {
            clip: {
              x: box.x,
              y: box.y,
              width: Math.min(400, box.width),
              height: Math.min(800, box.height)
            }
          });
        } else {
          await takeScreenshot(page, 'catalog-tree-expanded.png');
        }
      } else {
        await takeScreenshot(page, 'catalog-tree-expanded.png');
      }
    } catch (error) {
      console.log(`  ⚠ Could not expand catalog tree: ${error.message}`);
      await takeScreenshot(page, 'catalog-tree-expanded.png');
    }

    // ========================================
    // Screenshot 18: Criteria Form Filled
    // ========================================
    console.log('18. Capturing criteria form...');
    try {
      // Look for a criterion form or editor
      const criteriaForm = page.locator('form, .criteria-form, .criterion-editor, [data-testid="criteria-form"]').first();
      if (await criteriaForm.isVisible({ timeout: 3000 })) {
        const box = await criteriaForm.boundingBox();
        if (box) {
          await takeScreenshot(page, 'criteria-form-filled.png', {
            clip: {
              x: Math.max(0, box.x - 50),
              y: Math.max(0, box.y - 50),
              width: Math.min(600, box.width + 100),
              height: Math.min(400, box.height + 100)
            }
          });
        } else {
          await takeScreenshot(page, 'criteria-form-filled.png');
        }
      } else {
        // Capture center panel area
        await takeScreenshot(page, 'criteria-form-filled.png');
      }
    } catch (error) {
      console.log(`  ⚠ Could not find criteria form: ${error.message}`);
      await takeScreenshot(page, 'criteria-form-filled.png');
    }

    // ========================================
    // Screenshot 19: Groups Section
    // ========================================
    console.log('19. Capturing groups section...');
    try {
      // Try to find groups section
      const groupsSection = page.locator('.groups-section, [data-testid="groups"], section:has-text("Groups")').first();
      if (await groupsSection.isVisible({ timeout: 3000 })) {
        await groupsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const box = await groupsSection.boundingBox();
        if (box) {
          await takeScreenshot(page, 'groups-section.png', {
            clip: {
              x: Math.max(0, box.x - 50),
              y: Math.max(0, box.y - 50),
              width: Math.min(600, box.width + 100),
              height: Math.min(500, box.height + 100)
            }
          });
        } else {
          await takeScreenshot(page, 'groups-section.png');
        }
      } else {
        await takeScreenshot(page, 'groups-section.png');
      }
    } catch (error) {
      console.log(`  ⚠ Could not find groups section: ${error.message}`);
      await takeScreenshot(page, 'groups-section.png');
    }

    // ========================================
    // Screenshot 20: Diff Viewer Add Criterion
    // ========================================
    console.log('20. Capturing diff viewer...');
    try {
      // Look for diff viewer panel (usually on right)
      const diffViewer = page.locator('.diff-viewer, .monaco-diff-editor, [data-testid="diff-viewer"]').first();
      if (await diffViewer.isVisible({ timeout: 3000 })) {
        const box = await diffViewer.boundingBox();
        if (box) {
          await takeScreenshot(page, 'diff-viewer-add-criterion.png', {
            clip: {
              x: Math.max(0, box.x),
              y: Math.max(0, box.y),
              width: Math.min(600, box.width),
              height: Math.min(400, box.height)
            }
          });
        } else {
          await takeScreenshot(page, 'diff-viewer-add-criterion.png');
        }
      } else {
        // Capture right third of screen (where diff viewer usually is)
        await takeScreenshot(page, 'diff-viewer-add-criterion.png', {
          clip: {
            x: VIEWPORT.width * 0.66,
            y: 100,
            width: VIEWPORT.width * 0.33,
            height: 600
          }
        });
      }
    } catch (error) {
      console.log(`  ⚠ Could not find diff viewer: ${error.message}`);
      await takeScreenshot(page, 'diff-viewer-add-criterion.png');
    }

    // ========================================
    // Screenshot 21: Save Confirmation
    // ========================================
    console.log('21. Capturing save button/confirmation...');
    try {
      const saveButton = page.locator('button:has-text("Save"), [aria-label*="Save"], .save-button').first();
      if (await saveButton.isVisible({ timeout: 3000 })) {
        // Highlight the button
        await saveButton.hover();
        await page.waitForTimeout(500);

        const box = await saveButton.boundingBox();
        if (box) {
          await takeScreenshot(page, 'save-confirmation.png', {
            clip: {
              x: Math.max(0, box.x - 100),
              y: Math.max(0, box.y - 50),
              width: Math.min(400, box.width + 200),
              height: Math.min(200, box.height + 100)
            }
          });
        } else {
          await takeScreenshot(page, 'save-confirmation.png');
        }
      } else {
        await takeScreenshot(page, 'save-confirmation.png');
      }
    } catch (error) {
      console.log(`  ⚠ Could not find save button: ${error.message}`);
      await takeScreenshot(page, 'save-confirmation.png');
    }

    // ========================================
    // Screenshots 22-24: Configuration Files
    // These require file system screenshots
    // ========================================
    console.log('\n22-24. Configuration file screenshots (manual capture needed)...');
    console.log('  ℹ Manual steps required:');
    console.log('  22. datasets-manifest.png:');
    console.log('      - Open configuration/datasets.manifest.json in editor');
    console.log('      - Screenshot showing JSON structure');
    console.log('      - Save to:', path.join(OUTPUT_DIR, 'datasets-manifest.png'));

    console.log('\n  23. comparison-default-yml.png:');
    console.log('      - Open configuration/comparison-default.yml in editor');
    console.log('      - Screenshot showing criteria definitions');
    console.log('      - Save to:', path.join(OUTPUT_DIR, 'comparison-default-yml.png'));

    console.log('\n  24. dataset-specific-config.png:');
    console.log('      - Open datasets/{dataset}/config/comparison.yml in editor');
    console.log('      - Screenshot showing dataset overrides');
    console.log('      - Save to:', path.join(OUTPUT_DIR, 'dataset-specific-config.png'));

    console.log('\n✅ Track C automated screenshot capture complete!');
    console.log(`📁 Screenshots saved to: ${OUTPUT_DIR}`);
    console.log('\n📝 Manual captures needed:');
    console.log('   - datasets-manifest.png (editor screenshot)');
    console.log('   - comparison-default-yml.png (editor screenshot)');
    console.log('   - dataset-specific-config.png (editor screenshot)');

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
  captureTrackCScreenshots()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { captureTrackCScreenshots };
