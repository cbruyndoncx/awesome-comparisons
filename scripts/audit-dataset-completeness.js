#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATASETS_DIR = path.resolve(__dirname, '..', 'datasets');
const templateFor = dataset => {
  const configDir = path.join(DATASETS_DIR, dataset, 'config');
  if (!fs.existsSync(configDir)) return null;
  const file = fs.readdirSync(configDir).find(name => /comparison-template\.md$/i.test(name));
  return file ? path.join(configDir, file) : null;
};

const headingNames = (text, level) => new Set(
  [...text.matchAll(new RegExp(`^${'#'.repeat(level)}\\s+(.+?)\\s*$`, 'gm'))]
    .map(match => match[1].trim())
    .filter(name => !name.startsWith('<!--'))
);

const headingAliases = new Map([
  ['Prompts', 'MCP-Prompts'],
  ['Tools', 'MCP-Tools'],
  ['Resources', 'MCP-Resources'],
]);

const hasField = (text, name) => headingNames(text, 3).has(name)
  // Some legacy records use a compact `## MCP-Client` section with the value
  // directly beneath it instead of the newer nested heading format.
  || (name === 'MCP-Client' && headingNames(text, 2).has('MCP-Client'))
  || (headingAliases.has(name) && headingNames(text, 3).has(headingAliases.get(name)));

const report = [];
const counts = new Map();
for (const dataset of fs.readdirSync(DATASETS_DIR).sort()) {
  const template = templateFor(dataset);
  const dataDir = path.join(DATASETS_DIR, dataset, 'data');
  if (!template || !fs.existsSync(dataDir)) continue;
  const templateText = fs.readFileSync(template, 'utf8');
  const requiredTop = headingNames(templateText, 2);
  const requiredFields = headingNames(templateText, 3);
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.md') && file !== 'TEMPLATE.md').sort();
  for (const file of files) {
    const text = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const missingTop = [...requiredTop].filter(name => !headingNames(text, 2).has(name));
    const missingFields = [...requiredFields].filter(name => !hasField(text, name));
    if (missingTop.length || missingFields.length) {
      report.push({ dataset, file, missingTop, missingFields });
      counts.set(dataset, (counts.get(dataset) || 0) + 1);
    }
  }
}

console.log(`Completeness audit across ${report.length ? 'records with gaps' : 'all records'}`);
console.log(`Records with gaps by dataset: ${[...counts.entries()].map(([dataset, count]) => `${dataset}=${count}`).join(', ') || 'none'}`);
if (!report.length) {
  console.log('No template heading gaps found.');
  process.exit(0);
}
for (const item of report) {
  const top = item.missingTop.length ? `top-level: ${item.missingTop.join(', ')}` : '';
  const fields = item.missingFields.length ? `fields: ${item.missingFields.join(', ')}` : '';
  console.log(`${item.dataset}/data/${item.file} — ${[top, fields].filter(Boolean).join('; ')}`);
}
console.log(`Records with completeness gaps: ${report.length}`);
