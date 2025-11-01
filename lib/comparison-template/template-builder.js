// Shared comparison template builder usable from Angular services or Node CLI scripts

const CriteriaTypes = {
  LABEL: 'LABEL',
  MARKDOWN: 'MARKDOWN',
  TEXT: 'TEXT',
  RATING: 'RATING',
  REPOSITORY: 'REPOSITORY',
  NAME_URL: 'NAME_URL'
};

function normaliseText(value, context = {}) {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    const template = typeof value.template === 'string' ? value.template : '';
    const variables = Array.isArray(value.variables) ? value.variables : [];
    if (template.length > 0) {
      let result = template;
      variables.forEach(variable => {
        const replacement = context[variable] !== undefined && context[variable] !== null
          ? String(context[variable])
          : '';
        if (result.includes('{}')) {
          result = result.replace("{}", replacement);
        }
        const token = `{${variable}}`;
        if (result.includes(token)) {
          result = result.replace(new RegExp(`\\{${variable}\\}`, 'g'), replacement);
        }
      });
      return result;
    }
  }
  return '';
}

function renderComment(value, context = {}) {
  const text = normaliseText(value, context);
  if (!text) {
    return '<!-- -->';
  }
  const sanitized = text.replace(/<!--/g, '').replace(/-->/g, '').trim();
  return `<!-- ${sanitized} -->`;
}

function collectLabelValues(criteria) {
  const values = criteria?.values;
  if (!values) {
    return [];
  }
  if (values instanceof Map) {
    return Array.from(values.keys());
  }
  if (Array.isArray(values)) {
    return values.map(normaliseText);
  }
  if (typeof values === 'object') {
    return Object.keys(values);
  }
  return [];
}

function buildCriteriaInstruction(criteria, context = {}) {
  const name = context.name || criteria?.name || criteria?.id || 'this section';
  const typeKey = String(criteria?.type || '').toUpperCase().replace(/-/g, '_');

  switch (typeKey) {
    case CriteriaTypes.LABEL: {
      const values = collectLabelValues(criteria).map(value => value.toLowerCase());
      const hasYes = values.includes('yes');
      const hasNo = values.includes('no');
      if (hasYes && hasNo) {
        return renderComment(
          'Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values.',
          context
        );
      }
      return renderComment(
        'Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values.',
        context
      );
    }
    case CriteriaTypes.TEXT:
      return renderComment(`Provide written details for ${name}.`, context);
    case CriteriaTypes.RATING:
      return renderComment(`Provide the rating value for ${name} or remove if unknown.`, context);
    case CriteriaTypes.REPOSITORY:
      return renderComment(`List the relevant repository links for ${name} or remove if not applicable.`, context);
    case CriteriaTypes.MARKDOWN:
      return null;
    case CriteriaTypes.NAME_URL:
    default:
      return renderComment(`Add the appropriate content for ${name}.`, context);
  }
}

function buildDatasetHeader(dataset) {
  let header = `# ${dataset.displayLabel}\n\n`;
  if (dataset.shortDescription) {
    header += `${dataset.shortDescription}\n\n`;
  }
  header += `**Dataset ID:** ${dataset.id}\n\n`;
  return header;
}

function buildLabelValueList(criteria, context = {}) {
  const values = collectLabelValues(criteria);
  let section = '';

  const instruction = buildCriteriaInstruction(criteria, context);
  if (instruction) {
    section += `${instruction}\n\n`;
  }

  if (values.length > 0) {
    values.forEach(value => {
      section += `- ${value}\n`;
    });
    section += '\n';
  } else {
    section += `${renderComment('Add the label values that apply. Use indented "- " entries beneath each kept value for any notes.', context)}\n\n`;
  }

  section += `${renderComment('Add any supporting notes as indented "- " entries beneath the kept values.', context)}\n\n`;
  return section;
}

function buildCriteriaSection(criteria) {
  const context = {
    id: criteria?.id,
    name: criteria?.name || criteria?.id,
    type: criteria?.type
  };

  let section = `### ${context.name}\n\n`;

  if (criteria?.description) {
    section += `${renderComment(criteria.description, context)}\n\n`;
  }

  const typeKey = String(criteria?.type || '').toUpperCase().replace(/-/g, '_');

  if (typeKey === CriteriaTypes.LABEL) {
    section += buildLabelValueList(criteria, context);
  } else if (typeKey === CriteriaTypes.MARKDOWN) {
    section += '- \n\n';
  } else {
    const instruction = buildCriteriaInstruction(criteria, context);
    if (instruction) {
      section += `${instruction}\n\n`;
    }
    section += '- \n\n';
  }

  return section;
}

function buildGroupSection(group, criteriaLookup) {
  let section = `## ${group?.displayName || group?.key || 'Group'}\n\n`;
  const groupComment = renderComment(group?.label?.tooltip || group?.label?.value || '');
  if (groupComment && groupComment !== '<!-- -->') {
    section += `${groupComment}\n\n`;
  }

  (group?.children || []).forEach(child => {
    const criteria = criteriaLookup instanceof Map
      ? criteriaLookup.get(child.id)
      : criteriaLookup?.[child.id] || child;
    if (criteria) {
      section += buildCriteriaSection(criteria);
    }
  });

  return section;
}

function buildUngroupedSection(criteriaList = []) {
  if (!criteriaList.length) {
    return '';
  }
  let section = '## Ungrouped Criteria\n\n';
  criteriaList.forEach(criteria => {
    section += buildCriteriaSection(criteria);
  });
  return section;
}

function normalizeMarkdown(markdown) {
  return markdown
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
}

function buildTemplateDocument(dataset, featureGroups, ungroupedCriteria, criteriaLookup) {
  const parts = [];
  parts.push(buildDatasetHeader(dataset));

  (featureGroups || []).forEach(group => {
    parts.push(buildGroupSection(group, criteriaLookup));
  });

  const ungrouped = buildUngroupedSection(ungroupedCriteria);
  if (ungrouped) {
    parts.push(ungrouped);
  }

  return normalizeMarkdown(parts.join('\n\n'));
}

module.exports = {
  buildTemplateDocument,
  normaliseText,
  renderComment,
  buildCriteriaInstruction,
  buildLabelValueList,
  buildCriteriaSection,
  buildGroupSection,
  buildDatasetHeader,
  CriteriaTypes
};
