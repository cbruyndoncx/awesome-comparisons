/**
 * Track D Screenshot Capture Script
 * Tutorial: Developer Guide
 *
 * Captures 5 screenshots for the developer tutorial
 * Most screenshots require manual capture (IDE, terminal, architecture)
 *
 * Prerequisites:
 * 1. VS Code (or preferred IDE) with project open
 * 2. Terminal ready for build commands
 * 3. Run: npm run screenshots:track-d
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'tutorials', 'images', 'track-d');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureTrackDScreenshots() {
  console.log('Starting Track D screenshot capture...\n');
  console.log('⚠️  Note: Track D requires MANUAL screenshot capture');
  console.log('This script provides guidance for developer-focused screenshots.\n');

  // ========================================
  // Screenshot 25: Component Architecture
  // ========================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Screenshot 25: Component Architecture');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('File: component-architecture.png');
  console.log('Size: 800x1000\n');

  console.log('Manual Steps:');
  console.log('1. Open VS Code with project loaded');
  console.log('2. Expand the src/app/ directory in file tree');
  console.log('3. Show structure:');
  console.log('   src/app/');
  console.log('   ├── components/');
  console.log('   │   ├── comparison/');
  console.log('   │   ├── config-admin/');
  console.log('   │   └── shared/');
  console.log('   ├── services/');
  console.log('   │   ├── configuration.service.ts');
  console.log('   │   ├── dataset.service.ts');
  console.log('   │   └── export.service.ts');
  console.log('   ├── store/');
  console.log('   │   ├── actions/');
  console.log('   │   ├── reducers/');
  console.log('   │   └── selectors/');
  console.log('   └── models/');
  console.log('4. Screenshot VS Code Explorer panel');
  console.log('5. Save to:', path.join(OUTPUT_DIR, 'component-architecture.png'));
  console.log('\nTip: Collapse node_modules and other unrelated folders');

  // ========================================
  // Screenshot 26: TypeScript Component Code
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Screenshot 26: TypeScript Component Code');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('File: component-code-example.png');
  console.log('Size: 1200x600\n');

  console.log('Manual Steps:');
  console.log('1. Open a component file (e.g., src/app/components/comparison/comparison.component.ts)');
  console.log('2. Ensure visible:');
  console.log('   - @Component decorator');
  console.log('   - Class definition');
  console.log('   - Observables and properties');
  console.log('   - Constructor with dependency injection');
  console.log('3. Use syntax highlighting theme');
  console.log('4. Screenshot showing ~30-50 lines of code');
  console.log('5. Save to:', path.join(OUTPUT_DIR, 'component-code-example.png'));
  console.log('\nTip: Choose a clean, readable theme (Dark+, Light+)');

  const componentFile = path.join(__dirname, '..', 'src', 'app', 'components', 'comparison', 'comparison.component.ts');
  if (fs.existsSync(componentFile)) {
    console.log('\n✓ Example file exists: src/app/components/comparison/comparison.component.ts');
  } else {
    console.log('\n⚠ Example file not found. Choose any component file.');
  }

  // ========================================
  // Screenshot 27: NgRx Store Structure
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Screenshot 27: NgRx Store Structure');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('File: ngrx-store-structure.png');
  console.log('Size: 1200x800\n');

  console.log('Manual Steps:');
  console.log('Option A - File Structure:');
  console.log('1. Expand src/app/store/ in VS Code Explorer');
  console.log('2. Show subdirectories:');
  console.log('   store/');
  console.log('   ├── actions/');
  console.log('   ├── effects/ (if present)');
  console.log('   ├── reducers/');
  console.log('   └── selectors/');
  console.log('3. Screenshot file tree');

  console.log('\nOption B - Code Example:');
  console.log('1. Open a reducer or action file');
  console.log('2. Show NgRx patterns (actions, reducers, selectors)');
  console.log('3. Screenshot code with annotations');

  console.log('\n4. Save to:', path.join(OUTPUT_DIR, 'ngrx-store-structure.png'));

  // ========================================
  // Screenshot 28: Build Output
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Screenshot 28: Build Output');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('File: build-output.png');
  console.log('Size: 1200x400\n');

  console.log('Manual Steps:');
  console.log('1. Open terminal');
  console.log('2. Run build command:');
  console.log('   npm run build');
  console.log('3. Wait for build to complete');
  console.log('4. Screenshot showing:');
  console.log('   - Build command');
  console.log('   - Compilation progress');
  console.log('   - Success message');
  console.log('   - Bundle sizes');
  console.log('   - Output paths');
  console.log('5. Save to:', path.join(OUTPUT_DIR, 'build-output.png'));
  console.log('\nTip: Clean terminal (clear previous output)');
  console.log('Tip: Use terminal with good color scheme');

  // ========================================
  // Screenshot 29: Dev Server Running
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Screenshot 29: Dev Server Running');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('File: dev-server-running.png');
  console.log('Size: 1200x300\n');

  console.log('Manual Steps:');
  console.log('1. Open terminal');
  console.log('2. Run dev server:');
  console.log('   npm start');
  console.log('3. Wait for compilation');
  console.log('4. Screenshot showing:');
  console.log('   - npm start command');
  console.log('   - "Angular Live Development Server" message');
  console.log('   - Server URL (http://localhost:4200)');
  console.log('   - "Compiled successfully" message');
  console.log('5. Save to:', path.join(OUTPUT_DIR, 'dev-server-running.png'));
  console.log('\nTip: Capture just the relevant output (last 10-15 lines)');

  // ========================================
  // Summary
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Track D requires 5 MANUAL screenshots:');
  console.log('  25. component-architecture.png (VS Code file tree)');
  console.log('  26. component-code-example.png (TypeScript code)');
  console.log('  27. ngrx-store-structure.png (Store structure)');
  console.log('  28. build-output.png (Terminal: npm run build)');
  console.log('  29. dev-server-running.png (Terminal: npm start)');

  console.log('\nAll screenshots should be saved to:');
  console.log(OUTPUT_DIR);

  console.log('\nRecommended Tools:');
  console.log('  - VS Code: For code and file structure screenshots');
  console.log('  - Terminal: For build and dev server output');
  console.log('  - Screenshot tool: Built-in OS tool or specialized app');

  console.log('\nTheme Recommendations:');
  console.log('  - VS Code: Dark+ (default dark) or Light+ (default light)');
  console.log('  - Terminal: Clear colors, good contrast');
  console.log('  - Consistent theme across all screenshots');

  console.log('\nQuality Checklist:');
  console.log('  ☐ Code is readable (syntax highlighted)');
  console.log('  ☐ File paths visible');
  console.log('  ☐ Terminal output clear');
  console.log('  ☐ No sensitive information');
  console.log('  ☐ Professional appearance');

  console.log('\n✅ Track D screenshot guide complete!');
  console.log('Follow the manual steps above to capture all screenshots.\n');
}

// Run the script
if (require.main === module) {
  captureTrackDScreenshots()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { captureTrackDScreenshots };
