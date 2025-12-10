#!/usr/bin/env node
/**
 * Generate environment.prod.ts from package.json repository field
 * This ensures URLs are never hardcoded in source files
 */

const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = require('../package.json');

// Extract repository URL from package.json
let repoUrl = packageJson.repository?.url || '';

// Clean up git@ format to https://
if (repoUrl.startsWith('git@github.com:')) {
    repoUrl = repoUrl.replace('git@github.com:', 'https://github.com/');
}
if (repoUrl.endsWith('.git')) {
    repoUrl = repoUrl.replace('.git', '');
}

// Extract owner and repo name for GitHub Pages URL
let ghPagesUrl = '';
const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
if (match) {
    const [, owner, repo] = match;
    ghPagesUrl = `https://${owner}.github.io/${repo}`;
}

// Allow environment variable overrides
const finalRepoUrl = process.env.REPOSITORY_URL || repoUrl;
const finalGhPagesUrl = process.env.GITHUB_PAGES_URL || ghPagesUrl;

// Generate environment.prod.ts
const envContent = `// Auto-generated from package.json by scripts/generate-environment.js
// DO NOT EDIT MANUALLY - This file is generated during build
// To customize URLs, either:
//   1. Update repository.url in package.json
//   2. Set REPOSITORY_URL and GITHUB_PAGES_URL environment variables

export const environment = {
    production: true,
    debug: false,
    // GitHub repository URL (source code)
    repositoryUrl: '${finalRepoUrl}',
    // GitHub Pages URL (published site/docs)
    githubPagesUrl: '${finalGhPagesUrl}'
};
`;

// Write to environment.prod.ts
const envPath = path.join(__dirname, '../src/environments/environment.prod.ts');
fs.writeFileSync(envPath, envContent, 'utf8');

console.log('✓ Generated environment.prod.ts:');
console.log(`  Repository: ${finalRepoUrl}`);
console.log(`  GitHub Pages: ${finalGhPagesUrl}`);
