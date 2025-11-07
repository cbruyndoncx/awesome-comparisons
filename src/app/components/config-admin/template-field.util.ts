export interface StructuredTextValue {
  template: string;
  variables?: string[];
}

export function serializeStructuredText(value: any): string {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object') {
    const template = typeof value.template === 'string' ? value.template : '';
    const variables = Array.isArray(value.variables)
      ? value.variables.filter((v: unknown) => typeof v === 'string' && v.trim().length > 0)
      : [];

    if (template) {
      const varsSegment = variables.length ? ` | variables:${variables.join(',')}` : '';
      return `template:${template}${varsSegment}`;
    }

    try {
      return JSON.stringify(value);
    } catch {
      return '';
    }
  }

  return String(value);
}

export function parseStructuredText(value: any): string | StructuredTextValue {
  if (value == null) {
    return '';
  }
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  const pattern = /^template:(.*?)(?:\|\s*variables:(.*))?$/is;
  const match = pattern.exec(trimmed);
  if (!match) {
    return trimmed;
  }

  const template = match[1]?.trim() ?? '';
  const varsRaw = match[2]
    ? match[2].split(',').map(token => token.trim()).filter(Boolean)
    : [];

  const structured: StructuredTextValue = { template };
  if (varsRaw.length) {
    structured.variables = varsRaw;
  }
  return structured;
}
