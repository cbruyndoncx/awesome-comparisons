#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATASET_DIR = path.resolve(__dirname, '..', 'datasets', 'aie-model', 'data');
const AS_OF = process.env.AIE_MODEL_AS_OF || new Date().toISOString().slice(0, 10);
const MAX_AGE_DAYS = Number(process.env.AIE_MODEL_MAX_AGE_DAYS || 180);
const LIFECYCLES = new Set(['active', 'preview', 'restricted', 'legacy', 'retired']);

function dateFrom(text, label) {
  const match = text.match(new RegExp(`^### ${label}\s*$`, 'm'));
  if (!match) return null;
  const section = text.slice(match.index + match[0].length);
  const next = section.search(/^###? /m);
  const value = (next === -1 ? section : section.slice(0, next)).match(/\b(20\d{2}-\d{2}-\d{2})\b/);
  return value ? value[1] : null;
}

function lifecycleFrom(text) {
  const header = text.match(/^### Lifecycle\s*$/m);
  if (!header) return null;
  const section = text.slice(header.index + header[0].length);
  const next = section.search(/^###? /m);
  const block = next === -1 ? section : section.slice(0, next);
  const value = block.match(/^\s*-\s*([a-z]+)\s*$/mi);
  return value ? value[1].toLowerCase() : null;
}

function ageInDays(date) {
  return Math.floor((Date.parse(AS_OF) - Date.parse(date)) / 86400000);
}

const files = fs.readdirSync(DATASET_DIR).filter(file => file.endsWith('.md')).sort();
const errors = [];
const warnings = [];

for (const file of files) {
  const fullPath = path.join(DATASET_DIR, file);
  const text = fs.readFileSync(fullPath, 'utf8');
  const title = text.split('\n', 1)[0];
  const update = dateFrom(text, 'Last Verified');
  const lifecycle = lifecycleFrom(text);

  if (!/^#\s+.+https?:\/\//.test(title)) errors.push(`${file}: title must include a canonical source URL`);
  if (!update) errors.push(`${file}: missing or malformed Last Verified date`);
  else {
    if (update > AS_OF) errors.push(`${file}: Last Verified ${update} is after as-of date ${AS_OF}`);
    if (ageInDays(update) > MAX_AGE_DAYS) warnings.push(`${file}: Last Verified ${update} is older than ${MAX_AGE_DAYS} days`);
  }
  if (!lifecycle) errors.push(`${file}: missing Lifecycle (active|preview|restricted|legacy|retired)`);
  else if (!LIFECYCLES.has(lifecycle)) errors.push(`${file}: invalid Lifecycle '${lifecycle}'`);
}

console.log(`Validated ${files.length} aie-model records as of ${AS_OF}`);
for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exitCode = 1;
else console.log('Lifecycle, freshness, and provenance checks passed.');
