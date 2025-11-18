/**
 * Track B Screenshot Capture Script
 * Tutorial: Content Editor Guide
 *
 * Captures 5 screenshots for the content editor tutorial
 * Most screenshots require manual capture (file system, IDE, terminal)
 *
 * Prerequisites:
 * 1. VS Code (or preferred editor) with datasets folder open
 * 2. Terminal ready for git commands
 * 3. Run: npm run screenshots:track-b
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'tutorials', 'images', 'track-b');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureTrackBScreenshots() {
  console.log('Starting Track B screenshot capture...\n');
  console.log('⚠️  Note: Track B requires MANUAL screenshot capture');
  console.log('This script provides guidance and file structure.\n');

  // ========================================
  // Screenshot 11: Dataset Folder Structure
  // ========================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Screenshot 11: Dataset Folder Structure');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('File: dataset-folder-structure.png');
  console.log('Size: 800x600\n');

  console.log('Manual Steps:');
  console.log('1. Open file explorer or VS Code file tree');
  console.log('2. Navigate to: datasets/code-editor/');
  console.log('3. Expand all folders to show:');
  console.log('   datasets/code-editor/');
  console.log('   ├── config/');
  console.log('   │   └── comparison.yml');
  console.log('   ├── data/');
  console.log('   │   ├── cline.md');
  console.log('   │   ├── continue.md');
  console.log('   │   ├── cursor.md');
  console.log('   │   └── ...');
  console.log('   ├── dataset.yaml');
  console.log('   └── description.md');
  console.log('4. Take screenshot of file tree');
  console.log('5. Save to:', path.join(OUTPUT_DIR, 'dataset-folder-structure.png'));
  console.log('\nTip: Use VS Code Explorer sidebar for clean appearance\n');

  // Show the actual structure
  try {
    console.log('Your current structure:');
    const tree = execSync('tree -L 2 datasets/code-editor 2>/dev/null || ls -R datasets/code-editor | head -30',
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    console.log(tree);
  } catch (e) {
    console.log('(Could not display tree structure)');
  }

  // ========================================
  // Screenshot 12: Markdown Entry in Editor
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Screenshot 12: Markdown Entry in Editor');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('File: markdown-entry-cline.png');
  console.log('Size: 1920x1080\n');

  console.log('Manual Steps:');
  console.log('1. Open datasets/code-editor/data/cline.md in VS Code');
  console.log('2. Enable syntax highlighting (should be automatic)');
  console.log('3. Ensure visible:');
  console.log('   - File header with title and URL');
  console.log('   - Description paragraphs');
  console.log('   - Sections with ## (General Info, Licensing, Features)');
  console.log('   - Criteria with ###');
  console.log('   - Values with -');
  console.log('4. Take full window screenshot');
  console.log('5. Save to:', path.join(OUTPUT_DIR, 'markdown-entry-cline.png'));
  console.log('\nTip: Use a clean theme, hide minimap for clarity');

  // Check if file exists
  const clineFile = path.join(__dirname, '..', 'datasets', 'code-editor', 'data', 'cline.md');
  if (fs.existsSync(clineFile)) {
    console.log('\n✓ File exists: datasets/code-editor/data/cline.md');
  } else {
    console.log('\n⚠ File not found. You may need to use a different example file.');
  }

  // ========================================
  // Screenshot 13: Markdown Raw vs Rendered
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Screenshot 13: Markdown Raw vs Rendered');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('File: markdown-raw-vs-rendered.png');
  console.log('Size: 1600x800 (side-by-side)\n');

  console.log('Manual Steps:');
  console.log('Option A - VS Code Markdown Preview:');
  console.log('1. Open cline.md in VS Code');
  console.log('2. Click "Open Preview to the Side" button (Ctrl+K V)');
  console.log('3. Arrange side-by-side: raw markdown left, preview right');
  console.log('4. Take screenshot showing both');
  console.log('5. Save to:', path.join(OUTPUT_DIR, 'markdown-raw-vs-rendered.png'));

  console.log('\nOption B - Comparison App:');
  console.log('1. Take screenshot of raw markdown in editor');
  console.log('2. Take screenshot of same content in running app');
  console.log('3. Use image editor to create side-by-side composite');
  console.log('4. Label "Raw Markdown" and "Rendered in App"');
  console.log('5. Save composite to:', path.join(OUTPUT_DIR, 'markdown-raw-vs-rendered.png'));

  // ========================================
  // Screenshot 14: Create New Markdown File
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Screenshot 14: Create New Markdown File');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('File: create-new-markdown-file.png');
  console.log('Size: 1000x600\n');

  console.log('Manual Steps:');
  console.log('Option A - VS Code:');
  console.log('1. Right-click on datasets/code-editor/data/ folder');
  console.log('2. Select "New File"');
  console.log('3. Name it: codewizard.md (example)');
  console.log('4. Screenshot showing file creation dialog');
  console.log('5. Save to:', path.join(OUTPUT_DIR, 'create-new-markdown-file.png'));

  console.log('\nOption B - Terminal:');
  console.log('1. Open terminal in datasets/code-editor/data/');
  console.log('2. Type command: touch codewizard.md');
  console.log('3. Screenshot showing command and result');
  console.log('4. Save to:', path.join(OUTPUT_DIR, 'create-new-markdown-file.png'));

  // ========================================
  // Screenshot 15: Git Commit New Entry
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Screenshot 15: Git Commit New Entry');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('File: git-commit-new-entry.png');
  console.log('Size: 1200x400\n');

  console.log('Manual Steps:');
  console.log('1. Open terminal');
  console.log('2. Run the following commands (example):');
  console.log('   git add datasets/code-editor/data/codewizard.md');
  console.log('   git commit -m "Add CodeWizard to code-editor comparison"');
  console.log('   git push origin main');
  console.log('3. Screenshot showing:');
  console.log('   - Commands executed');
  console.log('   - Success messages');
  console.log('   - Commit hash');
  console.log('4. Save to:', path.join(OUTPUT_DIR, 'git-commit-new-entry.png'));

  console.log('\nTip: Use a clean terminal with good contrast');
  console.log('Tip: Show successful output (commit created, push succeeded)');

  // ========================================
  // Summary
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Track B requires 5 MANUAL screenshots:');
  console.log('  11. dataset-folder-structure.png');
  console.log('  12. markdown-entry-cline.png');
  console.log('  13. markdown-raw-vs-rendered.png');
  console.log('  14. create-new-markdown-file.png');
  console.log('  15. git-commit-new-entry.png');

  console.log('\nAll screenshots should be saved to:');
  console.log(OUTPUT_DIR);

  console.log('\nRecommended Tools:');
  console.log('  - VS Code: For file structure and markdown editing');
  console.log('  - Terminal: For git commands');
  console.log('  - Screenshot tool: Built-in OS tool or Flameshot/Snip & Sketch');

  console.log('\nQuality Checklist:');
  console.log('  ☐ Text is readable');
  console.log('  ☐ File paths visible');
  console.log('  ☐ Syntax highlighting enabled');
  console.log('  ☐ Clean, professional appearance');
  console.log('  ☐ No personal information');

  console.log('\n✅ Track B screenshot guide complete!');
  console.log('Follow the manual steps above to capture all screenshots.\n');
}

// Run the script
if (require.main === module) {
  captureTrackBScreenshots()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { captureTrackBScreenshots };
