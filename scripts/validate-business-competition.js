#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '..', 'datasets', 'business-competition', 'data');
const requiredSections = [
  'General Info', 'Company Profile', 'Market Positioning', 'SWOT',
  "Porter's Five Forces", 'BCG Portfolio', 'Gartner MQ', 'Risk & Compliance'
];
const errors = [];
const files = fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.md') && file !== 'TEMPLATE.md').sort();

for (const file of files) {
  const relative = `business-competition/data/${file}`;
  const text = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
  const titleBlock = text.split('\n').slice(0, 3).join('\n');
  if (!/^#\s*.+https?:\/\//.test(titleBlock)) errors.push(`${relative}: title block must include a canonical source URL`);
  for (const section of requiredSections) {
    if (!text.includes(`## ${section}`)) errors.push(`${relative}: missing ## ${section}`);
  }
}

console.log(`Validated ${files.length} business-competition profiles`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exitCode = 1;
else console.log('Business-competition schema checks passed.');
