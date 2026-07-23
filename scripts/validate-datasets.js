#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATASETS_DIR = path.resolve(__dirname, '..', 'datasets');
const AS_OF = process.env.DATASETS_AS_OF || new Date().toISOString().slice(0, 10);
const MAX_AGE_DAYS = Number(process.env.DATASETS_MAX_AGE_DAYS || 365);

function lastUpdate(text) {
  const header = text.match(/^### Last Update\s*$/m);
  if (!header) return null;
  const section = text.slice(header.index + header[0].length);
  const next = section.search(/^###? /m);
  const block = next === -1 ? section : section.slice(0, next);
  const match = block.match(/\b(20\d{2}(?:-\d{2}(?:-\d{2})?)?|(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, 20\d{2})\b/);
  return match ? match[1] : null;
}

function ageInDays(date) {
  return Math.floor((Date.parse(AS_OF) - Date.parse(date)) / 86400000);
}

const errors = [];
const warnings = [];
let recordCount = 0;

for (const dataset of fs.readdirSync(DATASETS_DIR).sort()) {
  // business-competition uses a company-profile schema without Last Update fields.
  if (dataset === 'business-competition') continue;
  const dataDir = path.join(DATASETS_DIR, dataset, 'data');
  if (!fs.existsSync(dataDir)) continue;
  for (const file of fs.readdirSync(dataDir).filter(name => name.endsWith('.md')).sort()) {
    recordCount += 1;
    const relative = `${dataset}/data/${file}`;
    const text = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const title = text.split('\n').slice(0, 3).join('\n');
    const update = lastUpdate(text);

    if (!/https?:\/\//.test(title)) errors.push(`${relative}: title block must include a canonical source URL`);
    if (!update) errors.push(`${relative}: missing or malformed Last Update date`);
    else {
      if (Date.parse(update) > Date.parse(AS_OF)) errors.push(`${relative}: Last Update ${update} is after as-of date ${AS_OF}`);
      if (ageInDays(update) > MAX_AGE_DAYS) warnings.push(`${relative}: Last Update ${update} is older than ${MAX_AGE_DAYS} days`);
    }
  }
}

console.log(`Validated ${recordCount} dataset records as of ${AS_OF}`);
for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exitCode = 1;
else console.log(`Dataset URL and date checks passed with ${warnings.length} stale-record warning(s).`);
